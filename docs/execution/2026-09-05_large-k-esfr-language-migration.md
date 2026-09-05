# MIG-208 大流量系数与 ESFR 喷头多语言迁移

英阿详情共用一份产品数据和系列模板，保留原英文内容、两组共 12 行型号、7 张原图、原水印及版式。大流量喷头和 ESFR 仍分成两张表，各 6 行，没有合并技术分类。

## 维护入口

- 数据：`site-src/_data/preserved-products/large-k-factor-esfr-sprinklers.json`
- 阿文：`site-src/content/products/ar/large-k-factor-esfr-sprinklers.json`
- 模板：`site-src/_includes/product-series/large-k-esfr.njk`
- 页面：`products/消防喷头/large-k-factor-esfr-sprinklers.html` 和 `ar/products/large-k-factor-esfr-sprinklers/index.html`

原英文快照版本 `ada3095`，保存在 `tools/fixtures/large-k-factor-esfr-sprinklers-en-baseline.txt`。型号只维护一次，分组通过索引引用；翻译不重复维护数值。

## 验收

| 检查 | 结果 |
| --- | --- |
| 快速全站构建、73 个页面、44 个产品返回路径 | PASS |
| 原文、12 行型号及组别、图片、DOM、原样式和询盘链接 | PASS |
| 文件与 HTTP 预览，各 4 组桌面/手机英阿场景 | PASS |
| 分类图片/文字入口、互切、刷新、返回、七张图库与放大/滑动 | PASS |
| 两张型号表行数、第二表可见性、页面无横向溢出 | PASS |
| 阿文桌面图库与手机两张型号表截图复核 | PASS |

证据：`docs/evidence/focused/large-k-factor-esfr-sprinklers/{file,http}/`，每种预览 12 张截图。手机表格沿用可横向滚动布局。

多表验证现在统计所有表体，检查分组索引完整且顺序不变；不再只数第一张表。全站回归已加入本款七图和双表测试，留到 MIG-209 执行。未翻译产品回退测试改为从路由中选择实际未迁移产品，避免继续引用已经完成的喷头。

按 task-executor、chuanwei-fire-product-page、docs-write、dev-workflow 执行；只迁移多语言，MIG-905 继续暂停，首页和原图文件未改，无推送或部署。下一项 MIG-209 喷头分类收尾及全站浏览器回归。
