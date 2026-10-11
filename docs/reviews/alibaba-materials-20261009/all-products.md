# 阿里国际站全系列资料索引

采集日期：2026-10-09。以下是内部资料汇编，不是已批准的官网文案。

全部产品文件路径见 files.csv；可检索文案、参数表、证据记录及 PDF/XLSX 提取内容见 source-text.jsonl；清单记录见 packages.json。保留原文中的 pending/blocked 等限制。

软件依赖和执行脚本排除；图片只建立路径和尺寸索引，未逐张完成技术审核。PDF 扫描页未作 OCR。

## 001 16K50-16K65-室内消火栓阀

系列分组：室内消火栓及栓阀；收录文件：28。

资料目录：[16K50-16K65-室内消火栓阀](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/16K50-16K65-室内消火栓阀>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "models": [
    "16K50",
    "16K65"
  ],
  "verified_facts": {
    "visible": [
      "Red valve body",
      "Manual handwheel",
      "Side quick-coupling outlet",
      "Visible 16K50 and 16K65 cast markings",
      "Visible KY66 marking on the 16K65 outlet coupling"
    ],
    "manufacturer_confirmed_2026_08_27": [
      "Nominal sizes DN50 (2 in) and DN65 (2 1/2 in)",
      "Working pressure 1.6 MPa",
      "Strength test pressure 2.4 MPa",
      "Inlet pressure range 0.4-1.0 MPa",
      "Outlet pressure range 0.20-0.49 MPa",
      "Rated flow at least 5.0 L/s",
      "Ductile iron body",
      "H59-1 brass stem and seat",
      "Red powder-coated finish",
      "Service media: clean water or water-foam mixture",
      "Approximate mass: 16K50 1.30 kg; 16K65 1.65 kg",
      "Russian-style aluminum alloy quick-coupling outlet"
    ]
  },
  "blocked_assets": [
    {
      "asset_type_zh": "尺寸连接图",
      "reason": "No exact-model dimensioned drawing or verified measurements",
      "required_to_release": "16K50 and 16K65 drawings or manufacturer-confirmed H, L, inlet/outlet geometry and units"
    },
    {
      "asset_type_zh": "认证文件图",
      "reason": "No current certificate or test report covering both exact export SKUs",
      "required_to_release": "Certificate/report, holder, issuer, scope, standard/version and validity period"
    },
    {
      "asset_type_zh": "包装装箱图",
      "reason": "No real packaging photograph or carton data",
      "required_to_release": "Factory-owned packaging photos, quantity per carton, net/gross weight and carton dimensions"
    },
    {
      "asset_type_zh": "安装说明图",
      "reason": "Inlet thread designation, confirmed orientation, mating connection and clearance are incomplete",
      "required_to_release": "Exact inlet thread standard, outlet coupling standard/dimensions, installation orientation and project environment"
    }
  ]
}
```

参数与证据文档：

- [copy\evidence-ledger.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/16K50-16K65-室内消火栓阀/copy/evidence-ledger.md>)

## 002 1IN-PN16-黄铜角式消防栓阀

系列分组：室内消火栓及栓阀；收录文件：20。

资料目录：[1IN-PN16-黄铜角式消防栓阀](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/1IN-PN16-黄铜角式消防栓阀>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "facts": [
    {
      "field": "nominal_size",
      "value": "1 in",
      "grade": "A",
      "basis": "User confirmation in archived content sheet",
      "applicability": "market-neutral confirmed"
    },
    {
      "field": "pressure_designation",
      "value": "PN 16",
      "grade": "A",
      "basis": "User confirmation and visible body marking",
      "applicability": "market-neutral confirmed",
      "note": "Designation only; no working-pressure or EN/ISO compliance claim"
    },
    {
      "field": "body_material",
      "value": "Brass",
      "grade": "A",
      "basis": "User confirmation in archived content sheet",
      "applicability": "market-neutral confirmed"
    },
    {
      "field": "configuration",
      "value": "Angle",
      "grade": "A",
      "basis": "User confirmation and product photos",
      "applicability": "market-neutral confirmed"
    },
    {
      "field": "operation",
      "value": "Handwheel",
      "grade": "A",
      "basis": "Product photos",
      "applicability": "market-neutral confirmed"
    },
    {
      "field": "threaded_ends",
      "value": "External threads visible",
      "grade": "A",
      "basis": "Product photos",
      "applicability": "market-neutral confirmed"
    }
  ],
  "blocked_assets": [
    {
      "type": "dimension drawing",
      "need": "Exact SKU dimensioned drawing or verified measurements"
    },
    {
      "type": "thread standard / installation",
      "need": "Exact port/thread standard and approved installation configuration"
    },
    {
      "type": "certification / standard compliance",
      "need": "Current exact SKU certificate or test report and target-market scope"
    },
    {
      "type": "packaging",
      "need": "Actual packaging photos and data"
    }
  ]
}
```

## 003 2.5NH-消防水带接头

系列分组：消防水带及接口；收录文件：17。

资料目录：[2.5NH-消防水带接头](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/2.5NH-消防水带接头>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "evidence_summary": {
    "grade_a": [
      "user-confirmed product category",
      "user-confirmed hard aluminum body",
      "visible 2.5-inch NH marking",
      "three source photographs"
    ],
    "unmapped_omitted": [
      "thread pitch",
      "hose bowl size",
      "pressure",
      "alloy grade",
      "coating",
      "certification",
      "standard compliance",
      "packaging"
    ]
  },
  "blocked_assets": [
    {
      "type": "尺寸连接图",
      "reason": "requires exact-SKU drawing or measured dimensions"
    },
    {
      "type": "压力性能图",
      "reason": "requires exact-SKU manufacturer data or test record"
    },
    {
      "type": "认证文件图",
      "reason": "requires a valid exact-SKU certificate or approval listing"
    },
    {
      "type": "包装装箱图",
      "reason": "requires authentic product packaging photography"
    },
    {
      "type": "安装说明图",
      "reason": "requires verified hose bowl size, assembly method and tooling"
    }
  ]
}
```

参数与证据文档：

- [copy\出口参数交叉核对.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/2.5NH-消防水带接头/copy/出口参数交叉核对.md>)

## 004 2IN-2.5IN系列-杠杆式消防水枪

系列分组：消防水枪；收录文件：24。

资料目录：[2IN-2.5IN系列-杠杆式消防水枪](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/2IN-2.5IN系列-杠杆式消防水枪>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "exact_factory_model": null,
  "confirmed_specifications": [
    {
      "field": "available_size",
      "source_value": "2 in / 2.5 in",
      "model_coverage": "both",
      "evidence_grade": "A — user-confirmed manufacturer record",
      "market_applicability": "market-neutral confirmed",
      "publication_status": "publishable"
    },
    {
      "field": "body_material",
      "source_value": "aluminium alloy",
      "model_coverage": "both",
      "evidence_grade": "A — user-confirmed manufacturer record",
      "market_applicability": "market-neutral confirmed",
      "publication_status": "publishable"
    },
    {
      "field": "grip_material",
      "source_value": "rubber",
      "model_coverage": "both",
      "evidence_grade": "A — user-confirmed manufacturer record",
      "market_applicability": "market-neutral confirmed",
      "publication_status": "publishable"
    },
    {
      "field": "inlet_connection",
      "source_value": "BS 336",
      "model_coverage": "both",
      "evidence_grade": "A — user-confirmed manufacturer record",
      "market_applicability": "market-neutral confirmed configuration; not a certification claim",
      "publication_status": "publishable"
    },
    {
      "field": "working_pressure",
      "source_value": "0.7 MPa",
      "display_value": "0.7 MPa | 7 bar | 101.5 psi",
      "conversion_formula": "MPa × 10 = bar; MPa × 145.0377377 = psi",
      "model_coverage": "both",
      "evidence_grade": "A — user-confirmed manufacturer record",
      "market_applicability": "market-neutral confirmed",
      "publication_status": "publishable"
    },
    {
      "field": "flow_rate",
      "source_value": "200–250 L/min",
      "display_value": "200–250 L/min | 52.8–66.0 US gpm",
      "conversion_formula": "L/min × 0.264172052 = US gpm",
      "model_coverage": "both",
      "evidence_grade": "A — user-confirmed manufacturer record",
      "market_applicability": "market-neutral confirmed; not associated with an unverified test pressure",
      "publication_status": "publishable"
    },
    {
      "field": "nozzle_orifice",
      "source_value": "9 / 12 mm",
      "display_value": "9 / 12 mm | 0.354 / 0.472 in",
      "conversion_formula": "mm ÷ 25.4 = in",
      "model_coverage": "both",
      "evidence_grade": "A — user-confirmed manufacturer record",
      "market_applicability": "market-neutral confirmed",
      "publication_status": "publishable"
    },
    {
      "field": "overall_length",
      "source_value": "400 mm",
      "display_value": "400 mm | 15.75 in",
      "conversion_formula": "mm ÷ 25.4 = in",
      "model_coverage": "2-inch only",
      "evidence_grade": "A — user-confirmed manufacturer record",
      "market_applicability": "market-neutral confirmed",
      "publication_status": "publishable only in 2-inch module"
    },
    {
      "field": "net_weight",
      "source_value": "1.132 kg",
      "display_value": "1.132 kg | 2.50 lb",
      "conversion_formula": "kg × 2.20462262 = lb",
      "model_coverage": "2-inch only",
      "evidence_grade": "A — user-confirmed manufacturer record",
      "market_applicability": "market-neutral confirmed",
      "publication_status": "publishable only in 2-inch module"
    },
    {
      "field": "water_pattern",
      "source_value": "straight jet",
      "model_coverage": "2-inch only",
      "evidence_grade": "A — user-confirmed manufacturer record",
      "market_applicability": "market-neutral confirmed",
      "publication_status": "publishable only in 2-inch module"
    }
  ],
  "blocked_modules": [
    {
      "asset_type_zh": "认证文件图",
      "blocked_reason": "No exact export-SKU international certificate or authorized mark"
    },
    {
      "asset_type_zh": "尺寸连接图",
      "blocked_reason": "No matching dimensioned drawing; only 2-inch overall length is confirmed"
    },
    {
      "asset_type_zh": "安装说明图",
      "blocked_reason": "No verified mating connection, hose size, orientation, clearance, or support record"
    },
    {
      "asset_type_zh": "包装装箱图",
      "blocked_reason": "No real packaging photographs or packing data"
    }
  ]
}
```

参数与证据文档：

- [copy\evidence-and-standards.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/2IN-2.5IN系列-杠杆式消防水枪/copy/evidence-and-standards.md>)

## 005 2P5-BSP-直流喷雾水枪

系列分组：消防水枪；收录文件：18。

资料目录：[2P5-BSP-直流喷雾水枪](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/2P5-BSP-直流喷雾水枪>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "formal_model": null,
  "evidence": {
    "grade": "A-user-confirmation plus A-visible-product-photography",
    "market_applicability": "market-neutral confirmed, except exact BSP thread mapping remains unmapped",
    "source_archive": "D:/work/codex/yunying/outputs/1688商品图/直流喷雾水枪-2.5英寸-BSP",
    "source_images": [
      "source/01_用户主图原片.jpg",
      "source/02_出水口原片.jpg",
      "source/03_进水口原片.jpg"
    ]
  },
  "blocked_assets": [
    {
      "asset_type": "certification image",
      "reason": "no exact-SKU certificate or test report"
    },
    {
      "asset_type": "pressure/flow/range performance image",
      "reason": "no exact-SKU technical data or test evidence"
    },
    {
      "asset_type": "connected installation image",
      "reason": "BSPP/BSPT and mating connection are not confirmed"
    },
    {
      "asset_type": "packaging image",
      "reason": "no real packaging photo or packing quantity"
    },
    {
      "asset_type": "model comparison image",
      "reason": "no confirmed variant matrix"
    }
  ],
  "factual_review_status": "passed for confirmed facts; standard/certification claims intentionally withheld"
}
```

参数与证据文档：

- [copy\02_国际标准与参数映射说明.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/2P5-BSP-直流喷雾水枪/copy/02_国际标准与参数映射说明.md>)

## 006 51-66系列-俄式直流水枪

系列分组：消防水枪；收录文件：28。

资料目录：[51-66系列-俄式直流水枪](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/51-66系列-俄式直流水枪>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "series_model": "51-66",
  "verified_facts": [
    {
      "field": "material",
      "value": "Aluminum alloy",
      "models": [
        "51",
        "66"
      ],
      "evidence_grade": "A",
      "applicability": "market-neutral confirmed",
      "source": "source/已确认参数-20260911.json"
    },
    {
      "field": "working_pressure",
      "value": "1.6 MPa",
      "models": [
        "51",
        "66"
      ],
      "evidence_grade": "A",
      "applicability": "market-neutral confirmed",
      "source": "source/已确认参数-20260911.json"
    },
    {
      "field": "rated_spray_pressure",
      "value": "0.35 MPa",
      "models": [
        "51",
        "66"
      ],
      "evidence_grade": "A",
      "applicability": "market-neutral confirmed",
      "source": "source/已确认参数-20260911.json"
    },
    {
      "field": "flow_rate",
      "value": "5 L/s",
      "models": [
        "51"
      ],
      "evidence_grade": "A",
      "applicability": "market-neutral confirmed",
      "source": "source/已确认参数-20260911.json"
    },
    {
      "field": "flow_rate",
      "value": "7.5 L/s",
      "models": [
        "66"
      ],
      "evidence_grade": "A",
      "applicability": "market-neutral confirmed",
      "source": "source/已确认参数-20260911.json"
    },
    {
      "field": "outlet_diameter",
      "value": "16 mm",
      "models": [
        "51"
      ],
      "evidence_grade": "A",
      "applicability": "market-neutral confirmed",
      "source": "source/已确认参数-20260911.json"
    },
    {
      "field": "outlet_diameter",
      "value": "19 mm",
      "models": [
        "66"
      ],
      "evidence_grade": "A",
      "applicability": "market-neutral confirmed",
      "source": "source/已确认参数-20260911.json"
    },
    {
      "field": "overall_length",
      "value": "255 mm",
      "models": [
        "51"
      ],
      "evidence_grade": "A",
      "applicability": "market-neutral confirmed",
      "source": "source/已确认参数-20260911.json"
    },
    {
      "field": "overall_length",
      "value": "277 mm",
      "models": [
        "66"
      ],
      "evidence_grade": "A",
      "applicability": "market-neutral confirmed",
      "source": "source/已确认参数-20260911.json"
    },
    {
      "field": "finish_options",
      "value": "Water-polished / Coated finish",
      "models": [
        "51",
        "66"
      ],
      "evidence_grade": "A",
      "applicability": "market-neutral confirmed",
      "source": "User confirmation and matching real photos"
    }
  ],
  "blocked_or_omitted_modules": [
    {
      "asset_type": "installation/application image",
      "status": "blocked",
      "reason": "Connection standard, confirmed mating hose/interface, operating orientation and application environment are not established."
    },
    {
      "asset_type": "certification/test image",
      "status": "blocked",
      "reason": "No exact-SKU export-market certificate or report supplied."
    },
    {
      "asset_type": "packaging image",
      "status": "blocked",
      "reason": "No real packaging photo, packing quantity, dimensions or weight supplied."
    },
    {
      "asset_type": "range/performance evidence image",
      "status": "blocked",
      "reason": "No exact-SKU test evidence for throw range or other additional performance claims."
    }
  ]
}
```

参数与证据文档：

- [copy\evidence-and-missing-data.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/51-66系列-俄式直流水枪/copy/evidence-and-missing-data.md>)
- [source\已确认参数-20260911.json](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/51-66系列-俄式直流水枪/source/已确认参数-20260911.json>)

## 007 51-66系列-水磨俄式直流水枪

系列分组：消防水枪；收录文件：9。

资料目录：[51-66系列-水磨俄式直流水枪](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/51-66系列-水磨俄式直流水枪>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "series_model": "51-66"
}
```

## 008 51-66系列-涂层俄式直流水枪

系列分组：消防水枪；收录文件：9。

资料目录：[51-66系列-涂层俄式直流水枪](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/51-66系列-涂层俄式直流水枪>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "series_model": "51-66"
}
```

## 009 65-16K-65-俄式消防水泵接合器

系列分组：水泵接合器及消防队进水口；收录文件：24。

资料目录：[65-16K-65-俄式消防水泵接合器](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/65-16K-65-俄式消防水泵接合器>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "model": "65-16K-65",
  "confirmed_facts": {
    "system_connection": "DN100 bottom flange",
    "fire_service_inlets": "2 x DN65 / KY66",
    "working_pressure": "1.6 MPa / 16 bar / 232 psi",
    "strength_test_pressure": "2.4 MPa / 24 bar / 348 psi",
    "accessories": "Two caps with retaining chains"
  },
  "blocked_modules": [
    {
      "asset_type": "material_process",
      "reason": "Exact component materials and coating are conflicting or unconfirmed"
    },
    {
      "asset_type": "full_dimension_drawing",
      "reason": "Exact H/L/W and export flange drawing are missing"
    },
    {
      "asset_type": "certification_document",
      "reason": "No exact export-SKU certificate or report supplied"
    },
    {
      "asset_type": "packaging_delivery",
      "reason": "No real factory-owned packing evidence supplied"
    }
  ]
}
```

参数与证据文档：

- [copy\evidence-and-standards-ledger.csv](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/65-16K-65-俄式消防水泵接合器/copy/evidence-and-standards-ledger.csv>)

## 010 65-16K-65-双阀双出口室内消火栓

系列分组：室内消火栓及栓阀；收录文件：26。

资料目录：[65-16K-65-双阀双出口室内消火栓](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/65-16K-65-双阀双出口室内消火栓>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "model": "65-16K-65",
  "verified_facts": [
    {
      "field": "model",
      "value": "65-16K-65",
      "evidence_grade": "A",
      "applicability": "market-neutral confirmed",
      "source": "copy/product-input.md and visible cast marking"
    },
    {
      "field": "product_name",
      "value": "双阀双出口室内消火栓",
      "evidence_grade": "A",
      "applicability": "market-neutral confirmed",
      "source": "user-confirmed product input"
    },
    {
      "field": "inlet",
      "value": "DN65 bottom flange",
      "evidence_grade": "A",
      "applicability": "market-neutral confirmed",
      "source": "user-confirmed product input"
    },
    {
      "field": "outlets",
      "value": "2 × KN65",
      "evidence_grade": "A",
      "applicability": "market-neutral confirmed; no foreign-interface equivalence claimed",
      "source": "user-confirmed product input"
    },
    {
      "field": "rated_working_pressure",
      "value": "1.6 MPa",
      "evidence_grade": "A",
      "applicability": "market-neutral confirmed; no foreign pressure class equivalence claimed",
      "source": "user-confirmed product input"
    },
    {
      "field": "strength_test_pressure",
      "value": "2.4 MPa",
      "evidence_grade": "A",
      "applicability": "market-neutral confirmed",
      "source": "user-confirmed product input"
    },
    {
      "field": "body_and_bonnet_material",
      "value": "HT200 cast iron",
      "evidence_grade": "A",
      "applicability": "market-neutral confirmed",
      "source": "user-confirmed product input"
    },
    {
      "field": "valve_stem_material",
      "value": "lead brass",
      "evidence_grade": "A",
      "applicability": "market-neutral confirmed",
      "source": "user-confirmed product input"
    },
    {
      "field": "seat_and_stem_nut_material",
      "value": "ZCuZn38 copper alloy",
      "evidence_grade": "A",
      "applicability": "market-neutral confirmed",
      "source": "user-confirmed product input"
    },
    {
      "field": "reference_dimensions",
      "value": "L≈400 mm, W≈250 mm, H≈300 mm",
      "evidence_grade": "A",
      "applicability": "market-neutral confirmed as approximate values",
      "source": "user-confirmed product input"
    },
    {
      "field": "outlet_center_height",
      "value": "≈70–80 mm",
      "evidence_grade": "A",
      "applicability": "market-neutral confirmed as approximate value",
      "source": "user-confirmed product input"
    },
    {
      "field": "flange_hole_diameter",
      "value": "Ø≈18 mm",
      "evidence_grade": "A",
      "applicability": "market-neutral confirmed as approximate value",
      "source": "user-confirmed product input"
    },
    {
      "field": "unit_weight",
      "value": "approx. 5–7 kg",
      "evidence_grade": "A",
      "applicability": "market-neutral confirmed as approximate range",
      "source": "user-confirmed product input"
    },
    {
      "field": "application",
      "value": "indoor fire hydrant cabinet with compatible fire hose and nozzle",
      "evidence_grade": "A",
      "applicability": "market-neutral confirmed",
      "source": "user-confirmed product input"
    }
  ],
  "blocked_assets": [
    {
      "asset_type_zh": "包装装箱图",
      "reason": "No real packaging photography, packing dimensions, gross weight or carton quantity supplied",
      "release_input": "Factory-owned packaging photos and confirmed packing data"
    },
    {
      "asset_type_zh": "认证文件图",
      "reason": "No exact-SKU export-market certificate or report supplied",
      "release_input": "Current exact-model certificate/report with scope, holder, validity and marketing authorization"
    },
    {
      "asset_type_zh": "完整工程尺寸图",
      "reason": "Flange PCD, complete hole layout, tolerances and approved drawing revision are missing",
      "release_input": "Exact-model approved dimensioned drawing"
    }
  ]
}
```

参数与证据文档：

- [copy\evidence-and-release-notes.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/65-16K-65-双阀双出口室内消火栓/copy/evidence-and-release-notes.md>)

## 011 8-65-25-有衬里消防水带

系列分组：消防水带及接口；收录文件：33。

资料目录：[8-65-25-有衬里消防水带](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/8-65-25-有衬里消防水带>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "user_confirmation": "沿用原参数和 KN65 接口，仅改为英文国际站图片",
  "evidence_files": [
    "source/archive-manifest.json",
    "source/8-65-25-source.jpg",
    "source/8-65-25-俯视原图.jpg",
    "source/8-65-25-开口内衬原图.jpg"
  ],
  "evidence_grade": "A — exact SKU user reconfirmation"
}
```

参数与证据文档：

- [copy\parameter-crosswalk.json](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/8-65-25-有衬里消防水带/copy/parameter-crosswalk.json>)
- [copy\交付说明与标准核验.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/8-65-25-有衬里消防水带/copy/交付说明与标准核验.md>)

## 012 A155Y005-2½英寸黄铜消防压力限制角阀

系列分组：室内消火栓及栓阀；收录文件：25。

资料目录：[A155Y005-2½英寸黄铜消防压力限制角阀](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/A155Y005-2½英寸黄铜消防压力限制角阀>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "blocked_assets": [
    {
      "asset": "认证文件图",
      "reason": "No exact-code authorization/certificate package supplied; current product page does not show certificate links against A155Y005."
    },
    {
      "asset": "包装装箱图",
      "reason": "No real packaging photos or packing parameters supplied."
    }
  ]
}
```

参数与证据文档：

- [copy\验收报告.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/A155Y005-2½英寸黄铜消防压力限制角阀/copy/验收报告.md>)

## 013 a61-rp-一体式测试排水阀带观察窗

系列分组：水流指示器及末端试水；收录文件：28。

资料目录：[a61-rp-一体式测试排水阀带观察窗](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/a61-rp-一体式测试排水阀带观察窗>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "actual_model": null,
  "user_confirmation": "川维自有产品，为300 PSI， bspt螺纹",
  "blocked_modules": [
    "Actual model and size range",
    "Exact female thread designation and dimensional gauge evidence",
    "Orifice and K factor",
    "Material grade and components",
    "Physical dimensions",
    "Applicable target-country standard and exact product certificates",
    "Packaging and factory evidence",
    "Connected installation and installation dimensions"
  ]
}
```

参数与证据文档：

- [copy\交付说明与标准核验.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/a61-rp-一体式测试排水阀带观察窗/copy/交付说明与标准核验.md>)
- [copy\产品确认与参数依据.json](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/a61-rp-一体式测试排水阀带观察窗/copy/产品确认与参数依据.json>)

## 014 B-DSXC-202-闭式旋转雨淋喷头

系列分组：其他洒水喷头及配件；收录文件：21。

资料目录：[B-DSXC-202-闭式旋转雨淋喷头](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/B-DSXC-202-闭式旋转雨淋喷头>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "confirmed_facts": [
    "Model B-DSXC-202",
    "Closed type",
    "Pendent orientation",
    "Centrifugal/rotating spray structure",
    "K202 metric nominal discharge coefficient",
    "BSPT R1 male thread",
    "Copper frame",
    "Visible glass bulb operating element",
    "Visible four-point fastening structure"
  ],
  "not_published_missing_evidence": [
    "Working pressure",
    "Rated flow at a specified pressure",
    "Spray radius or coverage",
    "Operating temperature",
    "Overall dimensions",
    "Exact export-market standard compliance",
    "Certification/listing/approval",
    "Packaging quantity and logistics data"
  ]
}
```

参数与证据文档：

- [copy\B-DSXC-202-证据与国际参数说明.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/B-DSXC-202-闭式旋转雨淋喷头/copy/B-DSXC-202-证据与国际参数说明.md>)

## 015 B-DSXC系列-雨淋喷头

系列分组：其他洒水喷头及配件；收录文件：26。

资料目录：[B-DSXC系列-雨淋喷头](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/B-DSXC系列-雨淋喷头>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "verified_facts": [
    {
      "field": "series_models",
      "value": [
        "B-DSXC-90",
        "B-DSXC-115",
        "B-DSXC-145",
        "B-DSXC-155",
        "B-DSXC-175",
        "B-DSXC-200"
      ],
      "evidence_grade": "A-user-confirmed",
      "market_applicability": "market-neutral confirmed"
    },
    {
      "field": "nominal_metric_k_factor",
      "value": [
        90,
        115,
        145,
        155,
        175,
        200
      ],
      "evidence_grade": "A-user-confirmed",
      "market_applicability": "market-neutral confirmed",
      "publication_note": "Published as the confirmed metric product-series designation; no certification implication"
    },
    {
      "field": "thread_family",
      "value": "BSPT male thread family",
      "evidence_grade": "A-user-confirmed plus visible male thread",
      "market_applicability": "market-neutral confirmed",
      "publication_note": "No ISO 7-1 compliance claim and no inferred R designation"
    },
    {
      "field": "frame_material",
      "value": "Copper frame",
      "evidence_grade": "A-user-confirmed",
      "market_applicability": "market-neutral confirmed"
    },
    {
      "field": "glass_bulb_diameter",
      "value": "5 mm",
      "evidence_grade": "A-standing user confirmation and visible marking",
      "market_applicability": "market-neutral confirmed"
    },
    {
      "field": "configuration",
      "value": "Closed-type / pendent / centrifugal",
      "evidence_grade": "B-exact-model domestic designation",
      "market_applicability": "market-neutral identification only"
    }
  ],
  "blocked_assets": [
    {
      "asset": "尺寸连接图",
      "reason": "No exact-model dimensioned drawing or verified measurements"
    },
    {
      "asset": "认证文件图",
      "reason": "No exact-model export certificate/listing/report"
    },
    {
      "asset": "连接式安装图",
      "reason": "No verified inlet-size mapping, mating fitting, pipe size, clearance or installation document"
    },
    {
      "asset": "包装装箱图",
      "reason": "No real packaging photo, quantity, weight or carton dimensions"
    },
    {
      "asset": "性能覆盖图",
      "reason": "No exact-model pressure, flow, coverage radius or distribution test report"
    }
  ]
}
```

参数与证据文档：

- [copy\参数与国际标准交叉表.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/B-DSXC系列-雨淋喷头/copy/参数与国际标准交叉表.md>)

## 016 BS-750-英式室外消火栓

系列分组：室外消火栓；收录文件：28。

资料目录：[BS-750-英式室外消火栓](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/BS-750-英式室外消火栓>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "model": "BS-750",
  "blocked_assets": [
    "Certification/approval image — no exact-SKU evidence",
    "Packaging image — no factory-owned packaging evidence",
    "Full engineering dimension image — incomplete approved drawing",
    "Weight claim — archive conflict between approx. 20 kg and approx. 32 kg"
  ]
}
```

## 017 BS336-JM-series-英式瞬时消防水带接口

系列分组：消防水带及接口；收录文件：22。

资料目录：[BS336-JM-series-英式瞬时消防水带接口](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/BS336-JM-series-英式瞬时消防水带接口>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "delivery_scope": "6 gallery images and 5 detail modules; confirmed manufacturer facts only; not a BS 336 conformity package",
  "evidence": [
    {
      "id": "A-material",
      "fact": "Body material: Brass",
      "source": "source/原1688资料清单.json",
      "basis": "Archive records user confirmation on 2026-09-26",
      "grade": "A-recorded-user-confirmation",
      "applicability": "market-neutral confirmed",
      "limits": "No alloy grade, strength, corrosion resistance or standard conformity implied"
    },
    {
      "id": "A-selection",
      "fact": "2½ in nominal coupling with 38/51/63 mm hose-tail diameter",
      "source": "source/05-原型号表参考.png and source/原1688资料清单.json",
      "grade": "A-recorded-user-confirmation-and-catalogue",
      "applicability": "market-neutral confirmed",
      "limits": "Manufacturer designations; not standard dimensions, hose ID, DN conversion or interoperability proof"
    },
    {
      "id": "A-visible",
      "fact": "male/female halves, opposed pull knobs, ribbed tails, visible seal",
      "source": [
        "source/01-实物正面装配.jpg",
        "source/02-实物侧面拉钮.jpg",
        "source/03-实物端口密封圈.jpg",
        "source/04-实物公母拆分.jpg"
      ],
      "grade": "A-photographic",
      "applicability": "market-neutral confirmed",
      "limits": "No hidden construction, seal compound or performance inferred"
    }
  ],
  "parameter_crosswalk": [
    {
      "field": "material",
      "source": "黄铜",
      "target": "Brass body",
      "conversion": null,
      "publish": true
    },
    {
      "field": "nominal coupling size",
      "source": "2.5英寸",
      "target": "2½ in",
      "conversion": "typographic fraction only",
      "publish": true
    },
    {
      "field": "hose-tail diameter",
      "source": "Φ38 / Φ51 / Φ63 mm",
      "target": "38 / 51 / 63 mm",
      "conversion": null,
      "publish": true,
      "limits": "Not relabelled hose inside diameter; 51/63 not changed to 52/64"
    },
    {
      "field": "1.5 and 2 inch coupling variants",
      "source": "1.5英寸 / Φ38; 2英寸 / Φ51",
      "publish": false,
      "reason": "Excluded from this UK project direction; exact BS336 interface scope not verified. Does not assert these variants are universally invalid."
    },
    {
      "field": "BS336 conformity",
      "source": "BS336型 model/type name only",
      "publish": false,
      "reason": "Product name does not establish conformity; current project needs exact SKU drawings, dimensional verification and applicable test reports."
    },
    {
      "field": "working/test pressure",
      "source": null,
      "publish": false,
      "reason": "No exact product performance evidence"
    }
  ],
  "blocked_assets": [
    {
      "type": "BS336标准符合性及检测认证图",
      "reason": "缺本型号适用的图纸、尺寸检验、适用试验报告和声明，不能承诺符合 BS336。第三方认证标志还需相应授权证书。"
    },
    {
      "type": "尺寸连接工程图",
      "reason": "缺实际接口配合尺寸、公差及型号图纸"
    },
    {
      "type": "安装操作图",
      "reason": "缺经确认的水带装配、绑扎及操作说明"
    },
    {
      "type": "包装装箱图",
      "reason": "缺真实包装照片、装箱数量和重量"
    }
  ]
}
```

参数与证据文档：

- [copy\上传顺序与英国标准核验说明.txt](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/BS336-JM-series-英式瞬时消防水带接口/copy/上传顺序与英国标准核验说明.txt>)

## 018 BSPT系列-闭式吸气型泡沫水喷头

系列分组：泡沫喷头及配件；收录文件：21。

资料目录：[BSPT系列-闭式吸气型泡沫水喷头](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/BSPT系列-闭式吸气型泡沫水喷头>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "official_model": null,
  "model_note": "BSPT is the confirmed thread family and internal archive identifier, not a claimed official manufacturer model.",
  "parameter_crosswalk": [
    {
      "id": "identity",
      "field": "产品类型",
      "source_value": "闭式吸气型泡沫水喷头",
      "target_value": "Closed-Type Air-Aspirating Foam-Water Sprinkler",
      "evidence_grade": "A",
      "source": "User supplied product folder identity + real photographs",
      "applicability": "market-neutral confirmed",
      "publishable": true
    },
    {
      "id": "copper",
      "field": "材质范围",
      "source_value": "铜制框架及连接体；非所有部件均为铜",
      "target_value": "Copper frame and connection body",
      "evidence_grade": "A",
      "source": "C:/Users/zhengfafa/.codex/skills/alibaba-detail-image-studio/SKILL.md standing user confirmation, corroborated by supplied archived user-confirmation record",
      "applicability": "market-neutral confirmed",
      "publishable": true
    },
    {
      "id": "thread",
      "field": "螺纹族",
      "source_value": "BSPT",
      "target_value": "BSPT Thread",
      "evidence_grade": "A",
      "source": "C:/Users/zhengfafa/.codex/skills/alibaba-detail-image-studio/SKILL.md standing user confirmation",
      "applicability": "market-neutral confirmed",
      "publishable": true,
      "standard_basis": "No ISO conformity claimed; ISO 7-1 is terminology/research context only."
    },
    {
      "id": "bulb",
      "field": "玻璃球直径",
      "source_value": "5 mm",
      "source_unit": "mm",
      "target_value": "5 mm",
      "target_unit": "mm",
      "evidence_grade": "A",
      "source": "C:/Users/zhengfafa/.codex/skills/alibaba-detail-image-studio/SKILL.md standing user confirmation, aligned with supplied product record",
      "applicability": "market-neutral confirmed",
      "publishable": true,
      "conversion": "None"
    },
    {
      "id": "visual",
      "field": "可见结构",
      "source_value": "编织网罩、圆形吸气孔、连接体、外螺纹、红色玻璃球",
      "target_value": "Woven Metal Mesh; Air Inlet Openings; Connection Body",
      "evidence_grade": "A for appearance only",
      "source": [
        "source/source-01-white-front.jpg",
        "source/source-03-side.jpg",
        "source/source-04-top.jpg"
      ],
      "applicability": "market-neutral confirmed",
      "publishable": true
    },
    {
      "id": "sizes",
      "field": "公称螺纹规格",
      "source_value": "4分、6分、1寸；旧文档记R1/2、R3/4、R1",
      "target_value": null,
      "evidence_grade": "candidate archive",
      "applicability": "unmapped",
      "publishable": false,
      "reason": "No exact export configuration drawing/gauge report; position-to-size mapping absent. No size labels in images."
    },
    {
      "id": "temperature",
      "field": "动作温度",
      "source_value": "68℃",
      "target_value": null,
      "evidence_grade": "candidate archive",
      "applicability": "unmapped",
      "publishable": false,
      "reason": "Archived reasoning partly derives temperature from red bulb; no legible exact-SKU rating marking or report. No 68C/155F claim."
    },
    {
      "id": "response",
      "field": "响应等级",
      "source_value": "标准响应",
      "target_value": null,
      "evidence_grade": "candidate archive",
      "applicability": "unmapped",
      "publishable": false,
      "reason": "Do not infer measured RTI or internationally tested response class solely from bulb diameter."
    },
    {
      "id": "pressure",
      "field": "压力",
      "source_value": "同类产品0.3–0.7 MPa、额定0.35 MPa",
      "source_unit": "MPa",
      "target_value": null,
      "evidence_grade": "D for this SKU",
      "applicability": "unmapped",
      "publishable": false,
      "reason": "Competitor/category data, not SKU evidence; not converted into bar/psi."
    },
    {
      "id": "flow",
      "field": "K系数和流量",
      "source_value": "旧资料同类产品参考K40/K60及70/105 L/min",
      "target_value": null,
      "evidence_grade": "D for this SKU",
      "applicability": "unmapped",
      "publishable": false,
      "reason": "No measured data covering this SKU/size; cannot infer from thread."
    },
    {
      "id": "foam",
      "field": "发泡和析液性能",
      "source_value": "国标类别最低要求≥5与≥2 min",
      "target_value": null,
      "evidence_grade": "C category context only",
      "applicability": "domestic-only",
      "publishable": false,
      "reason": "Standard minimum is not exact-SKU performance."
    },
    {
      "id": "cert",
      "field": "国际认证或符合性",
      "source_value": "未提供",
      "target_value": null,
      "evidence_grade": "none",
      "applicability": "unmapped",
      "publishable": false,
      "reason": "No UL/FM/EN/ISO/NFPA/CE conformity or certification claim."
    }
  ]
}
```

参数与证据文档：

- [copy\参数核验与国际标准边界.txt](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/BSPT系列-闭式吸气型泡沫水喷头/copy/参数核验与国际标准边界.txt>)

## 019 DN150-不锈钢雨淋报警阀

系列分组：雨淋阀；收录文件：25。

资料目录：[DN150-不锈钢雨淋报警阀](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/DN150-不锈钢雨淋报警阀>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "user_confirmation": "2026-09-28 用户确认：暂无指定，供货配置与文件夹一致",
  "facts": [
    {
      "field": "Nominal size",
      "source_value": "DN150",
      "final_value": "DN150",
      "evidence": "Original label + archive user-confirmed record + current same-configuration confirmation",
      "grade": "A",
      "applicability": "market-neutral confirmed",
      "publication": "accepted manufacturer fact; no standard-equivalence claim"
    },
    {
      "field": "Rated pressure",
      "source_value": "1.6 MPa",
      "final_value": "16 bar (1.6 MPa)",
      "conversion": "1 MPa = 10 bar; 1.6 × 10 = 16 bar",
      "evidence": "archive manifest.facts + current same-configuration confirmation",
      "grade": "A",
      "applicability": "market-neutral confirmed",
      "publication": "accepted manufacturer fact; no standard-equivalence claim"
    },
    {
      "field": "Valve body",
      "source_value": "不锈钢",
      "final_value": "Stainless steel",
      "evidence": "archive user-confirmed material + current same-configuration confirmation",
      "grade": "A",
      "applicability": "market-neutral confirmed",
      "publication": "accepted manufacturer fact; no standard-equivalence claim"
    },
    {
      "field": "External piping",
      "source_value": "不锈钢",
      "final_value": "Stainless steel",
      "evidence": "archive user-confirmed material + current same-configuration confirmation",
      "grade": "A",
      "applicability": "market-neutral confirmed",
      "publication": "accepted manufacturer fact; no standard-equivalence claim"
    },
    {
      "field": "Connection",
      "source_value": "法兰",
      "final_value": "Flanged",
      "evidence": "original photos",
      "grade": "A",
      "applicability": "market-neutral confirmed",
      "publication": "accepted manufacturer fact; no standard-equivalence claim"
    },
    {
      "field": "Flange outside diameter D",
      "source_value": "285 mm",
      "final_value": "285 mm",
      "evidence": "archive user-confirmed manufacturer record + current same-configuration confirmation",
      "grade": "A",
      "applicability": "market-neutral confirmed",
      "publication": "accepted manufacturer fact; no standard-equivalence claim"
    },
    {
      "field": "Bolt circle diameter K",
      "source_value": "240 mm",
      "final_value": "240 mm",
      "evidence": "archive user-confirmed manufacturer record + current same-configuration confirmation",
      "grade": "A",
      "applicability": "market-neutral confirmed",
      "publication": "accepted manufacturer fact; no standard-equivalence claim"
    },
    {
      "field": "Bolts",
      "source_value": "8×M20",
      "final_value": "8 × M20",
      "evidence": "archive user-confirmed manufacturer record + current same-configuration confirmation",
      "note": "Bolt specification, NOT hole diameter",
      "grade": "A",
      "applicability": "market-neutral confirmed",
      "publication": "accepted manufacturer fact; no standard-equivalence claim"
    }
  ],
  "missing_fields": [
    "目标国家及项目标准",
    "产品确切制造型号",
    "不锈钢牌号（未推断304/316）",
    "法兰标准、密封面、厚度、孔径",
    "安装说明书",
    "工作温度、流量和水损",
    "电磁阀电压、压力开关触点参数",
    "国际认证范围",
    "包装尺寸重量"
  ],
  "user_confirmation_for_method": "2026-09-28: 用原始照片裁切排版，优先保证产品准确",
  "missing_views": [
    "Full rear view: no usable authentic rear photograph supplied; requires new photography."
  ]
}
```

参数与证据文档：

- [copy\图片顺序与参数核查说明.txt](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/DN150-不锈钢雨淋报警阀/copy/图片顺序与参数核查说明.txt>)

## 020 DN150-新款预作用装置

系列分组：预作用装置；收录文件：28。

资料目录：[DN150-新款预作用装置](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/DN150-新款预作用装置>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "archive_evidence_files": [
    "D:\\work\\codex\\yunying\\outputs\\chuanwei-fire-commerce\\dn150-new-dn150\\manifest.json",
    "D:\\work\\codex\\yunying\\outputs\\chuanwei-fire-commerce\\dn150-new-dn150\\copy\\参数记录\\待确认-standard-record.json",
    "D:\\work\\codex\\yunying\\outputs\\chuanwei-fire-commerce\\dn150-new-dn150\\copy\\1688表单来源记录.md",
    "D:\\work\\codex\\yunying\\outputs\\chuanwei-fire-commerce\\dn150-new-dn150\\copy\\整套组件一览-记录.json"
  ],
  "verified_facts": [
    {
      "id": "F01",
      "field": "Product name",
      "source_value": "预作用装置",
      "buyer_value": "Preaction Valve Assembly",
      "unit": null,
      "grade": "A",
      "source": "User original description in source thread",
      "market_applicability": "market-neutral confirmed",
      "scope": "Photographed valve assembly; not a complete preaction system"
    },
    {
      "id": "F02",
      "field": "Nominal size",
      "source_value": "DN150",
      "buyer_value": "DN150",
      "unit": "DN designation",
      "grade": "A",
      "source": "User original description in source thread",
      "market_applicability": "market-neutral confirmed",
      "scope": "Nominal designation only; no 6 inch mapping or dimensional inference"
    },
    {
      "id": "F03",
      "field": "Configuration description",
      "source_value": "新款",
      "buyer_value": "New configuration",
      "unit": null,
      "grade": "A",
      "source": "User original description in source thread",
      "market_applicability": "market-neutral confirmed",
      "scope": "Version description only; no performance upgrade claim"
    },
    {
      "id": "F04",
      "field": "Visible connection form",
      "source_value": "法兰式外观",
      "buyer_value": "Flanged Connections",
      "unit": null,
      "grade": "A",
      "source": "source/source-01.jpg and supplied angle photographs",
      "market_applicability": "market-neutral confirmed",
      "scope": "Geometry only; exact flange standard, pressure class and drilling remain unmapped"
    },
    {
      "id": "F05",
      "field": "Visible pressure gauges",
      "source_value": "照片可见两个压力表",
      "buyer_value": "Two visible gauges",
      "unit": "count=2",
      "grade": "A",
      "source": "source/source-01.jpg",
      "market_applicability": "market-neutral confirmed",
      "scope": "Photographed components only; range/readings do not establish assembly pressure rating"
    },
    {
      "id": "F06",
      "field": "Visible alarm component",
      "source_value": "水力警铃及后侧机构",
      "buyer_value": "Water motor gong",
      "unit": null,
      "grade": "A",
      "source": "source/source-01.jpg and source/source-03.jpg; archived component identification record",
      "market_applicability": "market-neutral confirmed",
      "scope": "Exterior appearance only; no alarm performance, sound level or certification claim"
    },
    {
      "id": "F07",
      "field": "Visible electrical trim",
      "source_value": "压力开关、电磁阀组件",
      "buyer_value": "Pressure switch; Solenoid valve",
      "unit": null,
      "grade": "A",
      "source": "source/source-01.jpg; archived copy/整套组件一览-记录.json used for component identification only",
      "market_applicability": "market-neutral confirmed",
      "scope": "Component appearance only; voltage, protection rating and release/interlock logic are not claimed"
    },
    {
      "id": "F08",
      "field": "Visible markings",
      "source_value": "冠亚及原始铭牌",
      "buyer_value": "Original nameplate and body markings",
      "unit": null,
      "grade": "A",
      "source": "source/source-01.jpg",
      "market_applicability": "market-neutral confirmed",
      "scope": "Original photographed markings unchanged. Markings are not transcribed as assembly compliance/pressure/voltage claims."
    },
    {
      "id": "F09",
      "field": "Visible main assembly and trim",
      "source_value": "阀体总成、球阀及外部连接管路",
      "buyer_value": "Valve body assembly; Ball valves & trim piping",
      "unit": null,
      "grade": "A",
      "source": "source/source-01.jpg exterior appearance",
      "market_applicability": "market-neutral confirmed",
      "scope": "Photographed components only; no promise of contractual supply quantity, hidden internals, material or function"
    }
  ],
  "parameter_crosswalk": {
    "confirmed": [
      {
        "id": "F01",
        "field": "Product name",
        "source_value": "预作用装置",
        "buyer_value": "Preaction Valve Assembly",
        "unit": null,
        "grade": "A",
        "source": "User original description in source thread",
        "market_applicability": "market-neutral confirmed",
        "scope": "Photographed valve assembly; not a complete preaction system"
      },
      {
        "id": "F02",
        "field": "Nominal size",
        "source_value": "DN150",
        "buyer_value": "DN150",
        "unit": "DN designation",
        "grade": "A",
        "source": "User original description in source thread",
        "market_applicability": "market-neutral confirmed",
        "scope": "Nominal designation only; no 6 inch mapping or dimensional inference"
      },
      {
        "id": "F03",
        "field": "Configuration description",
        "source_value": "新款",
        "buyer_value": "New configuration",
        "unit": null,
        "grade": "A",
        "source": "User original description in source thread",
        "market_applicability": "market-neutral confirmed",
        "scope": "Version description only; no performance upgrade claim"
      },
      {
        "id": "F04",
        "field": "Visible connection form",
        "source_value": "法兰式外观",
        "buyer_value": "Flanged Connections",
        "unit": null,
        "grade": "A",
        "source": "source/source-01.jpg and supplied angle photographs",
        "market_applicability": "market-neutral confirmed",
        "scope": "Geometry only; exact flange standard, pressure class and drilling remain unmapped"
      },
      {
        "id": "F05",
        "field": "Visible pressure gauges",
        "source_value": "照片可见两个压力表",
        "buyer_value": "Two visible gauges",
        "unit": "count=2",
        "grade": "A",
        "source": "source/source-01.jpg",
        "market_applicability": "market-neutral confirmed",
        "scope": "Photographed components only; range/readings do not establish assembly pressure rating"
      },
      {
        "id": "F06",
        "field": "Visible alarm component",
        "source_value": "水力警铃及后侧机构",
        "buyer_value": "Water motor gong",
        "unit": null,
        "grade": "A",
        "source": "source/source-01.jpg and source/source-03.jpg; archived component identification record",
        "market_applicability": "market-neutral confirmed",
        "scope": "Exterior appearance only; no alarm performance, sound level or certification claim"
      },
      {
        "id": "F07",
        "field": "Visible electrical trim",
        "source_value": "压力开关、电磁阀组件",
        "buyer_value": "Pressure switch; Solenoid valve",
        "unit": null,
        "grade": "A",
        "source": "source/source-01.jpg; archived copy/整套组件一览-记录.json used for component identification only",
        "market_applicability": "market-neutral confirmed",
        "scope": "Component appearance only; voltage, protection rating and release/interlock logic are not claimed"
      },
      {
        "id": "F08",
        "field": "Visible markings",
        "source_value": "冠亚及原始铭牌",
        "buyer_value": "Original nameplate and body markings",
        "unit": null,
        "grade": "A",
        "source": "source/source-01.jpg",
        "market_applicability": "market-neutral confirmed",
        "scope": "Original photographed markings unchanged. Markings are not transcribed as assembly compliance/pressure/voltage claims."
      },
      {
        "id": "F09",
        "field": "Visible main assembly and trim",
        "source_value": "阀体总成、球阀及外部连接管路",
        "buyer_value": "Valve body assembly; Ball valves & trim piping",
        "unit": null,
        "grade": "A",
        "source": "source/source-01.jpg exterior appearance",
        "market_applicability": "market-neutral confirmed",
        "scope": "Photographed components only; no promise of contractual supply quantity, hidden internals, material or function"
      }
    ],
    "withheld": [
      {
        "field": "完整工厂型号及标准款/新款映射",
        "status": "conflicting",
        "source_value": "旧国际站manifest标ZSFY150 standard configuration；本次用户明确DN150新款；两包白底原图SHA256完全相同",
        "needs": "本款完整型号、版本及该照片对应配置的厂家确认/清晰铭牌与BOM",
        "blocked": "Factory Model文字、型号参数表、型号专用规格及兼容性声明"
      },
      {
        "field": "工作压力和试验压力",
        "status": "unmapped",
        "source_value": "新款台账待确认；原照铭牌有数字，旧表有1.6 MPa但不沿用",
        "needs": "确认本次交付新款对应铭牌/技术表及额定工作压力、试验条件",
        "blocked": "所有新增压力文案、压力等级换算及性能承诺"
      },
      {
        "field": "法兰标准、压力等级、孔距、孔径、螺栓及配对接口",
        "status": "unmapped",
        "source_value": "仅法兰外观可见",
        "needs": "本SKU尺寸连接图、法兰标准及配对要求",
        "blocked": "英寸接口换算、ANSI/EN/BS/ISO等兼容性声明及安装说明"
      },
      {
        "field": "阀体、密封、外部管路及其他配件材质和表面处理",
        "status": "unmapped",
        "source_value": "新款台账待确认；旧套装材质值不用",
        "needs": "新款BOM/材料及涂层说明",
        "blocked": "材质、抗腐蚀及涂层性能模块"
      },
      {
        "field": "电磁阀电压、防护等级、压力开关电气参数",
        "status": "unmapped",
        "source_value": "照片组件可见原始标记；新款交付配置未核实",
        "needs": "各组件准确型号、数据表和供货BOM",
        "blocked": "新增DC24V、IP或整机CE等声明；原始标记不重绘也不推广"
      },
      {
        "field": "单/双联锁、启动方式、释放控制、气源及控制盘",
        "status": "unmapped",
        "source_value": "没有匹配安装/控制逻辑文件",
        "needs": "新款系统原理图、组件兼容清单及安装说明",
        "blocked": "系统功能/应用/安装流程图"
      },
      {
        "field": "整机高度、宽度、深度和重量",
        "status": "unmapped",
        "source_value": "旧表690 mm、旧沟槽74 cm均未证明映射本次新款",
        "needs": "本款带版本尺寸图或实测记录",
        "blocked": "尺寸重量及装配间隙图"
      },
      {
        "field": "精确出口配置和目标国家/项目要求",
        "status": "unmapped",
        "source_value": "只确认国际类别存在；没有目标项目准入材料",
        "needs": "国家/项目、采购规范及匹配的型号文件",
        "blocked": "地区适用保证、工程适用与目标市场符合性声明"
      },
      {
        "field": "UL/FM/CE/EN/ISO/NFPA等证据",
        "status": "unmapped",
        "source_value": "无匹配本SKU的有效证书/目录/报告；原始线圈照片有CE样式符号",
        "needs": "有效文件、范围、持证主体和产品型号映射；组件标记不得代替整机认证",
        "blocked": "任何新增认证文字、徽章及整机符合性宣称"
      },
      {
        "field": "供货范围、包装数量尺寸及重量",
        "status": "unmapped",
        "source_value": "外观照片不是订单供货清单；无包装证据",
        "needs": "订单组件清单及真实包装照片/记录",
        "blocked": "完整系统包含项、包装及物流模块"
      }
    ]
  }
}
```

参数与证据文档：

- [copy\中文待确认清单.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/DN150-新款预作用装置/copy/中文待确认清单.md>)
- [copy\事实台账及出口核查.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/DN150-新款预作用装置/copy/事实台账及出口核查.md>)

## 021 DN200-雨淋报警阀

系列分组：雨淋阀；收录文件：23。

资料目录：[DN200-雨淋报警阀](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/DN200-雨淋报警阀>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "factory_model": null,
  "source_confirmation": [
    {
      "turn_id": "01a104ec-9907-7ad0-9ea5-efb6e899901c",
      "text": "<send_user_message_question_reply>\n[{\"questionItemId\":\"[\\\"request_user_input_async\\\",\\\"call_rwr6PXKW5ECWGY8JvzplzwPF\\\",0]\",\"question\":\"请一次确认：①第1张白底图是否确实为DN200（顶部标签看起来是DN150），还是需要以后面DN200实拍图作为主产品图？②以前ZSFM系列的1.6MPa、球墨铸铁阀体资料是否适用于本款？有本款尺寸图、包装图也可随后补充；未确认的数据我会先省略。\",\"answer\":\"以后面DN200实拍为准；旧参数暂不使用\"}]\n</send_user_message_question_reply>"
    }
  ],
  "facts": [
    {
      "field": "Product name",
      "source_value": "雨淋报警阀",
      "target_value": "Deluge Alarm Valve",
      "grade": "A",
      "source": "Current user request; source chat 01a104ea-e3a9-7321-9c04-876ab10b942f, turn 01a104ec-9907-7ad0-9ea5-efb6e899901c",
      "applicability": "market-neutral confirmed",
      "conversion": null,
      "publishable": true
    },
    {
      "field": "Nominal size",
      "source_value": "DN200",
      "target_value": "DN200",
      "grade": "A",
      "source": "User confirmation: 以后面DN200实拍为准；旧参数暂不使用",
      "applicability": "market-neutral confirmed",
      "conversion": null,
      "notes": "Not a factory model, measured diameter, inch interface or flange standard",
      "publishable": true
    },
    {
      "field": "Connection form",
      "source_value": "法兰外形",
      "target_value": "Flanged",
      "grade": "A",
      "source": "source/02.jpg and source/03.jpg",
      "applicability": "market-neutral confirmed",
      "conversion": null,
      "notes": "Visible physical form only; bolt pattern, drilling standard and rating excluded",
      "publishable": true
    },
    {
      "field": "Gauge configuration",
      "source_value": "2只压力表可见",
      "target_value": "Two gauges shown",
      "grade": "A",
      "source": "source/02.jpg and source/03.jpg",
      "applicability": "market-neutral confirmed",
      "conversion": null,
      "notes": "Shown sample configuration; not a packing or included-quantity guarantee",
      "publishable": true
    },
    {
      "field": "Cover, control trim and gong",
      "source_value": "圆形螺栓阀盖、手动阀、电磁阀、水力警铃",
      "target_value": "Photographed visible components",
      "grade": "A",
      "source": "source/02.jpg, source/03.jpg, source/04.jpg",
      "applicability": "market-neutral confirmed",
      "conversion": null,
      "notes": "Names identify visible components; no operating, electrical or acoustic performance claim",
      "publishable": true
    }
  ]
}
```

参数与证据文档：

- [copy\中文交付说明与待确认.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/DN200-雨淋报警阀/copy/中文交付说明与待确认.md>)
- [copy\事实与出口映射.json](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/DN200-雨淋报警阀/copy/事实与出口映射.json>)
- [source\1688事实记录.json](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/DN200-雨淋报警阀/source/1688事实记录.json>)

## 022 DN300-雨淋报警阀

系列分组：雨淋阀；收录文件：29。

资料目录：[DN300-雨淋报警阀](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/DN300-雨淋报警阀>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "facts": [
    {
      "id": "product_type",
      "source_market_value": "雨淋报警阀",
      "target_value": "Deluge alarm valve",
      "grade": "A",
      "source": "用户任务及报告",
      "market_applicability": "market-neutral confirmed",
      "publishable": true
    },
    {
      "id": "factory_model",
      "source_market_value": "ZSFM300-1.6",
      "target_value": "Factory Model: ZSFM300-1.6",
      "grade": "A",
      "source": "最新用户对应确认；300#雨淋阀.pdf 第4页铭牌",
      "market_applicability": "market-neutral confirmed",
      "publishable": true
    },
    {
      "id": "nominal_size",
      "source_market_value": "DN300",
      "target_value": "DN300",
      "grade": "A",
      "source": "用户身份更正及照片1/4真实贴纸",
      "market_applicability": "market-neutral confirmed",
      "publishable": true,
      "conversion_formula": null
    },
    {
      "id": "rated_working_pressure",
      "source_market_value": 1.6,
      "source_unit": "MPa",
      "target_value": 1.6,
      "target_unit": "MPa",
      "grade": "A",
      "source": "300#雨淋阀.pdf 第4页铭牌及对应确认",
      "market_applicability": "market-neutral confirmed",
      "publishable": true,
      "conversion_formula": null,
      "scope": "Manufacturer-rated pressure of unchanged photographed SKU, no pressure class equivalence or foreign approval implied"
    },
    {
      "id": "connection_form",
      "source_market_value": "法兰结构",
      "target_value": "Flanged",
      "grade": "A-visible",
      "source": "4张原实拍",
      "market_applicability": "market-neutral confirmed",
      "publishable": true,
      "scope": "Visible flange geometry only; bolt circle and standard not established"
    },
    {
      "id": "visible_cover_and_trim",
      "source_market_value": "圆形螺栓阀盖/外配管路",
      "target_value": "Valve Cover & Trim",
      "grade": "A-visible",
      "source": "照片2",
      "market_applicability": "market-neutral confirmed",
      "publishable": true
    },
    {
      "id": "visible_water_motor_gong",
      "source_market_value": "水力警铃",
      "target_value": "Water Motor Gong",
      "grade": "A-visible",
      "source": "照片3，实物黄色贴纸",
      "market_applicability": "market-neutral confirmed",
      "publishable": true,
      "scope": "Appearance only; no sound-level claim or delivery-list promise"
    },
    {
      "id": "visible_gauge_and_trim",
      "source_market_value": "压力表/外配管路",
      "target_value": "Pressure Gauge & Trim",
      "grade": "A-visible",
      "source": "照片2",
      "market_applicability": "market-neutral confirmed",
      "publishable": true,
      "scope": "Appearance only; gauge position is not an operating pressure claim"
    },
    {
      "id": "domestic_standard",
      "source_market_value": "GB 5135.5-2018",
      "grade": "A",
      "source": "对应报告铭牌",
      "market_applicability": "domestic-only",
      "publishable": false
    },
    {
      "id": "sample_test_results",
      "source_market_value": "0.064 MPa 水力摩阻损失/强度及渗漏合格",
      "grade": "A",
      "source": "对应报告第5/6页",
      "market_applicability": "domestic-only",
      "publishable": false,
      "scope": "Sample under Chinese report conditions only; no general pressure-drop or international compliance claim"
    }
  ],
  "blocked_assets": [
    {
      "type": "尺寸连接/安装",
      "reason": "缺本SKU尺寸图、法兰标准及安装条件"
    },
    {
      "type": "材质",
      "reason": "缺本SKU BOM，不套系列材料"
    },
    {
      "type": "包装",
      "reason": "无真实包装照片或包装规格"
    },
    {
      "type": "国际认证/国内检测宣传",
      "reason": "没有海外审批证据；国内样品报告不改写成海外认证"
    }
  ]
}
```

参数与证据文档：

- [copy\中文待确认与验收.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/DN300-雨淋报警阀/copy/中文待确认与验收.md>)
- [source\DN300-报告对应确认与参数摘录.json](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/DN300-雨淋报警阀/source/DN300-报告对应确认与参数摘录.json>)
- [source\最新用户确认.json](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/DN300-雨淋报警阀/source/最新用户确认.json>)

## 023 DN50-2IN-长型直流消防水枪

系列分组：消防水枪；收录文件：19。

资料目录：[DN50-2IN-长型直流消防水枪](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/DN50-2IN-长型直流消防水枪>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "blocked_assets": [
    {
      "asset": "Dimension diagram",
      "requires": "exact SKU dimensioned drawing or physical measurements"
    },
    {
      "asset": "Thread compatibility / installation",
      "requires": "thread family, pitch and matching fitting evidence"
    },
    {
      "asset": "Pressure, flow, range graphic",
      "requires": "exact SKU test data / manufacturer specification"
    },
    {
      "asset": "EN/ISO/NFPA compliance badge",
      "requires": "current exact SKU conformity report or valid certification within claimed scope"
    },
    {
      "asset": "Packing image",
      "requires": "authentic packing photo and packing specifications"
    }
  ]
}
```

参数与证据文档：

- [copy\阿里国际站图片说明与参数依据.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/DN50-2IN-长型直流消防水枪/copy/阿里国际站图片说明与参数依据.md>)

## 024 DN65-BS336-PN16-黄铜斜式螺纹消防栓阀

系列分组：室内消火栓及栓阀；收录文件：27。

资料目录：[DN65-BS336-PN16-黄铜斜式螺纹消防栓阀](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/DN65-BS336-PN16-黄铜斜式螺纹消防栓阀>)

## 025 EC-ZST系列-115-68℃-扩大覆盖洒水喷头

系列分组：扩大覆盖喷头；收录文件：19。

资料目录：[EC-ZST系列-115-68℃-扩大覆盖洒水喷头](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/EC-ZST系列-115-68℃-扩大覆盖洒水喷头>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "models": [
    "EC-ZSTX 115-68°C Q3A",
    "EC-ZSTBS 115-68°C Q3A",
    "EC-ZSTZ 115-68°C Q3A"
  ],
  "blocked_assets": [
    {
      "kind": "Dimensions and exact connection",
      "reason": "Need exact-export-SKU drawing/thread gauge record and units."
    },
    {
      "kind": "Pressure, coverage and spacing",
      "reason": "Need exact-export-SKU performance/design sheet or scoped test report."
    },
    {
      "kind": "ISO/EN/UL/FM approvals",
      "reason": "Need valid exact-model documents, holder/authorization and target-country/project applicability."
    },
    {
      "kind": "Packaging",
      "reason": "Need factory-owned photos and package specification for these models."
    }
  ],
  "evidence_notes": {
    "photos": "Three unchanged factory product photographs in source archive; exact model/geometry mapping from source manifest and visible markings.",
    "68C_K115": "Model markings and source 2024 exact-model test report ledger; market-neutral physical/model facts, not foreign compliance.",
    "bulb_material_finish": "Prior user confirmations dated 2026-09-03; no alloy or plating grade inferred.",
    "BSPT": "Standing user-confirmed sprinkler thread family. No nominal thread size, NPT equivalence or ISO 7 compliance claim.",
    "international_standards_context": [
      "https://www.iso.org/cms/%20render/live/en/sites/isoorg/contents/data/standard/07/45/74518.html",
      "https://www.iso.org/standard/20819.html",
      "https://www.ul.com/resources/initiatives-address-new-technology-and-maintain-safety-requirements-fire-sprinklers"
    ]
  }
}
```

参数与证据文档：

- [copy\出口参数与证据台账.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/EC-ZST系列-115-68℃-扩大覆盖洒水喷头/copy/出口参数与证据台账.md>)

## 026 ESFR-K202-68C-早期抑制快速响应喷头

系列分组：大K及ESFR喷头；收录文件：26。

资料目录：[ESFR-K202-68C-早期抑制快速响应喷头](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ESFR-K202-68C-早期抑制快速响应喷头>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "confirmed_facts": [
    {
      "field": "Product type",
      "value": "ESFR sprinkler",
      "grade": "A",
      "applicability": "market-neutral confirmed",
      "evidence": "User-confirmed source package and supplied product photographs"
    },
    {
      "field": "Nominal K-factor",
      "value": "K202",
      "grade": "A",
      "applicability": "market-neutral confirmed",
      "evidence": "User confirmation dated 2026-09-22; visible ESFR-202 marking supports model identity"
    },
    {
      "field": "Nominal temperature",
      "value": "68°C",
      "grade": "A",
      "applicability": "market-neutral confirmed",
      "evidence": "User confirmation dated 2026-09-22"
    },
    {
      "field": "Body material",
      "value": "Copper Body",
      "grade": "A",
      "applicability": "market-neutral confirmed",
      "evidence": "User confirmation dated 2026-09-22"
    },
    {
      "field": "Thread family",
      "value": "BSPT Thread",
      "grade": "A",
      "applicability": "market-neutral confirmed",
      "evidence": "User correction and confirmation dated 2026-09-22; nominal size not supplied"
    },
    {
      "field": "Rated working pressure",
      "value": "1.2 MPa",
      "grade": "A",
      "applicability": "market-neutral confirmed",
      "evidence": "User confirmation dated 2026-09-22"
    },
    {
      "field": "Orientations",
      "value": "Upright / Pendent",
      "grade": "A",
      "applicability": "market-neutral confirmed",
      "evidence": "User-confirmed source mapping for supplied photographs"
    }
  ],
  "blocked_modules": [
    {
      "asset_type_zh": "尺寸连接图",
      "status": "blocked",
      "needed": "Exact-model dimensioned drawing or verified measurements plus nominal BSPT thread size"
    },
    {
      "asset_type_zh": "安装说明图",
      "status": "blocked",
      "needed": "Exact installation orientation, connection, clearance, piping and project/design evidence"
    },
    {
      "asset_type_zh": "认证文件图",
      "status": "blocked",
      "needed": "Valid exact-SKU certificate/listing/report with model scope, holder and validity"
    },
    {
      "asset_type_zh": "包装装箱图",
      "status": "blocked",
      "needed": "Authentic packaging photographs, package dimensions, gross/net weight and quantity per carton"
    },
    {
      "asset_type_zh": "应用场景图",
      "status": "blocked",
      "needed": "Confirmed intended application and sufficient interface/scale evidence for a technically plausible scene"
    }
  ]
}
```

参数与证据文档：

- [copy\阿里国际站图片上传与参数说明.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ESFR-K202-68C-早期抑制快速响应喷头/copy/阿里国际站图片上传与参数说明.md>)

## 027 ESFR系列-早期抑制快速响应洒水喷头

系列分组：大K及ESFR喷头；收录文件：25。

资料目录：[ESFR系列-早期抑制快速响应洒水喷头](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ESFR系列-早期抑制快速响应洒水喷头>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "evidence_files": [
    "source/早期-202_主体授权待核对.pdf",
    "copy/evidence-and-standards-ledger.md"
  ],
  "blocked_assets": [
    {
      "asset_type_zh": "认证文件图",
      "reason": "Exact export-SKU foreign certification and mark authorization are missing"
    },
    {
      "asset_type_zh": "尺寸连接图",
      "reason": "Model-specific approved drawings and exact dimensions are missing"
    },
    {
      "asset_type_zh": "包装装箱图",
      "reason": "Factory-owned packaging photos and packing data are missing"
    },
    {
      "asset_type_zh": "K242/K363实物图",
      "reason": "Matching model-specific real photos are missing"
    }
  ]
}
```

参数与证据文档：

- [copy\evidence-and-standards-ledger.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ESFR系列-早期抑制快速响应洒水喷头/copy/evidence-and-standards-ledger.md>)

## 028 FDC-2W-美式双口消防队进水口

系列分组：水泵接合器及消防队进水口；收录文件：18。

资料目录：[FDC-2W-美式双口消防队进水口](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/FDC-2W-美式双口消防队进水口>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "product_model": "FDC-2W",
  "confirmed_claims": {
    "model": "FDC-2W",
    "inlets": "2 x 2½ in NH (NST) female swivel inlets",
    "system_connection": "4 in NPT system connection",
    "dual_clapper": "Dual clapper design",
    "body": "Cast copper alloy body",
    "visible_product": "Two angled inlets, lugged caps and round plate visible in source photos",
    "inlet_form": "Female swivel inlet",
    "visible_clapper": "One clapper visible in source photo",
    "visible_caps": "Lugged inlet caps visible in source photos",
    "category_application": "Fire department water supply interface for building fire protection system selection"
  },
  "confirmed_claim_evidence": "User confirmation dated 2026-09-21 recorded in source archive product-content-sheet.yaml and confirmed-data-ledger.csv; direct product photographs for visible details.",
  "blocked_claims": [
    "working pressure",
    "flow rate",
    "exact dimensions and weight",
    "NH thread pitch and tolerance",
    "NPT thread gaging result",
    "exact alloy grade",
    "seal material",
    "standard compliance",
    "UL/FM/other certification",
    "installed orientation and riser geometry",
    "packaging and delivery promises"
  ]
}
```

参数与证据文档：

- [copy\参数与标准核验.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/FDC-2W-美式双口消防队进水口/copy/参数与标准核验.md>)

## 029 FHGV25-BS336-300PSI-CU-消防水带闸阀

系列分组：消防闸阀；收录文件：20。

资料目录：[FHGV25-BS336-300PSI-CU-消防水带闸阀](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/FHGV25-BS336-300PSI-CU-消防水带闸阀>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "internal_identifier_not_factory_model": "FHGV25-BS336-300PSI-CU",
  "confirmed_facts": [
    {
      "claim": "Fire Hose Gate Valve; straight-through external configuration",
      "evidence_grade": "A",
      "applicability": "market-neutral confirmed",
      "source": "source/01-主图-原始实拍.jpg; source/02-另一端接口-原始实拍.jpg; source archive user-selected product identity"
    },
    {
      "claim": "2-1/2 in. nominal size",
      "evidence_grade": "A",
      "applicability": "market-neutral confirmed",
      "source": "archive copy/product-content-sheet.yaml: user confirmation 2026-09-22"
    },
    {
      "claim": "Copper body",
      "evidence_grade": "A",
      "applicability": "market-neutral confirmed",
      "source": "archive copy/product-content-sheet.yaml: user confirmation 2026-09-22"
    },
    {
      "claim": "300 PSI maximum working pressure",
      "evidence_grade": "A",
      "applicability": "market-neutral confirmed",
      "source": "archive copy/2026-09-22-标准与压力纠错记录.md: user confirmation"
    },
    {
      "claim": "BS 336 coupling family",
      "evidence_grade": "A",
      "applicability": "market-neutral confirmed; destination fit must be checked",
      "source": "archive copy/2026-09-22-标准与压力纠错记录.md: user confirmation"
    },
    {
      "claim": "BS 336:2010 is a British specification for fire hose couplings and ancillary equipment",
      "evidence_grade": "C",
      "applicability": "standard context only; not a SKU certification",
      "source": "https://landingpage.bsigroup.com/LandingPage/Undated?UPI=000000000000198092"
    }
  ],
  "blocked_optional_assets": [
    {
      "type": "dimension drawing",
      "required_evidence": "dimensioned drawing or measured exact export SKU"
    },
    {
      "type": "installation image",
      "required_evidence": "both mating connections, orientation and application environment"
    },
    {
      "type": "certificate or test image",
      "required_evidence": "current document covering exact export SKU and marketing rights"
    },
    {
      "type": "packaging image",
      "required_evidence": "real package photograph and packing data"
    }
  ]
}
```

## 030 GOST-2in-2.5in-直流喷雾消防水枪

系列分组：消防水枪；收录文件：20。

资料目录：[GOST-2in-2.5in-直流喷雾消防水枪](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/GOST-2in-2.5in-直流喷雾消防水枪>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "user_confirmation": "User selected generic English export version without unverified standards conformity on 2026-09-27.",
  "evidence": [
    {
      "id": "E01",
      "field": "identity",
      "value": "俄式GOST双爪快接直流喷雾消防水枪",
      "source": "copy/原始记录.json confirmed_facts",
      "grade": "A",
      "applicability": "market-neutral confirmed"
    },
    {
      "id": "E02",
      "field": "base_material",
      "value": "Brass",
      "original": "黄铜",
      "source": "2026-09-26 user confirmation retained in copy/原始记录.json",
      "grade": "A",
      "applicability": "market-neutral confirmed",
      "limit": "Does not establish material of every component, grade, purity, coating or corrosion resistance."
    },
    {
      "id": "E03",
      "field": "spray_mode",
      "value": "Adjustable Jet / Spray",
      "source": "2026-09-26 user confirmation retained in copy/原始记录.json",
      "grade": "A",
      "applicability": "market-neutral confirmed"
    },
    {
      "id": "E04",
      "field": "connection_size",
      "value": [
        "2 in GOST-type",
        "2 1/2 in GOST-type"
      ],
      "source": "source/05-型号接口表.png and user confirmation in copy/原始记录.json",
      "grade": "A",
      "applicability": "market-neutral confirmed",
      "limit": "Original supplier size designations; no DN or measured coupling-diameter conversion. GOST-type describes coupling, not conformity."
    },
    {
      "id": "E05",
      "field": "dimensions",
      "value": [
        {
          "size": "2 in",
          "outlet_diameter_mm": 16,
          "A_mm": 305,
          "B_mm": 100
        },
        {
          "size": "2 1/2 in",
          "outlet_diameter_mm": 16,
          "A_mm": 310,
          "B_mm": 116
        }
      ],
      "source": "User confirmation of R07/R08 physical dimensions on 2026-09-26 retained in copy/原始记录.json",
      "grade": "A",
      "applicability": "market-neutral confirmed",
      "limit": "A and B retained as reference codes; no measurement location, length, width or height interpretation."
    },
    {
      "id": "E06",
      "field": "visible_geometry",
      "source": [
        "source/02-正面实物图.jpg",
        "source/03-GOST接口实物图.jpg",
        "source/04-枪头实物图.jpg"
      ],
      "grade": "A",
      "applicability": "market-neutral confirmed",
      "value": [
        "Black flared head",
        "Red longitudinally ribbed grip",
        "Two opposing coupling claws",
        "Black visible seal",
        "Outlet front pale disk and silver cross-head screw"
      ]
    },
    {
      "id": "E07",
      "field": "medium",
      "value": "Water",
      "source": "Original confirmed product identity/function and original listing record",
      "grade": "A",
      "applicability": "market-neutral confirmed",
      "limit": "No claim of foam, chemicals or other media."
    }
  ]
}
```

## 031 JPS0.8-19-D系列-直流喷雾消防软管卷盘

系列分组：软管卷盘；收录文件：21。

资料目录：[JPS0.8-19-D系列-直流喷雾消防软管卷盘](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/JPS0.8-19-D系列-直流喷雾消防软管卷盘>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "blocked_assets": [
    {
      "asset_type": "dimension and connection drawing",
      "reason": "No approved exact-model dimensioned drawing or inlet-interface definition supplied"
    },
    {
      "asset_type": "certification image",
      "reason": "No exact-SKU foreign certificate or approval evidence supplied"
    },
    {
      "asset_type": "packaging image",
      "reason": "No real factory-owned packaging photo for this exact series supplied"
    }
  ]
}
```

参数与证据文档：

- [copy\evidence-crosswalk.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/JPS0.8-19-D系列-直流喷雾消防软管卷盘/copy/evidence-crosswalk.md>)

## 032 JPS0.8-19系列-消防软管卷盘

系列分组：软管卷盘；收录文件：28。

资料目录：[JPS0.8-19系列-消防软管卷盘](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/JPS0.8-19系列-消防软管卷盘>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "models": [
    "JPS0.8-19/20",
    "JPS0.8-19/25",
    "JPS0.8-19/30"
  ],
  "verified_facts": [
    {
      "claim": "JPS0.8-19/20: 0.8 MPa, 19 mm hose inner diameter, 20 m length, 400 mm reel diameter",
      "evidence_grade": "A",
      "evidence": "user-confirmed manufacturer record",
      "applicability": "market-neutral confirmed",
      "publication_status": "publishable"
    },
    {
      "claim": "JPS0.8-19/25: 0.8 MPa, 19 mm hose inner diameter, 25 m length, 430 mm reel diameter",
      "evidence_grade": "A",
      "evidence": "user-confirmed manufacturer record",
      "applicability": "market-neutral confirmed",
      "publication_status": "publishable"
    },
    {
      "claim": "JPS0.8-19/30: 0.8 MPa, 19 mm hose inner diameter, 30 m length, 450 mm reel diameter",
      "evidence_grade": "A",
      "evidence": "user-confirmed manufacturer record",
      "applicability": "market-neutral confirmed",
      "publication_status": "publishable"
    },
    {
      "claim": "Copper nozzle, iron hose connector, aluminum hub",
      "evidence_grade": "A",
      "evidence": "user-confirmed manufacturer record",
      "applicability": "market-neutral confirmed",
      "publication_status": "publishable"
    }
  ],
  "blocked_assets": [
    {
      "asset_type_zh": "尺寸连接图",
      "reason": "no exact-model dimensioned drawing or unchanged measurement photo"
    },
    {
      "asset_type_zh": "安装说明图",
      "reason": "orientation, inlet connection, fixing method and cabinet clearance are not confirmed"
    },
    {
      "asset_type_zh": "认证文件图",
      "reason": "no valid exact-SKU overseas certificate or report supplied"
    },
    {
      "asset_type_zh": "包装装箱图",
      "reason": "no real package photo, dimensions, weight or quantity supplied"
    },
    {
      "asset_type_zh": "多角度展示图",
      "reason": "no exact-model rear/side/interface photo set supplied"
    }
  ]
}
```

参数与证据文档：

- [copy\source-evidence-ledger.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/JPS0.8-19系列-消防软管卷盘/copy/source-evidence-ledger.md>)

## 033 JPS1.0-19-E系列-直流喷雾消防软管卷盘

系列分组：软管卷盘；收录文件：21。

资料目录：[JPS1.0-19-E系列-直流喷雾消防软管卷盘](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/JPS1.0-19-E系列-直流喷雾消防软管卷盘>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "verified_facts": [
    {
      "claim": "JPS1.0-19/20E: 1.0 MPa, 19 mm hose, 20 m length, 400 mm reel diameter",
      "evidence_grade": "B",
      "evidence": "current exact-model CHUANWEI FIRE product page",
      "applicability": "market-neutral confirmed",
      "publication_status": "publishable"
    },
    {
      "claim": "JPS1.0-19/25E: 1.0 MPa, 19 mm hose, 25 m length, 430 mm reel diameter",
      "evidence_grade": "B",
      "evidence": "current exact-model CHUANWEI FIRE product page",
      "applicability": "market-neutral confirmed",
      "publication_status": "publishable"
    },
    {
      "claim": "JPS1.0-19/30E: 1.0 MPa, 19 mm hose, 30 m length, 450 mm reel diameter",
      "evidence_grade": "B",
      "evidence": "current exact-model CHUANWEI FIRE product page",
      "applicability": "market-neutral confirmed",
      "publication_status": "publishable"
    },
    {
      "claim": "Copper-alloy jet/spray nozzle and quick coupling; iron hub",
      "evidence_grade": "B",
      "evidence": "current exact-model CHUANWEI FIRE product page and visible source photo",
      "applicability": "market-neutral confirmed",
      "publication_status": "publishable"
    }
  ],
  "blocked_assets": [
    {
      "asset_type": "尺寸连接图",
      "reason": "no exact-model dimensioned drawing or connection-interface evidence"
    },
    {
      "asset_type": "安装说明图",
      "reason": "mounting orientation, inlet connection, valve, support and clearance are not confirmed"
    },
    {
      "asset_type": "认证文件图",
      "reason": "no valid exact-SKU foreign-market certificate or report supplied"
    },
    {
      "asset_type": "包装装箱图",
      "reason": "no real package photo, dimensions, weight or quantity supplied"
    }
  ]
}
```

## 034 JPS1.0-19系列-消防软管卷盘

系列分组：软管卷盘；收录文件：23。

资料目录：[JPS1.0-19系列-消防软管卷盘](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/JPS1.0-19系列-消防软管卷盘>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "verified_facts": {
    "working_pressure": "1.0 MPa / 10 bar / 145 psi",
    "hose_inside_diameter": "19 mm / 3/4 in",
    "hose_lengths": "20 / 25 / 30 m; 65.6 / 82.0 / 98.4 ft",
    "reel_plate_diameters": "400 / 430 / 450 mm; 15.7 / 16.9 / 17.7 in",
    "nozzle": "straight-stream, thickened copper-alloy nozzle",
    "inlet_connector": "iron; exact interface not published",
    "central_hub": "iron"
  },
  "blocked_assets": [
    "connected installation image",
    "dimension and connection drawing",
    "certification or test image",
    "packaging image",
    "true multi-angle gallery"
  ]
}
```

参数与证据文档：

- [copy\evidence-ledger.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/JPS1.0-19系列-消防软管卷盘/copy/evidence-ledger.md>)

## 035 JPS1.6-19-F系列-直流喷雾消防软管卷盘

系列分组：软管卷盘；收录文件：24。

资料目录：[JPS1.6-19-F系列-直流喷雾消防软管卷盘](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/JPS1.6-19-F系列-直流喷雾消防软管卷盘>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "evidence_sources": [
    {
      "source": "source/JPS1.6-19-F-series-直流喷雾共用实物图.jpg",
      "type": "factory-owned real product photograph",
      "use": "product appearance, visible components, original physical marking"
    },
    {
      "source": "source/JPS1.6-19-F-series-实物抠图-透明.png",
      "type": "derived real-product cutout",
      "use": "all product-bearing layouts"
    },
    {
      "source": "https://www.chuanweifire.com/products/%E8%BD%AF%E7%AE%A1%E5%8D%B7%E7%9B%98/jet-spray-fire-hose-reel.html",
      "type": "exact-series manufacturer page",
      "use": "model, pressure class, hose bore, hose lengths, reel plate, nozzle, coupling and hub facts",
      "evidence_grade": "B",
      "model_scope": "JPS1.6-19-F series"
    },
    {
      "source": "source/1688-source-manifest.json",
      "type": "prior domestic-package manifest",
      "use": "user-confirmed product/photo mapping and candidate fact cross-check"
    }
  ],
  "verified_facts": [
    {
      "claim": "Jet / Spray Fire Hose Reel",
      "evidence_grade": "A/B",
      "applicability": "market-neutral confirmed",
      "publication_status": "publishable"
    },
    {
      "claim": "Pressure class 1.6 MPa / 16 bar / 232 psi",
      "source_value": "1.6 MPa",
      "conversion": "1 MPa = 10 bar; 1 MPa = 145.0377 psi; rounded to nearest psi",
      "evidence_grade": "B",
      "applicability": "market-neutral confirmed",
      "publication_status": "publishable as pressure class; not as foreign-standard working-pressure compliance"
    },
    {
      "claim": "19 mm / nominal 3/4 in semi-rigid hose",
      "source_value": "19 mm / 3/4 in",
      "evidence_grade": "B",
      "applicability": "market-neutral confirmed",
      "publication_status": "publishable"
    },
    {
      "claim": "20 / 25 / 30 m hose lengths; 65.6 / 82.0 / 98.4 ft",
      "conversion": "metres multiplied by 3.28084; rounded to one decimal place",
      "evidence_grade": "B",
      "applicability": "market-neutral confirmed",
      "publication_status": "publishable"
    },
    {
      "claim": "0.7 mm / 0.028 in reel plate",
      "conversion": "0.7 divided by 25.4 = 0.02756 in; rounded to 0.028 in",
      "evidence_grade": "B",
      "applicability": "market-neutral confirmed",
      "publication_status": "publishable"
    },
    {
      "claim": "Copper jet/spray nozzle, copper quick coupling, iron hub",
      "evidence_grade": "A/B",
      "applicability": "market-neutral confirmed",
      "publication_status": "publishable"
    },
    {
      "claim": "Reel diameter confirmed by approved order schedule",
      "evidence_grade": "B",
      "applicability": "market-neutral confirmed",
      "publication_status": "publishable as a selection note; no fixed diameter published"
    }
  ],
  "blocked_assets": [
    {
      "asset_type": "Primary reel body and reel plate material or grade",
      "status": "blocked",
      "reason": "Only component materials are confirmed; the primary reel body and plate material or grade has not been supplied"
    },
    {
      "asset_type": "Exact dimension drawing",
      "status": "blocked",
      "reason": "No exact-SKU dimensioned drawing or unchanged measurement photo"
    },
    {
      "asset_type": "Foreign certification file image",
      "status": "blocked",
      "reason": "No current exact-SKU EN/CE/UL/FM/LPCB or country-approval document"
    },
    {
      "asset_type": "Connected installation diagram",
      "status": "blocked",
      "reason": "Connection standard, mating interface, reel diameter and installation clearance are not confirmed"
    },
    {
      "asset_type": "Packaging evidence image",
      "status": "blocked",
      "reason": "No real exact-series packaging photograph or verified packing specification"
    }
  ]
}
```

参数与证据文档：

- [copy\evidence-and-standard-crosswalk.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/JPS1.6-19-F系列-直流喷雾消防软管卷盘/copy/evidence-and-standard-crosswalk.md>)

## 036 JPS1.6-19系列-消防软管卷盘

系列分组：软管卷盘；收录文件：25。

资料目录：[JPS1.6-19系列-消防软管卷盘](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/JPS1.6-19系列-消防软管卷盘>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "exact_model_photo": "source/JPS1.6-19-user-photo-original.jpg",
  "verified_manufacturer_facts": {
    "working_pressure": "1.6 MPa",
    "hose_inside_diameter": "19 mm",
    "hose_lengths": [
      "20 m",
      "25 m",
      "30 m"
    ],
    "reel_plate_thickness": "0.7 mm",
    "nozzle": "Copper straight-stream",
    "inlet_component": "Iron; connection designation not supplied",
    "reel_hub": "Iron"
  },
  "not_produced_without_evidence": [
    "front/side/back multi-angle product photography",
    "dimensioned and connection-standard drawing",
    "installation or cabinet-clearance illustration",
    "actual packaging and shipping data",
    "exact-SKU international certificate or approval graphic"
  ]
}
```

参数与证据文档：

- [source\1688-source-evidence-ledger.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/JPS1.6-19系列-消防软管卷盘/source/1688-source-evidence-ledger.md>)

## 037 K-ZST-series-68C-快速响应洒水喷头

系列分组：快速响应喷头；收录文件：17。

资料目录：[K-ZST-series-68C-快速响应洒水喷头](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/K-ZST-series-68C-快速响应洒水喷头>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "confirmed_market_neutral_facts": [
    "Temperature option: 68°C (155°F)",
    "K-factor: K 80 metric",
    "Connection designation: R 1/2",
    "Configurations: upright, pendent, sidewall",
    "Copper frame",
    "Quick response product family"
  ],
  "blocked_assets": [
    "Dimension/connection drawing — matching drawing not supplied",
    "Installation scene — verified clearances and mating connection not supplied",
    "Certification image — exact-SKU export certificate not supplied"
  ]
}
```

参数与证据文档：

- [copy\evidence-crosswalk.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/K-ZST-series-68C-快速响应洒水喷头/copy/evidence-crosswalk.md>)

## 038 K-ZST-series-93C-快速响应洒水喷头

系列分组：快速响应喷头；收录文件：23。

资料目录：[K-ZST-series-93C-快速响应洒水喷头](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/K-ZST-series-93C-快速响应洒水喷头>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "confirmed_market_neutral_facts": [
    "Temperature option: 93°C (200°F)",
    "K-factor: K 80 metric",
    "Connection designation: R 1/2",
    "Configurations: upright, pendent, sidewall",
    "Copper frame",
    "Quick response product family"
  ],
  "blocked_assets": [
    "White-background product image — no real 93°C product photo",
    "Product detail and marking images — no green-bulb/93°C-marked source photo",
    "Dimension/connection drawing — matching drawing not supplied",
    "Documentary installed scene — verified clearances and mating connection not supplied; only a non-connected application visualization is provided",
    "Certification image — exact-SKU export certificate not supplied"
  ]
}
```

参数与证据文档：

- [copy\evidence-crosswalk.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/K-ZST-series-93C-快速响应洒水喷头/copy/evidence-crosswalk.md>)

## 039 K-ZST161-68-Q3-161快速响应洒水喷头

系列分组：大K及ESFR喷头；收录文件：21。

资料目录：[K-ZST161-68-Q3-161快速响应洒水喷头](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/K-ZST161-68-Q3-161快速响应洒水喷头>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "models": [
    {
      "model": "K-ZSTZ 161-68°C Q3",
      "orientation": "upright"
    },
    {
      "model": "K-ZSTX 161-68°C Q3",
      "orientation": "pendent"
    }
  ],
  "target_market_scope": "market-neutral base set; no country-specific approval claim",
  "not_generated_blocked_assets": [
    {
      "asset_type_zh": "尺寸连接图",
      "reason": "missing exact-model dimensioned drawing and verified thread designation"
    },
    {
      "asset_type_zh": "安装说明图",
      "reason": "missing exact connection thread, installation clearance and approved orientation instructions"
    },
    {
      "asset_type_zh": "认证文件图",
      "reason": "no exact-export-SKU UL, FM, EN, ISO, CE or other authorization evidence"
    },
    {
      "asset_type_zh": "包装装箱图",
      "reason": "no real packaging photos or confirmed carton data"
    },
    {
      "asset_type_zh": "压力性能图",
      "reason": "no exact-model pressure rating or test report"
    }
  ]
}
```

参数与证据文档：

- [copy\参数证据与国际标准说明.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/K-ZST161-68-Q3-161快速响应洒水喷头/copy/参数证据与国际标准说明.md>)

## 040 K-ZST161-68-Q3-161快速响应消防喷头

系列分组：大K及ESFR喷头；收录文件：23。

资料目录：[K-ZST161-68-Q3-161快速响应消防喷头](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/K-ZST161-68-Q3-161快速响应消防喷头>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "models": [
    {
      "model": "K-ZSTZ 161-68°C Q3",
      "configuration": "Upright",
      "source_image": "source/161快速上喷-原图.jpg",
      "marking_image": "source/上喷溅水盘标识-原图.jpg"
    },
    {
      "model": "K-ZSTX 161-68°C Q3",
      "configuration": "Pendent",
      "source_image": "source/161快速下喷-原图.jpg",
      "marking_image": "source/下喷溅水盘标识-原图.jpg"
    }
  ],
  "publication_scope": "Only exact-model and market-neutral facts are shown. The set does not claim ISO, EN, UL, FM, LPCB, CE, NFPA or country-specific compliance, listing, approval or certification.",
  "verified_facts": [
    {
      "field": "upright_model",
      "value": "K-ZSTZ 161-68°C Q3",
      "evidence_grade": "A",
      "evidence": [
        "source/161快速上喷-原图.jpg",
        "source/上喷溅水盘标识-原图.jpg",
        "source/1688来源清单.json"
      ],
      "market_applicability": "market-neutral confirmed",
      "publication_status": "published"
    },
    {
      "field": "pendent_model",
      "value": "K-ZSTX 161-68°C Q3",
      "evidence_grade": "A",
      "evidence": [
        "source/161快速下喷-原图.jpg",
        "source/下喷溅水盘标识-原图.jpg",
        "source/1688来源清单.json"
      ],
      "market_applicability": "market-neutral confirmed",
      "publication_status": "published"
    },
    {
      "field": "response_type",
      "value": "Quick Response",
      "source_value": "快速响应",
      "evidence_grade": "A",
      "evidence": [
        "source/1688来源清单.json"
      ],
      "market_applicability": "market-neutral confirmed",
      "publication_status": "published"
    },
    {
      "field": "nominal_temperature",
      "value": "68°C / 155°F",
      "source_value": "68°C",
      "conversion_or_mapping": "68°C is shown with the internationally used nominal sprinkler rating notation 155°F; arithmetic conversion is 154.4°F and the nominal industry rating is displayed as 155°F.",
      "evidence_grade": "A for 68°C exact-model marking; C for international nominal temperature notation",
      "evidence": [
        "source/上喷溅水盘标识-原图.jpg",
        "source/下喷溅水盘标识-原图.jpg",
        "https://www.tyco-fire.com/-/media/project/jci-global/fire-suppression/tyco-fire/tyco-fire/files/tfpp_pb_01-25_v2-%281%29.pdf"
      ],
      "market_applicability": "market-neutral confirmed",
      "publication_status": "published"
    },
    {
      "field": "body_material",
      "value": "Copper",
      "source_value": "铜",
      "evidence_grade": "A",
      "evidence": [
        "source/1688来源清单.json"
      ],
      "claim_limit": "Do not expand to pure copper, brass, a specific alloy grade, plating process, corrosion resistance, or all components being copper.",
      "market_applicability": "market-neutral confirmed",
      "publication_status": "published"
    },
    {
      "field": "physical_product_marking",
      "value": "冠亚",
      "evidence_grade": "A",
      "evidence": [
        "source/161快速上喷-原图.jpg",
        "source/161快速下喷-原图.jpg"
      ],
      "market_applicability": "market-neutral confirmed",
      "publication_status": "preserved unchanged"
    },
    {
      "field": "glass_bulb_diameter",
      "value": "3 mm",
      "evidence_grade": "A",
      "evidence": [
        "User confirmation on 2026-09-24 for the quick-response sprinkler series"
      ],
      "claim_limit": "Diameter only; no RTI value or response-test standard is claimed.",
      "market_applicability": "market-neutral confirmed",
      "publication_status": "published"
    },
    {
      "field": "frame_material",
      "value": "Copper (all-copper frame)",
      "source_value": "全铜框架",
      "evidence_grade": "A",
      "evidence": [
        "User confirmation on 2026-09-24 for the exact product series"
      ],
      "claim_limit": "The authentic silver-colored surface is preserved; no copper alloy grade, purity, plating type, coating or corrosion-resistance claim is made.",
      "market_applicability": "market-neutral confirmed",
      "publication_status": "published"
    },
    {
      "field": "deflector_material",
      "value": "Stainless Steel",
      "source_value": "不锈钢洒水盘",
      "evidence_grade": "A",
      "evidence": [
        "User confirmation on 2026-09-24 for the exact product series"
      ],
      "claim_limit": "No stainless-steel grade, surface-treatment or corrosion-resistance claim is made.",
      "market_applicability": "market-neutral confirmed",
      "publication_status": "published"
    }
  ],
  "blocked_assets": [
    {
      "asset_type_zh": "尺寸连接图",
      "status": "blocked",
      "required_evidence": "Exact-model dimensioned drawing and confirmed export thread/interface specification."
    },
    {
      "asset_type_zh": "安装说明图",
      "status": "blocked",
      "required_evidence": "Confirmed installation orientation, connection standard and size, torque/clearance instructions and target project requirements."
    },
    {
      "asset_type_zh": "认证文件图",
      "status": "blocked",
      "required_evidence": "Current certificate/listing/test report covering the exact export SKU, standard version, holder, scope and validity."
    },
    {
      "asset_type_zh": "包装装箱图",
      "status": "blocked",
      "required_evidence": "Factory-owned packaging photos, packing quantity, included accessories and carton data for these models."
    }
  ]
}
```

## 041 K-ZST161系列-68℃Q3快速响应消防喷头

系列分组：大K及ESFR喷头；收录文件：40。

资料目录：[K-ZST161系列-68℃Q3快速响应消防喷头](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/K-ZST161系列-68℃Q3快速响应消防喷头>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "evidence_ledger": [
    {
      "field": "upright model",
      "value": "K-ZSTZ 161-68°C Q3",
      "evidence_grade": "A",
      "source": "explicit user confirmation and source/K-ZSTZ161-68℃Q3-直立型溅水盘标识实拍.jpg",
      "applicability": "market-neutral confirmed",
      "publishable": true
    },
    {
      "field": "pendent model",
      "value": "K-ZSTX 161-68°C Q3",
      "evidence_grade": "A",
      "source": "explicit user confirmation and source/K-ZSTX161-68℃Q3-下垂型溅水盘标识实拍.jpg",
      "applicability": "market-neutral confirmed",
      "publishable": true
    },
    {
      "field": "response type",
      "value": "Quick Response",
      "evidence_grade": "A",
      "source": "archived user confirmation",
      "applicability": "market-neutral confirmed",
      "publishable": true
    },
    {
      "field": "nominal operating temperature",
      "source_market_value": "68°C",
      "target_market_value": "68°C",
      "conversion_formula": null,
      "evidence_grade": "A",
      "source": "explicit user confirmation and the two user-supplied deflector-marking close-ups",
      "applicability": "market-neutral confirmed",
      "publishable": true
    },
    {
      "field": "material",
      "value": "Copper",
      "evidence_grade": "A",
      "source": "archived explicit manufacturer confirmation: 材质是铜",
      "claim_limit": "does not assert pure copper, alloy grade, coating, or that every component is copper",
      "applicability": "market-neutral confirmed",
      "publishable": true
    },
    {
      "field": "packaging appearance",
      "value": "printed sprinkler-series cartons secured with white binding straps",
      "evidence_grade": "A",
      "source": "user-supplied warehouse photograph",
      "claim_limit": "does not confirm exact SKU carton label, pieces per carton, carton dimensions, net/gross weight or shipment configuration",
      "applicability": "packaging reference only",
      "publishable": true
    },
    {
      "field": "maximum working pressure",
      "source_market_value": "12 bar",
      "target_market_value": "12 bar",
      "conversion_formula": null,
      "evidence_grade": "A",
      "source": "explicit user confirmation on 2026-09-15",
      "claim_limit": "manufacturer value only; does not imply a pressure class, listing, certification or project approval",
      "applicability": "market-neutral confirmed",
      "publishable": true
    },
    {
      "field": "nominal connection size",
      "value": "DN20",
      "evidence_grade": "A",
      "source": "explicit user confirmation on 2026-09-15",
      "applicability": "market-neutral confirmed",
      "publishable": true
    },
    {
      "field": "thread type",
      "value": "BSPT",
      "evidence_grade": "A",
      "source": "explicit user confirmation on 2026-09-15",
      "claim_limit": "does not assert interchangeability with NPT, BSPP, G, R or Rc thread designations",
      "applicability": "market-neutral confirmed",
      "publishable": true
    },
    {
      "field": "application",
      "value": "Storage and Non-Storage Applications",
      "evidence_grade": "A",
      "source": "explicit user confirmation on 2026-09-15",
      "claim_limit": "does not assert hazard classification, coverage area, system design criteria, certification or completed-project evidence",
      "applicability": "market-neutral confirmed",
      "publishable": true
    },
    {
      "field": "installation orientation",
      "value": "upright model above branch pipe; pendent model below branch pipe",
      "evidence_grade": "A",
      "source": "explicit user confirmation on 2026-09-15",
      "applicability": "market-neutral confirmed",
      "publishable": true
    },
    {
      "field": "glass bulb nominal diameter",
      "value": "3 mm",
      "evidence_grade": "A",
      "source": "explicit user confirmation on 2026-09-16",
      "claim_limit": "diameter identification only; does not add response-time, RTI, certification or performance claims",
      "applicability": "market-neutral confirmed",
      "publishable": true
    }
  ],
  "blocked_modules": [
    {
      "module": "overall dimensions",
      "reason": "DN20 BSPT connection is confirmed, but no exact export-SKU dimensioned drawing or overall dimensions were supplied",
      "required_input": "dimensioned drawing or signed exact-model specification"
    },
    {
      "module": "packing quantity and delivery data",
      "reason": "carton appearance is now evidenced, but exact SKU label, pieces per carton, carton dimensions, net/gross weight and delivery configuration remain unconfirmed",
      "required_input": "packing list or signed exact-model packing specification"
    },
    {
      "module": "certification and test evidence",
      "reason": "no valid exact-export-SKU certificate or report supplied",
      "required_input": "certificate/report showing model scope, standard version, holder and validity"
    }
  ],
  "confirmed_specs_render_script": "../../../tools/build_k161_confirmed_specs_and_installation.ps1"
}
```

参数与证据文档：

- [copy\参数候选与安装场景待确认.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/K-ZST161系列-68℃Q3快速响应消防喷头/copy/参数候选与安装场景待确认.md>)

## 042 K-ZST80系列-93℃Q3A快速响应洒水喷头

系列分组：快速响应喷头；收录文件：30。

资料目录：[K-ZST80系列-93℃Q3A快速响应洒水喷头](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/K-ZST80系列-93℃Q3A快速响应洒水喷头>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "facts": [
    {
      "field": "model",
      "source_value": "K-ZSTZ 80-93℃ Q3A / K-ZSTX 80-93℃ Q3A / K-ZSTBS 80-93℃ Q3A",
      "target_value": "same model strings, ℃ rendered as °C",
      "basis": "source photos 01–06; latest 1688 source manifest",
      "grade": "A",
      "applicability": "market-neutral confirmed",
      "publish": true
    },
    {
      "field": "temperature",
      "source_value": "93℃",
      "target_value": "93°C (approx. 200°F)",
      "basis": "exact model markings visible on source photos 01,04,05,06",
      "formula": "93 × 9/5 + 32 = 199.4°F; nominal rounded class display approximately 200°F; not an additional test result",
      "grade": "A",
      "applicability": "market-neutral confirmed",
      "publish": true
    },
    {
      "field": "response",
      "source_value": "快速响应 Q3A",
      "target_value": "Quick response",
      "basis": "latest archived manufacturer/user record; no imported RTI or UL/FM response certification",
      "grade": "A archived user confirmation",
      "applicability": "market-neutral confirmed",
      "publish": true
    },
    {
      "field": "body",
      "source_value": "铜本体",
      "target_value": "Copper Body",
      "basis": "standing user-confirmed sprinkler defaults in active Alibaba skill",
      "grade": "A",
      "applicability": "market-neutral confirmed",
      "publish": true
    },
    {
      "field": "bulb",
      "source_value": "3 mm 绿色",
      "target_value": "3 mm Glass Bulb; Green",
      "basis": "standing user-confirmed quick-response defaults; green liquid visible in all full product photographs",
      "grade": "A",
      "applicability": "market-neutral confirmed",
      "publish": true
    },
    {
      "field": "thread_family",
      "source_value": "BSPT",
      "target_value": "BSPT Thread",
      "basis": "standing user-confirmed sprinkler defaults",
      "grade": "A",
      "applicability": "market-neutral confirmed",
      "publish": true
    },
    {
      "field": "thread_size",
      "source_value": "4分; older generic 93C draft claimed R 1/2",
      "target_value": null,
      "basis": "latest exact Q3A input does not establish export interface drawing/designation",
      "grade": "unmapped",
      "applicability": "unmapped",
      "publish": false
    },
    {
      "field": "K_factor",
      "source_value": "80 within model; older generic draft claimed K80/K5.6",
      "target_value": null,
      "basis": "no current exact-SKU flow datasheet or units; latest input explicitly unconfirmed",
      "grade": "unmapped",
      "applicability": "unmapped",
      "publish": false
    },
    {
      "field": "pressure_dimensions_finish",
      "source_value": null,
      "target_value": null,
      "basis": "no matching report/drawing/coating confirmation",
      "grade": "missing",
      "applicability": "unmapped",
      "publish": false
    },
    {
      "field": "international_compliance",
      "source_value": null,
      "target_value": null,
      "basis": "no exact-SKU export reports/certificates; ISO pages establish category context only",
      "grade": "C category context",
      "applicability": "unmapped",
      "publish": false
    }
  ],
  "blocked_optional_assets": [
    {
      "type": "尺寸图",
      "need": "三款精确型号尺寸图纸或实测记录"
    },
    {
      "type": "压力与K系数参数",
      "need": "本型号参数表、单位和测试依据"
    },
    {
      "type": "国际认证图",
      "need": "覆盖确切型号的有效证书/报告及出口国家要求"
    },
    {
      "type": "安装场景",
      "need": "真实配置、接口、安装方向与项目要求"
    },
    {
      "type": "包装装箱图",
      "need": "真实包装照片和装箱数"
    }
  ]
}
```

参数与证据文档：

- [copy\参数依据与国际表达.json](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/K-ZST80系列-93℃Q3A快速响应洒水喷头/copy/参数依据与国际表达.json>)
- [source\原1688参数记录.json](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/K-ZST80系列-93℃Q3A快速响应洒水喷头/source/原1688参数记录.json>)

## 043 KD50-KD65-内扣式消防接口

系列分组：消防水带及接口；收录文件：20。

资料目录：[KD50-KD65-内扣式消防接口](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/KD50-KD65-内扣式消防接口>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "verified_facts": {
    "models": [
      "KD50",
      "KD65"
    ],
    "nominal_sizes": [
      "DN50",
      "DN65"
    ],
    "nominal_pressure_original": "1.6 MPa",
    "nominal_pressure_converted": "16 bar",
    "conversion_note": "Arithmetic conversion only; not a foreign pressure-class equivalence",
    "medium": "Water",
    "body_material": "Aluminium alloy",
    "seal_material": "NBR / nitrile rubber",
    "finish": "Gray coating",
    "overall_dimensions": {
      "KD50": "Ø98 × 77.5 mm",
      "KD65": "Ø111 × 82.5 mm"
    },
    "confirmation_reference": "User-confirmed manufacturer facts recorded 2026-08-17 in the supplied archive"
  },
  "blocked_assets": [
    {
      "asset_type_zh": "国际标准认证图",
      "reason": "Missing target country/project, exact export interface drawing, current applicable standard mapping, and exact-SKU approval evidence"
    },
    {
      "asset_type_zh": "认证文件图",
      "reason": "No exact-SKU overseas certificate or listing supplied"
    },
    {
      "asset_type_zh": "包装装箱图",
      "reason": "No real packaging photos or packing data supplied"
    },
    {
      "asset_type_zh": "KD50独立实物图",
      "reason": "No independent KD50 real sample photo supplied"
    }
  ]
}
```

参数与证据文档：

- [copy\evidence-and-standard-release.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/KD50-KD65-内扣式消防接口/copy/evidence-and-standard-release.md>)

## 044 KD66-俄式消防接口

系列分组：消防水带及接口；收录文件：42。

资料目录：[KD66-俄式消防接口](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/KD66-俄式消防接口>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "blocked_assets": [
    {
      "sequence": 9,
      "asset_type_zh": "规格参数图",
      "publication_status": "blocked",
      "required_input": "Confirm export-SKU hose specification, working pressure, medium, material and exact interface standard."
    },
    {
      "sequence": 10,
      "asset_type_zh": "安装说明图",
      "publication_status": "blocked",
      "required_input": "Confirmed mating interface, connection arrangement, orientation, hose size, clearance and application environment."
    },
    {
      "sequence": 11,
      "asset_type_zh": "型号对比图",
      "publication_status": "blocked",
      "required_input": "Real KD51 product photo and exact export-model differences."
    },
    {
      "sequence": 12,
      "asset_type_zh": "包装装箱图",
      "publication_status": "blocked",
      "required_input": "Real factory-owned KD66 packaging photos and confirmed packing quantity."
    },
    {
      "sequence": 13,
      "asset_type_zh": "认证文件图",
      "publication_status": "blocked",
      "required_input": "Current certificate or test report covering exact KD66 export SKU and target country/project."
    }
  ]
}
```

参数与证据文档：

- [copy\evidence-and-release.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/KD66-俄式消防接口/copy/evidence-and-release.md>)

## 045 mist-nozzle-4f-6f-20260922-离心式水雾喷头

系列分组：水雾及水幕喷头；收录文件：22。

资料目录：[mist-nozzle-4f-6f-20260922-离心式水雾喷头](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/mist-nozzle-4f-6f-20260922-离心式水雾喷头>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "evidence_summary": {
    "publishable_market_neutral_facts": [
      "Centrifugal Water Mist Nozzle",
      "Stainless Steel Body",
      "BSPT Female Thread",
      "Single Round Outlet",
      "Two Size Options"
    ],
    "withheld_fields": [
      "formal model",
      "exact Rc/Rp/R thread designation and nominal size",
      "stainless steel grade",
      "working pressure",
      "flow coefficient",
      "flow rate",
      "spray angle",
      "droplet size",
      "dimensions and weight",
      "installation orientation",
      "standard compliance",
      "UL/FM/LPCB/CE/CCCF or other approval",
      "packaging data"
    ],
    "release_rule": "No domestic 4分/6分 conversion, pressure class, standard code, certification, or performance value is published without exact export-SKU evidence."
  },
  "technical_crosswalk": [
    {
      "field": "connection",
      "source_value": "BSPT内螺纹",
      "target_copy": "BSPT Female Thread",
      "evidence": "user confirmation plus visible female thread",
      "applicability": "market-neutral confirmed",
      "publishable": true,
      "standard_basis": "No ISO 7-1 compliance claim; exact Rc/Rp designation and size remain withheld"
    },
    {
      "field": "size",
      "source_value": "4分 / 6分",
      "target_copy": "Two Size Options",
      "evidence": "user confirmation",
      "applicability": "unmapped",
      "publishable": true,
      "standard_basis": "Only the count of options is published; no inch or DN conversion"
    },
    {
      "field": "material",
      "source_value": "不锈钢",
      "target_copy": "Stainless Steel Body",
      "evidence": "user confirmation",
      "applicability": "market-neutral confirmed",
      "publishable": true,
      "standard_basis": "No alloy grade, coating, corrosion, pressure, or durability claim"
    },
    {
      "field": "water_mist_standard_or_approval",
      "source_value": null,
      "target_copy": null,
      "evidence": "no exact-SKU export certificate/report",
      "applicability": "unmapped",
      "publishable": false,
      "standard_basis": "NFPA 750, UL 2167, and EN 14972 are contextual references only and do not prove this SKU complies"
    }
  ]
}
```

参数与证据文档：

- [copy\国际站图片参数证据表.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/mist-nozzle-4f-6f-20260922-离心式水雾喷头/copy/国际站图片参数证据表.md>)

## 046 NH-NST-25-2.5英寸NH-NST黄铜消防水带内胀接头

系列分组：消防水带及接口；收录文件：25。

资料目录：[NH-NST-25-2.5英寸NH-NST黄铜消防水带内胀接头](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/NH-NST-25-2.5英寸NH-NST黄铜消防水带内胀接头>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "formal_model_status": "not supplied; internal SKU is not presented as a certified or factory model",
  "evidence_ledger": {
    "visible_product": {
      "grade": "A",
      "applicability": "market-neutral confirmed",
      "basis": "factory-owned real photos and faithful background-edited derivative"
    },
    "nominal_size": {
      "value": "2.5 in",
      "grade": "A",
      "applicability": "market-neutral confirmed",
      "basis": "visible 2.5-inch casting mark plus user confirmation dated 2026-09-22"
    },
    "thread_designation": {
      "value": "2.5–7.5 NH/NST",
      "grade": "A for NH/NST identity; C for standard terminology",
      "applicability": "market-neutral confirmed designation; compliance not claimed",
      "basis": "user-confirmed NH/NST plus ASME B1.20.7-1991 (R2024) and NFPA terminology context"
    },
    "body_material": {
      "value": "Brass",
      "grade": "A",
      "applicability": "market-neutral confirmed",
      "basis": "user confirmation dated 2026-09-22; alloy grade not supplied"
    },
    "connection_type": {
      "value": "Expansion-ring type",
      "grade": "A",
      "applicability": "market-neutral confirmed",
      "basis": "visible male/female/ring components plus user confirmation dated 2026-09-22"
    },
    "visible_components": {
      "value": "male coupling, female swivel, two expansion rings, dual lugs",
      "grade": "A",
      "applicability": "market-neutral confirmed",
      "basis": "real product photos"
    },
    "visible_sealing_ring": {
      "value": "black ring visible; compound unspecified",
      "grade": "A for appearance only",
      "applicability": "market-neutral confirmed appearance",
      "basis": "real close-up photo"
    },
    "pressure_options": {
      "value": "1.6 MPa (16 bar) / 2.5 MPa (25 bar)",
      "grade": "A",
      "applicability": "market-neutral manufacturer-confirmed options; exact SKU mapping pending",
      "basis": "user confirmation dated 2026-09-22; arithmetic conversion 1 MPa = 10 bar"
    },
    "hose_tail_options": {
      "value": "73 mm / 2-13/16 in / 3 in",
      "grade": "A",
      "applicability": "market-neutral manufacturer-confirmed options; exact SKU mapping pending",
      "basis": "user confirmation dated 2026-09-22"
    }
  },
  "blocked_or_omitted": [
    {
      "asset": "dimension drawing",
      "reason": "no exact-SKU dimensioned drawing or real measurement record"
    },
    {
      "asset": "certification image",
      "reason": "no exact-SKU certificate/report and authorization"
    },
    {
      "asset": "packaging image",
      "reason": "no real packaging photo or packing data"
    },
    {
      "asset": "installed connection image",
      "reason": "hose size, installation procedure and mating equipment configuration are not fully evidenced"
    },
    {
      "claim": "NFPA/UL/FM/CE compliance or certification",
      "reason": "NH/NST designation alone does not prove certification or listing"
    },
    {
      "claim": "seal compound such as EPDM or NBR",
      "reason": "compound not supplied"
    }
  ]
}
```

## 047 NH15-旋转可调式直流喷雾消防水枪头

系列分组：消防水枪；收录文件：27。

资料目录：[NH15-旋转可调式直流喷雾消防水枪头](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/NH15-旋转可调式直流喷雾消防水枪头>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "manufacturer_model": null,
  "current_confirmation": "75 US GPM（美制），暂不指定国家标准",
  "parameter_crosswalk": [
    {
      "status": "market-neutral confirmed",
      "grade": "A",
      "source_value": "旋转可调式直流喷雾消防水枪头",
      "field": "Identity",
      "target_value": "Adjustable Fire Hose Nozzle",
      "basis": "Prior explicit user identification"
    },
    {
      "status": "market-neutral confirmed",
      "conversion": "75 * 3.785412 = 283.9059 L/min; rounded to nearest 1 L/min",
      "grade": "A",
      "source_value": "75 GPM",
      "field": "Flow",
      "target_value": "75 US gpm (approx. 284 L/min)",
      "basis": "Current user confirmation: 75 US GPM（美制），暂不指定国家标准"
    },
    {
      "target_value": "100 psi (approx. 6.89 bar / 0.689 MPa)",
      "source_value": "100 PSI",
      "conversion": "100 * 6894.757 = 689475.7 Pa; /100000 = 6.894757 bar; /1000000 = 0.6894757 MPa",
      "basis": "Prior explicit user confirmation",
      "limitations": "No maximum/working/test-pressure characterization and no flow-at-pressure claim",
      "grade": "A",
      "status": "market-neutral confirmed",
      "field": "Pressure"
    },
    {
      "status": "market-neutral confirmed",
      "conversion": "None; no BSP/NPT or measured diameter substitution",
      "grade": "A",
      "source_value": "1½英寸 NH/NST 内螺纹",
      "field": "Connection",
      "target_value": "1½ in NH/NST female thread",
      "basis": "Prior explicit user confirmation"
    },
    {
      "status": "market-neutral confirmed",
      "grade": "A",
      "source_value": "聚碳酸酯主体＋黄铜部件",
      "field": "Materials",
      "target_value": "Polycarbonate body; brass components",
      "basis": "Prior explicit user confirmation"
    },
    {
      "status": "market-neutral confirmed",
      "conversion": "None; not thread dimensions or inferred diameters",
      "grade": "A",
      "source_value": "73 × 73 × 117 mm 宽×深×高",
      "field": "Overall dimensions",
      "target_value": "73 × 73 × 117 mm (W × D × H)",
      "basis": "User confirmation recorded 2026-09-27"
    },
    {
      "status": "market-neutral confirmed",
      "grade": "A",
      "source_value": "旋转调节；直流/喷雾/关闭",
      "field": "Modes",
      "target_value": "Twist adjustment; Straight stream / Fog / Shutoff",
      "basis": "Prior confirmed product identity and recorded facts"
    },
    {
      "status": "market-neutral confirmed",
      "grade": "A",
      "source_value": "NOT FOR ELECTRICAL FIRES",
      "field": "Warning",
      "target_value": "NOT FOR ELECTRICAL FIRES",
      "basis": "Unchanged source-04-side-real.jpg molded warning"
    },
    {
      "status": "unverified; not placed in artwork",
      "grade": null,
      "source_value": null,
      "field": "Standards/certifications",
      "target_value": null,
      "basis": "No exact-SKU report or certificate and no destination specified"
    }
  ]
}
```

参数与证据文档：

- [copy\原始确认记录.txt](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/NH15-旋转可调式直流喷雾消防水枪头/copy/原始确认记录.txt>)
- [copy\参数及上传说明.txt](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/NH15-旋转可调式直流喷雾消防水枪头/copy/参数及上传说明.txt>)
- [copy\参数映射与依据.json](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/NH15-旋转可调式直流喷雾消防水枪头/copy/参数映射与依据.json>)

## 048 PT-series-不锈钢网型泡沫喷头

系列分组：泡沫喷头及配件；收录文件：34。

资料目录：[PT-series-不锈钢网型泡沫喷头](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/PT-series-不锈钢网型泡沫喷头>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "models": [
    "PT-15",
    "PT-20",
    "PT-25"
  ],
  "confirmed_facts": {
    "material": "Stainless Steel",
    "connection_family": "BSPT Male Thread",
    "model_thread_mapping": {
      "PT-15": "R1/2 BSPT",
      "PT-20": "R3/4 BSPT",
      "PT-25": "R1 BSPT"
    }
  },
  "blocked_assets": [
    "International certification image",
    "Performance curve or pressure-flow image",
    "Dimension and connection drawing",
    "Connected installation image",
    "System-specific application scene",
    "Packaging and delivery image"
  ]
}
```

参数与证据文档：

- [copy\evidence-and-export-crosswalk.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/PT-series-不锈钢网型泡沫喷头/copy/evidence-and-export-crosswalk.md>)

## 049 QG-MS-BP系列-自动消防水带插针架

系列分组：消防水带及接口；收录文件：28。

资料目录：[QG-MS-BP系列-自动消防水带插针架](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/QG-MS-BP系列-自动消防水带插针架>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "user_confirmation": "2026-09-28: 未指定市场，使用已确认参数",
  "models": [
    {
      "model": "QG/MS-BP-010",
      "inlet_designation": "1½ in",
      "overall_length_mm": 513,
      "opening_diameter_mm": 49,
      "product_weight_kg": 2
    },
    {
      "model": "QG/MS-BP-011",
      "inlet_designation": "2½ in",
      "overall_length_mm": 667,
      "opening_diameter_mm": 73.5,
      "product_weight_kg": 2.9
    }
  ],
  "evidence_basis": "User-confirmed manufacturer record preserved in supplied archive (2026-09-26), reconfirmed for use by user (2026-09-28); real series photos",
  "confirmed_material": {
    "body": "Cast iron",
    "evidence_grade": "A — user confirmed",
    "source": "source/用户确认-主体材质.txt",
    "market_applicability": "market-neutral confirmed",
    "scope": "body only",
    "date": "2026-09-28"
  }
}
```

参数与证据文档：

- [copy\上传顺序与参数说明.txt](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/QG-MS-BP系列-自动消防水带插针架/copy/上传顺序与参数说明.txt>)
- [copy\参数核验表.json](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/QG-MS-BP系列-自动消防水带插针架/copy/参数核验表.json>)
- [source\用户确认-主体材质.txt](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/QG-MS-BP系列-自动消防水带插针架/source/用户确认-主体材质.txt>)

## 050 QG-MS-GS-010-英式双口消防队进水口

系列分组：水泵接合器及消防队进水口；收录文件：21。

资料目录：[QG-MS-GS-010-英式双口消防队进水口](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/QG-MS-GS-010-英式双口消防队进水口>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "buyer_visible_model": null,
  "evidence": [
    {
      "field": "产品与接口",
      "grade": "A: archived explicit user confirmation + supplied catalog",
      "source": "copy/source-manifest.json:user_confirmation_log; source/07-画册型号规格截屏.png",
      "applicability": "market-neutral confirmed; no certification claim",
      "source_value": "2 × 2½ in BS336; 4 in（100 mm）法兰",
      "published_value": "2 × 2½ in BS 336; 4 in flange (nominal)",
      "conversion": "none; 100 mm omitted to avoid suggesting exact physical conversion; no DN or flange standard inferred"
    },
    {
      "field": "可见结构",
      "grade": "A: real source photos",
      "source": "source/02 through source/06",
      "applicability": "market-neutral confirmed",
      "published_value": "Two caps with chains; handwheel-operated side valve; two visible spring assemblies"
    },
    {
      "field": "BS336版本与范围",
      "grade": "C: standard context only",
      "url": "https://landingpage.bsigroup.com/LandingPage/Undated?UPI=000000000000198092",
      "finding": "BS 336:2010 listed by BSI for fire hose couplings and ancillary equipment",
      "publication": "No edition-specific or product compliance claim; only confirmed interface designation BS 336"
    },
    {
      "field": "BS5041-3",
      "grade": "C: category context only",
      "url": "https://landingpage.bsigroup.com/LandingPage/Series?UPI=BS+5041",
      "publication": "Not in artwork; no exact-SKU compliance evidence"
    }
  ],
  "blocked_modules": [
    {
      "type": "材质工艺及压力性能",
      "reason": "No exact-product material or pressure records"
    },
    {
      "type": "尺寸及法兰制式",
      "reason": "No matching dimensioned drawing or flange specification"
    },
    {
      "type": "标准符合性及认证",
      "reason": "No exact-product report/certificate or target-country/project evidence"
    },
    {
      "type": "安装应用",
      "reason": "No verified mounting, connection or installation evidence"
    },
    {
      "type": "包装与工厂",
      "reason": "No real authorized packaging/factory evidence"
    }
  ],
  "user_confirmation": "先做通用英文版，仅用已确认参数"
}
```

## 051 QG-MS-HSW-011-横向手轮螺纹式消防栓阀

系列分组：室内消火栓及栓阀；收录文件：29。

资料目录：[QG-MS-HSW-011-横向手轮螺纹式消防栓阀](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/QG-MS-HSW-011-横向手轮螺纹式消防栓阀>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "evidence": [
    "source/09-HSW型号接口表.png",
    "copy/产品内容表-HSW-011.yaml",
    "copy/产品识别与资料核验-20260926.md",
    "Current task user approval: 通用英文版，先用现有确认资料"
  ]
}
```

参数与证据文档：

- [copy\产品识别与资料核验-20260926.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/QG-MS-HSW-011-横向手轮螺纹式消防栓阀/copy/产品识别与资料核验-20260926.md>)
- [copy\参数与标准核验.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/QG-MS-HSW-011-横向手轮螺纹式消防栓阀/copy/参数与标准核验.md>)

## 052 QLD6.0-6.5-I-直流喷雾水枪

系列分组：消防水枪；收录文件：18。

资料目录：[QLD6.0-6.5-I-直流喷雾水枪](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/QLD6.0-6.5-I-直流喷雾水枪>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "model": "QLD6.0/6.5 I",
  "user_confirmation": "暂无指定，先做通用英文版",
  "evidence_documents": [
    {
      "file": "D:\\work\\codex\\yunying\\outputs\\chuanwei-fire-commerce\\qld6-0-6-5-i-直流喷雾水枪\\source\\检测报告-QLD6.0-6.5I-天津消防研究所.pdf",
      "number": "Gn202501411-01",
      "relevant_pdf_pages": [
        3,
        4,
        5,
        6,
        7,
        8
      ],
      "scope": "Exact model, domestic GB 8181-2005 testing; results apply to tested samples"
    },
    {
      "file": "D:\\work\\codex\\yunying\\outputs\\chuanwei-fire-commerce\\qld6-0-6-5-i-直流喷雾水枪\\source\\检测报告-QLD6.0-6.5I-玖安检测.pdf",
      "number": "2025-JAJC-BG0880",
      "relevant_pdf_pages": [
        3,
        4,
        5,
        6
      ],
      "scope": "Exact model, domestic GB 8181-2005 testing; results apply to tested samples"
    }
  ]
}
```

## 053 QZ3.5-7.5-直流水枪

系列分组：消防水枪；收录文件：21。

资料目录：[QZ3.5-7.5-直流水枪](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/QZ3.5-7.5-直流水枪>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "verified_facts": [
    {
      "claim": "Product type: straight-stream fire hose nozzle",
      "evidence_grade": "A",
      "evidence_file": "Archived user-confirmed product data and source/QZ3.5-7.5-source-01.jpg",
      "model_coverage": "QZ3.5/7.5",
      "market_applicability": "market-neutral confirmed",
      "publication_status": "publishable"
    },
    {
      "claim": "Manufacturer model: QZ3.5/7.5",
      "evidence_grade": "A",
      "evidence_file": "Archived user-confirmed product data; cast marking visible in the product photo",
      "model_coverage": "QZ3.5/7.5",
      "market_applicability": "market-neutral confirmed",
      "publication_status": "publishable"
    },
    {
      "claim": "Rated nozzle pressure: 0.35 MPa",
      "evidence_grade": "A",
      "evidence_file": "Archived user-confirmed product data",
      "model_coverage": "QZ3.5/7.5",
      "source_market_value": "0.35 MPa",
      "conversion_formula": "0.35 MPa × 10 = 3.5 bar; 0.35 MPa × 145.0377 = 50.763 psi, rounded to 51 psi",
      "market_applicability": "market-neutral confirmed as manufacturer-rated performance; no standard-compliance implication",
      "publication_status": "publishable"
    },
    {
      "claim": "Rated flow: 7.5 L/s",
      "evidence_grade": "A",
      "evidence_file": "Archived user-confirmed product data",
      "model_coverage": "QZ3.5/7.5",
      "source_market_value": "7.5 L/s",
      "conversion_formula": "7.5 L/s × 60 = 450 L/min; 7.5 L/s × 15.8503 = 118.877 US gpm, rounded to 119 US gpm",
      "market_applicability": "market-neutral confirmed as manufacturer-rated performance; no standard-compliance implication",
      "publication_status": "publishable"
    },
    {
      "claim": "Nominal inlet: DN65",
      "evidence_grade": "A",
      "evidence_file": "Archived user-confirmed product data",
      "model_coverage": "QZ3.5/7.5",
      "market_applicability": "market-neutral nominal designation; mating coupling standard remains unmapped",
      "publication_status": "publishable only with the interface-confirmation wording used in assets 06 and 11"
    },
    {
      "claim": "Body material: Aluminum Alloy",
      "evidence_grade": "A",
      "evidence_file": "User confirmation in conversation on 2026-09-20",
      "model_coverage": "QZ3.5/7.5",
      "market_applicability": "market-neutral confirmed",
      "publication_status": "publishable as Aluminum Alloy only; exact alloy grade, secondary-component materials, surface process, and material-performance claims remain unverified"
    }
  ],
  "blocked_assets": [
    {
      "asset_type": "尺寸连接图",
      "missing_evidence": "Exact-model dimensioned drawing or unchanged measurement photos for every labeled dimension and unit. Archived dimensions were not reused for export artwork without a matching drawing."
    },
    {
      "asset_type": "认证文件图",
      "missing_evidence": "Valid exact-SKU certificate or test report covering the target market and authorizing use of the mark."
    },
    {
      "asset_type": "安装说明图",
      "missing_evidence": "Confirmed mating coupling standard, exact connection arrangement, hose specification, operating orientation, and clearance."
    },
    {
      "asset_type": "包装装箱图",
      "missing_evidence": "Exact-model real packaging photos, packing quantity, carton dimensions, net weight, and gross weight."
    }
  ]
}
```

参数与证据文档：

- [copy\evidence-and-standards.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/QZ3.5-7.5-直流水枪/copy/evidence-and-standards.md>)

## 054 RIA25-20M-消防软管卷盘

系列分组：软管卷盘；收录文件：18。

资料目录：[RIA25-20M-消防软管卷盘](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/RIA25-20M-消防软管卷盘>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "source_model": "RIA25-30M"
}
```

参数与证据文档：

- [copy\evidence-and-review.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/RIA25-20M-消防软管卷盘/copy/evidence-and-review.md>)

## 055 RIA25-25M-消防软管卷盘

系列分组：软管卷盘；收录文件：16。

资料目录：[RIA25-25M-消防软管卷盘](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/RIA25-25M-消防软管卷盘>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "source_model": "RIA25-30M"
}
```

参数与证据文档：

- [copy\evidence-and-review.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/RIA25-25M-消防软管卷盘/copy/evidence-and-review.md>)

## 056 RIA25-30M-消防软管卷盘

系列分组：软管卷盘；收录文件：20。

资料目录：[RIA25-30M-消防软管卷盘](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/RIA25-30M-消防软管卷盘>)

参数与证据文档：

- [copy\evidence-ledger.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/RIA25-30M-消防软管卷盘/copy/evidence-ledger.md>)

## 057 SN65-Y-SNZ65-Y系列-卷盘消火栓

系列分组：软管卷盘；收录文件：24。

资料目录：[SN65-Y-SNZ65-Y系列-卷盘消火栓](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/SN65-Y-SNZ65-Y系列-卷盘消火栓>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "evidence_summary": {
    "accepted_sources": [
      "source/SN65-Y-原图.jpg",
      "source/SNZ65-Y-原图.jpg",
      "source/SN65-Y-report.pdf",
      "source/SNZ65-Y-report.pdf",
      "source/历史已确认资料.md"
    ],
    "exact_model_reports": {
      "SN65-Y": "Zb2021M1068",
      "SNZ65-Y": "Zb2021M1069"
    },
    "source_market_standard": "GB 3445-2018",
    "export_release_basis": "Market-neutral exact-model facts only; no EN, BS, ISO product-compliance, NFPA, UL, FM, LPCB or CE claim",
    "international_context": [
      {
        "reference": "ISO 7-1:1994",
        "scope": "Pipe-thread dimensions, tolerances and designation; current edition confirmed by ISO in 2026",
        "use_in_package": "Terminology context only; not presented as evidence that the finished product is ISO-certified"
      },
      {
        "reference": "BS 5041-1:1987",
        "scope": "Landing valves for wet risers with specified materials, inlet forms and BS 336 delivery connections",
        "use_in_package": "Not claimed; supplied KN65 configuration has no matching BS evidence"
      },
      {
        "reference": "ANSI/CAN/UL 668:2025",
        "scope": "Hose valves for fire-protection service",
        "use_in_package": "Not claimed; no UL listing or exact-model certificate supplied"
      }
    ]
  },
  "blocked_or_omitted": [
    {
      "asset": "Material specification image",
      "status": "blocked",
      "reason": "Source conflict: historical record says HPb59-1 stem, while both exact-model reports say 06Cr19Ni10 stainless-steel stem.",
      "release_input": "Manufacturer-confirmed component material sheet covering both exact models and current production revision"
    },
    {
      "asset": "Production dimension drawing",
      "status": "blocked",
      "reason": "Reports contain tested-sample measurements, not a released production drawing or guaranteed dimensions.",
      "release_input": "Signed/current production drawing or explicit confirmation authorizing each report sample value as a production dimension"
    },
    {
      "asset": "Packaging image",
      "status": "blocked",
      "reason": "No real packaging photo, quantity, carton size, net weight or gross weight supplied.",
      "release_input": "Factory-owned packaging photos and confirmed packing data"
    },
    {
      "asset": "Connected installation image",
      "status": "blocked",
      "reason": "Exact mating coupling, local interface, orientation, clearance and target-country system are not confirmed.",
      "release_input": "Destination project drawing and connection/clearance specification"
    },
    {
      "asset": "Foreign-standard certification image",
      "status": "blocked",
      "reason": "No exact-model EN/BS/UL/FM/LPCB/CE evidence; country/project not supplied.",
      "release_input": "Named destination country/project plus valid exact-model approval/certificate and authorization"
    }
  ]
}
```

参数与证据文档：

- [copy\evidence-ledger.json](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/SN65-Y-SNZ65-Y系列-卷盘消火栓/copy/evidence-ledger.json>)
- [source\SN65-Y-report.pdf](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/SN65-Y-SNZ65-Y系列-卷盘消火栓/source/SN65-Y-report.pdf>)
- [source\SNZ65-Y-report.pdf](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/SN65-Y-SNZ65-Y系列-卷盘消火栓/source/SNZ65-Y-report.pdf>)
- [source\历史已确认资料.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/SN65-Y-SNZ65-Y系列-卷盘消火栓/source/历史已确认资料.md>)

## 058 SN65-室内消火栓

系列分组：室内消火栓及栓阀；收录文件：25。

资料目录：[SN65-室内消火栓](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/SN65-室内消火栓>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "user_confirmation": {
    "question": "目标国家/标准及出口实物与 DN65、1.6 MPa、Rp 2½、KN65 是否一致",
    "answer": "通用展示，配置一致"
  },
  "missing_or_excluded_assets": [
    {
      "type": "尺寸图",
      "reason": "缺对应型号正式尺寸图/原始测量证据，旧参数图标记 manual_review"
    },
    {
      "type": "认证检测图",
      "reason": "无覆盖本型号出口配置的国际认证或检验报告"
    },
    {
      "type": "包装装箱图",
      "reason": "无本型号真实包装照片、重量、装箱数量"
    },
    {
      "type": "材质工艺图",
      "reason": "无阀体、接口、密封及涂层材质证据"
    },
    {
      "type": "连接安装图",
      "reason": "无出口安装图及配套接口证据；06 仅为未连接产品的情境展示"
    }
  ]
}
```

参数与证据文档：

- [copy\参数与标准核验.json](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/SN65-室内消火栓/copy/参数与标准核验.json>)
- [source\原1688参数资料.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/SN65-室内消火栓/source/原1688参数资料.md>)

## 059 SNW65-III-外贸型单出口斜式消防栓阀

系列分组：室内消火栓及栓阀；收录文件：23。

资料目录：[SNW65-III-外贸型单出口斜式消防栓阀](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/SNW65-III-外贸型单出口斜式消防栓阀>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "model": "SNW65-III",
  "confirmed_facts": {
    "nominal_size": "DN65 / 2½ in",
    "inlet": "2½ in BSP male",
    "outlet": "BS 336 quick coupling",
    "outlet_angle": "45°",
    "rated_working_pressure": "1.6 MPa / 16 bar / 232 psi",
    "strength_test_pressure": "2.4 MPa / 24 bar / 348 psi",
    "seal_test_pressure": "1.76 MPa / 17.6 bar / 255 psi",
    "materials": {
      "body_and_bonnet": "QT450-10 ductile iron",
      "stem": "HPb59-1 leaded brass",
      "handwheel": "cast iron",
      "seals": "NBR"
    },
    "approximate_dimensions": "H 170 mm; L 250 mm; W 200 mm",
    "mounting": "vertical, bottom inlet to riser",
    "application": "indoor fire-hose cabinet or building wet riser"
  },
  "blocked_assets": [
    "Packaging image: no real exact-SKU packing evidence supplied",
    "Certification/evidence image: no exact-SKU publishable certificate or report supplied"
  ]
}
```

参数与证据文档：

- [copy\标准与参数说明.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/SNW65-III-外贸型单出口斜式消防栓阀/copy/标准与参数说明.md>)

## 060 SNW65系列-减压稳压室内消火栓

系列分组：室内消火栓及栓阀；收录文件：27。

资料目录：[SNW65系列-减压稳压室内消火栓](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/SNW65系列-减压稳压室内消火栓>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "models": [
    "SNW65-I-A",
    "SNW65-II",
    "SNW65-III"
  ],
  "blocked_assets": [
    {
      "asset_type": "尺寸连接图",
      "reason": "No exact-model dimensioned drawing or unchanged measurement photos; export connection standard is unmapped."
    },
    {
      "asset_type": "安装说明图",
      "reason": "No confirmed orientation, mating interface, support, clearance, or installation drawing."
    },
    {
      "asset_type": "认证文件图",
      "reason": "No exact-SKU international certificate/listing or authorization was supplied."
    },
    {
      "asset_type": "包装装箱图",
      "reason": "No real factory-owned packaging photos or verified packing data were supplied."
    }
  ]
}
```

参数与证据文档：

- [copy\evidence-ledger.json](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/SNW65系列-减压稳压室内消火栓/copy/evidence-ledger.json>)

## 061 SNZW65系列-旋转减压稳压室内消火栓

系列分组：室内消火栓及栓阀；收录文件：25。

资料目录：[SNZW65系列-旋转减压稳压室内消火栓](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/SNZW65系列-旋转减压稳压室内消火栓>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "models": [
    "SNZW65-I-A",
    "SNZW65-II",
    "SNZW65-III"
  ],
  "primary_evidence": "source/SNZW65-III-检验报告.pdf",
  "user_confirmed_facts": {
    "body_material_en": "Ductile Iron",
    "body_material_zh": "球墨铸铁",
    "coverage": "SNZW65 series body: SNZW65-I-A, SNZW65-II and SNZW65-III",
    "confirmation_date": "2026-09-24",
    "material_grade": "Not supplied; no grade claim permitted"
  },
  "blocked_or_excluded_assets": [
    {
      "asset": "International certification/compliance image",
      "reason": "No exact-export-SKU NFPA, EN, UL, FM, LPCB, CE or destination-authority approval evidence was supplied."
    },
    {
      "asset": "SNZW65-I-A and SNZW65-II performance/dimension/secondary-material pages",
      "reason": "Series body material is user-confirmed as ductile iron, but no exact-model export-applicable report or drawing was found for performance, dimensions or secondary component materials."
    },
    {
      "asset": "Packaging image",
      "reason": "No real factory-owned packaging photograph for these exact models was supplied."
    },
    {
      "asset": "Connected installation image",
      "reason": "The side outlet coupling standard and project-specific mating connection were not verified; a non-connected contextual scene was used instead."
    }
  ]
}
```

参数与证据文档：

- [source\SNZW65-III-检验报告.pdf](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/SNZW65系列-旋转减压稳压室内消火栓/source/SNZW65-III-检验报告.pdf>)

## 062 sprinkler-accessories-消防喷淋配件系列

系列分组：其他洒水喷头及配件；收录文件：30。

资料目录：[sprinkler-accessories-消防喷淋配件系列](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/sprinkler-accessories-消防喷淋配件系列>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "facts_released": [
    "Five visibly distinct accessory configurations are shown.",
    "Visible geometry labels only: center opening, central cover, wire cage, band cage, screw-clamp form and two-bolt clamp form.",
    "Visible finish appearance only: metallic, white and red; no material or coating claim."
  ],
  "blocked_assets": [
    {
      "asset": "Exact numeric specification table",
      "reason": "No exact SKU, dimensions, material, interface or exact-model technical sheet."
    },
    {
      "asset": "Dimension and connection drawing",
      "reason": "No controlled drawing or unchanged real measurement photo."
    },
    {
      "asset": "Material and process image",
      "reason": "Appearance does not prove material grade, coating or corrosion performance."
    },
    {
      "asset": "Connected installation or application scene",
      "reason": "Exact orientation, sprinkler model, mounting arrangement, interface and clearance were not supplied."
    },
    {
      "asset": "Certification image",
      "reason": "No exact-model valid certificate/approval with holder, scope and authorization."
    },
    {
      "asset": "Packaging image",
      "reason": "No real package or packing evidence for this accessory family."
    }
  ],
  "missing_inputs": [
    "Formal manufacturer SKU/model mapping for all five items",
    "Exact English product names approved by the manufacturer",
    "Material and finish records by component",
    "Outer diameter, inner/cover diameter, height and mounting dimensions with units",
    "Compatible sprinkler manufacturer and exact sprinkler model",
    "Export configuration mapping and destination country/project specification",
    "Current exact-model certificates, approvals, reports and controlled drawings",
    "Real packaging photos and packing specification"
  ]
}
```

## 063 STORZ-JET-SPRAY-FULL-德式黄铜直流喷雾消防水枪

系列分组：消防水枪；收录文件：23。

资料目录：[STORZ-JET-SPRAY-FULL-德式黄铜直流喷雾消防水枪](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/STORZ-JET-SPRAY-FULL-德式黄铜直流喷雾消防水枪>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "model_visibility": "internal asset identifier only; no factory model printed on artwork",
  "user_market_confirmation": "通用英文版，暂无指定标准",
  "parameter_crosswalk": [
    {
      "field": "Inlet sizes",
      "archive_value": "DN40 / 1.5 in; DN50 / 2 in; DN65 / 2.5 in",
      "source": "source/1688-source-manifest.json; source/05-size-reference.png",
      "target_basis": null,
      "exact_export_evidence": null,
      "conversion": null,
      "status": "unmapped",
      "publishable": false,
      "reason": "Nominal labels do not establish Storz lug spacing, coupling designation or mating compatibility."
    },
    {
      "field": "Pressure / flow / temperature / physical dimensions / weight",
      "archive_value": null,
      "source": null,
      "target_basis": null,
      "exact_export_evidence": null,
      "conversion": null,
      "status": "missing",
      "publishable": false
    },
    {
      "field": "Standards / certifications",
      "archive_value": null,
      "source": null,
      "target_basis": "General standards research only; not SKU evidence",
      "exact_export_evidence": null,
      "conversion": null,
      "status": "unmapped",
      "publishable": false
    }
  ]
}
```

参数与证据文档：

- [copy\参数核验说明.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/STORZ-JET-SPRAY-FULL-德式黄铜直流喷雾消防水枪/copy/参数核验说明.md>)
- [source\原产品确认记录.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/STORZ-JET-SPRAY-FULL-德式黄铜直流喷雾消防水枪/source/原产品确认记录.md>)

## 064 SUNPOOL-1.5-BSPP-16-黄铜旋转可调消防喷雾水枪

系列分组：消防水枪；收录文件：24。

资料目录：[SUNPOOL-1.5-BSPP-16-黄铜旋转可调消防喷雾水枪](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/SUNPOOL-1.5-BSPP-16-黄铜旋转可调消防喷雾水枪>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "manufacturer_model": null,
  "evidence_policy": "Exact values come from the user's 2026-09-22 confirmation and the three real photos. Metric/imperial conversions do not establish certification or standards compliance.",
  "international_parameter_presentation": {
    "thread_display": "1-1/2 in BSPP (G) parallel female thread; no ISO compliance claim",
    "outlet_display": "16 mm (0.63 in)",
    "max_inlet_pressure": "200 psig | 13.8 bar | 1.38 MPa(g)",
    "rated_working_pressure": "100 psig | 6.9 bar | 0.69 MPa(g)",
    "pressure_conversion": "1 psi = 0.0689476 bar = 0.00689476 MPa; rounded for display"
  },
  "blocked_assets": [
    {
      "asset_type": "overall dimension drawing",
      "reason": "No exact measurements or drawing"
    },
    {
      "asset_type": "hose installation image",
      "reason": "No verified mating coupling or hose configuration"
    },
    {
      "asset_type": "packaging image",
      "reason": "No real packaging photo or pack data"
    },
    {
      "asset_type": "certification image",
      "reason": "No exact-SKU valid certificate or authorization"
    },
    {
      "asset_type": "model comparison",
      "reason": "No second confirmed model"
    }
  ]
}
```

参数与证据文档：

- [copy\parameter-crosswalk.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/SUNPOOL-1.5-BSPP-16-黄铜旋转可调消防喷雾水枪/copy/parameter-crosswalk.md>)
- [copy\图片文案与参数证据.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/SUNPOOL-1.5-BSPP-16-黄铜旋转可调消防喷雾水枪/copy/图片文案与参数证据.md>)

## 065 T-ZST115系列-182℃电镀玻璃球洒水喷头

系列分组：其他洒水喷头及配件；收录文件：25。

资料目录：[T-ZST115系列-182℃电镀玻璃球洒水喷头](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST115系列-182℃电镀玻璃球洒水喷头>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "models": [
    "T-ZSTBS115",
    "T-ZSTZ115",
    "T-ZSTX115"
  ],
  "confirmation_sources": [
    "D:/work/codex/CHUANWEI-OPS-Vault/07-项目与任务/1688-6分182℃电镀铜喷头-图片交付-20261006.json",
    "D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST115系列-182℃电镀玻璃球洒水喷头/copy/1688用户确认记录.txt"
  ],
  "facts": [
    {
      "id": "body",
      "source_value": "铜框架",
      "copy": "Copper body",
      "grade": "A",
      "basis": "用户原文“铜材质”，存档确认记录与独立Vault记录一致。只覆盖铜体/框架，不扩大为所有组件纯铜。",
      "source": [
        "D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST115系列-182℃电镀玻璃球洒水喷头/copy/1688用户确认记录.txt",
        "D:/work/codex/CHUANWEI-OPS-Vault/07-项目与任务/1688-6分182℃电镀铜喷头-图片交付-20261006.json"
      ],
      "product_truth": "confirmed",
      "export_applicability": "market-neutral confirmed",
      "target_country": null,
      "target_standard_basis": null,
      "conversion": null,
      "publishable": true
    },
    {
      "id": "finish",
      "source_value": "表层电镀处理",
      "copy": "Electroplated",
      "grade": "A",
      "basis": "用户原文“表层电镀处理”，未声明镀铬、镀镍或防腐性能。",
      "source": [
        "D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST115系列-182℃电镀玻璃球洒水喷头/copy/1688用户确认记录.txt",
        "D:/work/codex/CHUANWEI-OPS-Vault/07-项目与任务/1688-6分182℃电镀铜喷头-图片交付-20261006.json"
      ],
      "product_truth": "confirmed",
      "export_applicability": "market-neutral confirmed",
      "target_country": null,
      "target_standard_basis": null,
      "conversion": null,
      "publishable": true
    },
    {
      "id": "bulb",
      "source_value": "5mm玻璃球",
      "copy": "5 mm glass bulb",
      "grade": "A",
      "basis": "用户原文“5mm玻璃球”。不推出响应级别/RTI。",
      "source": [
        "D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST115系列-182℃电镀玻璃球洒水喷头/copy/1688用户确认记录.txt",
        "D:/work/codex/CHUANWEI-OPS-Vault/07-项目与任务/1688-6分182℃电镀铜喷头-图片交付-20261006.json"
      ],
      "product_truth": "confirmed",
      "export_applicability": "market-neutral confirmed",
      "target_country": null,
      "target_standard_basis": null,
      "conversion": null,
      "publishable": true
    },
    {
      "id": "temperature",
      "source_value": "三款统一182℃",
      "copy": "Nominal operating temperature: 182°C",
      "grade": "A",
      "basis": "用户原文“三款统一182℃”，source01/04/07原铭文交叉核对。表示动作温度，不表示环境温度。",
      "source": [
        "D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST115系列-182℃电镀玻璃球洒水喷头/copy/1688用户确认记录.txt",
        "D:/work/codex/CHUANWEI-OPS-Vault/07-项目与任务/1688-6分182℃电镀铜喷头-图片交付-20261006.json",
        "D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST115系列-182℃电镀玻璃球洒水喷头/source/01-边墙型-白底原图.jpg",
        "D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST115系列-182℃电镀玻璃球洒水喷头/source/04-上喷型-溅水盘实拍.jpg",
        "D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST115系列-182℃电镀玻璃球洒水喷头/source/07-下喷型182℃-溅水盘实拍.jpg"
      ],
      "product_truth": "confirmed",
      "export_applicability": "market-neutral confirmed",
      "target_country": null,
      "target_standard_basis": null,
      "conversion": null,
      "publishable": true
    },
    {
      "id": "pressure",
      "source_value": "工作压力1.2mpa",
      "copy": "Working pressure: 1.2 MPa",
      "grade": "A",
      "basis": "用户原文“工作压力1.2mpa”，仅作市场中立厂家事实，不映射压力等级或测试认证。",
      "source": [
        "D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST115系列-182℃电镀玻璃球洒水喷头/copy/1688用户确认记录.txt",
        "D:/work/codex/CHUANWEI-OPS-Vault/07-项目与任务/1688-6分182℃电镀铜喷头-图片交付-20261006.json"
      ],
      "product_truth": "confirmed",
      "export_applicability": "market-neutral confirmed",
      "target_country": null,
      "target_standard_basis": null,
      "conversion": null,
      "publishable": true
    },
    {
      "id": "thread",
      "source_value": "BSPT（长期用户确认）",
      "copy": "Thread family: BSPT",
      "grade": "A-standing-user-confirmation",
      "basis": "alibaba-detail-image-studio技能已记录本用户消防喷头默认BSPT，仅家族名称，不推出尺寸、牙型代号或NPT。",
      "source": [
        "C:/Users/zhengfafa/.codex/skills/alibaba-detail-image-studio/SKILL.md"
      ],
      "product_truth": "confirmed",
      "export_applicability": "market-neutral confirmed",
      "target_country": null,
      "target_standard_basis": null,
      "conversion": null,
      "publishable": true
    },
    {
      "id": "types",
      "source_value": "T-ZSTBS115边墙型 / T-ZSTZ115上喷型 / T-ZSTX115下喷型",
      "copy": "Horizontal Sidewall / Upright / Pendent; Factory Model labels",
      "grade": "A",
      "basis": "用户系列确认记录、source01/04/07型号铭文与三张全貌照片共同支持。松散产品摄影朝向不是安装指导。",
      "source": [
        "D:/work/codex/CHUANWEI-OPS-Vault/07-项目与任务/1688-6分182℃电镀铜喷头-图片交付-20261006.json",
        "D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST115系列-182℃电镀玻璃球洒水喷头/copy/1688用户确认记录.txt",
        "D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST115系列-182℃电镀玻璃球洒水喷头/source/01-边墙型-白底原图.jpg",
        "D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST115系列-182℃电镀玻璃球洒水喷头/source/02-上喷型-白底原图.jpg",
        "D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST115系列-182℃电镀玻璃球洒水喷头/source/03-下喷型-白底原图.jpg",
        "D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST115系列-182℃电镀玻璃球洒水喷头/source/04-上喷型-溅水盘实拍.jpg",
        "D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST115系列-182℃电镀玻璃球洒水喷头/source/07-下喷型182℃-溅水盘实拍.jpg"
      ],
      "product_truth": "confirmed",
      "export_applicability": "market-neutral confirmed",
      "target_country": null,
      "target_standard_basis": null,
      "conversion": null,
      "publishable": true
    },
    {
      "id": "bulb_color",
      "source_value": "实物可见紫色玻璃球",
      "copy": "Purple glass bulb",
      "grade": "A-visible-only",
      "basis": "source01/02/03实物摄影；保留颜色和液柱，不由颜色推断其他性能。",
      "source": [
        "D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST115系列-182℃电镀玻璃球洒水喷头/source/01-边墙型-白底原图.jpg",
        "D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST115系列-182℃电镀玻璃球洒水喷头/source/02-上喷型-白底原图.jpg",
        "D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST115系列-182℃电镀玻璃球洒水喷头/source/03-下喷型-白底原图.jpg"
      ],
      "product_truth": "confirmed",
      "export_applicability": "market-neutral confirmed",
      "target_country": null,
      "target_standard_basis": null,
      "conversion": null,
      "publishable": true
    }
  ],
  "missing_data": [
    {
      "field": "K-factor",
      "status": "pending",
      "reason": "型号115不证明K115；缺准确本温级三款的厂家K确认/检验记录。未换算国际K。",
      "needed": "确认公制K数值、单位、流量关系及覆盖的型号/温级。"
    },
    {
      "field": "Thread size / connection designation",
      "status": "unmapped",
      "reason": "存档6分（3/4英寸）为国内标签；无本SKU出口接口图或准确螺纹尺寸确认。仅发布BSPT家族。",
      "needed": "本SKU接口图或出口螺纹尺寸与准确代号确认。"
    },
    {
      "field": "Response classification / RTI",
      "status": "pending",
      "reason": "5mm不能自行推出响应级别；Q5A物理标记保留但未扩写。",
      "needed": "精确型号响应等级和RTI依据。"
    },
    {
      "field": "Country/project export suitability and certifications",
      "status": "pending",
      "reason": "目标国和项目规范未给；未提供覆盖182℃三款的境外审批证书/报告；没有证据证明国内专用，因此不编造也不无依据暂停已确认市场中立图片。",
      "needed": "目标国/项目、出口配置、对应证书与范围。"
    },
    {
      "field": "Dimensions / installation",
      "status": "pending",
      "reason": "缺精确外形尺寸、接口长度、安装配置、净空与适用环境。",
      "needed": "精确型号图纸与安装手册。"
    },
    {
      "field": "Packaging / carton quantity",
      "status": "pending",
      "reason": "无本批包装实拍、数量或防护确认。",
      "needed": "真实包装照片和装箱记录。"
    }
  ]
}
```

参数与证据文档：

- [copy\1688用户确认记录.txt](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST115系列-182℃电镀玻璃球洒水喷头/copy/1688用户确认记录.txt>)
- [copy\事实出处与出口适用检查.txt](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST115系列-182℃电镀玻璃球洒水喷头/copy/事实出处与出口适用检查.txt>)

## 066 T-ZST115系列-260℃高温玻璃球洒水喷头

系列分组：其他洒水喷头及配件；收录文件：36。

资料目录：[T-ZST115系列-260℃高温玻璃球洒水喷头](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST115系列-260℃高温玻璃球洒水喷头>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "factory_models": [
    "T-ZSTBS115-260°C Q5A",
    "T-ZSTZ115-260°C Q5A",
    "T-ZSTX115-260°C Q5A"
  ],
  "facts": [
    {
      "basis": "I1-I3 explicitly confirmed at end of source record and original photographs",
      "standard_basis": "Manufacturer-confirmed product fact only; no foreign compliance equivalence",
      "publishable": true,
      "formula": null,
      "evidence": "D:\\work\\codex\\阿里国际站运营\\outputs\\alibaba-detail-image-studio\\T-ZST115系列-260℃高温玻璃球洒水喷头\\source\\1688用户确认记录.md",
      "exact_configuration": [
        "T-ZSTBS115-260°C Q5A",
        "T-ZSTZ115-260°C Q5A",
        "T-ZSTX115-260°C Q5A"
      ],
      "market_applicability": "market-neutral confirmed",
      "field": "Factory Model and form",
      "source_value": [
        "T-ZSTBS115-260°C Q5A",
        "T-ZSTZ115-260°C Q5A",
        "T-ZSTX115-260°C Q5A"
      ],
      "target_value": [
        "Horizontal Sidewall — Factory Model: T-ZSTBS115-260°C Q5A",
        "Upright — Factory Model: T-ZSTZ115-260°C Q5A",
        "Pendent — Factory Model: T-ZSTX115-260°C Q5A"
      ],
      "evidence_grade": "A",
      "target_country_project": null
    },
    {
      "basis": "D1-D2 explicitly confirmed; visible factory engravings",
      "standard_basis": "Manufacturer-confirmed product fact only; no foreign compliance equivalence",
      "publishable": true,
      "formula": "Notation only; no value conversion",
      "evidence": "D:\\work\\codex\\阿里国际站运营\\outputs\\alibaba-detail-image-studio\\T-ZST115系列-260℃高温玻璃球洒水喷头\\source\\1688用户确认记录.md",
      "exact_configuration": [
        "T-ZSTBS115-260°C Q5A",
        "T-ZSTZ115-260°C Q5A",
        "T-ZSTX115-260°C Q5A"
      ],
      "market_applicability": "market-neutral confirmed",
      "field": "Nominal activation temperature",
      "source_value": "260℃",
      "target_value": "260°C",
      "evidence_grade": "A",
      "target_country_project": null
    },
    {
      "basis": "User explicit copper-body confirmation; no pure copper/brass/alloy expansion",
      "standard_basis": "Manufacturer-confirmed product fact only; no foreign compliance equivalence",
      "publishable": true,
      "formula": null,
      "evidence": "D:\\work\\codex\\阿里国际站运营\\outputs\\alibaba-detail-image-studio\\T-ZST115系列-260℃高温玻璃球洒水喷头\\source\\1688用户确认记录.md",
      "exact_configuration": [
        "T-ZSTBS115-260°C Q5A",
        "T-ZSTZ115-260°C Q5A",
        "T-ZSTX115-260°C Q5A"
      ],
      "market_applicability": "market-neutral confirmed",
      "field": "Body material",
      "source_value": "铜",
      "target_value": "Copper Body",
      "evidence_grade": "A",
      "target_country_project": null
    },
    {
      "basis": "User explicit electroplating confirmation; no chrome/nickel or corrosion promise",
      "standard_basis": "Manufacturer-confirmed product fact only; no foreign compliance equivalence",
      "publishable": true,
      "formula": null,
      "evidence": "D:\\work\\codex\\阿里国际站运营\\outputs\\alibaba-detail-image-studio\\T-ZST115系列-260℃高温玻璃球洒水喷头\\source\\1688用户确认记录.md",
      "exact_configuration": [
        "T-ZSTBS115-260°C Q5A",
        "T-ZSTZ115-260°C Q5A",
        "T-ZSTX115-260°C Q5A"
      ],
      "market_applicability": "market-neutral confirmed",
      "field": "Surface finish",
      "source_value": "电镀",
      "target_value": "Electroplated Finish",
      "evidence_grade": "A",
      "target_country_project": null
    },
    {
      "basis": "User explicit diameter confirmation; response class not inferred",
      "standard_basis": "Manufacturer-confirmed product fact only; no foreign compliance equivalence",
      "publishable": true,
      "formula": null,
      "evidence": "D:\\work\\codex\\阿里国际站运营\\outputs\\alibaba-detail-image-studio\\T-ZST115系列-260℃高温玻璃球洒水喷头\\source\\1688用户确认记录.md",
      "exact_configuration": [
        "T-ZSTBS115-260°C Q5A",
        "T-ZSTZ115-260°C Q5A",
        "T-ZSTX115-260°C Q5A"
      ],
      "market_applicability": "market-neutral confirmed",
      "field": "Glass bulb diameter",
      "source_value": "5 mm",
      "target_value": "5 mm Glass Bulb",
      "evidence_grade": "A",
      "target_country_project": null
    },
    {
      "basis": "User explicit working pressure; not test or burst pressure",
      "standard_basis": "Manufacturer-confirmed product fact only; no foreign compliance equivalence",
      "publishable": true,
      "formula": null,
      "evidence": "D:\\work\\codex\\阿里国际站运营\\outputs\\alibaba-detail-image-studio\\T-ZST115系列-260℃高温玻璃球洒水喷头\\source\\1688用户确认记录.md",
      "exact_configuration": [
        "T-ZSTBS115-260°C Q5A",
        "T-ZSTZ115-260°C Q5A",
        "T-ZSTX115-260°C Q5A"
      ],
      "market_applicability": "market-neutral confirmed",
      "field": "Working pressure",
      "source_value": "1.2 MPa",
      "target_value": "1.2 MPa",
      "evidence_grade": "A",
      "target_country_project": null
    },
    {
      "basis": "D3 explicitly confirmed by user; standing BSPT manufacturer default",
      "standard_basis": "Manufacturer-confirmed product fact only; no foreign compliance equivalence",
      "publishable": true,
      "formula": "Confirmed nominal interface designation, not a pixel or dimensional conversion",
      "evidence": "D:\\work\\codex\\阿里国际站运营\\outputs\\alibaba-detail-image-studio\\T-ZST115系列-260℃高温玻璃球洒水喷头\\source\\1688用户确认记录.md",
      "exact_configuration": [
        "T-ZSTBS115-260°C Q5A",
        "T-ZSTZ115-260°C Q5A",
        "T-ZSTX115-260°C Q5A"
      ],
      "market_applicability": "market-neutral confirmed",
      "field": "Thread",
      "source_value": "6分; BSPT",
      "target_value": "3/4 in BSPT",
      "evidence_grade": "A",
      "target_country_project": null
    },
    {
      "basis": "Only direct visible appearance; no bulb manufacturer approval or test claim",
      "standard_basis": "Manufacturer-confirmed product fact only; no foreign compliance equivalence",
      "publishable": true,
      "formula": null,
      "evidence": "source/01_白底产品原图.jpg through source/06_实拍细节原图.jpg",
      "exact_configuration": [
        "T-ZSTBS115-260°C Q5A",
        "T-ZSTZ115-260°C Q5A",
        "T-ZSTX115-260°C Q5A"
      ],
      "market_applicability": "market-neutral confirmed",
      "field": "Bulb colour and markings",
      "source_value": "Original dark liquid, authentic physical markings",
      "target_value": "Preserved photographically",
      "evidence_grade": "A",
      "target_country_project": null
    }
  ],
  "missing": [
    {
      "status": "pending",
      "reason": "115 is part of factory model, no confirmed metric K value or exact-SKU flow sheet",
      "next_input": "Confirmed metric K and matching data sheet",
      "module": "K comparison omitted; no international K calculated",
      "field": "K-factor"
    },
    {
      "status": "pending",
      "reason": "5 mm bulb alone does not establish a response rating",
      "next_input": "Exact-model manufacturer response statement or matching test report",
      "module": "Response claims omitted",
      "field": "Response class / RTI"
    },
    {
      "status": "pending",
      "reason": "No actual height, deflector diameter or sidewall width measurements",
      "next_input": "Matching dimensioned drawing or verified measurement",
      "module": "Dimension image omitted",
      "field": "Dimensions"
    },
    {
      "status": "pending",
      "reason": "No verified clearance, piping arrangement or permitted environment",
      "next_input": "Exact-model installation manual and confirmed application",
      "module": "Installation/application image omitted",
      "field": "Installation and application"
    },
    {
      "status": "pending",
      "reason": "No original packing photo, pack quantity, dimensions or weight",
      "next_input": "Actual packing photos and manufacturer packing data",
      "module": "Packaging image omitted",
      "field": "Packing"
    },
    {
      "status": "unverified",
      "reason": "No target country/project or matching valid export approval supplied",
      "next_input": "Destination/project requirements plus exact-model valid documents",
      "module": "Certification image omitted; no UL/FM/CE/NFPA/GB compliance claims",
      "field": "Destination compliance / export approval"
    },
    {
      "status": "unavailable",
      "reason": "Input provides local archive only",
      "next_input": "Optional actual offer URL",
      "module": "Source package path retained; no URL fabricated",
      "field": "1688 offer URL"
    }
  ]
}
```

参数与证据文档：

- [copy\事实出处与出口适用性双重检查.json](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST115系列-260℃高温玻璃球洒水喷头/copy/事实出处与出口适用性双重检查.json>)
- [source\1688用户确认记录.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST115系列-260℃高温玻璃球洒水喷头/source/1688用户确认记录.md>)

## 067 T-ZST115系列-57℃特殊响应消防洒水喷头

系列分组：其他洒水喷头及配件；收录文件：38。

资料目录：[T-ZST115系列-57℃特殊响应消防洒水喷头](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST115系列-57℃特殊响应消防洒水喷头>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "confirmed_facts": [
    {
      "field": "Nominal operating temperature",
      "source_value": "57℃",
      "target_value": "57°C",
      "grade": "A",
      "sources": [
        "source/source-1.jpg",
        "source/source-5.jpg",
        "source/source-7.jpg",
        "copy/1688原始事实与缺项.txt"
      ],
      "applicability": "market-neutral confirmed",
      "basis": "Visible exact-model markings plus archived direct user confirmation; not ambient temperature"
    },
    {
      "field": "Body material",
      "source_value": "铜（主体）",
      "target_value": "Copper Body",
      "grade": "A",
      "sources": [
        "C:/Users/zhengfafa/.codex/skills/alibaba-detail-image-studio/SKILL.md"
      ],
      "applicability": "market-neutral confirmed",
      "basis": "Standing direct user confirmation; no alloy, purity or all-components claim"
    },
    {
      "field": "Thread family",
      "source_value": "BSPT",
      "target_value": "BSPT Thread",
      "grade": "A",
      "sources": [
        "C:/Users/zhengfafa/.codex/skills/alibaba-detail-image-studio/SKILL.md"
      ],
      "applicability": "market-neutral confirmed",
      "basis": "Standing direct user confirmation; no thread size, ISO designation or NPT equivalence"
    },
    {
      "field": "Variants and factory models",
      "source_value": "上喷/下喷/边喷；T-ZSTZ/T-ZSTX/T-ZSTBS 115-57℃ Q5A",
      "target_value": "Upright / Pendent / Sidewall; Factory Model",
      "grade": "A",
      "sources": [
        "source/source-1.jpg",
        "source/source-2.jpg",
        "source/source-3.jpg",
        "source/source-5.jpg",
        "source/source-7.jpg",
        "copy/1688原始参数输入.json"
      ],
      "applicability": "market-neutral confirmed",
      "basis": "Exact source-model inscriptions and direct user archive; source display poses are not installation diagrams"
    },
    {
      "field": "Thermal element and visible construction",
      "source_value": "橙色玻璃球、框架、外螺纹、三种盘形",
      "target_value": "Glass Bulb / Frame / External Thread / Deflector",
      "grade": "A",
      "sources": [
        "source/source-1.jpg",
        "source/source-2.jpg",
        "source/source-3.jpg",
        "source/source-4.jpg",
        "source/source-6.jpg"
      ],
      "applicability": "market-neutral confirmed",
      "basis": "Photo-observable facts only"
    },
    {
      "field": "Surface treatment",
      "source_value": "电镀",
      "target_value": "Electroplated",
      "grade": "A",
      "sources": [
        "copy/20261006新增用户确认.json"
      ],
      "applicability": "market-neutral confirmed",
      "basis": "Latest recorded direct manufacturer/user confirmation covers the identical photographed 57°C Q5A variants; not an overseas approval or equivalent standard"
    },
    {
      "field": "Glass bulb diameter",
      "source_value": 5,
      "source_unit": "mm",
      "target_value": "5 mm",
      "grade": "A",
      "sources": [
        "copy/20261006新增用户确认.json"
      ],
      "applicability": "market-neutral confirmed",
      "basis": "Latest recorded direct manufacturer/user confirmation covers the identical photographed 57°C Q5A variants; not an overseas approval or equivalent standard"
    },
    {
      "field": "Working pressure",
      "source_value": 1.2,
      "source_unit": "MPa",
      "target_value": "1.2 MPa",
      "grade": "A",
      "sources": [
        "copy/20261006新增用户确认.json"
      ],
      "applicability": "market-neutral confirmed",
      "basis": "Latest recorded direct manufacturer/user confirmation covers the identical photographed 57°C Q5A variants; not an overseas approval or equivalent standard"
    },
    {
      "field": "Nominal connection size",
      "source_value": "6分",
      "target_value": "3/4 in",
      "conversion_formula": "6/8 = 0.75 inch nominal; explicitly approved as C6 by user",
      "note": "Nominal size only; not physical OD, DN20, NPT or a specific R/ISO thread designation",
      "grade": "A",
      "sources": [
        "copy/20261006新增用户确认.json"
      ],
      "applicability": "market-neutral confirmed",
      "basis": "Latest recorded direct manufacturer/user confirmation covers the identical photographed 57°C Q5A variants; not an overseas approval or equivalent standard"
    },
    {
      "field": "Sidewall configuration",
      "source_value": "水平边墙型",
      "target_value": "Horizontal Sidewall",
      "grade": "A",
      "sources": [
        "copy/20261006新增用户确认.json"
      ],
      "applicability": "market-neutral confirmed",
      "basis": "Latest recorded direct manufacturer/user confirmation covers the identical photographed 57°C Q5A variants; not an overseas approval or equivalent standard"
    }
  ],
  "parameter_crosswalk": [
    {
      "field": "Nominal operating temperature",
      "source_value": "57℃",
      "target_value": "57°C",
      "grade": "A",
      "sources": [
        "source/source-1.jpg",
        "source/source-5.jpg",
        "source/source-7.jpg",
        "copy/1688原始事实与缺项.txt"
      ],
      "applicability": "market-neutral confirmed",
      "basis": "Visible exact-model markings plus archived direct user confirmation; not ambient temperature"
    },
    {
      "field": "Body material",
      "source_value": "铜（主体）",
      "target_value": "Copper Body",
      "grade": "A",
      "sources": [
        "C:/Users/zhengfafa/.codex/skills/alibaba-detail-image-studio/SKILL.md"
      ],
      "applicability": "market-neutral confirmed",
      "basis": "Standing direct user confirmation; no alloy, purity or all-components claim"
    },
    {
      "field": "Thread family",
      "source_value": "BSPT",
      "target_value": "BSPT Thread",
      "grade": "A",
      "sources": [
        "C:/Users/zhengfafa/.codex/skills/alibaba-detail-image-studio/SKILL.md"
      ],
      "applicability": "market-neutral confirmed",
      "basis": "Standing direct user confirmation; no thread size, ISO designation or NPT equivalence"
    },
    {
      "field": "Variants and factory models",
      "source_value": "上喷/下喷/边喷；T-ZSTZ/T-ZSTX/T-ZSTBS 115-57℃ Q5A",
      "target_value": "Upright / Pendent / Sidewall; Factory Model",
      "grade": "A",
      "sources": [
        "source/source-1.jpg",
        "source/source-2.jpg",
        "source/source-3.jpg",
        "source/source-5.jpg",
        "source/source-7.jpg",
        "copy/1688原始参数输入.json"
      ],
      "applicability": "market-neutral confirmed",
      "basis": "Exact source-model inscriptions and direct user archive; source display poses are not installation diagrams"
    },
    {
      "field": "Thermal element and visible construction",
      "source_value": "橙色玻璃球、框架、外螺纹、三种盘形",
      "target_value": "Glass Bulb / Frame / External Thread / Deflector",
      "grade": "A",
      "sources": [
        "source/source-1.jpg",
        "source/source-2.jpg",
        "source/source-3.jpg",
        "source/source-4.jpg",
        "source/source-6.jpg"
      ],
      "applicability": "market-neutral confirmed",
      "basis": "Photo-observable facts only"
    },
    {
      "field": "Surface treatment",
      "source_value": "电镀",
      "target_value": "Electroplated",
      "grade": "A",
      "sources": [
        "copy/20261006新增用户确认.json"
      ],
      "applicability": "market-neutral confirmed",
      "basis": "Latest recorded direct manufacturer/user confirmation covers the identical photographed 57°C Q5A variants; not an overseas approval or equivalent standard"
    },
    {
      "field": "Glass bulb diameter",
      "source_value": 5,
      "source_unit": "mm",
      "target_value": "5 mm",
      "grade": "A",
      "sources": [
        "copy/20261006新增用户确认.json"
      ],
      "applicability": "market-neutral confirmed",
      "basis": "Latest recorded direct manufacturer/user confirmation covers the identical photographed 57°C Q5A variants; not an overseas approval or equivalent standard"
    },
    {
      "field": "Working pressure",
      "source_value": 1.2,
      "source_unit": "MPa",
      "target_value": "1.2 MPa",
      "grade": "A",
      "sources": [
        "copy/20261006新增用户确认.json"
      ],
      "applicability": "market-neutral confirmed",
      "basis": "Latest recorded direct manufacturer/user confirmation covers the identical photographed 57°C Q5A variants; not an overseas approval or equivalent standard"
    },
    {
      "field": "Nominal connection size",
      "source_value": "6分",
      "target_value": "3/4 in",
      "conversion_formula": "6/8 = 0.75 inch nominal; explicitly approved as C6 by user",
      "note": "Nominal size only; not physical OD, DN20, NPT or a specific R/ISO thread designation",
      "grade": "A",
      "sources": [
        "copy/20261006新增用户确认.json"
      ],
      "applicability": "market-neutral confirmed",
      "basis": "Latest recorded direct manufacturer/user confirmation covers the identical photographed 57°C Q5A variants; not an overseas approval or equivalent standard"
    },
    {
      "field": "Sidewall configuration",
      "source_value": "水平边墙型",
      "target_value": "Horizontal Sidewall",
      "grade": "A",
      "sources": [
        "copy/20261006新增用户确认.json"
      ],
      "applicability": "market-neutral confirmed",
      "basis": "Latest recorded direct manufacturer/user confirmation covers the identical photographed 57°C Q5A variants; not an overseas approval or equivalent standard"
    },
    {
      "field": "Response classification",
      "source_value": "目录名为特殊响应；源参数记录仍待确认",
      "applicability": "unmapped",
      "needed": "Exact-model manufacturer confirmation, report or datasheet; no inference from T or Q5A"
    },
    {
      "field": "K-factor",
      "source_value": "115 is a model character only",
      "applicability": "unmapped",
      "needed": "Exact-model flow evidence and units"
    },
    {
      "field": "Standards and certifications",
      "source_value": "Category GB research only; no SKU compliance documents",
      "applicability": "unmapped",
      "needed": "Exact model/export configuration, current scope and destination-project evidence; no UL/FM/CE/EN claim"
    },
    {
      "field": "Dimensions, weight and plating details",
      "source_value": "未核实",
      "applicability": "unmapped",
      "needed": "Exact drawings/measurements and plating metal, thickness or grade if claimed; basic Electroplated process is now confirmed"
    },
    {
      "field": "Installation, spacing, application suitability",
      "source_value": "未核实",
      "applicability": "unmapped",
      "needed": "Exact-model installation instructions and project requirements"
    },
    {
      "field": "Packaging, MOQ, lead time and warranty",
      "source_value": "未核实",
      "applicability": "unmapped",
      "needed": "Real packaging photographs and current exact-product commercial confirmation"
    },
    {
      "field": "Exact thread designation and interface compatibility",
      "source_value": "BSPT and 3/4 in nominal confirmed; exact R/ISO code and mating detail not documented",
      "applicability": "unmapped",
      "needed": "Exact interface drawing/specification if a particular thread designation or mating standard is claimed"
    }
  ],
  "pending_confirmation": [
    {
      "field": "Response classification",
      "source_value": "目录名为特殊响应；源参数记录仍待确认",
      "applicability": "unmapped",
      "needed": "Exact-model manufacturer confirmation, report or datasheet; no inference from T or Q5A"
    },
    {
      "field": "K-factor",
      "source_value": "115 is a model character only",
      "applicability": "unmapped",
      "needed": "Exact-model flow evidence and units"
    },
    {
      "field": "Standards and certifications",
      "source_value": "Category GB research only; no SKU compliance documents",
      "applicability": "unmapped",
      "needed": "Exact model/export configuration, current scope and destination-project evidence; no UL/FM/CE/EN claim"
    },
    {
      "field": "Dimensions, weight and plating details",
      "source_value": "未核实",
      "applicability": "unmapped",
      "needed": "Exact drawings/measurements and plating metal, thickness or grade if claimed; basic Electroplated process is now confirmed"
    },
    {
      "field": "Installation, spacing, application suitability",
      "source_value": "未核实",
      "applicability": "unmapped",
      "needed": "Exact-model installation instructions and project requirements"
    },
    {
      "field": "Packaging, MOQ, lead time and warranty",
      "source_value": "未核实",
      "applicability": "unmapped",
      "needed": "Real packaging photographs and current exact-product commercial confirmation"
    },
    {
      "field": "Exact thread designation and interface compatibility",
      "source_value": "BSPT and 3/4 in nominal confirmed; exact R/ISO code and mating detail not documented",
      "applicability": "unmapped",
      "needed": "Exact interface drawing/specification if a particular thread designation or mating standard is claimed"
    }
  ]
}
```

参数与证据文档：

- [copy\1688原始事实与缺项.txt](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST115系列-57℃特殊响应消防洒水喷头/copy/1688原始事实与缺项.txt>)
- [copy\1688原始参数输入.json](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST115系列-57℃特殊响应消防洒水喷头/copy/1688原始参数输入.json>)
- [copy\20261006新增用户确认.json](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST115系列-57℃特殊响应消防洒水喷头/copy/20261006新增用户确认.json>)
- [copy\交付说明与待确认.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST115系列-57℃特殊响应消防洒水喷头/copy/交付说明与待确认.md>)

## 068 T-ZST115系列-79℃电镀玻璃球洒水喷头

系列分组：其他洒水喷头及配件；收录文件：32。

资料目录：[T-ZST115系列-79℃电镀玻璃球洒水喷头](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST115系列-79℃电镀玻璃球洒水喷头>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "release_scope": "Reviewed market-neutral manufacturer artwork; no destination compliance assessment or backend upload",
  "generation_scope": "Two empty text-free raster design plates. All visible product bodies are original source photos composited with deterministic editable typography.",
  "overlay_specifications": "copy/assets-layout.json",
  "evidence_file": "copy/事实出处与出口适用性.json",
  "missing_file": "copy/缺项清单.json",
  "facts": [
    {
      "id": "F1",
      "field": "Body material",
      "value": "Copper",
      "source_value": "铜",
      "evidence_grade": "A",
      "evidence_source": "copy/1688用户确认记录.json: claims 主体材质",
      "basis": "Archived explicit user/manufacturer confirmation",
      "applicability": "market-neutral confirmed",
      "scope": "Bodies of all three photographed styles",
      "limits": "No alloy grade, pure-copper or all-components claim"
    },
    {
      "id": "F2",
      "field": "Surface finish",
      "value": "Electroplated",
      "source_value": "电镀",
      "evidence_grade": "A",
      "evidence_source": "copy/1688用户确认记录.json: claims 表面处理",
      "basis": "Archived explicit user/manufacturer confirmation plus visible silver exterior",
      "applicability": "market-neutral confirmed",
      "scope": "Three photographed styles",
      "limits": "No chromium, nickel, coating composition or corrosion claim"
    },
    {
      "id": "F3",
      "field": "Glass bulb diameter",
      "value": 5,
      "unit": "mm",
      "evidence_grade": "A",
      "evidence_source": "copy/1688用户确认记录.json: claims 玻璃球直径",
      "basis": "Archived explicit user/manufacturer confirmation",
      "applicability": "market-neutral confirmed",
      "scope": "Three photographed styles",
      "limits": "Does not establish standard/quick response or RTI"
    },
    {
      "id": "F4",
      "field": "Nominal operating temperature",
      "value": 79,
      "unit": "°C",
      "source_value": "79℃",
      "evidence_grade": "A",
      "evidence_source": [
        "copy/1688用户确认记录.json: claims 公称动作温度",
        "source/01-边墙型白底原图.jpg",
        "source/04-直立型溅水盘实拍原图.jpg",
        "source/05-下垂型溅水盘实拍原图.jpg"
      ],
      "basis": "User confirmation and physical markings",
      "applicability": "market-neutral confirmed",
      "scope": "Three photographed styles",
      "limits": "Nominal activation rating; not allowable ambient temperature"
    },
    {
      "id": "F5",
      "field": "Styles and factory model mapping",
      "value": [
        {
          "style": "Horizontal Sidewall",
          "factory_model": "T-ZSTBS 115-79°C Q5A",
          "photo": "source/01-边墙型白底原图.jpg"
        },
        {
          "style": "Upright",
          "factory_model": "T-ZSTZ 115-79°C Q5A",
          "photo": "source/02-直立型白底原图.jpg"
        },
        {
          "style": "Pendent",
          "factory_model": "T-ZSTX 115-79°C Q5A",
          "photo": "source/03-下垂型白底原图.jpg"
        }
      ],
      "evidence_grade": "A",
      "evidence_source": "copy/1688用户确认记录.json: claims 型号映射, plus matching original photos",
      "basis": "Manufacturer confirmation and deflector geometry/markings",
      "applicability": "market-neutral confirmed",
      "limits": "115 is a factory-series token, not evidence of metric K115. Photographs show supplied poses, not installed orientation diagrams"
    },
    {
      "id": "F6",
      "field": "Thread family",
      "value": "BSPT",
      "evidence_grade": "A",
      "evidence_source": [
        "C:/Users/zhengfafa/.codex/skills/alibaba-detail-image-studio/SKILL.md: Standing sprinkler defaults",
        "copy/1688用户确认记录.json: claims 螺纹类型"
      ],
      "basis": "Standing explicit user/manufacturer confirmation",
      "applicability": "market-neutral confirmed",
      "scope": "Three photographed styles",
      "limits": "Not NPT; no pitch, R designation or ISO compliance asserted"
    },
    {
      "id": "F7",
      "field": "Nominal connection",
      "value": "3/4 in (DN20)",
      "source_value": "6分 / 3/4英寸 / DN20",
      "evidence_grade": "A",
      "evidence_source": "copy/1688用户确认记录.json: claims 接口规格",
      "basis": "Archived user confirmation of full connection option, not inferred from pixels",
      "applicability": "market-neutral confirmed",
      "scope": "Three photographed styles",
      "limits": "Nominal interface identity; not measured 20 mm outside diameter"
    },
    {
      "id": "F8",
      "field": "Visible appearance and physical identity",
      "value": "Silver exterior; yellow bulb; three distinct deflectors; original 冠亚/G Y and 79°C/115/Q5A/2026 markings preserved where visible",
      "evidence_grade": "A",
      "evidence_source": [
        "source/01-边墙型白底原图.jpg",
        "source/02-直立型白底原图.jpg",
        "source/03-下垂型白底原图.jpg",
        "source/04-直立型溅水盘实拍原图.jpg",
        "source/05-下垂型溅水盘实拍原图.jpg",
        "source/06-三款喷头实拍原图.jpg"
      ],
      "basis": "Opened and visually inspected all six original product photos",
      "applicability": "market-neutral confirmed",
      "limits": "Appearance alone does not prove alloy, finish chemistry, performance or certification"
    },
    {
      "id": "F9",
      "field": "Working pressure",
      "value": 1.2,
      "unit": "MPa",
      "source_value": "工作压力1.2mpa",
      "evidence_grade": "A",
      "evidence_source": "copy/1688用户确认记录.json: claims 工作压力",
      "basis": "Archived explicit manufacturer/user statement",
      "applicability": "market-neutral confirmed",
      "scope": "Three photographed styles",
      "limits": "No conversion, maximum/test pressure, PN/Class or destination acceptance asserted"
    }
  ]
}
```

参数与证据文档：

- [copy\1688用户确认记录.json](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST115系列-79℃电镀玻璃球洒水喷头/copy/1688用户确认记录.json>)
- [copy\事实出处与出口适用性.json](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST115系列-79℃电镀玻璃球洒水喷头/copy/事实出处与出口适用性.json>)

## 069 T-ZST115系列-93℃电镀玻璃球洒水喷头

系列分组：其他洒水喷头及配件；收录文件：31。

资料目录：[T-ZST115系列-93℃电镀玻璃球洒水喷头](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST115系列-93℃电镀玻璃球洒水喷头>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "models": [
    {
      "form": "Pendent",
      "factory_model": "T-ZSTX115-93°C Q5A",
      "photo": "source/source-01.jpg",
      "marking_photo": "source/source-04.jpg"
    },
    {
      "form": "Horizontal Sidewall",
      "factory_model": "T-ZSTBS115-93°C Q5A",
      "photo": "source/source-02-93C.jpg",
      "marking_photo": "source/source-02-93C.jpg"
    },
    {
      "form": "Upright",
      "factory_model": "T-ZSTZ115-93°C Q5A",
      "photo": "source/source-03.jpg",
      "marking_photo": "source/source-05.jpg"
    }
  ],
  "two_axis_facts": [
    {
      "id": "forms",
      "field": "Product forms",
      "source_value": "下垂、边墙、直立",
      "source_unit": null,
      "buyer_copy": "Pendent / Horizontal Sidewall / Upright",
      "evidence_grade": "A",
      "evidence_files": [
        "source/1688-确认记录.md",
        "source/source-01.jpg",
        "source/source-02-93C.jpg",
        "source/source-03.jpg"
      ],
      "product_truth": "confirmed exact series and photo mapping",
      "applicability": "market-neutral confirmed",
      "publishable": true,
      "standard_basis": "Industry form names, without compliance claim",
      "conversion_formula": null
    },
    {
      "id": "models",
      "field": "Factory models",
      "source_value": "T-ZSTX115-93℃ Q5A / T-ZSTBS115-93℃ Q5A / T-ZSTZ115-93℃ Q5A",
      "source_unit": null,
      "buyer_copy": "T-ZSTX115-93°C Q5A / T-ZSTBS115-93°C Q5A / T-ZSTZ115-93°C Q5A",
      "evidence_grade": "A",
      "evidence_files": [
        "source/source-04.jpg",
        "source/source-02-93C.jpg",
        "source/source-05.jpg",
        "source/1688-确认记录.md"
      ],
      "product_truth": "User confirmed three-form mapping; original markings opened and inspected",
      "applicability": "market-neutral confirmed",
      "publishable": true,
      "standard_basis": null,
      "conversion_formula": "Typography normalization: ℃ -> °C; spacing normalized; no numeric conversion"
    },
    {
      "id": "temperature",
      "field": "Nominal activation temperature",
      "source_value": 93,
      "source_unit": "°C",
      "buyer_copy": "93°C nominal activation temperature",
      "evidence_grade": "A",
      "evidence_files": [
        "source/1688-确认记录.md",
        "source/source-02-93C.jpg",
        "source/source-04.jpg",
        "source/source-05.jpg"
      ],
      "product_truth": "confirmed",
      "applicability": "market-neutral confirmed",
      "publishable": true,
      "standard_basis": "Manufacturer temperature rating; not allowable ambient temperature",
      "conversion_formula": null
    },
    {
      "id": "bulb",
      "field": "Glass bulb diameter",
      "source_value": 5,
      "source_unit": "mm",
      "buyer_copy": "5 mm Glass Bulb",
      "evidence_grade": "A",
      "evidence_files": [
        "source/1688-确认记录.md",
        "source/source-03.jpg"
      ],
      "product_truth": "Confirmed diameter; CYΦ5 visible on source-03",
      "applicability": "market-neutral confirmed",
      "publishable": true,
      "standard_basis": "Manufacturer fact; no response class or RTI inferred",
      "conversion_formula": null
    },
    {
      "id": "copper",
      "field": "Body material",
      "source_value": "铜喷头本体",
      "source_unit": null,
      "buyer_copy": "Copper Body",
      "evidence_grade": "A",
      "evidence_files": [
        "source/1688-确认记录.md"
      ],
      "product_truth": "Explicit user confirmation in exact source pack",
      "applicability": "market-neutral confirmed",
      "publishable": true,
      "standard_basis": "Body only, no alloy or whole-assembly claim",
      "conversion_formula": null
    },
    {
      "id": "electroplated",
      "field": "Surface treatment",
      "source_value": "表面电镀",
      "source_unit": null,
      "buyer_copy": "Electroplated finish",
      "evidence_grade": "A",
      "evidence_files": [
        "source/1688-确认记录.md"
      ],
      "product_truth": "confirmed",
      "applicability": "market-neutral confirmed",
      "publishable": true,
      "standard_basis": "Unspecified plating; no chromium, nickel, thickness or corrosion-life claim",
      "conversion_formula": null
    },
    {
      "id": "bspt",
      "field": "Thread family",
      "source_value": "BSPT",
      "source_unit": null,
      "buyer_copy": "BSPT Thread",
      "evidence_grade": "A",
      "evidence_files": [
        "C:/Users/zhengfafa/.codex/skills/alibaba-detail-image-studio/SKILL.md",
        "source/1688-确认记录.md"
      ],
      "product_truth": "Standing user-confirmed manufacturer default, reconfirmed in source record; no conflicting exact-SKU evidence",
      "applicability": "market-neutral confirmed",
      "publishable": true,
      "standard_basis": "Family only; no ISO 7 designation or NPT equivalence",
      "conversion_formula": null
    },
    {
      "id": "external",
      "field": "Visible connection form",
      "source_value": "外螺纹",
      "source_unit": null,
      "buyer_copy": "External connection detail",
      "evidence_grade": "A",
      "evidence_files": [
        "source/source-01.jpg",
        "source/source-02-93C.jpg",
        "source/source-03.jpg"
      ],
      "product_truth": "Visible original geometry, not thread measurement",
      "applicability": "market-neutral confirmed",
      "publishable": true,
      "standard_basis": null,
      "conversion_formula": null
    },
    {
      "id": "pressure",
      "field": "Working pressure",
      "source_value": 1.2,
      "source_unit": "MPa",
      "buyer_copy": "1.2 MPa / 12 bar",
      "evidence_grade": "A",
      "evidence_files": [
        "source/1688-确认记录.md"
      ],
      "product_truth": "Explicit user working-pressure confirmation",
      "applicability": "market-neutral confirmed",
      "publishable": true,
      "standard_basis": "Manufacturer working pressure; no test protocol or foreign pressure class inferred",
      "conversion_formula": "1 MPa = 10 bar; 1.2 MPa × 10 = 12 bar; exact arithmetic, no rounding"
    },
    {
      "id": "appearance",
      "field": "Visible appearance",
      "source_value": "绿色球液，银色电镀外观，三款不同溅水盘，冠亚/GY/CYΦ5物理标記",
      "source_unit": null,
      "buyer_copy": "Green bulb liquid; original photographs",
      "evidence_grade": "A",
      "evidence_files": [
        "source/source-01.jpg",
        "source/source-02-93C.jpg",
        "source/source-03.jpg",
        "source/source-04.jpg",
        "source/source-05.jpg",
        "source/source-06.jpg"
      ],
      "product_truth": "Exact owned photographs inspected; crops/resizes only",
      "applicability": "market-neutral confirmed",
      "publishable": true,
      "standard_basis": "Appearance and original markings only; no production-year claim",
      "conversion_formula": null
    },
    {
      "id": "connection_size",
      "field": "Precise thread size",
      "source_value": "6分",
      "source_unit": "Chinese trade size",
      "buyer_copy": null,
      "evidence_grade": "A",
      "evidence_files": [
        "source/1688-确认记录.md"
      ],
      "product_truth": "Domestic trade size confirmed",
      "applicability": "unmapped",
      "publishable": false,
      "standard_basis": "Need exact thread drawing/designation before 3/4 inch / DN20 / R3/4 use",
      "conversion_formula": null
    },
    {
      "id": "k_factor",
      "field": "K-factor",
      "source_value": "115 appears in model",
      "source_unit": null,
      "buyer_copy": null,
      "evidence_grade": "D",
      "evidence_files": [
        "source/source-02-93C.jpg"
      ],
      "product_truth": "Model token does not establish measured metric K115",
      "applicability": "unmapped",
      "publishable": false,
      "standard_basis": "No exact 93°C export-SKU K evidence",
      "conversion_formula": null
    },
    {
      "id": "response",
      "field": "Response class / RTI",
      "source_value": "Q5A marking and 5 mm bulb",
      "source_unit": null,
      "buyer_copy": null,
      "evidence_grade": "D",
      "evidence_files": [
        "source/source-03.jpg",
        "source/1688-确认记录.md"
      ],
      "product_truth": "No exact RTI or response-class test provided",
      "applicability": "unmapped",
      "publishable": false,
      "standard_basis": "Neither special-response nor standard-response is inferred",
      "conversion_formula": null
    }
  ],
  "blocked_modules": [
    {
      "module": "Precise dimensions / dimensioned connection",
      "reason": "Missing exact-SKU H, deflector width/diameter, thread length and drawing or measurement",
      "required_input": "三款93℃型号匹配的毫米图纸/实测及精确BSPT尺寸标号"
    },
    {
      "module": "Installation / application scene",
      "reason": "Missing connection configuration, clearances, obstacles, intended environment and installation documentation",
      "required_input": "三款型号安装资料、配套接口与净空/场所要求"
    },
    {
      "module": "Certifications / testing / destination compliance",
      "reason": "No exact 93°C SKU certificates, listings, reports or destination-country/project requirements provided",
      "required_input": "目标国/项目要求及有效且型号覆盖匹配的认证/检测资料"
    },
    {
      "module": "Packaging / factory evidence",
      "reason": "No matching owned packing or factory photographs and no confirmed carton quantities/dimensions",
      "required_input": "本产品真实包装工厂图及装箱数量、尺寸"
    },
    {
      "module": "K-factor / response class",
      "reason": "115 in model and 5 mm bulb do not establish these performance facts",
      "required_input": "型号匹配的厂家规格、流量或RTI/响应试验确认"
    },
    {
      "module": "Exact thread size",
      "reason": "Confirmed Chinese trade size 6分 has no verified precise export thread designation",
      "required_input": "精确BSPT螺纹标号、尺寸图/量规证据；不默认转NPT"
    }
  ],
  "publication_scope": "本地验收完成；实际后台字段限制未验证；目标国适用性/认证需后续资料"
}
```

参数与证据文档：

- [copy\fact-and-export-crosswalk.json](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST115系列-93℃电镀玻璃球洒水喷头/copy/fact-and-export-crosswalk.json>)
- [copy\事实出处与出口适用性.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST115系列-93℃电镀玻璃球洒水喷头/copy/事实出处与出口适用性.md>)
- [source\1688-确认记录.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST115系列-93℃电镀玻璃球洒水喷头/source/1688-确认记录.md>)
- [source\1688-资料核验与待确认.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST115系列-93℃电镀玻璃球洒水喷头/source/1688-资料核验与待确认.md>)

## 070 T-ZST115系列-特殊响应消防洒水喷头

系列分组：其他洒水喷头及配件；收录文件：24。

资料目录：[T-ZST115系列-特殊响应消防洒水喷头](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST115系列-特殊响应消防洒水喷头>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "international_parameter_policy": {
    "published": [
      "K115 metric / K8.0 US",
      "temperature ratings and color names",
      "market-neutral dimensions and weights"
    ],
    "withheld": [
      "thread standard",
      "rated pressure",
      "RTI",
      "UL/FM/CE/LPCB/ISO/EN approval claims"
    ],
    "note": "International standards were used for terminology and unit formatting only; no foreign certification is claimed."
  }
}
```

参数与证据文档：

- [copy\evidence-ledger.csv](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST115系列-特殊响应消防洒水喷头/copy/evidence-ledger.csv>)
- [copy\standard-and-claim-crosswalk.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST115系列-特殊响应消防洒水喷头/copy/standard-and-claim-crosswalk.md>)

## 071 T-ZST161系列-68℃消防洒水喷头

系列分组：大K及ESFR喷头；收录文件：28。

资料目录：[T-ZST161系列-68℃消防洒水喷头](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST161系列-68℃消防洒水喷头>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "models": [
    "T-ZSTZ 161-68°C Q5",
    "T-ZSTX 161-68°C Q5"
  ],
  "verified_facts": [
    "T-ZSTZ 161-68°C Q5 upright",
    "T-ZSTX 161-68°C Q5 pendent",
    "68°C",
    "red glass bulb",
    "copper body and frame (user confirmed 2026-09-24)",
    "stainless steel deflector (user confirmed 2026-09-24)",
    "visible external thread",
    "silver surface appearance"
  ],
  "evidence_files": [
    "source/上喷标识实拍.jpg",
    "source/下喷标识实拍.jpg",
    "copy/source-inventory.json",
    "copy/standards-and-evidence.md",
    "copy/material-confirmation-2026-09-24.json"
  ]
}
```

参数与证据文档：

- [copy\archive-fact-sources.json](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST161系列-68℃消防洒水喷头/copy/archive-fact-sources.json>)
- [copy\material-confirmation-2026-09-24.json](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST161系列-68℃消防洒水喷头/copy/material-confirmation-2026-09-24.json>)
- [copy\standards-and-evidence.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST161系列-68℃消防洒水喷头/copy/standards-and-evidence.md>)

## 072 T-ZST80系列-141℃电镀玻璃球洒水喷头

系列分组：其他洒水喷头及配件；收录文件：32。

资料目录：[T-ZST80系列-141℃电镀玻璃球洒水喷头](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST80系列-141℃电镀玻璃球洒水喷头>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "series_model": "T-ZST80系列",
  "factory_models": [
    {
      "model": "T-ZSTBS80",
      "orientation": "Horizontal Sidewall",
      "source": "source/原图01.jpg"
    },
    {
      "model": "T-ZSTZ80",
      "orientation": "Upright",
      "source": "source/原图02.jpg",
      "marking_source": "source/原图06.jpg"
    },
    {
      "model": "T-ZSTX80",
      "orientation": "Pendent",
      "source": "source/原图03.jpg",
      "marking_source": "source/原图05.jpg"
    }
  ],
  "confirmed_values": {
    "body_material": "Copper",
    "surface_treatment": "Electroplating",
    "glass_bulb_diameter_mm": 5,
    "visible_glass_bulb_colour": "Blue",
    "nominal_operating_temperature_C": 141,
    "metric_K": 80,
    "metric_K_unit": "L/min/√bar",
    "nominal_size": "DN15",
    "thread_family": "BSPT",
    "visible_thread_form": "Male",
    "response_class": null
  },
  "two_axis_evidence_ledger": "copy/事实出处与出口适用性检查.md",
  "factual_review_status": "passed",
  "missing_data_file": "copy/缺项清单.md"
}
```

参数与证据文档：

- [copy\事实出处与出口适用性检查.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST80系列-141℃电镀玻璃球洒水喷头/copy/事实出处与出口适用性检查.md>)
- [copy\用户确认记录.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST80系列-141℃电镀玻璃球洒水喷头/copy/用户确认记录.md>)

## 073 T-ZST80系列-57℃特殊响应消防洒水喷头

系列分组：其他洒水喷头及配件；收录文件：22。

资料目录：[T-ZST80系列-57℃特殊响应消防洒水喷头](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST80系列-57℃特殊响应消防洒水喷头>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "models": [
    "T-ZSTZ80-57°C Q5A",
    "T-ZSTX80-57°C Q5A",
    "T-ZSTBS80-57°C Q5A"
  ]
}
```

参数与证据文档：

- [copy\evidence-ledger.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST80系列-57℃特殊响应消防洒水喷头/copy/evidence-ledger.md>)

## 074 T-ZST80系列-68℃消防洒水喷头

系列分组：其他洒水喷头及配件；收录文件：27。

资料目录：[T-ZST80系列-68℃消防洒水喷头](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST80系列-68℃消防洒水喷头>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "models": [
    "T-ZSTZ80",
    "T-ZSTX80",
    "T-ZSTBS80"
  ],
  "confirmed_common_facts": {
    "temperature": "68°C",
    "nominal_connection_size": "DN15 (1/2 in)",
    "thread": "R 1/2 BSPT",
    "k_factor": "K5.6 (K80 Metric)",
    "response_type": "Standard Response",
    "height": "53 mm",
    "width": "30 mm",
    "approximate_unit_weight": "45 g",
    "foreign_certification": "None currently available",
    "weight_evidence_note": "User confirmed 45 g for all three listing SKUs; supplied scale photo shows 45.37 g for upright T-ZSTZ80."
  },
  "confirmed_model_mapping": {
    "T-ZSTZ80": "Pendent",
    "T-ZSTX80": "Upright",
    "T-ZSTBS80": "Horizontal Sidewall",
    "evidence": "Direct manufacturer/user confirmation in this task; this product-specific mapping overrides generic model-code assumptions."
  }
}
```

## 075 T-ZST80系列-93℃电镀玻璃球洒水喷头

系列分组：其他洒水喷头及配件；收录文件：32。

资料目录：[T-ZST80系列-93℃电镀玻璃球洒水喷头](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST80系列-93℃电镀玻璃球洒水喷头>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "release_scope": "Market-neutral manufacturer facts and authentic appearance only; no destination compliance claim.",
  "factual_crosswalk_file": "copy/双重事实核对.json",
  "facts": [
    {
      "id": "F01",
      "field": "Product family",
      "value": "Glass Bulb Fire Sprinklers, T-ZST80 Series",
      "source_market_value": "80系列93℃电镀玻璃球喷头",
      "truth": "A request + archived explicit model confirmation",
      "applicability": "market-neutral confirmed",
      "sources": [
        "current authorized task",
        "historical product-content-sheet.md",
        "source/01-下垂型白底原图.jpg",
        "source/02-边墙型白底原图.jpg",
        "source/03-直立型白底原图.jpg"
      ],
      "publishable": true
    },
    {
      "id": "F02",
      "field": "Body material",
      "value": "Copper",
      "source_market_value": "铜材质本体",
      "truth": "A recorded current user confirmation + standing confirmation",
      "applicability": "market-neutral confirmed",
      "sources": [
        "1688 copy/事实来源与缺失资料.md",
        "alibaba-detail-image-studio/SKILL.md standing defaults"
      ],
      "publishable": true,
      "scope": "body only; no alloy grade, pure-copper or all-component claim"
    },
    {
      "id": "F03",
      "field": "Surface finish",
      "value": "Electroplated",
      "source_market_value": "表层电镀",
      "truth": "A request + recorded current user confirmation",
      "applicability": "market-neutral confirmed",
      "sources": [
        "current authorized task",
        "1688 copy/事实来源与缺失资料.md"
      ],
      "publishable": true
    },
    {
      "id": "F04",
      "field": "Glass bulb diameter",
      "value": "5 mm",
      "source_market_value": "5mm",
      "truth": "A recorded current user confirmation",
      "applicability": "market-neutral confirmed",
      "sources": [
        "1688 copy/事实来源与缺失资料.md",
        "source photos visible φ5 where legible"
      ],
      "publishable": true,
      "scope": "diameter only; no response-class inference"
    },
    {
      "id": "F05",
      "field": "Nominal operating temperature",
      "value": "93°C",
      "source_market_value": "93℃",
      "truth": "A request and model-confirmation record + visible temperature engraving",
      "applicability": "market-neutral confirmed",
      "sources": [
        "current authorized task",
        "historical product-content-sheet.md",
        "source/02-边墙型白底原图.jpg",
        "source/05-直立型溅水盘实拍.jpg",
        "source/06-下垂型溅水盘实拍.jpg"
      ],
      "publishable": true,
      "conversion_formula": null,
      "scope": "nominal actuation temperature, not permitted ambient temperature"
    },
    {
      "id": "F06",
      "field": "Glass bulb color",
      "value": "Green",
      "truth": "B directly observable on all six product photos; archived user color confirmation",
      "applicability": "market-neutral confirmed",
      "sources": [
        "source/01-下垂型白底原图.jpg",
        "source/02-边墙型白底原图.jpg",
        "source/03-直立型白底原图.jpg",
        "source/04-三款合照实拍.jpg"
      ],
      "publishable": true
    },
    {
      "id": "F07",
      "field": "Thread family",
      "value": "BSPT",
      "truth": "A standing user confirmation; physical thread preserved without mapping",
      "applicability": "market-neutral confirmed",
      "sources": [
        "alibaba-detail-image-studio/SKILL.md standing defaults"
      ],
      "publishable": true,
      "scope": "family only; no NPT, thread size, pitch or ISO7 designation"
    },
    {
      "id": "F08",
      "field": "Forms and factory models",
      "value": [
        {
          "form": "Pendent",
          "factory_model": "T-ZSTX80-93℃Q5A",
          "display_model": "T-ZSTX80-93°CQ5A",
          "photo": "source/01-下垂型白底原图.jpg"
        },
        {
          "form": "Horizontal Sidewall",
          "factory_model": "T-ZSTBS80-93℃Q5A",
          "display_model": "T-ZSTBS80-93°CQ5A",
          "photo": "source/02-边墙型白底原图.jpg"
        },
        {
          "form": "Upright",
          "factory_model": "T-ZSTZ80-93℃Q5A",
          "display_model": "T-ZSTZ80-93°CQ5A",
          "photo": "source/03-直立型白底原图.jpg"
        }
      ],
      "truth": "A exact series user model confirmation + physical engravings",
      "applicability": "market-neutral confirmed",
      "sources": [
        "historical product-content-sheet.md",
        "historical research-ledger.md",
        "original photos"
      ],
      "publishable": true,
      "scope": "factory identity only; original photo poses are not installation diagrams"
    },
    {
      "id": "H01",
      "field": "K factor",
      "value": "K=80",
      "truth": "A+C historical ledger derives from full model + GB naming rule; exact metric unit is not confirmed",
      "applicability": "unmapped",
      "sources": [
        "historical research-ledger.md"
      ],
      "publishable": false,
      "conversion_formula": null,
      "reason": "Do not infer confirmed metric K solely from 80 in factory model; obtain manufacturer flow coefficient with L/min/√bar unit and exact SKU scope before conversion."
    },
    {
      "id": "H02",
      "field": "Nominal size",
      "value": "4分/DN15",
      "truth": "A archived current user-confirmation record",
      "applicability": "domestic-only",
      "sources": [
        "1688 copy/事实来源与缺失资料.md"
      ],
      "publishable": false,
      "reason": "Not sufficient proof of exact BSPT size/designation or foreign interface equivalence."
    },
    {
      "id": "H03",
      "field": "Response category",
      "value": "特殊响应 / T-prefix / 5mm",
      "truth": "A historical domestic type confirmation; 5mm does not establish response classification",
      "applicability": "unmapped",
      "sources": [
        "historical product-content-sheet.md",
        "historical research-ledger.md"
      ],
      "publishable": false,
      "reason": "No RTI/approved export classification or performance report; omit Special/Standard/Quick Response."
    },
    {
      "id": "H04",
      "field": "Standards and approval",
      "value": "GB 5135.1—2019 reference only",
      "truth": "C general domestic standard record, not exact-SKU certificate",
      "applicability": "domestic-only",
      "sources": [
        "historical research-ledger.md"
      ],
      "publishable": false,
      "reason": "No target-country/project or current exact-SKU certificate/report; no UL/FM/CE/NFPA/EN or transformed approval marks."
    }
  ],
  "missing_items": [
    {
      "field": "Target country / project / approval",
      "required": "Destination country and buyer/project specification plus current exact-model export approval/report",
      "status": "unresolved",
      "effect": "No target-market or foreign-compliance claims."
    },
    {
      "field": "Metric K factor",
      "required": "Manufacturer confirmation of exact SKU K value in L/min/√bar, or exact-model data sheet/report",
      "status": "unresolved",
      "effect": "K80 candidate held; no international K conversion/formula used."
    },
    {
      "field": "Response category",
      "required": "Exact export classification and supporting thermal-response/RTI report",
      "status": "unresolved",
      "effect": "No Special, Standard or Quick Response claim; 5mm alone is not used to infer class."
    },
    {
      "field": "BSPT size/designation and dimensions",
      "required": "Model drawing or measurements for thread designation/size and H/D or sidewall W/H, in mm",
      "status": "unresolved",
      "effect": "DN15/4分 not mapped; no size/dimension/connection diagram."
    },
    {
      "field": "Pressure / flow / performance",
      "required": "Exact-model manufacturer test documentation",
      "status": "unresolved",
      "effect": "No pressure, flow, discharge pattern, durability or corrosion promises."
    },
    {
      "field": "Installation/application",
      "required": "Exact SKU manual, mounting/pipe/clearance/site evidence",
      "status": "unresolved",
      "effect": "Photo pose retained; no connected installation or application scene."
    },
    {
      "field": "Packaging",
      "required": "Real SKU packing photos, quantities and weights",
      "status": "unresolved",
      "effect": "No packaging asset."
    },
    {
      "field": "Certification and tests",
      "required": "Current valid exact-SKU certificate/report scope, issuer, holder and authorization",
      "status": "unresolved",
      "effect": "No certification asset or UL/FM/CE/NFPA/EN/GB approval claim."
    },
    {
      "field": "Live publishing requirements",
      "required": "Actual Seller Central field/category validation when upload is requested",
      "status": "unresolved",
      "effect": "Local image delivery only; no login/upload/publishing was performed."
    }
  ]
}
```

参数与证据文档：

- [copy\事实出处与缺项清单.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST80系列-93℃电镀玻璃球洒水喷头/copy/事实出处与缺项清单.md>)
- [copy\双重事实核对.json](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST80系列-93℃电镀玻璃球洒水喷头/copy/双重事实核对.json>)
- [source\1688确认记录.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST80系列-93℃电镀玻璃球洒水喷头/source/1688确认记录.md>)
- [source\历史产品型号确认表.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST80系列-93℃电镀玻璃球洒水喷头/source/历史产品型号确认表.md>)
- [source\历史证据台账.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZST80系列-93℃电镀玻璃球洒水喷头/source/历史证据台账.md>)

## 076 T-ZSTGX80-K-ZSTGX80-干式喷头

系列分组：干式喷头；收录文件：27。

资料目录：[T-ZSTGX80-K-ZSTGX80-干式喷头](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZSTGX80-K-ZSTGX80-干式喷头>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "models": [
    "T-ZSTGX80-68°C Q5",
    "K-ZSTGX80-68°C Q3"
  ],
  "confirmed_facts": {
    "standard_response_model": "T-ZSTGX80-68°C Q5",
    "quick_response_model": "K-ZSTGX80-68°C Q3",
    "nominal_flow_coefficient": "80",
    "operating_temperature": "68°C",
    "inlet_thread": "R1/2",
    "overall_lengths": [
      "10 cm",
      "14.5 cm",
      "30 cm"
    ],
    "materials": {
      "sprinkler_frame": "Stainless steel",
      "deflector": "Stainless steel",
      "red_extension_tube": "Stainless steel"
    },
    "escutcheon": "Optional large round type",
    "application": "Cold storage, refrigerated warehouses and indoor areas subject to freezing"
  },
  "blocked_assets": [
    {
      "asset_type_zh": "尺寸连接图",
      "reason": "No exact-model dimensioned drawing or unchanged measurement record beyond overall length and R1/2 thread"
    },
    {
      "asset_type_zh": "安装说明图",
      "reason": "No confirmed connection arrangement, engagement depth, fixing method or clearance"
    },
    {
      "asset_type_zh": "认证文件图",
      "reason": "No current exact-export-SKU certificate or report with target-market scope"
    },
    {
      "asset_type_zh": "包装装箱图",
      "reason": "No real model-matched packaging photography or confirmed packaging data"
    }
  ]
}
```

参数与证据文档：

- [copy\evidence-crosswalk.csv](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/T-ZSTGX80-K-ZSTGX80-干式喷头/copy/evidence-crosswalk.csv>)

## 077 UNI-DN100-意大利标准湿式消火栓

系列分组：室外消火栓；收录文件：24。

资料目录：[UNI-DN100-意大利标准湿式消火栓](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/UNI-DN100-意大利标准湿式消火栓>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "blocked_assets": [
    {
      "asset_type_zh": "尺寸连接图",
      "reason": "No matching manufacturer drawing or unchanged real measurement record for exact dimensions."
    },
    {
      "asset_type_zh": "材质工艺图",
      "reason": "Primary material is user-confirmed as ductile iron, but no evidence is available for the exact ductile iron grade, internal components, trim, stem, seat, seals, coating, or finish."
    },
    {
      "asset_type_zh": "认证文件图",
      "reason": "No exact-SKU certificate or report proving EN/UNI conformity."
    },
    {
      "asset_type_zh": "包装装箱图",
      "reason": "No real packaging photo or packaging specification."
    },
    {
      "asset_type_zh": "安装说明图",
      "reason": "No approved installation drawing covering mating flange, bolts, pipe connection, support and clearance."
    }
  ]
}
```

## 078 ZSDF-沟槽式消防信号蝶阀

系列分组：消防蝶阀；收录文件：28。

资料目录：[ZSDF-沟槽式消防信号蝶阀](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSDF-沟槽式消防信号蝶阀>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "source_photo_model": "DN150",
  "blocked_assets": [
    {
      "asset": "尺寸连接图",
      "status": "blocked",
      "reason": "No exact-model dimensioned drawing or unchanged real measurement photo for DN100/DN150/DN200.",
      "needed": "Manufacturer drawing with H/L/groove dimensions and units for each size."
    },
    {
      "asset": "安装说明图",
      "status": "blocked",
      "reason": "Exact groove standard, mating coupling, pipe OD, orientation, clearance and support data are not verified for the export configuration.",
      "needed": "Destination-project groove specification plus confirmed installation drawing."
    },
    {
      "asset": "认证文件图",
      "status": "blocked",
      "reason": "The model is confirmed as not UL/FM certified, and no CE/EN/LPCB or destination-country approval is supplied.",
      "needed": "Current certificate/listing covering the exact ZSDF export SKU, holder and validity period."
    },
    {
      "asset": "包装装箱图",
      "status": "blocked",
      "reason": "No factory-owned packaging photo, carton data, quantity or weight evidence is supplied.",
      "needed": "Real packaging photos and confirmed packing specifications."
    },
    {
      "asset": "多角度展示图",
      "status": "blocked",
      "reason": "Only one authentic DN150 product angle is supplied; alternate angles were not fabricated.",
      "needed": "Factory-owned side, rear and opposite three-quarter photos."
    }
  ],
  "claim_evidence_ledger": [
    {
      "claim": "Model ZSDF",
      "evidence_grade": "A",
      "evidence": "User-confirmed product input and visible nameplate",
      "applicability": "market-neutral confirmed",
      "publication_status": "publishable"
    },
    {
      "claim": "DN100 / DN150 / DN200",
      "evidence_grade": "A",
      "evidence": "User-confirmed product input",
      "applicability": "market-neutral confirmed",
      "publication_status": "publishable"
    },
    {
      "claim": "DN terminology",
      "evidence_grade": "C",
      "evidence": "ISO 6708:1995 defines DN nominal-size terminology",
      "source_url": "https://www.iso.org/standard/21274.html",
      "applicability": "terminology context only",
      "publication_status": "used only to explain notation; does not prove connection equivalence"
    },
    {
      "claim": "PN16 / 1.6 MPa / 16 bar",
      "evidence_grade": "A",
      "evidence": "User-confirmed manufacturer record",
      "applicability": "market-neutral confirmed",
      "publication_status": "publishable; no Class 150 equivalence"
    },
    {
      "claim": "0–80°C / 32–176°F",
      "evidence_grade": "A",
      "evidence": "User-confirmed 0–80°C; Fahrenheit values are arithmetic conversions",
      "conversion": "°F = °C × 9/5 + 32",
      "applicability": "market-neutral confirmed",
      "publication_status": "publishable"
    },
    {
      "claim": "24 V DC / 0.5 A / SPDT / 1 NO + 1 NC / IP67",
      "evidence_grade": "A",
      "evidence": "User-confirmed manufacturer record",
      "applicability": "market-neutral confirmed",
      "publication_status": "publishable"
    },
    {
      "claim": "IP code terminology",
      "evidence_grade": "C",
      "evidence": "IEC 60529 defines degrees of protection provided by enclosures (IP Code)",
      "source_url": "https://webstore.iec.ch/en/publication/2453",
      "applicability": "terminology context only",
      "publication_status": "no independent IEC test/certification claim"
    },
    {
      "claim": "Body/disc/stem/seal/coating materials",
      "evidence_grade": "A",
      "evidence": "User-confirmed manufacturer record",
      "applicability": "market-neutral confirmed",
      "publication_status": "publishable without ASTM/EN equivalence"
    },
    {
      "claim": "UL 1091 / FM 1112 / NFPA listing context",
      "evidence_grade": "C",
      "evidence": "UL and NFPA official category/standards references",
      "source_url": "https://www.ul.com/services/services-valves-fire-suppression-system",
      "secondary_source_url": "https://docinfofiles.nfpa.org/files/AboutTheCodes/13/13_A2024_AUT_SSI_SD__ballot_final.pdf",
      "applicability": "research context only; exact ZSDF is confirmed not UL/FM certified",
      "publication_status": "foreign compliance logos and claims prohibited"
    }
  ]
}
```

参数与证据文档：

- [copy\evidence-ledger.csv](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSDF-沟槽式消防信号蝶阀/copy/evidence-ledger.csv>)

## 079 ZSDF7-Q系列-对夹式消防蝶阀

系列分组：消防蝶阀；收录文件：37。

资料目录：[ZSDF7-Q系列-对夹式消防蝶阀](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSDF7-Q系列-对夹式消防蝶阀>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "factory_models": [
    {
      "nominal_size": "DN50",
      "factory_model": "ZSDF7-Q-50-16-S",
      "operation": "Lever"
    },
    {
      "nominal_size": "DN65",
      "factory_model": "ZSDF7-Q-65-16-S",
      "operation": "Lever"
    },
    {
      "nominal_size": "DN80",
      "factory_model": "ZSDF7-Q-80-16-S",
      "operation": "Lever"
    },
    {
      "nominal_size": "DN100",
      "factory_model": "ZSDF7-Q-100-16-S",
      "operation": "Lever"
    },
    {
      "nominal_size": "DN125",
      "factory_model": "ZSDF7-Q-125-16-S",
      "operation": "Lever"
    },
    {
      "nominal_size": "DN150",
      "factory_model": "ZSDF7-Q-150-16-S",
      "operation": "Lever"
    },
    {
      "nominal_size": "DN200",
      "factory_model": "ZSDF7-Q-200-16-W",
      "operation": "Gear"
    }
  ],
  "blocked_assets": [
    {
      "asset_type_zh": "DN200涡轮款独立外观图",
      "status": "blocked",
      "reason": "No matching factory-owned gear-operated DN200 product photo"
    },
    {
      "asset_type_zh": "包装装箱图",
      "status": "blocked",
      "reason": "No real packaging photo or verified packing data"
    },
    {
      "asset_type_zh": "认证文件图",
      "status": "blocked",
      "reason": "No current exact-export-SKU certificate or approval evidence for a named destination market"
    },
    {
      "asset_type_zh": "多角度展示图",
      "status": "blocked",
      "reason": "Two additional close-up detail views are now included, but complete alternate overall side/back and packaging views are still unavailable"
    }
  ]
}
```

参数与证据文档：

- [copy\02-evidence-ledger.csv](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSDF7-Q系列-对夹式消防蝶阀/copy/02-evidence-ledger.csv>)

## 080 ZSFC系列-干式报警阀

系列分组：干式报警阀；收录文件：34。

资料目录：[ZSFC系列-干式报警阀](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSFC系列-干式报警阀>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "blocked_assets": [
    "Full dimension and connection drawing",
    "Connected installation image",
    "International certification/listing image",
    "ZSFC200 pressure and test-data image",
    "Packaging and logistics image"
  ],
  "user_confirmation": "copy/用户确认与适用范围.md"
}
```

参数与证据文档：

- [copy\参数证据与单位换算.csv](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSFC系列-干式报警阀/copy/参数证据与单位换算.csv>)
- [copy\参数证据与单位换算.json](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSFC系列-干式报警阀/copy/参数证据与单位换算.json>)
- [copy\国际标准核验与发布边界.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSFC系列-干式报警阀/copy/国际标准核验与发布边界.md>)
- [copy\用户确认与适用范围.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSFC系列-干式报警阀/copy/用户确认与适用范围.md>)
- [source\100# 150#干式报警阀-检验报告.pdf](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSFC系列-干式报警阀/source/100# 150#干式报警阀-检验报告.pdf>)
- [source\ZSFC-series-parameter-input.json](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSFC系列-干式报警阀/source/ZSFC-series-parameter-input.json>)

## 081 ZSFM系列-沟槽型雨淋报警阀

系列分组：雨淋阀；收录文件：25。

资料目录：[ZSFM系列-沟槽型雨淋报警阀](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSFM系列-沟槽型雨淋报警阀>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "blocked_assets": [
    {
      "asset_type_zh": "包装装箱图",
      "status": "blocked",
      "reason": "No real packaging photos or packing specification supplied"
    },
    {
      "asset_type_zh": "认证文件图",
      "status": "blocked",
      "reason": "No exact-export-SKU certificate with destination-market applicability supplied"
    }
  ],
  "evidence_release": {
    "published": "User-confirmed manufacturer facts and visible real-product features",
    "excluded": [
      "GB/GB-T export compliance implication",
      "CCC/3C/CCCF wording or marks",
      "unsupplied foreign approvals",
      "price"
    ]
  }
}
```

参数与证据文档：

- [copy\evidence-ledger.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSFM系列-沟槽型雨淋报警阀/copy/evidence-ledger.md>)

## 082 ZSFM系列-法兰型雨淋报警阀

系列分组：雨淋阀；收录文件：29。

资料目录：[ZSFM系列-法兰型雨淋报警阀](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSFM系列-法兰型雨淋报警阀>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "blocked_assets": [
    {
      "asset_type_zh": "包装装箱图",
      "status": "blocked",
      "reason": "No real packaging photos or packing specification supplied"
    },
    {
      "asset_type_zh": "认证文件图",
      "status": "blocked",
      "reason": "No exact-export-SKU certificate with destination-market applicability supplied"
    },
    {
      "asset_type_zh": "法兰尺寸补充图",
      "status": "blocked",
      "reason": "ZSFM50/65 lack complete L, H1, H; ZSFM125 lacks complete L and H1"
    }
  ],
  "evidence_release": {
    "published": "User-confirmed manufacturer facts and visible real-product features",
    "excluded": [
      "GB/GB-T export compliance implication",
      "CCC/3C/CCCF wording or marks",
      "unsupplied foreign approvals",
      "price"
    ]
  }
}
```

参数与证据文档：

- [copy\evidence-ledger.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSFM系列-法兰型雨淋报警阀/copy/evidence-ledger.md>)

## 083 ZSFM系列-雨淋报警阀

系列分组：雨淋阀；收录文件：28。

资料目录：[ZSFM系列-雨淋报警阀](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSFM系列-雨淋报警阀>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "evidence_release": {
    "grade_a_market_neutral": [
      "ZSFM series identity",
      "Grooved and flanged configurations",
      "Manufacturer-confirmed pressure and alarm values",
      "Component materials",
      "Model list and physical dimensions",
      "Installation orientation and clearances"
    ],
    "domestic_only_excluded": [
      "GB 5135.5-2018",
      "GB/T 17241.6 PN16",
      "GB 5135.11-2006",
      "CCC/3C/CCCF-related wording or marks"
    ],
    "country_specific_compliance": "Not assessed because no destination country, project specification, or export approval file was supplied"
  },
  "blocked_assets": [
    {
      "asset_type_zh": "包装装箱图",
      "status": "blocked",
      "reason": "No real factory-owned packaging photo, packing quantity, carton/crate dimensions, or gross/net weight was supplied",
      "release_input": "Real packaging photographs plus confirmed packing specification"
    },
    {
      "asset_type_zh": "认证文件图",
      "status": "blocked",
      "reason": "No exact-export-SKU certificate or approval file with holder, scope, validity, destination-market applicability, and marketing authorization was supplied",
      "release_input": "Current exact-SKU certificate/report and intended destination country or project specification"
    },
    {
      "asset_type_zh": "法兰尺寸补充图",
      "status": "blocked",
      "reason": "ZSFM50/65 lack complete L, H1 and H values; ZSFM125 lacks complete L and H1 values",
      "release_input": "Matching dimensioned drawings or confirmed manufacturer values"
    }
  ]
}
```

参数与证据文档：

- [copy\evidence-ledger.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSFM系列-雨淋报警阀/copy/evidence-ledger.md>)

## 084 ZSFY100G-ZSFY150G-ZSFY200G-沟槽式预作用装置

系列分组：预作用装置；收录文件：22。

资料目录：[ZSFY100G-ZSFY150G-ZSFY200G-沟槽式预作用装置](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSFY100G-ZSFY150G-ZSFY200G-沟槽式预作用装置>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "verified_market_neutral_facts": [
    "Models: ZSFY100(G), ZSFY150(G), ZSFY200(G)",
    "Nominal sizes: DN100, DN150, DN200",
    "Manufacturer nominal pressure: 1.6 MPa",
    "Connection form: grooved-end",
    "Overall heights: 590 mm, 740 mm, 905 mm",
    "Component materials as recorded in the source archive"
  ],
  "model_mapping_review": "Supplied assembly photos visibly show ZSFZ150 and ZSFZ200 valve-body markings. The ZSFY assembly-to-ZSFZ valve-body relationship must be confirmed before publication of assets 02, 06, 07, 08, 09 and 11.",
  "blocked_assets": [
    {
      "asset_type": "认证文件图",
      "reason": "No exact-SKU international certificate/listing/report and scope evidence."
    },
    {
      "asset_type": "正式安装说明图",
      "reason": "No confirmed orientation, pipe OD, groove profile, clearance, detection/release logic or project specification."
    },
    {
      "asset_type": "包装装箱图",
      "reason": "No real packaging photography or packing data."
    },
    {
      "asset_type": "性能测试图",
      "reason": "No exact-SKU flow-loss, trip, leakage, pressure or endurance report."
    }
  ]
}
```

参数与证据文档：

- [copy\international-standards-crosswalk.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSFY100G-ZSFY150G-ZSFY200G-沟槽式预作用装置/copy/international-standards-crosswalk.md>)
- [copy\missing-evidence.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSFY100G-ZSFY150G-ZSFY200G-沟槽式预作用装置/copy/missing-evidence.md>)

## 085 ZSFY200G-预作用装置

系列分组：预作用装置；收录文件：26。

资料目录：[ZSFY200G-预作用装置](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSFY200G-预作用装置>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "facts": [
    {
      "id": "identity",
      "source_market_value": "预作用装置（沟槽式）ZSFY200（G）",
      "source": "source-confirmation.json; source thread original user request",
      "grade": "A",
      "applicability": "market-neutral confirmed",
      "publish": true,
      "target_value": "Grooved Preaction Valve Assembly; Factory Model: ZSFY200G"
    },
    {
      "id": "photo_mapping",
      "source_market_value": "同意，用200实拍图制作",
      "source": "source thread 01a10501-c1d6-79c3-8f6d-7133eaa1fb14, reply 01a10503-992c-71f2-95a1-2b1a6d6a4700",
      "grade": "A",
      "applicability": "market-neutral confirmed",
      "publish": true,
      "target_value": "Use front-200.jpg / angle-200.jpg / bell-200.jpg; preserve physical ZSFZ200 and 冠亚"
    },
    {
      "id": "height",
      "source_market_value": 90.5,
      "source_market_unit": "cm",
      "target_value": 905,
      "target_unit": "mm",
      "conversion": "90.5 cm × 10 = 905 mm; no added precision or inch-connection inference",
      "source": "source thread original user request; source-confirmation.json",
      "grade": "A",
      "applicability": "market-neutral confirmed",
      "publish": true
    },
    {
      "id": "appearance",
      "source_market_value": "grooved upper end, bolted covers, two gauges, external trim, bell, solenoid component",
      "source": "three original user-owned product photographs",
      "grade": "A",
      "applicability": "market-neutral confirmed",
      "publish": true,
      "target_value": "Only visible structure; no performance claim"
    },
    {
      "id": "DN",
      "source_market_value": "DN200 (8-inch notation in old series content sheet)",
      "source": "old 1688 series content-sheet.md and manifest.json; current parameter-input JSON",
      "grade": "D/candidate record for this release",
      "applicability": "unmapped",
      "publish": false,
      "reason": "Primary nominal-size specification and exact export pipe OD not independently recovered; never convert DN to an inch connection."
    },
    {
      "id": "pressure",
      "source_market_value": "1.6 MPa / PN16",
      "source": "old series content-sheet.md and manifest.json; current 1688 input JSON",
      "grade": "D/candidate record for this release",
      "applicability": "unmapped",
      "publish": false,
      "reason": "Old generated records cannot independently establish rated service of the proposed export configuration; no bar/psi/Class conversion rendered."
    },
    {
      "id": "materials_electrical",
      "source_market_value": "QT450-10, epoxy, NBR, H62, DC24V and component material list",
      "source": "old content-sheet.md and manifest.json; latest 1688 parameter-input JSON",
      "grade": "D/candidate record for this release",
      "applicability": "unmapped",
      "publish": false,
      "reason": "Historical confirmation is recorded but primary exact-configuration evidence not independently recovered; held from buyer images."
    },
    {
      "id": "approval",
      "source_market_value": null,
      "source": "No exact-SKU certificates supplied",
      "grade": "missing",
      "applicability": "unmapped",
      "publish": false,
      "reason": "No UL/FM/CE/EN/NFPA/ISO conformity claim; category standards are research context only."
    }
  ],
  "blocked_modules": [
    "Named-country certification or approvals",
    "Formal installation and interlock/control logic",
    "Pressure, material and electrical specifications pending exact-configuration evidence",
    "Packing, factory/project scenes, performance test imagery",
    "Variant comparison: this task only ZSFY200G"
  ],
  "missing_data_file": "copy/英文文案与中文说明.txt"
}
```

参数与证据文档：

- [copy\fact-crosswalk.json](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSFY200G-预作用装置/copy/fact-crosswalk.json>)
- [copy\source-confirmation.json](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSFY200G-预作用装置/copy/source-confirmation.json>)

## 086 ZSFY系列-法兰式预作用装置

系列分组：预作用装置；收录文件：23。

资料目录：[ZSFY系列-法兰式预作用装置](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSFY系列-法兰式预作用装置>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "verified_market_neutral_facts": [
    "Photographed unit: ZSFY150 standard configuration, DN150",
    "Connection form: flanged; exact flange standard and pressure class not established",
    "Overall heights: ZSFY100 570 mm; ZSFY150 665 mm; ZSFY150 new 690 mm; ZSFY200 825 mm; ZSFY200 new 865 mm; ZSFY250 1000 mm",
    "Body: ductile iron",
    "External trim piping: galvanized steel",
    "Brass-color valve components: brass",
    "Seals: NBR",
    "Red finish: epoxy coating",
    "Solenoid valve voltage: DC 24 V",
    "External components: pressure gauges, solenoid valve, pressure switch, water motor gong and external control pipework"
  ],
  "blocked_assets": [
    {
      "asset_type": "认证文件图",
      "reason": "No exact-SKU international certificate/listing/report and scope evidence."
    },
    {
      "asset_type": "正式安装说明图",
      "reason": "No confirmed flange standard, pressure class, release/interlock logic, clearance or project specification."
    },
    {
      "asset_type": "包装装箱图",
      "reason": "No real packaging photography or packing data."
    },
    {
      "asset_type": "性能测试图",
      "reason": "No exact-SKU pressure, leakage, trip, alarm, flow-loss or endurance report."
    }
  ]
}
```

参数与证据文档：

- [copy\evidence-ledger.csv](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSFY系列-法兰式预作用装置/copy/evidence-ledger.csv>)
- [copy\international-standards-crosswalk.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSFY系列-法兰式预作用装置/copy/international-standards-crosswalk.md>)
- [copy\missing-evidence.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSFY系列-法兰式预作用装置/copy/missing-evidence.md>)

## 087 ZSFZ-G-沟槽式湿式报警阀

系列分组：湿式报警阀；收录文件：31。

资料目录：[ZSFZ-G-沟槽式湿式报警阀](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSFZ-G-沟槽式湿式报警阀>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "factory_models": [
    "ZSFZ100(G)",
    "ZSFZ150(G)",
    "ZSFZ200(G)"
  ],
  "fact_ledger": "copy/fact-ledger.json",
  "source_confirmation_record": "source/latest-user-confirmations.json",
  "missing_data": "copy/中文待确认清单.txt"
}
```

参数与证据文档：

- [copy\fact-ledger.json](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSFZ-G-沟槽式湿式报警阀/copy/fact-ledger.json>)
- [copy\中文待确认清单.txt](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSFZ-G-沟槽式湿式报警阀/copy/中文待确认清单.txt>)
- [source\latest-user-confirmations.json](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSFZ-G-沟槽式湿式报警阀/source/latest-user-confirmations.json>)

## 088 zsfz100-flanged-wet-alarm-valve

系列分组：湿式报警阀；收录文件：89。

资料目录：[zsfz100-flanged-wet-alarm-valve](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/zsfz100-flanged-wet-alarm-valve>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "user_confirmations": [
    "Use DN100 product visuals for ZSFZ100.",
    "The ZSFZ100 material specification is the same as the related DN150 configuration.",
    "The supplied photographs are the left and right 45-degree product references."
  ],
  "material_evidence": [
    {
      "claim": "Body and cover corrosion resistance not lower than cast iron",
      "basis": "Series report plus user confirmation of ZSFZ100 applicability",
      "status": "Confirmed requirement; exact alloy grade not supplied"
    },
    {
      "claim": "Valve seat corrosion resistance not lower than bronze",
      "basis": "Series report plus user confirmation",
      "status": "Confirmed requirement; exact alloy grade not supplied"
    },
    {
      "claim": "Moving parts use bronze, brass or austenitic stainless steel",
      "basis": "Series report plus user confirmation",
      "status": "Confirmed requirement; part-by-part alloy grades not supplied"
    },
    {
      "claim": "Strainers and water-motor-gong nozzle corrosion resistance not lower than brass",
      "basis": "Series report plus user confirmation",
      "status": "Confirmed requirement; exact alloy grade not supplied"
    }
  ]
}
```

## 089 zsjz-50-65-流水指示器

系列分组：水流指示器及末端试水；收录文件：41。

资料目录：[zsjz-50-65-流水指示器](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/zsjz-50-65-流水指示器>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "models": [
    {
      "display_model": "ZSJZ 65",
      "nominal_size": "DN65",
      "full_model_suffix": "not confirmed",
      "source_image": "source/ZSJZ65-real-photo-user.jpg",
      "evidence_grade": "A",
      "applicability": "market-neutral confirmed"
    },
    {
      "display_model": "ZSJZ 50",
      "nominal_size": "DN50",
      "full_model_suffix": "not confirmed",
      "source_image": "source/ZSJZ50-real-photo-user.jpg",
      "evidence_grade": "A",
      "applicability": "market-neutral confirmed"
    }
  ]
}
```

参数与证据文档：

- [copy\evidence-ledger.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/zsjz-50-65-流水指示器/copy/evidence-ledger.md>)
- [copy\parameter-crosswalk.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/zsjz-50-65-流水指示器/copy/parameter-crosswalk.md>)

## 090 ZSPM系列-末端试水装置

系列分组：水流指示器及末端试水；收录文件：26。

资料目录：[ZSPM系列-末端试水装置](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSPM系列-末端试水装置>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "models": [
    "ZSPM-80/1.2-S",
    "ZSPM-115/1.2-S"
  ],
  "reference_model_shown": "ZSPM-115/1.2-S",
  "verified_claims": [
    {
      "field": "models",
      "value": [
        "ZSPM-80/1.2-S",
        "ZSPM-115/1.2-S"
      ],
      "evidence_grade": "A",
      "evidence": [
        "user-confirmed archive manifest",
        "report Gn202004067"
      ],
      "applicability": "market-neutral confirmed",
      "publication_status": "publishable"
    },
    {
      "field": "flow coefficient K",
      "value": {
        "ZSPM-80/1.2-S": 80,
        "ZSPM-115/1.2-S": 115
      },
      "evidence_grade": "A",
      "evidence": [
        "user-confirmed archive supplement",
        "report Gn202004067"
      ],
      "applicability": "market-neutral confirmed",
      "publication_status": "publishable without foreign-unit conversion"
    },
    {
      "field": "rated working pressure",
      "source_value": "1.2 MPa",
      "target_display": "1.2 MPa / 12 bar",
      "conversion_formula": "1 MPa = 10 bar; 1.2 MPa x 10 = 12 bar",
      "evidence_grade": "A",
      "evidence": [
        "user-confirmed archive manifest",
        "report Gn202004067"
      ],
      "applicability": "market-neutral confirmed",
      "publication_status": "publishable; conversion does not imply a pressure class"
    },
    {
      "field": "nominal pressure class",
      "value": "PN16",
      "model_coverage": [
        "ZSPM-80/1.2-S",
        "ZSPM-115/1.2-S"
      ],
      "evidence_grade": "A user confirmation",
      "evidence": "direct user instruction on 2026-09-20",
      "applicability": "market-neutral confirmed",
      "publication_status": "publishable; shown as a pressure class and not as a conversion of 1.2 MPa"
    },
    {
      "field": "overall dimensions",
      "value": "200 x 175 mm (L x H)",
      "model_coverage": [
        "ZSPM-80/1.2-S",
        "ZSPM-115/1.2-S"
      ],
      "evidence_grade": "A user confirmation",
      "evidence": "archive supplement_v2",
      "applicability": "market-neutral confirmed",
      "publication_status": "publishable as textual dimensions; not presented as a scaled drawing"
    },
    {
      "field": "component materials",
      "value": {
        "valve_body": "Brass HPb59-1",
        "ball": "Chrome-plated brass",
        "stem": "Stainless steel 304",
        "valve_seat": "PTFE",
        "seal": "NBR",
        "test_nozzle": "Brass H62",
        "gauge_connector": "Brass self-locking connector",
        "protective_guard": "Red ABS"
      },
      "model_coverage": [
        "ZSPM-80/1.2-S",
        "ZSPM-115/1.2-S"
      ],
      "evidence_grade": "A user confirmation",
      "evidence": "archive supplement_v2",
      "applicability": "market-neutral confirmed",
      "publication_status": "publishable"
    }
  ],
  "blocked_or_omitted": [
    {
      "field": "nominal size and connection designation",
      "reason": "Archive text says DN20 and 3/4 inch, while a supplied real product photo visibly shows DN25. Exact thread form and export interface mapping are unconfirmed.",
      "needed_to_release": "Confirm the exact export SKU nominal size, thread form (for example G/R/Rc/Rp/NPT), male/female arrangement and model coverage."
    },
    {
      "field": "ZSPM-80 appearance",
      "reason": "No current standalone overall product photograph for the 80 model was supplied.",
      "needed_to_release": "Provide a current factory-owned overall photo and nameplate photo for ZSPM-80/1.2-S."
    },
    {
      "field": "connected installation image",
      "reason": "Installation orientation, connection arrangement, clearance and mating interface are not documented.",
      "needed_to_release": "Provide an installation manual/drawing or a verified installation photo with orientation and interface details."
    },
    {
      "field": "packaging image",
      "reason": "No real single-unit or carton photos, packing quantity, net/gross weight or package dimensions were supplied.",
      "needed_to_release": "Provide factory-owned packaging photos and packing data."
    },
    {
      "field": "export certification image",
      "reason": "No target-country certificate or approval covering the exact export SKU was supplied.",
      "needed_to_release": "Provide current exact-model certificate, scope, holder, validity and marketing authorization for the named country/project."
    },
    {
      "field": "public test-report claim",
      "reason": "The available report is a 2021 China domestic type-test report and current sales-batch consistency has not been confirmed.",
      "needed_to_release": "Confirm current configuration equivalence and the intended market use; provide an export-relevant report if a foreign compliance claim is required."
    }
  ]
}
```

参数与证据文档：

- [copy\evidence-and-blockers.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSPM系列-末端试水装置/copy/evidence-and-blockers.md>)

## 091 ZSPTX-ZSPTZ系列-筒式水泡沫两用喷头

系列分组：泡沫喷头及配件；收录文件：25。

资料目录：[ZSPTX-ZSPTZ系列-筒式水泡沫两用喷头](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSPTX-ZSPTZ系列-筒式水泡沫两用喷头>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "blocked_assets": [
    "Exact dimension/connection drawing",
    "Exact BSPT R1/2 and R3/4 size mapping",
    "Exact photo-to-model/orientation mapping",
    "6分 product photo",
    "Packaging evidence image",
    "Certification/test evidence image"
  ]
}
```

参数与证据文档：

- [copy\evidence-ledger.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSPTX-ZSPTZ系列-筒式水泡沫两用喷头/copy/evidence-ledger.md>)

## 092 ZST-80-68℃-玻璃球洒水喷头

系列分组：其他洒水喷头及配件；收录文件：30。

资料目录：[ZST-80-68℃-玻璃球洒水喷头](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZST-80-68℃-玻璃球洒水喷头>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "evidence_summary": {
    "grade_A": [
      "Current user confirmation: NPT thread family",
      "Archived user-confirmed product facts and real photos",
      "New exact-product detail photographs for K-ZSTX80 pendent and K-ZSTU80 upright deflector geometry and model markings"
    ],
    "market_neutral_confirmed": [
      "DN15",
      "K=80±4",
      "68°C",
      "red bulb",
      "pendent/upright",
      "NPT 1/2",
      "materials",
      "wet-pipe system"
    ],
    "held_back": [
      "Exact full model suffix",
      "Response type",
      "Glass bulb diameter",
      "H/D/L dimensions",
      "Certification and approval claims",
      "Packaging claims"
    ]
  }
}
```

## 093 ZST-K202-68C-Q5-1IN-3WAY-消防洒水喷头

系列分组：大K及ESFR喷头；收录文件：26。

资料目录：[ZST-K202-68C-Q5-1IN-3WAY-消防洒水喷头](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZST-K202-68C-Q5-1IN-3WAY-消防洒水喷头>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "exact_models": [
    "ZSTZ 202-68°C Q5",
    "ZSTX 202-68°C Q5",
    "ZSTBS 202-68°C Q5"
  ],
  "crosswalk": [
    {
      "field": "nominal_k_factor",
      "source_value": "K202 metric",
      "source_unit": "L/min/√bar",
      "export_value": "K202 metric; approximate K14.0 U.S.",
      "conversion_formula": "202 / (3.785411784 × √14.5037738) = 14.012",
      "rounding": "14.0",
      "evidence": "current product model markings in source photos; unit convention in Viking manufacturer technical data",
      "applicability": "market-neutral confirmed",
      "publication": "metric and clearly labelled arithmetic conversion only"
    },
    {
      "field": "activation_temperature",
      "source_value": "68",
      "source_unit": "°C",
      "export_value": "68°C",
      "evidence": "current product model markings",
      "applicability": "market-neutral confirmed",
      "publication": "yes"
    },
    {
      "field": "bulb_diameter",
      "source_value": "5",
      "source_unit": "mm",
      "export_value": "5 mm red glass bulb",
      "evidence": "user confirmation 2026-09-03 and visible product photos",
      "applicability": "market-neutral confirmed",
      "publication": "yes"
    },
    {
      "field": "connection",
      "source_value": "1 in",
      "source_unit": "nominal",
      "export_value": "1 in nominal; BSPT thread family",
      "evidence": "user confirmation in archive; standing user-confirmed BSPT default",
      "applicability": "market-neutral confirmed",
      "publication": "yes, no ISO 7-1 compliance or mating-compatibility claim"
    },
    {
      "field": "materials",
      "source_value": "copper body; stainless steel deflector; electroplated surface",
      "source_unit": null,
      "export_value": "same",
      "evidence": "user confirmation 2026-09-03",
      "applicability": "market-neutral confirmed",
      "publication": "yes"
    },
    {
      "field": "pressure_flow_coverage_dimensions_certification",
      "source_value": null,
      "source_unit": null,
      "export_value": null,
      "evidence": "matching export-SKU documents unavailable",
      "applicability": "unmapped",
      "publication": "blocked"
    }
  ],
  "blocked_modules": [
    {
      "name": "dimension drawing",
      "needed": "matching dimensioned drawings for all three variants"
    },
    {
      "name": "working pressure, tested flow and coverage",
      "needed": "exact export-SKU specification or test reports, especially sidewall K202 coverage"
    },
    {
      "name": "certification document",
      "needed": "current certificate/report with holder, model scope, validity and use authorization"
    },
    {
      "name": "packaging",
      "needed": "authentic matching product packaging photos and pack quantities"
    }
  ],
  "user_scope_confirmation": "2026-09-28: 通用英文版，暂不展示认证声明",
  "publication_scope": "Manufacturer nominal facts and appearance only; no claim of compliance with ISO, EN, NFPA, UL, FM or a destination-country rule.",
  "thread_evidence_resolution": "Old archive lacks thread-specific evidence; current standing user-confirmed sprinkler default in chuanwei-fire-commerce supplies BSPT family. No exact-SKU contradictory drawing or marking found. No NPT, pitch, R1 designation or ISO 7-1 compliance inferred."
}
```

参数与证据文档：

- [copy\图片使用顺序与参数核验.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZST-K202-68C-Q5-1IN-3WAY-消防洒水喷头/copy/图片使用顺序与参数核验.md>)

## 094 ZSTDY115-57C-Q5A-隐蔽式洒水喷头

系列分组：隐蔽式喷头；收录文件：32。

资料目录：[ZSTDY115-57C-Q5A-隐蔽式洒水喷头](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTDY115-57C-Q5A-隐蔽式洒水喷头>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "factory_model": "ZSTDY115-57°C Q5A",
  "facts": [
    {
      "field": "product_name",
      "value": "Concealed Fire Sprinkler",
      "source": [
        "user original product description",
        "source/01-带盖白底原图.jpg",
        "source/04-罩筒与喷头实拍原图.jpg"
      ],
      "grade": "A",
      "applicability": "market-neutral confirmed"
    },
    {
      "field": "factory_model",
      "value": "ZSTDY115-57°C Q5A",
      "source_value": "ZSTDY115-57℃ Q5A",
      "source": [
        "source/01-带盖白底原图.jpg",
        "source/03-溅水盘俯视原图.jpg",
        "source/04-罩筒与喷头实拍原图.jpg"
      ],
      "grade": "A",
      "applicability": "market-neutral confirmed"
    },
    {
      "field": "sprinkler_temperature",
      "value": "57°C",
      "source_value": "57℃",
      "source": [
        "same-SKU physical label and deflector"
      ],
      "grade": "A",
      "applicability": "market-neutral confirmed",
      "note_zh": "仅喷头温级，不证明盖板脱落温度"
    },
    {
      "field": "frame_material",
      "value": "Copper",
      "source_value": "铜材质框架喷头",
      "source": [
        "userMessage 01a10552-8542-70f2-9801-a765d64464c6"
      ],
      "grade": "A",
      "applicability": "market-neutral confirmed",
      "note_zh": "优先逐SKU原文；不扩大为整机全铜、纯铜、黄铜合金或镀层"
    },
    {
      "field": "glass_bulb_diameter",
      "value": "5 mm",
      "source_value": "5mm玻璃球",
      "source": [
        "userMessage 01a10552-8542-70f2-9801-a765d64464c6",
        "source/02-喷头本体白底原图.jpg: CYΦ5",
        "copy/用户补充参数确认.json: repeated confirmation"
      ],
      "grade": "A",
      "applicability": "market-neutral confirmed"
    },
    {
      "field": "connection",
      "value": "3/4 inch BSPT",
      "source_value": "是6分（3/4英寸）BSPT",
      "source": [
        "userMessage 01a10555-639f-7cc1-bd55-aa09db7acb15"
      ],
      "grade": "A",
      "applicability": "market-neutral confirmed",
      "note_zh": "直接采用用户尺寸与螺纹确认；无DN换算、NPT替换或ISO7代码推断"
    },
    {
      "field": "working_pressure",
      "value": "1.2 MPa",
      "source_value": "我们产品的工作压力为 **1.2MPa** ，生成图片内容",
      "source": [
        "userMessage 01a10581-23f2-70c2-a011-68aec995df38",
        "copy/用户补充参数确认.json: repeated confirmation"
      ],
      "grade": "A",
      "applicability": "market-neutral confirmed",
      "note_zh": "不用最大压力、≤、水压试验或其他厂商参数"
    },
    {
      "field": "cover_color",
      "value": "White",
      "source": [
        "source/01-带盖白底原图.jpg"
      ],
      "grade": "A",
      "applicability": "market-neutral confirmed"
    },
    {
      "field": "cover_shape",
      "value": "Round",
      "source": [
        "source/01-带盖白底原图.jpg"
      ],
      "grade": "A",
      "applicability": "market-neutral confirmed"
    },
    {
      "field": "physical_brand",
      "value": "冠亚 / GUANYA FIRE-FIGHTING",
      "source": [
        "same-SKU original labels and frame",
        "skill standing user same-company confirmation"
      ],
      "grade": "A",
      "applicability": "market-neutral confirmed",
      "note_zh": "原实物身份保留；营销页角使用CHUANWEI FIRE"
    },
    {
      "field": "physical_standard_marking",
      "value": "GB5135.1-2019",
      "source": [
        "source/01-带盖白底原图.jpg",
        "source/04-罩筒与喷头实拍原图.jpg"
      ],
      "grade": "A/direct_visible",
      "applicability": "domestic-only",
      "publishable_as_added_export_claim": false,
      "note_zh": "仅保留照片内原铭牌，无额外标准宣传，也不证明国际认证"
    },
    {
      "field": "k_factor_metric",
      "value": "115 L/min/√bar",
      "source_value": "K系数115 + 公制：L/min/√bar",
      "source": [
        "copy/用户补充参数确认.json"
      ],
      "grade": "A/user_confirmed",
      "applicability": "market-neutral confirmed",
      "conversion_formula": null,
      "note_zh": "本SKU用户直接确认，不从型号推断，不换算美制K"
    },
    {
      "field": "nominal_size",
      "value": "DN20",
      "source_value": "螺纹是dn20",
      "source": [
        "copy/用户补充参数确认.json"
      ],
      "grade": "A/user_confirmed",
      "applicability": "market-neutral confirmed",
      "note_zh": "DN是公称尺寸；螺纹接口沿用此前直接确认3/4英寸BSPT，两者单列"
    }
  ],
  "parameter_crosswalk": [
    {
      "field": "product_name",
      "source_market_value": "Concealed Fire Sprinkler",
      "source": [
        "user original product description",
        "source/01-带盖白底原图.jpg",
        "source/04-罩筒与喷头实拍原图.jpg"
      ],
      "target_market_value": "Concealed Fire Sprinkler",
      "target_country_project": null,
      "evidence_grade": "A",
      "applicability": "market-neutral confirmed",
      "conversion_formula": null,
      "conflict": null,
      "publishable": true
    },
    {
      "field": "factory_model",
      "source_market_value": "ZSTDY115-57℃ Q5A",
      "source": [
        "source/01-带盖白底原图.jpg",
        "source/03-溅水盘俯视原图.jpg",
        "source/04-罩筒与喷头实拍原图.jpg"
      ],
      "target_market_value": "ZSTDY115-57°C Q5A",
      "target_country_project": null,
      "evidence_grade": "A",
      "applicability": "market-neutral confirmed",
      "conversion_formula": null,
      "conflict": null,
      "publishable": true
    },
    {
      "field": "sprinkler_temperature",
      "source_market_value": "57℃",
      "source": [
        "same-SKU physical label and deflector"
      ],
      "target_market_value": "57°C",
      "target_country_project": null,
      "evidence_grade": "A",
      "applicability": "market-neutral confirmed",
      "conversion_formula": null,
      "conflict": null,
      "publishable": true
    },
    {
      "field": "frame_material",
      "source_market_value": "铜材质框架喷头",
      "source": [
        "userMessage 01a10552-8542-70f2-9801-a765d64464c6"
      ],
      "target_market_value": "Copper",
      "target_country_project": null,
      "evidence_grade": "A",
      "applicability": "market-neutral confirmed",
      "conversion_formula": null,
      "conflict": null,
      "publishable": true
    },
    {
      "field": "glass_bulb_diameter",
      "source_market_value": "5mm玻璃球",
      "source": [
        "userMessage 01a10552-8542-70f2-9801-a765d64464c6",
        "source/02-喷头本体白底原图.jpg: CYΦ5"
      ],
      "target_market_value": "5 mm",
      "target_country_project": null,
      "evidence_grade": "A",
      "applicability": "market-neutral confirmed",
      "conversion_formula": null,
      "conflict": null,
      "publishable": true
    },
    {
      "field": "connection",
      "source_market_value": "是6分（3/4英寸）BSPT",
      "source": [
        "userMessage 01a10555-639f-7cc1-bd55-aa09db7acb15"
      ],
      "target_market_value": "3/4 inch BSPT",
      "target_country_project": null,
      "evidence_grade": "A",
      "applicability": "market-neutral confirmed",
      "conversion_formula": null,
      "conflict": null,
      "publishable": true
    },
    {
      "field": "working_pressure",
      "source_market_value": "我们产品的工作压力为 **1.2MPa** ，生成图片内容",
      "source": [
        "userMessage 01a10581-23f2-70c2-a011-68aec995df38"
      ],
      "target_market_value": "1.2 MPa",
      "target_country_project": null,
      "evidence_grade": "A",
      "applicability": "market-neutral confirmed",
      "conversion_formula": null,
      "conflict": null,
      "publishable": true
    },
    {
      "field": "cover_color",
      "source_market_value": "White",
      "source": [
        "source/01-带盖白底原图.jpg"
      ],
      "target_market_value": "White",
      "target_country_project": null,
      "evidence_grade": "A",
      "applicability": "market-neutral confirmed",
      "conversion_formula": null,
      "conflict": null,
      "publishable": true
    },
    {
      "field": "cover_shape",
      "source_market_value": "Round",
      "source": [
        "source/01-带盖白底原图.jpg"
      ],
      "target_market_value": "Round",
      "target_country_project": null,
      "evidence_grade": "A",
      "applicability": "market-neutral confirmed",
      "conversion_formula": null,
      "conflict": null,
      "publishable": true
    },
    {
      "field": "physical_brand",
      "source_market_value": "冠亚 / GUANYA FIRE-FIGHTING",
      "source": [
        "same-SKU original labels and frame",
        "skill standing user same-company confirmation"
      ],
      "target_market_value": "冠亚 / GUANYA FIRE-FIGHTING",
      "target_country_project": null,
      "evidence_grade": "A",
      "applicability": "market-neutral confirmed",
      "conversion_formula": null,
      "conflict": null,
      "publishable": true
    },
    {
      "field": "physical_standard_marking",
      "source_market_value": "GB5135.1-2019",
      "source": [
        "source/01-带盖白底原图.jpg",
        "source/04-罩筒与喷头实拍原图.jpg"
      ],
      "target_market_value": null,
      "target_country_project": null,
      "evidence_grade": "A/direct_visible",
      "applicability": "domestic-only",
      "conversion_formula": null,
      "conflict": null,
      "publishable": false
    },
    {
      "field": "k_factor_metric",
      "source_market_value": "115 L/min/√bar",
      "source": [
        "copy/用户补充参数确认.json"
      ],
      "target_market_value": "115 L/min/√bar",
      "target_country_project": null,
      "evidence_grade": "A",
      "applicability": "market-neutral confirmed",
      "conversion_formula": null,
      "conflict": null,
      "publishable": true
    },
    {
      "field": "nominal_size",
      "source_market_value": "DN20",
      "source": [
        "copy/用户补充参数确认.json"
      ],
      "target_market_value": "DN20",
      "target_country_project": null,
      "evidence_grade": "A",
      "applicability": "market-neutral confirmed",
      "conversion_formula": null,
      "conflict": null,
      "publishable": true
    }
  ],
  "missing_or_held": [
    "响应等级、RTI及对应报告；5mm不单独证明standard response",
    "盖板脱落温度、盖板材质及配对设计",
    "本型号尺寸、盖板直径、开孔、净空、安装方向/方法及安装图纸",
    "具体目标国家/项目、出口配置清单及要求的有效认证/测试报告；现有资料不证明UL/FM/CE/EN/LPCB/NFPA合规",
    "包装实拍、装箱数、尺寸/重量与配件范围",
    "实际1688 offer URL与offer ID未提供；不将归档文件夹当作网页",
    "价格、MOQ、交期、服务承诺未确认；本次不写入买家图"
  ]
}
```

参数与证据文档：

- [copy\事实与出口适用性台账.json](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTDY115-57C-Q5A-隐蔽式洒水喷头/copy/事实与出口适用性台账.json>)
- [copy\待确认清单.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTDY115-57C-Q5A-隐蔽式洒水喷头/copy/待确认清单.md>)
- [copy\用户补充参数确认.json](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTDY115-57C-Q5A-隐蔽式洒水喷头/copy/用户补充参数确认.json>)
- [source\来源对话用户确认.json](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTDY115-57C-Q5A-隐蔽式洒水喷头/source/来源对话用户确认.json>)

## 095 ZSTDY115-79C-Q5A-隐蔽式洒水喷头

系列分组：隐蔽式喷头；收录文件：24。

资料目录：[ZSTDY115-79C-Q5A-隐蔽式洒水喷头](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTDY115-79C-Q5A-隐蔽式洒水喷头>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "factory_model": "ZSTDY 115-79°C Q5A",
  "facts": [
    {
      "field": "product_name",
      "source_value": "隐蔽式洒水喷头",
      "target_value": "Concealed Fire Sprinkler",
      "evidence_grade": "A",
      "source": "原始用户产品照片和源SKU记录",
      "applicability": "market-neutral confirmed",
      "publishable": true
    },
    {
      "field": "factory_model",
      "source_value": "ZSTDY 115-79℃ Q5A",
      "target_value": "ZSTDY 115-79°C Q5A",
      "evidence_grade": "A",
      "source": "source/04-罩筒与本体原始实拍.jpg 标签及 source/03-溅水盘原始实拍.jpg 刻字",
      "applicability": "market-neutral confirmed",
      "publishable": true,
      "notes": "115仅保留作工厂型号部分，不推断K值或温度。"
    },
    {
      "field": "sprinkler_temperature",
      "source_value": "79℃",
      "target_value": "79°C Sprinkler Temperature",
      "evidence_grade": "A",
      "source": "原始实拍型号标识79℃",
      "applicability": "market-neutral confirmed",
      "publishable": true,
      "notes": "不等于罩盖脱落温度；无单位数值换算，仅℃排印为°C。"
    },
    {
      "field": "body_material",
      "source_value": "铜材质框架",
      "target_value": "Copper Body",
      "evidence_grade": "A",
      "source": "原始用户首条消息铜材质框架；技能长期确认默认",
      "applicability": "market-neutral confirmed",
      "publishable": true,
      "notes": "Copper Body按技能用户确认措辞，不声称全部组件铜、不声称纯铜/黄铜/牌号/镀层/耐腐蚀。"
    },
    {
      "field": "glass_bulb",
      "source_value": "5mm玻璃球",
      "target_value": "5 mm Glass Bulb",
      "evidence_grade": "A",
      "source": "原始用户首条消息5mm玻璃球及技能长期确认",
      "applicability": "market-neutral confirmed",
      "publishable": true
    },
    {
      "field": "thread_family",
      "source_value": "BSPT",
      "target_value": "BSPT Thread / Thread Family: BSPT",
      "evidence_grade": "A",
      "source": "alibaba-detail-image-studio/SKILL.md standing sprinkler defaults 用户长期确认",
      "applicability": "market-neutral confirmed",
      "publishable": true,
      "notes": "仅家族名称，不给尺寸、ISO具体标记、NPT映射、牙距或兼容性结论。"
    },
    {
      "field": "source_working_pressure",
      "source_value": "1.2 MPa",
      "target_value": null,
      "evidence_grade": "A",
      "source": "原始用户消息01a10785-e408-78e0-8d4b-9410996e9e49: 1.2mpa",
      "applicability": "unmapped",
      "publishable": false,
      "notes": "中国源款工作压力已确认；出口配置对应未核实，本套图省略，不作为试验压力或压力等级。"
    },
    {
      "field": "source_connection_size",
      "source_value": "6分",
      "target_value": null,
      "evidence_grade": "A",
      "source": "原始用户消息01a10785-e3db-7703-b797-8322a0544f92: 6分，工作压力1，2",
      "applicability": "unmapped",
      "publishable": false,
      "notes": "国际螺纹尺寸与精确接口定义未核实；不换算成3/4、DN或NPT。"
    },
    {
      "field": "standard_label",
      "source_value": "GB5135.1-2019（实物标签原文）",
      "target_value": null,
      "evidence_grade": "A for visible marking only",
      "source": "source/04-罩筒与本体原始实拍.jpg",
      "applicability": "domestic-only",
      "publishable": false,
      "notes": "实拍照片保留标签原貌，未在英文文案中新增合规声明，不等价于国外认证。"
    }
  ],
  "missing_confirmation": [
    "出口配置对应的工作压力及其额定/测试定义；源款用户已确认1.2 MPa，未据此作出口宣传。",
    "精确国际接口尺寸、牙型/牙距/ISO接口标记及配套兼容要求；6分不直接转换。",
    "罩盖脱落温度、尺寸、开孔、安装深度、间隙及安装说明。",
    "K-factor、RTI、流量/压力性能报告。",
    "确切目的国/项目标准和覆盖本SKU的有效UL/FM/CE/EN等资料。",
    "真实包装照片、装箱数量、重量等。"
  ]
}
```

参数与证据文档：

- [copy\事实来源与参数交叉表.json](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTDY115-79C-Q5A-隐蔽式洒水喷头/copy/事实来源与参数交叉表.json>)
- [source\1688原始确认参数.json](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTDY115-79C-Q5A-隐蔽式洒水喷头/source/1688原始确认参数.json>)
- [source\原始用户确认记录.json](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTDY115-79C-Q5A-隐蔽式洒水喷头/source/原始用户确认记录.json>)

## 096 ZSTDY115-93C-Q5A-隐蔽式洒水喷头

系列分组：隐蔽式喷头；收录文件：32。

资料目录：[ZSTDY115-93C-Q5A-隐蔽式洒水喷头](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTDY115-93C-Q5A-隐蔽式洒水喷头>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "factory_model": "ZSTDY115-93°C Q5A",
  "model_source_verbatim": "ZSTDY115-93℃ Q5A",
  "fact_crosswalk": [
    {
      "id": "F1",
      "field": "Product identity",
      "source_market_value": "隐蔽式洒水喷头",
      "target_copy": "Concealed Fire Sprinkler",
      "unit": "",
      "source": "source/01-带盖白底原图.jpg;source/04-罩筒与本体原始实拍.jpg",
      "basis": "exact-SKU photographs and latest replacement photos",
      "evidence_grade": "A",
      "fact_status": "confirmed",
      "market_applicability": "market-neutral confirmed",
      "exact_export_configuration": "same exact photographed ZSTDY115-93°C Q5A; manufacturer facts only",
      "domestic_context": "1688 original archive; no regulatory or standard equivalence carried into artwork",
      "target_country_or_project": null,
      "target_standard_basis": "none claimed",
      "conversion_formula": null,
      "conflict": null,
      "publishable": true
    },
    {
      "id": "F2",
      "field": "Factory Model",
      "source_market_value": "ZSTDY115-93℃ Q5A",
      "target_copy": "ZSTDY115-93°C Q5A",
      "unit": "",
      "source": "source/01-带盖白底原图.jpg;source/03-溅水盘原始实拍.jpg;source/04-罩筒与本体原始实拍.jpg",
      "basis": "visible labels and engraving, latest user replacement photos",
      "evidence_grade": "A",
      "fact_status": "confirmed",
      "market_applicability": "market-neutral confirmed",
      "exact_export_configuration": "same exact photographed ZSTDY115-93°C Q5A; manufacturer facts only",
      "domestic_context": "1688 original archive; no regulatory or standard equivalence carried into artwork",
      "target_country_or_project": null,
      "target_standard_basis": "none claimed",
      "conversion_formula": null,
      "conflict": null,
      "publishable": true
    },
    {
      "id": "F3",
      "field": "Activation temperature",
      "source_market_value": "93℃",
      "target_copy": "93°C",
      "unit": "°C",
      "source": "source/01-带盖白底原图.jpg;source/04-罩筒与本体原始实拍.jpg",
      "basis": "sprinkler nominal temperature; not cover release temperature",
      "evidence_grade": "A",
      "fact_status": "confirmed",
      "market_applicability": "market-neutral confirmed",
      "exact_export_configuration": "same exact photographed ZSTDY115-93°C Q5A; manufacturer facts only",
      "domestic_context": "1688 original archive; no regulatory or standard equivalence carried into artwork",
      "target_country_or_project": null,
      "target_standard_basis": "none claimed",
      "conversion_formula": null,
      "conflict": null,
      "publishable": true
    },
    {
      "id": "F4",
      "field": "Frame material",
      "source_market_value": "铜材质框架",
      "target_copy": "Copper Frame",
      "unit": "",
      "source": "source thread 01a10778-9257-7583-8183-bc6303f24a7f",
      "basis": "explicit user wording 铜材质框架喷头",
      "evidence_grade": "A",
      "fact_status": "confirmed",
      "market_applicability": "market-neutral confirmed",
      "exact_export_configuration": "same exact photographed ZSTDY115-93°C Q5A; manufacturer facts only",
      "domestic_context": "1688 original archive; no regulatory or standard equivalence carried into artwork",
      "target_country_or_project": null,
      "target_standard_basis": "none claimed",
      "conversion_formula": null,
      "conflict": null,
      "publishable": true
    },
    {
      "id": "F5",
      "field": "Glass bulb diameter",
      "source_market_value": "5mm",
      "target_copy": "5 mm",
      "unit": "mm",
      "source": "source thread 01a10778-9257-7583-8183-bc6303f24a7f",
      "basis": "explicit user wording 5mm玻璃球",
      "evidence_grade": "A",
      "fact_status": "confirmed",
      "market_applicability": "market-neutral confirmed",
      "exact_export_configuration": "same exact photographed ZSTDY115-93°C Q5A; manufacturer facts only",
      "domestic_context": "1688 original archive; no regulatory or standard equivalence carried into artwork",
      "target_country_or_project": null,
      "target_standard_basis": "none claimed",
      "conversion_formula": null,
      "conflict": null,
      "publishable": true
    },
    {
      "id": "F6",
      "field": "Glass bulb color",
      "source_market_value": "绿色",
      "target_copy": "Green",
      "unit": "",
      "source": "source/02-本体白底原图.jpg;source/04-罩筒与本体原始实拍.jpg",
      "basis": "visible appearance",
      "evidence_grade": "A",
      "fact_status": "confirmed",
      "market_applicability": "market-neutral confirmed",
      "exact_export_configuration": "same exact photographed ZSTDY115-93°C Q5A; manufacturer facts only",
      "domestic_context": "1688 original archive; no regulatory or standard equivalence carried into artwork",
      "target_country_or_project": null,
      "target_standard_basis": "none claimed",
      "conversion_formula": null,
      "conflict": null,
      "publishable": true
    },
    {
      "id": "F7",
      "field": "Thread family",
      "source_market_value": "BSPT",
      "target_copy": "BSPT",
      "unit": "",
      "source": "C:/Users/zhengfafa/.codex/skills/alibaba-detail-image-studio/SKILL.md",
      "basis": "standing user confirmation; exact SKU has no contradictory evidence",
      "evidence_grade": "A",
      "fact_status": "confirmed",
      "market_applicability": "market-neutral confirmed",
      "exact_export_configuration": "same exact photographed ZSTDY115-93°C Q5A; manufacturer facts only",
      "domestic_context": "1688 original archive; no regulatory or standard equivalence carried into artwork",
      "target_country_or_project": null,
      "target_standard_basis": "none claimed",
      "conversion_formula": null,
      "conflict": null,
      "publishable": true
    },
    {
      "id": "F8",
      "field": "Connection form",
      "source_market_value": "外螺纹",
      "target_copy": "External thread",
      "unit": "",
      "source": "source/01-带盖白底原图.jpg;source/02-本体白底原图.jpg",
      "basis": "visible geometry; no nominal diameter or precise thread designation",
      "evidence_grade": "A",
      "fact_status": "confirmed",
      "market_applicability": "market-neutral confirmed",
      "exact_export_configuration": "same exact photographed ZSTDY115-93°C Q5A; manufacturer facts only",
      "domestic_context": "1688 original archive; no regulatory or standard equivalence carried into artwork",
      "target_country_or_project": null,
      "target_standard_basis": "none claimed",
      "conversion_formula": null,
      "conflict": null,
      "publishable": true
    },
    {
      "id": "F9",
      "field": "Cover color",
      "source_market_value": "白色",
      "target_copy": "White",
      "unit": "",
      "source": "source/01-带盖白底原图.jpg",
      "basis": "visible appearance; no cover-material inference",
      "evidence_grade": "A",
      "fact_status": "confirmed",
      "market_applicability": "market-neutral confirmed",
      "exact_export_configuration": "same exact photographed ZSTDY115-93°C Q5A; manufacturer facts only",
      "domestic_context": "1688 original archive; no regulatory or standard equivalence carried into artwork",
      "target_country_or_project": null,
      "target_standard_basis": "none claimed",
      "conversion_formula": null,
      "conflict": null,
      "publishable": true
    },
    {
      "target_standard_basis": "none claimed",
      "exact_export_configuration": "same exact photographed ZSTDY115-93°C Q5A; manufacturer facts only",
      "market_applicability": "market-neutral confirmed",
      "source": "copy/本款新增参数用户确认.json",
      "domestic_context": "SKU confirmed by user; no standard or interface equivalence inferred",
      "basis": "explicit current user confirmation of coefficient and metric units",
      "publishable": true,
      "evidence_grade": "A",
      "target_copy": "K8.0 (K115 Metric)",
      "id": "F10",
      "fact_status": "confirmed",
      "field": "Nominal K-factor",
      "source_market_value": 115,
      "target_country_or_project": null,
      "unit": "L/min/√bar",
      "conversion_formula": "K_US = 115 * sqrt(0.0689475729316836) / 3.785411784 = 7.97708467564023; rounded to 8.0 US gpm/√psi",
      "conflict": null
    },
    {
      "target_standard_basis": "none claimed",
      "exact_export_configuration": "same exact photographed ZSTDY115-93°C Q5A; manufacturer facts only",
      "market_applicability": "market-neutral confirmed",
      "source": "copy/本款新增参数用户确认.json",
      "domestic_context": "SKU confirmed by user; no standard or interface equivalence inferred",
      "basis": "explicit current user confirmation; punctuation normalized from 1。2mpa",
      "publishable": true,
      "evidence_grade": "A",
      "target_copy": "12 bar (1.2 MPa)",
      "id": "F11",
      "fact_status": "confirmed",
      "field": "Working pressure",
      "source_market_value": 1.2,
      "target_country_or_project": null,
      "unit": "MPa",
      "conversion_formula": "bar = MPa × 10 = 12; no pressure class or test equivalence",
      "conflict": null
    },
    {
      "target_standard_basis": "none claimed",
      "exact_export_configuration": "same exact photographed ZSTDY115-93°C Q5A; manufacturer facts only",
      "market_applicability": "market-neutral confirmed",
      "source": "copy/本款新增参数用户确认.json",
      "domestic_context": "SKU confirmed by user; no standard or interface equivalence inferred",
      "basis": "user supplied dn20, treated as nominal size only; exact BSPT thread dimensions still unconfirmed",
      "publishable": true,
      "evidence_grade": "A",
      "target_copy": "DN20",
      "id": "F12",
      "fact_status": "confirmed",
      "field": "Nominal size",
      "source_market_value": "DN20",
      "target_country_or_project": null,
      "unit": "DN nominal designation",
      "conversion_formula": null,
      "conflict": null
    }
  ],
  "latest_user_confirmation": {
    "date": "2026-10-05",
    "source": "human user confirmation in this product chat",
    "scope": "ZSTDY115-93°C Q5A only",
    "raw_message": "k系数是115，压力1。2mpa，螺纹是dn20，5mm玻璃球",
    "unit_question": "你确认的K=115，单位是否是公制 L/min/√bar？",
    "raw_unit_reply": "是，公制 L/min/√bar",
    "confirmed": {
      "k_metric": 115,
      "k_metric_unit": "L/min/√bar",
      "working_pressure_mpa": 1.2,
      "nominal_size": "DN20",
      "bulb_diameter_mm": 5
    },
    "interpretation_zh": "1。2mpa规范化为1.2 MPa；DN20只作为公称尺寸，不能单独确定螺纹尺寸或英寸接口。BSPT类型沿用已有长期用户确认。",
    "k_conversion": {
      "us_gallon_liters": 3.785411784,
      "psi_to_bar": 0.0689475729316836,
      "metric_per_us_factor": 14.416294257371694,
      "formula": "K_US = K_metric * sqrt(0.0689475729316836) / 3.785411784",
      "unrounded": 7.97708467564023,
      "rounding": "one decimal place, nominal display",
      "display": "K8.0 (K115 Metric)",
      "source_units": "L/min/√bar",
      "target_units": "US gpm/√psi",
      "implication": "unit arithmetic only; does not establish certification or foreign-test compliance"
    },
    "pressure_conversion": {
      "formula": "bar = MPa × 10",
      "source": 1.2,
      "source_unit": "MPa",
      "result": 12,
      "target_unit": "bar",
      "qualifier": "working pressure as user confirmed; no new ≤, maximum or test-pressure claim"
    },
    "official_terminology_reference": {
      "url": "https://www.tyco-fire.com/products-and-solutions/sprinklers-nozzles-and-accessories/special-application/series_tyl_stainless_sprinklers_fsp/series-ty-l-stainless-sprinklers",
      "checked_date": "2026-10-05",
      "scope": "official category nomenclature pairs nominal K8.0 with K115; exact SKU value comes only from user",
      "evidence_grade": "C",
      "other_product_properties_transferred": false
    },
    "evidence_grade": "A",
    "market_applicability": "market-neutral confirmed"
  }
}
```

参数与证据文档：

- [copy\中文待确认清单.txt](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTDY115-93C-Q5A-隐蔽式洒水喷头/copy/中文待确认清单.txt>)
- [copy\事实来源与用户确认.json](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTDY115-93C-Q5A-隐蔽式洒水喷头/copy/事实来源与用户确认.json>)
- [copy\本款新增参数用户确认.json](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTDY115-93C-Q5A-隐蔽式洒水喷头/copy/本款新增参数用户确认.json>)
- [copy\阿里国际站表单\表单事实数据.json](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTDY115-93C-Q5A-隐蔽式洒水喷头/copy/阿里国际站表单/表单事实数据.json>)

## 097 ZSTDY80-141C-Q3A-隐蔽式洒水喷头

系列分组：隐蔽式喷头；收录文件：22。

资料目录：[ZSTDY80-141C-Q3A-隐蔽式洒水喷头](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTDY80-141C-Q3A-隐蔽式洒水喷头>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "missing_data": [
    "working pressure",
    "connection standard and nominal size",
    "K-factor",
    "cover release temperature and material",
    "dimensions and installation requirements",
    "packaging",
    "exact-SKU overseas certification and destination applicability"
  ],
  "domestic_evidence": "GB5135.1-2019 only remains on original physical label; no added conformity or overseas equivalence claim.",
  "facts": [
    {
      "applicability": "market-neutral confirmed",
      "id": "product_name",
      "grade": "A",
      "source_value": "隐蔽式洒水喷头",
      "target_value": "Concealed Fire Sprinkler",
      "evidence": [
        "current user delegation",
        "source/原图01-带盖.jpg"
      ]
    },
    {
      "applicability": "market-neutral confirmed; factory identification",
      "id": "factory_model",
      "grade": "A",
      "source_value": "ZSTDY80-141℃ Q3A",
      "target_value": "Factory Model: ZSTDY80-141°C Q3A",
      "evidence": [
        "source/原图01-带盖.jpg",
        "source/原图02-裸喷头.jpg",
        "source/原图03-溅水盘.jpg"
      ]
    },
    {
      "applicability": "market-neutral confirmed",
      "id": "frame_material",
      "grade": "A",
      "exclusions": "no all-copper, pure copper, alloy or plating claim",
      "source_value": "铜（框架）",
      "target_value": "Copper Frame",
      "evidence": [
        "current user confirmation",
        "source/产品事实与待补资料.md",
        "source/1688-source-manifest.json"
      ]
    },
    {
      "source_unit": "mm",
      "applicability": "market-neutral confirmed",
      "evidence": [
        "current user confirmation",
        "source/产品事实与待补资料.md"
      ],
      "target_unit": "mm",
      "grade": "A",
      "target_value": "3 mm Glass Bulb",
      "source_value": "3mm",
      "id": "bulb_diameter"
    },
    {
      "target_unit": "°C",
      "evidence": [
        "current user confirmation",
        "source/原图01-带盖.jpg",
        "source/原图03-溅水盘.jpg"
      ],
      "conversion": "notation normalization only; numeric value unchanged",
      "id": "temperature",
      "applicability": "market-neutral confirmed",
      "grade": "A",
      "exclusions": "not cover release temperature or ambient suitability",
      "target_value": "141°C",
      "source_value": "141℃",
      "source_unit": "℃"
    },
    {
      "applicability": "market-neutral confirmed",
      "id": "cover_color",
      "grade": "A-visible",
      "source_value": "白色",
      "target_value": "White Cover Plate",
      "evidence": [
        "source/原图01-带盖.jpg"
      ]
    },
    {
      "grade": "A-visible",
      "id": "visible_structure",
      "source_value": "visible plate/frame/blue bulb/two pins",
      "evidence": [
        "source/原图01-带盖.jpg",
        "source/原图02-裸喷头.jpg",
        "source/原图03-溅水盘.jpg"
      ],
      "applicability": "market-neutral confirmed; no internal or performance inference"
    },
    {
      "applicability": "market-neutral confirmed appearance only; no thread designation or size claim",
      "id": "visible_thread",
      "grade": "A-visible",
      "source_value": "visible threaded base",
      "target_value": "Threaded Connection / Original Thread View",
      "evidence": [
        "source/原图02-裸喷头.jpg"
      ]
    }
  ]
}
```

参数与证据文档：

- [copy\事实来源与待确认.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTDY80-141C-Q3A-隐蔽式洒水喷头/copy/事实来源与待确认.md>)
- [source\1688表单参数输入.json](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTDY80-141C-Q3A-隐蔽式洒水喷头/source/1688表单参数输入.json>)
- [source\产品事实与待补资料.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTDY80-141C-Q3A-隐蔽式洒水喷头/source/产品事实与待补资料.md>)

## 098 ZSTDY80-141C-Q5A-隐蔽式洒水喷头

系列分组：隐蔽式喷头；收录文件：28。

资料目录：[ZSTDY80-141C-Q5A-隐蔽式洒水喷头](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTDY80-141C-Q5A-隐蔽式洒水喷头>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "factory_model_display": "ZSTDY 80-141°C Q5A",
  "scope": "8-image base set plus1 additional user-requested component callout image;9 total; no upload or publication",
  "evidence_crosswalk": [
    {
      "target_country_project": "Not specified",
      "standard_basis": "No foreign standard equivalence or approval",
      "conversion_formula": null,
      "exact_export_sku": "Exact photographed ZSTDY 80-141°C Q5A; no substitute configuration",
      "field": "Product identity",
      "source_value": "隐蔽式洒水喷头 ZSTDY 80-141℃ Q5A",
      "source_unit": null,
      "target_value": "Concealed Fire Sprinkler; Factory Model ZSTDY 80-141°C Q5A",
      "grade": "A-visible",
      "source": "source/原图02.jpg; source/原图01.jpg; source/原图03.jpg",
      "applicability": "market-neutral confirmed",
      "publishable": true,
      "conflict": false,
      "domestic_context": "Origin is a Chinese factory SKU; generic manufacturer fact only"
    },
    {
      "target_country_project": "Not specified",
      "standard_basis": "No foreign standard equivalence or approval",
      "conversion_formula": null,
      "exact_export_sku": "Exact photographed ZSTDY 80-141°C Q5A; no substitute configuration",
      "field": "Operating temperature",
      "source_value": 141,
      "source_unit": "℃",
      "target_value": "141°C",
      "grade": "A",
      "source": "Exact source/原图02.jpg model label and exact-SKU 1688表单输入.json",
      "applicability": "market-neutral confirmed",
      "publishable": true,
      "conflict": false,
      "domestic_context": "Origin is a Chinese factory SKU; generic manufacturer fact only"
    },
    {
      "target_country_project": "Not specified",
      "standard_basis": "No foreign standard equivalence or approval",
      "conversion_formula": null,
      "exact_export_sku": "Exact photographed ZSTDY 80-141°C Q5A; no substitute configuration",
      "field": "Frame material",
      "source_value": "铜材质框架",
      "source_unit": null,
      "target_value": "Copper Frame",
      "grade": "A",
      "source": "Original user request in thread 01a10507-3ed4-76f2-9b93-ae19d298b838; exact-SKU input",
      "applicability": "market-neutral confirmed",
      "publishable": true,
      "conflict": false,
      "domestic_context": "Origin is a Chinese factory SKU; generic manufacturer fact only"
    },
    {
      "target_country_project": "Not specified",
      "standard_basis": "No foreign standard equivalence or approval",
      "conversion_formula": null,
      "exact_export_sku": "Exact photographed ZSTDY 80-141°C Q5A; no substitute configuration",
      "field": "Thread family",
      "source_value": "BSPT",
      "source_unit": null,
      "target_value": "BSPT",
      "grade": "A-standing user confirmation",
      "source": "alibaba-detail-image-studio/SKILL.md standing default; no conflicting exact-SKU evidence",
      "applicability": "market-neutral confirmed",
      "publishable": true,
      "conflict": false,
      "domestic_context": "Origin is a Chinese factory SKU; generic manufacturer fact only"
    },
    {
      "target_country_project": "Not specified",
      "standard_basis": "No foreign standard equivalence or approval",
      "conversion_formula": null,
      "exact_export_sku": "Exact photographed ZSTDY 80-141°C Q5A; no substitute configuration",
      "field": "Bulb diameter",
      "source_value": 5,
      "source_unit": "mm",
      "target_value": "5 mm glass bulb",
      "grade": "A-archived user confirmation",
      "source": "Exact-SKU 1688表单输入.json: 用户2026-10-04原话：标记5mm玻璃球; source thread historical edit corroborates",
      "applicability": "market-neutral confirmed",
      "publishable": true,
      "conflict": false,
      "domestic_context": "Origin is a Chinese factory SKU; generic manufacturer fact only"
    },
    {
      "target_country_project": "Not specified",
      "standard_basis": "No foreign standard equivalence or approval",
      "conversion_formula": null,
      "exact_export_sku": "Exact photographed ZSTDY 80-141°C Q5A; no substitute configuration",
      "field": "Bulb color",
      "source_value": "蓝色",
      "source_unit": null,
      "target_value": "Blue",
      "grade": "A-visible",
      "source": "source/原图01.jpg; source/原图04.jpg",
      "applicability": "market-neutral confirmed",
      "publishable": true,
      "conflict": false,
      "domestic_context": "Origin is a Chinese factory SKU; generic manufacturer fact only"
    },
    {
      "target_country_project": "Not specified",
      "standard_basis": "No foreign standard equivalence or approval",
      "conversion_formula": null,
      "exact_export_sku": "Exact photographed ZSTDY 80-141°C Q5A; no substitute configuration",
      "field": "Cover color",
      "source_value": "白色",
      "source_unit": null,
      "target_value": "White",
      "grade": "A-visible",
      "source": "source/原图02.jpg",
      "applicability": "market-neutral confirmed",
      "publishable": true,
      "conflict": false,
      "domestic_context": "Origin is a Chinese factory SKU; generic manufacturer fact only"
    },
    {
      "target_country_project": "Not specified",
      "standard_basis": "No foreign standard equivalence or approval",
      "conversion_formula": null,
      "exact_export_sku": "Exact photographed ZSTDY 80-141°C Q5A; no substitute configuration",
      "field": "Domestic standard label",
      "source_value": "GB5135.1-2019",
      "source_unit": null,
      "target_value": null,
      "grade": "A-visible label only",
      "source": "source/原图02.jpg",
      "applicability": "domestic-only",
      "publishable": false,
      "notes": "Retained unchanged on original photo, omitted from marketing claims and specifications; no conformity conclusion.",
      "conflict": false,
      "domestic_context": "Origin is a Chinese factory SKU; generic manufacturer fact only"
    },
    {
      "field": "Response type",
      "source_value": "标准响应",
      "source_unit": null,
      "target_value": "Standard Response",
      "grade": "A-explicit current user confirmation",
      "source": "copy/最新用户参数确认.json",
      "applicability": "market-neutral confirmed",
      "publishable": true,
      "conflict": false,
      "target_country_project": "Not specified",
      "standard_basis": "No foreign standard equivalence or approval",
      "conversion_formula": null,
      "exact_export_sku": "Exact photographed ZSTDY 80-141°C Q5A",
      "domestic_context": "Manufacturer-confirmed exact-SKU fact",
      "notes": "No conversion to inch connection, US K, pressure class or approval"
    },
    {
      "field": "Nominal size",
      "source_value": "DN15",
      "source_unit": null,
      "target_value": "DN15",
      "grade": "A-explicit current user confirmation",
      "source": "copy/最新用户参数确认.json",
      "applicability": "market-neutral confirmed",
      "publishable": true,
      "conflict": false,
      "target_country_project": "Not specified",
      "standard_basis": "No foreign standard equivalence or approval",
      "conversion_formula": null,
      "exact_export_sku": "Exact photographed ZSTDY 80-141°C Q5A",
      "domestic_context": "Manufacturer-confirmed exact-SKU fact",
      "notes": "No conversion to inch connection, US K, pressure class or approval"
    },
    {
      "field": "Working pressure",
      "source_value": 1.2,
      "source_unit": "MPa",
      "target_value": "1.2 MPa",
      "grade": "A-explicit current user confirmation",
      "source": "copy/最新用户参数确认.json",
      "applicability": "market-neutral confirmed",
      "publishable": true,
      "conflict": false,
      "target_country_project": "Not specified",
      "standard_basis": "No foreign standard equivalence or approval",
      "conversion_formula": null,
      "exact_export_sku": "Exact photographed ZSTDY 80-141°C Q5A",
      "domestic_context": "Manufacturer-confirmed exact-SKU fact",
      "notes": "No conversion to inch connection, US K, pressure class or approval"
    },
    {
      "field": "Flow coefficient K",
      "source_value": 80,
      "source_unit": "L/min/√bar",
      "target_value": "80 L/min/√bar",
      "grade": "A-explicit current user confirmation",
      "source": "copy/最新用户参数确认.json",
      "applicability": "market-neutral confirmed",
      "publishable": true,
      "conflict": false,
      "target_country_project": "Not specified",
      "standard_basis": "No foreign standard equivalence or approval",
      "conversion_formula": null,
      "exact_export_sku": "Exact photographed ZSTDY 80-141°C Q5A",
      "domestic_context": "Manufacturer-confirmed exact-SKU fact",
      "notes": "No conversion to inch connection, US K, pressure class or approval"
    }
  ],
  "latest_confirmation": {
    "date": "2026-10-05",
    "source_thread_id": "01a10ba9-cf59-7e02-859f-775d37446a26",
    "sku": "ZSTDY 80-141°C Q5A",
    "user_statement": "标准响应，dn15，1.2mpa，k=80",
    "unit_question": "这款K=80的单位是否为公制 L/min/√bar？",
    "unit_answer": "是，公制 L/min/√bar",
    "confirmed": {
      "response_type": "Standard Response",
      "nominal_size": "DN15",
      "working_pressure_MPa": 1.2,
      "K": 80,
      "K_unit": "L/min/√bar"
    },
    "publication_scope": "Market-neutral manufacturer facts; no foreign approval",
    "interpretation": "1.2MPa按本次工作压力待确认字段理解；未添加最大值、不等号、试验压力。DN15不推导英寸接口。K不转英制。"
  }
}
```

参数与证据文档：

- [copy\事实来源与出口核验.json](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTDY80-141C-Q5A-隐蔽式洒水喷头/copy/事实来源与出口核验.json>)
- [copy\最新用户参数确认.json](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTDY80-141C-Q5A-隐蔽式洒水喷头/copy/最新用户参数确认.json>)
- [source\事实来源与待确认项.txt](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTDY80-141C-Q5A-隐蔽式洒水喷头/source/事实来源与待确认项.txt>)

## 099 ZSTDY80-57C-Q5A-隐蔽式洒水喷头

系列分组：隐蔽式喷头；收录文件：29。

资料目录：[ZSTDY80-57C-Q5A-隐蔽式洒水喷头](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTDY80-57C-Q5A-隐蔽式洒水喷头>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "factory_model": "ZSTDY 80-57°C Q5A",
  "facts": [
    {
      "field": "model",
      "source_market_value": "ZSTDY 80-57℃ Q5A",
      "target_value": "ZSTDY 80-57°C Q5A",
      "evidence_grade": "A",
      "evidence": "physical labels source/03 and04",
      "market_applicability": "market-neutral confirmed",
      "conversion_formula": null,
      "standard_basis": "manufacturer fact / real photograph; no foreign compliance implied"
    },
    {
      "field": "nominal_operating_temperature",
      "source_market_value": "57℃",
      "target_value": "57°C",
      "evidence_grade": "A",
      "evidence": "exact photographed SKU model marking",
      "market_applicability": "market-neutral confirmed",
      "conversion_formula": null,
      "standard_basis": "manufacturer fact / real photograph; no foreign compliance implied"
    },
    {
      "field": "nominal_size",
      "source_market_value": "DN15",
      "target_value": "DN15",
      "evidence_grade": "A",
      "evidence": "user message01a10554-f3ad-7802-8b01-864f2ac5391e",
      "market_applicability": "market-neutral confirmed",
      "conversion_formula": null,
      "standard_basis": "manufacturer fact / real photograph; no foreign compliance implied"
    },
    {
      "field": "frame_material",
      "source_market_value": "铜材质框架",
      "target_value": "Copper",
      "evidence_grade": "A",
      "evidence": "user message01a10551-b550-7b22-a528-bf28bd6f797a",
      "market_applicability": "market-neutral confirmed",
      "conversion_formula": null,
      "standard_basis": "manufacturer fact / real photograph; no foreign compliance implied"
    },
    {
      "field": "glass_bulb_diameter",
      "source_market_value": "5mm",
      "target_value": "5 mm",
      "evidence_grade": "A",
      "evidence": "same user message",
      "market_applicability": "market-neutral confirmed",
      "conversion_formula": null,
      "standard_basis": "manufacturer fact / real photograph; no foreign compliance implied"
    },
    {
      "field": "thread_family",
      "source_market_value": "BSPT",
      "target_value": "BSPT",
      "evidence_grade": "A",
      "evidence": "standing user-confirmed sprinkler default in alibaba-detail-image-studio skill; no exact-SKU conflict",
      "market_applicability": "market-neutral confirmed",
      "conversion_formula": null,
      "standard_basis": "manufacturer fact / real photograph; no foreign compliance implied"
    },
    {
      "field": "working_pressure",
      "source_market_value": "1.2MPa",
      "target_value": "1.2 MPa",
      "evidence_grade": "A",
      "evidence": "user message01a10580-a9be-75a0-9047-4740b99edfa2",
      "market_applicability": "market-neutral confirmed",
      "conversion_formula": null,
      "standard_basis": "manufacturer fact / real photograph; no foreign compliance implied"
    },
    {
      "field": "cover_color",
      "source_market_value": "白色",
      "target_value": "White",
      "evidence_grade": "A",
      "evidence": "exact source/01 photo",
      "market_applicability": "market-neutral confirmed",
      "conversion_formula": null,
      "standard_basis": "manufacturer fact / real photograph; no foreign compliance implied"
    },
    {
      "field": "surface_finish",
      "evidence": "source/补充确认-产品组成与电镀.json",
      "target_value": "Electroplated Surface",
      "standard_basis": "User exact-SKU confirmation; coating metal, thickness and corrosion resistance not claimed",
      "market_applicability": "market-neutral confirmed",
      "evidence_grade": "A",
      "source_market_value": "电镀处理",
      "conversion_formula": null
    }
  ]
}
```

参数与证据文档：

- [copy\事实台账与出口适用性.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTDY80-57C-Q5A-隐蔽式洒水喷头/copy/事实台账与出口适用性.md>)
- [copy\待确认清单.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTDY80-57C-Q5A-隐蔽式洒水喷头/copy/待确认清单.md>)
- [source\1688事实说明.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTDY80-57C-Q5A-隐蔽式洒水喷头/source/1688事实说明.md>)
- [source\1688参数记录.json](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTDY80-57C-Q5A-隐蔽式洒水喷头/source/1688参数记录.json>)
- [source\用户确认摘录.json](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTDY80-57C-Q5A-隐蔽式洒水喷头/source/用户确认摘录.json>)
- [source\补充确认-产品组成与电镀.json](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTDY80-57C-Q5A-隐蔽式洒水喷头/source/补充确认-产品组成与电镀.json>)

## 100 ZSTDY80-68℃-Q5A-隐蔽式消防洒水喷头

系列分组：隐蔽式喷头；收录文件：22。

资料目录：[ZSTDY80-68℃-Q5A-隐蔽式消防洒水喷头](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTDY80-68℃-Q5A-隐蔽式消防洒水喷头>)

缺少根目录 manifest.json；已继续收录现存图片和文案，不判定资料包为空。

参数与证据文档：

- [evidence-summary.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTDY80-68℃-Q5A-隐蔽式消防洒水喷头/evidence-summary.md>)

## 101 ZSTDY80-79C-Q5A-隐蔽式洒水喷头

系列分组：隐蔽式喷头；收录文件：38。

资料目录：[ZSTDY80-79C-Q5A-隐蔽式洒水喷头](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTDY80-79C-Q5A-隐蔽式洒水喷头>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "user_confirmation": "通用英文版，暂不宣称认证",
  "parameter_crosswalk": [
    {
      "field": "Product type",
      "original": "隐蔽式洒水喷头",
      "published": "Concealed fire sprinkler",
      "evidence": [
        "source/原图01.jpg",
        "source/原图02.jpg"
      ],
      "grade": "A",
      "applicability": "market-neutral confirmed"
    },
    {
      "field": "Model",
      "original": "ZSTDY 80-79℃ Q5A",
      "published": "ZSTDY 80-79°C Q5A",
      "evidence": [
        "source/原图01.jpg",
        "source/原图04.jpg"
      ],
      "grade": "A",
      "applicability": "market-neutral confirmed",
      "conversion": "Typography ℃ -> °C only; numeric value unchanged"
    },
    {
      "field": "Nominal operating temperature",
      "original": "79℃",
      "published": "79°C",
      "unit": "°C",
      "evidence": [
        "source/原图01.jpg",
        "source/原图04.jpg"
      ],
      "grade": "A",
      "applicability": "market-neutral confirmed",
      "conversion": "No numerical conversion",
      "scope": "Sprinkler only; not cover release temperature"
    },
    {
      "field": "Sprinkler body material",
      "original": "铜",
      "published": "Copper / Copper Body",
      "evidence": [
        "standing user-confirmed manufacturer defaults in alibaba-detail-image-studio/SKILL.md"
      ],
      "grade": "A standing user confirmation",
      "applicability": "market-neutral confirmed",
      "scope": "Sprinkler body only, no brass/alloy/finish/all-component claim"
    },
    {
      "field": "Thread family",
      "original": "BSPT",
      "published": "BSPT",
      "evidence": [
        "standing user-confirmed manufacturer defaults in alibaba-detail-image-studio/SKILL.md"
      ],
      "grade": "A standing user confirmation",
      "applicability": "market-neutral confirmed",
      "scope": "Family only; no NPT equivalence, ISO compliance, R designation or nominal size"
    },
    {
      "field": "External thread",
      "original": "实物外螺纹",
      "published": "External threaded connection",
      "evidence": [
        "source/原图02.jpg"
      ],
      "grade": "A visible fact",
      "applicability": "market-neutral confirmed"
    },
    {
      "field": "Cover color",
      "original": "白色",
      "published": "White",
      "evidence": [
        "source/原图01.jpg"
      ],
      "grade": "A visible fact",
      "applicability": "market-neutral confirmed"
    },
    {
      "field": "Nominal connection size",
      "original": "4分",
      "published": null,
      "applicability": "unmapped",
      "reason": "No exact export interface drawing. Not translated to 1/2 inch NPT or R1/2."
    },
    {
      "field": "Execution standard",
      "original": "GB 5135.1-2019 on physical label",
      "published": null,
      "applicability": "domestic-only",
      "reason": "Original photographed label preserved but not used as international compliance claim"
    },
    {
      "field": "Response class, K-factor, pressure, cover release temperature, dimensions, approvals",
      "original": "Unconfirmed for exact SKU",
      "published": null,
      "applicability": "unmapped",
      "reason": "Omitted. No transfer of 68°C Q5 report values or other SKU data."
    },
    {
      "field": "Glass bulb diameter",
      "original": "5mm玻璃球",
      "published": "5 mm Glass Bulb",
      "value": 5,
      "unit": "mm",
      "evidence": [
        "Explicit user confirmation: 图片标注5mm玻璃球, 2026-09-28"
      ],
      "grade": "A user-confirmed",
      "applicability": "market-neutral confirmed",
      "scope": "Glass bulb diameter only; no response class, RTI, or certification inferred"
    }
  ],
  "blocked_modules": [
    {
      "name": "尺寸连接图及安装指导图",
      "reason": "缺本型号尺寸图、连接规格和安装说明"
    },
    {
      "name": "认证文件图",
      "reason": "未提供覆盖本型号的有效境外认证资料，用户已选不宣称认证"
    },
    {
      "name": "包装装箱图",
      "reason": "未提供本型号包装实拍和装箱数据"
    }
  ]
}
```

参数与证据文档：

- [copy\上传顺序与参数说明.txt](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTDY80-79C-Q5A-隐蔽式洒水喷头/copy/上传顺序与参数说明.txt>)
- [copy\参数依据与国际表达核验.json](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTDY80-79C-Q5A-隐蔽式洒水喷头/copy/参数依据与国际表达核验.json>)
- [copy\国际站首款试做-事实核验.json](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTDY80-79C-Q5A-隐蔽式洒水喷头/copy/国际站首款试做-事实核验.json>)
- [copy\国际站首款试做-压力与DN15确认.json](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTDY80-79C-Q5A-隐蔽式洒水喷头/copy/国际站首款试做-压力与DN15确认.json>)

## 102 ZSTDY80-93C-Q3A-隐蔽式洒水喷头

系列分组：隐蔽式喷头；收录文件：32。

资料目录：[ZSTDY80-93C-Q3A-隐蔽式洒水喷头](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTDY80-93C-Q3A-隐蔽式洒水喷头>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "factory_model": "ZSTDY 80-93°C Q3A",
  "facts": [
    {
      "field": "product_name",
      "target_value": "Concealed Fire Sprinkler",
      "source_value": "隐蔽式洒水喷头",
      "evidence_grade": "A",
      "source": "原图01-带盖.jpg；用户任务",
      "publishable": true,
      "market_applicability": "market-neutral confirmed",
      "conversion_formula": null,
      "target_standard_basis": "No international compliance mapping; manufacturer fact or visible physical evidence only",
      "source_market_unit": null,
      "target_market_unit": null,
      "target_country_project": null,
      "export_sku_evidence": "same exact product photographs and user instruction for this SKU; no different foreign configuration is alleged",
      "conflict": null
    },
    {
      "field": "factory_model",
      "target_value": "ZSTDY 80-93°C Q3A",
      "source_value": "ZSTDY 80-93℃ Q3A",
      "evidence_grade": "A",
      "source": "source/原图01-带盖.jpg、原图02-裸喷头.jpg、原图03-溅水盘.jpg、原图04-结构.jpg",
      "publishable": true,
      "market_applicability": "market-neutral confirmed",
      "conversion_formula": null,
      "target_standard_basis": "No international compliance mapping; manufacturer fact or visible physical evidence only",
      "source_market_unit": null,
      "target_market_unit": null,
      "target_country_project": null,
      "export_sku_evidence": "same exact product photographs and user instruction for this SKU; no different foreign configuration is alleged",
      "conflict": null
    },
    {
      "field": "sprinkler_temperature",
      "target_value": "93°C",
      "source_value": "93℃",
      "evidence_grade": "A",
      "source": "原图01标签及原图02/03刻字；只指喷头温级",
      "publishable": true,
      "market_applicability": "market-neutral confirmed",
      "conversion_formula": null,
      "target_standard_basis": "No international compliance mapping; manufacturer fact or visible physical evidence only",
      "source_market_unit": "°C",
      "target_market_unit": "°C",
      "target_country_project": null,
      "export_sku_evidence": "same exact product photographs and user instruction for this SKU; no different foreign configuration is alleged",
      "conflict": null
    },
    {
      "field": "frame_material",
      "target_value": "Copper",
      "source_value": "铜材质框架",
      "evidence_grade": "A",
      "source": "copy/最新用户确认摘录.json；exact-SKU user confirmation overrides general Copper Body default",
      "publishable": true,
      "market_applicability": "market-neutral confirmed",
      "conversion_formula": null,
      "target_standard_basis": "No international compliance mapping; manufacturer fact or visible physical evidence only",
      "source_market_unit": null,
      "target_market_unit": null,
      "target_country_project": null,
      "export_sku_evidence": "same exact product photographs and user instruction for this SKU; no different foreign configuration is alleged",
      "conflict": null
    },
    {
      "field": "glass_bulb_diameter",
      "target_value": "3 mm",
      "source_value": "3mm玻璃球",
      "evidence_grade": "A",
      "source": "copy/最新用户确认摘录.json",
      "publishable": true,
      "market_applicability": "market-neutral confirmed",
      "conversion_formula": null,
      "target_standard_basis": "No international compliance mapping; manufacturer fact or visible physical evidence only",
      "source_market_unit": "mm",
      "target_market_unit": "mm",
      "target_country_project": null,
      "export_sku_evidence": "same exact product photographs and user instruction for this SKU; no different foreign configuration is alleged",
      "conflict": null
    },
    {
      "field": "nominal_size",
      "target_value": "DN15",
      "source_value": "dn15口径",
      "evidence_grade": "A",
      "source": "copy/最新用户确认摘录.json",
      "publishable": true,
      "market_applicability": "market-neutral confirmed",
      "conversion_formula": null,
      "target_standard_basis": "No international compliance mapping; manufacturer fact or visible physical evidence only",
      "source_market_unit": null,
      "target_market_unit": null,
      "target_country_project": null,
      "export_sku_evidence": "same exact product photographs and user instruction for this SKU; no different foreign configuration is alleged",
      "conflict": null
    },
    {
      "field": "thread_family",
      "target_value": "BSPT",
      "source_value": "BSPT",
      "evidence_grade": "A",
      "source": "alibaba-detail-image-studio/SKILL.md standing user confirmation",
      "publishable": true,
      "market_applicability": "market-neutral confirmed",
      "conversion_formula": null,
      "target_standard_basis": "No international compliance mapping; manufacturer fact or visible physical evidence only",
      "source_market_unit": null,
      "target_market_unit": null,
      "target_country_project": null,
      "export_sku_evidence": "same exact product photographs and user instruction for this SKU; no different foreign configuration is alleged",
      "conflict": null
    },
    {
      "field": "connection_form",
      "target_value": "External threaded connection",
      "source_value": "外螺纹",
      "evidence_grade": "A",
      "source": "source/原图01-带盖.jpg及原图02-裸喷头.jpg",
      "publishable": true,
      "market_applicability": "market-neutral confirmed",
      "conversion_formula": null,
      "target_standard_basis": "No international compliance mapping; manufacturer fact or visible physical evidence only",
      "source_market_unit": null,
      "target_market_unit": null,
      "target_country_project": null,
      "export_sku_evidence": "same exact product photographs and user instruction for this SKU; no different foreign configuration is alleged",
      "conflict": null
    },
    {
      "field": "cover_color",
      "target_value": "White",
      "source_value": "白色",
      "evidence_grade": "A",
      "source": "source/原图01-带盖.jpg visible color",
      "publishable": true,
      "market_applicability": "market-neutral confirmed",
      "conversion_formula": null,
      "target_standard_basis": "No international compliance mapping; manufacturer fact or visible physical evidence only",
      "source_market_unit": null,
      "target_market_unit": null,
      "target_country_project": null,
      "export_sku_evidence": "same exact product photographs and user instruction for this SKU; no different foreign configuration is alleged",
      "conflict": null
    },
    {
      "field": "bulb_color",
      "target_value": "Green",
      "source_value": "绿色",
      "evidence_grade": "A",
      "source": "source/原图02-裸喷头.jpg及原图04-结构.jpg",
      "publishable": true,
      "market_applicability": "market-neutral confirmed",
      "conversion_formula": null,
      "target_standard_basis": "No international compliance mapping; manufacturer fact or visible physical evidence only",
      "source_market_unit": null,
      "target_market_unit": null,
      "target_country_project": null,
      "export_sku_evidence": "same exact product photographs and user instruction for this SKU; no different foreign configuration is alleged",
      "conflict": null
    },
    {
      "field": "label_standard",
      "target_value": null,
      "source_value": "GB5135.1-2019",
      "evidence_grade": "A-visible-marking",
      "source": "source/原图01-带盖.jpg及原图04-结构.jpg；仅原实物标签保留，无符合标准声明",
      "publishable": false,
      "market_applicability": "domestic-only",
      "conversion_formula": null,
      "target_standard_basis": "No international compliance mapping; manufacturer fact or visible physical evidence only",
      "source_market_unit": null,
      "target_market_unit": null,
      "target_country_project": null,
      "export_sku_evidence": "same exact product photographs and user instruction for this SKU; no different foreign configuration is alleged",
      "conflict": null
    },
    {
      "field": "factory_k_factor",
      "target_value": "80",
      "source_value": "k系数是80",
      "evidence_grade": "A",
      "source": "用户2026-10-05本对话确认：压力1.2mpa、dn15、3mm玻璃球；随后明确更正：k系数是80。K115已被后续确认替代。",
      "publishable": true,
      "market_applicability": "market-neutral confirmed",
      "source_market_unit": null,
      "target_market_unit": null,
      "conversion_formula": null,
      "target_standard_basis": "Factory-provided numeric value only; K-factor unit system not separately confirmed; no US/metric conversion or equivalence",
      "target_country_project": null,
      "export_sku_evidence": "latest exact-SKU user correction",
      "conflict": null
    },
    {
      "field": "pressure",
      "target_value": "1.2 MPa (12 bar)",
      "source_value": "压力1.2mpa",
      "evidence_grade": "A",
      "source": "用户2026-10-05本对话确认：压力1.2mpa、dn15、3mm玻璃球；随后明确更正：k系数是80。K115已被后续确认替代。",
      "publishable": true,
      "market_applicability": "market-neutral confirmed",
      "source_market_unit": "MPa",
      "target_market_unit": "MPa / bar",
      "conversion_formula": "1 MPa = 10 bar; 1.2 * 10 = 12 bar",
      "target_standard_basis": "User-confirmed manufacturer pressure value only; no maximum/working/test classification or foreign pressure class inferred",
      "target_country_project": null,
      "export_sku_evidence": "latest exact-SKU user confirmation",
      "conflict": null
    }
  ],
  "missing_fields": [
    {
      "field": "响应等级与RTI",
      "status": "pending",
      "required": "3 mm和Q3A不足以单独声明Quick Response；需正式技术/测试证据",
      "action": "omit from buyer images"
    },
    {
      "field": "盖板脱落温度",
      "status": "pending",
      "required": "需本款盖板技术资料；不能填93°C或照搬邻近型号",
      "action": "omit from buyer images"
    },
    {
      "field": "精确接口尺寸/代号",
      "status": "pending",
      "required": "BSPT仅确认螺纹家族，DN15仅公称口径；需具体接口图纸，不转1/2英寸或NPT",
      "action": "omit from buyer images"
    },
    {
      "field": "尺寸及安装",
      "status": "pending",
      "required": "需盖板/壳体直径、总高、开孔、安装深度、调整范围与说明",
      "action": "omit from buyer images"
    },
    {
      "field": "本款认证/项目适用性",
      "status": "pending",
      "required": "需目标国家和项目、匹配本SKU的有效证书及批准范围；UL/FM/CE/EN等未纳入",
      "action": "omit from buyer images"
    },
    {
      "field": "包装与包含件",
      "status": "pending",
      "required": "需本款包装实拍、销售包含件、装箱数量、重量和尺寸",
      "action": "omit from buyer images"
    },
    {
      "field": "表面处理及盖板/壳体材质",
      "status": "pending",
      "required": "银色与金色外观不能证明镀铬或具体合金；铜仅用于框架",
      "action": "omit from buyer images"
    },
    {
      "field": "K系数单位体系",
      "status": "pending",
      "required": "K数字80已确认；公制/美制单位尚未单独明确，当前只写Factory K-factor 80，不换算K5.6",
      "action": "no K-factor unit conversion until confirmed"
    },
    {
      "field": "压力性质",
      "status": "pending",
      "required": "用户确认1.2 MPa数值；未单独说明最大工作压力/额定工作压力/试验压力，图片只写Pressure，不添加最大、≤或试验承诺",
      "action": "publish confirmed pressure number without added pressure classification"
    }
  ]
}
```

参数与证据文档：

- [copy\1688来源事实摘录.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTDY80-93C-Q3A-隐蔽式洒水喷头/copy/1688来源事实摘录.md>)
- [copy\事实与出口参数映射.json](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTDY80-93C-Q3A-隐蔽式洒水喷头/copy/事实与出口参数映射.json>)
- [copy\最新用户确认摘录.json](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTDY80-93C-Q3A-隐蔽式洒水喷头/copy/最新用户确认摘录.json>)

## 103 ZSTDY80-93℃-Q5A-隐蔽式消防洒水喷头

系列分组：隐蔽式喷头；收录文件：20。

资料目录：[ZSTDY80-93℃-Q5A-隐蔽式消防洒水喷头](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTDY80-93℃-Q5A-隐蔽式消防洒水喷头>)

缺少根目录 manifest.json；已继续收录现存图片和文案，不判定资料包为空。

参数与证据文档：

- [evidence-summary.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTDY80-93℃-Q5A-隐蔽式消防洒水喷头/evidence-summary.md>)

## 104 ZSTDY80系列-隐蔽式消防洒水喷头

系列分组：隐蔽式喷头；收录文件：23。

资料目录：[ZSTDY80系列-隐蔽式消防洒水喷头](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTDY80系列-隐蔽式消防洒水喷头>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "blocked_assets": [
    {
      "asset_type": "exact_connection_thread",
      "reason": "No exact export-SKU thread designation or standard"
    },
    {
      "asset_type": "working_pressure",
      "reason": "No exact export-SKU pressure record"
    },
    {
      "asset_type": "technical_installation_drawing",
      "reason": "No verified opening, depth, clearance, branch connection or instruction sheet"
    },
    {
      "asset_type": "international_certification",
      "reason": "No exact-model certificate/listing supplied"
    },
    {
      "asset_type": "packaging_delivery",
      "reason": "No real packaging evidence or parameters"
    },
    {
      "asset_type": "q3a_product_view",
      "reason": "No real Q3A product photograph"
    }
  ]
}
```

参数与证据文档：

- [copy\standards-and-parameter-ledger.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTDY80系列-隐蔽式消防洒水喷头/copy/standards-and-parameter-ledger.md>)

## 105 ZSTM-B-SS304-304不锈钢单口水幕喷头

系列分组：水雾及水幕喷头；收录文件：19。

资料目录：[ZSTM-B-SS304-304不锈钢单口水幕喷头](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTM-B-SS304-304不锈钢单口水幕喷头>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "confirmed_facts": {
    "body_material": "304 stainless steel",
    "structure": "open, single-outlet, single-slot",
    "connection": "BSPT male thread",
    "spray_angle": "120°",
    "working_pressure": {
      "source": "0.10–0.60 MPa",
      "converted": "1.0–6.0 bar",
      "formula": "1 MPa = 10 bar"
    },
    "variants": [
      {
        "size": "DN15",
        "thread": "R 1/2 BSPT",
        "k_factor": "K28"
      },
      {
        "size": "DN20",
        "thread": "R 3/4 BSPT",
        "k_factor": "K80"
      },
      {
        "size": "DN25",
        "thread": "R 1 BSPT",
        "k_factor": "K115"
      }
    ]
  },
  "blocked_claims": [
    "ISO/EN/UL/FM/LPCB/CE compliance or approval",
    "dimensions",
    "weight",
    "packaging",
    "test performance",
    "installation torque"
  ],
  "evidence_files": [
    "copy/export-parameter-crosswalk.md",
    "copy/image-copy-en.md"
  ]
}
```

参数与证据文档：

- [copy\export-parameter-crosswalk.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTM-B-SS304-304不锈钢单口水幕喷头/copy/export-parameter-crosswalk.md>)

## 106 ZSTMB系列-不锈钢水幕喷头

系列分组：水雾及水幕喷头；收录文件：20。

资料目录：[ZSTMB系列-不锈钢水幕喷头](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTMB系列-不锈钢水幕喷头>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "verified_market_neutral_facts": {
    "model": "ZSTMB",
    "body_material": "Stainless steel (grade not supplied)",
    "connection": "BSPT male thread family (exact R designation not supplied)",
    "nominal_sizes": [
      "DN15",
      "DN20",
      "DN25"
    ],
    "manufacturer_k_designations": [
      "K18",
      "K30",
      "K50"
    ],
    "working_pressure": [
      "0.35 MPa",
      "0.35 MPa",
      "0.8 MPa"
    ],
    "pressure_conversion": [
      "0.35 MPa = 3.5 bar",
      "0.8 MPa = 8.0 bar"
    ],
    "spray_angle": "120°",
    "medium": "Water",
    "physical_marking": "冠亚 / GUANYA preserved"
  },
  "blocked_assets": [
    {
      "asset": "Dimension and connection drawing",
      "reason": "No exact-model drawing or unchanged measurement photo"
    },
    {
      "asset": "Certification/document image",
      "reason": "No exact-SKU certificate or report"
    },
    {
      "asset": "Real installation image",
      "reason": "Orientation, exact thread designation, spacing and project details not evidenced"
    },
    {
      "asset": "Packaging image",
      "reason": "No authentic packaging photo or carton data"
    }
  ]
}
```

## 107 ZSTM系列-双缝水幕喷头

系列分组：水雾及水幕喷头；收录文件：22。

资料目录：[ZSTM系列-双缝水幕喷头](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTM系列-双缝水幕喷头>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "confirmed_facts": [
    "304 Stainless Steel",
    "Open, Double-Slot",
    "BSPT Male Thread",
    "R 1/2",
    "R 3/4",
    "R 1"
  ],
  "blocked_claims": [
    "working pressure",
    "K-factor",
    "spray angle",
    "exact dimensions",
    "weight",
    "installation orientation or spacing",
    "ISO product compliance",
    "UL/FM/LPCB listing",
    "CE marking"
  ]
}
```

参数与证据文档：

- [copy\ZSTM系列-国际参数发布说明-en.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTM系列-双缝水幕喷头/copy/ZSTM系列-国际参数发布说明-en.md>)

## 108 ZSTWB-BSPT-不锈钢高速水雾喷头

系列分组：水雾及水幕喷头；收录文件：29。

资料目录：[ZSTWB-BSPT-不锈钢高速水雾喷头](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTWB-BSPT-不锈钢高速水雾喷头>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "blocked_assets": [
    {
      "asset_type": "尺寸连接图",
      "reason": "No exact-model drawing or real measurements."
    },
    {
      "asset_type": "安装说明图",
      "reason": "Orientation, mating pipe, clearance and application environment not confirmed."
    },
    {
      "asset_type": "认证文件图",
      "reason": "No valid exact-SKU export certificate or listing."
    },
    {
      "asset_type": "包装装箱图",
      "reason": "No real authorized packaging data or photos."
    }
  ]
}
```

参数与证据文档：

- [copy\international-parameter-crosswalk.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTWB-BSPT-不锈钢高速水雾喷头/copy/international-parameter-crosswalk.md>)
- [copy\missing-evidence-and-release-gate.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTWB-BSPT-不锈钢高速水雾喷头/copy/missing-evidence-and-release-gate.md>)
- [上架表单\ZSTWB-阿里国际站-校验报告.json](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTWB-BSPT-不锈钢高速水雾喷头/上架表单/ZSTWB-阿里国际站-校验报告.json>)

## 109 ZSTWB系列-不锈钢水雾喷头

系列分组：水雾及水幕喷头；收录文件：23。

资料目录：[ZSTWB系列-不锈钢水雾喷头](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTWB系列-不锈钢水雾喷头>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "confirmed_parameters": {
    "body_material": "Stainless steel",
    "medium": "Water",
    "thread_family": "BSPT male taper thread",
    "models": [
      {
        "model": "ZSTWB16/120",
        "thread": "R1/2",
        "k_factor_metric": 16,
        "spray_angle_deg": 120,
        "reference_flow_l_min_at_3_5_bar": 30
      },
      {
        "model": "ZSTWB34/120",
        "thread": "R3/4",
        "k_factor_metric": 34,
        "spray_angle_deg": 120,
        "reference_flow_l_min_at_3_5_bar": 64
      },
      {
        "model": "ZSTWB68/120",
        "thread": "R1",
        "k_factor_metric": 68,
        "spray_angle_deg": 120,
        "reference_flow_l_min_at_3_5_bar": 127
      }
    ]
  },
  "international_parameter_basis": {
    "thread_terminology": "R designation uses ISO 7-1 terminology; product compliance to ISO 7-1 is not claimed without a thread inspection record.",
    "flow_formula": "Q = K*sqrt(P), where Q is L/min, K is L/min/sqrt(bar), and P is bar.",
    "reference_pressure": "3.5 bar = 0.35 MPa",
    "compliance_boundary": "No ISO 6182, UL 2167, NFPA 15 or NFPA 750 compliance, listing or certification claim is made.",
    "primary_sources": [
      {
        "standard": "ISO 7-1:1994",
        "url": "https://www.iso.org/standard/20819.html",
        "use": "R-series pipe-thread terminology only"
      },
      {
        "standard": "ISO 6182-9:2005",
        "url": "https://www.iso.org/standard/42117.html",
        "use": "water mist nozzle standard context only"
      },
      {
        "standard": "ISO 6182-14:2019",
        "url": "https://www.iso.org/standard/64153.html",
        "use": "water spray nozzle standard context; scope excludes water mist nozzles"
      },
      {
        "standard": "UL 2167",
        "url": "https://www.ul.com/services/water-mist-system-equipment-component-testing",
        "use": "water mist nozzle testing context only"
      }
    ]
  },
  "blocked_assets": [
    {
      "asset_type_zh": "尺寸连接图",
      "reason": "No exact-model dimensioned drawing or unchanged measurement photo."
    },
    {
      "asset_type_zh": "认证文件图",
      "reason": "No exact-SKU international certificate or test report."
    },
    {
      "asset_type_zh": "安装效果图",
      "reason": "Installation orientation, mating connection, spacing and environment are not confirmed."
    },
    {
      "asset_type_zh": "包装装箱图",
      "reason": "No real packaging photo or packing data."
    }
  ]
}
```

## 110 ZSTWC系列-不锈钢中速水雾喷头

系列分组：水雾及水幕喷头；收录文件：24。

资料目录：[ZSTWC系列-不锈钢中速水雾喷头](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTWC系列-不锈钢中速水雾喷头>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "blocked_assets": [
    {
      "asset_type_zh": "尺寸连接图",
      "reason": "Exact-model dimensioned drawing or verified measurement is missing"
    },
    {
      "asset_type_zh": "水力性能图",
      "reason": "Exact-model K-factor, pressure and spray-angle evidence is missing"
    },
    {
      "asset_type_zh": "认证文件图",
      "reason": "No exact-export-SKU certificate/listing was supplied"
    },
    {
      "asset_type_zh": "安装说明图",
      "reason": "Approved orientation, spacing and connection arrangement are missing"
    },
    {
      "asset_type_zh": "包装装箱图",
      "reason": "Authentic packaging photos and packing data are missing"
    }
  ]
}
```

参数与证据文档：

- [copy\evidence-ledger.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTWC系列-不锈钢中速水雾喷头/copy/evidence-ledger.md>)
- [copy\export-standards-crosswalk.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTWC系列-不锈钢中速水雾喷头/copy/export-standards-crosswalk.md>)
- [copy\qa-report.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTWC系列-不锈钢中速水雾喷头/copy/qa-report.md>)

## 111 ZSTWC系列-撞击式水雾喷头

系列分组：水雾及水幕喷头；收录文件：20。

资料目录：[ZSTWC系列-撞击式水雾喷头](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTWC系列-撞击式水雾喷头>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "confirmed_claims": [
    {
      "claim": "Impact-Type Water Mist Nozzle",
      "evidence_grade": "A",
      "market_applicability": "market-neutral confirmed",
      "source": "user-confirmed product identity and source archive"
    },
    {
      "claim": "Copper Body",
      "evidence_grade": "A",
      "market_applicability": "market-neutral confirmed",
      "scope_note": "body only; not pure copper, not all components, no alloy grade or finish claim",
      "source": "user confirmation recorded 2026-09-24"
    },
    {
      "claim": "External Thread Appearance",
      "evidence_grade": "A-visible",
      "market_applicability": "market-neutral visible fact",
      "scope_note": "thread family and dimensions are unmapped",
      "source": "source photographs"
    }
  ],
  "blocked_modules": [
    "numeric performance specification image",
    "dimension drawing",
    "installation instruction image",
    "certification document image",
    "packaging image"
  ]
}
```

参数与证据文档：

- [copy\01-国际标准与参数发布边界.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSTWC系列-撞击式水雾喷头/copy/01-国际标准与参数发布边界.md>)

## 112 ZSXDF7-Q-DN150-对夹式消防信号蝶阀

系列分组：消防蝶阀；收录文件：11。

资料目录：[ZSXDF7-Q-DN150-对夹式消防信号蝶阀](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSXDF7-Q-DN150-对夹式消防信号蝶阀>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "scope": "4 supplementary English parameter images; not a complete main-image gallery replacement",
  "specifications": {
    "nominal_size": "DN150",
    "body_material": "Ductile Iron",
    "working_pressure": "1.6 MPa",
    "switch_contact_rating": "24 V DC, 0.5 A",
    "pressure_conversion": {
      "formula": "1 MPa = 10 bar; 1.6 × 10 = 16 bar",
      "result": "16 bar",
      "equivalence_claim": false
    },
    "evidence_grade": "A",
    "source": "用户在本会话确认150口径、球墨铸铁、工作压力1.6 MPa、DC24V 0.5A",
    "market_applicability": "market-neutral confirmed",
    "certifications": []
  }
}
```

参数与证据文档：

- [copy\DN150-电信号及标准参数查询.txt](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSXDF7-Q-DN150-对夹式消防信号蝶阀/copy/DN150-电信号及标准参数查询.txt>)
- [copy\图片文案与确认参数.txt](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSXDF7-Q-DN150-对夹式消防信号蝶阀/copy/图片文案与确认参数.txt>)
- [copy\核验记录.json](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSXDF7-Q-DN150-对夹式消防信号蝶阀/copy/核验记录.json>)

## 113 ZSXDF7-Q-DN250-对夹式消防信号蝶阀

系列分组：消防蝶阀；收录文件：24。

资料目录：[ZSXDF7-Q-DN250-对夹式消防信号蝶阀](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSXDF7-Q-DN250-对夹式消防信号蝶阀>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "full_factory_order_code": "not verified; omitted from artwork",
  "user_scope": "先做通用英文版，暂不写未证实的国际认证或参数",
  "confirmed_claims": [
    "DN 150 as nominal designation",
    "Wafer-type category supplied by user",
    "Handwheel visible",
    "Position indicator visible on cover",
    "Red exterior",
    "Black seat appearance"
  ]
}
```

参数与证据文档：

- [copy\参数证据对照.csv](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSXDF7-Q-DN250-对夹式消防信号蝶阀/copy/参数证据对照.csv>)

## 114 ZSXDF7-Q系列-对夹式消防信号蝶阀

系列分组：消防蝶阀；收录文件：30。

资料目录：[ZSXDF7-Q系列-对夹式消防信号蝶阀](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSXDF7-Q系列-对夹式消防信号蝶阀>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "model_reference": "ZSXDF7-Q",
  "confirmed_facts": [
    "Product category: wafer-type supervisory butterfly valve",
    "Model series: ZSXDF7-Q",
    "Confirmed order codes: ZSXDF7-Q-50-16, ZSXDF7-Q-65-16, ZSXDF7-Q-80-16, ZSXDF7-Q-100-16, ZSXDF7-Q-125-16, ZSXDF7-Q-150-16 and ZSXDF7-Q-200-16",
    "Confirmed nominal sizes: DN50, DN65, DN80, DN100, DN125, DN150 and DN200",
    "Pressure series: PN16",
    "Visible handwheel operator",
    "Visible external signal enclosure",
    "Visible wafer valve body, disc and black seat",
    "Valve body material: ductile iron QT450-10 with red epoxy coating (user-confirmed)",
    "Disc material: ductile iron QT450-10 with epoxy coating (user-confirmed)",
    "Seat material: EPDM (user-confirmed)",
    "Stem material: stainless steel 431 / 1Cr17Ni2 (user-confirmed)"
  ],
  "blocked_assets": [
    {
      "asset_type_zh": "尺寸连接图",
      "status": "blocked",
      "reason": "No matching dimensioned drawings or mating-flange standard for the seven confirmed sizes"
    },
    {
      "asset_type_zh": "信号接线图",
      "status": "blocked",
      "reason": "No matching contact, rating or wiring data"
    },
    {
      "asset_type_zh": "连接安装图",
      "status": "blocked",
      "reason": "No verified connection, bolting, orientation, clearance or commissioning data"
    },
    {
      "asset_type_zh": "包装装箱图",
      "status": "blocked",
      "reason": "No real packaging photo or packing data"
    },
    {
      "asset_type_zh": "认证文件图",
      "status": "blocked",
      "reason": "No current exact-export-SKU approval evidence for a named market"
    },
    {
      "asset_type_zh": "多角度展示图",
      "status": "blocked",
      "reason": "Only one overall source photo is available"
    }
  ]
}
```

参数与证据文档：

- [copy\02-evidence-ledger.csv](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSXDF7-Q系列-对夹式消防信号蝶阀/copy/02-evidence-ledger.csv>)

## 115 ZSXDF8-Q系列-沟槽式消防信号蝶阀

系列分组：消防蝶阀；收录文件：30。

资料目录：[ZSXDF8-Q系列-沟槽式消防信号蝶阀](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSXDF8-Q系列-沟槽式消防信号蝶阀>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "source_photo_visible_model": "ZSDF",
  "blocked_assets": [
    {
      "asset": "尺寸连接图",
      "status": "blocked",
      "reason": "No exact-model dimensioned drawing or unchanged real measurement photo for DN50–DN200.",
      "needed": "Manufacturer drawing with H/L/groove dimensions and units for each size."
    },
    {
      "asset": "安装说明图",
      "status": "blocked",
      "reason": "Exact groove standard, mating coupling, pipe OD, orientation, clearance and support data are not verified for the export configuration.",
      "needed": "Destination-project groove specification plus confirmed installation drawing."
    },
    {
      "asset": "认证文件图",
      "status": "blocked",
      "reason": "No UL/FM/CE/EN/LPCB or destination-country approval evidence covers the exact export SKU.",
      "needed": "Current certificate/listing covering the exact ZSXDF8-Q export SKU, holder, scope and validity period."
    },
    {
      "asset": "包装装箱图",
      "status": "blocked",
      "reason": "No factory-owned packaging photo, carton data, quantity or weight evidence is supplied.",
      "needed": "Real packaging photos and confirmed packing specifications."
    },
    {
      "asset": "多角度展示图",
      "status": "blocked",
      "reason": "Only one complete-product angle is supplied; the remaining photos are real close-ups rather than alternate overall angles.",
      "needed": "Factory-owned side, rear and opposite three-quarter photos."
    },
    {
      "asset": "精确型号与实物映射",
      "status": "manual_review",
      "reason": "The sales series is ZSXDF8-Q while the visible product nameplate reads ZSDF and GB 5135.6-2018.",
      "needed": "Manufacturer confirmation that the photographed ZSDF-marked product is the supplied physical configuration for the ZSXDF8-Q sales series."
    }
  ],
  "claim_evidence_ledger": [
    {
      "claim": "Sales series ZSXDF8-Q and model references ZSXDF8-Q-50-16 through ZSXDF8-Q-200-16",
      "evidence_grade": "A",
      "evidence": "Archived user-confirmed product input in the supplied package",
      "applicability": "market-neutral confirmed for the sales series; photo mapping requires manual review",
      "publication_status": "publishable after manual model/photo confirmation"
    },
    {
      "claim": "DN50 / DN65 / DN80 / DN100 / DN125 / DN150 / DN200",
      "evidence_grade": "A",
      "evidence": "Archived user-confirmed manufacturer record",
      "applicability": "market-neutral confirmed",
      "publication_status": "publishable after manual model/photo confirmation"
    },
    {
      "claim": "DN terminology",
      "evidence_grade": "C",
      "evidence": "ISO 6708:1995 defines DN nominal-size terminology",
      "source_url": "https://www.iso.org/standard/21274.html",
      "applicability": "terminology context only",
      "publication_status": "used only to explain notation; does not prove connection equivalence"
    },
    {
      "claim": "ISO 10631:2021 includes DN50–DN200 and PN16 within the scope of general metallic butterfly-valve designations",
      "evidence_grade": "C",
      "evidence": "Official ISO standard abstract and scope",
      "source_url": "https://www.iso.org/standard/78331.html",
      "applicability": "international context only; this does not prove product conformity",
      "publication_status": "not rendered as a conformity or certification claim"
    },
    {
      "claim": "PN16 / 1.6 MPa / 16 bar",
      "evidence_grade": "A",
      "evidence": "Archived user-confirmed manufacturer record; 16 bar is an arithmetic conversion from 1.6 MPa",
      "conversion": "1 MPa = 10 bar",
      "applicability": "market-neutral confirmed",
      "publication_status": "publishable after manual model/photo confirmation; no Class 150 equivalence"
    },
    {
      "claim": "24 V DC / 0.5–1 A / SPDT / 1 NO + 1 NC",
      "evidence_grade": "A",
      "evidence": "Archived user-confirmed manufacturer record",
      "applicability": "market-neutral confirmed",
      "publication_status": "publishable after manual model/photo confirmation"
    },
    {
      "claim": "Body: ductile iron QT450; disc: ductile iron; stem: stainless steel; seal: EPDM",
      "evidence_grade": "A",
      "evidence": "Archived user-confirmed manufacturer record",
      "applicability": "market-neutral confirmed",
      "publication_status": "publishable after manual model/photo confirmation; no ASTM/EN equivalence"
    },
    {
      "claim": "ANSI/CAN/UL/ULC 1091:2022 is a current butterfly-valve standard for fire-protection service",
      "evidence_grade": "C",
      "evidence": "Official UL Solutions certification bulletin dated 2025-07-18",
      "source_url": "https://canada.ul.com/wp-content/uploads/sites/11/2025/07/Certification-Bulletin_2025-02ENG-ULC-ORD-C1091Superseded_20250718.pdf",
      "applicability": "research context only; no exact-SKU listing evidence supplied",
      "publication_status": "UL mark and conformity claim prohibited"
    },
    {
      "claim": "Visible physical product marking: ZSDF / GB 5135.6-2018 / GUANYA manufacturer identity",
      "evidence_grade": "A",
      "evidence": "Supplied authentic white-background product photograph",
      "applicability": "domestic physical marking retained; not translated into export compliance",
      "publication_status": "marking preserved as photographed; manual series mapping required"
    }
  ]
}
```

参数与证据文档：

- [copy\evidence-ledger.csv](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSXDF8-Q系列-沟槽式消防信号蝶阀/copy/evidence-ledger.csv>)

## 116 ZSXZF4系列-法兰式消防信号闸阀

系列分组：消防闸阀；收录文件：20。

资料目录：[ZSXZF4系列-法兰式消防信号闸阀](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSXZF4系列-法兰式消防信号闸阀>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "blocked_or_omitted": [
    "Flange bolt-hole diameter, hole count and pitch-circle dimensions were not supplied; no connection-dimension image was published.",
    "Target-country project standard and exact-SKU certification files were not supplied; no UL, FM, CE, LPCB or country-specific compliance claim appears.",
    "1.6 MPa was not converted into Class 150 or any other pressure class."
  ]
}
```

参数与证据文档：

- [copy\资料状态与待确认项.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSXZF4系列-法兰式消防信号闸阀/copy/资料状态与待确认项.md>)

## 117 ZSXZF8系列-沟槽式消防信号闸阀

系列分组：消防闸阀；收录文件：19。

资料目录：[ZSXZF8系列-沟槽式消防信号闸阀](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSXZF8系列-沟槽式消防信号闸阀>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "blocked_or_omitted": [
    "Groove outside diameter, groove width and groove depth documents were not supplied; no connection-dimension image was published.",
    "Target-country project standard and exact-SKU certification files were not supplied; no UL, FM, CE, LPCB or country-specific compliance claim appears.",
    "1.6 MPa was not converted into Class 150 or any other pressure class."
  ]
}
```

参数与证据文档：

- [copy\资料状态与待确认项.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSXZF8系列-沟槽式消防信号闸阀/copy/资料状态与待确认项.md>)

## 118 ZSZF4-Q系列-消防法兰明杆闸阀

系列分组：消防闸阀；收录文件：41。

资料目录：[ZSZF4-Q系列-消防法兰明杆闸阀](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSZF4-Q系列-消防法兰明杆闸阀>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "confirmation_scope": "Extends archived series pressure, materials and common construction to DN200; does not establish certification, dimensions or a foreign flange standard",
  "blocked_assets": [
    {
      "type": "尺寸连接图",
      "reason": "Actual dimensions, bolt-circle data and exact flange configuration unavailable; old dimension tables rejected"
    },
    {
      "type": "包装装箱图",
      "reason": "No genuine current packaging photograph or verified packing data"
    },
    {
      "type": "认证文件图",
      "reason": "No exact-SKU international certificates supplied; archive states no UL/FM"
    }
  ],
  "user_confirmation": "DN50–DN200，DN200与其他规格参数相同",
  "parameter_crosswalk": [
    {
      "source_value": "DN50 / DN65 / DN80 / DN100 / DN150 / DN200",
      "field": "Nominal sizes",
      "basis": "Current user explicitly confirmed DN50–DN200 and same configuration for DN200",
      "final_copy": "DN50–DN200",
      "status": "market-neutral confirmed"
    },
    {
      "source_value": "PN16",
      "field": "Pressure designation",
      "basis": "D:\\work\\codex\\yunying\\outputs\\chuanwei-fire-commerce\\消防法兰明杆闸阀-ZSZF4-Q系列\\images\\mic\\copy\\product-input.md",
      "final_copy": "PN16",
      "status": "market-neutral confirmed"
    },
    {
      "final_copy": "1.6 MPa / 16 bar",
      "field": "Rated working pressure",
      "source_value": "1.6 MPa",
      "basis": "D:\\work\\codex\\yunying\\outputs\\chuanwei-fire-commerce\\消防法兰明杆闸阀-ZSZF4-Q系列\\images\\mic\\copy\\product-input.md",
      "status": "market-neutral confirmed",
      "conversion": "1 MPa = 10 bar; 1.6 × 10 = 16 bar; no conversion to ASME Class"
    },
    {
      "final_copy": "QT450-10 ductile iron",
      "field": "Body / bonnet / gate",
      "source_value": "QT450-10",
      "basis": "D:\\work\\codex\\yunying\\outputs\\chuanwei-fire-commerce\\消防法兰明杆闸阀-ZSZF4-Q系列\\images\\mic\\copy\\product-input.md",
      "status": "market-neutral confirmed",
      "note": "Retained actual manufacturer grade; no EN-GJS or ASTM grade equivalence claimed"
    },
    {
      "source_value": "stainless steel",
      "field": "Stem",
      "basis": "D:\\work\\codex\\yunying\\outputs\\chuanwei-fire-commerce\\消防法兰明杆闸阀-ZSZF4-Q系列\\images\\mic\\copy\\product-input.md",
      "final_copy": "Stainless steel",
      "status": "market-neutral confirmed"
    },
    {
      "source_value": "copper alloy",
      "field": "Stem nut",
      "basis": "D:\\work\\codex\\yunying\\outputs\\chuanwei-fire-commerce\\消防法兰明杆闸阀-ZSZF4-Q系列\\images\\mic\\copy\\product-input.md",
      "final_copy": "Copper alloy",
      "status": "market-neutral confirmed"
    },
    {
      "source_value": "EPDM rubber",
      "field": "Gate seal",
      "basis": "D:\\work\\codex\\yunying\\outputs\\chuanwei-fire-commerce\\消防法兰明杆闸阀-ZSZF4-Q系列\\images\\mic\\copy\\product-input.md",
      "final_copy": "EPDM rubber",
      "status": "market-neutral confirmed"
    },
    {
      "source_value": "red epoxy coating",
      "field": "Finish",
      "basis": "D:\\work\\codex\\yunying\\outputs\\chuanwei-fire-commerce\\消防法兰明杆闸阀-ZSZF4-Q系列\\images\\mic\\copy\\product-input.md",
      "final_copy": "Red epoxy coating",
      "status": "market-neutral confirmed"
    },
    {
      "final_copy": "Double-flanged",
      "field": "Flanges",
      "source_value": "GB/T 17241.6; EN 1092-2 PN16; BS 4504; ASME/ANSI options in archive",
      "basis": "Real source photograph",
      "status": "market-neutral confirmed",
      "note": "Exact foreign flange specification and actual drilling drawings not established; standard claims omitted"
    },
    {
      "source_value": "Old tables explicitly rejected as not actual data",
      "field": "Dimensions / weights",
      "basis": "archive-missing-data.md",
      "final_copy": "OMITTED",
      "status": "conflicting"
    },
    {
      "source_value": "Archive explicitly states no UL/FM certification",
      "field": "UL / FM",
      "basis": "D:\\work\\codex\\yunying\\outputs\\chuanwei-fire-commerce\\消防法兰明杆闸阀-ZSZF4-Q系列\\images\\mic\\copy\\product-input.md",
      "final_copy": "OMITTED",
      "status": "not certified"
    }
  ]
}
```

参数与证据文档：

- [copy\02-evidence-ledger.csv](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSZF4-Q系列-消防法兰明杆闸阀/copy/02-evidence-ledger.csv>)
- [copy\parameter-crosswalk.json](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSZF4-Q系列-消防法兰明杆闸阀/copy/parameter-crosswalk.json>)
- [source\archive-evidence-ledger.csv](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSZF4-Q系列-消防法兰明杆闸阀/source/archive-evidence-ledger.csv>)
- [source\archive-mic-evidence-ledger.csv](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSZF4-Q系列-消防法兰明杆闸阀/source/archive-mic-evidence-ledger.csv>)

## 119 ZSZF4-Q系列-蓝色消防法兰暗杆闸阀

系列分组：消防闸阀；收录文件：16。

资料目录：[ZSZF4-Q系列-蓝色消防法兰暗杆闸阀](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/ZSZF4-Q系列-蓝色消防法兰暗杆闸阀>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "blocked_modules": [
    {
      "type": "international pressure, flange and execution standard",
      "need": "target country/project, exact export SKU manufacturer specification and matching conformity/test documentation"
    },
    {
      "type": "material and coating specification",
      "need": "matching export SKU material and coating data; original archive only is insufficient to assert export configuration"
    },
    {
      "type": "dimension and full size selection table",
      "need": "exact export SKU drawings and available blue size list; do not derive from photo or competitor"
    },
    {
      "type": "certification and test evidence",
      "need": "valid certificate/report with exact covered model and scope"
    },
    {
      "type": "packaging",
      "need": "real packaging photos and measured package data"
    },
    {
      "type": "installed application scene",
      "need": "confirmed export flange/interface and installation configuration"
    }
  ]
}
```

## 120 型号待确认-双口消防进水接合器

系列分组：水泵接合器及消防队进水口；收录文件：21。

资料目录：[型号待确认-双口消防进水接合器](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/型号待确认-双口消防进水接合器>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "factory_model": null,
  "blocked_assets": [
    {
      "asset_type": "尺寸连接图",
      "reason": "No exact drawing or measurements"
    },
    {
      "asset_type": "安装场景图",
      "reason": "No exact installation arrangement or connection drawing"
    },
    {
      "asset_type": "认证文件图",
      "reason": "No exact-SKU certificate or test report"
    },
    {
      "asset_type": "包装装箱图",
      "reason": "No real packaging evidence"
    }
  ]
}
```

## 121 无展示型号-法兰式直角消防栓阀

系列分组：室内消火栓及栓阀；收录文件：19。

资料目录：[无展示型号-法兰式直角消防栓阀](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/无展示型号-法兰式直角消防栓阀>)

原始清单中的型号、参数、证据及限制（尚需与官网逐字段核对）：

```json
{
  "display_model": null,
  "publication_scope": "Product identification, observable structure and manufacturer-declared interface configuration only; no international compliance or certification conclusion.",
  "parameter_crosswalk": [
    {
      "field": "Inlet",
      "source_market_value": "BS4504 flange",
      "unit": null,
      "evidence": "source/原1688档案.json, 2026-09-26 user confirmation",
      "evidence_grade": "A: manufacturer confirmation as recorded in user-supplied archive",
      "target_copy": "BS 4504 flange",
      "standard_basis": "Legacy interface designation only; exact part/version and dimensions not established",
      "market_applicability": "market-neutral manufacturer-declared configuration; destination acceptance unverified",
      "conversion": null,
      "publishable": true,
      "restriction": "No current-standard, dimensional compatibility or certification assertion"
    },
    {
      "field": "Outlet",
      "source_market_value": "BS336 coupling",
      "unit": null,
      "evidence": "source/原1688档案.json, 2026-09-26 user confirmation",
      "evidence_grade": "A: manufacturer confirmation record",
      "target_copy": "BS 336 coupling",
      "standard_basis": "BSI identifies BS 336:2010 as current release for fire hose couplings and ancillary equipment; official standard context does not prove product conformity",
      "market_applicability": "market-neutral manufacturer-declared configuration; destination acceptance unverified",
      "conversion": null,
      "publishable": true,
      "restriction": "No certified, approved or complete-valve conformance claim"
    },
    {
      "field": "Layout",
      "source_market_value": "直角",
      "evidence": "source/实拍_正面.jpg",
      "evidence_grade": "A: directly observable",
      "target_copy": "Right angle",
      "market_applicability": "market-neutral confirmed",
      "publishable": true
    },
    {
      "field": "Operation",
      "source_market_value": "手轮启闭",
      "evidence": "source/实拍_正面.jpg; source/实拍_手轮俯视.jpg",
      "evidence_grade": "A: directly observable",
      "target_copy": "Handwheel",
      "market_applicability": "market-neutral confirmed",
      "publishable": true
    },
    {
      "field": "Casting markings",
      "source_market_value": "50; PN16; PN10/16; 125; handwheel 140",
      "evidence": "original photographs",
      "target_copy": null,
      "market_applicability": "unmapped as numerical specifications",
      "publishable": false,
      "restriction": "Retained on photographed body only. Not converted to nominal size, outlet size, working pressure, flange class or dimensions."
    },
    {
      "field": "Size",
      "source_market_value": "series table includes 2.5 inch",
      "evidence": "archive series reference",
      "evidence_grade": "D for exact SKU",
      "market_applicability": "unmapped",
      "publishable": false
    },
    {
      "field": "Material/pressure/dimensions/performance/certification",
      "source_market_value": null,
      "evidence": null,
      "market_applicability": "unverified",
      "publishable": false
    }
  ]
}
```

参数与证据文档：

- [copy\图片上传顺序与参数依据.md](<D:/work/codex/阿里国际站运营/outputs/alibaba-detail-image-studio/无展示型号-法兰式直角消防栓阀/copy/图片上传顺序与参数依据.md>)
