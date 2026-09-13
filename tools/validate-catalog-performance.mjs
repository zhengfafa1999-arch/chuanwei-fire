import {PRODUCT_FAMILIES,flatProducts,productSuffix} from '../site-src/_data/productDirectory.js';
import {SITE_ROUTES} from '../site-src/_data/siteRoutes.js';
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';import http from 'node:http';import os from 'node:os';import path from 'node:path';import {spawn,execFileSync} from 'node:child_process';
const delay=ms=>new Promise(r=>setTimeout(r,ms));
const pageSize=12;const totalProducts=PRODUCT_FAMILIES.flatMap(flatProducts).length;const fdcVisible=Math.min(pageSize,flatProducts(PRODUCT_FAMILIES.find(f=>f.id==='fire-department-connections')).length);
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


const root=process.cwd();const evidence=root+'/docs/evidence/catalog-performance';fs.mkdirSync(evidence,{recursive:true});const browserPath=process.env.BROWSER_PATH||'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';const browserProfile=process.env.BROWSER_PROFILE_PATH||path.join(os.tmpdir(),'discovery-'+process.pid);
const server=http.createServer((req,res)=>{try{let p=decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/^\//,'')||'index.html';if(p.split('/').includes('..'))throw Error('path');if(p.endsWith('/'))p+='index.html';res.setHeader('Content-Type',({html:'text/html; charset=utf-8',css:'text/css',js:'text/javascript',jpg:'image/jpeg',png:'image/png',webp:'image/webp'})[p.split('.').pop()]||'application/octet-stream');const body=fs.readFileSync(root+'/'+p);if(p.startsWith('assets/catalog-thumbnails/'))setTimeout(()=>res.end(body),350);else res.end(body)}catch{res.statusCode=404;res.end('missing')}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));const port=await reservePort();const browser=spawn(browserPath,['--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check','--remote-allow-origins=*','--remote-debugging-port='+port,'--user-data-dir='+browserProfile,'about:blank'],{stdio:'ignore',windowsHide:true});let client;const checks=[];const verify=(value,message)=>{if(!value)throw Error(message)};
try{const target=await waitForDebugTarget(port);client=new DevToolsClient(target.webSocketDebuggerUrl);await client.connect();await client.send('Page.enable');
for(const protocol of ['file','http'])for(const file of ['products.html','ar/products.html'])for(const width of [1440,390]){
 await client.send('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:false});
 const base=protocol==='file'?pathToFileURL(root+'/'+file).href:'http://127.0.0.1:'+server.address().port+'/'+file;
 await client.send('Page.navigate',{url:base+'?q=&category='});
 let finderReady=false;for(let attempt=0;attempt<80;attempt++){finderReady=await evaluate(client,'document.querySelector(".finder-controls")?.hidden===false&&document.querySelectorAll(".product-card").length<=12');if(finderReady)break;await delay(50)}verify(finderReady,'Product finder did not initialize');
 await evaluate(client,'(()=>{const c=document.querySelector("#product-family");c.value="fire-department-connections";c.dispatchEvent(new Event("change"))})()');await delay(50);
 await evaluate(client,'(()=>{const c=document.querySelector("#product-family");c.value="sprinklers";c.dispatchEvent(new Event("change"))})()');
 for(let attempt=0;attempt<50;attempt++){if(await evaluate(client,'Array.from(document.querySelectorAll(".product-card:not([hidden]) img.finder-js-image")).every(i=>i.complete&&i.naturalWidth>0&&!i.getAttribute("src").startsWith("data:image"))'))break;await delay(100)}
 const rapidState=await evaluate(client,'Array.from(document.querySelectorAll(".product-card:not([hidden]) img.finder-js-image")).map(i=>({src:i.getAttribute("src"),complete:i.complete,naturalWidth:i.naturalWidth,connected:i.isConnected}))');
 verify(rapidState.every(i=>i.complete&&i.naturalWidth>0&&!i.src.startsWith("data:image")),'Rapid category switch left blank images: '+JSON.stringify(rapidState));
 await evaluate(client,'document.querySelector("[data-finder-reset]").click()');await delay(700);
 const initial=await evaluate(client,'({total:document.querySelectorAll(".product-card:not([hidden]) img.finder-js-image").length,loaded:Array.from(document.querySelectorAll(".product-card:not([hidden]) img.finder-js-image")).filter(i=>i.complete&&i.naturalWidth>0&&!i.getAttribute("src").startsWith("data:image")).length,overflow:document.documentElement.scrollWidth>innerWidth+1})');
  verify(initial.total===Math.min(pageSize,totalProducts)&&initial.loaded<=pageSize&&!initial.overflow,JSON.stringify(initial));
 await client.send('Page.navigate',{url:base+'?q=&category=fire-department-connections'});
 let filtered;for(let attempt=0;attempt<80;attempt++){filtered=await evaluate(client,'({selected:document.querySelector("#product-family")?.value,visible:document.querySelectorAll("[data-search]").length,wrong:Array.from(document.querySelectorAll(".product-card img.finder-js-image")).some(i=>i.closest("[data-family]").dataset.family!=="fire-department-connections")})');if(filtered.selected==='fire-department-connections'&&filtered.visible===fdcVisible&&!filtered.wrong)break;await delay(50)}
  verify(filtered.selected==='fire-department-connections'&&filtered.visible===fdcVisible&&!filtered.wrong,JSON.stringify(filtered));
 await evaluate(client,'document.querySelector("[data-family=fire-department-connections]").scrollIntoView({behavior:"instant"})');
 let filteredImagesReady=false;for(let attempt=0;attempt<50;attempt++){filteredImagesReady=await evaluate(client,'Array.from(document.querySelectorAll("[data-family=fire-department-connections] .product-card img.finder-js-image")).some(i=>i.complete&&i.naturalWidth>0&&!i.getAttribute("src").startsWith("data:image"))');if(filteredImagesReady)break;await delay(100)}
 verify(filteredImagesReady, 'Visible images failed to load');
 await evaluate(client,'(()=>{const c=document.querySelector("#product-family");c.value="sprinklers";c.dispatchEvent(new Event("change"));const cards=Array.from(document.querySelectorAll("[data-family=sprinklers] .product-card:not([hidden])"));cards.at(-1).scrollIntoView({behavior:"instant"})})()');
 let scrollImageReady=false;for(let attempt=0;attempt<50;attempt++){scrollImageReady=await evaluate(client,'(()=>{const cards=Array.from(document.querySelectorAll("[data-family=sprinklers] .product-card:not([hidden])"));const i=cards.at(-1).querySelector("img.finder-js-image");return i.complete&&i.naturalWidth>0&&!i.getAttribute("src").startsWith("data:image")})()');if(scrollImageReady)break;await delay(100)}verify(scrollImageReady,'Scroll/filter image not loaded');
 checks.push({protocol,file,width,initial,filtered,status:'PASS'});
}
fs.writeFileSync(evidence+'/browser-validation.json',JSON.stringify({status:'PASS',checks},null,2));console.log(JSON.stringify(checks));
}finally{client?.close();browser.kill();server.close();}
