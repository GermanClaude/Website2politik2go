/* ==========================================================================
   Prüfstand – Kern: Router, Hilfsfunktionen, lokaler Speicher
   Alle Daten bleiben im Browser. Keine Cookies, keine Tracker.
   ========================================================================== */
(function () {
  'use strict';

  var PS = window.PS = window.PS || {};
  PS.version = '1.0.0';
  PS.stand = '24. September 2026';

  /* Angaben für das Impressum (vor der Veröffentlichung ausfüllen).
     Solange "name" leer ist, wird kein Impressum angezeigt. */
  PS.betreiber = {
    name: 'Master Legend',
    anschrift: 'Mustermannweg 31',   // Zeilen mit \n trennen, z. B. 'Musterstraße 1\n12345 Musterstadt'
    email: '',
    verantwortlich: ''      // verantwortlich nach § 18 Abs. 2 MStV (optional)
  };

  /* ---------- Lokaler Speicher (fehlertolerant) ---------- */
  var PREFIX = 'pruefstand:';
  PS.store = {
    get: function (key, fallback) {
      try {
        var v = window.localStorage.getItem(PREFIX + key);
        return v === null ? fallback : JSON.parse(v);
      } catch (e) { return fallback; }
    },
    set: function (key, value) {
      try { window.localStorage.setItem(PREFIX + key, JSON.stringify(value)); } catch (e) { /* ignorieren */ }
    },
    del: function (key) {
      try { window.localStorage.removeItem(PREFIX + key); } catch (e) { /* ignorieren */ }
    }
  };

  /* ---------- Hilfsfunktionen ---------- */
  PS.esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  PS.strip = function (html) {
    return String(html || '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
  };
  PS.norm = function (s) {
    return String(s || '').toLowerCase()
      .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
      .normalize('NFD').replace(/[̀-ͯ]/g, '');
  };
  PS.shuffle = function (arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  };
  PS.fmtNum = function (n, digits) {
    try { return Number(n).toLocaleString('de-DE', { minimumFractionDigits: digits || 0, maximumFractionDigits: digits || 0 }); }
    catch (e) { return String(n); }
  };
  PS.pct = function (x) { return Math.round(x) + ' %'; };
  PS.initials = function (name) {
    var parts = String(name).replace(/\(.*?\)/g, '').trim().split(/\s+/);
    return ((parts[0] || '')[0] || '') + ((parts[parts.length - 1] || '')[0] || '');
  };
  PS.qs = function (sel, root) { return (root || document).querySelector(sel); };
  PS.qsa = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* Kleine Symbole als Inline-SVG */
  PS.icon = function (name) {
    var p = {
      chev: '<path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
      right: '<path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
      left: '<path d="M19 12H5M11 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
      info: '<circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 11v6M12 7.2v.1" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',
      search: '<circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2"/><path d="M20 20l-4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
      check: '<path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
      x: '<path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>',
      clock: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 7v5l3 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
      copy: '<rect x="8" y="8" width="12" height="12" rx="1.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8" fill="none" stroke="currentColor" stroke-width="2"/>',
      reset: '<path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4h4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
      para: '<text x="12" y="17" text-anchor="middle" font-size="16" font-family="Georgia, serif" font-weight="700" fill="currentColor">§</text>',
      book: '<path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5zM20 5.5A1.5 1.5 0 0 0 18.5 4H13v16h5.5a1.5 1.5 0 0 0 1.5-1.5z" fill="none" stroke="currentColor" stroke-width="1.8"/>',
      people: '<circle cx="9" cy="8" r="3.2" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17" cy="9" r="2.6" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3 19c.6-3.4 3-5 6-5s5.4 1.6 6 5M15 14.5c2.6-.3 4.8 1 5.6 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
      map: '<path d="M4 6l5-2 6 2 5-2v14l-5 2-6-2-5 2z M9 4v14M15 6v14" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>',
      tree: '<rect x="9" y="3" width="6" height="4" fill="none" stroke="currentColor" stroke-width="1.7"/><rect x="3" y="16" width="6" height="4" fill="none" stroke="currentColor" stroke-width="1.7"/><rect x="15" y="16" width="6" height="4" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M12 7v4M6 16v-3h12v3" fill="none" stroke="currentColor" stroke-width="1.7"/>',
      flow: '<circle cx="6" cy="6" r="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="18" cy="12" r="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="6" cy="18" r="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8.3 7.2l7.4 3.6M8.3 16.8l7.4-3.6" stroke="currentColor" stroke-width="1.8"/>',
      cap: '<path d="M2 9l10-5 10 5-10 5z M6 11v5c3 2.5 9 2.5 12 0v-5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>',
      list: '<path d="M9 6h11M9 12h11M9 18h11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="4.5" cy="6" r="1.4" fill="currentColor"/><circle cx="4.5" cy="12" r="1.4" fill="currentColor"/><circle cx="4.5" cy="18" r="1.4" fill="currentColor"/>',
      quiz: '<rect x="4" y="3" width="16" height="18" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 9l1.5 1.5L12 8M8 15l1.5 1.5L12 14M14 9.5h3M14 15.5h3" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
      bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
      grid: '<rect x="4" y="4" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M9.3 4v16M14.7 4v16M4 9.3h16M4 14.7h16" stroke="currentColor" stroke-width="1.4"/>',
      brain: '<path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 3 3h1V4zM15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-3 3h-1V4z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
      ballot: '<rect x="4" y="3" width="16" height="18" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M9.5 9.5l5 5M14.5 9.5l-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
      memory: '<rect x="3" y="7" width="18" height="10" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M7 11h2M11 11h2M15 11h2M7 14h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
      target: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/>'
    }[name] || '';
    return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + p + '</svg>';
  };

  /* Positionssymbole (einheitlich, ohne Parteifarben) */
  PS.posLabel = function (v) {
    if (v === 1) return { cls: 'pos-yes', txt: 'stimmt zu', sym: '✓' };
    if (v === 0) return { cls: 'pos-neu', txt: 'neutral', sym: '' };
    if (v === -1) return { cls: 'pos-no', txt: 'lehnt ab', sym: '✕' };
    return { cls: 'pos-na', txt: 'keine eindeutige Aussage', sym: '' };
  };
  PS.posHtml = function (v, short) {
    var p = PS.posLabel(v);
    return '<span class="pos ' + p.cls + '"><i aria-hidden="true">' + p.sym + '</i>' + (short ? '<span class="sr-only">' + p.txt + '</span>' : p.txt) + '</span>';
  };

  /* ---------- Toast ---------- */
  var toastTimer = null;
  PS.toast = function (msg) {
    var el = PS.qs('[data-toast]');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('show'); }, 2600);
  };

  PS.copy = function (text, okMsg) {
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', '');
      ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      document.body.removeChild(ta);
      PS.toast(ok ? (okMsg || 'Kopiert') : 'Kopieren nicht möglich – bitte Text markieren und manuell kopieren.');
    }
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { PS.toast(okMsg || 'Kopiert'); }, fallback);
      } else { fallback(); }
    } catch (e) { fallback(); }
  };

  /* ---------- Router ---------- */
  PS.routes = {};
  PS.route = function (name, meta, fn) { PS.routes[name] = { meta: meta || {}, fn: fn }; };

  var cleanups = [];
  PS.onLeave = function (fn) { cleanups.push(fn); };

  PS.go = function (hash) {
    if (('#' + hash) === window.location.hash) { render(); }
    else { window.location.hash = hash; }
  };

  function parseHash() {
    var raw = (window.location.hash || '').replace(/^#/, '');
    try { raw = decodeURIComponent(raw); } catch (e) { /* unverändert lassen */ }
    if (!raw) raw = 'start';
    var i = raw.indexOf('.');
    return { name: i < 0 ? raw : raw.slice(0, i), arg: i < 0 ? '' : raw.slice(i + 1), raw: raw };
  }

  function closeMenu() {
    var nav = PS.qs('#nav');
    var btn = PS.qs('[data-menu]');
    if (nav) nav.classList.remove('open');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }

  function render() {
    cleanups.splice(0).forEach(function (fn) { try { fn(); } catch (e) { /* ignorieren */ } });
    var r = parseHash();
    var route = PS.routes[r.name] || PS.routes.notfound;
    var main = PS.qs('#main');
    main.innerHTML = '';
    try {
      route.fn(main, r.arg, r);
    } catch (err) {
      main.innerHTML = '<div class="page"><h1 class="h1-sm">Etwas ist schiefgelaufen</h1><p class="lead">Diese Seite konnte nicht angezeigt werden. Bitte laden Sie die Seite neu.</p><p class="small faint mono">' + PS.esc(err && err.message) + '</p></div>';
      if (window.console) console.error(err);
    }
    var meta = route.meta || {};
    var title = typeof meta.title === 'function' ? meta.title(r.arg) : meta.title;
    document.title = title ? title + ' · Prüfstand' : 'Prüfstand – Tests zu Politik, Staat und Denkvermögen';
    var section = meta.section || r.name;
    PS.qsa('[data-nav]').forEach(function (a) {
      if (a.getAttribute('data-nav') === section) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    closeMenu();
    if (!meta.keepScroll) window.scrollTo(0, 0);
    var h = main.querySelector('h1');
    if (h && PS._booted) {
      h.setAttribute('tabindex', '-1');
      try { h.focus({ preventScroll: true }); } catch (e) { /* ignorieren */ }
    }
    PS._booted = true;
    if (typeof meta.after === 'function') meta.after(r.arg);
  }
  PS.render = render;

  PS.route('notfound', { title: 'Seite nicht gefunden' }, function (main) {
    main.innerHTML = '<div class="page"><div class="stack"><p class="eyebrow">Fehler 404</p><h1 class="h1-sm">Diese Seite gibt es nicht</h1><p class="lead">Vielleicht hat sich die Adresse geändert. Über das Menü oder die Startseite finden Sie alle Tests und Inhalte.</p><div class="btn-row"><a class="btn btn-primary" href="#start">Zur Startseite</a></div></div></div>';
  });

  /* Sanftes Springen zu Ankern innerhalb einer Seite, ohne den Router auszulösen */
  PS.scrollToId = function (id) {
    var el = document.getElementById(id);
    if (!el) return;
    var top = el.getBoundingClientRect().top + window.pageYOffset - 84;
    window.scrollTo({ top: top, behavior: 'smooth' });
    el.setAttribute('tabindex', '-1');
    try { el.focus({ preventScroll: true }); } catch (e) { /* ignorieren */ }
  };
  document.addEventListener('click', function (ev) {
    var a = ev.target.closest && ev.target.closest('[data-jump]');
    if (a) { ev.preventDefault(); PS.scrollToId(a.getAttribute('data-jump')); return; }
    // Link auf die gerade angezeigte Seite: neu aufbauen (z. B. zurück zum Start eines Tests)
    var l = ev.target.closest && ev.target.closest('a[href^="#"]');
    if (!l || ev.defaultPrevented || ev.button !== 0 || ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return;
    var href = l.getAttribute('href');
    var cur = window.location.hash || '#start';
    if (href === cur) { ev.preventDefault(); render(); }
  });

  /* ---------- Farbschema ---------- */
  PS.setTheme = function (t) {
    var root = document.documentElement;
    if (t === 'light' || t === 'dark') root.setAttribute('data-theme', t);
    else { root.removeAttribute('data-theme'); t = 'auto'; }
    PS.store.set('theme', t);
  };

  /* ---------- Start ---------- */
  PS.start = function () {
    var th = PS.store.get('theme', 'auto');
    if (th === 'light' || th === 'dark') document.documentElement.setAttribute('data-theme', th);
    var btn = PS.qs('[data-menu]');
    if (btn) btn.addEventListener('click', function () {
      var nav = PS.qs('#nav');
      var open = !nav.classList.contains('open');
      nav.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    var skip = PS.qs('[data-skip]');
    if (skip) skip.addEventListener('click', function () {
      var main = PS.qs('#main');
      var h = main.querySelector('h1') || main;
      h.setAttribute('tabindex', '-1');
      h.focus();
    });
    PS.qsa('[data-stand]').forEach(function (el) { el.textContent = PS.stand; });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
    window.addEventListener('hashchange', render);
    render();
  };
})();
