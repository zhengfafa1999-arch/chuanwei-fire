# MIG-905 内容清理与待核实资料

状态：进行中；本轮已识别问题已修正，旧详情页资料核实未全部完成。

## 已处理的问题

- 水雾喷嘴分类卡片原先仍使用双槽水幕喷头图。改为用户确认的带入口过滤器水雾喷嘴照片，并同步英文、阿拉伯文分类输出。
- 扩大覆盖喷头来源说明明确指出三张 temporary-reference 图片来自百度。撤下这三张图在英雄区、图库、预览、脚本和分享信息中的引用；改用现有分类中的直立型照片作为单一配置展示，其他配置不再配用这些参考图。原文件保留，便于追溯。
- 12 个旧详情页撤下无法匹配证据的国标型式试验/国标生产或 EN 671-1 符合性断言；RIA25 名称继续保留，EN 671-1 作为买方可提出并待核对文件的要求。
- 信号蝶阀的 IP67、80%信号流量、890 N、5000 次、绝缘和触点电阻试验结果撤下。干式报警阀的实测差压比和实测报警入口压力撤下。雨淋阀的响应时间、动作压力、声级等未核实试验相关结论改为按型号询问。
- 不再将 QT450-10 和 ASTM A536 65-45-12 写成已证实的双重材质牌号。
- 雨淋阀、干式报警阀、预作用阀组旧型号表的具体高度撤下，保留尺寸和工厂参考的询盘入口；预作用阀两个重复的新旧版行合并，当前供货结构需要另行确认。
- 首页三张生成场景图添加英文、中文、阿文示意说明；关于页的木箱图也明确为包装示意。

## 保留的已确认边界

湿式报警阀仍为 1.6 MPa，阀体 QT450-10，阀瓣球墨铸铁，压力开关 DC24V、1NO、1A、0.05 MPa；保留 DN250 法兰和 DN200 沟槽常规结构，不恢复 ZSFZ150-2.5。其七个参考高度在用户已接受的文案资料中有记录，未随其他未核实阀门高度一起撤下。

水雾喷嘴仍为开式、1.2 MPa，采用已确认的五张替换照片。水幕喷头压力、湿式报警阀安装/水流方向、水雾过滤网尺寸仍保持未确认。

## 尚未完成的资料核实

以下 29 个英文详情页没有迁移为逐字段带来源的产品数据。原页面文字可用于寻找资料，不能单独证明参数已核实。具体字段清单见同名 JSON；需要原始参数表、对应型号报告以及匹配照片，逐项标记用户确认或文件依据后才能关闭 MIG-905。

| 产品 | 旧页技术字段数 | 状态 |
| --- | ---: | --- |
| Diaphragm Deluge Valve | 16 | 本轮已修正已识别问题 |
| Preaction Valve Assemblies | 9 | 本轮已修正已识别问题 |
| Dry Pipe Alarm Valve | 12 | 本轮已修正已识别问题 |
| Standard Response Fire Sprinklers | 14 | 待逐项核实 |
| Glass Bulb Fire Sprinkler | 14 | 待逐项核实 |
| Concealed Pendent Fire Sprinklers | 13 | 待逐项核实 |
| Dry Pendent Fire Sprinklers | 12 | 待逐项核实 |
| Extended Coverage Quick Response Sprinklers | 12 | 本轮已修正已识别问题 |
| Large K-Factor & ESFR Sprinklers | 18 | 待逐项核实 |
| RIA 25 Fire Hose Reel | 14 | 本轮已修正已识别问题 |
| Straight-Stream Fire Hose Reel | 10 | 本轮已修正已识别问题 |
| Jet / Spray Fire Hose Reel | 11 | 本轮已修正已识别问题 |
| Heavy-Duty Fire Hose Reel | 11 | 待逐项核实 |
| Lever-Operated Grooved Butterfly Valve | 12 | 本轮已修正已识别问题 |
| Lever-Operated Wafer Butterfly Valve | 12 | 本轮已修正已识别问题 |
| Grooved Supervisory Butterfly Valve | 12 | 本轮已修正已识别问题 |
| Wafer Supervisory Butterfly Valve | 12 | 本轮已修正已识别问题 |
| Flanged Supervisory Gate Valve | 12 | 本轮已修正已识别问题 |
| Grooved Supervisory Gate Valve | 12 | 本轮已修正已识别问题 |
| NRS Gate Valve | 8 | 待逐项核实 |
| OS&amp;Y Gate Valve | 11 | 本轮已修正已识别问题 |
| Standard Indoor Fire Hydrant | 10 | 待逐项核实 |
| Export Slanted Single-Outlet Hydrant Valve | 15 | 待逐项核实 |
| Double-Outlet Indoor Fire Hydrant | 12 | 待逐项核实 |
| Rotating &amp; Pressure-Regulating Indoor Fire Hydrant | 8 | 待逐项核实 |
| British-Type Pillar Fire Hydrant (BS-750) | 14 | 待逐项核实 |
| French-Pattern Dry-Barrel Hydrant | 4 | 待逐项核实 |
| Indonesian-Pattern Wet-Barrel Hydrant | 4 | 待逐项核实 |
| Russian-Pattern Above-Ground Hydrant | 4 | 待逐项核实 |

三份管理体系证书保持原有持有人及范围说明。本轮没有进行证书真伪或认证机构资质审查，也没有添加 ECM、UL、FM、CE 等产品认证。

## 验证

- 全站构建、路由、SEO、导航、模板和链接验证通过。
- 新增 validate:content 对全部 64 个正式页面检查已撤下内容不再出现，并强制水雾分类照片属于已确认图库。
- Edge 四档宽度与语言回归结果及内容截图保存至 docs/evidence/content-review/2026-09-05。
- 本轮修改从共享源和旧详情页落地，构建重新生成多语言输出；源文件中的更正无需逐语言重复维护。

## 后续资料

优先提供信号蝶阀及报警阀的对应型号试验报告；随后按 MIG-102 起的产品顺序核实旧页规格。扩大覆盖喷头还需与最终供货型号一致的下垂型、边墙型照片。已有数据及证据状态必须先核对，再决定恢复具体技术结论。

