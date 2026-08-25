---
name: chuanwei-fire-product-page
description: Build or revise CHUANWEI FIRE export-oriented fire-protection product detail pages from Chinese model lists, confirmed specifications, real product photos, packaging photos, and OEM/ODM requirements. Use for website product galleries, international naming and units, model matrices, buyer-facing specifications, inquiry sections, and one-product-first rollout; do not use for marketplace image-only packages.
---

# CHUANWEI FIRE Product Page

Create clear English B2B product pages that help overseas buyers understand what the factory can supply and what they must specify for quotation.

## Boundaries

- Start with one product or series sample. Do not batch-change other product pages until the user approves the sample.
- Preserve the current homepage, navigation, shared forms, unrelated pages, and user changes unless the request explicitly includes them.
- Treat real product photos as the source of truth for geometry, orientation, finish, markings, and packaging.
- Preserve visible `冠亚` product markings. Present `CHUANWEI FIRE` as the website or sales brand without replacing physical product markings.
- Never publish invented approvals, test results, standards, pressure ratings, materials, dimensions, flow data, coverage, lead times, or foreign projects.
- Use confirmed data from the user as authoritative for the covered product. Mark unresolved product facts `Available on request`, `To be confirmed`, or `Subject to approved sample`.

## Related skills

- Use `chuanwei-fire-commerce` when creating or localizing raster product graphics, infographics, installation illustrations, or marketplace assets.
- Use `imagegen` only for requested raster generation or editing. Never turn generated imagery into factory, project, packing, inspection, certification, or test evidence.
- Browse authoritative sources when terminology, international unit conventions, or a referenced standard must be checked. Web findings are candidates, not SKU facts, until matched to the product or confirmed by the user.

## Workflow

1. Inspect the existing product page, shared styles, product images, model lists, spreadsheets, and relevant project structure before editing.
2. Classify every supplied image by exact product configuration. Do not infer product type from filenames alone when the visible deflector, connection, actuator, ports, or body geometry disagree.
3. Normalize the product data using [references/product-data-schema.md](references/product-data-schema.md). Separate:
   - user-confirmed facts;
   - visible facts from real photos;
   - exact-model documentary facts;
   - safe unit conversions;
   - unresolved facts;
   - conflicting facts.
4. Convert domestic catalog language into buyer-facing international names. Put domestic codes only in `Factory Reference` or `Factory Model` fields.
5. Use metric and common international equivalents together where useful: DN/inch, MPa/bar/psi, °C/°F, metric/US K-factor. Label approximate conversions.
6. Ask one consolidated question for unresolved facts that materially affect accuracy. Continue with unaffected page work while waiting.
7. Build one product-series page using the structure in [references/page-pattern.md](references/page-pattern.md). Favor real, unlabelled product photos and HTML text over text-heavy image graphics.
8. Where multiple photos exist, use one stable large image, descriptive thumbnails, previous/next controls, click-to-enlarge, and mobile swipe. Keep image frames stable across mixed aspect ratios with `object-fit: contain`.
9. Present variants as an `Available Models` matrix. Do not create a separate page for every temperature, size, finish, or orientation unless the user requests SKU-level pages.
10. Include OEM/ODM only for capabilities confirmed by the user. Keep it concise and product-specific; do not create a generated OEM process diagram.
11. Add buyer-oriented inquiry prompts and prefill the product series in WhatsApp or RFQ text.
12. Run [references/quality-gate.md](references/quality-gate.md). Test desktop and mobile layouts, image loading, gallery controls, links, and the unchanged state of pages outside scope.

## Page-writing rules

- Lead with the international product name and the product family, not the domestic code.
- Describe available configurations, not instructions telling the buyer what they must choose without showing the actual options.
- Use exact technical language: `Pendent`, `Upright`, `Horizontal Sidewall`, `Grooved`, `Flanged`, `Wafer`, `NRS`, `OS&Y`, or other terms only when the product supports them.
- Distinguish response classification, coverage classification, K-factor, temperature rating, and installation orientation. Do not merge them into one model name.
- State application scope conservatively. Project design, spacing, pressure, and installation remain subject to the exact technical data and approved design.
- Do not imply UL, FM, LPCB, CE, EN, NFPA, GOST, or another foreign approval because a product resembles an approved type.
- Avoid domestic quotation-sheet language, prices, sales slogans, and unsupported performance adjectives.

## Image rules

- Prefer this order: clean white-background hero, configurations, structural detail, finish/material evidence, temperature or selection reference, real packing.
- Default hero images should have no embedded language. Put translatable product identity and parameters in HTML.
- English infographic images may support the page but should not be the only place where critical specifications appear.
- When localizing an image, preserve confirmed values and remove options not supported by the current series.
- Label generated installation or application scenes as marketing illustrations. Never label them as project photos.

## Completion

Report the sample page path, changed files, reused and generated image paths, confirmed facts incorporated, unresolved fields, and verification performed. After approval, reuse the same components and schema for the next series while keeping each product's data and evidence separate.
