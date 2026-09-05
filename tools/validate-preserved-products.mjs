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
  assert(content, `${entry.lang}: product content missing`);
  assert(!/\{\{|\{%|\{n\d+\}/.test(output), `${entry.lang}: unresolved template or numeric placeholder`);
  const baselineFile = `tools/fixtures/${entry.product.id === "diaphragm-deluge-valves" ? "diaphragm-deluge" : entry.product.id}-en-baseline.txt`;
  const baseline = main(read(baselineFile));
  assert.deepEqual(structure(content), structure(baseline), `${entry.lang}: original section/tag/class structure changed`);
  assert.deepEqual(media(content, entry.route.outputPath), media(baseline, entry.product.source.path), `${entry.lang}: original product images changed`);
  for (const image of media(content, entry.route.outputPath)) assert(fs.existsSync(image), `Missing product image: ${image}`);
  const tableRows = content.match(/<tbody>([\s\S]*?)<\/tbody>/)?.[1].match(/<tr>/g) || [];
  assert.equal(tableRows.length, entry.product.models.length, `${entry.lang}: model count changed`);
  if (entry.lang === "en") {
    const body = html => html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1].replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "") || "";
    assert.deepEqual(structure(body(output)), structure(body(read(baselineFile))), "English page structure/footer/social order changed");
    assert.equal(visibleText(content), visibleText(baseline), "English visible product content changed during language-only migration");
    const inquiries = html => [...html.matchAll(/href="(https:[^"]*|mailto:[^"]*)"/g)].map(([, href]) => decode(href));
    assert.deepEqual(inquiries(content), inquiries(baseline), "Existing inquiry destinations/messages changed");
  } else {
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
console.log(`Preserved-product validation passed: ${catalog.length} language outputs retain original sections, images, model count and shared numeric facts; English text matches the pre-migration fixture.`);
