# **Causal Inference Game** #

Das 'Causal Inference Game' ist ein Browserbasiertes Spiel, bei dem man das Prinzip der Kausalen Inferenz spielerisch erlernen kann.

Diese Dokumentation erfolgt nach der arc42-Vorlage.


## **1 Einführung und Ziele** ##

### 1.1 Aufgabenstellung ###

#### Was ist das 'Causal Inference Game'? ####

Bei diesem Programm handelt es sich um eine Anwendung, welche im Browser läuft. Dabei wird versucht durch die Nutzung von Graphen / Kanten / Knoten das abstrakte Prinzip der kausalen Inferenz spielerisch beizubringen. Das Spiel umfasst zwei Spielmodi und eine Seite zur Hilfestellung. Die Spielmodi enthalten 3 zufällig generierte Level mit jeweils steigendem Schwierigkeitsgrad. In jedem Level gibt es die Möglichkeit Kanten zwischen den dargestellten Knoten zu ziehen. Wenn eine falsche Kante eingezeichnet wird, verliert der Spieler ein Leben, was durch ein rotes Aufleuchten des Bildschirms und den Verlust eines Herzicons dargestellt wird. Wenn eine richtige Kante eingezeichnet wird bleibt diese bestehen und der "Edges left counter" reduziert sich. Außerdem besteht die Möglichkeit ins Hauptmenü zurückzukehren und das Level aufzugeben ,durch Drücken des entsprechenden Knopfes. Wenn das Spiel aufgegeben wurde, werden alle nicht eingezeichneten Kanten die fehlen sichtbar gemacht, sodass man die Lösung des Levels erkennen kann.

Wenn alle Leben verbraucht sind, erscheint ein Game Over Overlay und man hat die Möglichkeit ins Hauptmenü zurückzukehren, um das Level neu zu starten. Falls man es schafft, alle Kanten richtig einzuzeichnen erscheint ein neuer Knopf der zum nächsten Level führt, welches mehr Knoten und Kanten generiert und somit in Schwierigkeit steigt.  

#### Features ####

* bietet 2 verschiedene Spielmodi je 3 Level
* zeigt das Prinzip der Kausalität 
* mehrere Level mit steigendem Schwierigkeitsgrad 
* "Aufgeben" Knopf
* Feedback bei falschen Eingaben
* Navigation zwischen Hauptmenü und Level

### 1.2 Qualitätsziele ###

* Funktionalität / Korrektheit

Es ist wichtig, dass wenn man Kausale Inferenz beibringen möchte, man es auch richtig beibringt. Es dürfen keine theoretischen Fehler auftreten, die zu Missverständnissen  führen können.

* Bedienbarkeit

Da vor allem Schüler bzw. Kinder das Programm nutzten werden, darf das Interface und die Bedienung nicht zu komplex / kompliziert sein. Da ansonsten zusammen mit dem sehr theoretischen Thema der kausalen Inferenz schnell Frust entstehen kann.

### 1.3 Stakeholder ###

Wer? | Bezug
------------- | --------------------------
Administratoren DLR SchoolLab | brauchen gute Dokumentation, um eventuelle Verbesserungen / Änderungen durchführen zu können 
Schüler | * können Kausalität  kennen lernen <br>* einfache nicht aufgeblähte Erklärung <br>* intuitive Bedienung


## **2 Randbedingungen** ##

Eine kurze Zusammenfassung der Gegebenheiten mit denen wir gearbeitet haben.

### 2.1 Technisch ###

Randbedingung | Erläuterungen, Hintergrund
------------- | --------------------------
Betrieb auf Windows Desktop Betriebssystemen | Schülerlabor des DLR ist mit dieser Hardware ausgestattet
Touchscreen Unterstützung wünschenswert | großer Bildschirm steht zur Verfügung, welcher perfekt dafür geeignet ist
Fremdsoftware kostenlos | kein Budget dafür vorgesehen

### 2.2 Organisatorisch ###

Randbedingung | Erläuterungen, Hintergrund
------------- | --------------------------
Team | Yasseen Salama und Jonas Bastisch, mit Betreuung von Jakob Runge, Philip Lucas, Caroline Altmann und Marianne Mauch
Zeitplan | Beginn: 06.11.2020 erster Prototyp: 08.01.2021  Fertiges Projekt: 05.02.2021
Vorgehensmodell | iterativ (Prototyp dann Feedback)
Entwicklungswerkzeuge | Webstorm, Visual Studio Code, Webbrowser (Chrome, Edge) 
Versionsverwaltung | Git 

### 2.3 Konventionen ###
 
 * Dokumentation mithilfe des arc42-Templates
 * Dokumentation / Kommentare auf Deutsch
 * Funktionen / Variablen in Englisch
 * Kanten werden mit den Knoten am Anfang und Ende beschrieben, z.B. Kante zwischen Knoten A und E wird zu "ae"


## **3 Lösungsstrategie** ##

### 3.1 Einstieg ###

Wir schreiben das Programm in HTML/CSS + Javascript.

### 3.2 Aufbau ###

Das Programm ist eine HTML-Seite mit zusätzlichem JavaScript. Man kann dabei grob in Interfac Generierung und Aktualisierung, Graphen Generierung und Spiellogik unterteilen. Diese Unterteilung ist auch notwendig um immer neue Level zu generieren ohne dabei die Seite neu laden oder auf Features  verzichten zu müssen. Es wird einer von zwei Modi ausgewählt und dadurch das erste Level gestartet. Dabei wird das Interface dem Modus entsprechend angepasst. Die Spiellogik kümmert sich dann darum zu kontrollieren ob richtige oder falsche Angaben gemacht wurden und ob dadurch das Level entweder gewonnen oder verloren wurde. Dementsprechend werden dann neue Interface-Elemente generiert.

### 3.3 Entwicklung ###

Bei der Entwicklung haben wir uns zunächst einmal überlegt wie wir den Graphen generieren und darstellen können. Wir haben uns dafür entschlossen Cytoscape zu verwenden was die Darstellungen des Graphen übernimmt (->Entscheidungen). Der erste erstellte Prototyp diente dazu die Knotengenerierung zu testen, es wurden einfache Knoten mit zufälligen  Farben dargestellt. Daraufhin wurde die Kantengenerierung getestet, das heißt Kanten zwischen den Knoten wurden eingezeichnet ohne jedoch irgendeinen Einfluss auf die Farben zu nehmen. Diese Testphase war vor allem nur für die Entwickler um generelle Funktionalität sicherzustellen.

Als Nächstes wurde dann der erste Modus implementiert und zum Testen zur Verfügung gestellt, dieser Prototyp hatte jedoch nur ein Level ohne jegliche Progression. Dadurch konnten wir jedoch das grundlegende Spielprinzip festigen und erste Fehler ausbessern. Nach dieser Testphase beschlossen wir unseren aktuellen Stand immer auf einer Website zu hosten, auf die man jederzeit zugreifen kann. Dort haben wir dann den zweiten Modus und das Levelsystem implementiert, durch die einfache Zugänglichkeit des Prototypen bekamen wir auch deutlich schnelleres Feedback, was unter anderem zu einer erweiterten Hilfe / Erklärung geführt hat. Dies führte dann auch zur Ausmerzung einiger Bugs / Fehler.

### 3.4 Testphasen ###

Man kann unsere Testphasen grob in folgende Stufen unterteilen:

1. Modultests (Knotengenerierung, Kantengenerierung, Graphen Generierung)
2. einzelne Modi (Zusammenführung der Module zu spielbaren Modus)
3. Modi zusammenführen zu einem Programm (Levelsystem + Hilfe)

Die einzelnen entstandenen  Prototypen sehen im Detail so aus:
 1. Prototype der Knoten darstellen kann mit zufällig generierten Farben 
 2. ein Prototyp, der in der Lage ist Kanten zwischen den Knoten einzeichnen zu können, ohne andere Funktionalität
 3. Correlation Modus implementiert mit einem Level, keine Gewinnbedingung/ Fortschritt
 4. Causal Intervention Modus implementiert 
 5. Menü und Interface hinzugefügt, beide Modi in einem Programm spielbar
 6. Levelsystem implementiert


## **4 Bausteinsicht** ##

### 4.1 Spielüberblick ###

Das Programm kann grob in 6 Module unterteilt werden:

![GameOverview](Diagramms/GameOverview.png "Spielüberblick")

Modul | kurze Erklärung
------- | ----------------
Interface | generiert und versteckt bestimmte Interface Elemente die benötigt werden
initializeNodes | generiert Knoten mit zufälligen Farben
initializeEdges | generiert zufällige Kanten zwischen den vorher generierten Knoten
startCytoscape | erzeugt aus den vorher generierten Knoten und Kanten einen interagierbaren Graphen
winCondition | kontrolliert Gewinnbedingung oder ob das Spiel verloren ist
destroyGame | führt das Programm in den Ursprungszustand zurück


### 4.2 Interface ###

Nachdem der Modus ausgewählt wurde, wird hier das Hauptmenü versteckt und andere Spiel spezifische Interface Elemente geladen. Dazu gehören die Anzeige der Leben (Herzen), die Anzahl der noch einzuzeichnenden Kanten, dass gerade aktive Level, ein Knopf der zurück zum Hauptmenü führt und ein Knopf, welcher das Spiel aufgibt und alle fehlende Kanten sichtbar macht. Zusätzlich dazu erscheint, wenn man den zweiten Modus auswählt, ein Menü in dem man eine Farbe auswählen kann.

### 4.3 initializeNodes ###

![InitializeNodes](Diagramms/createNodes.png "Knotengenerierung")

Dem Modul wird ein Integer übergeben, welcher angibt, wie viele Knoten generiert werden soll, daraufhin wird eine zufällige Farbe ausgewählt und eine ID zugewiesen.
Diese Daten werden zusammengefasst und dem Knoten angehangen. Dieser Knoten wird dann in das globale Knotenarray gepushed. Dieses wir dann für die nächsten Schritte verwendet.

getRandomColor() mischt das Array in dem die Farben gespeichert sind und nimmt dann immer das erste Element aus dem Array. Falls das gemischte Array leer ist, wird ein neues erzeugt.

### 4.4 initializeEdges ###

![InitializeNodes](Diagramms/createEdges.png "Kantengenerierung")

Das Modul nimmt die vorher erzeugten Knoten aus dem globalen Knotenarray und durchläuft diese einzeln. Es wird eine zufällige Zahl zwischen 0 und 3 ausgewählt diese Zahl gibt an wie viele Kanten von den jeweiligen Knoten ausgehen. Mit dieser Information werden die Kanten generiert und mit einer ID ausgestattet, dabei kann es dazu kommen, dass mehrmals die gleiche Edge erzeugt wird, da das Ziel der Kante auch vollkommen zufällig ausgewählt wird, dies führt jedoch zu keinem weiteren Problem und kann also missachtet werden. Nun werden alle Farben der neu verbundenen Knoten mithilfe von RYBColorMixer.mix() gemischt und in mixedColor gespeichert, außerdem werden die Originalfarben davor auch noch abgespeichert, sodass wir später darauf zurückgreifen können. Alle diese Farbdaten werden den entsprechenden Knoten angehangen.

### 4.5 startCytoscape ###

![InitializeGraph](Diagramms/createCytoscape.png "Graphengenerierung")

Nun werden die generierten Knoten und Kanten verwendet, um einen Graphen zu erzeugen. Außerdem wird dafür ein Stylesheet benötigt, dieses ist fest einprogrammiert und kann im Programmcode geändert werden. In dem Stylesheet geben wir an wie die Knoten und Kanten auszusehen haben. In unseren Fall geben wir an das mixedColor als Farbe der Knoten angezeigt werden soll, außerdem wird die ID des Knotens auch angezeigt und die Form der Knoten legen wir als Ellipse fest. Die Edges sind mit einer grauen Farbe belegt und die Form des Pfeils der Kanten legen wir als Dreieck fest. Das letzte was wir in dem Stylesheet  festlegen ist die Farbe der selber zu zeichnenden Kanten, welche wir auf Rot legen. Das Layout der Knoten wird auf einen Kreis eingestellt, sodass sich die Kanten nicht überlappen. Nun können wir durch die Funktion cytoscape() einen Graphen generieren, mit dem der Spieler interagieren kann. Jetzt müssen nur noch die generierten Kanten versteckt werden, dies tun wir, indem wir die Sichtbarkeit aller Kanten auf 0 setzen.

### 4.6 winConditions ###

![winCondition](Diagramms/winConditions.png "Spiellogik")

Hier wird nun kontrolliert ob das Spiel gewonnen oder verloren wird. Dazu benötigen wir einen Listener, welcher darauf reagiert, wenn eine neue Kante eingezeichnet wird (ehcomplete). Wenn dies passiert kontrollieren wir ob diese neu eingezeichnete Kante im Kantenarray liegt. Falls das der Fall ist machen wir diese Kante sichtbar und reduzieren die Anzahl der Kanten, die noch einzuzeichnen sind. Wenn dadurch die Anzahl auf 0 fällt, ist das Level gewonnen, das heißt wir erhöhen das Level um 1, zerstören den jetzigen  Graphen und generieren neue Knoten und Kanten. Falls die eingezeichnete Kante nicht im Array liegt, lösen wir eine Animation aus die den Bildschirm rot aufblinken lässt und ziehen dem Spieler ein Leben ab. Wenn die Leben auf 0 fallen wird ein Overlay sichtbar, welches verhindert das neue Kanten eingezeichnet werden können.

Im Causal Intervention Modus ist eine zusätzliche Funktion implementiert, diese wird aktiviert, wenn auf einen Knoten gedrückt wird. Die aus dem Farbmenü ausgewählte Farbe oder falls keine ausgewählt ist rot, wird an als Farbe des Knotens gespeichert, dann werden alle mit diesem Knoten verbundenen Knoten aktualisiert, das heißt die Farben werden neu gemischt. Außerdem werden alle veränderten Knoten jetzt, als Stern angezeigt um sie besser unterscheiden zu können.

Wenn das Spiel verloren wird, wird destroyGame ausgeführt ansonsten, generieren wir ein neues Level mit mehr Knoten und Kanten (initializeNodes)

Wird noch genauer in Laufzeitschicht beschrieben.

### 4.7 destroyGame ###

Das letzte Modul, was hier beschrieben wird, ist dazu in der Lage das Spiel in den Ausgangszustand zurückzuführen, das heißt der Graph der im aktuellen Level bespielt wurde wird jetzt entfernt, die Levelvariable wird zurückgesetzt, und die Knoten und Kantenarrays werden geleert. Außerdem wird das Spielinterface versteckt und das Hauptmenü sichtbar gemacht. Dadurch können wir sicherstellen, dass das Spiel immer vom gleichem Startpunkt aus generiert wird und so keine unerwarteten Fehler auftreten.


## **5 Laufzeitsicht** ##

Hier wird gezeigt, wie ermittelt wird, ob eine eingezeichnete Kante richtig ist:

![laufzeit](Diagramms/Laufzeit.png "Laufzeitschicht")

In diesem Diagramm werden zwei Kanten eingezeichnet. Die erste zwischen Knoten A und D was als "ad" abgekürzt wird. Daraufhin wird kontrolliert, ob diese Kante in dem zu Beginn generierten Kantenarray liegt, in diesem Fall ist das nicht so und false wird zurückgegeben, dadurch weiß der Graph nun das die Kante nicht eingezeichnet bleiben darf und entfernt diese, außerdem wird im Webbrowser eine Animation ausgelöst, die als Fehler Feedback dient und ein Leben wird abgezogen. Es wird außerdem kontrolliert, ob durch den Lebensverlust das Spiel verloren ist.
Die zweite eingezeichnete Kante "bc" ist diesmal korrekt also wird true zurückgegeben und es wird kontrolliert, ob dadurch alle Kanten eingezeichnet sind, das ist nicht der Fall also bleibt die Kante einfach nur sichtbar.

## **6 Konzepte** ##

### 6.1 Kausalität ###

Kausalität ist die Beziehung zwischen Ursache und Wirkung. A die Ursache für die Wirkung B, wenn B von A herbeigeführt wird. Wichtige dabei ist jedoch das eine Korrelation nicht eindeutig auf eine Kausale Beziehung deutet.

### 6.2 Directed acyclic graph ### 

Ist eine spezielle Art eine Graphens bei dem alle Kanten gerichtet sind und dabei keine Kreise entstehen. Diese Graphenart ist nötig um Kausalität wie in der Realität darzustellen, da wenn ein Kreis existieren würde, keine kausalen Beziehungen existieren können.

## **7 Entscheidungen** ##

### 7.1 Spielprinzip ###

Die erste große Entscheidung, die wir treffen mussten, bezog sich auf das grundlegende Spielprinzip, also wie wollen wir das abstrakte Prinzip der Kausalität spielerisch vermitteln? 
Die erste Möglichkeit ist es Knoten mit Tönen / Melodien zu füllen, das heißt, wenn kausale Zusammenhänge zwischen den Knoten bestehen würden, würden sich auch die Melodien dementsprechend ändern. Ein großer Vorteil hiervon wäre das damit ein eigentlich geplanter 3. Modus umgesetzt werden könnte, in diesem gäbe es dann die Möglichkeit einen Knoten 'herauszurechnen', das heißt er würde die Daten der anderen Knoten nicht mehr beeinflussen. Nachteile dieser Variante wären ein sehr abstraktes Spielprinzip, da Kausalität an Tönen / Melodien zu erkennen für einen Menschen sehr schwer, außerdem sind unsere Musikkenntnisse nicht sehr gut, weshalb eine Umsetzung sehr viel schwieriger wäre.
Die Alternative hierzu ist es die Knoten mit Farben zu füllen, kausale Beziehungen würden hierbei zu Farbmischungen führen. Das hätte zum Vorteil das die Logik hinter Farbmischung schon für Kinder zugänglich sein sollte, außerdem ist diese Interaktion auch deutlich einfacher zu implementieren und kann viel Zeit sparen. Bei dieser Variante ist der dritte Modus jedoch nicht um zusetzten da das theoretische Prinzip dahinter nicht mit Farben umgesetzt werden kann.
Wir haben uns hier für die zweite Variante entschieden, da die Vorteile in unserem Fall das Fehlen des dritten Spielmodus überschatten.
 

### 7.2 Graphimplementierung ###

Bei der Implementierung eines Graphens in Javascript hatten wir zunächst die Idee alles selbst zu implementieren. Dabei stoßen wir jedoch relativ schnell an unsere Grenzen, da keiner von uns vorher jemals Javascript genutzt hatte. Das heißt die Implementierung wäre sehr zeitaufwändig gewesen. Ein Vorteil wäre aber bessere Anpassungsfähigkeit unseres Graphens an die speziellen Anforderungen unseres Programms gewesen. 
Die zweite Möglichkeit, welche wir schlussendlich auch genutzt haben ist die OpenSource Libary Cytoscape. Diese bietet ein Frontend an, welches Graphen darstellen kann mit denen man einfach und intuitiv interagieren kann. Zusätzlich dazu nutzen wir auch die Erweiterung Edgehandles um mit Cytoscape Kanten einzeichnen zu können. Das hat zum Vorteil das wir auf ein komplett programmiertes System zurückgreifen können und auch sicher sein können das alles seine Richtigkeit hat.

### 7.3 Multi Page vs. Single Page ###

Problem Multi Page: Auf Mobilen Endgeräten (Android) funktioniert das Nutzen von Links in HTML-Seiten auf andere HTML-Seiten im Ordnerverzeichnis in unseren Versuchen nicht, das heißt es bleibt keine andere Möglichkeit als alles in einer HTML-Seite zu vereinen. Leider verliert man dadurch natürlich ein wenig Übersichtlichkeit und erhält ein sehr langes Dokument. Jedoch wollten wir nicht auf Mobile Endgeräte verzichten, also entschieden wir uns für eine Single-Page-Application.


## **8 Risiken** ##

### JavaScript ###

Ein Risiko, welches bestand, ist dass wir beide kaum Erfahrung mit JavaScript hatten, weshalb wir eher auf bereits vorhandene Bibliotheken zurückgegriffen haben, anstatt diese Feature  selber zu schreiben. Dadurch konnten wir eventuelle Fehler die durch fehlende Erfahrung entstehen konnten zum großen Teil vermeiden und somit auch viel Zeit sparen.

### Umsetzung mit Farben ###

Die Umsetzung dieses Spiels mit Farben führte zu einigen Problemen, einerseits konnte dadurch ein geplanter 3. Modus nicht umgesetzt werden(->Entscheidungen), andererseits entstanden Probleme bei der zufälligen Farbgenerierung. Es kann nämlich dazu kommen das durch die Farbmischung verschiedene Knoten sehr ähnliche Farben haben, die für das menschliche Auge kaum auseinanderzuhalten sind, jedoch im RGB-Farbraum unterschiedliche Farben sind. Dieses Problem erschwert das Spiel zusätzlich. Verschiedene Möglichkeiten bei der Farbgenerierung wurden getestet. Jedoch hat keine das Problem effizient lösen können, weshalb es immer noch im Spiel auftreten kann.

## **9 Glossar** ##

Begriffe | Erklärung
---------|----------
Graph | eine abstrakte Struktur, die eine Menge von Objekten zusammen mit den zwischen diesen Objekten bestehenden Verbindungen repräsentiert
Kante | Verbindung zwischen zwei Knoten in einem Graphen
Knoten | Datenpunkt / Objekt in einem Graphen
DLR SchoolLab | Schülerlabor des DLR, welches 2021 in Jena eröffnet wird
RGB | additives Farbmodel mit Rot, Grün und Rot