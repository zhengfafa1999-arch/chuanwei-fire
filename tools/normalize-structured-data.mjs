import fs from "node:fs";
import path from "node:path";
import { Parser } from "htmlparser2";
import { SITE_ROUTES, resolveSiteRoute } from "../site-src/_data/siteRoutes.js";
import { breadcrumbRouteIds, createStructuredData, renderStructuredData } from "../site-src/lib/structured-data.js";

const root = process.cwd();
const managedBlock = /<!-- STRUCTURED-DATA:BEGIN -->[\s\S]*?<!-- STRUCTURED-DATA:END -->\r?\n?/g;
const navigationLabels = {
  en: { home: "Home", products: "Products" },
  ar: { home: "الرئيسية", products: "المنتجات" },
  zh: { home: "首页", products: "产品" }
};

function pageMetadata(html, outputPath, canonical) {
  const headings = [];
  const descriptions = [];
  const images = [];
  const canonicals = [];
  let inHead = false;
  let heading = null;
  let headCount = 0;
  const parser = new Parser({
    onopentag(tag, attributes) {
      if (tag === "head") { inHead = true; headCount += 1; }
      if (tag === "h1") { heading = []; headings.push(heading); }
      if (heading && tag === "br") heading.push(" ");
      if (tag === "script" && attributes.type?.toLowerCase() === "application/ld+json") {
        throw new Error(`${outputPath} contains unmanaged JSON-LD; reconcile it before normalizing.`);
      }
      if (!inHead) return;
      if (tag === "meta" && attributes.name?.toLowerCase() === "description") descriptions.push(attributes.content);
      if (tag === "meta" && attributes.property?.toLowerCase() === "og:image") images.push(attributes.content);
      if (tag === "link" && attributes.rel?.toLowerCase().split(/\s+/).includes("canonical")) canonicals.push(attributes.href);
    },
    ontext(text) { if (heading) heading.push(text); },
    onclosetag(tag) {
      if (tag === "h1") heading = null;
      if (tag === "head") inHead = false;
    }
  }, { decodeEntities: true });
  parser.end(html);
  if (headCount !== 1 || headings.length !== 1 || descriptions.length !== 1 || images.length !== 1 || canonicals.length !== 1) {
    throw new Error(`${outputPath} requires one head, H1, meta description, og:image and canonical before structured data generation.`);
  }
  if (canonicals[0] !== canonical) throw new Error(`${outputPath} canonical differs from the route registry.`);
  return { name: headings[0].join("").replace(/\s+/g, " ").trim(), description: descriptions[0], image: images[0] };
}

const pages = new Map();
for (const [routeId, definition] of Object.entries(SITE_ROUTES)) {
  for (const [locale, target] of Object.entries(definition.locales)) {
    if (target.status !== "published") continue;
    const file = path.join(root, target.outputPath);
    const original = fs.readFileSync(file, "utf8");
    const blockCount = [...original.matchAll(managedBlock)].length;
    const beginCount = original.split("<!-- STRUCTURED-DATA:BEGIN -->").length - 1;
    const endCount = original.split("<!-- STRUCTURED-DATA:END -->").length - 1;
    if (blockCount > 1 || beginCount !== blockCount || endCount !== blockCount) {
      throw new Error(`${target.outputPath} contains duplicate or incomplete structured data markers.`);
    }
    const cleaned = original.replace(managedBlock, "");
    const canonical = resolveSiteRoute(routeId, locale, target.outputPath).canonical;
    pages.set(`${routeId}/${locale}`, { routeId, locale, file, original, cleaned, canonical, ...pageMetadata(cleaned, target.outputPath, canonical) });
  }
}

// Validate every page and its parents before writing any output.
const updates = [];
for (const page of pages.values()) {
  const breadcrumbs = breadcrumbRouteIds(page.routeId).map(routeId => {
    const parent = pages.get(`${routeId}/${page.locale}`);
    if (!parent) throw new Error(`Missing published breadcrumb parent '${routeId}/${page.locale}'.`);
    const name = routeId === page.routeId ? page.name : navigationLabels[page.locale][routeId] ?? parent.name;
    return { name, url: parent.canonical };
  });
  const structuredData = createStructuredData({ ...page, breadcrumbs });
  const updated = page.cleaned.replace(/<\/head>/i, `${renderStructuredData(structuredData)}\n</head>`);
  if (updated !== page.original) updates.push({ file: page.file, html: updated });
}
for (const update of updates) fs.writeFileSync(update.file, update.html, "utf8");
console.log(`Structured data normalization passed: ${pages.size} published pages, ${updates.length} updated.`);
