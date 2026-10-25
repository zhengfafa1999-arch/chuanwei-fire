import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import {spawn} from 'node:child_process';
import {SITE_ROUTES} from '../site-src/_data/siteRoutes.js';
const newProducts=JSON.parse(fs.readFileSync('docs/release/alibaba-five-products-20261025/source-review.json','utf8')).registrations;
const root=process.cwd();
const evidence=path.join(root,'docs/evidence/alibaba-five-products-20261025');
const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
let activeScenario='startup',browser,client;
const checks=[],listingChecks=[],screenshots=[];
const viewports=[{id:'desktop',width:1440,height:1000},{id:'mobile',width:390,height:844}];
function workspaceServer() {
  return http.createServer((request,response) => {
    try {
      let relative = decodeURIComponent(new URL(request.url,'http://localhost').pathname).replace(/^\/+/, '') || 'index.html';
      if (relative.endsWith('/')) relative += 'index.html';
      const file = path.resolve(root,relative);
      assert(file.startsWith(root+path.sep) && fs.statSync(file).isFile());
      response.setHeader('Content-Type', ({'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.json':'application/json','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml'})[path.extname(file)] || 'application/octet-stream');
      response.setHeader('Cache-Control','no-store');
      fs.createReadStream(file).pipe(response);
    } catch { response.writeHead(404); response.end('Not found'); }
  });
}
async function reservePort() {
  const temporary = http.createServer();
  await new Promise(resolve => temporary.listen(0,'127.0.0.1',resolve));
  const {port} = temporary.address();
  await new Promise(resolve => temporary.close(resolve));
  return port;
}
async function debugTarget(port) {
  for(let attempt=0;attempt<80;attempt++) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/list`);
      if(response.ok) { const target=(await response.json()).find(item=>item.type==='page'); if(target?.webSocketDebuggerUrl)return target; }
    } catch(error) { if(attempt===79)throw error; }
    await delay(100);
  }
  throw new Error('Edge debugging target unavailable');
}
class DevToolsClient {
  constructor(url) { this.socket=new WebSocket(url); this.nextId=1; this.pending=new Map(); }
  async connect() {
    await new Promise((resolve,reject)=>{this.socket.addEventListener('open',resolve,{once:true});this.socket.addEventListener('error',reject,{once:true});});
    this.socket.addEventListener('message',event=>{
      const message=JSON.parse(event.data),request=this.pending.get(message.id);
      if(!request)return;this.pending.delete(message.id);clearTimeout(request.timer);
      message.error?request.reject(new Error(message.error.message)):request.resolve(message.result);
    });
  }
  send(method,params={}) {
    const id=this.nextId++;
    return new Promise((resolve,reject)=>{
      const timer=setTimeout(()=>{this.pending.delete(id);reject(new Error(`CDP timeout: ${method}`));},20000);
      this.pending.set(id,{resolve,reject,timer});this.socket.send(JSON.stringify({id,method,params}));
    });
  }
  close() { for(const request of this.pending.values())clearTimeout(request.timer);this.socket.close(); }
}
async function evaluate(expression) {
  const result=await client.send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});
  if(result.exceptionDetails)throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
  return result.result.value;
}
async function waitUntil(expression,label) {
  for(let attempt=0;attempt<100;attempt++) { if(await evaluate(expression))return;await delay(100); }
  throw new Error(`Timed out: ${label}`);
}
async function inspectLayout() {
  await evaluate(`Promise.all([...document.images].map(image=>{image.loading='eager';return image.decode().catch(()=>{})}))`);
  const result=await evaluate(`({overflow:Math.max(document.documentElement.scrollWidth,document.body.scrollWidth)-innerWidth,broken:[...document.images].filter(image=>!image.complete||!image.naturalWidth).map(image=>image.currentSrc||image.src),lang:document.documentElement.lang,dir:document.documentElement.dir})`);
  assert(result.overflow<=1 && !result.broken.length,`${activeScenario}: ${JSON.stringify(result)}`);
  return result;
}
async function navigate(file) {
  await client.send('Page.navigate',{url:'http://127.0.0.1:'+server.address().port+'/'+encodeURI(file)});
  await waitUntil(`document.readyState==='complete' && decodeURIComponent(location.pathname)===${JSON.stringify('/'+file)}`,'navigation');
}
async function screenshot(name,selector) {
  await evaluate(`document.querySelector(${JSON.stringify(selector)}).scrollIntoView({block:'start',behavior:'instant'})`);
  await delay(100);
  const result=await client.send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
  fs.writeFileSync(path.join(evidence,name),Buffer.from(result.data,'base64'));screenshots.push(name);
}
const server=workspaceServer();
try {
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const port=await reservePort();
  browser=spawn('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',['--headless=new','--disable-gpu','--remote-allow-origins=*','--remote-debugging-port='+port,'--user-data-dir='+path.join(os.tmpdir(),'alibaba-five-'+process.pid),'about:blank'],{stdio:'ignore',windowsHide:true});
  client=new DevToolsClient((await debugTarget(port)).webSocketDebuggerUrl);await client.connect();await client.send('Page.enable');
  const version=await client.send('Browser.getVersion');
  for(const viewport of viewports)for(const locale of ['en','ar']) {
    await client.send('Emulation.setDeviceMetricsOverride',{width:viewport.width,height:viewport.height,deviceScaleFactor:1,mobile:viewport.id==='mobile'});
    for(const group of newProducts) {
      activeScenario=`${group.id}-${locale}-${viewport.id}`;
      const file=SITE_ROUTES[group.routeId].locales[locale].outputPath;
      const product=JSON.parse(fs.readFileSync(`site-src/_data/documented-products/${group.id}.json`,'utf8'));
      await navigate(file);const layout=await inspectLayout();
      assert.equal(layout.lang,locale);assert.equal(layout.dir,locale==='ar'?'rtl':'ltr');
      const state=await evaluate(`({title:document.querySelector('h1').textContent,rows:document.querySelectorAll('#models tbody tr').length,thumbs:document.querySelectorAll('.pdp-gallery__thumb').length,supplement:!!document.querySelector('#configuration-esfr-202-68'),extraPhotos:document.querySelectorAll('[data-product-photo]').length,alternate:document.querySelector('link[rel="alternate"][hreflang="${locale==='en'?'ar':'en'}"]').href})`);
      assert.equal(state.title,group.name[locale]);assert.equal(state.rows,1);assert.equal(state.thumbs,product.gallery.length);
      assert.equal(state.supplement,false);assert.equal(state.extraPhotos,0);
      assert(decodeURIComponent(state.alternate).replace(/index\.html$/,'').endsWith(SITE_ROUTES[group.routeId].locales[locale==='en'?'ar':'en'].outputPath.replace(/index\.html$/,'')));
      const gallery=[];
      for(let index=0;index<product.gallery.length;index++) {
        const result=await evaluate(`(async()=>{
          document.querySelectorAll('.pdp-gallery__thumb')[${index}].click();
          const main=document.querySelector('#galleryMain');await main.decode();main.click();
          const modal=document.querySelector('#productModal'),image=modal.querySelector('img');await image.decode();
          const result={main:decodeURIComponent(new URL(main.src).pathname).slice(1),modal:decodeURIComponent(new URL(image.src).pathname).slice(1),open:modal.classList.contains('open'),caption:document.querySelector('#galleryCaption').textContent,count:document.querySelector('#galleryCount').textContent};
          modal.querySelector('button').click();result.closed=!modal.classList.contains('open');return result;
        })()`);
        const item=product.gallery[index];assert.equal(result.main,product.media[item.media]);assert.equal(result.modal,result.main);assert(result.open&&result.closed);assert.equal(result.caption,product.copy[locale][item.caption]);assert.equal(result.count,`${index+1} / ${product.gallery.length}`);gallery.push(result);
      }
      await evaluate(`document.querySelector('.pdp-gallery__arrow--next').click()`);
      assert.equal(await evaluate(`document.querySelector('#galleryCount').textContent`),`1 / ${product.gallery.length}`);
      await evaluate(`document.querySelector('.pdp-gallery__arrow--prev').click()`);
      assert.equal(await evaluate(`document.querySelector('#galleryCount').textContent`),`${product.gallery.length} / ${product.gallery.length}`);
      await evaluate(`document.querySelector('.pdp-gallery__thumb').click()`);
      await evaluate(`document.querySelector('#galleryMain').click()`);
      await client.send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape'});
      assert(await evaluate(`!document.querySelector('#productModal').classList.contains('open')`),'Escape did not close image');
      if(viewport.id==='mobile'){
        const box=await evaluate(`(()=>{const el=document.querySelector('#galleryMain');el.scrollIntoView({block:'center',behavior:'instant'});const b=el.getBoundingClientRect();return {x:b.x+b.width*0.75,y:b.y+b.height*0.5}})()`);
        assert(await evaluate(`document.elementFromPoint(${box.x},${box.y})?.id==='galleryMain'`),'Swipe target is covered');
        await client.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:box.x,y:box.y}]});
        await client.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:box.x-100,y:box.y}]});
        await client.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
        assert.equal(await evaluate(`document.querySelector('#galleryCount').textContent`),'2 / 2','Mobile swipe failed');
      }
      await screenshot(`${activeScenario}-gallery.png`,'#gallery');
      await screenshot(`${activeScenario}-models.png`,'#models');
      checks.push({scenario:activeScenario,status:'PASS',file,layout,state,gallery});
    }
    activeScenario=`directory-${locale}-${viewport.id}`;
    await navigate(SITE_ROUTES.products.locales[locale].outputPath);
    await waitUntil(`!!document.querySelector('[data-product-finder] .finder-controls:not([hidden])')`,'finder');
    const searches=[];
    for(const group of newProducts){
      await evaluate(`(()=>{document.querySelector('#product-search').value=${JSON.stringify(group.name[locale])};const select=document.querySelector('#product-family');select.value=${JSON.stringify(group.familyId)};select.dispatchEvent(new Event('change'));})()`);
      const result=await evaluate(`[...document.querySelectorAll('#product-results .product-card')].map(card=>({title:card.querySelector('h3').textContent.trim(),href:card.querySelector('.product-card__link').href}))`);
      const exact=result.filter(item=>decodeURIComponent(item.href).includes('/'+group.id+'.html')||decodeURIComponent(item.href).includes('/'+group.id+'/'));assert.equal(exact.length,1,group.id);if(locale==='en')assert.equal(result.length,1,group.id);
      await inspectLayout();searches.push({id:group.id,matchingResults:result.length,...exact[0]});
    }
    listingChecks.push({scenario:activeScenario,status:'PASS',searches});
    for(const family of ['grooved-pipe-fittings','fire-pumps-controllers']){
      await navigate(SITE_ROUTES['category:'+family].locales[locale].outputPath);await inspectLayout();
      const hrefs=await evaluate(`[...document.querySelectorAll('.product-card__link')].map(link=>decodeURIComponent(link.href))`);
      for(const group of newProducts.filter(p=>p.familyId===family))assert(hrefs.some(h=>h.includes(group.id)),'Missing category product '+group.id);
      listingChecks.push({scenario:`category-${family}-${locale}-${viewport.id}`,status:'PASS',searches:[]});
    }
    console.log('PASS '+locale+'/'+viewport.id+': five product pages, gallery controls and category/search links');
  }
  fs.writeFileSync(path.join(evidence,'browser-validation.json'),JSON.stringify({status:'PASS',generatedAt:new Date().toISOString(),browser:version.product,checks,listingChecks,screenshots},null,2)+'\n');
  console.log(`PASS: ${checks.length} detail scenarios, ${checks.reduce((n,c)=>n+c.gallery.length,0)} thumbnail/modal checks, ${listingChecks.length} listing scenarios, ${listingChecks.reduce((n,c)=>n+c.searches.length,0)} model search checks.`);
} catch(error) {
  fs.writeFileSync(path.join(evidence,'browser-failure.json'),JSON.stringify({scenario:activeScenario,message:error.message,checks,listingChecks},null,2)+'\n');throw error;
} finally {client?.close();browser?.kill();await new Promise(resolve=>server.close(resolve));}
