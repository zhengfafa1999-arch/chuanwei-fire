# MIG-601 标准室内消火栓多语言迁移

标准室内消火栓已迁移至中立产品数据、英阿文案和新的室内消火栓共享模板。迁移只处理多语言；原英文参数、图片、询盘链接和版式保持不变。

## 实施结果

- 英文地址：`products/室内消防栓/standard-indoor-hydrant.html`
- 阿文地址：`ar/products/standard-indoor-hydrant/index.html`
- 共享数据：`site-src/_data/preserved-products/standard-indoor-hydrant.json`
- 阿文文案：`site-src/content/products/ar/standard-indoor-hydrant.json`
- 共用模板：`site-src/_includes/product-series/indoor-hydrant.njk`
- 英文基线：`tools/fixtures/standard-indoor-hydrant-en-baseline.txt`

保留 1 行型号、7 张图库图片、10 项系列信息、3 条选型说明及 4 个 OEM/ODM 项目。共享模板的数据化图库、规格、型号及 OEM 区可供后续室内消火栓复用；没有新增或重新判断产品参数。

## 验收结果

| 检查 | 结果 |
| --- | --- |
| 全站快速构建、86 个正式输出、SEO、导航与断链检查 | PASS |
| 英文结构、可见文字、7 张图片、样式、询盘地址及 1 行型号保持 | PASS |
| 文件预览：4 个桌面/手机 × 英/阿单款交互场景 | PASS |
| HTTP 预览：4 个桌面/手机 × 英/阿单款交互场景 | PASS |
| 分类图片/文字入口、英阿互切、刷新、返回及三种页脚返回 | PASS |
| 七图缩略图/箭头/放大、阿文 RTL、桌面与手机布局 | PASS |

证据位于 `docs/evidence/focused/standard-indoor-hydrant/file/` 和 `docs/evidence/focused/standard-indoor-hydrant/http/`。

## 下一项

下一项为 MIG-602 出口型斜式消火栓阀，继续只处理多语言。MIG-905 和 MIG-210 保持暂停。
