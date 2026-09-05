# MIG-207 扩大覆盖快速响应喷头多语言迁移

英文及阿拉伯文现由共享数据与系列模板生成。保留英文内容、3 行型号、3 张原图、版式和询盘地址，包括原页尚待提供的工程数据表述，不重新审核参数。

## 维护入口

- 产品数据：`site-src/_data/preserved-products/extended-coverage-quick-response-fire-sprinkler.json`
- 阿文：`site-src/content/products/ar/extended-coverage-quick-response-fire-sprinkler.json`
- 模板：`site-src/_includes/product-series/extended-coverage.njk`
- 页面：`products/消防喷头/extended-coverage-quick-response-fire-sprinkler.html` 和 `ar/products/extended-coverage-quick-response-fire-sprinkler/index.html`

原始英文快照来自 `9d4ac44`，位于 `tools/fixtures/extended-coverage-quick-response-fire-sprinkler-en-baseline.txt`。修改共享数据后构建，不分别手改语言 HTML。

## 验收

| 检查 | 结果 |
| --- | --- |
| 快速全站构建、72 个页面、43 个产品返回路径 | PASS |
| 英文原文、图片、型号、DOM、样式和询盘地址 | PASS |
| 文件和 HTTP 预览，各 4 组桌面/手机英阿场景 | PASS |
| 分类图片及文字入口、互切、刷新、返回、图库全部交互、型号锚点、页脚 | PASS |
| 阿文桌面图库与手机型号表视觉复核 | PASS |

证据位于 `docs/evidence/focused/extended-coverage-quick-response-fire-sprinkler/{file,http}/`。全站浏览器回归留到分类收尾；本款的完整交互已加入该回归。

三图产品暴露了旧测试的固定最低断言数量。现在根据图片数和语言计算精确断言数：英文 `3N+10`，阿文 `5N+18`。每张图片仍执行全部检查，不删减失败断言。

按 task-executor、chuanwei-fire-product-page、docs-write 和 dev-workflow 执行。用户限定仅多语言，MIG-905 继续暂停。首页和图片文件未改，无推送或部署。下一项 MIG-208。
