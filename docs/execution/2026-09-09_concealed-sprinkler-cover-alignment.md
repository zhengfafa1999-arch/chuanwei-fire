# CATWEB-015 隐蔽式喷头 K80 型号与盖板配套说明

## 完成内容

依据 v11 交接记录 `catalog-p07` 的确认表和用户确认项，更新现有英阿页面：

- K80 标准响应型号格式：`ZSTDY 80-[T]°C Q5A`。
- K80 快速响应型号格式：`ZSTDY 80-[T]°C Q3A`。
- `[T]` 表示所选喷头温度，不是盖板温度。
- DN15/K80 的 68°C 喷头配 59°C 盖板，调节范围 12.7 mm。
- 明确要求喷头与盖板成套确认；其他温度及 DN20/K115 配套需分别确认。

## 范围与图片

保留四行型号、原有六张图片、版式、语言入口和询盘链接。未修改 K115 两行或把 K80 的配套数据扩展到 K115。

已查看现有盖板照片与 K80 喷头照片。盖板照片可见 K115 标记，不能作为本次 K80 配套数据的证明；配套数据采用交接包中的用户确认项。原照片保留，不重绘、不改标记。其他旧规格本次不重新背书。

## 维护文件

- 共享数据：`site-src/_data/preserved-products/concealed-pendent-fire-sprinkler.json`
- 阿文词典：`site-src/content/products/ar/concealed-pendent-fire-sprinkler.json`
- 英文页面：`products/消防喷头/concealed-pendent-fire-sprinkler.html`
- 阿文页面：`ar/products/concealed-pendent-fire-sprinkler/index.html`
- 原文校验：`tools/validate-preserved-products.mjs`

原始英文 fixture 保持不变。校验仅允许两处 K80 型号、一段盖板说明和一段温度占位符解释的精确替换，再对其余结构、图片、文本与询盘链接执行原有检查。

## 验证

- `npm run build` 通过，127 个本地输出的路由、SEO、导航和内容检查通过。
- 文件预览和本地 HTTP 各通过桌面/手机 × 英阿四组定向测试。
- 覆盖六图图库、缩略图、循环、滑动、放大与关闭、分类入口、互切、刷新、型号锚点及页脚返回。
- HTTP 额外验证本次修改的规格区锚点；规格内容可见且无页面横向溢出。
- 人工核对桌面英文配套说明和阿文四行型号表，技术值方向正常。
- 证据：`docs/evidence/catweb-015/file`、`docs/evidence/catweb-015/http`。

本次没有重复全站浏览器回归，没有推送或部署。文档格式人工检查，环境没有可离线调用的 Prettier。

## 下一项

CATWEB-016：大 K 系数与 ESFR 喷头 p9/p10 对照核验，普通 K202 与 ESFR 保持独立分类及证据范围。
