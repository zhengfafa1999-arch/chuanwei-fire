# 扩大覆盖快速响应喷头核对 · 2026-10-09

状态：本批网页更新及本地验证完成，等待页面验收；未提交、推送或部署。PDF制作及下载内容按用户要求暂缓，本批没有修改PDF。

## 已纳入网页的资料

国际站 EC-ZST 专属资料包中的《出口参数与证据台账.md》记录3 mm玻璃球、铜主体、不锈钢溅水盘、68°C、公制K115及BSPT螺纹族。此次复核已将主体和溅水盘材料分开写入主规格，不写具体合金牌号。

用户本次明确回复：

> 1.2mpa，也默认BSPT、可选NPT、镀铬、不用提供外箱数量

确认范围为 EC-ZSTX / EC-ZSTZ / EC-ZSTBS 115-68°C Q3A 三个现有型号。压力问题明确询问最大工作压力，因此网页采用该字段；不把它解释为试验压力或认证等级。

| 中文核对 | English value | 依据 |
| --- | --- | --- |
| DN20 / ¾英寸公称尺寸 | DN20 / ¾ in | 原规格保留；不等同于完整螺纹标注 |
| 公制K115 / 美制K8.0 | K8.0 US / K115 metric | 原规格保留，不表示外国认证参数 |
| 68°C / 155°F，红色3 mm玻璃球 | 68°C / 155°F; 3 mm quick-response glass bulb | 原型号及档案确认 |
| 铜主体，不锈钢溅水盘 | Copper body; stainless steel deflector | 国际站专属证据台账中的用户确认 |
| 表面镀铬 | Chrome-plated finish | 本次用户确认；未声明底层镀层或厚度 |
| 默认BSPT，可选NPT | BSPT (default) / NPT (optional) | 本次用户确认；完整螺纹标注按订单匹配 |
| 最大工作压力1.2 MPa / 12 bar / 约174 psi | 1.2 MPa / 12 bar / approx. 174 psi | 本次用户确认；bar为精确换算，psi取近似整数 |

| 安装形式 | Factory Model |
| --- | --- |
| 下垂 Pendent | EC-ZSTX 115-68°C Q3A |
| 直立 Upright | EC-ZSTZ 115-68°C Q3A |
| 水平侧壁 Horizontal Sidewall | EC-ZSTBS 115-68°C Q3A |

三行型号、行序、原主图库及实物标记保持。技术标题和选型说明改为买家语言；询盘先提供型号/安装方向与数量，其他要求可补充。新增包装段及锚点，使用简短销售联系说明。

## 包装及照片边界

旧页“100 pcs per export carton”缺少对应包装依据，本次删除该数量声明。用户未回答此系列每盒数量，因此没有把标准或快响的每盒100个直接套用。外箱数量按用户要求不再索取，也不作为网页完成条件。

主图库三张照片带EC-ZST标记；冠亚2026补充图库的 `DSC_5887.jpg`、`DSC_5888.jpg`、`DSC_5889.jpg` 标记为K-ZSTX、K-ZSTZ、K-ZSTBS。现按可见标记及K115/68°C标注，说明与EC-ZST主型号的对应关系尚未核实。不修改实拍像素或冠亚标识、不推定二者性能等同；图片文件与压缩尺寸保持。

覆盖面积、最大间距、最低运行压力及流量曲线尚无匹配的技术依据，保留按具体型号索取资料的入口，不填入行业通用数值。

## 文件与验证

- 英文页面：`products/消防喷头/extended-coverage-quick-response-fire-sprinkler.html`。
- 阿文页面：`ar/products/extended-coverage-quick-response-fire-sprinkler/index.html`。
- 源数据：`site-src/_data/preserved-products/extended-coverage-quick-response-fire-sprinkler.json`；阿文词典及 `product-series/extended-coverage.njk` 同步。
- 精确文本变更和用户确认：`reviewed-changes.json`。原始英文保留夹具未修改；校验器只允许本次已记录的文本替换及包装段/导航新增，仍保护原结构、图库、型号及询盘目标。
- 完整构建通过：175个公开页、176个Eleventy输出；67项搜索检查通过。静态检查2164张图片、42358个内部引用及724个新窗口链接。
- 浏览器：英文1280px桌面、390px手机、阿文320px无整页横向溢出；三行型号保留，手机表格可横向滚动。规格和包装锚点未被固定头部遮盖；图库切换、放大及Escape关闭通过，未发送询盘。
- 证据：`docs/evidence/content-optimization/extended-coverage-checks.json`、`extended-coverage-supply-desktop.png`、`extended-coverage-specifications-ar-mobile.png`。

下一项按固定顺序为隐蔽式喷头完整核对；已有响应类型和K80/K115确认继续复用。
