# MIG-703 印尼式湿式消火栓多语言迁移

本轮只处理多语言与共享模板迁移，不重新核对或修改产品参数。

## 页面与数据

- 英文地址：`products/室外消防栓/indonesian-pattern-hydrant.html`
- 阿文地址：`ar/products/indonesian-pattern-hydrant/index.html`
- 共享数据：`site-src/_data/preserved-products/indonesian-pattern-hydrant.json`
- 阿文文案：`site-src/content/products/ar/indonesian-pattern-hydrant.json`
- 共享模板：`site-src/_includes/product-series/outdoor-hydrant.njk`
- 原英文基线：`tools/fixtures/indonesian-pattern-hydrant-en-baseline.txt`

## 保留内容

- 英文可见文字、区块顺序、样式和询盘链接保持迁移前一致。
- 保留正面图和细节图两张图库图片及切换、箭头、滑动和放大交互。
- 保留 5 行配置表、4 项可选配置及 2 条定制说明。
- 阿文详情页成为正式路由，分类图片与文字入口进入同语言详情页。

## 验收结果

| 检查 | 结果 |
| --- | --- |
| 快速全站构建、92 个正式输出、SEO、导航与断链检查 | PASS |
| 英文原文、结构、图片、配置行数和询盘链接基线比对 | PASS |
| 文件预览：桌面/手机 × 英/阿定向交互 | PASS |
| HTTP 预览：桌面/手机 × 英/阿定向交互 | PASS |
| 分类入口、语言互切、刷新、返回、图库、配置和可选项锚点 | PASS |
| 英文 LTR、阿文 RTL 与桌面/手机布局 | PASS |

验证证据位于 `docs/evidence/focused/indonesian-pattern-hydrant/file/` 和 `docs/evidence/focused/indonesian-pattern-hydrant/http/`。

## 下一项

下一项为 MIG-704 俄式地上消火栓，继续只处理多语言。MIG-905 和 MIG-210 保持暂停。
