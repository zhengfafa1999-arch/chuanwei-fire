"""Create web derivatives without changing the user's original product photos."""
from pathlib import Path
import hashlib
import json
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
selection = json.loads((ROOT / 'site-src/_data/guanya-photo-selection.json').read_text(encoding='utf-8'))
source = Path(selection['sourceDirectory'])
destination = ROOT / 'assets/products/guanya-2026'
destination.mkdir(parents=True, exist_ok=True)
report = ROOT / 'docs/reviews/guanya-photos-20261009'
report.mkdir(parents=True, exist_ok=True)
digest = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()
photos = []
for item in selection['photos']:
    original = ROOT / item['sourcePath'] if item.get('sourcePath') else source / item['sourceFile']
    with Image.open(original) as opened:
        image = ImageOps.exif_transpose(opened).convert('RGB')
    derivatives = {}
    stem = item['routeId'].replace('product:', '') + '-' + original.stem.lower()
    for key, edge in [('display', 640), ('detail', 1600)]:
        resized = image.copy()
        resized.thumbnail((edge, edge), Image.Resampling.LANCZOS)
        target = destination / f'{stem}-{edge}.webp'
        quality = 85
        while True:
            resized.save(target, 'WEBP', quality=quality, method=6)
            if target.stat().st_size <= 300 * 1024 or quality <= 78:
                break
            quality -= 1
        derivatives[key] = {'path': target.relative_to(ROOT).as_posix(), 'width': resized.width,
                            'height': resized.height, 'bytes': target.stat().st_size,
                            'sha256': digest(target), 'quality': quality}
    photos.append({**item, 'sourcePath': str(original), 'sourceSha256': digest(original),
                   'sourceBytes': original.stat().st_size, 'sourceWidth': image.width,
                   'sourceHeight': image.height, **derivatives})
manifest = {'authorization': selection['authorization'], 'processing': 'EXIF transpose; proportional resize only, no enlargement, crop, recoloring, retouching or mark removal; WebP quality 78–85; 640/1600 maximum edge; lazy-loaded display.', 'photos': photos}
(ROOT / 'site-src/_data/guanya-photos.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

# Retain a decision for every file, including export scope that cannot be established.
selected = {p['sourceFile'] for p in photos}
inventory = []
for p in sorted(source.iterdir()):
    if p.suffix.lower() not in {'.jpg', '.jpeg', '.png'}:
        continue
    with Image.open(p) as image:
        width, height = image.size
    number = int(p.stem[4:8]) if p.stem.startswith('DSC_') and p.stem[4:8].isdigit() else 0
    if p.name in selected:
        decision = 'selected: existing export-page configuration visually matched'
    elif number >= 5765 and number <= 5977:
        decision = 'reserve: similar angle, temperature/size variant or unidentified special nozzle; not added automatically'
    elif 5668 <= number <= 5689 or 5719 <= number <= 5735 or 5638 <= number <= 5653 or 5591 <= number <= 5600:
        decision = 'reserve: similar product angle or exact export variant not established'
    else:
        decision = 'held: domestic-pattern connection/label or export/configuration applicability not established'
    inventory.append({'file': p.name, 'width': width, 'height': height, 'bytes': p.stat().st_size, 'sha256': digest(p), 'decision': decision})
folder_count = len(inventory)
for selected_item, photo in zip(selection['photos'], photos):
    if not selected_item.get('sourcePath'):
        continue
    inventory.append({'file': photo['sourceFile'], 'sourcePath': photo['sourcePath'],
                      'width': photo['sourceWidth'], 'height': photo['sourceHeight'],
                      'bytes': photo['sourceBytes'], 'sha256': photo['sourceSha256'],
                      'decision': 'selected: separately supplied photograph; product and connection confirmed by user'})
(report / 'inventory.json').write_text(json.dumps(inventory, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
original_bytes = sum(p['sourceBytes'] for p in photos)
web_bytes = sum(p[k]['bytes'] for p in photos for k in ['display', 'detail'])
lines = ['# 冠亚 2026 产品实拍筛选', '',
         f'已检查文件夹内 {folder_count} 张图片，并收录用户另行提供的 {len(inventory)-folder_count} 张实拍；共选用 {len(photos)} 张，补充 {len(set(p["routeId"] for p in photos))} 个现有产品系列的英文和阿拉伯文详情页。', '',
         '仅按实物结构、可见型号/温度标记与现有官网产品匹配。中文标记本身不证明产品仅供国内；国内接口样式、中文控制箱/器材箱、取水栓、国内水泵接合器和未确认用途的特殊喷头本轮暂不加入，不对其出口能力作结论。', '',
         '文件夹原图保留在用户目录，另行提供的附件原图备份在 docs/release 内。公开网页只引用压缩衍生图，完整产品和冠亚标记保留；不新增材料、压力、认证或交期声明。不同阀组配管保持样品范围，水雾/水幕照片保持系列代表图范围，不给无证据的尺寸赋值。', '',
         f'所选原图 {original_bytes/1024/1024:.2f} MiB → 两档网页图片合计 {web_bytes/1024/1024:.2f} MiB；体积减少 {(1-web_bytes/original_bytes)*100:.1f}%。', '',
         '展示图最长边 640px；放大图最长边 1600px（原图不足时不放大）；WebP；按比例缩放；显式宽高、响应式 srcset、延迟加载。完整 SHA256、来源和处理参数见网站源数据 `site-src/_data/guanya-photos.json`，逐文件决定见 `inventory.json`。', '',
         '| 官网系列 | 原始图片 | 英文图注 |', '| --- | --- | --- |']
lines += [f'| {p["routeId"].replace("product:", "")} | {p["sourceFile"]} | {p["caption"]["en"]} |' for p in photos]
lines += ['', '本轮为本地待发布更新，未部署线上。']
(report / 'README.md').write_text('\n'.join(lines) + '\n', encoding='utf-8')
print(json.dumps({'reviewed': len(inventory), 'selected': len(photos), 'series': len(set(p['routeId'] for p in photos)), 'originalBytes': original_bytes, 'webBytes': web_bytes, 'maximumDerivativeBytes': max(p[k]['bytes'] for p in photos for k in ['display', 'detail'])}))
