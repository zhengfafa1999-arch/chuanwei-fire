import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createProductPageRoute, SITE_ORIGIN } from "./siteRoutes.js";
import { createSiteNavigation } from "./navigation.js";
import { createSeoMetadata } from "./seo.js";

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
  .map(file => readJson(path.join(sourceDirectory, file)));

export default products.flatMap(product => ["en", "ar"].map(locale => {
  const route = createProductPageRoute(product.routeId, locale);
  const text = { ...product.shared, ...requireCopy(product, locale) };
  const media = Object.fromEntries(Object.entries(product.media).map(([key, source]) => [
    key,
    path.posix.relative(path.posix.dirname(route.outputPath), source)
  ]));
  return {
    product,
    route,
    text,
    media,
    lang: locale,
    dir: locale === "ar" ? "rtl" : "ltr",
    navigation: createSiteNavigation(product.routeId, locale, route.outputPath),
    seo: createSeoMetadata(product.routeId, locale, {
      title: text.seoTitle,
      description: text.seoDescription,
      image: new URL(product.media.hero, `${SITE_ORIGIN}/`).href
    })
  };
}));
