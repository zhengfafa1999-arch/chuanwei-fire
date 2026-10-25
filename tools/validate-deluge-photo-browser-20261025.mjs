import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import {spawn} from 'node:child_process';
import {SITE_ROUTES} from '../site-src/_data/siteRoutes.js';
const routes=JSON.parse(fs.readFileSync('docs/reviews/predeploy-content-20261025/routes.json','utf8'));
const changedProducts = ['diaphragm-deluge-valves'];
const root=process.cwd();
const evidence=path.join(root,'docs/reviews/deluge-photo-correction-20261025');
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
  browser=spawn('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',['--headless=new','--disable-gpu','--remote-allow-origins=*','--remote-debugging-port='+port,'--user-data-dir='+path.join(os.tmpdir(),'predeploy-content-'+process.pid),'about:blank'],{stdio:'ignore',windowsHide:true});
  client=new DevToolsClient((await debugTarget(port)).webSocketDebuggerUrl);await client.connect();await client.send('Page.enable');
  const version=await client.send('Browser.getVersion');
  for(const viewport of viewports) {
    await client.send('Emulation.setDeviceMetricsOverride',{width:viewport.width,height:viewport.height,deviceScaleFactor:1,mobile:viewport.id==='mobile'});
    for(const route of routes.filter(route=>changedProducts.some(id=>route.id==='product:'+id))) {
      activeScenario=viewport.id+'/'+route.path;
      try {
        await navigate(route.path);
        const layout=await inspectLayout();
        const content=await evaluate(`({h1:document.querySelector('h1')?.innerText,main:document.querySelector('main')?.innerText.length,internal:/presented in HTML|source photographs|supplier sequence|supplier record|To be confirmed|TODO|TBD|localhost/i.test(document.body.innerText)})`);
        assert(content.h1 && content.main>80 && !content.internal,JSON.stringify(content));
        assert.equal(layout.lang.split('-')[0],route.lang);
        if(route.lang==='ar')assert.equal(layout.dir,'rtl');
        checks.push({scenario:activeScenario,status:'PASS',layout,content});
        const hero=await evaluate(`document.querySelector('.pdp-hero__image img').src`);
        assert(hero.includes('deluge-flanged-user-20261025'), 'Flanged hero must use supplied photograph');
        await screenshot(`deluge-flanged-${route.lang}-${viewport.id}.png`,'.pdp-hero');
        await evaluate(`document.querySelector('[data-gallery-index="1"]').click()`);
        const grooved=await evaluate(`document.querySelector('.wav-gallery__main img').src`);
        assert(grooved.includes('dsc_5728'), 'Grooved selection must use grooved photograph');
        await evaluate(`document.querySelector('[data-gallery-index="0"]').click()`);
        const flanged=await evaluate(`document.querySelector('.wav-gallery__main img').src`);
        assert(flanged.includes('deluge-flanged-user-20261025'), 'Flanged selection must use supplied photograph');
      } catch(error) {
        checks.push({scenario:activeScenario,status:'FAIL',message:error.message});
        console.log('FAIL '+activeScenario+': '+error.message);
      }
      if(checks.length%50===0)console.log('Checked '+checks.length+' page/viewports');
    }
  }
  const failures=checks.filter(c=>c.status==='FAIL');
  fs.writeFileSync(path.join(evidence,'browser-validation.json'),JSON.stringify({status:failures.length?'FAIL':'PASS',generatedAt:new Date().toISOString(),browser:version.product,checks,screenshots},null,2)+'\n');
  assert.equal(failures.length,0,`${failures.length} failed page/viewports`);
  console.log(`PASS: ${checks.length} page/viewports for ${changedProducts.length} updated products (English and Arabic).`);
} finally {client?.close();browser?.kill();await new Promise(resolve=>server.close(resolve));}
