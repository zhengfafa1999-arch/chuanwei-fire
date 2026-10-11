import { resolveSiteRoute } from '../_data/siteRoutes.js';

const copy = {
  en: {
    title: 'Selected Project References',
    lead: 'Explore fire-water-system products for similar residential, industrial, healthcare and commercial applications.',
    action: 'Discuss your project requirements',
    relatedLabel: 'Products for similar applications',
    optionalLabel: 'Where specified by design',
    note: 'These product links are application references, not project supply lists. Final selection follows the project design.',
    names: ['Country Garden', 'Fujian Gulei Petrochemical Co., Ltd.', 'Sanming First Hospital', 'Wanda Plaza'],
    types: ['Residential', 'Industrial', 'Healthcare', 'Commercial'],
    descriptions: [
      'Explore sprinkler and hydrant-system components for shared areas, parking facilities and residential fire-water networks.',
      'Explore industrial fire-water networks and, where specified, water-spray or foam protection for process and storage areas.',
      'Explore sprinkler, waterflow monitoring and hydrant-system components for general hospital areas. Specialist medical areas require separate selection.',
      'Explore sprinkler and hydrant-system components for retail spaces, shared public areas and parking facilities.'
    ]
  },
  ar: {
    title: 'نماذج من المشاريع',
    lead: 'استعرض منتجات أنظمة مياه مكافحة الحريق لتطبيقات سكنية وصناعية وطبية وتجارية مماثلة.',
    action: 'ناقش متطلبات مشروعك',
    relatedLabel: 'منتجات لتطبيقات مماثلة',
    optionalLabel: 'عند النص عليها في التصميم',
    note: 'روابط المنتجات المعروضة مراجع للتطبيقات وليست قوائم توريد للمشاريع. يعتمد الاختيار النهائي على تصميم المشروع.',
    names: ['كانتري جاردن', 'شركة فوجيان غولي للبتروكيماويات', 'مستشفى سانمينغ الأول', 'واندا بلازا'],
    types: ['سكني', 'صناعي', 'طبي', 'تجاري'],
    descriptions: [
      'استعرض مكونات أنظمة الرشاشات وصنابير الحريق للمناطق المشتركة ومواقف السيارات وشبكات مياه الحريق السكنية.',
      'استعرض شبكات مياه الحريق الصناعية، والحماية برذاذ الماء أو الرغوة لمناطق العمليات والتخزين عندما ينص التصميم عليها.',
      'استعرض مكونات الرشاشات ومراقبة تدفق المياه وصنابير الحريق للمناطق العامة بالمستشفيات. تتطلب المناطق الطبية المتخصصة اختياراً منفصلاً.',
      'استعرض مكونات أنظمة الرشاشات وصنابير الحريق لمساحات التجزئة والمناطق العامة المشتركة ومواقف السيارات.'
    ]
  },
  zh: {
    title: '部分工程案例',
    lead: '浏览适用于同类住宅、工业、医疗与商业场景的消防水系统产品。',
    action: '沟通您的项目需求',
    relatedLabel: '同类项目相关产品',
    optionalLabel: '按设计要求选用',
    note: '这些产品链接用于同类应用参考，不代表项目实际供货清单；具体选型以项目设计为准。',
    names: ['碧桂园', '福建古雷石化有限公司', '三明市第一医院', '万达广场'],
    types: ['住宅项目', '工业项目', '医疗项目', '商业项目'],
    descriptions: [
      '浏览住宅公共区域、停车设施及消防供水网络涉及的喷淋与消火栓系统配套产品。',
      '浏览工业消防供水网络，以及工艺装置、储存区域按设计选用的水喷雾和泡沫保护配套产品。',
      '浏览医院一般区域涉及的喷淋、水流监测与消火栓系统配套产品；特殊医疗区域需单独选型。',
      '浏览零售空间、公共区域和停车设施涉及的喷淋与消火栓系统配套产品。'
    ]
  }
};

const products = {
  sprinklers: ['category:sprinklers', 'Fire sprinklers', 'رشاشات الحريق', '消防喷头'],
  wet: ['product:wet-alarm-check-valve', 'Wet alarm valves', 'صمامات الإنذار الرطبة', '湿式报警阀'],
  flow: ['product:saddle-type-waterflow-switches', 'Waterflow switches', 'مفاتيح تدفق المياه', '水流指示器'],
  indoor: ['category:indoor-hydrants', 'Indoor hydrants', 'محابس الحريق الداخلية', '室内消火栓'],
  outdoor: ['category:outdoor-hydrants', 'Outdoor hydrants', 'صنابير الحريق الخارجية', '室外消火栓'],
  inlet: ['category:fire-department-connections', 'Fire department connections', 'وصلات تزويد أنظمة الحريق', '水泵接合器'],
  butterfly: ['category:butterfly-valves', 'Fire butterfly valves', 'صمامات فراشة للحريق', '消防蝶阀'],
  gate: ['category:gate-valves', 'Fire gate valves', 'صمامات بوابة للحريق', '消防闸阀'],
  hoses: ['category:hoses-nozzles-couplings', 'Hose nozzles & couplings', 'فوهات الخراطيم والوصلات', '水枪及接口'],
  concealed: ['product:concealed-pendent-fire-sprinkler', 'Concealed sprinklers', 'رشاشات مخفية', '隐蔽式喷头'],
  quick: ['product:glass-bulb-fire-sprinkler', 'Quick-response sprinklers', 'رشاشات سريعة الاستجابة', '快速响应喷头'],
  deluge: ['product:diaphragm-deluge-valves', 'Deluge valves', 'صمامات الغمر', '雨淋阀'],
  spray: ['product:water-mist-nozzles', 'Water mist / spray nozzles', 'فوهات ضباب ورذاذ الماء', '水雾／水喷雾喷头'],
  foam: ['category:foam-nozzles', 'Foam / water nozzles', 'فوهات الرغوة والماء', '水／泡沫喷头']
};

const photos = [
  { id: 'country-garden', width: 278, height: 185, related: ['sprinklers', 'wet', 'indoor', 'inlet'], optional: ['concealed'] },
  { id: 'gulei-petrochemical', width: 300, height: 180, related: ['outdoor', 'butterfly', 'gate', 'hoses'], optional: ['deluge', 'spray', 'foam'] },
  { id: 'sanming-first-hospital', width: 302, height: 180, related: ['sprinklers', 'wet', 'flow', 'indoor'], optional: ['quick', 'concealed'] },
  { id: 'wanda-plaza', width: 383, height: 181, related: ['sprinklers', 'wet', 'flow', 'indoor'], optional: ['concealed'] }
];

export function projectReferences(locale, assetPrefix, outputPath) {
  const language = copy[locale] ?? copy.en;
  const link = (id) => {
    const [routeId, en, ar, zh] = products[id];
    return { id, routeId, name: locale === 'ar' ? ar : locale === 'zh' ? zh : en, href: resolveSiteRoute(routeId, locale === 'ar' ? 'ar' : 'en', outputPath).href };
  };
  return {
    title: language.title,
    lead: language.lead,
    action: language.action,
    relatedLabel: language.relatedLabel,
    optionalLabel: language.optionalLabel,
    note: language.note,
    items: photos.map((photo, index) => ({
      ...photo,
      name: language.names[index],
      type: language.types[index],
      description: language.descriptions[index],
      related: photo.related.map(link),
      optional: photo.optional.map(link),
      image: `${assetPrefix}assets/projects/${photo.id}-reference-20261010.png`
    }))
  };
}
