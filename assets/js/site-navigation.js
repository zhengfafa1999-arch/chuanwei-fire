(function () {
  "use strict";

  // Keep the hint outside the scrolling area so it stays visible at either edge.
  const tableWraps = [...document.querySelectorAll('.pdp-table-wrap, .av-table-wrap')];
  if (tableWraps.length) {
    const mobileTables = window.matchMedia('(max-width: 780px)');
    const arabic = document.documentElement.lang.startsWith('ar');
    const hints = tableWraps.map(wrap => {
      const hint = document.createElement('p');
      hint.className = 'table-scroll-hint';
      hint.textContent = arabic
        ? '↔ اسحب الجدول أفقياً لعرض جميع المواصفات'
        : '↔ Swipe the table sideways to see all specifications';
      hint.hidden = true;
      wrap.before(hint);
      return { wrap, hint };
    });
    const updateTableHints = () => {
      hints.forEach(({ wrap, hint }) => {
        hint.hidden = !(mobileTables.matches && wrap.clientWidth > 0 &&
          wrap.scrollWidth > wrap.clientWidth + 1);
      });
    };
    if ('ResizeObserver' in window) {
      const observer = new ResizeObserver(updateTableHints);
      hints.forEach(({ wrap }) => {
        observer.observe(wrap);
        const table = wrap.querySelector('table');
        if (table) observer.observe(table);
      });
    }
    window.addEventListener('resize', updateTableHints);
    window.addEventListener('load', updateTableHints);
    updateTableHints();
  }

  // A catalog card can open the selected configuration directly within its detail page.
  window.addEventListener('load', () => {
    // Reapply new configuration anchors after image loading finishes so gallery
    // layout changes above the target cannot displace the requested section.
    const configurationTarget = document.getElementById(location.hash.slice(1));
    if (configurationTarget?.matches('[data-product-supplement], [data-supply-configuration], [data-product-photo]')) {
      configurationTarget.scrollIntoView({ block: 'start', behavior: 'instant' });
      return;
    }
    const originalView = new URLSearchParams(location.search).get('view');
    const aliases = JSON.parse(document.querySelector('[data-product-photo-bindings]')?.textContent || '{}');
    const selected = aliases[originalView] || originalView;
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
    const groups = [...productMenu.querySelectorAll('.global-product-group')];
    // Native details preserve keyboard support; this also handles browsers
    // without exclusive details-group support.
    groups.forEach(group => group.addEventListener('toggle', () => {
      if (group.open) groups.forEach(other => { if (other !== group) other.open = false; });
    }));
    productMenu.addEventListener('toggle', () => {
      if (!productMenu.open) groups.forEach(group => { group.open = false; });
    });
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
      if (event.key === "Escape" && navigation.classList.contains("open")) {
        close();
        toggle.focus();
      }
    });
  }

  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });
})();
