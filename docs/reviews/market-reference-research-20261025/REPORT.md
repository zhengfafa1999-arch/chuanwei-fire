# 常规参数补充及本地资料复核

日期：2026-10-25。仅修改本地网站，未部署。

## 已完成的内容

- 32 个产品系列、64 个英文/阿拉伯文页面增加选型参考：每条均标明厂家、型号和官方来源。
- 复核 D:/work/codex/外部商品连接内容 中 35 个主商品 HTML 页面，以及控制器、温感探测器、压力表和气溶胶装置的重点图片。五个日期子目录及根目录均纳入。
- 从本地资料补入 5 个系列的产品字段：两类命名控制柜尺寸、立式多级泵铸铁泵体、正三通10种DN/外径组合、同心大小头18组DN/两端外径组合。
- 保留已修正的雨淋法兰式照片、喷头分组、产品水印、英阿语言路由和此前全站客户文案清理。

## 来源使用规则

实际型号规格与其他品牌选型参考分区。其他品牌的数值没有写入本店SKU性能、认证或可供配置。参考区提示订货时索取所供型号数据表；流量/压力成对表达，消防泵系列最大流量与最大扬程不视为同一工况点。

## 本地目录的核对结果

原资料有参数，并非都缺资料。现有官网已采用的项目包括：沟槽件球墨铸铁、卧式泵铸铁泵体、压力表100 mm/M20×1.5/1.6级、多级泵3.6 m³/h/40 m/1.1 kW/380 V/DN32等。本次新增字段见 local-changes.json。

不能照抄的冲突：

- 卧式泵包装区1000 g与型号区30 kg冲突，未作为重量发布。
- 控制柜有预付金占位SKU和疑似功率单位错配，仅采用命名型号的明确电压、材质与尺寸。
- TX3008NL图中1600点位与另一张1936点位冲突，不用其他品牌容量替代。
- 温感探测器静态/报警电流没有单位，不自行补成mA。
- 气溶胶列表把药剂类型写成干粉，保护范围图存在面积/体积混淆；不推断保护容积。
- 商品标题的认证宣传、证书编号和旧标准文字未作为本店有效认证发布。

## 厂家参考清单

| 产品系列 | 参考型号 | 官方来源 |
|---|---|---|
| grooved-concentric-reducers | Victaulic grooved fittings · 07.01 | [资料](https://assets.victaulic.com/assets/uploads/literature/07.01.pdf) |
| grooved-equal-crosses | Victaulic grooved fittings · 07.01 | [资料](https://assets.victaulic.com/assets/uploads/literature/07.01.pdf) |
| grooved-equal-tees | Victaulic grooved fittings · 07.01 | [资料](https://assets.victaulic.com/assets/uploads/literature/07.01.pdf) |
| grooved-pipe-elbows | Victaulic grooved fittings · 07.01 | [资料](https://assets.victaulic.com/assets/uploads/literature/07.01.pdf) |
| grooved-reducing-tees | Victaulic grooved fittings · 07.01 | [资料](https://assets.victaulic.com/assets/uploads/literature/07.01.pdf) |
| rigid-grooved-pipe-couplings | Victaulic Style 107N · 06.23 | [资料](https://assets.victaulic.com/assets/uploads/literature/06.23.pdf) |
| grooved-flange-adapters | Victaulic Style 741 · 06.06 | [资料](https://assets.victaulic.com/assets/uploads/literature/06.06.pdf) |
| threaded-mechanical-tees | Victaulic Styles 920 / 920N · 11.02 | [资料](https://assets.victaulic.com/assets/uploads/literature/11.02.pdf) |
| flanged-y-strainers | Pango GL41H-16Q | [资料](https://www.pangovalve.cn/glq/156.html) |
| flanged-globe-valves | Datian J41T-16 | [资料](https://www.dtjt.com/proDetail_1417.html) |
| swing-check-valves | NIBCO F-918-B | [资料](https://www.nibco.com/nibco-products/valves/check-valves/f-918-b) |
| two-piece-stainless-steel-ball-valves | NIBCO T-580-S6-R-66-LL | [资料](https://catalog.nibco.com/viewitems/ball-valves-7/ntional-port-stainless-steel-trim-t-580-s6-r-66-ll) |
| liquid-filled-pressure-gauges | WIKA 213.53 · NS100 | [资料](https://www.wika.com/media/Data-sheets/Pressure/Pressure-gauges/ds_pm0212_en_co.pdf) |
| pressure-vacuum-gauges | WIKA 213.53 · connection examples | [资料](https://www.wika.com/media/Data-sheets/Pressure/Pressure-gauges/ds_pm0212_en_co.pdf) |
| pressure-gauge-syphons | WIKA 910.15 | [资料](https://www.wika.com/en-us/910_15.WIKA) |
| portable-dry-powder-fire-extinguishers | Amerex B500 / B500T | [资料](https://amerex-fire.com/api/documents/download?a=en&d=import-amerex-portable-fire-extinguisher-catalog) |
| portable-co2-fire-extinguishers | Amerex 322 / 330 | [资料](https://amerex-fire.com/api/documents/download?a=en&d=import-amerex-portable-fire-extinguisher-catalog) |
| portable-water-based-fire-extinguishers | Amerex 240 | [资料](https://amerex-fire.com/products/fire-extinguishers/portable-fire-extinguishers/240) |
| suspended-dry-powder-extinguishers | ANAF PS2-AT | [资料](https://www.anaf.eu/en/ps2-at) |
| suspended-ultrafine-dry-powder-extinguishers | Qinghua FZX-ACT3/1.2 | [资料](https://www.qhxf.com/product-detail/BXZvgADW) |
| cabinet-aerosol-fire-suppression | Stat-X 30E / 100E | [资料](https://www.statx.com/product/stat-x-fixed-system-electrical-units/) |
| pistol-grip-combination-fire-nozzles | TFT G-Force GB3N2S | [资料](https://tft.com/product_series/g-force-series/) |
| heat-detectors | Potter PAD100-HD | [资料](https://www.pottersignal.com/product/manual/550-0622-AAE_Potter_PAD200_6DB_4DB_Series.pdf) |
| photoelectric-smoke-detectors | Potter PAD100-PD | [资料](https://www.pottersignal.com/product/manual/550-0622-AAE_Potter_PAD200_6DB_4DB_Series.pdf) |
| fire-alarm-control-panels | Potter IPA-100 | [资料](https://www.pottersignal.com/ipa-fire-alarm/fire-control-panels/fire-control-panel-ipa-100) |
| fire-pump-inspection-control-cabinets | Tornatech GPx series | [资料](https://www.tornatech.com/product/gpx-series-electric-fire-pump-controllers-2/) |
| automatic-transfer-control-cabinets | ABB TruONE | [资料](https://new.abb.com/docs/librariesprovider22/default-document-library/truone_ats_1scc303008c0201_global_catalog_22-03.pdf?sfvrsn=11c6c60a_0) |
| vertical-single-stage-fire-pumps | Jiaxun vertical single-stage series | [资料](http://shanghaijiaxun.com/81.html) |
| horizontal-single-stage-fire-pumps | Jiaxun horizontal single-stage series | [资料](http://shanghaijiaxun.com/81.html) |
| vertical-multistage-fire-pumps | Jiaxun vertical multistage series | [资料](http://shanghaijiaxun.com/81.html) |
| fire-pressure-maintenance-sets | Jiaxun multistage pressure-maintenance series | [资料](http://shanghaijiaxun.com/81.html) |
| wheeled-dry-powder-fire-extinguishers | Amerex 495 | [资料](https://amerex-fire.com/api/documents/download?a=en&d=import-amerex-fire-extinguisher-parts-book) |

## 仍需精确产品文件的项目

其他品牌只能补常规选型信息，不能证明实际SKU的有效认证、试验性能、接液件牌号或电气协议。灭火球缺乏可对应实物的药剂量/保护范围证据，继续不填写此类数值。内部跟进清单不进入发布包。

## 验证

完整构建通过：291个正式页面、3094处图片alt、83615处内部引用。32个系列的英阿页面在桌面/手机共128个页面视口检查全部通过，无破图或横向溢出，参考区来源和范围提示完整。原有SKU字段及文案保持，只有5个本地来源明确支持的字段增补；技术数值双语一致。结果见 build.log、browser-validation.json、data-validation.json。最终CSS微调留白后已重做128个视口检查。

完整公开包：[发布说明](../../release/market-reference-enriched-20261025/README.md)。包内仅公开页面与资源，不含本文及来源快照。
