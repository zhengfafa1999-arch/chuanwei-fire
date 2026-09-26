import fs from "node:fs";
import path from "node:path";
import { SITE_ROUTES } from "../site-src/_data/siteRoutes.js";

const root = process.cwd();
const config = JSON.parse(fs.readFileSync(path.join(root, "site-src/_data/analyticsConfig.json"), "utf8"));
const measurementId = String(config.ga4MeasurementId ?? "").trim();
if (measurementId && !/^G-[A-Z0-9]+$/.test(measurementId)) {
  throw new Error("analyticsConfig.json must contain a GA4 web measurement ID beginning with G-.");
}

const managedHead = /\s*<!-- ANALYTICS:HEAD:BEGIN -->[\s\S]*?<!-- ANALYTICS:HEAD:END -->\s*/gi;
const managedBody = /\s*<!-- ANALYTICS:BODY:BEGIN -->[\s\S]*?<!-- ANALYTICS:BODY:END -->\s*/gi;
const escapeAttribute = (value) => String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");

let pageCount = 0;
for (const [routeId, route] of Object.entries(SITE_ROUTES)) {
  for (const [locale, target] of Object.entries(route.locales)) {
    if (target.status !== "published") continue;
    const absolutePath = path.join(root, target.outputPath);
    const prefix = path.dirname(target.outputPath).split(/[\\/]/).filter((part) => part !== ".").map(() => "../").join("");
    const family = route.kind === "category" ? routeId : route.category ?? "";
    const original = fs.readFileSync(absolutePath, "utf8");
    let updated = original.replace(managedHead, "").replace(managedBody, "");
    if (!/<\/head>/i.test(updated) || !/<\/body>/i.test(updated)) {
      throw new Error(`Published page is missing head or body closing tag: ${target.outputPath}`);
    }
    if (measurementId) {
      const head = `\n<!-- ANALYTICS:HEAD:BEGIN -->\n<link rel="stylesheet" href="${prefix}css/analytics-consent.css">\n<!-- ANALYTICS:HEAD:END -->\n`;
      const body = `\n<!-- ANALYTICS:BODY:BEGIN -->\n<script src="${prefix}assets/js/analytics.js" data-ga4-id="${escapeAttribute(measurementId)}" data-route-id="${escapeAttribute(routeId)}" data-product-family="${escapeAttribute(family)}" data-site-locale="${escapeAttribute(locale)}" defer></script>\n<!-- ANALYTICS:BODY:END -->\n`;
      updated = updated.replace(/<\/head>/i, `${head}</head>`).replace(/<\/body>/i, `${body}</body>`);
    }
    if (updated !== original) fs.writeFileSync(absolutePath, updated, "utf8");
    pageCount += 1;
  }
}

console.log(`Analytics normalization passed: ${pageCount} published pages; GA4 ${measurementId ? "configured" : "disabled and no consent UI emitted"}.`);
