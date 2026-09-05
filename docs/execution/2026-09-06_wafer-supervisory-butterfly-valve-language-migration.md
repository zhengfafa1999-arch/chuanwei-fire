# MIG-404 信号对夹式蝶阀多语言迁移

英文与阿拉伯文详情共用产品数据和蝶阀系列模板，保留迁移前英文、3 行型号、单张主图、询盘链接及页面版式。本轮只处理多语言，不重新核对或修改产品参数。

## 维护入口

- 数据：`site-src/_data/preserved-products/wafer-supervisory-butterfly-valves.json`
- 阿文：`site-src/content/products/ar/wafer-supervisory-butterfly-valves.json`
- 模板：`site-src/_includes/product-series/butterfly-valve.njk`
- 原文：`tools/fixtures/wafer-supervisory-butterfly-valves-en-baseline.txt`，来源版本 `eb1f8b2`。

本款复用 MIG-403 已完成的数据化技术说明、侧栏标题和操作卡结构；四款蝶阀仍使用各自数据和阿文文案，未复制维护多份 HTML 页面。

## 验收

快速全站构建通过：46 个逻辑路由注册 81 个正式页面；导航检查覆盖 52 条产品返回路径和 12 个显式语言回退；34 个英阿保留型详情输出通过原文、结构、图片、型号数和数值一致性校验。

文件和 HTTP 预览各四组桌面/手机英阿场景通过，包括分类图片与文字入口、同产品互切、刷新和返回、主图放大及关闭方式、3 行型号表、型号锚点和手机布局。阿文桌面主图与手机型号表已视觉复核。证据位于 `docs/evidence/focused/wafer-supervisory-butterfly-valves/{file,http}/`。下一项为 MIG-405 消防蝶阀分类页收尾。
