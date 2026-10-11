import { versionedProductImage } from '../lib/public-asset-versions.js';
import { productPhotos } from '../lib/product-photos.js';
import { withReviewedProductMedia } from '../lib/reviewed-product-media.js';
import { productEmailDraft, withInquiryDrafts } from "../lib/inquiry.js";
import { productSupplement } from "../lib/product-supplements.js";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createProductPageRoute, SITE_ORIGIN } from "./siteRoutes.js";
import { createSiteNavigation } from "./navigation.js";
import { createSeoMetadata } from "./seo.js";

const directory = path.dirname(fileURLToPath(import.meta.url));
const productDirectory = path.join(directory, "preserved-products");
const readJson = file => JSON.parse(fs.readFileSync(file, "utf8"));

// Isolate Latin units and model references inside RTL copy. Keep SEO copy plain.
function displayText(text, lang) {
  if (lang !== "ar") return text;
  return Object.fromEntries(Object.entries(text).map(([key, value]) => [key,
    /^(?:mailto:|https?:)/.test(value) ? value : value.replace(/[A-Za-z0-9≥≤½¾][A-Za-z0-9 \t.:/(),≥≤–·+%°½¾-]*[A-Za-z0-9%½¾)]|[A-Za-z0-9½¾]/g, run => `\u2066${run}\u2069`)
  ]));
}

// Keep the existing English content authoritative for language-only migration.
// Numeric tokens live with the product, never in the translated copy.
function resolveProductText(product, translations = {}, lang = "en") {
  const text = { ...product.shared };
  for (const [key, source] of Object.entries(product.copy)) {
    const pattern = lang === "en" ? source.text : translations[key];
    if (typeof pattern !== "string" || !pattern.trim()) throw new Error(`${product.id}/${lang}: missing copy ${key}`);
    const expected = source.numbers.map((_, index) => `{n${index}}`).sort();
    const actual = (pattern.match(/\{n\d+\}/g) || []).sort();
    if (JSON.stringify(expected) !== JSON.stringify(actual)) throw new Error(`${product.id}/${lang}: numeric placeholders differ for ${key}`);
    text[key] = pattern.replace(/\{n(\d+)\}/g, (_, index) => source.numbers[index]);
  }
  return text;
}

const products = fs.readdirSync(productDirectory).filter(file => file.endsWith(".json")).map(file => withReviewedProductMedia(readJson(path.join(productDirectory, file))));
export default products.flatMap(product => ["en", "ar"].map(lang => {
  const route = createProductPageRoute(product.routeId, lang);
  const translations = lang === "en" ? {} : readJson(path.join(directory, "..", "content", "products", lang, `${product.id}.json`));
  const text = resolveProductText(product, translations, lang);
  const name = text.seoTitle.split(" | ")[0];
  const media = Object.fromEntries(Object.entries(product.media).map(([key, source]) => [key, versionedProductImage(source, path.posix.relative(path.posix.dirname(route.outputPath), source))]));
  return {
    photos: productPhotos(product.routeId, lang, route.assetPrefix),
    supplement: productSupplement(product.routeId, lang, route.assetPrefix),
    product: withInquiryDrafts(product, name, route.canonical, lang), route, text: displayText(withInquiryDrafts(text, name, route.canonical, lang), lang), media, lang, dir: lang === "ar" ? "rtl" : "ltr",
    emailHref: productEmailDraft(name, route.canonical, lang),
    styles: product.styles || ["css/common.css", "css/sprinkler-product.css", "css/wet-alarm-valve-product.css", "css/site-navigation.css"],
    navigation: createSiteNavigation(product.routeId, lang, route.outputPath),
    seo: createSeoMetadata(product.routeId, lang, {
      title: text.seoTitle, description: text.seoDescription,
      image: new URL(versionedProductImage(product.media.hero || product.media.flanged), `${SITE_ORIGIN}/`).href
    })
  };
}));
