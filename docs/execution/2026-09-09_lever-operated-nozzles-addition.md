# CATWEB-012 手柄式消防水枪新增记录

## 结果

新增 Lever-Operated Fire Hose Nozzles 共享英阿详情页。水带、水枪及接口分类保留原有六款顺序，追加本款为第七款。现有产品详情、首页和共享样式没有改动。

## 页面与数据

- 数据：`site-src/_data/documented-products/lever-operated-fire-hose-nozzles.json`
- 英文：`products/消防水枪/lever-operated-fire-hose-nozzles.html`
- 阿拉伯文：`ar/products/lever-operated-fire-hose-nozzles/index.html`
- 分类：`products/消防水枪.html`、`ar/products/hoses-nozzles-couplings/index.html`
- 同步更新路由、产品总目录、站点地图和分类校验清单。

## 选型事实与边界

采用 v11 官网交接 JSON 的 `catalog-p41` 表格，并核对 `catalog-module-lever-nozzles/source/图1_编号口径来源.png` 中的原始上下构型。五行数据保持顺序及对应关系：

| 构型 | 选型参考 | 入口口径 |
| --- | --- | --- |
| A | DN-010 | 1½ in |
| A | DN-011 | 2 in |
| A | DN-012 | 2½ in |
| B | GN-020 | 2 in |
| B | GN-021 | 2½ in |

DN/GN 编号只作为选型参考，不作为工厂型号；不恢复旧图中的 QG/MS 前缀。页面采用侧操作杆和黑色握把的外观描述，不从外观推断枪体材质、压力、流量、喷射模式、关断性能或地区接口标准。具体接口、材质与表面处理、压力和流量留在询盘确认项。

## 图片与发布状态

原样复制图册交接包的两张展示图，未生成或修改图片：

- `m01_m01_image84.png` → `products/消防水枪/lever-operated-fire-hose-nozzles/configuration-a-catalog-display.png`，420 × 1089，对应原始表格上方 A 构型。
- `m01_m01_image85.png` → `products/消防水枪/lever-operated-fire-hose-nozzles/configuration-b-catalog-display.png`，370 × 1104，对应原始表格下方 B 构型。

完整来源路径保存在产品 JSON。每张图代表一个构型系列，不证明每个尺寸或配套接口的精确外形。页面标明图册展示图，保留 `local-draft`、`externalRelease: false` 和官网图片许可待确认状态。本次没有部署。

## 验证

- `npm run build` 通过，127 个输出路由的 SEO、导航、产品数据、分类与资源校验通过。
- 文件预览和本地 HTTP 各通过桌面/手机 × 英文/阿拉伯文四组定向测试。
- 覆盖分类图片/文字入口、双向语言切换、刷新、两图图库、缩略图、箭头循环、滑动、放大与关闭、锚点、五行选型表及页脚返回。
- 人工核对桌面阿文选型表、手机英文图库和手机阿文规格截图，图片比例、RTL、编号与口径显示正常。
- 初次两个测试进程存在运行时间重叠，分别出现锚点 hash 已更新但滚动位置未到位的失败。逐个独立重跑后均通过；未修改页面或测试断言，尚不能断定失败根因。后续测试建议串行运行并留意该时序问题。
- 证据：`docs/evidence/catweb-012/file`、`docs/evidence/catweb-012/http`。
- 文档人工检查；沿用上一任务确认的环境限制，本机没有可离线调用的 Prettier。

没有重复运行全站浏览器回归。本次产品数据和生成页面通过图册五行对应关系与旧字段污染检查。

## 交接

本批 8 个允许本地制作的新增候选已补齐。下一步核对新增批次完整性并执行计划中的最终全站构建与浏览器回归。暂缓的 8 个新增候选、现有产品其余图册更新和正式发布均不计为完成，也不自动扩大范围。
