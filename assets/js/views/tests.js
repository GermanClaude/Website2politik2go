/* ==========================================================================
   Prüfstand – Weitere Tests: Reaktion, Zahlengedächtnis, Konzentration
   (Schulte-Tabelle), Kopfrechnen, Farb-Wort-Test (Stroop)
   ========================================================================== */
(function () {
  'use strict';
  var PS = window.PS;
  var esc = PS.esc;
  function now() { return (window.performance && performance.now) ? performance.now() : Date.now(); }
  function rnd(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
  function fmtMs(ms) { return Math.round(ms) + ' ms'; }
  function fmtSec(ms) { return PS.fmtNum(ms / 1000, 1) + ' s'; }
  function ignoreKey(e) {
    var tag = (e.target && e.target.tagName) || '';
    return e.altKey || e.ctrlKey || e.metaKey || tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';
  }

  var TESTS = [
    { id: 'reaktion', icon: 'bolt', t: 'Reaktionstest', d: 'Wie schnell reagieren Sie auf ein Signal? Fünf Durchgänge, gemessen in Millisekunden.', dauer: '1 Minute', best: function (v) { return 'Bester Durchschnitt: ' + fmtMs(v); } },
    { id: 'gedaechtnis', icon: 'memory', t: 'Zahlengedächtnis', d: 'Merken Sie sich immer längere Zahlenfolgen – vorwärts oder rückwärts.', dauer: '3 Minuten', best: function (v) { return 'Längste Folge: ' + v + ' Ziffern'; } },
    { id: 'konzentration', icon: 'grid', t: 'Konzentration', d: 'Schulte-Tabelle: Tippen Sie die Zahlen 1 bis 25 so schnell wie möglich der Reihe nach an.', dauer: '1 Minute', best: function (v) { return 'Bestzeit: ' + fmtSec(v); } },
    { id: 'kopfrechnen', icon: 'target', t: 'Kopfrechnen', d: 'So viele Rechenaufgaben wie möglich in 60 Sekunden.', dauer: '1 Minute', best: function (v) { return 'Rekord: ' + v + ' richtige Aufgaben'; } },
    { id: 'stroop', icon: 'brain', t: 'Farb-Wort-Test', d: 'Nennen Sie die Farbe, in der ein Wort geschrieben ist – nicht das Wort selbst. Misst die Störanfälligkeit der Aufmerksamkeit.', dauer: '2 Minuten', best: function (v) { return 'Beste Zeit: ' + fmtMs(v) + ' pro Wort'; } }
  ];
  function testMeta(id) { for (var i = 0; i < TESTS.length; i++) if (TESTS[i].id === id) return TESTS[i]; return null; }
  function header(id, lead) {
    var t = testMeta(id);
    return '<header class="stack"><p class="eyebrow"><a href="#tests" style="text-decoration:none">Weitere Tests</a> · ' + esc(t.dauer) + '</p><h1 class="h1-sm">' + esc(t.t) + '</h1><p class="lead">' + lead + '</p></header>';
  }
  function saveBest(key, value, lowerIsBetter) {
    var old = PS.store.get(key, null);
    var better = old === null || (lowerIsBetter ? value < old : value > old);
    if (better) PS.store.set(key, value);
    return { better: better, old: old };
  }
  function footer() {
    return '<div class="btn-row"><a class="btn btn-quiet" href="#tests">' + PS.icon('left') + 'Alle Tests</a></div>';
  }

  /* ---------- Übersicht ---------- */
  PS.route('tests', { title: 'Weitere Tests', section: 'tests' }, function (main) {
    var h = '<div class="page"><header class="stack"><p class="eyebrow">Denksport</p><h1>Weitere Tests</h1>' +
      '<p class="lead">Kurze Tests für Reaktion, Gedächtnis, Konzentration und Rechnen – jeweils in wenigen Minuten erledigt. Ihre Bestwerte werden nur in diesem Browser gespeichert.</p></header><div class="grid">';
    TESTS.forEach(function (t) {
      var b = PS.store.get('tests:' + t.id, null);
      h += '<a class="tile" href="#' + t.id + '"><div class="tile-kicker"><span class="glyph">' + PS.icon(t.icon) + '</span><h3>' + esc(t.t) + '</h3></div><p>' + esc(t.d) + '</p><span class="tile-meta">' + esc(t.dauer) + (b !== null ? ' · ' + esc(t.best(b)) : '') + '</span></a>';
    });
    h += '<a class="tile" href="#iq"><div class="tile-kicker"><span class="glyph">' + PS.icon('brain') + '</span><h3>IQ-Test</h3></div><p>40 Aufgaben aus sechs Bereichen mit ausführlicher Auswertung.</p><span class="tile-meta">40 Minuten</span></a>';
    h += '<a class="tile" href="#staat-test"><div class="tile-kicker"><span class="glyph">' + PS.icon('quiz') + '</span><h3>Staatskunde-Test</h3></div><p>Fragen zu Grundgesetz, Staatsorganen, Wahlen und Europa.</p><span class="tile-meta">frei wählbar</span></a>';
    h += '</div><div class="note">' + PS.icon('info') + '<p>Die Ergebnisse hängen auch vom Gerät ab: Bildschirm, Maus oder Touchscreen verzögern die Messung um einige Millisekunden. Vergleichen Sie Ihre Werte deshalb am besten auf demselben Gerät. Die Tests dienen dem Training und der Unterhaltung, nicht der Diagnose.</p></div>' +
      '<button class="btn btn-quiet btn-sm" type="button" data-reset style="align-self:flex-start">' + PS.icon('reset') + 'Bestwerte löschen</button></div>';
    main.innerHTML = h;
    var r = PS.qs('[data-reset]', main);
    r.addEventListener('click', function () {
      if (!r.getAttribute('data-sure')) { r.setAttribute('data-sure', '1'); r.lastChild.textContent = 'Wirklich löschen? Nochmals klicken'; return; }
      TESTS.forEach(function (t) { PS.store.del('tests:' + t.id); });
      PS.toast('Bestwerte gelöscht');
      PS.render();
    });
  });

  /* ---------- Reaktionstest ---------- */
  PS.route('reaktion', { title: 'Reaktionstest', section: 'tests' }, function (main) {
    var ROUNDS = 5;
    var state = 'idle', times = [], t0 = 0, timer = null, early = 0;
    main.innerHTML = '<div class="page">' + header('reaktion', 'Sobald das Feld <b>gelb</b> wird, klicken oder tippen Sie so schnell wie möglich darauf – oder drücken die Leertaste. Wer zu früh reagiert, wiederholt die Runde.') +
      '<div class="pad" data-pad role="button" tabindex="0" aria-live="assertive"><div><b data-big>Start</b><span data-small>Klicken, tippen oder Leertaste drücken</span></div></div>' +
      '<div class="spread"><div class="times" data-times aria-label="Bisherige Zeiten"></div><span class="small muted" data-round>Runde 0 von ' + ROUNDS + '</span></div>' +
      '<div data-result></div>' + footer() + '</div>';
    var pad = PS.qs('[data-pad]', main), big = PS.qs('[data-big]', main), small = PS.qs('[data-small]', main);
    var timesEl = PS.qs('[data-times]', main), roundEl = PS.qs('[data-round]', main), resEl = PS.qs('[data-result]', main);

    function set(cls, b, s) { pad.className = 'pad' + (cls ? ' ' + cls : ''); big.textContent = b; small.textContent = s; }
    function drawTimes() {
      timesEl.innerHTML = times.map(function (t) { return '<span class="pill mono">' + fmtMs(t) + '</span>'; }).join('');
      roundEl.textContent = 'Runde ' + times.length + ' von ' + ROUNDS;
    }
    function startRound() {
      state = 'wait';
      set('wait', 'Warten …', 'Noch nicht klicken');
      clearTimeout(timer);
      timer = setTimeout(function () {
        state = 'go';
        set('go', 'Jetzt!', 'Klicken!');
        t0 = now();
      }, 1200 + Math.random() * 3300);
    }
    function finish() {
      state = 'done';
      var avg = times.reduce(function (s, t) { return s + t; }, 0) / times.length;
      var best = Math.min.apply(null, times);
      var r = saveBest('tests:reaktion', Math.round(avg), true);
      var txt = avg < 220 ? 'Außergewöhnlich schnell.' : avg < 280 ? 'Schnell – besser als der Durchschnitt.' : avg < 350 ? 'Im üblichen Bereich.' : 'Etwas langsamer als üblich – Müdigkeit, Ablenkung oder das Gerät spielen oft mit.';
      set('', fmtMs(avg), 'Durchschnitt – klicken für einen neuen Durchgang');
      resEl.innerHTML = '<div class="panel panel-ink stack-sm"><p class="eyebrow">Ergebnis</p><p class="scorebig">' + fmtMs(avg) + '</p><p>' + txt + ' Schnellste Reaktion: <b>' + fmtMs(best) + '</b>' + (early ? ' · ' + early + '× zu früh' : '') + '.</p>' +
        '<p class="small muted">' + (r.better ? (r.old === null ? 'Ihr erster gespeicherter Wert.' : 'Neuer Bestwert! Bisher: ' + fmtMs(r.old) + '.') : 'Ihr Bestwert: ' + fmtMs(r.old) + '.') + ' Typische Reaktionszeiten auf einen einfachen visuellen Reiz liegen bei etwa 200 bis 300 Millisekunden.</p></div>';
    }
    function press() {
      if (state === 'idle' || state === 'between' || state === 'early') { startRound(); return; }
      if (state === 'done') { times = []; early = 0; drawTimes(); resEl.innerHTML = ''; startRound(); return; }
      if (state === 'wait') {
        clearTimeout(timer);
        early++;
        state = 'early';
        set('early', 'Zu früh!', 'Klicken, um die Runde zu wiederholen');
        return;
      }
      if (state === 'go') {
        var dt = now() - t0;
        times.push(dt);
        drawTimes();
        if (times.length >= ROUNDS) finish();
        else { state = 'between'; set('', fmtMs(dt), 'Klicken für Runde ' + (times.length + 1)); }
      }
    }
    pad.addEventListener('pointerdown', function (e) { e.preventDefault(); press(); });
    function onKey(e) {
      if (ignoreKey(e)) return;
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); if (!e.repeat) press(); }
    }
    document.addEventListener('keydown', onKey);
    PS.onLeave(function () { clearTimeout(timer); document.removeEventListener('keydown', onKey); });
  });

  /* ---------- Zahlengedächtnis ---------- */
  PS.route('gedaechtnis', { title: 'Zahlengedächtnis', section: 'tests' }, function (main) {
    var len = 3, fails = 0, best = 0, seq = '', backward = false, timers = [], running = false;
    main.innerHTML = '<div class="page">' + header('gedaechtnis', 'Ziffern erscheinen nacheinander. Geben Sie danach die ganze Folge ein. Jede richtige Antwort verlängert die Folge um eine Ziffer; nach zwei Fehlern in Folge ist der Test beendet.') +
      '<div class="panel stack" data-box>' +
      '<fieldset class="stack-sm"><legend>Richtung</legend><div class="row"><label class="check"><input type="radio" name="dir" value="f" checked> vorwärts</label><label class="check"><input type="radio" name="dir" value="b"> rückwärts (schwerer)</label></div></fieldset>' +
      '<div class="digits" data-digits aria-live="polite">&nbsp;</div>' +
      '<form class="row" data-form hidden><label class="sr-only" for="dg-in">Ihre Eingabe</label><input id="dg-in" class="input mono" style="max-width:260px;font-size:1.3rem;letter-spacing:.1em" inputmode="numeric" autocomplete="off" pattern="[0-9]*" data-in><button class="btn btn-primary" type="submit">Prüfen</button></form>' +
      '<p class="small muted" data-msg>Bereit? Vorwärts beginnt die erste Folge mit drei Ziffern, rückwärts mit zwei.</p>' +
      '<div class="btn-row"><button class="btn btn-primary" type="button" data-start>' + PS.icon('right') + 'Start</button></div></div>' +
      '<div data-result></div>' + footer() + '</div>';
    var dEl = PS.qs('[data-digits]', main), form = PS.qs('[data-form]', main), inp = PS.qs('[data-in]', main);
    var msg = PS.qs('[data-msg]', main), startBtn = PS.qs('[data-start]', main), resEl = PS.qs('[data-result]', main);

    function clearTimers() { timers.forEach(clearTimeout); timers = []; }
    function makeSeq(n) {
      var s = '', last = -1;
      for (var i = 0; i < n; i++) { var d; do { d = rnd(0, 9); } while (d === last); s += d; last = d; }
      return s;
    }
    function showSeq() {
      seq = makeSeq(len);
      form.hidden = true;
      msg.textContent = 'Merken Sie sich ' + len + ' Ziffern' + (backward ? ' – und geben Sie sie danach rückwärts ein.' : '.');
      dEl.innerHTML = '&nbsp;';
      var step = 900;
      seq.split('').forEach(function (d, i) {
        timers.push(setTimeout(function () { dEl.textContent = d; }, 500 + i * step));
        timers.push(setTimeout(function () { dEl.innerHTML = '&nbsp;'; }, 500 + i * step + 700));
      });
      timers.push(setTimeout(function () {
        dEl.textContent = '?';
        form.hidden = false;
        inp.value = '';
        msg.textContent = 'Ihre Eingabe' + (backward ? ' (rückwärts)' : '') + ':';
        try { inp.focus(); } catch (e) { /* ignorieren */ }
      }, 500 + seq.length * step));
    }
    function end() {
      running = false;
      form.hidden = true;
      startBtn.hidden = false;
      startBtn.lastChild.textContent = 'Noch einmal';
      PS.qsa('input[name=dir]', main).forEach(function (r) { r.disabled = false; });
      dEl.textContent = best || '0';
      var key = backward ? null : 'tests:gedaechtnis';
      var r = key ? saveBest(key, best, false) : { better: false, old: null };
      var typical = backward ? 'Rückwärts schaffen Erwachsene meist etwa 4 bis 6 Ziffern.' : 'Die meisten Erwachsenen können sich vorwärts etwa 5 bis 9 Ziffern merken („7 ± 2“).';
      msg.textContent = 'Test beendet.';
      resEl.innerHTML = '<div class="panel panel-ink stack-sm"><p class="eyebrow">Ergebnis · ' + (backward ? 'rückwärts' : 'vorwärts') + '</p><p class="scorebig">' + best + ' Ziffern</p><p>' + typical + '</p>' +
        (key ? '<p class="small muted">' + (r.better && r.old !== null ? 'Neuer Bestwert! Bisher: ' + r.old + '.' : r.old !== null && !r.better ? 'Ihr Bestwert: ' + r.old + ' Ziffern.' : 'Ihr erster gespeicherter Wert.') + '</p>' : '<p class="small muted">Gespeichert wird nur der Bestwert für „vorwärts“.</p>') + '</div>';
    }
    startBtn.addEventListener('click', function () {
      backward = (PS.qs('input[name=dir]:checked', main) || {}).value === 'b';
      PS.qsa('input[name=dir]', main).forEach(function (r) { r.disabled = true; });
      len = backward ? 2 : 3; fails = 0; best = 0; running = true;
      resEl.innerHTML = '';
      startBtn.hidden = true;
      showSeq();
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!running) return;
      var v = inp.value.replace(/\D/g, '');
      var want = backward ? seq.split('').reverse().join('') : seq;
      form.hidden = true;
      if (v === want) {
        best = Math.max(best, len);
        fails = 0;
        dEl.textContent = '✓';
        msg.textContent = 'Richtig! Weiter mit ' + (len + 1) + ' Ziffern.';
        len++;
        timers.push(setTimeout(showSeq, 1100));
      } else {
        fails++;
        dEl.textContent = want;
        if (fails >= 2) { msg.textContent = 'Leider falsch – das war der zweite Fehler.'; timers.push(setTimeout(end, 1400)); }
        else { msg.textContent = 'Leider falsch. Richtig wäre ' + want + ' gewesen. Noch ein Versuch mit ' + len + ' Ziffern.'; timers.push(setTimeout(showSeq, 2200)); }
      }
    });
    PS.onLeave(clearTimers);
  });

  /* ---------- Konzentration: Schulte-Tabelle ---------- */
  PS.route('konzentration', { title: 'Konzentrationstest', section: 'tests' }, function (main) {
    var next = 1, t0 = 0, errors = 0, ticker = null, running = false;
    main.innerHTML = '<div class="page">' + header('konzentration', 'Die Zahlen 1 bis 25 sind zufällig verteilt. Tippen Sie sie so schnell wie möglich in aufsteigender Reihenfolge an. Profis richten den Blick dabei auf die Mitte und nutzen das periphere Sehen.') +
      '<div class="spread"><p class="timer" data-time>' + PS.icon('clock') + '<span>0,0 s</span></p><p class="small muted" data-next>Gesucht: 1</p></div>' +
      '<div style="display:flex;justify-content:center"><div class="schulte" data-grid></div></div>' +
      '<div class="btn-row" style="justify-content:center"><button class="btn btn-primary" type="button" data-start>' + PS.icon('right') + 'Start</button></div>' +
      '<div data-result></div>' + footer() + '</div>';
    var grid = PS.qs('[data-grid]', main), timeEl = PS.qs('[data-time] span', main), nextEl = PS.qs('[data-next]', main);
    var startBtn = PS.qs('[data-start]', main), resEl = PS.qs('[data-result]', main);

    function build(active) {
      var nums = active ? PS.shuffle(Array.apply(null, Array(25)).map(function (_, i) { return i + 1; })) : Array.apply(null, Array(25)).map(function () { return ''; });
      grid.innerHTML = nums.map(function (n) { return '<button type="button"' + (active ? ' data-n="' + n + '"' : ' disabled') + ' aria-label="' + (n || 'leer') + '">' + n + '</button>'; }).join('');
    }
    function start() {
      next = 1; errors = 0; running = true;
      resEl.innerHTML = '';
      build(true);
      startBtn.hidden = true;
      nextEl.textContent = 'Gesucht: 1';
      t0 = now();
      clearInterval(ticker);
      ticker = setInterval(function () { timeEl.textContent = fmtSec(now() - t0); }, 100);
    }
    function finish() {
      running = false;
      clearInterval(ticker);
      var t = now() - t0;
      timeEl.textContent = fmtSec(t);
      var r = saveBest('tests:konzentration', Math.round(t), true);
      var txt = t < 20000 ? 'Hervorragend – das ist ein sehr schneller Wert.' : t < 30000 ? 'Gut – eine überdurchschnittliche Konzentration.' : t < 45000 ? 'Im üblichen Bereich. Mit etwas Übung werden die meisten deutlich schneller.' : 'Mit regelmäßiger Übung lässt sich die Zeit meist deutlich verkürzen.';
      resEl.innerHTML = '<div class="panel panel-ink stack-sm"><p class="eyebrow">Ergebnis</p><p class="scorebig">' + fmtSec(t) + '</p><p>' + txt + (errors ? ' Fehlklicks: ' + errors + '.' : ' Ohne Fehlklick!') + '</p><p class="small muted">' + (r.better ? (r.old === null ? 'Ihr erster gespeicherter Wert.' : 'Neue Bestzeit! Bisher: ' + fmtSec(r.old) + '.') : 'Ihre Bestzeit: ' + fmtSec(r.old) + '.') + '</p></div>';
      startBtn.hidden = false;
      startBtn.lastChild.textContent = 'Noch einmal';
    }
    grid.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('button[data-n]');
      if (!b || !running) return;
      var n = Number(b.getAttribute('data-n'));
      if (n === next) {
        b.classList.add('hit');
        b.disabled = true;
        next++;
        if (next > 25) finish();
        else nextEl.textContent = 'Gesucht: ' + next;
      } else if (!b.classList.contains('hit')) {
        errors++;
        b.classList.remove('miss');
        void b.offsetWidth;
        b.classList.add('miss');
      }
    });
    startBtn.addEventListener('click', start);
    build(false);
    PS.onLeave(function () { clearInterval(ticker); });
  });

  /* ---------- Kopfrechnen ---------- */
  PS.route('kopfrechnen', { title: 'Kopfrechnen', section: 'tests' }, function (main) {
    var DUR = 60000;
    var t0 = 0, ticker = null, running = false, right = 0, wrong = 0, task = null, log = [];
    main.innerHTML = '<div class="page">' + header('kopfrechnen', 'Sie haben 60 Sekunden. Lösen Sie so viele Aufgaben wie möglich – Addition, Subtraktion, kleines Einmaleins und Division ohne Rest. Bestätigen Sie mit der Eingabetaste.') +
      '<div class="panel stack"><div class="spread"><p class="timer" data-time>' + PS.icon('clock') + '<span>60 s</span></p><p class="small"><b data-right>0</b> richtig · <span data-wrong>0</span> falsch</p></div>' +
      '<div class="digits" data-task aria-live="polite">&nbsp;</div>' +
      '<form class="row" data-form hidden style="justify-content:center"><label class="sr-only" for="kr-in">Ergebnis</label><input id="kr-in" class="input mono" style="max-width:200px;font-size:1.4rem;text-align:center" inputmode="numeric" autocomplete="off" data-in><button class="btn btn-primary" type="submit">OK</button></form>' +
      '<div class="btn-row" style="justify-content:center"><button class="btn btn-primary" type="button" data-start>' + PS.icon('right') + 'Start</button></div></div>' +
      '<div data-result></div>' + footer() + '</div>';
    var timeEl = PS.qs('[data-time] span', main), taskEl = PS.qs('[data-task]', main), form = PS.qs('[data-form]', main), inp = PS.qs('[data-in]', main);
    var rEl = PS.qs('[data-right]', main), wEl = PS.qs('[data-wrong]', main), startBtn = PS.qs('[data-start]', main), resEl = PS.qs('[data-result]', main);

    function newTask() {
      var op = rnd(0, 3), a, b, res, sym;
      if (op === 0) { a = rnd(3, 89); b = rnd(2, 99 - a); res = a + b; sym = '+'; }
      else if (op === 1) { a = rnd(12, 99); b = rnd(2, a - 1); res = a - b; sym = '−'; }
      else if (op === 2) { a = rnd(2, 12); b = rnd(2, 12); res = a * b; sym = '×'; }
      else { b = rnd(2, 12); res = rnd(2, 12); a = b * res; sym = ':'; }
      task = { text: a + ' ' + sym + ' ' + b, res: res };
      taskEl.textContent = task.text + ' = ?';
      inp.value = '';
    }
    function start() {
      right = 0; wrong = 0; log = []; running = true;
      rEl.textContent = '0'; wEl.textContent = '0';
      resEl.innerHTML = '';
      startBtn.hidden = true;
      form.hidden = false;
      newTask();
      try { inp.focus(); } catch (e) { /* ignorieren */ }
      t0 = now();
      clearInterval(ticker);
      ticker = setInterval(function () {
        var rest = DUR - (now() - t0);
        timeEl.textContent = Math.max(0, Math.ceil(rest / 1000)) + ' s';
        if (rest <= 0) finish();
      }, 200);
    }
    function finish() {
      running = false;
      clearInterval(ticker);
      form.hidden = true;
      taskEl.textContent = 'Zeit!';
      var r = saveBest('tests:kopfrechnen', right, false);
      var wrongs = log.filter(function (l) { return !l.ok; });
      resEl.innerHTML = '<div class="panel panel-ink stack-sm"><p class="eyebrow">Ergebnis</p><p class="scorebig">' + right + ' richtig</p><p>' + wrong + ' falsch · ' + (right + wrong ? Math.round(right / (right + wrong) * 100) : 0) + ' % Trefferquote</p>' +
        '<p class="small muted">' + (r.better ? (r.old === null ? 'Ihr erster gespeicherter Wert.' : 'Neuer Rekord! Bisher: ' + r.old + '.') : 'Ihr Rekord: ' + r.old + ' richtige Aufgaben.') + '</p>' +
        (wrongs.length ? '<p class="small">Falsch beantwortet: ' + wrongs.map(function (l) { return '<span class="mono">' + esc(l.text) + ' = ' + l.res + '</span> (Ihre Antwort: ' + esc(l.given || '–') + ')'; }).join(' · ') + '</p>' : '') + '</div>';
      startBtn.hidden = false;
      startBtn.lastChild.textContent = 'Noch einmal';
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!running) return;
      var given = inp.value.trim();
      if (given === '') return;
      var ok = Number(given.replace(',', '.')) === task.res;
      log.push({ text: task.text, res: task.res, given: given, ok: ok });
      if (ok) { right++; rEl.textContent = right; } else { wrong++; wEl.textContent = wrong; }
      newTask();
    });
    startBtn.addEventListener('click', start);
    PS.onLeave(function () { clearInterval(ticker); });
  });

  /* ---------- Farb-Wort-Test (Stroop) ---------- */
  PS.route('stroop', { title: 'Farb-Wort-Test', section: 'tests' }, function (main) {
    var COLORS = [
      { n: 'Rot', w: 'ROT', c: '#D0342C' },
      { n: 'Blau', w: 'BLAU', c: '#2F6FE0' },
      { n: 'Grün', w: 'GRÜN', c: '#1E9E4A' },
      { n: 'Gelb', w: 'GELB', c: '#D69E00' }
    ];
    var N = 24;
    var trials = [], i = 0, t0 = 0, running = false, timer = null, locked = true;
    main.innerHTML = '<div class="page">' + header('stroop', 'Ein Farbwort erscheint in einer Schriftfarbe. Wählen Sie die <b>Schriftfarbe</b> – nicht das, was dort steht. Das klingt leicht, doch das Gehirn liest automatisch mit (Stroop-Effekt). Tasten 1–4 funktionieren auch.') +
      '<div class="panel stack"><div class="spread"><p class="small muted" data-prog>' + N + ' Wörter</p><p class="small muted">Farbsehen erforderlich</p></div>' +
      '<div class="digits" data-word style="font-family:var(--sans);letter-spacing:.04em" aria-live="polite">&nbsp;</div>' +
      '<div class="choices" data-choices style="grid-template-columns:repeat(4,minmax(0,1fr))" hidden>' +
      COLORS.map(function (c, k) { return '<button class="choice" type="button" data-c="' + k + '">' + c.n + '<span class="kbd" aria-hidden="true">' + (k + 1) + '</span></button>'; }).join('') + '</div>' +
      '<div class="btn-row" style="justify-content:center"><button class="btn btn-primary" type="button" data-start>' + PS.icon('right') + 'Start</button></div></div>' +
      '<div data-result></div>' + footer() + '</div>';
    var wordEl = PS.qs('[data-word]', main), choices = PS.qs('[data-choices]', main), prog = PS.qs('[data-prog]', main);
    var startBtn = PS.qs('[data-start]', main), resEl = PS.qs('[data-result]', main);

    function makeTrials() {
      var list = [];
      for (var k = 0; k < N; k++) {
        var word = rnd(0, 3), ink;
        if (k < N / 2) ink = word;
        else { do { ink = rnd(0, 3); } while (ink === word); }
        list.push({ word: word, ink: ink, cong: word === ink });
      }
      return PS.shuffle(list);
    }
    function show() {
      var t = trials[i];
      wordEl.style.color = COLORS[t.ink].c;
      wordEl.textContent = COLORS[t.word].w;
      prog.textContent = 'Wort ' + (i + 1) + ' von ' + N;
      t0 = now();
      locked = false;
    }
    function start() {
      trials = makeTrials(); i = 0; running = true; locked = true;
      resEl.innerHTML = '';
      startBtn.hidden = true;
      choices.hidden = false;
      wordEl.style.color = '';
      wordEl.textContent = '3 · 2 · 1';
      clearTimeout(timer);
      timer = setTimeout(show, 900);
    }
    function avg(arr) { return arr.length ? arr.reduce(function (s, x) { return s + x; }, 0) / arr.length : 0; }
    function finish() {
      running = false;
      choices.hidden = true;
      wordEl.style.color = '';
      wordEl.textContent = 'Fertig';
      var ok = trials.filter(function (t) { return t.ok; });
      var cong = ok.filter(function (t) { return t.cong; }).map(function (t) { return t.rt; });
      var inc = ok.filter(function (t) { return !t.cong; }).map(function (t) { return t.rt; });
      var all = avg(ok.map(function (t) { return t.rt; }));
      var eff = avg(inc) - avg(cong);
      var r = ok.length >= N * 0.75 ? saveBest('tests:stroop', Math.round(all), true) : { better: false, old: PS.store.get('tests:stroop', null) };
      resEl.innerHTML = '<div class="panel panel-ink stack-sm"><p class="eyebrow">Ergebnis</p><p class="scorebig">' + ok.length + '/' + N + '</p>' +
        '<p>richtig · im Schnitt <b>' + fmtMs(all) + '</b> pro Wort</p>' +
        '<div class="table-wrap"><table class="table-compact"><tbody>' +
        '<tr><th>Wort und Farbe gleich</th><td class="n">' + (cong.length ? fmtMs(avg(cong)) : '–') + '</td></tr>' +
        '<tr><th>Wort und Farbe verschieden</th><td class="n">' + (inc.length ? fmtMs(avg(inc)) : '–') + '</td></tr>' +
        '<tr><th>Stroop-Effekt (Differenz)</th><td class="n"><b>' + (cong.length && inc.length ? (eff >= 0 ? '+' : '') + fmtMs(eff) : '–') + '</b></td></tr>' +
        '</tbody></table></div>' +
        '<p class="small muted">Bei widersprüchlichen Wörtern brauchen fast alle Menschen länger – oft 50 bis 150 Millisekunden. Je kleiner die Differenz, desto besser gelingt es Ihnen, das automatische Lesen zu unterdrücken. ' +
        (r.better && r.old !== null ? 'Neuer Bestwert! Bisher: ' + fmtMs(r.old) + '.' : r.old !== null && !r.better ? 'Ihr Bestwert: ' + fmtMs(r.old) + ' pro Wort.' : '') + '</p></div>';
      startBtn.hidden = false;
      startBtn.lastChild.textContent = 'Noch einmal';
    }
    function answer(k) {
      if (!running || locked || i >= trials.length) return;
      var t = trials[i];
      t.rt = now() - t0;
      t.ok = k === t.ink;
      if (!t.ok) {
        locked = true;
        wordEl.style.color = '';
        wordEl.textContent = '✕';
        i++;
        clearTimeout(timer);
        timer = setTimeout(function () { if (i >= trials.length) finish(); else show(); }, 450);
        return;
      }
      i++;
      if (i >= trials.length) finish();
      else show();
    }
    choices.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('button[data-c]');
      if (b) answer(Number(b.getAttribute('data-c')));
    });
    function onKey(e) {
      if (ignoreKey(e)) return;
      if (/^[1-4]$/.test(e.key) && running) { e.preventDefault(); answer(Number(e.key) - 1); }
    }
    document.addEventListener('keydown', onKey);
    startBtn.addEventListener('click', start);
    PS.onLeave(function () { clearTimeout(timer); document.removeEventListener('keydown', onKey); });
  });
})();
