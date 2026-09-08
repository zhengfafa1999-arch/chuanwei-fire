# CATWEB-009 Breeching Inlets 新增记录

## 结果

新增 `Breeching Inlets` 产品系列，并由同一份结构化数据生成英文和阿拉伯文详情页。产品作为第五款进入两个语言的消防水泵接合器分类；本任务没有改写现有接合器详情内容。

## 页面与数据

- 共享数据：`site-src/_data/documented-products/breeching-inlets.json`
- 英文输出：`products/消防水泵接合器/breeching-inlets.html`
- 阿拉伯文输出：`ar/products/breeching-inlets/index.html`
- 分类入口：`products/消防水泵接合器.html`、`ar/products/fire-department-connections/index.html`
- 图片目录：`products/消防水泵接合器/breeching-inlets/`

## 已纳入的确认内容

| 配置 | 入口 | 系统出口 | 压力等级 | 工作压力 | 试验压力 |
|---|---|---|---|---|---|
| 2 路 | 2 × Ø65 mm instantaneous | DN100 / 4 in flanged | PN16 | 16 bar / 1.6 MPa | 20 bar / 2.0 MPa |
| 4 路 | 4 × Ø65 mm instantaneous | DN150 / 6 in flanged | PN16 | 16 bar / 1.6 MPa | 20 bar / 2.0 MPa |

压力等级、工作压力和试验压力在页面中保持为三个独立字段。接口文字仅作为 v11 图册选型信息，不表示认证或对所有配套件的通用兼容承诺。

## 保留为询盘确认

- 正式工厂型号
- 材质与表面处理
- 内部结构及是否配置特定止回机构
- 瞬时接口的准确制式和配套件
- 法兰孔型、尺寸及配对法兰
- 外形尺寸、附件和包装
- 最终批准样品

页面没有添加未经核验的材质、内部结构、认证或工厂型号声明。

## 图片与发布边界

两张 1280 × 1280 图片是用户提供的 2 路和 4 路产品图，用于识别产品系列，不作为精确尺寸、接口兼容性、内部结构或具体 SKU 的证明。交接记录没有独立确认官网商用许可，因此页面保持本地草稿，数据保留 `externalRelease: false` 与图片权利确认门槛。

## 验证

- `npm run build`：通过；共享路由、SEO、导航、产品数据、分类入口和本地文件引用均通过校验。
- 文件预览定向测试：通过，覆盖桌面/手机 × 英文/阿拉伯文。
- HTTP 定向测试：通过，覆盖分类图片与文字入口、双向语言切换、刷新保留语言、2 图图库、放大、锚点、2 行选型表、页脚返回路径及移动端布局。
- 已人工核对英文桌面图库、阿拉伯文桌面选型表、英文手机图库和阿拉伯文手机规格区。
- 未运行完整全站浏览器回归，符合只测试修改页面的当前执行约定。
- 生成页中未发现 UL、FM、CE、CCC 或 LPCB 声明。

浏览器证据位于 `docs/evidence/catweb-009/file` 和 `docs/evidence/catweb-009/http`。
