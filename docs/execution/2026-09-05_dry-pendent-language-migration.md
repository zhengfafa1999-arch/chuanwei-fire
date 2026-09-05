# MIG-206 干式下垂喷头多语言迁移

干式下垂喷头已由共享数据及系列模板生成英阿详情，保留原英文参数、文案、4 行型号、4 张照片、原版式与水印。未修改首页、图片文件、询盘内容或其他产品参数；MIG-905 仍暂停。

## 维护入口

- 数据：`site-src/_data/preserved-products/dry-pendent-fire-sprinklers.json`
- 阿文：`site-src/content/products/ar/dry-pendent-fire-sprinklers.json`
- 模板：`site-src/_includes/product-series/dry-pendent.njk`
- 页面：`products/消防喷头/dry-pendent-fire-sprinklers.html` 与 `ar/products/dry-pendent-fire-sprinklers/index.html`

原始快照来自 `afff8a0`，保存在 `tools/fixtures/dry-pendent-fire-sprinklers-en-baseline.txt`。修改共享数据或翻译后构建，不手改生成页面。

## 实现与验证

原页水印为内联样式，现保存在该产品的数据中，由共享页面按需输出；没有启用此字段的其他页面输出不变。验证同时对照原始样式，确保水印没有丢失或重画。

| 检查 | 结果 |
| --- | --- |
| 全站快速构建、71 个页面、42 个产品返回路径 | PASS |
| 英文原文、4 行型号、图片、DOM、原样式及询盘链接 | PASS |
| 文件与 HTTP，各 4 组桌面/手机英阿场景 | PASS |
| 分类图片/文字入口、同商品互切、刷新及返回 | PASS |
| 全部图库、动态说明、放大/关闭、循环/滑动、锚点、页脚返回 | PASS |
| 阿文桌面图库水印、手机型号表视觉复核 | PASS |

手机型号表沿用横向滚动结构，未改列内容。证据位于 `docs/evidence/focused/dry-pendent-fire-sprinklers/{file,http}/`。已将本款交互场景加入分类收尾回归，但本款未重复运行全站浏览器矩阵。

按 task-executor、chuanwei-fire-product-page、docs-write 和 dev-workflow 执行，以用户仅多语言范围优先。不推送、不部署。下一项 MIG-207 扩大覆盖快速响应喷头。
