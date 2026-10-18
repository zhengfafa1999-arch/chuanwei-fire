import fs from "node:fs";
import path from "node:path";
import { SITE_ROUTES } from "../site-src/_data/siteRoutes.js";
import { createSiteNavigation } from "../site-src/_data/navigation.js";
import { versionedPublicAsset } from '../site-src/lib/public-asset-versions.js';

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
    const documentTag = tags(html, "html")[0];
    const expectedLanguage = locale === "zh" ? "zh-CN" : locale;
    const expectedDirection = locale === "ar" ? "rtl" : "ltr";
    assert(documentTag, `${target.outputPath} is missing its document element.`);
    assert(readAttribute(documentTag, "lang") === expectedLanguage, `${target.outputPath} has an incorrect HTML language.`);
    assert(readAttribute(documentTag, "dir") === expectedDirection, `${target.outputPath} has an incorrect HTML direction.`);
    assert((html.match(/data-global-header(?:\s|>)/g) ?? []).length === 1, `${target.outputPath} must contain exactly one shared global header.`);
    assert(html.includes(`data-site-language="${locale}"`), `${target.outputPath} has an incorrect page language marker.`);
    assert(html.includes(`data-site-route-id="${routeId}"`), `${target.outputPath} has an incorrect route marker.`);
    assert(html.includes(`href="${versionedPublicAsset('css/site-navigation.css', navigation.assetPrefix)}"`), `${target.outputPath} is missing current shared navigation styles.`);
    assert(html.includes(`src="${versionedPublicAsset('assets/js/site-navigation.js', navigation.assetPrefix)}"`), `${target.outputPath} is missing current shared navigation behavior.`);
    if (html.includes('data-product-finder')) assert(html.includes(`src="${versionedPublicAsset('assets/js/product-finder.js', navigation.assetPrefix)}"`), `${target.outputPath} is missing the current product search behavior.`);
    const categoryGroups = tags(html, 'details').filter(tag => readAttribute(tag, 'class') === 'global-product-group');
    assert(categoryGroups.length === navigation.productGroups.length, `${target.outputPath} lost a product browsing group.`);
    assert(categoryGroups.every(tag => !/\sopen(?:\s|=|>)/i.test(tag)), `${target.outputPath} product categories must start collapsed.`);
    assert(JSON.stringify(categoryGroups.map(tag => readAttribute(tag, 'data-product-browse-group'))) === JSON.stringify(navigation.productGroups.map(group => group.id)), `${target.outputPath} browsing groups differ from the shared group order.`);
    const categoryLinks = tags(html, 'a').filter(tag => readAttribute(tag, 'class') === 'global-product-category');
    assert(categoryLinks.length === navigation.productGroups.length, `${target.outputPath} must link directly to every category.`);
    for (const group of navigation.productGroups) assert(categoryLinks.some(tag => readAttribute(tag, 'href') === group.href), `${target.outputPath} lost its category target ${group.href}.`);
    const subcategoryLinks = tags(html, 'a').filter(tag => readAttribute(tag, 'class') === 'global-product-subcategory-link');
    const subcategories = navigation.productGroups.flatMap(group => group.sections);
    assert(subcategoryLinks.length === subcategories.length, `${target.outputPath} lost a detailed category inside its browsing group.`);
    for (const section of subcategories) assert(subcategoryLinks.some(tag => readAttribute(tag, 'href') === section.href), `${target.outputPath} lost the detailed category target ${section.href}.`);

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
