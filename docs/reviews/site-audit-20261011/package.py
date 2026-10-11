from pathlib import Path
import hashlib
import json
import zipfile

root = Path(__file__).resolve().parents[3]
folder = root / 'docs/reviews/site-audit-20261011'
previous = json.loads((root / 'docs/release/about-facilities-20261010/static-manifest.json').read_text(encoding='utf-8'))
items, changes = [], []
for old in previous['items']:
    name = old['path']
    path = (root / name).resolve()
    assert path.is_relative_to(root) and path.is_file()
    assert not any(part in ('docs', 'tools', 'site-src', '.git', '.tmp', 'tmp', 'node_modules') for part in Path(name).parts)
    assert path.suffix.lower() not in ('.pdf', '.env', '.map')
    assert 'guanya_original' not in name
    data = path.read_bytes()
    item = dict(path=name, bytes=len(data), sha256=hashlib.sha256(data).hexdigest())
    items.append(item)
    if item['sha256'] != old['sha256']:
        changes.append(name)
archive_name = '.tmp/releases/site-audit-20261011-review-only.zip'
archive = root / archive_name
with zipfile.ZipFile(archive, 'w', compression=zipfile.ZIP_DEFLATED, compresslevel=6) as output:
    for item in items:
        output.write(root / item['path'], item['path'])
with zipfile.ZipFile(archive) as check:
    assert check.testzip() is None
    assert sorted(check.namelist()) == sorted(item['path'] for item in items)
    for item in items:
        assert hashlib.sha256(check.read(item['path'])).hexdigest() == item['sha256']
summary = dict(date='2026-10-11', status='review-candidate-not-deployed-not-release-approved', archive=archive_name,
    bytes=archive.stat().st_size, sha256=hashlib.sha256(archive.read_bytes()).hexdigest(), files=len(items),
    pages=sum(item['path'].endswith('.html') for item in items), previousCandidate=previous['archive'], changedFiles=changes,
    limitations='Manufacturer evidence gaps and browser/mobile verification remain; see README.md.',
    deploymentNote='Upload only allowlisted files, never the repository. Remove the retired PDF from the server when deployment is separately authorized.')
(folder / 'static-manifest.json').write_text(json.dumps(dict(**summary,items=items),ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
(folder / 'package-summary.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps({key:value for key,value in summary.items() if key != 'changedFiles'},ensure_ascii=True))
print('Changed public files:',len(changes))
