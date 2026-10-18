"""Encode the 44 selected catalog images without changing product appearance."""
import hashlib
import json
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
REVIEW = ROOT / 'docs/reviews/material-batch-20261018'
SOURCE = Path(r'D:\work\codex\阿里国际站运营\官网与产品目录素材包-20261018')
OPTIMIZED = Path(r'D:\work\codex\阿里国际站运营\outputs\chuanwei-fire-commerce\website-images-20261018-官网待上架产品图保守优化/manifest.json')

def read(file):
    return json.loads(file.read_text(encoding='utf-8-sig'))

def sha(file):
    return hashlib.sha256(file.read_bytes()).hexdigest()

inventory = read(ROOT / 'outputs/website-material-review-20261018/image-inventory.json')
images = [i for i in inventory['images'] if i['folder'] == '新建文件夹']
assert len(images) == 44
approved = {str(Path(i['source'])): i for i in read(OPTIMIZED)['assets'] if i['status'] == 'approved_for_temporary_display'}
registered = {i['path']: i for i in read(ROOT / 'site-src/_data/product-watermarks.json')['items']}
records = []
for item in sorted(images, key=lambda i: i['name']):
    original = Path(item['path'])
    assert sha(original) == item['sha256'], f'Source changed: {original}'
    edit = approved.get(str(original))
    selected = Path(edit['output']) if edit else original
    relative = 'assets/products/website-20261018/product-' + item['sha256'][:12] + '.webp'
    output = ROOT / relative
    output.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(selected) as opened:
        img = ImageOps.exif_transpose(opened).convert('RGB')
        img.thumbnail((1254, 1254), Image.Resampling.LANCZOS)
        width, height = img.size
        if relative not in registered:
            img.save(output, 'WEBP', quality=88, method=6)
        else:
            assert sha(output) == registered[relative]['watermarkedSha256']
    records.append({'sourceName': item['series'], 'source': str(original), 'sourceSha256': item['sha256'],
                    'selectedSource': str(selected), 'selectedSha256': sha(selected),
                    'optimizedDisplay': bool(edit), 'path': relative, 'width': width, 'height': height,
                    'processing': 'EXIF orientation; proportional downscale only; WebP encoding; existing website branding export follows.'})
assert sum(i['optimizedDisplay'] for i in records) == 8
REVIEW.mkdir(parents=True, exist_ok=True)
(REVIEW / 'images.json').write_text(json.dumps(records, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'Prepared {len(records)} images: 8 approved display edits and 36 original-source images; source hashes unchanged.')
