import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {validateImageRights} from './lib/validate-image-rights.mjs';

// A static delta against the existing publication branch. Never pushes or deploys.
const review = 'docs/release/eight-products-20260909';
const out = 'outputs/eight-products-release-candidate';
const publicDir = `${out}/public`;
const baseline = '7c17f6d35cdcb80094886dbe1371218f836f4136';
const git = (...args) => execFileSync('git', args, {maxBuffer:32*1024*1024});
const baselineFiles = new Set(git('-c','core.quotepath=false','ls-tree','-r','--name-only',baseline).toString().trim().split('\n'));
const records = JSON.parse(fs.readFileSync(`${review}/addition-inventory.json`)).records;
const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const written = new Map();
const write = (file, data, reason) => {
  assert(!file.startsWith('/') && !file.split('/').includes('..'));
  const target = `${publicDir}/${file}`;
  fs.mkdirSync(path.dirname(target),{recursive:true});
  fs.writeFileSync(target,data);
  written.set(file,{path:file,reason,sha256:hash(data),baselineSha256:baselineFiles.has(file)?hash(git('show',`${baseline}:${file}`)):null});
};
const relative = (from,to) => path.posix.relative(path.posix.dirname(from),to) || path.posix.basename(to);
const resolve = (from,url) => path.posix.normalize(url.startsWith('/')?url.slice(1):path.posix.join(path.posix.dirname(from),decodeURI(url)));
const collection = lang => lang==='ar'?'ar/new-products.html':'new-products.html';
const escape = text => text.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
const categoryPaths = {
  sprinklers:'products/消防喷头.html',
  'system-valves':'products/消防阀.html',
  'indoor-hydrants':'products/室内消防栓/室内消防栓.html',
  'fire-department-connections':'products/消防水泵接合器.html',
  'hoses-nozzles-couplings':'products/消防水枪.html'
};
const cssPrefix = 'assets/new-products-20260909/';
for (const r of records) {
  const data = JSON.parse(fs.readFileSync(r.sourcePath));
  assert.equal(data.publication.imageRights,'user-confirmed-website-use');
  validateImageRights(data);
  for (const im of r.images) write(im.path,fs.readFileSync(im.path),'approved product image');
  for (const page of r.outputs) {
    let html=fs.readFileSync(page.path,'utf8');
    // Keep navigation within the candidate and preserve the working quotation links.
    html=html.replace(/\s*<a\b[^>]*data-site-nav-item="(?:about|downloads|contact)"[^>]*>[\s\S]*?<\/a>/g,'');
    html=html.replace('data-content-status="local-draft"','data-content-status="release-candidate"');
    html=html.replace(/\b(href|src)="([^"#]+)"/g,(whole,attr,url)=>{
      if (/^(?:[a-z]+:|\/\/)/i.test(url)) return whole;
      const [raw,fragment] = url.split('#');
      const target=resolve(page.path,raw);
      let dest=target;
      if (/\.(?:css|js)$/.test(target)) {
        dest=cssPrefix+target;
        const bytes=fs.readFileSync(target);
        // Current product styles have no file imports; fail if this assumption changes.
        if (target.endsWith('.css')) assert(!/@import|url\(/i.test(bytes.toString()),`Review CSS dependencies: ${target}`);
        write(dest,bytes,'isolated product style/script');
      } else if (Object.values(categoryPaths).includes(target) || /^ar\/products\/[^/]+\/index.html$/.test(target) && !records.some(x=>x.outputs.some(o=>o.path===target))) {
        dest=collection(page.locale)+'#'+r.category;
      } else if (['products.html','ar/products.html','ar/index.html'].includes(target)) dest=collection(page.locale);
      return `${attr}="${relative(page.path,dest)}${fragment?'#'+fragment:''}"`;
    });
    write(page.path,html,'new localized product page; compatible navigation');
  }
}
const cards = (subset,lang,from) => subset.map(r=>{
  const data=JSON.parse(fs.readFileSync(r.sourcePath));
  const page=r.outputs.find(o=>o.locale===lang);
  return `<a class="new-product-card" href="${escape(relative(from,page.path))}"><img src="${escape(relative(from,data.media.hero))}" alt="${escape(data.copy[lang].title)}" loading="lazy"><strong>${escape(data.copy[lang].title)}</strong></a>`;
}).join('\n');
const style='.new-product-list{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,230px),1fr));gap:20px}.new-product-card{padding:18px;border:1px solid #dce2e7;border-radius:12px;background:#fff;color:#163044;text-decoration:none;display:flex;flex-direction:column;gap:15px}.new-product-card img{width:100%;height:190px;object-fit:contain}.new-product-entry{max-width:1200px;margin:32px auto;padding:24px;font:16px/1.6 system-ui}.new-product-entry a{overflow-wrap:anywhere}';
for(const lang of ['en','ar']) {
  const file=collection(lang), title=lang==='ar'?'المنتجات الجديدة':'New Products';
  const body=Object.keys(categoryPaths).map(category=>`<section id="${category}"><div class="new-product-list">${cards(records.filter(r=>r.category===category),lang,file)}</div></section>`).join('<hr>');
  write(file,`<!doctype html><html lang="${lang}" dir="${lang==='ar'?'rtl':'ltr'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} | CHUANWEI FIRE</title><link rel="canonical" href="https://chuanweifire.com/${file}"><link rel="alternate" hreflang="en" href="https://chuanweifire.com/new-products.html"><link rel="alternate" hreflang="ar" href="https://chuanweifire.com/ar/new-products.html"><style>${style}body{margin:0;background:#f5f7fa;color:#163044}header{display:flex;flex-wrap:wrap;justify-content:space-between;gap:20px}hr{border:0;margin:24px}h1{font-size:32px}</style></head><body><main class="new-product-entry"><header><a href="${relative(file,'index.html')}">CHUANWEI FIRE · ${lang==='ar'?'الموقع الرئيسي (EN)':'Company website'}</a><nav><a href="${relative(file,collection('en'))}" lang="en">EN</a> · <a href="${relative(file,collection('ar'))}" lang="ar">العربية</a></nav></header><h1>${title}</h1>${body}</main></body></html>`,'new bilingual product collection');
}
const baselinePages=['index.html',...Object.values(categoryPaths)];
for (const file of baselinePages) {
  let original=git('show',`${baseline}:${file}`).toString();
  const category=Object.entries(categoryPaths).find(([,p])=>p===file)?.[0];
  const subset=category?records.filter(r=>r.category===category):records;
  const block=`\n<!-- EIGHT-PRODUCT-ADDITIONS:BEGIN -->\n<style>${style}</style><section class="new-product-entry" aria-label="New products"><h2 data-en="New Products" data-zh="新品">New Products</h2><p><a href="${relative(file,collection('en'))}" data-en="View new products" data-zh="查看新品">View new products</a> · <a href="${relative(file,collection('ar'))}" lang="ar">المنتجات الجديدة</a></p><div class="new-product-list">${cards(subset,'en',file)}</div></section>\n<!-- EIGHT-PRODUCT-ADDITIONS:END -->\n`;
  const anchor=original.includes('</main>')?'</main>':'</body>';
  assert(original.includes(anchor));
  const changed=original.replace(anchor,block+anchor);
  assert.equal(changed.replace(block,''),original,'Only additive entry block may change existing pages');
  write(file,changed,'existing publication page: additive new-product entry only');
}
// Check every reference in new pages against the candidate plus the publication baseline.
let checked=0;
const missing=[];
for(const file of written.keys()) {
  if(!file.endsWith('.html') || baselinePages.includes(file))continue;
  const html=fs.readFileSync(`${publicDir}/${file}`,'utf8');
  for(const match of html.matchAll(/\b(?:href|src|data-lightbox)="([^"]+)"/g)) {
    const url=match[1];
    if(/^(?:[a-z]+:|\/\/)/i.test(url))continue;
    const [raw,frag]=url.split('#');
    const dest=raw?resolve(file,raw):file;
    if(!written.has(dest)&&!baselineFiles.has(dest))missing.push(`${file} -> ${url}`);
    else if(frag) {
      const target=written.has(dest)?fs.readFileSync(`${publicDir}/${dest}`,'utf8'):git('show',`${baseline}:${dest}`).toString();
      if(!target.includes(`id="${frag}"`))missing.push(`${file} -> missing anchor ${url}`);
    }
    checked++;
  }
}
assert.equal(missing.length,0,missing.join('\n'));
const report={generatedAt:new Date().toISOString(),state:'local-release-candidate-not-deployed',baseline,products:8,localizedProductPages:16,images:15,existingPagesChanged:baselinePages,linksChecked:checked,missingLinks:missing,files:[...written.values()]};
fs.mkdirSync(out,{recursive:true});
fs.writeFileSync(`${out}/manifest.json`,JSON.stringify(report,null,2)+'\n');
fs.writeFileSync(`${review}/candidate-manifest.json`,JSON.stringify(report,null,2)+'\n');
console.log(`Candidate: ${written.size} files, ${checked} references checked; only ${baselinePages.length} existing entry pages amended. No deployment performed.`);
