# MIG-004 至 MIG-006 公共页面共享模板迁移

## 结果

- `about.html` / `ar/about.html`、`downloads.html` / `ar/downloads.html`、`contact.html` / `ar/contact.html` 现由同一个 Eleventy 模板和同一份双语页面数据生成。
- 英文页面使用 LTR，阿拉伯文页面使用 RTL；六页均有自 canonical、EN/AR hreflang 和指向英文页的 x-default。
- 首页、产品总目录和九个产品分类页的公共导航已指向独立 About、Downloads、Contact 页面；sitemap 由路由注册表自动新增六个公共页面地址。
- 正式 HTML 从 60 个增至 63 个；模板生成页面从 28 个增至 34 个；剩余 29 个手写页面均为英文产品详情页，不在本次范围内。

## 事实来源与使用边界

| 事实 | 仓库来源 | 页面处理 |
| --- | --- | --- |
| 品牌名称 CHUANWEI FIRE | 现有首页及全站品牌标识 | 作为网站与出口展示品牌使用 |
| 位于 Nan'an, Quanzhou, Fujian, China；2017；5,000 m²；CNC | `site-src/home.njk` 中现有公司声明 | 标明面积为公司提供信息，CNC 不作为任何标准或认证证明 |
| WhatsApp `+86 173 2652 8368`、邮箱 `zhengcolin1@gmail.com` | `site-src/home.njk` 与现有询盘逻辑 | EN/AR 共用，不新增联系方式 |
| 证书持有人 GUANYA FIRE-PROTECTION EQUIPMENT CO., LTD. 及三个证书编号 | `assets/home/certificates/iso-9001.png`、`iso-14001.png`、`iso-45001.png` 与现有首页证书区 | 明确为管理体系证书，不表述为 UL、FM、CE 或产品认证 |
| 可公开访问文件 | 上述三张证书图片 | 下载中心只直链实际存在的文件；产品目录、数据表、图纸仍按型号和需求索取 |

## 验收

| 检查 | 结果 |
| --- | --- |
| `npm run build` | PASS：46 个逻辑路由覆盖 63 个正式 HTML；六个公共页共享模板专项校验通过；断链检查通过 |
| `npm run validate:browser` | PASS：Microsoft Edge 152.0.4191.53；桌面 1440×900 与手机 390×844 共 38 个页面/视口组合；4 个语言切换与偏好恢复场景 |
| 页面属性 | PASS：六页 lang/dir、canonical、EN/AR hreflang、x-default、标题、模板渲染和横向溢出均通过 |
| 视觉抽查 | PASS：英文 About 桌面、阿文 Downloads 桌面、英文 Contact 手机、阿文 About 手机布局与 RTL 方向正常 |

证据位于 `docs/evidence/multilingual-browser/2026-09-04/`，其中 `browser-validation.json` 保存逐页属性，README 汇总矩阵，公共页面包含 EN/AR 桌面与手机截图。

## 待确认项

- 尚无可公开下载的产品总目录、产品数据表、测试报告或图纸文件；收到已确认文件后再加入下载中心。
- 如需公开更完整的街道地址、公司法定中英文名称或其他电话/邮箱，须先提供可核验资料。

## 提交状态

实现与验收均完成，可作为一个公共页面迁移原子提交。按本次授权未执行 commit、push 或 deploy。
