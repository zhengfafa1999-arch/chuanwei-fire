import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const product = readJson("site-src/_data/products/wet-alarm-check-valve.json");
const locales = ["en", "ar"];
const requiredFacts = [
  "maximumWorkingPressureMpa",
  "valveBody",
  "clapper",
  "valveSeat",
  "stemAndInternalMetal",
  "seals",
  "coating",
  "packaging"
];

assert(product.id === "wet-alarm-check-valve", "Unexpected product ID.");
assert(product.status === "published", "Product must be published before generation.");
assert(product.evidence?.status === "confirmed", "Product evidence is not confirmed.");
assert(product.facts.maximumWorkingPressureMpa.value === 1.6, "Maximum working pressure must be 1.6 MPa.");
assert(product.facts.clapper.value === "ductileIron", "Clapper material must be ductile iron.");
assert(product.facts.installationOrientation.status === "unresolved", "Installation orientation must remain unresolved.");
assert(product.facts.waterFlowDirection.status === "unresolved", "Water-flow direction must remain unresolved.");
assert(product.pressureSwitch.operatingVoltage.value === "DC 24 V", "Pressure-switch voltage mismatch.");
assert(product.pressureSwitch.contact.value === "1 NO", "Pressure-switch contact mismatch.");
assert(product.pressureSwitch.contactRating.value === "1 A", "Pressure-switch contact rating mismatch.");
assert(product.pressureSwitch.actuationPressureMpa.value === 0.05, "Pressure-switch actuation pressure mismatch.");

for (const key of requiredFacts) {
  assert(product.facts[key]?.status === "confirmed", `Fact '${key}' is not confirmed.`);
}

assert(product.models.length === 7, "The published model table must contain seven configurations.");
assert(!product.models.some((model) => model.factoryReference === "ZSFZ150-2.5"), "The excluded ZSFZ150-2.5 model is present.");
assert(new Set(product.models.map((model) => `${model.connection}-${model.dn}`)).size === product.models.length, "Duplicate connection/size model found.");
assert(product.models.some((model) => model.factoryReference === "ZSFZ250" && model.design === "conventional"), "DN250 flanged conventional model is missing.");
assert(product.models.some((model) => model.factoryReference === "ZSFZ200(G)" && model.design === "conventional"), "DN200 grooved conventional model is missing.");

for (const media of product.media) {
  assert(media.evidence === "realProductPhoto", `Media '${media.src}' is not marked as a real product photo.`);
  assert(fs.existsSync(path.join(root, media.src)), `Missing product image: ${media.src}`);
}

for (const localeCode of locales) {
  const locale = readJson(`site-src/_data/locales/${localeCode}.json`);
  const copy = readJson(`site-src/content/products/${localeCode}/wet-alarm-check-valve.json`);
  assert(locale.lang === localeCode, `Locale language mismatch for ${localeCode}.`);
  assert(copy.seoTitle && copy.seoDescription && copy.name && copy.lead, `Required localized copy is missing for ${localeCode}.`);
  for (const media of product.media) assert(copy.media?.[media.configuration]?.alt, `Missing ${localeCode} alt text for ${media.configuration}.`);
  for (const key of product.supplyScope) assert(copy.components?.[key], `Missing ${localeCode} component text for ${key}.`);
  for (const key of product.oemCapabilities) assert(copy.oem?.[key]?.title && copy.oem?.[key]?.body, `Missing ${localeCode} OEM text for ${key}.`);
}

console.log("Catalog validation passed: wet alarm check valve source data is complete and consistent.");
