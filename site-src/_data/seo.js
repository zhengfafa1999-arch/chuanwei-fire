import { SITE_ROUTES, resolveSiteRoute } from "./siteRoutes.js";

const HREFLANG_BY_LOCALE = Object.freeze({ en: "en", zh: "zh-CN", ar: "ar" });
const OPEN_GRAPH_LOCALE_BY_LOCALE = Object.freeze({ en: "en_US", zh: "zh_CN", ar: "ar_AR" });

function requireText(value, field, routeId, locale) {
  const normalized = String(value ?? "").trim();
  if (!normalized) throw new Error(`SEO ${field} is required for '${routeId}/${locale}'.`);
  return normalized;
}

function requireAbsoluteUrl(value, field, routeId, locale) {
  const normalized = requireText(value, field, routeId, locale);
  let url;
  try {
    url = new URL(normalized);
  } catch {
    throw new Error(`SEO ${field} must be an absolute URL for '${routeId}/${locale}': ${normalized}`);
  }
  if (!/^https?:$/.test(url.protocol)) throw new Error(`SEO ${field} must use HTTP(S) for '${routeId}/${locale}'.`);
  return url.href;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function createSeoMetadata(routeId, locale, { title, description, image, type = "website" }) {
  const definition = SITE_ROUTES[routeId];
  const target = definition?.locales?.[locale];
  if (!definition || !target || target.status !== "published") {
    throw new Error(`Cannot create SEO metadata for unpublished route '${routeId}/${locale}'.`);
  }

  const canonical = resolveSiteRoute(routeId, locale, target.outputPath).canonical;
  const alternates = Object.entries(definition.locales)
    .filter(([, candidate]) => candidate.status === "published")
    .map(([alternateLocale, candidate]) => ({
      locale: alternateLocale,
      hreflang: HREFLANG_BY_LOCALE[alternateLocale] ?? alternateLocale,
      href: resolveSiteRoute(routeId, alternateLocale, candidate.outputPath).canonical
    }));
  const xDefault = alternates.find((alternate) => alternate.locale === "en")?.href ?? canonical;

  return Object.freeze({
    routeId,
    locale,
    title: requireText(title, "title", routeId, locale),
    description: requireText(description, "description", routeId, locale),
    canonical,
    alternates,
    xDefault,
    type,
    image: requireAbsoluteUrl(image, "image", routeId, locale),
    imageAlt: requireText(title, "image alt", routeId, locale),
    openGraphLocale: OPEN_GRAPH_LOCALE_BY_LOCALE[locale] ?? locale,
    alternateOpenGraphLocales: alternates
      .filter((alternate) => alternate.locale !== locale)
      .map((alternate) => OPEN_GRAPH_LOCALE_BY_LOCALE[alternate.locale] ?? alternate.locale)
  });
}

export function renderSeoTags(seo) {
  if (!seo?.canonical || !Array.isArray(seo.alternates)) throw new Error("Complete SEO metadata is required.");

  const lines = [
    "<!-- SEO:BEGIN -->",
    `<title>${escapeHtml(seo.title)}</title>`,
    `<meta name="description" content="${escapeHtml(seo.description)}">`,
    '<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">',
    `<link rel="canonical" href="${escapeHtml(seo.canonical)}">`,
    ...seo.alternates.map((alternate) => `<link rel="alternate" hreflang="${escapeHtml(alternate.hreflang)}" href="${escapeHtml(alternate.href)}">`),
    `<link rel="alternate" hreflang="x-default" href="${escapeHtml(seo.xDefault)}">`,
    `<meta property="og:type" content="${escapeHtml(seo.type)}">`,
    '<meta property="og:site_name" content="CHUANWEI FIRE">',
    `<meta property="og:title" content="${escapeHtml(seo.title)}">`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}">`,
    `<meta property="og:url" content="${escapeHtml(seo.canonical)}">`,
    `<meta property="og:image" content="${escapeHtml(seo.image)}">`,
    `<meta property="og:image:alt" content="${escapeHtml(seo.imageAlt)}">`,
    `<meta property="og:locale" content="${escapeHtml(seo.openGraphLocale)}">`,
    ...seo.alternateOpenGraphLocales.map((locale) => `<meta property="og:locale:alternate" content="${escapeHtml(locale)}">`),
    '<meta name="twitter:card" content="summary_large_image">',
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}">`,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}">`,
    `<meta name="twitter:image" content="${escapeHtml(seo.image)}">`,
    `<meta name="twitter:image:alt" content="${escapeHtml(seo.imageAlt)}">`,
    "<!-- SEO:END -->"
  ];

  return lines.join("\n");
}

export const SEO_LANGUAGE_TAGS = HREFLANG_BY_LOCALE;
export const SEO_OPEN_GRAPH_LOCALES = OPEN_GRAPH_LOCALE_BY_LOCALE;
