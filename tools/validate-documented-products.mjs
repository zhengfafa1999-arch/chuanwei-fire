import fs from "node:fs";
import { validateImageRights } from './lib/validate-image-rights.mjs';
import path from "node:path";
import catalog from "../site-src/_data/documentedProductPages.js";
import { PRODUCT_FAMILIES, localizedText } from "../site-src/_data/productDirectory.js";
import { SITE_ROUTES } from "../site-src/_data/siteRoutes.js";

const root = process.cwd();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function escaped(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

const products = new Map();
for (const entry of catalog) {
  const { product, route, lang, text } = entry;
  products.set(product.id, product);
  const familyRouteId = SITE_ROUTES[product.routeId]?.category;
  const family = PRODUCT_FAMILIES.find(item => item.routeId === familyRouteId);
  const listing = family?.products.find(item => item.routeId === product.routeId);
  assert(family && listing, `${product.id}: missing category registration`);
  assert(localizedText(listing.name, lang) === text.title, `${product.id}/${lang}: category and detail titles differ`);
  assert(listing.image === product.media.hero, `${product.id}: category and detail hero images differ`);
  assert(product.publication.status === "release-candidate" && product.publication.externalRelease === true, `${product.id}: product is not approved as a release candidate`);
  validateImageRights(product);
  assert(Array.isArray(product.modelColumns) && product.modelColumns.length >= 2, `${product.id}: model columns are missing`);
  for (const column of product.modelColumns) {
    assert(column.label && column.field, `${product.id}: invalid model column definition`);
    assert(product.models.every(row => String(row[column.field] ?? "").trim()), `${product.id}: model column '${column.field}' contains an empty value`);
  }

  const output = path.join(root, route.outputPath);
  assert(fs.existsSync(output), `${product.id}/${lang}: generated page missing`);
  const html = fs.readFileSync(output, "utf8");
  assert(html.includes("GENERATED FILE"), `${product.id}/${lang}: shared-template marker missing`);
  assert(html.includes(`<html lang="${lang}" dir="${lang === "ar" ? "rtl" : "ltr"}">`), `${product.id}/${lang}: wrong language direction`);
  assert(html.includes(`data-site-route-id="${product.routeId}"`), `${product.id}/${lang}: wrong route marker`);
  assert(html.includes(`data-content-status="release-candidate"`), `${product.id}/${lang}: release-candidate marker missing`);
  assert(html.includes(`<h1>${escaped(text.title)}</h1>`), `${product.id}/${lang}: title missing`);
  assert(html.includes(`<link rel="canonical" href="${route.canonical}">`), `${product.id}/${lang}: canonical missing`);
  assert(html.includes(`href="${route.alternate}"`), `${product.id}/${lang}: language alternate missing`);
  assert(!/\b(?:UL|FM|CE|CCC)\b/.test(html), `${product.id}/${lang}: unsupported certification claim introduced`);
  assert((html.match(/<tbody>[\s\S]*?<\/tbody>/g) || []).join("").match(/<tr>/g)?.length === product.models.length, `${product.id}/${lang}: model row count differs`);
  for (const source of Object.values(product.media)) {
    assert(fs.existsSync(path.join(root, source)), `${product.id}: missing source image ${source}`);
  }
  for (const relative of Object.values(entry.media)) {
    assert(fs.existsSync(path.resolve(path.dirname(output), relative)), `${product.id}/${lang}: broken generated image path ${relative}`);
  }
  assert(Array.isArray(product.validation?.requiredTechnicalValues), `${product.id}: required technical validation values are missing`);
  for (const required of product.validation.requiredTechnicalValues) {
    assert(html.includes(required), `${product.id}/${lang}: confirmed technical value missing: ${required}`);
  }
}

assert(products.size * 2 === catalog.length, "Each documented product must generate English and Arabic pages");
console.log(`Documented-product validation passed: ${products.size} release candidates, ${catalog.length} localized outputs, image-rights release gate retained.`);
