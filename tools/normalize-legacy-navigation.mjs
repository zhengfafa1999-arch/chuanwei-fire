import fs from "node:fs";
import path from "node:path";
import { SITE_ROUTES } from "../site-src/_data/siteRoutes.js";
import { createSiteNavigation, renderProductFooter, renderSiteHeader } from "../site-src/_data/navigation.js";

const root = process.cwd();
const managedHeaderPattern = /\s*<!-- NAVIGATION:BEGIN -->[\s\S]*?<!-- NAVIGATION:END -->\s*/i;
const managedFooterPattern = /\s*<!-- PRODUCT-FOOTER:BEGIN -->[\s\S]*?<!-- PRODUCT-FOOTER:END -->\s*/i;
const legacyHeaderPattern = /\s*<header\b[^>]*class=(['"])[^'"]*\bpdp-header\b[^'"]*\1[^>]*>[\s\S]*?<\/header>\s*/i;
const legacyFooterPattern = /\s*<footer\b[^>]*class=(['"])[^'"]*\bpdp-footer\b[^'"]*\1[^>]*>[\s\S]*?<\/footer>\s*/i;

function sectionLinks(html) {
  const managed = html.match(/<nav\b[^>]*class=(['"])[^'"]*\bpdp-section-navigation\b[^'"]*\1[^>]*>[\s\S]*?<div\b[^>]*class=(['"])[^'"]*\bpdp-section-navigation__links\b[^'"]*\2[^>]*>([\s\S]*?)<\/div>[\s\S]*?<\/nav>/i);
  if (managed?.[3]) return managed[3].trim();
  const legacy = html.match(/<nav\b[^>]*class=(['"])[^'"]*\bpdp-nav\b[^'"]*\1[^>]*>([\s\S]*?)<\/nav>/i);
  return legacy?.[2]?.trim() ?? "";
}

function renderSectionNavigation(links) {
  if (!links) return "";
  return `\n<nav class="pdp-section-navigation" aria-label="On this page"><div class="pdp-section-navigation__links">${links}</div></nav>`;
}

function setBodyRoute(html, routeId, locale) {
  return html.replace(/<body\b([^>]*)>/i, (_, attributes) => {
    const cleaned = attributes
      .replace(/\sdata-site-language=(['"])[\s\S]*?\1/gi, "")
      .replace(/\sdata-site-route-id=(['"])[\s\S]*?\1/gi, "")
      .replace(/\sdata-language-alternate=(['"])[\s\S]*?\1/gi, "");
    return `<body${cleaned} data-site-language="${locale}" data-site-route-id="${routeId}">`;
  });
}

function ensureStylesheet(html, href) {
  if (html.includes(`href="${href}"`) || html.includes(`href='${href}'`)) return html;
  return html.replace(/\s*<\/head>/i, `\n  <link rel="stylesheet" href="${href}">\n</head>`);
}

function ensureScript(html, src) {
  if (html.includes(`src="${src}"`) || html.includes(`src='${src}'`)) return html;
  return html.replace(/\s*<\/body>/i, `\n  <script src="${src}"></script>\n</body>`);
}

let normalizedCount = 0;

for (const [routeId, definition] of Object.entries(SITE_ROUTES)) {
  if (definition.kind !== "product") continue;
  for (const [locale, target] of Object.entries(definition.locales)) {
    if (target.status !== "published") continue;
    const absolutePath = path.join(root, target.outputPath);
    const original = fs.readFileSync(absolutePath, "utf8");
    if (original.includes("GENERATED FILE")) continue;

    const navigation = createSiteNavigation(routeId, locale, target.outputPath);
    const links = sectionLinks(original);
    const headerBlock = `\n<!-- NAVIGATION:BEGIN -->\n${renderSiteHeader(navigation)}${renderSectionNavigation(links)}\n<!-- NAVIGATION:END -->\n`;
    const footerBlock = `\n<!-- PRODUCT-FOOTER:BEGIN -->\n${renderProductFooter(navigation)}\n<!-- PRODUCT-FOOTER:END -->\n`;
    let updated = original;
    if (managedHeaderPattern.test(updated)) updated = updated.replace(managedHeaderPattern, headerBlock);
    else {
      if (!legacyHeaderPattern.test(updated)) throw new Error(`Legacy page '${target.outputPath}' has no replaceable product header.`);
      updated = updated.replace(legacyHeaderPattern, headerBlock);
    }
    if (managedFooterPattern.test(updated)) updated = updated.replace(managedFooterPattern, footerBlock);
    else {
      if (!legacyFooterPattern.test(updated)) throw new Error(`Legacy page '${target.outputPath}' has no replaceable product footer.`);
      updated = updated.replace(legacyFooterPattern, footerBlock);
    }
    updated = setBodyRoute(updated, routeId, locale);
    updated = ensureStylesheet(updated, `${navigation.assetPrefix}css/site-navigation.css`);
    updated = ensureScript(updated, `${navigation.assetPrefix}assets/js/site-navigation.js`);
    if (updated === original) continue;
    fs.writeFileSync(absolutePath, updated, "utf8");
    normalizedCount += 1;
  }
}

console.log(`Legacy navigation normalization passed: ${normalizedCount} hand-maintained product pages updated.`);

