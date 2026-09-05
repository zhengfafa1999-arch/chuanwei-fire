# MIG-405 消防蝶阀分类页语言入口收尾

消防蝶阀分类的四类产品已完成英阿入口验收。本轮只处理分类语言入口及其自动验证，不修改产品参数、图片、英文内容或页面版式。

## 已验收范围

| 产品 | 英文详情 | 阿文详情 |
| --- | --- | --- |
| 手柄沟槽式蝶阀 | `products/消防蝶阀/lever-operated-grooved-butterfly-valves.html` | `ar/products/lever-operated-grooved-butterfly-valves/index.html` |
| 手柄对夹式蝶阀 | `products/消防蝶阀/lever-operated-wafer-butterfly-valves.html` | `ar/products/lever-operated-wafer-butterfly-valves/index.html` |
| 信号沟槽式蝶阀 | `products/消防蝶阀/grooved-supervisory-butterfly-valves.html` | `ar/products/grooved-supervisory-butterfly-valves/index.html` |
| 信号对夹式蝶阀 | `products/消防蝶阀/wafer-supervisory-butterfly-valves.html` | `ar/products/wafer-supervisory-butterfly-valves/index.html` |

分类地址保持为 `products/消防蝶阀.html` 和 `ar/products/butterfly-valves/index.html`，继续使用公共分类模板。四款产品在两种语言下均为正式发布状态，图片入口和文字入口指向同一对应产品。

## 本轮保护

- 列表验证固定检查四款产品的顺序、所属分类、英阿发布状态、八张本地化卡片及十六个图片/文字链接。
- 浏览器验证新增 `--category` 定向模式，只检查指定分类及所属产品，不重复运行无关页面。
- 分类定向检查覆盖分类英阿互切、刷新、图片与文字入口、详情页英阿互切、浏览器返回，以及详情页返回分类、产品目录和首页。

## 验收结果

| 检查 | 结果 |
| --- | --- |
| 全站快速构建、数据、SEO、链接与内容保持检查 | PASS |
| 四款产品、八张英阿卡片及十六个图片/文字入口 | PASS |
| 文件预览分类定向测试：20 个桌面/手机 × 英/阿导航场景 | PASS |
| HTTP 预览分类定向测试：20 个桌面/手机 × 英/阿导航场景 | PASS |
| 阿文桌面 RTL 与英文手机截图目视检查 | PASS |
| 产品参数、图片、英文内容和版式保持不变 | PASS |

证据保存于 `docs/evidence/focused/butterfly-valves/file/` 和 `docs/evidence/focused/butterfly-valves/http/`。每个目录包含分类验收 JSON，以及英阿桌面和手机截图。

## 下一项

MIG-405 完成后进入 MIG-501 法兰信号闸阀。继续只迁移多语言，并按当前产品范围执行文件与 HTTP 定向验证；MIG-905 和 MIG-210 仍暂停。
