import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { SITE_ORIGIN, SITE_ROUTES, resolveSiteRoute } from "../site-src/_data/siteRoutes.js";

const root = process.cwd();
const organizationId = `${SITE_ORIGIN}/#organization`;
const websiteId = `${SITE_ORIGIN}/#website`;
const languages = { en: "en", ar: "ar", zh: "zh-CN" };
const pageTypes = ["WebPage", "AboutPage", "ContactPage", "CollectionPage"];
const allowedTypes = new Set([...pageTypes, "Organization", "WebSite", "BreadcrumbList"]);
const unsupportedClaims = new Set(["offers", "price", "priceSpecification", "review", "reviews", "aggregateRating", "ratingValue", "hasCertification", "award", "awards"]);

function readAttribute(tag, name) {
  return tag.match(new RegExp(`\\s${name}\\s*=\\s*(["'])(.*?)\\1`, "is"))?.[2] ?? null;
}

function decodeText(value) {
  return value.replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replaceAll("&quot;", '"').replaceAll("&#39;", "'").replaceAll("&apos;", "'")
    .replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&nbsp;", " ").replaceAll("&amp;", "&")
    .replace(/\s+/g, " ").trim();
}

function heading(html) {
  const matches = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
  assert.equal(matches.length, 1, "Structured data requires one unambiguous visible H1.");
  return decodeText(matches[0][1].replace(/<[^>]*>/g, " "));
}

function hasType(node, type) {
  return (Array.isArray(node["@type"]) ? node["@type"] : [node["@type"]]).includes(type);
}

function localUrl(value, label) {
  assert.equal(typeof value, "string", `${label} must be an absolute URL.`);
  const url = new URL(value);
  assert.equal(url.protocol, "https:", `${label} must use HTTPS.`);
  assert.equal(url.origin, SITE_ORIGIN, `${label} must use the canonical site origin.`);
  assert(!url.username && !url.password, `${label} must not contain credentials.`);
  let relative = decodeURIComponent(url.pathname).replace(/^\/+/, "");
  if (!relative || relative.endsWith("/")) relative += "index.html";
  const target = path.resolve(root, relative);
  assert(target.startsWith(root + path.sep), `${label} must remain inside the website.`);
  assert(fs.existsSync(target) && fs.statSync(target).isFile(), `${label} does not resolve to an existing public file: ${value}`);
  return url.href;
}

function rejectUnverifiedClaims(value, label) {
  if (!value || typeof value !== "object") return;
  for (const [key, child] of Object.entries(value)) {
    assert(!unsupportedClaims.has(key), `${label} contains an unsupported commercial or certification claim: ${key}`);
    rejectUnverifiedClaims(child, label);
  }
}

const pages = Object.entries(SITE_ROUTES).flatMap(([routeId, definition]) => Object.entries(definition.locales)
  .filter(([, target]) => target.status === "published")
  .map(([locale, target]) => ({ routeId, definition, locale, target, canonical: resolveSiteRoute(routeId, locale, target.outputPath).canonical })));
const infoByCanonical = new Map(pages.map(page => {
  const html = fs.readFileSync(path.join(root, page.target.outputPath), "utf8");
  return [page.canonical, { ...page, html, name: heading(html) }];
}));
let breadcrumbCount = 0;
let organizationCount = 0;
let websiteCount = 0;

for (const { routeId, definition, locale, target, canonical } of pages) {
  const label = target.outputPath;
  const { html, name } = infoByCanonical.get(canonical);
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1];
  assert(head, `${label} has no document head.`);
  assert.equal((html.match(/<!-- STRUCTURED-DATA:BEGIN -->/g) ?? []).length, 1, `${label} must contain one managed structured data block.`);
  assert.equal((html.match(/<!-- STRUCTURED-DATA:END -->/g) ?? []).length, 1, `${label} must contain one structured data end marker.`);
  const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)]
    .filter(match => readAttribute(`<script ${match[1]}>`, "type")?.toLowerCase() === "application/ld+json");
  assert.equal(scripts.length, 1, `${label} must have exactly one JSON-LD script.`);
  assert(head.includes(scripts[0][0]), `${label} JSON-LD must be inside the head.`);
  const data = JSON.parse(scripts[0][2]);
  assert.equal(data["@context"], "https://schema.org", `${label} has an incorrect schema context.`);
  assert(Array.isArray(data["@graph"]) && data["@graph"].length, `${label} has no schema graph.`);
  rejectUnverifiedClaims(data, label);
  const graph = data["@graph"];
  const ids = new Set();
  for (const node of graph) {
    const types = Array.isArray(node["@type"]) ? node["@type"] : [node["@type"]];
    assert(types.length && types.every(type => allowedTypes.has(type)), `${label} contains an unexpected schema type: ${types.join(", ")}`);
    assert(node["@id"] && !ids.has(node["@id"]), `${label} has a missing or duplicate schema identifier.`);
    localUrl(node["@id"], `${label} schema identifier`);
    ids.add(node["@id"]);
  }
  const webPages = graph.filter(node => pageTypes.some(type => hasType(node, type)));
  assert.equal(webPages.length, 1, `${label} must identify exactly one current WebPage.`);
  const page = webPages[0];
  assert.equal(page.url, canonical, `${label} schema URL must match its registered canonical.`);
  assert.equal(page.name, name, `${label} schema name must match the visible H1.`);
  assert.equal(page.inLanguage, languages[locale], `${label} has incorrect schema language.`);
  assert.equal(page.publisher?.["@id"], organizationId, `${label} must reference the same publisher.`);
  assert.equal(page.isPartOf?.["@id"], websiteId, `${label} must reference the same website.`);
  assert.equal(typeof page.description, "string", `${label} needs a page description.`);
  assert(page.description.trim(), `${label} has an empty page description.`);
  const descriptionTag = [...html.matchAll(/<meta\b[^>]*>/gi)].find(match => readAttribute(match[0], "name") === "description")?.[0];
  assert.equal(page.description, decodeText(readAttribute(descriptionTag ?? "", "content") ?? ""), `${label} schema description must match the public description.`);
  const image = page.primaryImageOfPage;
  if (image) localUrl(typeof image === "string" ? image : image.url ?? image.contentUrl, `${label} primary image`);

  const breadcrumbs = graph.filter(node => hasType(node, "BreadcrumbList"));
  if (routeId === "home") {
    assert.equal(breadcrumbs.length, 0, `${label} homepage must not create a one-item breadcrumb.`);
    assert.equal(page.breadcrumb, undefined, `${label} homepage must not reference a missing breadcrumb.`);
  } else {
    assert.equal(breadcrumbs.length, 1, `${label} must contain one breadcrumb trail.`);
    const trail = breadcrumbs[0];
    assert.equal(page.breadcrumb?.["@id"], trail["@id"], `${label} must link its page to the breadcrumb trail.`);
    const routeIds = definition.kind === "product" ? ["home", "products", definition.category, routeId]
      : definition.kind === "category" ? ["home", "products", routeId] : ["home", routeId];
    assert(Array.isArray(trail.itemListElement), `${label} needs breadcrumb items.`);
    assert.equal(trail.itemListElement.length, routeIds.length, `${label} has an incorrect breadcrumb depth.`);
    for (const [index, item] of trail.itemListElement.entries()) {
      assert.equal(item["@type"], "ListItem", `${label} breadcrumb entries must be ListItem objects.`);
      assert.equal(item.position, index + 1, `${label} breadcrumb positions must be continuous and start at 1.`);
      assert.equal(typeof item.name, "string", `${label} breadcrumb entries need a name.`);
      assert(item.name.trim(), `${label} contains an empty breadcrumb label.`);
      const expectedTarget = SITE_ROUTES[routeIds[index]].locales[locale];
      assert(expectedTarget?.status === "published", `${label} breadcrumb points to an unpublished language route.`);
      const expectedUrl = resolveSiteRoute(routeIds[index], locale, expectedTarget.outputPath).canonical;
      assert.equal(localUrl(item.item, `${label} breadcrumb item`), expectedUrl, `${label} breadcrumb hierarchy differs from the route registry.`);
      if (index === trail.itemListElement.length - 1 || routeIds[index].startsWith("category:")) {
        assert.equal(item.name, infoByCanonical.get(expectedUrl).name, `${label} breadcrumb name differs from the target page H1.`);
      }
    }
    breadcrumbCount += 1;
  }

  const organizations = graph.filter(node => hasType(node, "Organization"));
  const shouldDescribeOrganization = ["home", "about"].includes(routeId);
  assert.equal(organizations.length, shouldDescribeOrganization ? 1 : 0, `${label} has an unexpected Organization placement.`);
  for (const organization of organizations) {
    assert.equal(organization["@id"], organizationId, `${label} uses a different organization identifier.`);
    assert.equal(organization.name, "CHUANWEI FIRE", `${label} has an unsupported organization name.`);
    assert.equal(organization.url, `${SITE_ORIGIN}/`, `${label} has a different organization URL.`);
    const logo = typeof organization.logo === "string" ? organization.logo : organization.logo?.url ?? organization.logo?.contentUrl;
    assert.equal(localUrl(logo, `${label} logo`), `${SITE_ORIGIN}/apple-touch-icon.png`, `${label} must use the public company logo.`);
    assert.equal(organization.email, "zhengcolin1@gmail.com", `${label} has an unsupported company email.`);
    assert.equal(organization.address?.["@type"], "PostalAddress", `${label} needs a company address object.`);
    assert.equal(organization.address.addressCountry, "CN", `${label} has an unsupported address country.`);
    assert.equal(organization.inLanguage, undefined, `${label} must not put CreativeWork.inLanguage on Organization.`);
    organizationCount += 1;
  }
  const websites = graph.filter(node => hasType(node, "WebSite"));
  assert.equal(websites.length, routeId === "home" && locale === "en" ? 1 : 0, `${label} must not create independent websites for subdirectories.`);
  for (const website of websites) {
    assert.equal(website["@id"], websiteId);
    assert.equal(website.url, `${SITE_ORIGIN}/`);
    assert.equal(website.name, "CHUANWEI FIRE");
    assert.equal(website.publisher?.["@id"], organizationId);
    assert(Array.isArray(website.inLanguage) && ["en", "ar", "zh-CN"].every(language => website.inLanguage.includes(language)), `${label} must describe the supported site languages.`);
    websiteCount += 1;
  }
}

console.log(`Structured data validation passed: ${pages.length} pages, ${breadcrumbCount} breadcrumb trails, ${organizationCount} organization descriptions, ${websiteCount} canonical website.`);
