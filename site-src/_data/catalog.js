import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dataDirectory = path.dirname(fileURLToPath(import.meta.url));
const sourceDirectory = path.resolve(dataDirectory, "..");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

const product = readJson(path.join(dataDirectory, "products", "wet-alarm-check-valve.json"));

const routes = {
  en: {
    outputPath: "products/消防阀/wet-alarm-check-valve-assemblies.html",
    selfHref: "wet-alarm-check-valve-assemblies.html",
    canonical: "https://chuanweifire.com/products/%E6%B6%88%E9%98%B2%E9%98%80/wet-alarm-check-valve-assemblies.html",
    alternate: "https://chuanweifire.com/ar/products/wet-alarm-check-valve/",
    alternateHref: "../../ar/products/wet-alarm-check-valve/index.html",
    homeHref: "../../index.html",
    categoryHref: "../消防阀.html",
    assetPrefix: "../../"
  },
  ar: {
    outputPath: "ar/products/wet-alarm-check-valve/index.html",
    selfHref: "index.html",
    canonical: "https://chuanweifire.com/ar/products/wet-alarm-check-valve/",
    alternate: "https://chuanweifire.com/products/%E6%B6%88%E9%98%B2%E9%98%80/wet-alarm-check-valve-assemblies.html",
    alternateHref: "../../../products/消防阀/wet-alarm-check-valve-assemblies.html",
    homeHref: "../../index.html",
    categoryHref: "../../products.html",
    assetPrefix: "../../../"
  }
};

function formatPressure(mpa, localeCode, includePsi = true) {
  const bar = Number((mpa * 10).toFixed(2));
  const psi = Number((mpa * 145.0377).toFixed(1));
  if (!includePsi) return `${mpa} MPa / ${bar} bar`;
  return localeCode === "ar"
    ? `${mpa} MPa / ${bar} bar / ${psi} psi تقريباً`
    : `${mpa} MPa / ${bar} bar / approx. ${psi} psi`;
}

function createPage(localeCode) {
  const locale = readJson(path.join(dataDirectory, "locales", `${localeCode}.json`));
  const copy = readJson(path.join(sourceDirectory, "content", "products", localeCode, "wet-alarm-check-valve.json"));
  const route = routes[localeCode];
  const pressure = product.facts.maximumWorkingPressureMpa.value;

  const specRows = [
    [locale.labels.productType, copy.name],
    [locale.labels.availableSizes, `DN${product.sizeRange.minimumDn} / ${product.sizeRange.minimumInch} in to DN${product.sizeRange.maximumDn} / ${product.sizeRange.maximumInch} in`],
    [locale.labels.connectionOptions, product.connections.map((key) => locale.values[key]).join(" / ")],
    [locale.labels.maximumWorkingPressure, formatPressure(pressure, localeCode)],
    [locale.labels.valveBody, locale.values[product.facts.valveBody.value]],
    [locale.labels.clapper, locale.values[product.facts.clapper.value]],
    [locale.labels.valveSeat, locale.values[product.facts.valveSeat.value]],
    [locale.labels.stemAndInternalMetal, locale.values[product.facts.stemAndInternalMetal.value]],
    [locale.labels.seals, locale.values[product.facts.seals.value]],
    [locale.labels.coating, locale.values[product.facts.coating.value]],
    [locale.labels.packaging, locale.values[product.facts.packaging.value]]
  ].map(([label, value]) => ({ label, value }));

  const pressureSwitchRows = [
    [locale.labels.operatingVoltage, product.pressureSwitch.operatingVoltage.value, null],
    [locale.labels.contact, product.pressureSwitch.contact.value, null],
    [locale.labels.contactRating, product.pressureSwitch.contactRating.value, null],
    [locale.labels.actuationPressure, `${product.pressureSwitch.actuationPressureMpa.value} MPa`, formatPressure(product.pressureSwitch.actuationPressureMpa.value, localeCode).split(" / ").slice(1).join(" / ")]
  ].map(([label, value, detail]) => ({ label, value, detail }));

  const models = product.models.map((model) => ({
    configuration: copy.modelConfigurations[model.connection],
    nominalSize: `DN${model.dn} / ${model.inch} in`,
    maximumPressure: `${pressure} MPa`,
    referenceHeight: `${model.heightMm} mm`,
    design: locale.values[model.design],
    factoryReference: model.factoryReference
  }));

  const gallery = product.media.map((media) => ({
    ...media,
    src: `${route.assetPrefix}${media.src}`,
    ...copy.media[media.configuration]
  }));

  return {
    locale,
    copy,
    product,
    route,
    gallery,
    heroImage: gallery[0],
    chips: [
      `DN${product.sizeRange.minimumDn}–DN${product.sizeRange.maximumDn}`,
      `${product.sizeRange.minimumInch}–${product.sizeRange.maximumInch} in`,
      product.connections.map((key) => locale.values[key]).join(" / "),
      formatPressure(pressure, localeCode, false),
      localeCode === "ar" ? "مجموعة إنذار كاملة" : "Complete Alarm Trim"
    ],
    specRows,
    pressureSwitchRows,
    models,
    components: product.supplyScope.map((key, index) => ({ number: String(index + 1).padStart(2, "0"), text: copy.components[key] })),
    oemItems: product.oemCapabilities.map((key) => copy.oem[key]),
    whatsAppHref: `https://wa.me/8617326528368?text=${encodeURIComponent(copy.whatsAppMessage)}`,
    emailHref: `mailto:zhengcolin1@gmail.com?subject=${encodeURIComponent(copy.emailSubject)}`,
    ogImage: "https://chuanweifire.com/products/%E6%B6%88%E9%98%B2%E9%98%80/wet-alarm-check-valve-assemblies/dn150-flanged-wet-alarm-assembly-en.jpg"
  };
}

export default [createPage("en"), createPage("ar")];
