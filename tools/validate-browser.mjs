import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";

const root = process.cwd();
const evidenceDirectory = path.join(root, "docs", "evidence", "multilingual-browser", "2026-09-04");
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

async function navigate(client, url, expectedPath) {
  await client.send("Page.navigate", { url });
  for (let attempt = 0; attempt < 100; attempt += 1) {
    const state = await evaluate(client, "({readyState:document.readyState,path:location.pathname,search:location.search})");
    if (state.readyState === "complete" && (!expectedPath || state.path === expectedPath)) return state;
    await delay(50);
  }
  throw new Error(`Timed out waiting for browser navigation to ${expectedPath || url}.`);
}

async function waitForLocation(client, expectedPath, expectedSearch = null) {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    const state = await evaluate(client, "({readyState:document.readyState,path:location.pathname,search:location.search})");
    if (state.readyState === "complete" && state.path === expectedPath && (expectedSearch === null || state.search === expectedSearch)) return state;
    await delay(50);
  }
  throw new Error(`Timed out waiting for browser location ${expectedPath}${expectedSearch || ""}.`);
}

async function inspectPage(client) {
  return evaluate(client, `({
    url: location.href,
    lang: document.documentElement.lang,
    dir: document.documentElement.dir,
    title: document.title,
    heading: document.querySelector('h1')?.textContent.trim() || document.querySelector('h2')?.textContent.trim() || '',
    canonical: document.querySelector('link[rel="canonical"]')?.href || '',
    hreflangs: Object.fromEntries([...document.querySelectorAll('link[rel="alternate"][hreflang]')].map((link) => [link.hreflang, link.href])),
    horizontalOverflow: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
    hasTemplateMarker: ['{{', '{%', '{#'].some((marker) => document.documentElement.outerHTML.includes(marker))
  })`);
}

const pages = [
  { id: "home-en", path: "/index.html?lang=en", lang: "en", dir: "ltr", marker: "Fire Protection Equipment" },
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
  { id: "fallback-en", path: "/products/消防阀/diaphragm-deluge-valves.html?lang=en", lang: "en", dir: "", marker: "Deluge" }
];

const viewports = [
  { id: "desktop", width: 1440, height: 900, deviceScaleFactor: 1, mobile: false },
  { id: "mobile", width: 390, height: 844, deviceScaleFactor: 1, mobile: true }
];

const publicPagePairs = [
  { id: "about", en: "/about.html", ar: "/ar/about.html" },
  { id: "downloads", en: "/downloads.html", ar: "/ar/downloads.html" },
  { id: "contact", en: "/contact.html", ar: "/ar/contact.html" }
];

async function run() {
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
    const origin = `http://127.0.0.1:${sitePort}`;
    const matrix = [];

    for (const viewport of viewports) {
      await client.send("Emulation.setDeviceMetricsOverride", {
        width: viewport.width,
        height: viewport.height,
        deviceScaleFactor: viewport.deviceScaleFactor,
        mobile: viewport.mobile
      });
      for (const page of pages) {
        await navigate(client, `${origin}/index.html?lang=en`, "/index.html");
        await evaluate(client, `localStorage.setItem('chuanwei-site-language', ${JSON.stringify(page.lang)}); localStorage.setItem('lang', ${JSON.stringify(page.lang)})`);
        await navigate(client, `${origin}${encodeURI(page.path)}`, new URL(page.path, origin).pathname);
        const result = await inspectPage(client);
        assert(result.lang === page.lang, `${viewport.id}/${page.id} rendered lang=${result.lang}, expected ${page.lang}.`);
        assert(result.dir === page.dir, `${viewport.id}/${page.id} rendered dir=${result.dir}, expected ${page.dir}.`);
        assert(`${result.title} ${result.heading}`.includes(page.marker), `${viewport.id}/${page.id} is missing marker '${page.marker}'.`);
        assert(result.horizontalOverflow <= 1, `${viewport.id}/${page.id} has ${result.horizontalOverflow}px horizontal overflow.`);
        assert(!result.hasTemplateMarker, `${viewport.id}/${page.id} contains an unrendered template marker.`);
        if (page.id.startsWith("home-")) {
          assert(result.hreflangs.en === "https://chuanweifire.com/", `${page.id} has incorrect English hreflang.`);
          assert(result.hreflangs["zh-CN"] === "https://chuanweifire.com/?lang=zh", `${page.id} has incorrect Chinese hreflang.`);
          assert(result.hreflangs.ar === "https://chuanweifire.com/ar/", `${page.id} has incorrect Arabic hreflang.`);
          assert(result.hreflangs["x-default"] === result.hreflangs.en, `${page.id} has inconsistent x-default.`);
        }
        if (page.id.startsWith("home-") || ["about-en", "about-ar", "downloads-en", "downloads-ar", "contact-en", "contact-ar"].includes(page.id)) {
          const screenshot = await client.send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
          fs.writeFileSync(path.join(evidenceDirectory, `edge-${viewport.id}-${page.id}.png`), Buffer.from(screenshot.data, "base64"));
        }
        matrix.push({ viewport: viewport.id, width: viewport.width, height: viewport.height, page: page.id, status: "PASS", ...result });
      }
    }

    await client.send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
    await navigate(client, `${origin}/index.html?lang=en`, "/index.html");
    await evaluate(client, `document.querySelector('[data-site-language-choice="ar"]').click()`);
    await waitForLocation(client, "/ar/index.html");
    const arabicSwitch = await inspectPage(client);
    assert(arabicSwitch.lang === "ar" && arabicSwitch.dir === "rtl", "English-to-Arabic language switch failed.");

    await evaluate(client, `document.querySelector('[data-site-language-choice="zh"]').click()`);
    await waitForLocation(client, "/index.html", "?lang=zh");
    const chineseSwitch = await inspectPage(client);
    assert(chineseSwitch.lang === "zh-CN", "Arabic-to-Chinese language switch failed.");
    assert(chineseSwitch.canonical === "https://chuanweifire.com/?lang=zh", "Chinese inline homepage has an incorrect runtime canonical.");

    await evaluate(client, `localStorage.setItem('chuanwei-site-language','ar')`);
    await navigate(client, `${origin}/index.html`, "/ar/index.html");
    const restoredArabic = await inspectPage(client);
    assert(restoredArabic.lang === "ar", "Saved Arabic preference was not restored from the English homepage.");
    await evaluate(client, `localStorage.setItem('chuanwei-site-language','en')`);
    await navigate(client, `${origin}/ar/index.html`, "/index.html");
    const restoredEnglish = await inspectPage(client);
    assert(restoredEnglish.lang === "en", "Saved English preference was not restored from the Arabic homepage.");

    const languageSwitches = [
      { scenario: "EN control to AR homepage", status: "PASS", finalUrl: arabicSwitch.url, lang: arabicSwitch.lang, dir: arabicSwitch.dir },
      { scenario: "AR control to inline Chinese homepage", status: "PASS", finalUrl: chineseSwitch.url, lang: chineseSwitch.lang, dir: chineseSwitch.dir, canonical: chineseSwitch.canonical },
      { scenario: "saved AR preference from EN homepage", status: "PASS", finalUrl: restoredArabic.url, lang: restoredArabic.lang, dir: restoredArabic.dir },
      { scenario: "saved EN preference from AR homepage", status: "PASS", finalUrl: restoredEnglish.url, lang: restoredEnglish.lang, dir: restoredEnglish.dir }
    ];

    for (const page of publicPagePairs) {
      await evaluate(client, `localStorage.setItem('chuanwei-site-language','ar')`);
      await navigate(client, `${origin}${page.en}`, page.ar);
      const restoredPublicArabic = await inspectPage(client);
      assert(restoredPublicArabic.lang === "ar" && restoredPublicArabic.dir === "rtl", `${page.id} did not restore the saved Arabic preference.`);
      languageSwitches.push({ scenario: `${page.id}: restore saved AR from EN URL`, status: "PASS", finalUrl: restoredPublicArabic.url, lang: restoredPublicArabic.lang, dir: restoredPublicArabic.dir });

      await evaluate(client, `document.querySelector('[data-site-language-choice="en"]').click()`);
      await waitForLocation(client, page.en);
      const switchedPublicEnglish = await inspectPage(client);
      assert(switchedPublicEnglish.lang === "en" && switchedPublicEnglish.dir === "ltr", `${page.id} Arabic-to-English switch failed.`);
      languageSwitches.push({ scenario: `${page.id}: switch AR to EN`, status: "PASS", finalUrl: switchedPublicEnglish.url, lang: switchedPublicEnglish.lang, dir: switchedPublicEnglish.dir });

      await client.send("Page.reload", { ignoreCache: true });
      await waitForLocation(client, page.en);
      const refreshedPublicEnglish = await inspectPage(client);
      assert(refreshedPublicEnglish.lang === "en", `${page.id} did not retain English after refresh.`);
      languageSwitches.push({ scenario: `${page.id}: refresh retains EN`, status: "PASS", finalUrl: refreshedPublicEnglish.url, lang: refreshedPublicEnglish.lang, dir: refreshedPublicEnglish.dir });

      await evaluate(client, `document.querySelector('[data-site-language-choice="ar"]').click()`);
      await waitForLocation(client, page.ar);
      await evaluate(client, `document.querySelector('.brand').click()`);
      await waitForLocation(client, "/ar/index.html");
      await evaluate(client, "history.back()");
      await waitForLocation(client, page.ar);
      const returnedPublicArabic = await inspectPage(client);
      assert(returnedPublicArabic.lang === "ar" && returnedPublicArabic.dir === "rtl", `${page.id} did not return to its Arabic page from the homepage.`);
      languageSwitches.push({ scenario: `${page.id}: browser back returns to AR page`, status: "PASS", finalUrl: returnedPublicArabic.url, lang: returnedPublicArabic.lang, dir: returnedPublicArabic.dir });
    }
    const evidence = {
      generatedAt: new Date().toISOString(),
      browser: version.Browser,
      protocolVersion: version["Protocol-Version"],
      viewports,
      matrix,
      languageSwitches,
      screenshots: viewports.flatMap((viewport) => ["home-en", "home-ar", "about-en", "about-ar", "downloads-en", "downloads-ar", "contact-en", "contact-ar"].map((page) => `edge-${viewport.id}-${page}.png`))
    };
    fs.writeFileSync(path.join(evidenceDirectory, "browser-validation.json"), `${JSON.stringify(evidence, null, 2)}\n`);
    const markdown = [
      "# 多语言浏览器验证证据",
      "",
      `- 生成时间：${evidence.generatedAt}`,
      `- 浏览器：${evidence.browser}`,
      `- DevTools 协议：${evidence.protocolVersion}`,
      `- 结果：${matrix.length} 个页面/视口组合通过；${languageSwitches.length} 个语言切换与偏好恢复场景通过。`,
      "",
      "## 视口矩阵",
      "",
      "| 视口 | 尺寸 | 覆盖页面 | 结果 |",
      "| --- | --- | --- | --- |",
      ...viewports.map((viewport) => `| ${viewport.id} | ${viewport.width}×${viewport.height} | ${pages.length} | PASS |`),
      "",
      "## 覆盖范围",
      "",
      "英文/阿文首页、产品总目录、关于我们、下载中心、联系页面、报警阀分类页、湿式报警阀/水幕喷头/水雾喷头三组双语详情、未翻译雨淋阀英文安全回退，以及首页四个语言场景和三个公共页面各自的恢复、切换、刷新、返回场景。",
      "",
      "## 可复核产物",
      "",
      "逐页 URL、语言、方向、canonical、hreflang、横向溢出与标题数据见 `browser-validation.json`；同目录含英文/阿文首页及三个公共页面的桌面与手机截图。"
    ].join("\n");
    fs.writeFileSync(path.join(evidenceDirectory, "README.md"), `${markdown}\n`);
    console.log(`Browser validation passed: ${matrix.length} page/viewport checks and ${languageSwitches.length} language-switch checks on ${version.Browser}.`);
  } finally {
    client?.close();
    browser.kill();
    await new Promise((resolve) => server.close(resolve));
  }
}

await run();
