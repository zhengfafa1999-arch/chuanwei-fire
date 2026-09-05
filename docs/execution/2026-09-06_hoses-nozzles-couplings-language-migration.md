# MIG-801 消防水带、水枪与接口多语言迁移

本轮只处理当前分类中五类产品的英文和阿拉伯文详情入口。页面沿用现有产品名称和对应图片，不恢复历史页面中已经移除的参数，也不新增材质、压力、尺寸、标准或认证信息。

## 迁移范围

- Combination Jet/Fog Nozzles / فوهات نفاثة/ضبابية مركبة
- Layflat Fire Hoses / خراطيم حريق مسطحة
- KD Hose Couplings / وصلات خراطيم KD
- KN Threaded Adapters / محولات لولبية KN
- Matched Hose Assemblies / مجموعات خراطيم متوافقة

英文详情位于 `products/消防水枪/`，阿文详情位于 `ar/products/`。十个输出页面由 `site-src/catalog-product.njk`、`site-src/_includes/product-series/catalog-inquiry-product.njk` 和五份共享产品数据生成。

## 实施结果

- 分类页的图片和文字入口均进入相同语言的对应详情页。
- 每款详情页保留当前分类中的名称和图片，仅增加产品识别、询盘说明和联系入口。
- 英文和阿文使用同一路由、导航、SEO 和详情模板，切换语言时保持在同一产品。
- 增加询盘型产品静态校验，阻止名称、图片、双语路由和分类入口发生漂移。
- 定向浏览器工具支持一次启动批量验证多款产品，减少重复启动 Edge 的时间。

## 验收结果

| 检查 | 结果 |
| --- | --- |
| 快速全站构建、103 个正式输出、SEO、导航与断链检查 | PASS |
| 五份共享产品数据、十个英阿详情输出及未确认技术声明检查 | PASS |
| 组合直流/喷雾水枪样板：文件与 HTTP 的桌面/手机 × 英/阿检查 | PASS |
| 其余四款：单次 HTTP 浏览器会话共 16 个桌面/手机 × 英/阿场景 | PASS |
| 分类页：文件与 HTTP 各 24 个英阿入口、切换、返回和手机场景 | PASS |
| 五款顺序、十张双语卡片和二十个图片/文字链接静态校验 | PASS |

验证证据位于：

- `docs/evidence/focused/combination-jet-fog-nozzles/`
- `docs/evidence/focused/hoses-nozzles-couplings-batch/http/`
- `docs/evidence/focused/hoses-nozzles-couplings/`

## 下一项

下一项为 MIG-802 消防水泵接合器，继续只处理多语言。MIG-905 和 MIG-210 保持暂停。
