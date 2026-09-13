import { createHomeRoute } from "./siteRoutes.js";
import { createSeoMetadata } from "./seo.js";
import { createSiteNavigation } from "./navigation.js";
import { PRODUCT_FAMILIES, localizedText } from "./productDirectory.js";
import chinese from "./homeChinese.js";

const arabic = {
  "Fire protection equipment": "تصنيع معدات مكافحة الحريق",
  "Products": "المنتجات",
  "About": "من نحن",
  "Manufacturing": "قدرات التصنيع",
  "Downloads": "التنزيلات",
  "Certificates": "الشهادات",
  "Contact": "تواصل معنا",
  "Manufacturer · Fire-water system components": "مصنّع · مكونات أنظمة مياه مكافحة الحريق",
  "Fire Protection Equipment Manufacturing & OEM Support.": "تصنيع معدات مكافحة الحريق ودعم مشاريع العلامة الخاصة.",
  "Sprinklers, alarm and control valves, hose reels, fire hoses, nozzles, couplings and hydrant-system components for trading partners, distributors and private-label customers.": "رشاشات الحريق وصمامات الإنذار والتحكم وبكرات الخراطيم والخراطيم والفوهات والوصلات ومكونات أنظمة صنابير الحريق للتجار والموزعين وعملاء العلامة الخاصة.",
  "Explore Products": "استعرض المنتجات",
  "Contact Manufacturing Team": "تواصل مع فريق التصنيع",
  "Company established": "سنة تأسيس الشركة",
  "Production space stated by company": "مساحة الإنتاج حسب بيانات الشركة",
  "Machining capability": "إمكانات تشغيل المعادن",
  "Machining & production": "التشغيل والإنتاج",
  "About the manufacturer": "عن جهة التصنيع",
  "Manufacturing support built around real product requirements.": "دعم تصنيع يبدأ من متطلبات المنتج الفعلية.",
  "Based in Nan'an, Quanzhou, Fujian, we manufacture and supply fire-water-system products and components. We work with trading partners and private-label customers, supporting product configuration, marking, packaging and production review.": "نعمل من نانآن، تشيوانتشو، فوجيان في الصين، ونصنّع ونورّد منتجات ومكونات أنظمة مياه مكافحة الحريق. ندعم مراجعة التكوين والعلامات والتعبئة لعملاء التجارة والعلامة الخاصة.",
  "International thread, flange or grooved requirements are reviewed against the buyer's drawing, sample and technical schedule before confirmation. CNC capability alone is not presented as proof of compliance with a specific overseas standard.": "تُراجع متطلبات اللولب أو الفلنجة أو الطرف المحزّز الدولية وفق رسم المشتري أو عينته أو جدوله الفني قبل التأكيد، ولا تُعرض قدرة التشغيل وحدها كإثبات امتثال لمعيار خارجي محدد.",
  "Product configuration review": "مراجعة تكوين المنتج",
  "By model and target requirement": "حسب الموديل ومتطلبات السوق المستهدف",
  "Domestic inspection documentation": "وثائق الفحص المحلية",
  "Scope confirmed before supply": "يُؤكد النطاق قبل التوريد",
  "Private-label support": "دعم العلامة الخاصة",
  "Marking and packaging review": "مراجعة الوسم والتعبئة",
  "Mixed product sourcing": "توريد منتجات متعددة",
  "Fire-water-system components": "مكونات أنظمة مياه مكافحة الحريق",
  "Product range": "نطاق المنتجات",
  "Select by product family, size and project requirement.": "اختر حسب فئة المنتج والمقاس ومتطلبات المشروع.",
  "International descriptions are used first; factory reference codes remain available for quotation and production coordination.": "نستخدم الأسماء الدولية أولاً، مع الاحتفاظ بأكواد المصنع المرجعية لتنسيق عرض السعر والإنتاج.",
  "Fire Sprinklers": "رشاشات الحريق",
  "Upright, pendent, sidewall, concealed and special-purpose configurations.": "تكوينات قائمة ومعلقة وجانبية ومخفية وتطبيقات خاصة.",
  "Alarm & System Valves": "صمامات الإنذار وصمامات الأنظمة",
  "Wet alarm, deluge, preaction and dry-pipe valve families.": "عائلات الصمامات الرطبة وصمامات الغمر والإجراء المسبق والأنابيب الجافة.",
  "Fire Butterfly Valves": "صمامات فراشة لمكافحة الحريق",
  "Lever-operated and supervisory configurations with wafer or grooved connections.": "تكوينات تشغيل يدوية أو مراقبة بتوصيلات رقاقة أو محززة.",
  "Fire Gate Valves": "صمامات بوابة لمكافحة الحريق",
  "Supervisory, NRS and OS&Y configurations in grooved or flanged styles.": "تكوينات مراقبة وساق غير صاعد أو ساق صاعد بتوصيل محزّز أو فلنجي.",
  "Fire Hose Reels": "بكرات خراطيم الحريق",
  "RIA 25 European-standard (EN 671-1) and JPS direct-stream and jet/spray reel configurations.": "تكوينات RIA 25 وفق EN 671-1 وبكرات JPS بالتدفق المباشر أو النفاث والرذاذ.",
  "Fire Hose Nozzles, Couplings & Adapters": "فوهات خراطيم الحريق والوصلات والمهايئات",
  "Fire hose nozzles, couplings, adapters and related components supplied for individual quotation.": "فوهات خراطيم الحريق والوصلات والمهايئات والمكونات المرتبطة بها متاحة لطلب عروض أسعار منفصلة.",
  "Indoor Fire Hydrants": "محابس الحريق الداخلية",
  "Indoor fire-water outlets and matching system components.": "مخارج مياه حريق داخلية ومكونات نظام متوافقة.",
  "Outdoor Fire Hydrants": "صنابير الحريق الخارجية",
  "Above-ground hydrant configurations for fire-water networks.": "تكوينات صنابير فوق سطح الأرض لشبكات مياه الحريق.",
  "Fire Department Connections": "وصلات تزويد أنظمة الحريق بالمياه",
  "Inlet assemblies connecting fire-service water supply to building systems.": "مجموعات إدخال تربط مصدر مياه خدمة الإطفاء بأنظمة المباني.",
  "View range →": "عرض الفئة ←",
  "View product →": "عرض المنتج ←",
  "Manufacturing overview": "نظرة على التصنيع",
  "Production, machining and organized order preparation.": "الإنتاج والتشغيل وتجهيز الطلبات ضمن عملية منظمة.",
  "The visuals below provide an overview of manufacturing, product handling and order preparation. Technical compliance remains model- and document-specific.": "توضح الصور بيئة التصنيع ومعالجة المنتجات وتجهيز الطلبات، وتبقى المطابقة الفنية مرتبطة بالموديل والوثائق المؤكدة.",
  "Machining": "التشغيل",
  "CNC and workshop processes support component production and configuration review.": "تدعم عمليات CNC والورشة إنتاج المكونات ومراجعة التكوين.",
  "Batch Production": "الإنتاج بالدفعات",
  "Organized production of hydrants, valves and fire-water-system components.": "إنتاج منظم للصنابير والصمامات ومكونات أنظمة مياه الحريق.",
  "Order Preparation": "تجهيز الطلبات",
  "Structured storage supports product sorting, packing and shipment coordination.": "يدعم التخزين المنظم فرز المنتجات وتعبئتها وتنسيق الشحن.",
  "Manufacturing Base": "قاعدة التصنيع",
  "Fire-protection equipment production in Nan'an, Quanzhou, Fujian, China.": "إنتاج معدات مكافحة الحريق في نانآن، تشيوانتشو، فوجيان، الصين.",
  "Configuration first. Production after confirmation.": "نؤكد التكوين أولاً، ثم نبدأ الإنتاج.",
  "We can review product marking, nameplates, carton artwork, selected finishes and component combinations. Thread, flange and grooved requirements are confirmed from drawings, samples or technical schedules—not assumed from machine capability.": "يمكننا مراجعة وسم المنتج ولوحة البيانات وتصميم العبوة والتشطيبات المختارة وتركيبات المكونات. تُؤكد متطلبات اللولب والفلنجة والمجرى من الرسم أو العينة أو الجدول الفني.",
  "Product marking & nameplate": "وسم المنتج ولوحة البيانات",
  "Carton artwork & labels": "تصميم الكرتون والملصقات",
  "Component matching": "مطابقة المكونات",
  "Drawing / sample review": "مراجعة الرسم أو العينة",
  "Discuss Your Requirement": "ناقش متطلباتك",
  "Kraft carton — illustrative option": "كرتون كرافت — خيار توضيحي",
  "Custom carton — illustrative option": "كرتون مخصص — خيار توضيحي",
  "Wooden case — illustrative option": "صندوق خشبي — خيار توضيحي",
  "Packaging visuals show possible formats only. Final packaging is confirmed by product, order and transport requirement.": "تعرض صور التعبئة أشكالاً محتملة فقط، وتُؤكد التعبئة النهائية حسب المنتج والطلب ومتطلبات النقل.",
  "Verified management systems": "أنظمة إدارة موثقة",
  "Certificate details shown with holder and scope.": "تفاصيل الشهادات مع حامل الشهادة ونطاقها.",
  "These are management-system certificates, not UL, FM, CE or overseas product approvals. Product-specific domestic reports and certificate applicability are confirmed separately.": "هذه شهادات أنظمة إدارة وليست اعتمادات منتجات UL أو FM أو CE. تُؤكد تقارير المنتجات المحلية ونطاق تطبيق الشهادة بشكل منفصل.",
  "Certificate holder shown on the documents: GUANYA FIRE-PROTECTION EQUIPMENT CO., LTD. Scope shown on the documents covers production of fire hydrants, sprinkler tips, fire hose reels and fire pump adapters, plus sales of fire hose.": "حامل الشهادة الظاهر في الوثائق هو GUANYA FIRE-PROTECTION EQUIPMENT CO., LTD. ويشمل النطاق إنتاج صنابير الحريق ورؤوس الرش وبكرات الخراطيم ووصلات مضخات الحريق وبيع خراطيم الحريق.",
  "Certificate no.": "رقم الشهادة",
  "Recertification": "إعادة الاعتماد",
  "Initial issuance": "الإصدار الأول",
  "Expiry": "تاريخ الانتهاء",
  "Quality management system. Click to view the supplied certificate.": "نظام إدارة الجودة. انقر لعرض الشهادة المقدمة.",
  "Environmental management system. Click to view the supplied certificate.": "نظام الإدارة البيئية. انقر لعرض الشهادة المقدمة.",
  "Occupational health and safety management system. Click to view the supplied certificate.": "نظام إدارة الصحة والسلامة المهنية. انقر لعرض الشهادة المقدمة.",
  "Technical & commercial inquiry": "استفسار فني وتجاري",
  "Send the product, size and target requirement.": "أرسل المنتج والمقاس والمتطلبات المستهدفة.",
  "For a useful review, include product family, quantity, destination, required connection or drawing, packaging request and any approval requirement.": "لإجراء مراجعة مفيدة، أرسل فئة المنتج والكمية والوجهة والتوصيل أو الرسم المطلوب ومتطلبات التعبئة وأي متطلبات اعتماد.",
  "Nan'an, Quanzhou, Fujian, China": "نانآن، تشيوانتشو، فوجيان، الصين",
  "Name / company": "الاسم / الشركة",
  "Destination": "بلد أو ميناء الوصول",
  "Product family": "فئة المنتج",
  "Estimated quantity": "الكمية التقديرية",
  "Size / connection / drawing / OEM requirement": "المقاس / التوصيل / الرسم / متطلبات OEM",
  "Continue on WhatsApp ↗": "المتابعة عبر WhatsApp ↗",
  "Fire protection equipment manufacturing and supply": "تصنيع وتوريد معدات مكافحة الحريق",
  "Website information is for product-range reference. Final specifications, connection standards, test documentation and certificate applicability are confirmed by model and order before supply.": "معلومات الموقع مرجع لنطاق المنتجات. تُؤكد المواصفات النهائية ومعايير التوصيل ووثائق الاختبار وانطباق الشهادات حسب الموديل والطلب قبل التوريد."
};

const shared = {
  alternateLocale: "ar_AR",
  description: "Fire protection equipment manufacturing and OEM support for sprinklers, alarm valves, fire valves, hose reels, fire hoses, nozzles, couplings and hydrant-system components.",
  form: {
    quantityPlaceholder: "e.g. 500 pcs",
    detailsPlaceholder: "Tell us what needs to be confirmed..."
  }
};

const englishRoute = createHomeRoute("en");
const chineseRoute = createHomeRoute("zh");
const arabicRoute = createHomeRoute("ar");

const pages = [
  {
    ...shared,
    route: englishRoute,
    outputPath: englishRoute.outputPath,
    lang: "en",
    languageCode: "en",
    dir: "ltr",
    locale: "en_US",
    canonical: englishRoute.canonical,
    assetPrefix: "",
    title: "CHUANWEI FIRE | Fire Protection Equipment Manufacturer & OEM Support",
    translations: {},
    languageLinksJson: JSON.stringify(englishRoute.languageLinks),
    languageCanonicalsJson: JSON.stringify(englishRoute.languageCanonicals)
  },
  {
    ...shared,
    route: chineseRoute,
    outputPath: chineseRoute.outputPath,
    lang: "zh-CN",
    languageCode: "zh",
    dir: "ltr",
    locale: "zh_CN",
    alternateLocale: "en_US",
    canonical: chineseRoute.canonical,
    assetPrefix: "../",
    title: "CHUANWEI FIRE | 消防设备制造商与 OEM 配套支持",
    description: "面向贸易合作伙伴、经销商和自有品牌客户，提供消防设备制造、产品配置与 OEM 配套支持。",
    translations: chinese,
    form: {
      quantityPlaceholder: "例如：500件",
      detailsPlaceholder: "请填写需要确认的产品要求……"
    },
    languageLinksJson: JSON.stringify(chineseRoute.languageLinks),
    languageCanonicalsJson: JSON.stringify(chineseRoute.languageCanonicals)
  },
  {
    ...shared,
    route: arabicRoute,
    outputPath: arabicRoute.outputPath,
    lang: "ar",
    languageCode: "ar",
    dir: "rtl",
    locale: "ar_AR",
    alternateLocale: "en_US",
    canonical: arabicRoute.canonical,
    assetPrefix: "../",
    title: "CHUANWEI FIRE | تصنيع معدات مكافحة الحريق ودعم OEM",
    description: "تصنيع وتوريد معدات مكافحة الحريق ودعم OEM لرشاشات الحريق والصمامات وبكرات الخراطيم ومكونات شبكات مياه الحريق.",
    translations: arabic,
    form: {
      quantityPlaceholder: "مثال: 500 قطعة",
      detailsPlaceholder: "أخبرنا بما يجب تأكيده..."
    },
    languageLinksJson: JSON.stringify(arabicRoute.languageLinks),
    languageCanonicalsJson: JSON.stringify(arabicRoute.languageCanonicals)
  }
];

export default pages.map((page) => {
  const navigation = createSiteNavigation("home", page.languageCode, page.outputPath);
  const families = PRODUCT_FAMILIES.map((family) => ({
    id: family.id,
    name: localizedText(family.name, page.languageCode),
    englishName: family.name.en,
    description: localizedText(family.description, page.languageCode),
    image: `${page.assetPrefix}${family.image}`,
    href: `${navigation.productsHref}?q=&category=${family.id}`
  }));

  return {
    ...page,
    families,
    form: {
      ...page.form,
      options: families.map((family) => [family.englishName, family.name, family.id])
    },
    navigation,
    seo: createSeoMetadata("home", page.languageCode, {
      title: page.title,
      description: page.description,
      image: "https://chuanweifire.com/og-image.jpg"
    })
  };
});
