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
const release = 'docs/release/sprinkler-groups-20261024';
const baseline = '18002712ff71c32d43fc1f80df1b1a2c7a88283e';
const zipName = 'sprinkler-groups-20261024-public-delta.zip';
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
assert.equal(registeredPages.size, 281, 'Retain all 265 baseline pages plus four ordinary K115, eight concealed and four independent large-K/ESFR language outputs');
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
const newProductPages = ['k115-standard-response-fire-sprinkler', 'k115-quick-response-fire-sprinkler', ...concealedSeries.map(item => item.productId), ...largeKEsfrSeries.map(item => item.productId)]
  .flatMap(slug => ['en', 'ar'].map(locale => SITE_ROUTES[`product:${slug}`].locales[locale].outputPath));
assert.deepEqual([...registeredPages].filter(relative => !baselinePaths.has(relative)).sort(), [...newProductPages].sort(), 'Only the confirmed ordinary K115, independent concealed and large-K/ESFR detail pages may be added to this release');
assert.equal([...registeredPages].filter(relative => baselinePaths.has(relative)).length, 265, 'Preserve all 265 baseline page paths alongside the sixteen new language outputs');
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
  releaseDate: '2026-10-24', generatedAt, generatedAtChina,
  status: 'local-package-user-deploys-not-deployed', baseline,
  localCommit: git(['rev-parse', 'HEAD']).toString('utf8').trim(),
  baselineCaveat: 'Requires the existing site represented by this Git baseline, including the 2026-10-18 product batch and the BS750 35 kg correction. No server filesystem verification was performed.',
  archive: zipName, archiveRoot: 'website root; no enclosing directory; no internal manifest included',
  packagePolicy: 'All 281 registered output pages and sitemap, plus changed/new allowlisted public dependencies found in HTML/CSS, including related model data-model-image references.',
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
assert release == root / 'docs' / 'release' / 'sprinkler-groups-20261024'
assert manifest_path.parent == release and output.parent == release
assert output.name == 'sprinkler-groups-20261024-public-delta.zip'
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
            entry = zipfile.ZipInfo(relative.as_posix(), date_time=(2026,10,24,0,0,0))
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
const readme = `# 喷头 17 组分类增量发布包

日期：2026-10-24。状态：本地包已准备，由你自行部署，尚未上传或上线。

本包相对基线提交 ${baseline} 生成。**它仅用于更新已有网站，不适合部署到空目录。** 基线已经包含此前32系列产品批次，以及BS750重量35 kg修正；本包依赖这些已有文件。

本次内容：

- 喷头目录按已确认顺序整理为17组，上喷、下喷、侧喷归入各自系列详情。
- K115快速响应、K115标准响应已按用户确认的68°C实拍建立各自详情页与分组图片，各展示上喷、下喷、侧喷；不沿用K80或EC未确认参数。
- 普通K115快速照片归入对应详情页，EC页恢复带EC-ZST型号标识的实拍图。
- Water Mist Nozzles二级目录改用详情页现用的带进水滤网水雾喷头实拍图，英文与阿拉伯文产品目录、喷头分类同步。
- 按用户确认，将新提供的水雾喷头实拍加入Water Mist Nozzles英阿详情页补充图库；只确认产品分组，不套用其他型号参数。
- 泡沫喷头并入消防喷头一级浏览分组：17个喷头系列及2款泡沫喷头共19项；首页、目录和导航同步，原泡沫分类链接及独立详情页保留。
- Large K-Factor Sprinklers与ESFR Sprinklers分别使用独立英阿详情网址、图片、参数和型号表；每页保留6条原有型号，图库分别为5张和4张；68°C ESFR补充型号仅归属ESFR页。目录及搜索结果指向对应独立页，原合并网址保留兼容。
- 隐蔽式K80/K115 × 标准/快速四组分别使用独立英阿详情网址，各自展示对应68°C带盖和内部结构实拍及本组已核实的其他温度配置；二级目录和型号搜索均进入对应独立页。EC、普通大K值和ESFR分别展示；原产品网址保留。
- 四组隐蔽式各使用用户提供的68°C带盖与内部结构组合图作为二级目录产品图，英阿图注同步；其他温度型号保留各自链接及样品温度说明。
- K80标准响应隐蔽式独立详情页下方增加57/79/93/141°C实拍，每个温度按带盖、内部结构配对，共8张；保留68°C主图库和其他三组页面，英阿同步。
- K80快速响应隐蔽式独立详情页下方增加57/68/93/141°C的Q3A实拍，每个温度按带盖、内部结构配对，共8张；英阿图注与放大图同步。
- K115标准响应隐蔽式独立详情页下方增加57/79/93/141°C的Q5A实拍，每个温度按带盖、内部结构配对，共8张；英阿图注与放大图同步。
- K115快速响应隐蔽式独立详情页下方增加57/68/93/141°C的Q3A实拍，每个温度按带盖、内部结构配对，共8张；英阿图注与放大图同步。
- 搜索结果保留具体型号链接；参考图片注明所示样品，避免将系列图片当作所选型号的确切外观。
- K80快速响应图库的包装图片已按用户要求替换为K-ZSTBS 80-68°C Q3A水平侧喷图，英阿图注及相关搜索图片同步更新。
- K80快速响应详情下方追加6张用户提供的产品照片，共9张，英阿图注同步；用户确认绿色93°C、蓝色141°C、紫色182°C、黑色260°C、最后浅黄色79°C，侧喷57°C依可见铭牌标注。
- K115快速响应详情下方追加6张水平侧喷实拍，依用户顺序标注57/182/141/79/260/93°C，共9张下方图库照片；保留原3张68°C主图，英阿同步。
- K115标准响应详情下方追加6张实拍，依用户顺序为侧喷182/141/57°C、上喷79°C、侧喷260°C、上喷93°C，共9张下方图库照片；保留原3张68°C主图，英阿同步。
- 喷头装饰盘、盖板和保护件主入口迁入配件分类，并保留喷头分类关联入口。
- 其他产品分类不在本次重组范围。

## 文件及部署

- [公开文件ZIP](${zipName})
- [逐文件清单与SHA256](release-manifest.json)
- [ZIP摘要与SHA256](package-summary.json)

ZIP共${files.length}个文件，约${(zip.length / 1024 / 1024).toFixed(2)} MiB。包含全部281个公开页面和sitemap.xml，以及实际引用、相对基线新增或变化的CSS、JavaScript和图片等依赖，包括搜索时替换图片所用的data-model-image资源。所有页面都包含共同导航，应一起更新。

ZIP根目录直接对应网站根目录，没有额外顶层目录。部署时先备份现有站点，先上传资源，再覆盖HTML，最后更新sitemap.xml。按同名文件覆盖，保留其他旧文件；本包没有删除要求。部署后检查英阿喷头分类、两种K115详情及三种方向图片、隐蔽式四组、EC/大K/ESFR分区及配件入口。

未变化的资源保留在现有站点，详见清单baselineDependencies。ZIP不包含本说明、内部清单、源资料、源码、审查材料或Git元数据；请勿上传整个仓库或本发布目录。

## 核验与重新生成

生成时间：${generatedAtChina}。文件清单已核验281个页面、17组顺序、公开资源白名单、HTML/CSS依赖和ZIP逐文件哈希。文本基线比较将CRLF归一为LF；ZIP中的SHA256对应实际文件字节。构建及浏览器验收由独立步骤完成，基线比较不代表服务器文件已经核验。

完成最新构建后，在仓库根目录运行以下命令，可更新本发布目录的ZIP、清单和说明，不修改旧发布包或网站页面，不提交或推送Git，也不会部署。

    node tools/prepare-sprinkler-groups-20261024.mjs
`;
fs.writeFileSync(path.join(outputDirectory, 'README.md'), readme);
console.log(JSON.stringify(packageSummary, null, 2));
