import fs from 'node:fs';
import assert from 'node:assert/strict';
import { PRODUCT_FAMILIES } from '../../../site-src/_data/productDirectory.js';
import pages from '../../../site-src/_data/publicPages.js';
const read = f => fs.readFileSync(f, 'utf8');
const routes = JSON.parse(read('docs/reviews/site-audit-20261011/routes.json'));
assert.equal(routes.length, 185);
for (const p of pages) {
  if (p.pageType === 'about') {
    assert.deepEqual(p.facilities.families.map(f => f.id), PRODUCT_FAMILIES.map(f => f.routeId));
    assert.equal(new Set(p.facilities.groups.flatMap(g => g.photos.map(p => p.image))).size, 8);
  }
  if (p.pageType === 'contact') {
    assert.deepEqual(p.copy.productOptions.slice(0,-1), PRODUCT_FAMILIES.map(f => [f.name.en, f.name[p.copy.lang]]));
    assert.equal(p.copy.productOptions.length, 12);
  }
}
for (const r of routes) {
  const html = read(r.path);
  assert(!html.includes('export-sales presentation'), `${r.path}: editorial brand explanation`);
  assert(!/href="[^"#?]*\.pdf(?:[?#"][^>]*)?/i.test(html), `${r.path}: public PDF link`);
  assert(!/Request a explosion-proof/.test(html), `${r.path}: article grammar`);
  if (r.id === 'product:ria25-fire-hose-reel') {
    assert(!/built to the EN|مصنّعة وفق معيار/.test(html), `${r.path}: unverified standards claim`);
    assert(!/<title>[^<]*EN.*671/.test(html), `${r.path}: standards claim in title`);
  }
}
const result = {date:'2026-10-11', pages:routes.length, aboutFamilies:11, contactChoices:12, uniqueAboutPhotos:8,
  checks:['Removed editorial brand explanations','No PDF download links','RIA25 conformity no longer asserted','Two enquiry grammar fixes','Shared family coverage in About and Contact'],
  browser:{status:'not-verified', reason:'Browser request-header policy initially failed; in-app browser retry reached a localhost navigation timeout. No visual/mobile pass claimed.'},
  releaseStatus:'review-candidate-only; unresolved evidence listed in README.md'};
fs.writeFileSync('docs/reviews/site-audit-20261011/verification.json',JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result));
