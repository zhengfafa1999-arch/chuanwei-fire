# 五张特殊喷头照片的官网补充核对

日期：2026-10-09。用户要求核对五张实拍，缺少时加入官网并整理分类；沿用已整理的国际站产品资料。四个系列原先均无独立官网详情页，此次新增英阿共八页，以及泡沫喷头分类的英阿两页。原有水雾喷头及普通喷头资料未套用到新增系列。

| 用户照片 | 识别及资料包 | 官网系列 / 分类 | 使用范围 |
|---|---|---|---|
| 图1 | B-DSXC-202-闭式旋转雨淋喷头 | closed-rotating-fire-sprinkler / 消防喷头 | 闭式、下垂、旋转结构、铜框架、公制 K202、R1 BSPT；温度、压力、响应等级和覆盖不补造 |
| 图2 | B-DSXC系列-雨淋喷头 | closed-centrifugal-fire-sprinklers / 消防喷头 | 闭式离心结构、下垂、5mm 玻璃球、铜框架、BSPT；六个既有公制 K 型号，照片仅作为系列样品，不指定某一 K 值 |
| 图3、图4 | ZSPTX-ZSPTZ系列-筒式水泡沫两用喷头 | tubular-foam-water-nozzles / 新增泡沫喷头 | 用户本轮确认图3上喷、图4下喷，K80/K115 为公制；铜主体、BSPT、工作压力 0.4 MPa 复用已有用户确认记录；两张都是较小连接样品，不拿来证明较大口径 |
| 图5 | BSPT系列-闭式吸气型泡沫水喷头 | closed-air-aspirating-foam-water-sprinkler / 新增泡沫喷头 | 闭式吸气结构、铜框架和连接体、BSPT、5mm 玻璃球；BSPT 不作为工厂型号，也没有套用另一款 PT 不锈钢开式网型喷头的参数 |

## 事实及资料保留

- 图3、图4与 ZSPTX/ZSPTZ 的具体工厂型号对应关系尚未确认，图库只标上喷和下喷，不擅自对应型号。
- 保留国际站资料的确认字段及明确限制；不从红色球推断动作温度或仅从球径推断响应等级。
- 筒式系列的 0.4 MPa 是工作压力，没有改成最大工作压力。外形尺寸、重量尚未明确对应大小口径，未写入网页。
- 来源说明和用户照片备份：`docs/release/special-sprinklers-20261009/`。图片公开授权来自用户主动供图并要求加入官网，独立记录在 image-rights-confirmation.json。
- 新网页照片：`assets/products/special-sprinklers/`。五张 WebP 最长边 1600px，不放大、不裁切、不改色或抹掉冠亚标识；约 6.41 MiB 原照片压到 715 KiB。四个产品入口另生成 480px WebP 缩略图。
- 所有网页复用 Eleventy 数据、详情、分类、询盘及导航模板；没有另加无图配置卡片。

## 检查

- 完整构建及多语言、导航、SEO、图片来源、保留内容、静态链接验证通过；175 个公开页面。
- 搜索检查增至 67 项：B-DSXC-202 与 B-DSXC-200 各找自己的系列；ZSPTX-80 / ZSPTZ-115 找泡沫分类；旋转水喷头不会混入泡沫分类。
- 四页英文桌面检查；四页英文 390px 和四页阿文 320px 检查无整页溢出，型号表显示正常。
- 筒式两图切换、图片放大及关闭成功；未发送询盘消息。
- 证据：`docs/evidence/content-optimization/special-nozzle-desktop-checks.json`、`special-nozzle-en-mobile-checks.json`、`special-nozzle-mobile-checks.json`。

本地完成；未提交、推送或部署。
