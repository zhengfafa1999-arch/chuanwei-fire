# 官网部署前审查后的完整公开包

日期：2026-10-25。仅本地生成，未部署。

包内包含全部 291 个正式页面、sitemap、robots 和这些页面引用的公开资源，共 1094 个文件。所有资源均包含，不依赖此前增量包或服务器旧文件。ZIP 根目录对应网站根目录。

- [完整公开 ZIP](predeploy-reviewed-20261025-public-full.zip)
- [逐文件清单](release-manifest.json)
- [包摘要](package-summary.json)
- [内容审查报告](../../reviews/predeploy-content-20261025/REPORT.md)

本次移除了供应商/资料整理措辞、未核实的卡箍 EPDM 密封圈描述、未明示尺寸顺序的巡检柜尺寸、空泛的待确认规格行和型号占位列。内部来源及待确认事项留在仓库 docs 中，未打入 ZIP。

部署时先备份当前站点，再把 ZIP 解压到一个新的空发布目录，验证后切换 Nginx document root 或已有发布软链接。不建议直接覆盖整个代码仓库，也不要把 docs、site-src、tools、.git、临时文件、原始资料 PDF 或 guanya_original.html 上传到公开目录。本包不会删除旧站文件；若直接覆盖旧目录，旧目录里的内部文件仍可能保留，不能视为已清理。

检查包含全站构建、页面文案扫描、英阿/中文页面桌面与手机渲染、公开依赖与逐文件 ZIP 哈希。线上配置、旧文件和外部证书注册状态未核验。

运行方式：node tools/prepare-predeploy-reviewed-20261025.mjs
