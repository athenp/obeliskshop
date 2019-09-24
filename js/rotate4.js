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

var sizeXY = 6;
var sizeZ = sizeXY * .5;

var i;

for (i = 0; i < randomIntFromInterval(10,50); i++) {
    var stack = new THREE.CylinderGeometry( sizeXY, sizeXY, sizeZ, 32 );
    var material = new THREE.MeshBasicMaterial( { color: (Math.random() * 0xffffff) } );
    var stack = new THREE.Mesh( stack, material );
    scene.add( stack );
    stack.position.set(0, (-i), (sizeZ/2) + i * 4);
    stack.rotation.x = (Math.PI/2) + i/10;
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
