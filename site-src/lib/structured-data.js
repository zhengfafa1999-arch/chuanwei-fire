import { SITE_ORIGIN, SITE_ROUTES, resolveSiteRoute } from "../_data/siteRoutes.js";

const ORGANIZATION_ID = `${SITE_ORIGIN}/#organization`;
const WEBSITE_ID = `${SITE_ORIGIN}/#website`;
const LANGUAGE_TAGS = Object.freeze({ en: "en", ar: "ar", zh: "zh-CN" });

function requireText(value, field) {
  if (typeof value !== "string" || !value.trim()) throw new Error(`Structured data requires ${field}.`);
  return value.trim();
}

function httpsUrl(value, field) {
  const url = new URL(requireText(value, field));
  if (url.protocol !== "https:" || url.username || url.password) {
    throw new Error(`Structured data ${field} must be an HTTPS URL without credentials.`);
  }
  return url.href;
}

export function breadcrumbRouteIds(routeId) {
  const definition = SITE_ROUTES[routeId];
  if (!definition) throw new Error(`Unknown structured data route: ${routeId}`);
  if (routeId === "home") return [];
  if (definition.kind === "product") return ["home", "products", definition.category, routeId];
  if (definition.kind === "category") return ["home", "products", routeId];
  return ["home", routeId];
}

function organization() {
  // These details are displayed on the existing home, about and contact pages.
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: "CHUANWEI FIRE",
    url: `${SITE_ORIGIN}/`,
    logo: `${SITE_ORIGIN}/apple-touch-icon.png`,
    email: "zhengcolin1@gmail.com",
    telephone: "+86 173 2652 8368",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nan'an, Quanzhou",
      addressRegion: "Fujian",
      addressCountry: "CN"
    },
    sameAs: ["https://www.facebook.com/chuanweifire/"]
  };
}

export function createStructuredData({ routeId, locale, canonical, name, description, image, breadcrumbs }) {
  const definition = SITE_ROUTES[routeId];
  const target = definition?.locales?.[locale];
  if (!target || target.status !== "published") {
    throw new Error(`Cannot create structured data for unpublished route '${routeId}/${locale}'.`);
  }
  const expectedCanonical = resolveSiteRoute(routeId, locale, target.outputPath).canonical;
  const url = httpsUrl(canonical, "canonical");
  if (url !== expectedCanonical) throw new Error(`Structured data canonical does not match '${routeId}/${locale}'.`);
  const pageName = requireText(name, "page name");
  const pageDescription = requireText(description, "description");
  const pageImage = httpsUrl(image, "image");
  const parentRoutes = breadcrumbRouteIds(routeId);
  if (!Array.isArray(breadcrumbs) || breadcrumbs.length !== parentRoutes.length) {
    throw new Error(`Structured data breadcrumbs do not match the hierarchy for '${routeId}/${locale}'.`);
  }

  const items = breadcrumbs.map((item, index) => {
    const parentRoute = parentRoutes[index];
    const parentTarget = SITE_ROUTES[parentRoute]?.locales?.[locale];
    if (!parentTarget || parentTarget.status !== "published") {
      throw new Error(`Breadcrumb route '${parentRoute}/${locale}' must be published.`);
    }
    const itemUrl = httpsUrl(item.url, "breadcrumb URL");
    if (itemUrl !== resolveSiteRoute(parentRoute, locale, parentTarget.outputPath).canonical) {
      throw new Error(`Breadcrumb URL does not match '${parentRoute}/${locale}'.`);
    }
    return { "@type": "ListItem", position: index + 1, name: requireText(item.name, "breadcrumb name"), item: itemUrl };
  });
  if (items.length && items.at(-1).name !== pageName) {
    throw new Error(`The last breadcrumb must use the current page name for '${routeId}/${locale}'.`);
  }

  const pageType = routeId === "about" ? "AboutPage"
    : routeId === "contact" ? "ContactPage"
      : routeId === "products" || definition.kind === "category" ? "CollectionPage" : "WebPage";
  const page = {
    "@type": pageType,
    "@id": `${url}#webpage`,
    url,
    name: pageName,
    description: pageDescription,
    inLanguage: LANGUAGE_TAGS[locale],
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": ORGANIZATION_ID },
    primaryImageOfPage: { "@type": "ImageObject", url: pageImage },
    ...(items.length ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
    ...(routeId === "about" || routeId === "contact" ? { about: { "@id": ORGANIZATION_ID } } : {})
  };
  const graph = [page];
  if (routeId === "home" || routeId === "about") graph.push(organization());
  if (routeId === "home" && locale === "en") {
    graph.push({
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: `${SITE_ORIGIN}/`,
      name: "CHUANWEI FIRE",
      publisher: { "@id": ORGANIZATION_ID },
      inLanguage: Object.values(LANGUAGE_TAGS)
    });
  }
  if (items.length) graph.push({ "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`, itemListElement: items });
  return { "@context": "https://schema.org", "@graph": graph };
}

export function renderStructuredData(data) {
  if (data?.["@context"] !== "https://schema.org" || !Array.isArray(data["@graph"]) || !data["@graph"].length) {
    throw new Error("A complete structured data graph is required.");
  }
  // HTML does not honor JSON string escaping when looking for a closing script.
  const escapes = { "<": "\\u003c", ">": "\\u003e", "&": "\\u0026", "\u2028": "\\u2028", "\u2029": "\\u2029" };
  const json = JSON.stringify(data, null, 2).replace(/[<>&\u2028\u2029]/g, character => escapes[character]);
  return `<!-- STRUCTURED-DATA:BEGIN -->\n<script type="application/ld+json">\n${json}\n</script>\n<!-- STRUCTURED-DATA:END -->`;
}
