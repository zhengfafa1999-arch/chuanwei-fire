# 官网常规产品资料补充核验

核验日期：2026-10-25。已更新本地官网，未部署。此次承接部署前审查，不改动此前审查快照。

## 已写入官网

11 个产品、22 个英阿页面有更新。其中 5 个产品新增 37 行规格，另外 6 个产品补充通用原理和选型说明。详细字段见 [changes.json](changes.json)，修改前数据在 `before/`。

| 产品 | 核验依据 | 本次补充 |
|---|---|---|
| JTF-GOM-TX3120A 复合烟温探测器 | [泰和安官方产品页](https://www.tandatech.com/productinfo?id=1801010043)，说明书 V1.1，2023.05，第 1、3 页；底座来自同页产品简介 | A2R、二总线、编码范围、TX3986 底座、温湿度、ABS、约 93 g；将静态/报警电流纠正为 ≤0.4/≤0.7 mA |
| TX3212 输入输出模块 | [泰和安官方产品页](https://www.tandatech.com/productinfo?id=1801020109)，说明书 V1.4，2020.03，第 1、2、4 页；底座与通道来自同页简介 | T3、总线脉冲电压、独立电源、输入触点、输出容量、编码、含底座尺寸、环境范围；明确不能直接驱动高压大功率负载 |
| TX3307A 声光警报器 | [泰和安官方产品页](https://www.tandatech.com/productinfo?id=1801040103)，说明书 V1.0，2021.11，第 1 页；底座来自同页简介 | 电源、电流、声压及正前方 3 m 测量条件、闪光频率、二总线、底座、尺寸、温湿度；所有新增字段均标记只适用于 TX3307A，不外推到 TX3307 |
| J-SJP-M-TX3142 手动报警按钮 | [泰和安官方产品页](https://www.tandatech.com/productinfo?id=1801030106)，说明书 V1.2，2021.04，第 1、3 页 | 总线脉冲电压、电流、干接点容量、钥匙复位、二总线、TX3988、含底座尺寸、IP43/室内、温湿度 |
| 沟槽转换法兰 | [原供应商同商品](https://detail.1688.com/offer/1062903625929.html)，本地保存的完整商品标题 | 球墨铸铁。纠正之前对“其它”属性的解读：它是未分类，不是明确的另一种材料。仅采用标题明示的材质，不推断 QT 牌号或压力等级 |
| 充液压力表、压力表缓冲弯管 | [WIKA 充液原理](https://blog.wika.com/en/products/filling-liquids-pressure-gauges-usage-advantages/)、[压力表产品说明](https://www-prod.wika.com/en-en/pressure_gauges.WIKA) | 充液减振、壳内填充液与过程介质应区分；弯管可作为过程与表之间的冷却元件。没有套用 WIKA 产品的具体温压范围或填充液型号 |
| 消防稳压设备、卧式单级泵、立式单级泵、立式多级泵 | [Grundfos 稳压泵原理](https://www.grundfos.com/ca/learn/research-and-insights/jockey-pump)、[工作点说明](https://www.grundfos.com/au/learn/research-and-insights/duty-point) | 稳压用途；流量和扬程需要对应同一个工作点，结合曲线、吸入条件和安装图选型。没有将其他厂家泵参数写为嘉寻泵参数 |

新增英文与阿拉伯语参数已保持相同范围。阿语中的数字、负号、电压区间及单位做方向隔离，避免倒序显示。

## 查到但不能直接作为本商品规格的信息

| 分组 | 查到的资料与处理结果 |
|---|---|
| 嘉寻消防泵与控制柜 | 找到[原厂家电子目录](http://shanghaijiaxun.com/81.html)，保存 12 张目录扫描图。印刷第 7–8 页为系列范围，第 9–10 页为控制柜系列。目录中的卧式 JXW 系列范围与源商品小流量 JXL 候选不对应；柜型包含 JX-ATS-630A，并非当前 JX-ATS-63A。因此不套用系列材质、功率、尺寸或电流作为该 SKU 参数。目录中的旧证书图也不作为当前认证证明。 |
| TX3110N、TX3100N、TX3008NL | 厂家技术站已找到准确型号说明书目录：[TX3110N](http://jifu.tandatech.com/Home/downFile/downlist_id/11164)、[TX3100N](http://jifu.tandatech.com/Home/downFile/downlist_id/11156)、[TX3008NL 系列](http://jifu.tandatech.com/Home/downFile/downlist_id/11144)。下载响应为“您没有权限下载该文件”。保留目录和响应证据，没有绕过权限，也没有用旧 B/D 型参数替代 N 型。主机 1936 点/1600 点差异仍不能据搜索摘要消除。 |
| 沟槽管件与卡箍 | 已有 3 款新管件原资料明确球墨铸铁，本次补上法兰材质。搜索金顺厂家资料及通用沟槽技术，未获得同商品的尺寸/压力/牌号/密封材料表。[Victaulic 通用连接原理](https://www.victaulic.com/grooved-technology/)及[沟槽测量说明](https://assets.victaulic.com/assets/uploads/literature/ebooks/test-book/files/basic-html/page10.html)可用于核验方法；不据此填写金顺的沟槽公差、扭矩或压力等级。 |
| GL41H-16Q、J41T 等阀门 | 找到[品工 GL41H-16Q](https://www.pangovalve.cn/glq/156.html)、[大田 J41T](https://www.dtjt.com/proDetail_1417.html)等制造商页面。同通用型号不等于同制造商产品，网孔、阀内件、温度范围、尺寸与牌号不跨厂家套用。 |
| 仪表与球阀 | YN100BF 及相近型号的网页包含不同接头和隔膜结构；没有据此改变当前底部 M20×1.5 接口。PT 字样不能单凭同类网页认定全部螺纹标准、密封材料与压力等级。 |
| 手提/推车/悬挂灭火器 | 找到[Amerex 分类手册](https://amerex-fire.com/learning-center/manuals)和[清华实业超细干粉产品](https://www.qhxf.com/product-detail/BXZvgADW)等制造商资料。相同 FZX-ACT 型号代码也可能属于不同生产者。原商品的灭火级别、保护范围、喷射时间、试验压力仍不能引用这些厂家的数值。保留现有已确认的药剂类型和容量。 |
| 灭火球、箱柜气溶胶、手持消防水枪、防爆附件 | 尚未获得与照片和供货来源匹配的完整技术资料。尤其气溶胶原图 m²/m³ 冲突，不能用普通商家宣传面积补为保护容积；防爆标志与防爆证书不能根据相似外观推断。 |

以上“未取得”是本轮检索结果，不代表相关资料不存在。常规原理可以上网补充，具体供货参数、工程兼容与认证仍是不同层次的问题。

## 内部资料及发布范围

- 四份厂家说明书及文本、产品接口响应、嘉寻目录扫描图仅保存在本目录，作为核验依据，不作为官网公开下载内容。
- 下载的网页统一使用 `.html.txt` 存档，避免被静态站点误识别为正式页面。
- [更新后的技术核验清单](technical-follow-up.json)沿用此前 37 个产品范围，已替换本次解决的条目；工程匹配项与真正资料缺口分别记录。
- [完整公开发布包](../../release/web-spec-enriched-20261025/README.md)替代之前的本地发布包，仍未上传或部署。
- 检查结果见 [build.log](build.log)、[browser-validation.json](browser-validation.json)及发布包清单。构建与打包均保留内部资料排除规则。
