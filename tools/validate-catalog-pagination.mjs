import {PRODUCT_FAMILIES,flatProducts,productSuffix} from '../site-src/_data/productDirectory.js';
import {SITE_ROUTES} from '../site-src/_data/siteRoutes.js';
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';import http from 'node:http';import os from 'node:os';import path from 'node:path';import {spawn,execFileSync} from 'node:child_process';
const delay=ms=>new Promise(r=>setTimeout(r,ms));
const pageSize=12;const totalProducts=PRODUCT_FAMILIES.flatMap(flatProducts).length;const totalPages=Math.ceil(totalProducts/pageSize);const lastPageSize=totalProducts-(totalPages-1)*pageSize;const fdcCount=flatProducts(PRODUCT_FAMILIES.find(f=>f.id==='fire-department-connections')).length;
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


const root=process.cwd();const evidence=root+'/docs/evidence/catalog-pagination';fs.mkdirSync(evidence,{recursive:true});const browserPath=process.env.BROWSER_PATH||'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';const browserProfile=process.env.BROWSER_PROFILE_PATH||path.join(os.tmpdir(),'discovery-'+process.pid);
const protocols=(process.env.TEST_PROTOCOLS||'file,http').split(',');const files=(process.env.TEST_FILES||'products.html,ar/products.html').split(',');const widths=(process.env.TEST_WIDTHS||'1440,390').split(',').map(Number);
const server=http.createServer((req,res)=>{try{let p=decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/^\//,'')||'index.html';if(p.split('/').includes('..'))throw Error('path');if(p.endsWith('/'))p+='index.html';res.setHeader('Content-Type',({html:'text/html; charset=utf-8',css:'text/css',js:'text/javascript',jpg:'image/jpeg',png:'image/png',webp:'image/webp'})[p.split('.').pop()]||'application/octet-stream');const body=fs.readFileSync(root+'/'+p);if(p.startsWith('assets/catalog-thumbnails/'))setTimeout(()=>res.end(body),350);else res.end(body)}catch{res.statusCode=404;res.end('missing')}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));const port=await reservePort();const browser=spawn(browserPath,['--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check','--remote-allow-origins=*','--remote-debugging-port='+port,'--user-data-dir='+browserProfile,'about:blank'],{stdio:'ignore',windowsHide:true});let client;const checks=[];const verify=(value,message)=>{if(!value)throw Error(message)};
try{const target=await waitForDebugTarget(port);client=new DevToolsClient(target.webSocketDebuggerUrl);await client.connect();await client.send('Page.enable');
for(const protocol of protocols)for(const file of files)for(const width of widths){
 await client.send('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:false});
 const base=protocol==='file'?pathToFileURL(root+'/'+file).href:'http://127.0.0.1:'+server.address().port+'/'+file;
 await client.send('Page.navigate',{url:base+'?q=&category=&page=1'});await delay(500);
 const urls=[];
 for(let page=1;page<=totalPages;page++){
  const state=await evaluate(client,'({cards:Array.from(document.querySelectorAll(".product-card:not([hidden]) .product-card__image")).map(a=>a.href),next:document.querySelector("[data-page-next]").disabled,previous:document.querySelector("[data-page-prev]").disabled,overflow:document.documentElement.scrollWidth>innerWidth+1})');
  verify(state.cards.length===(page===totalPages?lastPageSize:pageSize)&&!state.overflow,'Wrong page size/layout '+JSON.stringify(state));
  verify(state.previous===(page===1)&&state.next===(page===totalPages),'Pagination boundary incorrect');urls.push(...state.cards);
  if(page<totalPages){
   await evaluate(client, `(()=>{const buttons=Array.from(document.querySelectorAll('[data-page-next]'));const b=buttons[${page%2===1?1:0}];b.scrollIntoView({behavior:'instant'});b.click()})()`);
   let pageImagesReady=false;for(let attempt=0;attempt<50;attempt++){pageImagesReady=await evaluate(client,'Array.from(document.querySelectorAll(".product-card:not([hidden]) img.finder-js-image")).every(i=>i.complete&&i.naturalWidth>0&&!i.getAttribute("src").startsWith("data:image"))');if(pageImagesReady)break;await delay(100)}
   verify(pageImagesReady,'Next page images failed to appear without refresh');
  }
 }
 verify(new Set(urls).size===totalProducts,'Pagination skips or repeats products');
 await evaluate(client,'document.querySelector("[data-page-prev]").click()');
 const listUrl=await evaluate(client,'location.href');
 const detail=await evaluate(client,'document.querySelector(".product-card:not([hidden]) .product-card__image").href');
 await client.send('Page.navigate',{url:detail});await delay(500);await evaluate(client,'history.back()');
 for(let n=0;n<50;n++){if(await evaluate(client,'location.href')===listUrl)break;await delay(100)}await delay(300);
 verify(await evaluate(client,`new URLSearchParams(location.search).get("page")==="${totalPages-1}" && document.querySelectorAll("[data-search]:not([hidden])").length===12`),'Back lost page');
 await client.send('Page.reload');await delay(500);
 verify(await evaluate(client,`new URLSearchParams(location.search).get("page")==="${totalPages-1}" && document.querySelectorAll("[data-search]:not([hidden])").length===12`),'Reload lost page');
 await evaluate(client,'(()=>{const q=document.querySelector("#product-search");q.value="standard response";q.dispatchEvent(new Event("input"))})()');
 verify(await evaluate(client,'document.querySelectorAll("[data-search]:not([hidden])").length===3 && new URLSearchParams(location.search).get("page")==="1"'),'Search must cover all pages and reset page');
 await evaluate(client,'document.querySelector("[data-finder-reset]").click();document.querySelector("#product-family").value="fire-department-connections";document.querySelector("#product-family").dispatchEvent(new Event("change"))');
  verify(await evaluate(client,`document.querySelectorAll("[data-search]:not([hidden])").length===${Math.min(pageSize,fdcCount)} && document.querySelector("[data-finder-pagination]").hidden===${fdcCount<=pageSize}`),'Category pagination incorrect');
 await evaluate(client,'document.querySelector("#product-search").value="not-a-product-999";document.querySelector("#product-search").dispatchEvent(new Event("input"))');
 verify(await evaluate(client,'document.querySelectorAll("[data-search]:not([hidden])").length===0 && !document.querySelector("[data-finder-empty]").hidden'),'Empty state incorrect');
 await evaluate(client,'document.querySelector("[data-finder-reset]").click()');
 let resetImagesReady=false;
 for(let n=0;n<50;n++){
  resetImagesReady=await evaluate(client,'Array.from(document.querySelectorAll(".product-card:not([hidden]) img.finder-js-image")).every(i=>i.complete&&i.naturalWidth>0&&!i.getAttribute("src").startsWith("data:image"))');
  if(resetImagesReady)break;
  await delay(100);
 }
 verify(resetImagesReady,'Visible images failed');
 if(protocol==='file'&&file==='products.html'){const shot=await client.send('Page.captureScreenshot',{format:'png'});fs.writeFileSync(evidence+'/page-'+width+'.png',Buffer.from(shot.data,'base64'));}
 checks.push({protocol,file,width,pages:totalPages,uniqueProducts:totalProducts,backAndReload:'PASS',filterAndSearch:'PASS'});
}
fs.writeFileSync(evidence+'/browser-validation.json',JSON.stringify({status:'PASS',checks},null,2));console.log(JSON.stringify(checks));
}finally{client?.close();browser.kill();server.close();}
