import fs from 'node:fs';import http from 'node:http';import os from 'node:os';import path from 'node:path';import {spawn,execFileSync} from 'node:child_process';
const delay=ms=>new Promise(r=>setTimeout(r,ms));
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


const root=process.cwd()+'/outputs/eight-products-release-candidate';const report=JSON.parse(fs.readFileSync(root+'/manifest.json'));const cache=new Map();
const server=http.createServer((req,res)=>{try{let p=decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/^\//,'')||'index.html';if(p.split('/').includes('..'))throw Error('path');if(p.endsWith('/'))p+='index.html';let data;if(fs.existsSync(root+'/public/'+p))data=fs.readFileSync(root+'/public/'+p);else {if(!cache.has(p))cache.set(p,execFileSync('git',['show',report.baseline+':'+p],{maxBuffer:20000000,stdio:['ignore','pipe','ignore']}));data=cache.get(p)}res.setHeader('Content-Type',({html:'text/html; charset=utf-8',css:'text/css',js:'text/javascript',jpg:'image/jpeg',png:'image/png'})[p.split('.').pop()]||'application/octet-stream');res.end(data)}catch{res.statusCode=404;res.end('missing')}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));const port=await reservePort();const browser=spawn('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',['--headless=new','--disable-gpu','--remote-allow-origins=*','--remote-debugging-port='+port,'--user-data-dir='+path.join(os.tmpdir(),'eight-candidate-'+process.pid),'about:blank'],{stdio:'ignore',windowsHide:true});let client;const checks=[];
try{const target=await waitForDebugTarget(port);client=new DevToolsClient(target.webSocketDebuggerUrl);await client.connect();await client.send('Page.enable');
for(const f of report.files.filter(f=>f.path.endsWith('.html')&&!f.baselineSha256)){for(const width of [1440,390,320]){await client.send('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:false});await client.send('Page.navigate',{url:'http://127.0.0.1:'+server.address().port+'/'+encodeURI(f.path)});await delay(400);for(let i=0;i<50;i++){if(await evaluate(client,'document.readyState === "complete"'))break;await delay(100)}await evaluate(client,'Promise.all(Array.from(document.images).map(i=>{i.loading="eager";return i.decode().catch(()=>{})}))');const result=await evaluate(client,'({overflow:document.documentElement.scrollWidth>innerWidth+1,images:Array.from(document.images).filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src),lang:document.documentElement.lang,dir:document.documentElement.dir})');checks.push({page:f.path,width,...result});if(result.overflow||result.images.length)throw Error(JSON.stringify(checks.at(-1)));}
}
fs.writeFileSync('docs/release/eight-products-20260909/candidate-browser-validation.json',JSON.stringify({status:'PASS',checks},null,2));console.log('Candidate browser PASS: '+checks.length+' page/viewport checks');}finally{client?.close();browser.kill();server.close();}
