# MIG-604 旋转减压稳压消火栓多语言迁移

旋转减压稳压消火栓已迁移至中立产品数据、英阿文案和室内消火栓共享模板。迁移只处理多语言；原英文参数、6 行型号、单张主图、询盘链接和版式保持不变。

## 实施结果

- 英文地址：`products/室内消防栓/rotating-pressure-regulating-hydrant.html`
- 阿文地址：`ar/products/rotating-pressure-regulating-hydrant/index.html`
- 共享数据：`site-src/_data/preserved-products/rotating-pressure-regulating-hydrant.json`
- 阿文文案：`site-src/content/products/ar/rotating-pressure-regulating-hydrant.json`
- 共用模板：`site-src/_includes/product-series/indoor-hydrant.njk`
- 英文基线：`tools/fixtures/rotating-pressure-regulating-hydrant-en-baseline.txt`

保留单张主图、8 项系列信息、2 条选型说明、6 行型号及 4 个 OEM/ODM 项目。共享模板增加可配置的规格区标题，以忠实保留该页面原有的技术概览结构；其他室内消火栓页面不会显示该区块，并继续通过英文基线检查。

## 验收结果

| 检查 | 结果 |
| --- | --- |
| 全站快速构建、89 个正式输出、SEO、导航与断链检查 | PASS |
| 英文结构、可见文字、6 行型号、单张主图、样式及询盘地址保持 | PASS |
| 文件预览：4 个桌面/手机 × 英/阿单款交互场景 | PASS |
| HTTP 预览：4 个桌面/手机 × 英/阿单款交互场景 | PASS |
| 分类图片/文字入口、英阿互切、刷新、返回及三个页脚返回入口 | PASS |
| 单张主图放大及三种关闭方式、型号锚点、阿文 RTL 与手机布局 | PASS |

证据位于 `docs/evidence/focused/rotating-pressure-regulating-hydrant/file/` 和 `docs/evidence/focused/rotating-pressure-regulating-hydrant/http/`。

## 下一项

下一项为 MIG-605 室内消火栓分类页收尾，继续只处理多语言。MIG-905 和 MIG-210 保持暂停。
