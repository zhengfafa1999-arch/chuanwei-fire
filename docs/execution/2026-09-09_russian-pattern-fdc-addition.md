# CATWEB-010 俄式消防水泵接合器新增记录

## 结果

新增 `Russian-Pattern Fire Department Connection` 产品，并由同一份结构化数据生成英文和阿拉伯文详情页。产品作为第六款进入两个语言的消防水泵接合器分类；本任务没有改写现有接合器详情内容。

## 页面与数据

- 共享数据：`site-src/_data/documented-products/russian-pattern-fire-department-connection.json`
- 英文输出：`products/消防水泵接合器/russian-pattern-fire-department-connection.html`
- 阿拉伯文输出：`ar/products/russian-pattern-fire-department-connection/index.html`
- 分类入口：`products/消防水泵接合器.html`、`ar/products/fire-department-connections/index.html`
- 图片目录：`products/消防水泵接合器/russian-pattern-fire-department-connection/`

## 已纳入的确认内容

- 工厂型号：`65-16K-65`
- 系统接口：DN100 底部法兰
- 消防进水口：2 × DN65 / KY66
- 工作压力：1.6 MPa / 16 bar
- 强度试验压力：2.4 MPa / 24 bar
- 附件：两个带固定链的闷盖

工作压力与强度试验压力在页面中保持为独立字段。KY66 作为已确认的接口文字保留，但不表示认证或对全部配套件的通用兼容承诺。

## 保留为询盘确认

- 材质与表面处理
- 内部结构及是否配置特定止回机构
- KY66 配套接口的实际兼容性
- DN100 法兰孔型及详细尺寸
- 安装方向、安装空间及系统侧要求
- 包装和最终批准样品

页面没有添加未经核验的材质、内部结构、认证或安装声明。

## 图片与发布边界

一张 1254 × 1254 正面图为用户提供图片，用于识别产品系列和双入口外观，不作为精确法兰、配套接口、内部结构或尺寸证明。交接记录没有独立确认官网商用许可，因此页面保持本地草稿，数据保留 `externalRelease: false` 与图片权利确认门槛。

## 验证

- `npm run build`：通过；共享路由、SEO、导航、产品数据、分类入口和本地文件引用均通过校验。
- 文件预览定向测试：通过，覆盖桌面/手机 × 英文/阿拉伯文。
- HTTP 定向测试：通过，覆盖分类图片与文字入口、双向语言切换、刷新保留语言、单图图库、放大、锚点、单行型号表、页脚返回路径及移动端布局。
- 已人工核对英文桌面图库、阿拉伯文桌面型号表、英文手机图库和阿拉伯文手机规格区。
- 未运行完整全站浏览器回归，符合只测试修改页面的当前执行约定。
- 生成页中未发现 UL、FM、CE、CCC 或 LPCB 声明。

浏览器证据位于 `docs/evidence/catweb-010/file` 和 `docs/evidence/catweb-010/http`。
