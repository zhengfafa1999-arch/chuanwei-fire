# CATWEB-006 马鞍式水流指示器新增记录

## 结果

新增 `ZSJZ-M-1.2` 马鞍式水流指示器产品系列，并由同一份结构化数据生成英文和阿拉伯文详情页。产品同时进入两个语言的“报警阀及系统装置”分类；本任务没有改写任何现有产品详情内容。

CARX 复合式排气阀按用户要求继续不上架，并已在升级计划中移入暂缓清单。

## 页面与数据

- 共享数据：`site-src/_data/documented-products/saddle-type-waterflow-switches.json`
- 英文输出：`products/消防阀/saddle-type-waterflow-switches.html`
- 阿拉伯文输出：`ar/products/saddle-type-waterflow-switches/index.html`
- 分类入口：`products/消防阀.html`、`ar/products/system-valves/index.html`
- 代表图片：`products/消防阀/saddle-type-waterflow-switches/zsjz-dn100-reference.png`

## 已确认内容

- Factory Series：`ZSJZ-M-1.2`
- 口径范围：DN50–DN200 / 2–8 in
- 型号：`ZSJZ50-M-1.2`、`ZSJZ65-M-1.2`、`ZSJZ80-M-1.2`、`ZSJZ100-M-1.2`、`ZSJZ125-M-1.2`、`ZSJZ150-M-1.2`、`ZSJZ200-M-1.2`
- 类型：马鞍式、U 型螺栓安装、无延迟器
- 额定工作压力：1.2 MPa / 12 bar / 约 175 psi
- 壳体：ADC12 / A380 铝合金
- 鞍座：QT450-10 球墨铸铁
- U 型螺栓：Q235B 热浸镀锌钢
- 叶片：PE；密封垫：EPDM
- 应用：湿式自动喷水灭火系统水平管道
- 安装：水平管道，壳体朝上或侧向，U 型螺栓从管道下方安装
- 技术/制造参考：GB 5135.7-2018；页面没有把它表述为认证

当前白底图只代表 DN100 样品，页面没有据此推导其他口径的外形尺寸。

## 保留为询盘确认

- 各口径对应管外径与安装尺寸
- 触点形式和触点容量
- 报警流量与复位时间
- 工作温度范围和外壳防护等级
- 包装方式

页面没有添加 UL、FM、CE、CCC 或其他未经逐 SKU 核验的认证声明。

## 发布边界

当前状态为本地草稿。图片来自归档交接资料，但官网商用许可没有独立确认，因此数据保留 `externalRelease: false` 和图片权利确认门槛。

## 验证

- `npm run build`：通过，共享路由、SEO、导航、产品数据、分类入口和本地文件引用均通过校验。
- 文件预览定向测试：通过，覆盖桌面/手机 × 英文/阿拉伯文。
- HTTP 定向测试：通过，覆盖分类图片与文字入口、双向语言切换、刷新保留语言、图库、放大、锚点、7 行型号表、页脚返回路径及移动端布局。
- 未运行完整全站浏览器回归，符合“只测试修改页面”的当前执行约定。

浏览器证据位于 `docs/evidence/catweb-006/file` 和 `docs/evidence/catweb-006/http`。
