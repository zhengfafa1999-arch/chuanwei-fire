# Project application references

Date: 2026-10-10. Local implementation; not deployed.

The user authorized adding reasonable typical product applications to the four existing project references, but said they did not participate in the projects and do not know the specific supply scope. Consequently, these are links for similar applications, not actual project supply lists. No model, quantity, installation detail or certification is inferred.

| Reference | General application links | Conditional design options |
|---|---|---|
| Country Garden | Fire sprinklers, wet alarm valves, indoor hydrants, fire department connections | Concealed sprinklers |
| Fujian Gulei Petrochemical Co., Ltd. | Outdoor hydrants, fire butterfly valves, fire gate valves, hose nozzles and couplings | Deluge valves, water mist / spray nozzles, foam / water nozzles |
| Sanming First Hospital | Fire sprinklers, wet alarm valves, waterflow switches, indoor hydrants | Quick-response and concealed sprinklers; specialist medical areas need separate selection |
| Wanda Plaza | Fire sprinklers, wet alarm valves, waterflow switches, indoor hydrants | Concealed sprinklers |

EN, AR and ZH homepages share the mapping. Each homepage has 23 product links. Arabic links resolve to Arabic pages; Chinese labels lead to existing English product pages. A concise shared note states that links are application references and final selection follows the design. Existing original project images remain byte-for-byte unchanged.

The underlying application review used primary sources for general design context only:

- https://www.vikinggroupinc.com/products/fire-sprinklers
- https://www.vikinggroupinc.com/sites/default/files/2026-04/Flyer_Healthcare%20Facilities_Web.pdf
- https://zfcxjst.yn.gov.cn/zfxxgk/zcwj/sjwj/202202/t20220211_1657975.html
- https://www.mem.gov.cn/gk/zfxxgkpt/fdzdgknr/202012/W020210430592405206255.pdf
- https://www.viking-emea.com/app/uploads/2026/02/L1.3.4.27_04022026_Rev26.1_AX1.pdf

No competitor specifications or approvals were copied to CHUANWEI products. No ESFR, dry, preaction or explosion-proof equipment is assumed from the project identity.

## Verification

`npm --ignore-scripts run build`: PASS, 185 published pages; 2305 images with alt text, 47888 internal references and 846 new-window links checked. PDF prebuild skipped. Existing qualification-template whitespace is reported by `git diff --check` in the generated homepages; no blanket diff-clean claim is made.

Generated-page checks verify all four card identities, all 69 localized product link labels and targets, local reference existence, application-note wording and unchanged original image hashes. The checker escapes HTML text before comparing labels and checks claim wording in visible text rather than HTML list tags.

Live browser/mobile rendering remains unverified: browser URL policy rejected the local file protocol. No workaround or visual pass is claimed. CSS uses four/two/one columns, wrapping text, logical alignment and 44px minimum product-link targets.

Editable sources: `site-src/lib/project-references.js`, `site-src/_includes/project-references.njk`, `site-src/_data/homePages.js`, `css/project-references.css`. Public outputs: `index.html`, `ar/index.html`, `zh/index.html`.

The release candidate is tracked in `docs/release/project-applications-20261010/package-summary.json`; the previous project-card ZIP is retained. Product PDF generation remains paused.
