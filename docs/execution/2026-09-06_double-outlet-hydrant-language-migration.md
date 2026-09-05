# MIG-603 双出口室内消火栓多语言迁移

双出口室内消火栓已迁移至中立产品数据、英阿文案和室内消火栓共享模板。迁移只处理多语言；原英文参数、单张主图、询盘链接、无图库和无型号表结构及版式保持不变。

## 实施结果

- 英文地址：`products/室内消防栓/double-outlet-hydrant.html`
- 阿文地址：`ar/products/double-outlet-hydrant/index.html`
- 共享数据：`site-src/_data/preserved-products/double-outlet-hydrant.json`
- 阿文文案：`site-src/content/products/ar/double-outlet-hydrant.json`
- 共用模板：`site-src/_includes/product-series/indoor-hydrant.njk`
- 英文基线：`tools/fixtures/double-outlet-hydrant-en-baseline.txt`

保留单张主图、12 项系列信息、3 条应用与连接说明及 4 个 OEM/ODM 项目。共享模板和保留内容验证器增加可选图库支持，以忠实保留该页面只有主图的原始结构；此前迁移的两款室内消火栓同步通过英文基线检查。

## 验收结果

| 检查 | 结果 |
| --- | --- |
| 全站快速构建、88 个正式输出、SEO、导航与断链检查 | PASS |
| 英文结构、可见文字、单张主图、样式及询盘地址保持 | PASS |
| 文件预览：4 个桌面/手机 × 英/阿单款交互场景 | PASS |
| HTTP 预览：4 个桌面/手机 × 英/阿单款交互场景 | PASS |
| 分类图片/文字入口、英阿互切、刷新、返回及三个页脚返回入口 | PASS |
| 单张主图放大及三种关闭方式、规格锚点、阿文 RTL 与手机布局 | PASS |

证据位于 `docs/evidence/focused/double-outlet-hydrant/file/` 和 `docs/evidence/focused/double-outlet-hydrant/http/`。

## 下一项

下一项为 MIG-604 旋转减压稳压消火栓，继续只处理多语言。MIG-905 和 MIG-210 保持暂停。
