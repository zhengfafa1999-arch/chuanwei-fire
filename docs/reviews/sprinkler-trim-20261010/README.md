# 喷头装饰配件及防爆水流指示器型号补充

日期：2026-10-10。范围：本地候选，尚未部署。

## 喷头装饰配件

按用户要求，复用阿里国际站“消防喷淋配件系列”资料，回溯至原始实拍，仅新增三款装饰件：双层带孔装饰盘、单层带孔装饰盘、白色圆盖组件。另两款防护罩不属于本次装饰件范围。

新增英阿产品页，归入消防喷头分类，以独立配件名称展示，包含三张原始实拍、图库、样式对照、已知外观及询盘。目录、菜单和搜索同步。每种样式对应自己的照片，材质、尺寸、镀层、正式 SKU、适配喷头型号没有从颜色或图片比例推断。白色盖件没有标作经确认的隐蔽式温感盖板。

英文页面：`products/消防喷头/sprinkler-escutcheons-decorative-covers.html`。

阿文页面：`ar/products/sprinkler-escutcheons-decorative-covers/index.html`。

原图保存在 `docs/release/sprinkler-trim-20261010/source/`；比例压缩后的公开图片在 `assets/products/sprinkler-trim/`。只进行显示方向规范化、比例缩小及 WebP 压缩，保留木纹背景、实物划痕、孔/盖和外形。没有使用生成式市场图作为实拍。

## 防爆水流指示器

将用户新确认的八个 `ZSJZ …-M-1.2EX` 型号加入现有英阿页面，口径扩展至 DN250 / 10 in。删除此前“全部与普通款口径相同”的描述，仍只把已有照片标为 DN100。报价中的金额没有公开。

其他技术参数检索及证据边界见 [检索记录](waterflow-research.md)。未以 EX 后缀替代正式防爆等级，未把普通款触点容量、材料或压力套用给防爆款。

## 验收边界

构建结果与英阿数字对照见 `validation-summary.json` 和 `language-tables.json`。搜索检查覆盖装饰件中文/英文、分类筛选、防爆 DN250 及准确型号。图片原件/衍生件哈希与尺寸检查见 `photo-records.json`。

本轮未发送真实询盘。PDF 下载制作继续暂停，已有 PDF 字节保持不变。浏览器预览在此前尝试中持续超时，本轮不声称已通过桌面和手机视觉验收；需本地打开页面复核。当前静态候选为 `docs/release/sprinkler-trim-20261010/static-manifest.json` 与 `.tmp/releases/sprinkler-trim-20261010-web.zip`。不提交、推送或部署。
