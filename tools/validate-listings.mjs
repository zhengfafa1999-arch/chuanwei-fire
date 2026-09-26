import {thumbnailFor} from '../site-src/_data/catalogThumbnails.js';
import fs from "node:fs";
import path from "node:path";
import { PRODUCT_FAMILIES, flatProducts, productSuffix, localizedText } from "../site-src/_data/productDirectory.js";
import { CATEGORY_SEO_FOCUS } from "../site-src/_data/categorySeoFocus.js";
import {
  SITE_ROUTES,
  SUPPORTED_LOCALES,
  createListingPageRoute,
  resolveSiteRoute
} from "../site-src/_data/siteRoutes.js";

const root = process.cwd();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function readOutput(outputPath) {
  const absolutePath = path.join(root, outputPath);
  assert(fs.existsSync(absolutePath), `Published output is missing: ${outputPath}`);
  return fs.readFileSync(absolutePath, "utf8");
}

function containsRenderedText(html, value) {
  const escaped = value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  return html.includes(escaped);
}

function validateLocalReferences(html, outputPath) {
  const directory = path.dirname(path.join(root, outputPath));
  const references = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map((match) => match[1]);
  for (const reference of references) {
    if (/^(?:https?:|mailto:|tel:|data:|javascript:|#)/i.test(reference)) continue;
    const cleanReference = decodeURIComponent(reference.split(/[?#]/)[0]);
    const target = path.resolve(directory, cleanReference || ".");
    assert(fs.existsSync(target), `${outputPath} contains a broken local reference: ${reference}`);
  }
}

function validateListingShell(routeId, locale) {
  const route = createListingPageRoute(routeId, locale);
  const html = readOutput(route.outputPath);
  const direction = locale === "ar" ? "rtl" : "ltr";
  assert(html.includes("GENERATED FILE"), `${route.outputPath} is not generated from the shared listing template.`);
  assert(html.includes(`<html lang="${locale}" dir="${direction}">`), `${route.outputPath} has incorrect language direction.`);
  assert(html.includes(`data-site-language="${locale}"`), `${route.outputPath} is missing its language marker.`);
  assert(html.includes(`<link rel="canonical" href="${route.canonical}">`), `${route.outputPath} has an incorrect canonical URL.`);
  assert(html.includes(`href="${route.alternate}"`), `${route.outputPath} is missing its alternate-language canonical URL.`);
  assert(html.includes(`href="${route.languageLinks.en}" lang="en"`), `${route.outputPath} has an incorrect English switch.`);
  assert(html.includes(`href="${route.languageLinks.ar}" lang="ar"`), `${route.outputPath} has an incorrect Arabic switch.`);
  assert(!/[{][{%#]|[%#}][}]/.test(html), `${route.outputPath} contains an unrendered template marker.`);
  validateLocalReferences(html, route.outputPath);
  return { html, route };
}

for (const route of Object.values(SITE_ROUTES)) {
  for (const locale of SUPPORTED_LOCALES) {
    const target = route.locales[locale];
    if (target.status === "published") readOutput(target.outputPath);
  }
}

for (const locale of SUPPORTED_LOCALES) {
  const directory = validateListingShell('products', locale);
  assert(directory.html.includes('assets/js/product-finder.js'), 'Product finder missing');
  assert((directory.html.match(/data-search=/g)||[]).length === PRODUCT_FAMILIES.reduce((n,f)=>n+flatProducts(f).length,0), 'Flat directory count mismatch');
  for (const family of PRODUCT_FAMILIES) {
    const category = validateListingShell(family.routeId, locale);
    const focus = CATEGORY_SEO_FOCUS[family.routeId]?.[locale];
    if (focus) {
      const focusHref = resolveSiteRoute(CATEGORY_SEO_FOCUS[family.routeId].focusProduct, locale, category.route.outputPath).href;
      assert(category.html.includes('class="catalog-section catalog-focus"'), `${family.id}: buyer guide is missing`);
      assert(containsRenderedText(category.html, focus.title) && containsRenderedText(category.html, focus.guideTitle), `${family.id}: focused SEO copy is missing`);
      for (const item of focus.guideItems) assert(containsRenderedText(category.html, item), `${family.id}: buyer guidance is missing`);
      assert(category.html.includes(`href="${focusHref}"`), `${family.id}: focused product link is missing`);
    }
    const cards=[...category.html.matchAll(/<article class="product-card">([\s\S]*?)<\/article>/g)].map(m=>m[1]);
    const products=flatProducts(family);
    assert(cards.length === products.length, `${family.id}: flat category count mismatch`);
    assert(directory.html.includes(`href="#${family.id}"`), 'Category must be an in-page filter/shortcut');
    products.forEach((product,index)=>{
      assert(SITE_ROUTES[product.routeId].kind === 'product', 'Directory must link directly to detail routes');
      assert(SITE_ROUTES[product.routeId].category === family.routeId, 'Product parent changed');
      assert(SITE_ROUTES[product.routeId].locales[locale].status === 'published', 'Unexpected language fallback');
      for (const [html,route] of [[directory.html,directory.route],[cards[index],category.route]]) {
        const href=resolveSiteRoute(product.routeId,locale,route.outputPath).href+productSuffix(product);
        assert(html.includes(`class="product-card__image" href="${href}"`), `Missing direct image link: ${product.routeId}`);
        assert(containsRenderedText(html,localizedText(product.name,locale)), `Missing configuration name: ${product.routeId}`);
        assert(html.includes(`src="${route.assetPrefix}${thumbnailFor(product.image)}"`),'Wrong configuration image');
      }
      const href=resolveSiteRoute(product.routeId,locale,category.route.outputPath).href+productSuffix(product);
      const links=[...cards[index].matchAll(/<a\b[^>]*href="([^"]+)"/g)].map(m=>m[1]);
      assert(links.length===2&&links.every(link=>link===href),'Image/text destinations must match');
      const detail=readOutput(SITE_ROUTES[product.routeId].locales[locale].outputPath);
      if(product.anchor)assert(detail.includes(`id="${product.anchor}"`),'Configuration anchor missing');
      if(product.view){assert(detail.includes('id="gallery"'),'Gallery target missing');assert(detail.includes(path.basename(product.image)),'Selected view missing from detail');}
    });
  }
}
const sitemap = readOutput('sitemap.xml');
assert(sitemap.includes("GENERATED FILE"), "Sitemap is not generated from the shared route registry.");
for (const [routeId, route] of Object.entries(SITE_ROUTES)) {
  for (const locale of SUPPORTED_LOCALES) {
    const target = route.locales[locale];
    if (target.status !== "published") continue;
    const canonical = resolveSiteRoute(routeId, locale, target.outputPath).canonical;
    assert(sitemap.includes(`<loc>${canonical}</loc>`), `Sitemap is missing ${canonical}.`);
  }
}

console.log(`Listing validation passed: 2 product-directory pages and ${PRODUCT_FAMILIES.length * SUPPORTED_LOCALES.length} category pages use shared data and templates.`);
