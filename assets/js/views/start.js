/* ==========================================================================
   Prüfstand – Startseite
   ========================================================================== */
(function () {
  'use strict';
  var PS = window.PS;
  var esc = PS.esc;

  function countArticles() {
    var n = 0;
    PS.gg.abschnitte.forEach(function (a) { a.arts.forEach(function (x) { if (!x.rep) n++; }); });
    return n;
  }

  PS.route('start', { title: '', section: 'start' }, function (main) {
    var W = PS.wahl, S = PS.staat;

    var rows = [
      { href: '#wahl', t: 'Parteien-Test', s: W.thesen.length + ' Thesen · ' + W.parteien.length + ' Parteien · neutral und nachvollziehbar' },
      { href: '#staat-test', t: 'Staatskunde-Test', s: PS.quiz.length + ' Fragen zu Grundgesetz, Staat und Europa' },
      { href: '#iq', t: 'IQ-Test', s: PS.iq.items.length + ' Aufgaben · ' + Math.round(PS.iq.zeit / 60) + ' Minuten · sechs Bereiche' },
      { href: '#tests', t: 'Denksport-Tests', s: 'Reaktion, Gedächtnis, Konzentration, Kopfrechnen, Farb-Wort-Test' },
      { href: '#staat-lernen', t: 'Lerneinheiten', s: PS.lernen.length + ' Einheiten mit Merksätzen und Übungsfragen' }
    ];

    var h = '<div class="page">' +
      '<section class="hero">' +
      '<div class="hero-copy">' +
      '<p class="eyebrow">Unabhängig · werbefrei · ohne Anmeldung</p>' +
      '<h1>Politik verstehen. Wissen prüfen. Denken trainieren.</h1>' +
      '<p class="lead">Ein neutraler Parteien-Test zu ' + W.thesen.length + ' aktuellen Streitfragen, eine verständliche Einführung in Staat und Recht in Deutschland – mit Grundgesetz, wichtigen Gesetzen, Lerneinheiten und Staatskunde-Test – sowie ein IQ-Test und kleine Denksport-Tests.</p>' +
      '<div class="btn-row"><a class="btn btn-primary" href="#wahl">' + PS.icon('ballot') + 'Parteien-Test starten</a><a class="btn" href="#staat">' + PS.icon('para') + 'Staat &amp; Recht entdecken</a></div>' +
      '<div class="facts">' +
      '<span><b>' + countArticles() + '</b> Artikel des Grundgesetzes erklärt</span>' +
      '<span><b>' + PS.gesetze.liste.length + '</b> Gesetze kurz vorgestellt</span>' +
      '<span><b>' + S.glossar.length + '</b> Begriffe im Glossar</span>' +
      '</div>' +
      '</div>' +
      '<div class="ballot" role="navigation" aria-label="Tests auf einen Blick">' +
      '<div class="ballot-head"><h2>Stimmzettel</h2><p>Sie haben die Wahl –<br>kreuzen Sie an.</p></div>';
    rows.forEach(function (r, i) {
      h += '<a class="ballot-row" href="' + r.href + '"><span class="ballot-num">' + (i + 1) + '</span><span class="ballot-text"><span class="ballot-title">' + esc(r.t) + '</span><span class="ballot-sub">' + esc(r.s) + '</span></span><span class="ballot-mark"><span class="ballot-circle" aria-hidden="true"></span></span></a>';
    });
    h += '</div></section>';

    h += '<section class="principles" aria-label="Grundsätze">' +
      '<div><h3>Neutral</h3><p>Keine Partei wird bevorzugt: zufällige Reihenfolge, keine Parteifarben, gleiche Regeln für alle. Jede Position ist begründet.</p></div>' +
      '<div><h3>Transparent</h3><p>Die Berechnung ist offengelegt und nachvollziehbar. Sie sehen jederzeit, worauf ein Ergebnis beruht.</p></div>' +
      '<div><h3>Privat</h3><p>Keine Cookies, kein Tracking, keine Anmeldung. Ihre Antworten bleiben ausschließlich in Ihrem Browser.</p></div>' +
      '<div><h3>Aktuell</h3><p>Stand der Inhalte: ' + esc(PS.stand) + '. Quellen sind bei jedem Thema angegeben.</p></div>' +
      '</section>';

    // Fortschritt
    var prog = [];
    var ans = PS.store.get('wahl:antworten', {});
    var nAns = Object.keys(ans).filter(function (k) { return ans[k] && ans[k].v !== undefined; }).length;
    if (nAns) prog.push({ t: 'Parteien-Test', v: nAns + ' von ' + W.thesen.length + ' Thesen bearbeitet', href: nAns >= W.thesen.length ? '#wahl-ergebnis' : '#wahl-test' });
    var done = PS.store.get('lernen:fertig', {});
    var nDone = PS.lernen.filter(function (u) { return done[u.id]; }).length;
    if (nDone) prog.push({ t: 'Lerneinheiten', v: nDone + ' von ' + PS.lernen.length + ' abgeschlossen', href: '#staat-lernen' });
    var st = PS.store.get('staatstest:letztes', null);
    if (st && st.gesamt) prog.push({ t: 'Staatskunde-Test', v: 'zuletzt ' + st.richtig + ' von ' + st.gesamt + ' richtig', href: '#staat-test' });
    var iq = PS.store.get('iq:ergebnis', null);
    if (iq && iq.gesamt) prog.push({ t: 'IQ-Test', v: iq.richtig + ' von ' + iq.gesamt + ' Aufgaben gelöst', href: '#iq-ergebnis' });
    if (prog.length) {
      h += '<section class="section"><div class="spread"><h2>Ihr Fortschritt</h2><span class="small faint">nur in diesem Browser gespeichert</span></div><div class="grid">';
      prog.forEach(function (p) {
        h += '<a class="tile" href="' + p.href + '"><div class="tile-kicker"><span class="glyph">' + PS.icon('check') + '</span><h3>' + esc(p.t) + '</h3></div><p>' + esc(p.v) + '</p><span class="tile-meta">Weiter →</span></a>';
      });
      h += '</div></section>';
    }

    var tiles = [
      ['#staat-aufbau', 'tree', 'Staatsaufbau', 'Gewaltenteilung, Ebenen vom Bund bis zur Gemeinde und wer wen wählt.'],
      ['#staat-organe', 'people', 'Verfassungsorgane', 'Bundestag, Bundesrat, Bundesregierung, Bundespräsident und Bundesverfassungsgericht.'],
      ['#staat-regierung', 'cap', 'Bundesregierung', 'Das Kabinett mit allen Ministerien und die Hierarchie in der Regierung.'],
      ['#staat-laender', 'map', 'Die 16 Länder', 'Hauptstädte, Regierungschefs, Koalitionen und Stimmen im Bundesrat.'],
      ['#staat-gesetzgebung', 'flow', 'Gesetzgebung', 'Wie ein Gesetz entsteht – Schritt für Schritt, mit den Zuständigkeiten.'],
      ['#staat-grundgesetz', 'book', 'Grundgesetz', 'Alle Artikel in verständlicher Sprache, durchsuchbar.'],
      ['#staat-gesetze', 'para', 'Gesetze A–Z', 'Die wichtigsten Gesetze Deutschlands mit zentralen Paragrafen.'],
      ['#staat-lernen', 'list', 'Lerneinheiten', 'Strukturiert lernen, mit Merksätzen und Übungsfragen zu jeder Einheit.'],
      ['#glossar', 'search', 'Glossar', 'Politische und rechtliche Begriffe kurz erklärt.']
    ];
    h += '<section class="section"><div class="spread"><h2>Staat &amp; Recht verstehen</h2><a class="small" href="#staat">Alle Themen</a></div><div class="grid grid-wide">';
    tiles.forEach(function (t) {
      h += '<a class="tile" href="' + t[0] + '"><div class="tile-kicker"><span class="glyph">' + PS.icon(t[1]) + '</span><h3>' + esc(t[2]) + '</h3></div><p>' + esc(t[3]) + '</p></a>';
    });
    h += '</div></section>';

    h += '<section class="panel stack"><h2>Warum „Prüfstand“?</h2><p class="muted">Wer mitreden will, muss wissen, wie der Staat funktioniert und welche Positionen zur Wahl stehen. Prüfstand bündelt beides – und lädt dazu ein, das eigene Wissen und Denken zu prüfen. Die Seite ersetzt keine eigene Recherche: Lesen Sie bei Interesse die Wahlprogramme im Original und nutzen Sie die angegebenen Quellen.</p><div class="btn-row"><a class="btn btn-sm" href="#ueber">Über die Seite</a><a class="btn btn-sm btn-quiet" href="#ueber.methodik">Methodik des Parteien-Tests</a></div></section>';

    h += '</div>';
    main.innerHTML = h;
  });
})();
