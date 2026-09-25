/* ==========================================================================
   Prüfstand – Daten Staat & Recht
   Amtsinhaber und Zusammensetzungen: Stand 24. September 2026.
   ========================================================================== */
window.PS = window.PS || {};
PS.staat = {
  stand: '24. September 2026',

  /* ---------- Verfassungsorgane ---------- */
  organe: [
    {
      id: 'bundespraesident', name: 'Bundespräsident', rolle: 'Staatsoberhaupt',
      gg: 'Art. 54–61 GG', sitz: 'Schloss Bellevue, Berlin (zweiter Amtssitz: Villa Hammerschmidt, Bonn)',
      wahl: 'Von der Bundesversammlung ohne Aussprache gewählt, für fünf Jahre; eine anschließende Wiederwahl ist einmal möglich. Wählbar ist jede Deutsche und jeder Deutsche ab 40 Jahren mit Wahlrecht zum Bundestag.',
      aufgaben: [
        'vertritt die Bundesrepublik völkerrechtlich und schließt im Namen des Bundes Verträge mit anderen Staaten (Art. 59 GG)',
        'prüft und unterzeichnet (fertigt aus) Bundesgesetze und lässt sie verkünden (Art. 82 GG)',
        'schlägt dem Bundestag die Kanzlerin oder den Kanzler zur Wahl vor, ernennt und entlässt Kanzler und Minister (Art. 63, 64 GG)',
        'ernennt und entlässt Bundesrichter, Bundesbeamte und Offiziere; übt das Begnadigungsrecht für den Bund aus (Art. 60 GG)',
        'kann den Bundestag in zwei Fällen auflösen: wenn eine Kanzlerwahl nur mit relativer Mehrheit gelingt oder nach einer gescheiterten Vertrauensfrage (Art. 63 Abs. 4, Art. 68 GG)',
        'wirkt durch Reden und Besuche integrierend und repräsentiert das Land nach innen und außen'
      ],
      person: { name: 'Frank-Walter Steinmeier', partei: 'SPD-Mitgliedschaft ruht während der Amtszeit', seit: '19. März 2017', info: '2022 wiedergewählt; die zweite Amtszeit endet am 18. März 2027. Die Bundesversammlung muss spätestens 30 Tage vor Ablauf, also bis Mitte Februar 2027, zusammentreten. Eine weitere Wiederwahl ist nicht möglich.' },
      merke: 'Der Bundespräsident hat vor allem repräsentative und prüfende Aufgaben. Seine Anordnungen brauchen in der Regel die Gegenzeichnung durch Kanzler oder zuständigen Minister (Art. 58 GG).'
    },
    {
      id: 'bundestag', name: 'Deutscher Bundestag', rolle: 'Parlament – die gewählte Vertretung des Volkes',
      gg: 'Art. 38–48 GG', sitz: 'Reichstagsgebäude, Berlin',
      wahl: 'Alle vier Jahre in allgemeiner, unmittelbarer, freier, gleicher und geheimer Wahl gewählt (Art. 38 GG). Seit der Wahlrechtsreform hat der Bundestag genau 630 Sitze. Die 21. Wahlperiode begann am 25. März 2025; die nächste reguläre Wahl ist im Frühjahr 2029.',
      aufgaben: [
        'beschließt die Bundesgesetze und Änderungen des Grundgesetzes',
        'wählt die Bundeskanzlerin oder den Bundeskanzler (Art. 63 GG) und kann ihn durch ein konstruktives Misstrauensvotum abwählen (Art. 67 GG)',
        'beschließt den Bundeshaushalt (Budgetrecht) und kontrolliert die Regierung – mit Anfragen, Befragungen, Ausschüssen und Untersuchungsausschüssen',
        'entscheidet über bewaffnete Einsätze der Bundeswehr im Ausland (Parlamentsvorbehalt)',
        'wählt die Hälfte der Richterinnen und Richter des Bundesverfassungsgerichts und bildet mit den Ländervertretern die Bundesversammlung',
        'bearbeitet Petitionen der Bürgerinnen und Bürger (Petitionsausschuss, Art. 45c GG)'
      ],
      person: { name: 'Julia Klöckner', partei: 'CDU', seit: '25. März 2025', titel: 'Bundestagspräsidentin', info: 'Vizepräsidentinnen und Vizepräsidenten: Andrea Lindholz (CSU), Josephine Ortleb (SPD), Omid Nouripour (Grüne), Bodo Ramelow (Die Linke).' },
      sitze: [
        { f: 'CDU/CSU', n: 208, vorsitz: 'Thorsten Frei (seit 29. Juli 2026)' },
        { f: 'AfD', n: 152, vorsitz: 'Alice Weidel, Tino Chrupalla' },
        { f: 'SPD', n: 120, vorsitz: 'Matthias Miersch' },
        { f: 'Bündnis 90/Die Grünen', n: 85, vorsitz: 'Katharina Dröge, Britta Haßelmann' },
        { f: 'Die Linke', n: 64, vorsitz: 'Heidi Reichinnek, Sören Pellmann' },
        { f: 'SSW (fraktionslos)', n: 1, vorsitz: '–' }
      ],
      merke: 'Der Bundestag ist das einzige Verfassungsorgan des Bundes, das direkt vom Volk gewählt wird. Alle anderen leiten ihre Legitimation von ihm oder von den Ländern ab.'
    },
    {
      id: 'bundesrat', name: 'Bundesrat', rolle: 'Vertretung der 16 Länder auf Bundesebene',
      gg: 'Art. 50–53 GG', sitz: 'Ehemaliges Preußisches Herrenhaus, Leipziger Straße, Berlin',
      wahl: 'Wird nicht gewählt: Die Mitglieder sind Mitglieder der Landesregierungen und werden von ihnen entsandt. Je nach Einwohnerzahl hat ein Land 3 bis 6 Stimmen, insgesamt 69. Die Stimmen eines Landes müssen einheitlich abgegeben werden.',
      aufgaben: [
        'wirkt bei der Gesetzgebung des Bundes mit: Zustimmungsgesetze brauchen seine Zustimmung, gegen Einspruchsgesetze kann er Einspruch einlegen (Art. 77, 78 GG)',
        'kann eigene Gesetzentwürfe einbringen (Art. 76 GG) und den Vermittlungsausschuss anrufen',
        'muss Grundgesetzänderungen mit Zwei-Drittel-Mehrheit zustimmen (Art. 79 GG)',
        'stimmt vielen Rechtsverordnungen der Bundesregierung zu (Art. 80 Abs. 2 GG)',
        'wirkt in Angelegenheiten der Europäischen Union mit (Art. 23 GG)',
        'wählt die Hälfte der Richterinnen und Richter des Bundesverfassungsgerichts'
      ],
      person: { name: 'Andreas Bovenschulte', partei: 'SPD', seit: '1. November 2025', titel: 'Bundesratspräsident', info: 'Bürgermeister und Präsident des Senats der Freien Hansestadt Bremen. Die Präsidentschaft wechselt jedes Jahr am 1. November nach der Einwohnerzahl der Länder; ab 1. November 2026 stellt Nordrhein-Westfalen den Präsidenten.' },
      merke: 'Über den Bundesrat wirken die Länder an der Politik des Bundes mit. Er ist keine zweite Parlamentskammer im engeren Sinn, sondern ein Organ der Landesregierungen.'
    },
    {
      id: 'bundesregierung', name: 'Bundesregierung', rolle: 'Spitze der Exekutive des Bundes',
      gg: 'Art. 62–69 GG', sitz: 'Bundeskanzleramt, Berlin; Ministerien in Berlin und Bonn',
      wahl: 'Die Kanzlerin oder der Kanzler wird auf Vorschlag des Bundespräsidenten vom Bundestag ohne Aussprache gewählt. Die Ministerinnen und Minister werden auf Vorschlag des Kanzlers vom Bundespräsidenten ernannt. Das Amt endet mit dem Zusammentritt eines neuen Bundestages.',
      aufgaben: [
        'leitet die Politik des Bundes und führt die Bundesverwaltung',
        'bringt die meisten Gesetzentwürfe ein und erlässt Rechtsverordnungen',
        'stellt den Entwurf des Bundeshaushalts auf',
        'vertritt Deutschland in der EU (Rat, Europäischer Rat) und in internationalen Organisationen',
        'der Kanzler bestimmt die Richtlinien der Politik; jeder Minister leitet sein Ressort selbstständig; bei Meinungsverschiedenheiten entscheidet das Kabinett (Art. 65 GG)'
      ],
      person: { name: 'Friedrich Merz', partei: 'CDU', seit: '6. Mai 2025', titel: 'Bundeskanzler', info: 'Am 6. Mai 2025 im zweiten Wahlgang gewählt – erstmals scheiterte ein Kanzlerkandidat im ersten Wahlgang. Koalition aus CDU, CSU und SPD. Vizekanzler ist Lars Klingbeil (SPD).' },
      merke: 'Die Bundesregierung besteht aus dem Kanzler und den Bundesministern (Art. 62 GG). Sie ist vom Vertrauen des Bundestages abhängig – der kann sie aber nur stürzen, indem er zugleich einen neuen Kanzler wählt.'
    },
    {
      id: 'bverfg', name: 'Bundesverfassungsgericht', rolle: '„Hüter der Verfassung“ – oberstes Gericht in Verfassungsfragen',
      gg: 'Art. 92–94, 100 GG', sitz: 'Karlsruhe',
      wahl: '16 Richterinnen und Richter in zwei Senaten zu je acht. Je die Hälfte wird vom Bundestag und vom Bundesrat mit Zwei-Drittel-Mehrheit gewählt. Amtszeit zwölf Jahre, keine Wiederwahl, Altersgrenze 68 Jahre. Seit einer Grundgesetzänderung Ende 2024 stehen diese Regeln ausdrücklich in der Verfassung.',
      aufgaben: [
        'entscheidet über Verfassungsbeschwerden – jede Person kann sich wegen einer Verletzung ihrer Grundrechte an das Gericht wenden',
        'prüft, ob Gesetze mit dem Grundgesetz vereinbar sind (abstrakte und konkrete Normenkontrolle)',
        'entscheidet Streitigkeiten zwischen Verfassungsorganen (Organstreit) sowie zwischen Bund und Ländern',
        'entscheidet über Parteiverbote und den Ausschluss von Parteien aus der staatlichen Finanzierung (Art. 21 GG)',
        'prüft auf Beschwerde die Gültigkeit von Bundestagswahlen (Art. 41 GG)'
      ],
      person: { name: 'Stephan Harbarth', partei: '', seit: '22. Juni 2020', titel: 'Präsident', info: 'Vizepräsidentin ist Ann-Katrin Kaufhold (seit 2025). Das Gericht wurde am 28. September 1951 eröffnet.' },
      merke: 'Entscheidungen des Bundesverfassungsgerichts binden alle Verfassungsorgane, Gerichte und Behörden. Manche haben Gesetzeskraft (§ 31 BVerfGG).'
    },
    {
      id: 'bundesversammlung', name: 'Bundesversammlung', rolle: 'Wahlorgan für den Bundespräsidenten',
      gg: 'Art. 54 GG', sitz: 'Tritt im Reichstagsgebäude in Berlin zusammen',
      wahl: 'Besteht aus allen Mitgliedern des Bundestages und ebenso vielen Mitgliedern, die von den Landtagen gewählt werden – bei 630 Abgeordneten also 1.260 Mitglieder. Einberufen wird sie von der Bundestagspräsidentin.',
      aufgaben: [
        'wählt die Bundespräsidentin oder den Bundespräsidenten ohne Aussprache',
        'im ersten und zweiten Wahlgang ist die absolute Mehrheit nötig, im dritten genügt die relative Mehrheit'
      ],
      person: null,
      merke: 'Die Bundesversammlung tritt nur zur Präsidentenwahl zusammen. Die Ländervertreter müssen keine Abgeordneten sein – oft werden auch bekannte Persönlichkeiten aus Sport, Kultur und Gesellschaft entsandt.'
    },
    {
      id: 'gemeinsamer-ausschuss', name: 'Gemeinsamer Ausschuss', rolle: 'Notparlament für den Verteidigungsfall',
      gg: 'Art. 53a, 115e GG', sitz: 'Berlin',
      wahl: 'Zwei Drittel der Mitglieder sind Bundestagsabgeordnete (nach Stärke der Fraktionen), ein Drittel Mitglieder des Bundesrates – je eines pro Land. Er hat 48 Mitglieder.',
      aufgaben: [
        'übernimmt im Verteidigungsfall die Rechte von Bundestag und Bundesrat, wenn der Bundestag nicht rechtzeitig zusammentreten kann oder nicht beschlussfähig ist (Art. 115e GG)',
        'darf das Grundgesetz weder ändern noch ganz oder teilweise außer Kraft setzen'
      ],
      person: null,
      merke: 'Der Gemeinsame Ausschuss musste in der Geschichte der Bundesrepublik noch nie als Notparlament tätig werden.'
    }
  ],

  rangfolge: [
    { amt: 'Bundespräsident', person: 'Frank-Walter Steinmeier', hinweis: 'Staatsoberhaupt' },
    { amt: 'Präsidentin des Deutschen Bundestages', person: 'Julia Klöckner', hinweis: 'leitet die Sitzungen, übt das Hausrecht aus' },
    { amt: 'Bundeskanzler', person: 'Friedrich Merz', hinweis: 'Regierungschef' },
    { amt: 'Präsident des Bundesrates', person: 'Andreas Bovenschulte', hinweis: 'vertritt den Bundespräsidenten (Art. 57 GG)' },
    { amt: 'Präsident des Bundesverfassungsgerichts', person: 'Stephan Harbarth', hinweis: 'Vorsitz im Ersten Senat' }
  ],

  /* ---------- Bundeskabinett ---------- */
  kabinett: [
    { ressort: 'Bundeskanzler', name: 'Friedrich Merz', partei: 'CDU', seit: '06.05.2025' },
    { ressort: 'Vizekanzler, Bundesminister der Finanzen', name: 'Lars Klingbeil', partei: 'SPD', seit: '06.05.2025' },
    { ressort: 'Chefin des Bundeskanzleramtes, Bundesministerin für besondere Aufgaben', name: 'Nina Warken', partei: 'CDU', seit: '29.07.2026', note: 'zuvor Bundesgesundheitsministerin' },
    { ressort: 'Auswärtiges Amt', name: 'Johann Wadephul', partei: 'CDU', seit: '06.05.2025' },
    { ressort: 'Inneres', name: 'Alexander Dobrindt', partei: 'CSU', seit: '06.05.2025' },
    { ressort: 'Justiz und Verbraucherschutz', name: 'Stefanie Hubig', partei: 'SPD', seit: '06.05.2025' },
    { ressort: 'Wirtschaft und Energie', name: 'Katherina Reiche', partei: 'CDU', seit: '06.05.2025' },
    { ressort: 'Arbeit und Soziales', name: 'Bärbel Bas', partei: 'SPD', seit: '06.05.2025' },
    { ressort: 'Verteidigung', name: 'Boris Pistorius', partei: 'SPD', seit: '06.05.2025', note: 'im Amt seit Januar 2023' },
    { ressort: 'Verkehr', name: 'Steffen Bilger', partei: 'CDU', seit: '29.07.2026', note: 'Nachfolger von Patrick Schnieder' },
    { ressort: 'Gesundheit', name: 'Carsten Linnemann', partei: 'CDU', seit: '29.07.2026', note: 'Nachfolger von Nina Warken' },
    { ressort: 'Bildung, Familie, Senioren, Frauen und Jugend', name: 'Karin Prien', partei: 'CDU', seit: '06.05.2025' },
    { ressort: 'Forschung, Technologie und Raumfahrt', name: 'Dorothee Bär', partei: 'CSU', seit: '06.05.2025' },
    { ressort: 'Landwirtschaft, Ernährung und Heimat', name: 'Alois Rainer', partei: 'CSU', seit: '06.05.2025' },
    { ressort: 'Umwelt, Klimaschutz, Naturschutz und nukleare Sicherheit', name: 'Carsten Schneider', partei: 'SPD', seit: '06.05.2025' },
    { ressort: 'Wirtschaftliche Zusammenarbeit und Entwicklung', name: 'Reem Alabali Radovan', partei: 'SPD', seit: '06.05.2025' },
    { ressort: 'Wohnen, Stadtentwicklung und Bauwesen', name: 'Verena Hubertz', partei: 'SPD', seit: '06.05.2025' },
    { ressort: 'Digitales und Staatsmodernisierung', name: 'Karsten Wildberger', partei: 'CDU', seit: '06.05.2025', note: 'bei Amtsantritt parteilos' }
  ],
  kabinettHinweis: 'Die Bundesregierung besteht aus dem Bundeskanzler und 17 Bundesministerinnen und -ministern. Bei der Kabinettsumbildung im Juli 2026 wechselte Nina Warken ins Kanzleramt, Carsten Linnemann und Steffen Bilger kamen neu ins Kabinett; Thorsten Frei, bis dahin Kanzleramtschef, wurde Vorsitzender der CDU/CSU-Fraktion. Die neuen Minister wurden am 29. Juli 2026 ernannt und am 8. September 2026 im Bundestag vereidigt. An den Kabinettssitzungen nimmt außerdem der Beauftragte für Kultur und Medien, Staatsminister Wolfram Weimer, teil.',

  /* ---------- Länder ---------- */
  laender: [
    { land: 'Baden-Württemberg', hs: 'Stuttgart', ew: 11.1, st: 6, chef: 'Cem Özdemir', partei: 'Grüne', titel: 'Ministerpräsident', koal: 'Grüne, CDU', parl: 'Landtag', note: 'seit 13. Mai 2026' },
    { land: 'Bayern', hs: 'München', ew: 13.2, st: 6, chef: 'Markus Söder', partei: 'CSU', titel: 'Ministerpräsident', koal: 'CSU, Freie Wähler', parl: 'Landtag' },
    { land: 'Berlin', hs: 'Berlin', ew: 3.7, st: 4, chef: 'Kai Wegner', partei: 'CDU', titel: 'Regierender Bürgermeister', koal: 'CDU, SPD', parl: 'Abgeordnetenhaus', note: 'Wahl am 20.09.2026 – Regierungsbildung läuft' },
    { land: 'Brandenburg', hs: 'Potsdam', ew: 2.6, st: 4, chef: 'Dietmar Woidke', partei: 'SPD', titel: 'Ministerpräsident', koal: 'SPD, CDU', parl: 'Landtag', note: 'Koalition mit der CDU seit März 2026' },
    { land: 'Bremen', hs: 'Bremen', ew: 0.7, st: 3, chef: 'Andreas Bovenschulte', partei: 'SPD', titel: 'Präsident des Senats und Bürgermeister', koal: 'SPD, Grüne, Linke', parl: 'Bürgerschaft' },
    { land: 'Hamburg', hs: 'Hamburg', ew: 1.9, st: 3, chef: 'Peter Tschentscher', partei: 'SPD', titel: 'Erster Bürgermeister', koal: 'SPD, Grüne', parl: 'Bürgerschaft' },
    { land: 'Hessen', hs: 'Wiesbaden', ew: 6.3, st: 5, chef: 'Boris Rhein', partei: 'CDU', titel: 'Ministerpräsident', koal: 'CDU, SPD', parl: 'Landtag' },
    { land: 'Mecklenburg-Vorpommern', hs: 'Schwerin', ew: 1.6, st: 3, chef: 'Manuela Schwesig', partei: 'SPD', titel: 'Ministerpräsidentin', koal: 'SPD, Linke', parl: 'Landtag', note: 'Wahl am 20.09.2026 – Regierungsbildung läuft' },
    { land: 'Niedersachsen', hs: 'Hannover', ew: 8.0, st: 6, chef: 'Olaf Lies', partei: 'SPD', titel: 'Ministerpräsident', koal: 'SPD, Grüne', parl: 'Landtag' },
    { land: 'Nordrhein-Westfalen', hs: 'Düsseldorf', ew: 18.0, st: 6, chef: 'Hendrik Wüst', partei: 'CDU', titel: 'Ministerpräsident', koal: 'CDU, Grüne', parl: 'Landtag' },
    { land: 'Rheinland-Pfalz', hs: 'Mainz', ew: 4.1, st: 4, chef: 'Gordon Schnieder', partei: 'CDU', titel: 'Ministerpräsident', koal: 'CDU, SPD', parl: 'Landtag', note: 'seit Mai 2026' },
    { land: 'Saarland', hs: 'Saarbrücken', ew: 1.0, st: 3, chef: 'Anke Rehlinger', partei: 'SPD', titel: 'Ministerpräsidentin', koal: 'SPD (Alleinregierung)', parl: 'Landtag' },
    { land: 'Sachsen', hs: 'Dresden', ew: 4.0, st: 4, chef: 'Michael Kretschmer', partei: 'CDU', titel: 'Ministerpräsident', koal: 'CDU, SPD (Minderheitsregierung)', parl: 'Landtag' },
    { land: 'Sachsen-Anhalt', hs: 'Magdeburg', ew: 2.1, st: 4, chef: 'Sven Schulze', partei: 'CDU', titel: 'Ministerpräsident', koal: 'CDU, SPD, FDP', parl: 'Landtag', note: 'seit Januar 2026; Wahl am 06.09.2026 – Regierungsbildung läuft' },
    { land: 'Schleswig-Holstein', hs: 'Kiel', ew: 3.0, st: 4, chef: 'Daniel Günther', partei: 'CDU', titel: 'Ministerpräsident', koal: 'CDU, Grüne', parl: 'Landtag' },
    { land: 'Thüringen', hs: 'Erfurt', ew: 2.1, st: 4, chef: 'Mario Voigt', partei: 'CDU', titel: 'Ministerpräsident', koal: 'CDU, BSW, SPD', parl: 'Landtag' }
  ],

  /* ---------- Ebenen des Staates ---------- */
  ebenen: [
    { name: 'Europäische Union', text: '27 Mitgliedstaaten haben Zuständigkeiten gebündelt, etwa für Binnenmarkt, Handel, Wettbewerb und Währung (Euro). Wichtige Organe: Europäisches Parlament (96 Abgeordnete aus Deutschland), Rat der EU, Europäische Kommission, Europäischer Rat und Gerichtshof der EU.' },
    { name: 'Bund', text: 'Zuständig für Themen, die einheitlich geregelt sein müssen: Außenpolitik, Verteidigung, Staatsangehörigkeit, große Teile des Zivil-, Straf-, Arbeits- und Sozialrechts, Steuern. Organe: Bundestag, Bundesrat, Bundesregierung, Bundespräsident, Bundesverfassungsgericht.' },
    { name: '16 Länder', text: 'Eigene Staaten mit eigener Verfassung, eigenem Parlament und eigener Regierung. Zuständig vor allem für Schule und Hochschule, Polizei, Kultur und Kommunalrecht. Die Länder führen auch die meisten Bundesgesetze aus.' },
    { name: 'Regierungsbezirke', text: 'Mittlere Verwaltungsebene in einigen größeren Ländern (z. B. Bayern, Baden-Württemberg, Nordrhein-Westfalen, Hessen). Sie sind keine eigene politische Ebene, sondern Teil der Landesverwaltung.' },
    { name: 'Kreise und kreisfreie Städte', text: '294 Landkreise und 106 kreisfreie Städte. Kreise übernehmen Aufgaben, die für einzelne Gemeinden zu groß sind – etwa Kreisstraßen, Abfallentsorgung, Rettungsdienst oder Jugend- und Sozialhilfe.' },
    { name: 'Gemeinden', text: 'Knapp 11.000 Städte und Gemeinden regeln die Angelegenheiten der örtlichen Gemeinschaft in eigener Verantwortung (kommunale Selbstverwaltung, Art. 28 Abs. 2 GG): Kitas, Bebauungspläne, Wasser, Friedhöfe, Bürgerämter.' }
  ],

  gewalten: {
    kopf: ['', 'Gesetzgebung (Legislative)', 'Vollziehende Gewalt (Exekutive)', 'Rechtsprechung (Judikative)'],
    zeilen: [
      ['Bund', 'Bundestag, Bundesrat (Mitwirkung)', 'Bundesregierung, Bundesverwaltung, Bundespräsident', 'Bundesverfassungsgericht, oberste Gerichtshöfe des Bundes'],
      ['Länder', 'Landtage (in Stadtstaaten: Abgeordnetenhaus, Bürgerschaft)', 'Landesregierungen, Landesverwaltung, Polizei', 'Landesverfassungsgerichte, Gerichte der Länder'],
      ['Kommunen', 'Satzungen durch Gemeinderat, Stadtrat, Kreistag', 'Bürgermeister, Landrat, Gemeinde- und Kreisverwaltung', '– (keine eigenen Gerichte)']
    ]
  },

  hierarchieRegierung: [
    { stufe: 'Bundeskanzler/in', text: 'bestimmt die Richtlinien der Politik und trägt dafür die Verantwortung (Art. 65 GG). Unterstützt vom Bundeskanzleramt.' },
    { stufe: 'Bundesminister/innen', text: 'leiten ihr Ministerium innerhalb der Richtlinien selbstständig und in eigener Verantwortung (Ressortprinzip).' },
    { stufe: 'Staatssekretäre', text: 'Parlamentarische Staatssekretäre (Abgeordnete) unterstützen politisch; beamtete Staatssekretäre leiten die Verwaltung des Ministeriums.' },
    { stufe: 'Abteilungen und Referate', text: 'Fachleute im Ministerium bereiten Gesetzentwürfe, Verordnungen und Entscheidungen vor.' },
    { stufe: 'Bundesbehörden', text: 'Oberbehörden wie Bundeskriminalamt, Bundesamt für Migration und Flüchtlinge, Umweltbundesamt oder Statistisches Bundesamt führen Aufgaben für den ganzen Bund aus.' }
  ],

  /* ---------- Gesetzgebung ---------- */
  gesetzgebung: [
    { t: 'Gesetzesinitiative', gg: 'Art. 76 Abs. 1 GG', d: 'Gesetzentwürfe können die Bundesregierung, der Bundesrat oder Abgeordnete aus der Mitte des Bundestages einbringen (eine Fraktion oder fünf Prozent der Abgeordneten). Die meisten Entwürfe stammen von der Bundesregierung und werden in den Ministerien erarbeitet.' },
    { t: 'Erster Durchgang im Bundesrat', gg: 'Art. 76 Abs. 2 GG', d: 'Regierungsentwürfe gehen zuerst an den Bundesrat, der in der Regel innerhalb von sechs Wochen Stellung nimmt. Die Bundesregierung antwortet mit einer Gegenäußerung. Entwürfe des Bundesrates laufen umgekehrt zuerst über die Bundesregierung.' },
    { t: 'Erste Lesung im Bundestag', gg: 'GO-BT', d: 'Der Entwurf wird im Plenum vorgestellt, oft mit Aussprache, und an die zuständigen Fachausschüsse überwiesen. Ein Ausschuss wird federführend.' },
    { t: 'Beratung in den Ausschüssen', gg: 'GO-BT', d: 'Hier findet die eigentliche Detailarbeit statt: Anhörungen von Sachverständigen, Änderungsanträge, Abstimmung einer Beschlussempfehlung für das Plenum.' },
    { t: 'Zweite und dritte Lesung', gg: 'Art. 77 Abs. 1 GG', d: 'In der zweiten Lesung wird über jede Bestimmung beraten und abgestimmt; Änderungen sind möglich. In der dritten Lesung folgt die Schlussabstimmung. Für ein einfaches Gesetz genügt die Mehrheit der abgegebenen Stimmen, für eine Grundgesetzänderung sind zwei Drittel der Mitglieder nötig.' },
    { t: 'Zweiter Durchgang im Bundesrat', gg: 'Art. 77, 78 GG', d: 'Bei Zustimmungsgesetzen – etwa wenn Länderinteressen besonders betroffen sind – kommt das Gesetz nur mit Zustimmung des Bundesrates zustande. Bei Einspruchsgesetzen kann der Bundesrat Einspruch einlegen, den der Bundestag überstimmen kann. In beiden Fällen kann der Vermittlungsausschuss angerufen werden.' },
    { t: 'Vermittlungsausschuss (wenn nötig)', gg: 'Art. 77 Abs. 2 GG', d: 'Je 16 Mitglieder aus Bundestag und Bundesrat suchen einen Kompromiss. Schlägt er Änderungen vor, muss der Bundestag erneut beschließen.' },
    { t: 'Gegenzeichnung und Ausfertigung', gg: 'Art. 58, 82 GG', d: 'Der zuständige Minister und der Kanzler zeichnen gegen, dann prüft der Bundespräsident, ob das Gesetz verfassungsgemäß zustande gekommen ist, und unterzeichnet es. Eine Verweigerung ist sehr selten.' },
    { t: 'Verkündung und Inkrafttreten', gg: 'Art. 82 GG', d: 'Das Gesetz wird im Bundesgesetzblatt verkündet – seit 2023 elektronisch auf recht.bund.de. Es tritt an dem darin bestimmten Tag in Kraft, sonst am vierzehnten Tag nach der Verkündung.' }
  ],

  kompetenzen: [
    { art: 'Grundsatz: Länder', gg: 'Art. 30, 70 GG', text: 'Die Länder haben das Recht der Gesetzgebung, soweit das Grundgesetz nicht dem Bund Befugnisse verleiht.', bsp: 'Schule, Hochschulen (weitgehend), Polizei- und Ordnungsrecht, Kultur, Kommunalrecht, Bauordnungen, Versammlungsrecht, Ladenöffnung, Gaststätten, Strafvollzug' },
    { art: 'Ausschließliche Gesetzgebung des Bundes', gg: 'Art. 71, 73 GG', text: 'Nur der Bund darf Gesetze erlassen; die Länder nur, wenn ein Bundesgesetz sie ausdrücklich ermächtigt.', bsp: 'Auswärtiges, Verteidigung, Staatsangehörigkeit, Pass- und Meldewesen, Währung, Zölle, Luftverkehr, Bundeseisenbahnen, Post und Telekommunikation, Urheberrecht, Waffenrecht, Kernenergie' },
    { art: 'Konkurrierende Gesetzgebung', gg: 'Art. 72, 74 GG', text: 'Die Länder dürfen Gesetze erlassen, solange und soweit der Bund nicht selbst gehandelt hat. In einigen Bereichen darf der Bund nur, wenn eine bundeseinheitliche Regelung erforderlich ist.', bsp: 'Bürgerliches Recht, Strafrecht, Gerichtsverfahren, Arbeitsrecht, Wirtschaftsrecht, Sozialfürsorge, Aufenthaltsrecht, Straßenverkehr, Abfall und Luftreinhaltung' },
    { art: 'Abweichungsgesetzgebung', gg: 'Art. 72 Abs. 3 GG', text: 'Hat der Bund ein Gesetz erlassen, dürfen die Länder davon abweichende eigene Regeln treffen. Es gilt dann das jeweils spätere Gesetz.', bsp: 'Jagdwesen, Naturschutz, Raumordnung, Wasserhaushalt, Hochschulzulassung und -abschlüsse, Grundsteuer' }
  ],

  normen: [
    { n: 'Grundgesetz', d: 'Verfassung; alles andere Recht muss mit ihm vereinbar sein' },
    { n: 'Allgemeine Regeln des Völkerrechts', d: 'gehen den Gesetzen vor (Art. 25 GG)' },
    { n: 'Bundesgesetze', d: 'vom Bundestag beschlossen, z. B. BGB, StGB' },
    { n: 'Rechtsverordnungen des Bundes', d: 'von Regierung oder Ministerien auf Grund eines Gesetzes erlassen (Art. 80 GG)' },
    { n: 'Satzungen des Bundes', d: 'z. B. von bundesunmittelbaren Körperschaften' },
    { n: 'Landesverfassungen', d: '„Bundesrecht bricht Landesrecht“ (Art. 31 GG)' },
    { n: 'Landesgesetze', d: 'vom Landtag beschlossen, z. B. Schul- und Polizeigesetze' },
    { n: 'Landesverordnungen', d: 'von Landesregierung oder -ministerien erlassen' },
    { n: 'Kommunale Satzungen', d: 'z. B. Bebauungspläne, Friedhofs- und Gebührensatzungen' }
  ],

  gesetzeZahlen: { gesetze: 1797, gesetzeNormen: 52401, vo: 2866, voNormen: 44475, stichtag: '24. Mai 2024', quelle: 'Antwort der Bundesregierung auf eine Kleine Anfrage, Deutscher Bundestag, Juni 2024' },

  /* ---------- Glossar ---------- */
  glossar: [
    ['Abgeordnete', 'Gewählte Mitglieder eines Parlaments. Bundestagsabgeordnete sind „Vertreter des ganzen Volkes, an Aufträge und Weisungen nicht gebunden und nur ihrem Gewissen unterworfen“ (Art. 38 Abs. 1 GG).'],
    ['Absolute Mehrheit', 'Mehr als die Hälfte der gesetzlichen Mitglieder eines Gremiums. Im Bundestag mit 630 Mitgliedern sind das 316 Stimmen („Kanzlermehrheit“).'],
    ['Ältestenrat', 'Gremium des Bundestages aus Präsidium und erfahrenen Abgeordneten der Fraktionen; legt unter anderem die Tagesordnung und die Redezeiten fest.'],
    ['Amtseid', 'Eid, den Bundespräsident, Kanzler und Minister bei Amtsantritt leisten (Art. 56, 64 GG). Die religiöse Beteuerung „So wahr mir Gott helfe“ ist freiwillig.'],
    ['Anfrage', 'Instrument zur Kontrolle der Regierung: Kleine und Große Anfragen von Fraktionen sowie schriftliche Einzelfragen von Abgeordneten, die die Regierung beantworten muss.'],
    ['Ausfertigung', 'Unterzeichnung eines beschlossenen Gesetzes durch den Bundespräsidenten nach Prüfung (Art. 82 GG).'],
    ['Ausschuss', 'Arbeitsgremium eines Parlaments zu einem Fachgebiet. Im Bundestag gibt es rund zwei Dutzend ständige Ausschüsse, in denen Gesetze im Detail beraten werden.'],
    ['Bundesgesetzblatt', 'Amtliches Verkündungsblatt des Bundes. Erst mit der Verkündung dort wird ein Gesetz wirksam; seit 2023 erscheint es elektronisch.'],
    ['Bundesstaat', 'Staat, der aus Gliedstaaten besteht. Deutschland besteht aus 16 Ländern, die eigene Staatsqualität haben (Art. 20 Abs. 1 GG).'],
    ['Bürgerbegehren', 'Antrag von Bürgerinnen und Bürgern auf einen Bürgerentscheid in ihrer Gemeinde. Auf Landesebene heißen die Instrumente Volksbegehren und Volksentscheid.'],
    ['Demokratie', 'Herrschaft des Volkes. „Alle Staatsgewalt geht vom Volke aus“ (Art. 20 Abs. 2 GG) – in Deutschland vor allem mittelbar über gewählte Parlamente.'],
    ['Direktmandat', 'Sitz, der über die Erststimme im Wahlkreis errungen wird. Seit der Wahlrechtsreform erhält eine Wahlkreissiegerin oder ein Wahlkreissieger den Sitz nur, wenn er durch das Zweitstimmenergebnis der Partei gedeckt ist.'],
    ['Einspruchsgesetz', 'Gesetz, bei dem der Bundesrat nur Einspruch einlegen kann. Der Bundestag kann den Einspruch mit entsprechender Mehrheit zurückweisen.'],
    ['Enquete-Kommission', 'Kommission aus Abgeordneten und Sachverständigen, die große Themen umfassend untersucht und Empfehlungen erarbeitet.'],
    ['Erststimme', 'Stimme für eine Person im Wahlkreis. Deutschland ist in 299 Wahlkreise eingeteilt.'],
    ['Ewigkeitsklausel', 'Art. 79 Abs. 3 GG: Die Gliederung in Länder, die Mitwirkung der Länder an der Gesetzgebung und die Grundsätze der Art. 1 und 20 dürfen auch durch Verfassungsänderung nicht angetastet werden.'],
    ['Exekutive', 'Die ausführende Gewalt: Regierung und Verwaltung, einschließlich Polizei.'],
    ['Föderalismus', 'Aufteilung staatlicher Aufgaben zwischen Bund und Ländern. Die Länder wirken über den Bundesrat an der Bundespolitik mit.'],
    ['Fraktion', 'Zusammenschluss von mindestens fünf Prozent der Bundestagsabgeordneten, in der Regel derselben Partei. Fraktionen haben besondere Rechte, etwa Gesetzentwürfe einzubringen.'],
    ['Fünf-Prozent-Hürde', 'Eine Partei erhält nur dann Sitze nach ihren Zweitstimmen, wenn sie mindestens fünf Prozent erreicht – oder mindestens drei Wahlkreise gewinnt (Grundmandatsklausel). Parteien nationaler Minderheiten wie der SSW sind ausgenommen.'],
    ['Gewaltenteilung', 'Aufteilung der Staatsgewalt auf Gesetzgebung, vollziehende Gewalt und Rechtsprechung, die sich gegenseitig kontrollieren (Art. 20 Abs. 2 GG).'],
    ['Grundmandatsklausel', 'Regel, nach der eine Partei, die mindestens drei Wahlkreise gewinnt, auch unter fünf Prozent nach ihrem Zweitstimmenanteil Sitze erhält. Das Bundesverfassungsgericht hat 2024 entschieden, dass sie bis zu einer Neuregelung weiter gilt.'],
    ['Grundrechte', 'Die in Art. 1 bis 19 GG garantierten Rechte des Einzelnen gegenüber dem Staat, etwa Menschenwürde, Meinungsfreiheit oder Gleichheit vor dem Gesetz.'],
    ['Haushalt', 'Plan aller Einnahmen und Ausgaben des Staates für ein Jahr. Der Bundeshaushalt wird vom Bundestag als Gesetz beschlossen.'],
    ['Immunität', 'Schutz von Abgeordneten vor Strafverfolgung ohne Genehmigung des Parlaments (Art. 46 Abs. 2 GG). Der Bundestag kann die Immunität aufheben.'],
    ['Indemnität', 'Abgeordnete dürfen wegen ihrer Abstimmungen und Äußerungen im Parlament nicht verfolgt werden – außer bei verleumderischen Beleidigungen (Art. 46 Abs. 1 GG).'],
    ['Judikative', 'Die rechtsprechende Gewalt, ausgeübt durch unabhängige Richterinnen und Richter (Art. 92, 97 GG).'],
    ['Kabinett', 'Die Bundesregierung als Kollegium aus Kanzler und Ministern; tagt in der Regel wöchentlich.'],
    ['Koalition', 'Bündnis mehrerer Parteien, die gemeinsam eine Regierung bilden und im Parlament eine Mehrheit haben. Ihre Vorhaben halten sie in einem Koalitionsvertrag fest.'],
    ['Kommunale Selbstverwaltung', 'Recht der Gemeinden, alle Angelegenheiten der örtlichen Gemeinschaft in eigener Verantwortung zu regeln (Art. 28 Abs. 2 GG).'],
    ['Konstruktives Misstrauensvotum', 'Der Bundestag kann den Kanzler nur abwählen, indem er mit absoluter Mehrheit einen Nachfolger wählt (Art. 67 GG). Erfolgreich war das bisher einmal: 1982 wurde Helmut Kohl so Kanzler.'],
    ['Landtag', 'Parlament eines Landes. In Berlin heißt es Abgeordnetenhaus, in Bremen und Hamburg Bürgerschaft.'],
    ['Legislative', 'Die gesetzgebende Gewalt: auf Bundesebene der Bundestag unter Mitwirkung des Bundesrates.'],
    ['Lesung', 'Beratung eines Gesetzentwurfs im Plenum. Im Bundestag gibt es drei Lesungen.'],
    ['Ministerpräsident', 'Regierungschefin oder -chef eines Flächenlandes; wird vom Landtag gewählt.'],
    ['Normenkontrolle', 'Prüfung durch das Bundesverfassungsgericht, ob ein Gesetz mit dem Grundgesetz vereinbar ist – abstrakt auf Antrag etwa der Bundesregierung oder eines Viertels des Bundestages, konkret auf Vorlage eines Gerichts.'],
    ['Opposition', 'Die Fraktionen, die die Regierung nicht tragen. Sie kontrollieren und kritisieren die Regierung und entwickeln Alternativen.'],
    ['Parlamentsvorbehalt', 'Bewaffnete Auslandseinsätze der Bundeswehr brauchen grundsätzlich die vorherige Zustimmung des Bundestages („Parlamentsarmee“).'],
    ['Partei', 'Vereinigung von Bürgerinnen und Bürgern, die dauerhaft an der politischen Willensbildung mitwirken und an Wahlen teilnehmen will (Art. 21 GG, § 2 Parteiengesetz).'],
    ['Petition', 'Bitte oder Beschwerde an eine Volksvertretung (Art. 17 GG). Jede Person kann sich an den Petitionsausschuss des Bundestages wenden.'],
    ['Plenum', 'Die Vollversammlung aller Abgeordneten.'],
    ['Rechtsstaat', 'Staat, in dem alle staatliche Gewalt an Recht und Gesetz gebunden ist und von unabhängigen Gerichten kontrolliert wird (Art. 20 Abs. 3 GG).'],
    ['Rechtsverordnung', 'Von Regierung oder Ministerium erlassene Rechtsnorm. Sie braucht eine gesetzliche Ermächtigung, die Inhalt, Zweck und Ausmaß bestimmt (Art. 80 GG).'],
    ['Republik', 'Staatsform ohne Monarchen; das Staatsoberhaupt wird auf Zeit gewählt.'],
    ['Ressortprinzip', 'Jede Ministerin und jeder Minister leitet das eigene Ministerium selbstständig und in eigener Verantwortung (Art. 65 GG).'],
    ['Richtlinienkompetenz', 'Recht des Kanzlers, die grundlegende Linie der Regierungspolitik zu bestimmen (Art. 65 GG).'],
    ['Sondervermögen', 'Vom übrigen Haushalt getrennte Vermögensmasse mit eigenem Zweck, etwa das Sondervermögen Bundeswehr (2022) oder das Sondervermögen Infrastruktur und Klimaneutralität (2025).'],
    ['Sozialstaat', 'Der Staat ist verpflichtet, für soziale Gerechtigkeit und soziale Sicherheit zu sorgen (Art. 20 Abs. 1 GG).'],
    ['Subsidiarität', 'Grundsatz, dass Aufgaben möglichst von der kleineren, bürgernäheren Einheit erledigt werden und die höhere Ebene nur eingreift, wenn es nötig ist.'],
    ['Untersuchungsausschuss', 'Ausschuss zur Aufklärung möglicher Missstände. Der Bundestag muss ihn einsetzen, wenn ein Viertel seiner Mitglieder das verlangt (Art. 44 GG).'],
    ['Verfassungsbeschwerde', 'Rechtsbehelf, mit dem jede Person geltend machen kann, durch die öffentliche Gewalt in ihren Grundrechten verletzt zu sein (Art. 93 Abs. 1 Nr. 4a GG).'],
    ['Verfassungsschutz', 'Inlandsnachrichtendienst von Bund (Bundesamt für Verfassungsschutz) und Ländern, der Bestrebungen gegen die freiheitliche demokratische Grundordnung beobachtet.'],
    ['Vermittlungsausschuss', 'Gemeinsames Gremium aus je 16 Mitgliedern von Bundestag und Bundesrat, das bei Streit über ein Gesetz einen Kompromiss sucht (Art. 77 GG).'],
    ['Vertrauensfrage', 'Der Kanzler kann den Bundestag fragen, ob er ihm vertraut. Erhält er keine Mehrheit, kann der Bundespräsident den Bundestag auf Vorschlag des Kanzlers auflösen (Art. 68 GG) – so geschehen zuletzt im Dezember 2024.'],
    ['Volksentscheid', 'Abstimmung der Wahlberechtigten über eine Sachfrage. Auf Bundesebene sieht das Grundgesetz sie nur bei einer Neugliederung des Bundesgebietes vor, in den Ländern gibt es sie regelmäßig.'],
    ['Wahlkreis', 'Gebiet, in dem mit der Erststimme eine Person gewählt wird. Für die Bundestagswahl gibt es 299 Wahlkreise.'],
    ['Wahlperiode', 'Zeitraum, für den ein Parlament gewählt ist. Beim Bundestag vier Jahre (Art. 39 GG).'],
    ['Wehrbeauftragte', 'Vom Bundestag gewählte Person, die die Grundrechte der Soldatinnen und Soldaten schützt und das Parlament bei der Kontrolle der Bundeswehr unterstützt (Art. 45b GG).'],
    ['Zustimmungsgesetz', 'Gesetz, das nur mit ausdrücklicher Zustimmung des Bundesrates zustande kommt – etwa wenn es das Grundgesetz ändert oder die Verwaltung der Länder regelt.'],
    ['Zweitstimme', 'Stimme für die Landesliste einer Partei. Sie entscheidet über die Verteilung der Sitze im Bundestag.']
  ]
};
