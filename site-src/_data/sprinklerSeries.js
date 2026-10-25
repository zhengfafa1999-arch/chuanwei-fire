import fs from 'node:fs';
import { productSearchTerms } from './productSearchData.js';
import { relatedSupplementConfigurations, supplementCatalog } from '../lib/product-supplements.js';
import { productPhotoManifest } from '../lib/product-photos.js';
import { concealedSeries } from '../lib/concealed-series.js';
import { largeKEsfrSeries } from '../lib/large-k-esfr-series.js';

const text = (en, ar, zh) => ({ en, ar, ...(zh ? { zh } : {}) });
const largeKProducts = new Map(largeKEsfrSeries.map(item => [item.routeId,
  JSON.parse(fs.readFileSync(new URL(`./documented-products/${item.productId}.json`, import.meta.url), 'utf8'))
]));
const photo = (routeId, sourceFile) => {
  const item = productPhotoManifest.photos.find(item => item.routeId === routeId && item.sourceFile === sourceFile);
  if (!item) throw new Error(`${routeId}: missing reviewed photograph ${sourceFile}`);
  return item;
};

// The order and the metric K designations follow the user's approved taxonomy.
// Ordinary K115 series use their own confirmed samples, independently of EC data.
const definitions = [
  { seriesId: 'k80-standard', routeId: 'product:standard-response-fire-sprinkler', name: text('K80 Standard Response Sprinklers', 'رشاشات K80 ذات الاستجابة القياسية', 'K80标准响应') },
  { seriesId: 'k80-quick', routeId: 'product:glass-bulb-fire-sprinkler', name: text('K80 Quick Response Sprinklers', 'رشاشات K80 سريعة الاستجابة', 'K80快速响应') },
  { seriesId: 'k115-quick', routeId: 'product:k115-quick-response-fire-sprinkler', name: text('K115 Quick Response Sprinklers', 'رشاشات K115 سريعة الاستجابة', 'K115快速响应') },
  { seriesId: 'k115-standard', routeId: 'product:k115-standard-response-fire-sprinkler', name: text('K115 Standard Response Sprinklers', 'رشاشات K115 ذات الاستجابة القياسية', 'K115标准响应') },
  ...concealedSeries.map(({ seriesId, routeId, name, image, imageCaption, supplementIds }) => ({
    seriesId, routeId, name, image, imageCaption, supplementIds, modelRowIndexes: [0]
  })),
  { seriesId: 'dry', routeId: 'product:dry-pendent-fire-sprinklers', name: text('Dry Fire Sprinklers', 'رشاشات الحريق الجافة', '干式') },
  largeKEsfrSeries.find(item => item.seriesId === 'large-k'),
  { seriesId: 'ec', routeId: 'product:extended-coverage-quick-response-fire-sprinkler', name: text('EC Extended Coverage Sprinklers', 'رشاشات EC ذات التغطية الموسعة', 'EC消防喷头') },
  largeKEsfrSeries.find(item => item.seriesId === 'esfr'),
  { seriesId: 'fusible-alloy', routeId: 'product:fusible-alloy-fire-sprinklers', name: text('Fusible-Alloy Sprinklers', 'رشاشات بعنصر قابل للانصهار', '易熔合金') },
  { seriesId: 'closed-rotating', routeId: 'product:closed-rotating-fire-sprinkler', name: text('Closed-Type Rotating Sprinklers', 'رشاشات دوارة مغلقة', '闭式旋转') },
  { seriesId: 'closed-centrifugal', routeId: 'product:closed-centrifugal-fire-sprinklers', name: text('Closed-Type Centrifugal Sprinklers', 'رشاشات مغلقة بالطرد المركزي', '闭式离心') },
  { seriesId: 'water-mist', routeId: 'product:water-mist-nozzles', name: text('Water Mist Nozzles', 'فوهات ضباب الماء', '水雾') },
  { seriesId: 'water-curtain', routeId: 'product:water-curtain-nozzles', name: text('Water Curtain Nozzles', 'فوهات الستارة المائية', '水幕') }
];

function relatedViews(product, name) {
  return (product.views || []).map(item => ({
    name: text(`${name.en} — ${item.name.en}`, `${name.ar} — ${item.name.ar}`),
    image: item.image,
    suffix: item.anchor ? `#${item.anchor}` : `?view=${encodeURIComponent(item.view ?? item.image)}#gallery`,
    searchTerms: [name.en, name.ar, name.zh, item.name.en, item.name.ar,
      productSearchTerms(product.routeId, { image: item.searchImage ?? item.view ?? item.image, anchor: item.anchor })].join(' ')
  }));
}

function relatedLargeKModels(series, indexes) {
  return indexes.map(index => {
    const row = largeKProducts.get(series.routeId).models[index];
    const factoryReference = row.factoryModel;
    if (!factoryReference) throw new Error(`Missing sprinkler model reference at row ${index}`);
    return {
      name: text(`${series.name.en} — ${factoryReference}`, `${series.name.ar} — ${factoryReference}`),
      anchor: 'models',
      // No exact row-specific photograph is claimed. The browser retains the
      // series photograph and its caption identifying the pictured sample.
      image: null,
      searchTerms: [series.name.en, series.name.ar, series.name.zh,
        productSearchTerms(series.routeId, { modelRowIndexes: [index], includeSupplements: false })].join(' ')
    };
  });
}

function quickSidewallOption(product, series) {
  const option = supplementCatalog['glass-bulb-fire-sprinkler'].find(item => item.id === 'quick-68');
  if (!option?.scope.en.includes('horizontal-sidewall')) throw new Error('Quick sidewall option requires its confirmed supplement');
  const sidewallPhoto = photo(product.routeId, 'DSC_5841.jpg');
  const name = text('K80 Quick Response — Horizontal Sidewall Option', 'خيار رشاش K80 سريع الاستجابة جداري أفقي');
  return {
    name, anchor: 'configuration-quick-68', image: sidewallPhoto.detail.path,
    imageCaption: text('Horizontal sidewall quick-response sprinkler — marked K-ZSTBS 80-68°C Q3A.', 'رشاش سريع الاستجابة جداري أفقي — يحمل العلامة K-ZSTBS 80-68°C Q3A.'),
    searchTerms: [name.en, name.ar, series.name.zh, '快速响应 水平侧喷', option.title.en, option.title.ar,
      ...option.rows.flatMap(row => typeof row.value === 'string' ? [row.value] : Object.values(row.value))].join(' ')
  };
}

export function sprinklerSeriesCards(family) {
  return definitions.map(definition => {
    const { sourceFile, modelRowIndexes, supplementIds, ...series } = definition;
    if (series.inquiry) return {
      ...series, routeId: null, image: null, imageLabel: 'K115', configurations: [], views: [], relatedConfigurations: [],
      description: text('Ask us to confirm the available models and matching specifications.', 'تواصل معنا لتأكيد الموديلات المتاحة والمواصفات المطابقة.'),
      searchTerms: Object.values(series.name).join(' ')
    };
    const product = family.products.find(item => item.routeId === series.routeId);
    if (!product) throw new Error(`Sprinkler series ${series.seriesId} has no registered product`);
    const scoped = Boolean(modelRowIndexes);
    const splitModelRows = largeKProducts.has(series.routeId);
    const sourcePhoto = sourceFile ? photo(series.routeId, sourceFile) : null;
    const supplements = relatedSupplementConfigurations(series.routeId)
      .filter(item => !supplementIds || supplementIds.some(id => item.anchor === `configuration-${id}`))
      .map(item => ({ ...item, searchTerms: [series.name.en, series.name.ar, series.name.zh, item.searchTerms].join(' ') }));
    // Model queries retain their configuration-level destination. This prevents
    // combining a size from one water-mist style with another style's model.
    const views = scoped ? [] : relatedViews(product, series.name);
    const models = splitModelRows ? relatedLargeKModels(series, modelRowIndexes) : [];
    const sidewall = series.seriesId === 'k80-quick' ? [quickSidewallOption(product, series)] : [];
    return {
      ...product, ...series,
      image: sourcePhoto ? sourcePhoto.detail.path : series.image ?? product.image,
      imageCaption: series.imageCaption ?? sourcePhoto?.caption,
      configurations: [], views: [], relatedConfigurations: [...views, ...models, ...sidewall, ...supplements],
      searchTerms: [series.name.zh, productSearchTerms(series.routeId, {
        includeSupplements: false,
        ...(splitModelRows ? { modelRowIndexes: [] } : scoped ? { modelRowIndexes } : views.length ? { modelRowIndexes: [] } : {})
      })].join(' ')
    };
  });
}

export default sprinklerSeriesCards;
