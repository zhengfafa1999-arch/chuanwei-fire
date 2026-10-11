import { resolveSiteRoute } from '../_data/siteRoutes.js';
import { PRODUCT_FAMILIES } from '../_data/productDirectory.js';

const text = {
  en: {
    heroLead: 'Fire-water-system products for distributors, trading companies and private-label buyers. Explore our product range, working environment and OEM options.',
    introTitle: 'Fire protection products, from selection to order preparation.',
    intro: ["Based in Nan'an, Quanzhou, Fujian, China, we manufacture and supply sprinklers, valves, hose reels and hydrant-system components for distributors, trading companies and private-label buyers.", 'Our production facilities were established in 2017 and cover 5,000 m², with CNC equipment for component machining.'],
    productsTitle: 'Our product range', productsLead: 'Browse the family you need to compare models, connections and specifications.',
    galleryTitle: 'Inside our facilities', galleryLead: 'Product showrooms, office, production workshops and storage areas.',
    groups: ['Product showrooms', 'Office', 'Production workshops', 'Warehouses'],
    groupDescriptions: ['Hydrants, valves, sprinklers and hose-reel samples on display.', 'Office space for day-to-day product and order coordination.', 'Workshop views showing components, work areas and products in production.', 'Storage areas showing wooden crates and wrapped products. Packing is selected by product and order.'],
    captions: ['Hydrant and valve display', 'Sprinkler, valve and hose-reel display', 'Office working area', 'Wooden-crate storage area', 'Production workshop overview', 'Component processing area', 'Workshop with products in production', 'Wrapped-product storage area'],
    openPhoto: 'Open full photograph',
    capabilitiesTitle: 'Manufacturing and order preparation', capabilitiesLead: 'Machining, batch production and storage support the selected product configuration.',
    oemTitle: 'OEM options for your product range', oemBody: 'Discuss product markings, nameplates, packaging labels, finishes and accessory combinations. For thread, flange or grooved connections, send a drawing, sample or technical schedule so we can check the required fit.',
    workflowTitle: 'Working with us', workflowLead: 'Start with the product you need. Specifications, sample arrangements and order terms are agreed for each enquiry.',
    workflow: [['Send your requirements', 'Share the product, model or photo. Add size, connection, quantity and destination when available.'], ['Compare options and quotation', 'Review the required configuration, available documents, price and any sample arrangements. Samples are supplied for a fee.'], ['Confirm the order', 'Agree the specification, quantity, marking, packaging and delivery schedule before production.'], ['Production and shipment', 'Production and packing follow the agreed order. Shipment details are coordinated with the buyer.']],
    inquiryTitle: 'Tell us which products you need', inquiryBody: 'Send a product name, model, photo or drawing to start the conversation.', whatsappLabel: 'Discuss on WhatsApp', emailLabel: 'Open email draft', inquiryNote: 'Review and send your message in WhatsApp or your email app.',
    certificateNote: 'View our management-system certificates and Chinese patent certificate scans. Product approvals and document applicability are reviewed by model and destination market.', downloadCta: 'View certificates and documents'
  },
  ar: {
    heroLead: 'منتجات أنظمة مياه مكافحة الحريق للموزعين والشركات التجارية وعملاء العلامة الخاصة. استعرض المنتجات وبيئة العمل وخيارات OEM.',
    introTitle: 'منتجات مكافحة الحريق، من الاختيار إلى تجهيز الطلب.',
    intro: ['نعمل من نانآن، تشيوانتشو، فوجيان في الصين، ونصنّع ونورّد الرشاشات والصمامات وبكرات الخراطيم ومكونات أنظمة صنابير الحريق للموزعين والشركات التجارية وعملاء العلامة الخاصة.', 'أُنشئت مرافق الإنتاج في 2017 وتبلغ مساحتها 5,000 m²، مع معدات CNC لتشغيل المكونات.'],
    productsTitle: 'مجموعة منتجاتنا', productsLead: 'استعرض الفئة المطلوبة لمقارنة الموديلات والتوصيلات والمواصفات.',
    galleryTitle: 'داخل مرافقنا', galleryLead: 'معارض المنتجات والمكتب وورش الإنتاج ومناطق التخزين.',
    groups: ['معارض المنتجات', 'المكتب', 'ورش الإنتاج', 'المستودعات'],
    groupDescriptions: ['نماذج معروضة من صنابير الحريق والصمامات والرشاشات وبكرات الخراطيم.', 'مساحة المكتب لتنسيق المنتجات والطلبات اليومية.', 'صور للورش تُظهر المكونات ومناطق العمل والمنتجات أثناء الإنتاج.', 'مناطق تخزين الصناديق الخشبية والمنتجات المغلفة. تُحدد العبوة حسب المنتج والطلب.'],
    captions: ['عرض صنابير الحريق والصمامات', 'عرض الرشاشات والصمامات وبكرات الخراطيم', 'مساحة العمل بالمكتب', 'منطقة تخزين الصناديق الخشبية', 'منظر عام لورشة الإنتاج', 'منطقة تشغيل المكونات', 'ورشة ومنتجات أثناء الإنتاج', 'منطقة تخزين المنتجات المغلفة'],
    openPhoto: 'فتح الصورة كاملة',
    capabilitiesTitle: 'التصنيع وتجهيز الطلبات', capabilitiesLead: 'يدعم التشغيل والإنتاج المجمع والتخزين تكوين المنتج المطلوب.',
    oemTitle: 'خيارات OEM لمجموعة منتجاتك', oemBody: 'ناقش وسم المنتجات ولوحات البيانات وملصقات العبوات والتشطيبات وتركيبات الملحقات. أرسل رسماً أو عينة أو جدولاً فنياً لمراجعة متطلبات اللولب أو الفلنجة أو الطرف المحزّز والتوافق المطلوب.',
    workflowTitle: 'خطوات التعاون معنا', workflowLead: 'ابدأ بالمنتج المطلوب. تُتفق المواصفات وترتيبات العينات وشروط الطلب لكل استفسار.',
    workflow: [['أرسل المتطلبات', 'شارك اسم المنتج أو الموديل أو صورة. أضف المقاس والتوصيل والكمية والوجهة عند توفرها.'], ['راجع الخيارات وعرض السعر', 'راجع التكوين المطلوب والوثائق المتاحة والسعر وترتيبات العينات. العينات مدفوعة.'], ['أكد الطلب', 'اتفق على المواصفات والكمية والوسم والتعبئة وجدول التسليم قبل الإنتاج.'], ['الإنتاج والشحن', 'يُنفذ الإنتاج والتعبئة وفق الطلب المتفق عليه، وتُنسق تفاصيل الشحن مع المشتري.']],
    inquiryTitle: 'أخبرنا بالمنتجات المطلوبة', inquiryBody: 'أرسل اسم المنتج أو الموديل أو صورة أو رسماً لبدء التواصل.', whatsappLabel: 'ناقش عبر WhatsApp', emailLabel: 'فتح مسودة بريد إلكتروني', inquiryNote: 'راجع الرسالة وأرسلها في WhatsApp أو تطبيق البريد.',
    certificateNote: 'استعرض شهادات أنظمة الإدارة وصور شهادات براءات الاختراع الصينية. تُراجع اعتمادات المنتجات وانطباق الوثائق حسب الموديل والسوق المستهدف.', downloadCta: 'عرض الشهادات والوثائق'
  }
};

const photos = ['showroom-hydrants', 'showroom-range', 'office', 'warehouse-crates', 'workshop-overview', 'workshop-components', 'workshop-production', 'warehouse-products'];
const groups = [[0, 1], [2], [4, 5, 6], [3, 7]];

export function aboutContent(locale, route) {
  const copy = text[locale];
  const photo = index => ({id: photos[index], caption: copy.captions[index], image: `${route.assetPrefix}assets/about/facilities-20261010/${photos[index]}-640.webp`, full: `${route.assetPrefix}assets/about/facilities-20261010/${photos[index]}-1600.webp`});
  const body = locale === 'ar' ? 'مرحباً، أود الاستفسار عن منتجات مكافحة الحريق.\nالمنتج / الموديل:\nالكمية:\nالوجهة:' : 'Hello, I would like to enquire about your fire protection products.\nProduct / model:\nQuantity:\nDestination:';
  return {
    copy,
    families: PRODUCT_FAMILIES.map(family => ({ id: family.routeId, name: family.name[locale], href: resolveSiteRoute(family.routeId, locale, route.outputPath).href })),
    groups: groups.map((indices, index) => ({title: copy.groups[index], description: copy.groupDescriptions[index], photos: indices.map(photo)})),
    whatsappHref: `https://wa.me/8617326528368?text=${encodeURIComponent(body)}`,
    emailHref: `mailto:zhengcolin1@gmail.com?subject=${encodeURIComponent(locale === 'ar' ? 'استفسار عن منتجات مكافحة الحريق' : 'Fire protection product enquiry')}&body=${encodeURIComponent(body)}`
  };
}
