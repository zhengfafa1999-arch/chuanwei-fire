# Four homepage project references

Date: 2026-10-10. Local implementation only; no deployment, push or commit.

## Content and placement

User supplied and identified four images: Country Garden; Fujian Gulei Petrochemical Co., Ltd.; Sanming First Hospital; Wanda Plaza. Added the four cards to EN/AR/ZH homepages after manufacturing and before OEM, anchored at `#projects`. Project descriptions cover only the identified project type and visible setting. No supplied products, contracts, installation dates, quantities, direct-customer relationship or project approvals are asserted.

| User mapping | English name | Type |
|---|---|---|
| Image 1 | Country Garden | Residential |
| Image 2 | Fujian Gulei Petrochemical Co., Ltd. | Industrial |
| Image 3 | Sanming First Hospital | Healthcare |
| Image 4 | Wanda Plaza | Commercial |

## Images and clarity

Source widths: 278, 300, 302 and 383 pixels. The originals remain unchanged in `source/` and public `assets/projects/`. Public images have identical source hashes; evidence is in `docs/release/project-cards-20261010/image-evidence.json`. No ownership watermark was added to third-party project imagery.

One built-in image-generation restoration was tried, using `enhancement-prompt.txt`. It altered building details, people and illegible source lettering, so it was rejected and retained only in `enhancement-drafts/country-garden-rejected.png`. No generated project image is used publicly. Further generative attempts were stopped because the source cannot support faithful detail restoration. Website CSS preserves full frames, intrinsic image aspect ratio, original text/marks, and caps image enlargement. This improves display discipline, not original resolution. High-resolution originals can replace these exact four slots later.

## Validation

- `npm --ignore-scripts run build`: PASS, 185 published pages; PDF prebuild skipped.
- Source/public project image hashes: PASS; EN/AR/ZH four-card mapping, local files, complete copy and inquiry anchor: PASS.
- Static audit: 2305 image alt attributes, 47819 internal references, 846 new-window links.
- CSS: four columns above 1040px, two up to 1040px, one up to 600px; logical text alignment, complete images, intrinsic size caps.
- Live browser/mobile checks: NOT VERIFIED. In-app browser returned a tab-session error; Chrome navigation returned ERR_CONNECTION_TIMED_OUT on local port 8769. No screenshots or browser layout pass is claimed.

## Editable source

- `site-src/lib/project-references.js`
- `site-src/_includes/project-references.njk`
- `site-src/_data/homePages.js`
- `site-src/home.njk`
- `css/project-references.css`

Public outputs: `index.html`, `ar/index.html`, `zh/index.html`. Existing generated pages and user edits are preserved; no standalone case-study page added for four compact entries.
