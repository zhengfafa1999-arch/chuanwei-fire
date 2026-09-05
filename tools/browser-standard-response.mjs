import fs from "node:fs";
import path from "node:path";
import { SITE_ROUTES } from "../site-src/_data/siteRoutes.js";

export async function validateStandardResponse({client, origin, viewports, evaluate, navigate, waitForLocation, inspectPage, assert, evidenceDirectory, routeId = "product:standard-response-fire-sprinkler", slug = "standard-response", imageCount = 4, neutralCaptions = {}}) {
  const routePath = (id, locale) => `/${SITE_ROUTES[id].locales[locale].outputPath}`;
  const results = [], screenshots = [];
  for (const viewport of viewports) {
    await client.send("Emulation.setDeviceMetricsOverride", viewport);
    for (const locale of ["en", "ar"]) {
      const productPath = routePath(routeId, locale), categoryPath = routePath("category:sprinklers", locale);
      const opposite = locale === "ar" ? "en" : "ar";
      for (const selector of [".product-card__image", ".product-card__link"]) {
        await navigate(client, `${origin}${encodeURI(categoryPath)}`, categoryPath);
        const clicked = await evaluate(client, `(() => {
          const link = [...document.querySelectorAll(${JSON.stringify(selector)})].find(a => decodeURIComponent(new URL(a.href).pathname).endsWith(${JSON.stringify(productPath)}));
          if (!link) return false; link.click(); return true;
        })()`);
        assert(clicked, `Missing standard-response ${locale} category ${selector}`);
        await waitForLocation(client, productPath);
        await evaluate(client, "history.back()");
        await waitForLocation(client, categoryPath);
      }
      await navigate(client, `${origin}${encodeURI(productPath)}`, productPath);
      for (const language of [opposite, locale]) {
        await evaluate(client, `document.querySelector('[data-site-language-choice="${language}"]').click()`);
        await waitForLocation(client, routePath(routeId, language));
        const state = await inspectPage(client);
        assert(state.lang === language && state.dir === (language === "ar" ? "rtl" : "ltr"), "Standard-response switch lost language/direction");
      }
      await client.send("Page.reload", {ignoreCache:true});
      await waitForLocation(client, productPath);
      assert((await inspectPage(client)).lang === locale, "Standard-response refresh lost locale");
      await evaluate(client, "document.querySelector('a[href=\"#gallery\"]').click()");
      const galleryChecks = await evaluate(client, `(() => {
        const thumbs = [...document.querySelectorAll('.pdp-gallery__thumb')], image = document.getElementById('galleryMain');
        const modal = document.getElementById('productModal');
        const initialHeight = image.getBoundingClientRect().height;
        const checks = [thumbs.length === ${imageCount}];
        const check = index => {
          const thumb = thumbs[index];
          checks.push(image.src === thumb.querySelector('img').src && image.alt === thumb.dataset.galleryAlt &&
            document.getElementById('galleryCaption').textContent === thumb.dataset.galleryTitle &&
            document.getElementById('galleryCount').textContent.replace(/[\u2066\u2069]/g,'') === (index+1)+' / ${imageCount}' &&
            thumbs.filter(t=>t.classList.contains('active')).length === 1 && thumb.classList.contains('active'));
          if (document.dir === 'rtl') checks.push(/[\u0600-\u06ff]/.test(image.alt),
            /[\u0600-\u06ff]/.test(thumb.dataset.galleryTitle) ||
            (Object.hasOwn(${JSON.stringify(neutralCaptions)}, index) && thumb.dataset.galleryTitle.replace(/[\u2066\u2069]/g,'') === ${JSON.stringify(neutralCaptions)}[index]));
        };
        thumbs.forEach((thumb,index)=>{
          thumb.click(); check(index); image.click();
          checks.push(modal.classList.contains('open') && modal.querySelector('img').src === image.src && modal.querySelector('img').alt === image.alt);
          document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape'}));
          checks.push(!modal.classList.contains('open'));
        });
        document.querySelector('.pdp-gallery__arrow--next').click(); check(0);
        document.querySelector('.pdp-gallery__arrow--prev').click(); check(${imageCount - 1});
        const touch = (name,x)=>{const event=new Event(name);Object.defineProperty(event,'changedTouches',{value:[{clientX:x}]});image.dispatchEvent(event)};
        touch('touchstart',200);touch('touchend',document.dir==='rtl'?300:100);check(0);
        touch('touchstart',200);touch('touchend',document.dir==='rtl'?100:300);check(${imageCount - 1});
        image.click();modal.querySelector('button').click();checks.push(!modal.classList.contains('open'));
        image.click();modal.click();checks.push(!modal.classList.contains('open'));
        document.querySelector('[data-lightbox]').click();
        checks.push(modal.querySelector('img').src===document.querySelector('[data-lightbox] img').src);
        modal.querySelector('button').click();
        checks.push(document.body.style.overflow==='');
        thumbs[0].click();checks.push(image.getBoundingClientRect().height === initialHeight);
        return checks;
      })()`);
      const expectedChecks = locale === 'ar' ? 5 * imageCount + 18 : 3 * imageCount + 10;
      assert(galleryChecks.length === expectedChecks && galleryChecks.every(Boolean), `${slug} gallery failed: ${JSON.stringify(galleryChecks)}`);
      for (const anchor of ["gallery", "models"]) {
        await evaluate(client, `document.querySelector('.pdp-section-navigation a[href="#${anchor}"]').click()`);
        // Observe completion, not an assumed animation duration, before screenshots.
        let settled = false;
        for (let attempt = 0; attempt < 80; attempt += 1) {
          settled = await evaluate(client, `(() => {
            const section = document.getElementById('${anchor}');
            return location.hash === '#${anchor}' && Math.abs(section.getBoundingClientRect().top - parseFloat(getComputedStyle(section).scrollMarginTop || '0')) < 2;
          })()`);
          if (settled) break;
          await new Promise(resolve => setTimeout(resolve, 50));
        }
        assert(settled, `${viewport.id}/${locale}: standard-response ${anchor} anchor did not settle`);
        const state = await inspectPage(client);
        assert(state.brokenImageCount === 0 && state.horizontalOverflow <= 1, "Standard-response layout/image failure");
        const shot = await client.send("Page.captureScreenshot", {format:"png",captureBeyondViewport:false});
        const name = `edge-${viewport.id}-${slug}-${locale}-${anchor}.png`;
        fs.writeFileSync(path.join(evidenceDirectory, name), Buffer.from(shot.data,"base64"));
        screenshots.push(name);
      }
      for (const [index, destination] of ["category:sprinklers", "products", "home"].entries()) {
        await evaluate(client, `document.querySelectorAll('[data-global-product-footer] a')[${index}].click()`);
        await waitForLocation(client, routePath(destination, locale));
        assert((await inspectPage(client)).lang === locale, "Standard-response footer lost locale");
        await evaluate(client, "history.back()");
        await waitForLocation(client, productPath);
      }
      results.push({scenario:`${viewport.id}/${locale}: ${slug} image/text category entries, reciprocal switch, refresh, ${imageCount}-image gallery, localized captions/zoom, arrows/wrap/swipe, three modal closes and footer returns`,status:"PASS"});
    }
  }
  return {results, screenshots};
}
