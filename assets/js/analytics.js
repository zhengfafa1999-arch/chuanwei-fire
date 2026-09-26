(function () {
  "use strict";

  const script = document.currentScript;
  const measurementId = script?.dataset.ga4Id ?? "";
  if (!/^G-[A-Z0-9]+$/.test(measurementId)) return;

  const routeId = script.dataset.routeId ?? "";
  const productFamily = script.dataset.productFamily ?? "";
  const locale = script.dataset.siteLocale ?? "en";
  const inquiryFamilies = {
    "Fire Sprinklers": "category:sprinklers",
    "Alarm & System Valves": "category:system-valves",
    "Fire Butterfly / Gate Valves": "category:fire-valves",
    "Fire Hose Reels": "category:hose-reels",
    "Hoses, Nozzles & Couplings": "category:hoses-nozzles-couplings",
    "Hydrants & Connections": "category:hydrants-connections",
    "Other": "category:other"
  };
  const storageKey = "chuanweifire.analytics-consent.v1";
  const safePageLocation = `${window.location.origin}${window.location.pathname}`;
  const messages = {
    en: {
      title: "Choose how we measure visits",
      body: "With your permission, Google Analytics measures visits and clicks on inquiry links. We do not send your inquiry form answers to Analytics.",
      accept: "Allow analytics",
      reject: "Decline analytics",
      settings: "Analytics settings"
    },
    zh: {
      title: "选择是否允许访客统计",
      body: "经你同意后，Google Analytics 会统计访问和询盘入口点击。询盘表单内容不会发送给 Analytics。",
      accept: "允许统计",
      reject: "拒绝统计",
      settings: "统计设置"
    },
    ar: {
      title: "اختر كيفية قياس زيارات الموقع",
      body: "بموافقتك، تقيس Google Analytics الزيارات والنقرات على روابط الاستفسار. لا نرسل إجابات نموذج الاستفسار إلى Analytics.",
      accept: "السماح بالتحليلات",
      reject: "رفض التحليلات",
      settings: "إعدادات التحليلات"
    }
  };
  const copy = messages[locale] ?? messages.en;
  let active = false;
  let tagLoaded = false;

  function readChoice() {
    try {
      return window.localStorage.getItem(storageKey) ?? window.sessionStorage.getItem(storageKey);
    } catch {
      try { return window.sessionStorage.getItem(storageKey); } catch { return null; }
    }
  }

  function saveChoice(choice) {
    try {
      window.localStorage.setItem(storageKey, choice);
    } catch {
      try { window.sessionStorage.setItem(storageKey, choice); } catch { /* The choice applies to this page only. */ }
    }
  }

  function removeAnalyticsCookies() {
    const names = document.cookie.split(";").map((part) => part.trim().split("=")[0]).filter((name) => /^_ga(?:_|$)/.test(name));
    const host = window.location.hostname;
    for (const name of names) {
      for (const domain of ["", host, `.${host}`]) {
        document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
      }
    }
  }

  function loadAnalytics() {
    if (tagLoaded) return;
    tagLoaded = true;
    active = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied"
    });
    window.gtag("consent", "update", { analytics_storage: "granted" });
    window.gtag("js", new Date());
    window.gtag("config", measurementId, {
      page_location: safePageLocation,
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });
    const tag = document.createElement("script");
    tag.async = true;
    tag.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    tag.dataset.ga4Tag = "";
    document.head.appendChild(tag);
  }

  function track(eventName, family = productFamily) {
    if (!active || typeof window.gtag !== "function") return;
    window.gtag("event", eventName, {
      site_route: routeId,
      product_family: family,
      site_language: locale,
      page_location: safePageLocation,
      transport_type: "beacon"
    });
  }

  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest("a[href]");
    if (!link) return;
    if (link.hasAttribute("data-catalog-request")) {
      track("catalog_request_click");
      return;
    }
    const href = link.getAttribute("href") ?? "";
    if (/^mailto:/i.test(href)) {
      track("email_click");
      return;
    }
    try {
      const url = new URL(href, window.location.href);
      if (["wa.me", "api.whatsapp.com", "web.whatsapp.com"].includes(url.hostname)) track("whatsapp_click");
    } catch { /* Invalid links are ignored by analytics. */ }
  }, true);

  document.addEventListener("submit", (event) => {
    if (event.target instanceof HTMLFormElement && (event.target.id === "homeInquiry" || event.target.matches("[data-inquiry-form]"))) {
      const selected = event.target.querySelector('select[name="product"]')?.selectedOptions[0];
      const homeFamily = selected?.dataset.homeFamilyOption;
      const family = homeFamily && /^[a-z-]+$/.test(homeFamily)
        ? `category:${homeFamily}`
        : (Object.hasOwn(inquiryFamilies, selected?.value) ? inquiryFamilies[selected.value] : productFamily);
      track("inquiry_form_to_whatsapp", family);
    }
  }, true);

  function button(text, className) {
    const item = document.createElement("button");
    item.type = "button";
    item.className = className;
    item.textContent = text;
    return item;
  }

  const settings = button(copy.settings, "analytics-settings");
  settings.setAttribute("aria-controls", "analytics-consent-panel");
  const panel = document.createElement("section");
  panel.id = "analytics-consent-panel";
  panel.className = "analytics-consent";
  panel.setAttribute("role", "region");
  panel.setAttribute("aria-label", copy.title);
  panel.dir = locale === "ar" ? "rtl" : "ltr";
  const heading = document.createElement("h2");
  heading.textContent = copy.title;
  const description = document.createElement("p");
  description.textContent = copy.body;
  const actions = document.createElement("div");
  actions.className = "analytics-consent__actions";
  const accept = button(copy.accept, "analytics-consent__accept");
  const reject = button(copy.reject, "analytics-consent__reject");
  actions.append(accept, reject);
  panel.append(heading, description, actions);
  document.body.append(settings, panel);

  function showPanel() {
    panel.hidden = false;
    settings.hidden = true;
    document.body.classList.add("analytics-consent-open");
  }

  function hidePanel() {
    panel.hidden = true;
    settings.hidden = false;
    document.body.classList.remove("analytics-consent-open");
  }

  accept.addEventListener("click", () => {
    saveChoice("accepted");
    hidePanel();
    loadAnalytics();
  });
  reject.addEventListener("click", () => {
    saveChoice("rejected");
    hidePanel();
    if (tagLoaded) {
      active = false;
      removeAnalyticsCookies();
      window.location.reload();
    }
  });
  settings.addEventListener("click", showPanel);

  const choice = readChoice();
  if (choice === "accepted") {
    hidePanel();
    loadAnalytics();
  } else if (choice === "rejected") {
    hidePanel();
  } else {
    showPanel();
  }
})();
