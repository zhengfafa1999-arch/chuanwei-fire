import fs from "node:fs";
import path from "node:path";
import { SITE_ROUTES } from "../site-src/_data/siteRoutes.js";

const root = process.cwd();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function tags(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map(match => match[0]);
}

function attribute(tag, name) {
  return tag.match(new RegExp(`\\s${name}\\s*=\\s*(["'])(.*?)\\1`, "is"))?.[2] ?? null;
}

function outputForUrl(value, outputPath) {
  const base = new URL(outputPath.replaceAll("\\", "/"), "https://local.invalid/");
  const target = new URL(value, base);
  if (target.origin !== base.origin) return null;
  let localPath = decodeURIComponent(target.pathname).replace(/^\/+/, "");
  if (!localPath || localPath.endsWith("/")) localPath += "index.html";
  return { localPath, fragment: target.hash.slice(1) };
}

const pages = [];
for (const definition of Object.values(SITE_ROUTES)) {
  for (const target of Object.values(definition.locales)) {
    if (target.status === "published") pages.push(target.outputPath);
  }
}

const problems = [];
let imageCount = 0;
let internalReferenceCount = 0;
let externalBlankCount = 0;

for (const outputPath of pages) {
  const absolutePath = path.join(root, outputPath);
  assert(fs.existsSync(absolutePath), `Missing published output: ${outputPath}`);
  const html = fs.readFileSync(absolutePath, "utf8");

  if (/{{|{%|<%[=-]?/.test(html)) problems.push(`${outputPath}: unresolved template marker`);

  for (const image of tags(html, "img")) {
    imageCount += 1;
    if (attribute(image, "alt") === null) problems.push(`${outputPath}: image is missing alt`);
  }

  for (const anchor of tags(html, "a")) {
    const href = attribute(anchor, "href");
    if (!href || /^(?:mailto:|tel:|javascript:|data:)/i.test(href)) continue;
    if (attribute(anchor, "target") === "_blank") {
      externalBlankCount += 1;
      const rel = (attribute(anchor, "rel") ?? "").split(/\s+/);
      if (!rel.includes("noopener")) problems.push(`${outputPath}: target=_blank link is missing rel=noopener (${href})`);
    }

    let resolved;
    try {
      resolved = outputForUrl(href, outputPath);
    } catch {
      problems.push(`${outputPath}: invalid URL (${href})`);
      continue;
    }
    if (!resolved) continue;
    internalReferenceCount += 1;
    const linkedPath = path.join(root, resolved.localPath);
    if (!fs.existsSync(linkedPath)) {
      problems.push(`${outputPath}: broken internal link (${href} -> ${resolved.localPath})`);
      continue;
    }
    if (resolved.fragment && linkedPath.endsWith(".html")) {
      const linkedHtml = fs.readFileSync(linkedPath, "utf8");
      const decodedFragment = decodeURIComponent(resolved.fragment);
      const escaped = decodedFragment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      if (!new RegExp(`(?:id|name)=["']${escaped}["']`, "i").test(linkedHtml)) {
        problems.push(`${outputPath}: missing fragment target (${href})`);
      }
    }
  }

  for (const element of [...tags(html, "img"), ...tags(html, "script"), ...tags(html, "link")]) {
    const value = attribute(element, "src") ?? attribute(element, "href");
    if (!value || /^(?:data:|https?:|\/\/)/i.test(value)) continue;
    let resolved;
    try {
      resolved = outputForUrl(value, outputPath);
    } catch {
      problems.push(`${outputPath}: invalid asset URL (${value})`);
      continue;
    }
    if (!resolved) continue;
    internalReferenceCount += 1;
    if (!fs.existsSync(path.join(root, resolved.localPath))) {
      problems.push(`${outputPath}: missing local asset (${value} -> ${resolved.localPath})`);
    }
  }
}

assert(problems.length === 0, `Static release audit failed with ${problems.length} issue(s):\n${problems.slice(0, 50).join("\n")}`);
console.log(`Static release audit passed: ${pages.length} pages, ${imageCount} images with alt attributes, ${internalReferenceCount} internal references and ${externalBlankCount} new-window links checked.`);
