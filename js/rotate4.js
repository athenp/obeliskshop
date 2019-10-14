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
renderer.setClearColor(0xf6f6fa,1);
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

var radius = 6;
var segments = 32;

var i;

var disks = [];
var disksX = [];
var disksY = [];
var disksZ = [];

for (i = 0; i < randomIntFromInterval(50,100); i++) {
    var stack = new THREE.SphereGeometry( radius, segments, segments );
    var material = new THREE.MeshBasicMaterial( { color: 0x5e5d5e } );
    var stack = new THREE.Mesh( stack, material );
    disks[i] = stack;
    scene.add( stack );
    
    disksX[i] = 0;
    disksY[i] = 0;
    disksZ[i] = 0;
    
    stack.position.set(disksX[i], disksY[i], disksZ[i]);
    stack.rotation.x = Math.PI/2; /*(Math.PI/2) + i/10;*/
    stack.rotation.z = 0; /*(Math.PI/2) + i/10;*/
}

var rotationSpeed = .05;

var targetPositionsX = [];
var targetPositionsY = [];
var targetPositionsZ = [];

for (i = 0; i <= disks.length; i++) {
    var targetPositionX = randomIntFromInterval(-100,100);
    var targetPositionY = randomIntFromInterval(-100,100);
    var targetPositionZ = randomIntFromInterval(-100,100);
    targetPositionsX[i] = targetPositionX;
    targetPositionsY[i] = targetPositionY;
    targetPositionsZ[i] = targetPositionZ;
}

//rendering
function render() {
    renderer.render( scene, camera );
    
    for (i = 0; i < disks.length; i++) {
        
//        if ((disksX[i] != targetPositionsX[i]) && (disksY[i] != targetPositionsY[i]) && (disksZ[i] != targetPositionsZ[i])) {
//            disks[i].material.color.setHex( 0xffffff + (i * 5) );
//        } else if ((disksX[i] == targetPositionsX[i]) && (disksY[i] == targetPositionsY[i]) && (disksZ[i] == targetPositionsZ[i])) {
//            disks[i].material.color.setHex( 0xffffff );
//        }
        
        if (targetPositionsX[i] > 0) {
            if (disksX[i] < targetPositionsX[i]){
                var speedX = .2;
                disksX[i] += speedX;
                disks[i].position.x = disksX[i];
            } else {
                disks[i].material.color.setHex( 0xffffff );
            }
        } else if (targetPositionsX[i] < 0) {
            if (disksX[i] > targetPositionsX[i]){
                var speedX = -.2;
                disksX[i] += speedX;
                disks[i].position.x = disksX[i];
            } else {
                disks[i].material.color.setHex( 0xffffff );
            }
        }
        
        if (targetPositionsY[i] > 0) {
            if (disksY[i] < targetPositionsY[i]){
                var speedY = .2;
                disksY[i] += speedY;
                disks[i].position.y = disksY[i];
            } else {
                disks[i].material.color.setHex( 0xffffff + 3 );
            }
        } else if (targetPositionsY[i] < 0) {
            if (disksY[i] > targetPositionsY[i]){
                var speedY = -.2;
                disksY[i] += speedY;
                disks[i].position.y = disksY[i];
            } else {
                disks[i].material.color.setHex( 0xffffff + 3 );
            }
        }
        
        if (targetPositionsZ[i] > 0) {
            if (disksZ[i] < targetPositionsZ[i]){
                var speedZ = .2;
                disksZ[i] += speedZ;
                disks[i].position.z = disksZ[i];
            } else {
                disks[i].material.color.setHex( 0xffffff + 6 );
            }
        } else if (targetPositionsZ[i] < 0) {
            if (disksZ[i] > targetPositionsZ[i]){
                var speedZ = -.2;
                disksZ[i] += speedZ;
                disks[i].position.z = disksZ[i];
            } else {
                disks[i].material.color.setHex( 0xffffff + 6 );
            }
        }
    }
    
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
