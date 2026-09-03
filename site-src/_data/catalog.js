import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dataDirectory = path.dirname(fileURLToPath(import.meta.url));
const sourceDirectory = path.resolve(dataDirectory, "..");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

const products = {
  wetAlarm: readJson(path.join(dataDirectory, "products", "wet-alarm-check-valve.json")),
  waterCurtain: readJson(path.join(dataDirectory, "products", "water-curtain-nozzles.json")),
  waterMist: readJson(path.join(dataDirectory, "products", "water-mist-nozzles.json"))
};

const routes = {
  wetAlarm: {
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
  },
  waterCurtain: {
    en: {
      outputPath: "products/消防喷头/water-curtain-nozzles.html",
      selfHref: "water-curtain-nozzles.html",
      canonical: "https://chuanweifire.com/products/%E6%B6%88%E9%98%B2%E5%96%B7%E5%A4%B4/water-curtain-nozzles.html",
      alternate: "https://chuanweifire.com/ar/products/water-curtain-nozzles/",
      alternateHref: "../../ar/products/water-curtain-nozzles/index.html",
      homeHref: "../../index.html",
      categoryHref: "../消防喷头.html",
      assetPrefix: "../../"
    },
    ar: {
      outputPath: "ar/products/water-curtain-nozzles/index.html",
      selfHref: "index.html",
      canonical: "https://chuanweifire.com/ar/products/water-curtain-nozzles/",
      alternate: "https://chuanweifire.com/products/%E6%B6%88%E9%98%B2%E5%96%B7%E5%A4%B4/water-curtain-nozzles.html",
      alternateHref: "../../../products/消防喷头/water-curtain-nozzles.html",
      homeHref: "../../index.html",
      categoryHref: "../../products.html",
      assetPrefix: "../../../"
    }
  },
  waterMist: {
    en: {
      outputPath: "products/消防喷头/water-mist-nozzles.html",
      selfHref: "water-mist-nozzles.html",
      canonical: "https://chuanweifire.com/products/%E6%B6%88%E9%98%B2%E5%96%B7%E5%A4%B4/water-mist-nozzles.html",
      alternate: "https://chuanweifire.com/ar/products/water-mist-nozzles/",
      alternateHref: "../../ar/products/water-mist-nozzles/index.html",
      homeHref: "../../index.html",
      categoryHref: "../消防喷头.html",
      assetPrefix: "../../"
    },
    ar: {
      outputPath: "ar/products/water-mist-nozzles/index.html",
      selfHref: "index.html",
      canonical: "https://chuanweifire.com/ar/products/water-mist-nozzles/",
      alternate: "https://chuanweifire.com/products/%E6%B6%88%E9%98%B2%E5%96%B7%E5%A4%B4/water-mist-nozzles.html",
      alternateHref: "../../../products/消防喷头/water-mist-nozzles.html",
      homeHref: "../../index.html",
      categoryHref: "../../products.html",
      assetPrefix: "../../../"
    }
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

function createBasePage(product, routeKey, localeCode) {
  const locale = readJson(path.join(dataDirectory, "locales", `${localeCode}.json`));
  const copy = readJson(path.join(sourceDirectory, "content", "products", localeCode, `${product.id}.json`));
  const route = routes[routeKey][localeCode];
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
    xDefault: routes[routeKey].en.canonical,
    gallery,
    heroImage: gallery[0],
    whatsAppHref: `https://wa.me/8617326528368?text=${encodeURIComponent(copy.whatsAppMessage)}`,
    emailHref: `mailto:zhengcolin1@gmail.com?subject=${encodeURIComponent(copy.emailSubject)}`
  };
}

function createWetAlarmPage(localeCode) {
  const product = products.wetAlarm;
  const page = createBasePage(product, "wetAlarm", localeCode);
  const { locale, copy } = page;
  const pressure = product.facts.maximumWorkingPressureMpa.value;

  page.chips = [
    `DN${product.sizeRange.minimumDn}–DN${product.sizeRange.maximumDn}`,
    `${product.sizeRange.minimumInch}–${product.sizeRange.maximumInch} in`,
    product.connections.map((key) => locale.values[key]).join(" / "),
    formatPressure(pressure, localeCode, false),
    localeCode === "ar" ? "مجموعة إنذار كاملة" : "Complete Alarm Trim"
  ];
  page.specRows = [
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
  page.detailPanel = {
    title: copy.pressureSwitch,
    cards: [
      [locale.labels.operatingVoltage, product.pressureSwitch.operatingVoltage.value, null],
      [locale.labels.contact, product.pressureSwitch.contact.value, null],
      [locale.labels.contactRating, product.pressureSwitch.contactRating.value, null],
      [locale.labels.actuationPressure, `${product.pressureSwitch.actuationPressureMpa.value} MPa`, formatPressure(product.pressureSwitch.actuationPressureMpa.value, localeCode).split(" / ").slice(1).join(" / ")]
    ].map(([label, value, detail]) => ({ label, value, detail })),
    notes: [
      { title: copy.configurationNoteTitle, body: copy.configurationNote },
      { title: copy.installationNoteTitle, body: copy.installationNote }
    ]
  };
  page.featureSection = {
    id: "trim",
    eyebrow: copy.trimEyebrow,
    title: copy.trimTitle,
    description: copy.trimDescription,
    items: product.supplyScope.map((key, index) => ({ number: String(index + 1).padStart(2, "0"), text: copy.components[key] }))
  };
  page.modelColumns = [locale.labels.internationalConfiguration, locale.labels.nominalSize, locale.labels.maximumPressure, locale.labels.referenceHeight, locale.labels.design, locale.labels.factoryReference];
  page.models = product.models.map((model) => ({ cells: [
    { value: copy.modelConfigurations[model.connection] },
    { value: `DN${model.dn} / ${model.inch} in`, dir: "ltr" },
    { value: `${pressure} MPa`, dir: "ltr" },
    { value: `${model.heightMm} mm`, dir: "ltr" },
    { value: locale.values[model.design] },
    { value: model.factoryReference, dir: "ltr" }
  ] }));
  page.oemItems = product.oemCapabilities.map((key) => copy.oem[key]);
  page.ogImage = "https://chuanweifire.com/products/%E6%B6%88%E9%98%B2%E9%98%80/wet-alarm-check-valve-assemblies/dn150-flanged-wet-alarm-assembly-en.jpg";
  return page;
}

function createWaterCurtainPage(localeCode) {
  const product = products.waterCurtain;
  const page = createBasePage(product, "waterCurtain", localeCode);
  const { locale, copy } = page;
  const sizes = product.sizeOptions.map((size) => `DN${size.dn} / ${size.inch} in`).join("; ");

  page.chips = [locale.values.openNozzle, "DN15–DN25", localeCode === "ar" ? "شق واحد / شقان" : "Single / Double Slot", locale.values.chromePlatedCopper, localeCode === "ar" ? "وصلات حسب الطلب" : "Custom Connections"];
  page.specRows = [
    [locale.labels.productFamily, copy.name],
    [locale.labels.availableConfigurations, product.configurations.map((key) => locale.values[key]).join("; ")],
    [locale.labels.operatingElement, locale.values[product.facts.operatingElement.value]],
    [locale.labels.bodyMaterial, locale.values[product.facts.bodyMaterial.value]],
    [locale.labels.surfaceFinish, locale.values[product.facts.surfaceFinish.value]],
    [locale.labels.nominalConnections, sizes],
    [locale.labels.maximumWorkingPressure, locale.values.availableOnRequest],
    [locale.labels.threadForm, locale.values[product.facts.threadForm.value]]
  ].map(([label, value]) => ({ label, value }));
  page.detailPanel = { title: copy.detailPanelTitle, cards: [], notes: copy.detailNotes };
  page.featureSection = null;
  page.modelColumns = [locale.labels.internationalProductName, locale.labels.nominalSize, locale.labels.dischargeConfiguration, locale.labels.operatingType, locale.labels.factoryReference];
  page.models = product.models.map((model) => ({ cells: [
    { value: copy.modelNames[model.style] },
    { value: `DN${model.dn} / ${model.inch} in`, dir: "ltr" },
    { value: locale.values[model.discharge] },
    { value: locale.values.openNozzle },
    { value: model.factoryReference, dir: "ltr" }
  ] }));
  page.oemItems = product.oemCapabilities.map((key) => copy.oem[key]);
  page.ogImage = "https://chuanweifire.com/products/%E6%B6%88%E9%98%B2%E5%96%B7%E5%A4%B4/water-curtain-nozzles/horizontal-single-slot-water-curtain-nozzle.jpg";
  return page;
}

function createWaterMistPage(localeCode) {
  const product = products.waterMist;
  const page = createBasePage(product, "waterMist", localeCode);
  const { locale, copy } = page;
  const pressure = product.facts.maximumWorkingPressureMpa.value;
  const sizes = product.sizeOptions.map((size) => `DN${size.dn} / ${size.inch} in`).join("; ");

  page.chips = [locale.values.openNozzle, "DN15–DN25", formatPressure(pressure, localeCode, false), locale.values.chromePlatedCopper, localeCode === "ar" ? "قياسي / تصادمي" : "Standard / Impingement"];
  page.specRows = [
    [locale.labels.productFamily, copy.name],
    [locale.labels.availableConfigurations, product.configurations.map((key) => locale.values[key]).join("; ")],
    [locale.labels.operatingElement, locale.values[product.facts.operatingElement.value]],
    [locale.labels.bodyMaterial, locale.values[product.facts.bodyMaterial.value]],
    [locale.labels.surfaceFinish, locale.values[product.facts.surfaceFinish.value]],
    [locale.labels.nominalConnections, sizes],
    [locale.labels.maximumWorkingPressure, formatPressure(pressure, localeCode)],
    [locale.labels.optionalInletStrainer, locale.values[product.facts.inletStrainer.value]],
    [locale.labels.threadForm, locale.values[product.facts.threadForm.value]]
  ].map(([label, value]) => ({ label, value }));
  page.detailPanel = { title: copy.detailPanelTitle, cards: [], notes: copy.detailNotes };
  page.featureSection = null;
  page.modelColumns = [locale.labels.internationalProductName, locale.labels.nominalSize, locale.labels.configuration, locale.labels.strainer, locale.labels.factoryReference];
  page.models = product.models.map((model) => ({ cells: [
    { value: copy.modelNames[model.style] },
    { value: model.dn ? `DN${model.dn} / ${model.inch} in` : locale.values[model.size], dir: model.dn ? "ltr" : null },
    { value: locale.values[model.configuration] },
    { value: locale.values[model.strainer] },
    { value: locale.values[model.factoryReference] ?? model.factoryReference, dir: model.factoryReference === "custom" ? null : "ltr" }
  ] }));
  page.oemItems = product.oemCapabilities.map((key) => copy.oem[key]);
  page.ogImage = "https://chuanweifire.com/products/%E6%B6%88%E9%98%B2%E5%96%B7%E5%A4%B4/water-mist-nozzles/water-mist-nozzle-with-inlet-strainer.jpg";
  return page;
}

export default [
  createWetAlarmPage("en"),
  createWetAlarmPage("ar"),
  createWaterCurtainPage("en"),
  createWaterCurtainPage("ar"),
  createWaterMistPage("en"),
  createWaterMistPage("ar")
];
