import fs from "node:fs";
import path from "node:path";
import { SITE_ROUTES } from "../site-src/_data/siteRoutes.js";
import { createSiteNavigation } from "../site-src/_data/navigation.js";

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

function findTaggedAnchor(html, attribute, value) {
  return tags(html, "a").filter((tag) => readAttribute(tag, attribute) === value);
}

function assertSingleAnchor(html, attribute, value, expectedHref, outputPath) {
  const anchors = findTaggedAnchor(html, attribute, value);
  assert(anchors.length === 1, `${outputPath} must contain exactly one navigation link ${attribute}='${value}'.`);
  assert(readAttribute(anchors[0], "href") === expectedHref, `${outputPath} has an incorrect ${value} navigation target.`);
  return anchors[0];
}

let pageCount = 0;
let productCount = 0;
let fallbackCount = 0;

for (const [routeId, definition] of Object.entries(SITE_ROUTES)) {
  for (const [locale, target] of Object.entries(definition.locales)) {
    if (target.status !== "published") continue;
    const absolutePath = path.join(root, target.outputPath);
    assert(fs.existsSync(absolutePath), `Navigation audit cannot find ${target.outputPath}.`);
    const html = fs.readFileSync(absolutePath, "utf8");
    const navigation = createSiteNavigation(routeId, locale, target.outputPath);
    assert((html.match(/data-global-header(?:\s|>)/g) ?? []).length === 1, `${target.outputPath} must contain exactly one shared global header.`);
    assert(html.includes(`data-site-language="${locale}"`), `${target.outputPath} has an incorrect page language marker.`);
    assert(html.includes(`data-site-route-id="${routeId}"`), `${target.outputPath} has an incorrect route marker.`);
    assert(html.includes(`href="${navigation.assetPrefix}css/site-navigation.css"`), `${target.outputPath} is missing shared navigation styles.`);
    assert(html.includes(`src="${navigation.assetPrefix}assets/js/site-navigation.js"`), `${target.outputPath} is missing shared navigation behavior.`);

    let currentPrimaryCount = 0;
    for (const item of navigation.primaryItems) {
      const anchor = assertSingleAnchor(html, "data-site-nav-item", item.id, item.href, target.outputPath);
      const current = readAttribute(anchor, "aria-current") === "page";
      assert(current === item.current, `${target.outputPath} has an incorrect active state for ${item.id}.`);
      if (current) currentPrimaryCount += 1;
    }
    assert(currentPrimaryCount === 1, `${target.outputPath} must identify exactly one active primary navigation item.`);

    let currentLanguageCount = 0;
    for (const item of navigation.languageItems) {
      const anchor = assertSingleAnchor(html, "data-site-language-choice", item.language, item.href, target.outputPath);
      assert(readAttribute(anchor, "data-language-status") === item.status, `${target.outputPath} has an incorrect ${item.language} language status.`);
      const current = readAttribute(anchor, "aria-current") === "true";
      assert(current === item.current, `${target.outputPath} has an incorrect active language for ${item.language}.`);
      if (current) currentLanguageCount += 1;
      if (item.status === "fallback") fallbackCount += 1;
    }
    assert(currentLanguageCount === 1, `${target.outputPath} must identify exactly one active language.`);
    assert(!/href=(['"])[^'"]*\?lang=(?:en|ar|zh)\1/i.test(html), `${target.outputPath} contains an obsolete language query link.`);

    if (definition.kind === "product") {
      assert((html.match(/data-global-product-footer(?:\s|>)/g) ?? []).length === 1, `${target.outputPath} must contain exactly one standardized product footer.`);
      const footerMatch = html.match(/<footer\b[^>]*data-global-product-footer[^>]*>[\s\S]*?<\/footer>/i);
      assert(footerMatch, `${target.outputPath} is missing its standardized product footer content.`);
      for (const href of [navigation.categoryHref, navigation.productsHref, navigation.homeHref]) {
        assert(footerMatch[0].includes(`href="${href}"`), `${target.outputPath} product footer is missing ${href}.`);
      }
      productCount += 1;
    }
    pageCount += 1;
  }
}

console.log(`Navigation validation passed: ${pageCount} published pages, ${productCount} product return paths and ${fallbackCount} explicit language fallbacks are consistent.`);

