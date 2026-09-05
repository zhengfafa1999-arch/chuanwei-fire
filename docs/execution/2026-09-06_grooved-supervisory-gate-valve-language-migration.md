# MIG-502 沟槽信号闸阀多语言迁移

沟槽信号闸阀已迁移至中立产品数据、英阿文案和闸阀共享模板。迁移只处理多语言结构，原英文参数、图片、询盘链接及页面版式保持不变。

## 实施结果

- 英文地址：`products/消防阀门/grooved-supervisory-gate-valves.html`
- 阿文地址：`ar/products/grooved-supervisory-gate-valves/index.html`
- 共享数据：`site-src/_data/preserved-products/grooved-supervisory-gate-valves.json`
- 阿文文案：`site-src/content/products/ar/grooved-supervisory-gate-valves.json`
- 共用模板：`site-src/_includes/product-series/gate-valve.njk`
- 英文基线：`tools/fixtures/grooved-supervisory-gate-valves-en-baseline.txt`

保留 6 行型号、1 张主图、12 项系列参数、4 个开关信息卡片、2 条配置说明和 4 个 OEM/ODM 项目。英文页继续由迁移前基线保护；阿文页与英文页共用型号、压力、尺寸和图片数据。

## 验收结果

| 检查 | 结果 |
| --- | --- |
| 全站快速构建、83 个正式输出、SEO、导航与断链检查 | PASS |
| 英文结构、可见文字、图片、样式、询盘地址及 6 行型号保持 | PASS |
| 文件预览：4 个桌面/手机 × 英/阿单款交互场景 | PASS |
| HTTP 预览：4 个桌面/手机 × 英/阿单款交互场景 | PASS |
| 分类图片/文字入口、英阿互切、刷新、返回及三种页脚返回 | PASS |
| 单张主图放大、阿文 RTL、桌面与手机布局 | PASS |

证据位于 `docs/evidence/focused/grooved-supervisory-gate-valves/file/` 和 `docs/evidence/focused/grooved-supervisory-gate-valves/http/`。

## 下一项

下一项为 MIG-503 暗杆闸阀（NRS），继续只处理多语言。MIG-905 和 MIG-210 保持暂停。
