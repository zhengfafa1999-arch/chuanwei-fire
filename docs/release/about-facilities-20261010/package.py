from pathlib import Path
import hashlib
import json
import zipfile

root = Path(__file__).resolve().parents[3]
folder = root / 'docs/release/about-facilities-20261010'
previous = json.loads((root / 'docs/release/pdf-download-removal-20261010/static-manifest.json').read_text(encoding='utf-8'))
names = {item['path'] for item in previous['items']}
names.add('css/about-facilities.css')
names.update(path.relative_to(root).as_posix() for path in (root / 'assets/about/facilities-20261010').glob('*.webp'))
assert not any(name.endswith('.pdf') for name in names)
with zipfile.ZipFile(root / previous['archive']) as old:
    for name in ['ar/contact.html', 'ar/downloads.html', 'contact.html', 'downloads.html']:
        before = [line for line in old.read(name).decode('utf-8').splitlines() if line.strip()]
        after = [line for line in (root / name).read_text(encoding='utf-8').splitlines() if line.strip()]
        assert before == after, f'Unexpected content change outside About: {name}'
items = []
for name in sorted(names):
    path = (root / name).resolve()
    if not path.is_relative_to(root) or not path.is_file():
        raise ValueError(f'Invalid release file: {name}')
    data = path.read_bytes()
    items.append({'path': name, 'bytes': len(data), 'sha256': hashlib.sha256(data).hexdigest()})
archive_name = '.tmp/releases/about-facilities-20261010-web.zip'
archive = root / archive_name
archive.parent.mkdir(parents=True, exist_ok=True)
with zipfile.ZipFile(archive, 'w', compression=zipfile.ZIP_DEFLATED, compresslevel=6) as output:
    for item in items:
        output.write(root / item['path'], item['path'])
with zipfile.ZipFile(archive) as check:
    assert check.testzip() is None
    assert sorted(check.namelist()) == [item['path'] for item in items]
    for item in items:
        data = check.read(item['path'])
        assert len(data) == item['bytes']
        assert hashlib.sha256(data).hexdigest() == item['sha256']
summary = {
    'date': '2026-10-10',
    'status': 'local-review-candidate-not-deployed',
    'archive': archive_name,
    'bytes': archive.stat().st_size,
    'sha256': hashlib.sha256(archive.read_bytes()).hexdigest(),
    'files': len(items),
    'pages': sum(item['path'].endswith('.html') for item in items),
    'validation': 'Build and static checks passed; ZIP CRC, complete entry set and all file hashes verified. Browser/mobile rendering not verified.',
    'previousCandidate': previous['archive'],
    'rollback': 'Preserve previous local candidate; record and back up actual server version before deployment.',
    'deploymentNote': 'PDF removal remains effective; remove old assets/downloads/standard-response-fire-sprinklers-en.pdf from server when deploying. No deployment performed.'
}
(folder / 'static-manifest.json').write_text(json.dumps({**summary, 'items': items}, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
(folder / 'package-summary.json').write_text(json.dumps(summary, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(json.dumps(summary, ensure_ascii=False))
