# MIG-203 标准响应消防喷头多语言迁移

标准响应消防喷头使用一份产品数据和一个系列模板生成英文、阿拉伯文详情。英文原文、6 行型号、7 档温度、4 张图库图片及原有版式均保留。本轮只迁移多语言，不重新核对或修改产品参数；MIG-905 继续暂停。

## 维护入口

| 内容 | 文件 |
| --- | --- |
| 产品、英文原文及共享数值 | `site-src/_data/preserved-products/standard-response-fire-sprinkler.json` |
| 阿文文案（118 项） | `site-src/content/products/ar/standard-response-fire-sprinkler.json` |
| 两种语言共用的系列模板 | `site-src/_includes/product-series/standard-response.njk` |
| 英文生成页 | `products/消防喷头/standard-response-fire-sprinkler.html` |
| 阿文生成页 | `ar/products/standard-response-fire-sprinkler/index.html` |

修改数据或文案后运行 `npm run build`。不要分别手改两份语言 HTML；它们是构建结果。产品数据记录原英文基线版本 `f499c3f`，对应快照位于 `tools/fixtures/standard-response-fire-sprinkler-en-baseline.txt`。

## 已接通的语言行为

- 阿文喷头分类的图片和文字入口直接进入此产品阿文详情，不再回退英文。
- 英阿切换保持同一产品；刷新、浏览器返回、分类/目录/首页返回都保留对应语言。
- 原有图库 DOM 和英文样式不变。共享脚本读取当前语言的图片标题及说明，覆盖四张缩略图、前后翻页、循环、滑动和放大。
- 阿文图库按 RTL 调整箭头位置、方向和缩略图文字对齐，不改原图。
- 型号、K 系数、温度和分数接口尺寸从共享数据取得，阿文使用方向隔离，避免数值与单位被拆开排列。
- canonical、英阿 hreflang、分享图片和站点地图随路由生成。

共享单位方向修复同步影响雨淋阀阿文页两处：`4–70 °C` 和 `DN65 / 2½ in`。只合并显示方向范围，文字和数值没有变化。首页、其他产品图片及英文参数没有改动。

## 回归保护

`tools/validate-preserved-products.mjs` 比较迁移前后的英文主内容、标签/类名顺序、原样式列表、图片顺序、型号行数及询盘地址。新增图库动态标题、图片说明和路径检查，并保护阿文温度/分数尺寸的连续显示。

`tools/browser-standard-response.mjs` 检查桌面和手机、英阿两种语言：分类图片/文字入口、同产品互切、刷新、四张图库、阿文标题/说明、前后循环、双向滑动、图片放大、Escape/关闭按钮/背景关闭、图库高度、型号锚点和三个页脚返回入口。截图等待滚动实际到位，不使用固定时间估计。

保留未翻译产品的回退测试，其样本改为下一项 MIG-204 玻璃球快速响应喷头。

## 验收结果

| 检查 | 结果 |
| --- | --- |
| 构建、68 个正式页面、SEO、39 个产品返回路径 | PASS |
| 英文原文、6 行型号、7 档温度、图片、动态图库说明、原样式/DOM 顺序 | PASS |
| 文件与 HTTP 预览，各 54 个代表页面/视口组合 | PASS |
| 文件与 HTTP 预览，各 272 个全站响应式与方向检查 | PASS |
| 文件与 HTTP 预览，各 54 个语言/返回场景 | PASS |
| 标准响应图库操作、放大、型号锚点及桌面/手机截图复核 | PASS |

证据位于 `docs/evidence/mig-203/2026-09-05-file/` 和 `docs/evidence/mig-203/2026-09-05-http/`，包含结果 JSON、截图及复核摘要。使用 `SITE_BROWSER_EVIDENCE_DIR` 指定目录后运行 `node tools/validate-browser.mjs --file-preview` 或 `node tools/validate-browser.mjs` 可复核。

初轮测试修正了新增图库断言数量；截图改为等待实际滚动到位。旧阀门回归出现过关闭弹窗与锚点滚动相互干扰，已在测试中分离弹窗和锚点场景、重置起始滚动位置，并保留最终位置断言；没有为此修改产品页面。

## 流程边界

按照 task-executor 和 chuanwei-fire-product-page skill 记录原页内容并验证图片、型号及交互；依据用户当前范围，不执行产品参数审核或重新设计。文档按 docs-write 流程整理；附带样式指南和本地 Prettier 不可用，沿用项目文档格式并检查差异。按 dev-workflow 及此前用户授权单独本地提交，不推送、不部署。

下一项为 MIG-204 玻璃球快速响应喷头，继续只迁移多语言。
