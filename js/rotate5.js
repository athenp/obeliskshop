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

//rand function
function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

var l = 0;
var w = 0;
var h = 30;

var i;

var row1 = [];
var row2 = [];
var row3 = [];

for (i = 0; i < 10; i++) {
    var line = new THREE.BoxGeometry( l, w, h );
    var material = new THREE.MeshBasicMaterial( { color: 0x5e5d5e } );
    var line = new THREE.Mesh( line, material );
    row1[i] = line;
    scene.add( line );
    
    line.position.set(0, -100 + i * 20, 50);
    line.rotation.x = 0; /*(Math.PI/2) + i/10;*/
    line.rotation.z = 0; /*(Math.PI/2) + i/10;*/
}

for (i = 0; i < 10; i++) {
    var line = new THREE.BoxGeometry( l, w, h );
    var material = new THREE.MeshBasicMaterial( { color: 0x5e5d5e } );
    var line = new THREE.Mesh( line, material );
    row2[i] = line;
    scene.add( line );
    
    line.position.set(0, -100 + i * 20, 0);
}

for (i = 0; i < 10; i++) {
    var line = new THREE.BoxGeometry( l, w, h );
    var material = new THREE.MeshBasicMaterial( { color: 0x5e5d5e } );
    var line = new THREE.Mesh( line, material );
    row3[i] = line;
    scene.add( line );
    
    line.position.set(0, -100 + i * 20, -50);
}

var rotationSpeed = .05;

var rotationsX = [];
var rotationsY = [];
var rotationsZ = [];

//rendering
function render() {
    renderer.render( scene, camera );
    
    for (i = 0; i < row1.length; i++) {
        if ( row1[i].rotation.x < ((Math.PI/180) * 90) ) {
            row1[i].rotation.x += ((Math.PI/180) * 1);
        }
    }
    
    for (i = 0; i < row2.length; i++) {
        if ( row2[i].rotation.x < ((Math.PI/180) * 90) ) {
            row2[i].rotation.x += ((Math.PI/180) * .7);
        }
    }
    
    for (i = 0; i < row3.length; i++) {
        if ( row3[i].rotation.x < ((Math.PI/180) * 90) ) {
            row3[i].rotation.x += ((Math.PI/180) * .5);
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
