# CATWEB-011 直流水枪新增记录

## 结果

新增 Straight-Stream Fire Hose Nozzles 英文与阿拉伯文详情页，以同一份结构化数据生成。水带、水枪及接口分类保留原有五款顺序，追加本款为第六款。现有产品详情、首页和共享样式没有内容变化。

旧“独立站”任务因上下文压缩失败而停止。本次从已保存的任务计划和 Git 提交 `e871652` 继续，没有复制完整聊天历史或修改旧任务记录。

## 页面与数据

- 数据：`site-src/_data/documented-products/straight-stream-fire-hose-nozzles.json`
- 英文：`products/消防水枪/straight-stream-fire-hose-nozzles.html`
- 阿拉伯文：`ar/products/straight-stream-fire-hose-nozzles/index.html`
- 分类：`products/消防水枪.html`、`ar/products/hoses-nozzles-couplings/index.html`
- 分类数据、路由、产品总目录和站点地图同步更新。

## 采用的事实

来源为 v11 官网交接 JSON 的 `catalog-p40`。最新用户确认优先于旧产品文件名和图片铸字。

| 构型 | 名义口径选项 | 枪体材质 | 喷射形式 |
| --- | --- | --- | --- |
| QZ | DN50 / DN65；图册对应 2 in / 2½ in | 铝合金 | 直流 |
| 俄式 | 2 in / 2½ in | 铝合金 | 直流 |

QZ 仅为构型名称。工厂型号、压力和流量按用户要求不在页面中显示，也没有将其重新添加为待确认字段。共享数据加载器要求的通用词典键不作为规格渲染。

名义口径不等于接口兼容证明。具体接口、配套件、数量、目的地及包装在询盘区确认；最终规格按报价和订单文件确定。不添加认证或未经确认的接口标准。

## 图片

原样复制交接包中的两张嵌入式图册展示图，没有生成、重绘或修改可见标记：

- `m01_m01_image82.png` → `products/消防水枪/straight-stream-fire-hose-nozzles/qz-catalog-display.png`，903 × 2746。
- `m01_m01_image83.png` → `products/消防水枪/straight-stream-fire-hose-nozzles/russian-pattern-catalog-display.png`，449 × 1127。

完整来源路径保存在产品 JSON 中。两图对应 QZ 和俄式构型，不作为精确尺寸或接口配合证据。页面标注为图册展示图，保持 `local-draft`、`externalRelease: false` 和官网图片许可待确认状态。本次未部署。

## 验证

- `npm run build` 通过：125 个输出路由的 SEO、导航、共享产品数据、分类入口和本地资源校验通过。
- `node tools/validate-listings.mjs` 通过，分类统计改为按实际数量输出。
- 文件预览与本地 HTTP 各通过桌面/手机 × 英文/阿拉伯文四组定向场景。
- 覆盖分类图片/文字入口、双向语言切换、刷新保留语言、两图图库、缩略图、前后切换与循环、滑动、放大与关闭、锚点、两行构型表和页脚返回。
- 人工核对桌面英文图库、桌面阿文构型表及手机阿文规格截图，图片比例、RTL 和技术数值显示正常。
- 证据：`docs/evidence/catweb-011/file`、`docs/evidence/catweb-011/http`。
- 文档空白检查通过；本机没有可离线调用的 Prettier，自动排版未执行，文档格式已人工检查。

没有重复运行全站浏览器回归。首次沙箱内测试浏览器未能启动，获执行环境自动批准后，同一测试通过。

## 下一项

CATWEB-012：Lever-Operated Fire Hose Nozzles（手柄式消防水枪）。先读取交接 JSON 的 `catalog-p41`，重点核对图片与选型表的对应关系；DN/GN 编号只作为选型参考，不作为工厂型号。继续以现有计划和执行记录作为交接入口。
