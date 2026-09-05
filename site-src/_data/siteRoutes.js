import path from "node:path";

export const SITE_ORIGIN = "https://chuanweifire.com";
export const SUPPORTED_LOCALES = ["en", "ar"];

const published = (outputPath) => ({ outputPath, status: "published" });
const fallback = (outputPath, fragment = "") => ({ outputPath, fragment, status: "fallback" });

// The single registry for language counterparts. Fallbacks point to a real
// localized catalog section until a dedicated translated page is published.
export const SITE_ROUTES = {
  home: { kind: "core", locales: { en: published("index.html"), zh: published("zh/index.html"), ar: published("ar/index.html") } },
  products: { kind: "core", locales: { en: published("products.html"), ar: published("ar/products.html") } },
  about: { kind: "core", locales: { en: published("about.html"), ar: published("ar/about.html") } },
  downloads: { kind: "core", locales: { en: published("downloads.html"), ar: published("ar/downloads.html") } },
  contact: { kind: "core", locales: { en: published("contact.html"), ar: published("ar/contact.html") } },

  "category:sprinklers": { kind: "category", locales: { en: published("products/消防喷头.html"), ar: published("ar/products/sprinklers/index.html") } },
  "category:system-valves": { kind: "category", locales: { en: published("products/消防阀.html"), ar: published("ar/products/system-valves/index.html") } },
  "category:butterfly-valves": { kind: "category", locales: { en: published("products/消防蝶阀.html"), ar: published("ar/products/butterfly-valves/index.html") } },
  "category:gate-valves": { kind: "category", locales: { en: published("products/消防阀门.html"), ar: published("ar/products/gate-valves/index.html") } },
  "category:hose-reels": { kind: "category", locales: { en: published("products/软管卷盘.html"), ar: published("ar/products/hose-reels/index.html") } },
  "category:hoses-nozzles-couplings": { kind: "category", locales: { en: published("products/消防水枪.html"), ar: published("ar/products/hoses-nozzles-couplings/index.html") } },
  "category:indoor-hydrants": { kind: "category", locales: { en: published("products/室内消防栓/室内消防栓.html"), ar: published("ar/products/indoor-hydrants/index.html") } },
  "category:outdoor-hydrants": { kind: "category", locales: { en: published("products/室外消防栓/室外消防栓.html"), ar: published("ar/products/outdoor-hydrants/index.html") } },
  "category:fire-department-connections": { kind: "category", locales: { en: published("products/消防水泵接合器.html"), ar: published("ar/products/fire-department-connections/index.html") } },

  "product:wet-alarm-check-valve": { kind: "product", category: "category:system-valves", locales: { en: published("products/消防阀/wet-alarm-check-valve-assemblies.html"), ar: published("ar/products/wet-alarm-check-valve/index.html") } },
  "product:diaphragm-deluge-valves": { kind: "product", category: "category:system-valves", locales: { en: published("products/消防阀/diaphragm-deluge-valves.html"), ar: published("ar/products/diaphragm-deluge-valves/index.html") } },
  "product:preaction-valve-assemblies": { kind: "product", category: "category:system-valves", locales: { en: published("products/消防阀/preaction-valve-assemblies.html"), ar: published("ar/products/preaction-valve-assemblies/index.html") } },
  "product:dry-pipe-alarm-valves": { kind: "product", category: "category:system-valves", locales: { en: published("products/消防阀/dry-pipe-alarm-valves.html"), ar: published("ar/products/dry-pipe-alarm-valves/index.html") } },

  "product:water-curtain-nozzles": { kind: "product", category: "category:sprinklers", locales: { en: published("products/消防喷头/water-curtain-nozzles.html"), ar: published("ar/products/water-curtain-nozzles/index.html") } },
  "product:water-mist-nozzles": { kind: "product", category: "category:sprinklers", locales: { en: published("products/消防喷头/water-mist-nozzles.html"), ar: published("ar/products/water-mist-nozzles/index.html") } },
  "product:standard-response-fire-sprinkler": { kind: "product", category: "category:sprinklers", locales: { en: published("products/消防喷头/standard-response-fire-sprinkler.html"), ar: published("ar/products/standard-response-fire-sprinkler/index.html") } },
  "product:glass-bulb-fire-sprinkler": { kind: "product", category: "category:sprinklers", locales: { en: published("products/消防喷头/glass-bulb-fire-sprinkler.html"), ar: published("ar/products/glass-bulb-fire-sprinkler/index.html") } },
  "product:concealed-pendent-fire-sprinkler": { kind: "product", category: "category:sprinklers", locales: { en: published("products/消防喷头/concealed-pendent-fire-sprinkler.html"), ar: published("ar/products/concealed-pendent-fire-sprinkler/index.html") } },
  "product:dry-pendent-fire-sprinklers": { kind: "product", category: "category:sprinklers", locales: { en: published("products/消防喷头/dry-pendent-fire-sprinklers.html"), ar: published("ar/products/dry-pendent-fire-sprinklers/index.html") } },
  "product:extended-coverage-quick-response-fire-sprinkler": { kind: "product", category: "category:sprinklers", locales: { en: published("products/消防喷头/extended-coverage-quick-response-fire-sprinkler.html"), ar: published("ar/products/extended-coverage-quick-response-fire-sprinkler/index.html") } },
  "product:large-k-factor-esfr-sprinklers": { kind: "product", category: "category:sprinklers", locales: { en: published("products/消防喷头/large-k-factor-esfr-sprinklers.html"), ar: published("ar/products/large-k-factor-esfr-sprinklers/index.html") } },

  "product:ria25-fire-hose-reel": { kind: "product", category: "category:hose-reels", locales: { en: published("products/软管卷盘/ria25-fire-hose-reel.html"), ar: fallback("ar/products/hose-reels/index.html") } },
  "product:straight-stream-fire-hose-reel": { kind: "product", category: "category:hose-reels", locales: { en: published("products/软管卷盘/straight-stream-fire-hose-reel.html"), ar: fallback("ar/products/hose-reels/index.html") } },
  "product:jet-spray-fire-hose-reel": { kind: "product", category: "category:hose-reels", locales: { en: published("products/软管卷盘/jet-spray-fire-hose-reel.html"), ar: fallback("ar/products/hose-reels/index.html") } },
  "product:heavy-duty-fire-hose-reel": { kind: "product", category: "category:hose-reels", locales: { en: published("products/软管卷盘/heavy-duty-fire-hose-reel.html"), ar: fallback("ar/products/hose-reels/index.html") } },

  "product:lever-operated-grooved-butterfly-valves": { kind: "product", category: "category:butterfly-valves", locales: { en: published("products/消防蝶阀/lever-operated-grooved-butterfly-valves.html"), ar: fallback("ar/products/butterfly-valves/index.html") } },
  "product:lever-operated-wafer-butterfly-valves": { kind: "product", category: "category:butterfly-valves", locales: { en: published("products/消防蝶阀/lever-operated-wafer-butterfly-valves.html"), ar: fallback("ar/products/butterfly-valves/index.html") } },
  "product:grooved-supervisory-butterfly-valves": { kind: "product", category: "category:butterfly-valves", locales: { en: published("products/消防蝶阀/grooved-supervisory-butterfly-valves.html"), ar: fallback("ar/products/butterfly-valves/index.html") } },
  "product:wafer-supervisory-butterfly-valves": { kind: "product", category: "category:butterfly-valves", locales: { en: published("products/消防蝶阀/wafer-supervisory-butterfly-valves.html"), ar: fallback("ar/products/butterfly-valves/index.html") } },

  "product:flanged-supervisory-gate-valves": { kind: "product", category: "category:gate-valves", locales: { en: published("products/消防阀门/flanged-supervisory-gate-valves.html"), ar: fallback("ar/products/gate-valves/index.html") } },
  "product:grooved-supervisory-gate-valves": { kind: "product", category: "category:gate-valves", locales: { en: published("products/消防阀门/grooved-supervisory-gate-valves.html"), ar: fallback("ar/products/gate-valves/index.html") } },
  "product:nrs-gate-valves": { kind: "product", category: "category:gate-valves", locales: { en: published("products/消防阀门/nrs-gate-valves.html"), ar: fallback("ar/products/gate-valves/index.html") } },
  "product:osy-gate-valves": { kind: "product", category: "category:gate-valves", locales: { en: published("products/消防阀门/osy-gate-valves.html"), ar: fallback("ar/products/gate-valves/index.html") } },

  "product:standard-indoor-hydrant": { kind: "product", category: "category:indoor-hydrants", locales: { en: published("products/室内消防栓/standard-indoor-hydrant.html"), ar: fallback("ar/products/indoor-hydrants/index.html") } },
  "product:export-slanted-hydrant-valve": { kind: "product", category: "category:indoor-hydrants", locales: { en: published("products/室内消防栓/export-slanted-hydrant-valve.html"), ar: fallback("ar/products/indoor-hydrants/index.html") } },
  "product:double-outlet-hydrant": { kind: "product", category: "category:indoor-hydrants", locales: { en: published("products/室内消防栓/double-outlet-hydrant.html"), ar: fallback("ar/products/indoor-hydrants/index.html") } },
  "product:rotating-pressure-regulating-hydrant": { kind: "product", category: "category:indoor-hydrants", locales: { en: published("products/室内消防栓/rotating-pressure-regulating-hydrant.html"), ar: fallback("ar/products/indoor-hydrants/index.html") } },

  "product:bs750-pillar-hydrant": { kind: "product", category: "category:outdoor-hydrants", locales: { en: published("products/室外消防栓/bs750-pillar-hydrant.html"), ar: fallback("ar/products/outdoor-hydrants/index.html") } },
  "product:french-pattern-hydrant": { kind: "product", category: "category:outdoor-hydrants", locales: { en: published("products/室外消防栓/french-pattern-hydrant.html"), ar: fallback("ar/products/outdoor-hydrants/index.html") } },
  "product:indonesian-pattern-hydrant": { kind: "product", category: "category:outdoor-hydrants", locales: { en: published("products/室外消防栓/indonesian-pattern-hydrant.html"), ar: fallback("ar/products/outdoor-hydrants/index.html") } },
  "product:russian-pattern-hydrant": { kind: "product", category: "category:outdoor-hydrants", locales: { en: published("products/室外消防栓/russian-pattern-hydrant.html"), ar: fallback("ar/products/outdoor-hydrants/index.html") } }
};

function canonicalFor(outputPath) {
  const webPath = outputPath === "index.html"
    ? "/"
    : `/${outputPath.endsWith("/index.html") ? outputPath.slice(0, -"index.html".length) : outputPath}`;
  return new URL(webPath, SITE_ORIGIN).href;
}

function canonicalForTarget(target) {
  const canonical = canonicalFor(target.outputPath);
  return target.query ? `${canonical}?${target.query}` : canonical;
}

function appendLocation(href, target) {
  const query = target.query ? `?${target.query}` : "";
  const fragment = target.fragment ? `#${target.fragment}` : "";
  return `${href}${query}${fragment}`;
}

export function hrefBetween(fromOutputPath, target, rootBased = false) {
  const fromDirectory = rootBased ? "." : path.posix.dirname(fromOutputPath);
  let href = path.posix.relative(fromDirectory, target.outputPath);
  if (!href) href = path.posix.basename(target.outputPath);
  return appendLocation(href, target);
}

export function assetPrefixFor(outputPath) {
  const prefix = path.posix.relative(path.posix.dirname(outputPath), ".");
  return prefix ? `${prefix}/` : "";
}

export function resolveSiteRoute(routeId, locale, fromOutputPath, options = {}) {
  const definition = SITE_ROUTES[routeId];
  if (!definition) throw new Error(`Unknown site route: ${routeId}`);
  const target = definition.locales[locale];
  if (!target) throw new Error(`Route '${routeId}' has no '${locale}' target or fallback.`);
  return {
    routeId,
    locale,
    kind: definition.kind,
    status: target.status,
    outputPath: target.outputPath,
    href: hrefBetween(fromOutputPath, target, options.rootBased),
    canonical: target.status === "fallback" ? null : canonicalForTarget(target)
  };
}

export function createHomeRoute(locale) {
  const current = SITE_ROUTES.home.locales[locale];
  if (!current || current.status !== "published") throw new Error(`Homepage locale '${locale}' is not published.`);
  const outputPath = current.outputPath;
  const rootBased = false;
  const destinationLocale = locale === "zh" ? "en" : locale;
  const familyIds = ["sprinklers", "system-valves", "butterfly-valves", "gate-valves", "hose-reels", "hoses-nozzles-couplings", "indoor-hydrants", "outdoor-hydrants", "fire-department-connections"];
  return {
    outputPath,
    canonical: canonicalFor(outputPath),
    languageCanonicals: {
      en: canonicalForTarget(SITE_ROUTES.home.locales.en),
      "zh-CN": canonicalForTarget(SITE_ROUTES.home.locales.zh),
      ar: canonicalForTarget(SITE_ROUTES.home.locales.ar),
      "x-default": canonicalForTarget(SITE_ROUTES.home.locales.en)
    },
    languageLinks: {
      en: resolveSiteRoute("home", "en", outputPath, { rootBased }).href,
      zh: hrefBetween(outputPath, SITE_ROUTES.home.locales.zh, rootBased),
      ar: resolveSiteRoute("home", "ar", outputPath, { rootBased }).href
    },
    familyHrefs: Object.fromEntries(familyIds.map((familyId) => [familyId, resolveSiteRoute(`category:${familyId}`, destinationLocale, outputPath, { rootBased }).href])),
    coreHrefs: Object.fromEntries(["about", "downloads", "contact"].map((routeId) => [routeId, resolveSiteRoute(routeId, destinationLocale, outputPath, { rootBased }).href]))
  };
}

export function createProductPageRoute(routeId, locale) {
  const definition = SITE_ROUTES[routeId];
  if (!definition || definition.kind !== "product") throw new Error(`Unknown product route: ${routeId}`);
  const currentTarget = definition.locales[locale];
  if (!currentTarget || currentTarget.status !== "published") throw new Error(`Product route '${routeId}' is not published in '${locale}'.`);
  const outputPath = currentTarget.outputPath;
  const alternateLocale = locale === "en" ? "ar" : "en";
  const current = resolveSiteRoute(routeId, locale, outputPath);
  const alternate = resolveSiteRoute(routeId, alternateLocale, outputPath);
  return {
    outputPath,
    selfHref: current.href,
    canonical: current.canonical,
    alternate: alternate.canonical,
    alternateHref: alternate.href,
    alternateStatus: alternate.status,
    homeHref: resolveSiteRoute("home", locale, outputPath).href,
    categoryHref: resolveSiteRoute(definition.category, locale, outputPath).href,
    assetPrefix: assetPrefixFor(outputPath)
  };
}

export function createListingPageRoute(routeId, locale) {
  const definition = SITE_ROUTES[routeId];
  if (!definition || !["core", "category"].includes(definition.kind)) throw new Error(`Unknown listing route: ${routeId}`);
  const currentTarget = definition.locales[locale];
  if (!currentTarget || currentTarget.status !== "published") throw new Error(`Listing route '${routeId}' is not published in '${locale}'.`);
  const outputPath = currentTarget.outputPath;
  const alternateLocale = locale === "en" ? "ar" : "en";
  const current = resolveSiteRoute(routeId, locale, outputPath);
  const alternate = resolveSiteRoute(routeId, alternateLocale, outputPath);
  return {
    outputPath,
    canonical: current.canonical,
    alternate: alternate.canonical,
    alternateHref: alternate.href,
    selfHref: current.href,
    homeHref: resolveSiteRoute("home", locale, outputPath).href,
    productsHref: resolveSiteRoute("products", locale, outputPath).href,
    aboutHref: resolveSiteRoute("about", locale, outputPath).href,
    downloadsHref: resolveSiteRoute("downloads", locale, outputPath).href,
    contactHref: resolveSiteRoute("contact", locale, outputPath).href,
    assetPrefix: assetPrefixFor(outputPath),
    languageLinks: {
      en: resolveSiteRoute(routeId, "en", outputPath).href,
      ar: resolveSiteRoute(routeId, "ar", outputPath).href
    }
  };
}

export default SITE_ROUTES;
