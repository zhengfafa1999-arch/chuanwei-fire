# 实拍用于产品卡片与主图库

日期：2026-10-09。本地完成，尚未提交、推送或部署。

用户要求继续官网优化，本轮复查原产品图文件夹及已确认的照片记录。用户回复海外消防栓阀、接口、水枪和器材箱没有其他对应实拍，这些配置继续等待照片，不用国内型式的相似产品代替。

## 本轮实施

- 19个系列、30个主图/图库媒体位置接入28张已确认实拍；沿用640/1600px WebP衍生图。标准、快速、扩大覆盖、易熔合金、K202、干式喷头，蝶阀、闸阀、预作用、雨淋、干式阀和卷盘各自保持配置范围。
- 只替换明确对应的媒体位置。标准喷头三方向实拍分别对应原配置；综合三款图保留。K202照片没有用于ESFR；79°C隐蔽式照片没有套用到68°C；法兰照片没有套用到沟槽。湿式阀现有主图库已有真实照片，本轮不重复替换。
- 原始产品JSON、技术文案、型号表、旧图片及用户源图均保留。新增明确映射层，校验原媒体位置与既有照片来源，生成时替换，不把照片视为新参数依据。
- 目录卡片使用新实拍缩略图，但旧`?view=`参数继续使用原路径；详情页映射到对应的新照片。搜索仍按原配置取型号数据，避免图片路径变化扩大搜索范围。
- 分类卡片移除重复的“Localized page／صفحة مترجمة”内部语言状态标签；确有其他语言跳转或询价入口时仍保留买家提示。
- 已有原图权限记录保留，新授权台账明确列出这次复用照片及SHA256；权限校验继续逐文件执行。保留页面验证只允许此次明确的照片替换，其余结构、媒体、文案、型号表仍受基准保护。

## 验收

完整构建通过：175页、2164张带alt图片、44095个内部引用、724个新窗口链接。89项搜索断言和询盘草稿检查通过；22页/44配置/237项补充字段保持通过。71对产品页334行型号数字一致。

19系列英阿在390和1280px共76次检查无整页横向溢出，首屏照片无加载失败。34个旧配置链接在320px英阿验证对应实拍；标准英文390px、扩大覆盖阿文320px图库切换、放大加载和Escape关闭通过。分类卡片更新后无内部语言状态标签，实拍缩略图正常加载。

按30个媒体位置比较，原图片合计5,462,108字节，新1600px衍生图合计2,768,844字节，减少49.3%。这按引用位置统计，同一图片重复位置可能重复计数，不等于站点总加载节省。

记录：`reviewed-bindings.json`、`source-checks.json`、`layout-checks.json`、`legacy-view-checks.json`、`interaction-checks.json`、`language-tables.json`、`validation-summary.json`。截图：`sprinkler-cards-desktop.png`、`ec-gallery-ar-mobile.png`。

## 当前候选与后续

最新静态候选清单为`docs/release/primary-product-photos-20261009/static-manifest.json`，包为`.tmp/releases/primary-product-photos-20261009-web.zip`。只包含175个公开页面及引用依赖；内部证据与源文件不发布。旧候选仅作历史，原图片本地保留。

PDF继续暂停且字节未变。等待材料的项目为上述配置实拍、缺项矩阵内本型号技术图纸／参数、实际水流指示器微动开关额定值，以及OEM条件／交期安排。商业政策问题已发出；没有收到的政策不新增承诺。上线仍按原计划确认范围并备份服务器实际上一版后进行。

| 系列 | 媒体位置 | 实拍来源 |
| --- | --- | --- |
| standard-response-fire-sprinkler | upright | DSC_5869.jpg |
| standard-response-fire-sprinkler | pendent | DSC_5868.jpg |
| standard-response-fire-sprinkler | sidewall | DSC_5870.jpg |
| glass-bulb-fire-sprinkler | hero | DSC_5839.jpg |
| glass-bulb-fire-sprinkler | upright | DSC_5840.jpg |
| fusible-alloy-fire-sprinklers | hero | DSC_5823.jpg |
| fusible-alloy-fire-sprinklers | configurationB | DSC_5822.jpg |
| extended-coverage-quick-response-fire-sprinkler | hero | DSC_5887.jpg |
| extended-coverage-quick-response-fire-sprinkler | image1 | DSC_5888.jpg |
| extended-coverage-quick-response-fire-sprinkler | image2 | DSC_5889.jpg |
| large-k-factor-esfr-sprinklers | image2 | DSC_5814.jpg |
| large-k-factor-esfr-sprinklers | image3 | DSC_5813.jpg |
| large-k-factor-esfr-sprinklers | image4 | DSC_5816.jpg |
| lever-operated-grooved-butterfly-valves | hero | DSC_5672.jpg |
| lever-operated-wafer-butterfly-valves | hero | DSC_5673.jpg |
| wafer-supervisory-butterfly-valves | hero | DSC_5674.jpg |
| grooved-supervisory-butterfly-valves | hero | DSC_5671.jpg |
| nrs-gate-valves | hero | DSC_5679.jpg |
| osy-gate-valves | hero | DSC_5686.jpg |
| grooved-supervisory-gate-valves | hero | DSC_5681.jpg |
| flanged-supervisory-gate-valves | hero | DSC_5683.jpg |
| preaction-valve-assemblies | flanged | DSC_5732.jpg |
| diaphragm-deluge-valves | flanged | DSC_5728.jpg |
| dry-pipe-alarm-valves | flanged | DSC_5734.jpg |
| straight-stream-fire-hose-reel | hero | DSC_5596.jpg |
| straight-stream-fire-hose-reel | image1 | DSC_5596.jpg |
| jet-spray-fire-hose-reel | hero | DSC_5593.jpg |
| jet-spray-fire-hose-reel | image1 | DSC_5593.jpg |
| dry-pendent-fire-sprinklers | hero | DSC_5779.jpg |
| dry-pendent-fire-sprinklers | image2 | DSC_5774.jpg |
