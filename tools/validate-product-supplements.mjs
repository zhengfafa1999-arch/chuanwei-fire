import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import { supplementCatalog, productSupplement } from '../site-src/lib/product-supplements.js';
import { createProductPageRoute, SITE_ROUTES } from '../site-src/_data/siteRoutes.js';
import { productSearchTerms } from '../site-src/_data/productSearchData.js';

const read = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const ledger = read('docs/reviews/alibaba-materials-20261009/website-reuse-ledger.json');
const images = read('docs/reviews/alibaba-materials-20261009/reused-images.json');
const local = (value, lang) => typeof value === 'string' ? value : value?.[lang] || '';
const numeric = value => value.match(/[0-9]+(?:\.[0-9]+)?|[½¾]/g) || [];
const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const forbidden = /\b(?:UL|FM|CE|CCC|NFPA|ASTM)\b|approved factory|\bv\d{1,2}\b|D:[/\\]|待确认|alloy grade/i;
let rowCount = 0, outputCount = 0;
for (const [id, configs] of Object.entries(supplementCatalog)) {
  const routeId = `product:${id}`;
  assert(SITE_ROUTES[routeId], `Unregistered supplement route: ${id}`);
  assert.equal(new Set(configs.map(c => c.id)).size, configs.length, `${id}: duplicate configuration IDs`);
  for (const config of configs) {
    const proof = ledger.configurations.find(p => p.product === id && p.configuration === config.id);
    assert(proof, `${id}/${config.id}: missing provenance ledger`);
    assert.equal(proof.package, config.evidence.package);
    assert.equal(proof.document, config.evidence.document);
    assert.equal(proof.state, 'selected-for-website');
    assert.deepEqual(proof.rows, config.rows.map(r => ({ label: r.label.en, value: local(r.value, 'en') })), `${id}: provenance data differs`);
    assert(ledger.sourceDocuments[proof.sourceKey]?.text, `${id}: source record not retained`);
    if (proof.fieldEvidence) {
      assert.deepEqual(proof.fieldEvidence.map(f => f.label), proof.rows.map(r => r.label), `${id}/${config.id}: incomplete field evidence`);
      for (const field of proof.fieldEvidence) {
        assert.equal(field.scope, config.id, `${id}: evidence expanded to another configuration`);
        assert(field.sourceKeys.length, `${id}: empty field evidence`);
        for (const key of field.sourceKeys) {
          const document = ledger.sourceDocuments[key];
          assert(document?.text && document.sha256, `${id}: missing retained evidence ${key}`);
          assert.equal(crypto.createHash('sha256').update(document.text, 'utf8').digest('hex'), document.sha256, `${id}: retained evidence text changed`);
        }
      }
    }
    for (const key of ['title', 'scope', 'note']) {
      if (!config[key]) continue;
      assert(config[key].en && config[key].ar, `${id}: missing bilingual ${key}`);
      assert.deepEqual(numeric(config[key].en), numeric(config[key].ar), `${id}: ${key} numeric mismatch`);
    }
    for (const r of config.rows) {
      assert(r.label.en && r.label.ar && /[\u0600-\u06ff]/.test(r.label.ar), `${id}: missing field translation`);
      assert(local(r.value, 'en') && local(r.value, 'ar'), `${id}: missing field value`);
      assert.deepEqual(numeric(local(r.value, 'en')), numeric(local(r.value, 'ar')), `${id}: numeric value mismatch`);
      assert(!forbidden.test(local(r.value, 'en')), `${id}: unsupported or internal public claim`);
      rowCount++;
    }
    if (config.image) {
      const proof = images.find(i => i.websitePath === config.image.path);
      assert(proof && proof.type === 'archived-real-source-product-photo', `${id}: image provenance missing`);
      assert.equal(crypto.createHash('sha256').update(fs.readFileSync(config.image.path)).digest('hex'), proof.sha256, `${id}: source photograph changed`);
    }
  }
  for (const lang of ['en', 'ar']) {
    const route = createProductPageRoute(routeId, lang);
    const supplement = productSupplement(routeId, lang, route.assetPrefix);
    assert(!forbidden.test(JSON.stringify(supplement)), `${id}/${lang}: source/unsupported claim leaked`);
    if (!process.argv.includes('--generated')) continue;
    const html = fs.readFileSync(route.outputPath, 'utf8');
    const sections = html.match(/<section\b[^>]*data-product-supplement>[\s\S]*?<\/section>/g) || [];
    assert.equal(sections.length, 1, `${id}/${lang}: supplement not rendered exactly once`);
    const section = sections[0];
    assert.equal((section.match(/data-supply-configuration=/g) || []).length, configs.length);
    assert.equal((section.match(/<dd>/g) || []).length, supplement.configs.reduce((n, c) => n + c.rows.length, 0));
    for (const config of supplement.configs) {
      assert(section.includes(`id="configuration-${config.id}"`));
      assert(section.includes(escape(config.title)));
      assert(section.includes(escape(config.scope)));
      for (const row of config.rows) assert(section.includes(escape(row.value)), `${id}/${lang}: missing published value ${row.value}`);
      if (config.image) assert(section.includes(`src="${config.image.src}"`));
    }
    assert(!section.includes('data-source') && !/manifest\.json|evidence_grade|market-neutral|manufacturer record/.test(section), `${id}: internal evidence leaked`);
    outputCount++;
  }
}
assert(productSearchTerms('product:straight-stream-fire-hose-nozzles').includes('QZ3.5/7.5'));
assert(productSearchTerms('product:water-mist-nozzles').includes('ZSTWB34/120'));
assert(productSearchTerms('product:kd-hose-couplings').includes('KD65'));
assert(!productSearchTerms('product:water-mist-nozzles', { image: 'products/消防喷头/water-mist-nozzles/water-mist-nozzle-body.jpg' }).includes('ZSTWB34/120'), 'Stainless configuration leaked onto copper photo card');
assert(!JSON.stringify(supplementCatalog['dry-pipe-alarm-valves']).includes('ZSFC200'), 'Pressure evidence expanded to an uncovered model');
assert(!JSON.stringify(supplementCatalog['wafer-supervisory-butterfly-valves']).includes('DN250'), 'Misfiled DN250 archive published');
const concealed = supplementCatalog['concealed-pendent-fire-sprinkler'];
const value = (configuration, label) => local(concealed.find(c => c.id === configuration)?.rows.find(r => r.label.en === label)?.value, 'en');
assert.equal(value('zstdy80-79-q5a', 'Working pressure'), '≤1.2 MPa / ≤12 bar', 'Original pressure upper limit lost');
assert.equal(value('zstdy80-93-q3a', 'K-factor designation'), 'K80', 'Superseded K115 or unconfirmed unit published');
assert.equal(value('zstdy80-57-q5a', 'Finish'), 'Electroplated', 'Unconfirmed plating metal inherited');
assert.equal(value('zstdy115-93-q5a', 'Connection'), 'BSPT', 'DN20 converted into an unconfirmed thread size');
console.log(`Product supplement validation passed: ${Object.keys(supplementCatalog).length} routes, ${Object.values(supplementCatalog).flat().length} configurations, ${rowCount} fields, ${outputCount} localized outputs checked.`);
