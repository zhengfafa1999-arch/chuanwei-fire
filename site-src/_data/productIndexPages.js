import { listingProductCard } from '../lib/listing-product-card.js';
import { versionedProductImage } from '../lib/public-asset-versions.js';
import { DIRECTORY_COPY, PRODUCT_FAMILIES, flatProducts, localizedText } from "./productDirectory.js";
import { SITE_ORIGIN, SUPPORTED_LOCALES, createListingPageRoute, resolveSiteRoute } from "./siteRoutes.js";
import { createSeoMetadata } from "./seo.js";
import { createSiteNavigation } from "./navigation.js";
import { listingInquiryDrafts } from "../lib/inquiry.js";
import { PRODUCT_BROWSE_GROUPS } from './productBrowseGroups.js';

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
    ...listingInquiryDrafts(copy.directoryEyebrow, route.canonical, locale),
    navigation: createSiteNavigation("products", locale, route.outputPath),
    seoTitle,
    seoDescription,
    ogImage,
    seo: createSeoMetadata("products", locale, { title: seoTitle, description: seoDescription, image: ogImage }),
    browseGroups: PRODUCT_BROWSE_GROUPS.map(group => ({
      id: group.id,
      name: localizedText(group.name, locale),
      members: group.families.map(family => family.id).join(' '),
      families: group.families.map(family => ({id: family.id, name: localizedText(family.name, locale)}))
    })),
    families: PRODUCT_FAMILIES.map((family) => ({
      id: family.id,
      name: localizedText(family.name, locale),
      description: localizedText(family.description, locale),
      image: versionedProductImage(family.image, `${route.assetPrefix}${family.image}`),
      href: resolveSiteRoute(family.routeId, locale, route.outputPath).href,
      productCount: flatProducts(family).length,
      products: flatProducts(family).map(product => listingProductCard(product, locale, route, family))
    }))
  };
});
