# SEO 和访客统计上线操作

这份操作用于 `chuanweifire.com`。Search Console、Yandex Webmaster 和 Nginx 需要在对应账号及服务器中完成配置。根据站点当前运营选择，GA4 前端统计已停用，官网不加载 Google Analytics，也不显示统计同意界面。

2026-09-22 的资源状态和重点页面检查见 [搜索与统计基线](seo-baseline-2026-09-22.md)。

## GA4 当前状态

GA4 媒体资源和 Search Console 关联保留，但 `site-src/_data/analyticsConfig.json` 中的 `ga4MeasurementId` 设为 `null`。构建时会移除所有页面里的 GA4 加载器和统计同意界面。不要在页面模板中另外加入 Google 标签，否则会绕过这一站点选择。

服务器日志日报方案暂缓。如以后重新启用 GA4，需先重新确认统计范围和访客同意方案，再恢复 Measurement ID 并完成浏览器验证。

<!-- Historical setup reference retained below for a future approved reactivation.

## 创建 GA4 并生成网站版本

1. 用公司持有的 Google 账号在 [Google Analytics](https://analytics.google.com/) 创建 CHUANWEI FIRE 媒体资源，添加网址为 `https://chuanweifire.com` 的**网站数据流**。在数据流详情复制以 `G-` 开头的 **Measurement ID**。
2. 在网站数据流的**增强型衡量**设置中保留网页浏览量，关闭出站点击和表单互动的自动采集。网站会自行发送不含完整链接或表单内容的询盘事件。
3. 将实际编号填入 `site-src/_data/analyticsConfig.json` 的 `ga4MeasurementId`，然后运行 `npm run build`。编号会持久保存在站点源码中，后续重建不会意外关闭统计。该值为 `null` 时构建可通过，但 GA4 不会加载，也不会显示同意提示。不要把账号密码或 API 密钥写入代码。
4. 检查 `npm run validate:analytics` 和 `npm run validate:seo`，再按正式发布流程提交和部署构建产物。GA4 Measurement ID 是公开的网站标识，不是账号密码。

网站只在访客同意后加载 Google 标签。测试接受、拒绝和随后修改选择；接受后在 GA4 **实时**或 **DebugView** 查看访问和事件。四个事件名称是 `whatsapp_click`、`email_click`、`inquiry_form_to_whatsapp` 和 `catalog_request_click`。把它们作为四类独立的询盘意向观察，不把点击次数称为实际成交询盘。

在 GA4 **Admin → Data display → Custom definitions** 中，为事件参数 `site_route`、`product_family`、`site_language` 建立事件范围的自定义维度。用**流量获取**看来源与国家，用**着陆页**看入口页面；在**探索**中按产品类别拆分上述四个事件。`inquiry_form_to_whatsapp`、`whatsapp_click` 和 `email_click` 可分别设为关键事件，但报表应保持分开，避免把一次询盘过程中的多次点击相加成客户数。

GA4 事件只包含页面路由、产品类别、语言和不带查询参数的页面地址。不要在 GA4 中开启会自动采集完整出站链接或表单值的功能；网站表单生成的 WhatsApp 链接可能包含客户填写的信息。

-->

## 验证搜索平台

1. 在 [Google Search Console](https://search.google.com/search-console/) 添加 `chuanweifire.com` **网域资源**，按界面给出的 TXT 值在域名 DNS 中验证。提交 `https://chuanweifire.com/sitemap.xml`。
2. 用 **网址检查**分别查看英文和阿语的四个重点产品页，记录是否已收录、Google 选用的 canonical 和抓取问题。提交 sitemap 不保证页面立即收录。
3. 在 GA4 管理界面关联刚验证的 Search Console 资源，按搜索查询、国家和着陆页查看自然搜索表现。
4. 在 [Yandex Webmaster](https://webmaster.yandex.com/) 添加 `https://chuanweifire.com/`，完成所有权验证并提交同一个 sitemap。俄罗斯市场本轮仍使用现有英文页面，不新增俄语内容。

## 统一域名入口

服务器需要同时为 `chuanweifire.com` 和 `www.chuanweifire.com` 配置有效证书。确认两个 DNS 名称都指向当前服务器后，签发包含两个名称的证书。将仓库中的 `ops/chuanweifire.nginx.conf` 与服务器现有配置逐项比对，保留服务器已有的必要设置，再合并域名跳转规则；先备份配置，并确认实际站点目录及证书路径。运行 `sudo nginx -t`，成功后再重载 Nginx。

如果服务器使用现有 Certbot 和 Nginx，可以在确认 DNS 后执行以下签发命令，再核对实际证书目录：

```bash
sudo certbot certonly --nginx --cert-name chuanweifire.com -d chuanweifire.com -d www.chuanweifire.com
```

上线后分别请求以下入口，并确认最终到达 `https://chuanweifire.com/`；产品页应保留原路径及查询参数：

- `http://chuanweifire.com/`
- `https://chuanweifire.com/`
- `http://www.chuanweifire.com/`
- `https://www.chuanweifire.com/`

## 每周查看效果

记录 Search Console 的搜索曝光、点击、查询和着陆页；记录 GA4 的用户、会话、来源、国家、产品页和四类询盘意向事件。按中东、东南亚、俄罗斯和欧洲分组观察。首次上线约四周后再比较趋势，决定下一批页面。GA4 用户数是分析口径；拒绝同意或屏蔽统计的访问不会完整计入。
