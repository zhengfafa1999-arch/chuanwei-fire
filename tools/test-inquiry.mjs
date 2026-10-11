import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import { productEmailDraft, withInquiryDrafts, listingInquiryDrafts } from "../site-src/lib/inquiry.js";

const helper = fs.readFileSync(new URL("../assets/js/inquiry.js", import.meta.url), "utf8");
const canonical = "https://chuanweifire.com/products/消防喷头/standard-response-fire-sprinkler.html";
const productName = "Sprinkler & valve + 68°C";
for (const locale of ["en", "ar"]) {
  const href = productEmailDraft(productName, canonical, locale);
  const parameters = new URLSearchParams(href.split("?")[1]);
  assert(parameters.get("subject").includes(productName));
  assert(parameters.get("body").includes(`: ${canonical}`));
  assert(parameters.get("body").includes("\n"));
  assert(!href.includes("\n"));
  const source = { inquiry: { email: "mailto:zhengcolin1@gmail.com?subject=Old" }, facts: { pressure: 1.2 } };
  const enriched = withInquiryDrafts(source, productName, canonical, locale);
  assert.equal(source.inquiry.email, "mailto:zhengcolin1@gmail.com?subject=Old");
  assert.equal(enriched.inquiry.email, href);
  assert.equal(enriched.facts.pressure, 1.2);
  const listing = listingInquiryDrafts(productName, canonical, locale);
  const emailParameters = new URLSearchParams(listing.emailHref.split('?')[1]);
  const whatsappParameters = new URL(listing.whatsappHref).searchParams;
  assert.equal(emailParameters.get('body'), whatsappParameters.get('text'));
  assert(emailParameters.get('body').includes(productName));
  assert(emailParameters.get('body').includes(canonical));
  assert(emailParameters.get('body').includes(locale === 'ar' ? 'عند توفرها' : 'when available'));
}

function element(tag) {
  return { tagName: tag.toUpperCase(), children: [], attributes: {}, listeners: {}, style: {}, classList: { add() {} },
    append(...items) { this.children.push(...items); },
    setAttribute(key, value) { this.attributes[key] = value; },
    getAttribute(key) { return this.attributes[key]; },
    addEventListener(key, handler) { this.listeners[key] = handler; }
  };
}

for (const locale of ["en", "ar", "zh"]) {
  const form = element("form");
  form.values = { name: "Client & شركة + 客户", product: "sprinkler", destination: "", quantity: "500 + 25", details: "DN 15\n68°C & chrome + OEM" };
  const names = { en: "Fire Sprinklers", ar: "رشاشات الحريق", zh: "消防喷头" };
  const product = { tagName: "SELECT", selectedOptions: [{ textContent: names[locale] }] };
  const note = element("p");
  form.querySelector = selector => selector === "[data-inquiry-note]" ? note : product;
  const document = { documentElement: { dataset: {}, lang: locale }, body: { dataset: { siteLanguage: locale, siteRouteId: "home" } },
    querySelector: () => ({ href: canonical }), querySelectorAll: selector => selector === "[data-inquiry-form]" ? [form] : [], createElement: element };
  const location = { href: canonical, pathname: "/" };
  const opens = [];
  const FakeFormData = class { constructor(target) { this.values = target.values; } get(key) { return this.values[key]; } };
  vm.runInNewContext(helper, { document, location, window: { open(...args) { opens.push(args); } }, FormData: FakeFormData });
  const preview = form.children[0].children[1];
  assert(preview.readOnly);
  assert(preview.value.includes(names[locale]));
  assert(preview.value.includes(form.values.name));
  assert(preview.value.includes(form.values.details));
  const unchanged = JSON.stringify(form.values);
  let prevented = 0;
  form.listeners.submit({ preventDefault() { prevented++; }, submitter: { dataset: { inquiryChannel: "email" } } });
  assert.equal(opens.length, 0);
  const emailBody = new URLSearchParams(location.href.split("?")[1]).get("body");
  assert.equal(emailBody, preview.value);
  form.listeners.submit({ preventDefault() { prevented++; }, submitter: { dataset: { inquiryChannel: "whatsapp" } } });
  assert.equal(opens.length, 1);
  assert.equal(new URL(opens[0][0]).searchParams.get("text"), emailBody);
  assert.equal(JSON.stringify(form.values), unchanged);
  assert.equal(prevented, 2);
  form.values.details = "Updated #request?";
  form.listeners.input();
  assert(preview.value.includes("Updated #request?"));
  vm.runInNewContext(helper, { document, location, window: { open() { throw new Error("No duplicate binding"); } } });
  assert.equal(form.children.length, 1);
}

for (const locale of ["en", "ar"]) {
  const mail = element("a");
  mail.attributes.href = "mailto:zhengcolin1@gmail.com?subject=Old";
  mail.closest = () => true;
  const section = element("section");
  const cta = { parentElement: section };
  const document = { documentElement: { dataset: {}, lang: locale }, body: { dataset: { siteLanguage: locale, siteRouteId: "product:legacy" } },
    querySelector(selector) { return selector === 'link[rel="canonical"]' ? { href: canonical } : selector === "main h1, h1" ? { textContent: productName } : cta; },
    querySelectorAll: selector => selector === 'a[href^="mailto:"]' ? [mail] : [], createElement: element };
  vm.runInNewContext(helper, { document, location: { href: "file:///local.html", pathname: "/local.html" } });
  const parameters = new URLSearchParams(mail.href.split("?")[1]);
  assert(parameters.get("subject").includes(productName));
  assert(parameters.get("body").includes(canonical));
  assert.equal(section.children.length, 1);
}

console.log("Inquiry tests passed: EN/AR/ZH drafts preserve fields, reserved characters and newlines; email/WhatsApp retain identical bodies; product drafts use canonical URLs and manual-copy fallback. No messages sent.");
