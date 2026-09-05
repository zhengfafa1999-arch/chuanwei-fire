# MIG-301 RIA 25 软管卷盘多语言迁移

英文和阿文详情共用产品数据与模板，原英文内容、三行型号、一张主图、三张图库照片及版式保持不变。本轮不审核或调整产品参数。

## 维护入口

- 产品数据：`site-src/_data/preserved-products/ria25-fire-hose-reel.json`
- 阿文：`site-src/content/products/ar/ria25-fire-hose-reel.json`
- 模板：`site-src/_includes/product-series/ria25-hose-reel.njk`
- 原文快照：`tools/fixtures/ria25-fire-hose-reel-en-baseline.txt`，来源版本 `c090ae8`。

翻译通过占位符引用原始数值，不单独维护压力、长度等参数。图库仍使用原有卷盘布局，图片不编辑、不生成。

## 验收

| 检查 | 结果 |
| --- | --- |
| 全站构建、74 个发布页面、45 个产品返回路径 | PASS |
| 原英文文字、DOM、样式、图片及询盘链接一致 | PASS |
| 文件与 HTTP，各四组桌面/手机英阿检查 | PASS |
| 分类图片/文字入口、互切、刷新、后退及页脚返回 | PASS |
| 三张图库说明、放大、三种关闭、箭头、循环与滑动 | PASS |
| 手机型号表、桌面阿文图库截图复核 | PASS |

证据在 `docs/evidence/focused/ria25-fire-hose-reel/{file,http}/`，每种预览八张截图。手机表格沿用可横向滚动布局。

文件预览的早期两次检查出现手机图库锚点超时，第三次通过。随后增加实际图片解码就绪等待，文件及 HTTP 再次全部通过；未放宽定位容差，也未改页面滚动逻辑。失败时现在输出位置与加载状态，便于后续定位。此现象不能仅凭重测断言为页面缺陷。

单款验收适配原有卷盘图库，保持与喷头相同的交互检查数量；分类从产品路由读取。全站回归已加入本款，按用户约定留至卷盘分类收尾执行。

使用 task-executor、chuanwei-fire-product-page 保留内容与验收流程；docs-write 和 dev-workflow 用于记录与按任务本地提交。项目无可用的共享文档风格文件及本地 Prettier，沿用现有 Markdown 格式并检查差异。没有推送或部署。下一项 MIG-302 直流型软管卷盘。
