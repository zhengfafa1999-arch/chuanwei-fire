import { DIRECTORY_COPY, PRODUCT_FAMILIES, localizedText } from "./productDirectory.js";
import { SITE_ORIGIN, SITE_ROUTES, SUPPORTED_LOCALES, createListingPageRoute, resolveSiteRoute } from "./siteRoutes.js";

function productCard(product, locale, pageRoute) {
  if (!product.routeId) {
    return {
      name: localizedText(product.name, locale),
      image: `${pageRoute.assetPrefix}${product.image}`,
      href: pageRoute.contactHref,
      linkType: "inquiry"
    };
  }

  const localizedTarget = SITE_ROUTES[product.routeId].locales[locale];
  const targetLocale = localizedTarget.status === "published" ? locale : "en";
  const resolvedHref = resolveSiteRoute(product.routeId, targetLocale, pageRoute.outputPath).href;
  return {
    name: localizedText(product.name, locale),
    image: `${pageRoute.assetPrefix}${product.image}`,
    href: targetLocale === locale ? resolvedHref : `${resolvedHref}?lang=${targetLocale}`,
    linkType: targetLocale === locale ? "localized" : "english"
  };
}

export default PRODUCT_FAMILIES.flatMap((family) => SUPPORTED_LOCALES.map((locale) => {
  const copy = DIRECTORY_COPY[locale];
  const route = createListingPageRoute(family.routeId, locale);
  const familyName = localizedText(family.name, locale);
  return {
    locale,
    copy,
    route,
    familyId: family.id,
    familyName,
    familyDescription: localizedText(family.description, locale),
    seoTitle: `${familyName} | CHUANWEI FIRE`,
    seoDescription: localizedText(family.description, locale),
    heroImage: `${route.assetPrefix}${family.image}`,
    ogImage: new URL(`/${family.image}`, SITE_ORIGIN).href,
    products: family.products.map((product) => productCard(product, locale, route)),
    whatsappHref: `https://wa.me/8617326528368?text=${encodeURIComponent(locale === "ar" ? `مرحباً، أحتاج إلى عرض سعر لفئة ${familyName}. سأرسل المقاس والتوصيل والكمية والوجهة.` : `Hello, I need a quotation for ${familyName}. I will provide the size, connection, quantity and destination.`)}`
  };
}));
