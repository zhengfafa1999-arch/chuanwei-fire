# MIG-002 全站语言路由清单

## Summary

建立全站唯一语言路由清单，覆盖现有 60 个正式 HTML 输出。共享首页和三个已迁移产品的英文/阿拉伯文地址均改为由该清单生成，未迁移的阿拉伯文详情页使用明确的分类区回退。

## Deliverables

### 集中式路由注册表

- 46 个逻辑路由覆盖 60 个正式 HTML。
- 区分 `published`、`fallback` 和首页中文 `inline` 三种状态。
- 统一生成 canonical、相对链接、资源路径和产品所属分类链接。

**Files affected:**

- `site-src/_data/siteRoutes.js`
- `site-src/_data/homePages.js`
- `site-src/_data/catalog.js`
- `site-src/home.njk`

### 自动校验

- 检查所有正式 HTML 均已注册。
- 检查重复输出、无效回退和缺失语言目标。
- 检查已迁移产品具有真实的英文/阿拉伯文对应页。

**Files affected:**

- `tools/validate-routes.mjs`
- `package.json`

## Acceptance Criteria Verification

| Criterion | Status | Notes |
| --- | --- | --- |
| 所有正式页面进入统一路由清单 | PASS | 46 个逻辑路由覆盖 60 个正式 HTML。 |
| 已迁移页面不再手写语言对应地址 | PASS | 首页和 3 个产品系列均从路由清单生成。 |
| 未迁移阿拉伯文页面有安全回退 | PASS | 回退至 `ar/products.html` 的对应分类锚点。 |
| 构建与原有产品数据校验通过 | PASS | `npm run build` 全部通过。 |
| 浏览器语言往返可用 | PASS | Edge 桌面/手机共 26 个页面/视口组合及 4 个语言切换/偏好恢复场景通过；证据见 `docs/evidence/multilingual-browser/2026-09-04/`。 |

## Implementation Notes

本任务只统一地址关系，不提前改写尚未确认资料的产品详情。后续每完成一个阿拉伯文页面，只需在路由清单中把该产品的 `fallback` 改为 `published`，模板和语言按钮会自动使用新地址。

## Linked Tasks

- Task: MIG-002
- Dependencies: MIG-001
- Next: MIG-003, MIG-007, MIG-102
