import fs from 'node:fs';

// Reviewed October 2026 material batch. Product facts remain in documented-products.
const batch = JSON.parse(fs.readFileSync(new URL('./website-catalog-20261018.json', import.meta.url), 'utf8'));
const published = outputPath => ({ outputPath, status: 'published' });

export const websiteBatchListings = familyId => batch.products
  .filter(product => product.familyId === familyId)
  .map(product => [product.routeId, product.name.en, product.name.ar, product.image]);

export const websiteBatchFamilies = batch.categories.map(category => ({
  ...category,
  products: websiteBatchListings(category.id)
}));

export const websiteBatchRoutes = Object.fromEntries([
  ...batch.categories.map(category => [category.routeId, {
    kind: 'category',
    locales: {
      en: published(`products/${category.id}.html`),
      ar: published(`ar/products/${category.id}/index.html`)
    }
  }]),
  ...batch.products.map(product => [product.routeId, {
    kind: 'product', category: `category:${product.familyId}`,
    locales: {
      en: published(`products/${product.familyId}/${product.id}.html`),
      ar: published(`ar/products/${product.id}/index.html`)
    }
  }])
]);

export default batch;
