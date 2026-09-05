import fs from "node:fs";
import path from "node:path";
import { SITE_ROUTES } from "../site-src/_data/siteRoutes.js";

export async function validateStandardResponse({client, origin, viewports, evaluate, navigate, waitForLocation, inspectPage, assert, evidenceDirectory, routeId = "product:standard-response-fire-sprinkler", slug = "standard-response", imageCount = 4, neutralCaptions = {}, modelTableRows}) {
  const routePath = (id, locale) => `/${SITE_ROUTES[id].locales[locale].outputPath}`;
  const results = [], screenshots = [];
  for (const viewport of viewports) {
    await client.send("Emulation.setDeviceMetricsOverride", viewport);
    for (const locale of ["en", "ar"]) {
      const productPath = routePath(routeId, locale), categoryPath = routePath(SITE_ROUTES[routeId].category, locale);
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
      if (imageCount > 0) {
        await evaluate(client, "document.querySelector('a[href=\"#gallery\"]').click()");
        const galleryChecks = await evaluate(client, `(() => {
        const wav = document.querySelector('[data-gallery]');
        const thumbs = [...document.querySelectorAll(wav ? '[data-gallery-index]' : '.pdp-gallery__thumb')];
        const image = wav ? wav.querySelector('.wav-gallery__main img') : document.getElementById('galleryMain');
        const caption = wav ? wav.querySelector('[data-gallery-title]') : document.getElementById('galleryCaption');
        const count = wav ? wav.querySelector('[data-gallery-count]') : document.getElementById('galleryCount');
        const alt = thumb => wav ? thumb.dataset.alt : thumb.dataset.galleryAlt;
        const title = thumb => wav ? thumb.dataset.title : thumb.dataset.galleryTitle;
        const next = document.querySelector(wav ? '.wav-gallery__arrow--next' : '.pdp-gallery__arrow--next');
        const prev = document.querySelector(wav ? '.wav-gallery__arrow--prev' : '.pdp-gallery__arrow--prev');
        const touchTarget = wav ? wav.querySelector('.wav-gallery__stage') : image;
        const modal = document.getElementById('productModal');
        const initialHeight = image.getBoundingClientRect().height;
        const checks = [thumbs.length === ${imageCount} && getComputedStyle(count).direction === 'ltr'];
        const check = index => {
          const thumb = thumbs[index];
          checks.push(image.src === thumb.querySelector('img').src && image.alt === alt(thumb) &&
            caption.textContent === title(thumb) &&
            count.textContent.replace(/[\u2066\u2069]/g,'') === (index+1)+' / ${imageCount}' &&
            thumbs.filter(t=>t.classList.contains('active')).length === 1 && thumb.classList.contains('active'));
          if (document.dir === 'rtl') checks.push(/[\u0600-\u06ff]/.test(image.alt),
            /[\u0600-\u06ff]/.test(title(thumb)) ||
            (Object.hasOwn(${JSON.stringify(neutralCaptions)}, index) && title(thumb).replace(/[\u2066\u2069]/g,'') === ${JSON.stringify(neutralCaptions)}[index]));
        };
        thumbs.forEach((thumb,index)=>{
          thumb.click(); check(index); image.click();
          checks.push(modal.classList.contains('open') && modal.querySelector('img').src === image.src && modal.querySelector('img').alt === image.alt);
          document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape'}));
          checks.push(!modal.classList.contains('open'));
        });
        next.click(); check(0);
        prev.click(); check(${imageCount - 1});
        const touch = (name,x)=>{const event=new Event(name);Object.defineProperty(event,'changedTouches',{value:[{clientX:x}]});touchTarget.dispatchEvent(event)};
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
        // Image switching can still be decoding when a file-preview scroll starts.
        // Observe asset readiness before asserting the final anchored position.
        await evaluate(client, "Promise.all([...document.images].map(image => image.decode()))");
      } else {
        const heroChecks = await evaluate(client, `(() => {
          const hero = document.querySelector('.pdp-hero__image');
          const modal = document.getElementById('productModal');
          const checks = [Boolean(hero && modal && hero.querySelector('img').complete)];
          const open = () => { hero.click(); checks.push(modal.classList.contains('open') && modal.querySelector('img').src === hero.querySelector('img').src && modal.querySelector('img').alt === hero.querySelector('img').alt); };
          open(); document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape'})); checks.push(!modal.classList.contains('open'));
          open(); modal.querySelector('button').click(); checks.push(!modal.classList.contains('open'));
          open(); modal.click(); checks.push(!modal.classList.contains('open') && document.body.style.overflow === '');
          return checks;
        })()`);
        assert(heroChecks.length === 7 && heroChecks.every(Boolean), `${slug} hero zoom failed: ${JSON.stringify(heroChecks)}`);
        const shot = await client.send("Page.captureScreenshot", {format:"png",captureBeyondViewport:false});
        const name = `edge-${viewport.id}-${slug}-${locale}-hero.png`;
        fs.writeFileSync(path.join(evidenceDirectory, name), Buffer.from(shot.data,"base64"));
        screenshots.push(name);
      }
      for (const anchor of imageCount > 0 ? ["gallery", "models"] : ["models"]) {
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
        if (!settled) {
          const diagnostic = await evaluate(client, `({hash:location.hash, scrollY, sectionTop:document.getElementById('${anchor}').getBoundingClientRect().top, margin:getComputedStyle(document.getElementById('${anchor}')).scrollMarginTop, header:document.querySelector('.global-header').getBoundingClientRect().bottom, images:[...document.images].filter(i=>!i.complete).map(i=>i.src)})`);
          assert(false, `${viewport.id}/${locale}: ${slug} ${anchor} anchor did not settle: ${JSON.stringify(diagnostic)}`);
        }
        const state = await inspectPage(client);
        assert(state.brokenImageCount === 0 && state.horizontalOverflow <= 1, "Standard-response layout/image failure");
        const shot = await client.send("Page.captureScreenshot", {format:"png",captureBeyondViewport:false});
        const name = `edge-${viewport.id}-${slug}-${locale}-${anchor}.png`;
        fs.writeFileSync(path.join(evidenceDirectory, name), Buffer.from(shot.data,"base64"));
        screenshots.push(name);
      }
      if (modelTableRows) {
        const counts = await evaluate(client, `[...document.querySelectorAll('#models tbody')].map(body => body.rows.length)`);
        assert(JSON.stringify(counts) === JSON.stringify(modelTableRows), `${slug}: model table rows changed`);
        for (let tableIndex = 1; tableIndex < modelTableRows.length; tableIndex += 1) {
          await evaluate(client, `(() => {
            const table = document.querySelectorAll('#models .series-block')[${tableIndex}];
            const header = document.querySelector('.global-header').getBoundingClientRect().height;
            window.scrollTo({top: window.scrollY + table.getBoundingClientRect().top - header - 20, behavior:'instant'});
          })()`);
          const visible = await evaluate(client, `(() => { const rect = document.querySelectorAll('#models .series-block')[${tableIndex}].getBoundingClientRect();return rect.top >= document.querySelector('.global-header').getBoundingClientRect().bottom && rect.top < innerHeight; })()`);
          assert(visible, `${slug}: additional model table hidden by header`);
          const state = await inspectPage(client);
          assert(state.brokenImageCount === 0 && state.horizontalOverflow <= 1, `${slug}: additional model table layout failure`);
          const shot = await client.send('Page.captureScreenshot', {format:'png',captureBeyondViewport:false});
          const name = `edge-${viewport.id}-${slug}-${locale}-models-${tableIndex + 1}.png`;
          fs.writeFileSync(path.join(evidenceDirectory, name), Buffer.from(shot.data,'base64'));
          screenshots.push(name);
        }
      }
      for (const [index, destination] of [SITE_ROUTES[routeId].category, "products", "home"].entries()) {
        await evaluate(client, `document.querySelectorAll('[data-global-product-footer] a')[${index}].click()`);
        await waitForLocation(client, routePath(destination, locale));
        assert((await inspectPage(client)).lang === locale, "Standard-response footer lost locale");
        await evaluate(client, "history.back()");
        await waitForLocation(client, productPath);
      }
      results.push({scenario:`${viewport.id}/${locale}: ${slug} image/text category entries, reciprocal switch, refresh, ${imageCount ? `${imageCount}-image gallery, localized captions/zoom, arrows/wrap/swipe` : 'single hero image zoom'}, three modal closes and footer returns`,status:"PASS"});
    }
  }
  return {results, screenshots};
}
