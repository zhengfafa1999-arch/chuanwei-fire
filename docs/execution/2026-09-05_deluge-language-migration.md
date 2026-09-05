# MIG-102 隔膜式雨淋阀多语言迁移

已将隔膜式雨淋阀接入英阿共享模板。此次只做翻译、语言入口和显示方向；原英文正文、11 行型号、数值、图片、询盘地址及版式保持不变。没有核对产品参数，也没有恢复 MIG-905。

## 维护入口

- 产品与英文内容：`site-src/_data/preserved-products/diaphragm-deluge-valves.json`。
- 阿文文案：`site-src/content/products/ar/diaphragm-deluge-valves.json`。
- 公共页面框架：`site-src/preserved-product.njk`。
- 该系列共享结构：`site-src/_includes/product-series/diaphragm-deluge.njk`。
- 加载与语言映射：`site-src/_data/preservedCatalog.js`。

英文继续使用 `products/消防阀/diaphragm-deluge-valves.html`；阿文输出到 `ar/products/diaphragm-deluge-valves/index.html`。两个 HTML 是构建产物，不需要分别修改。

产品数值保存在共同数据中；阿文用占位符引用，不重复维护。以此防止以后更新型号或数值时遗漏某个语言。显示阶段隔离英文单位和型号的文字方向，SEO 文本不加入方向控制符。

## 保留内容的边界

迁移基线为 `69f59bd`。英文原页快照保存在 `tools/fixtures/diaphragm-deluge-en-baseline.txt`，只供回归对照，不是公开页面或参数证据。

自动检查比较英文可见正文、型号表行数、两种语言的图片路径、标签和样式类顺序；也比较英文页头、页脚和社交按钮顺序及询盘链接。原图库脚本提取为共享文件，仅增加阿文滑动方向处理并沿用本地化图片说明。

分类卡片通过路由表自动改为阿文产品入口。首页、其他产品参数、图片文件、全站样式均未修改。没有新增产品规格或认证结论；现有英文声明只作等义翻译。

## 验收

| 检查 | 结果 |
| --- | --- |
| 全站构建、65 页路由与 SEO、36 个详情返回路径 | PASS |
| 英文正文、11 行型号、图片和页面结构对照 | PASS |
| 阿文完整文案、共享数值与单位方向 | PASS |
| 文件与 HTTP 预览，各 42 个代表页面/视口组合 | PASS |
| 文件与 HTTP 预览，各 260 个响应式与方向检查 | PASS |
| 文件与 HTTP 预览，各 26 个语言切换及返回场景 | PASS |
| 雨淋阀英阿、桌面与手机图库切换、缩略图、放大、Escape 关闭、滑动 | PASS |

浏览器证据位于 `docs/evidence/mig-102/2026-09-05-file/` 和 `docs/evidence/mig-102/2026-09-05-http/`。已目视检查英阿桌面和阿文手机截图；英文单位保持从左到右显示。

可重复运行：`npm run build`、`npm run validate:preserved`、`node tools/validate-browser.mjs --file-preview` 和 `node tools/validate-browser.mjs`。浏览器证据目录可用 `SITE_BROWSER_EVIDENCE_DIR` 指定。

## 后续

下一个任务为 MIG-103 预作用阀组，继续沿用原英文内容。当前尚有 28 个英文详情待迁移。本次单独提交，不推送、不部署。

执行沿用 task-executor 的单任务交付与验收，以及产品页 skill 的结构和图库检查；按用户最新范围跳过技术参数资料审核。文档 skill 的附带样式文件不存在，沿用项目现有格式。
