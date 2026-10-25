import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import pages from '../site-src/_data/productIndexPages.js';
import { PRODUCT_FAMILIES, flatProducts } from '../site-src/_data/productDirectory.js';
import { thumbnailFor } from '../site-src/_data/catalogThumbnails.js';

// Exercise the browser's actual normalizer, not an independently maintained copy.
const script = fs.readFileSync(new URL('../assets/js/product-finder.js', import.meta.url), 'utf8');
const expression = script.match(/const normalize = ([^;]+);/)?.[1];
assert.ok(expression, 'Browser search normalization must be available');
const normalize = vm.runInNewContext(expression);
const matcher = script.split('// SEARCH MATCHER START')[1]?.split('// SEARCH MATCHER END')[0];
assert(matcher, 'Browser configuration matcher must be available');
const matchEntry = vm.runInNewContext(`(() => { const normalize = ${expression}; ${matcher}; return matchEntry; })()`);
let checks = 0;
const check = (condition, message) => { assert.ok(condition, message); checks += 1; };

for (const page of pages) {
  const entries = page.families.flatMap(family => family.products.map(product => ({ ...product, family: family.id })));
  const matches = (query, category = '') => {
    const tokens = normalize(query).trim().split(/\s+/).filter(Boolean);
    return entries.filter(item => !category || item.family === category).map(item => matchEntry(item, tokens)).filter(Boolean).map(({item, related}) => related ? {...item, name:related.name, href:related.href, image:related.image || item.image, referenceImage:!related.image} : item);
  };
  check(entries.length === PRODUCT_FAMILIES.flatMap(flatProducts).length, `${page.locale}: every existing card is retained`);
  check(entries.every(item => !/Configuration options|خيارات التكوين/.test(item.name) && item.image), `${page.locale}: every product card has a photograph`);
  const sprinklerCards = entries.filter(item => item.family === 'sprinklers');
  check(sprinklerCards.length === 17 && sprinklerCards.every(item => item.seriesId) && new Set(sprinklerCards.map(item => item.seriesId)).size === 17, `${page.locale}: sprinkler directory contains 17 unique series`);
  const inquiryCards = sprinklerCards.filter(item => item.inquiry);
  check(inquiryCards.length === 0, `${page.locale}: all 17 sprinkler series open photographed product details`);
  for (const [response, prefix, bulb, pathPrefix, sourceNumbers] of [
    ['standard', 'T', 'Q5A', 'k115-standard-response-fire-sprinkler', [5904, 5905, 5906]],
    ['quick', 'K', 'Q3A', 'extended-coverage-quick-response-fire-sprinkler', [5887, 5888, 5889]]
  ]) {
    const series = sprinklerCards.find(item => item.seriesId === `k115-${response}`);
    check(series.image && series.href.includes(`/k115-${response}-response-fire-sprinkler`) && !series.href.includes('?view='), `${page.locale}: K115 ${response} has its own photographed series detail`);
    for (const [index, model] of ['ZSTZ', 'ZSTX', 'ZSTBS'].entries()) {
      const query = `${prefix}-${model}115-68°C ${bulb}`;
      const results = matches(query, 'sprinklers');
      const expectedImage = `assets/products/guanya-2026/${pathPrefix}-dsc_${sourceNumbers[index]}-1600.webp`;
      check(results.length === 1 && results[0].seriesId === `k115-${response}` && results[0].href.endsWith(`?view=${encodeURIComponent(expectedImage)}#gallery`) && results[0].image.endsWith(thumbnailFor(expectedImage)), `${page.locale}: ${query} opens its exact orientation and photograph`);
    }
    for (const requirement of ['EC', '1.2 MPa', '1.21 MPa', 'BSPT', 'NPT', '3/4 in', 'DN20']) {
      const query = `K115 ${response} 68°C ${requirement}`;
      check(!matches(query, 'sprinklers').some(item => item.seriesId === `k115-${response}`), `${page.locale}: ${query} does not inherit unconfirmed specifications`);
    }
  }
  check(matches('DN100').length > 0 && matches('DN100').length === matches('DN 100').length, `${page.locale}: spaced DN queries match canonical DN`);
  check(matches('DN 100', 'system-valves').some(item => item.href.includes('wet-alarm-check')), `${page.locale}: DN100 finds wet alarm`);
  const explosionProof = matches('explosion proof DN100', 'system-valves');
  check(explosionProof.length === 1 && explosionProof[0].href.includes('explosion-proof-waterflow-switches'), `${page.locale}: explosion-proof DN100 finds its own photographed product`);
  check(matches('防爆水流指示器 DN 200', 'system-valves').some(item => item.href.includes('explosion-proof-waterflow-switches')), `${page.locale}: Chinese alias and spaced DN200 find the confirmed explosion-proof size option`);
  check(matches('explosion proof', 'sprinklers').length === 0, `${page.locale}: explosion-proof waterflow switch stays in system-valves category`);
  check(matches('ZSJZ 250-M-1.2EX', 'system-valves').some(item => item.href.includes('explosion-proof-waterflow-switches')), `${page.locale}: exact confirmed DN250 explosion-proof factory model is searchable`);
  check(matches('explosion proof DN 250', 'system-valves').some(item => item.href.includes('explosion-proof-waterflow-switches')), `${page.locale}: spaced DN250 finds the newly confirmed explosion-proof size`);
  check(matches('装饰盘', 'pressure-gauges-accessories').some(item => item.href.includes('sprinkler-escutcheons-decorative-covers')), `${page.locale}: decorative accessories are discoverable in the accessories family`);
  check(matches('sprinkler escutcheon', 'pressure-gauges-accessories').some(item => item.href.includes('sprinkler-escutcheons-decorative-covers')), `${page.locale}: English accessory naming is searchable in accessories`);
  check(matches('装饰盘', 'sprinklers').length === 0 && matches('sprinkler escutcheon', 'sprinklers').length === 0, `${page.locale}: sprinkler accessories no longer appear as a sprinkler series`);
  check(matches('装饰盘', 'system-valves').length === 0, `${page.locale}: decorative sprinkler accessories do not enter valve category`);
  for (const [query, slug] of [['防爆压力开关', 'explosion-proof-pressure-switch'], ['防爆电磁阀', 'explosion-proof-solenoid-valve'], ['explosion proof pressure switch', 'explosion-proof-pressure-switch'], ['explosion proof solenoid valve', 'explosion-proof-solenoid-valve']]) {
    const results = matches(query, 'system-valves');
    check(results.length === 1 && results[0].href.includes(slug), `${page.locale}: ${query} resolves to its own component page`);
    check(matches(query, 'sprinklers').length === 0, `${page.locale}: ${query} stays out of sprinkler category`);
  }
  for (const query of ['普通压力开关', '消防压力开关', 'compact pressure switch']) {
    const results = matches(query, 'system-valves');
    check(results.length === 1 && results[0].href.match(/[/]fire-pressure-switch[/.]/), `${page.locale}: compact pressure-switch alias resolves to its own page`);
  }
  check(!matches('explosion proof pressure switch').some(item => /[/]fire-pressure-switch[/.]/.test(item.href)), `${page.locale}: compact switch does not inherit explosion protection`);
  for (const query of ['compact pressure switch DC24V 1A', 'compact pressure switch R1/2', 'compact pressure switch 1.6 MPa']) {
    const results = matches(query, 'system-valves');
    check(results.length === 1 && /[/]fire-pressure-switch[/.]/.test(results[0].href), `${page.locale}: directly confirmed compact switch values are searchable`);
  }
  check(matches('compact pressure switch DN15').length === 0, `${page.locale}: compact switch cannot inherit solenoid nominal size`);
  check(matches('explosion proof solenoid valve DC24V DN15').some(item => item.href.includes('explosion-proof-solenoid-valve')), `${page.locale}: confirmed solenoid voltage and size are searchable`);
  check(matches('explosion proof pressure switch 1.6 MPa').some(item => item.href.includes('explosion-proof-pressure-switch')), `${page.locale}: confirmed pressure-switch rating is searchable`);
  check(matches('explosion proof pressure switch DN15').length === 0, `${page.locale}: pressure switch cannot inherit solenoid nominal size`);
  check(matches('explosion proof solenoid valve R1/2').length === 0, `${page.locale}: G1/2 valve cannot inherit R1/2 switch thread`);
  check(matches('explosion proof solenoid valve NBR').length === 0, `${page.locale}: unconfirmed seal material is not searchable`);
  check(matches('explosion proof 1.2 MPa').length === 0, `${page.locale}: explosion-proof variant cannot inherit the ordinary switch pressure`);
  check(matches('DN100 grooved', 'butterfly-valves').some(item => item.href.includes('grooved-supervisory')), `${page.locale}: DN100 + connection finds signal butterfly valve`);
  check(matches('ZSXDF8-Q-100-16').some(item => item.href.includes('grooved-supervisory-butterfly')), `${page.locale}: exact butterfly model is searchable`);
  const pendent = matches('T-ZSTX 80-68°C Q5A');
  check(pendent.length === 1 && pendent[0].href.includes('standard-response') && pendent[0].href.includes('?view='), `${page.locale}: sprinkler model is scoped to its configuration`);
  const standardCards = entries.filter(item => item.seriesId === 'k80-standard');
  check(standardCards.length === 1 && /[/]standard-response-fire-sprinkler[/.]/.test(standardCards[0].href) && standardCards[0].image && !standardCards[0].href.includes('?view='), `${page.locale}: photographed standard sprinkler orientations share one exact K80 standard series card`);
  const standardSample = matches('standard response 45 g').filter(item => item.seriesId === 'k80-standard');
  check(standardSample.length === 1 && standardSample[0].seriesId === 'k80-standard', `${page.locale}: shared sample specifications find the single standard sprinkler series`);
  const quickSidewall = matches('K80 quick sidewall', 'sprinklers');
  check(quickSidewall.length === 1 && quickSidewall[0].seriesId === 'k80-quick' && quickSidewall[0].href.endsWith('#configuration-quick-68'), `${page.locale}: quick-response sidewall option retains its exact reviewed configuration`);
  check(matches('K80 quick sidewall NPT', 'sprinklers').length === 0, `${page.locale}: quick-response sidewall cannot inherit an unconfirmed NPT thread`);
  check(matches('HS-020').length === 1 && matches('HS-020')[0].href.endsWith('#configuration-obliqueFlanged'), `${page.locale}: landing valve reference stays on its own configuration`);
  check(matches('HS-020 NPT').length === 0, `${page.locale}: a flanged configuration cannot inherit another configuration's threaded connection`);
  check(matches('UHS-020').length === 1 && matches('UHS-020')[0].href.endsWith('#configuration-p21-03'), `${page.locale}: UHS adapter model is distinct from HS valve model`);
  check(matches('UHC-015').length === 1 && matches('UHC-015')[0].href.endsWith('#configuration-p22-01'), `${page.locale}: renamed adapter model still opens the exact configuration`);
  check(matches('Brass-Finish Hexagonal Hose Tail Coupling').some(item => item.href.endsWith('#configuration-p24-01')), `${page.locale}: earlier appearance-based product names remain searchable`);
  check(!matches('FHR-010').some(item => item.href.endsWith('#configuration-p27-02')), `${page.locale}: old swivel-joint aliases cannot inherit a neighboring model`);
  check(matches('HSW-013').length === 1 && matches('HSW-013')[0].href.includes('flanged-inlet-catalog-display'), `${page.locale}: handwheel flanged model stays on the flanged view`);
  check(matches('signal butterfly valve').length === 2, `${page.locale}: explicit signal alias finds the two supervisory butterfly families`);
  check(matches('not-a-product-999').length === 0, `${page.locale}: no-match query stays empty`);
  for (const [query, route] of [['B-DSXC-202', 'closed-rotating-fire-sprinkler'], ['B-DSXC-200', 'closed-centrifugal-fire-sprinklers'], ['ZSPTZ-115', 'tubular-foam-water-nozzles']]) {
    const results = matches(query);
    check(results.length === 1 && results[0].href.includes(route), `${page.locale}: special sprinkler ${query} stays on its own series`);
  }
  check(matches('B-DSXC-202', 'foam-nozzles').length === 0, `${page.locale}: rotating water sprinkler is excluded from foam category`);
  check(matches('ZSPTX-80', 'foam-nozzles').length === 1, `${page.locale}: tubular foam nozzle is registered in foam category`);
  check(matches('air aspirating foam', 'foam-nozzles').length === 1, `${page.locale}: closed air-aspirating foam sprinkler has a separate pictured entry`);
  check(entries.every(item => !/v11|D:\/work|\{n\d+\}/.test(item.searchText)), `${page.locale}: evidence paths, internal versions and unresolved copy are excluded`);
  check(matches('DN25 ZSTWC').length === 0, `${page.locale}: impingement models cannot inherit standard mist-nozzle DN25`);
  check(matches('ZSFZ100(G)').every(item => item.href.includes('grooved')), `${page.locale}: grooved wet alarm references stay on the grooved card`);
  const preactionCards = entries.filter(item => item.href.includes('preaction-valve-assemblies'));
  check(preactionCards.length === 2 && preactionCards.every(item => /#product-photograph-[12]$/.test(item.href)), `${page.locale}: preaction flanged/grooved cards open their exact photographs`);
  check(entries.filter(item => item.family === 'system-valves').slice(0, 12).filter(item => item.href.includes('preaction-valve-assemblies')).length === 2, `${page.locale}: both preaction connections appear on system-valves page 1`);
  const groovedPreaction = matches('preaction grooved DN100', 'system-valves');
  check(groovedPreaction.length === 1 && groovedPreaction[0].href.endsWith('#product-photograph-2') && groovedPreaction[0].image.endsWith(thumbnailFor('assets/products/guanya-2026/preaction-valve-assemblies-preaction-grooved-assembly-1600.webp')), `${page.locale}: grooved preaction uses its own reviewed photograph`);
  check(matches('preaction grooved DN250', 'system-valves').length === 0, `${page.locale}: grooved preaction cannot inherit flanged-only DN250`);
  check(matches('preaction flanged DN250', 'system-valves').some(item => item.href.endsWith('#product-photograph-1')), `${page.locale}: flanged preaction retains DN250`);
  check(matches('ZSFY150(G)', 'system-valves').length === 1 && matches('ZSFY150(G)', 'system-valves')[0].href.endsWith('#product-photograph-2'), `${page.locale}: grooved factory reference opens its own configuration`);
  check(matches('preaction grooved DC 24 V NBR 1.6 MPa', 'system-valves').length === 1 && matches('preaction flanged DC 24 V NBR 1.6 MPa', 'system-valves').length === 1, `${page.locale}: both preaction connections retain user-confirmed shared specifications`);
  check(matches('ESFR-202').length === 1 && matches('ESFR-202')[0].seriesId === 'esfr', `${page.locale}: ESFR models are scoped to the single ESFR series`);
  for (const query of ['K161 sidewall', 'ESFR-202/74°C DN25', 'ZSTZ.X202-68°C Q5 3 mm']) {
    check(matches(query, 'sprinklers').length === 0, `${page.locale}: ${query} cannot combine specifications from different large-K or ESFR models`);
  }
  for (const [query, route] of [['ZSTWB34/120', 'water-mist-nozzles'], ['QZ3.5/7.5', 'straight-stream-fire-hose-nozzles'], ['KD65', 'kd-hose-couplings']]) {
    const results = matches(query);
    check(results.some(item => item.href.includes(route) && (item.href.includes('#configuration-') || !/[?#]/.test(item.href))), `${page.locale}: new ${query} model finds its published configuration`);
    check(results.every(item => !item.href.includes('?view=')), `${page.locale}: new ${query} model does not inherit a legacy photograph`);
  }
  check(matches('ZSTWB34/120').every(item => item.image.endsWith(thumbnailFor('assets/products/verified-configurations/zstwb-stainless.jpg'))), `${page.locale}: stainless model uses its documented stainless photo`);
  check(matches('QZ3.5/7.5').every(item => item.image.endsWith(thumbnailFor('assets/products/verified-configurations/qz35-75.jpg'))), `${page.locale}: QZ model uses its corresponding real sample photo`);
  check(matches('ZSTWB34/120 R 1/2').length === 0, `${page.locale}: related models cannot combine another model's thread size`);
  const concealed = matches('ZSTDY115-57°C Q5A');
  check(concealed.length === 1 && concealed[0].href.endsWith('#configuration-zstdy115-57-q5a'), `${page.locale}: exact concealed model opens its reviewed configuration`);
  check(matches('ZSTDY115-57°C Q5A BSPT').some(item => item.href.endsWith('#configuration-zstdy115-57-q5a')), `${page.locale}: confirmed concealed BSPT connection is searchable`);
  check(matches('ZSTDY115-57°C Q5A NPT').length === 0, `${page.locale}: concealed model cannot inherit an unconfirmed NPT connection`);
  for (const [query, anchor] of [['ZSTDY115-93°C Q5A', 'zstdy115-93-q5a'], ['ZSTDY80-141°C Q5A', 'zstdy80-141-q5a'], ['ZSTDY80-79°C Q5A', 'zstdy80-79-q5a']]) {
    const results = matches(query);
    check(results.length === 1 && results[0].href.endsWith(`#configuration-${anchor}`), `${page.locale}: researched ${query} finds its exact configuration`);
  }
  check(matches('ZSTDY115-93°C Q5A 3/4').length === 0, `${page.locale}: researched DN20 model cannot inherit another configuration's 3/4 connection`);
}
check(script.includes('const pageSize = 12;') && script.includes("window.addEventListener('popstate'") && script.includes("window.addEventListener('pageshow'"), 'Pagination and restore event handlers remain intact');
console.log(`Product search validation passed: ${checks} assertions across English and Arabic indexes.`);
