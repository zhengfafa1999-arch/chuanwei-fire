import fs from 'node:fs';
const read = relative => JSON.parse(fs.readFileSync(new URL(relative, import.meta.url), 'utf8'));
// Select distinct configurations, excluding packing, detail photos and size/temperature variants.
const documented = {
  'fusible-alloy-fire-sprinklers': [0,1],
  'glass-bulb-fire-sprinkler': [0,1], 'standard-response-fire-sprinkler': [1,2,3],
  'horizontal-handwheel-landing-valves': [0,1], 'lever-operated-fire-hose-nozzles': [0,1],
  'straight-stream-fire-hose-nozzles': [0,1]
};
const preserved = {'extended-coverage-quick-response-fire-sprinkler':[0,1,2], 'large-k-factor-esfr-sprinklers':[0,1,2,3,4]};
export function productViews(id) {
  if (documented[id]) {
    const data=read(`./documented-products/${id}.json`);
    return documented[id].map(i=>{const item=data.gallery[i];return {image:data.media[item.media],name:{en:data.copy.en[item.caption],ar:data.copy.ar[item.caption]}};});
  }
  if (preserved[id]) {
    const data=read(`./preserved-products/${id}.json`), ar=read(`../content/products/ar/${id}.json`);
    const copy=(key,locale)=>{const source=data.copy[key];return (locale==='en'?source.text:ar[key]).replace(/\{n(\d+)\}/g,(_,i)=>source.numbers[i]);};
    return preserved[id].map(i=>{const item=data.gallery[i];return {image:data.media[item.media],name:{en:copy(item.caption,'en'),ar:copy(item.caption,'ar')}};});
  }
  if (['water-curtain-nozzles','water-mist-nozzles','wet-alarm-check-valve'].includes(id)) {
    const data=read(`./products/${id}.json`),en=read(`../content/products/en/${id}.json`),ar=read(`../content/products/ar/${id}.json`);
    return data.media.map(item=>({image:item.src,name:{en:en.media[item.configuration].title,ar:ar.media[item.configuration].title}}));
  }
  if(id==='diaphragm-deluge-valves') {
    const data=read(`./preserved-products/${id}.json`);
    return [{image:data.media.flanged,name:{en:'Flanged',ar:'فلنجي'}},{image:data.media.grooved,name:{en:'Grooved',ar:'محزز'}}];
  }
  return [];
}
