# Multilingual product-page architecture

## Goal

Product facts are maintained once, while localized wording is maintained once per language. The build then creates the static HTML files used by the existing website and Nginx deployment.

## Source of truth

- Confirmed technical data and model rows: `site-src/_data/products/`
- Shared interface labels by language: `site-src/_data/locales/`
- Product-specific localized copy: `site-src/content/products/<language>/`
- Shared product template: `site-src/product-detail.njk`
- Generated website files: the normal paths under `products/` and `ar/products/`

Generated HTML files contain a `GENERATED FILE` comment. Do not edit those files directly because the next build replaces them.

## Current pilot

The wet alarm check valve assembly is the first migrated product. One confirmed product record generates:

- English: `products/消防阀/wet-alarm-check-valve-assemblies.html`
- Arabic: `ar/products/wet-alarm-check-valve/index.html`

The same technical facts, model list and real product images are reused in both languages. Only market-facing prose, labels, alt text and inquiry wording are localized.

## Normal update workflow

1. Update the product JSON once when a technical fact, model or image changes.
2. Update only the affected language copy when wording changes.
3. Run `npm run build`.
4. Review the generated pages and commit both the source files and generated HTML.

The build first validates confirmed facts and images. It then generates pages and checks language direction, canonical and alternate-language links, required model rows, excluded models and local file references.

## Adding a language

Add one locale file and one localized content file for each migrated product. The technical product record is not duplicated. Extend the route configuration in `site-src/_data/catalog.js`, then build.

## Adding another product

Create its confirmed product data and localized copy, then add it to the catalog builder. Reuse the shared template where the page structure matches; create a dedicated template only when the product family genuinely requires a different information layout.

## Evidence rule

Confirmed facts, unresolved fields and real product media remain explicit in the source data. Unresolved installation orientation and water-flow direction are presented as items requiring approved product documentation; they are not guessed during translation or generation.
