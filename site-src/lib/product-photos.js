import { versionedProductImage } from './public-asset-versions.js';
import fs from 'node:fs';
import { photoViewAliases } from './reviewed-product-media.js';

// Source/provenance stays internal; only localized captions and web derivatives
// reach the rendered pages. No photograph supplies new technical specifications.
export const productPhotoManifest = JSON.parse(fs.readFileSync(new URL('../_data/guanya-photos.json', import.meta.url), 'utf8'));
export function productPhotoAnchor(routeId, detailPath) {
  const index = productPhotoManifest.photos.filter(p => p.routeId === routeId && !p.galleryOnly)
    .findIndex(p => p.detail.path === detailPath);
  if (index < 0) throw new Error(`${routeId}: photograph is missing for the listing link`);
  return `product-photograph-${index + 1}`;
}
const displayCaption = (caption, lang) => lang === 'ar'
  ? caption.replace(/[A-Za-z0-9][A-Za-z0-9 .&/°-]*[A-Za-z0-9°]|[A-Za-z0-9]/g, run => `\u2066${run}\u2069`)
  : caption;
export function productPhotos(routeId, lang, assetPrefix) {
  const images = productPhotoManifest.photos.filter(p => p.routeId === routeId && !p.galleryOnly);
  if (!images.length) return null;
  return {
    viewAliases: JSON.stringify(photoViewAliases(routeId)),
    title: lang === 'ar' ? 'صور المنتج الفعلية' : 'Product photographs',
    lead: lang === 'ar' ? 'قارن الشكل والعلامات الظاهرة. افتح الصورة لتكبيرها؛ أكد التكوين المطلوب مع عرض السعر.' : 'Compare the construction and visible markings. Open a photograph to enlarge it; confirm the required configuration with the quotation.',
    enlarge: lang === 'ar' ? 'تكبير الصورة' : 'Enlarge photograph',
    images: images.map((p, index) => ({id: `product-photograph-${index + 1}`, caption: displayCaption(p.caption[lang], lang),
      src: versionedProductImage(p.display.path, `${assetPrefix}${p.display.path}`), detail: versionedProductImage(p.detail.path, `${assetPrefix}${p.detail.path}`),
      width: p.display.width, height: p.display.height,
      srcset: `${versionedProductImage(p.display.path, `${assetPrefix}${p.display.path}`)} ${p.display.width}w, ${versionedProductImage(p.detail.path, `${assetPrefix}${p.detail.path}`)} ${p.detail.width}w`
    }))
  };
}
