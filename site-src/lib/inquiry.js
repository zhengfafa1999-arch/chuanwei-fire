// Build-time inquiry drafts. Opening a link never sends a message.
export function listingInquiryDrafts(name, url, locale = "en") {
  const arabic = locale === "ar";
  const subject = `${arabic ? "استفسار عن" : "Product inquiry:"} ${name}`;
  const body = [
    arabic ? "مرحباً، أود الاستفسار عن المنتجات التالية." : "Hello, I would like to inquire about these products.",
    "", `${arabic ? "الاسم / الشركة" : "Name / company"}:`,
    `${arabic ? "فئة المنتج" : "Product category"}: ${name}`,
    `${arabic ? "الصفحة" : "Page"}: ${url}`, "",
    arabic ? "الموديل / المقاس / التوصيل / الكمية / الوجهة (عند توفرها):" : "Model / size / connection / quantity / destination (when available):"
  ].join("\n");
  return {
    emailHref: `mailto:zhengcolin1@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    whatsappHref: `https://wa.me/8617326528368?text=${encodeURIComponent(body)}`
  };
}

export function productEmailDraft(name, url, locale = "en", address = "zhengcolin1@gmail.com") {
  const arabic = locale === "ar";
  const subject = `${arabic ? "استفسار عن" : "Product inquiry:"} ${name}`;
  const body = [arabic ? "مرحباً، أود الاستفسار عن المنتج التالي." : "Hello, I would like to inquire about this product.", "", `${arabic ? "المنتج" : "Product"}: ${name}`, `${arabic ? "صفحة المنتج" : "Product page"}: ${url}`, "", arabic ? "المقاس / الكمية / الوجهة / المتطلبات:" : "Size / quantity / destination / requirements:"].join("\n");
  return `mailto:${address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function withInquiryDrafts(value, name, url, locale) {
  if (typeof value === "string") {
    if (!value.startsWith("mailto:")) return value;
    return productEmailDraft(name, url, locale, value.slice(7).split("?")[0]);
  }
  if (Array.isArray(value)) return value.map(item => withInquiryDrafts(item, name, url, locale));
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, withInquiryDrafts(item, name, url, locale)]));
  return value;
}
