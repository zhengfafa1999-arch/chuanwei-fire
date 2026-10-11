import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { catalogExpansionProducts } from "../site-src/_data/catalogExpansion.js";
import publicPages from "../site-src/_data/publicPages.js";
import { SITE_ROUTES } from "../site-src/_data/siteRoutes.js";

const root = process.cwd();
const directories = ["site-src/_data/documented-products", "site-src/_data/preserved-products", "site-src/content/products"];
const forbidden = /\bv\d{1,2}\b|approved factory model|approved (?:v\d+ )?(?:record|catalog|selection table)|source[- ]catalog|handoff record|quotation-sheet language|source tables|selection data source|technical data status|preliminary selection data|user-confirmed selection data|archived white-background image|the table preserves|image evidence scope|كتالوج الإصدار المعتمد|جدول موديلات المصنع المعتمد|حالة البيانات الفنية/iu;
let checked = 0;
function check(value, location) {
  if (typeof value === "string") {
    assert(!forbidden.test(value), `${location}: internal editorial wording: ${value}`);
    checked++;
  } else if (Array.isArray(value)) value.forEach((item, index) => check(item, `${location}[${index}]`));
  else if (value && typeof value === "object") Object.entries(value).forEach(([key, item]) => check(item, `${location}.${key}`));
}
function walk(directory) {
  for (const entry of fs.readdirSync(path.join(root, directory), { withFileTypes: true })) {
    const filename = `${directory}/${entry.name}`;
    if (entry.isDirectory()) walk(filename);
    else if (entry.name.endsWith(".json")) {
      const data = JSON.parse(fs.readFileSync(path.join(root, filename), "utf8"));
      // Internal source/evidence stays intact; only public language copy is checked.
      check(data.copy ?? data, filename);
    }
  }
}
directories.forEach(walk);
catalogExpansionProducts.forEach(product => check(product.copy, `catalogExpansion:${product.id}`));
publicPages.forEach(page => check(page.copy, `public:${page.routeId}/${page.lang ?? page.copy.lang}`));

if (process.argv.includes("--generated")) {
  let pages = 0;
  for (const route of Object.values(SITE_ROUTES)) for (const locale of Object.values(route.locales)) {
    if (locale.status !== "published") continue;
    const html = fs.readFileSync(path.join(root, locale.outputPath), "utf8");
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1];
    assert(main, `${locale.outputPath}: missing public content`);
    const visibleText = main.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
    assert(!forbidden.test(visibleText), `${locale.outputPath}: internal editorial wording leaked into public content`);
    assert(!/Confirmed buyer-facing specifications|confirmed replacement photographs|connection to be confirmed|\bTo be confirmed\b|مواصفات مؤكدة للمشتري|صور الاستبدال المؤكدة|يُؤكد لاحقًا/iu.test(visibleText), `${locale.outputPath}: editorial status or unresolved placeholder displayed as customer content`);
    assert(!/Verified management systems/i.test(visibleText), `${locale.outputPath}: independently verified certificate claim lacks evidence`);
    pages++;
  }
  console.log(`Rendered buyer-copy validation passed: ${pages} public pages.`);
}

const sample = JSON.parse(fs.readFileSync("site-src/_data/documented-products/standard-response-fire-sprinkler.json", "utf8"));
assert.equal(sample.models.length, 3);
assert.deepEqual(sample.models.map(row => row.factoryModel), ["T-ZSTZ 80-68°C Q5A", "T-ZSTX 80-68°C Q5A", "T-ZSTBS 80-68°C Q5A"]);
assert.equal(sample.shared.workingPressureValue, "1.21 MPa / 12.1 bar / approx. 175 psi");
assert.equal(sample.shared.connectionValue, "DN15 / ½ in nominal connection");
assert.equal(sample.shared.kFactorValue, "K5.6 US / K80 metric");
assert.equal(sample.shared.temperatureValue, "68°C / 155°F · red glass bulb");
assert.equal(sample.shared.temperatureOptionsValue, "57°C / 68°C / 79°C / 93°C / 141°C / 182°C / 260°C");
assert.deepEqual(sample.source.userConfirmation.temperatureOptionsCelsius, [57, 68, 79, 93, 141, 182, 260]);
assert.equal(sample.source.userConfirmation.date, "2026-10-08");
assert(sample.source.userConfirmation.verbatim.includes("默认是bspt"));
assert.equal(sample.copy.en.threadFormValue, "BSPT (default) / NPT (optional); other thread requirements reviewed against the order drawing");
assert.equal(sample.copy.en.materialValue, "Copper-based frame / Stainless steel frame");
assert(!/alloy grade|درجات السبائك|درجة السبيكة/i.test(JSON.stringify(sample.copy)), "Removed alloy-grade wording reintroduced in public sample copy");
assert.equal(sample.copy.en.finishValue, "Chrome-plated finish");
assert.equal(sample.copy.ar.finishValue, "تشطيب مطلي بالكروم");
assert.equal(sample.source.userConfirmation.finishConfirmation.verbatim, "就写镀铬");
assert.equal(sample.source.userConfirmation.finishConfirmation.publicFinish, "Chrome-plated");
assert.equal(sample.shared.piecesPerBoxValue, "100 pcs / box");
assert.equal(sample.shared.thermalElementValue, "5 mm red glass bulb");
assert.equal(sample.source.userConfirmation.packaging.verbatim, "每盒100个，包装相同");
assert.equal(sample.source.userConfirmation.packaging.piecesPerBox, 100);
assert.equal(sample.source.userConfirmation.packaging.samePackingForFrameOptions, true);
assert.equal(sample.source.userConfirmation.packaging.piecesPerShippingCarton, null, "Shipping-carton quantity must stay unresolved");
assert(sample.copy.en.packingValue.includes("Same packing for copper-based and stainless steel frames"));
assert(sample.copy.en.packagingBody.startsWith("100 pieces per box, with the same packing for copper-based and stainless steel frames."));
assert(sample.copy.ar.packagingBody.startsWith("100 قطعة في كل علبة"));
assert(!/\b\d+\s*(?:pieces|pcs)\s*(?:per|\/)\s*(?:shipping[ -])?carton\b/i.test(JSON.stringify(sample.copy)), "Box quantity incorrectly attributed to shipping carton");
for (const [label, value] of [["threadForm", "threadFormValue"], ["material", "materialValue"], ["finish", "finishValue"], ["temperatureOptions", "temperatureOptionsValue"], ["piecesPerBox", "piecesPerBoxValue"], ["packing", "packingValue"]]) {
  assert(sample.specifications.some(row => row.label === label && row.value === value), `${label}: confirmed option missing`);
}
assert(!/\b(?:nickel|brass|pure copper|yellow|green|blue)\b/i.test(JSON.stringify(sample.copy)), "Unconfirmed underlayer, alloy or bulb colors introduced");
assert.equal(sample.source.catalogVersion, "v11", "Internal evidence version must be retained");
assert.equal(sample.media.upright, "products/消防喷头/standard-response-sprinkler/standard-response-pendent.jpg", "Visually verified upright mapping changed");
assert.equal(sample.media.pendent, "products/消防喷头/standard-response-sprinkler/standard-response-upright.jpg", "Visually verified pendent mapping changed");
for (const source of Object.values(sample.media)) assert(fs.existsSync(source), `Missing sample image ${source}`);
for (const locale of ["en", "ar"]) {
  for (const key of ["material", "materialValue", "threadFormValue", "finishValue", "temperatureOptions", "piecesPerBox", "packingValue", "packaging", "packagingTitle", "packagingBody"]) {
    assert(sample.copy[locale][key]?.trim(), `${locale}: missing ${key}`);
  }
}
// Current user confirmation extends only thread, finish and box packing to
// quick response. Keep its existing materials, pressure and temperature scope.
const quick = JSON.parse(fs.readFileSync("site-src/_data/documented-products/glass-bulb-fire-sprinkler.json", "utf8"));
assert.equal(quick.shared.materialsValue, "Upper structure: stainless steel; threaded body: copper");
assert.equal(quick.shared.workingPressureValue, "1.21 MPa / 12.1 bar / approx. 175 psi");
assert.equal(quick.shared.temperatureValue, "68°C / 155°F · red glass bulb");
assert.equal(quick.shared.thermalElementValue, "3 mm red glass bulb");
assert.equal(quick.copy.en.threadFormValue, "BSPT (default) / NPT (optional)");
assert.equal(quick.copy.en.finishValue, "Chrome-plated finish");
assert.equal(quick.shared.piecesPerBoxValue, "100 pcs / box");
assert(quick.packaging && quick.validation.anchors.includes('packaging'));
assert(!/\b\d+\s*(?:pieces|pcs)\s*(?:per|\/)\s*(?:shipping[ -])?carton\b/i.test(JSON.stringify(quick.copy)), "Quick-response box quantity incorrectly attributed to shipping carton");
console.log(`Buyer-copy validation passed: ${checked} public copy values; technical scope, image mapping and internal evidence retained.`);
