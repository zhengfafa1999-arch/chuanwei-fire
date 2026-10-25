# 官网部署前审查后的完整公开包

日期：2026-10-25。仅本地生成，未部署。

包内包含全部 291 个正式页面、sitemap、robots 和这些页面引用的公开资源，共 1095 个文件。所有资源均包含，不依赖此前增量包或服务器旧文件。ZIP 根目录对应网站根目录。

- [完整公开 ZIP](deluge-photo-corrected-20261025-public-full.zip)
- [逐文件清单](release-manifest.json)
- [包摘要](package-summary.json)
- [内容审查报告](../../reviews/deluge-photo-correction-20261025/REPORT.md)

本包承接此前全站内容清理和产品资料补充，并修正雨淋报警阀图片：法兰式使用用户最新实拍，原 DSC_5728 沟槽式实拍归入沟槽式。英阿详情页、目录和缩略图已同步。附件原图和内部核验记录保留在 docs 中，未打入 ZIP。

部署时先备份当前站点，再把 ZIP 解压到一个新的空发布目录，验证后切换 Nginx document root 或已有发布软链接。不建议直接覆盖整个代码仓库，也不要把 docs、site-src、tools、.git、临时文件、原始资料 PDF 或 guanya_original.html 上传到公开目录。本包不会删除旧站文件；若直接覆盖旧目录，旧目录里的内部文件仍可能保留，不能视为已清理。

检查包含全站构建、页面文案校验、本次雨淋阀英阿详情页的桌面与手机渲染及法兰/沟槽图切换、公开依赖与逐文件 ZIP 哈希。此前全站渲染证据保留在部署前审查目录。线上配置、旧文件和外部证书注册状态未核验。

运行方式：node tools/prepare-deluge-photo-corrected-20261025.mjs
