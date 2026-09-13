# CHUANWEI FIRE 官网上线检查

- 检查日期：2026-09-13
- 检查对象：`D:\code\ai-code` 当前本地版本及 `chuanweifire.com` 线上入口
- 最终结论：**FAIL — 当前版本暂不能直接上线**
- 判断依据：页面内容、产品发布候选状态和图片公开使用确认均已通过；`www` 域名 HTTPS 配置和正式发布版本尚未闭环。

## 已通过

| 检查项 | 结果 | 证据 |
|---|---|---|
| 构建与路由 | PASS | `npm run build` 成功；82 个 route ID，165 个公开页面，Eleventy 输出 166 个文件。 |
| SEO | PASS | 165 个页面具有唯一 title、description、canonical、hreflang、Open Graph、Twitter 和索引配置。 |
| 导航与返回路径 | PASS | 165 个页面和 134 条产品返回路径一致。 |
| 静态资源与站内链接 | PASS | 1,999 个图片标签均有 alt；38,814 个站内引用无断链；512 个新窗口链接均有 `rel=noopener`。 |
| 产品目录结构 | PASS | 首页分类、所有产品分类和二级产品结构使用同一份目录数据；已删除的重复产品不再进入目录。 |
| 产品筛选与分页 | PASS | 英文/阿拉伯文、桌面/手机、`file://`/HTTP 共 8 种场景；16 页、184 个产品均通过，返回、刷新、筛选和搜索状态正常。 |
| 图片加载 | PASS | 8 种目录场景当前页 12 张缩略图均能完成加载，切换条件无需浏览器刷新。 |
| 响应式、多语言与 RTL | PASS | 58 个代表性检查、668 个全站响应式/RTL 检查、432 个语言及返回路径检查通过。 |
| 水印与缩略图 | PASS | 388 个产品原图水印校验通过；184 个目录缩略图已重新生成。 |
| 联系方式一致性 | PASS | 页面统一使用 WhatsApp `+86 173 2652 8368` 和邮箱 `zhengcolin1@gmail.com`。 |

## 发布准备明细

### 1. 34 个产品已转为发布候选

34 个产品数据均已更新为 `publication.status = release-candidate`、`externalRelease = true`，对应英文和阿拉伯文共 68 个详情页。构建校验现在会拒绝草稿状态或缺少图片使用确认的产品进入发布版本。

- 24 个来自泉观电子画册扩展产品。
- 10 个来自独立的 documented product 数据。
- 生成页面中的 `local-draft` 数量为 0，`release-candidate` 详情页数量为 68。

结果：**PASS**

### 2. 3 个产品的 11 张图片已获得官网公开使用确认

| 产品 | 图片数 | 当前状态 |
|---|---:|---|
| Fire Equipment Cabinets | 4 | `user-confirmed-website-use` |
| Glass Bulb Fire Sprinkler | 3 | `user-confirmed-website-use` |
| Standard Response Fire Sprinkler | 4 | `user-confirmed-website-use` |

用户已明确确认以上 11 张图片允许用于川威官网公开展示。确认内容、图片路径、水印前后 SHA-256 和使用范围记录在 `docs/release/three-products-20260913/image-rights-confirmation.json`；34 个发布候选产品的官网图片使用记录现已全部闭环。

结果：**PASS**

### 3. `www` 域名入口不可正常访问

- `https://chuanweifire.com/`：200 OK。
- `https://www.chuanweifire.com/`：证书名称不匹配，curl 返回 `SEC_E_WRONG_PRINCIPAL`。
- `http://chuanweifire.com/`：能重定向到 HTTPS。
- `http://www.chuanweifire.com/`：404，没有重定向到主域名。

这会使输入 `www.chuanweifire.com` 的客户看到证书错误或 404。上线前应为两个域名配置有效证书，并把 HTTP/HTTPS 的 `www` 请求统一 301 到 `https://chuanweifire.com/`。

结果：**FAIL（关键阻断项）**

### 4. 尚未形成可追溯的正式发布版本

当前工作分支为 `codex/multilingual-site-migration`，工作区包含大量未提交的网站、产品和图片变更；现有发布文档仍直接使用 `master`。上线前必须先固定提交、明确合并目标、重新构建发布版本并保留回滚点，不能直接把当前工作目录覆盖到服务器。

结果：**FAIL（发布流程阻断项）**

## 建议随部署处理

主域 HTTPS 响应目前没有 HSTS、Content-Security-Policy、X-Content-Type-Options、Referrer-Policy 和 Permissions-Policy。静态官网能够运行，但建议在 Nginx 中补齐响应头，并为图片、CSS 和 JavaScript 设置长期缓存策略。

结果：**PARTIAL（不单独阻止内容发布，但应在正式上线时处理）**

## 本次检查中已修正

- 首页和所有产品页统一使用同一份产品分类数据。
- “软管、喷嘴和接头”分类删除已下架的水带/配套软管组件表述。
- 清理两个产品页重复叠加的 CSS 水印，保留图片文件水印。
- 修正产品分类导航和目录性能测试，使其符合当前二级目录与动态 DOM 更新方式。
- 修正手机端固定页头遮挡产品详情锚点的问题。
- 删除 Breeching Inlets 的 2-way 和 4-way 两个配置；对应详情页已无保留产品，因此同时删除英文/阿拉伯文页面、路由、图片和目录入口。
- Eleventy 在 Windows 遇到短暂 `sitemap.xml` 文件占用时最多重试 5 次。
- 新增 `npm run validate:static-release`，并接入正式构建。

## 上线顺序

1. 已完成：确认上述 11 张图片可用于川威官网公开展示，并保存带哈希的确认记录。
2. 已完成：将 34 个产品转换为发布候选，并完成全套构建和浏览器回归。
3. 固定发布提交或合并到正式发布分支，生成可回滚的部署版本。
4. 修复 `www` 证书与重定向，补充 Nginx 安全头和缓存规则。
5. 部署后复查主域、`www`、产品目录、分页、筛选、图片和 WhatsApp 询盘链接。
