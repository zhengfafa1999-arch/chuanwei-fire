# MIG-602 出口型斜式消火栓阀多语言迁移

出口型斜式消火栓阀已迁移至中立产品数据、英阿文案和室内消火栓共享模板。迁移只处理多语言；原英文参数、图片、询盘链接、无型号表结构和版式保持不变。

## 实施结果

- 英文地址：`products/室内消防栓/export-slanted-hydrant-valve.html`
- 阿文地址：`ar/products/export-slanted-hydrant-valve/index.html`
- 共享数据：`site-src/_data/preserved-products/export-slanted-hydrant-valve.json`
- 阿文文案：`site-src/content/products/ar/export-slanted-hydrant-valve.json`
- 共用模板：`site-src/_includes/product-series/indoor-hydrant.njk`
- 英文基线：`tools/fixtures/export-slanted-hydrant-valve-en-baseline.txt`

保留 2 张图库图片、15 项系列信息、3 条选型说明及 4 个 OEM/ODM 项目。共享模板增加可配置的页内导航、次要按钮和可选型号区，以忠实支持原页面没有型号表的结构；标准室内消火栓原输出同步通过基线检查。

## 验收结果

| 检查 | 结果 |
| --- | --- |
| 全站快速构建、87 个正式输出、SEO、导航与断链检查 | PASS |
| 英文结构、可见文字、2 张图片、样式及询盘地址保持 | PASS |
| 文件预览：4 个桌面/手机 × 英/阿单款交互场景 | PASS |
| HTTP 预览：4 个桌面/手机 × 英/阿单款交互场景 | PASS |
| 分类图片/文字入口、英阿互切、刷新、返回及三种页脚返回 | PASS |
| 双图缩略图/箭头/放大、规格锚点、阿文 RTL 与手机布局 | PASS |

证据位于 `docs/evidence/focused/export-slanted-hydrant-valve/file/` 和 `docs/evidence/focused/export-slanted-hydrant-valve/http/`。

## 下一项

下一项为 MIG-603 双出口室内消火栓，继续只处理多语言。MIG-905 和 MIG-210 保持暂停。
