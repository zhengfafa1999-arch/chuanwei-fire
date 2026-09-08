# CATWEB-005 快速响应玻璃球喷头 v11 对齐记录

## 结果

`Quick Response Glass Bulb Sprinklers` 已从旧的英文保存稿和独立阿拉伯文翻译文件迁移到单一共享产品数据源。英文与阿拉伯文详情页现在由同一份结构化数据和共用模板生成。

## 证据边界

- v11 第 6 页把旧官网快速响应路由列为关联路由，但只给出了 `T-ZST...Q5A` 标准响应型号，未提供快速响应系列的独立正式型号表。
- 当前用户要求确认该产品为快速响应玻璃球喷头。
- 已归档的用户确认资料支持：DN15、K80±4、68°C 红色玻璃球、下垂式与直立式、湿式自动喷水灭火系统、最大工作压力 1.21 MPa、上部不锈钢结构、下部铜制螺纹连接体及约 50 g 参考重量。
- 精确工厂型号、螺纹制式、表面处理、包装数量和文件组合尚未确认，页面统一标记为报价前确认。
- 没有逐 SKU 认证证据，因此页面未增加 UL、FM、CE、CCC 等认证声明。

## 内容收敛

旧页面中以下内容没有足够的当前证据，已从活动页面移除：

- DN20 / ¾ in 与 K115 / K8.0 规格；
- 57°C、79°C、93°C、141°C 等额外温级；
- 3 mm 玻璃球直径声明；
- `K-ZSTX`、`K-ZSTZ`、`K-ZSTU`、`K-ZSTBS` 等精确工厂型号；
- 水平侧墙式作为当前可选配置；
- 英文温度色标图和侧墙式实物图作为活动图库内容；
- 固定 100 件装、45–80 g、镀铬/本色铜等未在当前资料中完整确认的销售声明。

原图片文件未删除，仅不再被该详情页引用。当前图库保留下垂式、直立式和代表性包装照片。

## 架构变化

- 新共享数据源：`site-src/_data/documented-products/glass-bulb-fire-sprinkler.json`
- 删除旧英文保存稿：`site-src/_data/preserved-products/glass-bulb-fire-sprinkler.json`
- 删除独立阿拉伯文翻译：`site-src/content/products/ar/glass-bulb-fire-sprinkler.json`
- 英文输出：`products/消防喷头/glass-bulb-fire-sprinkler.html`
- 阿拉伯文输出：`ar/products/glass-bulb-fire-sprinkler/index.html`

页面继续保持 `local-draft`，`externalRelease` 为 `false`，图片官网使用许可仍为待确认状态。

## 验证

- `npm run build`：通过；包含路由、SEO、导航、共享产品、分类入口和公开页面校验。
- 文件模式聚焦浏览器验证：通过，覆盖桌面/手机 × 英文/阿拉伯文 4 种场景。
- HTTP 模式聚焦浏览器验证：通过，覆盖相同 4 种场景。
- 验证范围：当前产品的分类入口、英阿互切、图库、放大交互、规格锚点、配置表、询价区和手机布局。
- 未运行重复的全站浏览器回归；按计划留到本分类完成后执行。

证据截图位于：

- `docs/evidence/catweb-005/file/`
- `docs/evidence/catweb-005/http/`
