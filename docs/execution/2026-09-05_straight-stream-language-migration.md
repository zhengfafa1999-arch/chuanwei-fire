# MIG-302 直流型软管卷盘多语言迁移

英阿详情共用产品数据、数值及系列模板。原英文内容、9 行型号、一张主图、两张细节照片及版式保持不变，不审核或调整参数。

## 维护入口

- 数据：`site-src/_data/preserved-products/straight-stream-fire-hose-reel.json`
- 阿文：`site-src/content/products/ar/straight-stream-fire-hose-reel.json`
- 模板：`site-src/_includes/product-series/straight-stream-hose-reel.njk`
- 原文快照：`tools/fixtures/straight-stream-fire-hose-reel-en-baseline.txt`，来源 `c1f8b6f`。

## 验收结果

| 检查 | 结果 |
| --- | --- |
| 快速全站构建、75 个页面、46 个产品返回路径 | PASS |
| 原文、DOM、样式、照片、9 行型号及询盘链接一致 | PASS |
| 文件和 HTTP，各四组桌面/手机英阿交互 | PASS |
| 分类图片/文字入口、互切、刷新、返回、三个页脚入口 | PASS |
| 两图说明、放大、关闭、箭头、循环与滑动 | PASS |
| 阿文桌面图库与手机型号表截图复核 | PASS |

证据：`docs/evidence/focused/straight-stream-fire-hose-reel/{file,http}/`，每种预览八张截图。

截图复核发现共享卷盘图库更新页码后，阿文会把数字顺序显示成总数在前。现在为页码明确设置 LTR，新增方向断言，避免只检查文本值而漏掉显示方向。直流型和受影响的 RIA 25 均重新通过文件/HTTP 单款验收，RIA 25 证据已更新。未改变照片或图库版式。

本款已纳入分类收尾时运行的完整回归。本轮未重复全站浏览器检查，未推送或部署。

按 task-executor、chuanwei-fire-product-page 保留内容并验收，按 docs-write、dev-workflow 记录与本地提交。下一项 MIG-303 喷雾型软管卷盘。
