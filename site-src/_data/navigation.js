import { SITE_ROUTES, assetPrefixFor, resolveSiteRoute } from "./siteRoutes.js";

const PRIMARY_ROUTE_IDS = ["home", "products", "about", "downloads", "contact"];
const LANGUAGE_ORDER = ["en", "zh", "ar"];

const COPY = {
  en: {
    brandTagline: "Fire protection equipment manufacturer",
    menu: "Open main navigation",
    primaryLabel: "Main navigation",
    languageLabel: "Language selector",
    quote: "Request a quote",
    nav: { home: "Home", products: "Products", about: "About", downloads: "Catalog & Files", contact: "Contact" },
    languages: { en: "EN", zh: "中", ar: "العربية" },
    languageNames: { en: "English", zh: "中文", ar: "العربية" },
    fallback: "Product page not translated; opens the matching category",
    backToCategory: "Back to product category",
    productDirectory: "Product directory",
    companyWebsite: "Company website"
  },
  zh: {
    brandTagline: "消防设备制造商",
    menu: "打开主导航",
    primaryLabel: "主导航",
    languageLabel: "语言选择",
    quote: "获取报价",
    nav: { home: "首页", products: "产品", about: "关于我们", downloads: "目录与文件", contact: "联系我们" },
    languages: { en: "EN", zh: "中", ar: "العربية" },
    languageNames: { en: "English", zh: "中文", ar: "العربية" },
    fallback: "该页面尚未翻译，将打开对应产品分类",
    backToCategory: "返回产品分类",
    productDirectory: "产品总目录",
    companyWebsite: "公司网站"
  },
  ar: {
    brandTagline: "تصنيع معدات مكافحة الحريق",
    menu: "فتح القائمة الرئيسية",
    primaryLabel: "التنقل الرئيسي",
    languageLabel: "اختيار اللغة",
    quote: "اطلب عرض سعر",
    nav: { home: "الرئيسية", products: "المنتجات", about: "عن الشركة", downloads: "الكتالوج والملفات", contact: "تواصل معنا" },
    languages: { en: "EN", zh: "中", ar: "العربية" },
    languageNames: { en: "English", zh: "中文", ar: "العربية" },
    fallback: "صفحة المنتج غير مترجمة؛ يفتح قسم المنتجات المطابق",
    backToCategory: "العودة إلى فئة المنتج",
    productDirectory: "دليل المنتجات",
    companyWebsite: "موقع الشركة"
  }
};

function routeLocale(routeId, locale) {
  return SITE_ROUTES[routeId].locales[locale] ? locale : "en";
}

function isPrimaryCurrent(routeId, primaryRouteId) {
  if (routeId === primaryRouteId) return true;
  return primaryRouteId === "products" && ["category", "product"].includes(SITE_ROUTES[routeId].kind);
}

export function createSiteNavigation(routeId, locale, outputPath) {
  const definition = SITE_ROUTES[routeId];
  if (!definition) throw new Error(`Cannot create navigation for unknown route '${routeId}'.`);
  const copy = COPY[locale] ?? COPY.en;
  const primaryItems = PRIMARY_ROUTE_IDS.map((primaryRouteId) => {
    const targetLocale = routeLocale(primaryRouteId, locale);
    return {
      id: primaryRouteId,
      label: copy.nav[primaryRouteId],
      href: resolveSiteRoute(primaryRouteId, targetLocale, outputPath).href,
      current: isPrimaryCurrent(routeId, primaryRouteId),
      languageStatus: targetLocale === locale ? "localized" : "fallback"
    };
  });
  const languageItems = LANGUAGE_ORDER
    .filter((language) => definition.locales[language])
    .map((language) => {
      const target = definition.locales[language];
      return {
        language,
        lang: language === "zh" ? "zh-CN" : language,
        dir: language === "ar" ? "rtl" : "ltr",
        label: copy.languages[language],
        name: copy.languageNames[language],
        href: resolveSiteRoute(routeId, language, outputPath).href,
        status: target.status,
        current: language === locale,
        title: target.status === "fallback" ? `${copy.languageNames[language]} — ${copy.fallback}` : copy.languageNames[language]
      };
    });
  return {
    routeId,
    locale,
    kind: definition.kind,
    assetPrefix: assetPrefixFor(outputPath),
    brandTagline: copy.brandTagline,
    menu: copy.menu,
    primaryLabel: copy.primaryLabel,
    languageLabel: copy.languageLabel,
    quote: copy.quote,
    primaryItems,
    languageItems,
    homeHref: primaryItems.find((item) => item.id === "home").href,
    productsHref: primaryItems.find((item) => item.id === "products").href,
    categoryHref: definition.category ? resolveSiteRoute(definition.category, routeLocale(definition.category, locale), outputPath).href : null,
    labels: {
      backToCategory: copy.backToCategory,
      productDirectory: copy.productDirectory,
      companyWebsite: copy.companyWebsite
    }
  };
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function renderSiteHeader(navigation) {
  const primaryItems = navigation.primaryItems.map((item) => `      <a href="${escapeHtml(item.href)}" data-site-nav-item="${item.id}"${item.current ? ' aria-current="page"' : ""}>${escapeHtml(item.label)}</a>`).join("\n");
  const languageItems = navigation.languageItems.map((item) => `      <a href="${escapeHtml(item.href)}" lang="${item.lang}" dir="${item.dir}" data-site-language-choice="${item.language}" data-language-status="${item.status}" title="${escapeHtml(item.title)}"${item.current ? ' aria-current="true"' : ""}>${escapeHtml(item.label)}</a>`).join("\n");
  const quote = navigation.kind === "product" ? `\n    <a class="global-header__quote" href="#inquiry">${escapeHtml(navigation.quote)}</a>` : "";
  return `<header class="global-header" data-global-header>
  <div class="global-header__inner">
    <a class="global-brand" href="${escapeHtml(navigation.homeHref)}" aria-label="CHUANWEI FIRE home"><img src="${escapeHtml(navigation.assetPrefix)}apple-touch-icon.png" alt="CHUANWEI FIRE" width="40" height="40"><span><strong>CHUANWEI FIRE</strong><small>${escapeHtml(navigation.brandTagline)}</small></span></a>
    <button class="global-menu" type="button" data-nav-toggle aria-expanded="false" aria-controls="site-primary-navigation" aria-label="${escapeHtml(navigation.menu)}">☰</button>
    <nav class="global-nav" id="site-primary-navigation" data-site-nav aria-label="${escapeHtml(navigation.primaryLabel)}">
${primaryItems}
    </nav>
    <div class="global-languages" aria-label="${escapeHtml(navigation.languageLabel)}">
${languageItems}
    </div>${quote}
  </div>
</header>`;
}

export function renderProductFooter(navigation) {
  if (!navigation.categoryHref) throw new Error(`Product route '${navigation.routeId}' has no category return link.`);
  return `<footer class="pdp-footer" data-global-product-footer><div class="pdp-container pdp-footer__in"><span>© 2026 CHUANWEI FIRE</span><span><a href="${escapeHtml(navigation.categoryHref)}">${escapeHtml(navigation.labels.backToCategory)}</a> · <a href="${escapeHtml(navigation.productsHref)}">${escapeHtml(navigation.labels.productDirectory)}</a> · <a href="${escapeHtml(navigation.homeHref)}">${escapeHtml(navigation.labels.companyWebsite)}</a></span></div></footer>`;
}

