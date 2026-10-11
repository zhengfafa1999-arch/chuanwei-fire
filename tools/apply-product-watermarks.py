from __future__ import annotations

import argparse
import hashlib
import json
import os
import shutil
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageOps, ImageStat


ROOT = Path(__file__).resolve().parents[1]
PRODUCTS = ROOT / "products"
BACKUPS = ROOT / ".watermark-backups" / "product-images-original"
MANIFEST = ROOT / ".watermark-backups" / "product-watermark-manifest.json"
EVIDENCE_PATTERN = "image-rights-confirmation.json"
FONT = Path(os.environ.get("WINDIR", r"C:\Windows")) / "Fonts" / "arialbd.ttf"
EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".avif"}
CENTER_TEXT = "CHUANWEI FIRE"
CORNER_TEXT = "CHUANWEI FIRE · chuanweifire.com"


def file_hash(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def image_files() -> list[Path]:
    return sorted(
        (
            path
            for path in PRODUCTS.rglob("*")
            if path.is_file()
            and path.suffix.lower() in EXTENSIONS
            and "watermark-sample" not in path.name.lower()
            and "watermarked" not in path.name.lower()
        ),
        key=lambda path: path.as_posix().lower(),
    )


def region_luminance(image: Image.Image, box: tuple[int, int, int, int]) -> float:
    sample = image.convert("RGB").crop(box)
    sample.thumbnail((96, 96))
    return ImageStat.Stat(ImageOps.grayscale(sample)).mean[0]


def contrasting_color(luminance: float, alpha: int) -> tuple[int, int, int, int]:
    if luminance >= 145:
        return (6, 45, 72, alpha)
    return (255, 255, 255, alpha)


def fitted_font(text: str, preferred: int, max_width: int, minimum: int = 10) -> ImageFont.FreeTypeFont:
    size = max(preferred, minimum)
    while size > minimum:
        font = ImageFont.truetype(str(FONT), size)
        left, _, right, _ = font.getbbox(text)
        if right - left <= max_width:
            return font
        size -= 1
    return ImageFont.truetype(str(FONT), minimum)


def add_watermark(source: Path, destination: Path, *, safe_whitespace: bool = False) -> dict[str, object]:
    with Image.open(source) as opened:
        image = ImageOps.exif_transpose(opened)
        source_format = (opened.format or destination.suffix.removeprefix(".")).upper()
        icc_profile = opened.info.get("icc_profile")
        exif = opened.info.get("exif")

        if image.mode not in {"RGB", "RGBA"}:
            image = image.convert("RGBA" if "transparency" in image.info else "RGB")
        base = image.convert("RGBA")
        width, height = base.size

        center_box = (width // 5, height // 4, width * 4 // 5, height * 3 // 4)
        center_luma = region_luminance(base, center_box)
        center_font = fitted_font(CENTER_TEXT, max(18, round(min(width, height) * 0.115)), round(width * 0.72))
        text_box = center_font.getbbox(CENTER_TEXT)
        text_width = text_box[2] - text_box[0]
        text_height = text_box[3] - text_box[1]
        padding = max(12, round(min(width, height) * 0.035))
        diagonal = Image.new("RGBA", (text_width + padding * 2, text_height + padding * 2), (0, 0, 0, 0))
        diagonal_draw = ImageDraw.Draw(diagonal)
        diagonal_draw.text(
            (padding - text_box[0], padding - text_box[1]),
            CENTER_TEXT,
            font=center_font,
            fill=contrasting_color(center_luma, 64),
        )
        diagonal = diagonal.rotate(25, resample=Image.Resampling.BICUBIC, expand=True)
        diagonal_position = ((width - diagonal.width) // 2, (height - diagonal.height) // 2)
        if not safe_whitespace:
            base.alpha_composite(diagonal, diagonal_position)

        corner_box = (width // 2, height * 2 // 3, width, height)
        corner_luma = region_luminance(base, corner_box)
        corner_font = fitted_font(
            CORNER_TEXT,
            max(11, round(min(width, height) * 0.027)),
            round(width * 0.56),
            minimum=9,
        )
        corner_text_box = corner_font.getbbox(CORNER_TEXT)
        corner_width = corner_text_box[2] - corner_text_box[0]
        corner_height = corner_text_box[3] - corner_text_box[1]
        edge = max(10, round(min(width, height) * 0.035))
        corner_layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
        corner_draw = ImageDraw.Draw(corner_layer)
        corner_draw.text(
            (width - edge - corner_width - corner_text_box[0], height - edge - corner_height - corner_text_box[1]),
            CORNER_TEXT,
            font=corner_font,
            fill=contrasting_color(corner_luma, 176),
        )
        placements = []
        if safe_whitespace:
            # Apply the existing wordmark as a native text layer, never redraw
            # the photograph. Glyphs must fit inside near-white background.
            from PIL import ImageChops, ImageFilter
            rgb = image.convert("RGB")
            channels = rgb.split()
            low = ImageChops.darker(ImageChops.darker(channels[0], channels[1]), channels[2])
            high = ImageChops.lighter(ImageChops.lighter(channels[0], channels[1]), channels[2])
            colored = ImageChops.subtract(high, low).point(lambda value: 255 if value > 18 else 0)
            foreground = ImageChops.lighter(low.point(lambda value: 255 if value < 235 else 0), colored)
            foreground = foreground.filter(ImageFilter.MaxFilter(7))

            def find_position(layer: Image.Image):
                mask = layer.getchannel("A").point(lambda value: 255 if value else 0)
                lw, lh = layer.size
                if lw > width - 8 or lh > height - 8:
                    return None
                margin = max(4, round(min(width, height) * .018))
                # Prefer corners, then clear strips at the top and bottom.
                xs = [width-lw-margin, margin, (width-lw)//2]
                ys = [height-lh-margin, margin]
                candidates = [(x,y) for y in ys for x in xs]
                for y in range(margin, max(margin+1,height-lh-margin+1), max(8,height//28)):
                    for x in range(margin, max(margin+1,width-lw-margin+1), max(8,width//24)):
                        candidates.append((x,y))
                for x,y in candidates:
                    if min(x,y) < 0 or x+lw > width or y+lh > height:
                        continue
                    protected = foreground.crop((x,y,x+lw,y+lh))
                    if ImageChops.multiply(protected, mask).getbbox() is None:
                        # Reserve the whole text footprint against another mark.
                        foreground.paste(255, (x,y,x+lw,y+lh))
                        return (x,y)
                return None

            # The corner mark is mandatory; reduce it only to fit whitespace.
            corner_size = max(11, round(min(width,height)*.027))
            for size in range(corner_size, 8, -1):
                font = fitted_font(CORNER_TEXT,size,round(width*.88),minimum=9)
                box = font.getbbox(CORNER_TEXT)
                layer = Image.new("RGBA", (box[2]-box[0]+4,box[3]-box[1]+4),(0,0,0,0))
                ImageDraw.Draw(layer).text((2-box[0],2-box[1]),CORNER_TEXT,font=font,fill=(6,45,72,176))
                position = find_position(layer)
                if position:
                    base.alpha_composite(layer,position)
                    placements.append({"layer":"corner","box":[*position,position[0]+layer.width,position[1]+layer.height],"fontSize":size,"alpha":176})
                    break
            if not placements:
                raise RuntimeError(f"No safe watermark whitespace: {source}")
            for size in range(max(14,round(min(width,height)*.075)),11,-2):
                font = fitted_font(CENTER_TEXT,size,round(width*.72),minimum=12)
                box = font.getbbox(CENTER_TEXT)
                layer=Image.new("RGBA",(box[2]-box[0]+4,box[3]-box[1]+4),(0,0,0,0))
                ImageDraw.Draw(layer).text((2-box[0],2-box[1]),CENTER_TEXT,font=font,fill=(6,45,72,64))
                layer=layer.rotate(25,resample=Image.Resampling.BICUBIC,expand=True)
                position=find_position(layer)
                if position:
                    base.alpha_composite(layer,position)
                    placements.append({"layer":"diagonal","box":[*position,position[0]+layer.width,position[1]+layer.height],"fontSize":size,"alpha":64})
                    break
        else:
            base.alpha_composite(corner_layer)

        destination.parent.mkdir(parents=True, exist_ok=True)
        temporary = destination.with_name(destination.stem + ".watermarking" + destination.suffix)
        save_options: dict[str, object] = {}
        if icc_profile:
            save_options["icc_profile"] = icc_profile
        if exif:
            save_options["exif"] = exif

        if source_format in {"JPEG", "JPG"}:
            base.convert("RGB").save(temporary, format="JPEG", quality=85 if safe_whitespace else 92, optimize=True, progressive=True, **save_options)
        elif source_format == "WEBP":
            output = base if image.mode == "RGBA" else base.convert("RGB")
            output.save(temporary, format="WEBP", quality=85 if safe_whitespace else 92, method=6, **save_options)
        elif source_format == "AVIF":
            output = base if image.mode == "RGBA" else base.convert("RGB")
            output.save(temporary, format="AVIF", quality=92, **save_options)
        else:
            output = base if image.mode == "RGBA" else base.convert("RGB")
            output.save(temporary, format="PNG", optimize=True, **save_options)
        os.replace(temporary, destination)

        return {
            "width": width,
            "height": height,
            "format": source_format,
            "centerTone": "dark" if center_luma >= 145 else "light",
            "cornerTone": "dark" if corner_luma >= 145 else "light",
            **({"placements":placements,"protectedProductPixelsOverlaid":0,"quality":85} if safe_whitespace else {}),
        }


def sync_image_rights(records: list[dict[str, object]]) -> int:
    by_path = {f"products/{item['path']}": item for item in records}
    updated = 0
    for evidence_path in (ROOT / "docs" / "release").rglob(EVIDENCE_PATTERN):
        evidence = json.loads(evidence_path.read_text(encoding="utf-8"))
        changed = False
        for item in evidence.get("images", []):
            record = by_path.get(item.get("path"))
            if not record:
                continue
            prior_original = item.get("originalSha256", item.get("sha256"))
            if prior_original != record["originalSha256"]:
                raise RuntimeError(f"Original rights hash changed unexpectedly: {item['path']}")
            item["originalSha256"] = record["originalSha256"]
            item["sha256"] = record["watermarkedSha256"]
            item["publishedTransform"] = "CHUANWEI FIRE watermark"
            changed = True
            updated += 1
        if changed:
            evidence["publishedImageTransform"] = {
                "type": "watermark",
                "centerText": CENTER_TEXT,
                "cornerText": CORNER_TEXT,
                "originalsRetainedLocally": True,
            }
            evidence_path.write_text(json.dumps(evidence, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return updated


def main() -> None:
    parser = argparse.ArgumentParser(description="Apply CHUANWEI FIRE watermarks to product raster images.")
    parser.add_argument("--dry-run", action="store_true", help="Inventory images without changing them.")
    parser.add_argument("--verify", action="store_true", help="Verify current and backup hashes against the manifest.")
    parser.add_argument("--sync-evidence-only", action="store_true", help="Update image-rights hashes from the existing manifest.")
    parser.add_argument("--new-assets", action="store_true", help="Incrementally watermark assets/products, preserving photograph details in clear whitespace.")
    args = parser.parse_args()

    if args.new_assets:
        apply_asset_watermarks(args)
        return
    if not FONT.exists():
        raise SystemExit(f"Watermark font not found: {FONT}")

    files = image_files()
    print(f"Product images selected: {len(files)}")
    if args.dry_run:
        return
    if args.verify:
        manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
        items = manifest["items"]
        if len(items) != len(files):
            raise RuntimeError(f"Manifest contains {len(items)} images, but {len(files)} are currently selected")
        for item in items:
            destination = PRODUCTS / item["path"]
            backup = BACKUPS / item["path"]
            if file_hash(destination) != item["watermarkedSha256"]:
                raise RuntimeError(f"Watermarked image changed: {item['path']}")
            if file_hash(backup) != item["originalSha256"]:
                raise RuntimeError(f"Original backup changed: {item['path']}")
        print(f"Verified {len(items)} watermarked images and original backups")
        return
    if args.sync_evidence_only:
        manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
        print(f"Image-rights entries updated: {sync_image_rights(manifest['items'])}")
        return

    BACKUPS.mkdir(parents=True, exist_ok=True)
    records: list[dict[str, object]] = []
    for index, destination in enumerate(files, start=1):
        relative = destination.relative_to(PRODUCTS)
        backup = BACKUPS / relative
        if not backup.exists():
            backup.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(destination, backup)
        details = add_watermark(backup, destination)
        records.append(
            {
                "path": relative.as_posix(),
                "originalSha256": file_hash(backup),
                "watermarkedSha256": file_hash(destination),
                **details,
            }
        )
        if index % 25 == 0 or index == len(files):
            print(f"Watermarked {index}/{len(files)}")

    MANIFEST.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST.write_text(
        json.dumps(
            {
                "version": 1,
                "centerText": CENTER_TEXT,
                "cornerText": CORNER_TEXT,
                "count": len(records),
                "items": records,
            },
            ensure_ascii=False,
            indent=2,
        ),
        encoding="utf-8",
    )
    print(f"Image-rights entries updated: {sync_image_rights(records)}")
    print(f"Backup directory: {BACKUPS}")
    print(f"Manifest: {MANIFEST}")


def apply_asset_watermarks(args) -> None:
    asset_root = ROOT / "assets" / "products"
    manifest_path = ROOT / "site-src" / "_data" / "product-watermarks.json"
    backup_root = ROOT / ".watermark-backups" / "site-assets-original"
    # These original accessory shots were replaced by the public white-background
    # set. Retain their old URLs and original bytes as historical source assets.
    excluded=[f"assets/products/sprinkler-trim/{name}-{edge}.webp" for name in ["double-layer-escutcheon","single-layer-escutcheon","white-round-cover-assembly"] for edge in [640,1600]]
    files=sorted(p for p in asset_root.rglob("*") if p.is_file() and p.suffix.lower() in EXTENSIONS and p.relative_to(ROOT).as_posix() not in excluded)
    print(f"New product asset images selected: {len(files)}")
    if args.dry_run:
        return
    manifest=json.loads(manifest_path.read_text(encoding="utf-8")) if manifest_path.exists() else {"version":1,"items":[]}
    records={item["path"]:item for item in manifest["items"]}
    if args.verify:
        if set(records) != {p.relative_to(ROOT).as_posix() for p in files}:
            raise RuntimeError("New product images require watermarking; run with --new-assets")
        for relative,record in records.items():
            if file_hash(ROOT/relative)!=record["watermarkedSha256"] or file_hash(ROOT/record["masterPath"])!=record["originalSha256"]:
                raise RuntimeError(f"Watermark/master hash changed: {relative}")
        print(f"Verified {len(records)} watermarked assets and immutable masters")
        return
    if not FONT.exists():
        raise RuntimeError(f"Watermark font not found: {FONT}")
    changed=0
    if not args.sync_evidence_only:
        for destination in files:
            relative=destination.relative_to(ROOT).as_posix()
            if relative in records:
                if file_hash(destination)!=records[relative]["watermarkedSha256"]:
                    raise RuntimeError(f"Refusing to watermark a changed image twice: {relative}")
                continue
            master=backup_root/destination.relative_to(asset_root)
            if master.exists() and file_hash(master)!=file_hash(destination):
                raise RuntimeError(f"Unrecorded master differs from current image: {relative}")
            master.parent.mkdir(parents=True,exist_ok=True)
            if not master.exists(): shutil.copy2(destination,master)
            details=add_watermark(master,destination,safe_whitespace=True)
            records[relative]={"path":relative,"masterPath":master.relative_to(ROOT).as_posix(),"originalSha256":file_hash(master),"watermarkedSha256":file_hash(destination),"originalBytes":master.stat().st_size,"bytes":destination.stat().st_size,**details}
            manifest.update(centerText=CENTER_TEXT,cornerText=CORNER_TEXT,authorization="User requested all newly added website product images be checked and watermarked on 2026-10-10.",count=len(records),excluded=excluded,exclusionReason="Superseded accessory photographs; not used by current published pages. Original URLs and bytes retained.",items=list(records.values()))
            manifest_path.parent.mkdir(parents=True,exist_ok=True)
            manifest_path.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
            changed+=1
    # Original supplier/camera-source hashes remain evidence, separately from
    # the optimized unwatermarked master and published watermark derivative.
    updates=0
    for evidence_path in (ROOT/"docs/release").rglob(EVIDENCE_PATTERN):
        evidence=json.loads(evidence_path.read_text(encoding="utf-8"));edited=False
        for item in evidence.get("images",[]):
            record=records.get(item.get("path"))
            if not record: continue
            if item["sha256"] not in [record["originalSha256"],record["watermarkedSha256"]]:
                raise RuntimeError(f"Unexpected image-rights hash: {item['path']}")
            item.update(unwatermarkedSha256=record["originalSha256"],sha256=record["watermarkedSha256"],publishedTransform="CHUANWEI FIRE text watermark in clear whitespace",watermarkRecord="site-src/_data/product-watermarks.json")
            edited=True;updates+=1
        if edited:
            evidence_path.write_text(json.dumps(evidence,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    reused_path=ROOT/"docs/reviews/alibaba-materials-20261009/reused-images.json"
    reused=json.loads(reused_path.read_text(encoding="utf-8"))
    for item in reused:
        record=records.get(item["websitePath"])
        if not record: continue
        if item["sha256"] not in [record["originalSha256"],record["watermarkedSha256"]]:
            raise RuntimeError(f"Unexpected reused image hash: {item['websitePath']}")
        item.update(unwatermarkedSha256=record["originalSha256"],sha256=record["watermarkedSha256"],watermarkRecord="site-src/_data/product-watermarks.json",publishedTransform="CHUANWEI FIRE text watermark in clear whitespace")
    reused_path.write_text(json.dumps(reused,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    photo_path=ROOT/"site-src/_data/guanya-photos.json"
    photos=json.loads(photo_path.read_text(encoding="utf-8"))
    for photo in photos["photos"]:
        for key in ["display","detail"]:
            item=photo[key];record=records.get(item["path"])
            if not record: continue
            if item["sha256"] not in [record["originalSha256"],record["watermarkedSha256"]]:
                raise RuntimeError(f"Unexpected product-photo hash: {item['path']}")
            item.update(unwatermarkedSha256=record["originalSha256"],sha256=record["watermarkedSha256"],bytes=record["bytes"],quality=record["quality"],watermarkRecord="site-src/_data/product-watermarks.json")
    photos["processing"]="EXIF display orientation; proportional resize without enlargement; WebP quality 78–85; CHUANWEI FIRE native text watermark added in clear whitespace with original product markings retained; immutable unwatermarked masters kept internally."
    photo_path.write_text(json.dumps(photos,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    print(f"Watermarked {changed} new assets; retained {len(records)-changed} existing marks; updated {updates} image-rights entries")


if __name__ == "__main__":
    main()
