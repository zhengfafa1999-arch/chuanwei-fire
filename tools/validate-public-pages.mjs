import fs from "node:fs";
import path from "node:path";
import crypto from 'node:crypto';
import homePages from '../site-src/_data/homePages.js';
import publicPages from '../site-src/_data/publicPages.js';
import { SUPPORTED_LOCALES, createListingPageRoute } from "../site-src/_data/siteRoutes.js";

const root = process.cwd();
const pageRequirements = {
  about: { en: ["A manufacturing source", "2017", "5,000 m²", "CNC", "Product documents and certificates"], ar: ["جهة تصنيع", "2017", "5,000 m²", "CNC", "وثائق المنتجات والشهادات"] },
  downloads: { en: ["Management systems", "ISO 9001:2015", "ISO 14001:2015", "ISO 45001:2018", "43225Q0932R1S", "43225E0623R0S", "43225S0547R0S"], ar: ["أنظمة الإدارة", "ISO 9001:2015", "ISO 14001:2015", "ISO 45001:2018", "43225Q0932R1S", "43225E0623R0S", "43225S0547R0S"] },
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
    if (routeId === "about" || routeId === "contact") {
      const policies = locale === "ar" ? ["العينات مدفوعة", "الحد الأدنى لكمية الطلب بحسب المنتج"] : ["Samples are supplied for a fee", "Minimum order quantity varies by product"];
      for (const policy of policies) assert(html.includes(policy), `${route.outputPath} is missing confirmed purchasing policy: ${policy}`);
    }
    if (routeId === "about") {
      assert(!html.includes("export brand of the GUANYA") && !html.includes("العلامة التجارية للتصدير الخاصة بمصنع GUANYA"), `${route.outputPath} still displays the brand relationship removed at the user's request.`);
    }
    if (routeId === "downloads") {
      assert(!html.includes("GUANYA FIRE-PROTECTION EQUIPMENT CO., LTD."), `${route.outputPath} still highlights the certificate holder removed at the user's request.`);
      for (const certificate of ["iso-9001.png", "iso-14001.png", "iso-45001.png"]) assert(html.includes(certificate), `${route.outputPath} is missing ${certificate}.`);
    }
    assert(!html.includes("product approval granted"), `${route.outputPath} contains an unsupported product-approval claim.`);
    assert(!/[{][{%#]|[%#}][}]/.test(html), `${route.outputPath} contains an unrendered template marker.`);
    validateLocalReferences(html, route.outputPath);
  }
}

const downloads = readOutput("downloads.html");
const projectEvidence = JSON.parse(fs.readFileSync('docs/release/project-cards-20261010/image-evidence.json', 'utf8'));
for (const photo of projectEvidence.files) {
  for (const file of [photo.source, photo.image]) assert(crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex') === photo.sha256, `Project reference original was altered: ${file}`);
}
for (const page of homePages) {
  const html = readOutput(page.outputPath);
  const section = html.match(/<section[^>]*id="projects"[^>]*>([\s\S]*?)<\/section>/)?.[1];
  assert(section, `${page.outputPath} is missing project references.`);
  assert((section.match(/data-project-reference=/g) ?? []).length === 4, `${page.outputPath} needs exactly four project reference cards.`);
  for (const project of page.projects.items) {
    assert(section.includes(`data-project-reference="${project.id}"`), `${page.outputPath} is missing ${project.id}.`);
    for (const text of [project.name, project.type, project.description, project.image]) assert(section.includes(text), `${page.outputPath} has an incorrect project mapping: ${text}`);
    const card = section.match(new RegExp(`<article[^>]*data-project-reference="${project.id}"[^>]*>([\\s\\S]*?)<\\/article>`))?.[1];
    assert(card, `${page.outputPath} is missing the project card ${project.id}.`);
    assert((card.match(/data-project-product=/g) ?? []).length === project.related.length + project.optional.length, `${page.outputPath}/${project.id} has missing or duplicate product links.`);
    for (const product of [...project.related, ...project.optional]) {
      const escapedName = product.name.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
      assert(card.includes(`href="${product.href}" data-project-product="${product.id}">${escapedName}</a>`), `${page.outputPath}/${project.id} has an incorrect product link: ${product.id}`);
      if (page.languageCode === 'ar') assert(product.href.startsWith('products/'), `${page.outputPath} lost the Arabic product route.`);
    }
  }
  for (const text of [page.projects.relatedLabel, page.projects.optionalLabel, page.projects.note]) assert(section.includes(text), `${page.outputPath} is missing the application-reference distinction: ${text}`);
  assert(section.includes('href="#contact"'), `${page.outputPath} is missing the project inquiry anchor.`);
  const projectText = section.replace(/<[^>]+>/g, ' ');
  assert(!/supplied|installed|completed in|direct client|exclusive|\bUL\b|\bFM\b|\bCE\b/i.test(projectText), `${page.outputPath} has an unsupported project supply or approval claim.`);
  validateLocalReferences(section, page.outputPath);
}
for (const certificate of ["iso-9001.png", "iso-14001.png", "iso-45001.png"]) assert(downloads.includes(certificate), `English downloads page is missing ${certificate}.`);
const qualificationEvidence = JSON.parse(fs.readFileSync('docs/release/qualification-atlas-20261010/image-evidence.json', 'utf8'));
for (const file of [{ path: qualificationEvidence.source, sha256: qualificationEvidence.sourceSha256 }, ...qualificationEvidence.files]) {
  assert(crypto.createHash('sha256').update(fs.readFileSync(file.path)).digest('hex') === file.sha256, `Qualification source or scan changed without review: ${file.path}`);
}
for (const page of [...homePages, ...publicPages.filter(page => page.patents)]) {
  const outputPath = page.outputPath ?? page.route.outputPath;
  const html = readOutput(outputPath);
  const section = html.match(/<section[^>]*id="patents"[^>]*>([\s\S]*?)<\/section>/)?.[1];
  assert(section, `${outputPath} is missing its patent document section.`);
  assert((section.match(/class="qualification-card"/g) ?? []).length === page.patents.items.length, `${outputPath} has missing or duplicate patent cards.`);
  for (const document of page.patents.items) {
    for (const value of [document.patentNumber, document.grantDate, document.href, document.image]) assert(section.includes(value), `${outputPath} has incorrect patent mapping: ${value}`);
  }
  if (page.patents.allHref) assert(section.includes(page.patents.allHref), `${outputPath} has no link to all patent documents.`);
  assert(!/UL|\bFM\b|\bCE\b|high-tech enterprise|GUANYA|冠亚|حامل الشهاد|current legal status|valid patent/i.test(section), `${outputPath} contains an unsupported or unwanted qualification claim.`);
  validateLocalReferences(section, outputPath);
}
const sitemap = readOutput("sitemap.xml");
for (const routeId of Object.keys(pageRequirements)) for (const locale of SUPPORTED_LOCALES) {
  const canonical = createListingPageRoute(routeId, locale).canonical;
  assert(sitemap.includes(`<loc>${canonical}</loc>`), `Sitemap is missing ${canonical}.`);
}

console.log("Public-page validation passed: six English/Arabic outputs share one template with confirmed facts, SEO alternates and valid local files.");
