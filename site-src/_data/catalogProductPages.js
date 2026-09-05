import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createProductPageRoute, SITE_ORIGIN } from "./siteRoutes.js";
import { createSiteNavigation } from "./navigation.js";
import { createSeoMetadata } from "./seo.js";

const directory = path.dirname(fileURLToPath(import.meta.url));
const sourceDirectory = path.join(directory, "catalog-products");

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function requireLocaleCopy(product, locale) {
  const copy = product.copy?.[locale];
  if (!copy) throw new Error(`${product.id}: missing ${locale} copy`);
  for (const key of ["title", "eyebrow", "lead", "note", "detailsTitle", "detailsBody", "identifyTitle", "identifyBody", "inquiryTitle", "inquiryBody", "seoTitle", "seoDescription", "imageAlt", "imageAria", "productImagePreview", "closeImagePreview", "enlargedImage", "onThisPage", "details", "inquiry", "askOnWhatsApp", "emailSales"]) {
    if (!String(copy[key] ?? "").trim()) throw new Error(`${product.id}/${locale}: missing copy '${key}'`);
  }
  return copy;
}

const products = fs.readdirSync(sourceDirectory)
  .filter(file => file.endsWith(".json"))
  .map(file => readJson(path.join(sourceDirectory, file)));

export default products.flatMap(product => ["en", "ar"].map(locale => {
  const route = createProductPageRoute(product.routeId, locale);
  const text = requireLocaleCopy(product, locale);
  const hero = path.posix.relative(path.posix.dirname(route.outputPath), product.image);
  return {
    product,
    route,
    text,
    media: { hero },
    lang: locale,
    dir: locale === "ar" ? "rtl" : "ltr",
    navigation: createSiteNavigation(product.routeId, locale, route.outputPath),
    seo: createSeoMetadata(product.routeId, locale, {
      title: text.seoTitle,
      description: text.seoDescription,
      image: new URL(product.image, `${SITE_ORIGIN}/`).href
    })
  };
}));
