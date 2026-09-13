import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PRODUCT_FAMILIES, localizedText } from "../site-src/_data/productDirectory.js";
import { createProductPageRoute, SITE_ROUTES } from "../site-src/_data/siteRoutes.js";

const root = process.cwd();
const sourceDirectory = path.join(root, "site-src", "_data", "catalog-products");
const products = fs.readdirSync(sourceDirectory).filter(file => file.endsWith(".json"))
  .map(file => JSON.parse(fs.readFileSync(path.join(sourceDirectory, file), "utf8")));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function escaped(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

for (const product of products) {
  const familyRouteId = SITE_ROUTES[product.routeId]?.category;
  const family = PRODUCT_FAMILIES.find(item => item.routeId === familyRouteId);
  assert(family, `${product.id}: missing registered product family`);
  const listing = family.products.find(item => item.routeId === product.routeId);
  assert(listing, `${product.id}: missing category entry`);
  assert(SITE_ROUTES[product.routeId]?.category === family.routeId, `${product.id}: wrong route category`);
  assert(listing.image === product.image, `${product.id}: detail image differs from the current category image`);
  for (const locale of ["en", "ar"]) {
    assert(localizedText(listing.name, locale) === product.copy[locale].title, `${product.id}/${locale}: detail title differs from the current category title`);
    const route = createProductPageRoute(product.routeId, locale);
    const output = path.join(root, route.outputPath);
    assert(fs.existsSync(output), `${product.id}/${locale}: generated page missing`);
    const html = fs.readFileSync(output, "utf8");
    assert(html.includes("GENERATED FILE"), `${product.id}/${locale}: not generated from the shared template`);
    assert(html.includes(`<html lang="${locale}" dir="${locale === "ar" ? "rtl" : "ltr"}">`), `${product.id}/${locale}: wrong language direction`);
    assert(html.includes(`data-site-route-id="${product.routeId}"`), `${product.id}/${locale}: wrong route marker`);
    assert(html.includes(`<h1>${escaped(product.copy[locale].title)}</h1>`), `${product.id}/${locale}: title missing`);
    assert(html.includes(`<link rel="canonical" href="${route.canonical}">`), `${product.id}/${locale}: canonical missing`);
    assert(html.includes(`href="${route.alternate}"`), `${product.id}/${locale}: alternate canonical missing`);
    assert(html.includes(`data-site-language-choice="${locale === "ar" ? "en" : "ar"}"`), `${product.id}/${locale}: reciprocal language switch missing`);
    assert(!/\b(?:MPa|DN\d+|UL|FM|CE)\b/.test(html.replace(/<header\b[^>]*data-global-header[\s\S]*?<\/header>/i, "")), `${product.id}/${locale}: unsupported technical claim was introduced`);
    const imageTarget = path.resolve(path.dirname(output), decodeURIComponent(route.assetPrefix + product.image));
    assert(fs.existsSync(imageTarget), `${product.id}/${locale}: product image is missing`);
  }
}

console.log(`Catalog-product validation passed: ${products.length} shared product source(s), ${products.length * 2} localized outputs.`);
