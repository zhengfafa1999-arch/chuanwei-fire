(function () {
  const finder = document.querySelector('[data-product-finder]');
  if (!finder) return;
  const search = finder.querySelector('#product-search');
  const category = finder.querySelector('#product-family');
  const results = finder.querySelector('#product-results');
  const groups = [...finder.querySelectorAll('[data-family]')];
  const pageSize = 12;
  let page = 1, pageCount = 1;
  const normalize = value => value.normalize('NFKD').replace(/[\u0300-\u036f\u064b-\u065f\u0670]/g, '').toLowerCase().replace(/[-–—]/g, ' ');
  const groupTemplates = new Map(groups.map(group => [group.dataset.family, {
    shell: group.cloneNode(false),
    heading: group.querySelector('.catalog-section__heading').cloneNode(true)
  }]));
  const catalog = groups.flatMap(group => [...group.querySelectorAll('[data-search]')].map(card => ({
    family: group.dataset.family,
    card: card.cloneNode(true),
    text: normalize(card.dataset.search)
  })));
  const loadImage = (img, priority = 'auto') => {
    const source = img.getAttribute('src');
    if (!source) return;
    img.fetchPriority = priority;
    img.loading = 'eager';
    if (!img.dataset.loadRecoveryBound) {
      img.dataset.loadRecoveryBound = 'true';
      img.addEventListener('load', () => { delete img.dataset.loadRetry; });
      img.addEventListener('error', () => {
        const retrySource = img.getAttribute('src');
        if (!retrySource || !img.isConnected || img.dataset.loadRetry === retrySource) return;
        img.dataset.loadRetry = retrySource;
        img.removeAttribute('src');
        requestAnimationFrame(() => {
          if (img.isConnected) img.src = retrySource;
        });
      });
    }
  };
  const render = items => {
    const fragment = document.createDocumentFragment();
    const renderedGroups = new Map();
    items.forEach((item, index) => {
      let rendered = renderedGroups.get(item.family);
      if (!rendered) {
        const template = groupTemplates.get(item.family);
        const section = template.shell.cloneNode(false);
        const grid = document.createElement('div');
        grid.className = 'product-grid';
        section.append(template.heading.cloneNode(true), grid);
        rendered = { section, grid };
        renderedGroups.set(item.family, rendered);
        fragment.append(section);
      }
      const card = item.card.cloneNode(true);
      card.hidden = false;
      card.querySelectorAll('img.finder-js-image').forEach(img => loadImage(img, index < 4 ? 'high' : 'auto'));
      rendered.grid.append(card);
    });
    // Render new, visible image nodes for the current page. This prevents
    // Chrome from retaining a cancelled lazy-load state from a hidden page.
    results.replaceChildren(fragment);
  };
  results.replaceChildren();
  const storageKey = 'product-finder:' + location.pathname;
  const restore = () => {
    const params = new URLSearchParams(location.search);
    let saved = {};
    try { saved = JSON.parse(sessionStorage.getItem(storageKey) || '{}'); } catch {}
    const explicit = params.has('q') || params.has('category') || params.has('page');
    search.value = explicit ? params.get('q') || '' : saved.q || '';
    category.value = explicit ? params.get('category') || '' : saved.category || '';
    page = Math.max(1, Math.floor(Number(explicit ? params.get('page') || 1 : saved.page || 1)) || 1);
    if (!Number.isFinite(page)) page = 1;
  };
  const persist = () => {
    const state = { q: search.value, category: category.value, page };
    try { sessionStorage.setItem(storageKey, JSON.stringify(state)); } catch {}
    const url = new URL(location.href);
    // Keep explicit empty values so a cleared filter overrides saved state.
    url.searchParams.set('q', state.q);
    url.searchParams.set('category', state.category);
    url.searchParams.set('page', String(page));
    try { history.replaceState(history.state, '', url); } catch {}
  };
  const update = () => {
    const tokens = normalize(search.value).trim().split(/\s+/).filter(Boolean);
    const matches = catalog.filter(item => (!category.value || category.value === item.family) && tokens.every(token => item.text.includes(token)));
    const count = matches.length;
    pageCount = Math.max(1, Math.ceil(count / pageSize));
    page = Math.min(page, pageCount);
    render(matches.slice((page - 1) * pageSize, page * pageSize));
    finder.querySelectorAll('[data-finder-pagination]').forEach(nav => { nav.hidden = count <= pageSize; });
    finder.querySelectorAll('[data-page-label]').forEach(label => { label.textContent = document.documentElement.lang === 'ar' ? `الصفحة ${page} / ${pageCount}` : `Page ${page} of ${pageCount}`; });
    finder.querySelectorAll('[data-page-prev]').forEach(button => { button.disabled = page === 1; });
    finder.querySelectorAll('[data-page-next]').forEach(button => { button.disabled = page === pageCount; });
    finder.querySelector('[data-finder-count]').textContent = document.documentElement.lang === 'ar' ? `${count} منتجات` : `${count} products`;
    finder.querySelector('[data-finder-empty]').hidden = count !== 0;
  };
  const change = () => { page = 1; update(); persist(); };
  search.addEventListener('input', change);
  category.addEventListener('change', change);
  finder.querySelector('[data-finder-reset]').addEventListener('click', () => {
    search.value = ''; category.value = ''; change(); search.focus();
  });
  finder.querySelectorAll('.finder-shortcuts a').forEach(link => link.addEventListener('click', () => {
    search.value = ''; category.value = link.hash.slice(1); change();
  }));
  const turnPage = step => {
    page = Math.max(1, Math.min(pageCount, page + step)); update(); persist();
    finder.scrollIntoView({ behavior: 'instant', block: 'start' });
  };
  finder.querySelectorAll('[data-page-prev]').forEach(button => button.addEventListener('click', () => turnPage(-1)));
  finder.querySelectorAll('[data-page-next]').forEach(button => button.addEventListener('click', () => turnPage(1)));
  finder.querySelector('.finder-controls').hidden = false;
  restore(); update();
  window.addEventListener('pageshow', () => { restore(); update(); });
  window.addEventListener('popstate', () => { restore(); update(); });
})();
