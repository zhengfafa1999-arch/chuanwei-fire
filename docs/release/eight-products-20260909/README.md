# 8 款新品发布准备

本批本地内容已完成，尚未上线。本目录是审核资料，不是可以直接覆盖服务器的部署包。

[查看页面和 15 张图片](index.html) · [完整文件清单](release-manifest.json) · [本次产品校验](addition-inventory.json)

## 产品范围

|产品|目录页|英阿页面|图片|
|---|---:|---:|---:|
|易熔合金消防喷头|12|2|2|
|马鞍式水流指示器|25|2|1|
|直通／斜角室内消火栓|29|2|3|
|水平手轮室内消火栓|30|2|2|
|消防进水装置（Breeching Inlets）|35|2|2|
|俄式消防水泵接合器|37|2|1|
|直流水枪|40|2|2|
|杠杆式消防水枪|41|2|2|

## 发布状态与依赖

- 本地基准提交：`def34e95236e05eea49aa8f3da3afa50e98cea25`。
- 发布分支基准：`7c17f6d35cdcb80094886dbe1371218f836f4136`（发布准备阶段核实的 master 基准，上线前应重新核实）。
- 8 款产品均为 local-draft，externalRelease=false；图片许可已确认，尚未部署。
- 页面直接引用的公共资源及链接目标共 30 个，逐项见下表。状态相对于 Git 发布分支，不等于服务器文件实测。
- 当前新品页面使用本地英阿导航。不能把整个开发分支当作仅有 8 款新品直接推送；分类入口、公共导航和阿语页面必须明确纳入发布范围或做兼容处理。
- 清单仅枚举 HTML 的直接 href/src 引用，不代表所有 CSS 引用和链接页面的递归依赖已经打包。
- 另 8 个暂缓候选和后续旧产品修订不纳入本次新品范围。

|公共资源或链接目标|相对发布分支|
|---|---|
|`about.html`|absent|
|`apple-touch-icon.png`|unchanged|
|`ar/about.html`|absent|
|`ar/contact.html`|absent|
|`ar/downloads.html`|absent|
|`ar/index.html`|absent|
|`ar/products.html`|absent|
|`ar/products/fire-department-connections/index.html`|absent|
|`ar/products/hoses-nozzles-couplings/index.html`|absent|
|`ar/products/indoor-hydrants/index.html`|absent|
|`ar/products/sprinklers/index.html`|absent|
|`ar/products/system-valves/index.html`|absent|
|`assets/js/preserved-product-gallery.js`|absent|
|`assets/js/site-navigation.js`|absent|
|`contact.html`|absent|
|`css/common.css`|changed|
|`css/documented-product.css`|absent|
|`css/multilingual-product.css`|absent|
|`css/site-navigation.css`|absent|
|`css/sprinkler-product-gallery.css`|unchanged|
|`css/sprinkler-product.css`|unchanged|
|`downloads.html`|absent|
|`favicon.ico`|unchanged|
|`index.html`|changed|
|`products.html`|absent|
|`products/室内消防栓/室内消防栓.html`|changed|
|`products/消防阀.html`|changed|
|`products/消防喷头.html`|changed|
|`products/消防水泵接合器.html`|changed|
|`products/消防水枪.html`|changed|

## 正式上线前剩余事项

1. 已确认：15 张图片可用于川威官网公开展示，确认原文和文件哈希见 image-rights-confirmation.json。
2. 以现有发布分支为基础准备最小发布变更，并处理新品分类入口和英阿公共导航依赖，排除其他旧产品修订。
3. 确定最终发布范围后构建并验证发布版本，备份线上内容，再部署及检查线上链接。

## 验证记录

本次重新执行 validate-catalog-additions：8 款、16 页、15 图通过；清单中的本地引用均存在。此前 CATWEB-013 已完成新品批次的浏览器回归，证据见 ../../evidence/catweb-013/。本次仅生成审核资料，没有执行部署或推送。

## 发布候选版进展

最小发布版本已生成，详见 [候选版与验证记录](CANDIDATE.md)。上文依赖表是开发版原始引用；候选版已按旧站结构处理，正式部署尚未执行。
