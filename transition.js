// SPA Loader with Fade Transitions — No Flash, No Reloads
(function () {
  const body = document.body;
  const contentEl = document.getElementById('main-content');
  const FADE_MS = 350;
  const FETCH_TIMEOUT = 4000;

  function onceEvent(target, event) {
    return new Promise(resolve => {
      function h(e) { target.removeEventListener(event, h); resolve(e); }
      target.addEventListener(event, h);
    });
  }

  function waitForVideoOrTimeout() {
    return new Promise(resolve => {
      const video = document.querySelector('#bg-video');
      if (!video) return resolve();

      if (video.readyState >= 2) return resolve();

      let done = false;
      function finish() { if (!done) { done = true; resolve(); } }

      onceEvent(video, 'loadeddata').then(finish);
      setTimeout(finish, 300);
    });
  }

  function fadeIn() {
    body.classList.add('page-loaded');
    return new Promise(res => setTimeout(res, FADE_MS));
  }
  function fadeOut() {
    body.classList.remove('page-loaded');
    return new Promise(res => setTimeout(res, FADE_MS));
  }

  function extractSection(htmlText) {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, 'text/html');
      const section = doc.querySelector('.transparent-section');
      const title = doc.querySelector('title');
      return {
        html: section ? section.innerHTML : htmlText,
        title: title ? title.innerText : null
      };
    } catch (e) {
      return { html: htmlText, title: null };
    }
  }

  async function fetchWithTimeout(url, timeout = FETCH_TIMEOUT) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), timeout);
    try {
      const res = await fetch(url, { signal: ctrl.signal, cache: 'no-store' });
      clearTimeout(t);
      if (!res.ok) throw new Error('Fetch failed');
      const text = await res.text();
      return text;
    } catch (err) {
      clearTimeout(t);
      throw err;
    }
  }

  async function loadPage(href, push = true) {
    try {
      await fadeOut();
      const txt = await fetchWithTimeout(href);
      const { html, title } = extractSection(txt);
      contentEl.innerHTML = html;
      if (title) document.title = title;
      if (push) {
        try { history.pushState({ url: href }, '', href); } catch {}
      }
      window.scrollTo(0,0);
      await fadeIn();
    } catch (e) {
      // fallback to hard navigation if fetch fails
      window.location.href = href;
    }
  }

  function bindNav() {
    document.addEventListener('click', (ev) => {
      const a = ev.target.closest && ev.target.closest('a.transition-link');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href) return;
      if (href.startsWith('#')) return;
      // only same-origin / relative
      const origin = window.location.origin;
      if (href.startsWith('http') && !href.startsWith(origin)) return;

      ev.preventDefault();
      loadPage(href, true);
    });
  }

  window.addEventListener('popstate', (ev) => {
    const url = (ev.state && ev.state.url) || window.location.pathname;
    loadPage(url, false);
  });

  async function init() {
    // ensure body hidden until ready
    await waitForVideoOrTimeout();
    // small tick for smoothness
    await new Promise(r => setTimeout(r, 60));
    body.classList.add('page-loaded');

    bindNav();

    // on initial load if not index (direct link), load that content into container
    const path = window.location.pathname.split('/').pop() || 'index.html';
    if (path && path !== 'index.html' && path !== '') {
      // don't push (we're initial)
      loadPage(path, false);
    }
  }

  init();
})();
