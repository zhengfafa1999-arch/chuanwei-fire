import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const pages = [
  {
    relativePath: "products/消防阀/wet-alarm-check-valve-assemblies.html",
    lang: "en",
    dir: "ltr",
    selfHref: "wet-alarm-check-valve-assemblies.html",
    selfCanonical: "https://chuanweifire.com/products/%E6%B6%88%E9%98%B2%E9%98%80/wet-alarm-check-valve-assemblies.html",
    alternate: "https://chuanweifire.com/ar/products/wet-alarm-check-valve/"
  },
  {
    relativePath: "ar/products/wet-alarm-check-valve/index.html",
    lang: "ar",
    dir: "rtl",
    selfHref: "index.html",
    selfCanonical: "https://chuanweifire.com/ar/products/wet-alarm-check-valve/",
    alternate: "https://chuanweifire.com/products/%E6%B6%88%E9%98%B2%E9%98%80/wet-alarm-check-valve-assemblies.html"
  }
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function validateLocalReferences(html, relativePath) {
  const directory = path.dirname(path.join(root, relativePath));
  const references = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map((match) => match[1]);
  for (const reference of references) {
    if (/^(?:https?:|mailto:|tel:|data:|javascript:|#)/i.test(reference)) continue;
    const cleanReference = decodeURIComponent(reference.split(/[?#]/)[0]);
    const target = path.resolve(directory, cleanReference || ".");
    assert(fs.existsSync(target), `${relativePath} contains a broken local reference: ${reference}`);
  }
}

for (const page of pages) {
  const absolutePath = path.join(root, page.relativePath);
  assert(fs.existsSync(absolutePath), `Generated page is missing: ${page.relativePath}`);
  const html = fs.readFileSync(absolutePath, "utf8");
  assert(html.includes("GENERATED FILE"), `${page.relativePath} is missing the generated-file marker.`);
  assert(html.includes(`<html lang="${page.lang}" dir="${page.dir}">`), `${page.relativePath} has incorrect language direction.`);
  assert(html.includes(`<link rel="canonical" href="${page.selfCanonical}">`), `${page.relativePath} has an incorrect canonical URL.`);
  assert(html.includes(`hreflang="${page.lang}" href="${page.selfCanonical}"`), `${page.relativePath} is missing its self hreflang.`);
  assert(html.includes(`href="${page.alternate}"`), `${page.relativePath} is missing the alternate-language URL.`);
  assert(html.includes(`href="${page.selfHref}" lang="${page.lang}"`), `${page.relativePath} has an incorrect current-language link.`);
  assert(html.includes("hreflang=\"x-default\""), `${page.relativePath} is missing x-default hreflang.`);
  assert(html.includes("1.6 MPa"), `${page.relativePath} is missing the confirmed pressure.`);
  assert(html.includes("ZSFZ250") && html.includes("ZSFZ200(G)"), `${page.relativePath} is missing conventional models.`);
  assert(!html.includes("ZSFZ150-2.5"), `${page.relativePath} contains the excluded high-pressure model.`);
  assert(!/[{][{%#]|[%#}][}]/.test(html), `${page.relativePath} contains an unrendered template marker.`);
  validateLocalReferences(html, page.relativePath);
}

const arabicCategory = fs.readFileSync(path.join(root, "ar/products.html"), "utf8");
assert(arabicCategory.includes('href="products/wet-alarm-check-valve/index.html"'), "Arabic product index does not link to the generated wet alarm valve page.");

const homePage = fs.readFileSync(path.join(root, "index.html"), "utf8");
assert(homePage.includes('href="ar/index.html"'), "Homepage Arabic switch must point to an explicit file for local preview.");

const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
for (const page of pages) assert(sitemap.includes(`<loc>${page.selfCanonical}</loc>`), `Sitemap is missing ${page.selfCanonical}.`);

console.log("Generated-page validation passed: English and Arabic product pages are linked and complete.");
