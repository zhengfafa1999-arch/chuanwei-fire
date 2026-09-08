export const DIRECTORY_COPY = {
  en: {
    lang: "en", dir: "ltr", locale: "en_US",
    brandTagline: "Fire protection equipment manufacturing and supply",
    home: "Home", products: "Products", about: "About", downloads: "Downloads", contact: "Contact", english: "English", arabic: "العربية",
    directoryEyebrow: "Product directory",
    directoryTitle: "Fire-water-system products organized by family.",
    directoryLead: "Start with a product family, then confirm the model, nominal size, connection, quantity, destination and required documentation with our team.",
    directoryNote: "Only confirmed product families and existing pages are linked. Technical specifications remain product- and order-specific.",
    browseCategory: "Browse category",
    categoryEyebrow: "Product family",
    availableProducts: "Available product types",
    categoryNote: "Use these pages to identify the required product type. Final dimensions, pressure ratings, materials, connection standards and approvals are confirmed before quotation.",
    localizedDetails: "View product details",
    englishDetails: "View English technical page",
    requestDetails: "Request product details",
    selectionTitle: "Information needed for an accurate quotation",
    selectionLead: "Send the product type and the details below. A drawing or mating sample is recommended when the connection is market-specific.",
    selectionItems: ["Nominal size and connection", "Working pressure and medium", "Quantity and destination", "Drawing, sample or required standard"],
    inquiryTitle: "Send your product requirement",
    inquiryBody: "Include the product family, model or reference photo, size, connection, quantity and destination country.",
    whatsapp: "Discuss on WhatsApp",
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
    directoryTitle: "منتجات أنظمة مياه مكافحة الحريق مرتبة حسب الفئة.",
    directoryLead: "ابدأ باختيار فئة المنتج، ثم أكد الموديل والمقاس الاسمي والتوصيل والكمية والوجهة والوثائق المطلوبة مع فريقنا.",
    directoryNote: "تُعرض فقط الفئات المؤكدة والصفحات الموجودة. تبقى المواصفات الفنية مرتبطة بالمنتج والطلب المحدد.",
    browseCategory: "عرض الفئة",
    categoryEyebrow: "فئة المنتج",
    availableProducts: "أنواع المنتجات المتاحة",
    categoryNote: "استخدم هذه الصفحات لتحديد نوع المنتج المطلوب. تُؤكد الأبعاد النهائية وضغط التشغيل والمواد ومعايير التوصيل والاعتمادات قبل عرض السعر.",
    localizedDetails: "عرض تفاصيل المنتج",
    englishDetails: "عرض الصفحة الفنية بالإنجليزية",
    requestDetails: "اطلب تفاصيل المنتج",
    selectionTitle: "المعلومات المطلوبة لعرض سعر دقيق",
    selectionLead: "أرسل نوع المنتج والتفاصيل أدناه. يوصى بإرسال رسم أو عينة مطابقة عندما يكون التوصيل خاصاً بالسوق.",
    selectionItems: ["المقاس الاسمي ونوع التوصيل", "ضغط التشغيل والوسط", "الكمية وبلد الوجهة", "الرسم أو العينة أو المعيار المطلوب"],
    inquiryTitle: "أرسل متطلبات المنتج",
    inquiryBody: "أدرج فئة المنتج والموديل أو الصورة المرجعية والمقاس والتوصيل والكمية وبلد الوجهة.",
    whatsapp: "تواصل عبر WhatsApp",
    backToDirectory: "العودة إلى دليل المنتجات",
    fallbackBadge: "صفحة إنجليزية",
    localizedBadge: "صفحة مترجمة",
    inquiryBadge: "استفسار"
  }
};

const text = (en, ar) => ({ en, ar });

export const PRODUCT_FAMILIES = [
  {
    id: "sprinklers", routeId: "category:sprinklers",
    name: text("Fire Sprinklers", "رشاشات الحريق"),
    description: text("Standard, quick-response, concealed, dry and special-purpose sprinkler and open-nozzle families.", "رشاشات قياسية وسريعة الاستجابة ومخفية وجافة، إضافة إلى فئات الرشاشات والفوهات المفتوحة للأغراض الخاصة."),
    image: "products/消防喷头/categories/standard-response-upright.jpg",
    products: [
      ["product:standard-response-fire-sprinkler", "Standard Response Fire Sprinklers", "رشاشات الحريق ذات الاستجابة القياسية", "products/消防喷头/standard-response-sprinkler/standard-response-three-styles.jpg"],
      ["product:fusible-alloy-fire-sprinklers", "Fusible-Alloy Fire Sprinklers", "رشاشات حريق بعنصر حراري قابل للانصهار", "products/消防喷头/fusible-alloy-fire-sprinklers/fusible-alloy-configuration-a.jpg"],
      ["product:glass-bulb-fire-sprinkler", "Quick Response Glass Bulb Sprinklers", "رشاشات زجاجية سريعة الاستجابة", "products/消防喷头/glass-bulb-sprinkler/quick-response-pendent.jpg"],
      ["product:extended-coverage-quick-response-fire-sprinkler", "Extended Coverage Quick Response Sprinklers", "رشاشات سريعة الاستجابة ذات تغطية موسعة", "products/消防喷头/categories/extended-coverage-quick-response.jpg"],
      ["product:concealed-pendent-fire-sprinkler", "Concealed Pendent Sprinklers", "رشاشات معلقة مخفية", "products/消防喷头/categories/concealed-pendent.jpg"],
      ["product:large-k-factor-esfr-sprinklers", "Large K-Factor & ESFR Sprinklers", "رشاشات بمعامل K كبير وESFR", "products/消防喷头/categories/large-k-esfr-sprinkler.jpg"],
      ["product:dry-pendent-fire-sprinklers", "Dry Pendent Fire Sprinklers", "رشاشات حريق جافة معلقة", "products/消防喷头/categories/dry-sprinkler.jpg"],
      ["product:water-mist-nozzles", "Water Mist Nozzles", "فوهات ضباب الماء", "products/消防喷头/water-mist-nozzles/standard-water-mist-nozzle-view-1.jpg"],
      ["product:water-curtain-nozzles", "Water Curtain Nozzles", "فوهات الستارة المائية", "products/消防喷头/water-curtain-nozzles/horizontal-single-slot-water-curtain-nozzle.jpg"]
    ]
  },
  {
    id: "system-valves", routeId: "category:system-valves",
    name: text("Alarm & System Valves", "صمامات الإنذار وصمامات الأنظمة"),
    description: text("Wet alarm, deluge, preaction and dry-pipe valve assemblies for fire-water systems.", "مجموعات صمامات الإنذار الرطب والغمر والإجراء المسبق والأنابيب الجافة لأنظمة مياه مكافحة الحريق."),
    image: "products/消防阀/消防阀主图.jpg",
    products: [
      ["product:wet-alarm-check-valve", "Wet Alarm Check Valve Assemblies", "مجموعات صمام الإنذار الرطب", "products/消防阀/wet-alarm-check-valve-assemblies/dn150-flanged-wet-alarm-assembly-en.jpg"],
      ["product:diaphragm-deluge-valves", "Diaphragm Deluge Valves", "صمامات غمر غشائية", "products/消防阀/diaphragm-deluge-valves/deluge-valve-flanged.jpg"],
      ["product:preaction-valve-assemblies", "Preaction Valve Assemblies", "مجموعات صمامات الإجراء المسبق", "products/消防阀/preaction-valve-assembly.jpg"],
      ["product:dry-pipe-alarm-valves", "Dry Pipe Alarm Valves", "صمامات إنذار الأنابيب الجافة", "products/消防阀/dry-pipe-alarm-valves/dry-pipe-alarm-valve-flanged.jpg"],
      ["product:saddle-type-waterflow-switches", "Saddle-Type Waterflow Switches", "مفاتيح تدفق المياه من النوع السرجي", "products/消防阀/saddle-type-waterflow-switches/zsjz-dn100-reference.png"]
    ]
  },
  {
    id: "butterfly-valves", routeId: "category:butterfly-valves",
    name: text("Fire Butterfly Valves", "صمامات فراشة لمكافحة الحريق"),
    description: text("Lever-operated and supervisory butterfly valve families with grooved or wafer connections.", "فئات صمامات الفراشة اليدوية والمراقبة بتوصيلات محززة أو رقاقة."),
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
    name: text("Fire Gate Valves", "صمامات بوابة لمكافحة الحريق"),
    description: text("Supervisory, non-rising-stem and OS&Y gate valve families for fire-water networks.", "فئات صمامات البوابة المراقبة وذات الساق غير الصاعد وOS&Y لشبكات مياه مكافحة الحريق."),
    image: "products/消防阀门/消防阀门主图.jpg",
    products: [
      ["product:flanged-supervisory-gate-valves", "Flanged Supervisory Gate Valves", "صمامات بوابة فلنجية بإشارة مراقبة", "products/消防阀门/flanged-supervisory-gate-valves/flanged-supervisory-gate-valve.jpg"],
      ["product:grooved-supervisory-gate-valves", "Grooved Supervisory Gate Valves", "صمامات بوابة محززة بإشارة مراقبة", "products/消防阀门/grooved-supervisory-gate-valves/grooved-supervisory-gate-valve.jpg"],
      ["product:nrs-gate-valves", "NRS Gate Valves", "صمامات بوابة بساق غير صاعد", "products/消防阀门/nrs-gate-valves/nrs-gate-valve.jpg"],
      ["product:osy-gate-valves", "OS&Y Gate Valves", "صمامات بوابة OS&Y", "products/消防阀门/osy-gate-valves/osy-gate-valve.jpg"]
    ]
  },
  {
    id: "hose-reels", routeId: "category:hose-reels",
    name: text("Fire Hose Reels", "بكرات خراطيم الحريق"),
    description: text("Wall-mounted hose reel families with straight-stream, jet/spray and heavy-duty configurations.", "فئات بكرات خراطيم مثبتة على الحائط بتكوينات تدفق مباشر ونفاث/رذاذ وخدمة شاقة."),
    image: "products/软管卷盘/ria25-fire-hose-reel/ria25-fire-hose-reel.jpg",
    products: [
      ["product:ria25-fire-hose-reel", "RIA 25 Fire Hose Reel", "بكرة خرطوم حريق RIA 25", "products/软管卷盘/ria25-fire-hose-reel/ria25-fire-hose-reel.jpg"],
      ["product:straight-stream-fire-hose-reel", "Straight-Stream Fire Hose Reel", "بكرة خرطوم حريق بتدفق مباشر", "products/软管卷盘/straight-stream-fire-hose-reel/straight-stream-fire-hose-reel.jpg"],
      ["product:jet-spray-fire-hose-reel", "Jet/Spray Fire Hose Reel", "بكرة خرطوم حريق نفاث/رذاذ", "products/软管卷盘/jet-spray-fire-hose-reel/jet-spray-fire-hose-reel.jpg"],
      ["product:heavy-duty-fire-hose-reel", "Heavy-Duty Fire Hose Reel", "بكرة خرطوم حريق للخدمة الشاقة", "products/软管卷盘/heavy-duty-fire-hose-reel/heavy-duty-reel.jpg"]
    ]
  },
  {
    id: "hoses-nozzles-couplings", routeId: "category:hoses-nozzles-couplings",
    name: text("Hoses, Nozzles & Couplings", "الخراطيم والفوهات والوصلات"),
    description: text("Fire hose-line components supplied individually or reviewed as a matched assembly.", "مكونات خطوط خراطيم الحريق للتوريد المنفرد أو للمراجعة كمجموعة متوافقة."),
    image: "products/消防水枪/消防水枪主图.jpg",
    products: [
      ["product:combination-jet-fog-nozzles", "Combination Jet/Fog Nozzles", "فوهات نفاثة/ضبابية مركبة", "products/消防水枪/categories/combination-jet-fog-nozzle.jpg"],
      ["product:layflat-fire-hoses", "Layflat Fire Hoses", "خراطيم حريق مسطحة", "products/消防水枪/categories/layflat-fire-hose.jpg"],
      ["product:kd-hose-couplings", "KD Hose Couplings", "وصلات خراطيم KD", "products/消防水枪/categories/kd-hose-coupling.jpg"],
      ["product:kn-threaded-adapters", "KN Threaded Adapters", "محولات لولبية KN", "products/消防水枪/categories/kn-threaded-adapter.jpg"],
      ["product:matched-hose-assemblies", "Matched Hose Assemblies", "مجموعات خراطيم متوافقة", "products/消防水枪/categories/hose-assembly.jpg"]
    ]
  },
  {
    id: "indoor-hydrants", routeId: "category:indoor-hydrants",
    name: text("Indoor Fire Hydrants", "محابس الحريق الداخلية"),
    description: text("Indoor fire-water outlet valves in standard, slanted, double-outlet and pressure-regulating configurations.", "محابس مخارج مياه الحريق الداخلية بتكوينات قياسية ومائلة ومزدوجة المخرج ومنظمة للضغط."),
    image: "products/室内消防栓/export-slanted-hydrant-valve/export-slanted-front.jpg",
    products: [
      ["product:standard-indoor-hydrant", "Standard Indoor Fire Hydrants", "محابس حريق داخلية قياسية", "products/室内消防栓/standard-indoor-hydrant/standard-indoor-hydrant.jpg"],
      ["product:export-slanted-hydrant-valve", "Export Slanted Hydrant Valves", "محابس حريق مائلة للتصدير", "products/室内消防栓/export-slanted-hydrant-valve/export-slanted-front.jpg"],
      ["product:double-outlet-hydrant", "Double-Outlet Indoor Hydrants", "محابس حريق داخلية مزدوجة المخرج", "products/室内消防栓/double-outlet-hydrant/double-outlet-hydrant.jpg"],
      ["product:rotating-pressure-regulating-hydrant", "Rotating Pressure-Regulating Hydrants", "محابس دوارة منظمة للضغط", "products/室内消防栓/rotating-pressure-regulating-hydrant/rotating-hydrant.jpg"],
      ["product:straight-through-oblique-landing-valves", "Straight-Through and Oblique Landing Valves", "صمامات هبوط مستقيمة ومائلة", "products/室内消防栓/straight-through-oblique-landing-valves/straight-through-catalog-display.jpeg"],
      ["product:horizontal-handwheel-landing-valves", "Horizontal-Handwheel Landing Valves", "صمامات هبوط بعجلة تشغيل أفقية", "products/室内消防栓/horizontal-handwheel-landing-valves/threaded-inlet-catalog-display.jpeg"]
    ]
  },
  {
    id: "outdoor-hydrants", routeId: "category:outdoor-hydrants",
    name: text("Outdoor Fire Hydrants", "صنابير الحريق الخارجية"),
    description: text("Above-ground hydrant configurations organized by destination-market pattern.", "تكوينات صنابير حريق فوق سطح الأرض مرتبة حسب نمط السوق المستهدف."),
    image: "products/室外消防栓/bs750-pillar-hydrant/bs750-front.jpg",
    products: [
      ["product:bs750-pillar-hydrant", "BS 750 Pattern Pillar Hydrants", "صنابير عمودية بنمط BS 750", "products/室外消防栓/bs750-pillar-hydrant/bs750-front.jpg"],
      ["product:french-pattern-hydrant", "French-Pattern Hydrants", "صنابير حريق بالنمط الفرنسي", "products/室外消防栓/global-series/french-dry-barrel-hydrant.jpg"],
      ["product:indonesian-pattern-hydrant", "Indonesian-Pattern Hydrants", "صنابير حريق بالنمط الإندونيسي", "products/室外消防栓/global-series/indonesia-wet-barrel-hydrant.jpg"],
      ["product:russian-pattern-hydrant", "Russian-Pattern Hydrants", "صنابير حريق بالنمط الروسي", "products/室外消防栓/global-series/russian-pattern-hydrant.jpg"]
    ]
  },
  {
    id: "fire-department-connections", routeId: "category:fire-department-connections",
    name: text("Fire Department Connections", "وصلات تزويد أنظمة الحريق بالمياه"),
    description: text("Fire-service water inlet assemblies organized by installation arrangement and system-side connection.", "مجموعات إدخال مياه خدمة الإطفاء مرتبة حسب طريقة التركيب والتوصيل من جهة النظام."),
    image: "products/消防水泵接合器/消防水泵接合器主图.jpg",
    products: [
      ["product:freestanding-above-ground-fdcs", "Freestanding Above-Ground FDCs", "وصلات FDC أرضية فوق سطح الأرض", "products/消防水泵接合器/消防水泵接合器主图.jpg"],
      ["product:alternative-freestanding-fdc-configurations", "Alternative Freestanding Configurations", "تكوينات أرضية بديلة", "products/消防水泵接合器/DSC_5714.jpg"],
      ["product:underground-fdc-assemblies", "Underground FDC Assemblies", "مجموعات FDC تحت الأرض", "products/消防水泵接合器/DSC_5705.jpg"],
      ["product:wall-mounted-grooved-fdc-families", "Wall-Mounted & Grooved Families", "فئات جدارية ومحززة", "products/消防水泵接合器/DSC_5709.jpg"],
      ["product:breeching-inlets", "Breeching Inlets", "مداخل تغذية أنظمة الحريق", "products/消防水泵接合器/breeching-inlets/two-way-breeching-inlet.jpg"],
      ["product:russian-pattern-fire-department-connection", "Russian-Pattern Fire Department Connection", "وصلة تغذية حريق بالنمط الروسي", "products/消防水泵接合器/russian-pattern-fire-department-connection/65-16k-65-front.png"]
    ]
  }
].map((family) => ({
  ...family,
  products: family.products.map(([routeId, en, ar, image]) => ({ routeId, name: text(en, ar), image }))
}));

export function localizedText(value, locale) {
  return value[locale];
}

export default PRODUCT_FAMILIES;
