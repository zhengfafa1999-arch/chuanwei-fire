import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { SITE_ORIGIN, SITE_ROUTES } from '../site-src/_data/siteRoutes.js';
import { PRODUCT_FAMILIES, flatProducts } from '../site-src/_data/productDirectory.js';
import { concealedSeries } from '../site-src/lib/concealed-series.js';
import { largeKEsfrSeries } from '../site-src/lib/large-k-esfr-series.js';

// Package an already validated build. Never build, commit, upload, or deploy.
// The previous release tool has a release-specific Python path policy, so this
// release keeps its own small ZIP verifier without changing the previous tool.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const release = 'docs/release/alibaba-five-products-20261025';
const baseline = '18002712ff71c32d43fc1f80df1b1a2c7a88283e';
const zipName = 'alibaba-five-products-20261025-public-delta.zip';
const outputDirectory = path.join(root, release);
const sha = buffer => crypto.createHash('sha256').update(buffer).digest('hex');
const git = args => execFileSync('git', args, { cwd: root, maxBuffer: 256 * 1024 * 1024 });
const textExtension = /\.(?:html|css|js|mjs|xml|txt|svg)$/i;
const comparisonSha = (relative, bytes) => sha(textExtension.test(relative)
  ? Buffer.from(bytes.toString('utf8').replaceAll('\r\n', '\n'), 'utf8') : bytes);
assert.equal(git(['rev-parse', `${baseline}^{commit}`]).toString('utf8').trim(), baseline);

const expectedSeriesIds = [
  'k80-standard', 'k80-quick', 'k115-quick', 'k115-standard',
  'k80-standard-concealed', 'k80-quick-concealed', 'k115-standard-concealed', 'k115-quick-concealed',
  'dry', 'large-k', 'ec', 'esfr', 'fusible-alloy', 'closed-rotating', 'closed-centrifugal', 'water-mist', 'water-curtain'
];
const series = flatProducts(PRODUCT_FAMILIES.find(family => family.id === 'sprinklers'));
assert.deepEqual(series.map(item => item.seriesId), expectedSeriesIds, 'Sprinkler series/order differs from the approved 17 groups');
assert.deepEqual(series.filter(item => item.inquiry).map(item => item.seriesId), []);
assert(['k115-quick', 'k115-standard'].every(id => series.some(item => item.seriesId === id && item.routeId && item.image)), 'Confirmed K115 groups require photographs and detail pages');

const routes = Object.entries(SITE_ROUTES).flatMap(([routeId, definition]) => Object.entries(definition.locales)
  .filter(([, target]) => target.status === 'published')
  .map(([locale, target]) => ({ routeId, locale, kind: definition.kind, path: target.outputPath })));
const registeredPages = new Set(routes.map(route => route.path));
assert.equal(registeredPages.size, routes.length, 'Published routes must have unique output paths');
assert.equal(registeredPages.size, 291, 'Retain the previous 281 pages and add 10 English/Arabic outputs for the five 10.23 products');
for (const routeId of ['products', 'category:sprinklers']) for (const locale of ['en', 'ar']) {
  const output = SITE_ROUTES[routeId].locales[locale].outputPath;
  const html = fs.readFileSync(path.join(root, output), 'utf8');
  const actual = [...html.matchAll(/\bdata-sprinkler-series="([^"]+)"/g)].map(match => match[1]);
  assert.deepEqual(actual, expectedSeriesIds, `${output}: current build does not contain the 17 approved series in order`);
}

const forbiddenSegments = /(?:^|\/)(?:docs|site-src|tools|ops|node_modules|outputs|tmp|source|originals?|\.git|\.codex|\.agents|\.watermark-backups|\.tmp)(?:\/|$)/i;
const allowedAsset = /^(?:(?:assets|css|products)\/.+\.(?:css|js|mjs|webp|png|jpe?g|gif|svg|avif|ico|woff2?|ttf|otf|eot|mp4|webm|pdf)|(?:favicon\.ico|apple-touch-icon\.png|og-image\.jpg|robots\.txt))$/i;
function checkPath(relative) {
  assert(typeof relative === 'string' && relative && !/[\\\r\n\0]/.test(relative), `Invalid public path: ${relative}`);
  assert(!path.posix.isAbsolute(relative) && !relative.split('/').includes('..'), `Unsafe public path: ${relative}`);
  assert(!forbiddenSegments.test(relative) && !relative.split('/').some(segment => segment.startsWith('.')), `Internal file excluded: ${relative}`);
  assert(registeredPages.has(relative) || relative === 'sitemap.xml' || allowedAsset.test(relative), `Not a public allowlisted file: ${relative}`);
  const absolute = path.resolve(root, relative);
  assert(absolute.startsWith(root + path.sep), `Path escaped workspace: ${relative}`);
  assert(fs.existsSync(absolute) && fs.statSync(absolute).isFile(), `Missing built public dependency: ${relative}`);
  assert(fs.realpathSync(absolute).startsWith(fs.realpathSync(root) + path.sep), `Public dependency follows an external symlink: ${relative}`);
}
const candidates = new Map();
function add(relative, role, force = false, owner = '') {
  if (!candidates.has(relative)) {
    checkPath(relative);
    candidates.set(relative, { path: relative, roles: new Set(), usedBy: new Set(), force: false });
  }
  const item = candidates.get(relative);
  item.roles.add(role);
  if (owner) item.usedBy.add(owner);
  item.force ||= force;
}
for (const route of routes) add(route.path, 'public-page-with-shared-navigation', true, route.routeId);
add('sitemap.xml', 'sitemap', true);
if (fs.existsSync(path.join(root, 'robots.txt'))) add('robots.txt', 'crawler-entry');

function localReference(reference, owner) {
  const value = reference.trim().replaceAll('&amp;', '&');
  if (!value || value.startsWith('#') || /^(?:data|mailto|tel|javascript|blob):/i.test(value)) return null;
  let url;
  try { url = new URL(value, new URL(owner, `${SITE_ORIGIN}/`)); }
  catch { throw new Error(`${owner}: invalid local reference ${reference}`); }
  if (url.origin !== new URL(SITE_ORIGIN).origin) return null;
  let relative = decodeURIComponent(url.pathname).replace(/^\/+/, '');
  if (!relative || relative.endsWith('/')) relative += 'index.html';
  return relative;
}
function cssReferences(text) {
  return [...text.matchAll(/url\(\s*(["']?)(.*?)\1\s*\)/gi)].map(match => ({ value: match[2], attribute: 'css-url' }))
    .concat([...text.matchAll(/@import\s+["']([^"']+)["']/gi)].map(match => ({ value: match[1], attribute: 'css-import' })));
}
function htmlReferences(text) {
  const references = [];
  for (const match of text.matchAll(/<[a-z][^>]*>/gi)) {
    const tag = match[0];
    // Related search results replace their main image from data-model-image.
    // These hidden attributes are public dependencies even when no img uses it.
    for (const attribute of tag.matchAll(/\s(href|src|poster|data-src|data-lightbox|data-full|data-zoom|data-model-image)\s*=\s*(["'])(.*?)\2/gi)) {
      references.push({ value: attribute[3], attribute: attribute[1].toLowerCase() });
    }
    for (const attribute of tag.matchAll(/\bsrcset\s*=\s*(["'])(.*?)\1/gi)) {
      if (!attribute[2].startsWith('data:')) references.push(...attribute[2].split(',').map(item => ({ value: item.trim().split(/\s+/)[0], attribute: 'srcset' })));
    }
    const metaProperty = tag.match(/\b(?:property|name)\s*=\s*(["'])(.*?)\1/i)?.[2];
    if (/^<meta\b/i.test(tag) && ['og:image', 'og:image:url', 'og:image:secure_url', 'twitter:image', 'twitter:image:src'].includes(metaProperty)) {
      const content = tag.match(/\bcontent\s*=\s*(["'])(.*?)\1/i);
      if (content) references.push({ value: content[2], attribute: 'social-image' });
    }
  }
  return references.concat(cssReferences(text));
}
// Follow the registered page/CSS graph; do not enumerate arbitrary workspace assets.
const parsed = new Set();
let checkedReferences = 0;
let relatedImageReferences = 0;
while (true) {
  const next = [...candidates.values()].find(item => /\.(?:html|css)$/i.test(item.path) && !parsed.has(item.path));
  if (!next) break;
  parsed.add(next.path);
  const content = fs.readFileSync(path.join(root, next.path), 'utf8');
  const references = next.path.endsWith('.html') ? htmlReferences(content) : cssReferences(content);
  for (const reference of references) {
    const relative = localReference(reference.value, next.path);
    if (!relative) continue;
    checkedReferences++;
    const relatedImage = reference.attribute === 'data-model-image';
    if (relatedImage) relatedImageReferences++;
    add(relative, registeredPages.has(relative) ? 'linked-public-page' : relatedImage ? 'related-model-image-dependency' : 'public-resource-dependency', false, next.path);
  }
}
assert(relatedImageReferences > 0, 'No related model image dependencies were examined');
console.log(`Collected ${candidates.size} public files from ${registeredPages.size} pages and ${checkedReferences} local references (${relatedImageReferences} related images).`);

const baselinePaths = new Set(git(['ls-tree', '-r', '-z', '--name-only', baseline]).toString('utf8').split('\0').filter(Boolean));
const requestedProductIds = ['grooved-concentric-reducers', 'threaded-mechanical-tees', 'grooved-equal-tees', 'grooved-flange-adapters', 'horizontal-single-stage-fire-pumps'];
const newProductPages = [...requestedProductIds, 'k115-standard-response-fire-sprinkler', 'k115-quick-response-fire-sprinkler', ...concealedSeries.map(item => item.productId), ...largeKEsfrSeries.map(item => item.productId)]
  .flatMap(slug => ['en', 'ar'].map(locale => SITE_ROUTES[`product:${slug}`].locales[locale].outputPath));
assert.deepEqual([...registeredPages].filter(relative => !baselinePaths.has(relative)).sort(), [...newProductPages].sort(), 'Only the prior approved sprinkler pages and the five requested 10.23 products may be added to this release');
assert.equal([...registeredPages].filter(relative => baselinePaths.has(relative)).length, 265, 'Preserve all 265 baseline page paths alongside the twenty-six new language outputs');
const existing = [...candidates.keys()].filter(relative => baselinePaths.has(relative));
const baselineHashes = new Map();
if (existing.length) {
  const response = execFileSync('git', ['cat-file', '--batch'], {
    cwd: root, input: existing.map(relative => `${baseline}:${relative}\n`).join(''), maxBuffer: 256 * 1024 * 1024
  });
  let offset = 0;
  for (const relative of existing) {
    const end = response.indexOf(10, offset);
    assert(end >= 0, `Missing Git blob header for ${relative}`);
    const header = response.subarray(offset, end).toString('utf8');
    const match = header.match(/ blob (\d+)$/);
    assert(match, `Baseline is not a regular blob: ${relative}`);
    const size = Number(match[1]);
    const blob = response.subarray(end + 1, end + 1 + size);
    assert.equal(blob.length, size);
    baselineHashes.set(relative, { sha256: sha(blob), comparisonSha256: comparisonSha(relative, blob) });
    offset = end + size + 2;
  }
  assert.equal(offset, response.length, 'Unexpected trailing baseline response');
}
const records = [...candidates.values()].map(item => {
  const bytes = fs.readFileSync(path.join(root, item.path));
  const comparisonSha256 = comparisonSha(item.path, bytes);
  const previous = baselineHashes.get(item.path);
  const baselineStatus = !previous ? 'added' : previous.comparisonSha256 === comparisonSha256 ? 'unchanged' : 'changed';
  return {
    path: item.path, bytes: bytes.length, sha256: sha(bytes), comparisonSha256,
    comparison: textExtension.test(item.path) ? 'UTF-8 with CRLF normalized to LF' : 'exact bytes',
    baselineStatus, baselineSha256: previous?.sha256 ?? null,
    roles: [...item.roles].sort(), usedBy: [...item.usedBy].sort(),
    included: item.force || baselineStatus !== 'unchanged',
    reason: item.force ? 'required complete page/navigation set or sitemap' : baselineStatus === 'unchanged' ? 'unchanged resource supplied by baseline' : 'changed or new public dependency'
  };
}).sort((a, b) => a.path.localeCompare(b.path, 'en'));
const files = records.filter(item => item.included);
const baselineDependencies = records.filter(item => !item.included);
assert([...registeredPages].every(relative => files.some(item => item.path === relative)));
assert(files.some(item => item.path === 'sitemap.xml'));
const generatedAt = new Date().toISOString();
const generatedAtChina = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Shanghai', dateStyle: 'short', timeStyle: 'medium' }).format(new Date()) + ' Asia/Shanghai';
const summary = {
  sprinklerSeries: 17, inquiryOnlySeries: 0, allRegisteredPages: registeredPages.size,
  files: files.length, bytes: files.reduce((sum, item) => sum + item.bytes, 0),
  added: files.filter(item => item.baselineStatus === 'added').length,
  changed: files.filter(item => item.baselineStatus === 'changed').length,
  unchangedRequired: files.filter(item => item.baselineStatus === 'unchanged').length,
  unchangedBaselineDependencies: baselineDependencies.length, localReferencesChecked: checkedReferences,
  relatedImageReferencesChecked: relatedImageReferences,
  relatedImageDependencies: records.filter(item => item.roles.includes('related-model-image-dependency')).length
};
const manifest = {
  releaseDate: '2026-10-25', generatedAt, generatedAtChina,
  status: 'local-package-user-deploys-not-deployed', baseline,
  localCommit: git(['rev-parse', 'HEAD']).toString('utf8').trim(),
  baselineCaveat: 'Requires the existing site represented by this Git baseline, including the 2026-10-18 product batch and the BS750 35 kg correction. No server filesystem verification was performed.',
  archive: zipName, archiveRoot: 'website root; no enclosing directory; no internal manifest included',
  packagePolicy: 'All 291 registered output pages and sitemap, plus changed/new allowlisted public dependencies found in HTML/CSS, including related model data-model-image references.',
  comparisonPolicy: 'Text files compare after CRLF-to-LF normalization. ZIP entries retain current local bytes and exact SHA256.',
  deletionPolicy: 'No deletion instructions; existing server files are retained.',
  validationScope: 'Series order, inquiry scope, built directory series, preserved route paths, public-file allowlist, HTML/CSS dependency graph, Git baseline differences, and ZIP hashes. Build/browser validation are separate.',
  summary, files, baselineDependencies,
  series: series.map(item => ({ id: item.seriesId, name: item.name, inquiry: Boolean(item.inquiry), routeId: item.routeId, anchor: item.anchor || null }))
};
fs.mkdirSync(outputDirectory, { recursive: true });
const pendingManifest = path.join(outputDirectory, '.release-manifest.pending.json');
fs.writeFileSync(pendingManifest, JSON.stringify(manifest, null, 2) + '\n');
const zipVerifier = String.raw`
import hashlib, json, os, sys, zipfile
from pathlib import Path, PurePosixPath
root, release, manifest_path, output = [Path(arg).resolve() for arg in sys.argv[1:]]
assert release == root / 'docs' / 'release' / 'alibaba-five-products-20261025'
assert manifest_path.parent == release and output.parent == release
assert output.name == 'alibaba-five-products-20261025-public-delta.zip'
forbidden = {'docs','site-src','tools','ops','node_modules','outputs','tmp','source','original','originals','.git','.codex','.agents','.watermark-backups','.tmp'}
manifest = json.loads(manifest_path.read_text(encoding='utf-8'))
records = manifest['files']
names = [item['path'] for item in records]
assert len(names) == len(set(names))
temporary = output.with_suffix('.pending.zip')
def digest(data): return hashlib.sha256(data).hexdigest()
try:
    with zipfile.ZipFile(temporary, 'w', compression=zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
        for item in records:
            relative = PurePosixPath(item['path'])
            assert not relative.is_absolute() and '..' not in relative.parts
            assert not any(part.lower() in forbidden or part.startswith('.') for part in relative.parts)
            source = (root / Path(*relative.parts)).resolve()
            assert source.is_relative_to(root)
            data = source.read_bytes()
            assert len(data) == item['bytes'] and digest(data) == item['sha256'], f'Build changed while packaging: {relative}'
            entry = zipfile.ZipInfo(relative.as_posix(), date_time=(2026,10,25,0,0,0))
            entry.compress_type = zipfile.ZIP_DEFLATED
            entry.create_system = 3
            entry.external_attr = (0o100644 << 16)
            archive.writestr(entry, data, compress_type=zipfile.ZIP_DEFLATED, compresslevel=9)
    with zipfile.ZipFile(temporary, 'r') as archive:
        assert archive.namelist() == names and archive.testzip() is None
        for item in records:
            data = archive.read(item['path'])
            assert len(data) == item['bytes'] and digest(data) == item['sha256'], f"ZIP hash mismatch: {item['path']}"
    os.replace(temporary, output)
finally:
    if temporary.exists(): temporary.unlink()
print(f'Verified public delta ZIP: {len(records)} files; no internal files or deletion commands.')
`;
try {
  execFileSync('python', ['-X', 'utf8', '-c', zipVerifier, root, outputDirectory, pendingManifest, path.join(outputDirectory, zipName)], { cwd: root, stdio: 'inherit' });
  fs.renameSync(pendingManifest, path.join(outputDirectory, 'release-manifest.json'));
} catch (error) {
  if (fs.existsSync(pendingManifest)) fs.unlinkSync(pendingManifest);
  throw error;
}
const zip = fs.readFileSync(path.join(outputDirectory, zipName));
const packageSummary = { releaseDate: manifest.releaseDate, generatedAt, generatedAtChina, status: manifest.status, baseline, ...summary, archive: zipName, archiveBytes: zip.length, archiveSha256: sha(zip), deletes: [] };
fs.writeFileSync(path.join(outputDirectory, 'package-summary.json'), JSON.stringify(packageSummary, null, 2) + '\n');
const readme = `# 10.23 五款商品官网发布包

日期：2026-10-25。状态：本地生成，尚未上传或上线，由用户自行部署。

新增 5 款独立产品的英阿详情页：沟槽同心异径管、丝接机械三通、沟槽正三通、沟槽转换法兰、卧式单级消防泵。前四款归入沟槽管件，泵归入消防泵与控制柜。共复用 5 张原始白底实拍和 5 张现有英文结构说明图，补充图明确标作说明图。

按原始网页填写前三款管件球墨铸铁、消防泵铸铁泵体；转换法兰的标题与材质栏信息不完整，保留按询价提供。未将通用最大流量、扬程、铸字或其他产品的压力、螺纹、认证套入新页面。产地及可定制使用用户已有确认。

本包包含此前喷头独立详情页、温度实拍、水雾喷头图片及泡沫喷头并入喷头分组的累积修改，沿用基线 ${baseline}。它是现有网站的增量包，不能部署到空目录；未变化依赖见清单 baselineDependencies。旧页面继续保留，无删除操作。

- [公开文件 ZIP](${zipName})
- [逐文件清单](release-manifest.json)
- [ZIP 摘要](package-summary.json)

包含 ${registeredPages.size} 个公开页面和 sitemap，以及新增或变化的公开依赖，共 ${files.length} 个文件，约 ${(zip.length/1024/1024).toFixed(2)} MiB。ZIP 根目录对应网站根目录；不要上传源码、内部资料或本说明。部署前备份，先上传资源，再覆盖 HTML 和 sitemap。

核验包括完整构建、英阿桌面/手机详情和图库、分类搜索、所有公开链接，以及 ZIP 逐文件 SHA256。浏览器结果见 ../../evidence/alibaba-five-products-20261025/browser-validation.json。服务器未操作、Git 未提交或推送。

重新打包：node tools/prepare-alibaba-five-products-20261025.mjs
`;
fs.writeFileSync(path.join(outputDirectory, 'README.md'), readme);
console.log(JSON.stringify(packageSummary, null, 2));
