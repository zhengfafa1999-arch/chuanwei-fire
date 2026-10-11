(function () {
  "use strict";
  if (document.documentElement.dataset.inquiryReady) return;
  document.documentElement.dataset.inquiryReady = "true";
  const language = document.body.dataset.siteLanguage || document.documentElement.lang;
  const strings = {
    en: { greeting: "Hello, I would like to discuss a fire-protection product requirement.", name: "Name / company", destination: "Destination", product: "Product", quantity: "Estimated quantity", details: "Requirements", optional: "To be confirmed", subject: "Product inquiry", page: "Product page", email: "Open email draft", note: "Review and send your message in WhatsApp or your email app. If an app does not open, copy the inquiry text below and email zhengcolin1@gmail.com.", copy: "Inquiry text to copy", draft: "Inquiry draft" },
    ar: { greeting: "مرحباً، أود مناقشة طلب لمعدات مكافحة الحريق.", name: "الاسم / الشركة", destination: "الوجهة", product: "المنتج", quantity: "الكمية التقديرية", details: "المتطلبات", optional: "تُحدد لاحقاً", subject: "استفسار عن المنتج", page: "صفحة المنتج", email: "فتح مسودة بريد إلكتروني", note: "راجع الرسالة وأرسلها في WhatsApp أو تطبيق البريد. إذا لم يفتح التطبيق، انسخ نص الاستفسار أدناه وأرسله إلى zhengcolin1@gmail.com.", copy: "نص الاستفسار للنسخ", draft: "مسودة الاستفسار" },
    zh: { greeting: "您好，我想咨询以下消防产品需求。", name: "姓名 / 公司", destination: "目的地", product: "产品", quantity: "预计数量", details: "需求", optional: "待确认", subject: "产品询价", page: "产品页面", email: "打开邮件草稿", note: "请在 WhatsApp 或邮件应用中检查并发送消息。如应用未打开，可复制下方询盘文本并发邮件至 zhengcolin1@gmail.com。", copy: "可复制的询盘文本", draft: "询盘草稿" }
  };
  const copy = strings[language] || strings.en;
  const pageUrl = document.querySelector('link[rel="canonical"]')?.href || location.href;
  function mailHref(subject, body, address = "zhengcolin1@gmail.com") {
    return `mailto:${address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
  function preview(parent, message) {
    const box = document.createElement("details");
    box.className = "inquiry-preview";
    const summary = document.createElement("summary");
    summary.textContent = copy.copy;
    const text = document.createElement("textarea");
    text.readOnly = true;
    text.rows = 8;
    text.dir = "auto";
    text.setAttribute("aria-label", copy.draft);
    text.style.cssText = "display:block;width:100%;max-width:100%;margin-top:10px;padding:12px;border:1px solid #dce4ea;border-radius:5px;font:inherit;line-height:1.5;resize:vertical;background:#fff;color:#142433";
    text.value = message;
    box.append(summary, text);
    parent.append(box);
    return text;
  }
  document.querySelectorAll("[data-inquiry-form]").forEach(form => {
    const note = form.querySelector("[data-inquiry-note]");
    if (note) note.textContent = copy.note;
    const draft = preview(form, "");
    function message() {
      const data = new FormData(form);
      const product = form.querySelector('[name="product"]');
      const selectedProduct = product?.tagName === "SELECT" ? product.selectedOptions[0]?.textContent : data.get("product");
      return [copy.greeting, "", `${copy.name}: ${data.get("name") || copy.optional}`, `${copy.product}: ${selectedProduct || copy.optional}`, `${copy.destination}: ${data.get("destination") || copy.optional}`, `${copy.quantity}: ${data.get("quantity") || copy.optional}`, `${copy.details}: ${data.get("details") || copy.optional}`, `${copy.page}: ${pageUrl}`].join("\n");
    }
    function update() { draft.value = message(); }
    form.addEventListener("input", update);
    form.addEventListener("change", update);
    update();
    form.addEventListener("submit", event => {
      event.preventDefault();
      update();
      const channel = event.submitter?.dataset.inquiryChannel || "whatsapp";
      if (channel === "email") {
        location.href = mailHref(`${copy.subject}: ${form.querySelector('[name="product"]')?.selectedOptions[0]?.textContent || "CHUANWEI FIRE"}`, draft.value);
      } else {
        window.open(`https://wa.me/8617326528368?text=${encodeURIComponent(draft.value)}`, "_blank", "noopener");
      }
    });
  });
  if (!document.body.dataset.siteRouteId?.startsWith("product:") && !/\/products\/.+\.html$/.test(location.pathname)) return;
  const name = document.querySelector("main h1, h1")?.textContent.trim() || "CHUANWEI FIRE";
  const body = [copy.greeting, "", `${copy.product}: ${name}`, `${copy.page}: ${pageUrl}`, "", `${copy.details}:`].join("\n");
  document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    const address = link.getAttribute("href").slice(7).split("?")[0];
    link.href = mailHref(`${copy.subject}: ${name}`, body, address);
    if (link.closest("main")) link.textContent = copy.email;
  });
  const cta = document.querySelector("#inquiry .pdp-container, #inquiry .container, #inquiry");
  if (cta) {
    const area = document.createElement("div");
    area.className = "inquiry-fallback";
    area.style.cssText = "width:min(1180px,calc(100% - 40px));margin:24px auto 0;font-size:13px";
    const note = document.createElement("p");
    note.textContent = copy.note;
    area.append(note);
    preview(area, body);
    cta.parentElement.append(area);
    area.classList.add("pdp-container");
  }
})();
