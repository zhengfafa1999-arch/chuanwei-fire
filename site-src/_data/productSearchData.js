import fs from 'node:fs';
import { productSupplementSearchTerms, sharedViewSupplementIds } from '../lib/product-supplements.js';
import { catalogExpansionByRoute } from './catalogExpansion.js';
import { productPhotoManifest } from '../lib/product-photos.js';

const read = relative => JSON.parse(fs.readFileSync(new URL(relative, import.meta.url), 'utf8'));
const sources = new Map();
const aliases = {
  "fire-pressure-switch": ["compact pressure switch", "fire pressure switch", "消防压力开关", "普通压力开关", "مفتاح ضغط لنظام مكافحة الحريق"],
  "explosion-proof-pressure-switch": ["Explosion Proof Pressure Switch", "防爆压力开关", "مفتاح ضغط مقاوم للانفجار"],
  "explosion-proof-solenoid-valve": ["Explosion Proof Solenoid Valve", "防爆电磁阀", "صمام كهرومغناطيسي مقاوم للانفجار"],
  "sprinkler-escutcheons-decorative-covers": ["sprinkler guard", "sprinkler clamp", "fixing ring", "concealed cover assembly", "喷头防护罩", "喷头固定圈", "喷头卡箍", "隐蔽式盖板", "واقي الرشاش", "مشبك الرشاش", "sprinkler escutcheon", "sprinkler decorative cover", "trim plate", "rosette", "消防喷头装饰配件", "装饰盘", "装饰圈", "圆盖组件", "حلقات تغطية الرشاشات"],
  "explosion-proof-waterflow-switches": ["explosion proof waterflow switch", "explosion proof water flow indicator", "explosionproof waterflow", "防爆水流指示器", "防爆流水指示器", "مؤشر تدفق المياه المقاوم للانفجار"],
  "closed-rotating-fire-sprinkler": ["rotating sprinkler", "闭式旋转喷头"],
  "closed-centrifugal-fire-sprinklers": ["centrifugal sprinkler", "离心喷头", "雨淋喷头"],
  "tubular-foam-water-nozzles": ["foam water nozzle", "筒式水泡沫两用喷头", "泡沫喷头"],
  "closed-air-aspirating-foam-water-sprinkler": ["air aspirating foam water sprinkler", "闭式吸气型泡沫水喷头", "泡沫喷头"],
  'standard-response-fire-sprinkler': ['standard response sprinkler', '消防喷头'],
  'glass-bulb-fire-sprinkler': ['quick response sprinkler'],
  'wet-alarm-check-valve': ['wet alarm valve', 'alarm check valve', '湿式报警阀'],
  'grooved-supervisory-butterfly-valves': ['signal butterfly valve', 'supervisory butterfly valve', '信号蝶阀'],
  'wafer-supervisory-butterfly-valves': ['signal butterfly valve', 'supervisory butterfly valve', '信号蝶阀'],
  'nrs-gate-valves': ['non rising stem gate valve'],
  'osy-gate-valves': ['outside screw and yoke gate valve']
};
// Only properties shared by the configurations belong on every configuration card.
const commonLabels = new Set(['workingPressure', 'maximumWorkingPressure', 'body', 'bodyMaterial', 'disc', 'seat', 'stem', 'medium', 'surfaceFinish', 'thermalElement']);

function sourceFor(id) {
  if (sources.has(id)) return sources.get(id);
  for (const kind of ['products', 'preserved-products', 'documented-products']) {
    const file = new URL(`./${kind}/${id}.json`, import.meta.url);
    if (!fs.existsSync(file)) continue;
    const product = JSON.parse(fs.readFileSync(file, 'utf8'));
    const dictionaries = ['en', 'ar'].map(locale => {
      if (kind === 'products') {
        const copy = read(`../content/products/${locale}/${id}.json`);
        return { ...read(`./locales/${locale}.json`).values, ...copy.modelNames, ...copy.modelConfigurations };
      }
      if (kind === 'documented-products') return { ...product.shared, ...product.copy[locale] };
      const translation = locale === 'ar' ? read(`../content/products/ar/${id}.json`) : null;
      return { ...product.shared, ...Object.fromEntries(Object.entries(product.copy).map(([key, value]) => [key,
        (translation?.[key] ?? value.text).replace(/\{n(\d+)\}/g, (_, index) => value.numbers[index])
      ])) };
    });
    const source = { product, kind, dictionaries };
    sources.set(id, source);
    return source;
  }
  const product = catalogExpansionByRoute.get(`product:${id}`);
  const source = product ? { product, kind: 'documented-products', dictionaries: ['en', 'ar'].map(locale => ({ ...product.shared, ...product.copy[locale] })) } : null;
  sources.set(id, source);
  return source;
}

function cellText(value, dictionary) {
  if (Array.isArray(value)) return value.flatMap(item => cellText(item, dictionary));
  if (value && typeof value === 'object') return Object.values(value).flatMap(item => cellText(item, dictionary));
  if (value === undefined || value === null) return [];
  return [String(dictionary[value] ?? value)];
}

function selectedRows(source, image, anchor) {
  const { product, kind } = source;
  const rows = product.models ?? [];
  if (!image && !anchor) return rows;
  if (kind === 'products') {
    const configuration = product.media.find(item => item.src === image)?.configuration;
    const match = product.id === 'wet-alarm-check-valve' ? row => row.connection === configuration
      : product.id === 'water-curtain-nozzles' ? row => row.style === (configuration === 'pendent' ? 'pendent' : 'horizontal')
      : row => row.style === (configuration?.startsWith('impingement') ? 'impingement' : 'standard');
    return rows.filter(match);
  }
  if (product.id === 'diaphragm-deluge-valves') {
    const connection = Object.entries(product.media).find(([, value]) => value === image)?.[0];
    return rows.filter(row => cellText(row[0], source.dictionaries[0]).some(value => value.toLowerCase().startsWith(connection)));
  }
  if (product.id === 'preaction-valve-assemblies') {
    const grooved = productPhotoManifest.photos.find(p => p.routeId === product.routeId && p.sourceFile === 'preaction-grooved-assembly.jpg');
    const connection = image === product.media.flanged ? 'flanged' : image === grooved?.detail.path ? 'grooved' : null;
    return connection ? rows.filter(row => row[2] === connection) : rows;
  }
  const gallery = product.gallery?.find(item => product.media[item.media] === image || `configuration-${item.caption}` === anchor);
  if (!gallery) return rows;
  const key = gallery.caption;
  if (kind === 'documented-products') {
    if (rows.some(row => row.configuration || row.orientation)) return rows.filter(row => (row.configuration ?? row.orientation) === key);
    // These two inlet views share a model table without a configuration column.
    if (product.id === 'horizontal-handwheel-landing-valves') return rows.filter(row => /BS4504|JIS10K/i.test(row.inlet) === /flanged/i.test(key));
    return rows;
  }
  if (product.id === 'extended-coverage-quick-response-fire-sprinkler') {
    const configurations = { pendentSprinkler: 'pendentECQuickResponse', uprightSprinkler: 'uprightECQuickResponse', horizontalSidewallSprinkler: 'horizontalSidewallECQuickResponse' };
    return rows.filter(row => row[0].text === configurations[key]);
  }
  if (product.id === 'large-k-factor-esfr-sprinklers') {
    const configurations = { eSFRPendentSeries: 'eSFRPendent', eSFRUprightSeries: 'eSFRUpright', largeK202Pendent: 'standardResponseUprightPendent', largeK202HorizontalSidewall: 'standardResponseHorizontalSidewall', largeK202Upright: 'standardResponseUprightPendent' };
    return rows.filter(row => row[0] === configurations[key] && (key.startsWith('eSFR') || row[1] === 'k140K202'));
  }
  return rows;
}

// Build from the same values shown in the detail tables. Evidence, source paths,
// unused translation entries and quotation-only capabilities are never indexed.
export function productSearchTerms(routeId, { image, anchor, includeSupplements = true } = {}) {
  const id = routeId.replace('product:', '');
  const source = sourceFor(id);
  const terms = [...(aliases[id] ?? [])];
  // Shared facts may be indexed on the views they explicitly cover. New variant
  // facts remain on the series result, never on unrelated legacy photographs.
  if ((includeSupplements && !image && !anchor) || sharedViewSupplementIds.has(id)) terms.push(productSupplementSearchTerms(routeId));
  if (!source) return terms.join(' ');
  const { product, kind, dictionaries } = source;
  const scoped = Boolean(image || anchor);
  const rows = selectedRows(source, image, anchor);
  // Keep earlier appearance-based names searchable only for their own
  // configuration, without promoting a finish label to a material fact.
  for (const row of rows) terms.push(...(product.searchAliasesByConfiguration?.[row.configuration] ?? []));
  if (kind === 'products') {
    for (const dictionary of dictionaries) {
      for (const [key, fact] of Object.entries(product.facts)) {
        if (fact.status !== 'confirmed' || fact.value === null) continue;
        if (key === 'maximumWorkingPressureMpa') terms.push(`${fact.value} MPa / ${fact.value * 10} bar`);
        else if (dictionary[fact.value]) terms.push(dictionary[fact.value]);
      }
      for (const row of rows) {
        if (row.dn) terms.push(`DN${row.dn} / ${row.inch} in`);
        if (row.heightMm) terms.push(`${row.heightMm} mm`);
        for (const key of ['connection', 'style', 'configuration', 'discharge', 'strainer', 'design', 'factoryReference', 'size']) {
          if (row[key]) terms.push(...cellText(row[key], dictionary));
        }
      }
    }
  } else {
    for (const dictionary of dictionaries) {
      terms.push(...rows.flatMap(row => cellText(row, dictionary)));
      for (const row of product.specifications ?? []) {
        const label = Array.isArray(row) ? row[0] : row.label;
        if (!scoped || commonLabels.has(label)) terms.push(...cellText(Array.isArray(row) ? row.slice(1) : row.value, dictionary));
      }
      if (!scoped) terms.push(...cellText(product.chips ?? [], dictionary));
      // Older templates contain their specification cells directly in markup.
      if (!product.specifications && product.template && !scoped) {
        const template = fs.readFileSync(new URL(`../_includes/${product.template}`, import.meta.url), 'utf8');
        for (const match of template.matchAll(/<dd[^>]*>\s*\{\{\s*entry\.text\.([A-Za-z0-9_]+)\s*\}\}\s*<\/dd>/g)) terms.push(...cellText(match[1], dictionary));
      }
    }
  }
  return [...new Set(terms.filter(value => typeof value === 'string' && value.trim()))].join(' ');
}
