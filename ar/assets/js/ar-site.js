(function () {
  "use strict";

  const dictionary = window.CHUANWEI_I18N && window.CHUANWEI_I18N.ar;
  if (dictionary) {
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const value = dictionary[element.dataset.i18n];
      if (value) element.textContent = value;
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      const value = dictionary[element.dataset.i18nPlaceholder];
      if (value) element.setAttribute("placeholder", value);
    });
  }

  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-site-nav]");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  document.querySelectorAll("[data-inquiry-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const message = [
        "مرحباً، أود مناقشة طلب لمعدات مكافحة الحريق.",
        "",
        `الاسم / الشركة: ${data.get("name")}`,
        `الوجهة: ${data.get("destination")}`,
        `المنتج: ${data.get("product")}`,
        `الكمية التقديرية: ${data.get("quantity") || "تُحدد لاحقاً"}`,
        `المتطلبات: ${data.get("details")}`
      ].join("\n");
      window.open(`https://wa.me/8617326528368?text=${encodeURIComponent(message)}`, "_blank", "noopener");
    });
  });

  document.querySelectorAll("[data-catalog-request]").forEach((link) => {
    const message = "مرحباً، أرجو إرسال أحدث كتالوج منتجات CHUANWEI FIRE. يرجى توضيح فئات المنتجات المتاحة والملفات الفنية المرتبطة بالموديلات المطلوبة.";
    link.setAttribute("href", `https://wa.me/8617326528368?text=${encodeURIComponent(message)}`);
  });
})();
