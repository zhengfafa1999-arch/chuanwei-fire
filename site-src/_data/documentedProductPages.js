import { versionedProductImage } from '../lib/public-asset-versions.js';
import { productPhotos } from '../lib/product-photos.js';
import { withReviewedProductMedia } from '../lib/reviewed-product-media.js';
import { withInquiryDrafts } from "../lib/inquiry.js";
import { productSupplement } from "../lib/product-supplements.js";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createProductPageRoute, SITE_ORIGIN } from "./siteRoutes.js";
import { createSiteNavigation } from "./navigation.js";
import { createSeoMetadata } from "./seo.js";
import { catalogExpansionProducts } from "./catalogExpansion.js";

const directory = path.dirname(fileURLToPath(import.meta.url));
const sourceDirectory = path.join(directory, "documented-products");
const readJson = file => JSON.parse(fs.readFileSync(file, "utf8"));

const requiredCopy = [
  "title", "eyebrow", "lead", "note", "gallery", "galleryTitle", "galleryBody",
  "specifications", "specificationsTitle", "specificationsBody", "availableModels",
  "modelsTitle", "modelsBody", "factoryModel", "temperature", "thermalElement",
  "quotation", "quotationTitle", "quotationBody", "askOnWhatsApp", "emailSales",
  "productImagePreview", "closeImagePreview", "enlargedImage", "previousProductImage",
  "nextProductImage", "selectProductImage", "seoTitle", "seoDescription"
];

function requireCopy(product, locale) {
  const copy = product.copy?.[locale];
  if (!copy) throw new Error(`${product.id}: missing ${locale} copy`);
  for (const key of requiredCopy) {
    if (!String(copy[key] ?? "").trim()) throw new Error(`${product.id}/${locale}: missing copy '${key}'`);
  }
  return copy;
}

const products = fs.readdirSync(sourceDirectory)
  .filter(file => file.endsWith(".json"))
  .map(file => withReviewedProductMedia(readJson(path.join(sourceDirectory, file))))
  .concat(catalogExpansionProducts);

export default products.flatMap(product => ["en", "ar"].map(locale => {
  const route = createProductPageRoute(product.routeId, locale);
  const text = { ...product.shared, ...requireCopy(product, locale) };
  const media = Object.fromEntries(Object.entries(product.media).map(([key, source]) => [
    key,
    versionedProductImage(source, path.posix.relative(path.posix.dirname(route.outputPath), source))
  ]));
  return {
    photos: productPhotos(product.routeId, locale, route.assetPrefix),
    supplement: productSupplement(product.routeId, locale, route.assetPrefix),
    product: withInquiryDrafts(product, text.title, route.canonical, locale),
    route,
    text,
    media,
    downloads: (product.downloads || []).map(download => {
      const bytes = fs.statSync(path.resolve(directory, "../..", download.path)).size;
      const size = `${Math.ceil(bytes / 1024)} KB`;
      const version = download.version || "2026-10-08";
      return { ...download, href: path.posix.relative(path.posix.dirname(route.outputPath), download.path), metadata: locale === "ar" ? `نسخة ${version} · الإنجليزية · ${size}` : `Version ${version} · English · ${size}` };
    }),
    lang: locale,
    dir: locale === "ar" ? "rtl" : "ltr",
    navigation: createSiteNavigation(product.routeId, locale, route.outputPath),
    seo: createSeoMetadata(product.routeId, locale, {
      title: text.seoTitle,
      description: text.seoDescription,
      image: new URL(versionedProductImage(product.media.hero), `${SITE_ORIGIN}/`).href
    })
  };
}));
