(function () {
  "use strict";
  const languageKey = "chuanwei-site-language";
  const pageLanguage = document.body.dataset.siteLanguage;
  const storedLanguage = localStorage.getItem(languageKey);
  const storedLanguageLink = storedLanguage && document.querySelector(`[data-site-language-choice="${storedLanguage}"]`);
  if (storedLanguageLink && storedLanguage !== pageLanguage) {
    location.replace(storedLanguageLink.href);
    return;
  }
  if (!storedLanguage) localStorage.setItem(languageKey, pageLanguage);
  document.querySelectorAll("[data-site-language-choice]").forEach((link) => link.addEventListener("click", () => localStorage.setItem(languageKey, link.dataset.siteLanguageChoice)));
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-site-nav]");
  if (toggle && nav) toggle.addEventListener("click", () => { const open = nav.classList.toggle("open"); toggle.setAttribute("aria-expanded", String(open)); });
  document.querySelectorAll("[data-current-year]").forEach((element) => { element.textContent = String(new Date().getFullYear()); });
  document.querySelectorAll("[data-catalog-request]").forEach((link) => {
    const message = pageLanguage === "ar" ? "مرحباً، أرجو إرسال أحدث كتالوج منتجات CHUANWEI FIRE. يرجى توضيح فئات المنتجات المتاحة والملفات الفنية المرتبطة بالموديلات المطلوبة." : "Hello, please send the current CHUANWEI FIRE product catalog. Please confirm the available product families and model-specific technical files.";
    link.href = `https://wa.me/8617326528368?text=${encodeURIComponent(message)}`;
  });
  document.querySelectorAll("[data-inquiry-form]").forEach((form) => form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const labels = pageLanguage === "ar" ? ["مرحباً، أود مناقشة طلب لمعدات مكافحة الحريق.", "الاسم / الشركة", "الوجهة", "المنتج", "الكمية التقديرية", "المتطلبات", "تُحدد لاحقاً"] : ["Hello, I would like to discuss a fire-protection product requirement.", "Name / company", "Destination", "Product", "Estimated quantity", "Requirements", "To be confirmed"];
    const message = [labels[0], "", `${labels[1]}: ${data.get("name")}`, `${labels[2]}: ${data.get("destination")}`, `${labels[3]}: ${data.get("product")}`, `${labels[4]}: ${data.get("quantity") || labels[6]}`, `${labels[5]}: ${data.get("details")}`].join("\n");
    window.open(`https://wa.me/8617326528368?text=${encodeURIComponent(message)}`, "_blank", "noopener");
  }));
})();
