# CATWEB-014 扩大覆盖快速响应喷头型号对齐

## 完成范围

现有英阿页面的三行工厂型号与 v11 交接记录 `catalog-p08` 对齐。保留原页面的下垂、直立、边墙行序及三张图片，没有迁移模板或改写其他产品。

| 安装构型 | 旧表述 | 本次正式型号 |
| --- | --- | --- |
| 下垂 | EC-ZSTX115-68°C series | EC-ZSTX 115-68°C Q3A |
| 直立 | EC-ZSTZ115-68°C series | EC-ZSTZ 115-68°C Q3A |
| 水平边墙 | EC-ZSTBS115-68°C series | EC-ZSTBS 115-68°C Q3A |

列标题改为 Factory Model / موديل المصنع。三种型号与图册确认表及现有图片标记一致；保留原照片中的可见标记，不对照片做修改。

## 压力冲突

旧页写 1.2 MPa / 12 bar / approx. 175 psi，v11 交接来源说明将压力列为未确认。本次已向用户询问，在未收到进一步事实确认时，本地草稿暂采用 To be confirmed with the quotation / يُؤكد مع عرض السعر。该处理不是用户确认了新的压力，也不代表判定旧数值错误。后续收到确认后再补回对应值。

其他旧规格、OEM 文案和包装参数保持原样，本任务不将其标为已重新核验。覆盖面积、间距、最低运行压力、螺纹形式等仍按原有工程数据确认边界处理。

## 文件

- 共享数据：`site-src/_data/preserved-products/extended-coverage-quick-response-fire-sprinkler.json`
- 阿文词典：`site-src/content/products/ar/extended-coverage-quick-response-fire-sprinkler.json`
- 英文输出：`products/消防喷头/extended-coverage-quick-response-fire-sprinkler.html`
- 阿文输出：`ar/products/extended-coverage-quick-response-fire-sprinkler/index.html`
- 校验：`tools/validate-preserved-products.mjs`

原始英文 fixture 保持不变。校验器仅对该产品应用五处精确文本替换：一个列标题、三个型号和一个压力值，然后继续比较其余原始文本、结构、图片、样式和询盘地址。没有直接更新快照来接受任意页面差异。

## 验证

- `npm run build` 通过，127 个本地输出的路由、SEO、导航和内容检查通过。
- 保留内容校验通过，其他内容与原始 fixture 一致。
- 文件预览与本地 HTTP 各通过桌面/手机 × 英文/阿文四组定向场景，覆盖图库、放大、入口、语言切换、刷新、型号锚点及页脚返回。
- 人工核对桌面阿文型号表和手机英文表格，型号数值方向正常，手机保留现有表格横向滚动布局。
- 证据位于 `docs/evidence/catweb-014/file` 和 `docs/evidence/catweb-014/http`。

本次不重复全站浏览器回归，没有推送或部署。文档格式人工检查；环境没有可离线调用的 Prettier。

## 下一项

CATWEB-015：隐蔽式下垂喷头 p7 对照核验，重点检查型号及喷头与盖板的配套关系。
