import fs from 'node:fs';
import { reviewedPhotoPath } from '../lib/reviewed-product-media.js';
import { productViews } from './productViews.js';
import { catalogExpansionByRoute, catalogExpansionListings } from './catalogExpansion.js';
import { productSearchTerms } from './productSearchData.js';
import { relatedSupplementConfigurations } from '../lib/product-supplements.js';
import { websiteBatchFamilies, websiteBatchListings } from './websiteCatalogBatch.js';

export const DIRECTORY_COPY = {
  en: {
    lang: "en", dir: "ltr", locale: "en_US",
    brandTagline: "Fire protection equipment manufacturing and supply",
    home: "Home", products: "Products", about: "About", downloads: "Downloads", contact: "Contact", english: "English", arabic: "العربية",
    directoryEyebrow: "Product directory",
    directoryTitle: "Find your fire protection product.",
    directoryLead: "Browse product details, filter by category, or search by name, model, nominal size or connection.",
    directoryNote: "Select a product to view its models, specifications and available configurations.",
    browseCategory: "Browse category",
    categoryEyebrow: "Product family",
    availableProducts: "Available product types",
    categoryNote: "Use these pages to identify the required product type. Final dimensions, pressure ratings, materials, connection standards and approvals are confirmed before quotation.",
    localizedDetails: "View product details",
    englishDetails: "View English technical page",
    requestDetails: "Request product details",
    selectionEyebrow: "Product selection",
    selectionTitle: "Details that help us prepare your quotation",
    selectionLead: "Start with your name or company and the product you need. Add the details below when available. For market-specific connections, a drawing or mating sample helps us check compatibility.",
    selectionItems: ["Nominal size and connection", "Working pressure and medium", "Quantity and destination", "Drawing, sample or required standard"],
    inquiryTitle: "Send your product requirement",
    inquiryBody: "Tell us your name or company and the product you need. You can add the model, size, quantity and destination later.",
    whatsapp: "Discuss on WhatsApp",
    emailDraft: "Open email draft",
    inquiryNote: "Review and send the draft in WhatsApp or your email app. You can attach photos and drawings there. If the app does not open, use our contact page.",
    contactDetails: "Contact details",
    backToDirectory: "Back to product directory",
    fallbackBadge: "English page",
    localizedBadge: "Localized page",
    inquiryBadge: "Inquiry"
  },
  ar: {
    lang: "ar", dir: "rtl", locale: "ar_AR",
    brandTagline: "تصنيع وتوريد معدات مكافحة الحريق",
    home: "الرئيسية", products: "المنتجات", about: "عن الشركة", downloads: "الملفات", contact: "تواصل معنا", english: "English", arabic: "العربية",
    directoryEyebrow: "دليل المنتجات",
    directoryTitle: "اعثر على منتج مكافحة الحريق المطلوب.",
    directoryLead: "تصفح تفاصيل المنتجات واختر الفئة أو ابحث بالاسم أو الموديل أو المقاس الاسمي أو نوع التوصيل.",
    directoryNote: "اختر منتجاً للاطلاع على الموديلات والمواصفات والتكوينات المتاحة.",
    browseCategory: "عرض الفئة",
    categoryEyebrow: "فئة المنتج",
    availableProducts: "أنواع المنتجات المتاحة",
    categoryNote: "استخدم هذه الصفحات لتحديد نوع المنتج المطلوب. تُؤكد الأبعاد النهائية وضغط التشغيل والمواد ومعايير التوصيل والاعتمادات قبل عرض السعر.",
    localizedDetails: "عرض تفاصيل المنتج",
    englishDetails: "عرض الصفحة الفنية بالإنجليزية",
    requestDetails: "اطلب تفاصيل المنتج",
    selectionEyebrow: "اختيار المنتج",
    selectionTitle: "بيانات تساعدنا على إعداد عرض السعر",
    selectionLead: "ابدأ باسمك أو شركتك والمنتج المطلوب. أضف البيانات أدناه عند توفرها. يساعد الرسم أو العينة المطابقة على مراجعة توافق التوصيلات الخاصة بالسوق.",
    selectionItems: ["المقاس الاسمي ونوع التوصيل", "ضغط التشغيل والوسط", "الكمية وبلد الوجهة", "الرسم أو العينة أو المعيار المطلوب"],
    inquiryTitle: "أرسل متطلبات المنتج",
    inquiryBody: "أرسل اسمك أو شركتك والمنتج المطلوب. يمكنك إضافة الموديل والمقاس والكمية والوجهة لاحقاً.",
    whatsapp: "تواصل عبر WhatsApp",
    emailDraft: "فتح مسودة بريد إلكتروني",
    inquiryNote: "راجع المسودة وأرسلها في WhatsApp أو تطبيق البريد. يمكنك إرفاق الصور والرسومات هناك. إذا لم يفتح التطبيق، استخدم صفحة التواصل.",
    contactDetails: "بيانات التواصل",
    backToDirectory: "العودة إلى دليل المنتجات",
    fallbackBadge: "صفحة إنجليزية",
    localizedBadge: "صفحة مترجمة",
    inquiryBadge: "استفسار"
  }
};

const text = (en, ar, zh) => ({ en, ar, ...(zh ? { zh } : {}) });

export const PRODUCT_FAMILIES = [
  {
    id: "sprinklers", routeId: "category:sprinklers",
    name: text("Fire Sprinklers", "رشاشات الحريق", "消防喷头"),
    description: text("Standard, quick-response, concealed, dry and special-purpose sprinkler and open-nozzle families.", "رشاشات قياسية وسريعة الاستجابة ومخفية وجافة، إضافة إلى فئات الرشاشات والفوهات المفتوحة للأغراض الخاصة.", "标准、快速响应、隐蔽式、干式及特殊用途消防喷头和开式喷头系列。"),
    image: "products/消防喷头/categories/standard-response-upright.jpg",
    products: [
      ["product:standard-response-fire-sprinkler", "Standard Response Fire Sprinklers", "رشاشات الحريق ذات الاستجابة القياسية", "products/消防喷头/standard-response-sprinkler/standard-response-three-styles.jpg"],
      ["product:fusible-alloy-fire-sprinklers", "Fusible-Alloy Fire Sprinklers", "رشاشات حريق بعنصر حراري قابل للانصهار", "products/消防喷头/fusible-alloy-fire-sprinklers/fusible-alloy-configuration-a.jpg"],
      ["product:glass-bulb-fire-sprinkler", "Quick Response Glass Bulb Sprinklers", "رشاشات زجاجية سريعة الاستجابة", "products/消防喷头/glass-bulb-sprinkler/quick-response-pendent.jpg"],
      ["product:extended-coverage-quick-response-fire-sprinkler", "Extended Coverage Quick Response Sprinklers", "رشاشات سريعة الاستجابة ذات تغطية موسعة", "products/消防喷头/categories/extended-coverage-quick-response.jpg"],
      ["product:concealed-pendent-fire-sprinkler", "Concealed Sprinklers — Standard / Quick Response, K80 / K115", "رشاشات مخفية — استجابة قياسية / سريعة، K80 / K115", "assets/products/concealed-listing-red-label/listing-1600.webp"],
      ["product:large-k-factor-esfr-sprinklers", "Large K-Factor & ESFR Sprinklers", "رشاشات بمعامل K كبير وESFR", "products/消防喷头/categories/large-k-esfr-sprinkler.jpg"],
      ["product:dry-pendent-fire-sprinklers", "Dry Pendent Fire Sprinklers", "رشاشات حريق جافة معلقة", "products/消防喷头/categories/dry-sprinkler.jpg"],
      ["product:water-mist-nozzles", "Water Mist Nozzles", "فوهات ضباب الماء", "products/消防喷头/water-mist-nozzles/standard-water-mist-nozzle-view-1.jpg"],
      ["product:closed-rotating-fire-sprinkler", "Closed-Type Rotating Fire Sprinkler", "رشاش حريق دوار مغلق", "assets/products/special-sprinklers/closed-rotating-fire-sprinkler-1-1600.webp"],
      ["product:closed-centrifugal-fire-sprinklers", "Closed-Type Centrifugal Fire Sprinklers", "رشاشات حريق مغلقة بالطرد المركزي", "assets/products/special-sprinklers/closed-centrifugal-fire-sprinklers-2-1600.webp"],
      ["product:water-curtain-nozzles", "Water Curtain Nozzles", "فوهات الستارة المائية", "products/消防喷头/water-curtain-nozzles/horizontal-single-slot-water-curtain-nozzle.jpg"],
      ["product:sprinkler-escutcheons-decorative-covers", "Fire Sprinkler Accessories", "ملحقات رشاشات الحريق", "assets/products/sprinkler-trim/double-layer-escutcheon-white-1254.webp"]
    ]
  },
  {
    id: "foam-nozzles", routeId: "category:foam-nozzles",
    name: text("Foam-Water Nozzles", "فوهات الماء والرغوة", "泡沫喷头"),
    description: text("Tubular foam-water nozzles and closed-type air-aspirating sprinklers. Match the nozzle, foam concentrate and system requirements before ordering.", "فوهات أنبوبية للماء والرغوة ورشاشات مغلقة تسحب الهواء. طابق الفوهة ومركز الرغوة ومتطلبات النظام قبل الطلب.", "筒式水／泡沫两用喷头及闭式吸气型泡沫水喷头，按喷头、泡沫液和系统要求核对选型。"),
    image: "assets/products/special-sprinklers/tubular-foam-water-nozzles-3-1600.webp",
    products: [
      ["product:tubular-foam-water-nozzles", "Tubular Foam-Water Nozzles", "فوهات أنبوبية للماء والرغوة", "assets/products/special-sprinklers/tubular-foam-water-nozzles-3-1600.webp"],
      ["product:closed-air-aspirating-foam-water-sprinkler", "Closed-Type Air-Aspirating Foam-Water Sprinkler", "رشاش ماء ورغوة مغلق يسحب الهواء", "assets/products/special-sprinklers/closed-air-aspirating-foam-water-sprinkler-5-1600.webp"],
    ]
  },
  {
    id: "system-valves", routeId: "category:system-valves",
    name: text("Alarm & System Valves", "صمامات الإنذار وصمامات الأنظمة", "报警阀及系统阀门"),
    description: text("Alarm and system valve assemblies, waterflow switches, pressure switches and solenoid valves.", "مجموعات صمامات الإنذار والأنظمة ومفاتيح تدفق المياه ومفاتيح الضغط والصمامات الكهرومغناطيسية.", "报警阀及系统阀组、水流指示器、压力开关和电磁阀。"),
    image: "products/消防阀/消防阀主图.jpg",
    products: [
      ["product:wet-alarm-check-valve", "Wet Alarm Check Valve Assemblies", "مجموعات صمام الإنذار الرطب", "products/消防阀/wet-alarm-check-valve-assemblies/dn150-flanged-wet-alarm-assembly-en.jpg"],
      ["product:diaphragm-deluge-valves", "Diaphragm Deluge Valves", "صمامات غمر غشائية", "products/消防阀/diaphragm-deluge-valves/deluge-valve-flanged.jpg"],
      ["product:preaction-valve-assemblies", "Preaction Valve Assemblies", "مجموعات صمامات الإجراء المسبق", "products/消防阀/preaction-valve-assembly.jpg"],
      ["product:dry-pipe-alarm-valves", "Dry Pipe Alarm Valves", "صمامات إنذار الأنابيب الجافة", "products/消防阀/dry-pipe-alarm-valves/dry-pipe-alarm-valve-flanged.jpg"],
      ["product:saddle-type-waterflow-switches", "Saddle-Type Waterflow Switches", "مفاتيح تدفق المياه من النوع السرجي", "products/消防阀/saddle-type-waterflow-switches/zsjz-dn100-reference.png"],
      ["product:explosion-proof-waterflow-switches", "Explosion-Proof Waterflow Switches", "مفاتيح تدفق المياه المقاومة للانفجار", "assets/products/explosion-proof-waterflow-switches/dn100-sample-1600.webp"],
      ["product:fire-pressure-switch", "Fire Pressure Switch", "مفتاح ضغط لنظام مكافحة الحريق", "assets/products/fire-pressure-switch/sample-1052.webp"],
      ["product:explosion-proof-pressure-switch", "Explosion-Proof Pressure Switch", "مفتاح ضغط مقاوم للانفجار", "assets/products/explosion-proof-pressure-switch/sample-1600.webp"],
      ["product:explosion-proof-solenoid-valve", "Explosion-Proof Solenoid Valve", "صمام كهرومغناطيسي مقاوم للانفجار", "assets/products/explosion-proof-solenoid-valve/sample-1600.webp"]
    ]
  },
  {
    id: "butterfly-valves", routeId: "category:butterfly-valves",
    name: text("Fire Butterfly Valves", "صمامات فراشة لمكافحة الحريق", "消防蝶阀"),
    description: text("Lever-operated and supervisory butterfly valve families with grooved or wafer connections.", "فئات صمامات الفراشة اليدوية والمراقبة بتوصيلات محززة أو رقاقة.", "提供沟槽式或对夹式连接的手柄蝶阀和信号蝶阀系列。"),
    image: "products/消防阀门/DSC_5671.jpg",
    products: [
      ["product:lever-operated-grooved-butterfly-valves", "Lever-Operated Grooved Butterfly Valves", "صمامات فراشة محززة يدوية", "products/消防蝶阀/lever-operated-grooved-butterfly-valves/lever-operated-grooved-butterfly-valve.jpg"],
      ["product:lever-operated-wafer-butterfly-valves", "Lever-Operated Wafer Butterfly Valves", "صمامات فراشة رقاقة يدوية", "products/消防蝶阀/lever-operated-wafer-butterfly-valves/lever-operated-wafer-butterfly-valve.jpg"],
      ["product:grooved-supervisory-butterfly-valves", "Grooved Supervisory Butterfly Valves", "صمامات فراشة محززة بإشارة مراقبة", "products/消防蝶阀/grooved-supervisory-butterfly-valves/grooved-supervisory-butterfly-valve.jpg"],
      ["product:wafer-supervisory-butterfly-valves", "Wafer Supervisory Butterfly Valves", "صمامات فراشة رقاقة بإشارة مراقبة", "products/消防蝶阀/wafer-supervisory-butterfly-valves/wafer-supervisory-butterfly-valve.jpg"]
    ]
  },
  {
    id: "gate-valves", routeId: "category:gate-valves",
    name: text("Fire Gate Valves", "صمامات بوابة لمكافحة الحريق", "消防闸阀"),
    description: text("Supervisory, non-rising-stem and OS&Y gate valve families for fire-water networks.", "فئات صمامات البوابة المراقبة وذات الساق غير الصاعد وOS&Y لشبكات مياه مكافحة الحريق.", "消防给水管网使用的信号闸阀、暗杆闸阀和明杆闸阀系列。"),
    image: "products/消防阀门/消防阀门主图.jpg",
    products: [
      ["product:flanged-supervisory-gate-valves", "Flanged Supervisory Gate Valves", "صمامات بوابة فلنجية بإشارة مراقبة", "products/消防阀门/flanged-supervisory-gate-valves/flanged-supervisory-gate-valve.jpg"],
      ["product:grooved-supervisory-gate-valves", "Grooved Supervisory Gate Valves", "صمامات بوابة محززة بإشارة مراقبة", "products/消防阀门/grooved-supervisory-gate-valves/grooved-supervisory-gate-valve.jpg"],
      ["product:nrs-gate-valves", "NRS Gate Valves", "صمامات بوابة بساق غير صاعد", "products/消防阀门/nrs-gate-valves/nrs-gate-valve.jpg"],
      ["product:grooved-osy-gate-valves", "Grooved OS&Y Gate Valves", "صمامات بوابة محززة OS&Y", "products/消防阀门/grooved-osy-gate-valves/grooved-osy-dn150.jpg"],
      ["product:osy-gate-valves", "OS&Y Gate Valves", "صمامات بوابة OS&Y", "products/消防阀门/osy-gate-valves/osy-gate-valve.jpg"]
    ]
  },
  {
    id: "hose-reels", routeId: "category:hose-reels",
    name: text("Fire Hose Reels", "بكرات خراطيم الحريق", "消防软管卷盘"),
    description: text("Wall-mounted hose reel families with straight-stream, jet/spray and heavy-duty configurations.", "فئات بكرات خراطيم مثبتة على الحائط بتكوينات تدفق مباشر ونفاث/رذاذ وخدمة شاقة.", "壁挂式消防软管卷盘，提供直流、直流/喷雾和重型配置。"),
    image: "products/软管卷盘/ria25-fire-hose-reel/ria25-fire-hose-reel.jpg",
    products: [
      ["product:ria25-fire-hose-reel", "RIA 25 Fire Hose Reel", "بكرة خرطوم حريق RIA 25", "products/软管卷盘/ria25-fire-hose-reel/ria25-fire-hose-reel.jpg"],
      ["product:straight-stream-fire-hose-reel", "Straight-Stream Fire Hose Reel", "بكرة خرطوم حريق بتدفق مباشر", "products/软管卷盘/straight-stream-fire-hose-reel/straight-stream-fire-hose-reel.jpg"],
      ["product:jet-spray-fire-hose-reel", "Jet/Spray Fire Hose Reel", "بكرة خرطوم حريق نفاث/رذاذ", "products/软管卷盘/jet-spray-fire-hose-reel/jet-spray-fire-hose-reel.jpg"],
      ["product:heavy-duty-fire-hose-reel", "Heavy-Duty Fire Hose Reel", "بكرة خرطوم حريق للخدمة الشاقة", "products/软管卷盘/heavy-duty-fire-hose-reel/heavy-duty-reel.jpg"],
      ...catalogExpansionListings("hose-reels")
    ]
  },
  {
    id: "hoses-nozzles-couplings", routeId: "category:hoses-nozzles-couplings",
    name: text("Fire Hose Nozzles, Couplings & Adapters", "فوهات خراطيم الحريق والوصلات والمهايئات", "消防水枪、接口及转接件"),
    description: text("Fire hose nozzles, couplings, adapters and related components supplied for individual quotation.", "فوهات خراطيم الحريق والوصلات والمهايئات والمكونات المرتبطة بها متاحة لطلب عروض أسعار منفصلة.", "消防水枪、接口、转接件及相关组件，可按单品询价。"),
    image: "products/消防水枪/消防水枪主图.jpg",
    products: [
      ...websiteBatchListings("hoses-nozzles-couplings"),
      ["product:combination-jet-fog-nozzles", "Combination Jet/Fog Nozzles", "فوهات نفاثة/ضبابية مركبة", "products/消防水枪/categories/combination-jet-fog-nozzle.jpg"],
      ["product:kd-hose-couplings", "KD Hose Couplings", "وصلات خراطيم KD", "products/消防水枪/categories/kd-hose-coupling.jpg"],
      ["product:kn-threaded-adapters", "KN Threaded Adapters", "محولات لولبية KN", "products/消防水枪/categories/kn-threaded-adapter.jpg"],
      ["product:straight-stream-fire-hose-nozzles", "Straight-Stream Fire Hose Nozzles", "فوهات خراطيم حريق ذات نفث مستقيم", "products/消防水枪/straight-stream-fire-hose-nozzles/qz-catalog-display.png"],
      ["product:lever-operated-fire-hose-nozzles", "Lever-Operated Fire Hose Nozzles", "فوهات خراطيم حريق تعمل بذراع", "products/消防水枪/lever-operated-fire-hose-nozzles/configuration-a-catalog-display.png"],
      ...catalogExpansionListings("hoses-nozzles-couplings")
    ]
  },
  {
    id: "indoor-hydrants", routeId: "category:indoor-hydrants",
    name: text("Indoor Fire Hydrants", "محابس الحريق الداخلية", "室内消火栓"),
    description: text("Indoor fire-water outlet valves in standard, slanted, double-outlet and pressure-regulating configurations.", "محابس مخارج مياه الحريق الداخلية بتكوينات قياسية ومائلة ومزدوجة المخرج ومنظمة للضغط.", "标准、斜式、双出口和减压稳压配置的室内消火栓。"),
    image: "products/室内消防栓/export-slanted-hydrant-valve/export-slanted-front.jpg",
    products: [
      ["product:export-slanted-hydrant-valve", "Export Slanted Hydrant Valves", "محابس حريق مائلة للتصدير", "products/室内消防栓/export-slanted-hydrant-valve/export-slanted-front.jpg"],
      ["product:straight-through-oblique-landing-valves", "Straight-Through and Oblique Landing Valves", "صمامات هبوط مستقيمة ومائلة", "products/室内消防栓/straight-through-oblique-landing-valves/straight-through-catalog-display.jpeg"],
      ["product:horizontal-handwheel-landing-valves", "Horizontal-Handwheel Landing Valves", "صمامات هبوط بعجلة تشغيل أفقية", "products/室内消防栓/horizontal-handwheel-landing-valves/threaded-inlet-catalog-display.jpeg"],
      ...catalogExpansionListings("indoor-hydrants")
    ]
  },
  {
    id: "outdoor-hydrants", routeId: "category:outdoor-hydrants",
    name: text("Outdoor Fire Hydrants", "صنابير الحريق الخارجية", "室外消火栓"),
    description: text("Above-ground hydrant configurations organized by destination-market pattern.", "تكوينات صنابير حريق فوق سطح الأرض مرتبة حسب نمط السوق المستهدف.", "按目标市场型式分类的地上式室外消火栓。"),
    image: "products/室外消防栓/bs750-pillar-hydrant/bs750-front.jpg",
    products: [
      ["product:bs750-pillar-hydrant", "BS 750 Pattern Pillar Hydrants", "صنابير عمودية بنمط BS 750", "products/室外消防栓/bs750-pillar-hydrant/bs750-front.jpg"],
      ["product:french-pattern-hydrant", "French-Pattern Hydrants", "صنابير حريق بالنمط الفرنسي", "products/室外消防栓/global-series/french-dry-barrel-hydrant.jpg"],
      ["product:indonesian-pattern-hydrant", "Indonesian-Pattern Hydrants", "صنابير حريق بالنمط الإندونيسي", "products/室外消防栓/global-series/indonesia-wet-barrel-hydrant.jpg"],
      ["product:russian-pattern-hydrant", "Russian-Pattern Hydrants", "صنابير حريق بالنمط الروسي", "products/室外消防栓/global-series/russian-pattern-hydrant.jpg"],
      ...catalogExpansionListings("outdoor-hydrants")
    ]
  },
  {
    id: "fire-department-connections", routeId: "category:fire-department-connections",
    name: text("Fire Department Connections", "وصلات تزويد أنظمة الحريق بالمياه", "消防水泵接合器"),
    description: text("Fire-service water inlet assemblies organized by installation arrangement and system-side connection.", "مجموعات إدخال مياه خدمة الإطفاء مرتبة حسب طريقة التركيب والتوصيل من جهة النظام.", "按安装方式和系统侧连接分类的消防水泵接合器。"),
    image: "products/消防水泵接合器/russian-pattern-fire-department-connection/65-16k-65-front.png",
    products: [
      ["product:russian-pattern-fire-department-connection", "Russian-Pattern Fire Department Connection", "وصلة تغذية حريق بالنمط الروسي", "products/消防水泵接合器/russian-pattern-fire-department-connection/65-16k-65-front.png"],
      ...catalogExpansionListings("fire-department-connections")
    ]
  },
  {
    id: "fire-equipment-cabinets", routeId: "category:fire-equipment-cabinets",
    name: text("Fire Equipment Cabinets", "خزائن معدات مكافحة الحريق", "消防器材箱"),
    description: text("Solid-door and windowed fire equipment cabinets with selectable standard dimensions and order-specific construction.", "خزائن معدات مكافحة الحريق بأبواب مصمتة أو مزودة بنوافذ، مع أبعاد قياسية مختارة وتصنيع حسب متطلبات الطلب.", "实门及玻璃门消防器材箱，提供常规尺寸，也可按订单要求定制结构。"),
    image: "products/消防器材箱/fire-equipment-cabinets/solid-door-cabinet-reference.png",
    products: [
      ["product:fire-equipment-cabinets", "Fire Equipment Cabinets", "خزائن معدات مكافحة الحريق", "products/消防器材箱/fire-equipment-cabinets/solid-door-cabinet-reference.png"],
      ...catalogExpansionListings("fire-equipment-cabinets")
    ]
  }
].concat(websiteBatchFamilies).map((family) => ({
  ...family,
  products: family.products.map(([routeId, en, ar, image]) => {
    const file = new URL(`./documented-products/${routeId.replace('product:', '')}.json`, import.meta.url);
    const data = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : catalogExpansionByRoute.get(routeId) || null;
    const configurations = data?.configurationCards ? data.gallery.map(item => ({
      anchor: `configuration-${item.caption}`,
      image: data.media[item.media],
      name: text(data.copy.en[item.caption], data.copy.ar[item.caption])
    })) : [];
    return { routeId, name: text(en, ar), image: reviewedPhotoPath(routeId,image), configurations, configurationCardFullNames: Boolean(data?.configurationCardFullNames), views: productViews(routeId.replace('product:','')) };
  })
}));

export function localizedText(value, locale) {
  return value[locale] ?? value.en;
}

// Configurations with their own identified images appear alongside other products.
export function flatProducts(family) {
  return family.products.flatMap(product => {
    const cards = product.configurations.length ? product.configurations.map(item => ({
    ...product, image: item.image, anchor: item.anchor,
    name: product.configurationCardFullNames ? item.name : text(`${item.name.en} Landing Valve`, `${product.name.ar} — ${item.name.ar}`),
    configurations: [], searchTerms: productSearchTerms(product.routeId, { image: item.image, anchor: item.anchor })
  })) : product.views.length ? product.views.map(item => ({...product, image:item.image, anchor:item.anchor, view:item.anchor ? undefined : item.view ?? item.image, name:text(`${product.name.en} — ${item.name.en}`, `${product.name.ar} — ${item.name.ar}`), searchTerms: productSearchTerms(product.routeId, { image: item.searchImage ?? item.view ?? item.image, anchor:item.anchor })})) : [{ ...product, searchTerms: productSearchTerms(product.routeId, { includeSupplements: false }) }];
    if (cards.length) {
      // Additional models are links within one existing card, never empty cards.
      // Keep their search records separate from the pictured model's facts.
      cards[0].relatedConfigurations = relatedSupplementConfigurations(product.routeId).map(item => ({
        ...item, searchTerms: [product.name.en, product.name.ar, item.searchTerms].join(' ')
      }));
    }
    return cards;
  });
}

export function productSuffix(product) {
  return product.anchor ? '#' + product.anchor : product.view ? '?view=' + encodeURIComponent(product.view) + '#gallery' : '';
}

export default PRODUCT_FAMILIES;
