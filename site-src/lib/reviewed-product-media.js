import fs from 'node:fs';

export const reviewedProductMedia = JSON.parse(fs.readFileSync(new URL('../_data/product-photo-bindings.json', import.meta.url), 'utf8'));

export function reviewedPhotoPath(routeId, originalPath) {
  return reviewedProductMedia.bindings.find(binding => binding.routeId === routeId && binding.originalPath === originalPath)?.detailPath ?? originalPath;
}

export function originalPhotoPath(routeId, displayedPath) {
  return reviewedProductMedia.bindings.find(binding => binding.routeId === routeId && binding.detailPath === displayedPath)?.originalPath ?? displayedPath;
}

export function withReviewedProductMedia(product) {
  const bindings = reviewedProductMedia.bindings.filter(binding => binding.routeId === product.routeId);
  if (!bindings.length) return product;
  const media = { ...product.media }, imageDimensions = { ...product.imageDimensions };
  for (const binding of bindings) {
    if (media[binding.mediaKey] !== binding.originalPath) throw new Error(`${product.routeId}: reviewed image no longer matches ${binding.mediaKey}`);
    media[binding.mediaKey] = binding.detailPath;
    imageDimensions[binding.mediaKey] = { width: binding.width, height: binding.height };
  }
  return { ...product, media, imageDimensions,
    ...(product.publication ? { publication: { ...product.publication,
      imageRightsEvidence: 'docs/release/primary-product-photos-20261009/image-rights-confirmation.json' } } : {}),
    ...(product.hero && imageDimensions.hero ? { hero: imageDimensions.hero } : {}) };
}

export function photoViewAliases(routeId) {
  return Object.fromEntries(reviewedProductMedia.bindings.filter(binding => binding.routeId === routeId)
    .map(binding => [binding.originalPath, binding.detailPath]));
}
