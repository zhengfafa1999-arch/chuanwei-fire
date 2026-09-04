import fs from "node:fs";
import path from "node:path";
import {
  SITE_ROUTES,
  SUPPORTED_LOCALES,
  createHomeRoute,
  createProductPageRoute,
  resolveSiteRoute
} from "../site-src/_data/siteRoutes.js";

const root = process.cwd();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function listFormalHtml(directory = root) {
  const results = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === "demo") continue;
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) results.push(...listFormalHtml(absolutePath));
    if (entry.isFile() && entry.name.endsWith(".html") && entry.name !== "guanya_original.html") {
      results.push(path.relative(root, absolutePath).split(path.sep).join("/"));
    }
  }
  return results.sort();
}

const publishedOutputs = [];
for (const [routeId, route] of Object.entries(SITE_ROUTES)) {
  for (const locale of SUPPORTED_LOCALES) {
    const target = route.locales[locale];
    assert(target, `Route '${routeId}' is missing an explicit '${locale}' target or fallback.`);
    const resolved = resolveSiteRoute(routeId, locale, route.locales.en.outputPath);
    assert(resolved.href, `Route '${routeId}' produced an empty '${locale}' href.`);
    if (target.status === "published") publishedOutputs.push(target.outputPath);
  }
  if (route.kind === "product") {
    assert(route.category && SITE_ROUTES[route.category]?.kind === "category", `Product route '${routeId}' has an invalid category.`);
  }
}

const uniquePublished = new Set(publishedOutputs);
assert(uniquePublished.size === publishedOutputs.length, "A published HTML output is registered more than once.");

for (const [routeId, route] of Object.entries(SITE_ROUTES)) {
  for (const [locale, target] of Object.entries(route.locales)) {
    if (target.status === "fallback") {
      assert(uniquePublished.has(target.outputPath), `Fallback '${routeId}/${locale}' points to an unregistered page: ${target.outputPath}`);
    }
  }
}

const formalHtml = listFormalHtml();
for (const outputPath of formalHtml) assert(uniquePublished.has(outputPath), `Formal page is missing from the route registry: ${outputPath}`);

const englishHome = createHomeRoute("en");
const arabicHome = createHomeRoute("ar");
assert(englishHome.languageLinks.ar === "ar/index.html", "English homepage Arabic link is incorrect.");
assert(englishHome.languageLinks.zh === "index.html?lang=zh", "English homepage Chinese link is incorrect.");
assert(englishHome.languageCanonicals["zh-CN"] === "https://chuanweifire.com/?lang=zh", "Chinese homepage canonical is incorrect.");
assert(englishHome.languageCanonicals["x-default"] === englishHome.languageCanonicals.en, "Homepage x-default must match English.");
assert(arabicHome.languageLinks.en === "index.html", "Arabic homepage English link is incorrect for root-based local preview.");
assert(arabicHome.familyHrefs["system-valves"] === "ar/products/system-valves/index.html", "Arabic alarm-valve family link is incorrect.");

for (const routeId of ["product:wet-alarm-check-valve", "product:water-curtain-nozzles", "product:water-mist-nozzles"]) {
  for (const locale of SUPPORTED_LOCALES) {
    const route = createProductPageRoute(routeId, locale);
    assert(route.alternateStatus === "published", `${routeId}/${locale} must have a dedicated translated counterpart.`);
    assert(route.canonical && route.alternate, `${routeId}/${locale} is missing canonical language URLs.`);
  }
}

console.log(`Route validation passed: ${Object.keys(SITE_ROUTES).length} route IDs register ${uniquePublished.size} published outputs and cover all ${formalHtml.length} files currently on disk.`);
