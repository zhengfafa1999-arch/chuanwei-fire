import fs from "node:fs";
import path from "node:path";
import { PRODUCT_FAMILIES, localizedText } from "../site-src/_data/productDirectory.js";
import {
  SITE_ROUTES,
  SUPPORTED_LOCALES,
  createListingPageRoute,
  resolveSiteRoute
} from "../site-src/_data/siteRoutes.js";

const root = process.cwd();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function readOutput(outputPath) {
  const absolutePath = path.join(root, outputPath);
  assert(fs.existsSync(absolutePath), `Published output is missing: ${outputPath}`);
  return fs.readFileSync(absolutePath, "utf8");
}

function containsRenderedText(html, value) {
  const escaped = value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  return html.includes(escaped);
}

function validateLocalReferences(html, outputPath) {
  const directory = path.dirname(path.join(root, outputPath));
  const references = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map((match) => match[1]);
  for (const reference of references) {
    if (/^(?:https?:|mailto:|tel:|data:|javascript:|#)/i.test(reference)) continue;
    const cleanReference = decodeURIComponent(reference.split(/[?#]/)[0]);
    const target = path.resolve(directory, cleanReference || ".");
    assert(fs.existsSync(target), `${outputPath} contains a broken local reference: ${reference}`);
  }
}

function validateListingShell(routeId, locale) {
  const route = createListingPageRoute(routeId, locale);
  const html = readOutput(route.outputPath);
  const direction = locale === "ar" ? "rtl" : "ltr";
  assert(html.includes("GENERATED FILE"), `${route.outputPath} is not generated from the shared listing template.`);
  assert(html.includes(`<html lang="${locale}" dir="${direction}">`), `${route.outputPath} has incorrect language direction.`);
  assert(html.includes(`data-site-language="${locale}"`), `${route.outputPath} is missing its language marker.`);
  assert(html.includes(`<link rel="canonical" href="${route.canonical}">`), `${route.outputPath} has an incorrect canonical URL.`);
  assert(html.includes(`href="${route.alternate}"`), `${route.outputPath} is missing its alternate-language canonical URL.`);
  assert(html.includes(`href="${route.languageLinks.en}" lang="en"`), `${route.outputPath} has an incorrect English switch.`);
  assert(html.includes(`href="${route.languageLinks.ar}" lang="ar"`), `${route.outputPath} has an incorrect Arabic switch.`);
  assert(!/[{][{%#]|[%#}][}]/.test(html), `${route.outputPath} contains an unrendered template marker.`);
  validateLocalReferences(html, route.outputPath);
  return { html, route };
}

for (const route of Object.values(SITE_ROUTES)) {
  for (const locale of SUPPORTED_LOCALES) {
    const target = route.locales[locale];
    if (target.status === "published") readOutput(target.outputPath);
  }
}

for (const locale of SUPPORTED_LOCALES) {
  const { html, route } = validateListingShell("products", locale);
  for (const family of PRODUCT_FAMILIES) {
    const name = localizedText(family.name, locale);
    const href = resolveSiteRoute(family.routeId, locale, route.outputPath).href;
    assert(containsRenderedText(html, name), `${route.outputPath} is missing product family: ${name}`);
    assert(html.includes(`href="${href}"`), `${route.outputPath} has no link to ${family.routeId}.`);
  }
}

for (const family of PRODUCT_FAMILIES) {
  for (const locale of SUPPORTED_LOCALES) {
    const { html, route } = validateListingShell(family.routeId, locale);
    assert(containsRenderedText(html, localizedText(family.name, locale)), `${route.outputPath} is missing its category name.`);
    for (const product of family.products) {
      const name = localizedText(product.name, locale);
      assert(containsRenderedText(html, name), `${route.outputPath} is missing product type: ${name}`);
      if (!product.routeId) continue;
      const localizedTarget = SITE_ROUTES[product.routeId].locales[locale];
      const targetLocale = localizedTarget.status === "published" ? locale : "en";
      const resolvedHref = resolveSiteRoute(product.routeId, targetLocale, route.outputPath).href;
      assert(html.includes(`href="${resolvedHref}"`), `${route.outputPath} has an incorrect link for ${product.routeId}.`);
    }
  }
}

const sitemap = readOutput("sitemap.xml");
assert(sitemap.includes("GENERATED FILE"), "Sitemap is not generated from the shared route registry.");
for (const [routeId, route] of Object.entries(SITE_ROUTES)) {
  for (const locale of SUPPORTED_LOCALES) {
    const target = route.locales[locale];
    if (target.status !== "published") continue;
    const canonical = resolveSiteRoute(routeId, locale, target.outputPath).canonical;
    assert(sitemap.includes(`<loc>${canonical}</loc>`), `Sitemap is missing ${canonical}.`);
  }
}

console.log(`Listing validation passed: 2 product-directory pages and ${PRODUCT_FAMILIES.length * SUPPORTED_LOCALES.length} category pages use shared data and templates.`);
