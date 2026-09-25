/* ==========================================================================
   Prüfstand – Über die Seite: Neutralität, Methodik, Quellen, Datenschutz
   ========================================================================== */
(function () {
  'use strict';
  var PS = window.PS;
  var W = PS.wahl;
  var esc = PS.esc;

  function link(url, text) {
    return '<a href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">' + esc(text || url) + '</a>';
  }

  PS.route('ueber', {
    title: function (arg) {
      return { methodik: 'Methodik', quellen: 'Quellen', datenschutz: 'Datenschutz', impressum: 'Impressum', hinweise: 'Hinweise' }[arg] || 'Über Prüfstand';
    },
    section: 'ueber',
    after: function (arg) { if (arg) setTimeout(function () { PS.scrollToId('ueber-' + arg); }, 30); }
  }, function (main) {
    var T = W.thesen;
    var counts = W.parteien.map(function (p) {
      var n = T.filter(function (t) { var v = t.pos[p.id] && t.pos[p.id][0]; return v === 1 || v === 0 || v === -1; }).length;
      return { p: p, n: n };
    });
    var cats = {};
    T.forEach(function (t) { cats[t.kat] = (cats[t.kat] || 0) + 1; });

    var h = '<div class="page">' +
      '<header class="stack"><p class="eyebrow">Info · Version ' + esc(PS.version) + ' · Stand ' + esc(PS.stand) + '</p><h1>Über Prüfstand</h1>' +
      '<p class="lead">Prüfstand ist ein unabhängiges, werbefreies Angebot zur politischen Bildung und zum Denksport. Es bündelt einen neutralen Parteien-Test, eine verständliche Staatskunde mit Grundgesetz, Gesetzen, Lerneinheiten und Test sowie einen IQ-Test und weitere kurze Tests.</p></header>' +
      '<nav class="row" aria-label="Inhalt dieser Seite">' +
      [['neutralitaet', 'Neutralität'], ['methodik', 'Methodik'], ['quellen', 'Quellen'], ['datenschutz', 'Datenschutz'], ['hinweise', 'Hinweise'], ['darstellung', 'Darstellung']].map(function (x) {
        return '<a class="pill pill-ink" style="text-decoration:none" href="#ueber.' + x[0] + '" data-jump="ueber-' + x[0] + '">' + x[1] + '</a>';
      }).join('') + (PS.betreiber && PS.betreiber.name ? '<a class="pill pill-ink" style="text-decoration:none" href="#ueber.impressum" data-jump="ueber-impressum">Impressum</a>' : '') + '</nav>';

    /* Neutralität */
    h += '<section class="section" id="ueber-neutralitaet"><hr class="rule-ink"><h2>Neutralität</h2><div class="prose">' +
      '<p>Prüfstand bevorzugt keine Partei und gibt keine Wahlempfehlung. Dafür gelten feste Regeln:</p><ul>' +
      '<li><b>Gleiche Regeln für alle:</b> Aufgenommen sind alle Parteien, die bei der Bundestagswahl 2025 bundesweit mindestens 1 % der Zweitstimmen erhalten haben. Alle werden nach demselben Verfahren bewertet.</li>' +
      '<li><b>Keine Parteifarben, keine Logos:</b> Positionen werden mit einheitlichen Symbolen dargestellt, damit keine Partei optisch hervorsticht.</li>' +
      '<li><b>Zufällige Reihenfolge:</b> Wo Parteien aufgelistet werden, wird die Reihenfolge bei jedem Aufruf gemischt. Im Ergebnis entscheidet bei Gleichstand der Zufall.</li>' +
      '<li><b>Ausgewogene Informationen:</b> Zu jeder These gibt es sachliches Hintergrundwissen und gleich viele Argumente dafür und dagegen. Die Parteipositionen werden erst nach der eigenen Antwort gezeigt.</li>' +
      '<li><b>Belegte Positionen:</b> Jede Parteiposition ist mit einer kurzen Begründung aus dem Wahlprogramm versehen. Wo die Einordnung unklar war, wurde sie als „keine eindeutige Aussage“ markiert statt geraten.</li>' +
      '<li><b>Sachliche Staatskunde:</b> Die Inhalte zu Staat und Recht beschreiben Regeln, Institutionen und Fakten. Politische Bewertungen werden vermieden oder – wo Streit besteht – als unterschiedliche Positionen dargestellt.</li>' +
      '</ul></div></section>';

    /* Methodik */
    h += '<section class="section" id="ueber-methodik"><hr class="rule-ink"><h2>Methodik des Parteien-Tests</h2><div class="prose">' +
      '<h3>Thesen</h3><p>Der Test umfasst ' + T.length + ' Thesen aus ' + Object.keys(cats).length + ' Themenbereichen (' + Object.keys(W.kategorien).map(function (k) { return esc(W.kategorien[k]) + ': ' + cats[k]; }).join(', ') + '). Sie sind eigens für Prüfstand formuliert und behandeln Fragen, zu denen sich die Parteien in ihren Programmen unterscheiden. Einige Thesen sind so formuliert, dass Zustimmung eher „links“, andere so, dass Zustimmung eher „rechts“ oder „liberal“ verortete Positionen ausdrückt – die Richtung einer These sagt nichts über ihre Richtigkeit aus.</p>' +
      '<h3>Positionen der Parteien</h3><p>Grundlage sind die ' + esc(W.grundlage) + '. Jede Partei erhält je These eine von vier Einordnungen: stimmt zu, neutral (etwa bei Zustimmung mit deutlichen Einschränkungen), lehnt ab oder keine eindeutige Aussage. Enthielt ein Programm keine klare Aussage, wurde in Ausnahmefällen das Abstimmungsverhalten der Bundestagsfraktion herangezogen; das ist in der Begründung vermerkt.</p>' +
      '<h3>Berechnung</h3><p>Für jede These, die Sie beantwortet haben und zu der eine Partei eine eindeutige Position hat, gibt es Punkte:</p>' +
      '<div class="table-wrap"><table class="table-compact"><thead><tr><th>Ihre Antwort und Parteiposition</th><th class="n">Punkte</th></tr></thead><tbody>' +
      '<tr><td>gleich (z. B. beide „stimme zu“)</td><td class="n">2</td></tr>' +
      '<tr><td>benachbart (eine Seite neutral, die andere nicht)</td><td class="n">1</td></tr>' +
      '<tr><td>gegensätzlich („stimme zu“ gegen „lehnt ab“)</td><td class="n">0</td></tr>' +
      '</tbody></table></div>' +
      '<p>Doppelt gewichtete Thesen zählen zweifach – sowohl bei den erreichten als auch bei den möglichen Punkten. Die Übereinstimmung ist der Anteil der erreichten an den möglichen Punkten:</p>' +
      '<blockquote>Übereinstimmung = erreichte Punkte ÷ mögliche Punkte × 100 %</blockquote>' +
      '<p><b>Beispiel:</b> Sie beantworten 20 Thesen, eine davon doppelt gewichtet. Eine Partei hat zu 18 dieser Thesen eine eindeutige Position; darunter ist die doppelt gewichtete. Möglich sind dann 19 × 2 = 38 Punkte. Erreicht die Partei 27 Punkte, beträgt die Übereinstimmung 27 ÷ 38 ≈ 71 %.</p>' +
      '<p>Übersprungene Thesen und Thesen ohne eindeutige Parteiposition fließen für die betreffende Partei nicht ein. Deshalb wird bei jeder Partei die <b>Vergleichsbasis</b> angezeigt. Ein Ergebnis erscheint erst ab ' + W.minAntworten + ' beantworteten Thesen.</p>' +
      '<h3>Eindeutige Positionen je Partei</h3></div>' +
      '<div class="table-wrap"><table class="table-compact"><thead><tr><th>Partei</th><th class="n">Thesen mit eindeutiger Position</th><th class="n">ohne eindeutige Aussage</th></tr></thead><tbody>' +
      PS.shuffle(counts).map(function (c) { return '<tr><th>' + esc(c.p.kurz) + '</th><td class="n">' + c.n + ' von ' + T.length + '</td><td class="n">' + (T.length - c.n) + '</td></tr>'; }).join('') +
      '</tbody></table></div><p class="small faint">Reihenfolge zufällig. Kleinere Parteien äußern sich in ihren Programmen zu weniger Einzelfragen; ihre Vergleichsbasis ist daher oft kleiner.</p>' +
      '<div class="prose"><h3>Grenzen</h3><ul>' +
      '<li>Wahlprogramme beschreiben Absichten zum Zeitpunkt der Wahl. Regierungshandeln, Koalitionskompromisse und spätere Beschlüsse können davon abweichen.</li>' +
      '<li>Eine Auswahl von ' + T.length + ' Thesen kann nicht alle Politikfelder abbilden. Die Themen wurden nach öffentlicher Relevanz und Unterscheidbarkeit der Positionen ausgewählt.</li>' +
      '<li>Die Einordnung von Programmaussagen erfordert Auslegung. Die Begründungen machen sie nachprüfbar – im Zweifel lohnt der Blick ins Original.</li>' +
      '</ul><p>Zu anstehenden Wahlen bietet die Bundeszentrale für politische Bildung den ' + link('https://www.wahl-o-mat.de', 'Wahl-O-Mat') + ' an, dessen Thesen die Parteien selbst beantworten. Prüfstand ist davon unabhängig und verwendet keine Daten daraus.</p></div></section>';

    /* Quellen */
    h += '<section class="section" id="ueber-quellen"><hr class="rule-ink"><h2>Quellen</h2><div class="grid-2">' +
      '<div class="stack-sm"><h3>Parteien-Test</h3><ul class="small" style="padding-left:1.2em;display:grid;gap:5px">' +
      W.parteien.map(function (p) { return '<li>' + esc(p.kurz) + ': „' + esc(p.programm) + '“ – ' + link(p.url, 'Programm') + '</li>'; }).join('') +
      W.quellen.map(function (q) { return '<li>' + link(q.url, q.titel) + '</li>'; }).join('') +
      '</ul></div>' +
      '<div class="stack-sm"><h3>Staat und Recht</h3><ul class="small" style="padding-left:1.2em;display:grid;gap:5px">' +
      '<li>Grundgesetz und Bundesgesetze: ' + link('https://www.gesetze-im-internet.de', 'gesetze-im-internet.de') + ' (Bundesministerium der Justiz)</li>' +
      '<li>Bundesgesetzblatt: ' + link('https://www.recht.bund.de', 'recht.bund.de') + '</li>' +
      '<li>Deutscher Bundestag: ' + link('https://www.bundestag.de', 'bundestag.de') + '</li>' +
      '<li>Bundesrat: ' + link('https://www.bundesrat.de', 'bundesrat.de') + '</li>' +
      '<li>Bundesregierung: ' + link('https://www.bundesregierung.de', 'bundesregierung.de') + '</li>' +
      '<li>Bundespräsident: ' + link('https://www.bundespraesident.de', 'bundespraesident.de') + '</li>' +
      '<li>Bundesverfassungsgericht: ' + link('https://www.bundesverfassungsgericht.de', 'bundesverfassungsgericht.de') + '</li>' +
      '<li>Bundeszentrale für politische Bildung: ' + link('https://www.bpb.de', 'bpb.de') + '</li>' +
      '<li>Die Bundeswahlleiterin: ' + link('https://www.bundeswahlleiterin.de', 'bundeswahlleiterin.de') + '</li>' +
      '<li>Statistisches Bundesamt: ' + link('https://www.destatis.de', 'destatis.de') + '</li>' +
      '<li>Zahl der Gesetze: ' + esc(PS.staat.gesetzeZahlen.quelle) + '</li>' +
      '</ul></div></div><p class="small faint">Alle Inhalte wurden sorgfältig zusammengestellt (Stand ' + esc(PS.stand) + '). Ämter, Mehrheiten und Gesetze ändern sich jedoch laufend – maßgeblich sind die genannten amtlichen Quellen.</p></section>';

    /* Datenschutz */
    var keys = [];
    try {
      for (var i = 0; i < window.localStorage.length; i++) {
        var k = window.localStorage.key(i);
        if (k && k.indexOf('pruefstand:') === 0) keys.push(k.slice(11));
      }
    } catch (e) { /* Speicher nicht verfügbar */ }
    h += '<section class="section" id="ueber-datenschutz"><hr class="rule-ink"><h2>Datenschutz</h2><div class="prose">' +
      '<p><b>Kurz gesagt: Ihre Antworten verlassen Ihr Gerät nicht.</b></p><ul>' +
      '<li>Prüfstand setzt <b>keine Cookies</b>, verwendet <b>keine Analyse- oder Tracking-Werkzeuge</b> und bindet <b>keine externen Schriften, Skripte oder Dienste</b> ein.</li>' +
      '<li>Antworten, Fortschritt und Bestwerte werden ausschließlich im lokalen Speicher Ihres Browsers (localStorage) abgelegt, damit Sie später weitermachen können. Sie werden an niemanden übertragen.</li>' +
      '<li>Beim Aufruf der Seite übermittelt Ihr Browser technisch notwendige Daten wie die IP-Adresse an den Server, auf dem die Seite liegt. Der Hosting-Anbieter kann diese in Server-Protokollen speichern. Einzelheiten regelt die Datenschutzerklärung des jeweiligen Anbieters.</li>' +
      '<li>Links zu Parteiprogrammen und amtlichen Quellen führen zu externen Seiten, für die deren Betreiber verantwortlich sind.</li>' +
      '</ul></div>' +
      '<div class="panel stack-sm"><p><b>Aktuell in diesem Browser gespeichert:</b> ' + (keys.length ? keys.map(function (k) { return '<span class="pill mono">' + esc(k) + '</span>'; }).join(' ') : '<span class="muted">nichts</span>') + '</p>' +
      '<div class="btn-row"><button class="btn btn-sm" type="button" data-wipe' + (keys.length ? '' : ' disabled') + '>' + PS.icon('reset') + 'Alle gespeicherten Daten löschen</button></div></div></section>';

    /* Hinweise */
    h += '<section class="section" id="ueber-hinweise"><hr class="rule-ink"><h2>Wichtige Hinweise</h2><div class="grid-2">' +
      '<div class="panel stack-sm"><h3>Parteien-Test</h3><p class="small muted">Das Ergebnis ist keine Wahlempfehlung. Es zeigt die Nähe Ihrer Antworten zu Programmaussagen – nicht, welche Partei Ihre Interessen am besten vertritt.</p></div>' +
      '<div class="panel stack-sm"><h3>IQ-Test</h3><p class="small muted">Der IQ-Test ist selbst entwickelt und nicht an einer repräsentativen Stichprobe normiert. Der angezeigte Wert ist eine grobe Schätzung zur Unterhaltung und kein Ersatz für eine psychologische Diagnostik.</p></div>' +
      '<div class="panel stack-sm"><h3>Recht</h3><p class="small muted">Die Zusammenfassungen von Grundgesetz und Gesetzen sind vereinfacht und ersetzen keine Rechtsberatung. Verbindlich ist allein der amtliche Wortlaut.</p></div>' +
      '<div class="panel stack-sm"><h3>Weitere Tests</h3><p class="small muted">Reaktions-, Gedächtnis- und Konzentrationstests dienen dem Training. Messwerte hängen von Gerät, Browser und Tagesform ab.</p></div>' +
      '</div></section>';

    /* Darstellung */
    var th = PS.store.get('theme', 'auto');
    h += '<section class="section" id="ueber-darstellung"><hr class="rule-ink"><h2>Darstellung</h2><p class="muted">Standardmäßig folgt Prüfstand der Einstellung Ihres Geräts (hell oder dunkel). Sie können die Darstellung hier festlegen:</p><div class="row" role="radiogroup" aria-label="Farbschema">' +
      [['auto', 'Automatisch'], ['light', 'Hell'], ['dark', 'Dunkel']].map(function (x) {
        return '<label class="check"><input type="radio" name="theme" value="' + x[0] + '"' + (th === x[0] ? ' checked' : '') + '> ' + x[1] + '</label>';
      }).join('') + '</div></section>';

    /* Impressum */
    var B = PS.betreiber || {};
    if (B.name) {
      h += '<section class="section" id="ueber-impressum"><hr class="rule-ink"><h2>Impressum</h2><div class="prose"><p>Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG):</p><p>' + esc(B.name) + '<br>' + esc(B.anschrift || '').replace(/\n/g, '<br>') + '</p>' +
        (B.email ? '<p>E-Mail: ' + esc(B.email) + '</p>' : '') + (B.verantwortlich ? '<p>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV: ' + esc(B.verantwortlich) + '</p>' : '') + '</div></section>';
    }

    h += '</div>';
    main.innerHTML = h;

    var wipe = PS.qs('[data-wipe]', main);
    if (wipe) wipe.addEventListener('click', function () {
      if (!wipe.getAttribute('data-sure')) { wipe.setAttribute('data-sure', '1'); wipe.lastChild.textContent = 'Wirklich alles löschen? Nochmals klicken'; return; }
      try {
        var del = [];
        for (var i = 0; i < window.localStorage.length; i++) {
          var k = window.localStorage.key(i);
          if (k && k.indexOf('pruefstand:') === 0) del.push(k);
        }
        del.forEach(function (k) { window.localStorage.removeItem(k); });
      } catch (e) { /* ignorieren */ }
      PS.setTheme('auto');
      PS.toast('Alle gespeicherten Daten wurden gelöscht');
      PS.render();
    });
    PS.qsa('input[name=theme]', main).forEach(function (r) {
      r.addEventListener('change', function () { if (r.checked) PS.setTheme(r.value); });
    });
  });
})();
