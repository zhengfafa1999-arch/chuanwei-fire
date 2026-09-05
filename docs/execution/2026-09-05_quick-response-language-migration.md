# MIG-204 玻璃球快速响应喷头多语言迁移

英文与阿拉伯文详情已使用共享产品数据和系列模板。保留英文原文、6 行型号、5 张原图、原版式与询盘链接；没有审核或修改产品参数，MIG-905 继续暂停。

## 维护入口

- 产品数据：`site-src/_data/preserved-products/glass-bulb-fire-sprinkler.json`
- 阿文文案：`site-src/content/products/ar/glass-bulb-fire-sprinkler.json`
- 共享模板：`site-src/_includes/product-series/quick-response.njk`
- 英文输出：`products/消防喷头/glass-bulb-fire-sprinkler.html`
- 阿文输出：`ar/products/glass-bulb-fire-sprinkler/index.html`

修改数据或翻译后运行 `npm run build`，不要分别维护生成的语言 HTML。英文基线版本为 `34f3267`，原始快照保存在 `tools/fixtures/glass-bulb-fire-sprinkler-en-baseline.txt`。

## 已完成

- 阿文分类的图片、文字入口直达阿文详情；同产品英阿互切、刷新和返回保留语言。
- 118 项翻译与共享数值分离；五张图库的标题、说明和放大文字随语言切换。
- 原英文温度图仍使用原图，只翻译网页说明，不重画、不改变图片数据。
- 保留原页内部已有的参数表述差异，不扩展为产品资料审核。
- 语言对应链接、站点地图及产品返回路径通过构建检查。首页未修改。

## 验收

- 快速全站构建通过：69 个正式 HTML、45 个共享模板输出、24 个待迁移详情、40 个产品返回路径。
- 英文主内容、型号、图片顺序、原样式及 DOM 结构保护检查通过。
- 文件和 HTTP 预览分别通过 4 组单款场景：桌面/手机 × 英文/阿文。
- 每组覆盖分类图片/文字入口、互切、刷新、返回、全部五张图库、动态说明、前后循环、滑动、放大与三种关闭方式、图库和型号锚点以及页脚返回。
- 两种预览各保存 8 张当前产品截图；已复核阿文桌面图库与手机型号布局。

证据位于 `docs/evidence/focused/glass-bulb-fire-sprinkler/file/` 和 `docs/evidence/focused/glass-bulb-fire-sprinkler/http/`。此前形成的 `docs/evidence/mig-204/` 历史证据保留，不作为重新运行全站回归的要求。

## 新验证节奏

根据用户要求，浏览器验证增加 `--product=glass-bulb-fire-sprinkler` 单款入口。每款保留快速全站构建与完整当前产品检查，每完成一个分类再跑完整浏览器回归。不支持的产品或模板明确报错，不跳过验收。

## 流程边界

使用 task-executor 与 chuanwei-fire-product-page 流程记录原始内容并验收多语言交互；用户限定范围优先，不重新核对技术参数。文档按 docs-write 整理，附带样式指南和本地 Prettier 不可用，沿用项目格式并检查差异。按 dev-workflow 和用户授权本地提交，不推送、不部署。

下一项为 MIG-205 隐蔽式下垂喷头，本次尚未修改其页面。
