# CATWEB-004 标准响应消防喷头 v11 数据对齐

将标准响应消防喷头从旧的“原文保留”页面迁入有证据规格产品的共享英阿模板。产品网址和分类入口保持不变；英文与阿拉伯文由一份 JSON 数据生成，不再分别维护页面内容。

## 维护入口

- 产品数据：`site-src/_data/documented-products/standard-response-fire-sprinkler.json`
- 共享装载：`site-src/_data/documentedProductPages.js`
- 共享页面：`site-src/documented-product.njk`
- 共享内容模板：`site-src/_includes/product-series/documented-product.njk`
- 英文输出：`products/消防喷头/standard-response-fire-sprinkler.html`
- 阿文输出：`ar/products/standard-response-fire-sprinkler/index.html`

以后修改参数、型号、图片或文案时只修改共享 JSON，再运行 `npm run build`。

## v11 对齐结果

- 来源：v11 图册第 6 页，交接记录 `catalog-p06`。
- 正式范围：DN15 / ½ in、K5.6 US / K80 metric、68°C / 155°F 红色玻璃球。
- 最大工作压力：1.21 MPa / 12.1 bar / 约 175 psi，采用用户确认值。
- 正式型号仅保留三项：`T-ZSTZ 80-68°C Q5A`、`T-ZSTX 80-68°C Q5A`、`T-ZSTBS 80-68°C Q5A`。
- 安装形式分别为 Upright、Pendent、Horizontal Sidewall。
- 移除了旧页没有被 v11 当前记录覆盖的 DN20、K8.0/K115 和七档温度组合。
- 螺纹制式、表面处理、文件和包装继续在报价时确认。
- 页面没有增加任何逐型号认证声明。

## 图片映射

四张现有实物图继续使用。历史单品文件名中的 `pendent` 和 `upright` 与实物结构相反，因此新数据按照散水盘结构及交接包哈希映射：

- Upright 使用历史文件 `standard-response-pendent.jpg`（平面散水盘）。
- Pendent 使用历史文件 `standard-response-upright.jpg`（拱形散水盘）。
- Horizontal Sidewall 使用 `standard-response-horizontal-sidewall.jpg`。
- 系列主图使用 `standard-response-three-styles.jpg`。

没有重命名图片文件，避免影响其他历史引用。页面继续保留 `local-draft`、`externalRelease: false` 和图片官网使用许可待确认门禁。

## 验收结果

| 验收项 | 状态 | 结果 |
|---|---|---|
| 单一英阿数据源 | PASS | 同一 JSON 生成两个语言页面 |
| 原网址与分类入口 | PASS | 路由不变，图片和文字入口均进入同语言详情 |
| 英阿互切、刷新与返回 | PASS | 语言、方向及当前产品保持一致 |
| 型号表 | PASS | 英阿页面均为 3 行，技术值保持左到右显示 |
| 图库与放大交互 | PASS | 4 张图片、缩略图、前后循环、滑动和三种关闭方式通过 |
| 桌面与手机布局 | PASS | 1440 × 900 与 390 × 844 无横向溢出或破图 |
| 快速全站构建 | PASS | 113 个发布页面的路由、SEO、导航及分类校验通过 |
| 文件预览定向测试 | PASS | desktop/mobile × EN/AR 共 4 个场景 |
| HTTP 预览定向测试 | PASS | desktop/mobile × EN/AR 共 4 个场景 |
| 图片官网使用许可 | PENDING | 保留本地草稿和发布门禁 |

浏览器证据位于 `docs/evidence/catweb-004/file/` 和 `docs/evidence/catweb-004/http/`。本次只验证修改的产品，没有执行完整全站浏览器回归。

## 实施说明

按 task-executor 与 chuanwei-fire-product-page 流程执行。为支持多款产品共用校验器，将必检技术值从脚本中的易熔合金喷头硬编码迁回每款产品自身的 `validation.requiredTechnicalValues`，没有改变现有样板的发布门禁或内容。
