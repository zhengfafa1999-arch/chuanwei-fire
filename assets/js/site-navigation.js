(function () {
  "use strict";

  // A catalog card can open the selected configuration directly within its detail page.
  window.addEventListener('load', () => {
    const selected = new URLSearchParams(location.search).get('view');
    if (!selected) return;
    const buttons = [...document.querySelectorAll('button')];
    const button = buttons.find(button => {
      if (!button.matches('[data-gallery-index], [data-index], .pdp-gallery__thumb') && !button.closest('[class*="thumbs"]')) return false;
      const img = button.querySelector('img');
      return img && decodeURIComponent(new URL(img.src).pathname).endsWith('/' + selected);
    });
    if (button) { button.click(); document.querySelector('#gallery')?.scrollIntoView(); }
  });

  const productMenu = document.querySelector('.global-product-menu');
  if (productMenu) {
    const compactMenu = window.matchMedia('(max-width:980px)');
    const setGroups = () => productMenu.querySelectorAll('.global-product-group').forEach(group => { group.open = !compactMenu.matches; });
    setGroups();
    compactMenu.addEventListener('change', setGroups);
    document.addEventListener('click', event => {
      if (!productMenu.contains(event.target)) productMenu.open = false;
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && productMenu.open) {
        productMenu.open = false;
        productMenu.querySelector('summary').focus();
      }
    });
  }

  document.querySelectorAll('.pdp-section-navigation a[href^="#"], .configuration-links a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = document.getElementById(link.hash.slice(1));
      if (!target) return;
      event.preventDefault();
      history.pushState(null, '', link.hash);
      const margin = Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
      window.scrollTo({ top: window.scrollY + target.getBoundingClientRect().top - margin, behavior: 'instant' });
    });
  });

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
      if (productMenu) productMenu.open = false;
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
