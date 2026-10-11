import { versionedProductImage } from '../lib/public-asset-versions.js';
import {thumbnailFor} from './catalogThumbnails.js';
import { DIRECTORY_COPY, PRODUCT_FAMILIES, flatProducts, productSuffix, localizedText } from "./productDirectory.js";
import { SITE_ORIGIN, SUPPORTED_LOCALES, createListingPageRoute, resolveSiteRoute } from "./siteRoutes.js";
import { createSeoMetadata } from "./seo.js";
import { createSiteNavigation } from "./navigation.js";
import { listingInquiryDrafts } from "../lib/inquiry.js";

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
    families: PRODUCT_FAMILIES.map((family) => ({
      id: family.id,
      name: localizedText(family.name, locale),
      description: localizedText(family.description, locale),
      image: versionedProductImage(family.image, `${route.assetPrefix}${family.image}`),
      href: resolveSiteRoute(family.routeId, locale, route.outputPath).href,
      productCount: family.products.length,
      products: flatProducts(family).map(product => ({
        name: localizedText(product.name, locale),
        image: product.image ? `${route.assetPrefix}${thumbnailFor(product.image)}` : null,
        href: resolveSiteRoute(product.routeId, locale, route.outputPath).href + productSuffix(product),
        configurations: product.configurations.map(item => ({name: localizedText(item.name, locale), href: resolveSiteRoute(product.routeId, locale, route.outputPath).href + '#' + item.anchor})),
        relatedConfigurations: (product.relatedConfigurations || []).map(item => ({
          name: localizedText(item.name, locale), searchText: [family.name.en, family.name.ar, item.searchTerms].join(' '),
          href: resolveSiteRoute(product.routeId, locale, route.outputPath).href + '#' + item.anchor,
          image: item.image ? `${route.assetPrefix}${thumbnailFor(item.image)}` : null,
          imageCaption: item.imageCaption ? localizedText(item.imageCaption, locale) : ''
        })),
        searchText: [product.name.en, product.name.ar, family.name.en, family.name.ar, product.searchTerms, ...product.configurations.flatMap(item => [item.name.en,item.name.ar])].join(' ')
      }))
    }))
  };
});
