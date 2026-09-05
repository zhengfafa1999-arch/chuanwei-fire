# MIG-701 BS 750 柱式消火栓多语言迁移

本轮只处理多语言与共享模板迁移，不重新核对或修改产品参数。

## 页面与数据

- 英文地址：`products/室外消防栓/bs750-pillar-hydrant.html`
- 阿文地址：`ar/products/bs750-pillar-hydrant/index.html`
- 共享数据：`site-src/_data/preserved-products/bs750-pillar-hydrant.json`
- 阿文文案：`site-src/content/products/ar/bs750-pillar-hydrant.json`
- 共享模板：`site-src/_includes/product-series/outdoor-hydrant.njk`
- 原英文基线：`tools/fixtures/bs750-pillar-hydrant-en-baseline.txt`

## 保留内容

- 英文可见文字、页面区块、样式和询盘链接保持迁移前一致。
- 保留正面图和多角度图两张图库图片及切换、箭头、滑动和放大交互。
- 保留 14 项系列规格、2 条连接说明和 5 行配置表。
- 阿文详情页成为正式路由，分类图片与文字入口进入同语言详情页。

## 验收结果

| 检查 | 结果 |
| --- | --- |
| 快速全站构建、90 个正式输出、SEO、导航与断链检查 | PASS |
| 英文原文、结构、图片、配置行数和询盘链接基线比对 | PASS |
| 文件预览：桌面/手机 × 英/阿定向交互 | PASS |
| HTTP 预览：桌面/手机 × 英/阿定向交互 | PASS |
| 分类图片/文字入口、语言互切、刷新、返回与页脚返回 | PASS |
| 两图图库、标题、本地化替代文本、箭头循环、滑动与放大 | PASS |
| 英文 LTR、阿文 RTL 与桌面/手机布局 | PASS |

验证证据位于 `docs/evidence/focused/bs750-pillar-hydrant/file/` 和 `docs/evidence/focused/bs750-pillar-hydrant/http/`。

## 下一项

下一项为 MIG-702 法式地上消火栓，继续只处理多语言。MIG-905 和 MIG-210 保持暂停。
