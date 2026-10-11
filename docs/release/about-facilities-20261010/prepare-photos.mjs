import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const sharp = require('C:/Users/zhengfafa/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const folder = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(folder, '../../..');
const output = path.join(root, 'assets/about/facilities-20261010');
const source = path.join(folder, 'source');
const inputs = [
  ['showroom-hydrants', '99ff4b6e-d878-4c26-ae53-cc144fe9174e', '展厅'],
  ['showroom-range', 'ba1f2794-54cf-4dc8-b5b8-04a9073b06d8', '展厅'],
  ['office', 'c82d24a8-451d-4cdd-84f7-466ee6a7e385', '办公室'],
  ['warehouse-crates', 'ca82dc4b-0edd-40d1-a921-2e6e7b00668b', '仓库'],
  ['workshop-overview', '0e49f2a1-dbce-41d4-9f2d-8dacf1b7d14b', '生产加工车间'],
  ['workshop-components', 'c4a215a9-b39b-4fc7-a9b9-c31d03a65369', '生产加工车间'],
  ['workshop-production', '3158e6c6-5d09-4e29-b7be-4c51d7040c75', '生产加工车间'],
  ['warehouse-products', 'ebe4125b-6b56-4bf4-a559-81a18e26bee5', '仓库']
];
const hash = data => createHash('sha256').update(data).digest('hex');
await fs.mkdir(output, {recursive:true});
await fs.mkdir(source, {recursive:true});
const photos = [];
for (const [id, uuid, category] of inputs) {
  const archived = path.join(source, `${id}.jpg`);
  let input;
  try { input = await fs.readFile(archived); }
  catch (error) {
    if (error.code !== 'ENOENT') throw error;
    input = await fs.readFile(`C:/Users/ZHENGF~1/AppData/Local/Temp/codex-clipboard-${uuid}.jpg`);
    await fs.writeFile(archived, input);
  }
  const original = await sharp(input).metadata();
  const variants = [];
  for (const width of [640, 1600]) {
    const filename = `${id}-${width}.webp`;
    const data = await sharp(input).resize({width, withoutEnlargement:true}).webp({quality:82, effort:6}).toBuffer();
    const meta = await sharp(data).metadata();
    if (Math.abs(meta.width / meta.height - original.width / original.height) > 0.002) throw new Error(`Aspect ratio changed: ${id}`);
    await fs.writeFile(path.join(output, filename), data);
    variants.push({path:`assets/about/facilities-20261010/${filename}`, width:meta.width, height:meta.height, bytes:data.length, sha256:hash(data)});
  }
  photos.push({id, userImage:photos.length+1, category, source:`docs/release/about-facilities-20261010/source/${id}.jpg`, width:original.width, height:original.height, bytes:input.length, sha256:hash(input), variants});
}
const manifest = {date:'2026-10-10', authorization:'User supplied eight real facility photographs, identified categories, and requested photo optimization and About integration.', processing:'Original photographs; proportional resize and WebP encoding only. No crop, retouch, generated detail or embedded watermark. CSS brightness(1.06) and HTML brand overlay apply only to page display.', photos};
await fs.writeFile(path.join(folder,'photo-manifest.json'), JSON.stringify(manifest,null,2)+'\n');
console.log(JSON.stringify({photos:photos.length, variants:photos.flatMap(p=>p.variants).length, originalBytes:photos.reduce((n,p)=>n+p.bytes,0), publicBytes:photos.flatMap(p=>p.variants).reduce((n,p)=>n+p.bytes,0), maximumVariantBytes:Math.max(...photos.flatMap(p=>p.variants).map(p=>p.bytes))}));
