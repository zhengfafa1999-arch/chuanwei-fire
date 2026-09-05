# MIG-304 重型消防软管卷盘多语言迁移

英阿详情共用产品数据和系列模板，保留原英文、6 行型号、单张主图及原版式。原页面没有图库，本次未增加图片或修改产品参数。

## 维护入口

- 数据：`site-src/_data/preserved-products/heavy-duty-fire-hose-reel.json`
- 阿文：`site-src/content/products/ar/heavy-duty-fire-hose-reel.json`
- 模板：`site-src/_includes/product-series/heavy-duty-hose-reel.njk`
- 原文：`tools/fixtures/heavy-duty-fire-hose-reel-en-baseline.txt`，来源版本 `72ea0fb`。

## 验收

快速全站构建通过：47 个逻辑路由覆盖 77 个发布页面，其中 61 个由共享模板生成，保留 16 个待迁移英文详情页。原文、DOM、样式、单张主图、6 行型号及询盘链接与快照一致。

文件和 HTTP 预览各四组桌面/手机英阿场景全部通过，包括分类图片/文字入口、同产品互切、刷新、返回、单主图放大及三种关闭方式、型号锚点和页脚入口。验证器同时增加单主图产品适配，不会把“没有图库”误判为漏图。

阿文桌面主图与手机型号表已视觉复核，未发现页面级横向溢出。证据在 `docs/evidence/focused/heavy-duty-fire-hose-reel/{file,http}/`。

按 task-executor、chuanwei-fire-product-page 保留现有内容和图片结构；docs-write、dev-workflow 用于记录和本地提交。完整浏览器回归留到 MIG-305 卷盘分类收尾，不推送或部署。
