import fs from 'node:fs';
import { reviewedPhotoPath } from '../lib/reviewed-product-media.js';
import { productPhotoManifest, productPhotoAnchor } from '../lib/product-photos.js';
const read = relative => JSON.parse(fs.readFileSync(new URL(relative, import.meta.url), 'utf8'));
// Select distinct configurations, excluding packing, detail photos and size/temperature variants.
const documented = {
  'fusible-alloy-fire-sprinklers': [0,1],
  'glass-bulb-fire-sprinkler': [0,1], 'standard-response-fire-sprinkler': [1,2,3],
  'k115-standard-response-fire-sprinkler': [0,1,2], 'k115-quick-response-fire-sprinkler': [0,1,2],
  'horizontal-handwheel-landing-valves': [0,1], 'lever-operated-fire-hose-nozzles': [0,1],
  'straight-stream-fire-hose-nozzles': [0,1]
};
const preserved = {'extended-coverage-quick-response-fire-sprinkler':[0,1,2], 'large-k-factor-esfr-sprinklers':[0,1,2,3,4]};
export function productViews(id) {
  if (id === 'preaction-valve-assemblies') {
    const data = read(`./preserved-products/${id}.json`);
    const flanged = reviewedPhotoPath(data.routeId, data.media.flanged);
    const grooved = productPhotoManifest.photos.find(p => p.routeId === data.routeId && p.sourceFile === 'preaction-grooved-assembly.jpg');
    if (!grooved) throw new Error('Preaction grooved listing requires the reviewed assembly photograph');
    return [
      { image: flanged, searchImage: data.media.flanged, anchor: productPhotoAnchor(data.routeId, flanged), name: { en: 'Flanged', ar: 'فلنجي' } },
      { image: grooved.detail.path, searchImage: grooved.detail.path, anchor: productPhotoAnchor(data.routeId, grooved.detail.path), name: { en: 'Grooved', ar: 'محزز' } }
    ];
  }
  if (documented[id]) {
    const data=read(`./documented-products/${id}.json`);
    return documented[id].map(i=>{const item=data.gallery[i];return {image:reviewedPhotoPath(data.routeId,data.media[item.media]),view:data.media[item.media],name:{en:data.copy.en[item.caption],ar:data.copy.ar[item.caption]}};});
  }
  if (preserved[id]) {
    const data=read(`./preserved-products/${id}.json`), ar=read(`../content/products/ar/${id}.json`);
    const copy=(key,locale)=>{const source=data.copy[key];return (locale==='en'?source.text:ar[key]).replace(/\{n(\d+)\}/g,(_,i)=>source.numbers[i]);};
    return preserved[id].map(i=>{const item=data.gallery[i];return {image:reviewedPhotoPath(data.routeId,data.media[item.media]),view:data.media[item.media],name:{en:copy(item.caption,'en'),ar:copy(item.caption,'ar')}};});
  }
  if (['water-curtain-nozzles','water-mist-nozzles','wet-alarm-check-valve'].includes(id)) {
    const data=read(`./products/${id}.json`),en=read(`../content/products/en/${id}.json`),ar=read(`../content/products/ar/${id}.json`);
    return data.media.map(item=>({image:item.src,name:{en:en.media[item.configuration].title,ar:ar.media[item.configuration].title}}));
  }
  if(id==='diaphragm-deluge-valves') {
    const data=read(`./preserved-products/${id}.json`);
    return [{image:reviewedPhotoPath(data.routeId,data.media.flanged),view:data.media.flanged,name:{en:'Flanged',ar:'فلنجي'}},{image:data.media.grooved,view:data.media.grooved,name:{en:'Grooved',ar:'محزز'}}];
  }
  return [];
}
