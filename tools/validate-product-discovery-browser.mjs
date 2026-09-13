import {PRODUCT_FAMILIES,flatProducts,productSuffix} from '../site-src/_data/productDirectory.js';
import {SITE_ROUTES} from '../site-src/_data/siteRoutes.js';
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';import http from 'node:http';import os from 'node:os';import path from 'node:path';import {spawn,execFileSync} from 'node:child_process';
const delay=ms=>new Promise(r=>setTimeout(r,ms));
const pageSize=12;const totalProducts=PRODUCT_FAMILIES.flatMap(flatProducts).length;const sprinklerCount=flatProducts(PRODUCT_FAMILIES.find(f=>f.id==='sprinklers')).length;
async function reservePort() {
  const server = http.createServer();
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address();
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  return port;
}

async function waitForDebugTarget(port) {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/list`);
      if (response.ok) {
        const targets = await response.json();
        const page = targets.find((target) => target.type === "page");
        if (page?.webSocketDebuggerUrl) return page;
      }
    } catch (error) {
      if (attempt === 49) throw error;
    }
    await delay(100);
  }
  throw new Error("Microsoft Edge did not expose a page debugging target.");
}

class DevToolsClient {
  constructor(webSocketUrl) {
    this.socket = new WebSocket(webSocketUrl);
    this.nextId = 1;
    this.pending = new Map();
  }

  async connect() {
    await new Promise((resolve, reject) => {
      this.socket.addEventListener("open", resolve, { once: true });
      this.socket.addEventListener("error", reject, { once: true });
    });
    this.socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (!message.id) return;
      const request = this.pending.get(message.id);
      if (!request) return;
      this.pending.delete(message.id);
      if (message.error) request.reject(new Error(message.error.message));
      else request.resolve(message.result);
    });
  }

  send(method, params = {}) {
    const id = this.nextId;
    this.nextId += 1;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.socket.send(JSON.stringify({ id, method, params }));
    });
  }

  close() {
    this.socket.close();
  }
}

async function evaluate(client, expression) {
  const result = await client.send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text || "Browser evaluation failed.");
  return result.result.value;
}


const root=process.cwd();const evidence=root+'/docs/evidence/product-discovery';fs.mkdirSync(evidence,{recursive:true});
const server=http.createServer((req,res)=>{try{let p=decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/^\//,'')||'index.html';if(p.split('/').includes('..'))throw Error('path');if(p.endsWith('/'))p+='index.html';res.setHeader('Content-Type',({html:'text/html; charset=utf-8',css:'text/css',js:'text/javascript',jpg:'image/jpeg',png:'image/png'})[p.split('.').pop()]||'application/octet-stream');res.end(fs.readFileSync(root+'/'+p))}catch{res.statusCode=404;res.end('missing')}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));const port=await reservePort();const browser=spawn('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',['--headless=new','--disable-gpu','--remote-allow-origins=*','--remote-debugging-port='+port,'--user-data-dir='+path.join(os.tmpdir(),'discovery-'+process.pid),'about:blank'],{stdio:'ignore',windowsHide:true});let client;const checks=[];const verify=(value,message)=>{if(!value)throw Error(message)};
try{const target=await waitForDebugTarget(port);client=new DevToolsClient(target.webSocketDebuggerUrl);await client.connect();await client.send('Page.enable');
for(const file of ['products.html','ar/products.html','index.html','ar/index.html','zh/index.html','products/消防喷头/fusible-alloy-fire-sprinklers.html','ar/products/fusible-alloy-fire-sprinklers/index.html']){for(const width of [1440,768,390,320]){await client.send('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:false});await client.send('Page.navigate',{url:process.argv.includes('--file-preview') ? pathToFileURL(root+'/'+file).href : 'http://127.0.0.1:'+server.address().port+'/'+encodeURI(file)});await delay(300);for(let i=0;i<60;i++){if(await evaluate(client,'document.readyState === "complete"'))break;await delay(100)}await evaluate(client,'Promise.all(Array.from(document.images).map(i=>{i.loading="eager";return i.decode().catch(()=>{})}))');let result=await evaluate(client,'({overflow:document.documentElement.scrollWidth>innerWidth+1,broken:Array.from(document.images).filter(i=>!i.naturalWidth).length})');verify(!result.overflow&&!result.broken,JSON.stringify({file,width,result}));
if(file==='products.html'||file==='ar/products.html'){
 const test=await evaluate(client,`(()=>{const input=document.querySelector('#product-search'),select=document.querySelector('#product-family');const visible=()=>Array.from(document.querySelectorAll('[data-search]')).filter(c=>!c.hidden).length;const total=visible();input.value='fusible';input.dispatchEvent(new Event('input'));const search=visible();select.value='system-valves';select.dispatchEvent(new Event('change'));const combined=visible();document.querySelector('[data-finder-reset]').click();select.value='sprinklers';select.dispatchEvent(new Event('change'));const category=visible();document.querySelector('[data-finder-reset]').click();input.value='رشاشات';input.dispatchEvent(new Event('input'));const arabic=visible();input.value='no-such-product-999';input.dispatchEvent(new Event('input'));const empty=!document.querySelector('[data-finder-empty]').hidden;document.querySelector('[data-finder-reset]').click();return{total,search,combined,category,arabic,empty,reset:visible()}})()`);
  verify(test.total===Math.min(pageSize,totalProducts)&&test.search===2&&test.combined===0&&test.category===Math.min(pageSize,sprinklerCount)&&test.arabic>0&&test.empty&&test.reset===test.total,JSON.stringify(test));
}

if(file==='products.html'||file==='ar/products.html'){
 await evaluate(client, "(()=>{document.querySelector('#product-search').value='oblique';document.querySelector('#product-family').value='indoor-hydrants';document.querySelector('#product-search').dispatchEvent(new Event('input'))})()");
 const original=await evaluate(client,'location.href');
 const destination=await evaluate(client,`document.querySelector(".product-card:not([hidden]) a[href*='#configuration-']").href`);
 await client.send('Page.navigate',{url:destination});await delay(400);
  verify(await evaluate(client,'document.querySelectorAll(".configuration-card").length>0 && Boolean(document.querySelector(location.hash))'),'Configuration panels missing');
 await evaluate(client,'history.back()');for(let i=0;i<60;i++){if(await evaluate(client,'location.href')===original)break;await delay(100)}await delay(250);
 verify(await evaluate(client,'document.querySelector("#product-search").value==="oblique" && document.querySelector("#product-family").value==="indoor-hydrants"'),'Back lost filters');
 await client.send('Page.reload');await delay(500);
 verify(await evaluate(client,'document.querySelector("#product-search").value==="oblique" && document.querySelector("#product-family").value==="indoor-hydrants"'),'Reload lost filters');
 await evaluate(client,'document.querySelector("[data-finder-reset]").click()');
}
await evaluate(client,`(()=>{const t=document.querySelector('[data-nav-toggle]');if(getComputedStyle(t).display!=='none')t.click();document.querySelector('.global-product-menu summary').click()})()`);result=await evaluate(client,'({open:document.querySelector(".global-product-menu").open,count:document.querySelectorAll(".global-product-groups a").length,overflow:document.documentElement.scrollWidth>innerWidth+1})');verify(result.open&&result.count>40&&!result.overflow,JSON.stringify({file,width,result}));
if(width<=980){verify(await evaluate(client,'Array.from(document.querySelectorAll(".global-product-group")).every(g=>!g.open)'), 'Mobile groups must start collapsed');await evaluate(client,'document.querySelector(".global-product-group>summary").click()');verify(await evaluate(client,'document.querySelector(".global-product-group").open'),'Category did not expand');}
if((file==='products.html'||file==='ar/products.html')&&(width===1440||width===390)){const shot=await client.send('Page.captureScreenshot',{format:'png'});fs.writeFileSync(evidence+'/'+(file.startsWith('ar')?'ar':'en')+'-menu-'+width+'.png',Buffer.from(shot.data,'base64'));}
await client.send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape'});verify(await evaluate(client,'!document.querySelector(".global-product-menu").open'),'Escape did not close menu');checks.push({file,width,status:'PASS'});
}}

const configurationChecks=[];
for(const product of PRODUCT_FAMILIES.flatMap(flatProducts).filter(p=>p.view))for(const locale of ['en','ar']){
 const file=SITE_ROUTES[product.routeId].locales[locale].outputPath;
 const url=(process.argv.includes('--file-preview')?pathToFileURL(root+'/'+file).href:'http://127.0.0.1:'+server.address().port+'/'+encodeURI(file))+productSuffix(product);
 await client.send('Page.navigate',{url});await delay(300);for(let i=0;i<60;i++){if(await evaluate(client,'document.readyState === "complete"'))break;await delay(100)}await delay(150);
 const result=await evaluate(client, '(()=>{const selected=new URLSearchParams(location.search).get("view");const b=Array.from(document.querySelectorAll("button")).find(b=>(b.matches("[data-gallery-index], [data-index], .pdp-gallery__thumb")||b.closest("[class*=thumbs]"))&&b.querySelector("img")&&decodeURIComponent(new URL(b.querySelector("img").src).pathname).endsWith("/"+selected));return {found:!!b,active:!!b&&(b.classList.contains("active")||b.getAttribute("aria-pressed")==="true")}})()');
 verify(result.found&&result.active,JSON.stringify({file,view:product.view,result}));configurationChecks.push({file,view:product.view,status:'PASS'});
}
fs.writeFileSync(evidence+'/configuration-links'+(process.argv.includes('--file-preview')?'-file':'-http')+'.json',JSON.stringify(configurationChecks,null,2));
fs.writeFileSync(evidence+(process.argv.includes('--file-preview')?'/file-browser-validation.json':'/browser-validation.json'),JSON.stringify({status:'PASS',checks},null,2));console.log('Discovery browser PASS: '+checks.length+' page/viewport checks, bilingual search, combined filtering, reset and menu Escape.');}finally{client?.close();browser.kill();server.close();}
