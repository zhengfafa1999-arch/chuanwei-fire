import { thumbnailFor } from '../_data/catalogThumbnails.js';
import { localizedText, productSuffix } from '../_data/productDirectory.js';
import { SITE_ROUTES, resolveSiteRoute } from '../_data/siteRoutes.js';
import { listingInquiryDrafts } from './inquiry.js';

export function listingProductCard(product, locale, route, family) {
  const name = localizedText(product.name, locale);
  const inquiry = Boolean(product.inquiry);
  const target = product.routeId ? SITE_ROUTES[product.routeId] : null;
  if (!target && !inquiry) throw new Error(`Missing product route: ${name}`);
  const targetLocale = target?.locales[locale]?.status === 'published' ? locale : 'en';
  const detailHref = target ? resolveSiteRoute(product.routeId, targetLocale, route.outputPath).href : null;
  const configurationHref = item => detailHref + (item.suffix || '#' + item.anchor);
  return {
    name,
    seriesId: product.seriesId,
    inquiry,
    imageLabel: product.imageLabel,
    description: product.description ? localizedText(product.description, locale) : '',
    imageCaption: product.imageCaption ? localizedText(product.imageCaption, locale) : '',
    image: product.image ? `${route.assetPrefix}${thumbnailFor(product.image)}` : null,
    href: inquiry ? listingInquiryDrafts(name, route.canonical, locale).whatsappHref : detailHref + productSuffix(product),
    linkType: inquiry ? 'inquiry' : targetLocale === locale ? 'localized' : 'english',
    configurations: (product.configurations || []).map(item => ({name: localizedText(item.name, locale), href: configurationHref(item)})),
    relatedConfigurations: (product.relatedConfigurations || []).map(item => ({
      name: localizedText(item.name, locale),
      searchText: [family.name.en, family.name.ar, item.searchTerms].join(' '),
      href: configurationHref(item),
      image: item.image ? `${route.assetPrefix}${thumbnailFor(item.image)}` : null,
      imageCaption: item.imageCaption ? localizedText(item.imageCaption, locale) : ''
    })),
    searchText: [product.name.en, product.name.ar, product.name.zh, family.name.en, family.name.ar, product.searchTerms,
      ...(product.configurations || []).flatMap(item => [item.name.en, item.name.ar])].filter(Boolean).join(' ')
  };
}
