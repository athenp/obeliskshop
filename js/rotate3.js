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

//textures
var loader = new THREE.CubeTextureLoader();
loader.setPath( './textures' );

var textureCube = loader.load( [
                                'px.jpg', 'nx.jpg',
                                'py.jpg', 'ny.jpg',
                                'pz.jpg', 'nz.jpg'
                                ] );

//setup

var renderer = new THREE.WebGLRenderer();
var container = document.getElementById('canvas');
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xe1fce0,1);
container.appendChild(renderer.domElement);

var scene = new THREE.Scene();
var center = new THREE.Vector3();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

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

//major geometry
var rotationRand = (randomIntFromInterval(0,360));

var sizeX = (randomIntFromInterval(20,60));
var sizeY = (randomIntFromInterval(20,60));
var sizeZ = (randomIntFromInterval((sizeY*.2),(sizeY*.5)));

var box0 = new THREE.BoxGeometry( sizeX, sizeY, sizeZ );
var material = new THREE.MeshBasicMaterial( { color: (Math.random() * 0xffffff) } );
var box0 = new THREE.Mesh( box0, material );
//box0.rotation.z = THREE.Math.degToRad(rotationRand);
scene.add( box0 );
box0.position.set(0, 0, (0 + (sizeZ/2)));

var sizeX2 = (randomIntFromInterval(10, 50));
var sizeY2 = (randomIntFromInterval(10, 50));
var sizeZ2 = (randomIntFromInterval(10, 30));

var posX = (0+(randomIntFromInterval(-sizeX,sizeX)/2));
var posY = (0+(randomIntFromInterval(-sizeY,sizeY)/2));
//var posZ = (0+(randomIntFromInterval(0,sizeZ)/2));
var posZ = (0 + (sizeZ2/2));

var box1 = new THREE.BoxGeometry( sizeX2, sizeY2, sizeZ2 );
var material = new THREE.MeshBasicMaterial( { color: (Math.random() * 0xffffff) } );
var box1 = new THREE.Mesh( box1, material );
scene.add( box1 );
box1.position.set(posX, posY, posZ);

var sizeX3 = (randomIntFromInterval(10, 50));
var sizeY3 = (randomIntFromInterval(10, 50));
var sizeZ3 = (randomIntFromInterval(10, 30));

var posX2 = (posX + (randomIntFromInterval(-sizeX2,sizeX2)/2));
var posY2 = (posY + (randomIntFromInterval(-sizeY2,sizeY2)/2));
//var posZ2 = (posZ + (randomIntFromInterval(-sizeZ2,sizeZ2)/2));
var posZ2 = (0 + (sizeZ3/2));

var box2 = new THREE.BoxGeometry( sizeX3, sizeY3, sizeZ3 );
var material = new THREE.MeshBasicMaterial( { color: (Math.random() * 0xffffff) } );
var box2 = new THREE.Mesh( box2, material );
scene.add( box2 );
box2.position.set(posX2, posY2, posZ2);

var sizeX4 = (randomIntFromInterval(10, 50));
var sizeY4 = (randomIntFromInterval(10, 50));
var sizeZ4 = (randomIntFromInterval(10, 30));

var posX3 = (posX2 + (randomIntFromInterval(-sizeX3,sizeX3)/2));
var posY3 = (posY2 + (randomIntFromInterval(-sizeY3,sizeY3)/2));
//var posZ3 = (posZ2 + (randomIntFromInterval(-sizeZ3,sizeZ3)/2));
var posZ3 = (0 + (sizeZ4/2));

var box3 = new THREE.BoxGeometry( sizeX4, sizeY4, sizeZ4 );
var material = new THREE.MeshBasicMaterial( { color: (Math.random() * 0xffffff) } );
var box3 = new THREE.Mesh( box3, material );
scene.add( box3 );
box3.position.set(posX3, posY3, posZ3);

var sizeX5 = (randomIntFromInterval(10, 50));
var sizeY5 = (randomIntFromInterval(10, 50));
var sizeZ5 = (randomIntFromInterval(10, 30));

var posX4 = (posX3 + (randomIntFromInterval(-sizeX4,sizeX4)/2));
var posY4 = (posY3 + (randomIntFromInterval(-sizeY4,sizeY4)/2));
//var posZ4 = (posZ3 + (randomIntFromInterval(-sizeZ4,sizeZ4)/2));
var posZ4 = (0 + (sizeZ5/2));

var box4 = new THREE.BoxGeometry( sizeX5, sizeY5, sizeZ5 );
var material = new THREE.MeshBasicMaterial( { color: (Math.random() * 0xffffff) } );
var box4 = new THREE.Mesh( box4, material );
scene.add( box4 );
box4.position.set(posX4, posY4, posZ4);

var sizeXY = (randomIntFromInterval(1,3));
var sizeZ = (randomIntFromInterval(30,50));

var posX5 = (posX4 + (randomIntFromInterval(-sizeX5,sizeX5)/2));
var posY5 = (posY4 + (randomIntFromInterval(-sizeY5,sizeY5)/2));
//var posZ5 = (posZ4 + (randomIntFromInterval(-sizeZ5,sizeZ5)/2));
var posZ5 = (0 + (sizeZ/2));

var grid1 = new THREE.BoxGeometry( sizeXY, sizeXY, sizeZ );
var material = new THREE.MeshBasicMaterial( { color: (Math.random() * 0xffffff) } );
var grid1 = new THREE.Mesh( grid1, material );
scene.add( grid1 );
grid1.position.set(posX5, posY5, posZ5);

var grid2 = new THREE.BoxGeometry( sizeXY, sizeXY, sizeZ );
var material = new THREE.MeshBasicMaterial( { color: (Math.random() * 0xffffff) } );
var grid2 = new THREE.Mesh( grid2, material );
scene.add( grid2 );
grid2.position.set((posX5 + sizeXY * 2), posY5, posZ5);

var grid3 = new THREE.BoxGeometry( sizeXY, sizeXY, sizeZ );
var material = new THREE.MeshBasicMaterial( { color: (Math.random() * 0xffffff) } );
var grid3 = new THREE.Mesh( grid3, material );
scene.add( grid3 );
grid3.position.set((posX5 + sizeXY *4), posY5, posZ5);

//rendering
function render() {
     
    renderer.render( scene, camera );
    requestAnimationFrame(render);
}
render();

var frameId = 0;

function redraw() {
    cancelAnimationFrame(frameId);
    frameId = requestAnimationFrame(render);
}

redraw();
