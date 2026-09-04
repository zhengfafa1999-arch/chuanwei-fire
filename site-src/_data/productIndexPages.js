import { DIRECTORY_COPY, PRODUCT_FAMILIES, localizedText } from "./productDirectory.js";
import { SITE_ORIGIN, SUPPORTED_LOCALES, createListingPageRoute, resolveSiteRoute } from "./siteRoutes.js";

export default SUPPORTED_LOCALES.map((locale) => {
  const copy = DIRECTORY_COPY[locale];
  const route = createListingPageRoute("products", locale);
  return {
    locale,
    copy,
    route,
    seoTitle: locale === "ar" ? "دليل منتجات مكافحة الحريق | CHUANWEI FIRE" : "Fire Protection Product Directory | CHUANWEI FIRE",
    seoDescription: copy.directoryLead,
    ogImage: `${SITE_ORIGIN}/og-image.jpg`,
    families: PRODUCT_FAMILIES.map((family) => ({
      id: family.id,
      name: localizedText(family.name, locale),
      description: localizedText(family.description, locale),
      image: `${route.assetPrefix}${family.image}`,
      href: resolveSiteRoute(family.routeId, locale, route.outputPath).href,
      productCount: family.products.length
    }))
  };
});
