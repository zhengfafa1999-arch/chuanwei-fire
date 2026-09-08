# v11 图册官网升级差异与执行计划

**任务编号：** CATWEB-001
**建立日期：** 2026-09-08
**当前状态：** CATWEB-001 至 CATWEB-004 已完成；已开始按分类逐款对齐，页面保持本地草稿，等待图片官网使用许可确认
**图册基线：** CHUANWEI FIRE Product Catalog 2026 Customer v11（47页）

## 目标与边界

本计划把 v11 图册与当前官网的 41 个产品路由进行映射，先区分新增、更新、保持和暂缓，再通过共享产品数据与模板同步英文和阿拉伯文。

- 本阶段没有修改产品页面、分类页或公开内容。
- 原 v10 第47页 `Fire Valves & Accessories` 已删除，不恢复其中带压力表阀、手轮闸阀和侧孔球阀。
- 只采用交接包中的 `confirmed_specifications`、当前图册表格和最新用户确认。
- `historical_source_notes` 和 `all_visible_catalog_text` 仅用于追溯，不直接进入官网。
- 未核验到逐 SKU 认证覆盖，不展示 UL、FM、CE、CCC 或其他认证徽标。
- 图册展示许可不自动等于官网商用许可；第三方、泉观或 AI 重建图片保持暂缓。

## 差异摘要

| 范围 | 数量 | 处理原则 |
|---|---:|---|
| 现有路由——更新 | 29 | 只合并 v11 已确认字段，保留同一路由和共享英阿结构 |
| 现有路由——保持 | 9 | v11 未覆盖不代表停产，不删除、不改参数 |
| 现有路由——暂缓 | 3 | 出口图册范围排除不等于官网删除授权 |
| 新增产品候选 | 9 | 可先制作本地内容草稿，正式使用图片前再次确认许可 |
| 新增产品暂缓 | 7 | 等待工厂原图或官网图片使用权确认 |
| 技术参考 | 1 | 温度/玻璃球颜色参考，合并到喷头内容，不建立商品页 |

## 现有官网产品映射

### 更新：29 个

| 分类 | 当前官网产品 | v11 证据 | 当前主图 | 主要限制 |
|---|---|---|---|---|
| 消防喷头 | Standard Response Fire Sprinklers | p6 | `products/消防喷头/standard-response-sprinkler/standard-response-three-styles.jpg` | 安装方向和温度按订单确认 |
| 消防喷头 | Quick Response Glass Bulb Sprinklers | p6 | `products/消防喷头/glass-bulb-sprinkler/quick-response-pendent.jpg` | 不把同页资料扩展到未覆盖型号 |
| 消防喷头 | Extended Coverage Quick Response Sprinklers | p8 | `products/消防喷头/categories/extended-coverage-quick-response.jpg` | 仅采用已确认型号表 |
| 消防喷头 | Concealed Pendent Sprinklers | p7 | `products/消防喷头/categories/concealed-pendent.jpg` | 喷头与盖板作为配套组件确认 |
| 消防喷头 | Large K-Factor & ESFR Sprinklers | p9、p10 | `products/消防喷头/categories/large-k-esfr-sprinkler.jpg` | K202 普通喷头与 ESFR 必须分开表达 |
| 消防喷头 | Dry Pendent Fire Sprinklers | p11 | `products/消防喷头/categories/dry-sprinkler.jpg` | 长度和可选装饰盘按订单确认 |
| 消防喷头 | Water Mist Nozzles | p13 | `products/消防喷头/water-mist-nozzles/standard-water-mist-nozzle-view-1.jpg` | 不补写未确认流量系数和喷雾数据 |
| 消防喷头 | Water Curtain Nozzles | p13 | `products/消防喷头/water-curtain-nozzles/horizontal-single-slot-water-curtain-nozzle.jpg` | 不补写未确认流量系数和喷雾数据 |
| 报警阀 | Wet Alarm Check Valve Assemblies | p15 | `products/消防阀/wet-alarm-check-valve-assemblies/dn150-flanged-wet-alarm-assembly-en.jpg` | 245/275 mm 为不同版本，不能合并 |
| 报警阀 | Diaphragm Deluge Valves | p16 | `products/消防阀/diaphragm-deluge-valves/deluge-valve-flanged.jpg` | 型号、连接和配管配置按报价确认 |
| 报警阀 | Preaction Valve Assemblies | p18 | `products/消防阀/preaction-valve-assembly.jpg` | 图片上的 ZSFZ 标记不作为预作用认证证据 |
| 报警阀 | Dry Pipe Alarm Valves | p17 | `products/消防阀/dry-pipe-alarm-valves/dry-pipe-alarm-valve-flanged.jpg` | 高度测量点和安装空间待确认 |
| 消防蝶阀 | Lever-Operated Grooved Butterfly Valves | p22 | `products/消防蝶阀/lever-operated-grooved-butterfly-valves/lever-operated-grooved-butterfly-valve.jpg` | 不猜测 S/W 后缀 |
| 消防蝶阀 | Lever-Operated Wafer Butterfly Valves | p22 | `products/消防蝶阀/lever-operated-wafer-butterfly-valves/lever-operated-wafer-butterfly-valve.jpg` | 不猜测 S/W 后缀 |
| 消防蝶阀 | Grooved Supervisory Butterfly Valves | p23 | `products/消防蝶阀/grooved-supervisory-butterfly-valves/grooved-supervisory-butterfly-valve.jpg` | 电气参数按系列分别确认 |
| 消防蝶阀 | Wafer Supervisory Butterfly Valves | p23 | `products/消防蝶阀/wafer-supervisory-butterfly-valves/wafer-supervisory-butterfly-valve.jpg` | 电气参数按系列分别确认 |
| 消防闸阀 | Flanged Supervisory Gate Valves | p21 | `products/消防阀门/flanged-supervisory-gate-valves/flanged-supervisory-gate-valve.jpg` | 信号触点和法兰尺寸按报价确认 |
| 消防闸阀 | Grooved Supervisory Gate Valves | p21 | `products/消防阀门/grooved-supervisory-gate-valves/grooved-supervisory-gate-valve.jpg` | 信号触点和沟槽尺寸按报价确认 |
| 消防闸阀 | NRS Gate Valves | p20 | `products/消防阀门/nrs-gate-valves/nrs-gate-valve.jpg` | 各口径尺寸不互相推导 |
| 消防闸阀 | OS&Y Gate Valves | p19 | `products/消防阀门/osy-gate-valves/osy-gate-valve.jpg` | DN200 可供，Factory Model 随报价确认 |
| 软管卷盘 | RIA 25 Fire Hose Reel | p38 | `products/软管卷盘/ria25-fire-hose-reel/ria25-fire-hose-reel.jpg` | 图册图为 AI 辅助展示，官网继续使用现有实物图 |
| 水带水枪接口 | Combination Jet/Fog Nozzles | p42 | `products/消防水枪/categories/combination-jet-fog-nozzle.jpg` | 最终配置按订单确认 |
| 水带水枪接口 | Layflat Fire Hoses | p39 | `products/消防水枪/categories/layflat-fire-hose.jpg` | 精确配置按订单确认 |
| 水带水枪接口 | KD Hose Couplings | p43 | `products/消防水枪/categories/kd-hose-coupling.jpg` | 接口制式和水带连接尺寸需确认 |
| 室内消火栓 | Export Slanted Hydrant Valves | p31 | `products/室内消防栓/export-slanted-hydrant-valve/export-slanted-front.jpg` | 只使用出口接口已确认内容 |
| 室外消火栓 | BS 750 Pattern Pillar Hydrants | p26、p28 | `products/室外消防栓/bs750-pillar-hydrant/bs750-front.jpg` | 总览与详情去重，不组合不存在的 SKU |
| 室外消火栓 | French-Pattern Hydrants | p26 | `products/室外消防栓/global-series/french-dry-barrel-hydrant.jpg` | 仅使用对应配置资料 |
| 室外消火栓 | Indonesian-Pattern Hydrants | p26、p27 | `products/室外消防栓/global-series/indonesia-wet-barrel-hydrant.jpg` | 总览与详情去重 |
| 室外消火栓 | Russian-Pattern Hydrants | p26 | `products/室外消防栓/global-series/russian-pattern-hydrant.jpg` | 仅使用对应配置资料 |

### 保持：9 个

| 分类 | 产品 | 原因 |
|---|---|---|
| 软管卷盘 | Straight-Stream Fire Hose Reel | v11 未覆盖，不代表停产 |
| 软管卷盘 | Jet/Spray Fire Hose Reel | v11 未覆盖，不代表停产 |
| 软管卷盘 | Heavy-Duty Fire Hose Reel | v11 未覆盖，不代表停产 |
| 水带水枪接口 | KN Threaded Adapters | v11 未覆盖，不代表停产 |
| 水带水枪接口 | Matched Hose Assemblies | v11 未覆盖，不代表停产 |
| 水泵接合器 | Freestanding Above-Ground FDCs | v11 未覆盖，不代表停产 |
| 水泵接合器 | Alternative Freestanding Configurations | v11 未覆盖，不代表停产 |
| 水泵接合器 | Underground FDC Assemblies | v11 未覆盖，不代表停产 |
| 水泵接合器 | Wall-Mounted & Grooved Families | v11 未覆盖，不代表停产 |

### 暂缓：3 个现有路由

| 产品 | 当前处理 | 原因 |
|---|---|---|
| Standard Indoor Fire Hydrants | 保持现有页面，不做图册升级 | 用户要求图册只保留国外型，但没有授权删除官网页面 |
| Double-Outlet Indoor Hydrants | 保持现有页面，不做图册升级 | 用户要求图册只保留国外型，但没有授权删除官网页面 |
| Rotating Pressure-Regulating Hydrants | 保持现有页面，不做图册升级 | 用户要求图册只保留国外型，但没有授权删除官网页面 |

## 新增产品候选

以下 9 个产品有用户提供或归档图片，并有可用于本地草稿的确认字段。正式公开前仍需确认图片可用于官网。

| 图册页 | 国际名称 | 建议分类 | Factory Model / 系列 | 图片来源 | 仍需询盘确认 |
|---:|---|---|---|---|---|
| 12 | Fusible-Alloy Fire Sprinklers | 消防喷头 | `ZSTZ.X 80-[T]°C Y` | `catalog-sprinkler-preview-20260906/source-v2/fusible-alloy-a.jpg`、`fusible-alloy-b.jpg` | 精确螺纹形式、安装方向 |
| 24 | Combination Air Valve | 报警阀及系统装置 | CARX，DN25 / 1 in | `catalog-module-air-valve/source/CARX.png` | 螺纹形式和连接兼容性 |
| 25 | Saddle-Type Waterflow Switches | 报警阀及系统装置 | `ZSJZ-M-1.2` | `catalog-module-waterflow/source/ZSJZ.png` | 管外径、安装尺寸、触点容量、报警流量、复位时间 |
| 29 | Straight-Through and Oblique Landing Valves | 室内消火栓 | Factory Model 未确认 | 交接包 `image57–59.jpeg` | 型号、材质、压力和精确接口 |
| 30 | Horizontal-Handwheel Landing Valves | 室内消火栓 | Factory Model 未确认 | 交接包 `image60–61.jpeg` | 型号、材质、压力和精确接口 |
| 35 | Breeching Inlets | 水泵接合器 | Factory Model 未确认 | 用户提供 2-way/4-way 原图 | 材质、内部结构和最终配置 |
| 37 | Russian-Pattern Fire Department Connection | 水泵接合器 | `65-16K-65` | `catalog-module-flanged-twin-connection/source/user-supplied-product.png` | 法兰尺寸、接口兼容性和安装要求 |
| 40 | Straight-Stream Fire Hose Nozzles | 水带水枪接口 | Factory Model 未确认 | 交接包 `image82–83.png` | 最终配置 |
| 41 | Lever-Operated Fire Hose Nozzles | 水带水枪接口 | 选型参考 DN-010 至 GN-020，不作为工厂型号 | 交接包 `image84–85.png` | 按选型号和入口尺寸询价 |

### 技术参考，不建立商品页

- p14 `Glass Bulb Temperature Identification`：作为喷头温度和玻璃球颜色参考内容，不作为独立 SKU 或产品详情页。

## 暂缓新增产品

| 图册页 | 产品 | 暂缓原因 |
|---:|---|---|
| 32 | Oblique Outlet Fire Hose Valves | 图片为供应商目录或重建展示图，缺少官网使用权与工厂原图 |
| 33 | Right-Angle Fire Hose Valves | 图片为供应商目录或重建展示图，缺少官网使用权与工厂原图 |
| 34 | Horizontal Landing Valves | 图片为供应商目录或重建展示图，缺少官网使用权与工厂原图 |
| 36 | Two-Way Fire Department Connections | 图片为供应商目录或重建展示图，缺少官网使用权与工厂原图 |
| 44 | Two-Way Fire Hose Distributors | 图片为供应商目录或重建展示图，接口兼容性也需确认 |
| 45 | Fire Equipment Cabinets | 图片权利、材质、板厚、安装方式和内部配置均未确认 |
| 46 | Hose & Extinguisher Cabinets | 图片权利、材质、板厚、安装方式和内部配置均未确认 |

## 冲突处理规则

1. CARX 使用最新确认的下口 DN25 / 1 in、上口 1½ in；旧说明书接口不发布，也不猜测修正后的螺纹制式。
2. 图册 p32–p34 阀体材质按用户确认记录为球墨铸铁，但铜色展示图不能作为材质证据，正式页面等待工厂原图。
3. p9 K202 普通喷头与 p10 ESFR 分开，不因 K 系数相同认定为 ESFR。
4. 蝶阀旧资料中的 S/W 后缀冲突未解决，官网按连接方式和尺寸表达。
5. 预作用阀照片上的 ZSFZ 标记不作为预作用系统认证或型号证明。
6. 交接包没有逐 SKU 有效认证文件，不增加认证标志或合规承诺。

## 后续小批次

1. [x] **CATWEB-002**：建立“有证据规格产品”的共享英阿模板和数据校验规则。
2. [x] **CATWEB-003**：用 p12 易熔合金消防喷头制作首个新增产品样板。
3. [x] 样板只检查英阿互切、分类入口、图库、放大、桌面/手机布局和快速构建。
4. [x] **CATWEB-004**：标准响应消防喷头按 p6 的 v11 正式型号表完成英阿共享数据对齐。
5. [ ] 按分类继续逐款升级；每个分类独立提交。
6. [ ] 最终只做一次全站构建与浏览器回归。

CATWEB-003 的实施与验收记录见 `docs/execution/2026-09-08_fusible-alloy-fire-sprinkler-sample.md`。
CATWEB-004 的实施与验收记录见 `docs/execution/2026-09-08_standard-response-v11-alignment.md`。

## 来源

- `D:/work/codex/yunying/outputs/catalog-consolidated-20260907/website-handoff/website-handoff-v11-20260908.md`
- `D:/work/codex/yunying/outputs/catalog-consolidated-20260907/website-handoff/website-handoff-v11-20260908.json`
- `D:/code/ai-code/site-src/_data/productDirectory.js`
