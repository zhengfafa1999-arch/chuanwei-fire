import fs from "node:fs";
import path from "node:path";
import { SITE_ORIGIN, SITE_ROUTES } from "../site-src/_data/siteRoutes.js";
import { createSeoMetadata, renderSeoTags } from "../site-src/_data/seo.js";

const root = process.cwd();
const managedBlockPattern = /\s*<!-- SEO:BEGIN -->[\s\S]*?<!-- SEO:END -->\s*/gi;

function readAttribute(tag, name) {
  const match = tag.match(new RegExp(`\\s${name}\\s*=\\s*(["'])(.*?)\\1`, "is"));
  return match?.[2] ?? null;
}

function decodeHtmlEntities(value) {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&apos;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&amp;", "&");
}

function metaContent(html, name) {
  for (const match of html.matchAll(/<meta\b[^>]*>/gi)) {
    if (readAttribute(match[0], "name")?.toLowerCase() === name.toLowerCase()) {
      return decodeHtmlEntities(readAttribute(match[0], "content") ?? "").trim();
    }
  }
  return "";
}

function contentImage(html, outputPath, canonical) {
  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    const source = readAttribute(match[0], "src");
    if (!source || /(?:apple-touch-icon|favicon|logo)/i.test(source)) continue;
    if (/^https?:/i.test(source)) return new URL(source).href;
    if (/^(?:data:|javascript:)/i.test(source)) continue;

    const cleanSource = decodeURIComponent(source.split(/[?#]/)[0]);
    const localPath = path.resolve(root, path.dirname(outputPath), cleanSource);
    if (!fs.existsSync(localPath)) throw new Error(`Legacy SEO image is missing for '${outputPath}': ${source}`);
    return new URL(source.replaceAll("\\", "/"), canonical).href;
  }
  throw new Error(`No product image was found for legacy SEO page '${outputPath}'.`);
}

function removeExistingSeo(html) {
  let normalized = html.replace(managedBlockPattern, "\n");
  normalized = normalized.replace(/\s*<title\b[^>]*>[\s\S]*?<\/title>/gi, "");
  normalized = normalized.replace(/\s*<meta\b[^>]*>/gi, (tag) => {
    const name = readAttribute(tag, "name")?.toLowerCase();
    const property = readAttribute(tag, "property")?.toLowerCase();
    return name === "description" || name === "robots" || name?.startsWith("twitter:") || property?.startsWith("og:") ? "" : tag;
  });
  normalized = normalized.replace(/\s*<link\b[^>]*>/gi, (tag) => {
    const rel = readAttribute(tag, "rel")?.toLowerCase().split(/\s+/) ?? [];
    return rel.includes("canonical") || rel.includes("alternate") ? "" : tag;
  });
  return normalized;
}

function indentBlock(block) {
  return block.split("\n").map((line) => `  ${line}`).join("\n");
}

let normalizedCount = 0;

for (const [routeId, definition] of Object.entries(SITE_ROUTES)) {
  if (definition.kind !== "product") continue;
  for (const [locale, target] of Object.entries(definition.locales)) {
    if (target.status !== "published") continue;
    const absolutePath = path.join(root, target.outputPath);
    const original = fs.readFileSync(absolutePath, "utf8");
    if (original.includes("GENERATED FILE")) continue;

    const titleMatch = original.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
    const title = decodeHtmlEntities(titleMatch?.[1] ?? "").replace(/\s+/g, " ").trim();
    const description = metaContent(original, "description");
    if (!title || !description) throw new Error(`Legacy page '${target.outputPath}' requires a title and description before SEO normalization.`);

    const canonical = new URL(target.outputPath.split(path.sep).join("/"), `${SITE_ORIGIN}/`).href;
    const image = contentImage(original, target.outputPath, canonical);
    const seo = createSeoMetadata(routeId, locale, { title, description, image });
    const cleaned = removeExistingSeo(original);
    const updated = cleaned.replace(/\s*<\/head>/i, `\n${indentBlock(renderSeoTags(seo))}\n</head>`);
    if (updated === original) continue;
    fs.writeFileSync(absolutePath, updated, "utf8");
    normalizedCount += 1;
  }
}

console.log(`Legacy SEO normalization passed: ${normalizedCount} hand-maintained product pages updated.`);
