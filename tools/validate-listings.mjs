import {thumbnailFor} from '../site-src/_data/catalogThumbnails.js';
import fs from "node:fs";
import path from "node:path";
import { PRODUCT_FAMILIES, flatProducts, productSuffix, localizedText } from "../site-src/_data/productDirectory.js";
import { CATEGORY_SEO_FOCUS } from "../site-src/_data/categorySeoFocus.js";
import { listingInquiryDrafts } from "../site-src/lib/inquiry.js";
import { versionedPublicAsset } from "../site-src/lib/public-asset-versions.js";
import { PRODUCT_BROWSE_GROUPS } from '../site-src/_data/productBrowseGroups.js';
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
  assert(html.includes(`href="${versionedPublicAsset('css/catalog-pages.css', route.assetPrefix)}"`), `${route.outputPath}: missing current listing styles`);
  const family = PRODUCT_FAMILIES.find(item => item.routeId === routeId);
  const name = family ? localizedText(family.name, locale) : locale === 'ar' ? 'دليل المنتجات' : 'Product directory';
  const drafts = listingInquiryDrafts(name, route.canonical, locale);
  for (const href of Object.values(drafts)) assert(html.includes(`href="${href.replaceAll('&', '&amp;')}"`), `${route.outputPath}: missing contextual inquiry draft`);
  assert(html.includes('id="inquiry"'), `${route.outputPath}: inquiry anchor missing`);
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
  for (const group of PRODUCT_BROWSE_GROUPS) {
    assert(directory.html.includes(`href="#${group.id}"`), `${group.id}: missing browse-group shortcut`);
    assert(directory.html.includes(`value="${group.id}" data-family-members="${group.families.map(family => family.id).join(' ')}"`), `${group.id}: incorrect filter membership`);
  }
  assert((directory.html.match(/<article class="product-card" data-search=/g)||[]).length === PRODUCT_FAMILIES.reduce((n,f)=>n+flatProducts(f).length,0), 'Flat directory count mismatch');
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
    const cards=[...category.html.matchAll(/<article class="product-card"(?:\s[^>]*)?>([\s\S]*?)<\/article>/g)].map(m=>m[1]);
    const products=flatProducts(family);
    assert(cards.length === products.length, `${family.id}: flat category count mismatch`);
    assert(directory.html.includes(`value="${family.id}" data-family-members="${family.id}"`), `${family.id}: existing category must retain exact filtering`);
    products.forEach((product,index)=>{
      const name=localizedText(product.name,locale);
      assert(!/Configuration options|خيارات التكوين/.test(name), 'Empty duplicate configuration card returned');
      if (product.inquiry) {
        assert(family.id==='sprinklers' && ['k115-quick','k115-standard'].includes(product.seriesId), 'Only unverified ordinary K115 series may be inquiry cards');
        assert(product.routeId===null && product.image===null && !(product.relatedConfigurations||[]).length, 'Inquiry series must not imply a verified product, photo or model');
        for (const [html,route] of [[directory.html,directory.route],[cards[index],category.route]]) {
          const href=listingInquiryDrafts(name,route.canonical,locale).whatsappHref.replaceAll('&','&amp;');
          assert(containsRenderedText(html,name) && html.includes(`class="product-card__link" href="${href}"`), 'Inquiry card must open a contextual product inquiry');
        }
        assert(!cards[index].includes('<img'), 'Unverified inquiry series inherited a product photograph');
        return;
      }
      assert(product.image, 'Published product card needs a verified image');
      assert(SITE_ROUTES[product.routeId].kind === 'product', 'Directory must link directly to detail routes');
      assert(SITE_ROUTES[product.routeId].category === family.routeId, 'Product parent changed');
      assert(SITE_ROUTES[product.routeId].locales[locale].status === 'published', 'Unexpected language fallback');
      for (const [html,route] of [[directory.html,directory.route],[cards[index],category.route]]) {
        const href=resolveSiteRoute(product.routeId,locale,route.outputPath).href+productSuffix(product);
        if (product.image) assert(html.includes(`class="product-card__image" href="${href}"`), `Missing direct image link: ${product.routeId}`);
        else assert(html.includes(`class="product-card__link" href="${href}"`), `Missing configuration details link: ${product.routeId}`);
        assert(containsRenderedText(html,localizedText(product.name,locale)), `Missing configuration name: ${product.routeId}`);
        if (product.image) assert(html.includes(`src="${route.assetPrefix}${thumbnailFor(product.image)}"`),'Wrong configuration image');
      }
      const href=resolveSiteRoute(product.routeId,locale,category.route.outputPath).href+productSuffix(product);
      const links=[...cards[index].matchAll(/<a\b[^>]*href="([^"]+)"/g)].map(m=>m[1]);
      const primaryLinks=[...cards[index].matchAll(/<a\b[^>]*class="product-card__(image|link)"[^>]*href="([^"]+)"/g)];
      const relatedHrefs=(product.relatedConfigurations||[]).map(item=>resolveSiteRoute(product.routeId,locale,category.route.outputPath).href+(item.suffix||'#'+item.anchor));
      assert(primaryLinks.length===2 && new Set(primaryLinks.map(link=>link[1])).size===2 && primaryLinks.every(link=>link[2]===href) && links.every(link=>link===href||relatedHrefs.includes(link)),'Image/text destinations must match; additional model links must be scoped');
      if (!product.image) assert(!cards[index].includes('<img'), 'Text-only configuration entry inherited a legacy photo');
      const detail=readOutput(SITE_ROUTES[product.routeId].locales[locale].outputPath);
      for(const item of product.relatedConfigurations||[]){
        const suffix=item.suffix||'#'+item.anchor;
        const anchor=suffix.split('#')[1];
        assert(anchor && detail.includes(`id="${anchor}"`),'Additional model anchor missing');
        if(suffix.startsWith('?view=')){
          const selected=new URLSearchParams(suffix.split('#')[0]).get('view');
          assert(selected && detail.includes(path.basename(selected)),'Additional photographed configuration missing from detail');
        }
      }
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
