# Fire Equipment Cabinets local catalog addition

Date: 2026-09-13

## Implemented

- Added a bilingual English/Arabic product detail page and category page for Fire Equipment Cabinets.
- Added four directly discoverable cabinet configurations to the product directory.
- Added six catalog selection dimensions in H × W × D order:
  - Solid door: 750 × 750 × 250 mm; 800 × 800 × 280 mm
  - Double windowed doors: 800 × 1000 × 250 mm
  - Single windowed door: 1100 × 800 × 300 mm; 1000 × 800 × 280 mm
  - Stacked windowed doors: 1700 × 800 × 300 mm
- Recorded the user-confirmed carbon steel option, aluminium frame with steel sheet panels, and customizable sheet thickness.
- Left material grade, requested thickness, mounting, openings, internal equipment, finish and certification/rating as quotation or drawing confirmations.
- Marked all four cabinet images as configuration illustrations pending website-use confirmation.
- Updated the directory regression to calculate page and product totals from live catalog data. The directory now contains 73 direct entries across 7 pages at 12 entries per page.

## Validation

- `npm run build` passes, including shared route, SEO, navigation, generated page, product, listing and public page validators.
- Focused Microsoft Edge browser validation passes for English and Arabic at desktop and mobile widths over HTTP and `file:///` preview.
- Catalog pagination validation passes for English and Arabic, desktop and mobile, over HTTP and `file:///`, including immediate next-page image loading and back/reload state restoration.
- The build uses a targeted Windows retry for the transient `sitemap.xml` file-handle error observed immediately after validation.

## Public release gate

Public deployment remains pending confirmation that the four cabinet reference illustrations may be used on the official website.
