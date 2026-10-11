# 快速响应喷头本批核对 · 2026-10-09

状态：本地更新完成，等待页面验收；未上线。当前主规格适用于已展示的 DN15 / K80 / 68°C 下垂与直立样品。K-ZST 配置资料和实拍保留在独立选型区，不把不同供货配置合并成未经确认的型号。

## 本次用户确认

提问范围为快响螺纹、镀铬处理、每盒数量是否与标准响应相同，以及是否需要修改原材质。

用户原文：

> 与标准响应系列相同，上部不锈钢、螺纹连接体为铜，这个内容不用修改

因此补入默认 BSPT、可选 NPT、表面镀铬、每盒 100 个，保留原有上部不锈钢及螺纹体铜材质。没有将标准响应七档温度、框架材质选项或工厂型号自动复制到快响系列。

## 中英核对

| 中文 | 英文页面值 | 依据与范围 |
| --- | --- | --- |
| 快速响应，红色 3 mm 玻璃球 | Quick-response automatic fire sprinkler; 3 mm red glass bulb | 已有确认及快响档案 |
| 下垂、直立 | Pendent / Upright | 当前主图库与两行选型表 |
| DN15 / ½ 英寸公称连接 | DN15 / ½ in nominal connection | 原规格保留 |
| 公制 K80 ±4 / 美制名义 K5.6 | K80 ±4 metric / nominal K5.6 US | 原规格保留；不是固定流量 |
| 68°C / 155°F | 68°C / 155°F · red glass bulb | 主规格范围保留，不扩写其他温度 |
| 最大工作压力 1.21 MPa | 1.21 MPa / 12.1 bar / approx. 175 psi | 原规格保留 |
| 上部不锈钢，螺纹连接体铜 | Upper structure: stainless steel; threaded body: copper | 用户明确要求保留 |
| 默认 BSPT，可选 NPT | BSPT (default) / NPT (optional) | 本次用户确认 |
| 表面镀铬 | Chrome-plated finish | 本次用户确认，不补写底层镀层 |
| 每盒100个 | 100 pcs / box | 本次用户确认，不解释为运输外箱数量 |

包装段复用既有真实保护托盘照片，说明每盒数量及运输、标签要求的销售联系入口。图库切换、放大及 Escape 关闭通过；没有新增合成产品照片。

## 内部补充事项

- 主选型表没有确切工厂型号对应资料，保留按报价匹配，不借用其他系列的型号。
- K-ZST 已有三种方向资料及实拍保持独立范围；不把其铜框架记录覆盖当前主规格。
- 运输外箱数量按用户要求延后，不阻塞当前网页；不再重复索取。

## 文件及验证

- 源数据：`site-src/_data/documented-products/glass-bulb-fire-sprinkler.json`。
- 英文：`products/消防喷头/glass-bulb-fire-sprinkler.html`；阿文：`ar/products/glass-bulb-fire-sprinkler/index.html`。
- 完整构建通过；公开内容校验防止改动原材质、压力和温度，检查 BSPT/NPT、镀铬、3 mm 和每盒100个。
- 英文桌面1280px、英文手机390px、阿文320px，无整页横向溢出；两行主选型表保留，真实包装图及放大图加载正常。
- 证据：`docs/evidence/content-optimization/sample-closeout-checks.json`、`quick-response-sample-desktop.png`。

按固定顺序，下一系列为扩大覆盖喷头；先复用已归档资料，再只询问无法核实的缺项。
