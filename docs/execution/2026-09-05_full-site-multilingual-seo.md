# MIG-902 全站多语言 SEO 与链接规范化

## Summary

全站 64 个正式页面已统一使用集中式 SEO 元数据生成规则。35 个共享模板页面直接在构建时生成 SEO 标签，29 个尚待迁移的英文产品详情页由幂等的构建后处理自动补齐，避免逐页维护 canonical、hreflang 和分享标签。

## Deliverables

### 统一 SEO 生成器

集中生成标题、描述、robots、canonical、真实等价语言 hreflang、x-default、Open Graph 和 Twitter Card 标签。

**Files affected:**

- `site-src/_data/seo.js`
- `eleventy.config.js`
- `site-src/home.njk`
- `site-src/product-index.njk`
- `site-src/category-page.njk`
- `site-src/public-page.njk`
- `site-src/product-detail.njk`
- `site-src/_data/homePages.js`
- `site-src/_data/productIndexPages.js`
- `site-src/_data/categoryPages.js`
- `site-src/_data/publicPages.js`
- `site-src/_data/catalog.js`

### 旧详情页自动规范化

构建流程从旧页面现有标题、描述和第一张真实产品图生成完整 SEO 元数据。未发布阿拉伯文详情的页面只声明英文自引用和 x-default，不把阿拉伯文分类回退页错误标记为等价翻译。

**Files affected:**

- `tools/normalize-legacy-seo.mjs`
- `package.json`
- 29 个待迁移英文产品详情页

### 全站 SEO 验证

新增逐页审计，验证标签唯一性、canonical、hreflang、Open Graph 语言关系、Twitter Card、真实 HTTPS 分享图片，以及 sitemap 中逐 URL 的语言关系和总数。

**Files affected:**

- `tools/validate-seo.mjs`
- `robots.txt`
- `sitemap.xml`

## Acceptance Criteria Verification

| Criterion | Status | Notes |
| --- | --- | --- |
| 所有正式页面具备标题和描述 | PASS | 64 个标题与 64 个描述均存在且分别唯一 |
| canonical 唯一且与路由注册表一致 | PASS | 64 个页面、64 个唯一 canonical |
| hreflang 只连接真实等价语言页面 | PASS | 首页 EN/zh-CN/AR；其他双语页 EN/AR；未翻译详情仅 EN |
| x-default 一致 | PASS | 优先指向对应英文正式地址 |
| 分享信息完整 | PASS | 所有页面具备 Open Graph、Twitter Card、语言信息和可访问的 HTTPS 图片 |
| 站点地图完整且无额外 URL | PASS | 64 个 sitemap URL 与 64 个正式页面逐一对应 |
| 构建流程稳定 | PASS | `npm run build` 通过；旧页规范化第二次执行产生 0 个改动 |
| 浏览器回归通过 | PASS | Edge 152：40 个页面/视口检查及 18 个语言场景通过 |

## Implementation Notes

- SEO 语言关系以 `siteRoutes.js` 中状态为 `published` 的页面为准，`fallback` 仅用于用户导航，不进入 hreflang。
- 分享图片使用页面对应的真实产品图；共享公共页面使用站点分享图。验证器会检查同域图片文件确实存在。
- `robots.txt` 已删除失效的 `/?lang=zh` 特殊规则和非必要 Crawl-delay，仅保留全站允许抓取与 sitemap 地址。
- 后续产品详情迁移到共享模板后，旧页规范化器会识别生成文件并自动跳过，不形成双重维护。

## Linked Tasks

- Task: MIG-902
- Dependencies: MIG-002, MIG-003, MIG-004–MIG-007, MIG-901
- Follow-up: MIG-903, MIG-906
