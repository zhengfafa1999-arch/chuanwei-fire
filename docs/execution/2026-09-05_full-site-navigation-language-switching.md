# MIG-903 全站导航与语言切换一致性

## Summary

全站 64 个正式页面已统一采用同一套导航与语言切换规则。共享模板页面在构建时直接生成导航，29 个尚未迁移的英文详情页由幂等构建步骤规范化，因此不需要逐页手工维护页头、语言入口和返回链接。

## Deliverables

### 集中式导航模型

导航数据统一负责五项主入口、当前栏目状态、三语言入口、页面返回路径及未翻译语言的明确回退状态。所有语言使用同一结构，仅替换文案、方向和目的地址。

**Files affected:**

- `site-src/_data/navigation.js`
- `site-src/_includes/site-header.njk`
- `css/site-navigation.css`
- `assets/js/site-navigation.js`
- `site-src/_data/homePages.js`
- `site-src/_data/productIndexPages.js`
- `site-src/_data/categoryPages.js`
- `site-src/_data/publicPages.js`
- `site-src/_data/catalog.js`

### 统一模板与旧页兼容

首页、产品总目录、分类页、公共页面和已迁移详情页直接包含共享页头。29 个旧英文详情页在每次构建后自动接入相同导航资产，并保留原有页内栏目链接作为二级导航。所有 35 个产品详情页均提供所属分类、产品总目录和首页返回路径。

**Files affected:**

- `site-src/home.njk`
- `site-src/product-index.njk`
- `site-src/category-page.njk`
- `site-src/public-page.njk`
- `site-src/product-detail.njk`
- `tools/normalize-legacy-navigation.mjs`
- `assets/js/public-pages.js`
- `assets/js/product-detail.js`

### 路由与语言行为

- 显式访问的英文、中文或阿拉伯文网址始终优先，不因浏览器中曾保存的语言偏好而自动跳走。
- 用户主动点击语言入口时保存偏好；旧首页 `?lang=zh` 等查询地址继续跳转到正式语言路径。
- 已发布双语详情在对应详情之间切换。
- 尚未发布阿拉伯文详情的 29 个英文产品，其阿拉伯文入口明确返回所属阿拉伯文分类，不伪造不存在的翻译页。
- 阿拉伯文分类中的英文技术页回退使用直接地址，不产生语言重定向循环。

### 自动验证

新增逐页导航验证器，并扩展真实浏览器回归矩阵，验证主导航数量、当前栏目、当前语言、移动菜单、显式网址、语言切换、刷新、浏览器返回和详情页返回链路。

**Files affected:**

- `tools/validate-navigation.mjs`
- `tools/validate-browser.mjs`
- `tools/validate-generated.mjs`
- `tools/validate-listings.mjs`
- `package.json`

## Acceptance Criteria Verification

| Criterion | Status | Notes |
| --- | --- | --- |
| 首页、目录、分类、公共页和详情页导航一致 | PASS | 64 个正式页面均有一套完整全局导航 |
| 主导航状态正确 | PASS | 每页固定五项主入口，且仅一项标识当前栏目 |
| 语言切换状态正确 | PASS | 每页固定三语言入口，且仅一种语言标识为当前语言 |
| 未翻译详情回退明确 | PASS | 29 个英文详情页的阿文入口指向对应阿文分类并标识为回退 |
| 产品返回路径完整 | PASS | 35 个详情页均具备分类、产品总目录和首页返回入口 |
| 移动导航可用 | PASS | 64 个正式页面逐页验证菜单展开和无障碍状态 |
| 直接网址不被旧偏好覆盖 | PASS | 显式语言网址优先；仅旧首页查询参数执行兼容跳转 |
| 构建及静态审计通过 | PASS | 64 页面、35 产品返回链路、29 语言回退全部通过 |
| 浏览器回归通过 | PASS | Edge 152：40 页面/视口、64 移动导航、20 语言/返回场景通过 |

## Linked Tasks

- Task: MIG-903
- Dependencies: MIG-002, MIG-003, MIG-004–MIG-007, MIG-901, MIG-902
- Follow-up: MIG-904, MIG-906
