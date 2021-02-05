$(document).ready(function () {
    var nodes = [];
    var edges = [];
    var colors = ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c'];
    var alphabet = 'abcdefghijklmnopqrstuvwxyz';
    var gameState = 'mainMenu';
    var level = 1;
    var edgesVisible = false;

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

        return array;
    }
    function makePopper(ele) {
        let ref = ele.popperRef(); // used only for positioning

        ele.tippy = tippy(ref, { // tippy options:
            content: () => {
                let content = document.createElement('div');

                content.innerHTML = ele.data();

                return content;
            },
            trigger: 'manual' // probably want manual mode
        });
    }


    var colorsShuffeld = [...colors];
    shuffle(colorsShuffeld);

    function getRandomColor() {
        return colorsShuffeld.shift();
    }

    var intializeNodes = function (numOfNodes) {
        for (let i = 0; i < numOfNodes; i++) {
            if (colorsShuffeld.length === 0) {
                colorsShuffeld = [...colors];
                shuffle(colorsShuffeld);
            }
            var rndmColor = getRandomColor();
            nodes.push({
                group: 'nodes',
                data: {
                    id: alphabet.charAt(i),
                    color: rndmColor, //displayedColor
                    originalColor: rndmColor, //color without mixing
                    mixedColor: rndmColor, //color with mixing
                    childNodes: [],
                    numOfParents: 0,
                    type: 'original' //node type for changing styles
                },
            });
            nodes.push()
        }
    }

    var intializeEdges = function () {
        for (let i = 0; i < nodes.length - 1; i++) {
            var numOfChildren = randomInteger(1, 3)
            if (numOfChildren != 0) {
                for (let j = 0; j <= numOfChildren; j++) {
                    var childIndex = randomInteger(i + 1, nodes.length - 1)
                    if (nodes[childIndex].data.numOfParents < 3) {
                        // mix hexadecimal colors
                        nodes[childIndex].data.color = "#" + rybColorMixer.mix(nodes[i].data.color, nodes[childIndex].data.color)
                        edges.push({
                            group: 'edges',
                            data: {
                                id: '' + nodes[i].data.id + nodes[childIndex].data.id,
                                source: '' + nodes[i].data.id,
                                target: '' + nodes[childIndex].data.id
                            },
                        });
                        nodes[childIndex].data.numOfParents += 1
                    }
                }
            }
        }
    }

    function destroyGame() {
        nodes = [];
        edges = [];

        let elem = document.querySelector('#cy');
        elem.parentNode.removeChild(elem);

        let startMenu = document.getElementById('StartMenu');
        startMenu.style.display = '';

        let select = document.getElementById('selection');
        select.style.display = 'none';

        let back = document.getElementById('back');
        back.style.display = ''

        let giveUp = document.getElementById('giveUp');
        giveUp.style.display = ''

        for (let i = 1; i < 4; i++) {
            let heart = document.getElementById('heart' + i);
            heart.style.display = '';
        }
        let hearts = document.getElementById('hearts');
        hearts.style.display = 'none'

    }

    document.getElementById("back").addEventListener("click", function () {
        destroyGame();
    });

    function clickedOnMenu(){
        let startMenu = document.getElementById('StartMenu');
        startMenu.style.display = 'none';

        let back = document.getElementById('back');
        back.style.display = 'block';

        let giveUp = document.getElementById('giveUp');
        giveUp.style.display = 'block';

        let elem = document.createElement('div');
        elem.setAttribute("id","cy");
        document.body.appendChild(elem);

        let hearts = document.getElementById('hearts');
        hearts.style.display = '';
    }

    function startCytoscape(){
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
    function runMode1(level) {
        let cy = startCytoscape();
        let numOfEdges = 0;
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

        var layout = cy.layout({
            name: 'circle',
            directed: true,
            padding: 10
        });

        layout.run();

        var eh = cy.edgehandles();
        eh.enable();
        eh.enableDrawMode();

        cy.edges().forEach(function (ele) {
            ele.style({'opacity': 0});
            numOfEdges +=1;
        });
        console.log(numOfEdges);
        cy.on('ehcomplete', (event, sourceNode, targetNode, addedEles) => {
            cy.edges("[source='" + sourceNode.id() + "']", "[target='" + targetNode.id() + "']")
            var ej = cy.$('#'+ sourceNode.id() + targetNode.id());
            if (ej.isEdge()){
                ej.style({'opacity': 1});
                cy.remove(addedEles);
                numOfEdges -= 1;
                if (numOfEdges == 0 ){
                    level += 1;
                    if(level == 3){
                        destroyGame();
                    }
                    runMode1(level);
                }
            }
            else {
                cy.remove(addedEles);
                var element = document.getElementById('heart' + lives);
                element.style.display = 'none';
                lives = lives - 1;
                $('body').toggleClass('laser', true);
                setTimeout(() => {  $('body').toggleClass('laser', false); }, 2000);
                if(lives <= 0){
                    destroyGame();

                }
            }
        });
        document.getElementById("giveUp").addEventListener("click", function () {
            /*cy.ready(function() {
                cy.nodes().forEach(function(ele) {
                    makePopper(ele);
                });
            });

            cy.nodes().unbind('mouseover');
            cy.nodes().bind('mouseover', (event) => event.target.tippy.show());

            cy.nodes().unbind('mouseout');
            cy.nodes().bind('mouseout', (event) => event.target.tippy.hide());*/

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


document.getElementById("mode1").addEventListener("click", function() {
    clickedOnMenu();
    runMode1(level);
    });

    document.getElementById("mode2").addEventListener("click", function() {
        clickedOnMenu();
        var cy = cytoscape({
            container: document.getElementById('cy'),
    
            boxSelectionEnabled: false,
            autounselectify: true,
    
            style: cytoscape.stylesheet()
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
                'curve-style': 'bezier',
                'target-arrow-shape': 'triangle',
                'width': 4,
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
    
        intializeNodes(10); intializeEdges();
        cy.add(nodes); cy.add(edges);
    
        var lives = 3;
    
        var layout = cy.layout({
            name: 'circle',
            directed: true,
            padding: 10
        });
    
        layout.run();
    
        var eh = cy.edgehandles();
        eh.enable();
        eh.enableDrawMode();
    
        cy.edges().forEach(function (ele) {
            ele.style({'opacity': 0});
        });
        cy.on('ehcomplete', (event, sourceNode, targetNode, addedEles) => {
            cy.edges("[source='" + sourceNode.id() + "']", "[target='" + targetNode.id() + "']")
            var ej = cy.$('#'+ sourceNode.id() + targetNode.id());
            if (ej.isEdge()){
                ej.style({'opacity': 1});
                cy.remove(addedEles);
            }
            else {
                cy.remove(addedEles);
                var element = document.getElementById('heart' + lives);
                element.style.display = 'none';
                lives = lives - 1;
                $('body').toggleClass('laser', true);
                setTimeout(() => {  $('body').toggleClass('laser', false); }, 2000);
                if(lives <= 0){
                    destroyGame();
    
                }
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
                selectedColors.push(document.getElementById('color').value);
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

                startNode.data('type', 'selected');//node style changed
                
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
        });
});
