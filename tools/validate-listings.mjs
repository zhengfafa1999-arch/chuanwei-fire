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
// MIG-105: this category is fully translated; do not silently reintroduce an
// English fallback or let a correct image link conceal an incorrect text link.
const alarmRouteIds = [
  "product:wet-alarm-check-valve", "product:diaphragm-deluge-valves",
  "product:preaction-valve-assemblies", "product:dry-pipe-alarm-valves"
];
const alarmFamily = PRODUCT_FAMILIES.find(family => family.routeId === "category:system-valves");
assert(JSON.stringify(alarmFamily.products.map(product => product.routeId)) === JSON.stringify(alarmRouteIds),
  "Alarm category must retain its four existing product families.");
for (const locale of SUPPORTED_LOCALES) {
  const { html, route } = validateListingShell(alarmFamily.routeId, locale);
  const cards = [...html.matchAll(/<article class="product-card">([\s\S]*?)<\/article>/g)].map(match => match[1]);
  assert(cards.length === alarmRouteIds.length, "Alarm category card count changed.");
  alarmRouteIds.forEach((routeId, index) => {
    assert(SITE_ROUTES[routeId].locales[locale].status === "published", `${routeId}/${locale} must not fall back.`);
    assert(SITE_ROUTES[routeId].category === alarmFamily.routeId, `${routeId} has the wrong parent category.`);
    const href = resolveSiteRoute(routeId, locale, route.outputPath).href;
    const links = [...cards[index].matchAll(/<a\b[^>]*href="([^"]+)"/g)].map(match => match[1]);
    assert(links.length === 2 && links.every(link => link === href), `${routeId}/${locale}: image and text links must match the localized product.`);
    assert(cards[index].includes("product-card__badge--localized") && !cards[index].includes("product-card__badge--english"),
      `${routeId}/${locale} has a stale fallback badge.`);
  });
}
console.log("Alarm-category validation passed: four families, eight localized cards and sixteen matching image/text entries.");

// MIG-209: all eight published sprinkler families must stay in their locale.
const sprinklerIds = [
  "standard-response-fire-sprinkler", "glass-bulb-fire-sprinkler",
  "extended-coverage-quick-response-fire-sprinkler", "concealed-pendent-fire-sprinkler",
  "large-k-factor-esfr-sprinklers", "dry-pendent-fire-sprinklers",
  "water-mist-nozzles", "water-curtain-nozzles"
].map(id => `product:${id}`);
const sprinklerFamily = PRODUCT_FAMILIES.find(family => family.routeId === "category:sprinklers");
assert(JSON.stringify(sprinklerFamily.products.map(product => product.routeId)) === JSON.stringify(sprinklerIds),
  "Sprinkler category must retain its eight existing families and their order.");
for (const locale of SUPPORTED_LOCALES) {
  const { html, route } = validateListingShell(sprinklerFamily.routeId, locale);
  const cards = [...html.matchAll(/<article class="product-card">([\s\S]*?)<\/article>/g)].map(match => match[1]);
  assert(cards.length === sprinklerIds.length, "Sprinkler category card count changed.");
  sprinklerIds.forEach((id, index) => {
    assert(SITE_ROUTES[id].locales[locale].status === "published", `${id}/${locale} must not fall back.`);
    assert(SITE_ROUTES[id].category === sprinklerFamily.routeId, `${id}: wrong parent category.`);
    const href = resolveSiteRoute(id, locale, route.outputPath).href;
    const links = [...cards[index].matchAll(/<a\b[^>]*href="([^"]+)"/g)].map(match => match[1]);
    assert(links.length === 2 && links.every(link => link === href), `${id}/${locale}: mismatched image/text entry.`);
    assert(cards[index].includes("product-card__badge--localized") && !cards[index].includes("product-card__badge--english"),
      `${id}/${locale}: stale fallback badge.`);
  });
}
console.log("Sprinkler-category validation passed: eight families, sixteen localized cards and thirty-two matching entries.");

// MIG-305: all four hose reel families are now published in both languages.
const hoseReelIds = [
  "product:ria25-fire-hose-reel", "product:straight-stream-fire-hose-reel",
  "product:jet-spray-fire-hose-reel", "product:heavy-duty-fire-hose-reel"
];
const hoseReelFamily = PRODUCT_FAMILIES.find(family => family.routeId === "category:hose-reels");
assert(JSON.stringify(hoseReelFamily.products.map(product => product.routeId)) === JSON.stringify(hoseReelIds),
  "Hose reel category must retain its four existing families and their order.");
for (const locale of SUPPORTED_LOCALES) {
  const { html, route } = validateListingShell(hoseReelFamily.routeId, locale);
  const cards = [...html.matchAll(/<article class="product-card">([\s\S]*?)<\/article>/g)].map(match => match[1]);
  assert(cards.length === hoseReelIds.length, "Hose reel category card count changed.");
  hoseReelIds.forEach((routeId, index) => {
    assert(SITE_ROUTES[routeId].locales[locale].status === "published", `${routeId}/${locale} must not fall back.`);
    assert(SITE_ROUTES[routeId].category === hoseReelFamily.routeId, `${routeId}: wrong parent category.`);
    const href = resolveSiteRoute(routeId, locale, route.outputPath).href;
    const links = [...cards[index].matchAll(/<a\b[^>]*href="([^"]+)"/g)].map(match => match[1]);
    assert(links.length === 2 && links.every(link => link === href), `${routeId}/${locale}: mismatched image/text entry.`);
    assert(cards[index].includes("product-card__badge--localized") && !cards[index].includes("product-card__badge--english"),
      `${routeId}/${locale}: stale fallback badge.`);
  });
}
console.log("Hose-reel category validation passed: four families, eight localized cards and sixteen matching entries.");

// MIG-405: all four butterfly valve families are now published in both languages.
const butterflyValveIds = [
  "product:lever-operated-grooved-butterfly-valves", "product:lever-operated-wafer-butterfly-valves",
  "product:grooved-supervisory-butterfly-valves", "product:wafer-supervisory-butterfly-valves"
];
const butterflyValveFamily = PRODUCT_FAMILIES.find(family => family.routeId === "category:butterfly-valves");
assert(JSON.stringify(butterflyValveFamily.products.map(product => product.routeId)) === JSON.stringify(butterflyValveIds),
  "Butterfly valve category must retain its four existing families and their order.");
for (const locale of SUPPORTED_LOCALES) {
  const { html, route } = validateListingShell(butterflyValveFamily.routeId, locale);
  const cards = [...html.matchAll(/<article class="product-card">([\s\S]*?)<\/article>/g)].map(match => match[1]);
  assert(cards.length === butterflyValveIds.length, "Butterfly valve category card count changed.");
  butterflyValveIds.forEach((routeId, index) => {
    assert(SITE_ROUTES[routeId].locales[locale].status === "published", `${routeId}/${locale} must not fall back.`);
    assert(SITE_ROUTES[routeId].category === butterflyValveFamily.routeId, `${routeId}: wrong parent category.`);
    const href = resolveSiteRoute(routeId, locale, route.outputPath).href;
    const links = [...cards[index].matchAll(/<a\b[^>]*href="([^"]+)"/g)].map(match => match[1]);
    assert(links.length === 2 && links.every(link => link === href), `${routeId}/${locale}: mismatched image/text entry.`);
    assert(cards[index].includes("product-card__badge--localized") && !cards[index].includes("product-card__badge--english"),
      `${routeId}/${locale}: stale fallback badge.`);
  });
}
console.log("Butterfly-valve category validation passed: four families, eight localized cards and sixteen matching entries.");

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
