# Prüfstand

Tests und Wissen zu Politik, Staat und Denkvermögen – eine statische Website aus HTML, CSS und JavaScript. Kein Server, keine Datenbank, keine Cookies, kein Tracking, keine externen Schriften oder Skripte.

Stand der Inhalte: 24. September 2026.

## Was die Seite enthält

**Parteien-Test**
- 29 selbst formulierte Thesen in sechs Themenbereichen, jeweils mit Hintergrund sowie je zwei Argumenten dafür und dagegen
- Positionen von 8 Parteien (alle mit mindestens 1 % bei der Bundestagswahl 2025) aus ihren Wahlprogrammen, jede mit Begründung
- doppelte Gewichtung, Parteiauswahl, Auswertung gesamt und nach Themen, Einzelvergleich je These
- Neutralität: keine Parteifarben oder Logos, zufällige Reihenfolge, Zufall bei Gleichstand, offengelegte Berechnung (Seite „Über → Methodik“)

**Staat & Recht**
- Überblick mit den fünf Staatsprinzipien und der protokollarischen Rangfolge
- Staatsaufbau: Gewaltenteilung, Diagramm „Wer wählt wen?“, Ebenen von der EU bis zur Gemeinde, Rangordnung des Rechts
- alle Verfassungsorgane mit Aufgaben, Zusammensetzung und aktueller Besetzung (inklusive Sitzverteilung im Bundestag)
- Bundesregierung: komplettes Kabinett, Kanzler-, Ressort- und Kollegialprinzip, Hierarchie in Regierung und Verwaltung
- die 16 Länder mit Regierungschefs, Koalitionen und Stimmen im Bundesrat
- Gesetzgebung in neun Schritten, Gesetzgebungskompetenzen, Zahl der Gesetze
- das Grundgesetz: alle Artikel verständlich zusammengefasst, durchsuchbar, mit Wortlaut zentraler Sätze
- 119 wichtige Gesetze aus 15 Rechtsgebieten mit ihren zentralen Paragrafen
- 16 Lerneinheiten mit Lernzielen, Merksätzen, Begriffen und je 10 Übungsfragen
- Staatskunde-Test mit 160 Fragen (Übungs- oder Prüfungsmodus, Themenauswahl)
- Glossar mit 60 Begriffen

**IQ-Test**
- 40 eigene Aufgaben: Matrizen, Zahlenreihen, Sprachverständnis, Logik, räumliches Denken, Rechnen
- 40 Minuten Zeitlimit, Fortschritt wird gespeichert
- Auswertung mit geschätztem IQ, Prozentrang, Normalverteilung, Profil nach Bereichen und Lösung jeder Aufgabe
- Der Test ist nicht normiert; die Seite weist deutlich darauf hin.

**Weitere Tests:** Reaktionstest, Zahlengedächtnis (vorwärts und rückwärts), Konzentration (Schulte-Tabelle), Kopfrechnen (60 Sekunden), Farb-Wort-Test (Stroop).

Außerdem: helles und dunkles Farbschema, Bedienung per Tastatur, für Smartphones optimiert.

## Veröffentlichen mit GitHub Pages

1. `index.html` muss im obersten Ordner des Repositorys liegen (ist hier bereits so).
2. Im Repository *Settings → Pages* öffnen, unter *Build and deployment* als *Source* „Deploy from a branch“ wählen, Branch `main` und Ordner `/ (root)` einstellen, *Save*.
3. Nach ein bis zwei Minuten ist die Seite unter `https://germanclaude.github.io/Website2politik2go/` erreichbar.

Zum Ausprobieren ohne Internet genügt ein Doppelklick auf `index.html`.

## Impressum

Vor der Veröffentlichung in `assets/js/core.js` den Block `PS.betreiber` ausfüllen (Name, Anschrift, E-Mail, optional verantwortliche Person). Sobald `name` ausgefüllt ist, erscheint auf der Seite „Über“ ein Impressum. Ob und in welchem Umfang ein Impressum Pflicht ist (§ 5 DDG, § 18 MStV), hängt vom Angebot ab – im Zweifel rechtlich beraten lassen.

## Aufbau

```
index.html                  Seitengerüst, Navigation, Fußzeile
assets/css/style.css        Gestaltung (hell/dunkel)
assets/img/favicon.svg      Symbol
assets/js/core.js           Router, Hilfsfunktionen, lokaler Speicher, Betreiberangaben
assets/js/data/wahl.js      Thesen und Parteipositionen
assets/js/data/staat.js     Organe, Kabinett, Länder, Gesetzgebung, Glossar
assets/js/data/grundgesetz.js  alle Artikel des Grundgesetzes
assets/js/data/gesetze.js   Gesetze A–Z
assets/js/data/lernen.js    Lerneinheiten
assets/js/data/quiz.js      Fragen für Lerneinheiten und Staatskunde-Test
assets/js/data/iq.js        IQ-Aufgaben (Figuren werden als SVG gezeichnet)
assets/js/views/*.js        die einzelnen Seiten
```

Die Seiten werden über den Teil hinter `#` in der Adresse aufgerufen, zum Beispiel `#wahl`, `#staat-grundgesetz.20` (Art. 20) oder `#lerneinheit.wahlen`.

## Inhalte aktualisieren

- Ämter, Kabinett, Länderregierungen, Sitzverteilung: `assets/js/data/staat.js`
- Parteipositionen und Thesen: `assets/js/data/wahl.js` (Werte: 1 = stimmt zu, 0 = neutral, -1 = lehnt ab, `null` = keine eindeutige Aussage; die Begründung steht jeweils dahinter)
- Stand-Datum: `PS.stand` in `assets/js/core.js` und `stand` in den Datendateien

## Datenschutz

Antworten, Fortschritt und Bestwerte werden nur im lokalen Speicher des Browsers abgelegt (Schlüssel beginnen mit `pruefstand:`) und können auf der Seite „Über → Datenschutz“ gelöscht werden. Es werden keine Daten an Dritte übertragen. Beim Hosting auf GitHub Pages verarbeitet GitHub technisch notwendige Zugriffsdaten (z. B. IP-Adressen).

## Quellen

Wahlprogramme der Parteien zur Bundestagswahl 2025, gesetze-im-internet.de, bundestag.de, bundesrat.de, bundesregierung.de, bundespraesident.de, bundesverfassungsgericht.de, bpb.de, bundeswahlleiterin.de, destatis.de. Eine vollständige Liste steht auf der Seite „Über → Quellen“. Alle Zusammenfassungen sind vereinfacht und ersetzen keine Rechtsberatung.
