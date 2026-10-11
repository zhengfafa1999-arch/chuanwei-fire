import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const directory = path.dirname(fileURLToPath(import.meta.url));
const rawSource = JSON.parse(fs.readFileSync(path.join(directory, "catalog-expansion.json"), "utf8"));
const buyerNames = JSON.parse(fs.readFileSync(path.join(directory, "catalog-buyer-names.json"), "utf8"));
const source = { ...rawSource, series: rawSource.series.map(series => ({
  ...series,
  title: buyerNames[series.id]?.title ?? series.title,
  items: series.items.map(item => ({
    ...item,
    name: buyerNames[series.id]?.items[item.key] ?? item.name,
    legacyName: item.name
  }))
})) };
const text = (en, ar) => ({ en, ar });
const rightsEvidence = "docs/release/quanguan-catalog-expansion-20260913/image-rights-confirmation.json";

function visibleCatalogDetails(item) {
  return [...new Set(item.sourceOptions.map(option => option.replace(/^[^:]+:\s*/, "").trim()).filter(option => option !== 'connection to be confirmed'))].join(" · ");
}

function copyFor(series, locale) {
  const arabic = locale === "ar";
  const count = series.items.length;
  const cabinet = series.page === 30;
  const copy = arabic ? {
    onThisPage: "في هذه الصفحة",
    title: series.title.ar,
    eyebrow: `${count} تكوينات للاختيار`,
    lead: cabinet
      ? "أربعة تكوينات إضافية للخزائن، متاحة من الفولاذ الكربوني أو بإطار ألومنيوم مع ألواح صلب، مع سماكة صاج قابلة للتخصيص حسب الطلب."
      : "استخدم صور التكوين لتحديد المنتج المطلوب، ثم أكد التوصيل والمواد وبيانات الأداء مع عرض السعر.",
    note: "صور التكوينات توضيحية. اطلب تأكيد صورة المنتج والتوصيلات وبيانات الأداء للتكوين المطلوب قبل الطلب.",
    gallery: "صور التكوينات",
    galleryTitle: `${count} تكوينات للاختيار`,
    galleryBody: "صور توضيحية لمقارنة التكوينات المتاحة. اطلب صورة المنتج والرسم الخاصين بالتكوين المطلوب لتأكيد التوصيل والأبعاد.",
    specifications: "المواصفات",
    specificationsTitle: "معلومات اختيار المنتج",
    specificationsBody: "قارن مراجع التوصيل والأبعاد لاختيار التكوين المناسب. تُؤكد مواصفات الطلب النهائية مع عرض السعر.",
    productType: "فئة المنتج",
    productTypeValue: series.title.ar,
    availableConfigurations: "التكوينات المتاحة",
    configurationCountValue: `${count} تكوينات مصورة`,
    factoryModel: "الموديل",
    materialOptions: "خيارات مادة الخزانة",
    materialOptionsValue: "فولاذ كربوني؛ أو إطار ألومنيوم مع ألواح صلب؛ سماكة الصاج قابلة للتخصيص",
    availableModels: "التكوينات المتاحة",
    modelsTitle: "التكوينات ومراجع التوصيل",
    modelsBody: "قارن التكوين ومراجع التوصيل أو الأبعاد في كل صف.",
    configuration: "التكوين",
    catalogDetails: "مراجع التوصيل أو الأبعاد",
    requestConnectionDetails: "اطلب تفاصيل التوصيل للتكوين المطلوب",
    modelsNote: "مراجع التوصيل والأبعاد تساعد على الاختيار. أكد الموديل النهائي واتجاه التدفق والسن أو الفلنجة والمادة والضغط والرسم قبل الإنتاج.",
    temperature: "درجة الحرارة",
    thermalElement: "عنصر التشغيل",
    quotation: "تأكيد عرض السعر",
    quotationTitle: "أكد التكوين قبل الإنتاج",
    quotationBody: "ابدأ بالتكوين المطلوب والكمية. أضف المقاس والتوصيل وضغط التشغيل وبلد الوجهة عند توفرها؛ سنراجع تفاصيل التوريد معك.",
    connectionAndSize: "التوصيل والمقاس",
    connectionAndSizeBody: "أكد اتجاه المدخل والمخرج والمقاس الاسمي ونوع السن أو الوصلة أو الفلنجة بعينة مطابقة أو رسم عند الحاجة.",
    materialAndFinish: "المادة والتشطيب",
    materialAndFinishBody: "أكد مادة الجسم ودرجة السبيكة ومادة الختم والتشطيب واللون؛ لا يثبت اللون الظاهر نوع المادة.",
    pressureAndDocuments: "الضغط والوثائق",
    pressureAndDocumentsBody: "حدد ضغط التشغيل والاختبار والوسط والوثائق المطلوبة مع طلب عرض السعر.",
    imageAndDrawing: "الصورة والرسم المعتمد",
    imageAndDrawingBody: "راجع الصورة الأصلية أو العينة والرسم المعتمد لتأكيد التفاصيل الصغيرة والعلامات والأبعاد قبل الإنتاج.",
    inquiryTitle: `أرسل متطلبات ${series.title.ar}`,
    inquiryBody: "ابدأ بالتكوين المطلوب والكمية. يمكن إضافة المقاس والتوصيل ومتطلبات المشروع لاحقاً.",
    askOnWhatsApp: "استفسر عبر WhatsApp",
    emailSales: "راسل قسم المبيعات",
    productImagePreview: "معاينة صورة المنتج",
    closeImagePreview: "إغلاق معاينة الصورة",
    enlargedImage: "صورة توضيحية مكبرة للمنتج",
    previousProductImage: "صورة المنتج السابقة",
    nextProductImage: "صورة المنتج التالية",
    selectProductImage: "اختر صورة المنتج",
    seoTitle: `${series.title.ar} | CHUANWEI FIRE`,
    seoDescription: `${series.title.ar} مع ${count} تكوينات مصورة ومراجع توصيل أو أبعاد للاختيار.`
  } : {
    onThisPage: "On this page",
    title: series.title.en,
    eyebrow: `${count} configurations to compare`,
    lead: cabinet
      ? "Four additional cabinet configurations available in carbon steel or with an aluminium frame and steel sheet panels, with sheet thickness customizable for the order."
      : "Use the configuration images to identify the required product, then confirm connection, material and performance data with the quotation.",
    note: "Configuration images are illustrations. Request the product photo, connection and performance details for your selected configuration before ordering.",
    gallery: "Configuration images",
    galleryTitle: `${count} configurations to compare`,
    galleryBody: "Illustrations for comparing available configurations. Request the product photo and drawing for your selected configuration to confirm connections and dimensions.",
    specifications: "Specifications",
    specificationsTitle: "Product selection details",
    specificationsBody: "Compare connection and dimension references to choose your configuration. Final order specifications are confirmed with the quotation.",
    productType: "Product family",
    productTypeValue: series.title.en,
    availableConfigurations: "Available configurations",
    configurationCountValue: `${count} illustrated configurations`,
    factoryModel: "Model",
    materialOptions: "Cabinet material options",
    materialOptionsValue: "Carbon steel; or aluminium frame with steel sheet panels; customizable sheet thickness",
    availableModels: "Available configurations",
    modelsTitle: "Configurations and connection references",
    modelsBody: "Compare the configuration and connection or dimension references in each row.",
    configuration: "Configuration",
    catalogDetails: "Connection or dimension references",
    requestConnectionDetails: "Request connection details for your selected configuration",
    modelsNote: "Connection and dimension references are selection aids. Confirm the final model, flow direction, thread or flange, material, pressure and drawing before production.",
    temperature: "Temperature",
    thermalElement: "Operating element",
    quotation: "Quotation confirmation",
    quotationTitle: "Confirm the configuration before production",
    quotationBody: "Start with the configuration and quantity. Add size, connection, working pressure and destination when available; we will review the supply details with you.",
    connectionAndSize: "Connection and size",
    connectionAndSizeBody: "Confirm inlet/outlet direction, nominal size, thread, coupling or flange against a mating sample or drawing where required.",
    materialAndFinish: "Material and finish",
    materialAndFinishBody: "Confirm body material, alloy grade, seal material, finish and color. The visible color does not establish the material.",
    pressureAndDocuments: "Pressure and documents",
    pressureAndDocumentsBody: "State working pressure, test pressure, medium and required documents with the quotation request.",
    imageAndDrawing: "Image and approved drawing",
    imageAndDrawingBody: "Review the original photo or sample and approved drawing to confirm small details, markings and dimensions before production.",
    inquiryTitle: `Send your ${series.title.en} requirement`,
    inquiryBody: "Start with the configuration and quantity. Size, connection and project requirements can follow.",
    askOnWhatsApp: "Ask on WhatsApp",
    emailSales: "Email sales",
    productImagePreview: "Product image preview",
    closeImagePreview: "Close image preview",
    enlargedImage: "Enlarged product configuration illustration",
    previousProductImage: "Previous product image",
    nextProductImage: "Next product image",
    selectProductImage: "Select product image",
    seoTitle: `${series.title.en} | CHUANWEI FIRE`,
    seoDescription: `${series.title.en} with ${count} illustrated configurations and connection or dimension references for selection.`
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
    { label: "availableConfigurations", value: "configurationCountValue" }
  ];
  if (series.page === 30) specifications.splice(2, 0, { label: "materialOptions", value: "materialOptionsValue" });
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
    searchAliasesByConfiguration: Object.fromEntries(series.items.map(item => [item.key, [item.legacyName.en, item.legacyName.ar, item.sourceReferences]])),
    shared: {},
    media,
    imageDimensions,
    heroFacts: ["configurationCountValue"],
    gallery,
    specifications,
    modelColumns: [
      { label: "configuration", field: "configuration", localized: true },
      { label: "catalogDetails", field: "catalogDetails", technical: true }
    ],
    models: series.items.map(item => ({
      configuration: item.key,
      catalogDetails: visibleCatalogDetails(item) || 'requestConnectionDetails'
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
      requiredTechnicalValues: series.items.map(visibleCatalogDetails).filter(Boolean)
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
