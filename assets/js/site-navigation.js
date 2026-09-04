(function () {
  "use strict";

  const languageKey = "chuanwei-site-language";
  const currentLanguage = document.body.dataset.siteLanguage;
  const routeId = document.body.dataset.siteRouteId;
  const requestedLanguage = new URLSearchParams(window.location.search).get("lang");
  const requestedLanguageLink = requestedLanguage && document.querySelector(`[data-site-language-choice="${requestedLanguage}"]`);
  if (routeId === "home" && requestedLanguageLink && requestedLanguage !== currentLanguage) {
    localStorage.setItem(languageKey, requestedLanguage);
    localStorage.setItem("lang", requestedLanguage);
    window.location.replace(requestedLanguageLink.href);
    return;
  }

  document.querySelectorAll("[data-site-language-choice]").forEach((link) => {
    link.addEventListener("click", () => {
      localStorage.setItem(languageKey, link.dataset.siteLanguageChoice);
      localStorage.setItem("lang", link.dataset.siteLanguageChoice);
    });
  });

  if (!localStorage.getItem(languageKey) && currentLanguage) {
    localStorage.setItem(languageKey, currentLanguage);
    localStorage.setItem("lang", currentLanguage);
  }

  const toggle = document.querySelector("[data-nav-toggle]");
  const navigation = document.querySelector("[data-site-nav]");
  if (toggle && navigation) {
    const close = () => {
      navigation.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    };
    toggle.addEventListener("click", () => {
      const open = navigation.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    navigation.addEventListener("click", (event) => {
      if (event.target.closest("a")) close();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") close();
    });
  }

  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });
})();
