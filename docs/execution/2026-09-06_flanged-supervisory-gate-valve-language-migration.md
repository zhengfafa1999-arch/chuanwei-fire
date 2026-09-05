# MIG-501 法兰信号闸阀多语言迁移

法兰信号闸阀已从单独维护的英文 HTML 迁移为中立产品数据、英阿文案和闸阀共享模板。迁移只处理多语言架构；原英文参数、图片、询盘链接和页面版式均保持不变。

## 实施结果

- 英文地址：`products/消防阀门/flanged-supervisory-gate-valves.html`
- 阿文地址：`ar/products/flanged-supervisory-gate-valves/index.html`
- 共享数据：`site-src/_data/preserved-products/flanged-supervisory-gate-valves.json`
- 阿文文案：`site-src/content/products/ar/flanged-supervisory-gate-valves.json`
- 系列模板：`site-src/_includes/product-series/gate-valve.njk`
- 原英文基线：`tools/fixtures/flanged-supervisory-gate-valves-en-baseline.txt`

保留 6 行型号、1 张主图、12 项系列参数、4 个开关信息卡片、2 条配置说明、4 个 OEM/ODM 项目，以及原有 WhatsApp 与邮件询盘内容。英文页由自动检查与迁移前基线逐项对比；阿文页复用同一产品数字和型号数据，不重复维护技术事实。

## 验收结果

| 检查 | 结果 |
| --- | --- |
| 全站快速构建、82 个正式输出、SEO、导航与断链检查 | PASS |
| 英文正文结构、可见文字、图片、样式、询盘地址及 6 行型号保持 | PASS |
| 文件预览：4 个桌面/手机 × 英/阿单款交互场景 | PASS |
| HTTP 预览：4 个桌面/手机 × 英/阿单款交互场景 | PASS |
| 分类图片/文字入口、英阿互切、刷新、浏览器返回及三种页脚返回 | PASS |
| 单张主图放大与关闭、阿文 RTL、桌面和手机布局 | PASS |

验证证据位于 `docs/evidence/focused/flanged-supervisory-gate-valves/file/` 和 `docs/evidence/focused/flanged-supervisory-gate-valves/http/`。

## 下一项

下一项为 MIG-502 沟槽信号闸阀，继续复用闸阀模板并只做当前产品的定向验证。MIG-905 和 MIG-210 继续暂停。
