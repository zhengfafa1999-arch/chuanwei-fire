# CHUANWEI FIRE 搜索与统计基线（2026-09-22）

本记录来自当天的 Google Search Console 网址检查和站点地图页面，以及 GA4 管理界面。收录状态会随 Google 后续抓取而变化；请在上线后重新检查。

## 已建立的资源

- Search Console 网域资源 `chuanweifire.com` 已通过 DNS TXT 验证。验证记录应保留在 DNS 中。
- `https://chuanweifire.com/sitemap.xml` 已提交并成功处理，当前发现 165 个网页。线上仍是发布前的 sitemap；仓库版本已移除不真实的固定 `lastmod`，需部署后再核对。
- GA4 媒体资源“CHUANWEI FIRE 官网”的网站数据流曾配置衡量 ID `G-YTE4033HN3`，并已与上述 Search Console 网域资源关联。根据后续运营选择，前端 GA4 已停用；媒体资源保留，但当前网站版本不加载 Google 标签，也不显示统计同意界面。

## 首批产品详情页 URL 检查

| 产品页 | 英文页 | 阿语页 |
| --- | --- | --- |
| 标准响应喷淋头 | 已抓取，尚未编入索引；未报告 Google 选用的规范网址 | 已收录；Google 选用所检查的阿语网址 |
| 湿式报警阀 | 已收录；Google 选用所检查的英文网址 | Google 尚无法识别该网址；无抓取与规范网址数据 |
| OS&Y 闸阀 | 已收录；Google 选用所检查的英文网址 | Google 尚无法识别该网址；无抓取与规范网址数据 |
| RIA 25 卷盘 | 已收录；Google 选用所检查的英文网址 | 已收录；Google 选用所检查的阿语网址 |

英文喷淋头的“已抓取，尚未编入索引”不是 canonical 冲突的证据；两条“Google 尚无法识别”也不能单凭当前状态判断页面质量。站点地图刚于当天提交，待 Google 处理和新版页面上线后复查。

## 上线前后待核对

1. 将当前构建产物部署到正式服务器，确认页面不加载 GA4、没有统计弹窗。服务器日志日报方案暂缓。
2. 复查上述未收录或未知的三条网址，以及四条分类页；记录实际抓取与 Google 选用的规范网址。
3. 线上 `http://www.chuanweifire.com/` 的 404 已于 2026-09-22 修复为跳转至 HTTPS 主域。`https://www.chuanweifire.com/` 仍缺少匹配 `www` 的证书，需另行处理并复测。
4. Yandex Webmaster 尚待用公司持有的 Yandex ID 登录、验证网站并提交同一站点地图。
