import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import { SITE_ROUTES, SITE_ORIGIN } from '../site-src/_data/siteRoutes.js';
import { thumbnailFor } from '../site-src/_data/catalogThumbnails.js';

const manifest = JSON.parse(fs.readFileSync('site-src/_data/product-watermarks.json', 'utf8'));
const sha = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const raster = /\.(?:webp|jpe?g|png)$/i;
function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const file = `${directory}/${entry.name}`;
    return entry.isDirectory() ? walk(file) : [file];
  });
}
const records = new Map(manifest.items.map(item => [item.path, item]));
assert.equal(records.size, manifest.items.length, 'Duplicate watermark records');
assert.equal(records.size, manifest.count, 'Watermark count differs');
const excluded = new Set(manifest.excluded || []);
const files = walk('assets/products').filter(file => raster.test(file) && !excluded.has(file));
assert.deepEqual(new Set(files), new Set(records.keys()), 'New product images need watermarking: python tools/apply-product-watermarks.py --new-assets');
for (const item of records.values()) {
  assert.equal(sha(item.path), item.watermarkedSha256, `Published image changed: ${item.path}`);
  assert.equal(fs.statSync(item.path).size, item.bytes, `Image size changed: ${item.path}`);
  assert(item.bytes <= 300 * 1024, `Product image exceeds 300 KiB: ${item.path}`);
  if (item.watermarkMode === 'preserved-user-supplied') {
    assert.equal(item.providedWatermark.brandText, manifest.centerText, `Incorrect supplied brand: ${item.path}`);
    assert.equal(item.providedWatermark.cornerText, manifest.cornerText, `Incorrect supplied wordmark: ${item.path}`);
    assert.equal(item.providedWatermark.verification, 'visual-review-20261010', `Supplied watermark was not reviewed: ${item.path}`);
    assert.equal(item.placements.length, 0, `Supplied watermark was stamped again: ${item.path}`);
    assert.equal(sha(item.sourceEvidence.path), item.sourceEvidence.sha256, `Supplied original changed: ${item.path}`);
  } else {
    assert(item.placements.some(mark => mark.layer === 'corner'), `Missing brand wordmark: ${item.path}`);
  }
  assert.equal(item.protectedProductPixelsOverlaid, 0, `Watermark covers product details: ${item.path}`);
  for (const { box: [left, top, right, bottom] } of item.placements) {
    assert(left >= 0 && top >= 0 && right <= item.width && bottom <= item.height && right > left && bottom > top, `Watermark outside image: ${item.path}`);
  }
  // Immutable masters stay internal; validate them when present on this machine.
  if (fs.existsSync(item.masterPath)) assert.equal(sha(item.masterPath), item.originalSha256, `Original image backup changed: ${item.path}`);
}
const thumbnails = JSON.parse(fs.readFileSync('assets/catalog-thumbnails/manifest.json', 'utf8'));
for (const thumbnail of thumbnails.filter(item => records.has(item.source))) {
  assert.equal(thumbnail.output, thumbnailFor(thumbnail.source), `Stale product thumbnail: ${thumbnail.source}`);
  assert(fs.existsSync(thumbnail.output), `Missing thumbnail: ${thumbnail.output}`);
}
let pages = 0;
const publicImages = new Set();
if (process.argv.includes('--generated')) {
  for (const route of Object.values(SITE_ROUTES).flatMap(entry => Object.values(entry.locales)).filter(entry => entry.status === 'published')) {
    pages++;
    const html = fs.readFileSync(route.outputPath, 'utf8');
    const refs = [...html.matchAll(/\b(?:src|href|data-src|data-lightbox|data-full|data-zoom|content)="([^"]+)"/g)].map(match => match[1]);
    for (const match of html.matchAll(/\bsrcset="([^"]+)"/g)) refs.push(...match[1].split(',').map(entry => entry.trim().split(/\s+/)[0]));
    for (const ref of refs) {
      let url;
      try { url = new URL(ref.replaceAll('&amp;', '&'), new URL(route.outputPath, `${SITE_ORIGIN}/`)); } catch { continue; }
      if (url.origin !== new URL(SITE_ORIGIN).origin) continue;
      const file = decodeURIComponent(url.pathname).replace(/^\/+/, '');
      if (!file.startsWith('assets/products/') || !raster.test(file)) continue;
      assert(!excluded.has(file), `Retired photograph still published: ${file}`);
      const item = records.get(file);
      assert(item, `Unwatermarked public image: ${file}`);
      assert.equal(url.searchParams.get('v'), item.watermarkedSha256.slice(0, 12), `${route.outputPath}: stale/unversioned image ${ref}`);
      publicImages.add(file);
    }
  }
}
console.log(`Product watermarks verified: ${records.size} assets; ${thumbnails.filter(item => records.has(item.source)).length} refreshed thumbnails${pages ? `; ${pages} pages / ${publicImages.size} public image dependencies` : ''}.`);
