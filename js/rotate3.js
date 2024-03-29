//camera controls
var Controls = (function(Controls) {
                "use strict";
                
                // Check for double inclusion
                if (Controls.addMouseHandler)
                return Controls;
                
                Controls.addMouseHandler = function (domObject, drag, zoomIn, zoomOut) {
                var startDragX = null,
                startDragY = null;
                
                function mouseWheelHandler(e) {
                e = window.event || e;
                var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
                
                if (delta < 0 && zoomOut) {
                zoomOut(delta);
                } else if (zoomIn) {
                zoomIn(delta);
                }
                
                e.preventDefault();
                }
                
                function mouseDownHandler(e) {
                startDragX = e.clientX;
                startDragY = e.clientY;
                
                e.preventDefault();
                }
                
                function mouseMoveHandler(e) {
                if (startDragX === null || startDragY === null)
                return;
                
                if (drag)
                drag(e.clientX - startDragX, e.clientY - startDragY);
                
                startDragX = e.clientX;
                startDragY = e.clientY;
                
                e.preventDefault();
                }
                
                function mouseUpHandler(e) {
                mouseMoveHandler.call(this, e);
                startDragX = null;
                startDragY = null;
                
                e.preventDefault();
                }
                
                domObject.addEventListener("mousewheel", mouseWheelHandler);
                domObject.addEventListener("DOMMouseScroll", mouseWheelHandler);
                domObject.addEventListener("mousedown", mouseDownHandler);
                domObject.addEventListener("mousemove", mouseMoveHandler);
                domObject.addEventListener("mouseup", mouseUpHandler);
                };
                return Controls;
                }(Controls || {}));

//setup
var renderer = new THREE.WebGLRenderer({ logarithmicDepthBuffer: true });
var container = document.getElementById('canvas');
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xe1fce0,1);
container.appendChild(renderer.domElement);

var zNear = 1;
var zFar = 3500;

var scene = new THREE.Scene();
var center = new THREE.Vector3();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, zNear, zFar );

camera.up = new THREE.Vector3(0, 0, 1);
camera.position.x = 120;
camera.lookAt(center);

function drag(deltaX, deltaY) {
    var radPerPixel = (Math.PI / 450),
    deltaPhi = radPerPixel * deltaX,
    deltaTheta = radPerPixel * deltaY,
    pos = camera.position.sub(center),
    radius = pos.length(),
    theta = Math.acos(pos.z / radius),
    phi = Math.atan2(pos.y, pos.x);
    
    // Subtract deltaTheta and deltaPhi
    theta = Math.min(Math.max(theta - deltaTheta, 0), Math.PI);
    phi -= deltaPhi;
    
    // Turn back into Cartesian coordinates
    pos.x = radius * Math.sin(theta) * Math.cos(phi);
    pos.y = radius * Math.sin(theta) * Math.sin(phi);
    pos.z = radius * Math.cos(theta);
    
    camera.position.add(center);
    camera.lookAt(center);
    redraw();
}

function zoomIn() {
    camera.position.sub(center).multiplyScalar(0.9).add(center);
    redraw();
}

function zoomOut() {
    camera.position.sub(center).multiplyScalar(1.1).add(center);
    redraw();
}

Controls.addMouseHandler(renderer.domElement, drag, zoomIn, zoomOut);

//rand function
function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const color = 0xFFFF8B;
const intensity = 10;
const width = 50;
const height = 20;
const light = new THREE.RectAreaLight(color, intensity, width, height);
light.position.set(50, 0, 0);
light.rotation.y = THREE.Math.degToRad(90);
scene.add(light);

const helper = new THREE.RectAreaLightHelper(light);
light.add(helper);

var masterRand = (randomIntFromInterval(0,3));

if (masterRand == 0) {
    
    //basic size generation, the base of the building (this block) has a higher chance of being larger
    var sizeX = (randomIntFromInterval(20,60));
    var sizeY = (randomIntFromInterval(20,60));
    var sizeZ = (randomIntFromInterval((sizeY*.2),(sizeY*.5)));
    
    //shape creation according to three.js semantics, size, color, and position established
    var box0 = new THREE.BoxGeometry( sizeX, sizeY, sizeZ );
    var material = new THREE.MeshBasicMaterial( { color: (Math.random() * 0xffffff) } );
    var box0 = new THREE.Mesh( box0, material );
    scene.add( box0 );
    box0.position.set(0, 0, (0 + (sizeZ/2)));

    var numCubes = (randomIntFromInterval(5, 10));
    var i;
    
    for (i = 0; i < numCubes; i++) {
        
        var sizeX2 = (randomIntFromInterval(10, 50));
        var sizeY2 = (randomIntFromInterval(10, 50));
        var sizeZ2 = (randomIntFromInterval(10, 30));
        
        //position generation, subsequent shapes cannot exceed the boundaries of the previous shapes
        var posX = (0+(randomIntFromInterval(-sizeX,sizeX)/2));
        var posY = (0+(randomIntFromInterval(-sizeY,sizeY)/2));
        var posZ = (0 + (sizeZ2/2));
        
        //load shape with texture
        var box1 = new THREE.BoxGeometry( sizeX2, sizeY2, sizeZ2 );
        var material = new THREE.MeshBasicMaterial( { color: (Math.random() * 0xffffff) } );
        var box1 = new THREE.Mesh( box1, material );
        scene.add( box1 );
        box1.position.set(posX, posY, posZ);
    }
    
    /*var sizeX3 = (randomIntFromInterval(10, 50));
    var sizeY3 = (randomIntFromInterval(10, 50));
    var sizeZ3 = (randomIntFromInterval(10, 30));
    
    //the roll variables determine which existing block the next block is added to
    var roll1 = (randomIntFromInterval(0, 1));
    
    if (roll1 == 0) {
        var posX2 = (posX + (randomIntFromInterval(-sizeX,sizeX)/2));
        var posY2 = (posY + (randomIntFromInterval(-sizeY,sizeY)/2));
    } else if (roll1 == 1) {
        var posX2 = (posX + (randomIntFromInterval(-sizeX2,sizeX2)/2));
        var posY2 = (posY + (randomIntFromInterval(-sizeY2,sizeY2)/2));
    }
    var posZ2 = (0 + (sizeZ3/2));
    
    loader.load('textures/nx.jpg', function ( texture ) {
                var box2 = new THREE.BoxGeometry( sizeX3, sizeY3, sizeZ3 );
                var material = new THREE.MeshBasicMaterial( { map:texture } );
                var box2 = new THREE.Mesh( box2, material );
                scene.add( box2 );
                box2.position.set(posX2, posY2, posZ2);
                });
    
    var sizeX4 = (randomIntFromInterval(10, 50));
    var sizeY4 = (randomIntFromInterval(10, 50));
    var sizeZ4 = (randomIntFromInterval(10, 30));
    
    //since the number of blocks has increased, there are more options to choose from
    var roll2 = (randomIntFromInterval(0, 2));
    
    if (roll2 == 0) {
        var posX3 = (posX2 + (randomIntFromInterval(-sizeX,sizeX)/2));
        var posY3 = (posY2 + (randomIntFromInterval(-sizeY,sizeY)/2));
    } else if (roll2 == 1) {
        var posX3 = (posX2 + (randomIntFromInterval(-sizeX2,sizeX2)/2));
        var posY3 = (posY2 + (randomIntFromInterval(-sizeY2,sizeY2)/2));
    } else if (roll2 == 2) {
        var posX3 = (posX2 + (randomIntFromInterval(-sizeX3,sizeX3)/2));
        var posY3 = (posY2 + (randomIntFromInterval(-sizeY3,sizeY3)/2));
    }
    var posZ3 = (0 + (sizeZ4/2));
    
    loader.load('textures/nx.jpg', function ( texture ) {
                var box3 = new THREE.BoxGeometry( sizeX4, sizeY4, sizeZ4 );
                var material = new THREE.MeshBasicMaterial( { map:texture } );
                var box3 = new THREE.Mesh( box3, material );
                scene.add( box3 );
                box3.position.set(posX3, posY3, posZ3);
                });
    
    var sizeX5 = (randomIntFromInterval(10, 50));
    var sizeY5 = (randomIntFromInterval(10, 50));
    var sizeZ5 = (randomIntFromInterval(10, 30));
    
    var roll3 = (randomIntFromInterval(0, 3));
    
    if (roll3 == 0) {
        var posX4 = (posX3 + (randomIntFromInterval(-sizeX,sizeX)/2));
        var posY4 = (posY3 + (randomIntFromInterval(-sizeY,sizeY)/2));
    } else if (roll3 == 1) {
        var posX4 = (posX3 + (randomIntFromInterval(-sizeX2,sizeX2)/2));
        var posY4 = (posY3 + (randomIntFromInterval(-sizeY2,sizeY2)/2));
    } else if (roll3 == 2) {
        var posX4 = (posX3 + (randomIntFromInterval(-sizeX3,sizeX3)/2));
        var posY4 = (posY3 + (randomIntFromInterval(-sizeY3,sizeY3)/2));
    } else if (roll3 == 3) {
        var posX4 = (posX3 + (randomIntFromInterval(-sizeX4,sizeX4)/2));
        var posY4 = (posY3 + (randomIntFromInterval(-sizeY4,sizeY4)/2));
    }
    var posZ4 = (0 + (sizeZ5/2));
    
    loader.load('textures/nx.jpg', function ( texture ) {
                var box4 = new THREE.BoxGeometry( sizeX5, sizeY5, sizeZ5 );
                var material = new THREE.MeshBasicMaterial( { map:texture } );
                var box4 = new THREE.Mesh( box4, material );
                scene.add( box4 );
                box4.position.set(posX4, posY4, posZ4);
                });
    //smokestacks have a 1/2 chance of generating.
    var cond1 = (randomIntFromInterval(1, 1));
    //in that 1/2, cond2 controls the number of stacks generated (1-3)
    var cond2 = (randomIntFromInterval(3, 3));
    
    if (cond1 == 1) {
        var sizeXY = 1;
        var sizeZ = (randomIntFromInterval(30,50));
        
        var posX5 = (posX4 + (randomIntFromInterval(-sizeX5,sizeX5)/2));
        var posY5 = (posY4 + (randomIntFromInterval(-sizeY5,sizeY5)/2));
        var posZ5 = (0 + (sizeZ/2));
        
        var i;
        
        for (i = 0; i < cond2; i++) {
            var stack = new THREE.CylinderGeometry( sizeXY, sizeXY, sizeZ, 32 );
            var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
            var stack = new THREE.Mesh( stack, material );
            scene.add( stack );
            stack.position.set(posX5 + (i * 4), posY5, posZ5);
            stack.rotation.x = Math.PI/2;
        }
    }*/
} else if (masterRand == 1) {
    
    //basic size generation, the base of the building (this block) has a higher chance of being larger
    var sizeX = (randomIntFromInterval(50,100));
    var sizeY = (randomIntFromInterval(50,100));
    var sizeZ = (randomIntFromInterval((sizeY*.2),(sizeY*.5)));
    
    //shape creation according to three.js semantics, size, color, and position established
    var box0 = new THREE.BoxGeometry( sizeX, sizeY, sizeZ );
    var material = new THREE.MeshBasicMaterial( { color: (Math.random() * 0xffffff) } );
    var box0 = new THREE.Mesh( box0, material );
    scene.add( box0 );
    box0.position.set(0, 0, (0 + (sizeZ/2)));
    
    var numCubes = (randomIntFromInterval(5, 10));
    var i;
    
    for (i = 0; i < numCubes; i++) {
        var sizeX2 = (randomIntFromInterval(10, 50));
        var sizeY2 = (randomIntFromInterval(10, 50));
        var sizeZ2 = (randomIntFromInterval(10, 30));
        
        var posX = (randomIntFromInterval(-sizeX/2,sizeX/2));
        var posY = (randomIntFromInterval(-sizeY/2,sizeY/2));
        var posZ = (randomIntFromInterval(0,50) + (sizeZ2/2));
        
        var topBox1 = new THREE.BoxGeometry( sizeX2, sizeY2, sizeZ2 );
        var material = new THREE.MeshBasicMaterial( { color: (Math.random() * 0xffffff) } );
        var topBox1 = new THREE.Mesh( topBox1, material );
        scene.add( topBox1 );
        topBox1.position.set(posX, posY, posZ);
        
        //generate struts if geometry is elevated
        if (posZ > (sizeZ2/2)) {
            var supSizeXY = (randomIntFromInterval(1,3));
            var supSizeZ = posZ - (sizeZ2/2);
            
            var supPosX = (posX + (sizeX2/2)) - (supSizeXY/2);
            var supPosY = (posY + (sizeY2/2)) - (supSizeXY/2);
            var supPosZ = (0 + (supSizeZ/2));
            
            var sup1 = new THREE.BoxGeometry( supSizeXY, supSizeXY, supSizeZ );
            var material = new THREE.MeshBasicMaterial( { color: (Math.random() * 0xffffff) } );
            var sup1 = new THREE.Mesh( sup1, material );
            scene.add( sup1 );
            sup1.position.set(supPosX, supPosY, supPosZ);
            
            var supPosX2 = (posX + (-sizeX2/2)) + (supSizeXY/2);
            var supPosY2 = (posY + (-sizeY2/2)) + (supSizeXY/2);
            var supPosZ2 = (0 + (supSizeZ/2));
            
            var sup2 = new THREE.BoxGeometry( supSizeXY, supSizeXY, supSizeZ );
            var material = new THREE.MeshBasicMaterial( { color: (Math.random() * 0xffffff) } );
            var sup2 = new THREE.Mesh( sup2, material );
            scene.add( sup2 );
            sup2.position.set(supPosX2, supPosY2, supPosZ2);
            
            var supPosX3 = (posX + (-sizeX2/2)) + (supSizeXY/2);
            var supPosY3 = (posY + (sizeY2/2)) - (supSizeXY/2);
            var supPosZ3 = (0 + (supSizeZ/2));
            
            var sup3 = new THREE.BoxGeometry( supSizeXY, supSizeXY, supSizeZ );
            var material = new THREE.MeshBasicMaterial( { color: (Math.random() * 0xffffff) } );
            var sup3 = new THREE.Mesh( sup3, material );
            scene.add( sup3 );
            sup3.position.set(supPosX3, supPosY3, supPosZ3);
            
            var supPosX4 = (posX + (sizeX2/2)) - (supSizeXY/2);
            var supPosY4 = (posY + (-sizeY2/2)) + (supSizeXY/2);
            var supPosZ4 = (0 + (supSizeZ/2));
            
            var sup4 = new THREE.BoxGeometry( supSizeXY, supSizeXY, supSizeZ );
            var material = new THREE.MeshBasicMaterial( { color: (Math.random() * 0xffffff) } );
            var sup4 = new THREE.Mesh( sup4, material );
            scene.add( sup4 );
            sup4.position.set(supPosX4, supPosY4, supPosZ4);
        }
    }
}else if (masterRand == 2) {
    //basic size generation, the center of the scraper (this shape) should be at least twice as tall as it is wide
    var sizeXY = (randomIntFromInterval(10,30));
    var sizeZ = (randomIntFromInterval((sizeXY*2),(sizeXY*5)));
    
    //shape creation according to three.js semantics, size, color, and position established
    var box0 = new THREE.BoxGeometry( sizeXY, sizeXY, sizeZ );
    var material = new THREE.MeshBasicMaterial( { color: (Math.random() * 0xffffff) } );
    var box0 = new THREE.Mesh( box0, material );
    scene.add( box0 );
    box0.position.set(0, 0, (-30 + (sizeZ/2)));
    
    var numCyl = (randomIntFromInterval(5, 20));
    var i;
    
    for (i = 0; i < numCyl; i++) {
        var sizeBase = (randomIntFromInterval(sizeXY *.1,sizeXY * .3));
        var sizeZ2 = (randomIntFromInterval((sizeZ*.3),(sizeZ*.8)));
        
        var posX = (randomIntFromInterval(-sizeXY/2,sizeXY/2));
        var posY = (randomIntFromInterval(-sizeXY/2,sizeXY/2));
        
        var geometry = new THREE.CylinderGeometry( sizeBase, sizeBase, sizeZ2, 32 );
        var material = new THREE.MeshBasicMaterial( {color: (Math.random() * 0xffffff)} );
        var cyl0 = new THREE.Mesh( geometry, material );
        scene.add( cyl0 );
        cyl0.position.set(posX, posY, (-30 + (sizeZ2/2)));
        cyl0.rotation.x = Math.PI/2;
    }
}else if (masterRand == 3) {
    var sizeXY = 40;
    var sizeZ = sizeXY * .2;
    
    var i;
    var numBox = randomIntFromInterval(10,30);
    
    for (i = 0; i < numBox; i++) {
        var posXY = (randomIntFromInterval(-sizeXY/4,sizeXY/4));
        var rotZ = (randomIntFromInterval(0,360));
        
        var stack = new THREE.BoxGeometry( sizeXY, sizeXY, sizeZ );
        var material = new THREE.MeshBasicMaterial( { color: (Math.random() * 0xffffff) } );
        var stack = new THREE.Mesh( stack, material );
        scene.add( stack );
        stack.position.set(posXY, posXY, ((sizeZ/2) + i * 4) - 30);
        //stack.rotation.z = rotZ;
        //stack.rotation.x = (Math.PI/2) + i/10;
        
        var stackSmall = new THREE.BoxGeometry( sizeXY - 10, sizeXY - 10, sizeZ/2 );
        var material = new THREE.MeshBasicMaterial( { color: (Math.random() * 0xffffff) } );
        var stackSmall = new THREE.Mesh( stackSmall, material );
        scene.add( stackSmall );
        stackSmall.position.set(0, 0, ((sizeZ/2) + i * 4) - 30 + sizeZ);
    }
}

//rendering
function render() {
    renderer.render( scene, camera );
    requestAnimationFrame(render);
}
render();

//redrawing for camera manipulation
var frameId = 0;
function redraw() {
    cancelAnimationFrame(frameId);
    frameId = requestAnimationFrame(render);
}
redraw();
