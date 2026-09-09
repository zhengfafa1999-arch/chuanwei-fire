import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import { SITE_ROUTES } from '../site-src/_data/siteRoutes.js';
import { PRODUCT_FAMILIES } from '../site-src/_data/productDirectory.js';

// Fixed scope from the eight eligible v11 additions, not every documented product.
const additions = [
  ['fusible-alloy-fire-sprinklers', 12, 'sprinklers'],
  ['saddle-type-waterflow-switches', 25, 'system-valves'],
  ['straight-through-oblique-landing-valves', 29, 'indoor-hydrants'],
  ['horizontal-handwheel-landing-valves', 30, 'indoor-hydrants'],
  ['breeching-inlets', 35, 'fire-department-connections'],
  ['russian-pattern-fire-department-connection', 37, 'fire-department-connections'],
  ['straight-stream-fire-hose-nozzles', 40, 'hoses-nozzles-couplings'],
  ['lever-operated-fire-hose-nozzles', 41, 'hoses-nozzles-couplings']
];
const read = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const hash = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const records = additions.map(([id, catalogPage, category]) => {
  const file = `site-src/_data/documented-products/${id}.json`;
  const product = read(file);
  assert.equal(product.id, id);
  assert.equal(product.source.catalogPage, catalogPage, `${id}: wrong catalog page`);
  assert.equal(product.publication.status, 'local-draft');
  assert.equal(product.publication.externalRelease, false);
  assert.equal(product.publication.imageRights, 'pending-website-use-confirmation');
  const route = SITE_ROUTES[product.routeId];
  assert.equal(route.category, `category:${category}`);
  const family = PRODUCT_FAMILIES.find(item => item.routeId === route.category);
  assert.equal(family.products.filter(item => item.routeId === product.routeId).length, 1, `${id}: missing or duplicated category entry`);
  const outputs = ['en', 'ar'].map(locale => {
    const output = route.locales[locale].outputPath;
    const html = fs.readFileSync(output, 'utf8');
    assert(html.includes(`data-site-route-id="${product.routeId}"`));
    assert(html.includes('data-content-status="local-draft"'));
    assert(html.includes(`<html lang="${locale}" dir="${locale === 'ar' ? 'rtl' : 'ltr'}">`));
    assert(html.includes(product.copy[locale].title.replaceAll('&', '&amp;')));
    return {locale, path: output, sha256: hash(output)};
  });
  const images = Object.entries(product.media).map(([key, file]) => {
    assert(fs.statSync(file).size > 0, `${id}: empty image ${file}`);
    return {key, path: file, sha256: hash(file)};
  });
  assert(product.gallery.every(image => Object.hasOwn(product.media, image.media)));
  return {id, catalogPage, category, galleryImages: product.gallery.length, modelRows: product.models.length,
    publication: product.publication, sourcePath: file, sourceSha256: hash(file), outputs, images, status: 'PASS'};
});
const evidenceArg = process.argv.find(arg => arg.startsWith('--evidence-dir='));
if (evidenceArg) {
  const directory = path.resolve(evidenceArg.slice('--evidence-dir='.length));
  const root = process.cwd();
  assert(directory.startsWith(root + path.sep), 'Evidence must remain inside the project');
  fs.mkdirSync(directory, {recursive: true});
  fs.writeFileSync(path.join(directory, 'addition-inventory.json'), JSON.stringify({generatedAt:new Date().toISOString(), scope:'v11-eight-local-draft-additions', records}, null, 2)+'\n');
}
console.log(`Catalog addition inventory passed: ${records.length} products, ${records.length * 2} localized pages, ${records.reduce((n,r)=>n+r.galleryImages,0)} gallery images; all remain local drafts.`);
