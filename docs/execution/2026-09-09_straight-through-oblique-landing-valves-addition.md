# CATWEB-007 直通式与斜式室内栓阀新增记录

## 结果

新增 `Straight-Through and Oblique Landing Valves` 产品系列，并由同一份结构化数据生成英文和阿拉伯文详情页。产品进入两个语言的室内消火栓分类；本任务没有改写现有产品详情内容。

## 页面与数据

- 共享数据：`site-src/_data/documented-products/straight-through-oblique-landing-valves.json`
- 英文输出：`products/室内消防栓/straight-through-oblique-landing-valves.html`
- 阿拉伯文输出：`ar/products/straight-through-oblique-landing-valves/index.html`
- 分类入口：`products/室内消防栓/室内消防栓.html`、`ar/products/indoor-hydrants/index.html`
- 图片目录：`products/室内消防栓/straight-through-oblique-landing-valves/`

## 已纳入的确认内容

- 构型：直通式、斜式螺纹进口、斜式法兰进口
- `HS-031`：2.5 in NPT 进口
- `HS-011`：2.5 in BSP 进口
- `HS-012`：2.5 in BSP / BSPT 进口
- `HS-013`：2.5 in NPT 进口
- `HS-020`：2.5 in BS4504 进口
- 表列公共出口：2.5 in BS336
- BSP、BSPT 可供，特殊连接支持按要求确认

`HS` 编号只作为 v11 图册选型参考，不作为 CHUANWEI 工厂型号，也不作为某项标准认证证据。

## 保留为询盘确认

- 正式工厂型号
- 阀体材质与表面处理
- 工作压力与试验压力
- 接口实际兼容性及配套连接件
- 外形尺寸、附件和包装
- 最终批准样品

页面没有添加未经核验的认证、性能或工程应用声明。

## 图片与发布边界

三张图片是从最终 v11 图册提取的展示图，用于区分直通式、斜式螺纹和斜式法兰构型，不作为精确螺纹、尺寸、内部结构或产品标识的证据。官网商用许可没有独立确认，因此页面保持本地草稿，数据保留 `externalRelease: false` 与图片权利确认门槛。

## 验证

- `npm run build`：通过；共享路由、SEO、导航、产品数据、分类入口和本地文件引用均通过校验。
- 文件预览定向测试：通过，覆盖桌面/手机 × 英文/阿拉伯文。
- HTTP 定向测试：通过，覆盖分类图片与文字入口、双向语言切换、刷新保留语言、3 图图库、放大、锚点、5 行选型表、页脚返回路径及移动端布局。
- 已人工核对英文桌面图库、阿拉伯文桌面选型表、英文手机图库和阿拉伯文手机规格区。
- 未运行完整全站浏览器回归，符合只测试修改页面的当前执行约定。

浏览器证据位于 `docs/evidence/catweb-007/file` 和 `docs/evidence/catweb-007/http`。
