import { listingProductCard } from '../lib/listing-product-card.js';
import { versionedProductImage } from '../lib/public-asset-versions.js';
import { DIRECTORY_COPY, PRODUCT_FAMILIES, flatProducts, localizedText } from "./productDirectory.js";
import { SITE_ORIGIN, SUPPORTED_LOCALES, createListingPageRoute, resolveSiteRoute } from "./siteRoutes.js";
import { createSeoMetadata } from "./seo.js";
import { createSiteNavigation } from "./navigation.js";
import { CATEGORY_SEO_FOCUS } from "./categorySeoFocus.js";
import { listingInquiryDrafts } from "../lib/inquiry.js";

export default PRODUCT_FAMILIES.flatMap((family) => SUPPORTED_LOCALES.map((locale) => {
  const copy = DIRECTORY_COPY[locale];
  const route = createListingPageRoute(family.routeId, locale);
  const familyName = localizedText(family.name, locale);
  const focus = CATEGORY_SEO_FOCUS[family.routeId];
  const localizedFocus = focus?.[locale];
  const seoTitle = localizedFocus?.title ?? `${familyName} | CHUANWEI FIRE`;
  const seoDescription = localizedFocus?.description ?? localizedText(family.description, locale);
  const ogImage = new URL(versionedProductImage(family.image, `/${family.image}`), SITE_ORIGIN).href;
  return {
    locale,
    copy,
    route,
    navigation: createSiteNavigation(family.routeId, locale, route.outputPath),
    familyId: family.id,
    familyName,
    familyDescription: localizedText(family.description, locale),
    relatedCategory: family.id === 'sprinklers' ? {
      href: resolveSiteRoute('category:pressure-gauges-accessories', locale, route.outputPath).href,
      name: locale === 'ar' ? 'حلقات وأغطية وواقيات الرشاشات' : 'Sprinkler escutcheons, covers & guards'
    } : null,
    guide: localizedFocus ? { ...localizedFocus, href: resolveSiteRoute(focus.focusProduct, locale, route.outputPath).href } : null,
    seoTitle,
    seoDescription,
    heroImage: versionedProductImage(family.image, `${route.assetPrefix}${family.image}`),
    ogImage,
    seo: createSeoMetadata(family.routeId, locale, { title: seoTitle, description: seoDescription, image: ogImage }),
    products: flatProducts(family).map((product) => listingProductCard(product, locale, route, family)),
    ...listingInquiryDrafts(familyName, route.canonical, locale)
  };
}));
