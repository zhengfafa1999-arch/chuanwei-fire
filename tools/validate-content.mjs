import assert from "node:assert/strict";
import fs from "node:fs";
import { SITE_ROUTES } from "../site-src/_data/siteRoutes.js";
import { PRODUCT_FAMILIES } from "../site-src/_data/productDirectory.js";

// These are specific withdrawn claims/assets, not a claim that all legacy facts
// have documentary approval. Outstanding evidence is tracked in MIG-905.
const retiredPatterns = [
  [/ZSFZ150-2\.5/i, "withdrawn high-pressure wet alarm model"],
  [/temporary-reference-(?:pendent|upright|horizontal-sidewall)\.jpg/i, "Baidu reference photograph"],
  [/standard-water-mist-nozzle-view-[12]\.jpg/i, "incorrect slotted water mist photo"],
  [/\btype-tested\b/i, "unmatched type-test assertion"],
  [/produced to a national standard/i, "unmatched conformity assertion"],
  [/built to the EN 671-1/i, "unmatched EN conformity assertion"],
  [/QT450-10\s*\/\s*ASTM A536/i, "undocumented material-grade equivalence"],
  [/5000 operating cycles|890 N|5\.5:1|7\.25:1|0\.08–0\.09 MPa/i, "unmatched measured test result"]
];

let pages = 0;
for (const [routeId, route] of Object.entries(SITE_ROUTES)) {
  for (const [locale, target] of Object.entries(route.locales)) {
    if (target.status !== "published") continue;
    const html = fs.readFileSync(target.outputPath, "utf8");
    let decoded = html;
    try { decoded = decodeURIComponent(html); } catch { /* Ordinary percent text may not be URI encoded. */ }
    for (const [pattern, reason] of retiredPatterns) {
      assert(!pattern.test(decoded), `${target.outputPath}: ${reason} has returned.`);
    }
    if (routeId === "home") {
      const caption = { en: "Illustrative view — request current factory photographs.", ar: "صورة توضيحية؛ اطلب صوراً حديثة للمصنع.", zh: "示意图，可联系索取当前工厂实拍照片。" }[locale];
      for (const name of ["production-capability", "warehousing-delivery", "manufacturing-base"]) {
        const card = [...html.matchAll(/<article class="cap">[\s\S]*?<\/article>/g)].find(([value]) => value.includes(`${name}-clean-hd.jpg`))?.[0];
        assert(card?.includes(`>${caption}</p>`), `${target.outputPath}: ${name} illustration needs a visible localized caption.`);
      }
    }
    if (["product:diaphragm-deluge-valves", "product:dry-pipe-alarm-valves", "product:preaction-valve-assemblies"].includes(routeId)) {
      const modelSection = html.match(/<section[^>]*id="models"[\s\S]*?<\/section>/)?.[0];
      assert(modelSection, `${target.outputPath}: model section missing.`);
      assert(!/<td>\d+(?:–\d+)? mm<\/td>/.test(modelSection), `${target.outputPath}: unconfirmed assembly height republished.`);
    }
    pages += 1;
  }
}

const mist = JSON.parse(fs.readFileSync("site-src/_data/products/water-mist-nozzles.json", "utf8"));
const mistCard = PRODUCT_FAMILIES.flatMap((family) => family.products).find((product) => product.routeId === "product:water-mist-nozzles");
assert(mist.media.some((media) => media.src === mistCard.image), "Water mist category photo must be one of the approved detail photographs.");
for (const locale of ["en", "ar"]) {
  const html = fs.readFileSync(SITE_ROUTES["category:sprinklers"].locales[locale].outputPath, "utf8");
  assert(html.includes(mistCard.image), `${locale}: water mist category replacement was not generated.`);
}
console.log(`Content regression checks passed: ${pages} published pages; withdrawn claims and images absent. Legacy specification evidence remains subject to MIG-905 review.`);
