# MIG-205 隐蔽式下垂喷头多语言迁移

英文与阿拉伯文使用共享产品数据和系列模板，保留 4 行型号、6 张原图、原参数及布局。首页未修改，MIG-905 仍暂停；本次没有生成图片、推送或部署。

## 维护入口

- 数据：`site-src/_data/preserved-products/concealed-pendent-fire-sprinkler.json`
- 阿文：`site-src/content/products/ar/concealed-pendent-fire-sprinkler.json`
- 模板：`site-src/_includes/product-series/concealed-pendent.njk`
- 输出：`products/消防喷头/concealed-pendent-fire-sprinkler.html` 和 `ar/products/concealed-pendent-fire-sprinkler/index.html`

修改数据或文案后运行 `npm run build`。英文基线来自 `c4b6dfa`，原始快照保留在 `tools/fixtures/concealed-pendent-fire-sprinkler-en-baseline.txt`。

## 保留原页实际显示内容

原页脚本会在加载后覆盖首图说明及两张缩略图名称。迁移将这些实际显示值直接放入共享模板，不退回旧静态名称。基线验证保留原始文件，并仅对这三项已存在的运行时文本作明确归一化；不执行基线中的脚本。

两条图库标题仅包含 DN/K 系数和温度，作为共享数值保留并隔离文字方向。测试逐字核对这些标题；其他图片说明仍要求阿文翻译，不降低翻译检查。

## 验收

| 项目 | 结果 |
| --- | --- |
| 快速全站构建、70 个页面、41 个产品返回路径 | PASS |
| 英文主内容、型号、原图、DOM、样式、询盘链接保留 | PASS |
| 文件预览：桌面/手机 × 英文/阿文，共 4 组 | PASS |
| HTTP 预览：桌面/手机 × 英文/阿文，共 4 组 | PASS |
| 分类图片/文字入口、互切、刷新、返回、六张图库、放大、滑动、锚点及页脚 | PASS |
| 阿文桌面图库、手机型号表截图复核 | PASS |

证据：`docs/evidence/focused/concealed-pendent-fire-sprinkler/{file,http}/`。全站浏览器回归留到分类收尾，未在本款重复运行。

测试首次因受限环境无法连接本地浏览器，改用获准的本地浏览器启动；随后修正纯数值标题检查，最终两个预览通过。手机短标签采用一致的“玻璃球”译法，未改尺寸。

按 task-executor、chuanwei-fire-product-page、docs-write 和 dev-workflow 执行；用户的仅多语言范围优先。文档沿用项目格式，缺失的附带样式指南与本地格式化工具不阻塞记录。下一项 MIG-206。
