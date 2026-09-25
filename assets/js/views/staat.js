/* ==========================================================================
   Prüfstand – Staat & Recht
   Überblick, Staatsaufbau, Verfassungsorgane, Bundesregierung, Länder,
   Gesetzgebung, Grundgesetz, Gesetze A–Z, Lerneinheiten, Test, Glossar
   ========================================================================== */
(function () {
  'use strict';
  var PS = window.PS;
  var S = PS.staat;
  var esc = PS.esc;

  var SUB = [
    ['staat', 'Überblick'],
    ['staat-aufbau', 'Staatsaufbau'],
    ['staat-organe', 'Verfassungsorgane'],
    ['staat-regierung', 'Bundesregierung'],
    ['staat-laender', 'Länder'],
    ['staat-gesetzgebung', 'Gesetzgebung'],
    ['staat-grundgesetz', 'Grundgesetz'],
    ['staat-gesetze', 'Gesetze A–Z'],
    ['staat-lernen', 'Lerneinheiten'],
    ['staat-test', 'Test'],
    ['glossar', 'Glossar']
  ];
  function subnav(cur) {
    return '<nav class="subnav" aria-label="Bereiche von Staat und Recht">' + SUB.map(function (s) {
      return '<a href="#' + s[0] + '"' + (s[0] === cur ? ' aria-current="page"' : '') + '>' + esc(s[1]) + '</a>';
    }).join('') + '</nav>';
  }
  function afterSubnav(main) {
    var cur = PS.qs('.subnav [aria-current]', main);
    if (!cur || !cur.parentNode) return;
    var nav = cur.parentNode;
    if (nav.scrollWidth <= nav.clientWidth) return;
    nav.scrollLeft += cur.getBoundingClientRect().left - nav.getBoundingClientRect().left - 24;
  }
  function head(eyebrow, title, lead, cur) {
    return '<header class="stack"><p class="eyebrow">' + esc(eyebrow) + '</p><h1 class="h1-sm">' + esc(title) + '</h1>' + (lead ? '<p class="lead">' + lead + '</p>' : '') + '</header>' + subnav(cur);
  }
  function fmtDe(n, d) { return PS.fmtNum(n, d); }
  function escRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
  function makeRe(q) {
    var words = String(q || '').trim().split(/\s+/).filter(function (w) { return w.length > 1; });
    if (!words.length) return null;
    return new RegExp('(?:' + words.map(escRe).join('|') + ')', 'gi');
  }
  function hl(text, re) {
    text = String(text == null ? '' : text);
    if (!re) return esc(text);
    var out = '', last = 0;
    re.lastIndex = 0;
    text.replace(re, function (m, off) {
      out += esc(text.slice(last, off)) + '<mark class="hl">' + esc(m) + '</mark>';
      last = off + m.length;
      return m;
    });
    return out + esc(text.slice(last));
  }
  function matchAll(hay, q) {
    var words = PS.norm(q).split(/\s+/).filter(Boolean);
    var h = PS.norm(hay);
    return words.every(function (w) { return h.indexOf(w) >= 0; });
  }
  function unitById(id) {
    for (var i = 0; i < PS.lernen.length; i++) if (PS.lernen[i].id === id) return PS.lernen[i];
    return null;
  }
  function unitIndex(id) {
    for (var i = 0; i < PS.lernen.length; i++) if (PS.lernen[i].id === id) return i;
    return -1;
  }
  function wrapTables(html) {
    return String(html).replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, '</table></div>');
  }
  function glossId(term) { return 'g-' + PS.norm(term).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  var glossIndex = null;
  function glossLookup(term) {
    if (!glossIndex) {
      glossIndex = {};
      S.glossar.forEach(function (g) { glossIndex[PS.norm(g[0])] = g[0]; });
    }
    return glossIndex[PS.norm(term)] || null;
  }

  /* ======================================================================
     Überblick
     ====================================================================== */
  PS.route('staat', { title: 'Staat & Recht', section: 'staat' }, function (main) {
    var bt = S.organe.filter(function (o) { return o.id === 'bundestag'; })[0];
    var seats = bt && bt.sitze ? bt.sitze.reduce(function (s, x) { return s + x.n; }, 0) : 630;
    var votes = S.laender.reduce(function (s, l) { return s + l.st; }, 0);

    var h = '<div class="page">' +
      head('Staat & Recht · Stand ' + S.stand, 'So funktioniert der Staat',
        'Deutschland ist eine parlamentarische Demokratie und ein Bundesstaat aus 16 Ländern. Hier finden Sie den Aufbau des Staates, alle Verfassungsorgane mit den aktuellen Amtsträgerinnen und Amtsträgern, das Grundgesetz, die wichtigsten Gesetze sowie Lerneinheiten und einen Test.', 'staat');

    h += '<div class="keynums">' +
      '<div><b>16</b><span>Länder</span></div>' +
      '<div><b>' + seats + '</b><span>Abgeordnete im Bundestag</span></div>' +
      '<div><b>' + votes + '</b><span>Stimmen im Bundesrat</span></div>' +
      '<div><b>' + fmtDe(S.gesetzeZahlen.gesetze) + '</b><span>Bundesgesetze (Stand ' + esc(S.gesetzeZahlen.stichtag) + ')</span></div>' +
      '</div>';

    var prinz = [
      ['Republik', 'Staatsoberhaupt ist ein auf Zeit gewählter Bundespräsident, kein Monarch.'],
      ['Demokratie', 'Alle Staatsgewalt geht vom Volke aus. Es übt sie in Wahlen und Abstimmungen und durch besondere Organe aus.'],
      ['Rechtsstaat', 'Alle staatlichen Stellen sind an Recht und Gesetz gebunden. Unabhängige Gerichte kontrollieren sie, die Gewaltenteilung verhindert Machtmissbrauch.'],
      ['Sozialstaat', 'Der Staat sorgt für soziale Sicherheit und Ausgleich, etwa durch die Sozialversicherungen und die Grundsicherung.'],
      ['Bundesstaat', 'Deutschland besteht aus 16 Ländern mit eigener Staatsgewalt. Bund und Länder teilen sich Gesetzgebung und Verwaltung.']
    ];
    h += '<section class="section"><h2>Die fünf Grundprinzipien</h2><p class="muted">Art. 20 GG legt fest, was die Bundesrepublik ausmacht. Diese Grundsätze sind durch die Ewigkeitsklausel (Art. 79 Abs. 3 GG) geschützt – auch mit Zwei-Drittel-Mehrheit dürfen sie nicht abgeschafft werden.</p><div class="grid">';
    prinz.forEach(function (p, i) {
      h += '<div class="tile" style="cursor:default"><div class="tile-kicker"><span class="glyph">' + (i + 1) + '</span><h3>' + p[0] + '</h3></div><p>' + p[1] + '</p></div>';
    });
    h += '</div></section>';

    h += '<section class="section"><h2>Wer steht an der Spitze des Staates?</h2><p class="muted">Die protokollarische Rangfolge legt fest, in welcher Reihenfolge die höchsten Ämter bei staatlichen Anlässen auftreten. Sie sagt nichts über Weisungsrechte aus – die Verfassungsorgane sind einander nicht untergeordnet, sondern kontrollieren sich gegenseitig.</p><div class="pyramid">';
    S.rangfolge.forEach(function (r, i) {
      h += '<div class="pyr' + (i === 0 ? ' top' : '') + '" style="width:' + (46 + i * 13.5) + '%;min-width:min(100%,260px)"><b>' + (i + 1) + '. ' + esc(r.amt) + '</b><span>' + esc(r.person) + ' · ' + esc(r.hinweis) + '</span></div>';
    });
    h += '</div></section>';

    var tiles = [
      ['staat-aufbau', 'tree', 'Staatsaufbau', 'Gewaltenteilung, „Wer wählt wen?“, Ebenen vom Bund bis zur Gemeinde und die Rangordnung des Rechts.'],
      ['staat-organe', 'people', 'Verfassungsorgane', 'Aufgaben, Zusammensetzung und aktuelle Besetzung von Bundestag, Bundesrat, Regierung, Bundespräsident und Bundesverfassungsgericht.'],
      ['staat-regierung', 'cap', 'Bundesregierung', 'Alle Ministerinnen und Minister, Kanzler-, Ressort- und Kollegialprinzip, Hierarchie in den Ministerien.'],
      ['staat-laender', 'map', 'Die 16 Länder', 'Hauptstädte, Einwohner, Regierungschefs, Koalitionen und Stimmen im Bundesrat.'],
      ['staat-gesetzgebung', 'flow', 'Gesetzgebung', 'Der Weg eines Gesetzes in neun Schritten, Zuständigkeiten von Bund und Ländern, Zahl der Gesetze.'],
      ['staat-grundgesetz', 'book', 'Grundgesetz', 'Alle Artikel in verständlicher Sprache – durchsuchbar, mit dem Wortlaut zentraler Sätze.'],
      ['staat-gesetze', 'para', 'Gesetze A–Z', PS.gesetze.liste.length + ' wichtige Gesetze aus 15 Rechtsgebieten mit ihren zentralen Paragrafen.'],
      ['staat-lernen', 'list', 'Lerneinheiten', PS.lernen.length + ' Einheiten mit Lernzielen, Merksätzen und Übungsfragen.'],
      ['staat-test', 'quiz', 'Staatskunde-Test', PS.quiz.length + ' Fragen – als Übung mit sofortiger Rückmeldung oder als Prüfung.'],
      ['glossar', 'search', 'Glossar', S.glossar.length + ' Begriffe von „Abgeordnete“ bis „Zweitstimme“.']
    ];
    h += '<section class="section"><h2>Alle Themen</h2><div class="grid">';
    tiles.forEach(function (t) {
      h += '<a class="tile" href="#' + t[0] + '"><div class="tile-kicker"><span class="glyph">' + PS.icon(t[1]) + '</span><h3>' + esc(t[2]) + '</h3></div><p>' + esc(t[3]) + '</p></a>';
    });
    h += '</div></section>';

    h += '<section class="panel panel-ink spread"><div class="stack-sm"><h2 class="h3">Lernen und prüfen</h2><p class="muted small">Arbeiten Sie die Lerneinheiten der Reihe nach durch und testen Sie danach Ihr Wissen.</p></div><div class="btn-row"><a class="btn btn-primary" href="#lerneinheit.' + PS.lernen[0].id + '">Mit Einheit 1 beginnen</a><a class="btn" href="#staat-test">Zum Test</a></div></section>';
    h += '</div>';
    main.innerHTML = h;
    afterSubnav(main);
  });

  /* ======================================================================
     Staatsaufbau
     ====================================================================== */
  function arrowHead(x1, y1, x2, y2) {
    var a = Math.atan2(y2 - y1, x2 - x1), L = 9, W = 4.5;
    var bx = x2 - L * Math.cos(a), by = y2 - L * Math.sin(a);
    var p = [[x2, y2], [bx + W * Math.sin(a), by - W * Math.cos(a)], [bx - W * Math.sin(a), by + W * Math.cos(a)]];
    return '<polygon class="dg-arrow" points="' + p.map(function (q) { return q[0].toFixed(1) + ',' + q[1].toFixed(1); }).join(' ') + '"/>';
  }
  function whoElectsSvg() {
    var Wd = 200, Ht = 58;
    var B = {
      reg: [20, 20, 'Bundesregierung', 'Kanzler/in und Minister/innen'],
      bp: [290, 20, 'Bundespräsident/in', 'Staatsoberhaupt'],
      bv: [290, 128, 'Bundesversammlung', 'tritt nur zur Wahl zusammen'],
      bt: [20, 236, 'Bundestag', '630 Abgeordnete'],
      bverfg: [290, 236, 'Bundesverfassungsgericht', '16 Richterinnen und Richter'],
      br: [560, 236, 'Bundesrat', '69 Stimmen der Länder'],
      lr: [560, 344, '16 Landesregierungen', 'Regierungschefs und Minister'],
      lt: [560, 452, '16 Landesparlamente', 'Landtage und Bürgerschaften']
    };
    var out = '';
    function label(t, x, y) {
      var w = t.length * 6.3 + 10;
      return '<rect class="dg-labelbg" x="' + (x - w / 2).toFixed(1) + '" y="' + (y - 9) + '" width="' + w.toFixed(1) + '" height="18" rx="2"/><text class="dg-label" x="' + x + '" y="' + (y + 4) + '" text-anchor="middle">' + esc(t) + '</text>';
    }
    function edge(pts, t, lx, ly) {
      var d = 'M' + pts.map(function (p) { return p[0] + ' ' + p[1]; }).join('L');
      var n = pts.length;
      return '<path class="dg-edge" d="' + d + '"/>' + arrowHead(pts[n - 2][0], pts[n - 2][1], pts[n - 1][0], pts[n - 1][1]) + (t ? label(t, lx, ly) : '');
    }
    out += edge([[120, 560], [120, 294]], 'wählen alle vier Jahre', 120, 430);
    out += edge([[660, 560], [660, 510]], 'wählen', 660, 535);
    out += edge([[660, 452], [660, 402]], 'wählen die Regierungschefs', 660, 427);
    out += edge([[660, 344], [660, 294]], 'entsenden Mitglieder', 660, 319);
    out += edge([[220, 265], [290, 265]], '', 0, 0);
    out += edge([[560, 265], [490, 265]], '', 0, 0);
    out += edge([[120, 236], [120, 78]], 'wählt Kanzler/in', 120, 157);
    out += edge([[200, 236], [310, 186]], 'alle Abgeordneten', 255, 211);
    out += edge([[760, 481], [778, 481], [778, 157], [490, 157]], 'wählen ebenso viele Mitglieder', 634, 157);
    out += edge([[390, 128], [390, 78]], 'wählt für fünf Jahre', 390, 103);
    out += edge([[290, 52], [220, 52]], '', 0, 0);
    out += label('ernennt', 255, 34);
    out += label('je ½ der Richter', 390, 318);
    Object.keys(B).forEach(function (k) {
      var b = B[k];
      out += '<rect class="dg-box" x="' + b[0] + '" y="' + b[1] + '" width="' + Wd + '" height="' + Ht + '" rx="3"/>' +
        '<text class="dg-title" x="' + (b[0] + Wd / 2) + '" y="' + (b[1] + 25) + '" text-anchor="middle">' + esc(b[2]) + '</text>' +
        '<text class="dg-sub" x="' + (b[0] + Wd / 2) + '" y="' + (b[1] + 44) + '" text-anchor="middle">' + esc(b[3]) + '</text>';
    });
    out += '<rect class="dg-box-ink" x="20" y="560" width="740" height="58" rx="3"/>' +
      '<text class="dg-title-inv" x="390" y="585" text-anchor="middle">Wahlberechtigte Bürgerinnen und Bürger</text>' +
      '<text class="dg-sub-inv" x="390" y="604" text-anchor="middle">„Alle Staatsgewalt geht vom Volke aus.“ (Art. 20 Abs. 2 GG)</text>';
    return '<svg viewBox="0 0 790 632" role="img" aria-labelledby="wer-titel wer-desc"><title id="wer-titel">Wer wählt wen?</title><desc id="wer-desc">Die Wahlberechtigten wählen den Bundestag und die Landesparlamente. Der Bundestag wählt den Bundeskanzler. Die Landesparlamente wählen die Landesregierungen, die Mitglieder in den Bundesrat entsenden. Bundestag und ebenso viele Ländervertreter bilden die Bundesversammlung, die den Bundespräsidenten wählt. Der Bundespräsident ernennt die Bundesregierung. Bundestag und Bundesrat wählen je die Hälfte der Richter des Bundesverfassungsgerichts.</desc>' + out + '</svg>';
  }

  PS.route('staat-aufbau', { title: 'Staatsaufbau', section: 'staat' }, function (main) {
    var h = '<div class="page">' + head('Staat & Recht', 'Staatsaufbau und Gewaltenteilung', 'Die Macht im Staat ist verteilt – zwischen Parlament, Regierung und Gerichten und zwischen Bund, Ländern und Gemeinden. So kontrollieren sich die Gewalten gegenseitig.', 'staat-aufbau');

    h += '<section class="section"><h2>Gewaltenteilung</h2><p class="muted">Die Staatsgewalt wird durch besondere Organe der <b>Gesetzgebung</b> (Legislative), der <b>vollziehenden Gewalt</b> (Exekutive) und der <b>Rechtsprechung</b> (Judikative) ausgeübt (Art. 20 Abs. 2 GG). Zur „horizontalen“ Teilung kommt die „vertikale“ zwischen Bund, Ländern und Kommunen.</p>' +
      '<div class="table-wrap"><table><thead><tr>' + S.gewalten.kopf.map(function (k) { return '<th>' + esc(k) + '</th>'; }).join('') + '</tr></thead><tbody>';
    S.gewalten.zeilen.forEach(function (z) {
      h += '<tr><th>' + esc(z[0]) + '</th><td>' + esc(z[1]) + '</td><td>' + esc(z[2]) + '</td><td>' + esc(z[3]) + '</td></tr>';
    });
    h += '</tbody></table></div>' +
      '<div class="note">' + PS.icon('info') + '<p>In der parlamentarischen Demokratie ist die Trennung nicht streng: Die Regierung geht aus dem Parlament hervor, und viele Ministerinnen und Minister sind zugleich Abgeordnete. Die wichtigste Kontrolle der Regierung übt deshalb die <b>Opposition</b> aus.</p></div></section>';

    h += '<section class="section"><h2>Wer wählt wen?</h2><p class="muted">Nur der Bundestag und die Landesparlamente werden direkt vom Volk gewählt. Alle anderen Organe leiten ihre Legitimation über eine ununterbrochene Kette von Wahlen und Ernennungen vom Volk ab.</p>' +
      '<div class="diagram">' + whoElectsSvg() + '</div>' +
      '<ul class="small muted" style="padding-left:1.2em;display:grid;gap:4px">' +
      '<li>Der Bundestag wählt die Kanzlerin oder den Kanzler auf Vorschlag des Bundespräsidenten (Art. 63 GG). Die Ministerinnen und Minister ernennt der Bundespräsident auf Vorschlag des Kanzlers (Art. 64 GG).</li>' +
      '<li>Die Richterinnen und Richter des Bundesverfassungsgerichts werden je zur Hälfte von Bundestag und Bundesrat gewählt, jeweils mit Zwei-Drittel-Mehrheit (Art. 94 GG).</li>' +
      '<li>Die Bundesversammlung besteht aus allen Bundestagsabgeordneten und ebenso vielen von den Landesparlamenten gewählten Mitgliedern (Art. 54 GG).</li>' +
      '</ul></section>';

    h += '<section class="section"><h2>Die Ebenen des Staates</h2><div class="levels">';
    S.ebenen.forEach(function (e) {
      h += '<div class="level"><h3>' + esc(e.name) + '</h3><p>' + esc(e.text) + '</p></div>';
    });
    h += '</div><p class="small faint">Grundsatz der Subsidiarität: Aufgaben sollen möglichst auf der Ebene erledigt werden, die den Menschen am nächsten ist.</p></section>';

    h += '<section class="section"><h2>Rangordnung des Rechts</h2><p class="muted">Nicht jede Regel hat dasselbe Gewicht. Eine Norm darf einer höherrangigen nicht widersprechen – sonst ist sie unwirksam. Das Recht der Europäischen Union hat nach der Rechtsprechung des Europäischen Gerichtshofs Anwendungsvorrang vor nationalem Recht; die Grenzen dafür zieht das Grundgesetz (Art. 23, 79 Abs. 3 GG).</p><div class="pyramid">';
    S.normen.forEach(function (n, i) {
      h += '<div class="pyr' + (i === 0 ? ' top' : '') + '" style="width:' + (40 + i * 7.5) + '%;min-width:min(100%,250px)"><b>' + esc(n.n) + '</b><span>' + esc(n.d) + '</span></div>';
    });
    h += '</div></section>';

    h += '<div class="btn-row"><a class="btn" href="#lerneinheit.gewaltenteilung">' + PS.icon('list') + 'Lerneinheit „Gewaltenteilung“</a><a class="btn btn-quiet" href="#staat-organe">Weiter: Verfassungsorgane' + PS.icon('right') + '</a></div></div>';
    main.innerHTML = h;
    afterSubnav(main);
  });

  /* ======================================================================
     Verfassungsorgane
     ====================================================================== */
  PS.route('staat-organe', { title: 'Verfassungsorgane', section: 'staat', after: function (arg) { if (arg) setTimeout(function () { PS.scrollToId('organ-' + arg); }, 30); } }, function (main) {
    var h = '<div class="page">' + head('Staat & Recht · Stand ' + S.stand, 'Die Verfassungsorgane', 'Fünf ständige Verfassungsorgane tragen den Bund: Bundestag, Bundesrat, Bundesregierung, Bundespräsident und Bundesverfassungsgericht. Dazu kommen die Bundesversammlung und der Gemeinsame Ausschuss, die nur zu besonderen Anlässen zusammentreten.', 'staat-organe');

    h += '<nav class="row" aria-label="Zu einem Organ springen">';
    S.organe.forEach(function (o) {
      h += '<a class="pill pill-ink" href="#staat-organe.' + o.id + '" data-jump="organ-' + o.id + '" style="text-decoration:none">' + esc(o.name) + '</a>';
    });
    h += '</nav>';

    S.organe.forEach(function (o) {
      h += '<section class="section" id="organ-' + o.id + '"><hr class="rule-ink"><div class="organ"><div class="stack">' +
        '<div class="stack-sm"><p class="eyebrow">' + esc(o.rolle) + '</p><h2>' + esc(o.name) + '</h2></div>' +
        '<dl class="factlist"><dt>Grundlage</dt><dd><span class="cite">' + esc(o.gg) + '</span></dd><dt>Sitz</dt><dd>' + esc(o.sitz) + '</dd><dt>Wahl und Zusammensetzung</dt><dd>' + esc(o.wahl) + '</dd></dl>' +
        '<div class="stack-sm"><h3>Aufgaben</h3><ul class="prose" style="padding-left:1.2em;font-size:.97rem">' + o.aufgaben.map(function (a) { return '<li>' + esc(a) + '</li>'; }).join('') + '</ul></div>';
      if (o.sitze) {
        var total = o.sitze.reduce(function (s, x) { return s + x.n; }, 0);
        var maj = Math.floor(total / 2) + 1;
        h += '<div class="stack-sm"><h3>Sitzverteilung im ' + esc(o.id === 'bundestag' ? '21. Deutschen Bundestag' : o.name) + '</h3><div class="table-wrap"><table class="table-compact"><thead><tr><th>Fraktion / Gruppe</th><th class="n">Sitze</th><th style="width:34%">Anteil</th><th>Vorsitz</th></tr></thead><tbody>';
        o.sitze.forEach(function (x) {
          var pct = x.n / total * 100;
          h += '<tr><th>' + esc(x.f) + '</th><td class="n">' + x.n + '</td><td><div class="res-bar" style="height:10px" aria-hidden="true"><i style="width:' + pct.toFixed(1) + '%"></i></div><span class="tiny faint">' + fmtDe(pct, 1) + ' %</span></td><td class="small">' + esc(x.vorsitz) + '</td></tr>';
        });
        h += '</tbody></table></div><p class="small faint">Insgesamt ' + total + ' Sitze, absolute Mehrheit (Kanzlermehrheit): ' + maj + ' Stimmen. Regierungskoalition: CDU/CSU und SPD. Die Reihenfolge entspricht der Fraktionsstärke.</p></div>';
      }
      h += '<div class="merke" data-label="Merke"><p>' + esc(o.merke) + '</p></div></div>';
      h += '<aside class="panel stack">';
      if (o.person) {
        var p = o.person;
        h += '<p class="eyebrow">Aktuell im Amt</p><div class="person"><span class="init" aria-hidden="true">' + esc(PS.initials(p.name)) + '</span><div><b>' + esc(p.name) + '</b><span>' + esc(p.titel || o.name) + (p.partei ? ' · ' + esc(p.partei) : '') + '</span></div></div>' +
          '<p class="small"><b>Im Amt seit:</b> ' + esc(p.seit) + '</p>' + (p.info ? '<p class="small muted">' + esc(p.info) + '</p>' : '');
      } else {
        h += '<p class="eyebrow">Besonderheit</p><p class="small muted">' + (o.id === 'bundesversammlung'
          ? 'Die Bundesversammlung ist nicht ständig tätig. Sie wird von der Präsidentin des Bundestages einberufen und geleitet. Die nächste Wahl steht an, weil die zweite Amtszeit von Frank-Walter Steinmeier am 18. März 2027 endet.'
          : 'Der Gemeinsame Ausschuss arbeitet im Hintergrund: Seine Mitglieder werden für jede Wahlperiode bestimmt, und die Bundesregierung muss ihn über ihre Planungen für den Verteidigungsfall unterrichten (Art. 53a Abs. 2 GG).') + '</p>';
      }
      if (o.id === 'bundesregierung') h += '<a class="btn btn-sm" href="#staat-regierung">Alle Ministerinnen und Minister</a>';
      if (o.id === 'bundesrat') h += '<a class="btn btn-sm" href="#staat-laender">Die 16 Länder und ihre Stimmen</a>';
      if (o.id === 'bundestag') h += '<a class="btn btn-sm" href="#lerneinheit.bundestag">Lerneinheit Bundestag</a>';
      if (o.id === 'bverfg') h += '<a class="btn btn-sm" href="#lerneinheit.justiz">Lerneinheit Rechtsprechung</a>';
      if (o.id === 'bundespraesident') h += '<a class="btn btn-sm" href="#lerneinheit.praesident">Lerneinheit Bundespräsident</a>';
      h += '</aside></div></section>';
    });
    h += '</div>';
    main.innerHTML = h;
    afterSubnav(main);
  });

  /* ======================================================================
     Bundesregierung
     ====================================================================== */
  PS.route('staat-regierung', { title: 'Bundesregierung', section: 'staat' }, function (main) {
    var counts = {};
    S.kabinett.forEach(function (k) { counts[k.partei] = (counts[k.partei] || 0) + 1; });
    var h = '<div class="page">' + head('Staat & Recht · Stand ' + S.stand, 'Die Bundesregierung', esc(S.kabinettHinweis), 'staat-regierung');

    h += '<div class="keynums">' +
      '<div><b>' + S.kabinett.length + '</b><span>Mitglieder des Kabinetts</span></div>' +
      Object.keys(counts).map(function (p) { return '<div><b>' + counts[p] + '</b><span>' + esc(p) + '</span></div>'; }).join('') +
      '</div>';

    h += '<section class="section"><h2>Das Kabinett</h2><div class="table-wrap"><table><thead><tr><th>Amt / Ressort</th><th>Name</th><th>Partei</th><th>im Amt seit</th></tr></thead><tbody>';
    S.kabinett.forEach(function (k) {
      h += '<tr><td>' + esc(k.ressort) + '</td><th>' + esc(k.name) + (k.note ? '<br><span class="tiny faint" style="font-weight:400">' + esc(k.note) + '</span>' : '') + '</th><td>' + esc(k.partei) + '</td><td class="num">' + esc(k.seit) + '</td></tr>';
    });
    h += '</tbody></table></div><p class="small faint">Bei den Ministerien ist die Kurzbezeichnung angegeben, etwa „Inneres“ für das Bundesministerium des Innern.</p></section>';

    h += '<section class="section"><h2>Drei Prinzipien der Regierungsarbeit</h2><p class="muted">Art. 65 GG verteilt die Verantwortung innerhalb der Bundesregierung auf drei Grundsätze:</p><div class="grid-3">' +
      '<div class="panel stack-sm"><h3>Kanzlerprinzip</h3><p class="small muted">Die Kanzlerin oder der Kanzler bestimmt die Richtlinien der Politik und trägt dafür die Verantwortung gegenüber dem Bundestag.</p></div>' +
      '<div class="panel stack-sm"><h3>Ressortprinzip</h3><p class="small muted">Innerhalb dieser Richtlinien leitet jede Ministerin und jeder Minister das eigene Ministerium selbstständig und in eigener Verantwortung.</p></div>' +
      '<div class="panel stack-sm"><h3>Kollegialprinzip</h3><p class="small muted">Bei Meinungsverschiedenheiten zwischen Ministerien entscheidet das Kabinett gemeinsam. Gesetzentwürfe der Regierung beschließt das ganze Kabinett.</p></div>' +
      '</div></section>';

    h += '<section class="section"><h2>Hierarchie in Regierung und Verwaltung</h2><ol class="steps">';
    S.hierarchieRegierung.forEach(function (x) {
      h += '<li><h3>' + esc(x.stufe) + '</h3><p>' + esc(x.text) + '</p></li>';
    });
    h += '</ol></section>';

    h += '<section class="section"><h2>Wie eine Regierung ins Amt kommt – und wie sie endet</h2><div class="grid-2">' +
      '<div class="panel stack-sm"><h3>Kanzlerwahl (Art. 63 GG)</h3><ol class="small muted" style="padding-left:1.2em;display:grid;gap:4px">' +
      '<li>Der Bundespräsident schlägt eine Person vor; der Bundestag wählt ohne Aussprache. Nötig ist die Mehrheit der Mitglieder (Kanzlermehrheit, derzeit 316 Stimmen).</li>' +
      '<li>Scheitert das, kann der Bundestag binnen 14 Tagen mit Kanzlermehrheit eine eigene Kandidatin oder einen eigenen Kandidaten wählen – beliebig viele Wahlgänge sind möglich.</li>' +
      '<li>Kommt auch dann keine Wahl zustande, genügen in einem letzten Wahlgang die meisten Stimmen. Erreicht die gewählte Person nur diese relative Mehrheit, entscheidet der Bundespräsident binnen sieben Tagen, ob er sie ernennt oder den Bundestag auflöst.</li>' +
      '</ol></div>' +
      '<div class="panel stack-sm"><h3>Ende der Amtszeit</h3><ul class="small muted" style="padding-left:1.2em;display:grid;gap:4px">' +
      '<li><b>Neuer Bundestag:</b> Das Amt endet regulär mit dem Zusammentritt eines neuen Bundestages (Art. 69 GG).</li>' +
      '<li><b>Konstruktives Misstrauensvotum:</b> Der Bundestag kann den Kanzler nur abwählen, indem er zugleich einen Nachfolger wählt (Art. 67 GG).</li>' +
      '<li><b>Vertrauensfrage:</b> Findet der Kanzler keine Mehrheit, kann der Bundespräsident auf seinen Vorschlag den Bundestag auflösen (Art. 68 GG).</li>' +
      '<li><b>Rücktritt oder Tod:</b> Mit dem Kanzler endet auch das Amt der Minister.</li>' +
      '</ul></div></div></section>';

    h += '<div class="btn-row"><a class="btn" href="#lerneinheit.regierung">' + PS.icon('list') + 'Lerneinheit „Die Bundesregierung“</a><a class="btn btn-quiet" href="#staat-organe.bundesregierung">Zum Verfassungsorgan</a></div></div>';
    main.innerHTML = h;
    afterSubnav(main);
  });

  /* ======================================================================
     Länder
     ====================================================================== */
  PS.route('staat-laender', { title: 'Die 16 Länder', section: 'staat' }, function (main) {
    var ew = S.laender.reduce(function (s, l) { return s + l.ew; }, 0);
    var st = S.laender.reduce(function (s, l) { return s + l.st; }, 0);
    var h = '<div class="page">' + head('Staat & Recht · Stand ' + S.stand, 'Die 16 Länder', 'Die Länder sind Staaten mit eigener Verfassung, eigenem Parlament und eigener Regierung. Sie führen die meisten Gesetze aus und wirken über den Bundesrat an der Politik des Bundes mit.', 'staat-laender');

    h += '<div class="keynums"><div><b>16</b><span>Länder, davon 3 Stadtstaaten</span></div><div><b>' + fmtDe(ew, 1) + '</b><span>Millionen Einwohner (gerundet)</span></div><div><b>' + st + '</b><span>Stimmen im Bundesrat</span></div><div><b>35</b><span>Stimmen = absolute Mehrheit</span></div></div>';

    h += '<section class="section"><h2>Übersicht</h2><div class="table-wrap"><table class="table-compact"><thead><tr><th>Land</th><th>Hauptstadt</th><th class="n">Einw. (Mio.)</th><th class="n">Stimmen</th><th>Regierungschef/in</th><th>Regierung</th><th>Parlament</th></tr></thead><tbody>';
    S.laender.forEach(function (l) {
      h += '<tr><th>' + esc(l.land) + '</th><td>' + esc(l.hs) + '</td><td class="n">' + fmtDe(l.ew, 1) + '</td><td class="n">' + l.st + '</td>' +
        '<td>' + esc(l.chef) + ' <span class="faint">(' + esc(l.partei) + ')</span><br><span class="tiny faint">' + esc(l.titel) + '</span></td>' +
        '<td>' + esc(l.koal) + (l.note ? '<br><span class="tiny faint">' + esc(l.note) + '</span>' : '') + '</td><td>' + esc(l.parl) + '</td></tr>';
    });
    h += '</tbody><tfoot><tr><th>Summe</th><td></td><td class="n"><b>' + fmtDe(ew, 1) + '</b></td><td class="n"><b>' + st + '</b></td><td colspan="3"></td></tr></tfoot></table></div>' +
      '<p class="small faint">Einwohnerzahlen gerundet. Nach Landtagswahlen bleiben die bisherigen Regierungen bis zur Wahl einer neuen Regierung geschäftsführend im Amt.</p></section>';

    h += '<section class="section"><h2>Stimmen im Bundesrat</h2><p class="muted">Jedes Land hat mindestens drei Stimmen. Länder mit mehr als zwei Millionen Einwohnern haben vier, mit mehr als sechs Millionen fünf und mit mehr als sieben Millionen sechs Stimmen (Art. 51 Abs. 2 GG). Die Stimmen eines Landes können nur einheitlich abgegeben werden. Weil eine Enthaltung wie ein Nein wirkt, vereinbaren Koalitionen meist, sich bei Uneinigkeit zu enthalten.</p><div class="profile">';
    S.laender.slice().sort(function (a, b) { return b.st - a.st || b.ew - a.ew; }).forEach(function (l) {
      h += '<div class="profile-row"><span>' + esc(l.land) + '</span><div class="res-bar" aria-hidden="true"><i style="width:' + (l.st / 6 * 100) + '%"></i></div><span class="num mono">' + l.st + '</span></div>';
    });
    h += '</div></section>';

    h += '<section class="grid-2"><div class="panel stack-sm"><h3>Stadtstaaten</h3><p class="small muted">Berlin, Hamburg und Bremen sind Land und Stadt zugleich. Ihre Regierungen heißen Senat, ihre Regierungschefs Regierender Bürgermeister (Berlin), Erster Bürgermeister (Hamburg) oder Präsident des Senats und Bürgermeister (Bremen). Das Land Bremen besteht aus den Städten Bremen und Bremerhaven.</p></div>' +
      '<div class="panel stack-sm"><h3>Was die Länder regeln</h3><p class="small muted">Schulen und Hochschulen, Polizei, Kultur, Rundfunk, Kommunalrecht und vieles mehr. Außerdem führen Landesbehörden die meisten Bundesgesetze aus – vom Führerschein bis zur Steuerverwaltung.</p></div></section>';

    h += '<div class="btn-row"><a class="btn" href="#lerneinheit.foederalismus">' + PS.icon('list') + 'Lerneinheit „Bundesrat und Föderalismus“</a><a class="btn btn-quiet" href="#staat-organe.bundesrat">Zum Bundesrat</a></div></div>';
    main.innerHTML = h;
    afterSubnav(main);
  });

  /* ======================================================================
     Gesetzgebung
     ====================================================================== */
  PS.route('staat-gesetzgebung', { title: 'Gesetzgebung', section: 'staat' }, function (main) {
    var Z = S.gesetzeZahlen;
    var h = '<div class="page">' + head('Staat & Recht', 'Wie ein Gesetz entsteht', 'Vom Entwurf bis zur Verkündung durchläuft ein Bundesgesetz mehrere Stationen. Bundestag und Bundesrat wirken zusammen, der Bundespräsident prüft und unterzeichnet.', 'staat-gesetzgebung');

    h += '<section class="section"><h2>Der Weg eines Bundesgesetzes</h2><ol class="steps">';
    S.gesetzgebung.forEach(function (s) {
      h += '<li><h3>' + esc(s.t) + ' <span class="cite">' + esc(s.gg) + '</span></h3><p>' + esc(s.d) + '</p></li>';
    });
    h += '</ol><p class="small faint">GO-BT = Geschäftsordnung des Deutschen Bundestages.</p></section>';

    h += '<section class="section"><h2>Einspruchs- und Zustimmungsgesetze</h2><div class="grid-2">' +
      '<div class="panel stack-sm"><h3>Einspruchsgesetz (Regelfall)</h3><p class="small muted">Der Bundesrat kann nach einem Vermittlungsverfahren Einspruch einlegen. Der Bundestag kann ihn überstimmen – mit der Mehrheit seiner Mitglieder; hat der Bundesrat mit Zwei-Drittel-Mehrheit widersprochen, braucht auch der Bundestag zwei Drittel der abgegebenen Stimmen, mindestens aber die Mehrheit seiner Mitglieder (Art. 77, 78 GG).</p></div>' +
      '<div class="panel stack-sm"><h3>Zustimmungsgesetz</h3><p class="small muted">Wenn das Grundgesetz es ausdrücklich vorsieht – etwa bei Verfassungsänderungen, bei Steuern, die den Ländern zustehen, oder wenn Länder Bundesgesetze nach bestimmten Vorgaben ausführen müssen –, scheitert das Gesetz ohne die Zustimmung des Bundesrates.</p></div>' +
      '</div><div class="note">' + PS.icon('info') + '<p><b>Grundgesetzänderungen</b> brauchen eine Zwei-Drittel-Mehrheit im Bundestag <i>und</i> im Bundesrat (Art. 79 Abs. 2 GG). Die Menschenwürde, die Grundsätze des Art. 20 und die Gliederung in Länder dürfen gar nicht angetastet werden (Ewigkeitsklausel, Art. 79 Abs. 3 GG).</p></div></section>';

    h += '<section class="section"><h2>Wer darf was regeln?</h2><p class="muted">Das Grundgesetz verteilt die Gesetzgebungskompetenzen zwischen Bund und Ländern. Grundsätzlich sind die Länder zuständig – der Bund nur dort, wo das Grundgesetz es ihm erlaubt.</p><div class="grid-2">';
    S.kompetenzen.forEach(function (k) {
      h += '<div class="panel stack-sm"><div class="spread"><h3>' + esc(k.art) + '</h3><span class="cite">' + esc(k.gg) + '</span></div><p class="small">' + esc(k.text) + '</p><p class="small muted"><b>Beispiele:</b> ' + esc(k.bsp) + '</p></div>';
    });
    h += '</div></section>';

    h += '<section class="section"><h2>Wie viele Gesetze gibt es?</h2><div class="keynums">' +
      '<div><b>' + fmtDe(Z.gesetze) + '</b><span>Bundesgesetze</span></div>' +
      '<div><b>' + fmtDe(Z.gesetzeNormen) + '</b><span>Einzelnormen in Gesetzen</span></div>' +
      '<div><b>' + fmtDe(Z.vo) + '</b><span>Rechtsverordnungen des Bundes</span></div>' +
      '<div><b>' + fmtDe(Z.voNormen) + '</b><span>Einzelnormen in Verordnungen</span></div>' +
      '</div><p class="small faint">Stichtag ' + esc(Z.stichtag) + '. Quelle: ' + esc(Z.quelle) + '. Hinzu kommen das Recht der 16 Länder, das Recht der Europäischen Union und unzählige kommunale Satzungen. Alle geltenden Bundesgesetze sind kostenlos auf <a href="https://www.gesetze-im-internet.de" target="_blank" rel="noopener noreferrer">gesetze-im-internet.de</a> abrufbar, Neuerscheinungen im Bundesgesetzblatt auf <a href="https://www.recht.bund.de" target="_blank" rel="noopener noreferrer">recht.bund.de</a>.</p></section>';

    h += '<div class="btn-row"><a class="btn" href="#lerneinheit.gesetzgebung">' + PS.icon('list') + 'Lerneinheit „Wie ein Gesetz entsteht“</a><a class="btn btn-quiet" href="#staat-gesetze">Wichtige Gesetze A–Z' + PS.icon('right') + '</a></div></div>';
    main.innerHTML = h;
    afterSubnav(main);
  });

  /* ======================================================================
     Grundgesetz
     ====================================================================== */
  PS.route('staat-grundgesetz', { title: 'Grundgesetz', section: 'staat', after: function (arg) { if (arg) setTimeout(function () { PS.scrollToId('art-' + arg); }, 30); } }, function (main, arg) {
    var G = PS.gg;
    var total = 0, rep = 0;
    G.abschnitte.forEach(function (a) { a.arts.forEach(function (x) { total++; if (x.rep) rep++; }); });

    var h = '<div class="page">' + head('Staat & Recht · Stand ' + G.stand, 'Das Grundgesetz',
      'Die Verfassung der Bundesrepublik Deutschland – in Kraft seit dem 24. Mai 1949. Hier ist jeder Artikel in verständlicher Sprache zusammengefasst; zentrale Sätze stehen im Wortlaut dabei. Verbindlich ist allein der amtliche Text.', 'staat-grundgesetz');

    h += '<div class="keynums"><div><b>' + G.abschnitte.length + '</b><span>Abschnitte</span></div><div><b>' + (total - rep) + '</b><span>geltende Artikel (mit Buchstaben-Artikeln)</span></div><div><b>' + rep + '</b><span>aufgehobene Artikel</span></div><div><b>1949</b><span>in Kraft getreten</span></div></div>';

    h += '<section class="panel stack-sm"><h2 class="h3">Präambel</h2><blockquote class="prose" style="margin:0;padding-left:16px;border-left:3px solid var(--ink);font-family:var(--serif)">' + esc(G.praeambel) + '</blockquote></section>';

    h += '<div class="stack-sm"><div class="search">' + PS.icon('search') + '<input class="input" type="search" data-q placeholder="Suchen: z. B. „Meinungsfreiheit“, „Art. 20“ oder „Bundesrat“" aria-label="Im Grundgesetz suchen"></div>' +
      '<div class="spread"><p class="small muted" data-count></p><div class="btn-row"><button class="btn btn-sm btn-quiet" type="button" data-openall>Alle aufklappen</button><button class="btn btn-sm btn-quiet" type="button" data-closeall>Alle zuklappen</button></div></div>' +
      '<nav class="subnav" aria-label="Abschnitte" data-secnav></nav></div>' +
      '<div class="stack-lg" data-list></div>' +
      '<p class="small faint">Quelle des amtlichen Textes: <a href="' + esc(G.quelle) + '" target="_blank" rel="noopener noreferrer">gesetze-im-internet.de/gg</a>. Die Zusammenfassungen sind vereinfacht und ersetzen keine Rechtsberatung.</p></div>';
    main.innerHTML = h;
    afterSubnav(main);

    var list = PS.qs('[data-list]', main);
    var count = PS.qs('[data-count]', main);
    var secnav = PS.qs('[data-secnav]', main);
    var input = PS.qs('[data-q]', main);

    function artMatch(a, q) {
      if (!q) return true;
      var num = q.toLowerCase().replace(/^art(ikel)?\.?\s*/, '').trim();
      if (/^\d+[a-z]?$/.test(num)) return a.n.toLowerCase() === num;
      return matchAll(a.n + ' ' + a.t + ' ' + a.s + ' ' + (a.z || ''), q);
    }
    function draw(q) {
      q = (q || '').trim();
      var isNum = /^(art(ikel)?\.?\s*)?\d+[a-z]?$/i.test(q);
      var re = isNum ? null : makeRe(q);
      var out = '', nav = '', hits = 0;
      G.abschnitte.forEach(function (sec) {
        var arts = sec.arts.filter(function (a) { return artMatch(a, q); });
        if (!arts.length) return;
        hits += arts.length;
        nav += '<a href="#staat-grundgesetz" data-jump="gg-' + sec.nr + '">' + esc(sec.nr) + '. ' + esc(sec.titel) + '</a>';
        out += '<section class="gg-section" id="gg-' + sec.nr + '"><header><h2>' + esc(sec.nr) + '. ' + esc(sec.titel) + '</h2><span class="faint">' + esc(sec.bereich) + '</span></header>';
        if (sec.intro && !q) out += '<p class="small muted" style="padding:12px 14px 4px">' + esc(sec.intro) + '</p>';
        out += '<div>';
        var open = q && arts.length <= 6;
        arts.forEach(function (a) {
          out += '<details class="art" id="art-' + esc(a.n) + '"' + (open ? ' open' : '') + '><summary><span class="artno">Art. ' + esc(a.n) + '</span>' +
            '<span class="arttitle">' + (a.rep ? '<span class="artrep">' + hl(a.t, re) + '</span>' : hl(a.t, re)) + '</span><span class="chev">' + PS.icon('chev') + '</span></summary>' +
            '<div class="artbody"><p>' + hl(a.s, re) + '</p>' + (a.z ? '<p style="font-family:var(--serif);color:var(--ink)">„' + hl(a.z, re) + '“ <span class="tiny faint">(Wortlaut, Auszug)</span></p>' : '') + '</div></details>';
        });
        out += '</div></section>';
      });
      list.innerHTML = out || '<div class="panel"><p>Keine Treffer für „' + esc(q) + '“. Versuchen Sie einen anderen Begriff oder eine Artikelnummer.</p></div>';
      secnav.innerHTML = nav;
      count.textContent = q ? hits + (hits === 1 ? ' Artikel gefunden' : ' Artikel gefunden') : total + ' Artikel in ' + G.abschnitte.length + ' Abschnitten';
    }
    var timer = null;
    input.addEventListener('input', function () {
      clearTimeout(timer);
      timer = setTimeout(function () { draw(input.value); }, 140);
    });
    PS.qs('[data-openall]', main).addEventListener('click', function () { PS.qsa('details.art', list).forEach(function (d) { d.open = true; }); });
    PS.qs('[data-closeall]', main).addEventListener('click', function () { PS.qsa('details.art', list).forEach(function (d) { d.open = false; }); });
    PS.onLeave(function () { clearTimeout(timer); });
    draw('');
    if (arg) {
      var d = document.getElementById('art-' + arg);
      if (d) d.open = true;
    }
  });

  /* ======================================================================
     Gesetze A–Z
     ====================================================================== */
  PS.route('staat-gesetze', { title: 'Gesetze A–Z', section: 'staat', after: function (arg) { if (arg) setTimeout(function () { PS.scrollToId('law-' + arg); }, 30); } }, function (main) {
    var G = PS.gesetze, Z = S.gesetzeZahlen;
    var h = '<div class="page">' + head('Staat & Recht · Stand ' + G.stand, 'Gesetze A–Z',
      'In Deutschland gelten rund ' + fmtDe(Z.gesetze) + ' Bundesgesetze und ' + fmtDe(Z.vo) + ' Rechtsverordnungen des Bundes. Hier finden Sie die ' + G.liste.length + ' wichtigsten – vom Grundgesetz bis zum Tierschutzgesetz – mit ihren zentralen Regeln.', 'staat-gesetze');

    h += '<div class="stack-sm"><div class="grid-2" style="gap:10px"><div class="search">' + PS.icon('search') + '<input class="input" type="search" data-q placeholder="Suchen: z. B. „Kündigung“, „BGB“ oder „Miete“" aria-label="Gesetze durchsuchen"></div>' +
      '<select class="input" data-g aria-label="Rechtsgebiet"><option value="">Alle Rechtsgebiete</option>' +
      Object.keys(G.gebiete).map(function (k) { return '<option value="' + k + '">' + esc(G.gebiete[k]) + '</option>'; }).join('') + '</select></div>' +
      '<p class="small muted" data-count></p></div><div class="stack-lg" data-list></div>' +
      '<div class="note">' + PS.icon('info') + '<p>Die Übersicht vereinfacht und ersetzt keine Rechtsberatung. Maßgeblich ist der amtliche Wortlaut auf <a href="https://www.gesetze-im-internet.de" target="_blank" rel="noopener noreferrer">gesetze-im-internet.de</a>. Landesgesetze – etwa zu Schule, Polizei oder Bauordnung – unterscheiden sich von Land zu Land und sind hier nicht aufgeführt.</p></div></div>';
    main.innerHTML = h;
    afterSubnav(main);

    var list = PS.qs('[data-list]', main), count = PS.qs('[data-count]', main);
    var input = PS.qs('[data-q]', main), sel = PS.qs('[data-g]', main);

    function card(l, re) {
      var out = '<article class="law" id="law-' + esc(l.a.replace(/\s+/g, '-')) + '"><div class="law-head"><span class="law-abbr">' + hl(l.a, re) + '</span><span class="law-name">' + hl(l.n, re) + '</span></div>' +
        '<p class="tiny faint">' + esc(G.gebiete[l.g] || '') + ' · seit ' + esc(l.j) + '</p><p>' + hl(l.s, re) + '</p>';
      if (l.w) out += '<p class="small" style="color:var(--ink)"><b>Aktuell:</b> ' + hl(l.w, re) + '</p>';
      if (l.p && l.p.length) {
        out += '<div class="paras">' + l.p.map(function (p) { return '<div><span class="cite">' + esc(p[0]) + '</span><span>' + hl(p[1], re) + '</span></div>'; }).join('') + '</div>';
      }
      if (l.link) out += '<a class="small" href="#' + esc(l.link) + '">Mehr dazu →</a>';
      return out + '</article>';
    }
    function draw() {
      var q = input.value.trim(), g = sel.value;
      var re = makeRe(q);
      var items = G.liste.filter(function (l) {
        if (g && l.g !== g) return false;
        if (!q) return true;
        return matchAll(l.a + ' ' + l.n + ' ' + l.s + ' ' + (l.w || '') + ' ' + (l.p || []).map(function (p) { return p.join(' '); }).join(' '), q);
      });
      var out = '';
      if (q) {
        items = items.slice().sort(function (a, b) { return a.a.localeCompare(b.a, 'de'); });
        out = items.length ? '<div class="lawgrid">' + items.map(function (l) { return card(l, re); }).join('') + '</div>' : '';
      } else {
        Object.keys(G.gebiete).forEach(function (k) {
          var its = items.filter(function (l) { return l.g === k; });
          if (!its.length) return;
          out += '<section class="section"><h2>' + esc(G.gebiete[k]) + ' <span class="faint small" style="font-family:var(--sans);font-weight:400">' + its.length + '</span></h2><div class="lawgrid">' + its.map(function (l) { return card(l, null); }).join('') + '</div></section>';
        });
      }
      list.innerHTML = out || '<div class="panel"><p>Keine Treffer. Versuchen Sie einen anderen Begriff oder wählen Sie „Alle Rechtsgebiete“.</p></div>';
      count.textContent = items.length + (items.length === 1 ? ' Gesetz' : ' Gesetze') + (q || g ? ' gefunden' : ' in ' + Object.keys(G.gebiete).length + ' Rechtsgebieten');
    }
    var timer = null;
    input.addEventListener('input', function () { clearTimeout(timer); timer = setTimeout(draw, 140); });
    sel.addEventListener('change', draw);
    PS.onLeave(function () { clearTimeout(timer); });
    draw();
  });

  /* ======================================================================
     Quiz-Baustein (Übung und Prüfung)
     ====================================================================== */
  PS.quizRun = function (root, questions, opt) {
    opt = opt || {};
    var mode = opt.mode === 'exam' ? 'exam' : 'practice';
    var items = questions.map(function (q) {
      return { q: q, order: PS.shuffle(q.o.map(function (_, i) { return i; })), pick: null };
    });
    var i = 0, timer = null, dead = false;
    var KEYS = 'ABCD';

    function finish() {
      var r = 0;
      items.forEach(function (it) { if (it.pick === it.q.a) r++; });
      if (opt.onDone) opt.onDone({ richtig: r, gesamt: items.length, items: items });
    }
    function render(focus) {
      var it = items[i];
      var picked = it.pick !== null;
      var reveal = mode === 'practice' && picked;
      var u = opt.showUnit ? unitById(it.q.u) : null;
      var h = '<div class="qcard">' +
        '<div class="spread"><p class="eyebrow">Frage ' + (i + 1) + ' von ' + items.length + '</p>' + (u ? '<span class="small muted">' + esc(u.titel) + '</span>' : '') + '</div>' +
        '<div class="progress" aria-hidden="true"><i style="width:' + ((i + (picked ? 1 : 0)) / items.length * 100) + '%"></i></div>' +
        '<p class="qtext" tabindex="-1">' + esc(it.q.q) + '</p><div class="opts" role="group" aria-label="Antworten">';
      it.order.forEach(function (oi, j) {
        var cls = 'opt';
        if (reveal) { if (oi === it.q.a) cls += ' correct'; else if (oi === it.pick) cls += ' wrong'; }
        else if (picked && oi === it.pick) cls += ' chosen';
        h += '<button type="button" class="' + cls + '" data-o="' + oi + '"' + (reveal ? ' disabled' : '') + ' aria-pressed="' + (oi === it.pick ? 'true' : 'false') + '"><span class="key">' + KEYS[j] + '</span><span>' + esc(it.q.o[oi]) + '</span></button>';
      });
      h += '</div>';
      if (reveal) {
        var ok = it.pick === it.q.a;
        h += '<div class="feedback" role="status"><p class="verdict ' + (ok ? 'ok' : 'bad') + '">' + PS.icon(ok ? 'check' : 'x') + (ok ? 'Richtig!' : 'Leider falsch.') + '</p><p>' + esc(it.q.e) + '</p></div>';
      }
      h += '<div class="spread"><div class="btn-row">';
      if (mode === 'exam' && i > 0) h += '<button class="btn btn-quiet btn-sm" type="button" data-prev>' + PS.icon('left') + 'Zurück</button>';
      if (reveal || (mode === 'exam' && picked)) {
        h += '<button class="btn btn-primary btn-sm" type="button" data-next>' + (i < items.length - 1 ? 'Nächste Frage' + PS.icon('right') : 'Zur Auswertung' + PS.icon('check')) + '</button>';
      } else if (mode === 'exam') {
        h += '<button class="btn btn-quiet btn-sm" type="button" data-next>' + (i < items.length - 1 ? 'Überspringen' : 'Zur Auswertung') + '</button>';
      }
      h += '</div><span class="tiny faint kbd-hint">Tasten A–D oder 1–4</span></div></div>';
      root.innerHTML = h;
      if (focus) {
        var qt = PS.qs('.qtext', root);
        if (qt) { try { qt.focus({ preventScroll: true }); } catch (e) { /* ignorieren */ } }
        var top = root.getBoundingClientRect().top;
        if (top < 60 || top > window.innerHeight * 0.6) window.scrollTo({ top: Math.max(0, top + window.pageYOffset - 90), behavior: 'smooth' });
      }
    }
    function pick(oi) {
      var it = items[i];
      if (mode === 'practice' && it.pick !== null) return;
      it.pick = oi;
      clearTimeout(timer);
      if (mode === 'exam') {
        render(false);
        timer = setTimeout(function () { next(); }, 300);
      } else {
        render(false);
        var nb = PS.qs('[data-next]', root);
        if (nb) { try { nb.focus({ preventScroll: true }); } catch (e) { /* ignorieren */ } }
      }
    }
    function next() {
      clearTimeout(timer);
      if (dead) return;
      if (i < items.length - 1) { i++; render(true); }
      else finish();
    }
    function onClick(e) {
      var b = e.target.closest && e.target.closest('button');
      if (!b || !root.contains(b)) return;
      if (b.hasAttribute('data-o')) pick(Number(b.getAttribute('data-o')));
      else if (b.hasAttribute('data-next')) next();
      else if (b.hasAttribute('data-prev')) { clearTimeout(timer); if (i > 0) { i--; render(true); } }
    }
    function onKey(e) {
      if (dead || e.altKey || e.ctrlKey || e.metaKey) return;
      var tag = (e.target && e.target.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (!document.body.contains(root) || !PS.qs('.qcard', root)) return;
      var k = e.key, n = -1;
      if (/^[1-4]$/.test(k)) n = Number(k) - 1;
      else if (/^[a-dA-D]$/.test(k)) n = k.toUpperCase().charCodeAt(0) - 65;
      var order = items[i].order;
      if (n >= 0 && n < order.length) { e.preventDefault(); pick(order[n]); }
      else if (k === 'Enter' && items[i].pick !== null && e.target.tagName !== 'BUTTON') { e.preventDefault(); next(); }
    }
    root.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    render(false);
    return function destroy() {
      dead = true;
      clearTimeout(timer);
      root.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKey);
    };
  };

  /* ======================================================================
     Lerneinheiten
     ====================================================================== */
  function unitState(u, done, best) {
    var qn = PS.quiz.filter(function (q) { return q.u === u.id; }).length;
    if (done[u.id]) return '<span class="pill pill-solid">✓ abgeschlossen</span>';
    if (best[u.id] !== undefined) return '<span class="pill">Übung: ' + best[u.id] + '/' + qn + '</span>';
    return '<span class="pill">' + u.dauer + ' min</span>';
  }

  PS.route('staat-lernen', { title: 'Lerneinheiten', section: 'staat' }, function (main) {
    var done = PS.store.get('lernen:fertig', {});
    var best = PS.store.get('lernen:quiz', {});
    var nDone = PS.lernen.filter(function (u) { return done[u.id]; }).length;
    var mins = PS.lernen.reduce(function (s, u) { return s + u.dauer; }, 0);

    var h = '<div class="page">' + head('Staat & Recht', 'Lerneinheiten',
      PS.lernen.length + ' Einheiten führen Schritt für Schritt durch Staat, Verfassung und Politik – von den Grundprinzipien bis zur Geschichte des Grundgesetzes. Jede Einheit hat Lernziele, Merksätze und zehn Übungsfragen.', 'staat-lernen');

    h += '<div class="panel stack-sm"><div class="spread"><p><b>' + nDone + ' von ' + PS.lernen.length + '</b> Einheiten abgeschlossen</p><span class="small muted">Gesamte Lernzeit etwa ' + Math.round(mins / 60 * 10) / 10 + ' Stunden</span></div><div class="progress" aria-hidden="true"><i style="width:' + (nDone / PS.lernen.length * 100) + '%"></i></div>' +
      '<p class="tiny faint">Ihr Fortschritt wird nur in diesem Browser gespeichert. Eine Einheit gilt als abgeschlossen, wenn Sie sie markieren oder mindestens 7 von 10 Übungsfragen richtig beantworten.</p></div>';

    h += '<div class="unitlist">';
    PS.lernen.forEach(function (u, i) {
      h += '<a class="unit" href="#lerneinheit.' + u.id + '"><span class="uno">' + (i < 9 ? '0' : '') + (i + 1) + '</span><div><h3>' + esc(u.titel) + '</h3><p>' + esc(u.kurz) + '</p></div><span class="ustate">' + unitState(u, done, best) + '</span></a>';
    });
    h += '</div>';

    h += '<div class="btn-row"><a class="btn btn-primary" href="#staat-test">' + PS.icon('quiz') + 'Staatskunde-Test starten</a><a class="btn" href="#glossar">Glossar</a>' +
      (nDone ? '<button class="btn btn-quiet" type="button" data-reset>' + PS.icon('reset') + 'Fortschritt zurücksetzen</button>' : '') + '</div></div>';
    main.innerHTML = h;
    afterSubnav(main);
    var r = PS.qs('[data-reset]', main);
    if (r) r.addEventListener('click', function () {
      if (r.getAttribute('data-sure')) {
        PS.store.del('lernen:fertig'); PS.store.del('lernen:quiz');
        PS.toast('Fortschritt zurückgesetzt');
        PS.render();
      } else {
        r.setAttribute('data-sure', '1');
        r.lastChild.textContent = 'Wirklich zurücksetzen? Nochmals klicken';
      }
    });
  });

  PS.route('lerneinheit', {
    title: function (arg) { var u = unitById(arg); return u ? u.titel + ' · Lerneinheit' : 'Lerneinheit'; },
    section: 'staat'
  }, function (main, arg) {
    var idx = unitIndex(arg);
    if (idx < 0) { PS.routes.notfound.fn(main); return; }
    var u = PS.lernen[idx];
    var prev = PS.lernen[idx - 1], next = PS.lernen[idx + 1];
    var done = PS.store.get('lernen:fertig', {});
    var qs = PS.quiz.filter(function (q) { return q.u === u.id; });

    var h = '<div class="page">' + subnav('staat-lernen') + '<div class="lesson"><article class="stack-lg">' +
      '<header class="stack"><p class="eyebrow">Lerneinheit ' + (idx + 1) + ' von ' + PS.lernen.length + ' · etwa ' + u.dauer + ' Minuten</p><h1 class="h1-sm">' + esc(u.titel) + '</h1><p class="lead">' + esc(u.kurz) + '</p></header>' +
      '<section class="panel stack-sm"><h2 class="h3">Lernziele – nach dieser Einheit können Sie …</h2><ul style="padding-left:1.2em;display:grid;gap:4px">' + u.ziele.map(function (z) { return '<li>' + esc(z) + '</li>'; }).join('') + '</ul></section>' +
      '<div class="prose">';
    u.abschnitte.forEach(function (a, i) {
      h += '<h2 id="u-' + i + '">' + esc(a.h) + '</h2>' + wrapTables(a.html);
    });
    h += '</div>';
    h += '<section class="merke" data-label="Das Wichtigste in Kürze"><ul style="padding-left:1.2em;display:grid;gap:6px">' + u.merke.map(function (m) { return '<li>' + esc(m) + '</li>'; }).join('') + '</ul></section>';
    h += '<section class="stack-sm"><h2 class="h3">Wichtige Begriffe</h2><div class="terms">' + u.begriffe.map(function (b) {
      var g = glossLookup(b);
      return g ? '<a class="pill pill-ink" style="text-decoration:none" href="#glossar.' + encodeURIComponent(g) + '">' + esc(b) + '</a>' : '<span class="pill">' + esc(b) + '</span>';
    }).join('') + '</div><p class="tiny faint">Umrandete Begriffe sind im Glossar erklärt.</p></section>';
    h += '<section class="stack" id="u-quiz"><div class="stack-sm"><h2>Übungsfragen</h2><p class="muted">' + qs.length + ' Fragen zu dieser Einheit – mit Erklärung nach jeder Antwort.</p></div><div data-quiz><div class="panel spread"><p>Bereit? Die Fragen erscheinen einzeln, die Antworten in zufälliger Reihenfolge.</p><button class="btn btn-primary" type="button" data-startquiz>' + PS.icon('quiz') + 'Übung starten</button></div></div></section>';
    h += '<nav class="spread" aria-label="Weitere Einheiten">' +
      (prev ? '<a class="btn btn-quiet" href="#lerneinheit.' + prev.id + '">' + PS.icon('left') + esc(prev.titel) + '</a>' : '<a class="btn btn-quiet" href="#staat-lernen">' + PS.icon('left') + 'Alle Einheiten</a>') +
      (next ? '<a class="btn" href="#lerneinheit.' + next.id + '">' + esc(next.titel) + PS.icon('right') + '</a>' : '<a class="btn btn-primary" href="#staat-test">Zum Staatskunde-Test' + PS.icon('right') + '</a>') +
      '</nav></article>';

    h += '<aside class="lesson-aside"><div class="panel panel-tight stack-sm"><p class="eyebrow">Inhalt</p><ul class="toc">';
    u.abschnitte.forEach(function (a, i) { h += '<li><a href="#lerneinheit.' + u.id + '" data-jump="u-' + i + '">' + esc(a.h) + '</a></li>'; });
    h += '<li><a href="#lerneinheit.' + u.id + '" data-jump="u-quiz">Übungsfragen</a></li></ul></div>' +
      '<div class="panel panel-tight stack-sm"><label class="check"><input type="checkbox" data-done' + (done[u.id] ? ' checked' : '') + '> Als abgeschlossen markieren</label><a class="small" href="#staat-lernen">Alle Lerneinheiten</a></div></aside></div></div>';
    main.innerHTML = h;
    afterSubnav(main);

    PS.qs('[data-done]', main).addEventListener('change', function (e) {
      var d = PS.store.get('lernen:fertig', {});
      if (e.target.checked) d[u.id] = true; else delete d[u.id];
      PS.store.set('lernen:fertig', d);
      PS.toast(e.target.checked ? 'Einheit als abgeschlossen markiert' : 'Markierung entfernt');
    });

    var destroy = null;
    var holder = PS.qs('[data-quiz]', main);
    function startQuiz() {
      if (destroy) destroy();
      destroy = PS.quizRun(holder, PS.shuffle(qs), {
        mode: 'practice',
        onDone: function (res) {
          destroy();
          destroy = null;
          var best = PS.store.get('lernen:quiz', {});
          if (best[u.id] === undefined || res.richtig > best[u.id]) best[u.id] = res.richtig;
          PS.store.set('lernen:quiz', best);
          var passed = res.richtig >= Math.ceil(res.gesamt * 0.7);
          if (passed) {
            var d = PS.store.get('lernen:fertig', {});
            d[u.id] = true;
            PS.store.set('lernen:fertig', d);
            var cb = PS.qs('[data-done]', main);
            if (cb) cb.checked = true;
          }
          holder.innerHTML = '<div class="panel panel-ink stack"><p class="eyebrow">Auswertung</p><p class="scorebig">' + res.richtig + '/' + res.gesamt + '</p>' +
            '<p>' + (passed ? '<b>Gut gemacht!</b> Die Einheit ist als abgeschlossen markiert.' : 'Lesen Sie die Abschnitte noch einmal und versuchen Sie es erneut – ab 7 richtigen Antworten gilt die Einheit als abgeschlossen.') + '</p>' +
            '<div class="btn-row"><button class="btn" type="button" data-startquiz>' + PS.icon('reset') + 'Noch einmal</button>' + (next ? '<a class="btn btn-primary" href="#lerneinheit.' + next.id + '">Nächste Einheit' + PS.icon('right') + '</a>' : '<a class="btn btn-primary" href="#staat-test">Zum Staatskunde-Test</a>') + '</div></div>';
          PS.qs('[data-startquiz]', holder).addEventListener('click', startQuiz);
        }
      });
    }
    PS.qs('[data-startquiz]', holder).addEventListener('click', startQuiz);
    PS.onLeave(function () { if (destroy) destroy(); });
  });

  /* ======================================================================
     Staatskunde-Test
     ====================================================================== */
  function rating(p) {
    if (p >= 90) return 'Hervorragend – Sie kennen sich im Staat bestens aus.';
    if (p >= 75) return 'Sehr gut – ein solides Wissen über Staat und Verfassung.';
    if (p >= 50) return 'Bestanden – mit Luft nach oben.';
    return 'Noch nicht bestanden – die Lerneinheiten helfen weiter.';
  }

  PS.route('staat-test', { title: 'Staatskunde-Test', section: 'staat' }, function (main) {
    var last = PS.store.get('staatstest:letztes', null);
    var destroy = null;
    PS.onLeave(function () { if (destroy) destroy(); });

    function setup() {
      var h = '<div class="page">' + head('Staat & Recht', 'Staatskunde-Test',
        'Wie gut kennen Sie Grundgesetz, Staatsorgane, Wahlen und Europa? ' + PS.quiz.length + ' Fragen aus ' + PS.lernen.length + ' Themen stehen zur Auswahl – jeder Durchgang wird neu zusammengestellt.', 'staat-test');
      h += '<form class="panel stack-lg" data-setup>' +
        '<fieldset class="stack-sm"><legend>Anzahl der Fragen</legend><div class="row">' +
        [10, 20, 30, 0].map(function (n) { return '<label class="check"><input type="radio" name="n" value="' + n + '"' + (n === 30 ? ' checked' : '') + '> ' + (n ? n + ' Fragen' : 'alle Fragen') + '</label>'; }).join('') +
        '</div></fieldset>' +
        '<fieldset class="stack-sm"><legend>Modus</legend><div class="stack-sm">' +
        '<label class="check"><input type="radio" name="m" value="practice" checked> Übung – Lösung und Erklärung nach jeder Frage</label>' +
        '<label class="check"><input type="radio" name="m" value="exam"> Prüfung – Auswertung erst am Ende</label>' +
        '</div></fieldset>' +
        '<fieldset class="stack-sm"><legend>Themen</legend><div class="btn-row"><button class="btn btn-sm btn-quiet" type="button" data-all>Alle</button><button class="btn btn-sm btn-quiet" type="button" data-none>Keine</button></div><div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:8px">' +
        PS.lernen.map(function (u) { return '<label class="check" style="font-weight:500"><input type="checkbox" name="u" value="' + u.id + '" checked> ' + esc(u.titel) + '</label>'; }).join('') +
        '</div></fieldset>' +
        '<p class="small" data-warn hidden style="color:var(--bad)">Bitte wählen Sie mindestens ein Thema aus.</p>' +
        '<div class="btn-row"><button class="btn btn-primary" type="submit">' + PS.icon('right') + 'Test starten</button></div></form>';
      if (last && last.gesamt) {
        h += '<section class="panel panel-tight spread"><div><p class="eyebrow">Letzter Durchgang</p><p><b>' + last.richtig + ' von ' + last.gesamt + '</b> richtig (' + Math.round(last.richtig / last.gesamt * 100) + ' %)' + (last.best ? ' · Bestwert: ' + last.best + ' %' : '') + '</p></div></section>';
      }
      h += '</div>';
      main.innerHTML = h;
      afterSubnav(main);
      var form = PS.qs('[data-setup]', main);
      PS.qs('[data-all]', form).addEventListener('click', function () { PS.qsa('input[name=u]', form).forEach(function (c) { c.checked = true; }); });
      PS.qs('[data-none]', form).addEventListener('click', function () { PS.qsa('input[name=u]', form).forEach(function (c) { c.checked = false; }); });
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var units = PS.qsa('input[name=u]', form).filter(function (c) { return c.checked; }).map(function (c) { return c.value; });
        if (!units.length) { PS.qs('[data-warn]', form).hidden = false; return; }
        var n = Number((PS.qs('input[name=n]:checked', form) || {}).value || 30);
        var mode = (PS.qs('input[name=m]:checked', form) || {}).value || 'practice';
        var pool = PS.shuffle(PS.quiz.filter(function (q) { return units.indexOf(q.u) >= 0; }));
        if (n) pool = pool.slice(0, n);
        run(pool, mode);
      });
    }

    function run(pool, mode) {
      main.innerHTML = '<div class="page">' + subnav('staat-test') + '<header class="spread"><div class="stack-sm"><p class="eyebrow">Staatskunde-Test · ' + (mode === 'exam' ? 'Prüfung' : 'Übung') + '</p><h1 class="h1-sm">Frage für Frage</h1></div><button class="btn btn-sm btn-quiet" type="button" data-cancel>Abbrechen</button></header><div data-q></div></div>';
      afterSubnav(main);
      PS.qs('[data-cancel]', main).addEventListener('click', function () { if (destroy) destroy(); destroy = null; setup(); window.scrollTo(0, 0); });
      destroy = PS.quizRun(PS.qs('[data-q]', main), pool, {
        mode: mode, showUnit: true,
        onDone: function (res) { destroy(); destroy = null; result(res, mode); }
      });
    }

    function result(res, mode) {
      var pct = Math.round(res.richtig / res.gesamt * 100);
      var prevBest = last && last.best ? last.best : 0;
      last = { datum: Date.now(), richtig: res.richtig, gesamt: res.gesamt, best: Math.max(prevBest, pct) };
      PS.store.set('staatstest:letztes', last);

      var per = {};
      res.items.forEach(function (it) {
        var p = per[it.q.u] || (per[it.q.u] = { r: 0, n: 0 });
        p.n++; if (it.pick === it.q.a) p.r++;
      });
      var wrong = res.items.filter(function (it) { return it.pick !== it.q.a; });

      var h = '<div class="page">' + subnav('staat-test') +
        '<header class="stack"><p class="eyebrow">Staatskunde-Test · Auswertung</p><h1 class="h1-sm">Ihr Ergebnis</h1></header>' +
        '<div class="grid-2"><div class="panel panel-ink stack"><p class="scorebig">' + res.richtig + '/' + res.gesamt + '</p><p><b>' + pct + ' %</b> richtig</p><p class="muted">' + esc(rating(pct)) + '</p></div>' +
        '<div class="panel stack-sm"><h2 class="h3">Nach Themen</h2><div class="profile">';
      PS.lernen.forEach(function (u) {
        var p = per[u.id];
        if (!p) return;
        h += '<div class="profile-row"><a href="#lerneinheit.' + u.id + '" class="small">' + esc(u.titel) + '</a><div class="res-bar" aria-hidden="true"><i style="width:' + (p.r / p.n * 100) + '%"></i></div><span class="num mono small">' + p.r + '/' + p.n + '</span></div>';
      });
      h += '</div></div></div>';

      if (wrong.length) {
        h += '<section class="section"><h2>' + (wrong.length === 1 ? 'Diese Frage' : 'Diese ' + wrong.length + ' Fragen') + ' sollten Sie wiederholen</h2><div>';
        wrong.forEach(function (it) {
          var u = unitById(it.q.u);
          h += '<details class="fold"><summary><span class="verdict bad">' + PS.icon('x') + '</span><span>' + esc(it.q.q) + '</span><span class="chev">' + PS.icon('chev') + '</span></summary><div class="fold-body stack-sm">' +
            '<p><b>Richtig:</b> ' + esc(it.q.o[it.q.a]) + '</p>' +
            '<p class="small">' + (it.pick === null ? '<span class="faint">Nicht beantwortet.</span>' : '<b>Ihre Antwort:</b> ' + esc(it.q.o[it.pick])) + '</p>' +
            '<p class="small muted">' + esc(it.q.e) + '</p>' + (u ? '<a class="small" href="#lerneinheit.' + u.id + '">Lerneinheit „' + esc(u.titel) + '“</a>' : '') + '</div></details>';
        });
        h += '</div></section>';
      } else {
        h += '<div class="merke" data-label="Perfekt"><p>Alle Fragen richtig beantwortet. Respekt!</p></div>';
      }

      h += '<div class="btn-row"><button class="btn btn-primary" type="button" data-new>' + PS.icon('reset') + 'Neuer Test</button>' +
        (wrong.length ? '<button class="btn" type="button" data-retry>Nur falsche Fragen wiederholen</button>' : '') +
        '<a class="btn btn-quiet" href="#staat-lernen">Zu den Lerneinheiten</a></div></div>';
      main.innerHTML = h;
      afterSubnav(main);
      window.scrollTo(0, 0);
      PS.qs('[data-new]', main).addEventListener('click', function () { setup(); window.scrollTo(0, 0); });
      var rt = PS.qs('[data-retry]', main);
      if (rt) rt.addEventListener('click', function () { run(PS.shuffle(wrong.map(function (w) { return w.q; })), mode); window.scrollTo(0, 0); });
    }

    setup();
  });

  /* ======================================================================
     Glossar
     ====================================================================== */
  PS.route('glossar', {
    title: 'Glossar', section: 'staat',
    after: function (arg) {
      if (!arg) return;
      setTimeout(function () {
        var id = glossId(arg);
        var el = document.getElementById(id);
        if (el) { el.classList.add('hl'); PS.scrollToId(id); }
      }, 30);
    }
  }, function (main) {
    var units = {};
    PS.lernen.forEach(function (u) { u.begriffe.forEach(function (b) { var k = PS.norm(b); (units[k] = units[k] || []).push(u); }); });
    var items = S.glossar.slice().sort(function (a, b) { return a[0].localeCompare(b[0], 'de'); });

    var h = '<div class="page">' + head('Staat & Recht', 'Glossar', S.glossar.length + ' Begriffe aus Politik, Staat und Recht – kurz und verständlich erklärt.', 'glossar') +
      '<div class="stack-sm"><div class="search">' + PS.icon('search') + '<input class="input" type="search" data-q placeholder="Begriff suchen" aria-label="Glossar durchsuchen"></div><nav class="letters" aria-label="Nach Anfangsbuchstaben" data-letters></nav></div>' +
      '<dl class="gloss" data-list></dl></div>';
    main.innerHTML = h;
    afterSubnav(main);

    var list = PS.qs('[data-list]', main), letters = PS.qs('[data-letters]', main), input = PS.qs('[data-q]', main);
    function draw() {
      var q = input.value.trim();
      var re = makeRe(q);
      var out = '', seen = {}, nav = '';
      items.forEach(function (g) {
        if (q && !matchAll(g[0] + ' ' + g[1], q)) return;
        var L = PS.norm(g[0]).charAt(0).toUpperCase();
        var first = !seen[L];
        if (first) { seen[L] = true; nav += '<a href="#glossar" data-jump="' + glossId(g[0]) + '">' + L + '</a>'; }
        var us = units[PS.norm(g[0])] || [];
        out += '<dt id="' + glossId(g[0]) + '">' + hl(g[0], re) + '</dt><dd>' + hl(g[1], re) +
          (us.length ? '<br><span class="tiny faint">Mehr dazu: ' + us.map(function (u) { return '<a href="#lerneinheit.' + u.id + '">' + esc(u.titel) + '</a>'; }).join(', ') + '</span>' : '') + '</dd>';
      });
      list.innerHTML = out || '<dt>Keine Treffer</dt><dd>Versuchen Sie einen anderen Suchbegriff.</dd>';
      letters.innerHTML = nav;
    }
    var timer = null;
    input.addEventListener('input', function () { clearTimeout(timer); timer = setTimeout(draw, 120); });
    PS.onLeave(function () { clearTimeout(timer); });
    draw();
  });
})();
