# MIG-802 消防水泵接合器多语言迁移

本轮只处理消防水泵接合器分类的英文和阿拉伯文详情入口。页面沿用当前分类中的四类产品名称和对应图片，不恢复历史参数，也不新增未经确认的规格、材质、压力或标准信息。

## 迁移范围

- Freestanding Above-Ground FDCs / وصلات FDC أرضية فوق سطح الأرض
- Alternative Freestanding Configurations / تكوينات أرضية بديلة
- Underground FDC Assemblies / مجموعات FDC تحت الأرض
- Wall-Mounted & Grooved Families / فئات جدارية ومحززة

英文详情位于 `products/消防水泵接合器/`，阿文详情位于 `ar/products/`。八个输出页面复用询盘型产品共享模板，并由四份产品数据生成。

## 实施结果

- 分类页四款产品的图片和文字入口均进入相同语言的对应详情页。
- 每款详情页保留当前名称和图片，仅提供产品识别、询盘说明和联系入口。
- 英文和阿文共用详情模板、路由、导航及 SEO 结构，切换语言时保持在同一产品。
- 询盘型产品校验已扩展至消防水泵接合器分类，并增加四款产品顺序、路由和入口的严格检查。
- 四款产品使用一次浏览器会话完成定向验证，减少重复启动浏览器的等待时间。

## 验收结果

| 检查 | 结果 |
| --- | --- |
| 快速全站构建、111 个正式输出、SEO、导航与断链检查 | PASS |
| 九份询盘型产品数据、十八个英阿详情输出及未确认技术声明检查 | PASS |
| 四款详情：单次 HTTP 浏览器会话共 16 个桌面/手机 × 英/阿场景 | PASS |
| 分类页：文件与 HTTP 各 20 个英阿入口、切换、返回和手机场景 | PASS |
| 四款顺序、八张双语卡片和十六个图片/文字链接静态校验 | PASS |

验证证据位于：

- `docs/evidence/focused/fire-department-connections-batch/http/`
- `docs/evidence/focused/fire-department-connections/file/`
- `docs/evidence/focused/fire-department-connections/http/`

## 下一项

下一项为 MIG-906 最终构建与部署准备。MIG-905 和 MIG-210 继续保持暂停；本轮不推送、不部署。
