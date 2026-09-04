import { DIRECTORY_COPY, PRODUCT_FAMILIES, localizedText } from "./productDirectory.js";
import { SITE_ORIGIN, SUPPORTED_LOCALES, createListingPageRoute, resolveSiteRoute } from "./siteRoutes.js";
import { createSeoMetadata } from "./seo.js";

export default SUPPORTED_LOCALES.map((locale) => {
  const copy = DIRECTORY_COPY[locale];
  const route = createListingPageRoute("products", locale);
  const seoTitle = locale === "ar" ? "دليل منتجات مكافحة الحريق | CHUANWEI FIRE" : "Fire Protection Product Directory | CHUANWEI FIRE";
  const seoDescription = copy.directoryLead;
  const ogImage = `${SITE_ORIGIN}/og-image.jpg`;
  return {
    locale,
    copy,
    route,
    seoTitle,
    seoDescription,
    ogImage,
    seo: createSeoMetadata("products", locale, { title: seoTitle, description: seoDescription, image: ogImage }),
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
