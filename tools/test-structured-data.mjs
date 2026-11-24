import assert from "node:assert/strict";
import test from "node:test";
import { SITE_ORIGIN, SITE_ROUTES, resolveSiteRoute } from "../site-src/_data/siteRoutes.js";
import { createStructuredData, renderStructuredData } from "../site-src/lib/structured-data.js";

const organizationId = `${SITE_ORIGIN}/#organization`;
const websiteId = `${SITE_ORIGIN}/#website`;
const pageTypes = ["WebPage", "AboutPage", "ContactPage", "CollectionPage"];
const typeOf = (node, type) => (Array.isArray(node["@type"]) ? node["@type"] : [node["@type"]]).includes(type);

function input(routeId = "about", locale = "en", overrides = {}) {
  const target = SITE_ROUTES[routeId].locales[locale];
  const canonical = resolveSiteRoute(routeId, locale, target.outputPath).canonical;
  const names = { en: "About CHUANWEI FIRE", ar: "عن شركة CHUANWEI FIRE", zh: "川维消防" };
  const name = names[locale];
  return {
    routeId, locale, canonical, name,
    description: "Fire protection equipment manufacturing and supply.",
    image: `${SITE_ORIGIN}/og-image.jpg`,
    breadcrumbs: routeId === "home" ? [] : [
      { name: locale === "ar" ? "الرئيسية" : "Home", url: resolveSiteRoute("home", locale, SITE_ROUTES.home.locales[locale].outputPath).canonical },
      { name, url: canonical }
    ],
    ...overrides
  };
}

function pageOf(data) {
  return data["@graph"].find(node => pageTypes.some(type => typeOf(node, type)));
}

test("JSON-LD stays inside one inert script and preserves hostile-looking text and all languages", () => {
  const name = '</script><script>alert("x")</script> & 中文\u2028العربية\u2029 text';
  const options = input("about", "en");
  options.name = name;
  options.description = `Quotation " and ampersand &; ${name}`;
  options.breadcrumbs[1].name = name;
  const graph = createStructuredData(options);
  const rendered = renderStructuredData(graph);
  assert.equal((rendered.match(/<script\b/gi) ?? []).length, 1);
  assert.equal((rendered.match(/<\/script\s*>/gi) ?? []).length, 1);
  assert(rendered.includes("<!-- STRUCTURED-DATA:BEGIN -->"));
  assert(rendered.includes("<!-- STRUCTURED-DATA:END -->"));
  const body = rendered.match(/<script\b[^>]*>([\s\S]*?)<\/script\s*>/i)?.[1];
  assert(body);
  assert(!body.includes("<"), "A JSON string must not break out of the script element.");
  assert.deepEqual(JSON.parse(body), graph);
  assert.equal(pageOf(JSON.parse(body)).name, name);
});

test("English root home defines the one website and organization, without an invalid single-item breadcrumb", () => {
  const data = createStructuredData(input("home", "en"));
  assert.equal(data["@context"], "https://schema.org");
  assert.equal(data["@graph"].filter(node => typeOf(node, "WebSite")).length, 1);
  assert.equal(data["@graph"].filter(node => typeOf(node, "Organization")).length, 1);
  assert.equal(data["@graph"].filter(node => typeOf(node, "BreadcrumbList")).length, 0);
  const website = data["@graph"].find(node => typeOf(node, "WebSite"));
  assert.equal(website["@id"], websiteId);
  assert.equal(website.publisher["@id"], organizationId);
  assert.equal(pageOf(data).url, `${SITE_ORIGIN}/`);
});

test("Arabic and Chinese homes reference the same website without claiming separate subdirectory sites", () => {
  for (const [locale, language] of [["ar", "ar"], ["zh", "zh-CN"]]) {
    const data = createStructuredData(input("home", locale));
    assert.equal(data["@graph"].filter(node => typeOf(node, "WebSite")).length, 0);
    assert.equal(data["@graph"].filter(node => typeOf(node, "BreadcrumbList")).length, 0);
    assert.equal(pageOf(data).inLanguage, language);
    assert.equal(pageOf(data).isPartOf["@id"], websiteId);
    assert.equal(pageOf(data).publisher["@id"], organizationId);
    assert.equal(data["@graph"].find(node => typeOf(node, "Organization")).inLanguage, undefined);
  }
});

test("Arabic product breadcrumbs link to real localized parent pages and make no price or certification claims", () => {
  const routeId = "product:standard-response-fire-sprinkler";
  const options = input(routeId, "ar", { name: "رشاشات الحريق ذات الاستجابة القياسية" });
  const ids = ["home", "products", "category:sprinklers", routeId];
  const names = ["الرئيسية", "المنتجات", "رشاشات الحريق", options.name];
  options.breadcrumbs = ids.map((id, index) => ({ name: names[index], url: resolveSiteRoute(id, "ar", SITE_ROUTES[id].locales.ar.outputPath).canonical }));
  const data = createStructuredData(options);
  const trail = data["@graph"].find(node => typeOf(node, "BreadcrumbList"));
  assert.equal(trail.itemListElement.length, 4);
  assert.deepEqual(trail.itemListElement.map(item => item.position), [1, 2, 3, 4]);
  assert.deepEqual(trail.itemListElement.map(item => item.item), options.breadcrumbs.map(item => item.url));
  assert.equal(pageOf(data).breadcrumb["@id"], trail["@id"]);
  const json = JSON.stringify(data);
  assert(!/"(?:Product|offers|price|aggregateRating|review|hasCertification)"/.test(json));
});

test("invalid route, locale, canonical and required content fail before emitting structured data", () => {
  assert.throws(() => createStructuredData(input("about", "en", { routeId: "missing-route" })));
  assert.throws(() => createStructuredData(input("about", "en", { locale: "fr" })));
  assert.throws(() => createStructuredData(input("about", "en", { canonical: "https://example.com/about.html" })));
  assert.throws(() => createStructuredData(input("about", "en", { canonical: `${SITE_ORIGIN}/contact.html` })));
  assert.throws(() => createStructuredData(input("about", "en", { name: "  " })));
  assert.throws(() => createStructuredData(input("about", "en", { description: "" })));
});

test("non-home trails require at least two valid items ending at the current canonical", () => {
  const options = input();
  assert.throws(() => createStructuredData({ ...options, breadcrumbs: [] }));
  assert.throws(() => createStructuredData({ ...options, breadcrumbs: options.breadcrumbs.slice(1) }));
  assert.throws(() => createStructuredData({ ...options, breadcrumbs: [options.breadcrumbs[0], { name: options.name, url: "https://example.com/about.html" }] }));
  assert.throws(() => createStructuredData({ ...options, breadcrumbs: [options.breadcrumbs[0], { name: options.name, url: `${SITE_ORIGIN}/contact.html` }] }));
});

test("image inputs cannot introduce insecure URLs or credentials into public metadata", () => {
  for (const image of ["", "/og-image.jpg", "http://chuanweifire.com/og-image.jpg", "javascript:alert(1)", "https://user:password@chuanweifire.com/og-image.jpg"]) {
    assert.throws(() => createStructuredData(input("about", "en", { image })));
  }
});
