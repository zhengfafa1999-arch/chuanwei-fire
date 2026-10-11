import fs from 'node:fs';
import crypto from 'node:crypto';

export const VERSIONED_PUBLIC_ASSETS = [
  'css/catalog-pages.css',
  'css/site-navigation.css',
  'assets/js/site-navigation.js',
  'assets/js/product-finder.js'
];
const versions = new Map(VERSIONED_PUBLIC_ASSETS.map(asset => [asset,
  crypto.createHash('sha256').update(fs.readFileSync(new URL(`../../${asset}`, import.meta.url))).digest('hex').slice(0, 12)
]));

export function versionedPublicAsset(asset, prefix = '') {
  return `${prefix}${asset}?v=${versions.get(asset)}`;
}

const productImageVersions = new Map(JSON.parse(fs.readFileSync(
  new URL('../_data/product-watermarks.json', import.meta.url), 'utf8'
)).items.map(item => [item.path, item.watermarkedSha256.slice(0, 12)]));

// Version only rendered URLs; source paths remain usable by image processors.
export function versionedProductImage(source, renderedPath = source) {
  const version = productImageVersions.get(source);
  return version ? `${renderedPath}?v=${version}` : renderedPath;
}
