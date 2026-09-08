# CATWEB-008 水平手轮式消防栓阀新增记录

## 结果

新增 `Horizontal-Handwheel Landing Valves` 产品系列，并由同一份结构化数据生成英文和阿拉伯文详情页。产品作为第六款进入两个语言的室内消火栓分类；本任务没有改写现有产品详情内容。

## 页面与数据

- 共享数据：`site-src/_data/documented-products/horizontal-handwheel-landing-valves.json`
- 英文输出：`products/室内消防栓/horizontal-handwheel-landing-valves.html`
- 阿拉伯文输出：`ar/products/horizontal-handwheel-landing-valves/index.html`
- 分类入口：`products/室内消防栓/室内消防栓.html`、`ar/products/indoor-hydrants/index.html`
- 图片目录：`products/室内消防栓/horizontal-handwheel-landing-valves/`

## 已纳入的确认内容

- 产品特征：水平操作手轮
- `HSW-010`：2.5 in BSP 进口 / 2.5 in BS336 出口
- `HSW-011`：2.5 in BSPT 进口 / 2.5 in BS336 出口
- `HSW-012`：2.5 in JIS10K 进口 / 2.5 in BS336 出口
- `HSW-013`：2.5 in BS4504 进口 / 2.5 in BS336 出口
- `HSW-014`：3 in BS4504 进口 / 2.5 in BS336 出口
- 用户确认：所示产品不是减压阀，也不是稳压阀

`HSW` 编号只作为 v11 图册选型参考，不作为 CHUANWEI 工厂型号。页面中的 BSP、BSPT、JIS10K、BS4504 和 BS336 仅用于描述图册接口选项，不表示产品取得了相应认证。

## 保留为询盘确认

- 正式工厂型号
- 阀体材质与表面处理
- 工作压力与试验压力
- 接口实际兼容性及配套连接件
- 外形尺寸、附件和包装
- 最终批准样品

页面没有添加未经核验的认证、压力、材质或工程应用声明。

## 图片与发布边界

两张 1200 × 1200 图片是从最终 v11 图册交接包提取的展示图，分别用于识别螺纹进口和法兰进口构型，不作为精确尺寸、接口兼容性、内部结构或产品标识的证据。官网商用许可没有独立确认，因此页面保持本地草稿，数据保留 `externalRelease: false` 与图片权利确认门槛。

## 验证

- `npm run build`：通过；共享路由、SEO、导航、产品数据、分类入口和本地文件引用均通过校验。
- 文件预览定向测试：通过，覆盖桌面/手机 × 英文/阿拉伯文。
- HTTP 定向测试：通过，覆盖分类图片与文字入口、双向语言切换、刷新保留语言、2 图图库、放大、锚点、5 行选型表、页脚返回路径及移动端布局。
- 已人工核对英文桌面图库、阿拉伯文桌面选型表、英文手机图库和阿拉伯文手机规格区。
- 未运行完整全站浏览器回归，符合只测试修改页面的当前执行约定。
- 生成页中未发现 UL、FM、CE、CCC、LPCB 或未确认压力值。

浏览器证据位于 `docs/evidence/catweb-008/file` 和 `docs/evidence/catweb-008/http`。
