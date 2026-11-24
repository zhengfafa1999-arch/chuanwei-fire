import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { SITE_ORIGIN, SITE_ROUTES } from "../site-src/_data/siteRoutes.js";

// Package the validated public build only. Never build, upload, or deploy.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const release = "docs/release/structured-data-20261027";
const outputDirectory = path.join(root, release);
const zipName = "structured-data-20261027-public-full.zip";
const baselinePath = "docs/release/market-reference-enriched-20261025/release-manifest.json";
const buildLogPath = "outputs/structured-data-20261027/build.log";
const contentComparisonPath = "outputs/structured-data-20261027/content-comparison.json";
const sha256 = bytes => crypto.createHash("sha256").update(bytes).digest("hex");
const baselineBytes = fs.readFileSync(path.join(root, baselinePath));
const baseline = JSON.parse(baselineBytes);
const buildLog = fs.readFileSync(path.join(root, buildLogPath), "utf8");
const contentComparison = JSON.parse(fs.readFileSync(path.join(root, contentComparisonPath), "utf8"));
assert(/Static release audit passed: 291 pages\b/.test(buildLog), "A successful full build log is required before packaging.");
assert.equal(contentComparison.comparedPages, 291, "Content comparison must cover every published page.");
assert.deepEqual(contentComparison.outsideStructuredDataChanges, [], "Changes outside JSON-LD must be reviewed before packaging.");
assert.deepEqual(contentComparison.bodyChanges, [], "Page body changes must be reviewed before packaging.");
assert(Array.isArray(baseline.files) && baseline.files.length, "The baseline must provide a public file manifest.");

const validation = execFileSync(process.execPath, ["tools/validate-structured-data.mjs"], { cwd: root, encoding: "utf8" });
assert(/Structured data validation passed: 291 pages, 288 breadcrumb trails, 5 organization descriptions, 1 canonical website\./.test(validation));
const analytics = JSON.parse(fs.readFileSync(path.join(root, "site-src/_data/analyticsConfig.json"), "utf8"));
assert.equal(analytics.ga4MeasurementId, null, "Retain the existing disabled GA4 setting.");

const routes = Object.entries(SITE_ROUTES).flatMap(([routeId, definition]) => Object.entries(definition.locales)
  .filter(([, target]) => target.status === "published")
  .map(([locale, target]) => ({ routeId, locale, path: target.outputPath })));
const registeredPages = new Set(routes.map(route => route.path));
assert.equal(registeredPages.size, 291);
assert.equal(registeredPages.size, routes.length, "Published output paths must be unique.");
const baselineFiles = new Map(baseline.files.map(file => [file.path, file]));
assert.equal(baselineFiles.size, baseline.files.length, "Baseline file paths must be unique.");
assert.deepEqual([...baselineFiles.keys()].filter(file => file.endsWith(".html")).sort(), [...registeredPages].sort(), "The baseline must contain exactly the current published HTML pages.");
assert(baselineFiles.has("sitemap.xml") && baselineFiles.has("robots.txt"));

const forbiddenSegments = /(?:^|\/)(?:docs|site-src|tools|ops|node_modules|outputs|tmp|source|originals?|private|\.git|\.codex|\.agents|\.watermark-backups|\.tmp)(?:\/|$)/i;
const allowedAsset = /^(?:(?:assets|css|products)\/.+\.(?:css|js|mjs|webp|png|jpe?g|gif|svg|avif|ico|woff2?|ttf|otf|eot|mp4|webm|pdf)|(?:favicon\.ico|apple-touch-icon\.png|og-image\.jpg|robots\.txt|sitemap\.xml))$/i;
const realRoot = fs.realpathSync(root);
function publicFile(relative) {
  assert(typeof relative === "string" && relative && !/[\\:\r\n\0]/.test(relative), `Invalid public path: ${relative}`);
  assert(!path.posix.isAbsolute(relative) && !relative.split("/").includes(".."), `Unsafe public path: ${relative}`);
  assert(!forbiddenSegments.test(relative) && !relative.split("/").some(segment => segment.startsWith(".")), `Internal path cannot be packaged: ${relative}`);
  assert(registeredPages.has(relative) || allowedAsset.test(relative), `Path is outside the public asset allowlist: ${relative}`);
  const file = path.resolve(root, relative);
  assert(file.startsWith(root + path.sep) && fs.statSync(file).isFile(), `Public file does not exist inside the website: ${relative}`);
  assert(fs.realpathSync(file).startsWith(realRoot + path.sep), `Public file follows an external symlink: ${relative}`);
  return file;
}

let schemaReferences = 0;
function verifySchemaReferences(value, owner) {
  if (Array.isArray(value)) {
    for (const item of value) verifySchemaReferences(item, owner);
    return;
  }
  if (value && typeof value === "object") {
    for (const item of Object.values(value)) verifySchemaReferences(item, owner);
    return;
  }
  if (typeof value !== "string" || !value.startsWith(`${SITE_ORIGIN}/`)) return;
  const url = new URL(value);
  let relative = decodeURIComponent(url.pathname).replace(/^\/+/, "");
  if (!relative || relative.endsWith("/")) relative += "index.html";
  assert(baselineFiles.has(relative), `${owner} introduces a structured data dependency outside the existing public manifest: ${relative}`);
  publicFile(relative);
  schemaReferences += 1;
}

const records = baseline.files.map(previous => {
  assert(previous.included !== false, `Baseline dependency is not included in the full package: ${previous.path}`);
  const bytes = fs.readFileSync(publicFile(previous.path));
  const currentSha256 = sha256(bytes);
  const changed = currentSha256 !== previous.sha256;
  if (previous.path.endsWith(".html")) {
    const html = bytes.toString("utf8");
    const pattern = /<!-- STRUCTURED-DATA:BEGIN -->[\s\S]*?<!-- STRUCTURED-DATA:END -->\r?\n?/g;
    assert.equal([...html.matchAll(pattern)].length, 1, `${previous.path} needs one JSON-LD block.`);
    const cleaned = html.replace(pattern, "").replaceAll("\r\n", "\n");
    assert.equal(sha256(Buffer.from(cleaned, "utf8")), previous.comparisonSha256, `${previous.path} changed outside the structured data block relative to the last public release.`);
    assert(changed, `${previous.path} is missing this release's structured data change.`);
    assert(!/(?:googletagmanager\.com\/gtag\/js|google-analytics\.com)/i.test(html), `${previous.path} unexpectedly enables front-end analytics.`);
    const script = html.match(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script\s*>/i);
    assert(script, `${previous.path} has no JSON-LD script.`);
    verifySchemaReferences(JSON.parse(script[1]), previous.path);
  } else {
    assert(!changed, `Non-HTML public dependency changed and requires separate review: ${previous.path}`);
  }
  return {
    path: previous.path, bytes: bytes.length, sha256: currentSha256,
    baselineSha256: previous.sha256,
    baselineStatus: changed ? "changed" : "unchanged",
    roles: previous.roles,
    included: true
  };
});
assert.equal(records.filter(file => file.baselineStatus === "changed").length, registeredPages.size);

const generatedAt = new Date().toISOString();
const generatedAtChina = new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Shanghai", dateStyle: "short", timeStyle: "medium" }).format(new Date()) + " Asia/Shanghai";
const summary = {
  allRegisteredPages: registeredPages.size,
  webPages: 291, breadcrumbTrails: 288, organizationDescriptions: 5, canonicalWebsites: 1,
  files: records.length, bytes: records.reduce((sum, file) => sum + file.bytes, 0),
  changedHtmlFiles: records.filter(file => file.baselineStatus === "changed").length,
  unchangedPublicDependencies: records.filter(file => file.baselineStatus === "unchanged").length,
  addedPublicDependencies: 0, schemaReferencesChecked: schemaReferences,
  nonHtmlChanges: [], bodyChanges: [], outsideStructuredDataChanges: [], ga4Enabled: false
};
const manifest = {
  releaseDate: "2026-10-27", generatedAt, generatedAtChina,
  status: "local-package-user-deploys-not-deployed",
  baselineManifest: baselinePath, baselineManifestSha256: sha256(baselineBytes),
  archive: zipName, archiveRoot: "website root; no enclosing directory; no internal manifests included",
  packagePolicy: "Exact public file set from the previously reviewed full release, including all 291 published pages and all public dependencies. Only managed JSON-LD blocks in HTML may change.",
  validationScope: "Successful full build log; structured data validation; unchanged page bodies and other HTML; unchanged non-HTML files; no new public dependencies; exact archive file set, CRC and every file SHA256.",
  buildLog: buildLogPath, contentComparison: contentComparisonPath,
  deletionPolicy: "No deletion instructions. Deploy into a new empty release directory to avoid retaining old public files.",
  summary, files: records
};

fs.mkdirSync(outputDirectory, { recursive: true });
const pendingManifest = path.join(outputDirectory, ".release-manifest.pending.json");
const outputZip = path.join(outputDirectory, zipName);
assert(!fs.existsSync(outputZip), "This release archive already exists; preserve it and use a new release name for a later package.");
assert(!fs.existsSync(path.join(outputDirectory, "release-manifest.json")), "Preserve an existing completed release manifest.");
fs.writeFileSync(pendingManifest, JSON.stringify(manifest, null, 2) + "\n");
const zipVerifier = String.raw`
import hashlib, json, os, sys, zipfile
from pathlib import Path, PurePosixPath
root, release, manifest_path, output = [Path(arg).resolve() for arg in sys.argv[1:]]
assert release == root / 'docs' / 'release' / 'structured-data-20261027'
assert manifest_path.parent == release and output.parent == release
assert output.name == 'structured-data-20261027-public-full.zip'
assert not output.exists()
forbidden = {'docs','site-src','tools','ops','node_modules','outputs','tmp','source','original','originals','private','.git','.codex','.agents','.watermark-backups','.tmp'}
records = json.loads(manifest_path.read_text(encoding='utf-8'))['files']
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
            entry = zipfile.ZipInfo(relative.as_posix(), date_time=(2026,10,27,0,0,0))
            entry.compress_type = zipfile.ZIP_DEFLATED
            entry.create_system = 3
            entry.external_attr = (0o100644 << 16)
            archive.writestr(entry, data, compress_type=zipfile.ZIP_DEFLATED, compresslevel=9)
    with zipfile.ZipFile(temporary, 'r') as archive:
        assert archive.namelist() == names, 'Archive file set or paths differ from the public manifest'
        assert archive.testzip() is None, 'Archive CRC verification failed'
        for item in records:
            data = archive.read(item['path'])
            assert len(data) == item['bytes'] and digest(data) == item['sha256'], f"Archive SHA256 mismatch: {item['path']}"
    os.replace(temporary, output)
finally:
    if temporary.exists(): temporary.unlink()
print(json.dumps({'fileSetVerified': True, 'crcVerified': True, 'sha256VerifiedFiles': len(records)}))
`;
let archiveVerification;
try {
  const result = execFileSync("python", ["-X", "utf8", "-c", zipVerifier, root, outputDirectory, pendingManifest, outputZip], { cwd: root, encoding: "utf8" });
  archiveVerification = JSON.parse(result);
  fs.renameSync(pendingManifest, path.join(outputDirectory, "release-manifest.json"));
} catch (error) {
  if (fs.existsSync(pendingManifest)) fs.unlinkSync(pendingManifest);
  throw error;
}
const archive = fs.readFileSync(outputZip);
const packageSummary = {
  releaseDate: manifest.releaseDate, generatedAt, generatedAtChina, status: manifest.status,
  baselineManifest: baselinePath, ...summary,
  archive: zipName, archiveBytes: archive.length, archiveSha256: sha256(archive), archiveVerification,
  deletes: []
};
fs.writeFileSync(path.join(outputDirectory, "package-summary.json"), JSON.stringify(packageSummary, null, 2) + "\n");
const readme = `# 官网结构化数据优化完整公开包

日期：2026-10-27。已在本地完成，未部署。

包含全部 291 个正式页面及公开资源，共 ${records.length} 个文件。ZIP 根目录对应网站根目录，不依赖旧站文件。

- [完整公开 ZIP](${zipName})
- [逐文件 SHA256 清单](release-manifest.json)
- [包摘要与验证结果](package-summary.json)

本次增加 291 个 WebPage、288 条 BreadcrumbList、5 处 Organization 和 1 个主域 WebSite。沿用上一完整公开包的文件白名单，只有 HTML 中的结构化数据块改变，正文、样式、脚本及其他公开资源未改变。公司资料使用现有公开信息，未加入产品价格、评分或认证声明。GA4 前端统计继续关闭。

已核验全量构建记录、结构化数据、页面正文和公开依赖；ZIP 文件集、CRC 及 ${records.length} 个文件的 SHA256 均通过。代表性公司页标记已通过 Google 官方代码测试，检测到有效的面包屑与组织内容；公司相关类别仍有非严重字段提示，未据此补入无证据的资料。测试范围和结果见 [Google 代码测试记录](google-rich-results.json)。新版尚未上线，未验证 Google 对线上新版的抓取。

部署时先备份当前站点，把 ZIP 解压到新的空发布目录，验证页面与资源后再切换 Nginx document root 或已有发布软链接。不要上传源码、docs、tools、ops 或内部资料。不要直接覆盖旧网站目录，以免过去的内部文件继续公开。旧发布包保留。

生成命令：node tools/prepare-structured-data-20261027.mjs。该工具只打包已经验证的构建，不构建、不上传、不部署；完成后的同名包不会被覆盖。
`;
fs.writeFileSync(path.join(outputDirectory, "README.md"), readme);
console.log(JSON.stringify(packageSummary, null, 2));
