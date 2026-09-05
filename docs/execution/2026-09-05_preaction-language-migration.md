# MIG-103 预作用阀组多语言迁移

预作用阀组已接入共享英阿模板。英文原文、9 行型号、原产品图片和版式保留；只增加阿文翻译、同产品语言入口和文字方向处理。没有开展参数审核，没有修改首页或其他产品内容。

## 修改时使用这些源文件

- 产品与英文内容：`site-src/_data/preserved-products/preaction-valve-assemblies.json`。
- 阿文翻译：`site-src/content/products/ar/preaction-valve-assemblies.json`。
- 系列结构：`site-src/_includes/product-series/preaction.njk`。
- 公共框架与数据加载：`site-src/preserved-product.njk`、`site-src/_data/preservedCatalog.js`。

英文输出仍为 `products/消防阀/preaction-valve-assemblies.html`；阿文输出为 `ar/products/preaction-valve-assemblies/index.html`。两份 HTML 均是自动生成结果，不要分别修改。数值和型号保存在共同产品数据中，译文通过占位符引用数值。

唯一产品图片继续使用 `products/消防阀/preaction-valve-assemblies/preaction-valve-assembly-watermarked.jpg`，没有修改、生成或替换图片。原页只有单图放大，迁移不增加轮播。共用图库脚本兼容无图库节点的单图页面，保留雨淋阀的原图库行为。

## 保持原页的检查

以提交 `7f6fbce` 的英文页为基线，保存快照 `tools/fixtures/preaction-valve-assemblies-en-baseline.txt`。该快照仅用于回归比较，不是产品参数确认文件。

自动比较英文可见正文、型号行数、原图路径、标签及样式类顺序、页脚和社交按钮位置、询盘地址；本轮增加原英文样式表列表检查。公共框架允许产品指定原样式表，因此没有把雨淋阀专用样式引入预作用阀组。

原页中待确认的数据保持原意翻译；没有自行补充压力、材质、认证或其他产品结论。阿文分类卡片只改变语言目标和已翻译状态，其他产品保持原有入口。

## 验收结果

| 检查 | 结果 |
| --- | --- |
| 全站构建、66 页路由与 SEO、37 个详情返回路径 | PASS |
| 预作用阀组与雨淋阀英文内容、图片、结构、样式表基线对照 | PASS |
| 阿文文案完整、数值占位符一致、型号及单位方向隔离 | PASS |
| 文件与 HTTP 预览，各 46 个代表页面/视口组合 | PASS |
| 文件与 HTTP 预览，各 264 个全站响应式与方向检查 | PASS |
| 文件与 HTTP 预览，各 28 个语言与返回场景 | PASS |
| 预作用阀组英阿、桌面与手机单图放大、Escape/按钮/遮罩关闭、型号锚点 | PASS |
| 现有雨淋阀两种语言的箭头、缩略图、放大和滑动回归 | PASS |

已目视检查英文和阿文桌面、阿文手机及型号表截图。证据位于 `docs/evidence/mig-103/2026-09-05-file/` 和 `docs/evidence/mig-103/2026-09-05-http/`。

复核命令：`npm run build`、`npm run validate:preserved`、`node tools/validate-browser.mjs --file-preview`、`node tools/validate-browser.mjs`。用 `SITE_BROWSER_EVIDENCE_DIR` 指定证据目录。

## 范围与后续

遵循 task-executor 的单任务交付、产品页 skill 的原结构与图片交互检查；用户明确要求只做多语言，因此不执行额外参数资料审核。文档 skill 的附带样式文件及格式化工具仍不可用，沿用项目已有格式。

本轮独立提交，不推送、不部署。下一项为 MIG-104 干式报警阀；MIG-905 仍暂停。
