import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {PRODUCT_FAMILIES,flatProducts} from '../site-src/_data/productDirectory.js';
import {thumbnailFor} from '../site-src/_data/catalogThumbnails.js';
const sources=[...new Set(PRODUCT_FAMILIES.flatMap(flatProducts).map(p=>p.image))];
const jobs=sources.map(source=>({source,output:thumbnailFor(source)}));
fs.mkdirSync('assets/catalog-thumbnails',{recursive:true});
const expectedOutputs=new Set(jobs.map(job=>path.resolve(job.output).toLowerCase()));
let removed=0;
for(const name of fs.readdirSync('assets/catalog-thumbnails')){
 if(!/^[a-f0-9]{24}-480\.webp$/i.test(name))continue;
 const file=`assets/catalog-thumbnails/${name}`;
 const comparable=path.resolve(file).toLowerCase();
 if(!expectedOutputs.has(comparable)){
  fs.rmSync(file);
  removed++;
 }
}
const result=spawnSync('python',['-X','utf8','-c',`
import sys,json,os
from PIL import Image,ImageOps
jobs=json.load(sys.stdin)
for job in jobs:
 if not os.path.exists(job['output']):
  with Image.open(job['source']) as original:
   im=ImageOps.exif_transpose(original).convert('RGBA')
   im.thumbnail((480,480),Image.Resampling.LANCZOS)
   bg=Image.new('RGB',im.size,'white');bg.paste(im,mask=im.getchannel('A'))
   bg.save(job['output'],'WEBP',quality=82,method=6)
 job['sourceBytes']=os.path.getsize(job['source'])
 job['thumbnailBytes']=os.path.getsize(job['output'])
print(json.dumps(jobs))
`],{input:JSON.stringify(jobs),encoding:'utf8'});
if(result.status!==0)throw new Error(result.stderr||'Thumbnail generation requires Python with Pillow');
const records=JSON.parse(result.stdout);
fs.writeFileSync('assets/catalog-thumbnails/manifest.json',JSON.stringify(records,null,2)+'\n');
console.log(`Catalog thumbnails: ${records.length}, ${records.reduce((n,r)=>n+r.sourceBytes,0)} -> ${records.reduce((n,r)=>n+r.thumbnailBytes,0)} bytes; removed ${removed} stale thumbnails.`);
