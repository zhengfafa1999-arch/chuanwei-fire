import fs from 'node:fs';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import {spawn} from 'node:child_process';

const root = process.cwd();
const evidence = path.join(root, 'docs/evidence/product-browse-groups-20261018');
const valveMembers = ['system-valves', 'butterfly-valves', 'gate-valves', 'pipeline-valves-strainers'];
const valveGroup = 'valves-strainers';
const accessories = 'pressure-gauges-accessories';
const viewports = [{id:'desktop',width:1440,height:1000}, {id:'mobile',width:390,height:844}];
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const same = (a,b) => JSON.stringify([...a].sort()) === JSON.stringify([...b].sort());
const checks = [], screenshots = [];
let activeScenario = 'startup';

function serverForWorkspace() {
  return http.createServer((request,response) => {
    try {
      const relative = decodeURIComponent(new URL(request.url,'http://localhost').pathname).replace(/^\/+/, '') || 'index.html';
      const file = path.resolve(root,relative);
      assert(file.startsWith(root+path.sep) && fs.statSync(file).isFile(), 'Outside workspace or missing file');
      response.setHeader('Content-Type', ({'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.json':'application/json','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml'})[path.extname(file)] || 'application/octet-stream');
      response.setHeader('Cache-Control','no-store');
      fs.createReadStream(file).pipe(response);
    } catch {
      response.writeHead(404, {'Content-Type':'text/plain'}); response.end('Not found');
    }
  });
}
async function reservePort() {
  const temporary = http.createServer();
  await new Promise(resolve => temporary.listen(0,'127.0.0.1',resolve));
  const {port} = temporary.address();
  await new Promise(resolve => temporary.close(resolve));
  return port;
}
async function waitForDebugTarget(port) {
  for(let attempt=0;attempt<60;attempt++){
    try {
      const response=await fetch(`http://127.0.0.1:${port}/json/list`);
      if(response.ok){const pages=await response.json();const page=pages.find(x=>x.type==='page');if(page?.webSocketDebuggerUrl)return page;}
    } catch(error) {if(attempt===59)throw error;}
    await delay(100);
  }
  throw new Error('Edge did not expose a debugging page');
}
class DevToolsClient {
  constructor(url){this.socket=new WebSocket(url);this.nextId=1;this.pending=new Map();}
  async connect(){
    await new Promise((resolve,reject)=>{this.socket.addEventListener('open',resolve,{once:true});this.socket.addEventListener('error',reject,{once:true});});
    this.socket.addEventListener('message',event=>{
      const message=JSON.parse(event.data),request=this.pending.get(message.id);
      if(!request)return;this.pending.delete(message.id);clearTimeout(request.timer);
      message.error?request.reject(new Error(message.error.message)):request.resolve(message.result);
    });
  }
  send(method,params={}){
    const id=this.nextId++;
    return new Promise((resolve,reject)=>{
      const timer=setTimeout(()=>{this.pending.delete(id);reject(new Error(`CDP timeout: ${method}`));},20000);
      this.pending.set(id,{resolve,reject,timer});this.socket.send(JSON.stringify({id,method,params}));
    });
  }
  close(){for(const pending of this.pending.values())clearTimeout(pending.timer);this.socket.close();}
}
async function evaluate(client,expression){
  const result=await client.send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});
  if(result.exceptionDetails)throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
  return result.result.value;
}
async function waitUntil(client,expression,label){
  for(let attempt=0;attempt<100;attempt++){
    if(await evaluate(client,expression))return;
    await delay(100);
  }
  throw new Error(`Timed out: ${label}`);
}
async function navigate(client,url){
  const target=new URL(url);
  await client.send('Page.navigate',{url});
  await waitUntil(client,`document.readyState==='complete' && decodeURIComponent(location.pathname)===${JSON.stringify(decodeURIComponent(target.pathname))}`,'page navigation');
}
async function waitForFinder(client){
  await waitUntil(client,"!!document.querySelector('[data-product-finder] .finder-controls:not([hidden])')",'product finder ready');
}
async function layout(client){
  await evaluate(client,`Promise.race([Promise.all([...document.images].map(image=>{image.loading='eager';return image.decode().catch(()=>{})})),new Promise(resolve=>setTimeout(resolve,8000))])`);
  const state=await evaluate(client,`({overflow:Math.max(document.documentElement.scrollWidth,document.body.scrollWidth)-innerWidth,broken:[...document.images].filter(image=>!image.complete||!image.naturalWidth).map(image=>image.currentSrc||image.src),lang:document.documentElement.lang,dir:document.documentElement.dir})`);
  assert(state.overflow<=1 && !state.broken.length,`${activeScenario}: layout/image failure ${JSON.stringify(state)}`);
  return state;
}
async function snapshot(client){
  return evaluate(client,`(()=>{
    const select=document.querySelector('#product-family');
    return {category:select.value,query:document.querySelector('#product-search').value,page:Number(new URLSearchParams(location.search).get('page')||1),url:location.href,
      count:document.querySelector('[data-finder-count]').textContent,pageLabel:document.querySelector('[data-page-label]').textContent,
      cards:[...document.querySelectorAll('#product-results .product-card')].map(card=>{const link=card.querySelector('.product-card__link');const u=new URL(link.href);return {family:card.closest('[data-family]').dataset.family,href:u.pathname+u.search+u.hash,name:card.querySelector('h3').textContent.trim()}}),
      nextDisabled:document.querySelector('[data-page-next]').disabled};
  })()`);
}
async function selectCategory(client,value,query=''){
  await evaluate(client,`(()=>{const select=document.querySelector('#product-family');document.querySelector('#product-search').value=${JSON.stringify(query)};select.value=${JSON.stringify(value)};select.dispatchEvent(new Event('change'))})()`);
  await waitUntil(client,`document.querySelector('#product-family').value===${JSON.stringify(value)}`,'category selection');
}
async function screenshot(client,name){
  const shot=await client.send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
  fs.writeFileSync(path.join(evidence,name),Buffer.from(shot.data,'base64'));screenshots.push(name);
}
async function walkPages(client,allowed,expected,label){
  const seen=[], pages=[];
  for(let attempt=0;attempt<30;attempt++){
    const state=await snapshot(client);
    assert(state.cards.length>0,`${label}: empty results`);
    assert(state.cards.every(card=>allowed.includes(card.family)),`${label}: unrelated family ${JSON.stringify(state.cards)}`);
    await layout(client);
    pages.push({page:state.page,cards:state.cards.length,families:[...new Set(state.cards.map(card=>card.family))]});
    seen.push(...state.cards.map(card=>`${card.family}|${card.href}`));
    if(state.nextDisabled)break;
    await evaluate(client,"document.querySelector('[data-page-next]').click()");
    assert((await snapshot(client)).page===state.page+1,`${label}: pagination did not advance`);
    assert(attempt<29,`${label}: pagination loop`);
  }
  assert(same(seen,expected.map(card=>`${card.family}|${card.href}`)),`${label}: pagination omitted or duplicated products (${seen.length}/${expected.length})`);
  assert(same([...new Set(pages.flatMap(page=>page.families))],[...new Set(expected.map(card=>card.family))]),`${label}: family coverage mismatch`);
  return {status:'PASS',productCount:seen.length,pages};
}
async function menuCheck(client,locale,viewport){
  const state=await evaluate(client,`(()=>{
    const toggle=document.querySelector('[data-nav-toggle]');
    if(toggle&&getComputedStyle(toggle).display!=='none'&&toggle.getAttribute('aria-expanded')!=='true')toggle.click();
    const menu=document.querySelector('.global-product-menu');if(!menu.open)menu.querySelector('summary').click();
    const groups=[...document.querySelectorAll('.global-product-group')];
    const valves=groups.filter(group=>group.dataset.productBrowseGroup==='valves-strainers');
    const accessories=groups.filter(group=>group.dataset.productBrowseGroup==='pressure-gauges-accessories');
    if(valves[0]&&!valves[0].open)valves[0].querySelector('summary').click();
    return {count:groups.length,ids:groups.map(group=>group.dataset.productBrowseGroup),valveCount:valves.length,accessoryCount:accessories.length,
      valveName:valves[0]?.querySelector('summary').textContent.trim(),accessoryName:accessories[0]?.querySelector('summary').textContent.trim(),
      members:valves[0]?[...valves[0].querySelectorAll('[data-product-subcategory]')].map(section=>section.dataset.productSubcategory):[],
      valveHref:valves[0]?.querySelector('.global-product-category').href,accessoriesInsideValve:!!valves[0]?.querySelector('[data-product-browse-group="pressure-gauges-accessories"]'),open:menu.open};
  })()`);
  assert(state.count===15&&state.valveCount===1&&state.accessoryCount===1&&state.open,`Menu group counts: ${JSON.stringify(state)}`);
  assert(same(state.members,valveMembers)&&!state.ids.some(id=>valveMembers.includes(id))&&!state.accessoriesInsideValve,`Menu nesting: ${JSON.stringify(state)}`);
  assert(new URL(state.valveHref).searchParams.get('category')===valveGroup,'Valve menu parent must filter the directory');
  if(locale==='en')assert(state.valveName==='Valves & Strainers'&&state.accessoryName==='Accessories',`English menu labels: ${JSON.stringify(state)}`);
  await layout(client);
  await screenshot(client,`${locale}-${viewport.id}-group-menu.png`);
  await client.send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape'});
  assert(await evaluate(client,"!document.querySelector('.global-product-menu').open"),'Escape did not close the menu');
  return {status:'PASS',...state};
}

fs.mkdirSync(evidence,{recursive:true});
// Original leaf sections remain in generated HTML even though JavaScript only
// renders the selected page of results at runtime.
const staticChecks=['products.html','ar/products.html'].map(file=>{
  const html=fs.readFileSync(path.join(root,file),'utf8');
  const families=[...html.matchAll(/data-family="([^"]+)"/g)].map(match=>match[1]);
  assert(families.length===18&&new Set(families).size===18,`${file}: expected 18 original detailed families`);
  assert(valveMembers.every(id=>families.includes(id))&&families.includes(accessories),`${file}: detailed category lost`);
  return {file,status:'PASS',familyCount:families.length};
});
const server=serverForWorkspace();
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin=`http://127.0.0.1:${server.address().port}`;
const port=await reservePort();
const executable=[process.env.EDGE_PATH,'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe','C:/Program Files/Microsoft/Edge/Application/msedge.exe'].filter(Boolean).find(file=>fs.existsSync(file));
assert(executable,'Microsoft Edge executable was not found');
const browser=spawn(executable,['--headless=new','--disable-gpu','--remote-allow-origins=*',`--remote-debugging-port=${port}`,`--user-data-dir=${path.join(os.tmpdir(),`browse-groups-${process.pid}-${Date.now()}`)}`,'about:blank'],{stdio:'ignore',windowsHide:true});
let client,version;
try{
  const target=await waitForDebugTarget(port);
  client=new DevToolsClient(target.webSocketDebuggerUrl);await client.connect();await client.send('Page.enable');
  version=await client.send('Browser.getVersion');
  for(const viewport of viewports)for(const locale of ['en','ar']){
    activeScenario=`${locale}/${viewport.id}`;
    await client.send('Emulation.setDeviceMetricsOverride',{width:viewport.width,height:viewport.height,deviceScaleFactor:1,mobile:false});
    const directory=locale==='ar'?'/ar/products.html':'/products.html';
    await navigate(client,`${origin}${directory}?category=${valveGroup}`);await waitForFinder(client);
    const structure=await evaluate(client,`(async()=>{
      const select=document.querySelector('#product-family'),group=select.querySelector('option[value="valves-strainers"]');
      const raw=new DOMParser().parseFromString(await (await fetch(location.pathname)).text(),'text/html');
      const cards=[...raw.querySelectorAll('#product-results .product-card')].map(card=>{const link=card.querySelector('.product-card__link');const u=new URL(link.getAttribute('href'),location.href);return {family:card.closest('[data-family]').dataset.family,href:u.pathname+u.search+u.hash}});
      return {category:select.value,members:(group?.dataset.familyMembers||'').split(/\\s+/),parentTag:group?.parentElement.tagName,
        optgroupOptions:group?[...group.parentElement.querySelectorAll('option')].map(option=>option.value):[],
        shortcutIds:[...document.querySelectorAll('.finder-shortcuts a')].map(link=>link.hash.slice(1)),cards,
        accessoriesLabel:select.querySelector('option[value="pressure-gauges-accessories"]')?.textContent.trim()};
    })()`);
    assert(structure.category===valveGroup&&same(structure.members,valveMembers),'Parent group query or member mapping failed');
    assert(structure.parentTag==='OPTGROUP'&&same(structure.optgroupOptions,[valveGroup,...valveMembers]),'Original leaf options must remain within the valve optgroup');
    assert(structure.shortcutIds.length===15&&new Set(structure.shortcutIds).size===15&&structure.shortcutIds.includes(valveGroup)&&structure.shortcutIds.includes(accessories)&&!structure.shortcutIds.some(id=>valveMembers.includes(id)),'Directory shortcuts must show 15 top-level groups');
    if(locale==='en')assert(structure.accessoriesLabel==='Accessories','Accessories selector label was not updated');
    const valveExpected=structure.cards.filter(card=>valveMembers.includes(card.family));
    const accessoryExpected=structure.cards.filter(card=>card.family===accessories);
    const gateExpected=structure.cards.filter(card=>card.family==='gate-valves');
    assert(accessoryExpected.length===3,'Accessories must contain exactly the 3 pressure/gauge items');
    const initialLayout=await layout(client);
    assert(initialLayout.lang===locale&&initialLayout.dir===(locale==='ar'?'rtl':'ltr'),'Directory locale/direction mismatch');
    await screenshot(client,`${locale}-${viewport.id}-valves-first-page.png`);
    const groupPagination=await walkPages(client,valveMembers,valveExpected,`${activeScenario}: valve group`);
    const before=await snapshot(client);
    await client.send('Page.reload',{ignoreCache:true});await waitForFinder(client);
    const refreshed=await snapshot(client);
    assert(refreshed.category===valveGroup&&refreshed.page===before.page&&same(refreshed.cards.map(c=>c.href),before.cards.map(c=>c.href)),'Reload lost valve group/page');
    const detailHref=await evaluate(client,"document.querySelector('#product-results .product-card__link').href");
    await evaluate(client,"document.querySelector('#product-results .product-card__link').click()");
    await waitUntil(client,`decodeURIComponent(location.pathname)===${JSON.stringify(decodeURIComponent(new URL(detailHref).pathname))} && document.readyState==='complete'`,'detail entry');
    await evaluate(client,'history.back()');
    await waitUntil(client,`location.pathname===${JSON.stringify(directory)} && !!document.querySelector('#product-family')`,'detail return');await waitForFinder(client);
    const returned=await snapshot(client);
    assert(returned.category===valveGroup&&returned.page===before.page&&same(returned.cards.map(c=>c.href),before.cards.map(c=>c.href)),'Detail return lost valve group/page');
    await selectCategory(client,valveGroup,'GL41H');
    const modelSearch=await snapshot(client);
    assert(modelSearch.category===valveGroup&&modelSearch.cards.length===1&&modelSearch.cards.every(card=>card.family==='pipeline-valves-strainers'),'GL41H search escaped group or failed');
    await layout(client);
    await client.send('Page.reload',{ignoreCache:true});await waitForFinder(client);
    assert((await snapshot(client)).query==='GL41H'&&(await snapshot(client)).category===valveGroup,'Reload lost combined model/group search');
    await screenshot(client,`${locale}-${viewport.id}-gl41h-group-search.png`);
    await selectCategory(client,accessories);
    const accessoryResults=await walkPages(client,[accessories],accessoryExpected,`${activeScenario}: accessories`);
    await screenshot(client,`${locale}-${viewport.id}-accessories.png`);
    await navigate(client,`${origin}${directory}?category=gate-valves`);await waitForFinder(client);
    assert((await snapshot(client)).category==='gate-valves','Legacy gate-valves URL was not restored');
    const legacyLeaf=await walkPages(client,['gate-valves'],gateExpected,`${activeScenario}: legacy gate leaf`);
    await evaluate(client,"document.querySelector('.finder-shortcuts a[href=\"#valves-strainers\"]').click()");
    const shortcut=await snapshot(client);assert(shortcut.category===valveGroup&&!shortcut.query&&shortcut.page===1,'Valve shortcut did not select parent group');
    const menu=await menuCheck(client,locale,viewport);
    checks.push({scenario:activeScenario,status:'PASS',directory,rawFamilies:18,shortcuts:15,groupPagination,modelSearch:{count:modelSearch.cards.length,families:modelSearch.cards.map(card=>card.family)},accessoryResults,legacyLeaf,reloadAndDetailBack:'PASS',menu});
    console.log(`Browse groups PASS: ${activeScenario}; ${groupPagination.productCount} valves across ${groupPagination.pages.length} pages; 3 accessories.`);
  }
  const homeChecks=[];
  for(const [locale,file] of [['en','index.html'],['ar','ar/index.html'],['zh','zh/index.html']]){
    activeScenario=`home/${locale}`;
    await client.send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
    await navigate(client,`${origin}/${file}`);
    const state=await evaluate(client,`(()=>{const cards=[...document.querySelectorAll('[data-home-family]')];const options=[...document.querySelectorAll('[data-home-family-option]')];return {ids:cards.map(card=>card.dataset.homeFamily),optionIds:options.map(option=>option.dataset.homeFamilyOption),valveHref:cards.find(card=>card.dataset.homeFamily==='valves-strainers')?.href,accessoryHref:cards.find(card=>card.dataset.homeFamily==='pressure-gauges-accessories')?.href}})()`);
    assert(state.ids.length===15&&new Set(state.ids).size===15&&state.ids.includes(valveGroup)&&state.ids.includes(accessories)&&!state.ids.some(id=>valveMembers.includes(id)),`${locale} homepage group cards mismatch`);
    assert(same(state.optionIds,state.ids),`${locale} homepage inquiry choices do not match browse groups`);
    assert(new URL(state.valveHref).searchParams.get('category')===valveGroup&&new URL(state.accessoryHref).searchParams.get('category')===accessories,`${locale} homepage links lost group filters`);
    await layout(client);
    await evaluate(client,"document.querySelector('[data-home-family]').scrollIntoView({block:'start'})");
    await screenshot(client,`${locale}-home-browse-groups.png`);
    homeChecks.push({locale,file,status:'PASS',cards:15,valves:1,accessories:1});
  }
  const result={status:'PASS',generatedAt:new Date().toISOString(),browser:version.product,staticChecks,checks,homeChecks,screenshots};
  fs.writeFileSync(path.join(evidence,'browser-validation.json'),JSON.stringify(result,null,2)+'\n');
  console.log(`Browse group browser validation PASS: ${checks.length} bilingual viewport scenarios; ${homeChecks.length} localized homepages; ${screenshots.length} screenshots.`);
}catch(error){
  if(client){try{await screenshot(client,'failure.png');}catch{}}
  fs.writeFileSync(path.join(evidence,'failure.json'),JSON.stringify({status:'FAIL',scenario:activeScenario,message:error.message,stack:error.stack,generatedAt:new Date().toISOString(),completed:checks,screenshots},null,2)+'\n');
  throw error;
}finally{
  client?.close();browser.kill();server.close();
}
