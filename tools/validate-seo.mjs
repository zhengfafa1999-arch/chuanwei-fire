import fs from "node:fs";
import path from "node:path";
import { SITE_ORIGIN, SITE_ROUTES, resolveSiteRoute } from "../site-src/_data/siteRoutes.js";
import { SEO_LANGUAGE_TAGS, SEO_OPEN_GRAPH_LOCALES } from "../site-src/_data/seo.js";

const root = process.cwd();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function readAttribute(tag, name) {
  return tag.match(new RegExp(`\\s${name}\\s*=\\s*(["'])(.*?)\\1`, "is"))?.[2] ?? null;
}

function tags(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map((match) => match[0]);
}

function metaValues(html, attribute, value) {
  return tags(html, "meta")
    .filter((tag) => readAttribute(tag, attribute)?.toLowerCase() === value.toLowerCase())
    .map((tag) => readAttribute(tag, "content") ?? "");
}

function linkValues(html, rel) {
  return tags(html, "link").filter((tag) => readAttribute(tag, "rel")?.toLowerCase().split(/\s+/).includes(rel));
}

function assertSingle(values, expected, label, outputPath) {
  assert(values.length === 1, `${outputPath} must contain exactly one ${label}; found ${values.length}.`);
  if (expected !== undefined) assert(values[0] === expected, `${outputPath} has an incorrect ${label}: ${values[0]}`);
}

function validateSameOriginImage(image, outputPath) {
  let url;
  try {
    url = new URL(image);
  } catch {
    throw new Error(`${outputPath} has a non-absolute social image URL: ${image}`);
  }
  assert(url.protocol === "https:", `${outputPath} social image must use HTTPS: ${image}`);
  if (url.origin !== SITE_ORIGIN) return;
  const imagePath = path.join(root, ...decodeURIComponent(url.pathname).split("/").filter(Boolean));
  assert(fs.existsSync(imagePath), `${outputPath} social image does not exist locally: ${image}`);
}

const seenCanonicals = new Set();
const seenTitles = new Map();
const seenDescriptions = new Map();
const sitemapExpectations = [];
let pageCount = 0;

for (const [routeId, definition] of Object.entries(SITE_ROUTES)) {
  const publishedLocales = Object.entries(definition.locales).filter(([, target]) => target.status === "published");
  const expectedAlternates = Object.fromEntries(publishedLocales.map(([locale, target]) => [
    SEO_LANGUAGE_TAGS[locale] ?? locale,
    resolveSiteRoute(routeId, locale, target.outputPath).canonical
  ]));
  const expectedXDefault = expectedAlternates.en ?? Object.values(expectedAlternates)[0];

  for (const [locale, target] of publishedLocales) {
    const absolutePath = path.join(root, target.outputPath);
    assert(fs.existsSync(absolutePath), `SEO audit cannot find published page: ${target.outputPath}`);
    const html = fs.readFileSync(absolutePath, "utf8");
    const canonical = resolveSiteRoute(routeId, locale, target.outputPath).canonical;

    assert(!seenCanonicals.has(canonical), `Duplicate canonical URL: ${canonical}`);
    seenCanonicals.add(canonical);
    const titles = [...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)].map((match) => match[1].trim()).filter(Boolean);
    const descriptions = metaValues(html, "name", "description").filter(Boolean);
    assertSingle(titles, undefined, "title", target.outputPath);
    assertSingle(descriptions, undefined, "meta description", target.outputPath);
    assert(!seenTitles.has(titles[0]), `${target.outputPath} duplicates the title used by ${seenTitles.get(titles[0])}.`);
    assert(!seenDescriptions.has(descriptions[0]), `${target.outputPath} duplicates the meta description used by ${seenDescriptions.get(descriptions[0])}.`);
    seenTitles.set(titles[0], target.outputPath);
    seenDescriptions.set(descriptions[0], target.outputPath);
    assertSingle(metaValues(html, "name", "robots"), "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1", "robots directive", target.outputPath);

    const canonicalLinks = linkValues(html, "canonical");
    assertSingle(canonicalLinks.map((tag) => readAttribute(tag, "href")), canonical, "canonical link", target.outputPath);

    const alternateLinks = linkValues(html, "alternate").filter((tag) => readAttribute(tag, "hreflang"));
    const actualAlternates = Object.fromEntries(alternateLinks.map((tag) => [readAttribute(tag, "hreflang"), readAttribute(tag, "href")]));
    assert(alternateLinks.length === Object.keys(expectedAlternates).length + 1, `${target.outputPath} has duplicate or unexpected hreflang links.`);
    for (const [hreflang, href] of Object.entries(expectedAlternates)) {
      assert(actualAlternates[hreflang] === href, `${target.outputPath} has an incorrect ${hreflang} hreflang URL.`);
    }
    assert(actualAlternates["x-default"] === expectedXDefault, `${target.outputPath} has an incorrect x-default URL.`);

    assertSingle(metaValues(html, "property", "og:type"), "website", "og:type", target.outputPath);
    assertSingle(metaValues(html, "property", "og:site_name"), "CHUANWEI FIRE", "og:site_name", target.outputPath);
    assertSingle(metaValues(html, "property", "og:url"), canonical, "og:url", target.outputPath);
    assertSingle(metaValues(html, "property", "og:locale"), SEO_OPEN_GRAPH_LOCALES[locale] ?? locale, "og:locale", target.outputPath);
    assertSingle(metaValues(html, "property", "og:title").filter(Boolean), titles[0], "og:title", target.outputPath);
    assertSingle(metaValues(html, "property", "og:description").filter(Boolean), descriptions[0], "og:description", target.outputPath);
    const socialImages = metaValues(html, "property", "og:image").filter(Boolean);
    assertSingle(socialImages, undefined, "og:image", target.outputPath);
    validateSameOriginImage(socialImages[0], target.outputPath);
    assertSingle(metaValues(html, "property", "og:image:alt").filter(Boolean), titles[0], "og:image:alt", target.outputPath);
    const expectedAlternateOgLocales = publishedLocales
      .filter(([alternateLocale]) => alternateLocale !== locale)
      .map(([alternateLocale]) => SEO_OPEN_GRAPH_LOCALES[alternateLocale] ?? alternateLocale);
    const actualAlternateOgLocales = metaValues(html, "property", "og:locale:alternate");
    assert(JSON.stringify(actualAlternateOgLocales) === JSON.stringify(expectedAlternateOgLocales), `${target.outputPath} has incorrect alternate Open Graph locales.`);

    assertSingle(metaValues(html, "name", "twitter:card"), "summary_large_image", "twitter:card", target.outputPath);
    assertSingle(metaValues(html, "name", "twitter:title").filter(Boolean), titles[0], "twitter:title", target.outputPath);
    assertSingle(metaValues(html, "name", "twitter:description").filter(Boolean), descriptions[0], "twitter:description", target.outputPath);
    assertSingle(metaValues(html, "name", "twitter:image"), socialImages[0], "twitter:image", target.outputPath);
    assertSingle(metaValues(html, "name", "twitter:image:alt").filter(Boolean), titles[0], "twitter:image:alt", target.outputPath);
    sitemapExpectations.push({ canonical, alternates: { ...expectedAlternates, "x-default": expectedXDefault } });
    pageCount += 1;
  }
}

const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
const sitemapBlocks = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => match[1]);
assert(sitemapBlocks.length === pageCount, `Sitemap URL count does not match published page count (${pageCount}).`);
for (const expectation of sitemapExpectations) {
  const block = sitemapBlocks.find((candidate) => candidate.includes(`<loc>${expectation.canonical}</loc>`));
  assert(block, `Sitemap is missing canonical URL: ${expectation.canonical}`);
  const alternateLinks = [...block.matchAll(/<xhtml:link\b[^>]*\/>/g)].map((match) => match[0]);
  assert(alternateLinks.length === Object.keys(expectation.alternates).length, `Sitemap entry ${expectation.canonical} has duplicate or unexpected hreflang links.`);
  for (const [hreflang, href] of Object.entries(expectation.alternates)) {
    assert(alternateLinks.some((link) => readAttribute(link, "hreflang") === hreflang && readAttribute(link, "href") === href), `Sitemap entry ${expectation.canonical} has an incorrect ${hreflang} alternate.`);
  }
}

console.log(`SEO validation passed: ${pageCount} published pages have unique titles, descriptions and canonicals plus equivalent hreflang, Open Graph, Twitter and indexation metadata.`);
