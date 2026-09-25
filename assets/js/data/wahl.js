/* ==========================================================================
   Prüfstand – Daten Parteien-Test
   Grundlage: Wahlprogramme der Parteien zur Bundestagswahl 2025.
   Wo ein Programm keine eindeutige Aussage enthält, wurde ausnahmsweise
   das Abstimmungsverhalten im Bundestag herangezogen (in der Begründung
   ausdrücklich genannt). Sonst: null = keine eindeutige Aussage.
   Positionen: 1 = stimmt zu, 0 = neutral/teils, -1 = lehnt ab, null = keine Aussage.
   Eigene Thesen und Formulierungen; keine Übernahme fremder Datensätze.
   ========================================================================== */
window.PS = window.PS || {};
PS.wahl = {
  stand: '24. September 2026',
  grundlage: 'Wahlprogramme zur Bundestagswahl 2025',
  auswahl: 'Alle Parteien, die bei der Bundestagswahl am 23. Februar 2025 bundesweit mindestens 1 % der Zweitstimmen erhalten haben.',
  minAntworten: 10,

  kategorien: {
    aussen: 'Außen & Sicherheit',
    migration: 'Migration',
    finanzen: 'Wirtschaft & Finanzen',
    sozial: 'Soziales & Gesundheit',
    klima: 'Klima, Energie & Verkehr',
    gesellschaft: 'Gesellschaft & Demokratie'
  },

  parteien: [
    { id: 'union', kurz: 'CDU/CSU', name: 'Christlich Demokratische Union Deutschlands / Christlich-Soziale Union in Bayern', programm: 'Politikwechsel für Deutschland (gemeinsames Wahlprogramm von CDU und CSU)', url: 'https://www.cdu.de/app/uploads/2025/01/km_btw_2025_wahlprogramm_langfassung_ansicht.pdf', ergebnis: '28,5 % (CDU 22,6 % · CSU 6,0 %)' },
    { id: 'afd', kurz: 'AfD', name: 'Alternative für Deutschland', programm: 'Zeit für Deutschland', url: 'https://www.afd.de/wp-content/uploads/2025/02/AfD_Bundestagswahlprogramm2025_web.pdf', ergebnis: '20,8 %' },
    { id: 'spd', kurz: 'SPD', name: 'Sozialdemokratische Partei Deutschlands', programm: 'Mehr für Dich. Besser für Deutschland.', url: 'https://mehr.spd.de/custom-static-assets/documents/Regierungsprogramm.pdf', ergebnis: '16,4 %' },
    { id: 'gruene', kurz: 'GRÜNE', name: 'Bündnis 90/Die Grünen', programm: 'Zusammen wachsen', url: 'https://www.gruene.de/artikel/zusammen-wachsen', ergebnis: '11,6 %' },
    { id: 'linke', kurz: 'Die Linke', name: 'Die Linke', programm: 'Wahlprogramm zur Bundestagswahl 2025', url: 'https://www.die-linke.de/bundestagswahl-2025/wahlprogramm/', ergebnis: '8,8 %' },
    { id: 'bsw', kurz: 'BSW', name: 'Bündnis Sahra Wagenknecht – Vernunft und Gerechtigkeit (ab 1. Oktober 2026: Bündnis Soziale Gerechtigkeit und Wirtschaftliche Vernunft)', programm: 'Unser Land verdient mehr!', url: 'https://bsw-vg.de/bundestagswahl2025/', ergebnis: '4,98 %' },
    { id: 'fdp', kurz: 'FDP', name: 'Freie Demokratische Partei', programm: 'Alles lässt sich ändern.', url: 'https://www.fdp.de/sites/default/files/2024-12/fdp-wahlprogramm_2025.pdf', ergebnis: '4,3 %' },
    { id: 'fw', kurz: 'FREIE WÄHLER', name: 'Freie Wähler', programm: 'Verantwortung für Deutschland (Bundestagswahlprogramm 2025–2029)', url: 'https://www.freiewaehler.eu/dokumente/grundlagen/', ergebnis: '1,5 %' }
  ],

  thesen: [
    {
      id: 't01', kat: 'aussen', titel: 'Waffen für die Ukraine',
      text: 'Deutschland soll die Ukraine weiterhin mit Waffen unterstützen.',
      hintergrund: 'Seit dem russischen Großangriff im Februar 2022 unterstützt Deutschland die Ukraine finanziell, humanitär und militärisch – unter anderem mit Luftverteidigungssystemen, Panzern und Munition. Deutschland gehört damit zu den größten Unterstützern der Ukraine. Umstritten ist, wie weit die Hilfe gehen soll und welche Rolle Verhandlungen spielen sollen.',
      pro: ['Die Ukraine verteidigt sich gegen einen Angriffskrieg; Waffenhilfe stärkt ihr Recht auf Selbstverteidigung.', 'Ein Erfolg des Angreifers könnte die Sicherheit in ganz Europa gefährden.'],
      contra: ['Waffenlieferungen können den Krieg verlängern und das Risiko einer Eskalation erhöhen.', 'Das Geld wird im eigenen Land gebraucht; Verhandlungen sollten Vorrang haben.'],
      pos: {
        union: [1, 'Will die Ukraine mit diplomatischen, finanziellen und humanitären Mitteln sowie mit Waffenlieferungen unterstützen.'],
        afd: [-1, 'Lehnt Waffenlieferungen ab, fordert Friedensverhandlungen und einen neutralen Status der Ukraine außerhalb von NATO und EU.'],
        spd: [1, 'Will die Ukraine weiter unterstützen – als Regierungspartei auch militärisch –, lehnt aber die Lieferung von Taurus-Marschflugkörpern ab.'],
        gruene: [1, 'Fordert diplomatische, finanzielle, humanitäre und militärische Unterstützung der Ukraine.'],
        linke: [-1, 'Will statt weiterer Waffenlieferungen eine diplomatische Initiative mit anderen Staaten, um Russland an den Verhandlungstisch zu bringen.'],
        bsw: [-1, 'Lehnt Waffenlieferungen und militärische Konfliktlösungen ab und setzt auf Verhandlungen.'],
        fdp: [1, 'Fordert umfassende Unterstützung einschließlich der sofortigen Lieferung von Taurus-Marschflugkörpern.'],
        fw: [1, 'Will die Ukraine „durch Waffen und Diplomatie“ unterstützen.']
      }
    },
    {
      id: 't02', kat: 'klima', titel: 'Tempolimit auf Autobahnen',
      text: 'Auf allen Autobahnen soll ein generelles Tempolimit gelten.',
      hintergrund: 'Auf rund 70 Prozent des Autobahnnetzes gibt es kein festes Tempolimit, sondern nur eine Richtgeschwindigkeit von 130 km/h. Deutschland ist damit in Europa eine Ausnahme. Nach Berechnungen des Umweltbundesamts ließen sich mit Tempo 120 jährlich mehrere Millionen Tonnen CO₂ einsparen.',
      pro: ['Weniger schwere Unfälle und Verkehrstote.', 'Geringerer Verbrauch und CO₂-Ausstoß, gleichmäßigerer Verkehrsfluss.'],
      contra: ['Eingriff in die persönliche Freiheit; gemessen an der Fahrleistung sind Autobahnen schon heute die sichersten Straßen.', 'An gefährlichen Abschnitten gelten bereits Geschwindigkeitsbegrenzungen.'],
      pos: {
        union: [-1, 'Lehnt ein generelles Tempolimit ab.'],
        afd: [-1, 'Lehnt Tempolimits auf Autobahnen klar ab.'],
        spd: [1, 'Fordert Tempo 130 auf Autobahnen.'],
        gruene: [1, 'Hält Tempo 130 auf Autobahnen für überfällig.'],
        linke: [1, 'Fordert Tempo 120 auf Autobahnen und Tempo 30 innerorts.'],
        bsw: [null, 'Das Wahlprogramm enthält keine eindeutige Aussage zum Tempolimit.'],
        fdp: [-1, 'Lehnt ein generelles Tempolimit auf Autobahnen ab.'],
        fw: [null, 'Das Wahlprogramm enthält keine eindeutige Aussage zum Tempolimit.']
      }
    },
    {
      id: 't03', kat: 'finanzen', titel: 'Vermögensteuer',
      text: 'Auf sehr große Vermögen soll wieder eine Vermögensteuer erhoben werden.',
      hintergrund: 'Die Vermögensteuer wird seit 1997 nicht mehr erhoben. Das Bundesverfassungsgericht hatte 1995 die ungleiche Bewertung verschiedener Vermögensarten beanstandet; das Gesetz besteht formal fort, wird aber nicht angewendet. Die Einnahmen stünden den Ländern zu.',
      pro: ['Vermögen ist in Deutschland sehr ungleich verteilt; eine Steuer könnte das ausgleichen.', 'Zusätzliche Einnahmen für Bildung, Infrastruktur oder Klimaschutz.'],
      contra: ['Kann Unternehmen belasten, deren Vermögen in Betrieben gebunden ist, und Investitionen bremsen.', 'Hoher Aufwand für die Bewertung von Vermögen; Kapital könnte abwandern.'],
      pos: {
        union: [-1, 'Lehnt eine Vermögensteuer ab.'],
        afd: [-1, 'Will die Vermögensteuer endgültig abschaffen.'],
        spd: [1, 'Will die Vermögensteuer für sehr hohe Vermögen wieder einführen.'],
        gruene: [0, 'Setzt sich für eine internationale Milliardärssteuer ein, fordert aber keine nationale Vermögensteuer.'],
        linke: [1, 'Fordert eine Vermögensteuer ab 1 Million Euro Nettovermögen (1 bis 5 %, für Milliardäre 12 %).'],
        bsw: [1, 'Fordert eine Vermögensteuer ab 25 Millionen Euro (1 bis 3 %).'],
        fdp: [-1, 'Lehnt Vermögensteuern und Vermögensabgaben grundsätzlich ab.'],
        fw: [-1, 'Lehnt Steuererhöhungen grundsätzlich ab und will stattdessen die Erbschaftsteuer abschaffen.']
      }
    },
    {
      id: 't04', kat: 'aussen', titel: 'Wehrpflicht',
      text: 'Die Wehrpflicht soll wieder eingeführt werden.',
      hintergrund: 'Die Wehrpflicht ist seit 2011 ausgesetzt, aber nicht abgeschafft. Seit Januar 2026 gilt ein neuer Wehrdienst: Alle 18-Jährigen erhalten einen Fragebogen, der für Männer verpflichtend ist; Männer ab Jahrgang 2008 werden gemustert. Der Dienst selbst bleibt freiwillig. Reicht die Zahl der Freiwilligen nicht aus, kann der Bundestag eine Bedarfswehrpflicht beschließen.',
      pro: ['Die Bundeswehr braucht angesichts der Sicherheitslage deutlich mehr Personal.', 'Ein Dienst für alle stärkt den gesellschaftlichen Zusammenhalt.'],
      contra: ['Ein Pflichtdienst greift stark in die Lebensplanung junger Menschen ein.', 'Eine moderne Armee braucht vor allem gut ausgebildete Freiwillige.'],
      pos: {
        union: [1, 'Will die Aussetzung zurücknehmen: „aufwachsende Wehrpflicht“ und perspektivisch ein verpflichtendes Gesellschaftsjahr.'],
        afd: [1, 'Fordert die Wiedereinführung der Wehrpflicht und des Ersatzdienstes.'],
        spd: [-1, 'Lehnt eine Wiedereinführung ab und setzt auf Freiwilligkeit.'],
        gruene: [-1, 'Will keinen Pflichtdienst, sondern den freiwilligen Wehrdienst und die Reserve attraktiver machen.'],
        linke: [-1, 'Lehnt eine Wiedereinführung der Wehrpflicht ab.'],
        bsw: [-1, 'Lehnt eine Wiederaufnahme der Wehrpflicht ab.'],
        fdp: [-1, 'Setzt auf eine Freiwilligenarmee mit starker Reserve, ohne Wehrpflicht.'],
        fw: [0, 'Fordert ein Gesellschaftsjahr für alle mit Wahlmöglichkeiten statt einer reinen Wehrpflicht.']
      }
    },
    {
      id: 't05', kat: 'migration', titel: 'Zurückweisungen an der Grenze',
      text: 'Asylsuchende, die aus einem anderen EU-Staat einreisen, sollen an der deutschen Grenze zurückgewiesen werden.',
      hintergrund: 'Nach den europäischen Dublin-Regeln ist meist der Staat für ein Asylverfahren zuständig, den eine Person zuerst betreten hat. Seit Mai 2025 lässt die Bundesregierung auch Asylsuchende an den Binnengrenzen zurückweisen, mit Ausnahmen etwa für Kranke und Schwangere. Ob das mit EU-Recht vereinbar ist, ist umstritten; das Verwaltungsgericht Berlin hielt im Juni 2025 Zurückweisungen in Einzelfällen für rechtswidrig.',
      pro: ['Die Zahl der Asylanträge würde sinken; Kommunen würden entlastet.', 'Nach dem Dublin-System ist ohnehin meist der Ersteinreisestaat zuständig.'],
      contra: ['Zurückweisungen ohne Prüfung könnten gegen EU-Recht verstoßen.', 'Nachbarstaaten werden belastet; die europäische Zusammenarbeit leidet.'],
      pos: {
        union: [1, 'Will Zurückweisungen an der Grenze konsequent durchsetzen.'],
        afd: [1, 'Fordert dauerhafte nationale Grenzkontrollen und Zurückweisungen.'],
        spd: [-1, 'Pauschale Zurückweisungen an den Binnengrenzen sollen „die absolute Ausnahme bleiben“.'],
        gruene: [-1, 'Das Recht auf Einzelfallprüfung und das Nichtzurückweisungsgebot sollen „immer und überall“ gelten.'],
        linke: [-1, 'Steht zum Recht auf Asyl „ohne Wenn und Aber“.'],
        bsw: [1, 'Wer über sichere Nachbarstaaten einreist, soll in Deutschland kein Asylrecht haben.'],
        fdp: [1, 'Will Zurückweisungen an den Grenzen modellhaft erproben; stimmte im Januar 2025 im Bundestag für einen Unionsantrag mit dieser Forderung.'],
        fw: [1, 'Fordert Zurückweisungen an den Grenzen.']
      }
    },
    {
      id: 't06', kat: 'sozial', titel: 'Mindestlohn von 15 Euro',
      text: 'Der gesetzliche Mindestlohn soll auf mindestens 15 Euro pro Stunde steigen.',
      hintergrund: 'Die Höhe des Mindestlohns schlägt eine Kommission aus Arbeitgebern und Gewerkschaften vor. Seit dem 1. Januar 2026 beträgt er 13,90 Euro, ab dem 1. Januar 2027 sind 14,60 Euro beschlossen. Die EU-Mindestlohnrichtlinie nennt 60 Prozent des mittleren Bruttolohns als Richtwert.',
      pro: ['Höhere Löhne für Geringverdienende und weniger staatliche Aufstockung.', 'Stärkt die Kaufkraft nach Jahren hoher Preissteigerungen.'],
      contra: ['Kann Arbeitsplätze gefährden, vor allem in kleinen Betrieben und strukturschwachen Regionen.', 'Die Höhe sollte die unabhängige Mindestlohnkommission festlegen, nicht die Politik.'],
      pos: {
        union: [0, 'Steht zum Mindestlohn, will die Höhe aber der unabhängigen Mindestlohnkommission überlassen.'],
        afd: [null, 'Das Wahlprogramm enthält keine eindeutige Aussage zur Höhe des Mindestlohns.'],
        spd: [1, 'Fordert 15 Euro spätestens ab 2026.'],
        gruene: [1, 'Fordert 15 Euro.'],
        linke: [1, 'Orientiert sich an 60 % des mittleren Lohns, also rund 15 Euro.'],
        bsw: [1, 'Fordert 15 Euro und eine Berechnung nach der EU-Richtlinie.'],
        fdp: [-1, 'Lehnt eine Erhöhung des Mindestlohns durch die Regierung ab.'],
        fw: [null, 'Das Wahlprogramm enthält keine eindeutige Aussage zum Mindestlohn.']
      }
    },
    {
      id: 't07', kat: 'klima', titel: 'Atomkraft',
      text: 'Deutschland soll wieder Atomkraftwerke zur Stromerzeugung nutzen.',
      hintergrund: 'Am 15. April 2023 gingen die letzten drei deutschen Atomkraftwerke vom Netz. Der Rückbau ist weit fortgeschritten; eine Wiederinbetriebnahme gilt als technisch und rechtlich aufwendig. Diskutiert werden auch neue, kleinere Reaktortypen, die sich noch in der Entwicklung befinden. Ein Endlager für hochradioaktiven Abfall wird noch gesucht.',
      pro: ['Atomkraft liefert klimafreundlichen Strom rund um die Uhr, unabhängig vom Wetter.', 'Viele andere Staaten setzen weiter auf Kernenergie.'],
      contra: ['Hohe Kosten, lange Bauzeiten und das Risiko schwerer Unfälle.', 'Die Endlagerung des Atommülls ist ungelöst.'],
      pos: {
        union: [0, 'Will eine Wiederinbetriebnahme der zuletzt abgeschalteten Kraftwerke prüfen und auf Forschung zu neuen Reaktortypen setzen.'],
        afd: [1, 'Fordert die Rückkehr zur Kernenergie.'],
        spd: [-1, 'Atomkraftwerke sollen stillgelegt bleiben.'],
        gruene: [-1, 'Eine Rückkehr zur Atomkraft ist „keine Option“.'],
        linke: [-1, 'Hält am Atomausstieg fest.'],
        bsw: [-1, 'Will Atomenergie derzeit nicht nutzen, aber die Fusionsforschung fördern.'],
        fdp: [1, 'Kernkraftwerke der neuen Generation sollen in Deutschland rechtssicher gebaut werden können.'],
        fw: [null, 'Das Wahlprogramm enthält keine eindeutige Aussage zur Atomkraft.']
      }
    },
    {
      id: 't08', kat: 'gesellschaft', titel: 'Wählen ab 16',
      text: 'Bei Bundestagswahlen sollen bereits 16-Jährige wählen dürfen.',
      hintergrund: 'Das Grundgesetz legt das Wahlalter für Bundestagswahlen auf 18 Jahre fest (Art. 38 Abs. 2 GG). Eine Änderung braucht eine Zwei-Drittel-Mehrheit in Bundestag und Bundesrat. Bei der Europawahl dürfen 16-Jährige seit 2024 wählen, in mehreren Ländern auch bei Landtags- und Kommunalwahlen.',
      pro: ['Junge Menschen sind von vielen Entscheidungen lange betroffen und sollen mitbestimmen können.', 'Frühes Wählen kann das politische Interesse dauerhaft stärken.'],
      contra: ['Wahlrecht und Volljährigkeit sollten zusammenfallen.', '16-Jährige sind oft noch stark von Elternhaus und Schule beeinflusst.'],
      pos: {
        union: [null, 'Das Wahlprogramm enthält keine Aussage zum Wahlalter.'],
        afd: [-1, 'Lehnt eine Absenkung des Wahlalters unter 18 Jahre ab.'],
        spd: [1, 'Will das aktive Wahlalter auf 16 Jahre senken.'],
        gruene: [1, 'Will das aktive Wahlalter bei Bundestagswahlen auf 16 Jahre senken.'],
        linke: [1, 'Fordert, das Wahlalter auf 16 Jahre abzusenken.'],
        bsw: [null, 'Das Wahlprogramm enthält keine Aussage zum Wahlalter.'],
        fdp: [null, 'Das Wahlprogramm 2025 enthält keine Aussage zum Wahlalter.'],
        fw: [null, 'Das Wahlprogramm enthält keine Aussage zum Wahlalter.']
      }
    },
    {
      id: 't09', kat: 'sozial', titel: 'Bürgerversicherung',
      text: 'Gesetzliche und private Krankenversicherung sollen zu einer gemeinsamen Bürgerversicherung für alle zusammengeführt werden.',
      hintergrund: 'Rund 90 Prozent der Menschen in Deutschland sind gesetzlich, rund 10 Prozent privat krankenversichert – etwa Beamtinnen und Beamte, viele Selbstständige und Gutverdienende. In der gesetzlichen Versicherung richten sich die Beiträge nach dem Einkommen, in der privaten nach Alter, Gesundheitszustand und Tarif.',
      pro: ['Alle würden nach ihrer Leistungsfähigkeit zur Finanzierung beitragen.', 'Unterschiede bei Wartezeiten zwischen Kassen- und Privatpatienten würden verringert.'],
      contra: ['Der Wettbewerb zwischen den Systemen fördert Innovation und Qualität.', 'Viele Praxen sind auf die höheren Privathonorare angewiesen; die Umstellung wäre kompliziert.'],
      pos: {
        union: [-1, 'Will am dualen System aus gesetzlicher und privater Krankenversicherung festhalten.'],
        afd: [null, 'Das Wahlprogramm enthält keine eindeutige Aussage zur Bürgerversicherung.'],
        spd: [1, 'Setzt sich für eine solidarische Bürgerversicherung mit gleichem Zugang für alle ein.'],
        gruene: [1, 'Will gesetzlich und privat Versicherte in eine Bürgerversicherung einbeziehen.'],
        linke: [1, 'Fordert eine solidarische Kranken- und Pflegeversicherung, in die alle einzahlen.'],
        bsw: [1, 'Fordert eine Bürgerversicherung, in die alle nach ihrem Einkommen einzahlen.'],
        fdp: [-1, 'Lehnt eine Bürgerversicherung ab und will das duale System erhalten.'],
        fw: [null, 'Das Wahlprogramm enthält keine eindeutige Aussage zur Bürgerversicherung.']
      }
    },
    {
      id: 't10', kat: 'finanzen', titel: 'Schuldenbremse',
      text: 'Die Schuldenbremse soll so reformiert werden, dass der Staat dauerhaft mehr Kredite für Investitionen aufnehmen darf.',
      hintergrund: 'Die Schuldenbremse im Grundgesetz (Art. 109 und 115 GG) erlaubt dem Bund eine strukturelle Neuverschuldung von höchstens 0,35 Prozent der Wirtschaftsleistung. Im März 2025 wurde sie gelockert: Verteidigungsausgaben oberhalb von einem Prozent der Wirtschaftsleistung sind ausgenommen, zudem entstand ein Sondervermögen von 500 Milliarden Euro für Infrastruktur und Klimaneutralität. Eine dauerhafte Regel für Investitionen gibt es bisher nicht.',
      pro: ['Deutschland hat großen Investitionsbedarf bei Schienen, Brücken, Schulen und Digitalisierung.', 'Investitionen nützen auch künftigen Generationen, die sie mitfinanzieren.'],
      contra: ['Mehr Schulden bedeuten höhere Zinslasten für künftige Haushalte.', 'Die Schuldenbremse zwingt zu Prioritäten und sichert solide Finanzen.'],
      pos: {
        union: [-1, 'Wollte laut Wahlprogramm an der Schuldenbremse festhalten; trug im März 2025 aber die Ausnahme für Verteidigung und das Sondervermögen mit.'],
        afd: [-1, 'Lehnt jede Aufweichung der Schuldenbremse ab.'],
        spd: [1, 'Will die Schuldenbremse reformieren, um Investitionen zu ermöglichen.'],
        gruene: [1, 'Will die Schuldenbremse modernisieren, damit Kredite für Investitionen möglich werden.'],
        linke: [1, 'Will die Schuldenbremse abschaffen.'],
        bsw: [1, 'Will Investitionen in Infrastruktur aus der Schuldenbremse herausnehmen.'],
        fdp: [-1, 'Will die Schuldenbremse unverändert erhalten.'],
        fw: [-1, 'Will die Schuldenbremse beibehalten.']
      }
    },
    {
      id: 't11', kat: 'gesellschaft', titel: 'Cannabis',
      text: 'Die teilweise Legalisierung von Cannabis soll rückgängig gemacht werden.',
      hintergrund: 'Seit dem 1. April 2024 dürfen Erwachsene begrenzte Mengen Cannabis besitzen (25 Gramm unterwegs, 50 Gramm zu Hause) und bis zu drei Pflanzen anbauen. Seit Juli 2024 sind außerdem nicht-kommerzielle Anbauvereinigungen erlaubt. Ein Verkauf in Geschäften ist nicht zugelassen. Die Auswirkungen des Gesetzes werden wissenschaftlich ausgewertet.',
      pro: ['Cannabis kann besonders jungen Menschen schaden; die Legalisierung verharmlost den Konsum.', 'Polizei und Justiz berichten von Umsetzungsproblemen; der Schwarzmarkt besteht fort.'],
      contra: ['Erwachsene sollen selbst entscheiden dürfen; das Verbot hat den Konsum nicht verhindert.', 'Die Legalisierung entlastet Polizei und Justiz und ermöglicht Qualitätskontrolle.'],
      pos: {
        union: [1, 'Will das Cannabisgesetz abschaffen.'],
        afd: [1, 'Hält die Freigabe für einen Fehler, der „umgehend korrigiert“ werden muss.'],
        spd: [-1, 'Will eine europarechtskonforme Legalisierung weiterverfolgen.'],
        gruene: [-1, 'Hält am Ziel des Verkaufs in lizenzierten Fachgeschäften fest.'],
        linke: [-1, 'Fordert eine vollständige Legalisierung.'],
        bsw: [null, 'Das Wahlprogramm enthält keine Aussage zu Cannabis.'],
        fdp: [-1, 'Hält an der Legalisierung fest.'],
        fw: [null, 'Das Wahlprogramm enthält keine Aussage zu Cannabis.']
      }
    },
    {
      id: 't12', kat: 'klima', titel: 'Verbrenner-Aus',
      text: 'Das EU-weite Aus für neue Autos mit Verbrennungsmotor ab 2035 soll zurückgenommen werden.',
      hintergrund: 'Die EU hat 2023 beschlossen, dass neu zugelassene Pkw ab 2035 kein CO₂ mehr ausstoßen dürfen. Im Dezember 2025 hat die EU-Kommission vorgeschlagen, das Ziel auf 90 Prozent weniger CO₂ abzuschwächen, sodass unter Bedingungen auch danach noch Autos mit Verbrennungsmotor zugelassen werden könnten. Über den Vorschlag beraten Europäisches Parlament und Mitgliedstaaten.',
      pro: ['Technologieoffenheit: Auch klimaneutrale Kraftstoffe und effiziente Verbrenner sollen eine Chance haben.', 'Arbeitsplätze in der Autoindustrie und bezahlbare Autos würden gesichert.'],
      contra: ['Ein klares Enddatum gibt Herstellern und Käufern Planungssicherheit für den Umstieg.', 'Der Verkehr muss für die Klimaziele deutlich weniger CO₂ ausstoßen.'],
      pos: {
        union: [1, 'Das „Verbrenner-Verbot“ soll rückgängig gemacht werden.'],
        afd: [1, 'Will den Verbrennungsmotor erhalten und setzt auf E-Fuels.'],
        spd: [-1, 'Setzt auf Elektromobilität als Standard und hält Verbrenner mit E-Fuels nicht für die Lösung.'],
        gruene: [-1, 'Hält am Verbrenner-Aus 2035 und an den EU-Flottengrenzwerten fest.'],
        linke: [-1, 'Will das Verbrenner-Aus bestehen lassen und den Umstieg auf E-Autos fördern.'],
        bsw: [1, 'Fordert die Rücknahme des Verbrennerverbots ab 2035.'],
        fdp: [1, 'Das Verbot soll „umgehend zurückgenommen“ werden.'],
        fw: [1, 'Will das EU-Verbrennerverbot stoppen.']
      }
    },
    {
      id: 't13', kat: 'sozial', titel: 'Grundsicherung bei Arbeitsverweigerung',
      text: 'Wer wiederholt zumutbare Arbeit ablehnt, soll keine Grundsicherung mehr erhalten.',
      hintergrund: 'Die Grundsicherung für Arbeitsuchende sichert das Existenzminimum. 2026 wurde das Bürgergeld zur neuen Grundsicherung (Grundsicherungsgeld) umgebaut; die Reform verschärft die Mitwirkungspflichten und erlaubt in bestimmten Fällen den vollständigen Wegfall der Leistungen. Das Bundesverfassungsgericht hat 2019 entschieden, dass Kürzungen verhältnismäßig sein müssen.',
      pro: ['Wer arbeiten kann, soll nicht auf Kosten der Allgemeinheit leben.', 'Klare Regeln erhöhen die Akzeptanz des Sozialstaats.'],
      contra: ['Das Existenzminimum ist grundrechtlich geschützt; Kürzungen treffen oft auch Kinder.', 'Betroffen ist nur ein kleiner Teil der Leistungsbeziehenden; Beratung und Qualifizierung wirken nachhaltiger.'],
      pos: {
        union: [1, 'Bei grundsätzlicher Arbeitsverweigerung soll die Grundsicherung komplett gestrichen werden.'],
        afd: [1, 'Plant eine „aktivierende Grundsicherung“ mit Arbeitspflicht; bei Verweigerung soll die Leistung entfallen.'],
        spd: [0, 'Hält am Bürgergeld fest, fordert aber Mitwirkung ein.'],
        gruene: [-1, 'Die Leistung soll das soziokulturelle Existenzminimum nicht unterschreiten.'],
        linke: [-1, 'Fordert eine sanktionsfreie Mindestsicherung.'],
        bsw: [0, 'Hält Mitwirkungspflichten für notwendig; wer Maßnahmen ablehnt, müsse mit Konsequenzen rechnen.'],
        fdp: [1, 'Fordert wirksamere Sanktionen; Leistungen sollen bei fehlender Initiative Stück für Stück gekürzt werden.'],
        fw: [1, 'Wer zumutbare Arbeit ablehnt, soll keinen Anspruch haben.']
      }
    },
    {
      id: 't14', kat: 'sozial', titel: 'Mieten begrenzen',
      text: 'Mieterhöhungen sollen gesetzlich stärker begrenzt werden als bisher.',
      hintergrund: 'In Gebieten mit angespanntem Wohnungsmarkt darf die Miete bei Neuvermietung höchstens zehn Prozent über der ortsüblichen Vergleichsmiete liegen (Mietpreisbremse). Diese Regel wurde 2025 bis Ende 2029 verlängert. Bei laufenden Verträgen darf die Miete innerhalb von drei Jahren um höchstens 20 Prozent steigen, in angespannten Märkten um 15 Prozent.',
      pro: ['Wohnen wird für viele unbezahlbar; Mieterinnen und Mieter brauchen Schutz.', 'Verdrängung aus Innenstädten würde gebremst.'],
      contra: ['Strengere Regeln schrecken Investoren ab – dann wird weniger gebaut.', 'Das Kernproblem ist zu wenig Wohnraum; helfen würde vor allem Neubau.'],
      pos: {
        union: [0, 'Bekennt sich zu den bestehenden Regeln zur Miethöhe, fordert aber keine Verschärfung.'],
        afd: [-1, 'Lehnt Mietpreisbremse und Mietendeckel als Investitionshemmnisse ab.'],
        spd: [1, 'Will die Mietpreisbremse unbefristet verlängern und ausweiten.'],
        gruene: [1, 'Will die Mietpreisbremse verlängern und verschärfen.'],
        linke: [1, 'Fordert einen bundesweiten Mietendeckel.'],
        bsw: [1, 'Will Mieten in angespannten Regionen bis 2030 einfrieren.'],
        fdp: [-1, 'Lehnt die Mietpreisbremse ab und setzt auf Neubau und Wohneigentum.'],
        fw: [-1, 'Will bezahlbaren Wohnraum „ohne Mietendeckel“ schaffen.']
      }
    },
    {
      id: 't15', kat: 'migration', titel: 'Doppelte Staatsbürgerschaft',
      text: 'Die Möglichkeit, neben der deutschen dauerhaft eine weitere Staatsangehörigkeit zu besitzen, soll wieder eingeschränkt werden.',
      hintergrund: 'Seit Juni 2024 ist Mehrstaatigkeit in Deutschland grundsätzlich erlaubt; wer sich einbürgern lässt, muss den bisherigen Pass nicht mehr abgeben. Eine Einbürgerung ist in der Regel nach fünf Jahren rechtmäßigem Aufenthalt möglich. Die 2024 eingeführte schnellere Einbürgerung nach drei Jahren wurde im Oktober 2025 wieder abgeschafft.',
      pro: ['Die Staatsangehörigkeit soll eine klare Entscheidung für Deutschland ausdrücken.', 'Doppelte Loyalitäten können zu Konflikten führen.'],
      contra: ['Viele fühlen sich zwei Ländern verbunden; die Pflicht zur Aufgabe des alten Passes hält von der Einbürgerung ab.', 'Viele EU-Staaten erlauben Mehrstaatigkeit; sie erleichtert die Integration.'],
      pos: {
        union: [1, 'Will die „generelle Möglichkeit der doppelten Staatsbürgerschaft“ rückgängig machen.'],
        afd: [1, 'Lehnt die doppelte Staatsbürgerschaft ab.'],
        spd: [-1, 'Verteidigt das neue Staatsangehörigkeitsrecht.'],
        gruene: [-1, 'Menschen mit doppelter Staatsangehörigkeit sollen nicht anders behandelt werden.'],
        linke: [-1, 'Tritt für gleiche Rechte unabhängig von Pass und Herkunft ein.'],
        bsw: [null, 'Das Wahlprogramm enthält keine Aussage zur doppelten Staatsbürgerschaft.'],
        fdp: [-1, 'Hat die Reform mit genereller Zulassung der Mehrstaatigkeit 2024 in der Ampel-Koalition mitbeschlossen.'],
        fw: [null, 'Will Gesetze zur Einbürgerung nur mit breiter Mehrheit ändern; zur doppelten Staatsbürgerschaft keine eindeutige Aussage.']
      }
    },
    {
      id: 't16', kat: 'klima', titel: 'Kohleausstieg 2030',
      text: 'Der Ausstieg aus der Kohleverstromung soll auf 2030 vorgezogen werden.',
      hintergrund: 'Nach dem Kohleausstiegsgesetz soll spätestens 2038 das letzte Kohlekraftwerk vom Netz gehen. Für das Rheinische Revier wurde der Ausstieg bereits auf 2030 vorgezogen. Kohle lieferte 2024 noch rund ein Fünftel des in Deutschland erzeugten Stroms.',
      pro: ['Kohle ist der klimaschädlichste Energieträger; ein früherer Ausstieg spart viel CO₂.', 'Klare Perspektive für den Ausbau erneuerbarer Energien.'],
      contra: ['Die Versorgungssicherheit ist gefährdet, solange Speicher und neue Gaskraftwerke fehlen.', 'Die Kohleregionen brauchen Zeit für den Strukturwandel.'],
      pos: {
        union: [-1, 'Hält am Enddatum 2038 fest; Kraftwerke sollen nur abgeschaltet werden, wenn Ersatz vorhanden ist.'],
        afd: [-1, 'Will Kohlekraftwerke erhalten und neu bauen.'],
        spd: [null, 'Das Wahlprogramm enthält keine eindeutige Aussage zum Zeitpunkt des Kohleausstiegs.'],
        gruene: [1, 'Kohlekraftwerke sollen ab 2030 nicht mehr befeuert werden.'],
        linke: [1, 'Fordert einen Kohleausstieg bis 2030.'],
        bsw: [null, 'Das Wahlprogramm nennt kein Ausstiegsdatum.'],
        fdp: [-1, 'Die Braunkohle soll wie gesetzlich vorgesehen bis 2038 laufen dürfen.'],
        fw: [null, 'Das Wahlprogramm nennt kein Ausstiegsdatum.']
      }
    },
    {
      id: 't17', kat: 'gesellschaft', titel: 'Schwangerschaftsabbruch',
      text: 'Schwangerschaftsabbrüche in den ersten zwölf Wochen sollen grundsätzlich rechtmäßig sein und nicht mehr im Strafgesetzbuch geregelt werden.',
      hintergrund: 'Nach § 218 des Strafgesetzbuchs ist ein Schwangerschaftsabbruch grundsätzlich rechtswidrig. In den ersten zwölf Wochen bleibt er aber straffrei, wenn sich die Schwangere zuvor beraten lässt (§ 218a StGB). Eine von der Bundesregierung eingesetzte Expertenkommission empfahl 2024, Abbrüche in der Frühphase zu erlauben.',
      pro: ['Die Entscheidung über eine Schwangerschaft gehört zum Selbstbestimmungsrecht.', 'Die Einordnung im Strafrecht stigmatisiert Betroffene sowie Ärztinnen und Ärzte.'],
      contra: ['Das ungeborene Leben steht unter dem Schutz des Grundgesetzes; das Strafrecht drückt diesen Schutz aus.', 'Die bestehende Regelung ist ein mühsam gefundener gesellschaftlicher Kompromiss.'],
      pos: {
        union: [-1, 'Will an der geltenden Regelung festhalten.'],
        afd: [-1, 'Hält die bestehende Regelung für ausgewogen, fordert aber einen stärkeren Schutz des ungeborenen Lebens.'],
        spd: [1, 'Abbrüche in den ersten drei Monaten sollen grundsätzlich rechtmäßig und außerhalb des Strafrechts geregelt sein.'],
        gruene: [1, 'Will Schwangerschaftsabbrüche grundsätzlich außerhalb des Strafrechts regeln.'],
        linke: [1, 'Fordert die ersatzlose Streichung von § 218.'],
        bsw: [null, 'Das Wahlprogramm enthält keine Aussage zum Schwangerschaftsabbruch.'],
        fdp: [0, 'Will eine Reform in einer fraktionsübergreifenden Abstimmung ohne Fraktionszwang.'],
        fw: [null, 'Das Wahlprogramm enthält keine Aussage zum Schwangerschaftsabbruch.']
      }
    },
    {
      id: 't18', kat: 'finanzen', titel: 'Erbschaftsteuer',
      text: 'Große Erbschaften sollen stärker besteuert werden als bisher.',
      hintergrund: 'Erbschaftsteuer fällt an, wenn der Wert des Erbes bestimmte Freibeträge übersteigt – für Kinder zum Beispiel 400.000 Euro. Betriebsvermögen kann unter Bedingungen weitgehend steuerfrei vererbt werden, damit Unternehmen und Arbeitsplätze erhalten bleiben. Kritiker bemängeln, dass sehr große Erbschaften dadurch oft geringer besteuert werden als kleinere.',
      pro: ['Große Erbschaften sind ein Vermögenszuwachs ohne eigene Leistung; eine höhere Besteuerung ist gerecht.', 'Mehr Einnahmen für die Länder, denen die Erbschaftsteuer zusteht.'],
      contra: ['Familienunternehmen könnten bei der Übergabe in Schwierigkeiten geraten.', 'Das Vermögen wurde bereits versteuert; Vererben ist Privatsache.'],
      pos: {
        union: [-1, 'Will die Freibeträge deutlich erhöhen; Familienunternehmen sollen nicht in der Substanz belastet werden.'],
        afd: [-1, 'Will die Erbschaftsteuer abschaffen.'],
        spd: [1, 'Will eine effektive Mindestbesteuerung großer Betriebsvermögen.'],
        gruene: [1, 'Will Ausnahmen für sehr große Erbschaften streichen.'],
        linke: [1, 'Will Vergünstigungen für Unternehmensvermögen streichen und hohe Erbschaften stärker besteuern.'],
        bsw: [1, 'Will Vergünstigungen für große Erbschaften abbauen, weil der Steuersatz bisher sinke, je mehr geerbt wird.'],
        fdp: [-1, 'Will die Freibeträge automatisch an die Inflation anpassen und Unternehmen bei der Nachfolge nicht gefährden.'],
        fw: [-1, 'Will die Erbschaftsteuer abschaffen.']
      }
    },
    {
      id: 't19', kat: 'migration', titel: 'Familiennachzug',
      text: 'Der Familiennachzug zu Geflüchteten mit subsidiärem Schutz soll ausgesetzt bleiben.',
      hintergrund: 'Subsidiären Schutz erhalten Menschen, denen im Herkunftsland ernsthafter Schaden droht – etwa durch einen Bürgerkrieg –, die aber nicht als Flüchtlinge im engeren Sinn anerkannt sind. Bis Juli 2025 durften monatlich bis zu 1.000 Angehörige nachziehen. Seitdem ist der Nachzug für zwei Jahre ausgesetzt; Ausnahmen gibt es für Härtefälle.',
      pro: ['Kommunen, Schulen und Wohnungsmarkt werden entlastet.', 'Subsidiärer Schutz ist in der Regel vorübergehend angelegt.'],
      contra: ['Das Zusammenleben als Familie ist grundrechtlich geschützt (Art. 6 GG).', 'Getrennte Familien erschweren die Integration; Angehörige nehmen sonst gefährliche Fluchtwege.'],
      pos: {
        union: [1, 'Will den Familiennachzug zu subsidiär Schutzberechtigten aussetzen.'],
        afd: [1, 'Will den Nachzugsanspruch für Angehörige subsidiär Schutzberechtigter abschaffen.'],
        spd: [-1, 'Wollte laut Programm den Familiennachzug weiter ermöglichen; stimmte 2025 in der Koalition aber der Aussetzung zu.'],
        gruene: [-1, 'Will den Familiennachzug ermöglichen und bestehende Einschränkungen aufheben.'],
        linke: [-1, 'Stimmte 2025 im Bundestag gegen die Aussetzung des Familiennachzugs.'],
        bsw: [null, 'Das Wahlprogramm enthält keine Aussage zum Familiennachzug.'],
        fdp: [1, 'Will den Familiennachzug zu subsidiär Schutzberechtigten aussetzen.'],
        fw: [null, 'Das Wahlprogramm enthält keine Aussage zum Familiennachzug.']
      }
    },
    {
      id: 't20', kat: 'klima', titel: 'Förderung erneuerbarer Energien',
      text: 'Der Ausbau erneuerbarer Energien soll weiterhin mit staatlichen Mitteln gefördert werden.',
      hintergrund: 'Wind, Sonne, Biomasse und Wasserkraft decken inzwischen mehr als die Hälfte des Stromverbrauchs in Deutschland. Die Förderung nach dem Erneuerbare-Energien-Gesetz (EEG) wird seit Juli 2022 aus dem Bundeshaushalt bezahlt statt über eine Umlage auf den Strompreis.',
      pro: ['Der Umbau zu klimaneutraler Energie braucht Planungssicherheit für Investitionen.', 'Erneuerbare machen unabhängiger von Energieimporten.'],
      contra: ['Wind- und Solarstrom sind inzwischen wettbewerbsfähig und brauchen keine Subventionen mehr.', 'Die Förderung kostet den Staat jedes Jahr Milliarden Euro.'],
      pos: {
        union: [null, 'Will die Erneuerbaren weiter ausbauen; zur künftigen staatlichen Förderung enthält das Programm keine eindeutige Aussage.'],
        afd: [-1, 'Will die Subventionen für erneuerbare Energien abschaffen.'],
        spd: [1, 'Will den Ausbau von Wind- und Solarenergie konsequent fortsetzen.'],
        gruene: [1, 'Will das Ausbautempo bei den Erneuerbaren beibehalten.'],
        linke: [1, 'Will Solar- und Windanlagen von Stadtwerken und Genossenschaften fördern.'],
        bsw: [0, 'Will das Ersetzen alter Windräder und Solaranlagen auf bereits versiegelten Flächen fördern, lehnt aber neuen Flächenverbrauch ab.'],
        fdp: [-1, 'Will die Subventionen für erneuerbare Energien vollständig abschaffen.'],
        fw: [1, 'Will die Einspeisevergütung für Bioenergie weiterführen und das EEG novellieren.']
      }
    },
    {
      id: 't21', kat: 'sozial', titel: 'Rentenniveau',
      text: 'Das Rentenniveau soll dauerhaft bei mindestens 48 Prozent gesetzlich abgesichert werden.',
      hintergrund: 'Das Rentenniveau beschreibt, wie hoch eine Standardrente nach 45 Beitragsjahren im Verhältnis zum Durchschnittslohn ist. Das Rentenpaket 2025 sichert 48 Prozent bis zum Jahr 2031 ab. Weil immer weniger Beitragszahlende auf mehr Rentnerinnen und Rentner kommen, ist umstritten, wie das Niveau danach finanziert werden kann.',
      pro: ['Wer ein Leben lang gearbeitet hat, braucht eine verlässliche Rente.', 'Ein stabiles Niveau schützt vor Altersarmut.'],
      contra: ['Eine dauerhafte Garantie erhöht Beiträge oder Steuerzuschüsse und belastet die junge Generation.', 'Private und betriebliche Vorsorge sollten stärker ausgebaut werden.'],
      pos: {
        union: [0, 'Will das Rentenniveau vor allem durch Wirtschaftswachstum stabil halten, ohne dauerhafte gesetzliche Garantie.'],
        afd: [1, 'Fordert ein deutlich höheres Rentenniveau nach westeuropäischem Durchschnitt.'],
        spd: [1, 'Will mindestens 48 Prozent dauerhaft sichern.'],
        gruene: [1, 'Will das Rentenniveau bei mindestens 48 Prozent halten.'],
        linke: [1, 'Will das Rentenniveau auf 53 Prozent anheben.'],
        bsw: [1, 'Fordert deutlich höhere Renten nach österreichischem Vorbild.'],
        fdp: [null, 'Das Wahlprogramm enthält keine Aussage zu einer Haltelinie; die FDP setzt auf eine Aktienrente.'],
        fw: [null, 'Das Wahlprogramm enthält keine Aussage zum Rentenniveau.']
      }
    },
    {
      id: 't22', kat: 'klima', titel: 'Heizungsgesetz',
      text: 'Das Gebäudeenergiegesetz („Heizungsgesetz“) soll abgeschafft werden.',
      hintergrund: 'Das Gebäudeenergiegesetz schreibt seit 2024 vor, dass neu eingebaute Heizungen schrittweise zu mindestens 65 Prozent mit erneuerbaren Energien betrieben werden. Für bestehende Gebäude ist die Pflicht an die kommunale Wärmeplanung gekoppelt; funktionierende Heizungen dürfen weiterlaufen. Die Koalition aus Union und SPD hat angekündigt, das Gesetz durch eine einfachere, technologieoffenere Regelung zu ersetzen.',
      pro: ['Eigentümerinnen und Eigentümer sollen frei entscheiden, welche Heizung zu ihrem Haus passt.', 'Die Vorgaben verursachen hohe Kosten und Verunsicherung.'],
      contra: ['Gebäude verursachen einen großen Teil der CO₂-Emissionen; ohne Vorgaben werden Klimaziele verfehlt.', 'Fossile Heizungen können durch steigende CO₂-Preise künftig teuer werden.'],
      pos: {
        union: [1, 'Will das Heizungsgesetz abschaffen.'],
        afd: [1, 'Will das Gebäudeenergiegesetz komplett abschaffen (entsprechende Anträge im Bundestag).'],
        spd: [-1, 'Will den Heizungstausch sozial abfedern und stärker fördern, nicht das Gesetz abschaffen.'],
        gruene: [-1, 'Will die Wärmewende mit Förderung, Beratung und Standards fortführen.'],
        linke: [null, 'Fordert eine Investitionsoffensive für Sanierung und Heizungstausch; zur Abschaffung keine eindeutige Aussage.'],
        bsw: [1, 'Will die Überarbeitung des Gebäudeenergiegesetzes von 2023 rückgängig machen.'],
        fdp: [1, 'Will das Heizungsgesetz vollständig auslaufen lassen.'],
        fw: [null, 'Das Wahlprogramm enthält keine eindeutige Aussage zum Gebäudeenergiegesetz.']
      }
    },
    {
      id: 't23', kat: 'gesellschaft', titel: 'Selbstbestimmungsgesetz',
      text: 'Das Selbstbestimmungsgesetz, mit dem der Geschlechtseintrag durch eine Erklärung beim Standesamt geändert werden kann, soll abgeschafft werden.',
      hintergrund: 'Seit dem 1. November 2024 können trans-, intergeschlechtliche und nichtbinäre Menschen ihren Geschlechtseintrag und Vornamen durch eine Erklärung beim Standesamt ändern. Zuvor waren nach dem Transsexuellengesetz zwei Gutachten und ein Gerichtsverfahren nötig. Die Koalition aus Union und SPD hat vereinbart, das Gesetz zu evaluieren.',
      pro: ['Ein Wechsel des Geschlechtseintrags ohne Prüfung kann missbraucht werden.', 'Schutzräume für Frauen und der Frauensport müssen gewahrt bleiben.'],
      contra: ['Das frühere Verfahren war teuer und langwierig; das Bundesverfassungsgericht hatte mehrere Regeln beanstandet.', 'Die geschlechtliche Identität ist Teil des Persönlichkeitsrechts.'],
      pos: {
        union: [1, 'Will das Selbstbestimmungsgesetz wieder abschaffen.'],
        afd: [1, 'Lehnt das Gesetz ab und stimmte 2024 im Bundestag dagegen.'],
        spd: [-1, 'Steht hinter dem Gesetz: „Ein Zurück wird es mit uns nicht geben.“'],
        gruene: [-1, 'Unterstützt das Gesetz und will bestehende Lücken schließen.'],
        linke: [-1, 'Hält das Gesetz für verbesserungsbedürftig, will es aber nicht abschaffen.'],
        bsw: [1, 'Lehnt das Gesetz ausdrücklich ab und fordert ärztliche Gutachten.'],
        fdp: [-1, 'Hat das Gesetz 2024 in der Ampel-Koalition mitbeschlossen.'],
        fw: [0, 'Will das Gesetz überarbeiten, um Frauenrechte zu schützen.']
      }
    },
    {
      id: 't24', kat: 'finanzen', titel: 'Lieferkettengesetz',
      text: 'Das deutsche Lieferkettengesetz soll abgeschafft werden.',
      hintergrund: 'Das Lieferkettensorgfaltspflichtengesetz verpflichtet seit 2023 große Unternehmen, auf Menschenrechte und Umweltstandards bei ihren Zulieferern zu achten. Die EU hat eine eigene Lieferkettenrichtlinie beschlossen, deren Start inzwischen verschoben wurde. Die Bundesregierung will das deutsche Gesetz durch die Umsetzung der EU-Regeln ersetzen und Berichtspflichten streichen.',
      pro: ['Die Pflichten verursachen viel Bürokratie, besonders für mittelständische Zulieferer.', 'Eine einheitliche EU-Regel ist besser als ein nationaler Sonderweg.'],
      contra: ['Unternehmen tragen Verantwortung dafür, dass in ihren Lieferketten keine Kinderarbeit oder Ausbeutung stattfindet.', 'Verbindliche Regeln schaffen faire Bedingungen für verantwortungsvoll handelnde Firmen.'],
      pos: {
        union: [1, 'Will das Lieferkettengesetz abschaffen.'],
        afd: [1, 'Will das Lieferkettengesetz und die EU-Lieferkettenrichtlinie abschaffen.'],
        spd: [null, 'Das Wahlprogramm enthält keine Aussage zum Lieferkettengesetz.'],
        gruene: [null, 'Das Wahlprogramm enthält keine eindeutige Aussage zum deutschen Lieferkettengesetz.'],
        linke: [-1, 'Fordert ein stärkeres Lieferkettengesetz.'],
        bsw: [1, 'Will das Gesetz als „Bürokratiemonster“ abschaffen und durch internationale Abkommen ersetzen.'],
        fdp: [1, 'Will das deutsche Lieferkettengesetz abschaffen.'],
        fw: [1, 'Will das Lieferkettengesetz für den Mittelstand aufheben.']
      }
    },
    {
      id: 't25', kat: 'klima', titel: 'Deutschlandticket',
      text: 'Das Deutschlandticket soll dauerhaft erhalten bleiben.',
      hintergrund: 'Mit dem Deutschlandticket kann man seit Mai 2023 bundesweit Busse und Bahnen im Nah- und Regionalverkehr nutzen. Der Preis stieg von 49 Euro über 58 Euro (2025) auf 63 Euro (2026). Bund und Länder tragen die Mehrkosten gemeinsam; die Finanzierung ist bis 2030 gesetzlich geregelt.',
      pro: ['Günstiger, einfacher Nahverkehr ohne Tarifdschungel.', 'Weniger Autofahrten entlasten Klima und Straßen.'],
      contra: ['Das Ticket kostet jedes Jahr Milliarden, die für den Ausbau von Bus und Bahn fehlen.', 'Menschen auf dem Land ohne gutes Angebot profitieren kaum.'],
      pos: {
        union: [null, 'Das Wahlprogramm enthält keine konkrete Aussage zum Deutschlandticket.'],
        afd: [0, 'Das Ticket müsse zu einem „ehrlichen Preis“ angeboten werden.'],
        spd: [1, 'Will den Preis dauerhaft auf dem aktuellen Niveau halten und Vergünstigungen für bestimmte Gruppen.'],
        gruene: [1, 'Will das Ticket weiterführen und günstige Angebote für Studierende, Auszubildende und Menschen mit geringem Einkommen.'],
        linke: [1, 'Will günstigere Tickets und perspektivisch einen kostenlosen Nahverkehr.'],
        bsw: [1, 'Setzt sich für ein dauerhaftes Deutschlandticket zu einem bezahlbaren Preis ein.'],
        fdp: [1, 'Will das Deutschlandticket langfristig sichern.'],
        fw: [null, 'Das Wahlprogramm enthält keine Aussage zum Deutschlandticket.']
      }
    },
    {
      id: 't26', kat: 'sozial', titel: 'Rente für Abgeordnete',
      text: 'Bundestagsabgeordnete sollen in die gesetzliche Rentenversicherung einzahlen, statt eine eigene Altersversorgung zu erhalten.',
      hintergrund: 'Bundestagsabgeordnete erhalten nach dem Abgeordnetengesetz eine eigene Altersentschädigung aus Steuermitteln, ohne Beiträge zu zahlen. Ihre Höhe richtet sich nach der Dauer der Mitgliedschaft im Bundestag. Auch Beamtinnen und Beamte haben mit der Beamtenversorgung ein eigenes System.',
      pro: ['Abgeordnete sollten dieselben Regeln haben wie die meisten Bürgerinnen und Bürger.', 'Mehr Beitragszahlende stärken die gesetzliche Rente.'],
      contra: ['Eine eigene Versorgung soll die Unabhängigkeit der Abgeordneten sichern.', 'Der finanzielle Effekt für die Rentenversicherung wäre gering.'],
      pos: {
        union: [null, 'Das Wahlprogramm enthält keine Aussage zur Altersversorgung von Abgeordneten.'],
        afd: [1, 'Politiker und mehr Staatsbedienstete sollen in die gesetzliche Rentenversicherung einzahlen.'],
        spd: [1, 'Will langfristig alle Erwerbstätigen in die gesetzliche Rentenversicherung einbeziehen.'],
        gruene: [1, 'Will zunächst Abgeordnete und Selbstständige in die gesetzliche Rentenversicherung einbeziehen.'],
        linke: [1, 'Alle Erwerbstätigen, auch Abgeordnete, Beamte und Selbstständige, sollen einzahlen.'],
        bsw: [1, 'Bundestagsabgeordnete und Minister sollen verpflichtend in die Rentenversicherung einzahlen.'],
        fdp: [null, 'Das Wahlprogramm enthält keine Aussage zur Altersversorgung von Abgeordneten.'],
        fw: [null, 'Das Wahlprogramm enthält keine Aussage zur Altersversorgung von Abgeordneten.']
      }
    },
    {
      id: 't27', kat: 'klima', titel: 'Klimaneutralität 2045',
      text: 'Deutschland soll spätestens 2045 klimaneutral sein.',
      hintergrund: 'Das Klimaschutzgesetz verpflichtet Deutschland, bis 2045 klimaneutral zu werden – also nicht mehr Treibhausgase auszustoßen, als wieder gebunden werden. Die EU strebt Klimaneutralität bis 2050 an. Seit März 2025 nennt auch das Grundgesetz das Ziel 2045 im Zusammenhang mit einem Sondervermögen für Investitionen (Art. 143h GG).',
      pro: ['Je früher die Emissionen sinken, desto geringer fallen die Folgen des Klimawandels aus.', 'Klare Ziele geben Wirtschaft und Industrie Planungssicherheit.'],
      contra: ['Ein nationales Ziel vor dem EU-Ziel 2050 verteuert Energie und schwächt den Standort.', 'Deutschland hat am weltweiten Ausstoß nur einen kleinen Anteil.'],
      pos: {
        union: [1, 'Bekennt sich zum Ziel der Klimaneutralität bis 2045.'],
        afd: [-1, 'Lehnt das Ziel ab und will CO₂-Abgaben abschaffen.'],
        spd: [1, 'Hält am Ziel der Klimaneutralität 2045 fest.'],
        gruene: [1, 'Will schneller vorankommen; Strom soll bis 2035 klimaneutral erzeugt werden.'],
        linke: [1, 'Will den Klimaschutz mit verbindlichen Zielen für alle Sektoren stärken.'],
        bsw: [null, 'Das Wahlprogramm enthält keine eindeutige Aussage zum Zieljahr.'],
        fdp: [-1, 'Will das deutsche Ziel 2045 durch das europäische Ziel 2050 ersetzen.'],
        fw: [null, 'Das Wahlprogramm enthält keine eindeutige Aussage zum Zieljahr.']
      }
    },
    {
      id: 't28', kat: 'aussen', titel: 'Verteidigungsausgaben',
      text: 'Deutschland soll dauerhaft mindestens zwei Prozent seiner Wirtschaftsleistung für Verteidigung ausgeben.',
      hintergrund: 'Die NATO-Staaten hatten 2014 vereinbart, sich zwei Prozent der Wirtschaftsleistung für Verteidigung anzunähern. Deutschland erreichte diesen Wert 2024, auch mithilfe des Sondervermögens Bundeswehr von 2022. Im Juni 2025 einigten sich die NATO-Staaten auf ein neues Ziel: 3,5 Prozent für Verteidigung und 1,5 Prozent für verteidigungsnahe Ausgaben bis 2035.',
      pro: ['Die Bedrohungslage macht eine gut ausgestattete Bundeswehr nötig.', 'Deutschland muss seine Bündnisverpflichtungen in der NATO erfüllen.'],
      contra: ['Das Geld fehlt für Soziales, Bildung und Klimaschutz.', 'Aufrüstung kann ein Wettrüsten fördern; Diplomatie und Abrüstung sollten Vorrang haben.'],
      pos: {
        union: [1, 'Sieht das Zwei-Prozent-Ziel als Untergrenze („mindestens“).'],
        afd: [null, 'Das Wahlprogramm nennt keine Zielmarke für die Verteidigungsausgaben.'],
        spd: [1, 'Will weiterhin mindestens zwei Prozent für Verteidigung ausgeben.'],
        gruene: [1, 'Will dauerhaft deutlich mehr als zwei Prozent ausgeben.'],
        linke: [-1, 'Lehnt weitere Aufrüstung ab.'],
        bsw: [-1, 'Lehnt eine Steigerung des Verteidigungsetats ab.'],
        fdp: [1, 'Will das Zwei-Prozent-Ziel erfüllen und die Bundeswehr zur stärksten konventionellen Armee Europas machen.'],
        fw: [0, 'Will die Verteidigungsfähigkeit durch „bedarfsgerechte Finanzen“ stärken, nennt aber keine Zielmarke.']
      }
    },
    {
      id: 't29', kat: 'migration', titel: 'Asylverfahren außerhalb der EU',
      text: 'Asylverfahren sollen künftig auch in Staaten außerhalb der EU durchgeführt werden können.',
      hintergrund: 'Bisher werden Asylanträge in Deutschland oder einem anderen EU-Staat geprüft. Italien hat mit Albanien ein Modell erprobt, bei dem Verfahren außerhalb der EU stattfinden sollten; es wurde von Gerichten gebremst. Seit Juni 2026 gilt die Reform des Gemeinsamen Europäischen Asylsystems (GEAS), die unter anderem Grenzverfahren an den EU-Außengrenzen vorsieht.',
      pro: ['Gefährliche Fluchtwege, etwa über das Mittelmeer, würden unattraktiver.', 'Kommunen in Deutschland würden entlastet.'],
      contra: ['Faire Verfahren und menschenwürdige Unterbringung sind außerhalb der EU schwer zu garantieren.', 'Bisherige Modelle waren teuer und scheiterten teilweise vor Gericht.'],
      pos: {
        union: [1, 'Asylverfahren sollen nach Möglichkeit außerhalb der EU in sicheren Drittstaaten stattfinden.'],
        afd: [1, 'Asylanträge sollen künftig außerhalb Deutschlands gestellt und bearbeitet werden.'],
        spd: [-1, 'Lehnt Asylverfahren in Drittstaaten ab.'],
        gruene: [-1, 'Stellt sich der Auslagerung von Asylverfahren in Drittstaaten entgegen.'],
        linke: [-1, 'Die Verantwortung dürfe nicht über Drittstaaten-Regelungen verlagert werden.'],
        bsw: [1, 'Asylverfahren sollen möglichst in sicheren Drittstaaten außerhalb der EU stattfinden.'],
        fdp: [1, 'Asylverfahren sollen auch in sicheren Drittstaaten stattfinden können.'],
        fw: [1, 'Will Aufnahmezentren außerhalb der europäischen Außengrenzen schaffen.']
      }
    }
  ],

  quellen: [
    { titel: 'Landeszentrale für politische Bildung Baden-Württemberg: Wahlprogramme zur Bundestagswahl 2025', url: 'https://www.bundestagswahl-bw.de/bundestagswahl-wahlprogramme' },
    { titel: 'Bundeszentrale für politische Bildung: Wer steht zur Wahl? Bundestagswahl 2025', url: 'https://www.bpb.de/themen/parteien/wer-steht-zur-wahl/bundestagswahl-2025/' },
    { titel: 'Die Bundeswahlleiterin: Endgültiges Ergebnis der Bundestagswahl 2025', url: 'https://www.bundeswahlleiterin.de/bundestagswahlen/2025/ergebnisse/bund-99.html' },
    { titel: 'Deutscher Bundestag: Textarchiv und Abstimmungen', url: 'https://www.bundestag.de/dokumente/textarchiv' }
  ]
};
