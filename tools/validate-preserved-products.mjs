import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import catalog from "../site-src/_data/preservedCatalog.js";
import { withInquiryDrafts } from "../site-src/lib/inquiry.js";
import { versionedPublicAsset } from '../site-src/lib/public-asset-versions.js';
import { reviewedPhotoPath } from '../site-src/lib/reviewed-product-media.js';

const read = file => fs.readFileSync(file, "utf8");
// Configuration additions have their own bilingual/evidence validator. Preserve
// the original fixture checks for every pre-existing section and gallery.
const withoutSupplement = html => html.replace(/<section\b[^>]*data-(?:product-supplement|product-photos)>[\s\S]*?<\/section>/g, '');
const main = html => html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || "";
const decode = text => text.replace(/&(?:amp|lt|gt|quot|apos|nbsp|#39);/g, entity => ({
  "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&apos;": "'", "&#39;": "'", "&nbsp;": " "
})[entity]);
const visibleText = html => decode(html.replace(/<!--[\s\S]*?-->/g, "").replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
const structure = html => [...html.matchAll(/<([a-z][\w-]*)\b([^>]*)>/gi)].map(([, tag, attributes]) => [tag, attributes.match(/\bclass="([^"]*)"/)?.[1] || ""]);
const media = (html, file) => [...html.matchAll(/\b(?:src|data-src|data-lightbox)="([^"]*)"/g)].map(([, source]) => path.resolve(path.dirname(file), decode(source).split(/[?#]/)[0]));
const remainingSeriesReview = JSON.parse(read('docs/reviews/remaining-series-20261009/reviewed-changes.json'));
const finalCopyReview = JSON.parse(read('docs/reviews/site-final-review-20261010/reviewed-copy-changes.json'));
const esfrGalleryReview = JSON.parse(read('docs/reviews/esfr-gallery-20261010/reviewed-copy-changes.json'));
const siteAuditReview = JSON.parse(read('docs/reviews/site-audit-20261011/reviewed-copy-changes.json'));
const nationalStandardRemoval = JSON.parse(read('docs/reviews/national-standard-removal-20261012/reviewed-changes.json'));

for (const entry of catalog) {
  const output = read(entry.route.outputPath);
  let content = main(withoutSupplement(output));
  // The series review adds only one packing section and its navigation link.
  // Keep the unchanged legacy structure protected below.
  const withoutSeriesUpdate = html => html.replace(/<section\b[^>]*data-series-update="packing">[\s\S]*?<\/section>/g, '').replace(/<a\b[^>]*data-series-update="packing"[^>]*>[\s\S]*?<\/a>/g, '');
  if (entry.product.id === 'extended-coverage-quick-response-fire-sprinkler') {
    assert.equal((output.match(/data-series-update="packing"/g) || []).length, 2, 'EC: packing section/navigation missing or repeated');
    assert(output.includes('id="packaging"'), 'EC: packing anchor missing');
    content = withoutSeriesUpdate(content);
  }
  if (entry.product.inlineStyle) {
    assert(output.includes(`<style>${entry.product.inlineStyle}</style>`), 'Original product inline style missing');
    assert(read(`tools/fixtures/${entry.product.id}-en-baseline.txt`).includes(`<style>${entry.product.inlineStyle}</style>`), 'Product inline style differs from original');
  }
  assert(content, `${entry.lang}: product content missing`);
  assert(!/\{\{|\{%|\{n\d+\}/.test(output), `${entry.lang}: unresolved template or numeric placeholder`);
  const baselineFile = `tools/fixtures/${entry.product.id === "diaphragm-deluge-valves" ? "diaphragm-deluge" : entry.product.id}-en-baseline.txt`;
  let baseline = main(read(baselineFile));
  // User corrected this unit weight on 2026-10-20. Keep the original fixture
  // immutable and permit only this exact specification-field replacement.
  if (entry.product.id === 'bs750-pillar-hydrant') {
    const confirmation = JSON.parse(read('docs/reviews/bs750-weight-20261020/user-confirmation.json'));
    const weight = `${confirmation.confirmed.unitWeightKg} kg`;
    assert.equal(entry.product.shared.weight35kg, weight, 'BS750: shared weight differs from user confirmation');
    for (const [before, after] of confirmation.reviewedEnglishCopyChanges) {
      assert.equal(baseline.split(before).length - 1, 1, 'BS750: expected one original unit-weight field');
      baseline = baseline.replace(before, after);
    }
    assert.equal(entry.text.weight35kg.replace(/[\u2066\u2069]/g, ''), weight, 'BS750: localized weight differs');
    assert(content.includes(`<dt>${entry.text.unitWeight}</dt><dd>${entry.text.weight35kg}</dd>`), 'BS750: rendered unit weight differs');
  }
  // Alibaba material evidence confirms the manufacturer's QT450-10 grade but
  // does not substantiate a foreign-grade equivalence. Only that unsupported
  // suffix is removed; original fixture and manufacturer grade are retained.
  if (['diaphragm-deluge-valves', 'dry-pipe-alarm-valves'].includes(entry.product.id)) {
    const oldValue = 'Ductile iron QT450-10 / ASTM A536 65-45-12';
    assert.equal(baseline.split(oldValue).length - 1, 1, 'Expected one original material-equivalence field');
    baseline = baseline.replace(oldValue, 'Ductile iron QT450-10');
    assert.equal(entry.product.copy.ductileIronQT45010ASTMA5366545.text, 'Ductile iron QT{n0}-{n1}');
    assert(!content.includes('ASTM A536'), 'Unsupported material equivalence was reintroduced');
  }
  // OPT01: replace one internal editing note with buyer-facing K-factor guidance.
  // All technical values, tables, media and other preserved copy stay exact.
  if (entry.product.id === "large-k-factor-esfr-sprinklers") {
    const before = "International K-factor values are paired with the metric values used in factory records. Pricing and domestic quotation-sheet language are omitted.";
    const after = "Compare the US and metric K-factor values below to select the required sprinkler group.";
    assert.equal(baseline.split(before).length - 1, 1, "OPT01: expected exactly one legacy editorial note");
    baseline = baseline.replace(before, after);
  }
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
    const review = JSON.parse(read('docs/reviews/extended-coverage-20261009/reviewed-changes.json'));
    for (const [before, after] of review.reviewedEnglishCopyChanges) {
      assert.equal(baseline.split(before).length - 1, 1, `EC review: missing or repeated baseline copy ${before}`);
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
      ['The 79°C option is confirmed in the available model range even though a separate yellow-bulb sample photo is not included in this gallery.', 'The 79°C option is confirmed in the available model range; a yellow-bulb mechanism sample is shown in Product photographs below. In the K80 model patterns, [T] denotes the selected sprinkler temperature, not the cover-plate temperature.']
    ]) {
      assert.equal(baseline.split(before).length - 1, 1, `CATWEB-015: missing or repeated baseline field ${before}`);
      baseline = baseline.replace(before, after);
    }
    // OPT06: user confirmed both response types and metric K80/K115 on 2026-10-09.
    // Allow only the reviewed selection-copy changes; model rows/media stay protected.
    const selectionCopyChanges = [
      [
            "A flush-finish pendent sprinkler family for ceiling installations, available in standard response and quick response versions. Select the response type, nominal size, K-factor and temperature required for the project.",
            "Concealed pendent fire sprinklers for ceiling installations, available in standard response and quick response versions. Both response types offer metric K80 and K115 options. Select the response type and K-factor, then specify the temperature and matched cover assembly."
      ],
      [
            "Two response options in one family.",
            "Standard & quick response options."
      ],
      [
            "K5.6 US / K80 metric; K8.0 US / K115 metric",
            "K80 metric / K5.6 US; K115 metric / K8.0 US"
      ],
      [
            "5 mm glass bulb. Available in DN15 / K5.6 and DN20 / K8.0.",
            "5 mm glass bulb. DN15: K80 metric / K5.6 US; DN20: K115 metric / K8.0 US."
      ],
      [
            "3 mm glass bulb. Available in DN15 / K5.6 and DN20 / K8.0.",
            "3 mm glass bulb. DN15: K80 metric / K5.6 US; DN20: K115 metric / K8.0 US."
      ],
      [
            "Choose the response type and nominal size first, then specify temperature, finish, thread and marking. Factory references remain secondary production identifiers.",
            "Compare the four configurations below: standard or quick response, each with either metric K80 / DN15 or metric K115 / DN20. Then specify temperature, thread, finish and the matched cover assembly."
      ],
      [
            "K5.6 US / K80 metric",
            "K80 metric / K5.6 US"
      ],
      [
            "K8.0 US / K115 metric",
            "K115 metric / K8.0 US"
      ],
      [
            "Include response type, size, temperature, thread, finish, cover requirement, quantity and destination country.",
            "Include standard or quick response, metric K80 or K115, size, temperature, thread, finish, cover requirement, quantity and destination country."
      ],
      [
            "K5.6 / K8.0 US",
            "K80 / K115 metric · K5.6 / K8.0 US"
      ]
];
    for (const [before, after] of selectionCopyChanges) {
      assert(baseline.includes(before), `OPT06: baseline selection copy missing: ${before}`);
      baseline = baseline.replaceAll(before, after);
    }
    const original = read(baselineFile);
    for (const [before, after] of [["68°C Concealed Sprinkler", "DN20 / ¾ in · K8.0 / K115 · 68°C"], ["68°C Sprinkler", "DN20 · K115 · 68°C"], ["68°C Red Bulb", "DN15 · K80 · 68°C"]]) {
      assert(original.includes(`'${after}'`), "Original runtime label missing");
      assert(baseline.includes(`>${before}<`), "Original static label missing");
      baseline = baseline.replace(`>${before}<`, `>${after}<`);
    }
  }
  // User confirmed common materials, voltage and nominal pressure for every
  // preaction model on 2026-10-09. Keep the fixture immutable and review only
  // these exact copy substitutions; model rows, dimensions and media stay exact.
  if (entry.product.id === 'preaction-valve-assemblies') {
    const confirmation = JSON.parse(read('docs/reviews/preaction-specifications-20261009/user-confirmation.json'));
    assert.equal(confirmation.confirmed.nominalPressure, '1.6 MPa');
    assert.equal(confirmation.confirmed.solenoidVoltage, 'DC 24 V');
    for (const [before, after] of confirmation.reviewedEnglishCopyChanges) {
      assert.equal(baseline.split(before).length - 1, 1, `Preaction: missing or repeated baseline copy ${before}`);
      baseline = baseline.replace(before, after);
    }
  }
  // Each remaining-series copy edit has an explicit reviewed replacement and
  // occurrence count. Keep original fixtures, model rows, media and structure
  // protected rather than regenerating the baseline to accept all changes.
  for (const change of remainingSeriesReview.products[entry.product.id] || []) {
    assert.equal(baseline.split(change.before).length - 1, change.occurrences, `Series review: baseline occurrence count changed for ${entry.product.id}/${change.key}`);
    baseline = baseline.replaceAll(change.before, change.after);
  }
  for (const change of finalCopyReview[entry.product.id] || []) {
    assert.equal(baseline.split(change.before).length - 1, change.occurrences, `Final review: baseline occurrence count changed for ${entry.product.id}/${change.key}`);
    baseline = baseline.replaceAll(change.before, change.after);
  }
  for (const change of esfrGalleryReview[entry.product.id] || []) {
    assert.equal(baseline.split(change.before).length - 1, change.occurrences, `ESFR gallery review: baseline occurrence count changed for ${change.key}`);
    baseline = baseline.replaceAll(change.before, change.after);
  }
  for (const change of siteAuditReview[entry.product.id] || []) {
    assert.equal(baseline.split(change.before).length - 1, change.occurrences, `Site audit: baseline occurrence count changed for ${entry.product.id}/${change.key}`);
    baseline = baseline.replaceAll(change.before, change.after);
  }
  // User requested removal of domestic execution-standard copy site-wide.
  // Keep immutable fixtures and allow only the exact reviewed text/row removals.
  for (const change of nationalStandardRemoval[entry.product.id] || []) {
    assert.equal(baseline.split(change.before).length - 1, change.occurrences, `National-standard removal: baseline count changed for ${entry.product.id}/${change.before}`);
    baseline = baseline.replaceAll(change.before, change.after);
  }
  assert.deepEqual(structure(content), structure(baseline), `${entry.lang}: original section/tag/class structure changed`);
  const expectedMedia = media(baseline, entry.product.source.path).map(file => path.resolve(reviewedPhotoPath(entry.product.routeId, path.relative(process.cwd(), file).split(path.sep).join('/'))));
  assert.deepEqual(media(content, entry.route.outputPath), expectedMedia, `${entry.lang}: product images differ from the explicitly reviewed photo bindings`);
  for (const image of media(content, entry.route.outputPath)) assert(fs.existsSync(image), `Missing product image: ${image}`);
  const bodies = [...content.matchAll(/<tbody>([\s\S]*?)<\/tbody>/g)];
  const tableRows = bodies.flatMap(([, rows]) => rows.match(/<tr>/g) || []);
  assert.equal(tableRows.length, entry.product.models.length, `${entry.lang}: model count changed`);
  if (entry.product.modelGroups) {
    assert.deepEqual(entry.product.modelGroups.flat(), entry.product.models.map((_, i) => i), 'Model groups must reference every model once, in original order');
    assert.deepEqual(bodies.map(([, rows]) => (rows.match(/<tr>/g) || []).length), entry.product.modelGroups.map(group => group.length), 'Model group row counts changed');
  }
  if (entry.lang === "en") {
    const styles = html => [...html.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*href="([^"]+)"/g)]
      .map(([, href]) => href.endsWith('css/site-navigation.css') ? versionedPublicAsset('css/site-navigation.css', href.slice(0, -'css/site-navigation.css'.length)) : href)
      .filter((href) => !href.endsWith("/css/analytics-consent.css") && !href.endsWith("/css/product-supplement.css"));
    assert.deepEqual(styles(output), styles(read(baselineFile)), "English stylesheets changed during language-only migration");
    // Shared navigation now includes the approved product menu. Product sections,
    // footer and social order remain covered; navigation has its own validator.
    const body = html => html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1].replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "").replace(/<header\b[^>]*data-global-header[^>]*>[\s\S]*?<\/header>/i, '') || "";
    const protectedOutput = entry.product.id === 'extended-coverage-quick-response-fire-sprinkler' ? withoutSeriesUpdate(withoutSupplement(output)) : withoutSupplement(output);
    const reviewedPageBaseline = read(baselineFile).replace(/(<main\b[^>]*>)[\s\S]*?(<\/main>)/i, (_, open, close) => open + baseline + close);
    assert.deepEqual(structure(body(protectedOutput)), structure(body(reviewedPageBaseline)), "English page structure/footer/social order changed");
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
        const reviewedGalleryText = value => (esfrGalleryReview[entry.product.id] || []).find(change => change.before === decode(value))?.after ?? decode(value);
        assert.equal(entry.text[item.alt], reviewedGalleryText(alt), "English dynamic gallery alt differs from reviewed copy");
        assert.equal(entry.text[item.caption], reviewedGalleryText(caption), "English dynamic gallery caption differs from reviewed copy");
        const originalPath = path.relative(process.cwd(), path.resolve(path.dirname(entry.product.source.path), src)).split(path.sep).join('/');
        assert.equal(path.resolve(entry.product.media[item.media]), path.resolve(reviewedPhotoPath(entry.product.routeId, originalPath)), "Dynamic gallery image differs from reviewed photo binding");
      });
    }
    const inquiries = html => [...html.matchAll(/href="(https:[^"]*|mailto:[^"]*)"/g)].map(([, href]) => decode(href));
    const expectedInquiries = inquiries(baseline).map(href => withInquiryDrafts(href, entry.text.seoTitle.split(" | ")[0], entry.route.canonical, entry.lang));
    assert.deepEqual(inquiries(content), expectedInquiries, "Inquiry destinations must preserve WhatsApp and use the product-specific email draft");
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
