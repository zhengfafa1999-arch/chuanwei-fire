# MIG-303 直流/喷雾软管卷盘多语言迁移

英阿详情共用数据和系列模板，保留原英文、9 行型号、主图、一张实物图库照片及版式。没有增加照片或改动参数。

## 维护入口

- 数据：`site-src/_data/preserved-products/jet-spray-fire-hose-reel.json`
- 阿文：`site-src/content/products/ar/jet-spray-fire-hose-reel.json`
- 模板：`site-src/_includes/product-series/jet-spray-hose-reel.njk`
- 原文：`tools/fixtures/jet-spray-fire-hose-reel-en-baseline.txt`，来源版本 `3e2f239`。

## 验收

快速全站构建通过：76 个发布页面、47 个产品返回路径。原文、DOM、样式、两张照片引用、型号数及询盘链接均与快照一致。

文件和 HTTP 预览各四组桌面/手机英阿场景全部通过，包括分类图片/文字入口、同产品互切、刷新、返回、图库说明及页码方向、放大和三种关闭方式、箭头和滑动、型号锚点及三个页脚入口。单图图库的箭头和滑动保持原图，不虚构额外图片。

复核阿文桌面图库及手机型号表截图。证据在 `docs/evidence/focused/jet-spray-fire-hose-reel/{file,http}/`，每种预览八张截图。

按 task-executor、chuanwei-fire-product-page 保留内容并验收，docs-write、dev-workflow 用于记录和本地提交。完整浏览器回归留到卷盘分类收尾，不推送或部署。下一项 MIG-304 重型软管卷盘。
