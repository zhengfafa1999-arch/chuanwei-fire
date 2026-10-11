(function () {
  "use strict";
  const pageLanguage = document.body.dataset.siteLanguage;
  document.querySelectorAll("[data-catalog-request]").forEach((link) => {
    const message = pageLanguage === "ar" ? "مرحباً، أرجو إرسال أحدث كتالوج منتجات CHUANWEI FIRE. يرجى توضيح فئات المنتجات المتاحة والملفات الفنية المرتبطة بالموديلات المطلوبة." : "Hello, please send the current CHUANWEI FIRE product catalog. Please confirm the available product families and model-specific technical files.";
    link.href = `https://wa.me/8617326528368?text=${encodeURIComponent(message)}`;
  });
})();
