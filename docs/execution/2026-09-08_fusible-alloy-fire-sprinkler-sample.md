# CATWEB-002 / CATWEB-003 有证据规格模板与易熔合金喷头样板

建立了一套独立于保守询盘页的“有证据规格产品”共享模板，并使用 v11 图册第 12 页的易熔合金消防喷头完成首个英阿双语样板。样板已接入产品总目录和消防喷头分类，保留为本地草稿；未推送、未部署，也未解除图片使用许可门禁。

## 维护入口

- 产品数据：`site-src/_data/documented-products/fusible-alloy-fire-sprinklers.json`
- 数据装载：`site-src/_data/documentedProductPages.js`
- 共享页面：`site-src/documented-product.njk`
- 共享内容模板：`site-src/_includes/product-series/documented-product.njk`
- 样式：`css/documented-product.css`
- 数据校验：`tools/validate-documented-products.mjs`
- 英文输出：`products/消防喷头/fusible-alloy-fire-sprinklers.html`
- 阿文输出：`ar/products/fusible-alloy-fire-sprinklers/index.html`

以后修改产品参数、文案、图库或询盘内容时，只改共享数据，再运行 `npm run build`，不要分别维护英文和阿文输出 HTML。型号表的列由 `modelColumns` 定义，可供后续产品按自身字段复用。

## 已采用的证据与字段

- 来源：v11 图册第 12 页，交接记录 `catalog-p12`。
- Factory Series：`ZSTZ.X 80-[T]°C Y`。
- K-factor：`K5.6 US / K80 metric`。
- 连接等级：`½ in nominal connection class`；没有推断具体螺纹制式。
- 安装方向：Upright / Pendent。
- 感温元件：Fusible alloy。
- 五个工厂型号对应 72°C、74°C、140°C、180°C、204°C，并保留相应华氏温度。
- 螺纹制式、工作压力、表面处理和所需文件仍显示为报价时确认。
- 页面没有增加 UL、FM、CE、CCC 或其他逐型号认证声明。

## 图片与发布边界

- 配置 A：`products/消防喷头/fusible-alloy-fire-sprinklers/fusible-alloy-configuration-a.jpg`，SHA-256 `14C455D9802168A02D01641E0C3F855ACFA6FEB9FA98867EE408AD2CEEBAF9CB`。
- 配置 B：`products/消防喷头/fusible-alloy-fire-sprinklers/fusible-alloy-configuration-b.jpg`，SHA-256 `05D4DB52822E1A747FB644AA3B587CB799A4E229E20D46A22006CDBE8FB67ABA`。
- 两张图均为交接包中的实物白底图，按产品系列代表图使用。
- `publication.status` 为 `local-draft`，`externalRelease` 为 `false`，`imageRights` 为 `pending-website-use-confirmation`。在确认可用于官网之前，不应部署该新增页面。

## 验收结果

| 验收项 | 状态 | 结果 |
|---|---|---|
| 共享英阿数据与模板 | PASS | 单一 JSON 生成英文和阿文两个输出 |
| 产品总目录与消防喷头分类入口 | PASS | 图片和文字入口均进入同语言详情 |
| 英阿互切、刷新与返回 | PASS | 同产品互切并保持页面语言 |
| 图库、缩略图、前后循环、滑动和放大 | PASS | 两张图片及阿文说明均通过 |
| 桌面与手机布局 | PASS | 390 × 844 手机型号表完整显示，无页面横向溢出 |
| 页面锚点 | PASS | 固定导航下方可见，不遮挡章节标题 |
| 快速全站构建 | PASS | 113 个发布页面的路由、SEO、导航与分类校验通过 |
| 文件预览定向浏览器测试 | PASS | desktop/mobile × EN/AR 共 4 个场景 |
| HTTP 预览定向浏览器测试 | PASS | desktop/mobile × EN/AR 共 4 个场景 |
| 图片官网使用许可 | PENDING | 继续保留本地草稿和发布门禁 |

浏览器证据位于 `docs/evidence/catweb-003/file/` 和 `docs/evidence/catweb-003/http/`。本次遵照用户要求，只运行当前产品的完整交互与布局测试，没有重复执行全站浏览器回归。

## 实施说明

按 task-executor 和 chuanwei-fire-product-page 流程完成。手机型号表删除了逐行重复的感温元件列，但“易熔合金”仍完整保留在规格区；共享模板改为数据定义列，未损失产品事实。HTTP 测试发现同一哈希再次点击时浏览器可能不重新滚动，测试脚本现先清理相同哈希再触发真实链接，以稳定验证章节定位。

## 关联任务

- CATWEB-001：v11 图册官网升级差异与执行计划
- CATWEB-002：有证据规格产品共享英阿模板
- CATWEB-003：易熔合金消防喷头新增产品样板
