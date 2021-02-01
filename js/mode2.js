-document.addEventListener('DOMContentLoaded', function() {
    var nodes = []
    var edges = []
    var colors = ['#FF0000', '#00FF00', '#0000FF']
    var alpahbet = 'abcdefghijklmnopqrstuvwxyz'
    var edgesVisible = false;

    function randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }


    var intializeNodes = function (numOfNodes) {
        for (i = 0; i < numOfNodes; i++) {
            var rndmColor = getRandomColor();
            nodes.push({
                group: 'nodes',
                data: {
                    id: alpahbet.charAt(i),
                    color: rndmColor,
                    originalColor: rndmColor,
                    mixedColor: rndmColor,
                    isSelcected: false,
                    childNodes: [],
                    numOfParents: 0
                },
            });
            nodes.push()
        }
    }

    var intializeEdges = function () {
        for (i = 0; i < nodes.length - 1; i++) {
            var numOfChildren = randomInteger(1, 3)
            if (numOfChildren != 0) {
                for (j = 0; j <= numOfChildren; j++) {
                    var childIndex = randomInteger(i + 1, nodes.length - 1)
                    if (nodes[childIndex].data.numOfParents < 3) {
                        // mix hexadecimal colors
                        nodes[childIndex].data.color = "#" + rybColorMixer.mix(nodes[i].data.color, nodes[childIndex].data.color);
                        nodes[childIndex].data.mixedColor = "#" + rybColorMixer.mix(nodes[i].data.color, nodes[childIndex].data.color);
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
                'curve-style': 'bezier',
                'target-arrow-shape': 'triangle',
                'width': 4,
                // 'display': 'none',
                // 'line-color': '#FF0000',
                // 'target-arrow-color': '#ddd'
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
    intializeNodes(5);
    intializeEdges();
    cy.add(nodes);
    cy.add(edges);
    var layout = cy.layout({
        name: 'grid',
        directed: true,
        // roots: '#a',
        padding: 10
    });
    layout.run();
    //Edgehandle Extension
    var eh = cy.edgehandles();
    eh.enable();
    eh.enableDrawMode();
    cy.edges().forEach(function (ele) {
        ele.style({'opacity': 0});
    });

    var tries = 2;
    var correctGuesses = 0;

    console.log(edges.length);

    //Detektion der richtigen Kanten
    cy.on('ehcomplete', (event, sourceNode, targetNode, addedEles) => {
        console.log(tries);
        document.getElementById('versuche').value = tries;
        cy.edges("[source='" + sourceNode.id() + "']", "[target='" + targetNode.id() + "']")
        var ej = cy.$('#'+ sourceNode.id() + targetNode.id());
        if (ej.isEdge()){
            console.log("Richitge Edge");
            correctGuesses++; //Bug: wenn vorhandene Edge erneut eingezeichnet wird zählt das mit nicht gut
            ej.style({'opacity': 1});
            cy.remove(addedEles);
        }
        else{
            console.log("Falsche Edge");
            cy.remove(addedEles);
            tries--;
        }

        if(correctGuesses === edges.length - 1){
            //console.log("You Win!!!");
            document.getElementById("overlayWin").style.display = "block";
        }

        if (tries <= 0){
            cy.edges().forEach(function (ele) {
                ele.style({'opacity': 1});
            });
            //Verloren Overlay
            document.getElementById("overlayLose").style.display = "block";
        }
    });

    cy.on('tap','node',(evt) => {
        var evtNode = cy.getElementById(evt.target._private.data.id);
        walkTheGraphRekurisv(evtNode, evtNode.data('id'));
    })

    //developer mode, show all edges when a sequence of keys is entered
    Mousetrap.bind('up up down down enter', function() {
        console.log('developer mode activated');
        cy.edges().forEach(function (ele) {
            if(edgesVisible) {
                ele.style({'opacity': 0});
                header.innerText = "";
            }
            else {
                ele.style({'opacity': 1});
                header.innerText = "developer mode";
            }
        });
        edgesVisible = !edgesVisible;
    });

function walkTheGraphRekurisv(startNode, ignoreId){ //expects node to start and nodeId to ignore
    console.log('startNode:');
    console.log(startNode);
    if(startNode.data('id') === ignoreId){
        startNode.data('color', startNode.data('originalColor'));
    }
    else{
        var colorsToMix = [startNode.data('originalColor')];
        for(let i = 0;i < startNode._private.edges.length; i++){
            var colorNode = cy.getElementById(startNode._private.edges[i]._private.source._private.data.id);
            console.log('colorNode:');
            console.log(colorNode);
            if(colorNode.data('id') !== ignoreId && colorNode.data('id') !== startNode.data('id')){
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
        startNode.data('color', endColor);  // Knotenfarbe geändert
    }
    for(let i = 0;i < startNode._private.edges.length; i++){
        var nextNode = cy.getElementById(startNode._private.edges[i]._private.target._private.data.id);
        if(nextNode.data('id') !== ignoreId && nextNode.data('id') !== startNode.data('id')){
            walkTheGraphRekurisv(nextNode,ignoreId);
        }
    }
}
});