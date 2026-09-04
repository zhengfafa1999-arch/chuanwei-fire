import fs from "node:fs";
import path from "node:path";
import { SUPPORTED_LOCALES, createListingPageRoute } from "../site-src/_data/siteRoutes.js";

const root = process.cwd();
const pageRequirements = {
  about: { en: ["A manufacturing source", "2017", "5,000 m²", "CNC"], ar: ["جهة تصنيع", "2017", "5,000 m²", "CNC"] },
  downloads: { en: ["GUANYA FIRE-PROTECTION EQUIPMENT CO., LTD.", "43225Q0932R1S", "43225E0623R0S", "43225S0547R0S"], ar: ["GUANYA FIRE-PROTECTION EQUIPMENT CO., LTD.", "43225Q0932R1S", "43225E0623R0S", "43225S0547R0S"] },
  contact: { en: ["+86 173 2652 8368", "zhengcolin1@gmail.com", "Nan&#39;an, Quanzhou, Fujian, China"], ar: ["+86 173 2652 8368", "zhengcolin1@gmail.com", "نانآن، تشيوانتشو، فوجيان، الصين"] }
};

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function readOutput(outputPath) {
  const absolutePath = path.join(root, outputPath);
  assert(fs.existsSync(absolutePath), `Generated public page is missing: ${outputPath}`);
  return fs.readFileSync(absolutePath, "utf8");
}

function validateLocalReferences(html, outputPath) {
  const directory = path.dirname(path.join(root, outputPath));
  for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    const reference = match[1];
    if (/^(?:https?:|mailto:|tel:|data:|javascript:|#)/i.test(reference)) continue;
    const target = path.resolve(directory, decodeURIComponent(reference.split(/[?#]/)[0]) || ".");
    assert(fs.existsSync(target), `${outputPath} contains a broken local reference: ${reference}`);
  }
}

for (const routeId of Object.keys(pageRequirements)) {
  for (const locale of SUPPORTED_LOCALES) {
    const route = createListingPageRoute(routeId, locale);
    const html = readOutput(route.outputPath);
    const direction = locale === "ar" ? "rtl" : "ltr";
    assert(html.includes("GENERATED FILE"), `${route.outputPath} is not generated from the shared public-page template.`);
    assert(html.includes(`<html lang="${locale}" dir="${direction}">`), `${route.outputPath} has incorrect language direction.`);
    assert(html.includes(`<link rel="canonical" href="${route.canonical}">`), `${route.outputPath} has an incorrect canonical URL.`);
    assert(html.includes(`hreflang="${locale}" href="${route.canonical}"`), `${route.outputPath} is missing its self hreflang.`);
    assert(html.includes(`href="${route.alternate}"`), `${route.outputPath} is missing its alternate-language canonical.`);
    const englishCanonical = createListingPageRoute(routeId, "en").canonical;
    assert(html.includes(`hreflang="x-default" href="${englishCanonical}"`), `${route.outputPath} has an incorrect x-default URL.`);
    assert(html.includes(`href="${route.languageLinks.en}" lang="en"`), `${route.outputPath} has an incorrect English language switch.`);
    assert(html.includes(`href="${route.languageLinks.ar}" lang="ar"`), `${route.outputPath} has an incorrect Arabic language switch.`);
    for (const required of pageRequirements[routeId][locale]) assert(html.includes(required), `${route.outputPath} is missing confirmed content: ${required}`);
    assert(!html.includes("product approval granted"), `${route.outputPath} contains an unsupported product-approval claim.`);
    assert(!/[{][{%#]|[%#}][}]/.test(html), `${route.outputPath} contains an unrendered template marker.`);
    validateLocalReferences(html, route.outputPath);
  }
}

const downloads = readOutput("downloads.html");
for (const certificate of ["iso-9001.png", "iso-14001.png", "iso-45001.png"]) assert(downloads.includes(certificate), `English downloads page is missing ${certificate}.`);
const sitemap = readOutput("sitemap.xml");
for (const routeId of Object.keys(pageRequirements)) for (const locale of SUPPORTED_LOCALES) {
  const canonical = createListingPageRoute(routeId, locale).canonical;
  assert(sitemap.includes(`<loc>${canonical}</loc>`), `Sitemap is missing ${canonical}.`);
}

console.log("Public-page validation passed: six English/Arabic outputs share one template with confirmed facts, SEO alternates and valid local files.");
