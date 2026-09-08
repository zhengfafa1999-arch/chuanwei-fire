import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { spawn } from "node:child_process";
import { SITE_ROUTES } from "../site-src/_data/siteRoutes.js";
import { validateSystemValveNavigation } from "./browser-system-valves.mjs";
import { validateStandardResponse } from "./browser-standard-response.mjs";

const root = process.cwd();
const productArgument = process.argv.find(argument => argument.startsWith('--product='));
const productsArgument = process.argv.find(argument => argument.startsWith('--products='));
const focusedSlugs = productArgument
  ? [productArgument.slice('--product='.length)]
  : productsArgument?.slice('--products='.length).split(',').filter(Boolean) ?? [];
for (const slug of focusedSlugs) assert(/^[a-z0-9-]+$/.test(slug), 'Provide valid product slugs with --product=<slug> or --products=<slug,slug>.');
assert(!(productArgument && productsArgument), 'Use either --product or --products, not both.');
const categoryArgument = process.argv.find(argument => argument.startsWith('--category='));
const focusedCategorySlug = categoryArgument?.slice('--category='.length);
const focusedCategoryId = focusedCategorySlug ? `category:${focusedCategorySlug}` : undefined;
if (categoryArgument) assert(/^[a-z0-9-]+$/.test(focusedCategorySlug), 'Provide a valid category slug with --category=<slug>.');
assert(!(focusedSlugs.length && focusedCategorySlug), 'Use either --product/--products or --category, not both.');
const evidenceArgument = process.argv.find(argument => argument.startsWith('--evidence-dir='));
const evidencePath = evidenceArgument?.slice('--evidence-dir='.length) || process.env.SITE_BROWSER_EVIDENCE_DIR;
const evidenceDirectory = evidencePath
  ? path.resolve(root, evidencePath)
  : focusedSlugs.length || focusedCategorySlug
    ? path.join(root, "docs", "evidence", "focused", focusedSlugs.length === 1 ? focusedSlugs[0] : `batch-${focusedSlugs.length}-products`, process.argv.includes('--file-preview') ? 'file' : 'http')
    : path.join(root, "docs", "evidence", "responsive-rtl", "2026-09-05");
const edgeCandidates = [
  process.env.EDGE_PATH,
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe"
].filter(Boolean);
const edgePath = edgeCandidates.find((candidate) => fs.existsSync(candidate));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function contentType(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  return ({ ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".json": "application/json; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp" })[extension] || "application/octet-stream";
}

function createStaticServer() {
  return http.createServer((request, response) => {
    const requestPath = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    const relativePath = requestPath === "/" ? "index.html" : requestPath.replace(/^\/+/, "");
    const candidate = path.resolve(root, relativePath);
    if (!candidate.startsWith(`${root}${path.sep}`) || !fs.existsSync(candidate) || !fs.statSync(candidate).isFile()) {
      response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }
    response.writeHead(200, { "content-type": contentType(candidate), "cache-control": "no-store" });
    fs.createReadStream(candidate).pipe(response);
  });
}

async function reservePort() {
  const server = http.createServer();
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address();
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  return port;
}

async function waitForDebugTarget(port) {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/list`);
      if (response.ok) {
        const targets = await response.json();
        const page = targets.find((target) => target.type === "page");
        if (page?.webSocketDebuggerUrl) return page;
      }
    } catch (error) {
      if (attempt === 49) throw error;
    }
    await delay(100);
  }
  throw new Error("Microsoft Edge did not expose a page debugging target.");
}

class DevToolsClient {
  constructor(webSocketUrl) {
    this.socket = new WebSocket(webSocketUrl);
    this.nextId = 1;
    this.pending = new Map();
  }

  async connect() {
    await new Promise((resolve, reject) => {
      this.socket.addEventListener("open", resolve, { once: true });
      this.socket.addEventListener("error", reject, { once: true });
    });
    this.socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (!message.id) return;
      const request = this.pending.get(message.id);
      if (!request) return;
      this.pending.delete(message.id);
      if (message.error) request.reject(new Error(message.error.message));
      else request.resolve(message.result);
    });
  }

  send(method, params = {}) {
    const id = this.nextId;
    this.nextId += 1;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.socket.send(JSON.stringify({ id, method, params }));
    });
  }

  close() {
    this.socket.close();
  }
}

async function evaluate(client, expression) {
  const result = await client.send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text || "Browser evaluation failed.");
  return result.result.value;
}

function normalizedPathname(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function pathnameMatches(actual, expected) {
  const actualPath = normalizedPathname(actual);
  const expectedPath = normalizedPathname(expected);
  const localRoot = normalizedPathname(pathToFileURL(root).pathname);
  return actualPath === expectedPath || actualPath === `${localRoot}${expectedPath}`;
}

async function navigate(client, url, expectedPath) {
  await client.send("Page.navigate", { url });
  for (let attempt = 0; attempt < 100; attempt += 1) {
    const state = await evaluate(client, "({readyState:document.readyState,path:location.pathname,search:location.search})");
    if (state.readyState === "complete" && (!expectedPath || pathnameMatches(state.path, expectedPath))) return state;
    await delay(50);
  }
  throw new Error(`Timed out waiting for browser navigation to ${expectedPath || url}.`);
}

async function waitForLocation(client, expectedPath, expectedSearch = null) {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    const state = await evaluate(client, "({readyState:document.readyState,path:location.pathname,search:location.search})");
    if (state.readyState === "complete" && pathnameMatches(state.path, expectedPath) && (expectedSearch === null || state.search === expectedSearch)) return state;
    await delay(50);
  }
  throw new Error(`Timed out waiting for browser location ${expectedPath}${expectedSearch || ""}.`);
}

async function inspectPage(client) {
  return evaluate(client, `(() => {
    const root = document.documentElement;
    const viewportWidth = root.clientWidth;
    const header = document.querySelector('[data-global-header]');
    const headerBounds = header?.getBoundingClientRect();
    const socialFloat = document.querySelector('.social-float');
    const isVisible = (element) => {
      const style = getComputedStyle(element);
      return style.display !== 'none' && style.visibility !== 'hidden';
    };
    const isInsideHorizontalScroller = (element) => {
      for (let parent = element.parentElement; parent && parent !== document.body; parent = parent.parentElement) {
        const style = getComputedStyle(parent);
        if (/(auto|scroll)/.test(style.overflowX) && parent.scrollWidth > parent.clientWidth + 1) return true;
      }
      return false;
    };
    return {
      url: location.href,
      lang: root.lang,
      dir: root.dir,
      computedDirection: getComputedStyle(root).direction,
      title: document.title,
      heading: document.querySelector('h1')?.textContent.trim() || document.querySelector('h2')?.textContent.trim() || '',
      canonical: document.querySelector('link[rel="canonical"]')?.href || '',
      hreflangs: Object.fromEntries([...document.querySelectorAll('link[rel="alternate"][hreflang]')].map((link) => [link.hreflang, link.href])),
      viewportMeta: document.querySelector('meta[name="viewport"]')?.content || '',
      horizontalOverflow: Math.max(0, root.scrollWidth - viewportWidth),
      hasTemplateMarker: ['{{', '{%', '{#'].some((marker) => root.outerHTML.includes(marker)),
      globalHeaderCount: document.querySelectorAll('[data-global-header]').length,
      primaryNavigationCount: document.querySelectorAll('[data-site-nav-item]').length,
      activePrimaryCount: document.querySelectorAll('[data-site-nav-item][aria-current="page"]').length,
      activeLanguageCount: document.querySelectorAll('[data-site-language-choice][aria-current="true"]').length,
      headerWithinViewport: Boolean(headerBounds && headerBounds.left >= -1 && headerBounds.right <= viewportWidth + 1),
      brokenImageCount: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).length,
      brokenImages: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).map(image => image.src),
      overflowingControls: [...document.querySelectorAll('input,select,textarea,button')].filter((element) => {
        if (!isVisible(element) || element.closest('[role="dialog"]:not(.open)') || isInsideHorizontalScroller(element)) return false;
        const bounds = element.getBoundingClientRect();
        return bounds.left < -1 || bounds.right > viewportWidth + 1;
      }).map((element) => {
        const bounds = element.getBoundingClientRect();
        return { tag: element.tagName, className: element.className, label: element.getAttribute('aria-label') || element.textContent.trim().slice(0, 80), left: bounds.left, right: bounds.right, width: bounds.width };
      }),
      socialFloatPosition: socialFloat ? getComputedStyle(socialFloat).position : null,
      menuDisplay: getComputedStyle(document.querySelector('[data-nav-toggle]')).display,
      navigationDisplay: getComputedStyle(document.querySelector('[data-site-nav]')).display
    };
  })()`);
}

const pages = [
  { id: "quick-response-en", path: "/products/消防喷头/glass-bulb-fire-sprinkler.html", lang: "en", dir: "ltr", marker: "Glass Bulb" },
  { id: "quick-response-ar", path: "/ar/products/glass-bulb-fire-sprinkler/index.html", lang: "ar", dir: "rtl", marker: "زجاجي" },
  { id: "standard-response-en", path: "/products/消防喷头/standard-response-fire-sprinkler.html", lang: "en", dir: "ltr", marker: "Standard Response" },
  { id: "standard-response-ar", path: "/ar/products/standard-response-fire-sprinkler/index.html", lang: "ar", dir: "rtl", marker: "الاستجابة القياسية" },
  { id: "home-en", path: "/index.html?lang=en", lang: "en", dir: "ltr", marker: "Fire Protection Equipment" },
  { id: "home-zh", path: "/zh/index.html", lang: "zh-CN", preference: "zh", dir: "ltr", marker: "消防设备制造" },
  { id: "home-ar", path: "/ar/index.html?lang=ar", lang: "ar", dir: "rtl", marker: "تصنيع معدات مكافحة الحريق" },
  { id: "catalog-en", path: "/products.html", lang: "en", dir: "ltr", marker: "Product" },
  { id: "catalog-ar", path: "/ar/products.html", lang: "ar", dir: "rtl", marker: "منتجات" },
  { id: "about-en", path: "/about.html", lang: "en", dir: "ltr", marker: "manufacturing source" },
  { id: "about-ar", path: "/ar/about.html", lang: "ar", dir: "rtl", marker: "جهة تصنيع" },
  { id: "downloads-en", path: "/downloads.html", lang: "en", dir: "ltr", marker: "Available catalog" },
  { id: "downloads-ar", path: "/ar/downloads.html", lang: "ar", dir: "rtl", marker: "الكتالوج والوثائق" },
  { id: "contact-en", path: "/contact.html", lang: "en", dir: "ltr", marker: "product or project requirement" },
  { id: "contact-ar", path: "/ar/contact.html", lang: "ar", dir: "rtl", marker: "متطلبات المنتج" },
  { id: "category-en", path: "/products/消防阀.html", lang: "en", dir: "ltr", marker: "Valve" },
  { id: "category-ar", path: "/ar/products/system-valves/index.html", lang: "ar", dir: "rtl", marker: "صمامات" },
  { id: "wet-valve-en", path: "/products/消防阀/wet-alarm-check-valve-assemblies.html?lang=en", lang: "en", dir: "ltr", marker: "Wet" },
  { id: "wet-valve-ar", path: "/ar/products/wet-alarm-check-valve/index.html?lang=ar", lang: "ar", dir: "rtl", marker: "الرطب" },
  { id: "water-curtain-en", path: "/products/消防喷头/water-curtain-nozzles.html?lang=en", lang: "en", dir: "ltr", marker: "Water Curtain" },
  { id: "water-curtain-ar", path: "/ar/products/water-curtain-nozzles/index.html?lang=ar", lang: "ar", dir: "rtl", marker: "ستارة" },
  { id: "water-mist-en", path: "/products/消防喷头/water-mist-nozzles.html?lang=en", lang: "en", dir: "ltr", marker: "Water Mist" },
  { id: "water-mist-ar", path: "/ar/products/water-mist-nozzles/index.html?lang=ar", lang: "ar", dir: "rtl", marker: "ضباب" },
  { id: "deluge-en", path: "/products/消防阀/diaphragm-deluge-valves.html", lang: "en", dir: "ltr", marker: "Deluge" },
  { id: "deluge-ar", path: "/ar/products/diaphragm-deluge-valves/index.html", lang: "ar", dir: "rtl", marker: "الغمر" },
  { id: "preaction-en", path: "/products/消防阀/preaction-valve-assemblies.html", lang: "en", dir: "ltr", marker: "Preaction" },
  { id: "preaction-ar", path: "/ar/products/preaction-valve-assemblies/index.html", lang: "ar", dir: "rtl", marker: "الإجراء المسبق" },
  { id: "dry-pipe-en", path: "/products/消防阀/dry-pipe-alarm-valves.html", lang: "en", dir: "ltr", marker: "Dry Pipe" },
  { id: "dry-pipe-ar", path: "/ar/products/dry-pipe-alarm-valves/index.html", lang: "ar", dir: "rtl", marker: "الأنابيب الجافة" }
];

const viewports = [
  { id: "desktop", width: 1440, height: 900, deviceScaleFactor: 1, mobile: false },
  { id: "mobile", width: 390, height: 844, deviceScaleFactor: 1, mobile: true }
];

const responsiveViewports = [
  { id: "desktop", width: 1440, height: 900, deviceScaleFactor: 1, mobile: false },
  { id: "tablet", width: 768, height: 1024, deviceScaleFactor: 1, mobile: true },
  { id: "mobile", width: 390, height: 844, deviceScaleFactor: 1, mobile: true },
  { id: "compact", width: 320, height: 568, deviceScaleFactor: 1, mobile: true }
];

const publicPagePairs = [
  { id: "about", en: "/about.html", ar: "/ar/about.html" },
  { id: "downloads", en: "/downloads.html", ar: "/ar/downloads.html" },
  { id: "contact", en: "/contact.html", ar: "/ar/contact.html" }
];

const navigationPages = Object.entries(SITE_ROUTES).flatMap(([routeId, definition]) => Object.entries(definition.locales)
  .filter(([, target]) => target.status === "published")
  .map(([locale, target]) => ({ routeId, locale, path: `/${target.outputPath}` })));
const responsiveScreenshotTargets = new Set([
  "home:ar",
  "category:sprinklers:ar",
  "product:wet-alarm-check-valve:ar",
  "product:ria25-fire-hose-reel:en"
]);

async function run() {
  const focusedProducts = focusedSlugs.map(slug => {
    const preservedSource = path.join(root, 'site-src', '_data', 'preserved-products', `${slug}.json`);
    const documentedSource = path.join(root, 'site-src', '_data', 'documented-products', `${slug}.json`);
    const catalogSource = path.join(root, 'site-src', '_data', 'catalog-products', `${slug}.json`);
    const source = fs.existsSync(preservedSource) ? preservedSource : fs.existsSync(documentedSource) ? documentedSource : catalogSource;
    assert(fs.existsSync(source), `No shared product source for ${slug}; add a targeted test adapter before testing this product.`);
    const focusedProduct = JSON.parse(fs.readFileSync(source, 'utf8'));
    focusedProduct.catalogOnly = source === catalogSource;
    assert(focusedProduct.catalogOnly || ['product-series/documented-product.njk', 'product-series/quick-response.njk', 'product-series/standard-response.njk', 'product-series/concealed-pendent.njk', 'product-series/dry-pendent.njk', 'product-series/extended-coverage.njk', 'product-series/large-k-esfr.njk', 'product-series/ria25-hose-reel.njk', 'product-series/straight-stream-hose-reel.njk', 'product-series/jet-spray-hose-reel.njk', 'product-series/heavy-duty-hose-reel.njk', 'product-series/butterfly-valve.njk', 'product-series/gate-valve.njk', 'product-series/indoor-hydrant.njk', 'product-series/outdoor-hydrant.njk'].includes(focusedProduct.template), 'This template needs its own targeted interaction adapter; do not silently skip its checks.');
    return { slug, product: focusedProduct };
  });
  if (focusedCategoryId) {
    assert(SITE_ROUTES[focusedCategoryId]?.kind === 'category', `No registered category route for ${focusedCategorySlug}.`);
  }
  assert(edgePath, "Microsoft Edge was not found. Set EDGE_PATH to a Chromium-compatible Edge executable.");
  fs.mkdirSync(evidenceDirectory, { recursive: true });
  const server = createStaticServer();
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const sitePort = server.address().port;
  const debugPort = await reservePort();
  const profilePath = path.join(os.tmpdir(), `chuanwei-browser-validation-${process.pid}`);
  const browser = spawn(edgePath, [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--remote-allow-origins=*",
    `--remote-debugging-port=${debugPort}`,
    `--user-data-dir=${profilePath}`,
    "about:blank"
  ], { stdio: "ignore", windowsHide: true });
  let client;
  try {
    const target = await waitForDebugTarget(debugPort);
    client = new DevToolsClient(target.webSocketDebuggerUrl);
    await client.connect();
    await client.send("Page.enable");
    await client.send("Runtime.enable");
    const version = await (await fetch(`http://127.0.0.1:${debugPort}/json/version`)).json();
    const origin = process.argv.includes("--file-preview")
      ? pathToFileURL(root).href
      : `http://127.0.0.1:${sitePort}`;
    const matrix = [];

    if (focusedProducts.length) {
      const validations = [];
      for (const { slug, product: focusedProduct } of focusedProducts) {
        const focusedGallery = focusedProduct.gallery ?? [];
        const focusedModelRows = focusedProduct.showModels === false ? undefined
          : focusedProduct.modelGroups?.map(group => group.length)
            ?? (focusedProduct.models ? [focusedProduct.models.length] : undefined);
        const focusedModelSection = focusedProduct.template === 'product-series/outdoor-hydrant.njk' ? 'configuration' : 'models';
        const focusedAnchors = focusedProduct.validation?.anchors ?? (focusedProduct.catalogOnly
          ? ['details']
          : focusedProduct.template === 'product-series/outdoor-hydrant.njk'
          ? ['gallery', 'configuration', ...(focusedProduct.layout === 'options' ? ['options'] : [])]
          : focusedProduct.showModels === false
          ? (focusedGallery.length ? ['gallery', 'specifications'] : ['specifications'])
          : undefined);
        const result = await validateStandardResponse({
          client, origin, viewports, evaluate, navigate, waitForLocation, inspectPage, assert, evidenceDirectory,
          routeId: focusedProduct.routeId, slug, imageCount: focusedGallery.length,
          neutralCaptions: Object.fromEntries(focusedGallery.flatMap((item, index) => Object.hasOwn(focusedProduct.shared ?? {}, item.caption) ? [[index, focusedProduct.shared[item.caption]]] : [])),
          modelTableRows: focusedModelRows, modelSection: focusedModelSection, anchors: focusedAnchors
        });
        validations.push({ slug, languageSwitches: result.results, screenshots: result.screenshots });
      }
      const evidence = {
        scope: focusedProducts.length === 1 ? 'single-product' : 'product-batch',
        products: focusedSlugs,
        previewMode: process.argv.includes('--file-preview') ? 'file' : 'http',
        generatedAt: new Date().toISOString(), browser: version.Browser, viewports,
        validations,
        languageSwitches: validations.flatMap(item => item.languageSwitches),
        screenshots: validations.flatMap(item => item.screenshots)
      };
      fs.writeFileSync(path.join(evidenceDirectory, 'product-validation.json'), `${JSON.stringify(evidence, null, 2)}\n`);
      console.log(`Focused browser validation passed: ${focusedSlugs.join(', ')}, ${evidence.languageSwitches.length} desktop/mobile × EN/AR scenarios. Full-site browser audit intentionally not run.`);
      return;
    }

    if (focusedCategoryId) {
      const productCount = Object.values(SITE_ROUTES).filter(route => route.category === focusedCategoryId).length;
      const results = await validateSystemValveNavigation({
        client, origin, viewports, evaluate, navigate, waitForLocation, inspectPage, assert,
        categoryId: focusedCategoryId, expectedProducts: productCount
      });
      const screenshots = [];
      for (const viewport of viewports) {
        await client.send('Emulation.setDeviceMetricsOverride', viewport);
        for (const locale of ['en', 'ar']) {
          const target = SITE_ROUTES[focusedCategoryId].locales[locale];
          const routePath = `/${target.outputPath}`;
          await navigate(client, `${origin}${encodeURI(routePath)}`, routePath);
          const state = await inspectPage(client);
          assert(state.lang === locale && state.dir === (locale === 'ar' ? 'rtl' : 'ltr'), `${focusedCategoryId}/${locale}: wrong language direction.`);
          assert(state.brokenImageCount === 0 && state.horizontalOverflow <= 1, `${focusedCategoryId}/${locale}: broken image or page overflow.`);
          const screenshot = await client.send('Page.captureScreenshot', {format:'png', captureBeyondViewport:false});
          const name = `edge-${viewport.id}-${focusedCategorySlug}-${locale}.png`;
          fs.writeFileSync(path.join(evidenceDirectory, name), Buffer.from(screenshot.data, 'base64'));
          screenshots.push(name);
        }
      }
      const evidence = {
        scope: 'single-category', category: focusedCategorySlug,
        previewMode: process.argv.includes('--file-preview') ? 'file' : 'http',
        generatedAt: new Date().toISOString(), browser: version.Browser, viewports,
        languageSwitches: results, screenshots
      };
      fs.writeFileSync(path.join(evidenceDirectory, 'category-validation.json'), `${JSON.stringify(evidence, null, 2)}\n`);
      console.log(`Focused category validation passed: ${focusedCategorySlug}, ${results.length} desktop/mobile × EN/AR navigation scenarios. Full-site browser audit intentionally not run.`);
      return;
    }

    for (const viewport of viewports) {
      await client.send("Emulation.setDeviceMetricsOverride", {
        width: viewport.width,
        height: viewport.height,
        deviceScaleFactor: viewport.deviceScaleFactor,
        mobile: viewport.mobile
      });
      for (const page of pages) {
        await navigate(client, `${origin}/index.html?lang=en`, "/index.html");
        const preference = page.preference || page.lang;
        await evaluate(client, `localStorage.setItem('chuanwei-site-language', ${JSON.stringify(preference)}); localStorage.setItem('lang', ${JSON.stringify(preference)})`);
        await navigate(client, `${origin}${encodeURI(page.path)}`, new URL(page.path, "http://localhost").pathname);
        const result = await inspectPage(client);
        assert(result.lang === page.lang, `${viewport.id}/${page.id} rendered lang=${result.lang}, expected ${page.lang}.`);
        assert(result.dir === page.dir, `${viewport.id}/${page.id} rendered dir=${result.dir}, expected ${page.dir}.`);
        assert(`${result.title} ${result.heading}`.includes(page.marker), `${viewport.id}/${page.id} is missing marker '${page.marker}'.`);
        assert(result.horizontalOverflow <= 1, `${viewport.id}/${page.id} has ${result.horizontalOverflow}px horizontal overflow.`);
        assert(!result.hasTemplateMarker, `${viewport.id}/${page.id} contains an unrendered template marker.`);
        assert(result.globalHeaderCount === 1, `${viewport.id}/${page.id} does not have exactly one global header.`);
        assert(result.primaryNavigationCount === 5 && result.activePrimaryCount === 1 && result.activeLanguageCount === 1, `${viewport.id}/${page.id} has an incomplete navigation state.`);
        if (page.id.startsWith("home-")) {
          assert(result.hreflangs.en === "https://chuanweifire.com/", `${page.id} has incorrect English hreflang.`);
          assert(result.hreflangs["zh-CN"] === "https://chuanweifire.com/zh/", `${page.id} has incorrect Chinese hreflang.`);
          assert(result.hreflangs.ar === "https://chuanweifire.com/ar/", `${page.id} has incorrect Arabic hreflang.`);
          assert(result.hreflangs["x-default"] === result.hreflangs.en, `${page.id} has inconsistent x-default.`);
        }
        if (page.id.startsWith("home-") || page.id.startsWith("category-") || page.id.startsWith("deluge-") || page.id.startsWith("preaction-") || page.id.startsWith("dry-pipe-") || ["about-en", "about-ar", "downloads-en", "downloads-ar", "contact-en", "contact-ar"].includes(page.id)) {
          const screenshot = await client.send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
          fs.writeFileSync(path.join(evidenceDirectory, `edge-${viewport.id}-${page.id}.png`), Buffer.from(screenshot.data, "base64"));
        }
        matrix.push({ viewport: viewport.id, width: viewport.width, height: viewport.height, page: page.id, status: "PASS", ...result });
      }
    }

    const responsiveAudit = [];
    const responsiveScreenshots = [];
    for (const viewport of responsiveViewports) {
      await client.send("Emulation.setDeviceMetricsOverride", viewport);
      for (const page of navigationPages) {
        await navigate(client, `${origin}${encodeURI(page.path)}`, page.path);
        const state = await inspectPage(client);
        const expectedLanguage = page.locale === "zh" ? "zh-CN" : page.locale;
        const expectedDirection = page.locale === "ar" ? "rtl" : "ltr";
        assert(state.lang === expectedLanguage, `${viewport.id}/${page.path} has lang=${state.lang}, expected ${expectedLanguage}.`);
        assert(state.dir === expectedDirection && state.computedDirection === expectedDirection, `${viewport.id}/${page.path} has an incorrect writing direction.`);
        assert(state.viewportMeta.includes("width=device-width"), `${viewport.id}/${page.path} is missing a responsive viewport declaration.`);
        assert(state.horizontalOverflow <= 1, `${viewport.id}/${page.path} has ${state.horizontalOverflow}px document overflow.`);
        assert(state.headerWithinViewport, `${viewport.id}/${page.path} header exceeds the viewport.`);
        assert(state.brokenImageCount === 0, `${viewport.id}/${page.path} has broken images: ${state.brokenImages.join(', ')}.`);
        assert(state.overflowingControls.length === 0, `${viewport.id}/${page.path} has controls outside the viewport: ${JSON.stringify(state.overflowingControls)}.`);
        if (viewport.width <= 480 && state.socialFloatPosition !== null) {
          assert(state.socialFloatPosition === "static", `${viewport.id}/${page.path} keeps floating social controls over compact content.`);
        }
        assert(state.globalHeaderCount === 1, `${viewport.id}/${page.path} is missing its shared global header.`);
        assert(state.primaryNavigationCount === 5, `${viewport.id}/${page.path} does not expose all five primary destinations.`);
        assert(state.activePrimaryCount === 1, `${viewport.id}/${page.path} does not identify exactly one primary section.`);
        assert(state.activeLanguageCount === 1, `${viewport.id}/${page.path} does not identify exactly one current language.`);
        if (viewport.width > 980) {
          assert(state.menuDisplay === "none" && state.navigationDisplay === "flex", `${viewport.id}/${page.path} does not expose desktop navigation.`);
        } else {
          assert(state.menuDisplay !== "none" && state.navigationDisplay === "none", `${viewport.id}/${page.path} does not start with a collapsed navigation menu.`);
          await evaluate(client, `document.querySelector('[data-nav-toggle]').click()`);
          const mobileMenu = await evaluate(client, `({open:document.querySelector('[data-site-nav]').classList.contains('open'),expanded:document.querySelector('[data-nav-toggle]').getAttribute('aria-expanded'),display:getComputedStyle(document.querySelector('[data-site-nav]')).display})`);
          assert(mobileMenu.open && mobileMenu.expanded === "true" && mobileMenu.display === "flex", `${viewport.id}/${page.path} responsive navigation did not open.`);
        }
        if (responsiveScreenshotTargets.has(`${page.routeId}:${page.locale}`)) {
          const screenshotName = `edge-${viewport.id}-${page.routeId.replace(/[^a-z0-9]+/gi, "-")}-${page.locale}.png`;
          const screenshot = await client.send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
          fs.writeFileSync(path.join(evidenceDirectory, screenshotName), Buffer.from(screenshot.data, "base64"));
          responsiveScreenshots.push(screenshotName);
        }
        responsiveAudit.push({ viewport: viewport.id, width: viewport.width, routeId: page.routeId, locale: page.locale, path: page.path, status: "PASS", ...state });
      }
    }

    await client.send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
    await navigate(client, `${origin}/index.html?lang=en`, "/index.html");
    await evaluate(client, `document.querySelector('[data-site-language-choice="ar"]').click()`);
    await waitForLocation(client, "/ar/index.html");
    const arabicSwitch = await inspectPage(client);
    assert(arabicSwitch.lang === "ar" && arabicSwitch.dir === "rtl", "English-to-Arabic language switch failed.");

    await evaluate(client, `document.querySelector('[data-site-language-choice="zh"]').click()`);
    await waitForLocation(client, "/zh/index.html");
    const chineseSwitch = await inspectPage(client);
    assert(chineseSwitch.lang === "zh-CN", "Arabic-to-Chinese language switch failed.");
    assert(chineseSwitch.canonical === "https://chuanweifire.com/zh/", "Chinese homepage has an incorrect canonical URL.");

    await evaluate(client, `localStorage.setItem('chuanwei-site-language','ar')`);
    await navigate(client, `${origin}/index.html`, "/index.html");
    const explicitEnglish = await inspectPage(client);
    assert(explicitEnglish.lang === "en", "The explicit English homepage must remain authoritative over a stored preference.");
    await evaluate(client, `localStorage.setItem('chuanwei-site-language','en')`);
    await navigate(client, `${origin}/ar/index.html`, "/ar/index.html");
    const directArabic = await inspectPage(client);
    assert(directArabic.lang === "ar", "An explicit Arabic URL must remain authoritative over a stored preference.");

    await navigate(client, `${origin}/index.html?lang=zh`, "/zh/index.html");
    const legacyChinese = await inspectPage(client);
    assert(legacyChinese.lang === "zh-CN", "The legacy Chinese query URL did not redirect to the dedicated Chinese homepage.");

    const languageSwitches = [
      { scenario: "EN control to AR homepage", status: "PASS", finalUrl: arabicSwitch.url, lang: arabicSwitch.lang, dir: arabicSwitch.dir },
      { scenario: "AR control to dedicated Chinese homepage", status: "PASS", finalUrl: chineseSwitch.url, lang: chineseSwitch.lang, dir: chineseSwitch.dir, canonical: chineseSwitch.canonical },
      { scenario: "explicit EN homepage overrides stored AR", status: "PASS", finalUrl: explicitEnglish.url, lang: explicitEnglish.lang, dir: explicitEnglish.dir },
      { scenario: "explicit AR URL overrides stored EN", status: "PASS", finalUrl: directArabic.url, lang: directArabic.lang, dir: directArabic.dir },
      { scenario: "legacy Chinese query redirects to /zh/", status: "PASS", finalUrl: legacyChinese.url, lang: legacyChinese.lang, dir: legacyChinese.dir }
    ];

    for (const page of publicPagePairs) {
      await evaluate(client, `localStorage.setItem('chuanwei-site-language','ar')`);
      await navigate(client, `${origin}${page.en}`, page.en);
      const explicitPublicEnglish = await inspectPage(client);
      assert(explicitPublicEnglish.lang === "en" && explicitPublicEnglish.dir === "ltr", `${page.id} did not respect its explicit English URL.`);
      languageSwitches.push({ scenario: `${page.id}: explicit EN overrides stored AR`, status: "PASS", finalUrl: explicitPublicEnglish.url, lang: explicitPublicEnglish.lang, dir: explicitPublicEnglish.dir });

      await evaluate(client, `document.querySelector('[data-site-language-choice="ar"]').click()`);
      await waitForLocation(client, page.ar);
      const switchedPublicArabic = await inspectPage(client);
      assert(switchedPublicArabic.lang === "ar" && switchedPublicArabic.dir === "rtl", `${page.id} English-to-Arabic switch failed.`);
      languageSwitches.push({ scenario: `${page.id}: switch EN to AR`, status: "PASS", finalUrl: switchedPublicArabic.url, lang: switchedPublicArabic.lang, dir: switchedPublicArabic.dir });

      await client.send("Page.reload", { ignoreCache: true });
      await waitForLocation(client, page.ar);
      const refreshedPublicArabic = await inspectPage(client);
      assert(refreshedPublicArabic.lang === "ar", `${page.id} did not retain Arabic after refresh.`);
      languageSwitches.push({ scenario: `${page.id}: refresh retains AR`, status: "PASS", finalUrl: refreshedPublicArabic.url, lang: refreshedPublicArabic.lang, dir: refreshedPublicArabic.dir });

      await evaluate(client, `document.querySelector('.global-brand').click()`);
      await waitForLocation(client, "/ar/index.html");
      await evaluate(client, "history.back()");
      await waitForLocation(client, page.ar);
      const returnedPublicArabic = await inspectPage(client);
      assert(returnedPublicArabic.lang === "ar" && returnedPublicArabic.dir === "rtl", `${page.id} did not return to its Arabic page from the homepage.`);
      languageSwitches.push({ scenario: `${page.id}: browser back returns to AR page`, status: "PASS", finalUrl: returnedPublicArabic.url, lang: returnedPublicArabic.lang, dir: returnedPublicArabic.dir });
    }

    const untranslated = Object.values(SITE_ROUTES).find(route => route.kind === 'product' && route.locales.ar.status === 'fallback');
    if (untranslated) {
    const fallbackPath = '/' + untranslated.locales.ar.outputPath;
    const englishPath = '/' + untranslated.locales.en.outputPath;
    await navigate(client, `${origin}${encodeURI(fallbackPath)}`, fallbackPath);
    const fallbackClicked = await evaluate(client, `(() => { const link = [...document.querySelectorAll('.product-card__link')].find(a => decodeURIComponent(new URL(a.href).pathname).endsWith(${JSON.stringify(englishPath)})); if (!link) return false; link.click(); return true; })()`);
    assert(fallbackClicked, 'Missing untranslated product category link');
    await waitForLocation(client, englishPath);
    const englishFallback = await inspectPage(client);
    assert(englishFallback.lang === "en", "An untranslated product opened from Arabic must remain available in English.");
    languageSwitches.push({ scenario: "AR category opens untranslated EN product without redirect loop", status: "PASS", finalUrl: englishFallback.url, lang: englishFallback.lang, dir: englishFallback.dir });
    await evaluate(client, `document.querySelector('[data-site-language-choice="ar"]').click()`);
    await waitForLocation(client, fallbackPath);
    const fallbackCategory = await inspectPage(client);
    assert(fallbackCategory.lang === "ar", "Fallback Arabic language control did not return to the matching category.");
    languageSwitches.push({ scenario: "untranslated EN product AR control returns to matching category", status: "PASS", finalUrl: fallbackCategory.url, lang: fallbackCategory.lang, dir: fallbackCategory.dir });
    }

    await navigate(client, `${origin}/ar/products/wet-alarm-check-valve/index.html`, "/ar/products/wet-alarm-check-valve/index.html");
    await evaluate(client, `document.querySelector('[data-site-nav-item="products"]').click()`);
    await waitForLocation(client, "/ar/products.html");
    const arabicProductNavigation = await inspectPage(client);
    assert(arabicProductNavigation.lang === "ar", "Arabic product navigation did not preserve the selected language.");
    languageSwitches.push({ scenario: "AR product global navigation preserves Arabic", status: "PASS", finalUrl: arabicProductNavigation.url, lang: arabicProductNavigation.lang, dir: arabicProductNavigation.dir });
    for (const home of ["/index.html", "/zh/index.html", "/ar/index.html"]) {
      await navigate(client, `${origin}${home}`, home);
      const resources = await evaluate(client, `({
        styled: [...document.styleSheets].some(sheet => sheet.href?.includes('site-navigation.css')),
        logoLoaded: document.querySelector('.global-brand img').naturalWidth > 0,
        anchorsLocal: [...document.querySelectorAll('a[href^="#"]')].every(link => new URL(link.href).pathname === location.pathname)
      })`);
      assert(resources.styled && resources.logoLoaded && resources.anchorsLocal, `${home}: homepage resources and section links must resolve from the current page.`);
      await evaluate(client, `document.querySelector('.actions a[href="#products"]').click()`);
      await delay(100);
      const anchorState = await evaluate(client, "({path: location.pathname, hash: location.hash})");
      assert(pathnameMatches(anchorState.path, home) && anchorState.hash === "#products", `${home}: product section link changed the homepage language.`);
      languageSwitches.push({ scenario: `${home}: shared styles/logo load and product section retains locale`, status: "PASS" });
    }
    await evaluate(client, "document.querySelector('.product').click()");
    await waitForLocation(client, "/ar/products/sprinklers/index.html");
    languageSwitches.push({ scenario: "AR homepage product card opens AR category", status: "PASS" });
    const productInteractions = [];
    for (const viewport of viewports) {
      await client.send("Emulation.setDeviceMetricsOverride", viewport);
      const en = "/products/消防阀/diaphragm-deluge-valves.html";
      const ar = "/ar/products/diaphragm-deluge-valves/index.html";
      await navigate(client, `${origin}/ar/products/system-valves/index.html`, "/ar/products/system-valves/index.html");
      await evaluate(client, `document.querySelector('a[href*="diaphragm-deluge-valves"]').click()`);
      await waitForLocation(client, ar);
      assert((await inspectPage(client)).lang === "ar", "AR category must open the translated deluge product");
      await evaluate(client, `document.querySelector('[data-site-language-choice="en"]').click()`);
      await waitForLocation(client, en);
      for (const [locale, productPath] of [["en", en], ["ar", ar]]) {
        await evaluate(client, `document.querySelector('[data-site-language-choice="${locale}"]').click()`);
        await waitForLocation(client, productPath);
        assert((await inspectPage(client)).lang === locale, `Deluge switch must retain the same product in ${locale}`);
        await client.send("Page.reload", { ignoreCache: true });
        await waitForLocation(client, productPath);
        assert((await inspectPage(client)).lang === locale, `Deluge refresh must retain ${locale}`);
        const gallery = await evaluate(client, `(() => {
          const get = selector => document.querySelector(selector);
          const thumb = index => get('[data-gallery-index="' + index + '"]');
          const selected = index => thumb(index).classList.contains('active') && get('.wav-gallery__main img').getAttribute('src') === thumb(index).dataset.src;
          get('.wav-gallery__arrow--next').click(); const next = selected(1);
          get('.wav-gallery__main').click(); const modal = get('#productModal').classList.contains('open') && get('#productModal img').getAttribute('src') === thumb(1).dataset.src;
          document.dispatchEvent(new KeyboardEvent('keydown', {key:'Escape', bubbles:true}));
          const close = !get('#productModal').classList.contains('open') && document.body.style.overflow === '';
          get('.wav-gallery__arrow--prev').click(); const previous = selected(0);
          thumb(1).click(); const thumbnail = selected(1);
          thumb(0).click();
          const stage = get('.wav-gallery__stage');
          for (const [type, x] of [['touchstart',200],['touchend', document.dir === 'rtl' ? 300 : 100]]) {
            const event = new Event(type); Object.defineProperty(event,'changedTouches',{value:[{clientX:x}]}); stage.dispatchEvent(event);
          }
          const swipe = selected(1);
          return {next, previous, thumbnail, modal, close, swipe};
        })()`);
        assert(Object.values(gallery).every(Boolean), `${viewport.id}/${locale}: deluge gallery failed: ${JSON.stringify(gallery)}`);
        productInteractions.push({viewport:viewport.id, locale, status:"PASS", gallery});
      }
      await evaluate(client, `document.querySelector('[data-global-product-footer] a').click()`);
      await waitForLocation(client, "/ar/products/system-valves/index.html");
      languageSwitches.push({scenario:`${viewport.id}: deluge AR category, same-product EN/AR switch, refresh and AR category return`, status:"PASS"});
    }
    const singlePhotoScreenshots = [];
    for (const product of [
      {id:"preaction", slug:"preaction-valve-assemblies", models:9},
      {id:"dry-pipe", slug:"dry-pipe-alarm-valves", models:3}
    ]) {
      for (const viewport of viewports) {
        await client.send("Emulation.setDeviceMetricsOverride", viewport);
        const en = `/products/消防阀/${product.slug}.html`;
        const ar = `/ar/products/${product.slug}/index.html`;
        await navigate(client, `${origin}/ar/products/system-valves/index.html`, "/ar/products/system-valves/index.html");
        await evaluate(client, `document.querySelector('a[href*="${product.slug}"]').click()`);
        await waitForLocation(client, ar);
        assert((await inspectPage(client)).lang === "ar", "AR category must open the translated single-photo product");
        for (const [locale, productPath] of [["en", en], ["ar", ar]]) {
          await evaluate(client, `document.querySelector('[data-site-language-choice="${locale}"]').click()`);
          await waitForLocation(client, productPath);
          assert((await inspectPage(client)).lang === locale, `Single-photo product switch must retain the same product in ${locale}`);
          await client.send("Page.reload", {ignoreCache:true});
          await waitForLocation(client, productPath);
          assert((await inspectPage(client)).lang === locale, `Single-photo product refresh must retain ${locale}`);
          const zoom = await evaluate(client, `(() => {
            const trigger = document.querySelector('[data-lightbox]'), modal = document.querySelector('#productModal');
            const closed = () => !modal.classList.contains('open') && document.body.style.overflow === '';
            trigger.click();
            const opened = modal.classList.contains('open') && modal.querySelector('img').src === trigger.querySelector('img').src && document.activeElement === modal.querySelector('button');
            document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true})); const escape = closed();
            trigger.click(); modal.querySelector('button').click(); const closeButton = closed();
            trigger.click(); modal.click(); const backdrop = closed();
            return {opened,escape,closeButton,backdrop,singlePhoto:!document.querySelector('[data-gallery]'),models:document.querySelectorAll('#models tbody tr').length === ${product.models}};
          })()`);
          assert(Object.values(zoom).every(Boolean), `${viewport.id}/${locale}: ${product.id} zoom failed: ${JSON.stringify(zoom)}`);
          productInteractions.push({product:product.id,viewport:viewport.id,locale,status:"PASS",zoom});
          // Separate modal focus/scroll restoration from the next anchor scenario.
          // Otherwise a pending browser scroll can interrupt the anchor animation.
          await evaluate(client, `new Promise(resolve => requestAnimationFrame(() => {
            window.scrollTo({top:0,behavior:'instant'});
            requestAnimationFrame(resolve);
          }))`);
          await evaluate(client, `document.querySelector('.pdp-section-navigation a[href="#models"]').click()`);
          // Wait for smooth anchor scrolling, otherwise a screenshot can capture
          // the preceding section and a lower-bound-only position check still pass.
          for (let attempt = 0; attempt < 60; attempt += 1) {
            const settled = await evaluate(client, `(() => {
              const section = document.querySelector('#models');
              return Math.abs(section.getBoundingClientRect().top - parseFloat(getComputedStyle(section).scrollMarginTop || '0')) < 2;
            })()`);
            if (settled) break;
            await delay(50);
          }
          const anchor = await evaluate(client, `({path:location.pathname,hash:location.hash,top:document.querySelector('#models').getBoundingClientRect().top,headingTop:document.querySelector('#models h2').getBoundingClientRect().top,headerBottom:document.querySelector('[data-global-header]').getBoundingClientRect().bottom})`);
          assert(pathnameMatches(anchor.path,productPath) && anchor.hash === "#models", "Single-photo product section link changed language");
          assert(anchor.headingTop >= anchor.headerBottom - 1, "Single-photo product model heading is hidden under navigation");
          assert(anchor.top < viewport.height / 2, `${viewport.id}/${locale}/${product.id}: model anchor did not settle: ${JSON.stringify(anchor)}`);
          const screenshot = await client.send("Page.captureScreenshot", {format:"png",captureBeyondViewport:false});
          const screenshotName = `edge-${viewport.id}-${product.id}-${locale}-models.png`;
          fs.writeFileSync(path.join(evidenceDirectory,screenshotName),Buffer.from(screenshot.data,"base64"));
          singlePhotoScreenshots.push(screenshotName);
        }
        await evaluate(client, `document.querySelector('[data-global-product-footer] a').click()`);
        await waitForLocation(client, "/ar/products/system-valves/index.html");
        languageSwitches.push({scenario:`${viewport.id}: ${product.id} AR category, same-product EN/AR switch, refresh, model anchor and AR category return`,status:"PASS"});
      }
    }
    languageSwitches.push(...await validateSystemValveNavigation({
      client, origin, viewports, evaluate, navigate, waitForLocation, inspectPage, assert
    }));
    languageSwitches.push(...await validateSystemValveNavigation({
      client, origin, viewports, evaluate, navigate, waitForLocation, inspectPage, assert,
      categoryId: "category:sprinklers", expectedProducts: 8
    }));
    languageSwitches.push(...await validateSystemValveNavigation({
      client, origin, viewports, evaluate, navigate, waitForLocation, inspectPage, assert,
      categoryId: "category:hose-reels", expectedProducts: 4
    }));
    languageSwitches.push(...await validateSystemValveNavigation({
      client, origin, viewports, evaluate, navigate, waitForLocation, inspectPage, assert,
      categoryId: "category:butterfly-valves", expectedProducts: 4
    }));
    const standardResponse = await validateStandardResponse({
      client, origin, viewports, evaluate, navigate, waitForLocation, inspectPage, assert, evidenceDirectory
    });
    languageSwitches.push(...standardResponse.results);
    const quickResponse = await validateStandardResponse({
      client, origin, viewports, evaluate, navigate, waitForLocation, inspectPage, assert, evidenceDirectory,
      routeId: "product:glass-bulb-fire-sprinkler", slug: "quick-response", imageCount: 5
    });
    languageSwitches.push(...quickResponse.results);
    const concealedProduct = JSON.parse(fs.readFileSync(path.join(root, 'site-src/_data/preserved-products/concealed-pendent-fire-sprinkler.json'), 'utf8'));
    const concealedResponse = await validateStandardResponse({
      client, origin, viewports, evaluate, navigate, waitForLocation, inspectPage, assert, evidenceDirectory,
      routeId: concealedProduct.routeId, slug: concealedProduct.id, imageCount: concealedProduct.gallery.length,
      neutralCaptions: Object.fromEntries(concealedProduct.gallery.flatMap((item, index) => Object.hasOwn(concealedProduct.shared, item.caption) ? [[index, concealedProduct.shared[item.caption]]] : []))
    });
    languageSwitches.push(...concealedResponse.results);
    const dryPendentResponse = await validateStandardResponse({
      client, origin, viewports, evaluate, navigate, waitForLocation, inspectPage, assert, evidenceDirectory,
      routeId: 'product:dry-pendent-fire-sprinklers', slug: 'dry-pendent-fire-sprinklers', imageCount: 4
    });
    languageSwitches.push(...dryPendentResponse.results);
    const extendedResponse = await validateStandardResponse({
      client, origin, viewports, evaluate, navigate, waitForLocation, inspectPage, assert, evidenceDirectory,
      routeId: 'product:extended-coverage-quick-response-fire-sprinkler', slug: 'extended-coverage-quick-response-fire-sprinkler', imageCount: 3
    });
    languageSwitches.push(...extendedResponse.results);
    const esfrResponse = await validateStandardResponse({
      client, origin, viewports, evaluate, navigate, waitForLocation, inspectPage, assert, evidenceDirectory,
      routeId: 'product:large-k-factor-esfr-sprinklers', slug: 'large-k-factor-esfr-sprinklers', imageCount: 7, modelTableRows: [6,6]
    });
    languageSwitches.push(...esfrResponse.results);
    const ria25Response = await validateStandardResponse({
      client, origin, viewports, evaluate, navigate, waitForLocation, inspectPage, assert, evidenceDirectory,
      routeId: 'product:ria25-fire-hose-reel', slug: 'ria25-fire-hose-reel', imageCount: 3, modelTableRows: [3]
    });
    languageSwitches.push(...ria25Response.results);
    const straightResponse = await validateStandardResponse({
      client, origin, viewports, evaluate, navigate, waitForLocation, inspectPage, assert, evidenceDirectory,
      routeId: 'product:straight-stream-fire-hose-reel', slug: 'straight-stream-fire-hose-reel', imageCount: 2, modelTableRows: [9]
    });
    languageSwitches.push(...straightResponse.results);
    const jetResponse = await validateStandardResponse({
      client, origin, viewports, evaluate, navigate, waitForLocation, inspectPage, assert, evidenceDirectory,
      routeId: 'product:jet-spray-fire-hose-reel', slug: 'jet-spray-fire-hose-reel', imageCount: 1, modelTableRows: [9]
    });
    languageSwitches.push(...jetResponse.results);
    const heavyDutyResponse = await validateStandardResponse({
      client, origin, viewports, evaluate, navigate, waitForLocation, inspectPage, assert, evidenceDirectory,
      routeId: 'product:heavy-duty-fire-hose-reel', slug: 'heavy-duty-fire-hose-reel', imageCount: 0, modelTableRows: [6]
    });
    languageSwitches.push(...heavyDutyResponse.results);
    const leverGroovedButterflyResponse = await validateStandardResponse({
      client, origin, viewports, evaluate, navigate, waitForLocation, inspectPage, assert, evidenceDirectory,
      routeId: 'product:lever-operated-grooved-butterfly-valves', slug: 'lever-operated-grooved-butterfly-valves', imageCount: 0, modelTableRows: [7]
    });
    languageSwitches.push(...leverGroovedButterflyResponse.results);
    const leverWaferButterflyResponse = await validateStandardResponse({
      client, origin, viewports, evaluate, navigate, waitForLocation, inspectPage, assert, evidenceDirectory,
      routeId: 'product:lever-operated-wafer-butterfly-valves', slug: 'lever-operated-wafer-butterfly-valves', imageCount: 0, modelTableRows: [7]
    });
    languageSwitches.push(...leverWaferButterflyResponse.results);
    const groovedSupervisoryButterflyResponse = await validateStandardResponse({
      client, origin, viewports, evaluate, navigate, waitForLocation, inspectPage, assert, evidenceDirectory,
      routeId: 'product:grooved-supervisory-butterfly-valves', slug: 'grooved-supervisory-butterfly-valves', imageCount: 0, modelTableRows: [3]
    });
    languageSwitches.push(...groovedSupervisoryButterflyResponse.results);
    const waferSupervisoryButterflyResponse = await validateStandardResponse({
      client, origin, viewports, evaluate, navigate, waitForLocation, inspectPage, assert, evidenceDirectory,
      routeId: 'product:wafer-supervisory-butterfly-valves', slug: 'wafer-supervisory-butterfly-valves', imageCount: 0, modelTableRows: [3]
    });
    languageSwitches.push(...waferSupervisoryButterflyResponse.results);
    const evidence = {
      previewMode: process.argv.includes("--file-preview") ? "file" : "http",
      generatedAt: new Date().toISOString(),
      browser: version.Browser,
      protocolVersion: version["Protocol-Version"],
      viewports,
      matrix,
      responsiveViewports,
      responsiveAudit,
      languageSwitches,
      productInteractions,
      screenshots: [
        ...viewports.flatMap((viewport) => ["home-en", "home-zh", "home-ar", "category-en", "category-ar", "about-en", "about-ar", "downloads-en", "downloads-ar", "contact-en", "contact-ar", "deluge-en", "deluge-ar", "preaction-en", "preaction-ar", "dry-pipe-en", "dry-pipe-ar"].map((page) => `edge-${viewport.id}-${page}.png`)),
        ...responsiveScreenshots,
        ...singlePhotoScreenshots,
        ...standardResponse.screenshots,
        ...quickResponse.screenshots,
        ...concealedResponse.screenshots,
        ...dryPendentResponse.screenshots,
        ...extendedResponse.screenshots,
        ...esfrResponse.screenshots,
        ...ria25Response.screenshots,
        ...straightResponse.screenshots,
        ...jetResponse.screenshots,
        ...heavyDutyResponse.screenshots,
        ...leverGroovedButterflyResponse.screenshots,
        ...leverWaferButterflyResponse.screenshots,
        ...groovedSupervisoryButterflyResponse.screenshots,
        ...waferSupervisoryButterflyResponse.screenshots
      ]
    };
    fs.writeFileSync(path.join(evidenceDirectory, "browser-validation.json"), `${JSON.stringify(evidence, null, 2)}\n`);
    const markdown = [
      "# 多语言浏览器验证证据",
      "",
      `- 生成时间：${evidence.generatedAt}`,
      `- 浏览器：${evidence.browser}`,
      `- DevTools 协议：${evidence.protocolVersion}`,
      `- 结果：${matrix.length} 个代表页面/视口组合通过；${responsiveAudit.length} 个全站响应式与方向检查通过；${languageSwitches.length} 个语言与返回场景通过。`,
      "",
      "## 视口矩阵",
      "",
      "| 视口 | 尺寸 | 覆盖页面 | 结果 |",
      "| --- | --- | --- | --- |",
      ...viewports.map((viewport) => `| ${viewport.id} | ${viewport.width}×${viewport.height} | ${pages.length} | PASS |`),
      "",
      "## 覆盖范围",
      "",
      "玻璃球快速响应喷头：双语入口、同商品互切、刷新及返回；五张图库（含温度色标和包装图）的动态说明、缩略图、循环、滑动、放大/关闭和型号锚点。",
      "标准响应消防喷头：双语分类图片/文字入口、同商品双向切换与刷新、四张图库及阿文动态说明、箭头循环、左右滑动、放大及三种关闭方式、三个页脚同语言返回入口。",
      `英文/中文/阿文首页、产品总目录、公共页面、分类页和双语详情；逐一打开全部 ${navigationPages.length} 个正式页面，在 1440、768、390 和 320 像素四档宽度检查 LTR/RTL、页面溢出、页头边界、图片加载、控件和菜单；验证语言切换与返回，检查雨淋阀图库，以及预作用阀组、干式报警阀单图放大、三种关闭方式和型号锚点；逐一验证报警阀分类四类产品的图片/文字入口、双向语言切换、刷新、浏览器返回及三个页脚返回入口。`,
      "",
      "## 可复核产物",
      "",
      "逐页 URL、语言、方向、canonical、hreflang、横向溢出、图片与控件边界数据见 `browser-validation.json`；同目录含首页、公共页面、阿文分类、双语详情及未翻译英文详情的代表性截图。"
    ].join("\n");
    fs.writeFileSync(path.join(evidenceDirectory, "README.md"), `${markdown}\n`);
    console.log(`Browser validation passed: ${matrix.length} representative page/viewport checks, ${responsiveAudit.length} full-site responsive/RTL checks and ${languageSwitches.length} language/return checks on ${version.Browser}.`);
  } finally {
    client?.close();
    browser.kill();
    await new Promise((resolve) => server.close(resolve));
  }
}

await run();
