# MIG-401 手柄沟槽式蝶阀多语言迁移

英阿详情共用产品数据和蝶阀系列模板，保留原英文、7 行型号、单张主图、询盘链接和版式。本轮只处理多语言，没有重新核对或修改产品参数。

## 维护入口

- 数据：`site-src/_data/preserved-products/lever-operated-grooved-butterfly-valves.json`
- 阿文：`site-src/content/products/ar/lever-operated-grooved-butterfly-valves.json`
- 模板：`site-src/_includes/product-series/butterfly-valve.njk`
- 原文：`tools/fixtures/lever-operated-grooved-butterfly-valves-en-baseline.txt`，来源版本 `6f04fcd`。

蝶阀模板的数据化范围包括规格表、操作卡、配置说明、型号表和 OEM 卡片，可供后续三款蝶阀复用；当前只接入本产品，不改变其他页面。

## 验收

快速全站构建通过：46 个逻辑路由覆盖 78 个正式页面，其中 63 个 HTML 页面由共享模板生成，保留 15 个待迁移英文详情页。英文主内容、DOM、样式、单张主图、7 行型号和询盘链接与迁移前快照一致。

文件和 HTTP 预览各四组桌面/手机英阿场景通过，包括分类图片/文字入口、同产品互切、刷新、返回、主图放大及三种关闭方式、型号锚点和页脚入口。文件预览的锚点测试改为关闭测试页平滑动画后点击真实链接，避免长页面在地址已更新时被过早判为失败，不影响网站实际滚动效果。

阿文桌面主图和手机型号表已视觉复核，表格滚动限制在卡片内，没有页面级横向溢出。证据位于 `docs/evidence/focused/lever-operated-grooved-butterfly-valves/{file,http}/`。下一项为 MIG-402 手柄对夹式蝶阀。
