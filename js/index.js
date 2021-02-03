$(document).ready(function () {
    var nodes = []
    var edges = []
    var colors = ['#a6cee3', '#1f78b4', '#b2df8a','#33a02c','#fb9a99','#e31a1c']
    var alpahbet = 'abcdefghijklmnopqrstuvwxyz'

    function randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

var  intializeNodes = function (numOfNodes){
    for(let i = 0; i< numOfNodes; i++){
        nodes.push({
            group: 'nodes',
            data: {id: alpahbet.charAt(i),color:getRandomColor() /*color: colors[Math.floor(Math.random() * colors.length)]*/, numOfParents: 0},
        });
        nodes.push()
    }
}

var intializeEdges= function (){
    for(let i = 0; i < nodes.length - 1; i++) {
        var numOfChildren = randomInteger(1, 3)
        if(numOfChildren != 0) {
            for (let j = 0; j <= numOfChildren; j++) {
                var childIndex = randomInteger(i + 1, nodes.length - 1)
                if (nodes[childIndex].data.numOfParents < 3) {
                    // mix hexadecimal colors
                    nodes[childIndex].data.color = "#" + rybColorMixer.mix(nodes[i].data.color, nodes[childIndex].data.color)
                    edges.push({
                        group: 'edges',
                        data: {
                            id: '' + nodes[i].data.id + nodes[childIndex].data.id,
                            source: ''+ nodes[i].data.id,
                            target:''+ nodes[childIndex].data.id
                        },
                    });
                    nodes[childIndex].data.numOfParents +=1
                }
            }
        }
    }
}
function destroyGame() {
        nodes = [];
        edges = [];
        var elem = document.querySelector('#cy');
        elem.parentNode.removeChild(elem);
        var startMenu = document.getElementById('StartMenu');
        startMenu.style.display = '';

}
document.getElementById("back").addEventListener("click", function() {
       destroyGame();
});
document.getElementById("mode1").addEventListener("click", function() {
    var startMenu = document.getElementById('StartMenu');
    startMenu.style.display = 'none';

    var back = document.getElementById('back');
    back.style.display = '';

    var elem = document.createElement('div');
    elem.setAttribute("id","cy");
    document.body.appendChild(elem);
    var hearts = document.getElementById('hearts');
    hearts.style.display = '';

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

    var bfs = cy.elements().bfs('#a', function(){}, true);

    intializeNodes(10); intializeEdges();
    cy.add(nodes); cy.add(edges);

    var lives = 3;

    var layout = cy.layout({
        name: 'breadthfirst',
        directed: true,
        // roots: '#a',
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





    /* var chosen = null;
     var versuche = 10;*/


    /*cy.on('tap', 'node', function(evt){
        var tmp = evt.target._private.data.id;
        //console.log(tmp);
        if(tmp === chosen){
            console.log("Fall 1");
            chosen = null;
        }
        else if(chosen !== null){
            console.log("Fall 2")
            versuche--;
            document.getElementById('versuche').value = versuche;
            var selector = '[source = "' + chosen + '"][target = "'+ tmp +'"]';
            //console.log(selector);
            cy.edges(selector).style ({
                'opacity' : 1
                //'line-color': '#FF0000'
            })
            chosen = null;
        }
        else {
            console.log("Fall 3");
            chosen = tmp;
        }
        console.log(chosen);
        if(versuche <= 0){
            for(i = 0; i <= nodes.length - 1; i++){
                for(j = 0; j <= nodes.length - 1; j++){
                    var selector = '[source = "' +nodes[i].data.id+ '"][target = "'+ nodes[j].data.id+'"]';
                    //console.log(selector);
                    cy.edges(selector).style ({
                        'opacity' : 1
                        //'line-color': '#FF0000'
                    })
                }
            }
        }
        });*/
    });
});
