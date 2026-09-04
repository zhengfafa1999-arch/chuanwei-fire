(() => {
  "use strict";

  const languageKey = "chuanwei-site-language";
  const currentLanguage = document.body.dataset.siteLanguage;
  const alternateHref = document.body.dataset.languageAlternate;
  const preferredLanguage = localStorage.getItem(languageKey);

  document.querySelectorAll("[data-site-language-choice]").forEach((link) => {
    link.addEventListener("click", () => {
      localStorage.setItem(languageKey, link.dataset.siteLanguageChoice);
    });
  });

  if ((preferredLanguage === "en" || preferredLanguage === "ar") && preferredLanguage !== currentLanguage && alternateHref) {
    window.location.replace(alternateHref);
    return;
  }

  const modal = document.getElementById("productModal");
  if (modal) {
    const modalImage = modal.querySelector("img");
    const closeButton = modal.querySelector("button");
    const closeModal = () => {
      modal.classList.remove("open");
      document.body.style.overflow = "";
    };
    const openModal = (src, alt) => {
      modalImage.src = src;
      modalImage.alt = alt || "Product image";
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
      closeButton.focus();
    };

    document.addEventListener("click", (event) => {
      const target = event.target.closest("[data-lightbox]");
      if (target) openModal(target.dataset.lightbox, target.querySelector("img")?.alt);
    });
    closeButton.addEventListener("click", closeModal);
    modal.addEventListener("click", (event) => {
      if (event.target === modal) closeModal();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeModal();
    });
  }

  const gallery = document.querySelector("[data-gallery]");
  if (!gallery) return;

  const thumbs = [...gallery.querySelectorAll("[data-gallery-index]")];
  const main = gallery.querySelector(".wav-gallery__main");
  const image = main.querySelector("img");
  const title = gallery.querySelector("[data-gallery-title]");
  const count = gallery.querySelector("[data-gallery-count]");
  let index = 0;
  let touchStart = 0;

  const show = (next) => {
    index = (next + thumbs.length) % thumbs.length;
    const selected = thumbs[index];
    image.src = selected.dataset.src;
    image.alt = selected.dataset.alt;
    main.dataset.lightbox = selected.dataset.src;
    title.textContent = selected.dataset.title;
    count.textContent = `${index + 1} / ${thumbs.length}`;
    thumbs.forEach((thumb, thumbIndex) => thumb.classList.toggle("active", thumbIndex === index));
  };

  thumbs.forEach((thumb) => thumb.addEventListener("click", () => show(Number(thumb.dataset.galleryIndex))));
  gallery.querySelector(".wav-gallery__arrow--prev")?.addEventListener("click", () => show(index - 1));
  gallery.querySelector(".wav-gallery__arrow--next")?.addEventListener("click", () => show(index + 1));
  gallery.querySelector(".wav-gallery__stage")?.addEventListener("touchstart", (event) => {
    touchStart = event.changedTouches[0].clientX;
  }, { passive: true });
  gallery.querySelector(".wav-gallery__stage")?.addEventListener("touchend", (event) => {
    const delta = event.changedTouches[0].clientX - touchStart;
    if (Math.abs(delta) > 45) show(index + (delta < 0 ? 1 : -1));
  }, { passive: true });
})();
