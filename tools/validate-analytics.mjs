import fs from "node:fs";
import path from "node:path";
import { SITE_ROUTES } from "../site-src/_data/siteRoutes.js";

const root = process.cwd();
const config = JSON.parse(fs.readFileSync(path.join(root, "site-src/_data/analyticsConfig.json"), "utf8"));
const expectedId = String(config.ga4MeasurementId ?? "").trim();
if (expectedId && !/^G-[A-Z0-9]+$/.test(expectedId)) throw new Error("Configured GA4 Measurement ID is invalid.");
let count = 0;
for (const [routeId, route] of Object.entries(SITE_ROUTES)) {
  for (const [locale, target] of Object.entries(route.locales)) {
    if (target.status !== "published") continue;
    const html = fs.readFileSync(path.join(root, target.outputPath), "utf8");
    const tags = [...html.matchAll(/<script\b[^>]*\bsrc="[^"]*assets\/js\/analytics\.js"[^>]*><\/script>/gi)];
    const css = [...html.matchAll(/<link\b[^>]*\bhref="[^"]*css\/analytics-consent\.css"[^>]*>/gi)];
    const headBlocks = (html.match(/<!-- ANALYTICS:HEAD:BEGIN -->/g) ?? []).length;
    const bodyBlocks = (html.match(/<!-- ANALYTICS:BODY:BEGIN -->/g) ?? []).length;
    if (!expectedId) {
      if (tags.length !== 0 || css.length !== 0 || headBlocks !== 0 || bodyBlocks !== 0) {
        throw new Error(`${target.outputPath} must not load analytics or show consent UI while GA4 is disabled.`);
      }
    } else {
      if (tags.length !== 1 || css.length !== 1) throw new Error(`${target.outputPath} needs exactly one analytics script and consent stylesheet.`);
      const tag = tags[0][0];
      const family = route.kind === "category" ? routeId : route.category ?? "";
      for (const [name, value] of Object.entries({ "data-ga4-id": expectedId, "data-route-id": routeId, "data-product-family": family, "data-site-locale": locale })) {
        if (!tag.includes(`${name}="${value}"`)) throw new Error(`${target.outputPath} has incorrect ${name}.`);
      }
      if (headBlocks !== 1 || bodyBlocks !== 1) throw new Error(`${target.outputPath} has duplicate analytics blocks.`);
    }
    count += 1;
  }
}
console.log(`Analytics validation passed: ${count} published pages ${expectedId ? "have one consistent tracking entry point" : "contain no GA4 loader or consent UI"}.`);
