/* ==========================================================================
   Prüfstand – Daten IQ-Test
   40 selbst entwickelte Aufgaben in sechs Bereichen. Die Figuren werden aus
   einfachen Formbeschreibungen als SVG gezeichnet (Koordinaten je Feld 0–100).
   Hinweis: Der Test ist nicht an einer repräsentativen Stichprobe normiert.
   ========================================================================== */
window.PS = window.PS || {};
(function () {
  'use strict';

  /* ---------- Formen ---------- */
  function C(x, y, r, f) { return { k: 'circle', x: x, y: y, r: r, f: f || 'o' }; }
  function Sq(x, y, r, f) { return { k: 'square', x: x, y: y, r: r, f: f || 'o' }; }
  function Poly(n, x, y, r, f, rot) { return { k: 'poly', n: n, x: x, y: y, r: r, f: f || 'o', rot: rot || 0 }; }
  function Tri(x, y, r, f, rot) { return Poly(3, x, y, r, f, rot); }
  function Dia(x, y, r, f) { return Poly(4, x, y, r, f, 0); }
  function Ln(x1, y1, x2, y2, w) { return { k: 'line', x1: x1, y1: y1, x2: x2, y2: y2, w: w || 3 }; }
  function Plus(x, y, r, w) { return { k: 'plus', x: x, y: y, r: r, w: w || 3 }; }
  function Frame(p) { return { k: 'frame', p: p }; }
  function Arrow(rot) { return { k: 'arrow', rot: rot }; }
  function Hand(len, rot, w, dot) { return { k: 'hand', len: len, rot: rot, w: w, dot: dot || 0 }; }
  function Pts(pts, f) { return { k: 'pts', pts: pts, f: f || 'o' }; }
  function G(tf, children) { return { k: 'g', tf: tf, c: children }; }
  function Txt(x, y, t, size) { return { k: 'text', x: x, y: y, t: t, size: size || 14 }; }
  function Rect(x, y, w, h, f) { return { k: 'rect', x: x, y: y, w: w, h: h, f: f || 'o' }; }

  /* Anordnungen */
  function rowPos(n) {
    return {
      1: [[50, 50]],
      2: [[33, 50], [67, 50]],
      3: [[22, 50], [50, 50], [78, 50]],
      4: [[14, 50], [38, 50], [62, 50], [86, 50]]
    }[n];
  }
  function dicePos(n) {
    return {
      1: [[50, 50]],
      2: [[30, 30], [70, 70]],
      3: [[26, 26], [50, 50], [74, 74]],
      4: [[30, 30], [70, 30], [30, 70], [70, 70]],
      5: [[26, 26], [74, 26], [50, 50], [26, 74], [74, 74]],
      6: [[30, 24], [70, 24], [30, 50], [70, 50], [30, 76], [70, 76]]
    }[n];
  }
  function many(n, maker, layout) {
    return (layout || rowPos)(n).map(function (p) { return maker(p[0], p[1]); });
  }
  function cells(fn) {
    var out = [];
    for (var r = 0; r < 3; r++) for (var c = 0; c < 3; c++) out.push(fn(r, c));
    return out; // 9 Felder, das neunte ist die Lösung
  }
  function matrix(all, distractors) {
    return { matrix: all.slice(0, 8), o: [all[8]].concat(distractors), a: 0 };
  }
  function extend(base, more) { for (var k in more) base[k] = more[k]; return base; }

  /* ---------- Matrizen ---------- */

  // M1: Anzahl steigt je Spalte, Form je Zeile
  var m1Shapes = [
    function (x, y) { return C(x, y, 10); },
    function (x, y) { return Sq(x, y, 9); },
    function (x, y) { return Tri(x, y + 2, 12); }
  ];
  var m1 = matrix(cells(function (r, c) { return many(c + 1, m1Shapes[r]); }), [
    many(2, m1Shapes[2]),
    many(4, m1Shapes[2]),
    many(3, m1Shapes[1]),
    many(3, m1Shapes[0]),
    many(3, function (x, y) { return Tri(x, y + 2, 12, 'b'); })
  ]);

  // M2: äußere Form je Zeile, innere Form je Spalte
  var m2Outer = [C(50, 50, 36), Sq(50, 50, 31), Dia(50, 50, 41)];
  var m2Inner = [C(50, 50, 7, 'b'), Plus(50, 50, 11, 3), Tri(50, 52, 12, 'b')];
  var m2 = matrix(cells(function (r, c) { return [m2Outer[r], m2Inner[c]]; }), [
    [m2Outer[2], m2Inner[0]],
    [m2Outer[2], m2Inner[1]],
    [m2Outer[1], m2Inner[2]],
    [m2Outer[0], m2Inner[2]],
    [m2Outer[2], Tri(50, 48, 12, 'b', 180)]
  ]);

  // M3: Pfeil dreht sich je Feld um 90° im Uhrzeigersinn
  var m3 = matrix(cells(function (r, c) { return [Arrow((90 * (r + c)) % 360)]; }), [
    [Arrow(90)], [Arrow(180)], [Arrow(270)], [Arrow(45)], [Arrow(315)]
  ]);

  // M4: Lateinisches Quadrat aus Form und Füllung
  var m4Shape = [
    function (f) { return C(50, 50, 28, f); },
    function (f) { return Sq(50, 50, 25, f); },
    function (f) { return Tri(50, 55, 33, f); }
  ];
  var m4Fill = ['o', 'b', 'g'];
  var m4 = matrix(cells(function (r, c) { return [m4Shape[(r + c) % 3](m4Fill[(c - r + 3) % 3])]; }), [
    [m4Shape[1]('b')], [m4Shape[1]('g')], [m4Shape[0]('o')], [m4Shape[2]('o')], [Dia(50, 50, 33, 'o')]
  ]);

  // M5: Überlagerung – drittes Feld = erstes + zweites
  var V = Ln(50, 15, 50, 85), H = Ln(15, 50, 85, 50), D1 = Ln(15, 15, 85, 85), D2 = Ln(85, 15, 15, 85), O = C(50, 50, 16);
  var F5 = Frame(15);
  var m5rows = [[[V], [H], [V, H]], [[D1], [D2], [D1, D2]], [[O], [V], [O, V]]];
  var m5 = matrix(cells(function (r, c) { return [F5].concat(m5rows[r][c]); }), [
    [F5, O, H], [F5, O], [F5, V], [F5, O, V, H], [F5, O, D1, D2]
  ]);

  // M6: Punkte – drittes Feld = Summe der ersten beiden
  function dots(n, f) { return many(n, function (x, y) { return C(x, y, 8, f || 'b'); }, dicePos); }
  var m6n = [[1, 2, 3], [2, 3, 5], [3, 1, 4]];
  var m6 = matrix(cells(function (r, c) { return dots(m6n[r][c]); }), [
    dots(3), dots(5), dots(6), dots(2), dots(4, 'o')
  ]);

  // M7: Schwarz/Weiß – Gesamtzahl je Zeile +1, je Feld wird ein schwarzer Kreis weiß
  function bw(black, white) {
    var pos = dicePos(black + white);
    return pos.map(function (p, i) { return C(p[0], p[1], 10, i < black ? 'b' : 'o'); });
  }
  var m7 = matrix(cells(function (r, c) { return bw(3 + r - c, c); }), [
    bw(2, 3), bw(4, 1), bw(3, 1), bw(3, 3), bw(1, 4)
  ]);

  // M8: Punkt wandert im, Quadrat gegen den Uhrzeigersinn
  var corner = [[29, 29], [71, 29], [71, 71], [29, 71]]; // oben links, oben rechts, unten rechts, unten links
  function m8cell(d, q) {
    return [Frame(12), C(corner[d][0], corner[d][1], 9, 'b'), Sq(corner[q][0], corner[q][1], 9, 'o')];
  }
  var m8 = matrix(cells(function (r, c) {
    var s = r + c;
    return m8cell(s % 4, ((3 - s) % 4 + 4) % 4);
  }), [m8cell(0, 2), m8cell(3, 0), m8cell(1, 3), m8cell(2, 1), m8cell(0, 1)]);

  // M9: Exklusives Oder – gemeinsame Punkte verschwinden
  function gridDots(set) {
    var out = [Frame(10)];
    for (var i = 0; i < 9; i++) {
      var x = 25 + 25 * (i % 3), y = 25 + 25 * Math.floor(i / 3);
      out.push(set.indexOf(i) >= 0 ? C(x, y, 7, 'b') : C(x, y, 1.6, 'g'));
    }
    return out;
  }
  var m9sets = [[[0, 2, 4], [2, 6], [0, 4, 6]], [[1, 4, 7], [3, 4, 5], [1, 3, 5, 7]], [[0, 3, 4, 8], [4, 5, 8], [0, 3, 5]]];
  var m9 = matrix(cells(function (r, c) { return gridDots(m9sets[r][c]); }), [
    gridDots([0, 3, 4, 5, 8]), gridDots([4, 8]), gridDots([0, 3, 5, 8]), gridDots([3, 5]), gridDots([0, 4, 5])
  ]);

  // M10: Eckenzahl steigt nach rechts und nach unten um eins
  function ngon(n, f) { return [Poly(n, 50, 51, 34, f || 'o')]; }
  var m10 = matrix(cells(function (r, c) { return ngon(3 + r + c); }), [
    ngon(6), ngon(8), ngon(5), [C(50, 51, 34)], ngon(7, 'b')
  ]);

  // M11: Form und Anzahl als lateinische Quadrate, Füllung je Spalte
  var m11Shape = [
    function (x, y, f) { return C(x, y, 11, f); },
    function (x, y, f) { return Sq(x, y, 10, f); },
    function (x, y, f) { return Tri(x, y + 2, 13, f); }
  ];
  var m11Fill = ['o', 'g', 'b'];
  function m11cell(shape, n, f) { return many(n, function (x, y) { return m11Shape[shape](x, y, f); }); }
  var m11 = matrix(cells(function (r, c) {
    return m11cell((r + c) % 3, (((r - c) % 3) + 3) % 3 + 1, m11Fill[c]);
  }), [m11cell(1, 2, 'b'), m11cell(1, 1, 'g'), m11cell(0, 1, 'b'), m11cell(1, 3, 'b'), m11cell(2, 1, 'b')]);

  // M12: Zwei Zeiger, Felder in Leserichtung
  function clock(a, b) {
    return [C(50, 50, 40, 'o'), Hand(33, a, 2.5, 4.5), Hand(20, b, 7, 0), C(50, 50, 3.5, 'b')];
  }
  var m12 = matrix(cells(function (r, c) {
    var k = 3 * r + c;
    return clock((45 * k) % 360, (((180 - 90 * k) % 360) + 360) % 360);
  }), [clock(0, 90), clock(315, 180), clock(45, 180), clock(0, 0), clock(180, 0)]);

  /* ---------- Räumliches Denken ---------- */
  var F_SHAPE = '30,18 72,18 72,32 44,32 44,46 64,46 64,60 44,60 44,84 30,84';
  var P_PATH = 'M28 14H68V52H42V86H28ZM42 26H56V40H42Z';
  function fShape(tf) { return [G(tf, [Pts(F_SHAPE, 'b')])]; }
  function pShape(tf) { return [G(tf, [{ k: 'path', d: P_PATH, f: 'b' }])]; }
  var MIRROR = 'translate(100 0) scale(-1 1)';

  // Gittermuster 3 × 3
  function gridPattern(set) {
    var out = [];
    for (var i = 0; i < 9; i++) {
      var r = Math.floor(i / 3), c = i % 3;
      out.push(Rect(17 + 22 * c, 17 + 22 * r, 22, 22, set.indexOf(i) >= 0 ? 'b' : 'o'));
    }
    return out;
  }
  function mapSet(set, fn) {
    return set.map(function (i) { var p = fn(Math.floor(i / 3), i % 3); return 3 * p[0] + p[1]; }).sort(function (a, b) { return a - b; });
  }
  var PATTERN = [0, 1, 5, 7];
  var rot180 = mapSet(PATTERN, function (r, c) { return [2 - r, 2 - c]; });
  var flipH = mapSet(PATTERN, function (r, c) { return [r, 2 - c]; });
  var flipV = mapSet(PATTERN, function (r, c) { return [2 - r, c]; });
  var rot90 = mapSet(PATTERN, function (r, c) { return [c, 2 - r]; });

  // Würfelnetze (Zeile, Spalte)
  function net(cellsRC, labels) {
    var maxR = 0, maxC = 0;
    cellsRC.forEach(function (p) { maxR = Math.max(maxR, p[0]); maxC = Math.max(maxC, p[1]); });
    var u = labels ? 19 : 16;
    var ox = 50 - (maxC + 1) * u / 2, oy = 50 - (maxR + 1) * u / 2;
    var out = [];
    cellsRC.forEach(function (p, i) {
      out.push(Rect(ox + p[1] * u, oy + p[0] * u, u, u, 'g2'));
      if (labels) out.push(Txt(ox + p[1] * u + u / 2, oy + p[0] * u + u / 2, labels[i], 11));
    });
    return out;
  }
  var NETS = {
    kreuz: [[1, 0], [1, 1], [1, 2], [1, 3], [0, 1], [2, 1]],
    versetzt: [[1, 0], [1, 1], [1, 2], [1, 3], [0, 0], [2, 3]],
    dreiDrei: [[0, 0], [0, 1], [0, 2], [1, 2], [1, 3], [1, 4]],
    treppe: [[0, 0], [0, 1], [1, 1], [1, 2], [2, 2], [2, 3]],
    falsch: [[1, 0], [1, 1], [1, 2], [1, 3], [0, 0], [0, 1]]
  };
  var LETTER_NET = [[1, 0], [1, 1], [1, 2], [1, 3], [0, 0], [2, 2]];
  var LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

  /* ---------- Aufgaben ---------- */
  var Q_MATRIX = 'Welche Figur ergänzt die Matrix sinnvoll?';
  var Q_SERIES = 'Welche Zahl setzt die Reihe fort?';

  var items = [
    extend({ id: 'm1', kat: 'matrix', q: Q_MATRIX, e: 'In jeder Zeile bleibt die Form gleich, von Spalte zu Spalte kommt eine Figur hinzu (1, 2, 3). In der dritten Zeile fehlen also drei leere Dreiecke.' }, m1),
    { id: 'z1', kat: 'zahlen', q: Q_SERIES, seq: '3 · 6 · 12 · 24 · 48 · ?', o: ['96', '72', '64', '90', '100'], a: 0, e: 'Jede Zahl wird verdoppelt: 48 × 2 = 96.' },
    { id: 'v1', kat: 'sprache', q: '„Buch“ verhält sich zu „lesen“ wie „Gabel“ zu …', o: ['essen', 'Messer', 'Küche', 'Teller', 'Löffel'], a: 0, e: 'Ein Buch benutzt man zum Lesen, eine Gabel zum Essen. Gefragt ist die Tätigkeit, nicht ein weiterer Gegenstand.' },
    extend({ id: 'm2', kat: 'matrix', q: Q_MATRIX, e: 'Die äußere Form hängt von der Zeile ab (Kreis, Quadrat, Raute), die innere von der Spalte (Punkt, Kreuz, Dreieck mit der Spitze nach oben). Gesucht ist eine Raute mit Dreieck.' }, m2),
    { id: 'l2', kat: 'logik', q: 'Anna ist größer als Ben. Carla ist kleiner als Ben. Dirk ist größer als Anna. Wer ist am kleinsten?', o: ['Carla', 'Ben', 'Anna', 'Dirk', 'Das lässt sich nicht bestimmen.'], a: 0, e: 'Die Reihenfolge lautet: Dirk > Anna > Ben > Carla.' },
    { id: 's2', kat: 'raum', q: 'Welche Figur entsteht, wenn man die Vorlage um 90 Grad im Uhrzeigersinn dreht?', fig: fShape(''), o: [fShape('rotate(90 50 50)'), fShape('rotate(270 50 50)'), fShape('rotate(180 50 50)'), fShape(MIRROR), fShape(MIRROR + ' rotate(90 50 50)')], a: 0, e: 'Nach einer Vierteldrehung im Uhrzeigersinn liegt der lange Balken oben, die beiden Querbalken zeigen nach unten – der längere am rechten Ende.' },
    { id: 'z2', kat: 'zahlen', q: Q_SERIES, seq: '2 · 5 · 9 · 14 · 20 · ?', o: ['27', '26', '28', '25', '30'], a: 0, e: 'Die Abstände wachsen jeweils um eins: +3, +4, +5, +6 und dann +7.' },
    extend({ id: 'm3', kat: 'matrix', q: Q_MATRIX, e: 'Der Pfeil dreht sich von Feld zu Feld um 90 Grad im Uhrzeigersinn; jede Zeile beginnt eine Vierteldrehung weiter. Nach „unten“ und „links“ folgt „oben“.' }, m3),
    { id: 'v2', kat: 'sprache', q: 'Welches Wort passt nicht in die Reihe? Ahorn – Eiche – Tanne – Buche – Birke', o: ['Tanne', 'Ahorn', 'Eiche', 'Buche', 'Birke'], a: 0, e: 'Ahorn, Eiche, Buche und Birke sind Laubbäume, die Tanne ist ein Nadelbaum.' },
    { id: 'r3', kat: 'rechnen', q: 'Fünf Maschinen stellen in fünf Minuten fünf Teile her. Wie lange brauchen 100 Maschinen für 100 Teile?', o: ['5 Minuten', '100 Minuten', '20 Minuten', '1 Minute', '50 Minuten'], a: 0, e: 'Jede Maschine braucht fünf Minuten für ein Teil. 100 Maschinen fertigen gleichzeitig 100 Teile – ebenfalls in fünf Minuten.' },
    extend({ id: 'm6', kat: 'matrix', q: Q_MATRIX, e: 'Die Zahl der Punkte im dritten Feld ist die Summe der ersten beiden Felder: 1 + 2 = 3, 2 + 3 = 5, also 3 + 1 = 4 schwarze Punkte.' }, m6),
    { id: 'l3', kat: 'logik', q: 'Wenn es regnet, ist die Straße nass. Die Straße ist nicht nass. Was folgt daraus?', o: ['Es regnet nicht.', 'Es regnet.', 'Die Straße wird gleich nass.', 'Es hat vorher geregnet.', 'Es lässt sich nichts folgern.'], a: 0, e: 'Würde es regnen, wäre die Straße nass. Da sie nicht nass ist, kann es nicht regnen (Umkehrschluss, „modus tollens“).' },
    { id: 'z3', kat: 'zahlen', q: Q_SERIES, seq: '100 · 91 · 83 · 76 · 70 · ?', o: ['65', '64', '66', '63', '60'], a: 0, e: 'Die abgezogenen Beträge werden jeweils um eins kleiner: −9, −8, −7, −6 und dann −5.' },
    extend({ id: 'm4', kat: 'matrix', q: Q_MATRIX, e: 'Jede Form (Kreis, Quadrat, Dreieck) und jede Füllung (leer, schwarz, grau) kommt in jeder Zeile und jeder Spalte genau einmal vor. In der letzten Zeile fehlt das Quadrat, in der letzten Spalte die leere Füllung.' }, m4),
    { id: 's4', kat: 'raum', q: 'Das Muster wird um 180 Grad gedreht. Welches Muster entsteht?', fig: gridPattern(PATTERN), o: [gridPattern(rot180), gridPattern(flipH), gridPattern(flipV), gridPattern(rot90), gridPattern(PATTERN)], a: 0, e: 'Bei einer halben Drehung wandert jedes Feld auf die gegenüberliegende Seite: oben links nach unten rechts, oben Mitte nach unten Mitte, Mitte rechts nach Mitte links.' },
    { id: 'v3', kat: 'sprache', q: '„Vogel“ verhält sich zu „Nest“ wie „Biene“ zu …', o: ['Bienenstock', 'Honig', 'Blüte', 'Nektar', 'Imker'], a: 0, e: 'Das Nest ist die Behausung des Vogels, der Bienenstock die Behausung der Biene.' },
    extend({ id: 'm5', kat: 'matrix', q: Q_MATRIX, e: 'Das dritte Feld jeder Zeile entsteht, wenn man die ersten beiden Felder übereinanderlegt. Kreis und senkrechte Linie ergeben zusammen die Lösung.' }, m5),
    { id: 'z4', kat: 'zahlen', q: Q_SERIES, seq: '4 · 9 · 7 · 12 · 10 · 15 · 13 · ?', o: ['18', '11', '16', '15', '20'], a: 0, e: 'Abwechselnd werden 5 addiert und 2 abgezogen: 13 + 5 = 18.' },
    { id: 'l4', kat: 'logik', q: 'Fünf Häuser stehen in einer Reihe. Das rote steht ganz links, das gelbe genau in der Mitte. Das blaue steht direkt rechts neben dem grünen. Das fünfte Haus ist weiß. Welches Haus steht ganz rechts?', o: ['das blaue', 'das grüne', 'das weiße', 'das gelbe', 'das rote'], a: 0, e: 'Rot steht auf Platz 1, Gelb auf Platz 3. Grün und Blau brauchen zwei nebeneinanderliegende freie Plätze – frei sind nur noch 2, 4 und 5, also kommen nur 4 und 5 infrage. Grün steht auf 4, Blau auf 5, Weiß auf 2.' },
    { id: 'r2', kat: 'rechnen', q: 'Ein Artikel kostet 80 €. Der Preis wird erst um 25 % erhöht und danach um 20 % gesenkt. Was kostet der Artikel jetzt?', o: ['80 €', '84 €', '76 €', '85 €', '88 €'], a: 0, e: '80 € plus 25 % sind 100 €. 20 % von 100 € sind 20 €, der Preis sinkt also wieder auf 80 €.' },
    extend({ id: 'm7', kat: 'matrix', q: Q_MATRIX, e: 'Die Gesamtzahl der Kreise wächst von Zeile zu Zeile um eins (3, 4, 5). Innerhalb einer Zeile wird von Feld zu Feld ein schwarzer Kreis weiß. Gesucht sind drei schwarze und zwei weiße Kreise.' }, m7),
    { id: 's1', kat: 'raum', q: 'Drei Figuren sind gedrehte Versionen der Vorlage, eine ist gespiegelt. Welche Figur ist gespiegelt?', fig: pShape(''), o: [pShape(MIRROR + ' rotate(90 50 50)'), pShape('rotate(90 50 50)'), pShape('rotate(180 50 50)'), pShape('rotate(270 50 50)')], a: 0, e: 'Ein Spiegelbild lässt sich durch Drehen nicht erzeugen. Drehen Sie jede Figur in Gedanken zurück, bis der lange Strich senkrecht steht und der Bogen oben ist: Bei den gedrehten Figuren liegt der Bogen dann rechts – wie beim „P“ der Vorlage. Nur bei der gespiegelten Figur liegt er links.' },
    { id: 'v4', kat: 'sprache', q: 'Welches Wort ist das Gegenteil von „vorläufig“?', o: ['endgültig', 'zeitweilig', 'vorsichtig', 'bedingt', 'frühzeitig'], a: 0, e: '„Vorläufig“ bedeutet „nur bis auf Weiteres“. Das Gegenteil ist „endgültig“; „zeitweilig“ bedeutet fast dasselbe wie „vorläufig“.' },
    { id: 'z5', kat: 'zahlen', q: Q_SERIES, seq: '1 · 1 · 2 · 3 · 5 · 8 · 13 · ?', o: ['21', '20', '18', '26', '24'], a: 0, e: 'Jede Zahl ist die Summe der beiden vorherigen (Fibonacci-Folge): 8 + 13 = 21.' },
    extend({ id: 'm10', kat: 'matrix', q: Q_MATRIX, e: 'Die Zahl der Ecken steigt nach rechts und nach unten jeweils um eins. Die letzte Zeile lautet 5, 6, 7 – gesucht ist ein leeres Siebeneck.' }, m10),
    { id: 'l5', kat: 'logik', q: 'In einer Schublade liegen lose 6 schwarze und 8 weiße Socken. Wie viele Socken muss man im Dunkeln mindestens herausnehmen, um sicher zwei gleichfarbige zu haben?', o: ['3', '2', '7', '9', '15'], a: 0, e: 'Es gibt nur zwei Farben. Die ersten beiden Socken können verschieden sein, die dritte passt dann zwingend zu einer von ihnen (Schubfachprinzip).' },
    { id: 's3', kat: 'raum', q: 'Aus welchem Netz lässt sich kein Würfel falten?', o: [net(NETS.falsch), net(NETS.kreuz), net(NETS.versetzt), net(NETS.dreiDrei), net(NETS.treppe)], a: 0, e: 'Bei diesem Netz liegen zwei Quadrate nebeneinander auf derselben Seite des Viererstreifens. Beim Falten klappen beide auf dieselbe Würfelfläche, die gegenüberliegende Fläche bleibt offen. Alle anderen Netze ergeben einen Würfel.' },
    { id: 'r1', kat: 'rechnen', q: 'Ein Schläger und ein Ball kosten zusammen 1,10 €. Der Schläger kostet 1,00 € mehr als der Ball. Wie viel kostet der Ball?', o: ['0,05 €', '0,10 €', '0,15 €', '0,01 €', '1,00 €'], a: 0, e: 'Kostet der Ball x, dann kostet der Schläger x + 1,00 €. Zusammen gilt 2x + 1,00 € = 1,10 €, also x = 0,05 €. Die spontane Antwort 0,10 € ist falsch: Dann wäre der Schläger nur 0,90 € teurer.' },
    extend({ id: 'm8', kat: 'matrix', q: Q_MATRIX, e: 'Der Punkt wandert von Feld zu Feld eine Ecke im Uhrzeigersinn weiter, das Quadrat eine Ecke gegen den Uhrzeigersinn. Nach „Punkt unten links, Quadrat oben links“ folgt „Punkt oben links, Quadrat unten links“.' }, m8),
    { id: 'z6', kat: 'zahlen', q: Q_SERIES, seq: '2 · 3 · 5 · 7 · 11 · 13 · ?', o: ['17', '15', '19', '16', '14'], a: 0, e: 'Die Reihe besteht aus den Primzahlen – Zahlen, die nur durch 1 und durch sich selbst teilbar sind. Nach 13 folgt 17.' },
    { id: 'v5', kat: 'sprache', q: 'Welches Wort bedeutet am ehesten dasselbe wie „redundant“?', o: ['überflüssig', 'unvollständig', 'widersprüchlich', 'entscheidend', 'veraltet'], a: 0, e: '„Redundant“ heißt „mehrfach vorhanden und deshalb eigentlich überflüssig“.' },
    extend({ id: 'm11', kat: 'matrix', q: Q_MATRIX, e: 'Form (Kreis, Quadrat, Dreieck) und Anzahl (1, 2, 3) sind so verteilt, dass in jeder Zeile und Spalte jede Variante genau einmal vorkommt. Die Füllung hängt von der Spalte ab: leer, grau, schwarz. Es fehlt ein einzelnes schwarzes Quadrat.' }, m11),
    { id: 'z7', kat: 'zahlen', q: Q_SERIES, seq: '1 · 2 · 6 · 24 · 120 · ?', o: ['720', '600', '240', '840', '480'], a: 0, e: 'Multipliziert wird nacheinander mit 2, 3, 4, 5 und dann 6: 120 × 6 = 720.' },
    { id: 's5', kat: 'raum', q: 'Aus dem Netz wird ein Würfel gefaltet. Welche Fläche liegt der Fläche E gegenüber?', fig: net(LETTER_NET, LETTERS), o: ['F', 'A', 'B', 'C', 'D'], a: 0, e: 'Die vier Flächen A, B, C und D bilden beim Falten einen geschlossenen Ring. E und F klappen an die beiden offenen Seiten dieses Rings – also nach oben und nach unten – und liegen sich deshalb gegenüber, obwohl sie an verschiedenen Flächen hängen.' },
    { id: 'l1', kat: 'logik', q: 'Alle Zorks sind Mips. Einige Mips sind Tals. Welche Aussage folgt daraus zwingend?', o: ['Keine der Aussagen folgt zwingend.', 'Einige Zorks sind Tals.', 'Alle Mips sind Zorks.', 'Alle Tals sind Mips.', 'Kein Zork ist ein Tal.'], a: 0, e: 'Die Mips, die Tals sind, müssen keine Zorks sein – die Zorks können ein ganz anderer Teil der Mips sein. Ob es Zorks gibt, die Tals sind, bleibt also offen: Weder „einige Zorks sind Tals“ noch „kein Zork ist ein Tal“ ist sicher.' },
    extend({ id: 'm9', kat: 'matrix', q: Q_MATRIX, e: 'Das dritte Feld zeigt nur die Punkte, die in genau einem der ersten beiden Felder vorkommen. Punkte, die in beiden stehen, verschwinden. In der letzten Zeile bleiben oben links, Mitte links und Mitte rechts übrig.' }, m9),
    { id: 'r4', kat: 'rechnen', q: 'Ein Seerosenteppich verdoppelt jeden Tag seine Fläche. Nach 48 Tagen ist der ganze See bedeckt. Nach wie vielen Tagen war die Hälfte des Sees bedeckt?', o: ['47', '24', '46', '36', '12'], a: 0, e: 'Weil sich die Fläche jeden Tag verdoppelt, war der See einen Tag vor der vollständigen Bedeckung zur Hälfte bedeckt – nach 47 Tagen.' },
    { id: 'z8', kat: 'zahlen', q: Q_SERIES, seq: '3 · 4 · 8 · 17 · 33 · ?', o: ['58', '49', '50', '57', '66'], a: 0, e: 'Die Abstände sind die Quadratzahlen 1, 4, 9, 16 und dann 25: 33 + 25 = 58.' },
    { id: 'v6', kat: 'sprache', q: '„Kapitän“ verhält sich zu „Schiff“ wie „Dirigent“ zu …', o: ['Orchester', 'Taktstock', 'Musik', 'Konzertsaal', 'Noten'], a: 0, e: 'Der Kapitän führt ein Schiff mit seiner Besatzung, der Dirigent leitet ein Orchester. Taktstock und Noten sind nur Hilfsmittel.' },
    extend({ id: 'm12', kat: 'matrix', q: Q_MATRIX, e: 'Die Felder werden wie ein Text gelesen. Der lange Zeiger dreht sich jedes Mal um 45 Grad im Uhrzeigersinn, der kurze, dicke Zeiger um 90 Grad gegen den Uhrzeigersinn. Im neunten Feld zeigt der lange Zeiger nach oben, der kurze nach unten.' }, m12)
  ];

  PS.iq = {
    zeit: 40 * 60,
    norm: { mittel: 24, sd: 7 },
    kategorien: {
      matrix: { name: 'Matrizen', text: 'Regeln in Figurenmustern erkennen – der Kern vieler Intelligenztests.' },
      zahlen: { name: 'Zahlenreihen', text: 'Gesetzmäßigkeiten in Zahlenfolgen finden.' },
      sprache: { name: 'Sprachverständnis', text: 'Analogien, Gegensätze und Wortbedeutungen.' },
      logik: { name: 'Logisches Denken', text: 'Schlussfolgern aus vorgegebenen Aussagen.' },
      raum: { name: 'Räumliches Denken', text: 'Figuren gedanklich drehen, spiegeln und falten.' },
      rechnen: { name: 'Rechnerisches Denken', text: 'Textaufgaben, bei denen die erste Idee oft falsch ist.' }
    },
    items: items,
    _nets: NETS,
    _letterNet: LETTER_NET
  };
})();
