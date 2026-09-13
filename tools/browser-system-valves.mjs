import { SITE_ROUTES } from "../site-src/_data/siteRoutes.js";

// Navigation-only acceptance: never inspect or rewrite technical product facts.
export async function validateSystemValveNavigation({
  client, origin, viewports, evaluate, navigate, waitForLocation, inspectPage, assert,
  categoryId = "category:system-valves", expectedProducts = 4
}) {
  const products = Object.entries(SITE_ROUTES).filter(([, route]) => route.category === categoryId);
  assert(products.length === expectedProducts, `${categoryId}: unexpected product family count.`);
  const results = [];
  const routePath = (id, locale) => {
    const target = SITE_ROUTES[id].locales[locale];
    assert(target.status === "published", `${id}/${locale} must not fall back.`);
    return `/${target.outputPath}`;
  };
  const expectLocale = async (locale, routeId) => {
    const state = await evaluate(client, `({
      lang:document.documentElement.lang, dir:document.documentElement.dir,
      route:document.body.dataset.siteRouteId,
      active:document.querySelector('[data-site-language-choice][aria-current="true"]')?.dataset.siteLanguageChoice
    })`);
    assert(state.lang === locale && state.dir === (locale === "ar" ? "rtl" : "ltr") &&
      state.route === routeId && state.active === locale,
      `Wrong language or route: ${JSON.stringify(state)}, expected ${routeId}/${locale}`);
  };
  const clickDestination = async (targetPath, targetSearch = null) => {
    const clicked = await evaluate(client, `(() => {
      const link = [...document.querySelectorAll('a[href]')].find(link =>
        decodeURIComponent(new URL(link.href).pathname).endsWith(${JSON.stringify(targetPath)}) &&
        (${JSON.stringify(targetSearch)} === null || new URL(link.href).search === ${JSON.stringify(targetSearch)}));
      if (!link) return false;
      link.click(); return true;
    })()`);
    assert(clicked, `Missing entry to ${targetPath}${targetSearch || ''}`);
    await waitForLocation(client, targetPath, targetSearch);
  };

  for (const viewport of viewports) {
    await client.send("Emulation.setDeviceMetricsOverride", viewport);
    for (const locale of ["en", "ar"]) {
      const categoryPath = routePath(categoryId, locale);
      const homePath = routePath("home", locale);
      const directoryPath = routePath("products", locale);
      const familySlug = categoryId.replace(/^category:/, "");
      const filteredDirectorySearch = `?q=&category=${familySlug}`;
      const opposite = locale === "en" ? "ar" : "en";
      await navigate(client, `${origin}${homePath}`, homePath);
      await clickDestination(directoryPath, filteredDirectorySearch);
      await expectLocale(locale, "products");
      const selectedFamily = await evaluate(client, "document.querySelector('#product-family')?.value");
      assert(selectedFamily === familySlug, `${categoryId}: home entry did not retain its product filter.`);
      await navigate(client, `${origin}${encodeURI(categoryPath)}`, categoryPath);
      await expectLocale(locale, categoryId);
      await evaluate(client, "document.querySelector('.catalog-footer a').click()");
      await waitForLocation(client, directoryPath);
      await expectLocale(locale, "products");
      await navigate(client, `${origin}${encodeURI(categoryPath)}`, categoryPath);
      await expectLocale(locale, categoryId);
      await evaluate(client, `document.querySelector('[data-site-language-choice="${opposite}"]').click()`);
      await waitForLocation(client, routePath(categoryId, opposite));
      await expectLocale(opposite, categoryId);
      await evaluate(client, `document.querySelector('[data-site-language-choice="${locale}"]').click()`);
      await waitForLocation(client, categoryPath);
      await client.send("Page.reload", {ignoreCache:true});
      await waitForLocation(client, categoryPath);
      await expectLocale(locale, categoryId);
      const category = await inspectPage(client);
      assert(category.brokenImageCount === 0 && category.horizontalOverflow <= 1, `${categoryId} has a broken image or page overflow.`);
      results.push({scenario:`${viewport.id}/${locale}: home and directory entries, category reciprocal switch and refresh`, status:"PASS"});

      for (const [routeId] of products) {
        const productPath = routePath(routeId, locale);
        for (const selector of [".product-card__image", ".product-card__link"]) {
          await navigate(client, `${origin}${encodeURI(categoryPath)}`, categoryPath);
          const clicked = await evaluate(client, `(() => {
            const link = [...document.querySelectorAll('${selector}')].find(link =>
              decodeURIComponent(new URL(link.href).pathname).endsWith(${JSON.stringify(productPath)}));
            if (!link) return false;
            link.click(); return true;
          })()`);
          assert(clicked, `${categoryId}: missing ${selector} entry to ${productPath}`);
          await waitForLocation(client, productPath);
          await expectLocale(locale, routeId);
          await evaluate(client, "history.back()");
          await waitForLocation(client, categoryPath);
          await expectLocale(locale, categoryId);
        }
        await clickDestination(productPath);
        await evaluate(client, `document.querySelector('[data-site-language-choice="${opposite}"]').click()`);
        await waitForLocation(client, routePath(routeId, opposite));
        await expectLocale(opposite, routeId);
        await evaluate(client, `document.querySelector('[data-site-language-choice="${locale}"]').click()`);
        await waitForLocation(client, productPath);
        await client.send("Page.reload", {ignoreCache:true});
        await waitForLocation(client, productPath);
        await expectLocale(locale, routeId);
        for (const [linkIndex, [destinationId, destination]] of [
          [categoryId, categoryPath], ["products", directoryPath], ["home", homePath]
        ].entries()) {
          await evaluate(client, `document.querySelectorAll('[data-global-product-footer] a')[${linkIndex}].click()`);
          await waitForLocation(client, destination);
          await expectLocale(locale, destinationId);
          await evaluate(client, "history.back()");
          await waitForLocation(client, productPath);
          await expectLocale(locale, routeId);
        }
        results.push({
          scenario:`${viewport.id}/${locale}: ${routeId} image/text entries, back, reciprocal switch, refresh and three footer returns`,
          status:"PASS", viewport:viewport.id, locale, routeId
        });
      }
    }
  }
  return results;
}
