# Product data schema

Use the fields that apply to the product. Do not invent values to fill every field.

## Identity

| Field | Use |
|---|---|
| International product name | Primary buyer-facing name |
| Product family | Shared page or catalog category |
| Configurations | Actual available styles or connection types |
| Factory reference | Domestic production/order matching code |

## Technical selection

| Field | Preferred expression |
|---|---|
| Nominal size | `DN15 / ½ in` |
| K-factor | `K5.6 US / K80 metric` |
| Pressure | `1.2 MPa / 12 bar / approx. 175 psi` |
| Temperature | `68°C / 155°F` |
| Connection | Confirmed BSP, NPT, flange, groove, wafer, or customer drawing |
| Material | User-confirmed product material; do not infer from color |
| Finish | Confirmed finish options |
| Response or operation | Exact applicable classification, without inferred performance numbers |
| Weight | Range with `depending on size and configuration` when model-dependent |
| Packing | Quantity and actual packaging method |
| Standard/approval | Exact evidence scope or a conservative unresolved label |

## Commercial configuration

- Product marking or customer logo
- Customer model marking
- Finish and color options
- Connection or thread to approved drawing/sample
- Labels, cartons, and shipping marks
- Sample confirmation

## Evidence states

- `Confirmed`: explicitly supplied or confirmed by the user.
- `Visible`: directly observable in an unedited real product photo.
- `Documented`: supported by a matching product document.
- `Converted`: deterministic conversion from a confirmed value; label approximate results.
- `Candidate`: researched terminology or standard information not yet tied to the SKU.
- `Unresolved`: use a conservative placeholder or ask the user.
- `Conflict`: do not publish until resolved. Retire conflicting old artwork or copy.

## Variant matrix

Use columns appropriate to the family, normally:

`International configuration | Nominal size | International performance value | Available options | Finish/connection | Factory reference`

For sprinklers, include orientation, DN/inch, US/metric K-factor, temperature options, finish, and factory reference. For valves, include valve type, connection, DN/inch or NPS, pressure class, operation, and factory reference. For hoses, reels, nozzles, couplings, or hydrants, choose selection fields buyers actually specify.
