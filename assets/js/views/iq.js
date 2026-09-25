/* ==========================================================================
   Prüfstand – IQ-Test: Einführung, Testablauf mit Zeitlimit, Auswertung
   ========================================================================== */
(function () {
  'use strict';
  var PS = window.PS;
  var D = PS.iq;
  var esc = PS.esc;
  var RUN = 'iq:lauf';
  var RES = 'iq:ergebnis';
  var LETTERS = 'ABCDEF';

  /* ---------- Zeichnen ---------- */
  function r2(n) { return Math.round(n * 100) / 100; }
  function fillAttr(f) {
    if (f === 'b') return ' fill="currentColor"';
    if (f === 'g') return ' fill="currentColor" fill-opacity=".38"';
    if (f === 'g2') return ' fill="currentColor" fill-opacity=".07"';
    return ' fill="none"';
  }
  var STROKE = ' stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"';
  function polyPts(n, x, y, r, rot) {
    var pts = [];
    for (var i = 0; i < n; i++) {
      var a = (rot + i * 360 / n) * Math.PI / 180;
      pts.push(r2(x + r * Math.sin(a)) + ',' + r2(y - r * Math.cos(a)));
    }
    return pts.join(' ');
  }
  function shape(s) {
    switch (s.k) {
      case 'circle':
        return '<circle cx="' + s.x + '" cy="' + s.y + '" r="' + s.r + '"' + fillAttr(s.f) + (s.r < 3 ? '' : STROKE) + '/>';
      case 'square':
        return '<rect x="' + r2(s.x - s.r) + '" y="' + r2(s.y - s.r) + '" width="' + (2 * s.r) + '" height="' + (2 * s.r) + '"' + fillAttr(s.f) + STROKE + '/>';
      case 'poly':
        return '<polygon points="' + polyPts(s.n, s.x, s.y, s.r, s.rot || 0) + '"' + fillAttr(s.f) + STROKE + '/>';
      case 'line':
        return '<line x1="' + s.x1 + '" y1="' + s.y1 + '" x2="' + s.x2 + '" y2="' + s.y2 + '" stroke="currentColor" stroke-width="' + s.w + '" stroke-linecap="round"/>';
      case 'plus':
        return '<path d="M' + (s.x - s.r) + ' ' + s.y + 'H' + (s.x + s.r) + 'M' + s.x + ' ' + (s.y - s.r) + 'V' + (s.y + s.r) + '" stroke="currentColor" stroke-width="' + s.w + '" stroke-linecap="round"/>';
      case 'frame':
        return '<rect x="' + s.p + '" y="' + s.p + '" width="' + (100 - 2 * s.p) + '" height="' + (100 - 2 * s.p) + '" fill="none" stroke="currentColor" stroke-width="1.3" stroke-opacity=".55"/>';
      case 'arrow':
        return '<g transform="rotate(' + s.rot + ' 50 50)"><line x1="50" y1="82" x2="50" y2="36" stroke="currentColor" stroke-width="5" stroke-linecap="round"/><polygon points="50,15 35,40 65,40" fill="currentColor"/></g>';
      case 'hand': {
        var a = s.rot * Math.PI / 180;
        var ex = r2(50 + s.len * Math.sin(a)), ey = r2(50 - s.len * Math.cos(a));
        return '<line x1="50" y1="50" x2="' + ex + '" y2="' + ey + '" stroke="currentColor" stroke-width="' + s.w + '" stroke-linecap="round"/>' +
          (s.dot ? '<circle cx="' + ex + '" cy="' + ey + '" r="' + s.dot + '" fill="currentColor"/>' : '');
      }
      case 'pts':
        return '<polygon points="' + s.pts + '"' + fillAttr(s.f) + STROKE + '/>';
      case 'path':
        return '<path d="' + s.d + '" fill-rule="evenodd"' + fillAttr(s.f) + STROKE + '/>';
      case 'rect':
        return '<rect x="' + r2(s.x) + '" y="' + r2(s.y) + '" width="' + r2(s.w) + '" height="' + r2(s.h) + '"' + fillAttr(s.f) + ' stroke="currentColor" stroke-width="1.8"/>';
      case 'text':
        return '<text x="' + r2(s.x) + '" y="' + r2(s.y) + '" text-anchor="middle" dominant-baseline="central" font-size="' + s.size + '" font-weight="700" fill="currentColor" font-family="ui-monospace, Menlo, Consolas, monospace">' + esc(s.t) + '</text>';
      case 'g':
        return '<g' + (s.tf ? ' transform="' + s.tf + '"' : '') + '>' + draw(s.c) + '</g>';
      default:
        return '';
    }
  }
  function draw(shapes) { return (shapes || []).map(shape).join(''); }
  function svg(inner, vb, label, style) {
    return '<svg viewBox="' + (vb || '0 0 100 100') + '"' + (label ? ' role="img" aria-label="' + esc(label) + '"' : ' aria-hidden="true"') + ' focusable="false"' + (style ? ' style="' + style + '"' : '') + '>' + inner + '</svg>';
  }
  function matrixSvg(cells, solution) {
    var out = '<rect x="1" y="1" width="298" height="298" fill="none" stroke="currentColor" stroke-width="2"/>' +
      '<path d="M100 1V299M200 1V299M1 100H299M1 200H299" stroke="currentColor" stroke-width="1.2" stroke-opacity=".5"/>';
    cells.forEach(function (cell, i) {
      out += '<g transform="translate(' + (i % 3) * 100 + ' ' + Math.floor(i / 3) * 100 + ')">' + draw(cell) + '</g>';
    });
    if (solution) {
      out += '<rect x="202" y="202" width="96" height="96" fill="currentColor" fill-opacity=".07"/><g transform="translate(200 200)">' + draw(solution) + '</g>';
    } else {
      out += '<rect x="202" y="202" width="96" height="96" fill="currentColor" fill-opacity=".06"/>' +
        '<text x="250" y="252" text-anchor="middle" dominant-baseline="central" font-size="46" font-weight="700" fill="currentColor" font-family="Georgia, serif">?</text>';
    }
    return svg(out, '0 0 300 300', 'Matrix aus drei mal drei Feldern' + (solution ? ' mit eingesetzter Lösung' : ', das Feld unten rechts fehlt'));
  }
  PS.iqDraw = { svg: svg, draw: draw, matrix: matrixSvg };
  function optCls(it) { return it.o.length === 6 ? 'six' : 'n' + it.o.length; }

  /* ---------- Hilfen ---------- */
  function fmtTime(sec) {
    sec = Math.max(0, Math.ceil(sec));
    var m = Math.floor(sec / 60), s = sec % 60;
    return m + ':' + (s < 10 ? '0' : '') + s;
  }
  function phi(z) {
    var t = 1 / (1 + 0.3275911 * Math.abs(z) / Math.SQRT2);
    var y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-z * z / 2);
    return z >= 0 ? (1 + y) / 2 : (1 - y) / 2;
  }
  function iqFrom(raw) {
    var z = (raw - D.norm.mittel) / D.norm.sd;
    return Math.max(55, Math.min(145, Math.round(100 + 15 * z)));
  }
  function klasse(iq) {
    if (iq >= 130) return 'weit überdurchschnittlich';
    if (iq >= 115) return 'überdurchschnittlich';
    if (iq >= 85) return 'durchschnittlich';
    if (iq >= 70) return 'unterdurchschnittlich';
    return 'deutlich unterdurchschnittlich';
  }
  function katCount() {
    var c = {};
    D.items.forEach(function (it) { c[it.kat] = (c[it.kat] || 0) + 1; });
    return c;
  }
  function fmtDate(ts) {
    try { return new Date(ts).toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' }); }
    catch (e) { return ''; }
  }

  function newRun() {
    var order = {};
    D.items.forEach(function (it) { order[it.id] = PS.shuffle(it.o.map(function (_, i) { return i; })); });
    return { v: 1, start: Date.now(), idx: 0, ans: {}, order: order };
  }
  function loadRun() {
    var r = PS.store.get(RUN, null);
    if (!r || r.v !== 1 || !r.order || !r.ans) return null;
    for (var i = 0; i < D.items.length; i++) {
      var o = r.order[D.items[i].id];
      if (!o || o.length !== D.items[i].o.length) return null;
    }
    return r;
  }
  function remaining(run) { return D.zeit - (Date.now() - run.start) / 1000; }
  function evaluate(run, reason) {
    var richtig = 0, perKat = {};
    D.items.forEach(function (it) {
      var k = perKat[it.kat] || (perKat[it.kat] = { r: 0, n: 0 });
      k.n++;
      if (run.ans[it.id] === it.a) { richtig++; k.r++; }
    });
    var res = {
      v: 1, datum: Date.now(), richtig: richtig, gesamt: D.items.length,
      dauer: Math.min(D.zeit, Math.round((Date.now() - run.start) / 1000)),
      beantwortet: Object.keys(run.ans).length, ans: run.ans, perKat: perKat, grund: reason || 'fertig'
    };
    PS.store.set(RES, res);
    PS.store.del(RUN);
    return res;
  }

  /* ---------- Einführung ---------- */
  PS.route('iq', { title: 'IQ-Test', section: 'iq' }, function (main) {
    var run = loadRun();
    if (run && remaining(run) <= 0) { evaluate(run, 'zeit'); run = null; }
    var res = PS.store.get(RES, null);
    var cnt = katCount();
    var kats = Object.keys(D.kategorien);

    var h = '<div class="page">' +
      '<header class="stack"><p class="eyebrow">Denkvermögen</p><h1>IQ-Test</h1>' +
      '<p class="lead">40 Aufgaben aus sechs Bereichen – von Figurenmatrizen über Zahlenreihen bis zu räumlichem Denken. Die Aufgaben werden schrittweise schwerer. Am Ende erhalten Sie einen geschätzten IQ-Wert, ein Profil Ihrer Stärken und die Auflösung jeder Aufgabe.</p>' +
      '<div class="facts"><span><b>' + D.items.length + '</b> Aufgaben</span><span><b>' + Math.round(D.zeit / 60) + '</b> Minuten</span><span><b>' + kats.length + '</b> Bereiche</span><span>ohne Anmeldung</span></div></header>';

    h += '<div class="btn-row">';
    if (run) {
      h += '<a class="btn btn-primary" href="#iq-test">' + PS.icon('right') + 'Test fortsetzen (' + Object.keys(run.ans).length + ' von ' + D.items.length + ' beantwortet, noch ' + fmtTime(remaining(run)) + ' min)</a>' +
        '<button class="btn" type="button" data-new>' + PS.icon('reset') + 'Neu beginnen</button>';
    } else {
      h += '<button class="btn btn-primary" type="button" data-new>' + PS.icon('right') + 'Test starten</button>';
    }
    if (res) h += '<a class="btn btn-quiet" href="#iq-ergebnis">Letztes Ergebnis ansehen</a>';
    h += '</div>';

    h += '<div class="grid-2">' +
      '<section class="section"><h2>So läuft der Test ab</h2><ol class="steps">' +
      '<li><h3>Ruhe und Zeit einplanen</h3><p>Sie haben ' + Math.round(D.zeit / 60) + ' Minuten für ' + D.items.length + ' Aufgaben. Die Zeit läuft ab dem Start weiter – auch wenn Sie die Seite verlassen.</p></li>' +
      '<li><h3>Eine Antwort wählen</h3><p>Pro Aufgabe ist genau eine Antwort richtig. Nach der Auswahl geht es automatisch weiter. Mit der Übersicht können Sie jederzeit zurückspringen und Antworten ändern.</p></li>' +
      '<li><h3>Lieber raten als leer lassen</h3><p>Falsche Antworten geben keinen Abzug. Unbeantwortete Aufgaben zählen als nicht gelöst.</p></li>' +
      '<li><h3>Auswertung ansehen</h3><p>Sie erhalten Rohwert, geschätzten IQ, Prozentrang, ein Profil nach Bereichen und zu jeder Aufgabe die Lösung mit Erklärung.</p></li>' +
      '</ol><p class="small faint kbd-hint">Tastatur: Tasten 1–6 oder A–F wählen eine Antwort, Pfeiltasten blättern.</p></section>' +
      '<section class="section"><h2>Die sechs Bereiche</h2><div class="unitlist">';
    kats.forEach(function (k, i) {
      h += '<div class="unit"><span class="uno">' + (i + 1) + '</span><div><h3>' + esc(D.kategorien[k].name) + '</h3><p>' + esc(D.kategorien[k].text) + '</p></div><span class="pill">' + cnt[k] + ' Aufgaben</span></div>';
    });
    h += '</div></section></div>';

    h += '<div class="merke" data-label="Bitte beachten"><p><b>Dies ist kein klinischer Intelligenztest.</b> Anerkannte IQ-Tests werden an großen, repräsentativen Stichproben geeicht und von Fachleuten unter kontrollierten Bedingungen durchgeführt. Dieser Test ist selbst entwickelt und nicht normiert: Der angezeigte Wert beruht auf einer angenommenen Verteilung und ist nur eine grobe Einordnung zur Unterhaltung und zum Training.</p><p>Tagesform, Müdigkeit, Übung mit ähnlichen Aufgaben und Sprachkenntnisse beeinflussen das Ergebnis. Für Diagnosen oder Entscheidungen (etwa zu Schule, Beruf oder Gesundheit) ist er nicht geeignet.</p></div>';

    if (res) {
      var iq = iqFrom(res.richtig);
      h += '<section class="panel panel-tight spread"><div><p class="eyebrow">Letztes Ergebnis · ' + esc(fmtDate(res.datum)) + '</p><p><b>' + res.richtig + ' von ' + res.gesamt + '</b> richtig · geschätzter IQ <b>' + iq + '</b></p></div><a class="btn btn-sm" href="#iq-ergebnis">Details</a></section>';
    }
    h += '</div>';
    main.innerHTML = h;

    PS.qsa('[data-new]', main).forEach(function (b) {
      b.addEventListener('click', function () {
        PS.store.set(RUN, newRun());
        PS.go('iq-test');
      });
    });
  });

  /* ---------- Testablauf ---------- */
  PS.route('iq-test', { title: 'IQ-Test läuft', section: 'iq' }, function (main) {
    var run = loadRun();
    if (!run) {
      main.innerHTML = '<div class="page"><div class="stack"><p class="eyebrow">IQ-Test</p><h1 class="h1-sm">Kein laufender Test</h1><p class="lead">Starten Sie den Test auf der Übersichtsseite. Ihr Fortschritt wird automatisch in diesem Browser gespeichert.</p><div class="btn-row"><a class="btn btn-primary" href="#iq">Zur Übersicht</a></div></div></div>';
      return;
    }
    if (remaining(run) <= 0) { evaluate(run, 'zeit'); PS.go('iq-ergebnis'); return; }

    var items = D.items;
    var advanceTimer = null;
    var ticker = null;

    function save() { PS.store.set(RUN, run); }

    function finish(reason) {
      clearInterval(ticker);
      clearTimeout(advanceTimer);
      evaluate(run, reason);
      PS.go('iq-ergebnis');
    }

    function render(focusTop) {
      var it = items[run.idx];
      var kat = D.kategorien[it.kat];
      var answered = Object.keys(run.ans).length;
      var chosen = run.ans[it.id];
      var order = run.order[it.id];
      var isFig = typeof it.o[0] !== 'string';

      var h = '<div class="page">' +
        '<div class="iq-bar"><p class="eyebrow">IQ-Test · Aufgabe ' + (run.idx + 1) + ' von ' + items.length + '</p>' +
        '<span class="timer" data-timer role="timer" aria-label="Verbleibende Zeit">' + PS.icon('clock') + '<span>' + fmtTime(remaining(run)) + '</span></span></div>' +
        '<div class="progress" aria-hidden="true"><i style="width:' + (answered / items.length * 100) + '%"></i></div>' +
        '<div class="qcard"><div class="stack-sm"><p class="thesis-title">' + esc(kat.name) + '</p><h1 class="qtext" tabindex="-1">' + esc(it.q) + '</h1></div>';

      if (it.matrix) h += '<div class="figure">' + matrixSvg(it.matrix) + '</div>';
      if (it.fig) h += '<div class="figure"><div class="stack-sm" style="align-items:center;width:100%"><span class="tiny faint">Vorlage</span>' + svg(draw(it.fig), '0 0 100 100', 'Vorlage', 'max-width:210px') + '</div></div>';
      if (it.seq) h += '<p class="series">' + esc(it.seq) + '</p>';

      if (isFig) {
        h += '<div class="figopts ' + optCls(it) + '" role="group" aria-label="Antwortmöglichkeiten">';
        order.forEach(function (oi, j) {
          h += '<button type="button" class="figopt" data-opt="' + oi + '" aria-pressed="' + (chosen === oi ? 'true' : 'false') + '" aria-label="Antwort ' + LETTERS[j] + '">' + svg(draw(it.o[oi])) + '<span class="key">' + LETTERS[j] + '</span></button>';
        });
        h += '</div>';
      } else {
        h += '<div class="opts" role="group" aria-label="Antwortmöglichkeiten">';
        order.forEach(function (oi, j) {
          h += '<button type="button" class="opt' + (chosen === oi ? ' chosen' : '') + '" data-opt="' + oi + '" aria-pressed="' + (chosen === oi ? 'true' : 'false') + '"><span class="key">' + LETTERS[j] + '</span><span>' + esc(it.o[oi]) + '</span></button>';
        });
        h += '</div>';
      }
      h += '</div>';

      h += '<div class="spread"><div class="btn-row">' +
        '<button class="btn btn-quiet" type="button" data-prev' + (run.idx === 0 ? ' disabled' : '') + '>' + PS.icon('left') + 'Zurück</button>' +
        (run.idx < items.length - 1 ? '<button class="btn" type="button" data-next>' + (chosen === undefined ? 'Überspringen' : 'Weiter') + PS.icon('right') + '</button>' : '') +
        '</div><button class="btn' + (answered === items.length ? ' btn-primary' : ' btn-quiet') + '" type="button" data-finish>' + PS.icon('check') + 'Test abgeben</button></div>';

      h += '<section class="stack-sm"><p class="small muted">Übersicht: ' + answered + ' von ' + items.length + ' beantwortet. Auf eine Nummer tippen, um zu springen.</p><div class="dots">';
      items.forEach(function (x, i) {
        var cls = 'dot' + (run.ans[x.id] !== undefined ? ' done' : '') + (i === run.idx ? ' cur' : '');
        h += '<button type="button" class="' + cls + '" data-jumpto="' + i + '" aria-label="Aufgabe ' + (i + 1) + (run.ans[x.id] !== undefined ? ', beantwortet' : ', offen') + '">' + (i + 1) + '</button>';
      });
      h += '</div></section>';

      h += '<div class="panel panel-tight" data-confirm hidden><div class="stack-sm"><p><b>Test wirklich abgeben?</b></p><p class="small muted" data-confirm-text></p><div class="btn-row"><button class="btn btn-primary btn-sm" type="button" data-finish-yes>Ja, abgeben</button><button class="btn btn-sm" type="button" data-finish-no>Weiter bearbeiten</button></div></div></div>';
      h += '</div>';
      main.innerHTML = h;

      if (focusTop) {
        window.scrollTo(0, 0);
        var q = PS.qs('.qtext', main);
        if (q) { try { q.focus({ preventScroll: true }); } catch (e) { /* ignorieren */ } }
      }
    }

    function go(i) {
      clearTimeout(advanceTimer);
      run.idx = Math.max(0, Math.min(items.length - 1, i));
      save();
      render(true);
    }

    function choose(oi) {
      var it = items[run.idx];
      run.ans[it.id] = oi;
      save();
      PS.qsa('[data-opt]', main).forEach(function (b) {
        var on = Number(b.getAttribute('data-opt')) === oi;
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
        b.classList.toggle('chosen', on && b.classList.contains('opt'));
      });
      clearTimeout(advanceTimer);
      advanceTimer = setTimeout(function () {
        if (run.idx < items.length - 1) go(run.idx + 1);
        else render(false);
      }, 320);
    }

    function askFinish() {
      var open = items.length - Object.keys(run.ans).length;
      var box = PS.qs('[data-confirm]', main);
      PS.qs('[data-confirm-text]', main).textContent = open > 0
        ? 'Noch ' + open + (open === 1 ? ' Aufgabe ist' : ' Aufgaben sind') + ' unbeantwortet. Diese zählen als nicht gelöst.'
        : 'Alle Aufgaben sind beantwortet. Sie erhalten jetzt Ihre Auswertung.';
      box.hidden = false;
      box.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }

    function onClick(e) {
      var b = e.target.closest && e.target.closest('button');
      if (!b || !main.contains(b)) return;
      if (b.hasAttribute('data-opt')) choose(Number(b.getAttribute('data-opt')));
      else if (b.hasAttribute('data-prev')) go(run.idx - 1);
      else if (b.hasAttribute('data-next')) go(run.idx + 1);
      else if (b.hasAttribute('data-jumpto')) go(Number(b.getAttribute('data-jumpto')));
      else if (b.hasAttribute('data-finish')) askFinish();
      else if (b.hasAttribute('data-finish-yes')) finish('fertig');
      else if (b.hasAttribute('data-finish-no')) PS.qs('[data-confirm]', main).hidden = true;
    }
    main.addEventListener('click', onClick);

    function onKey(e) {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      var tag = (e.target && e.target.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      var k = e.key;
      var order = run.order[items[run.idx].id];
      var n = -1;
      if (/^[1-6]$/.test(k)) n = Number(k) - 1;
      else if (/^[a-fA-F]$/.test(k)) n = k.toUpperCase().charCodeAt(0) - 65;
      if (n >= 0 && n < order.length) { e.preventDefault(); choose(order[n]); return; }
      if (k === 'ArrowRight') { e.preventDefault(); if (run.idx < items.length - 1) go(run.idx + 1); }
      else if (k === 'ArrowLeft') { e.preventDefault(); if (run.idx > 0) go(run.idx - 1); }
    }
    document.addEventListener('keydown', onKey);

    ticker = setInterval(function () {
      var rest = remaining(run);
      var t = PS.qs('[data-timer]', main);
      if (t) {
        t.lastChild.textContent = fmtTime(rest);
        t.classList.toggle('low', rest <= 120);
      }
      if (rest <= 0) finish('zeit');
    }, 500);

    PS.onLeave(function () {
      clearInterval(ticker);
      clearTimeout(advanceTimer);
      document.removeEventListener('keydown', onKey);
      main.removeEventListener('click', onClick);
    });

    render(false);
  });

  /* ---------- Ergebnis ---------- */
  function bellSvg(iq) {
    var X = function (v) { return 30 + (v - 55) * 6; };
    var Y = function (v) { var z = (v - 100) / 15; return 150 - 118 * Math.exp(-z * z / 2); };
    var curve = '', you = '';
    for (var v = 55; v <= 145; v += 1) {
      curve += (v === 55 ? 'M' : 'L') + r2(X(v)) + ' ' + r2(Y(v));
      if (v <= iq) you += (v === 55 ? 'M' + r2(X(55)) + ' 150L' : 'L') + r2(X(v)) + ' ' + r2(Y(v));
    }
    you += 'L' + r2(X(iq)) + ' ' + r2(Y(iq)) + 'L' + r2(X(iq)) + ' 150Z';
    var out = '<path class="curve" style="stroke:none" d="' + curve + 'L' + X(145) + ' 150L' + X(55) + ' 150Z"/>' +
      '<path class="curve-you" d="' + you + '"/>' +
      '<path class="curve" style="fill:none" d="' + curve + '"/>' +
      '<line class="axis" x1="20" y1="150" x2="580" y2="150"/>';
    [70, 85, 100, 115, 130].forEach(function (t) {
      out += '<line class="axis" x1="' + X(t) + '" y1="150" x2="' + X(t) + '" y2="156"/><text class="tick" x="' + X(t) + '" y="170" text-anchor="middle">' + t + '</text>';
    });
    var lx = X(iq);
    var anchor = iq > 132 ? 'end' : iq < 68 ? 'start' : 'middle';
    out += '<line class="you" x1="' + lx + '" y1="150" x2="' + lx + '" y2="20"/><text class="youlbl" x="' + lx + '" y="13" text-anchor="' + anchor + '">Ihr Wert: ' + iq + '</text>';
    return '<svg viewBox="0 0 600 178" role="img" aria-label="Normalverteilung der IQ-Werte mit Markierung bei ' + iq + '">' + out + '</svg>';
  }

  function reviewBody(it, ansIdx) {
    var h = '';
    if (it.matrix) h += '<div class="figure">' + matrixSvg(it.matrix, it.o[it.a]) + '</div>';
    if (it.fig) h += '<div class="figure">' + svg(draw(it.fig), '0 0 100 100', 'Vorlage', 'max-width:180px') + '</div>';
    if (it.seq) h += '<p class="series">' + esc(it.seq) + '</p>';
    var isFig = typeof it.o[0] !== 'string';
    h += isFig ? '<div class="figopts ' + optCls(it) + '">' : '<div class="opts">';
    it.o.forEach(function (o, i) {
      var cls = i === it.a ? ' correct' : (i === ansIdx ? ' wrong' : '');
      var tag = i === it.a ? 'richtige Lösung' : (i === ansIdx ? 'Ihre Antwort' : '');
      if (isFig) {
        h += '<div class="figopt' + cls + '" style="cursor:default">' + svg(draw(o)) + '<span class="key">' + (tag || '&nbsp;') + '</span></div>';
      } else {
        h += '<div class="opt' + cls + '" style="cursor:default"><span class="key">' + (i === it.a ? '✓' : i === ansIdx ? '✕' : '') + '</span><span>' + esc(o) + (tag ? ' <span class="tiny faint">(' + tag + ')</span>' : '') + '</span></div>';
      }
    });
    h += '</div>';
    if (ansIdx === undefined || ansIdx === null) h += '<p class="small muted">Nicht beantwortet.</p>';
    h += '<div class="feedback"><p><b>Erklärung:</b> ' + esc(it.e) + '</p></div>';
    return h;
  }

  PS.route('iq-ergebnis', { title: 'IQ-Test · Ergebnis', section: 'iq' }, function (main) {
    var res = PS.store.get(RES, null);
    if (!res || typeof res.richtig !== 'number') {
      main.innerHTML = '<div class="page"><div class="stack"><p class="eyebrow">IQ-Test</p><h1 class="h1-sm">Noch kein Ergebnis</h1><p class="lead">Sobald Sie den Test abgeschlossen haben, finden Sie hier Ihre Auswertung.</p><div class="btn-row"><a class="btn btn-primary" href="#iq">Zum IQ-Test</a></div></div></div>';
      return;
    }
    var iq = iqFrom(res.richtig);
    var z = (iq - 100) / 15;
    var pr = Math.round(phi(z) * 100);
    pr = Math.max(1, Math.min(99, pr));
    var lo = Math.max(55, iq - 6), hi = Math.min(145, iq + 6);
    var minutes = Math.floor(res.dauer / 60), secs = res.dauer % 60;

    var h = '<div class="page">' +
      '<header class="stack"><p class="eyebrow">IQ-Test · Ergebnis vom ' + esc(fmtDate(res.datum)) + '</p><h1>Ihr Ergebnis</h1>' +
      '<p class="lead">Sie haben <b>' + res.richtig + ' von ' + res.gesamt + '</b> Aufgaben richtig gelöst' +
      (res.grund === 'zeit' ? ' – die Zeit war abgelaufen, offene Aufgaben zählen als nicht gelöst' : '') +
      '. Bearbeitungszeit: ' + minutes + ' min ' + secs + ' s.</p></header>';

    h += '<div class="grid-2">' +
      '<div class="panel panel-ink stack"><p class="eyebrow">Geschätzter IQ</p><p class="scorebig">' + iq + '</p>' +
      '<p>Bereich etwa <b class="num">' + lo + '–' + hi + '</b> · ' + esc(klasse(iq)) + '</p>' +
      '<p class="small muted">Das entspräche einem Prozentrang von etwa ' + pr + ': Rund ' + pr + ' % einer Vergleichsgruppe würden einen niedrigeren Wert erreichen – unter der Annahme, dass die Rohwerte so verteilt sind wie hier angenommen.</p></div>' +
      '<div class="panel stack"><p class="eyebrow">Einordnung in die Normalverteilung</p><div class="bell">' + bellSvg(iq) + '</div>' +
      '<p class="tiny faint">IQ-Werte sind so skaliert, dass der Durchschnitt bei 100 liegt; etwa zwei Drittel der Menschen liegen zwischen 85 und 115.</p></div></div>';

    h += '<section class="section"><h2>Profil nach Bereichen</h2><div class="profile">';
    Object.keys(D.kategorien).forEach(function (k) {
      var p = res.perKat[k] || { r: 0, n: 0 };
      var pct = p.n ? Math.round(p.r / p.n * 100) : 0;
      h += '<div class="profile-row"><span><b>' + esc(D.kategorien[k].name) + '</b></span><div class="res-bar" aria-hidden="true"><i style="width:' + pct + '%"></i></div><span class="num mono">' + p.r + '/' + p.n + '</span></div>';
    });
    h += '</div><p class="small faint">Die Bereiche enthalten unterschiedlich viele Aufgaben. Bei wenigen Aufgaben pro Bereich sind die Werte nur grobe Hinweise.</p></section>';

    h += '<div class="merke" data-label="So ist der Wert zu verstehen"><p>Der Test ist <b>nicht normiert</b>. Für die Umrechnung wird angenommen, dass Erwachsene im Mittel ' + D.norm.mittel + ' von ' + D.items.length + ' Aufgaben lösen (Standardabweichung ' + D.norm.sd + '). Der tatsächliche Wert in einem geeichten Test kann deutlich abweichen. Werte werden auf 55 bis 145 begrenzt, weil ein kurzer Test an den Rändern nicht sinnvoll unterscheiden kann.</p></div>';

    h += '<section class="section"><div class="spread"><h2>Auflösung aller Aufgaben</h2><span class="small muted">Zum Aufklappen antippen</span></div><div>';
    D.items.forEach(function (it, i) {
      var a = res.ans[it.id];
      var state = a === undefined || a === null ? 'offen' : (a === it.a ? 'richtig' : 'falsch');
      h += '<details class="fold" data-item="' + i + '"><summary><span class="mono faint">' + (i < 9 ? '0' : '') + (i + 1) + '</span><span><b>' + esc(D.kategorien[it.kat].name) + '</b> <span class="muted">– ' + esc(it.seq ? it.seq : it.q) + '</span></span>' +
        '<span class="pill' + (state === 'richtig' ? ' pill-solid' : '') + '">' + (state === 'richtig' ? '✓ richtig' : state === 'falsch' ? '✕ falsch' : 'offen') + '</span><span class="chev">' + PS.icon('chev') + '</span></summary><div class="fold-body stack"></div></details>';
    });
    h += '</div></section>';

    h += '<div class="btn-row"><button class="btn btn-primary" type="button" data-again>' + PS.icon('reset') + 'Test wiederholen</button><a class="btn" href="#tests">Weitere Tests</a><a class="btn btn-quiet" href="#staat-test">Staatskunde-Test</a></div>' +
      '<p class="small faint">Beim Wiederholen sind die Aufgaben bekannt – das Ergebnis fällt dann erfahrungsgemäß besser aus und ist weniger aussagekräftig.</p>';
    h += '</div>';
    main.innerHTML = h;

    PS.qsa('details[data-item]', main).forEach(function (d) {
      d.addEventListener('toggle', function () {
        if (!d.open) return;
        var body = PS.qs('.fold-body', d);
        if (body.getAttribute('data-filled')) return;
        var it = D.items[Number(d.getAttribute('data-item'))];
        body.innerHTML = reviewBody(it, res.ans[it.id]);
        body.setAttribute('data-filled', '1');
      });
    });
    PS.qs('[data-again]', main).addEventListener('click', function () {
      PS.store.set(RUN, newRun());
      PS.go('iq-test');
    });
  });
})();
