import {thumbnailFor} from './catalogThumbnails.js';
import { DIRECTORY_COPY, PRODUCT_FAMILIES, flatProducts, productSuffix, localizedText } from "./productDirectory.js";
import { SITE_ORIGIN, SITE_ROUTES, SUPPORTED_LOCALES, createListingPageRoute, resolveSiteRoute } from "./siteRoutes.js";
import { createSeoMetadata } from "./seo.js";
import { createSiteNavigation } from "./navigation.js";
import { CATEGORY_SEO_FOCUS } from "./categorySeoFocus.js";

function productCard(product, locale, pageRoute) {
  if (!product.routeId) {
    return {
      name: localizedText(product.name, locale),
      image: `${pageRoute.assetPrefix}${thumbnailFor(product.image)}`,
      href: pageRoute.contactHref,
      linkType: "inquiry"
    };
  }

  const localizedTarget = SITE_ROUTES[product.routeId].locales[locale];
  const targetLocale = localizedTarget.status === "published" ? locale : "en";
  const resolvedHref = resolveSiteRoute(product.routeId, targetLocale, pageRoute.outputPath).href;
  return {
    name: localizedText(product.name, locale),
    image: `${pageRoute.assetPrefix}${thumbnailFor(product.image)}`,
    href: resolvedHref + productSuffix(product),
    configurations: product.configurations.map(item => ({name: localizedText(item.name, locale), href: resolvedHref + '#' + item.anchor})),
    linkType: targetLocale === locale ? "localized" : "english"
  };
}

export default PRODUCT_FAMILIES.flatMap((family) => SUPPORTED_LOCALES.map((locale) => {
  const copy = DIRECTORY_COPY[locale];
  const route = createListingPageRoute(family.routeId, locale);
  const familyName = localizedText(family.name, locale);
  const focus = CATEGORY_SEO_FOCUS[family.routeId];
  const localizedFocus = focus?.[locale];
  const seoTitle = localizedFocus?.title ?? `${familyName} | CHUANWEI FIRE`;
  const seoDescription = localizedFocus?.description ?? localizedText(family.description, locale);
  const ogImage = new URL(`/${family.image}`, SITE_ORIGIN).href;
  return {
    locale,
    copy,
    route,
    navigation: createSiteNavigation(family.routeId, locale, route.outputPath),
    familyId: family.id,
    familyName,
    familyDescription: localizedText(family.description, locale),
    guide: localizedFocus ? { ...localizedFocus, href: resolveSiteRoute(focus.focusProduct, locale, route.outputPath).href } : null,
    seoTitle,
    seoDescription,
    heroImage: `${route.assetPrefix}${family.image}`,
    ogImage,
    seo: createSeoMetadata(family.routeId, locale, { title: seoTitle, description: seoDescription, image: ogImage }),
    products: flatProducts(family).map((product) => productCard(product, locale, route)),
    whatsappHref: `https://wa.me/8617326528368?text=${encodeURIComponent(locale === "ar" ? `مرحباً، أحتاج إلى عرض سعر لفئة ${familyName}. سأرسل المقاس والتوصيل والكمية والوجهة.` : `Hello, I need a quotation for ${familyName}. I will provide the size, connection, quantity and destination.`)}`
  };
}));
