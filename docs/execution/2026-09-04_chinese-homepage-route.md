# MIG-901 中文首页架构统一

## Summary

中文首页已从查询参数运行时翻译迁移为正式的 `/zh/` 静态页面。英文、中文和阿拉伯文首页继续由同一个 Nunjucks 模板生成，中文正文由独立语言数据在构建期写入，同时保留旧 `/?lang=zh` 链接的自动跳转兼容。

## Deliverables

### 独立中文语言数据与共享模板

- 新增 `site-src/_data/homeChinese.js`，集中维护 95 条中文首页文案。
- `site-src/home.njk` 使用构建期本地化过滤器生成三种语言，不再保存 `data-zh` 内嵌副本。
- 中文询盘表单的产品选项与提示文字同步本地化。

### 正式中文路由

- 中文首页输出到 `zh/index.html`，canonical 为 `https://chuanweifire.com/zh/`。
- 三语 hreflang 和 sitemap 使用 `/`、`/zh/`、`/ar/` 三个明确地址。
- 旧 `index.html?lang=zh` 会跳转到 `zh/index.html`；保存的中文偏好仍可从英文首页恢复。
- 中文首页尚无中文分类页时，产品与公共页面入口明确进入现有英文技术页面。

## Acceptance Criteria Verification

| Criterion | Status | Notes |
| --- | --- | --- |
| 中文文案独立于模板 | PASS | 95 条中文文案位于单独数据模块，生成页无 `data-zh` |
| 三语首页共用模板 | PASS | `site-src/home.njk` 生成 EN、zh-CN、AR 三个输出 |
| 中文正式 URL 可直接访问 | PASS | `zh/index.html`，canonical `/zh/` |
| 旧中文查询链接兼容 | PASS | 浏览器验证 `?lang=zh` 自动进入 `/zh/` |
| SEO 语言关系一致 | PASS | canonical、hreflang、x-default 与 sitemap 一致 |
| 桌面与手机无布局溢出 | PASS | Edge 自动化验证覆盖 1440×900 和 390×844 |
| 语言切换和偏好恢复 | PASS | 三语切换、旧链接、显式路径与存储偏好场景通过 |

## Verification

- `npm run build`：PASS，46 个逻辑路由覆盖 64 个正式 HTML 文件。
- `npm run validate:browser`：PASS，40 个页面/视口组合与 18 个语言场景通过。
- 中文桌面与手机截图已保存到 `docs/evidence/multilingual-browser/2026-09-04/`。

## Linked Tasks

- Task: MIG-901
- Dependencies: MIG-001, MIG-002
- Follow-up: MIG-902, MIG-903, MIG-906
