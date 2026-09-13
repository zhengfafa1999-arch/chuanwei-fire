import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import catalog from "../site-src/_data/preservedCatalog.js";

const read = file => fs.readFileSync(file, "utf8");
const main = html => html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || "";
const decode = text => text.replace(/&(?:amp|lt|gt|quot|apos|nbsp|#39);/g, entity => ({
  "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&apos;": "'", "&#39;": "'", "&nbsp;": " "
})[entity]);
const visibleText = html => decode(html.replace(/<!--[\s\S]*?-->/g, "").replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
const structure = html => [...html.matchAll(/<([a-z][\w-]*)\b([^>]*)>/gi)].map(([, tag, attributes]) => [tag, attributes.match(/\bclass="([^"]*)"/)?.[1] || ""]);
const media = (html, file) => [...html.matchAll(/\b(?:src|data-src|data-lightbox)="([^"]*)"/g)].map(([, source]) => path.resolve(path.dirname(file), decode(source)));

for (const entry of catalog) {
  const output = read(entry.route.outputPath);
  const content = main(output);
  if (entry.product.inlineStyle) {
    assert(output.includes(`<style>${entry.product.inlineStyle}</style>`), 'Original product inline style missing');
    assert(read(`tools/fixtures/${entry.product.id}-en-baseline.txt`).includes(`<style>${entry.product.inlineStyle}</style>`), 'Product inline style differs from original');
  }
  assert(content, `${entry.lang}: product content missing`);
  assert(!/\{\{|\{%|\{n\d+\}/.test(output), `${entry.lang}: unresolved template or numeric placeholder`);
  const baselineFile = `tools/fixtures/${entry.product.id === "diaphragm-deluge-valves" ? "diaphragm-deluge" : entry.product.id}-en-baseline.txt`;
  let baseline = main(read(baselineFile));
  // CATWEB-014: retain the immutable legacy fixture and allow only the reviewed
  // model labels and conservative pressure wording; all other content stays exact.
  if (entry.product.id === 'extended-coverage-quick-response-fire-sprinkler') {
    const replacements = [
      ['>Factory reference<', '>Factory Model<'],
      ['>EC-ZSTX115-68°C series<', '>EC-ZSTX 115-68°C Q3A<'],
      ['>EC-ZSTZ115-68°C series<', '>EC-ZSTZ 115-68°C Q3A<'],
      ['>EC-ZSTBS115-68°C series<', '>EC-ZSTBS 115-68°C Q3A<'],
      ['>1.2 MPa / 12 bar / approx. 175 psi<', '>To be confirmed with the quotation<']
    ];
    for (const [before, after] of replacements) {
      assert.equal(baseline.split(before).length - 1, 1, `CATWEB-014: missing or repeated baseline field ${before}`);
      baseline = baseline.replace(before, after);
    }
  }
  // This legacy page assigns its actual initial labels in inline JavaScript.
  // Preserve the displayed values, while keeping the original fixture immutable.
  if (entry.product.id === "concealed-pendent-fire-sprinkler") {
    // CATWEB-015: explicit K80-only model and matched-cover updates.
    for (const [before, after] of [
      ['>ZSTDY 80 / Q5A<', '>ZSTDY 80-[T]°C Q5A<'],
      ['>ZSTDY 80 / Q3A<', '>ZSTDY 80-[T]°C Q3A<'],
      ['Cover configuration and finish are confirmed with the selected sprinkler and approved sample.', 'For the DN15 / K80 configuration, the 68°C sprinkler is paired with a 59°C cover plate; adjustment range: 12.7 mm. Order the sprinkler and cover as a matched assembly. Other temperatures and DN20 / K115 pairings require separate confirmation.'],
      ['The 79°C option is confirmed in the available model range even though a separate yellow-bulb sample photo is not included in this gallery.', 'The 79°C option is confirmed in the available model range even though a separate yellow-bulb sample photo is not included in this gallery. In the K80 model patterns, [T] denotes the selected sprinkler temperature, not the cover-plate temperature.']
    ]) {
      assert.equal(baseline.split(before).length - 1, 1, `CATWEB-015: missing or repeated baseline field ${before}`);
      baseline = baseline.replace(before, after);
    }
    const original = read(baselineFile);
    for (const [before, after] of [["68°C Concealed Sprinkler", "DN20 / ¾ in · K8.0 / K115 · 68°C"], ["68°C Sprinkler", "DN20 · K115 · 68°C"], ["68°C Red Bulb", "DN15 · K80 · 68°C"]]) {
      assert(original.includes(`'${after}'`), "Original runtime label missing");
      assert(baseline.includes(`>${before}<`), "Original static label missing");
      baseline = baseline.replace(`>${before}<`, `>${after}<`);
    }
  }
  assert.deepEqual(structure(content), structure(baseline), `${entry.lang}: original section/tag/class structure changed`);
  assert.deepEqual(media(content, entry.route.outputPath), media(baseline, entry.product.source.path), `${entry.lang}: original product images changed`);
  for (const image of media(content, entry.route.outputPath)) assert(fs.existsSync(image), `Missing product image: ${image}`);
  const bodies = [...content.matchAll(/<tbody>([\s\S]*?)<\/tbody>/g)];
  const tableRows = bodies.flatMap(([, rows]) => rows.match(/<tr>/g) || []);
  assert.equal(tableRows.length, entry.product.models.length, `${entry.lang}: model count changed`);
  if (entry.product.modelGroups) {
    assert.deepEqual(entry.product.modelGroups.flat(), entry.product.models.map((_, i) => i), 'Model groups must reference every model once, in original order');
    assert.deepEqual(bodies.map(([, rows]) => (rows.match(/<tr>/g) || []).length), entry.product.modelGroups.map(group => group.length), 'Model group row counts changed');
  }
  if (entry.lang === "en") {
    const styles = html => [...html.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*href="([^"]+)"/g)].map(([, href]) => href);
    assert.deepEqual(styles(output), styles(read(baselineFile)), "English stylesheets changed during language-only migration");
    // Shared navigation now includes the approved product menu. Product sections,
    // footer and social order remain covered; navigation has its own validator.
    const body = html => html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1].replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "").replace(/<header\b[^>]*data-global-header[^>]*>[\s\S]*?<\/header>/i, '') || "";
    assert.deepEqual(structure(body(output)), structure(body(read(baselineFile))), "English page structure/footer/social order changed");
    assert.equal(visibleText(content), visibleText(baseline), "English visible product content changed during language-only migration");
    if (entry.product.gallery?.length) {
      const original = read(baselineFile);
      const originalGallery = original.match(/const galleryItems=(\[[\s\S]*?\]);/)?.[1];
      const items = originalGallery
        ? [...originalGallery.matchAll(/src:'([^']+)',alt:'([^']+)',caption:'([^']+)'/g)]
        : [...original.matchAll(/data-gallery-index="\d+" data-src="([^"]+)" data-alt="([^"]+)" data-title="([^"]+)"/g)];
      assert(items.length, "Gallery baseline missing");
      assert.equal(items.length, entry.product.gallery.length, "Gallery image count changed");
      entry.product.gallery.forEach((item, index) => {
        const [, src, alt, caption] = items[index];
        assert.equal(entry.text[item.alt], decode(alt), "English dynamic gallery alt changed");
        assert.equal(entry.text[item.caption], decode(caption), "English dynamic gallery caption changed");
        assert.equal(path.resolve(entry.product.media[item.media]), path.resolve(path.dirname(entry.product.source.path), src), "Dynamic gallery image changed");
      });
    }
    const inquiries = html => [...html.matchAll(/href="(https:[^"]*|mailto:[^"]*)"/g)].map(([, href]) => decode(href));
    assert.deepEqual(inquiries(content), inquiries(baseline), "Existing inquiry destinations/messages changed");
  } else {
    // A ratio must remain one LTR run: splitting on ':' reverses its terms in RTL.
    for (const value of Object.values(entry.text)) {
      const plain = value.replace(/[\u2066\u2069]/g, "");
      for (const [ratio] of plain.matchAll(/\d+(?:\.\d+)?:\d+(?:\.\d+)?|\d+°C\s*\/\s*\d+°F|DN\d+\s*\/\s*[½¾]\s*in/g)) {
        assert(value.includes(ratio), `Arabic ratio split by direction markers: ${ratio}`);
      }
    }
    for (const [key, value] of Object.entries(entry.product.shared)) {
      assert.equal(entry.text[key].replace(/[\u2066\u2069]/g, ""), value, `Arabic technical value changed: ${key}`);
      assert(entry.text[key].includes("\u2066"), `Arabic technical value lacks LTR isolation: ${key}`);
    }
    const dictionary = JSON.parse(read(`site-src/content/products/ar/${entry.product.id}.json`));
    assert.deepEqual(Object.keys(dictionary).sort(), Object.keys(entry.product.copy).sort(), "Arabic copy keys differ from shared product copy");
    for (const [key, value] of Object.entries(dictionary)) {
      assert(/[\u0600-\u06ff]/.test(value) || value === "OEM / ODM", `Arabic translation missing for ${key}`);
      assert(!/\d/.test(value.replace(/\{n\d+\}/g, "")), `Numeric fact duplicated in Arabic copy: ${key}`);
    }
  }
}
console.log(`Preserved-product validation passed: ${catalog.length} language outputs retain original structure and media; English content matches immutable fixtures with explicitly reviewed CATWEB-014/015 field substitutions.`);
