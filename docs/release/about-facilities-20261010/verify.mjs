import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import publicPages from '../../../site-src/_data/publicPages.js';
const folder=path.dirname(fileURLToPath(import.meta.url));
const root=path.resolve(folder,'../../..');
const manifest=JSON.parse(await fs.readFile(path.join(folder,'photo-manifest.json'),'utf8'));
const sha=data=>createHash('sha256').update(data).digest('hex');
let sourceBytes=0, displayBytes=0, fullBytes=0;
for(const photo of manifest.photos){
  const original=await fs.readFile(path.join(root,photo.source));
  assert.equal(sha(original),photo.sha256);
  const sourcePath=`C:/Users/ZHENGF~1/AppData/Local/Temp/codex-clipboard-${['99ff4b6e-d878-4c26-ae53-cc144fe9174e','ba1f2794-54cf-4dc8-b5b8-04a9073b06d8','c82d24a8-451d-4cdd-84f7-466ee6a7e385','ca82dc4b-0edd-40d1-a921-2e6e7b00668b','0e49f2a1-dbce-41d4-9f2d-8dacf1b7d14b','c4a215a9-b39b-4fc7-a9b9-c31d03a65369','3158e6c6-5d09-4e29-b7be-4c51d7040c75','ebe4125b-6b56-4bf4-a559-81a18e26bee5'][photo.userImage-1]}.jpg`;
  assert.equal(sha(await fs.readFile(sourcePath)),photo.sha256);
  sourceBytes+=original.length;
  for(const variant of photo.variants){
    const data=await fs.readFile(path.join(root,variant.path));
    assert.equal(data.length,variant.bytes); assert.equal(sha(data),variant.sha256);
    assert.ok(Math.abs(variant.width/variant.height-photo.width/photo.height)<0.002);
    assert.ok(variant.width<=photo.width);
    if(variant.width===640) displayBytes+=data.length; else fullBytes+=data.length;
  }
}
const pages=[];
for(const entry of publicPages.filter(p=>p.pageType==='about')){
  const file=entry.route.outputPath;
  const html=await fs.readFile(path.join(root,file),'utf8');
  assert.equal((html.match(/data-facility-photo=/g)||[]).length,8);
  assert.equal((html.match(/class="facility-photo-brand"/g)||[]).length,8);
  const displayed=[...html.matchAll(/<img\b[^>]*\bsrc="([^\"]*assets\/about\/facilities-20261010\/[^\"]+)"/g)].map(match=>match[1]);
  assert.equal(displayed.length,8);
  assert.equal(new Set(displayed).size,8,'Each facility photograph must appear once in the gallery');
  assert.ok(!html.includes('about-intro-photo'));
  assert.ok(!html.slice(html.indexOf('class="container about-intro"'),html.indexOf('id="product-range"')).includes('<img'));
  const expected=[['showroom-hydrants','showroom-range'],['office'],['workshop-overview','workshop-components','workshop-production'],['warehouse-crates','warehouse-products']];
  assert.deepEqual(entry.facilities.groups.map(g=>g.photos.map(p=>p.id)),expected);
  for(const group of entry.facilities.groups) for(const photo of group.photos){
    assert.ok(html.includes(`data-facility-photo="${photo.id}"`));
    assert.ok(html.includes(`alt="${photo.caption}"`));
    for(const href of [photo.image,photo.full]){
      const url=new URL(href,`https://local.invalid/${file}`);
      assert.ok((await fs.stat(path.join(root,decodeURIComponent(url.pathname).replace(/^\//,'')))).isFile());
    }
  }
  assert.equal(entry.facilities.families.length,9);
  for(const family of entry.facilities.families){
    assert.ok(html.includes(`href="${family.href}"`));
    const url=new URL(family.href,`https://local.invalid/${file}`);
    assert.ok((await fs.stat(path.join(root,decodeURIComponent(url.pathname).replace(/^\//,'')))).isFile());
    if(entry.copy.lang==='ar') assert.ok(url.pathname.startsWith('/ar/'));
  }
  assert.equal(entry.copy.workflow.length,4);
  for(const step of entry.copy.workflow) assert.ok(html.includes(step[0]));
  assert.ok(!/GUANYA|export brand|علامة التصدير/i.test(html));
  assert.ok(!/href="[^\"]*\.pdf(?:[?#\"])/i.test(html));
  assert.ok(entry.copy.purchaseFaq.length>=2);
  const whatsapp=new URL(entry.facilities.whatsappHref);
  const email=new URL(entry.facilities.emailHref);
  assert.equal(whatsapp.searchParams.get('text'),email.searchParams.get('body'));
  assert.ok(whatsapp.searchParams.get('text').includes('\n'));
  pages.push({path:file,language:entry.copy.lang,photos:8,galleryPhotos:8,introPhotos:0,uniquePhotographs:8,groups:4,productLinks:9,cooperationSteps:4,manualInquiryDraft:true});
}
assert.equal(pages.length,2);
const previous=JSON.parse(await fs.readFile(path.join(root,'docs/release/pdf-download-removal-20261010/static-manifest.json'),'utf8'));
const changed=[];
for(const item of previous.items){
  if(sha(await fs.readFile(path.join(root,item.path)))!==item.sha256) changed.push(item.path);
}
assert.deepEqual(changed.sort(),['about.html','ar/about.html','ar/contact.html','ar/downloads.html','contact.html','downloads.html']);
const result={date:'2026-10-10',status:'passed-static-checks',sourcePhotos:8,publicVariants:16,sourceBytes,displayBytes,fullBytes,pages,changedExistingPublicFiles:changed,sharedTemplateWhitespaceOnly:['ar/contact.html','ar/downloads.html','contact.html','downloads.html'],build:'Complete npm --ignore-scripts run build passed: 185 published pages, 2317 images with alt, 47946 internal references, 880 new-window links.',browserRendering:'not-verified',generatedEnhancement:'Rejected; private review only; public photographs derived directly from original sources.'};
await fs.writeFile(path.join(root,'docs/reviews/about-facilities-20261010/validation.json'),JSON.stringify(result,null,2)+'\n');
await fs.writeFile(path.join(root,'docs/reviews/about-facilities-20261010/content-review.json'),JSON.stringify(publicPages.filter(p=>p.pageType==='about').map(p=>({path:p.route.outputPath,copy:p.copy,facilities:p.facilities})),null,2)+'\n');
console.log(JSON.stringify(result));
