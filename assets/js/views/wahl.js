/* ==========================================================================
   Prüfstand – Parteien-Test
   Neutralität: zufällige Reihenfolge der Parteien, keine Parteifarben,
   gleiche Regeln für alle, offengelegte Berechnung, Zufall bei Gleichstand.
   ========================================================================== */
(function () {
  'use strict';
  var PS = window.PS;
  var W = PS.wahl;
  var T = W.thesen;
  var esc = PS.esc;
  var KEY_ANS = 'wahl:antworten';
  var KEY_IDX = 'wahl:idx';
  var KEY_SEL = 'wahl:auswahl';

  var CHOICES = [
    { v: 1, t: 'Stimme zu', k: '1' },
    { v: 0, t: 'Neutral', k: '2' },
    { v: -1, t: 'Stimme nicht zu', k: '3' }
  ];

  /* ---------- Zustand ---------- */
  function getAns() {
    var a = PS.store.get(KEY_ANS, {});
    return a && typeof a === 'object' && !Array.isArray(a) ? a : {};
  }
  function setAns(a) { PS.store.set(KEY_ANS, a); }
  function isAnswered(x) { return !!x && (x.v === 1 || x.v === 0 || x.v === -1); }
  function isVisited(x) { return !!x && x.v !== undefined; }
  function countAnswered(a) { return T.filter(function (t) { return isAnswered(a[t.id]); }).length; }
  function countVisited(a) { return T.filter(function (t) { return isVisited(a[t.id]); }).length; }
  function allIds() { return W.parteien.map(function (p) { return p.id; }); }
  function getSel() {
    var ids = allIds();
    var s = PS.store.get(KEY_SEL, null);
    if (!Array.isArray(s)) return ids;
    s = s.filter(function (id) { return ids.indexOf(id) >= 0; });
    return s.length ? s : ids;
  }
  function partyById(id) {
    for (var i = 0; i < W.parteien.length; i++) if (W.parteien[i].id === id) return W.parteien[i];
    return null;
  }
  function ansLabel(x) {
    if (!x || x.v === undefined) return 'noch offen';
    if (x.v === 1) return 'Stimme zu';
    if (x.v === 0) return 'Neutral';
    if (x.v === -1) return 'Stimme nicht zu';
    return 'übersprungen';
  }
  function ansHtml(x) {
    if (isAnswered(x)) {
      var p = PS.posLabel(x.v);
      return '<span class="pos ' + p.cls + '"><i aria-hidden="true">' + p.sym + '</i>' + ansLabel(x) + '</span>';
    }
    return '<span class="pos pos-na"><i aria-hidden="true"></i>' + ansLabel(x) + '</span>';
  }
  function num2(i) { return (i < 9 ? '0' : '') + (i + 1); }

  /* ---------- Berechnung ---------- */
  // Punkte je These: gleiche Position 2, benachbart (eine Seite neutral) 1, gegensätzlich 0.
  // Doppelt gewichtete Thesen zählen doppelt. Thesen ohne eindeutige Parteiposition
  // werden für diese Partei nicht gewertet.
  function scoreParty(a, pid, filterKat) {
    var pts = 0, max = 0, n = 0;
    T.forEach(function (t) {
      if (filterKat && t.kat !== filterKat) return;
      var x = a[t.id];
      if (!isAnswered(x)) return;
      var p = t.pos[pid];
      if (!p || (p[0] !== 1 && p[0] !== 0 && p[0] !== -1)) return;
      var w = x.w ? 2 : 1;
      pts += (2 - Math.abs(x.v - p[0])) * w;
      max += 2 * w;
      n++;
    });
    return { pct: max ? pts / max * 100 : null, n: n, pts: pts, max: max };
  }
  function ranking(a, sel) {
    var rnd = {};
    var list = sel.map(function (id) {
      rnd[id] = Math.random();
      var s = scoreParty(a, id);
      return { id: id, p: partyById(id), pct: s.pct, n: s.n, pts: s.pts, max: s.max };
    });
    list.sort(function (x, y) {
      var px = x.pct === null ? -1 : x.pct, py = y.pct === null ? -1 : y.pct;
      if (py !== px) return py - px;
      return rnd[x.id] - rnd[y.id];
    });
    var rank = 0, last = null;
    list.forEach(function (r, i) {
      var rounded = r.pct === null ? null : Math.round(r.pct);
      if (rounded !== last) { rank = i + 1; last = rounded; }
      r.rank = rank;
    });
    return list;
  }
  PS.wahlScore = { party: scoreParty, ranking: ranking };

  /* ---------- Einführung ---------- */
  PS.route('wahl', { title: 'Parteien-Test', section: 'wahl' }, function (main) {
    var a = getAns();
    var visited = countVisited(a);
    var answered = countAnswered(a);
    var cats = {};
    T.forEach(function (t) { cats[t.kat] = (cats[t.kat] || 0) + 1; });

    var h = '<div class="page">' +
      '<header class="stack"><p class="eyebrow">Politik · Stand ' + esc(W.stand) + '</p><h1>Parteien-Test</h1>' +
      '<p class="lead">Wie nah sind Ihre Ansichten an den Positionen der Parteien? Beantworten Sie ' + T.length + ' Thesen zu aktuellen politischen Streitfragen und vergleichen Sie Ihre Antworten mit den Positionen von ' + W.parteien.length + ' Parteien – jede Position mit Begründung.</p>' +
      '<div class="facts"><span><b>' + T.length + '</b> Thesen</span><span><b>' + W.parteien.length + '</b> Parteien</span><span><b>' + Object.keys(cats).length + '</b> Themenbereiche</span><span>etwa <b>10</b> Minuten</span></div></header>';

    h += '<div class="btn-row">';
    if (visited > 0 && visited < T.length) {
      h += '<a class="btn btn-primary" href="#wahl-test">' + PS.icon('right') + 'Fortsetzen (' + visited + ' von ' + T.length + ')</a>';
      if (answered >= W.minAntworten) h += '<a class="btn" href="#wahl-ergebnis">Zwischenergebnis</a>';
      h += '<button class="btn btn-quiet" type="button" data-reset>' + PS.icon('reset') + 'Neu beginnen</button>';
    } else if (visited >= T.length) {
      h += '<a class="btn btn-primary" href="#wahl-ergebnis">' + PS.icon('right') + 'Zum Ergebnis</a><a class="btn" href="#wahl-gewichtung">Antworten ansehen</a><button class="btn btn-quiet" type="button" data-reset>' + PS.icon('reset') + 'Neu beginnen</button>';
    } else {
      h += '<a class="btn btn-primary" href="#wahl-test.1">' + PS.icon('right') + 'Test starten</a>';
    }
    h += '</div>';
    h += '<div class="panel panel-tight" data-reset-box hidden><div class="stack-sm"><p><b>Alle Antworten löschen und neu beginnen?</b></p><div class="btn-row"><button class="btn btn-sm btn-primary" type="button" data-reset-yes>Ja, neu beginnen</button><button class="btn btn-sm" type="button" data-reset-no>Abbrechen</button></div></div></div>';

    h += '<div class="grid-2"><section class="section"><h2>So funktioniert der Test</h2><ol class="steps">' +
      '<li><h3>Thesen beantworten</h3><p>Stimmen Sie jeder These zu, bleiben Sie neutral oder lehnen Sie sie ab. Zu jeder These gibt es Hintergrundwissen und Argumente beider Seiten. Thesen, zu denen Sie keine Meinung haben, können Sie überspringen.</p></li>' +
      '<li><h3>Wichtiges gewichten</h3><p>Thesen, die Ihnen besonders wichtig sind, können Sie doppelt zählen lassen.</p></li>' +
      '<li><h3>Parteien auswählen</h3><p>Vergleichen Sie mit allen Parteien oder nur mit einer Auswahl.</p></li>' +
      '<li><h3>Ergebnis prüfen</h3><p>Sie sehen die Übereinstimmung in Prozent, die Werte je Themenbereich und zu jeder These die Position jeder Partei mit Begründung.</p></li>' +
      '</ol></section>';

    h += '<section class="section"><h2>Welche Parteien sind dabei?</h2><p class="muted">' + esc(W.auswahl) + '</p><div class="unitlist">';
    PS.shuffle(W.parteien).forEach(function (p) {
      h += '<div class="unit"><span class="uno" aria-hidden="true">' + PS.icon('ballot') + '</span><div><h3>' + esc(p.kurz) + '</h3><p>' + esc(p.name) + '</p></div><span class="tiny faint num">BTW 2025: ' + esc(p.ergebnis) + '</span></div>';
    });
    h += '</div><p class="small faint">Die Reihenfolge wird bei jedem Aufruf zufällig gemischt.</p></section></div>';

    h += '<section class="merke" data-label="Neutralität">' +
      '<p>Die Thesen sind eigens für diesen Test formuliert. Die Positionen der Parteien stammen aus ihren <b>Wahlprogrammen zur Bundestagswahl 2025</b>; wo ein Programm keine klare Aussage enthält, wurde in wenigen Fällen das Abstimmungsverhalten im Bundestag herangezogen – das steht dann in der Begründung. Enthält beides keine eindeutige Position, wird die These für diese Partei nicht gewertet.</p>' +
      '<p>Alle Parteien werden nach denselben Regeln behandelt: keine Parteifarben, zufällige Reihenfolge, bei Gleichstand entscheidet der Zufall. Der Test ist <b>keine Wahlempfehlung</b>, sondern ein Anlass, sich mit Positionen auseinanderzusetzen. <a href="#ueber.methodik">Zur Methodik</a></p>' +
      '</section>';

    h += '<section class="section"><h2>Themenbereiche</h2><div class="grid">';
    Object.keys(W.kategorien).forEach(function (k) {
      var ts = T.filter(function (t) { return t.kat === k; });
      h += '<div class="panel panel-tight stack-sm"><h3>' + esc(W.kategorien[k]) + '</h3><p class="small muted">' + ts.map(function (t) { return esc(t.titel); }).join(' · ') + '</p></div>';
    });
    h += '</div></section></div>';
    main.innerHTML = h;

    var box = PS.qs('[data-reset-box]', main);
    PS.qsa('[data-reset]', main).forEach(function (b) {
      b.addEventListener('click', function () { box.hidden = false; });
    });
    var yes = PS.qs('[data-reset-yes]', main);
    if (yes) yes.addEventListener('click', function () {
      PS.store.del(KEY_ANS); PS.store.del(KEY_IDX); PS.store.del(KEY_SEL);
      PS.toast('Antworten gelöscht');
      PS.go('wahl-test.1');
    });
    var no = PS.qs('[data-reset-no]', main);
    if (no) no.addEventListener('click', function () { box.hidden = true; });
  });

  /* ---------- Thesen ---------- */
  PS.route('wahl-test', {
    title: function (arg) { var n = parseInt(arg, 10); return 'These ' + (n > 0 && n <= T.length ? n : '') + ' · Parteien-Test'; },
    section: 'wahl'
  }, function (main, arg) {
    var a = getAns();
    var i = parseInt(arg, 10);
    if (isNaN(i) || i < 1 || i > T.length) {
      var first = -1;
      for (var k = 0; k < T.length; k++) if (!isVisited(a[T[k].id])) { first = k; break; }
      i = first >= 0 ? first : Math.min(T.length - 1, Math.max(0, PS.store.get(KEY_IDX, 0)));
      try { window.history.replaceState(null, '', '#wahl-test.' + (i + 1)); } catch (e) { /* ignorieren */ }
    } else {
      i = i - 1;
    }
    PS.store.set(KEY_IDX, i);
    var t = T[i];
    var x = a[t.id] || {};
    var timer = null;

    var h = '<div class="page">' +
      '<div class="thesis-head"><div class="spread"><p class="eyebrow">These ' + (i + 1) + ' von ' + T.length + '</p><a class="small" href="#wahl">Übersicht</a></div>' +
      '<div class="progress" aria-hidden="true"><i style="width:' + (countVisited(a) / T.length * 100) + '%"></i></div></div>' +
      '<article class="thesis-card">' +
      '<p class="thesis-title">' + esc(W.kategorien[t.kat]) + ' · ' + esc(t.titel) + '</p>' +
      '<h1 class="thesis-text">' + esc(t.text) + '</h1>' +
      '<div class="choices" role="group" aria-label="Ihre Antwort">';
    CHOICES.forEach(function (c) {
      h += '<button type="button" class="choice" data-v="' + c.v + '" aria-pressed="' + (x.v === c.v ? 'true' : 'false') + '">' + c.t + '<span class="kbd" aria-hidden="true">' + c.k + '</span></button>';
    });
    h += '</div><div class="thesis-tools">' +
      '<label class="check"><input type="checkbox" data-weight' + (x.w ? ' checked' : '') + '> Diese These doppelt gewichten</label>' +
      '<button type="button" class="linkbtn" data-skipthesis>' + (x.v === null ? 'Übersprungen – weiter' : 'These überspringen') + '</button>' +
      '</div></article>';

    h += '<details class="fold"><summary><span>' + PS.icon('info') + '</span><span><b>Hintergrund und Argumente</b><br><span class="small muted">Worum geht es? Was spricht dafür, was dagegen?</span></span><span class="chev">' + PS.icon('chev') + '</span></summary><div class="fold-body stack">' +
      '<p>' + esc(t.hintergrund) + '</p>' +
      '<div class="proc"><div class="panel panel-tight"><h4>Argumente dafür</h4><ul>' + t.pro.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul></div>' +
      '<div class="panel panel-tight"><h4>Argumente dagegen</h4><ul>' + t.contra.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul></div></div>' +
      '<p class="tiny faint">Die Parteipositionen sehen Sie erst in der Auswertung, damit sie Ihre Antwort nicht beeinflussen.</p>' +
      '</div></details>';

    h += '<div class="spread"><div class="btn-row">' +
      (i > 0 ? '<a class="btn btn-quiet" href="#wahl-test.' + i + '">' + PS.icon('left') + 'Zurück</a>' : '') +
      (i < T.length - 1 ? '<a class="btn btn-quiet" href="#wahl-test.' + (i + 2) + '">Weiter' + PS.icon('right') + '</a>' : '<a class="btn" href="#wahl-gewichtung">Zur Auswertung' + PS.icon('right') + '</a>') +
      '</div><span class="small faint kbd-hint">Tasten 1, 2, 3 · Pfeiltasten blättern</span></div>';

    h += '<nav class="stack-sm" aria-label="Alle Thesen"><div class="dots">';
    T.forEach(function (tt, j) {
      var y = a[tt.id];
      var cls = 'dot' + (isAnswered(y) ? ' done' : (y && y.v === null ? ' skip' : '')) + (j === i ? ' cur' : '');
      h += '<a class="' + cls + '" href="#wahl-test.' + (j + 1) + '" aria-label="These ' + (j + 1) + ': ' + esc(tt.titel) + ' – ' + ansLabel(y) + '"' + (j === i ? ' aria-current="step"' : '') + ' style="text-decoration:none">' + (j + 1) + '</a>';
    });
    h += '</div><p class="tiny faint">Gefüllt: beantwortet · gestrichelt: übersprungen</p></nav></div>';
    main.innerHTML = h;

    function next() {
      if (i < T.length - 1) PS.go('wahl-test.' + (i + 2));
      else PS.go('wahl-gewichtung');
    }
    function setV(v) {
      a = getAns();
      var cur = a[t.id] || {};
      cur.v = v;
      a[t.id] = cur;
      setAns(a);
      PS.qsa('.choice', main).forEach(function (b) {
        b.setAttribute('aria-pressed', Number(b.getAttribute('data-v')) === v ? 'true' : 'false');
      });
      clearTimeout(timer);
      timer = setTimeout(next, v === null ? 0 : 260);
    }
    PS.qsa('.choice', main).forEach(function (b) {
      b.addEventListener('click', function () { setV(Number(b.getAttribute('data-v'))); });
    });
    PS.qs('[data-skipthesis]', main).addEventListener('click', function () { setV(null); });
    PS.qs('[data-weight]', main).addEventListener('change', function (e) {
      a = getAns();
      var cur = a[t.id] || {};
      cur.w = !!e.target.checked;
      a[t.id] = cur;
      setAns(a);
      PS.toast(cur.w ? 'These zählt doppelt' : 'These zählt einfach');
    });

    function onKey(e) {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      var tag = (e.target && e.target.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (e.key === '1') { e.preventDefault(); setV(1); }
      else if (e.key === '2') { e.preventDefault(); setV(0); }
      else if (e.key === '3') { e.preventDefault(); setV(-1); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
      else if (e.key === 'ArrowLeft' && i > 0) { e.preventDefault(); PS.go('wahl-test.' + i); }
    }
    document.addEventListener('keydown', onKey);
    PS.onLeave(function () { clearTimeout(timer); document.removeEventListener('keydown', onKey); });
  });

  /* ---------- Übersicht und Gewichtung ---------- */
  PS.route('wahl-gewichtung', { title: 'Antworten und Gewichtung · Parteien-Test', section: 'wahl' }, function (main) {
    var a = getAns();
    var answered = countAnswered(a);
    var skipped = T.filter(function (t) { return a[t.id] && a[t.id].v === null; }).length;
    var open = T.length - answered - skipped;

    var h = '<div class="page">' +
      '<header class="stack"><p class="eyebrow">Parteien-Test · Schritt 2 von 3</p><h1 class="h1-sm">Antworten prüfen und gewichten</h1>' +
      '<p class="lead">Setzen Sie bei Thesen, die Ihnen besonders wichtig sind, ein Häkchen – sie zählen dann doppelt. Antworten können Sie über den Link ändern.</p>' +
      '<div class="facts"><span><b>' + answered + '</b> beantwortet</span><span><b>' + skipped + '</b> übersprungen</span><span><b>' + open + '</b> offen</span></div></header>';

    if (answered < W.minAntworten) {
      h += '<div class="note">' + PS.icon('info') + '<p>Für ein aussagekräftiges Ergebnis beantworten Sie bitte mindestens ' + W.minAntworten + ' Thesen. Bisher: ' + answered + '.</p></div>';
    }

    h += '<div class="unitlist">';
    T.forEach(function (t, j) {
      var x = a[t.id];
      h += '<div class="unit"><span class="uno">' + num2(j) + '</span><div><h3>' + esc(t.titel) + '</h3><p>' + esc(t.text) + '</p>' +
        '<p class="row" style="margin-top:6px">' + ansHtml(x) + '<a class="small" href="#wahl-test.' + (j + 1) + '">ändern</a></p></div>' +
        '<label class="check small"><input type="checkbox" data-w="' + t.id + '"' + (x && x.w ? ' checked' : '') + (isAnswered(x) ? '' : ' disabled') + '><span>doppelt</span></label></div>';
    });
    h += '</div>';

    h += '<div class="btn-row"><a class="btn btn-quiet" href="#wahl-test">' + PS.icon('left') + 'Zu den Thesen</a>' +
      '<a class="btn btn-primary" href="#wahl-parteien">Weiter: Parteien auswählen' + PS.icon('right') + '</a></div></div>';
    main.innerHTML = h;

    PS.qsa('[data-w]', main).forEach(function (cb) {
      cb.addEventListener('change', function () {
        var id = cb.getAttribute('data-w');
        var cur = getAns();
        cur[id] = cur[id] || {};
        cur[id].w = cb.checked;
        setAns(cur);
      });
    });
  });

  /* ---------- Parteien auswählen ---------- */
  PS.route('wahl-parteien', { title: 'Parteien auswählen · Parteien-Test', section: 'wahl' }, function (main) {
    var sel = getSel();
    var h = '<div class="page">' +
      '<header class="stack"><p class="eyebrow">Parteien-Test · Schritt 3 von 3</p><h1 class="h1-sm">Mit welchen Parteien möchten Sie sich vergleichen?</h1>' +
      '<p class="lead">Standardmäßig sind alle Parteien ausgewählt. Sie können die Auswahl jederzeit ändern.</p></header>' +
      '<div class="btn-row"><button class="btn btn-sm" type="button" data-all>Alle auswählen</button><button class="btn btn-sm btn-quiet" type="button" data-none>Auswahl leeren</button></div>' +
      '<div class="grid">';
    PS.shuffle(W.parteien).forEach(function (p) {
      h += '<label class="panel panel-tight stack-sm" style="cursor:pointer"><span class="check"><input type="checkbox" data-p="' + p.id + '"' + (sel.indexOf(p.id) >= 0 ? ' checked' : '') + '><span>' + esc(p.kurz) + '</span></span>' +
        '<span class="small muted">' + esc(p.name) + '</span>' +
        '<span class="tiny faint">Programm: „' + esc(p.programm) + '“ · <a href="' + esc(p.url) + '" target="_blank" rel="noopener noreferrer">Wahlprogramm</a></span></label>';
    });
    h += '</div><p class="small faint">Die Reihenfolge wird zufällig gemischt. Es werden nur Parteien angezeigt, die bei der Bundestagswahl 2025 mindestens 1 % der Zweitstimmen erhalten haben.</p>' +
      '<p class="small" data-warn hidden>Bitte wählen Sie mindestens eine Partei aus.</p>' +
      '<div class="btn-row"><a class="btn btn-quiet" href="#wahl-gewichtung">' + PS.icon('left') + 'Zurück</a><a class="btn btn-primary" href="#wahl-ergebnis" data-go>Ergebnis anzeigen' + PS.icon('right') + '</a></div></div>';
    main.innerHTML = h;

    var boxes = PS.qsa('[data-p]', main);
    function save() {
      var s = boxes.filter(function (b) { return b.checked; }).map(function (b) { return b.getAttribute('data-p'); });
      PS.store.set(KEY_SEL, s);
      PS.qs('[data-warn]', main).hidden = s.length > 0;
      var go = PS.qs('[data-go]', main);
      go.setAttribute('aria-disabled', s.length ? 'false' : 'true');
      return s;
    }
    boxes.forEach(function (b) { b.addEventListener('change', save); });
    PS.qs('[data-all]', main).addEventListener('click', function () { boxes.forEach(function (b) { b.checked = true; }); save(); });
    PS.qs('[data-none]', main).addEventListener('click', function () { boxes.forEach(function (b) { b.checked = false; }); save(); });
    PS.qs('[data-go]', main).addEventListener('click', function (e) {
      if (!save().length) { e.preventDefault(); PS.toast('Bitte mindestens eine Partei auswählen'); }
    });
  });

  /* ---------- Ergebnis ---------- */
  PS.route('wahl-ergebnis', { title: 'Ergebnis · Parteien-Test', section: 'wahl' }, function (main) {
    var a = getAns();
    var answered = countAnswered(a);
    var weighted = T.filter(function (t) { return isAnswered(a[t.id]) && a[t.id].w; }).length;

    if (answered < W.minAntworten) {
      main.innerHTML = '<div class="page"><div class="stack"><p class="eyebrow">Parteien-Test</p><h1 class="h1-sm">Noch zu wenige Antworten</h1>' +
        '<p class="lead">Für ein aussagekräftiges Ergebnis beantworten Sie bitte mindestens ' + W.minAntworten + ' Thesen. Bisher haben Sie ' + answered + ' beantwortet.</p>' +
        '<div class="btn-row"><a class="btn btn-primary" href="#wahl-test">Weiter beantworten</a><a class="btn" href="#wahl">Zur Übersicht</a></div></div></div>';
      return;
    }

    var sel = getSel();
    var list = ranking(a, sel);

    var h = '<div class="page">' +
      '<header class="stack"><p class="eyebrow">Parteien-Test · Ergebnis</p><h1>Ihre Übereinstimmung mit den Parteien</h1>' +
      '<p class="lead">Grundlage: ' + answered + ' beantwortete ' + (answered === 1 ? 'These' : 'Thesen') + (weighted ? ', davon ' + weighted + ' doppelt gewichtet' : '') + '. Verglichen mit den Positionen aus den ' + esc(W.grundlage) + '.</p></header>';

    h += '<section class="results" aria-label="Übereinstimmung in Prozent">';
    list.forEach(function (r) {
      var pct = r.pct === null ? null : Math.round(r.pct);
      h += '<div class="res-row"><span class="res-rank">' + (pct === null ? '–' : r.rank + '.') + '</span>' +
        '<span class="res-name">' + esc(r.p.kurz) + '<small>Vergleichsbasis: ' + r.n + ' ' + (r.n === 1 ? 'These' : 'Thesen') + (r.n > 0 && r.n < 10 ? ' – geringe Basis' : '') + '</small></span>' +
        '<span class="res-bar" aria-hidden="true"><i data-w="' + (pct === null ? 0 : pct) + '"></i></span>' +
        '<span class="res-pct">' + (pct === null ? '–' : pct + '&nbsp;%') + '</span></div>';
    });
    h += '</section>';

    h += '<div class="note">' + PS.icon('info') + '<p>Das Ergebnis ist <b>keine Wahlempfehlung</b>. Es zeigt nur, wie nah Ihre Antworten an den Programmaussagen liegen. Gleich hohe Werte werden in zufälliger Reihenfolge angezeigt. Thesen, zu denen eine Partei keine eindeutige Aussage getroffen hat, zählen für diese Partei nicht – daher die unterschiedliche Vergleichsbasis. <a href="#ueber.methodik">So wird gerechnet</a></p></div>';

    // Themenprofil
    var kats = Object.keys(W.kategorien);
    h += '<section class="section"><h2>Übereinstimmung nach Themenbereichen</h2><div class="table-wrap"><table class="heat table-compact"><thead><tr><th>Partei</th>';
    kats.forEach(function (k) { h += '<th class="n">' + esc(W.kategorien[k]) + '</th>'; });
    h += '</tr></thead><tbody>';
    list.forEach(function (r) {
      h += '<tr><th>' + esc(r.p.kurz) + '</th>';
      kats.forEach(function (k) {
        var s = scoreParty(a, r.id, k);
        h += '<td class="h">' + (s.pct === null ? '–' : Math.round(s.pct) + ' %') + '</td>';
      });
      h += '</tr>';
    });
    h += '</tbody></table></div><p class="small faint">„–“: In diesem Bereich gibt es keine These, die Sie beantwortet haben und zu der die Partei eine eindeutige Position hat.</p></section>';

    // Thesen im Detail
    h += '<section class="section"><div class="spread"><h2>Die Thesen im Detail</h2><span class="small muted">Positionen mit Begründung</span></div><div>';
    T.forEach(function (t, j) {
      var x = a[t.id];
      h += '<details class="fold"><summary><span class="mono faint">' + num2(j) + '</span><span><b>' + esc(t.titel) + '</b>' + (x && x.w && isAnswered(x) ? ' <span class="pill pill-ink">doppelt</span>' : '') + '<br><span class="small muted">Ihre Antwort: ' + ansLabel(x) + '</span></span><span class="chev">' + PS.icon('chev') + '</span></summary><div class="fold-body stack">' +
        '<p class="h3" style="font-family:var(--serif)">' + esc(t.text) + '</p><ul class="plist">';
      list.forEach(function (r) {
        var p = t.pos[r.id] || [null, ''];
        var rel = '';
        if (isAnswered(x) && (p[0] === 1 || p[0] === 0 || p[0] === -1)) {
          var d = Math.abs(x.v - p[0]);
          rel = '<span class="pill' + (d === 0 ? ' pill-ink' : '') + '">' + (d === 0 ? 'gleiche Position' : d === 1 ? 'teilweise' : 'gegensätzlich') + '</span>';
        }
        h += '<li><div class="spread"><b>' + esc(r.p.kurz) + '</b><span class="row">' + rel + PS.posHtml(p[0]) + '</span></div>' + (p[1] ? '<p class="small muted">' + esc(p[1]) + '</p>' : '') + '</li>';
      });
      h += '</ul></div></details>';
    });
    h += '</div></section>';

    // Gesamtübersicht
    h += '<details class="fold"><summary><span>' + PS.icon('grid') + '</span><span><b>Alle Positionen auf einen Blick</b><br><span class="small muted">Tabelle aller Thesen und Parteien</span></span><span class="chev">' + PS.icon('chev') + '</span></summary><div class="fold-body"><div class="table-wrap"><table class="heat table-compact"><thead><tr><th>These</th><th>Sie</th>';
    list.forEach(function (r) { h += '<th>' + esc(r.p.kurz) + '</th>'; });
    h += '</tr></thead><tbody>';
    T.forEach(function (t, j) {
      var x = a[t.id];
      h += '<tr><th><span class="mono faint">' + num2(j) + '</span> ' + esc(t.titel) + '</th><td class="h">' + (isAnswered(x) ? PS.posHtml(x.v, true) : '<span class="faint">–</span>') + '</td>';
      list.forEach(function (r) { var p = t.pos[r.id] || [null]; h += '<td class="h">' + PS.posHtml(p[0], true) + '</td>'; });
      h += '</tr>';
    });
    h += '</tbody></table></div><p class="small faint" style="margin-top:8px">' + PS.posHtml(1) + ' · ' + PS.posHtml(0) + ' · ' + PS.posHtml(-1) + ' · ' + PS.posHtml(null) + '</p></div></details>';

    h += '<div class="btn-row"><button class="btn" type="button" data-copy>' + PS.icon('copy') + 'Ergebnis als Text kopieren</button>' +
      '<a class="btn btn-quiet" href="#wahl-gewichtung">Antworten ändern</a><a class="btn btn-quiet" href="#wahl-parteien">Parteien ändern</a>' +
      '<button class="btn btn-quiet" type="button" data-reset>' + PS.icon('reset') + 'Neu beginnen</button></div>' +
      '<div class="panel panel-tight" data-reset-box hidden><div class="stack-sm"><p><b>Alle Antworten löschen und neu beginnen?</b></p><div class="btn-row"><button class="btn btn-sm btn-primary" type="button" data-reset-yes>Ja, neu beginnen</button><button class="btn btn-sm" type="button" data-reset-no>Abbrechen</button></div></div></div>';

    h += '<section class="panel stack-sm"><h2 class="h3">Quellen der Parteipositionen</h2><ul class="small" style="padding-left:1.2em">';
    list.forEach(function (r) {
      h += '<li>' + esc(r.p.kurz) + ': „' + esc(r.p.programm) + '“ – <a href="' + esc(r.p.url) + '" target="_blank" rel="noopener noreferrer">Programm öffnen</a></li>';
    });
    W.quellen.forEach(function (q) {
      h += '<li><a href="' + esc(q.url) + '" target="_blank" rel="noopener noreferrer">' + esc(q.titel) + '</a></li>';
    });
    h += '</ul></section></div>';
    main.innerHTML = h;

    // Balken animieren
    requestAnimationFrame(function () {
      PS.qsa('.res-bar i[data-w]', main).forEach(function (i) { i.style.width = i.getAttribute('data-w') + '%'; });
    });

    PS.qs('[data-copy]', main).addEventListener('click', function () {
      var lines = ['Mein Ergebnis im Parteien-Test von Prüfstand (Stand ' + W.stand + '):'];
      list.forEach(function (r) {
        lines.push((r.pct === null ? '–' : r.rank + '.') + ' ' + r.p.kurz + ': ' + (r.pct === null ? 'keine Vergleichsbasis' : Math.round(r.pct) + ' %'));
      });
      lines.push('Grundlage: ' + answered + ' beantwortete Thesen. Keine Wahlempfehlung.');
      PS.copy(lines.join('\n'), 'Ergebnis kopiert');
    });
    var box = PS.qs('[data-reset-box]', main);
    PS.qs('[data-reset]', main).addEventListener('click', function () { box.hidden = false; box.scrollIntoView({ block: 'center', behavior: 'smooth' }); });
    PS.qs('[data-reset-no]', main).addEventListener('click', function () { box.hidden = true; });
    PS.qs('[data-reset-yes]', main).addEventListener('click', function () {
      PS.store.del(KEY_ANS); PS.store.del(KEY_IDX); PS.store.del(KEY_SEL);
      PS.toast('Antworten gelöscht');
      PS.go('wahl-test.1');
    });
  });
})();
