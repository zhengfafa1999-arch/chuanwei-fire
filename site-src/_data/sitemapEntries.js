import { SITE_ROUTES, resolveSiteRoute } from "./siteRoutes.js";

const entries = [];

for (const [routeId, definition] of Object.entries(SITE_ROUTES)) {
  const indexableLocales = Object.keys(definition.locales).filter((locale) => ["published", "inline"].includes(definition.locales[locale]?.status));
  for (const locale of indexableLocales) {
    const target = definition.locales[locale];
    const canonical = resolveSiteRoute(routeId, locale, target.outputPath).canonical;
    const alternates = Object.fromEntries(indexableLocales.map((alternateLocale) => [
      alternateLocale === "zh" ? "zh-CN" : alternateLocale,
      resolveSiteRoute(routeId, alternateLocale, target.outputPath).canonical
    ]));
    entries.push({
      routeId,
      locale,
      canonical,
      alternates,
      xDefault: alternates.en || canonical,
      priority: routeId === "home" ? "1.0" : definition.kind === "core" ? "0.9" : "0.8"
    });
  }
}

export default entries;
