import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { SITE_ORIGIN, SITE_ROUTES } from '../site-src/_data/siteRoutes.js';
import { thumbnailFor } from '../site-src/_data/catalogThumbnails.js';

// Read the current build and write only this batch's local release artifacts.
// This tool never builds, commits, uploads, deletes public files, or deploys.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const release = 'docs/release/website-products-20261018';
const baseline = '553181a191b1a5935e706a31d75d6fc782e44514';
const zipName = 'website-products-20261018-public-delta.zip';
const read = relative => JSON.parse(fs.readFileSync(path.join(root, relative), 'utf8'));
const sha = buffer => crypto.createHash('sha256').update(buffer).digest('hex');
const git = args => execFileSync('git', args, { cwd: root, maxBuffer: 256 * 1024 * 1024 });
const normalizeText = buffer => Buffer.from(buffer.toString('utf8').replaceAll('\r\n', '\n'), 'utf8');
const textExtension = /\.(?:html|css|js|mjs|xml|txt|svg)$/i;
const compareSha = (relative, buffer) => sha(textExtension.test(relative) ? normalizeText(buffer) : buffer);
const coverage = read('docs/reviews/material-batch-20261018/coverage.json');
const images = read('docs/reviews/material-batch-20261018/images.json');
const catalog = read('site-src/_data/website-catalog-20261018.json');
const outputDirectory = path.join(root, release);
assert.equal(git(['rev-parse', `${baseline}^{commit}`]).toString('utf8').trim(), baseline);
assert.equal(catalog.products.length, 32, 'This release is limited to the reviewed 32 product series');
assert.equal(catalog.categories.length, 7, 'This release must contain the reviewed seven new categories');
assert.equal(coverage.products.length, catalog.products.length);
assert.equal(images.length, 44, 'All 44 source-image exports must be accounted for');
const imagePaths = new Set(images.map(image => image.path));
assert.equal(imagePaths.size, 44);
assert.deepEqual(new Set(coverage.products.map(product => product.id)), new Set(catalog.products.map(product => product.id)));
assert.deepEqual(new Set(coverage.products.flatMap(product => product.images)), imagePaths);

const routes = Object.entries(SITE_ROUTES).flatMap(([routeId, definition]) => Object.entries(definition.locales)
  .filter(([, target]) => target.status === 'published')
  .map(([locale, target]) => ({ routeId, locale, kind: definition.kind, path: target.outputPath })));
const registeredPages = new Set(routes.map(route => route.path));
assert.equal(registeredPages.size, routes.length, 'Published routes must have unique output paths');
const newProductPages = new Set();
const newCategoryPages = new Set();
for (const product of catalog.products) {
  const record = coverage.products.find(item => item.id === product.id);
  for (const locale of ['en', 'ar']) {
    const target = SITE_ROUTES[product.routeId]?.locales[locale];
    assert.equal(target?.status, 'published', `${product.id}/${locale}: missing registered route`);
    assert.equal(target.outputPath, record[locale], `${product.id}/${locale}: coverage differs from registered route`);
    newProductPages.add(target.outputPath);
  }
  assert(imagePaths.has(product.image), `${product.id}: hero outside reviewed batch`);
}
for (const category of catalog.categories) for (const locale of ['en', 'ar']) {
  const target = SITE_ROUTES[category.routeId]?.locales[locale];
  assert.equal(target?.status, 'published', `${category.id}/${locale}: missing category route`);
  newCategoryPages.add(target.outputPath);
}
assert.equal(newProductPages.size, 64);
assert.equal(newCategoryPages.size, 14);

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
for (const route of routes) add(route.path,
  newProductPages.has(route.path) ? 'new-product-page' : newCategoryPages.has(route.path) ? 'new-category-page' : 'existing-page-navigation-dependency', true, route.routeId);
add('sitemap.xml', 'sitemap', true);
if (fs.existsSync(path.join(root, 'robots.txt'))) add('robots.txt', 'crawler-entry');
for (const image of images) {
  assert(image.path.startsWith('assets/products/website-20261018/') && image.path.endsWith('.webp'));
  add(image.path, 'new-product-image', true);
}
const batchThumbnails = new Set(catalog.products.map(product => thumbnailFor(product.image)));
for (const thumbnail of batchThumbnails) add(thumbnail, 'new-product-thumbnail', true);

function localReference(reference, owner) {
  const value = reference.trim().replaceAll('&amp;', '&');
  if (!value || value.startsWith('#') || /^(?:data|mailto|tel|javascript|blob):/i.test(value)) return null;
  let url;
  try { url = new URL(value, new URL(owner, `${SITE_ORIGIN}/`)); } catch { throw new Error(`${owner}: invalid local reference ${reference}`); }
  if (url.origin !== new URL(SITE_ORIGIN).origin) return null;
  let relative = decodeURIComponent(url.pathname).replace(/^\/+/, '');
  if (!relative || relative.endsWith('/')) relative += 'index.html';
  return relative;
}
function cssReferences(text) {
  return [...text.matchAll(/url\(\s*(["']?)(.*?)\1\s*\)/gi)].map(match => match[2])
    .concat([...text.matchAll(/@import\s+["']([^"']+)["']/gi)].map(match => match[1]));
}
function htmlReferences(text) {
  const references = [];
  for (const match of text.matchAll(/<[a-z][^>]*>/gi)) {
    const tag = match[0];
    for (const attribute of tag.matchAll(/\b(href|src|poster|data-src|data-lightbox|data-full|data-zoom)\s*=\s*(["'])(.*?)\2/gi)) references.push(attribute[3]);
    for (const attribute of tag.matchAll(/\bsrcset\s*=\s*(["'])(.*?)\1/gi)) {
      if (!attribute[2].startsWith('data:')) references.push(...attribute[2].split(',').map(item => item.trim().split(/\s+/)[0]));
    }
    const metaProperty = tag.match(/\b(?:property|name)\s*=\s*(["'])(.*?)\1/i)?.[2];
    if (/^<meta\b/i.test(tag) && ['og:image', 'og:image:url', 'og:image:secure_url', 'twitter:image', 'twitter:image:src'].includes(metaProperty)) {
      const content = tag.match(/\bcontent\s*=\s*(["'])(.*?)\1/i);
      if (content) references.push(content[2]);
    }
  }
  return references.concat(cssReferences(text));
}
// Traverse only references from registered pages/CSS; never enumerate arbitrary files.
const parsed = new Set();
let checkedReferences = 0;
while (true) {
  const next = [...candidates.values()].find(item => /\.(?:html|css)$/i.test(item.path) && !parsed.has(item.path));
  if (!next) break;
  parsed.add(next.path);
  const text = fs.readFileSync(path.join(root, next.path), 'utf8');
  const references = next.path.endsWith('.html') ? htmlReferences(text) : cssReferences(text);
  for (const reference of references) {
    const relative = localReference(reference, next.path);
    if (!relative) continue;
    checkedReferences++;
    add(relative, registeredPages.has(relative) ? 'linked-public-page' : 'public-resource-dependency', false, next.path);
  }
}
// Include any additional batch-image thumbnail actually used by current pages.
for (const item of read('assets/catalog-thumbnails/manifest.json')) {
  if (imagePaths.has(item.source) && candidates.has(item.output)) {
    batchThumbnails.add(item.output);
    add(item.output, 'new-product-thumbnail', true);
  }
}
console.log(`Collected ${candidates.size} public files from ${registeredPages.size} pages and ${checkedReferences} local references.`);

const baselinePaths = new Set(git(['ls-tree', '-r', '-z', '--name-only', baseline]).toString('utf8').split('\0').filter(Boolean));
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
    baselineHashes.set(relative, { sha256: sha(blob), comparisonSha256: compareSha(relative, blob) });
    offset = end + size + 2;
  }
  assert.equal(offset, response.length, 'Unexpected trailing baseline response');
}
const allRecords = [...candidates.values()].map(item => {
  const bytes = fs.readFileSync(path.join(root, item.path));
  const comparisonSha256 = compareSha(item.path, bytes);
  const previous = baselineHashes.get(item.path);
  const baselineStatus = !previous ? 'added' : previous.comparisonSha256 === comparisonSha256 ? 'unchanged' : 'changed';
  return {
    path: item.path, bytes: bytes.length, sha256: sha(bytes), comparisonSha256,
    comparison: textExtension.test(item.path) ? 'UTF-8 with CRLF normalized to LF' : 'exact bytes',
    baselineStatus, baselineSha256: previous?.sha256 ?? null,
    roles: [...item.roles].sort(), usedBy: [...item.usedBy].sort(),
    included: item.force || baselineStatus !== 'unchanged',
    reason: item.force ? 'required batch payload or shared-page navigation dependency' : baselineStatus === 'unchanged' ? 'unchanged resource supplied by baseline' : 'changed or new public dependency'
  };
}).sort((a, b) => a.path.localeCompare(b.path, 'en'));
const files = allRecords.filter(item => item.included);
const baselineDependencies = allRecords.filter(item => !item.included);
assert.equal(files.filter(item => newProductPages.has(item.path)).length, 64);
assert.equal(files.filter(item => newCategoryPages.has(item.path)).length, 14);
assert.equal(files.filter(item => imagePaths.has(item.path)).length, 44);
assert([...registeredPages].every(relative => files.some(item => item.path === relative)));
console.log(`Packaging ${files.length} files; retaining ${baselineDependencies.length} unchanged resources from the baseline.`);
const generatedAt = new Date().toISOString();
const generatedAtChina = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Shanghai', dateStyle: 'short', timeStyle: 'medium' }).format(new Date()) + ' Asia/Shanghai';
const summary = {
  sourceImages: 44, sourceProductNames: coverage.sourceProductNames, productSeries: 32,
  newProductPages: 64, newCategoryPages: 14, newProductImages: 44,
  productThumbnails: batchThumbnails.size, allRegisteredPages: registeredPages.size,
  files: files.length, bytes: files.reduce((sum, item) => sum + item.bytes, 0),
  added: files.filter(item => item.baselineStatus === 'added').length,
  changed: files.filter(item => item.baselineStatus === 'changed').length,
  unchangedRequired: files.filter(item => item.baselineStatus === 'unchanged').length,
  unchangedBaselineDependencies: baselineDependencies.length, localReferencesChecked: checkedReferences
};
const manifest = {
  generatedAt, generatedAtChina, status: 'local-package-user-deploys-not-deployed',
  baseline, localCommit: git(['rev-parse', 'HEAD']).toString('utf8').trim(),
  baselineCaveat: 'Git baseline comparison. This tool performs no remote operations and does not certify the server filesystem.',
  archive: zipName, archiveRoot: 'website root; no enclosing directory; no internal manifest included',
  packagePolicy: 'All registered output pages and sitemap, all 44 batch product images, referenced batch thumbnails, plus changed/new allowlisted public resource dependencies.',
  comparisonPolicy: 'Text files, including HTML, compare after CRLF-to-LF normalization. ZIP entries retain current local bytes and exact SHA256.',
  deletionPolicy: 'No deletion instructions; existing server files are retained.',
  validationScope: 'Coverage, route registration, public-file allowlist, local HTML/CSS dependencies, baseline differences, archive hashes. Build and browser validation are separate.',
  summary, files, baselineDependencies,
  products: catalog.products.map(product => ({
    id: product.id, name: product.name, image: product.image,
    en: SITE_ROUTES[product.routeId].locales.en.outputPath,
    ar: SITE_ROUTES[product.routeId].locales.ar.outputPath
  }))
};
fs.mkdirSync(outputDirectory, { recursive: true });
const pendingManifest = path.join(outputDirectory, '.release-manifest.pending.json');
fs.writeFileSync(pendingManifest, JSON.stringify(manifest, null, 2) + '\n');
try {
  execFileSync('python', ['-X', 'utf8', path.join(root, 'tools/prepare-website-products-20261018.py'), pendingManifest, path.join(outputDirectory, zipName)], { cwd: root, stdio: 'inherit' });
  fs.renameSync(pendingManifest, path.join(outputDirectory, 'release-manifest.json'));
} catch (error) {
  if (fs.existsSync(pendingManifest)) fs.unlinkSync(pendingManifest);
  throw error;
}
const zip = fs.readFileSync(path.join(outputDirectory, zipName));
const packageSummary = { generatedAt, generatedAtChina, status: manifest.status, baseline, ...summary, archive: zipName, archiveBytes: zip.length, archiveSha256: sha(zip), deletes: [] };
fs.writeFileSync(path.join(outputDirectory, 'package-summary.json'), JSON.stringify(packageSummary, null, 2) + '\n');

const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const fileLink = relative => path.posix.relative(release, relative).split('/').map(encodeURIComponent).join('/');
const cards = manifest.products.map((product, index) => `<article><a class="photo" href="${escape(fileLink(product.en))}"><img src="${escape(fileLink(product.image))}" alt="${escape(product.name.zh)}" loading="lazy" decoding="async"></a><div><p class="number">${String(index + 1).padStart(2, '0')}</p><h2>${escape(product.name.zh)}</h2><p class="english">${escape(product.name.en)}</p><p class="links"><a href="${escape(fileLink(product.en))}">英文页面 →</a><a href="${escape(fileLink(product.ar))}">阿拉伯文页面 →</a></p></div></article>`).join('\n');
const html = `<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>32 个产品系列 · 官网本地发布包</title><style>
*{box-sizing:border-box}body{margin:0;background:#f3f5f6;color:#183247;font:16px/1.65 system-ui,"Microsoft YaHei",sans-serif}main{max-width:1240px;margin:auto;padding:36px 24px 64px}header{background:#10374d;color:#fff;padding:30px;border-radius:16px;margin-bottom:24px}h1{font-size:clamp(25px,4vw,38px);margin:10px 0}header p{max-width:900px}header a{color:#fff}.badge{display:inline-block;padding:4px 12px;border:1px solid #9fb7c4;border-radius:20px}.actions{display:flex;flex-wrap:wrap;gap:12px;margin:24px 0 0}.actions a{padding:9px 14px;background:#fff;color:#10374d;border-radius:8px;text-decoration:none}.facts{display:flex;flex-wrap:wrap;gap:12px 28px;margin:22px 0}.facts strong{font-size:25px}.note{background:#fff;padding:18px 22px;border-left:4px solid #d59c39;border-radius:6px;margin-bottom:24px}.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}article{display:grid;grid-template-columns:180px 1fr;gap:20px;padding:20px;background:#fff;border:1px solid #e0e6ea;border-radius:12px}.photo{display:flex;align-items:center;background:#fff}.photo img{width:100%;height:170px;object-fit:contain}h2{font-size:20px;margin:0 0 8px}.english{font-size:14px;color:#5e7180;margin:0}.number{font-size:12px;color:#5e7180;margin:0 0 6px}.links{display:flex;flex-wrap:wrap;gap:8px 18px;margin-bottom:0}a{color:#086b8d}.meta{font-size:13px;color:#d4e1e8}footer{margin-top:28px;color:#5e7180;font-size:13px;overflow-wrap:anywhere}@media(max-width:800px){.grid{grid-template-columns:1fr}}@media(max-width:430px){main{padding:18px 12px}header{padding:22px}article{grid-template-columns:110px 1fr;gap:12px;padding:14px}.photo img{height:130px}h2{font-size:18px}.links{font-size:14px}}
</style></head><body><main><header><span class="badge">本地候选包 · 用户自行部署 · 尚未上线</span><h1>本批 32 个产品系列已整理</h1><p>44 张产品图片已归入对应系列，包含英文、阿拉伯文详情，以及新增分类、产品目录、首页和共用导航的同批依赖。</p><div class="facts"><span><strong>32</strong> 产品系列</span><span><strong>64</strong> 新增详情页</span><span><strong>14</strong> 新增分类页</span><span><strong>44</strong> 产品图片</span></div><div class="actions"><a href="${zipName}" download>下载公开文件 ZIP</a><a href="README.md">部署说明</a><a href="release-manifest.json">文件与哈希清单</a></div><p class="meta">生成时间：${escape(generatedAtChina)} · ZIP ${Math.round(zip.length / 1024 / 1024 * 10) / 10} MB · ${files.length} 个文件</p></header><div class="note">下方链接打开工作区中的完整页面。请保留本预览与工作区的相对位置。上传时只解压 ZIP 中的公开文件到网站目录；本说明、预览和内部记录不在 ZIP 中。目录、首页和导航依赖须与新品一起发布。</div><section class="grid" aria-label="本批产品页面预览">${cards}</section><footer>基线提交：${baseline}。本工具未连接服务器、未提交或推送 Git，也未执行上线。包内不含删除操作；部署前由你备份当前网站，建议先上传资源，再覆盖页面和站点地图。</footer></main></body></html>\n`;
fs.writeFileSync(path.join(outputDirectory, 'index.html'), html);
const readme = `# 本批官网产品发布包

本批已准备 **32 个产品系列、64 个英阿详情页、14 个英阿分类页和 44 张产品图片**。你自行部署；本工具没有上传或上线。

本次分组调整：原来的系统阀、消防蝶阀、消防闸阀、管路阀门与过滤器统一归入 **Valves & Strainers（阀门与过滤器）**；压力表、耐震压力表和压力表弯管归入独立的 **Accessories（配件）**。首页、导航和目录同步调整为 15 个浏览分组，原有细分类和产品链接保留。

- [打开中文产品预览](index.html)
- [预览阀门与过滤器分组](../../../products.html?category=valves-strainers)
- [预览配件分组](../../../products.html?category=pressure-gauges-accessories)
- [下载公开文件 ZIP](${zipName})
- [查看文件清单、基线状态及 SHA256](release-manifest.json)
- [查看 ZIP 大小及 SHA256](package-summary.json)

## 上传这一份 ZIP 的内容

ZIP 内路径直接对应网站根目录，没有额外顶层文件夹。当前包共 ${files.length} 个文件、${Math.round(zip.length / 1024 / 1024 * 10) / 10} MB，包括：

- 全部 ${registeredPages.size} 个已注册输出页面和 sitemap.xml。新增产品后，共用导航也会改变旧页面，需一并上传。
- 本批 44 张产品图片及 ${batchThumbnails.size} 张当前使用的目录缩略图。
- 页面实际引用、相对基线新增或有变化的公开资源。

基线中没有变化的图片、CSS、JavaScript 等资源继续使用服务器已有文件，列在清单的 baselineDependencies 中。因此这是增量发布包，不适合部署到空目录。

ZIP 不包含原始资料、内部文档、源码、Git 元数据、审查材料或临时文件；也不含删除列表。请只上传 ZIP 的内容，不要把整个仓库或本说明所在目录上传到网站目录。

## 由你完成部署

1. 先备份当前网站，保留可恢复的旧文件。
2. 将 ZIP 解压到本地临时目录，按原路径上传到网站根目录。现有部署资料记录为 /var/www/chuanwei-fire，请以你的实际部署目录为准。
3. 先上传 assets、css 等资源，再上传 products、ar、zh 及根目录 HTML，最后更新 sitemap.xml。目录、首页和导航依赖应与新品一起发布。
4. 采用覆盖同名文件的方式，保留服务器其他旧文件；本包没有要求删除它们。
5. 上传后检查首页、产品目录、新分类、至少一组英文及阿拉伯文详情页、图片和询盘按钮。

你也可以沿用既有 Git 发布流程。这个 ZIP 提供直接上传静态文件的方式，不会自动执行 Git 或服务器操作。

## 基线与重新打包

- 基线提交：${baseline}。
- 本次生成时间：${generatedAtChina}。
- HTML 等文本按 CRLF 归一为 LF 后比较基线，避免 Windows 换行差异被误判成内容修改。清单中的 sha256 则对应 ZIP 内真实字节。
- 基线比较依据本地 Git，不代替完整服务器文件核对。
- 工具会检查覆盖数量、路由、公开文件白名单、本地页面与 CSS 依赖，并复核 ZIP 内文件哈希；不会代替构建或浏览器验收。

完成最新构建后，在仓库根目录重新运行：

\`\`\`powershell
node tools/prepare-website-products-20261018.mjs
\`\`\`

重新运行只更新本目录中的包、预览和清单，不修改图片使用确认记录，也不修改网站页面。
`;
fs.writeFileSync(path.join(outputDirectory, 'README.md'), readme);
console.log(JSON.stringify(packageSummary, null, 2));
