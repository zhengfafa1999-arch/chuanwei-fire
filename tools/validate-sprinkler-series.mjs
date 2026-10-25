import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { PRODUCT_FAMILIES, flatProducts } from '../site-src/_data/productDirectory.js';
import { concealedSeries } from '../site-src/lib/concealed-series.js';
import { largeKEsfrSeries } from '../site-src/lib/large-k-esfr-series.js';
import { supplementConfigurations, supplementCatalog, productSupplement } from '../site-src/lib/product-supplements.js';
import { SITE_ROUTES } from '../site-src/_data/siteRoutes.js';

const family = PRODUCT_FAMILIES.find(item => item.id === 'sprinklers');
const cards = flatProducts(family);
const names = ['K80标准响应', 'K80快速响应', 'K115快速响应', 'K115标准响应', 'K80标准隐蔽式', 'K80快速隐蔽式', 'K115标准隐蔽式', 'K115快速隐蔽式', '干式', '大K值', 'EC消防喷头', 'ESFR', '易熔合金', '闭式旋转', '闭式离心', '水雾', '水幕'];
assert.deepEqual(cards.map(card => card.name.zh), names, 'All 17 approved groups retain their order');
assert.equal(new Set(cards.map(card => card.seriesId)).size, 17);
assert(cards.every(card => card.configurations.length === 0 && card.views.length === 0), 'Orientations do not create separate directory cards');
assert(!cards.some(card => card.routeId?.includes('escutcheon')), 'Accessories have a separate family');
for (const card of cards) {
  for (const locale of ['en', 'ar', 'zh']) assert(card.name[locale], `${card.seriesId}: ${locale} name`);
  if (card.inquiry) {
    assert.equal(card.routeId, null);
    assert.equal(card.image, null);
    assert.equal(card.imageLabel, 'K115');
    assert(card.description.en && card.description.ar);
    assert(!/DN\d|EC|ZST|MPa/.test(card.searchTerms), 'Inquiry card does not borrow another model’s facts');
  } else {
    assert(fs.existsSync(new URL(`../${card.image}`, import.meta.url)), `${card.seriesId}: image exists`);
  }
}
assert.equal(cards.filter(card => card.inquiry).length, 0, 'All 17 series now have photographed product details');
for (const response of ['standard', 'quick']) {
  const card = cards.find(item => item.seriesId === `k115-${response}`);
  assert.equal(card.routeId, `product:k115-${response}-response-fire-sprinkler`);
  assert.equal(card.relatedConfigurations.length, 3, `${card.seriesId}: three photographed orientations`);
}

const source = fs.readFileSync(new URL('../assets/js/product-finder.js', import.meta.url), 'utf8');
const normalizeExpression = source.match(/const normalize = ([^;]+);/)?.[1];
const matcher = source.split('// SEARCH MATCHER START')[1]?.split('// SEARCH MATCHER END')[0];
const { normalize, matchEntry } = vm.runInNewContext(`(() => { const normalize = ${normalizeExpression}; ${matcher}; return {normalize, matchEntry}; })()`);
const entries = cards.map(card => ({ ...card,
  searchText: [card.name.en, card.name.ar, card.name.zh, card.searchTerms].join(' '),
  relatedConfigurations: card.relatedConfigurations.map(item => ({ ...item, searchText: item.searchTerms }))
}));
const matches = query => entries.map(item => matchEntry(item, normalize(query).split(/\s+/))).filter(Boolean);
for (const [response, prefix, bulb, pathPrefix, sourceNumbers] of [
  ['standard', 'T', 'Q5A', 'k115-standard-response-fire-sprinkler', [5904, 5905, 5906]],
  ['quick', 'K', 'Q3A', 'extended-coverage-quick-response-fire-sprinkler', [5887, 5888, 5889]]
]) {
  for (const [index, model] of ['ZSTZ', 'ZSTX', 'ZSTBS'].entries()) {
    const query = `${prefix}-${model}115-68°C ${bulb}`;
    const results = matches(query);
    const expectedImage = `assets/products/guanya-2026/${pathPrefix}-dsc_${sourceNumbers[index]}-1600.webp`;
    assert.equal(results.length, 1, `${query}: one ordinary K115 series`);
    assert.equal(results[0].item.seriesId, `k115-${response}`);
    assert.equal(results[0].related?.image, expectedImage, `${query}: exact photographed orientation`);
    assert.equal(results[0].related?.suffix, `?view=${encodeURIComponent(expectedImage)}#gallery`);
  }
  for (const requirement of ['EC', '1.2 MPa', '1.21 MPa', 'BSPT', 'NPT', '3/4 in', 'DN20']) {
    const query = `K115 ${response} 68°C ${requirement}`;
    assert(!matches(query).some(result => result.item.seriesId === `k115-${response}`), `${query}: ordinary K115 does not inherit unconfirmed specifications`);
  }
}
for (const [query, seriesId, anchor] of [
  ['ZSTDY115-57°C Q5A BSPT', 'k115-standard-concealed', 'configuration-zstdy115-57-q5a'],
  ['ZSTDY115-93°C Q5A', 'k115-standard-concealed', 'configuration-zstdy115-93-q5a'],
  ['ZSTDY80-141°C Q5A', 'k80-standard-concealed', 'configuration-zstdy80-141-q5a'],
  ['ZSTDY80-93°C Q3A', 'k80-quick-concealed', 'configuration-zstdy80-93-q3a']
]) {
  const results = matches(query);
  assert.equal(results.length, 1, `${query}: one series`);
  assert.equal(results[0].item.seriesId, seriesId);
  assert.equal(results[0].related?.anchor, anchor, `${query}: exact configuration, not aggregate facts`);
}
for (const query of ['DN25 ZSTWC', 'ZSTWB34/120 R 1/2', 'ZSTDY115-57°C Q5A NPT', 'ZSTDY115-93°C Q5A 3/4', 'K80 concealed DN20', 'K115 concealed DN15', 'K161 sidewall', 'ESFR-202/74°C DN25', 'ZSTZ.X202-68°C Q5 3 mm']) {
  assert.equal(matches(query).length, 0, `${query}: unrelated configuration values cannot combine`);
}
assert.equal(matches('ESFR-202').length, 1);
assert.equal(matches('ESFR-202')[0].item.seriesId, 'esfr');
assert.equal(matches('T-ZSTZ161-68°C Q5').length, 1);
assert.equal(matches('T-ZSTZ161-68°C Q5')[0].item.seriesId, 'large-k');
for (const [query, productId] of [['K202 sidewall', 'large-k-factor-sprinklers'], ['ESFR-202/74°C DN20', 'esfr-sprinklers'], ['ESFR-363/74°C DN25', 'esfr-sprinklers'], ['ZSTZ.X202-68°C Q5 5 mm', 'large-k-factor-sprinklers']]) {
  const result = matches(query);
  assert.equal(result.length, 1, `${query}: valid same-row combination retained`);
  assert.equal(result[0].related?.anchor, 'models', `${query}: comes from an independent model record`);
  assert.equal(result[0].item.routeId, `product:${productId}`, `${query}: opens the correct independent detail page`);
}
assert(!/ESFR/i.test(entries.find(item => item.seriesId === 'large-k').searchText));
assert(!/T-ZST|ZSTBS|K161/.test(entries.find(item => item.seriesId === 'esfr').searchText));
const pendent = matches('T-ZSTX 80-68°C Q5A');
assert.equal(pendent.length, 1);
assert.equal(pendent[0].item.seriesId, 'k80-standard');
assert(pendent[0].related?.suffix.startsWith('?view='), 'Exact orientation remains available inside the combined series');
assert(matches('standard response 45 g').some(result => result.item.seriesId === 'k80-standard' && !result.related));
assert(matches('ZSTWB34/120').some(result => result.related?.anchor === 'configuration-ss-1'));
const quickSidewall = matches('K80 quick sidewall');
assert.equal(quickSidewall.length, 1);
assert.equal(quickSidewall[0].item.seriesId, 'k80-quick');
assert.equal(quickSidewall[0].related?.anchor, 'configuration-quick-68');
assert.equal(quickSidewall[0].related.image, 'assets/products/guanya-2026/glass-bulb-fire-sprinkler-dsc_5841-1600.webp', 'Sidewall option uses the user-confirmed photograph');
assert.equal(quickSidewall[0].related.imageCaption.en, 'Horizontal sidewall quick-response sprinkler — marked K-ZSTBS 80-68°C Q3A.');
assert(!/sidewall/i.test(entries.find(item => item.seriesId === 'k80-quick').searchText));
assert.equal(matches('K80 quick sidewall NPT').length, 0, 'Unconfirmed sidewall thread does not inherit another view’s values');

const concealed = fs.readFileSync(new URL('../site-src/_includes/product-series/concealed-pendent.njk', import.meta.url), 'utf8');
const anchors = JSON.parse(concealed.match(/set seriesAnchors = (\[[^\]]+\])/)[1]);
assert.deepEqual(anchors, ['series-k80-standard-concealed', 'series-k115-standard-concealed', 'series-k80-quick-concealed', 'series-k115-quick-concealed']);
assert(concealed.includes('<tr id="{{ seriesAnchors[loop.index0] }}">'));
const largeK = fs.readFileSync(new URL('../site-src/_includes/product-series/large-k-esfr.njk', import.meta.url), 'utf8');
for (const [anchor, title] of [['series-large-k', 'largeKFactorSpraySprinklers'], ['series-esfr', 'eSFRStorageSprinklers']]) {
  assert(largeK.includes(`<div class="series-block" id="${anchor}"><h3>{{ entry.text.${title} }}</h3>`));
}
for (const seriesId of ['k80-standard-concealed', 'k80-quick-concealed', 'k115-standard-concealed', 'k115-quick-concealed']) {
  const card = cards.find(item => item.seriesId === seriesId);
  const group = concealedSeries.find(item => item.seriesId === seriesId);
  assert.equal(card.routeId, group.routeId, `${seriesId}: independent detail route`);
  assert.equal(card.anchor, undefined, `${seriesId}: must open its own page, not a shared table row`);
  const product = JSON.parse(fs.readFileSync(new URL(`../site-src/_data/documented-products/${group.productId}.json`, import.meta.url), 'utf8'));
  assert.equal(product.models.length, 1);
  assert.equal(product.models[0].factoryModel, group.factoryModel);
  assert.equal(product.shared.kFactorValue, `K${group.kFactor} metric`);
  assert(product.copy.en.responseValue.toLowerCase().startsWith(group.response));
  assert.deepEqual(Object.keys(product.media), ['hero', 'covered', 'exposed']);
  for (const [role, image] of Object.entries(product.media)) assert(image.includes(`${seriesId}-${role === 'hero' ? 'covered-and-exposed' : `68c-${role}`}.webp`), `${seriesId}: only this group's pictures`);
  const configurations = supplementConfigurations(group.routeId);
  assert.deepEqual(configurations.map(item => item.id), group.supplementIds, `${seriesId}: exact-model subset`);
  for (const configuration of configurations) assert.equal(configuration, supplementCatalog['concealed-pendent-fire-sprinkler'].find(item => item.id === configuration.id), 'Reuse original exact-model evidence without copying or widening facts');
  for (const locale of ['en', 'ar']) {
    const rendered = productSupplement(group.routeId, locale, '');
    assert.deepEqual(rendered?.configs.map(item => item.id) || [], group.supplementIds);
    assert(SITE_ROUTES[group.routeId].locales[locale].outputPath.includes(group.productId));
  }
  assert.equal(card.image, `assets/products/concealed-series/${seriesId}-covered-and-exposed.webp`, `${seriesId}: matching covered and exposed sample`);
  for (const locale of ['en', 'ar']) assert(card.imageCaption[locale].includes(`${seriesId.split('-')[0].toUpperCase()} / 68°C`), `${seriesId}: actual sample temperature remains identified`);
}
assert.equal(new Set(concealedSeries.map(item => item.routeId)).size, 4, 'Four concealed groups must not share a detail route');
for (const [query, seriesId] of [['ZSTDY80-68°C Q5A', 'k80-standard-concealed'], ['ZSTDY80-68°C Q3A', 'k80-quick-concealed'], ['ZSTDY115-68°C Q5A', 'k115-standard-concealed'], ['ZSTDY115-68°C Q3A', 'k115-quick-concealed']]) {
  const result = matches(query);
  assert.equal(result.length, 1, `${query}: isolated sample configuration`);
  assert.equal(result[0].item.seriesId, seriesId);
}
assert(cards.find(card => card.seriesId === 'large-k').imageCaption.en.includes('K161'));
const oldProduct = JSON.parse(fs.readFileSync(new URL('../site-src/_data/preserved-products/large-k-factor-esfr-sprinklers.json', import.meta.url), 'utf8'));
const separatedMedia = [];
for (const [groupIndex, group] of largeKEsfrSeries.entries()) {
  const card = cards.find(item => item.seriesId === group.seriesId);
  assert.equal(card.routeId, group.routeId);
  assert.equal(card.anchor, undefined, 'Series opens its own page without a legacy fragment');
  const product = JSON.parse(fs.readFileSync(new URL(`../site-src/_data/documented-products/${group.productId}.json`, import.meta.url), 'utf8'));
  assert.equal(product.models.length, 6);
  assert.equal(product.gallery.length, groupIndex === 0 ? 5 : 4);
  assert.equal(product.photoSourceFiles, undefined, 'No mixed legacy photo gallery is appended');
  for (const [index, row] of product.models.entries()) {
    const original = oldProduct.models[groupIndex * 6 + index];
    assert.equal(row.configuration, original[0]);
    assert.equal(row.kFactor, oldProduct.shared[original[1]]);
    assert.equal(row.connection, oldProduct.shared[original[2]]);
    assert.equal(row.thermalElement, original[3]);
    assert.equal(row.factoryModel, oldProduct.shared[original[4]]);
  }
  separatedMedia.push(new Set(Object.values(product.media)));
  assert.deepEqual(supplementConfigurations(group.routeId).map(item => item.id), group.supplementIds);
  for (const locale of ['en', 'ar']) {
    assert(SITE_ROUTES[group.routeId].locales[locale].outputPath.includes(group.productId));
    assert.equal(product.copy[locale].title, group.name[locale]);
  }
}
assert.equal(new Set(largeKEsfrSeries.map(item => item.routeId)).size, 2);
assert(![...separatedMedia[0]].some(image => separatedMedia[1].has(image)), 'The two details have separate photograph sets');
assert.equal(supplementConfigurations('product:esfr-sprinklers')[0], supplementCatalog['large-k-factor-esfr-sprinklers'][0], 'ESFR supplement retains its original evidence');
console.log('Sprinkler series validation passed: 17 photographed groups, four independent concealed details, scoped exact-model evidence and model search.');
