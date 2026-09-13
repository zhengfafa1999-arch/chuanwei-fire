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


def add_watermark(source: Path, destination: Path) -> dict[str, object]:
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
        base.alpha_composite(corner_layer)

        destination.parent.mkdir(parents=True, exist_ok=True)
        temporary = destination.with_name(destination.stem + ".watermarking" + destination.suffix)
        save_options: dict[str, object] = {}
        if icc_profile:
            save_options["icc_profile"] = icc_profile
        if exif:
            save_options["exif"] = exif

        if source_format in {"JPEG", "JPG"}:
            base.convert("RGB").save(temporary, format="JPEG", quality=92, optimize=True, progressive=True, **save_options)
        elif source_format == "WEBP":
            output = base if image.mode == "RGBA" else base.convert("RGB")
            output.save(temporary, format="WEBP", quality=92, method=6, **save_options)
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
    args = parser.parse_args()

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


if __name__ == "__main__":
    main()
