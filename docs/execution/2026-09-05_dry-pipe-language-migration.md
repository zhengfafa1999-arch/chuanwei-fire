# MIG-104 干式报警阀多语言迁移

干式报警阀已接入共享英阿模板。英文原文、3 行型号、10 项配套清单、原产品图片和版式保留；只增加阿文翻译、同产品语言入口和文字方向处理。没有开展参数审核，没有修改首页或其他产品内容。

## 后续修改这些源文件

- 产品与英文内容：`site-src/_data/preserved-products/dry-pipe-alarm-valves.json`。
- 阿文翻译：`site-src/content/products/ar/dry-pipe-alarm-valves.json`。
- 系列结构：`site-src/_includes/product-series/dry-pipe.njk`。
- 公共框架与数据加载：`site-src/preserved-product.njk`、`site-src/_data/preservedCatalog.js`。

英文输出仍为 `products/消防阀/dry-pipe-alarm-valves.html`；阿文输出为 `ar/products/dry-pipe-alarm-valves/index.html`。两份 HTML 都是自动生成结果，不要分别修改。型号及纯技术值保存在共同产品数据中，104 项可翻译文案通过占位符引用数字，不在译文中重复保存数值。

唯一产品图片仍是 `products/消防阀/dry-pipe-alarm-valves/dry-pipe-alarm-valve-flanged.jpg`。没有修改、生成或替换图片；继续使用单图放大，不新增轮播。

## 保持原页的检查

以提交 `1529479` 的英文页为基线，保存快照 `tools/fixtures/dry-pipe-alarm-valves-en-baseline.txt`。快照仅用于回归比较，不代表参数重新确认。

自动比较英文可见正文、型号行数、原图路径、标签及样式类顺序、原样式表、页脚和社交按钮位置、询盘地址。原页的技术描述和待确认项目按原意翻译，没有补充或删改技术结论。

阿文分类卡片只更新干式报警阀的语言目标和已翻译状态。路由及站点地图建立同产品 EN/AR 对应关系，文件预览链接明确指向 `index.html`。

共享方向处理增加对冒号的支持，让比例值保持连续的从左到右文本，不拆开比例两端。新增比例回归检查；没有改变任何比例数值，之前已迁移的产品输出也没有变化。

## 验收结果

| 检查 | 结果 |
| --- | --- |
| 全站构建、67 页路由与 SEO、38 个详情返回路径 | PASS |
| 干式报警阀、预作用阀组、雨淋阀英文内容、图片、结构、样式表基线对照 | PASS |
| 阿文文案完整、数值占位符一致、型号/单位/比例方向隔离 | PASS |
| 文件与 HTTP 预览，各 50 个代表页面/视口组合 | PASS |
| 文件与 HTTP 预览，各 268 个全站响应式与方向检查 | PASS |
| 文件与 HTTP 预览，各 30 个语言与返回场景 | PASS |
| 干式报警阀英阿、桌面与手机单图放大、Escape/按钮/遮罩关闭、3 行型号及型号锚点 | PASS |
| 原有预作用阀组图片交互、雨淋阀图库回归 | PASS |

已目视检查英文和阿文桌面、阿文手机首屏与型号表截图。手机型号表沿用可横向滚动容器，不撑开整页。证据位于 `docs/evidence/mig-104/2026-09-05-file/` 和 `docs/evidence/mig-104/2026-09-05-http/`。

复核命令：`npm run build`、`npm run validate:preserved`、`node tools/validate-browser.mjs --file-preview`、`node tools/validate-browser.mjs`。用 `SITE_BROWSER_EVIDENCE_DIR` 指定证据目录。

## 范围与后续

遵循 task-executor 的单任务交付、产品页 skill 的原结构与图片交互检查；按用户要求只做多语言，不执行额外参数资料审核。文档 skill 的附带样式文件及本地格式化工具不可用，沿用项目已有格式。

本轮独立提交，不推送、不部署。下一项为 MIG-105 报警阀分类页语言入口收尾；MIG-905 仍暂停。全站现有 67 个正式 HTML，其中 41 个由共享模板生成，26 个英文详情页尚待迁移。
