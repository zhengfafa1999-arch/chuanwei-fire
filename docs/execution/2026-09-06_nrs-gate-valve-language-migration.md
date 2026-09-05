# MIG-503 暗杆闸阀（NRS）多语言迁移

暗杆闸阀已迁移至中立产品数据、英阿文案和闸阀共享模板。迁移只处理多语言；原英文参数、未知项、图片、询盘链接和版式保持不变。

## 实施结果

- 英文地址：`products/消防阀门/nrs-gate-valves.html`
- 阿文地址：`ar/products/nrs-gate-valves/index.html`
- 共享数据：`site-src/_data/preserved-products/nrs-gate-valves.json`
- 阿文文案：`site-src/content/products/ar/nrs-gate-valves.json`
- 共用模板：`site-src/_includes/product-series/gate-valve.njk`
- 英文基线：`tools/fixtures/nrs-gate-valves-en-baseline.txt`

保留 12 行沟槽式/法兰式型号、1 张主图、8 项系列信息、4 个结构信息卡片、2 条说明及 4 个 OEM/ODM 项目。“Available on request”和“To be confirmed”等原有未知项原样保留，没有新增技术判断。

为适配不同闸阀类型，共享模板将技术标题、型号区标题和型号表表头改为产品数据控制；前两款信号闸阀仍输出原内容，并通过原英文基线检查。

## 验收结果

| 检查 | 结果 |
| --- | --- |
| 全站快速构建、84 个正式输出、SEO、导航与断链检查 | PASS |
| 英文结构、可见文字、图片、样式、询盘地址及 12 行型号保持 | PASS |
| 文件预览：4 个桌面/手机 × 英/阿单款交互场景 | PASS |
| HTTP 预览：4 个桌面/手机 × 英/阿单款交互场景 | PASS |
| 分类图片/文字入口、英阿互切、刷新、返回及三种页脚返回 | PASS |
| 单张主图放大、阿文 RTL、桌面与手机布局 | PASS |

证据位于 `docs/evidence/focused/nrs-gate-valves/file/` 和 `docs/evidence/focused/nrs-gate-valves/http/`。

## 下一项

下一项为 MIG-504 明杆闸阀（OS&Y），继续只处理多语言。MIG-905 和 MIG-210 保持暂停。
