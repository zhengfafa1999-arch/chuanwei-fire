"""Create and verify the public delta ZIP from the Node-generated allowlist."""

from __future__ import annotations

import hashlib
import json
import os
from pathlib import Path, PurePosixPath
import sys
import zipfile


ROOT = Path(__file__).resolve().parents[1]
RELEASE = ROOT / "docs" / "release" / "website-products-20261018"
FORBIDDEN = {
    "docs", "site-src", "tools", "ops", "node_modules", "outputs", "tmp",
    "source", "original", "originals", ".git", ".codex", ".agents",
    ".watermark-backups", ".tmp",
}


def sha(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def main() -> None:
    manifest_path = Path(sys.argv[1]).resolve()
    output = Path(sys.argv[2]).resolve()
    assert manifest_path.parent == RELEASE.resolve(), "Manifest must remain in this release directory"
    assert output.parent == RELEASE.resolve(), "ZIP must remain in this release directory"
    assert output.name == "website-products-20261018-public-delta.zip"
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    records = manifest["files"]
    names = [item["path"] for item in records]
    assert len(names) == len(set(names)), "Duplicate ZIP paths"
    temporary = output.with_suffix(".pending.zip")
    try:
        with zipfile.ZipFile(temporary, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
            for item in records:
                relative = PurePosixPath(item["path"])
                assert not relative.is_absolute() and ".." not in relative.parts
                assert not any(part.lower() in FORBIDDEN or part.startswith(".") for part in relative.parts)
                source = (ROOT / Path(*relative.parts)).resolve()
                assert source.is_relative_to(ROOT.resolve())
                data = source.read_bytes()
                assert len(data) == item["bytes"] and sha(data) == item["sha256"], f"Build changed while packaging: {relative}"
                entry = zipfile.ZipInfo(relative.as_posix(), date_time=(2026, 10, 18, 0, 0, 0))
                entry.compress_type = zipfile.ZIP_DEFLATED
                entry.create_system = 3
                entry.external_attr = (0o100644 << 16)
                archive.writestr(entry, data, compress_type=zipfile.ZIP_DEFLATED, compresslevel=9)
        with zipfile.ZipFile(temporary, "r") as archive:
            assert archive.namelist() == names
            assert archive.testzip() is None
            for item in records:
                data = archive.read(item["path"])
                assert len(data) == item["bytes"] and sha(data) == item["sha256"], f"ZIP hash mismatch: {item['path']}"
        os.replace(temporary, output)
    finally:
        if temporary.exists():
            temporary.unlink()
    print(f"Verified public delta ZIP: {len(records)} files; no internal files or deletion commands.")


if __name__ == "__main__":
    main()
