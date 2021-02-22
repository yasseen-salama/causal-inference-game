$(document).ready(function () {
    var nodes = [];  //Knoten werden hier gespeichert
    var edges = [];  //Kanten werden hier gesspeichert
    var colors = ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c']; //Grundfarben aus denen gewählt werden kann, können problemlos ausgetasuch werden
    var alphabet = 'abcdefghijklmnopqrstuvwxyz';
    var level = 1;  
    var edgesVisible = false;
    var help = false;
    var currentMode = 1; //ausgewählter Spielmodus

    function randomInteger(min, max) { 
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function shuffle(array) { //src : https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array; //gibt gemischtes array zurück
    }
    
    var colorsShuffeld = [...colors];
    shuffle(colorsShuffeld);

    function getRandomColor() {  //gibt eine zufällige Farbe aus den Grundfarben aus
        return colorsShuffeld.shift();
    }

    var intializeNodes = function (numOfNodes) {  //Knoten werden zufällig erzeugt 
        for (let i = 0; i < numOfNodes; i++) {
            if (colorsShuffeld.length === 0) {  //wenn das Farbarray leer ist generieren wir ein neues
                colorsShuffeld = [...colors];
                shuffle(colorsShuffeld);
            }
            var rndmColor = getRandomColor();
            nodes.push({
                group: 'nodes',
                data: {
                    id: alphabet.charAt(i),
                    color: rndmColor, //Farbe die dargestellt wird
                    originalColor: rndmColor, //Grundfarbe ohne Mischung
                    mixedColor: rndmColor, //Farbe mit Mischung siehe initializeEdges()
                    childNodes: [],
                    numOfParents: 0,
                    type: 'original' //type für verschiedene Styles
                },
            });
            nodes.push() //Knoten werden ins array gepushed
        }
    }

    var intializeEdges = function () {  //Kanten werden generiert, es müssen vorher Knoten generiert wurden sein
        for (let i = 0; i < nodes.length - 1; i++) {
            var numOfChildren = randomInteger(1, 3) //von einem Knoten können maximal 3 kanten ausgehen kann aber ggf. geändert werden
            if (numOfChildren != 0) {
                for (let j = 0; j <= numOfChildren; j++) {
                    var childIndex = randomInteger(i + 1, nodes.length - 1)
                    if (nodes[childIndex].data.numOfParents < 3) {
                        // wenn kante generiert wird werden die HexFarben gemischt
                        nodes[childIndex].data.color = "#" + rybColorMixer.mix(nodes[i].data.color, nodes[childIndex].data.color)
                        //mixedColor wird aktualisiert
                        nodes[childIndex].data.mixedColor = "#" + rybColorMixer.mix(nodes[i].data.color, nodes[childIndex].data.color);
                        //Kanten werden ins Array gepushed
                        edges.push({
                            group: 'edges',
                            data: {
                                id: '' + nodes[i].data.id + nodes[childIndex].data.id,
                                source: '' + nodes[i].data.id, //Ausgangsknoten
                                target: '' + nodes[childIndex].data.id //Zielknoten
                            },
                        });
                        nodes[childIndex].data.numOfParents += 1
                    }
                }
            }
        }
    }

    function destroyGame() {  //reseted das Spiel und Interface
        if(!help) { //wenn nicht Hilfeknopf ausgewählt ist
            nodes = [];
            edges = [];
            level = 1 ;
            let elem = document.querySelector('#cy');
            elem.parentNode.removeChild(elem);  //graph wird zerstört

            let select = document.getElementById('selection'); //selection menü für modus 2 wird versteckt
            select.style.display = 'none';

            let giveUp = document.getElementById('giveUp'); //Interface Element wird versteckt
            giveUp.style.display = ''

            hideHearts();
            $("#giveUp").html("Give Up");
            edgesVisible = false;

            let edgesLevel = document.getElementById('edgesLevels');
            edgesLevel.style.display = 'none'

            let githubLogo = document.getElementById('github');
            githubLogo.style.display = '';
        }
        let startMenu = document.getElementById('StartMenu');
        startMenu.style.display = '';

        let back = document.getElementById('back');
        back.style.display = ''

        let overlay = document.getElementById('overlay'); //Interface Elemente
        overlay.style.display = 'none'
    }

    function showHearts(){ //zeigt die Leben auf dem Bildschirm an
        resetHearts();
        let hearts = document.getElementById('hearts');
        hearts.style.display = ''
    }
    function hideHearts(){ //versteckt die Leben
        resetHearts();
        let hearts = document.getElementById('hearts');
        hearts.style.display = 'none'
    }
    function resetHearts(){ //setzt Lebensanzahl zum Startwert zurück
        for (let i = 1; i < 4; i++) {
            let heart = document.getElementById('heart' + i);
            heart.style.display = '';
        }
    }
    function showHelp(){
        help = true;
        clickedOnMenu();
        let helpPage = document.getElementById('helpPage');
        helpPage.style.display = '';
    }

    document.getElementById("back").addEventListener("click", function () { //Knopfzuweisung: zurück zum Hauptmenü
        destroyGame();
        if(help){
            help = false;
            let helpPage = document.getElementById('helpPage');
            helpPage.style.display = 'none';
        }
    });

    document.getElementById("help").addEventListener("click", function () { //knopfzuweisung: Hilfe
        showHelp();
    });

    document.getElementById("nextLevel").addEventListener("click", function () { //Knopfzuweisung: NextLevel

        let nextLevel = document.getElementById('nextLevel');
        nextLevel.style.display = 'none';

        let elem = document.getElementById('overlay');
        elem.style.display = 'none';

        if (currentMode == 1){ //je nachdem welcher Modus ausgewählt ist
            runMode1(level);
        }
        else{
            runMode2(level);
        }

    });

    function clickedOnMenu(){ // versteckt das Hauptmenü und zeigt Spiel Interface Elemente an
        let startMenu = document.getElementById('StartMenu');
        startMenu.style.display = 'none';

        let back = document.getElementById('back');
        back.style.display = 'inline-block';

        if(!help) {
            let giveUp = document.getElementById('giveUp');
            giveUp.style.display = 'inline-block';

            let elem = document.createElement('div');
            elem.setAttribute("id", "cy");
            document.body.appendChild(elem);

            let hearts = document.getElementById('hearts');
            hearts.style.display = '';

            let edgesLevels = document.getElementById('edgesLevels');
            edgesLevels.style.display = '';

            let githubLogo = document.getElementById('github');
            githubLogo.style.display = 'none';
        }
    }

    function lost(){ //Spiel verloren
        let elem = document.getElementById('overlay');
        elem.style.display = 'table';
        $("#overlayHeader").html("You Lost!");
        $("#giveUp").html("Show Edges");
    }

    function won(){ //Spiel gewonnen
        let elem = document.getElementById('overlay');
        elem.style.display = 'table';

        let nextLevel = document.getElementById('nextLevel');
        nextLevel.style.display = 'inline-block';

        $("#overlayHeader").html("You Won " + "level " + level +"!");
        $("#overlay").css({
            'color' : '#66FF66'
        });
        level +=1;
    }

    function startCytoscape(){ //generieren eine cytoscape Instanz
        var cy = cytoscape({
            container: document.getElementById('cy'),

            boxSelectionEnabled: false,
            autounselectify: true,

            style: cytoscape.stylesheet()
                .selector('node')
                .style({
                    'content': 'data(id)',
                    'background-color': 'data(color)'
                })
                .selector('node[type="original"]') //node style when not changed/selected
                .style({                       
                    'content': 'data(id)',
                    'background-color': 'data(color)',
                    'shape': 'ellipse'
                })
                .selector('node[type="selected"]') //node style when selected/changed
                .style({
                    'content': 'data(id)',
                    'background-color': 'data(color)',
                    'shape': 'star',
                        // 'opacity' : 0
                })
                .selector('node[type="start"]') //node style when selected/changed
                .style({
                    'content': 'data(id)',
                    'background-color': 'data(color)',
                    'shape': 'ellipse',
                    'border-width': '4cm',
                    'border-color': '#ff0000',
                    'border-style': 'double'
                })
                .selector('edge')
                .style({
                    'curve-style': 'straight',
                    'target-arrow-shape': 'triangle',
                    'width': 4,
                })

                .selector('.highlighted')
                .style({
                    'background-color': '#61bffc',
                    'line-color': '#61bffc',
                    'target-arrow-color': '#61bffc',
                    'transition-property': 'background-color, line-color, target-arrow-color',
                    'transition-duration': '0.5s'
                })

                // some style for the extension
                .selector('.eh-handle')
                .style({
                    'background-color': 'red',
                    'width': 12,
                    'height': 12,
                    'shape': 'ellipse',
                    'overlay-opacity': 0,
                    'border-width': 12, // makes the handle easier to hit
                    'border-opacity': 0
                })
                .selector('.eh-hover')
                .style({
                    'background-color': 'red'
                })
                .selector('.eh-source')
                .style({
                    'border-width': 2,
                    'border-color': 'red'
                })
                .selector('.eh-target')
                .style({
                    'border-width': 2,
                    'border-color': 'red'
                })
                .selector('.eh-preview, .eh-ghost-edge')
                .style({
                    'background-color': 'red',
                    'line-color': 'red',
                    'target-arrow-color': 'red',
                    'source-arrow-color': 'red',
                    'opacity': 1,
                })
                .selector('.eh-ghost-edge.eh-preview-active')
                .style({
                    'opacity': 0
                }),
        });
        return cy;

    }
    function runMode1(level) { //Modus 1 
        nodes = [];
        edges = [];

        let cy = startCytoscape();
        let numOfEdges = 0;

        if(level == 1){ //level bestimmt anzahl der Knoten
            intializeNodes(4);
        } else if (level == 2){
            intializeNodes(6);
        } else {
            intializeNodes(10);
        }
        intializeEdges();
        cy.add(nodes); cy.add(edges);

        var lives = 3;
        showHearts();


        var layout = cy.layout({
            name: 'circle',
            directed: true,
            padding: 10
        });

        layout.run();

        var eh = cy.edgehandles(); //aktivieren die Möglichkeit selbst Kanten zu ziehen
        eh.enable();
        eh.enableDrawMode();

        cy.edges().forEach(function (ele) { //verstecken alle generierten Kanten für den Spieler
            ele.style({'opacity': 0});
            numOfEdges +=1;
        });

        cy.minZoom(1); //beschränken den möglichen Zoom
        cy.maxZoom(3);

        $("#level").html("Level " + level);  
        $("#edges").html("Edges left: " + numOfEdges);

        cy.on('ehcomplete', (event, sourceNode, targetNode, addedEles) => { //checken ob richtige kante eingezeichnet wurde
            cy.edges("[source='" + sourceNode.id() + "']", "[target='" + targetNode.id() + "']")
            var ej = cy.$('#'+ sourceNode.id() + targetNode.id());
            if (ej.isEdge()){
                ej.style({'opacity': 1});
                cy.remove(addedEles);
                numOfEdges -= 1;
                $("#edges").html("Edges left: " + numOfEdges);
                if (numOfEdges == 0 ){
                    if(level == 3){
                        won();
                    }
                    won();
                }
            }
            else {
                cy.remove(addedEles);
                var element = document.getElementById('heart' + lives);
                element.style.display = 'none';
                lives = lives - 1;
                $('body').toggleClass('laser', true);
                setTimeout(() => {  $('body').toggleClass('laser', false); }, 2000);
                if(lives <= 0){ //GameOver
                    lost();
                }
            }
        });
        document.getElementById("giveUp").addEventListener("click", function () { //Knopfzuweisung: Aufgeben
            cy.edges().forEach(function (ele) {
                if (edgesVisible) {
                    ele.style({'opacity': 1});
                } else {
                    ele.style({'opacity': 0});
                }
            });
            edgesVisible = !edgesVisible;
        });
    }


    document.getElementById("mode1").addEventListener("click", function() { //Knopfzuweisung: Modus1
        clickedOnMenu();
        currentMode = 1;
        runMode1(level);
    });

    function runMode2(level) { //Modus 2
        nodes = [];
        edges = [];
        
        var select = document.getElementById('selection');
        select.style.display = '';

        let cy = startCytoscape();

        if(level == 1){
            intializeNodes(4);
        } else if (level == 2){
            intializeNodes(6);
        } else {
            intializeNodes(10);
        }
        intializeEdges();

        cy.add(nodes); cy.add(edges);

        var lives = 3;
        showHearts();

        var layout = cy.layout({
            name: 'circle',
            directed: true,
            // roots: '#a',
            padding: 10
        });

        layout.run();

        var eh = cy.edgehandles();
        eh.enable();
        eh.enableDrawMode();

        var edgesToComplete = 0;

        cy.edges().forEach(function (ele) {
            ele.style({'opacity': 0});
            ele.data('found', false);
            edgesToComplete++;
        });

        var correctGuesses = 0;

        cy.on('ehcomplete', (event, sourceNode, targetNode, addedEles) => {
            cy.edges("[source='" + sourceNode.id() + "']", "[target='" + targetNode.id() + "']")
            var ej = cy.$('#' + sourceNode.id() + targetNode.id());
            if (ej.isEdge()) {
                if(ej.data('found') !== true){
                    correctGuesses++;
                    $("#edges").html("Edges left: " + (edgesToComplete - correctGuesses));
                    ej.data('found', true);
                    ej.style({'opacity': 1});
                }
                cy.remove(addedEles);
                }
            else {
                cy.remove(addedEles);
                var element = document.getElementById('heart' + lives);
                element.style.display = 'none';
                lives = lives - 1;
                $('body').toggleClass('laser', true);
                setTimeout(() => {
                    $('body').toggleClass('laser', false);
                }, 2000);
                if (lives <= 0) {
                    lost();
                }
            }

            if(correctGuesses === edgesToComplete){
                won();
            }
        });
            
        var selectedNode = []; //node that was clicked on is saved here
        var selectedColors = [];

            cy.on('tap','node',(evt) => {
                var evtNode = cy.getElementById(evt.target._private.data.id);
                if(!selectedNode.includes(evtNode)){ //if node is not selected
                    var colorSelected = document.getElementById('color').value;
                    if(colorSelected === ''){
                        colorSelected = '#ff0000'; //default Color if nothing is selected
                    }
                    changeColorRekurisv(evtNode, evtNode.data('id'), colorSelected);
                    selectedNode.push(evtNode);
                    selectedColors.push(colorSelected);
                }
                else if(selectedNode.includes(evtNode)){ //if selected is pressed again we reverse the colors to their original color
                    reverseColorRekurisv(evtNode, evtNode.data('id'));
                    var index = selectedNode.indexOf(evtNode);
                    selectedNode.splice(index,1);
                    selectedColors.splice(index,1);
                    for(let i = 0; i< selectedNode.length; i++){
                        changeColorRekurisv(selectedNode[i], selectedNode[i].data('id'), selectedColors[i]);
                    }
            }})
            cy.minZoom(1);
            cy.maxZoom(3);  //beschränken den Zoom

            
        $("#level").html("Level " + level);
        $("#edges").html("Edges left: " + (edgesToComplete - correctGuesses));

            document.getElementById("giveUp").addEventListener("click", function () {
                cy.edges().forEach(function (ele) {
                    if (edgesVisible) {
                        ele.style({'opacity': 1});
                    } else {
                        ele.style({'opacity': 0});
                    }
                });
                edgesVisible = !edgesVisible;
            });

            function changeColorRekurisv(startNode, ignoreId, colorToAdd){ //expects node to start and nodeId to ignore and color to add  mixes the colors new
                if(startNode.data('id') === ignoreId){
                    startNode.data('color', colorToAdd);
                    startNode.data('type', 'start');
                }
                else if(startNode.data('type') !== 'start'){
                    var colorsToMix = [startNode.data('originalColor')];
                    for(let i = 0;i < startNode._private.edges.length; i++){
                        var colorNode = cy.getElementById(startNode._private.edges[i]._private.source._private.data.id);
                        if(colorNode.data('id') !== startNode.data('id')){
                            colorsToMix.push(colorNode.data('color'));
                        }
                    }
                    var endColor = colorsToMix[0];
                    for(let k = 1; k< colorsToMix.length; k++){
                        endColor = rybColorMixer.mix(endColor, colorsToMix[k]);
                    }
                    if(!endColor.startsWith('#')){
                        endColor ='#' + endColor;
                    }
                    startNode.data('type', 'selected');
                    startNode.data('color', endColor);// node color changed
                }
                for(let i = 0;i < startNode._private.edges.length; i++){ //recursiv part
                    var nextNode = cy.getElementById(startNode._private.edges[i]._private.target._private.data.id);
                    if(nextNode.data('id') !== ignoreId && nextNode.data('id') !== startNode.data('id')){
                        changeColorRekurisv(nextNode,ignoreId);
                    }
                }
            }

            function reverseColorRekurisv(startNode, ignoreId){ //expects node to start and nodeId to ignore reverses colors to their original color
                if(startNode.data('id') === ignoreId){
                    startNode.data('color', startNode.data('mixedColor'));
                    startNode.data('type', 'original');
                }
                else{
                    startNode.data('color', startNode.data('mixedColor'));  // nodecolor changed
                    startNode.data('type', 'original'); //nodestyle changed
                }
                for(let i = 0;i < startNode._private.edges.length; i++){ //recursiv part
                    var nextNode = cy.getElementById(startNode._private.edges[i]._private.target._private.data.id);
                    if(nextNode.data('id') !== ignoreId && nextNode.data('id') !== startNode.data('id')){
                        reverseColorRekurisv(nextNode,ignoreId);
                    }
                }
            }
    }

    document.getElementById("mode2").addEventListener("click", function () { //Knopfzuweisung: modus2
        clickedOnMenu();
        currentMode = 2;
        runMode2(level);
    });
});