# **Causal Inference Game** #

Das 'Causal Inference Game' ist ein Browserbasiertes Spiel bei dem man das Prinzip der Kausalen Inferenz spielerisch erlernen kann.

Diese Dokumentation erfolgt nach der arc42-Vorlage.


## **1.Einführung und Ziele** ##

### 1.1 Aufgabenstellung ###

#### Was ist das 'Causal Inference Game'? ####

Bei diesem Programm handelt es sich um eine Anwendung, welche im Browser läuft. Dabei wird versucht durch die Nutzung von Graphen / Kanten / Knoten das abstrakte Prinzip der kausalen Inferenz spielerisch beizubringen. Das Spiel umfasst zwei Spielmodi und eine Seite zur Hilfestellung. DIe Spielmodi enthalten 3 zufällig generierte Level mit jeweils steigendem Schwierigkeitsgrad. In jedem Level gibt es die Möglichkeit Kanten zwischen den dargestellten Knoten zu ziehen. Wenn eine falsche Kante eingezeichnet wird verliert der Spieler ein Leben, was durch ein rotes aufleuchten des Bildschirms und den Verlust eines Herzicons dargestellt wird. Wenn eine richtige Kante eingezeichnet wird bleibt diese bestehen und der "Edges left counter" reduziert sich. Außerdem besteht die Möglichkeit ins Hauptmenü zurückzukehren und das Level aufzugeben ,durch drücken des entsprechenden Knopfes. Wenn das Spiel aufgegeben wurde, werden alle nicht eingezeichneten Kanten die fehlen sichtbar gemacht, sodass man die Lösung des Levels erkennen kann.
Wenn alle Leben verbraucht sind erscheint ein Game Over Overlay und man hat die Möglichkeit ins Hauptmenü zurückzukehren, um das Level neu zustarten. Falls man es schafft alle Kanten richtig einzuzeichnen erscheint ein neuer Knopf der zum nächsten Level führt, welches mehr Knoten und Kanten generiert.  

#### Features ####

* bietet 2 verschiedene Spielmodi je 3 Level
* zeigt das Prinzip der Kausalität 
* mehrere Level mit steigendem Schwierigkeitsgrad 
* "Aufgeben" Knopf
* Feedback bei falschen Eingaben
* Navigation zwischen Hauptmenü und Level

### 1.2 Qualitätsziele ###

* Funktionalität / Korrektheit
* Bedienbarkeit
* Effizienz

### 1.3 Stakeholder ###

Wer? | Bezug
------------- | --------------------------
Administratoren DLR SchoolLab |  
Schüler | -können Kausaltät kennen lernen <br> -einfache nicht aufgeblähte Erkärung <br> -intuitive Bedienung


## **2.Randbedingungen** ##

Eine kurze Zusammenfassung der Gegebenheiten mit denen wir gearbeitet haben

### 2.1 Technisch ###

Randbedingung | Erläuterungen, Hintergrund
------------- | --------------------------
Betrieb auf Windows Desktop Betriebssystemen | Schülerlabor des DLR ist mit dieser Hardware ausgestattet
Touchscreen Unterstützung wünschenswert | großer Bildschirm steht zur Vefügung ist perfekt dafür geeigent
Fremdsoftware kostenlos | kein Budget dafür vorgesehen

### 2.2 Organisatorisch ###

Randbedingung | Erläuterungen, Hintergrund
------------- | --------------------------
Team | Yasseen Salama und Jonas Bastisch, mit Betreung von Jakob, Paul, Caroline und Marianne
Zeitplan | Beginn: xx erster Prototyp: xx Fertiges Prjekt: xx
Vorgehensmodell | ...
Entwicklungswerkzeuge | ...
Versionsverwaltung | Git 

### 2.3 Konventionen ###



## **3.Kontextabgrenzung** ##

### 3.1 Fachlicher Kontext ###

![Fachlicher Kontext](chart_2.png "Fachlicher Kontext")

#### Spieler ####

Das Programm wird von einer Pesron bedient. Zur Nutzung ist eine Maus oder eine Touchpad nötig. Der Spieler zieht Verbindungen zwischen den Knoten oder ändert die Farben der Knoten.

#### Cytoscape ####

[Cytoscape](https://js.cytoscape.org/)  ist ein Fremdsystem, welches dafür genutzt wird das den Graphen zu generieren. Dabei ist jeder Knoten und jede Kante des Graphen ein eigenes Element welches seperat angesprochen werden kann. Dadurch können wir uns die Zeit sparen eigenen Code zu schreiben, welcher den Graphen darstellt.

#### RYB-Color-Mixer ####

Wird genutzt um einfach die Farbmischung zu berechnen, anfags eigener Code dafür, haben uns dann aber dafür entschieden eine vorhandene Biblothek zu nutzen.


### 3.2 Technischer Kontext ###

Diagramm

Die Anbindung funktioniert über ein grafisches Frontend, welches durch Cytoscape zur Verfügung gestellt ist, die Entwicklung dieses war nicht Teil des Projektes. Dieses Frontend kann in jedem handelsüblichen Webbrowser genutzt werden


## **4.Lösungstrategie** ##

### 4.1 Einstieg ###

Wir schreiben das Programm in HTML + Javascript. Zunächst waren mehrere HTML-Seiten für jedes Level geplant, dies hat sich jedoch später als problematisch herausgestellt, weshalb wir auf eine Single-Page-Application umgestiegen sind. Das heißt das, das ganze Spiel auf einer HTML-Seite läuft.

### 4.2 Aufbau ###

Das Programm startet auf einem Hauptmenü, in welchem die beiden Spielmodi ausgewählt werden können, wenn einer der Modi ausgewählt wird die Funktion clickedOnMenu() ausgeführt, welche das Startmenü versteckt und Interface Elemente, wie Lebensanzeige und Leveldetails, auf dem Bildschirm anzeigt.

### 4.3 Tests ###

Um unser Programm zu testen haben wir verschiedene Stufen erreicht:
 1. zuerst haben wir einen Prototype gebaut der die Knoten darstellen kann mit zufällig generierten Farben 
 2. ein Prototyp der in der Lage ist Kanten einzeichnen zu können, ohne andere Funktionalität
 3. erster Mouds implementiert mit einem Level und keiner Progression
 4. zweiter Modus implementiert 
 5. Hosten eines Prototypens auf einer Website, welcher immer den aktuellen Entwicklungsstand hat. Menü + Interface 
 6. Levelsystem implementiert

### 4.4 Anbindung ###


## **5.Bausteinsicht** ##

### Spielüberblick ###

Das Programm kann grob in 7 Module unterteilt werden

Modul | Kurze Erklärung
------- | ----------------
Interface | generiert und versteckt bestimmte Interface Elemente die benötigt werden
initializeNodes | generiert Knoten mit zufälligen Farben
initializeEdges | generiert zufällige Kanten zwischen den norher generierten Knoten
startCytoscape | erzeugt aus den vorher generierten Knoten und Kanten einen interagierbaren Graphen
winCondition | kontrolliert Gewinnbedingung oder ob das Spiel verloren ist
destroyGame | führt das Programm in den Ursprungszustand zurück



## **6.Laufzeitsicht** ##


## **7.Verteilungssicht** ##

Entwicklungsumgebung
Tetsumgebung


## **8.Konzepte** ##

* Kausalität: 
* Kausale Inferenz
* Directed acyclic graph:

## **9.Entscheidungen** ##




## **11.Risiken** ##


## **12.Glossar** ##
