import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const localeCodes = ["en", "ar"];

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function validateMedia(product) {
  for (const media of product.media) {
    assert(media.evidence === "realProductPhoto", `Media '${media.src}' is not marked as a real product photo.`);
    assert(fs.existsSync(path.join(root, media.src)), `Missing product image: ${media.src}`);
    assert(Number.isInteger(media.width) && media.width > 0, `Invalid image width: ${media.src}`);
    assert(Number.isInteger(media.height) && media.height > 0, `Invalid image height: ${media.src}`);
  }
}

function validateLocalizedCopy(product, requiredCopyKeys) {
  for (const localeCode of localeCodes) {
    const locale = readJson(`site-src/_data/locales/${localeCode}.json`);
    const copy = readJson(`site-src/content/products/${localeCode}/${product.id}.json`);
    assert(locale.lang === localeCode, `Locale language mismatch for ${localeCode}.`);
    assert(locale.dir === (localeCode === "ar" ? "rtl" : "ltr"), `Locale direction mismatch for ${localeCode}.`);
    for (const key of requiredCopyKeys) assert(copy[key], `${product.id}/${localeCode} is missing copy key '${key}'.`);
    for (const media of product.media) assert(copy.media?.[media.configuration], `${product.id}/${localeCode} is missing media copy for '${media.configuration}'.`);
    for (const capability of product.oemCapabilities) assert(copy.oem?.[capability], `${product.id}/${localeCode} is missing OEM copy for '${capability}'.`);
  }
}

function validateWetAlarm() {
  const product = readJson("site-src/_data/products/wet-alarm-check-valve.json");
  const requiredFacts = ["maximumWorkingPressureMpa", "valveBody", "clapper", "valveSeat", "stemAndInternalMetal", "seals", "coating", "packaging"];
  assert(product.id === "wet-alarm-check-valve", "Unexpected wet alarm product ID.");
  assert(product.status === "published" && product.evidence?.status === "confirmed", "Wet alarm product is not confirmed for publication.");
  assert(product.facts.maximumWorkingPressureMpa.value === 1.6, "Wet alarm maximum working pressure must be 1.6 MPa.");
  assert(product.facts.clapper.value === "ductileIron", "Wet alarm clapper material must be ductile iron.");
  assert(product.facts.installationOrientation.status === "unresolved", "Installation orientation must remain unresolved.");
  assert(product.facts.waterFlowDirection.status === "unresolved", "Water-flow direction must remain unresolved.");
  assert(product.pressureSwitch.operatingVoltage.value === "DC 24 V", "Pressure-switch voltage mismatch.");
  assert(product.pressureSwitch.contact.value === "1 NO", "Pressure-switch contact mismatch.");
  assert(product.pressureSwitch.contactRating.value === "1 A", "Pressure-switch contact rating mismatch.");
  assert(product.pressureSwitch.actuationPressureMpa.value === 0.05, "Pressure-switch actuation pressure mismatch.");
  for (const key of requiredFacts) assert(product.facts[key]?.status === "confirmed", `Wet alarm fact '${key}' is not confirmed.`);
  assert(product.models.length === 7, "The wet alarm model table must contain seven configurations.");
  assert(!product.models.some((model) => model.factoryReference === "ZSFZ150-2.5"), "The excluded ZSFZ150-2.5 model is present.");
  assert(new Set(product.models.map((model) => `${model.connection}-${model.dn}`)).size === product.models.length, "Duplicate wet alarm connection/size model found.");
  assert(product.models.some((model) => model.factoryReference === "ZSFZ250" && model.design === "conventional"), "DN250 flanged conventional model is missing.");
  assert(product.models.some((model) => model.factoryReference === "ZSFZ200(G)" && model.design === "conventional"), "DN200 grooved conventional model is missing.");
  validateMedia(product);
  validateLocalizedCopy(product, ["seoTitle", "seoDescription", "name", "lead", "galleryTitle", "technicalTitle", "modelsTitle", "oemTitle", "inquiryTitle"]);
}

function validateWaterCurtain() {
  const product = readJson("site-src/_data/products/water-curtain-nozzles.json");
  assert(product.id === "water-curtain-nozzles", "Unexpected water curtain product ID.");
  assert(product.status === "published" && product.evidence?.status === "confirmed", "Water curtain product is not confirmed for publication.");
  assert(product.facts.bodyMaterial.value === "copper" && product.facts.bodyMaterial.status === "confirmed", "Water curtain body material must remain confirmed copper.");
  assert(product.facts.surfaceFinish.value === "chromePlated" && product.facts.surfaceFinish.status === "confirmed", "Water curtain finish must remain confirmed chrome plating.");
  assert(product.facts.operatingElement.value === "openNozzleNoHeatSensitiveElement" && product.facts.operatingElement.status === "confirmed", "Water curtain operating type mismatch.");
  assert(product.facts.maximumWorkingPressureMpa.value === null && product.facts.maximumWorkingPressureMpa.status === "unresolved", "Water curtain maximum pressure must remain unresolved until confirmed.");
  assert(product.facts.threadForm.status === "confirmed", "Water curtain thread customization must remain confirmed.");
  assert(product.sizeOptions.map((size) => size.dn).join(",") === "15,20,25", "Water curtain nominal sizes must be DN15, DN20 and DN25.");
  assert(product.configurations.join(",") === "horizontalSingleSlot,horizontalDoubleSlot,pendent", "Water curtain configurations are incomplete.");
  assert(product.models.length === 6, "The water curtain model table must contain six configurations.");
  assert(new Set(product.models.map((model) => `${model.style}-${model.dn}`)).size === product.models.length, "Duplicate water curtain style/size model found.");
  assert(product.models.filter((model) => model.factoryReference === "ZSTMA").length === 3, "ZSTMA pendent model rows are incomplete.");
  assert(product.models.filter((model) => model.factoryReference === "ZSTMB").length === 3, "ZSTMB horizontal model rows are incomplete.");
  validateMedia(product);
  validateLocalizedCopy(product, ["seoTitle", "seoDescription", "name", "lead", "galleryTitle", "technicalTitle", "detailPanelTitle", "modelsTitle", "oemTitle", "inquiryTitle"]);
  for (const localeCode of localeCodes) {
    const copy = readJson(`site-src/content/products/${localeCode}/${product.id}.json`);
    assert(copy.detailNotes?.length === 4, `${product.id}/${localeCode} must contain four quotation notes.`);
    assert(copy.modelNames?.pendent && copy.modelNames?.horizontal, `${product.id}/${localeCode} is missing model names.`);
  }
}

function validateWaterMist() {
  const product = readJson("site-src/_data/products/water-mist-nozzles.json");
  assert(product.id === "water-mist-nozzles", "Unexpected water mist product ID.");
  assert(product.status === "published" && product.evidence?.status === "confirmed", "Water mist product is not confirmed for publication.");
  assert(product.facts.bodyMaterial.value === "copper" && product.facts.bodyMaterial.status === "confirmed", "Water mist body material must remain confirmed copper.");
  assert(product.facts.surfaceFinish.value === "chromePlated" && product.facts.surfaceFinish.status === "confirmed", "Water mist finish must remain confirmed chrome plating.");
  assert(product.facts.operatingElement.value === "openNozzleNoHeatSensitiveElement" && product.facts.operatingElement.status === "confirmed", "Water mist operating type mismatch.");
  assert(product.facts.maximumWorkingPressureMpa.value === 1.2 && product.facts.maximumWorkingPressureMpa.status === "confirmed", "Water mist maximum working pressure must remain 1.2 MPa.");
  assert(product.facts.strainerMeshAndDimensions.value === null && product.facts.strainerMeshAndDimensions.status === "unresolved", "Water mist strainer dimensions must remain unresolved.");
  assert(product.facts.threadForm.status === "confirmed", "Water mist connection customization must remain confirmed.");
  assert(product.sizeOptions.map((size) => size.dn).join(",") === "15,20,25", "Water mist nominal sizes must be DN15, DN20 and DN25.");
  assert(product.sizeOptions.map((size) => size.domestic).join(",") === "4分,6分,1寸", "Water mist domestic thread mapping is incomplete.");
  assert(product.configurations.join(",") === "standardWaterMist,impingementType", "Water mist configurations are incomplete.");
  assert(product.models.length === 6, "The water mist model table must contain six current/custom rows.");
  assert(product.models.filter((model) => model.factoryReference === "ZSTWB").length === 3, "ZSTWB standard model rows are incomplete.");
  assert(product.models.filter((model) => model.factoryReference === "ZSTWC").length === 2, "ZSTWC impingement model rows are incomplete.");
  assert(product.models.filter((model) => model.factoryReference === "ZSTWB").map((model) => model.dn).join(",") === "15,20,25", "ZSTWB standard sizes are incorrect.");
  assert(product.models.filter((model) => model.factoryReference === "ZSTWC").map((model) => model.dn).join(",") === "15,20", "ZSTWC impingement sizes are incorrect.");
  assert(product.models.some((model) => model.factoryReference === "custom"), "The confirmed custom impingement option is missing.");
  assert(product.media.length === 5, "Only the five approved replacement water mist photos should be published.");
  assert(!product.media.some((media) => /glass-bulb/i.test(media.src)), "A heat-sensitive glass-bulb image must not appear in the open-nozzle gallery.");
  validateMedia(product);
  validateLocalizedCopy(product, ["seoTitle", "seoDescription", "name", "lead", "galleryTitle", "technicalTitle", "detailPanelTitle", "modelsTitle", "oemTitle", "inquiryTitle"]);
  for (const localeCode of localeCodes) {
    const copy = readJson(`site-src/content/products/${localeCode}/${product.id}.json`);
    assert(copy.detailNotes?.length === 4, `${product.id}/${localeCode} must contain four quotation notes.`);
    for (const style of ["standard", "impingement", "customImpingement"]) assert(copy.modelNames?.[style], `${product.id}/${localeCode} is missing model name '${style}'.`);
  }
}

validateWetAlarm();
validateWaterCurtain();
validateWaterMist();
console.log("Catalog validation passed: three confirmed products and six localized outputs are ready.");
