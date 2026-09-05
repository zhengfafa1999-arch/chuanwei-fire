# MIG-105 报警阀分类页语言入口收尾

报警阀分类的四类产品已完成英阿入口验收。本轮没有发现需要修复的页面链接；分类、详情、首页、参数、图片和布局均保持原状，只增加回归检查和验收证据。

## 已验收的范围

| 产品 | 英文详情 | 阿文详情 |
| --- | --- | --- |
| 湿式报警阀 | `products/消防阀/wet-alarm-check-valve-assemblies.html` | `ar/products/wet-alarm-check-valve/index.html` |
| 隔膜式雨淋阀 | `products/消防阀/diaphragm-deluge-valves.html` | `ar/products/diaphragm-deluge-valves/index.html` |
| 预作用阀组 | `products/消防阀/preaction-valve-assemblies.html` | `ar/products/preaction-valve-assemblies/index.html` |
| 干式报警阀 | `products/消防阀/dry-pipe-alarm-valves.html` | `ar/products/dry-pipe-alarm-valves/index.html` |

分类地址仍为 `products/消防阀.html` 和 `ar/products/system-valves/index.html`，共用 `site-src/category-page.njk`。四个产品在两种语言下都已发布，没有回退至英文页的状态或提示。

## 本轮增加的保护

- `tools/validate-listings.mjs`：固定检查当前四类报警阀、八张本地化卡片、十六个图片及文字链接；防止只修对图片链接，却留下错误文字链接，也防止已翻译产品重新回退。
- `tools/browser-system-valves.mjs`：独立的报警阀分类导航测试模块，不读取或判断产品技术参数。
- `tools/validate-browser.mjs`：接入以上导航测试，增加英阿分类页截图和验收记录。

新增浏览器检查覆盖首页及产品总目录到分类页、分类双向切换和刷新；逐个点击产品图片及文字入口、浏览器返回、同产品双向切换、详情刷新，以及详情页脚返回分类、目录、首页的三个入口。每一步都检查最终网址、产品路由、页面语言、文字方向和当前语言按钮。

## 验收结果

| 检查 | 结果 |
| --- | --- |
| 全站构建、67 个正式输出、SEO 和 38 个产品返回路径 | PASS |
| 四个产品的八张英阿卡片及十六个图片/文字入口 | PASS |
| 文件及 HTTP 预览，各 50 个代表页面/视口组合 | PASS |
| 文件及 HTTP 预览，各 268 个全站响应式与方向检查 | PASS |
| 文件及 HTTP 预览，各 50 个语言/返回场景，其中新增报警阀场景 20 个 | PASS |
| 分类桌面及手机阿文截图目视检查 | PASS |
| 原有产品内容保持检查及图片交互回归 | PASS |
| 页面、数据、图片、样式及站点地图无变更 | PASS |

证据保存于 `docs/evidence/mig-105/2026-09-05-file/` 和 `docs/evidence/mig-105/2026-09-05-http/`。每个目录包含浏览器结果 JSON 和截图。复核可运行 `npm run build`、`node tools/validate-browser.mjs --file-preview`、`node tools/validate-browser.mjs`，用 `SITE_BROWSER_EVIDENCE_DIR` 指定新的证据目录。

## 流程与下一项

按 task-executor 流程完成单项验收并记录计划及 manifest。仅检查语言导航，不重做详情页，不执行参数审核。文档 skill 的附带样式文件及本地格式化工具不可用，沿用已有文档格式。按照此前用户授权建立独立本地提交，不推送、不部署。

依赖 MIG-101 至 MIG-104 均已完成；MIG-105 收尾完成。下一项为 MIG-203 标准响应消防喷头，继续只迁移多语言。MIG-905 内容审核仍暂停。
