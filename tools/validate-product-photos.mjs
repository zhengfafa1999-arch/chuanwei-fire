import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import { productPhotoManifest, productPhotos } from '../site-src/lib/product-photos.js';
import { createProductPageRoute, SITE_ROUTES } from '../site-src/_data/siteRoutes.js';
import { reviewedProductMedia, withReviewedProductMedia, reviewedPhotoPath, photoViewAliases } from '../site-src/lib/reviewed-product-media.js';

const hash = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const numberTokens = value => value.match(/\d+(?:\.\d+)?/g) || [];
const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const selection = JSON.parse(fs.readFileSync('site-src/_data/guanya-photo-selection.json', 'utf8'));
const inventory = JSON.parse(fs.readFileSync('docs/reviews/guanya-photos-20261009/inventory.json', 'utf8'));
assert(productPhotoManifest.authorization.includes('User supplied'));
assert.equal(productPhotoManifest.photos.length, selection.photos.length);
assert.equal(inventory.filter(i => i.decision.startsWith('selected:')).length, selection.photos.length);
assert.equal(new Set(productPhotoManifest.photos.map(p => p.sourceFile)).size, selection.photos.length);
for (const photo of productPhotoManifest.photos) {
  assert(SITE_ROUTES[photo.routeId], `Unregistered photo route: ${photo.routeId}`);
  const selected = selection.photos.find(p => p.sourceFile === photo.sourceFile);
  assert.equal(photo.routeId, selected.routeId);
  assert.deepEqual(photo.caption, selected.caption);
  assert(photo.matchEvidence && photo.caption.en && /[\u0600-\u06ff]/.test(photo.caption.ar));
  assert.deepEqual(numberTokens(photo.caption.en), numberTokens(photo.caption.ar));
  assert(!/\b(?:UL|FM|CE|CCC|approved|certified)\b/i.test(photo.caption.en));
  if (fs.existsSync(photo.sourcePath)) assert.equal(hash(photo.sourcePath), photo.sourceSha256, 'User original was changed');
  for (const [key, maxEdge] of [['display', 640], ['detail', 1600]]) {
    const image = photo[key];
    assert(image.path.startsWith('assets/products/guanya-2026/') && image.path.endsWith('.webp'));
    assert.equal(hash(image.path), image.sha256);
    assert.equal(fs.statSync(image.path).size, image.bytes);
    assert(image.width > 0 && image.height > 0 && Math.max(image.width, image.height) <= maxEdge);
    assert(image.width <= photo.sourceWidth && image.height <= photo.sourceHeight, 'Original was upscaled');
    assert(Math.abs(image.width / image.height - photo.sourceWidth / photo.sourceHeight) < .005, 'Photo aspect ratio changed');
    assert(image.bytes <= 300 * 1024 && image.quality >= 78 && image.quality <= 85);
  }
}
let outputs = 0;
for (const binding of reviewedProductMedia.bindings) {
  const photo = productPhotoManifest.photos.find(photo => photo.routeId === binding.routeId && photo.sourceFile === binding.photoSourceFile);
  assert(photo, 'Replacement must reference an already verified photograph of this product');
  assert.equal(binding.detailPath, photo.detail.path);
  assert.equal(binding.displayPath, photo.display.path);
  assert.equal(binding.width, photo.detail.width);
  assert.equal(binding.height, photo.detail.height);
  assert.equal(binding.matchEvidence, photo.matchEvidence);
  assert.deepEqual(binding.caption, photo.caption);
  const id = binding.routeId.replace('product:', '');
  const sourceFile = ['documented-products', 'preserved-products'].map(group => `site-src/_data/${group}/${id}.json`).find(file => fs.existsSync(file));
  const original = JSON.parse(fs.readFileSync(sourceFile, 'utf8'));
  assert.equal(original.media[binding.mediaKey], binding.originalPath, 'Binding does not match the original configuration slot');
  const projected = withReviewedProductMedia(original);
  assert.deepEqual(projected.models, original.models, 'Photo replacement changed the model table');
  assert.deepEqual(projected.copy, original.copy, 'Photo replacement changed technical copy');
  assert.equal(reviewedPhotoPath(binding.routeId, binding.originalPath), binding.detailPath);
  assert.equal(photoViewAliases(binding.routeId)[binding.originalPath], binding.detailPath);
  if (process.argv.includes('--generated')) for (const lang of ['en', 'ar']) {
    const route = createProductPageRoute(binding.routeId, lang);
    const html = fs.readFileSync(route.outputPath, 'utf8').replace(/<section\b[^>]*data-product-photos>[\s\S]*?<\/section>/g, '');
    assert(html.includes(binding.detailPath.split('/').at(-1)), `${binding.routeId}/${lang}: replacement not used in the original main image/gallery`);
  }
}
const explicitPhotoOrders = new Map(fs.readdirSync('site-src/_data/documented-products').filter(file => file.endsWith('.json')).map(file => JSON.parse(fs.readFileSync(`site-src/_data/documented-products/${file}`, 'utf8'))).filter(product => product.photoSourceFiles).map(product => [product.routeId, product.photoSourceFiles]));
const routeIds = [...new Set([...productPhotoManifest.photos.map(p => p.routeId), ...explicitPhotoOrders.keys()])];
for (const routeId of routeIds) for (const lang of ['en', 'ar']) {
  const route = createProductPageRoute(routeId, lang);
  const photos = productPhotos(routeId, lang, route.assetPrefix, explicitPhotoOrders.get(routeId));
  assert(photos.images.length > 0);
  if (!process.argv.includes('--generated')) continue;
  const html = fs.readFileSync(route.outputPath, 'utf8');
  const sections = html.match(/<section\b[^>]*data-product-photos>[\s\S]*?<\/section>/g) || [];
  assert.equal(sections.length, 1, `${routeId}/${lang}: photo section not rendered exactly once`);
  const section = sections[0];
  assert.equal((section.match(/<figure\b/g) || []).length, photos.images.length);
  for (const image of photos.images) {
    assert(section.includes(`id="${image.id}" data-product-photo`), `${routeId}/${lang}: direct photograph anchor missing`);
    assert(section.includes(`alt="${escape(image.caption)}"`) && section.includes(`src="${image.src}"`));
    assert(section.includes(`srcset="${image.srcset}"`) && section.includes(`href="${image.detail}"`));
    assert(section.includes(`data-lightbox="${image.detail}" data-lightbox-alt="${escape(image.caption)}"`));
    assert(section.includes(`width="${image.width}" height="${image.height}"`));
  }
  assert.equal((section.match(/loading="lazy" decoding="async"/g) || []).length, photos.images.length);
  assert(!/sourceFile|sourcePath|sourceSha|matchEvidence|D:[/\\]|DSC_/.test(section), 'Internal provenance leaked');
  outputs++;
}
console.log(`Product photo validation passed: ${selection.photos.length} photographs, ${routeIds.length} existing series, ${selection.photos.length * 2} optimized assets, ${outputs} bilingual outputs.`);
console.log(`Reviewed image replacement validation passed: ${reviewedProductMedia.bindings.length} media slots with exact photograph/configuration and legacy-view mappings.`);
