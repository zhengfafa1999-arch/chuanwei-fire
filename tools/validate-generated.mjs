import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const pages = [
  {
    product: "wet-alarm-check-valve",
    relativePath: "products/消防阀/wet-alarm-check-valve-assemblies.html",
    lang: "en",
    dir: "ltr",
    selfHref: "wet-alarm-check-valve-assemblies.html",
    selfCanonical: "https://chuanweifire.com/products/%E6%B6%88%E9%98%B2%E9%98%80/wet-alarm-check-valve-assemblies.html",
    alternate: "https://chuanweifire.com/ar/products/wet-alarm-check-valve/",
    xDefault: "https://chuanweifire.com/products/%E6%B6%88%E9%98%B2%E9%98%80/wet-alarm-check-valve-assemblies.html",
    required: ["1.6 MPa", "ZSFZ250", "ZSFZ200(G)"],
    forbidden: ["ZSFZ150-2.5"]
  },
  {
    product: "wet-alarm-check-valve",
    relativePath: "ar/products/wet-alarm-check-valve/index.html",
    lang: "ar",
    dir: "rtl",
    selfHref: "index.html",
    selfCanonical: "https://chuanweifire.com/ar/products/wet-alarm-check-valve/",
    alternate: "https://chuanweifire.com/products/%E6%B6%88%E9%98%B2%E9%98%80/wet-alarm-check-valve-assemblies.html",
    xDefault: "https://chuanweifire.com/products/%E6%B6%88%E9%98%B2%E9%98%80/wet-alarm-check-valve-assemblies.html",
    required: ["1.6 MPa", "ZSFZ250", "ZSFZ200(G)"],
    forbidden: ["ZSFZ150-2.5"]
  },
  {
    product: "water-curtain-nozzles",
    relativePath: "products/消防喷头/water-curtain-nozzles.html",
    lang: "en",
    dir: "ltr",
    selfHref: "water-curtain-nozzles.html",
    selfCanonical: "https://chuanweifire.com/products/%E6%B6%88%E9%98%B2%E5%96%B7%E5%A4%B4/water-curtain-nozzles.html",
    alternate: "https://chuanweifire.com/ar/products/water-curtain-nozzles/",
    xDefault: "https://chuanweifire.com/products/%E6%B6%88%E9%98%B2%E5%96%B7%E5%A4%B4/water-curtain-nozzles.html",
    required: ["Water Curtain Nozzles", "Available on request", "ZSTMA", "ZSTMB", "DN15", "DN25"],
    forbidden: ["1.2 MPa", "1.6 MPa"]
  },
  {
    product: "water-curtain-nozzles",
    relativePath: "ar/products/water-curtain-nozzles/index.html",
    lang: "ar",
    dir: "rtl",
    selfHref: "index.html",
    selfCanonical: "https://chuanweifire.com/ar/products/water-curtain-nozzles/",
    alternate: "https://chuanweifire.com/products/%E6%B6%88%E9%98%B2%E5%96%B7%E5%A4%B4/water-curtain-nozzles.html",
    xDefault: "https://chuanweifire.com/products/%E6%B6%88%E9%98%B2%E5%96%B7%E5%A4%B4/water-curtain-nozzles.html",
    required: ["فوهات ستارة مائية", "متاح عند الطلب", "ZSTMA", "ZSTMB", "DN15", "DN25"],
    forbidden: ["1.2 MPa", "1.6 MPa"]
  },
  {
    product: "water-mist-nozzles",
    relativePath: "products/消防喷头/water-mist-nozzles.html",
    lang: "en",
    dir: "ltr",
    selfHref: "water-mist-nozzles.html",
    selfCanonical: "https://chuanweifire.com/products/%E6%B6%88%E9%98%B2%E5%96%B7%E5%A4%B4/water-mist-nozzles.html",
    alternate: "https://chuanweifire.com/ar/products/water-mist-nozzles/",
    xDefault: "https://chuanweifire.com/products/%E6%B6%88%E9%98%B2%E5%96%B7%E5%A4%B4/water-mist-nozzles.html",
    required: ["Water Mist Nozzles", "1.2 MPa", "ZSTWB", "ZSTWC", "DN15", "DN25", "impingement-water-mist-nozzle-open-type.jpg"],
    forbidden: ["impingement-water-mist-glass-bulb.jpg"]
  },
  {
    product: "water-mist-nozzles",
    relativePath: "ar/products/water-mist-nozzles/index.html",
    lang: "ar",
    dir: "rtl",
    selfHref: "index.html",
    selfCanonical: "https://chuanweifire.com/ar/products/water-mist-nozzles/",
    alternate: "https://chuanweifire.com/products/%E6%B6%88%E9%98%B2%E5%96%B7%E5%A4%B4/water-mist-nozzles.html",
    xDefault: "https://chuanweifire.com/products/%E6%B6%88%E9%98%B2%E5%96%B7%E5%A4%B4/water-mist-nozzles.html",
    required: ["فوهات ضباب الماء", "1.2 MPa", "ZSTWB", "ZSTWC", "DN15", "DN25", "impingement-water-mist-nozzle-open-type.jpg"],
    forbidden: ["impingement-water-mist-glass-bulb.jpg"]
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
  assert(html.includes(`data-site-language="${page.lang}"`), `${page.relativePath} is missing its persistent language marker.`);
  assert(html.includes('data-site-language-choice="en"'), `${page.relativePath} is missing the English language preference control.`);
  assert(html.includes('data-site-language-choice="ar"'), `${page.relativePath} is missing the Arabic language preference control.`);
  assert(html.includes(`<link rel="canonical" href="${page.selfCanonical}">`), `${page.relativePath} has an incorrect canonical URL.`);
  assert(html.includes(`hreflang="${page.lang}" href="${page.selfCanonical}"`), `${page.relativePath} is missing its self hreflang.`);
  assert(html.includes(`href="${page.alternate}"`), `${page.relativePath} is missing the alternate-language URL.`);
  assert(html.includes(`hreflang="x-default" href="${page.xDefault}"`), `${page.relativePath} has an incorrect x-default URL.`);
  assert(html.includes(`href="${page.selfHref}" lang="${page.lang}"`), `${page.relativePath} has an incorrect current-language link.`);
  for (const text of page.required) assert(html.includes(text), `${page.relativePath} is missing required content: ${text}`);
  for (const text of page.forbidden) assert(!html.includes(text), `${page.relativePath} contains forbidden content: ${text}`);
  assert(!/[{][{%#]|[%#}][}]/.test(html), `${page.relativePath} contains an unrendered template marker.`);
  validateLocalReferences(html, page.relativePath);
}

const arabicCategory = fs.readFileSync(path.join(root, "ar/products.html"), "utf8");
assert(arabicCategory.includes('href="products/wet-alarm-check-valve/index.html"'), "Arabic product index does not link to the generated wet alarm valve page.");
assert(arabicCategory.includes('href="products/water-curtain-nozzles/index.html"'), "Arabic product index does not link to the generated water curtain nozzle page.");
assert(arabicCategory.includes('href="products/water-mist-nozzles/index.html"'), "Arabic product index does not link to the generated water mist nozzle page.");

const homePage = fs.readFileSync(path.join(root, "index.html"), "utf8");
assert(homePage.includes('href="ar/index.html"'), "Homepage Arabic switch must point to an explicit file for local preview.");
assert(homePage.includes('data-site-language-choice="ar"'), "Homepage Arabic switch must persist the Arabic preference.");
assert(homePage.includes("GENERATED FILE"), "English homepage must be generated from the shared homepage template.");
assert(homePage.includes('data-home-language="en"'), "English homepage is missing its generated language marker.");

const arabicHomePage = fs.readFileSync(path.join(root, "ar/index.html"), "utf8");
assert(arabicHomePage.includes("GENERATED FILE"), "Arabic homepage must be generated from the shared homepage template.");
assert(arabicHomePage.includes('data-home-language="ar"'), "Arabic homepage is missing its generated language marker.");
assert(arabicHomePage.includes('<base href="../">'), "Arabic homepage must resolve shared root assets in local preview.");
assert(arabicHomePage.includes('href="ar/products.html#system-valves"'), "Arabic homepage must route alarm-valve visitors to the Arabic product catalog.");
assert(arabicHomePage.includes("تصنيع معدات مكافحة الحريق"), "Arabic homepage is missing its localized content data.");

const detailScript = fs.readFileSync(path.join(root, "assets/js/product-detail.js"), "utf8");
assert(detailScript.includes('chuanwei-site-language'), "Product detail script must read the shared language preference.");
assert(detailScript.includes('window.location.replace(alternateHref)'), "Product detail script must route to the preferred localized page.");

const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
for (const page of pages) assert(sitemap.includes(`<loc>${page.selfCanonical}</loc>`), `Sitemap is missing ${page.selfCanonical}.`);

console.log("Generated-page validation passed: six English and Arabic product outputs are linked and complete.");
