import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const directory = path.dirname(fileURLToPath(import.meta.url));
const source = JSON.parse(fs.readFileSync(path.join(directory, "catalog-expansion.json"), "utf8"));
const text = (en, ar) => ({ en, ar });
const rightsEvidence = "docs/release/quanguan-catalog-expansion-20260913/image-rights-confirmation.json";

function visibleCatalogDetails(item) {
  return [...new Set(item.sourceOptions.map(option => option.replace(/^[^:]+:\s*/, "").trim()))].join(" · ");
}

function copyFor(series, locale) {
  const arabic = locale === "ar";
  const count = series.items.length;
  const cabinet = series.page === 30;
  const copy = arabic ? {
    onThisPage: "في هذه الصفحة",
    title: series.title.ar,
    eyebrow: `${count} تكوينات متاحة من الكتالوج المقدم`,
    lead: cabinet
      ? "أربعة تكوينات إضافية للخزائن، متاحة من الفولاذ الكربوني أو بإطار ألومنيوم مع ألواح صلب، مع سماكة صاج قابلة للتخصيص حسب الطلب."
      : "استخدم صور التكوين لتحديد المنتج المطلوب، ثم أكد التوصيل والمواد وبيانات الأداء مع عرض السعر.",
    note: "تُؤكد المواصفات النهائية وترتيب المنتج في عرض السعر والرسم المعتمد.",
    gallery: "صور التكوينات",
    galleryTitle: `${count} تكوينات للاختيار`,
    galleryBody: "افتح كل صورة لمقارنة الشكل العام. يجب تأكيد التفاصيل الصغيرة واللولب والعلامات المصبوبة مع صورة أصلية أو عينة أو رسم معتمد.",
    specifications: "نطاق البيانات",
    specificationsTitle: "ما هو مؤكد وما يحتاج إلى تأكيد",
    specificationsBody: "نُقلت قيم التوصيل والأبعاد الظاهرة في الكتالوج لتسهيل اختيار التكوين المناسب، وتُؤكد مواصفات الطلب النهائية في عرض السعر.",
    productType: "فئة المنتج",
    productTypeValue: series.title.ar,
    availableConfigurations: "التكوينات المتاحة",
    configurationCountValue: `${count} تكوينات مصورة`,
    sourceData: "مصدر بيانات الاختيار",
    sourceDataValue: `صفحة ${series.page} من الكتالوج الإلكتروني المقدم`,
    factoryModel: "موديل مصنع CHUANWEI",
    factoryModelValue: "يُؤكد مع عرض السعر",
    technicalStatus: "حالة البيانات الفنية",
    technicalStatusValue: "بيانات أولية من الكتالوج؛ تتطلب تأكيد الطلب",
    materialOptions: "خيارات مادة الخزانة",
    materialOptionsValue: "فولاذ كربوني؛ أو إطار ألومنيوم مع ألواح صلب؛ سماكة الصاج قابلة للتخصيص",
    availableModels: "التكوينات المتاحة",
    modelsTitle: "التكوينات وبيانات الكتالوج المرتبطة بها",
    modelsBody: "يعرض كل صف التكوين وقيم التوصيل أو الأبعاد الظاهرة في الكتالوج المقدم.",
    configuration: "التكوين",
    catalogDetails: "بيانات التوصيل أو الأبعاد في المصدر",
    modelsNote: "قد تتضمن جداول المصدر قيماً مكررة أو تحتاج إلى مراجعة. أكد الموديل النهائي واتجاه التدفق والسن أو الفلنجة والمادة والضغط والرسم قبل الإنتاج.",
    temperature: "درجة الحرارة",
    thermalElement: "عنصر التشغيل",
    quotation: "تأكيد عرض السعر",
    quotationTitle: "أكد التكوين قبل الإنتاج",
    quotationBody: "أرسل صورة التكوين والمقاس ونوع التوصيل والمواد وضغط التشغيل والكمية والوجهة. يثبت عرض السعر والرسم المعتمد مواصفة التوريد النهائية.",
    connectionAndSize: "التوصيل والمقاس",
    connectionAndSizeBody: "أكد اتجاه المدخل والمخرج والمقاس الاسمي ونوع السن أو الوصلة أو الفلنجة بعينة مطابقة أو رسم عند الحاجة.",
    materialAndFinish: "المادة والتشطيب",
    materialAndFinishBody: "أكد مادة الجسم ودرجة السبيكة ومادة الختم والتشطيب واللون؛ لا يثبت اللون الظاهر نوع المادة.",
    pressureAndDocuments: "الضغط والوثائق",
    pressureAndDocumentsBody: "حدد ضغط التشغيل والاختبار والوسط والوثائق المطلوبة مع طلب عرض السعر.",
    imageAndDrawing: "الصورة والرسم المعتمد",
    imageAndDrawingBody: "راجع الصورة الأصلية أو العينة والرسم المعتمد لتأكيد التفاصيل الصغيرة والعلامات والأبعاد قبل الإنتاج.",
    inquiryTitle: `أرسل متطلبات ${series.title.ar}`,
    inquiryBody: "أدرج التكوين والتوصيل والمواد والضغط والكمية وبلد الوجهة.",
    askOnWhatsApp: "استفسر عبر WhatsApp",
    emailSales: "راسل قسم المبيعات",
    productImagePreview: "معاينة صورة المنتج",
    closeImagePreview: "إغلاق معاينة الصورة",
    enlargedImage: "صورة توضيحية مكبرة للمنتج",
    previousProductImage: "صورة المنتج السابقة",
    nextProductImage: "صورة المنتج التالية",
    selectProductImage: "اختر صورة المنتج",
    seoTitle: `${series.title.ar} | CHUANWEI FIRE`,
    seoDescription: `${series.title.ar} مع ${count} تكوينات مصورة وبيانات توصيل أو أبعاد من الكتالوج المقدم.`
  } : {
    onThisPage: "On this page",
    title: series.title.en,
    eyebrow: `${count} directly selectable configurations from the supplied catalog`,
    lead: cabinet
      ? "Four additional cabinet configurations available in carbon steel or with an aluminium frame and steel sheet panels, with sheet thickness customizable for the order."
      : "Use the configuration images to identify the required product, then confirm connection, material and performance data with the quotation.",
    note: "The final specification and product arrangement are confirmed in the quotation and approved drawing.",
    gallery: "Configuration images",
    galleryTitle: `${count} configurations to compare`,
    galleryBody: "Open each image to compare the general arrangement. Confirm small details, threads and cast markings against an original photo, mating sample or approved drawing.",
    specifications: "Data scope",
    specificationsTitle: "Confirmed source scope and quotation checks",
    specificationsBody: "Visible connection and dimension values were transcribed from the catalog to support configuration selection. Final order specifications are confirmed in the quotation.",
    productType: "Product family",
    productTypeValue: series.title.en,
    availableConfigurations: "Available configurations",
    configurationCountValue: `${count} illustrated configurations`,
    sourceData: "Selection data source",
    sourceDataValue: `Supplied electronic catalog page ${series.page}`,
    factoryModel: "CHUANWEI factory model",
    factoryModelValue: "To be confirmed with the quotation",
    technicalStatus: "Technical data status",
    technicalStatusValue: "Preliminary catalog data; order confirmation required",
    materialOptions: "Cabinet material options",
    materialOptionsValue: "Carbon steel; or aluminium frame with steel sheet panels; customizable sheet thickness",
    availableModels: "Available configurations",
    modelsTitle: "Configurations and linked source-catalog data",
    modelsBody: "Each row shows a configuration and the connection or dimension entries visible in the supplied catalog.",
    configuration: "Configuration",
    catalogDetails: "Source connection or dimension data",
    modelsNote: "The source tables may contain repeated values or entries that require review. Confirm the final model, flow direction, thread or flange, material, pressure and drawing before production.",
    temperature: "Temperature",
    thermalElement: "Operating element",
    quotation: "Quotation confirmation",
    quotationTitle: "Confirm the configuration before production",
    quotationBody: "Send the configuration image, size, connection, material, working pressure, quantity and destination. The quotation and approved drawing lock the final supply specification.",
    connectionAndSize: "Connection and size",
    connectionAndSizeBody: "Confirm inlet/outlet direction, nominal size, thread, coupling or flange against a mating sample or drawing where required.",
    materialAndFinish: "Material and finish",
    materialAndFinishBody: "Confirm body material, alloy grade, seal material, finish and color. The visible color does not establish the material.",
    pressureAndDocuments: "Pressure and documents",
    pressureAndDocumentsBody: "State working pressure, test pressure, medium and required documents with the quotation request.",
    imageAndDrawing: "Image and approved drawing",
    imageAndDrawingBody: "Review the original photo or sample and approved drawing to confirm small details, markings and dimensions before production.",
    inquiryTitle: `Send your ${series.title.en} requirement`,
    inquiryBody: "Include the configuration, connection, material, pressure, quantity and destination country.",
    askOnWhatsApp: "Ask on WhatsApp",
    emailSales: "Email sales",
    productImagePreview: "Product image preview",
    closeImagePreview: "Close image preview",
    enlargedImage: "Enlarged product configuration illustration",
    previousProductImage: "Previous product image",
    nextProductImage: "Next product image",
    selectProductImage: "Select product image",
    seoTitle: `${series.title.en} | CHUANWEI FIRE`,
    seoDescription: `${series.title.en} with ${count} illustrated configurations and source-catalog connection or dimension data.`
  };

  for (const item of series.items) {
    const caption = item.name[locale];
    copy[item.key] = caption;
    copy[`${item.key}Alt`] = `${arabic ? "صورة توضيحية للمنتج" : "Catalog configuration illustration of"} ${caption}`;
    copy[`${item.key}Thumbnail`] = `${caption} ${arabic ? "صورة مصغرة" : "thumbnail"}`;
  }
  return copy;
}

function createProduct(series) {
  const media = { hero: series.items[0].image };
  const imageDimensions = { hero: series.items[0].imageDimensions };
  const gallery = series.items.map((item, index) => {
    const mediaKey = index === 0 ? "hero" : item.key;
    if (index > 0) {
      media[mediaKey] = item.image;
      imageDimensions[mediaKey] = item.imageDimensions;
    }
    return { media: mediaKey, alt: `${item.key}Alt`, caption: item.key, thumbnailAlt: `${item.key}Thumbnail` };
  });
  const specifications = [
    { label: "productType", value: "productTypeValue" },
    { label: "availableConfigurations", value: "configurationCountValue" },
    { label: "sourceData", value: "sourceDataValue" },
    { label: "factoryModel", value: "factoryModelValue" },
    { label: "technicalStatus", value: "technicalStatusValue" }
  ];
  if (series.page === 30) specifications.splice(3, 0, { label: "materialOptions", value: "materialOptionsValue" });
  const title = series.title.en;
  const whatsapp = new URL("https://wa.me/8617326528368");
  whatsapp.searchParams.set("text", `Hello, I need a quotation for ${title}. Configuration: [details], size/connection: [details], material: [material], working pressure: [pressure], quantity: [quantity], destination: [country].`);
  return {
    id: series.id,
    routeId: series.routeId,
    familyId: series.familyId,
    template: "product-series/documented-product.njk",
    source: {
      catalogVersion: "Quanguan electronic catalog",
      catalogPage: series.page,
      sourceCatalogPage: series.sourceCatalogPage,
      evidence: "Visible source-catalog table values plus user-authorized AI-reconstructed configuration illustrations"
    },
    publication: {
      status: source.status,
      externalRelease: source.externalRelease,
      imageRights: "user-confirmed-website-use",
      imageRightsEvidence: rightsEvidence
    },
    styles: ["css/common.css", "css/sprinkler-product.css", "css/sprinkler-product-gallery.css", "css/documented-product.css", "css/site-navigation.css"],
    configurationCards: true,
    configurationCardFullNames: true,
    shared: {},
    media,
    imageDimensions,
    heroFacts: ["configurationCountValue", "sourceDataValue", "factoryModelValue"],
    gallery,
    specifications,
    modelColumns: [
      { label: "configuration", field: "configuration", localized: true },
      { label: "catalogDetails", field: "catalogDetails", technical: true }
    ],
    models: series.items.map(item => ({
      configuration: item.key,
      catalogDetails: visibleCatalogDetails(item)
    })),
    confirmationItems: [
      { label: "connectionAndSize", body: "connectionAndSizeBody" },
      { label: "materialAndFinish", body: "materialAndFinishBody" },
      { label: "pressureAndDocuments", body: "pressureAndDocumentsBody" },
      { label: "imageAndDrawing", body: "imageAndDrawingBody" }
    ],
    inquiry: {
      whatsapp: whatsapp.href,
      email: `mailto:zhengcolin1@gmail.com?subject=${encodeURIComponent(`${title} Inquiry`)}`
    },
    validation: {
      anchors: ["gallery", "specifications", "models", "quotation"],
      requiredTechnicalValues: series.items.map(visibleCatalogDetails)
    },
    copy: { en: copyFor(series, "en"), ar: copyFor(series, "ar") }
  };
}

export const catalogExpansionProducts = source.series.map(createProduct);
export const catalogExpansionByRoute = new Map(catalogExpansionProducts.map(product => [product.routeId, product]));
export const catalogExpansionListings = familyId => catalogExpansionProducts
  .filter(product => product.familyId === familyId)
  .map(product => [product.routeId, product.copy.en.title, product.copy.ar.title, product.media.hero]);
export const catalogExpansionRoutes = Object.fromEntries(source.series.map(series => [series.routeId, {
  familyRouteId: `category:${series.familyId}`,
  en: `products/${series.folder}/${series.id}.html`,
  ar: `ar/products/${series.id}/index.html`
}]));

export default catalogExpansionProducts;
