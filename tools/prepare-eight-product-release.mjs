import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';

// Review bundle only: does not deploy files or change publication state.
const directory = 'docs/release/eight-products-20260909';
fs.mkdirSync(directory, {recursive:true});
execFileSync(process.execPath, ['tools/validate-catalog-additions.mjs', `--evidence-dir=${directory}`], {stdio:'inherit'});
const inventory = JSON.parse(fs.readFileSync(`${directory}/addition-inventory.json`, 'utf8'));
const git = (...args) => execFileSync('git', args, {encoding:'utf8'}).trim();
const baseline = git('rev-parse', 'origin/master');
const head = git('rev-parse', 'HEAD');
const trackedBaseline = new Set(git('-c', 'core.quotepath=false', 'ls-tree', '-r', '--name-only', baseline).split('\n'));
const sha = value => crypto.createHash('sha256').update(value).digest('hex');
const direct = new Map();
const add = (file, role, owner) => {
  if (!direct.has(file)) direct.set(file, {path:file, roles:[], usedBy:[]});
  const item = direct.get(file);
  if (!item.roles.includes(role)) item.roles.push(role);
  if (!item.usedBy.includes(owner)) item.usedBy.push(owner);
};
for (const record of inventory.records) {
  add(record.sourcePath, 'source-only', record.id);
  record.images.forEach(image => add(image.path, 'product-image', record.id));
  for (const output of record.outputs) {
    add(output.path, 'product-page', record.id);
    const html = fs.readFileSync(output.path, 'utf8');
    for (const match of html.matchAll(/\b(?:href|src)=["']([^"']+)["']/g)) {
      const value = match[1].split(/[?#]/)[0];
      if (!value || /^(?:[a-z]+:|\/\/)/i.test(value)) continue;
      let local = decodeURI(path.posix.normalize(value.startsWith('/') ? value.slice(1) : path.posix.join(path.posix.dirname(output.path), value)));
      if (fs.existsSync(local) && fs.statSync(local).isDirectory()) local = path.posix.join(local, 'index.html');
      add(local, /\.html$/.test(local) ? 'linked-page' : 'direct-asset', record.id);
    }
  }
}
const files = [...direct.values()].sort((a,b) => a.path.localeCompare(b.path));
for (const file of files) {
  file.existsLocally = fs.existsSync(file.path);
  if (!file.existsLocally) throw new Error(`Missing local dependency: ${file.path}`);
  file.sha256 = sha(fs.readFileSync(file.path));
  file.baselineStatus = trackedBaseline.has(file.path)
    ? (sha(execFileSync('git', ['show', `${baseline}:${file.path}`])) === file.sha256 ? 'unchanged' : 'changed')
    : 'absent';
}
const names = ['易熔合金消防喷头','马鞍式水流指示器','直通／斜角室内消火栓','水平手轮室内消火栓','消防进水装置（Breeching Inlets）','俄式消防水泵接合器','直流水枪','杠杆式消防水枪'];
const manifest = {generatedAt:new Date().toISOString(), purpose:'review-only-not-a-deployable-package', localCommit:head, remoteTrackingBaseline:baseline, baselineCaveat:'Git baseline comparison, not a server filesystem audit.', scope:{products:8,pages:16,galleryImages:15}, publication:'not-published', imageRights:'user-confirmed-website-use', dependencyScope:'Direct HTML href/src references only; linked-page dependencies are not recursively packaged.', files};
fs.writeFileSync(`${directory}/release-manifest.json`, JSON.stringify(manifest,null,2)+'\n');
const esc = s => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
const link = file => '../../../'+file;
const cards = inventory.records.map((r,i) => `<section><h2>${i+1}. ${names[i]}</h2><p>目录第 ${r.catalogPage} 页 · ${r.modelRows} 条型号记录 · 官网图片许可已由用户确认</p><p>${r.outputs.map(o=>`<a href="${esc(link(o.path))}">${o.locale.toUpperCase()} 页面预览</a>`).join(' · ')}</p><div class="images">${r.images.map(im=>`<figure><a href="${esc(link(im.path))}"><img src="${esc(link(im.path))}" alt="${esc(names[i]+' '+im.key)}" loading="lazy"></a><figcaption>${esc(path.posix.basename(im.path))}</figcaption></figure>`).join('')}</div></section>`).join('\n');
fs.writeFileSync(`${directory}/index.html`, `<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>8 款新品发布准备</title><style>body{max-width:1100px;margin:32px auto;padding:0 20px;font:16px/1.7 system-ui;color:#192b39;background:#f5f7fa}h1{font-size:28px}section{background:white;padding:24px;margin:24px 0;border-radius:12px}.images{display:flex;flex-wrap:wrap;gap:20px}figure{margin:0;width:260px;max-width:100%}img{width:100%;height:230px;object-fit:contain}figcaption{overflow-wrap:anywhere;font-size:12px}a{color:#075ca8}</style><h1>8 款新品发布准备</h1><p><strong>本地已完成：8 款产品、16 个英阿页面、15 张产品图片。尚未发布到线上。</strong></p><p>本页用于查看拟上线的页面与图片。15 张图片的官网使用许可已由用户确认；现有英阿公共导航与旧版发布分支存在差异，需要一并处理发布依赖。</p><p><a href="CANDIDATE.md">已完成的发布候选版与验证</a> · <a href="README.md">原始依赖说明</a> · <a href="release-manifest.json">文件与依赖清单</a></p>${cards}</html>\n`);
const support = files.filter(f => !f.roles.includes('source-only') && !f.roles.includes('product-page') && !f.roles.includes('product-image'));
fs.writeFileSync(`${directory}/README.md`, `# 8 款新品发布准备\n\n本批本地内容已完成，尚未上线。本目录是审核资料，不是可以直接覆盖服务器的部署包。\n\n[查看页面和 15 张图片](index.html) · [完整文件清单](release-manifest.json) · [本次产品校验](addition-inventory.json)\n\n## 产品范围\n\n|产品|目录页|英阿页面|图片|\n|---|---:|---:|---:|\n${inventory.records.map((r,i)=>`|${names[i]}|${r.catalogPage}|2|${r.galleryImages}|`).join('\n')}\n\n## 发布状态与依赖\n\n- 本地基准提交：\`${head}\`。\n- 发布分支基准：\`${baseline}\`（发布准备阶段核实的 master 基准，上线前应重新核实）。\n- 8 款产品均为 local-draft，externalRelease=false；图片许可已确认，尚未部署。\n- 页面直接引用的公共资源及链接目标共 ${support.length} 个，逐项见下表。状态相对于 Git 发布分支，不等于服务器文件实测。\n- 当前新品页面使用本地英阿导航。不能把整个开发分支当作仅有 8 款新品直接推送；分类入口、公共导航和阿语页面必须明确纳入发布范围或做兼容处理。\n- 清单仅枚举 HTML 的直接 href/src 引用，不代表所有 CSS 引用和链接页面的递归依赖已经打包。\n- 另 8 个暂缓候选和后续旧产品修订不纳入本次新品范围。\n\n|公共资源或链接目标|相对发布分支|\n|---|---|\n${support.map(f=>`|\`${f.path}\`|${f.baselineStatus}|`).join('\n')}\n\n## 正式上线前剩余事项\n\n1. 已确认：15 张图片可用于川威官网公开展示，确认原文和文件哈希见 image-rights-confirmation.json。\n2. 以现有发布分支为基础准备最小发布变更，并处理新品分类入口和英阿公共导航依赖，排除其他旧产品修订。\n3. 确定最终发布范围后构建并验证发布版本，备份线上内容，再部署及检查线上链接。\n\n## 验证记录\n\n本次重新执行 validate-catalog-additions：8 款、16 页、15 图通过；清单中的本地引用均存在。此前 CATWEB-013 已完成新品批次的浏览器回归，证据见 ../../evidence/catweb-013/。本次仅生成审核资料，没有执行部署或推送。\n`);
console.log(`Review bundle created: ${directory}; ${files.length} inventoried files; ${support.length} supporting references.`);

fs.appendFileSync(`${directory}/README.md`, "\n## 发布候选版进展\n\n最小发布版本已生成，详见 [候选版与验证记录](CANDIDATE.md)。上文依赖表是开发版原始引用；候选版已按旧站结构处理，正式部署尚未执行。\n");
