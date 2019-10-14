//setup
var renderer = new THREE.WebGLRenderer({ logarithmicDepthBuffer: true });
var container = document.getElementById('canvas');
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0x000,1);
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

var l = 5;
var w = 10;
var h = 5;

var i;

var row1 = [];
var row2 = [];
var row3 = [];
var row4 = [];
var row5 = [];
var row6 = [];
var row7 = [];
var row8 = [];
var row9 = [];
var row10 = [];
var row11 = [];

for (i = 0; i < 16; i++) {
    var line = new THREE.BoxGeometry( l, w, h );
    var material = new THREE.MeshBasicMaterial( { color: 0x717c82 } );
    var line = new THREE.Mesh( line, material );
    row1[i] = line;
    
    line.position.set(0, -152 + i * 20, 100);
    line.rotation.x = 0; /*(Math.PI/2) + i/10;*/
    line.rotation.z = 0; /*(Math.PI/2) + i/10;*/
}

for (i = 0; i < 16; i++) {
    var line = new THREE.BoxGeometry( l, w, h );
    var material = new THREE.MeshBasicMaterial( { color: 0x717c82 } );
    var line = new THREE.Mesh( line, material );
    row2[i] = line;
    
    line.position.set(0, -152 + i * 20, 80);
}

for (i = 0; i < 16; i++) {
    var line = new THREE.BoxGeometry( l, w, h );
    var material = new THREE.MeshBasicMaterial( { color: 0x717c82 } );
    var line = new THREE.Mesh( line, material );
    row3[i] = line;
    
    line.position.set(0, -152 + i * 20, 60);
}

for (i = 0; i < 16; i++) {
    var line = new THREE.BoxGeometry( l, w, h );
    var material = new THREE.MeshBasicMaterial( { color: 0x717c82 } );
    var line = new THREE.Mesh( line, material );
    row4[i] = line;
    
    line.position.set(0, -152 + i * 20, 40);
}

for (i = 0; i < 16; i++) {
    var line = new THREE.BoxGeometry( l, w, h );
    var material = new THREE.MeshBasicMaterial( { color: 0x717c82 } );
    var line = new THREE.Mesh( line, material );
    row5[i] = line;
    
    line.position.set(0, -152 + i * 20, 20);
}

for (i = 0; i < 16; i++) {
    var line = new THREE.BoxGeometry( l, w, h );
    var material = new THREE.MeshBasicMaterial( { color: 0x717c82 } );
    var line = new THREE.Mesh( line, material );
    row6[i] = line;
    
    line.position.set(0, -152 + i * 20, 0);
}

for (i = 0; i < 16; i++) {
    var line = new THREE.BoxGeometry( l, w, h );
    var material = new THREE.MeshBasicMaterial( { color: 0x717c82 } );
    var line = new THREE.Mesh( line, material );
    row7[i] = line;
    
    line.position.set(0, -152 + i * 20, -20);
}

for (i = 0; i < 16; i++) {
    var line = new THREE.BoxGeometry( l, w, h );
    var material = new THREE.MeshBasicMaterial( { color: 0x717c82 } );
    var line = new THREE.Mesh( line, material );
    row8[i] = line;
    
    line.position.set(0, -152 + i * 20, -40);
}

for (i = 0; i < 16; i++) {
    var line = new THREE.BoxGeometry( l, w, h );
    var material = new THREE.MeshBasicMaterial( { color: 0x717c82 } );
    var line = new THREE.Mesh( line, material );
    row9[i] = line;
    
    line.position.set(0, -152 + i * 20, -60);
}

for (i = 0; i < 16; i++) {
    var line = new THREE.BoxGeometry( l, w, h );
    var material = new THREE.MeshBasicMaterial( { color: 0x717c82 } );
    var line = new THREE.Mesh( line, material );
    row10[i] = line;
    
    line.position.set(0, -152 + i * 20, -80);
}

for (i = 0; i < 16; i++) {
    var line = new THREE.BoxGeometry( l, w, h );
    var material = new THREE.MeshBasicMaterial( { color: 0x717c82 } );
    var line = new THREE.Mesh( line, material );
    row11[i] = line;
    
    line.position.set(0, -152 + i * 20, -100);
}

//rendering
function render() {
    renderer.render( scene, camera );
    
    var myVar = setInterval(addBlock, 500);
    
    i = 0;
    
    function addBlock(){
        scene.add(row1[i]);
        scene.add(row2[i]);
        scene.add(row3[i]);
        scene.add(row4[i]);
        scene.add(row5[i]);
        scene.add(row6[i]);
        scene.add(row7[i]);
        scene.add(row8[i]);
        scene.add(row9[i]);
        scene.add(row10[i]);
        scene.add(row11[i]);
        
        scene.remove(row2[1]);
        scene.remove(row2[2]);
        scene.remove(row2[4]);
        scene.remove(row2[5]);
        scene.remove(row2[10]);
        scene.remove(row2[11]);
        scene.remove(row2[13]);
        scene.remove(row2[14]);
        
        scene.remove(row3[1]);
        scene.remove(row3[2]);
        scene.remove(row3[4]);
        scene.remove(row3[5]);
        scene.remove(row3[7]);
        scene.remove(row3[8]);
        scene.remove(row3[10]);
        scene.remove(row3[11]);
        scene.remove(row3[13]);
        scene.remove(row3[14]);
        
        scene.remove(row4[1]);
        scene.remove(row4[2]);
        scene.remove(row4[4]);
        scene.remove(row4[5]);
        scene.remove(row4[7]);
        scene.remove(row4[8]);
        scene.remove(row4[10]);
        scene.remove(row4[11]);
        scene.remove(row4[13]);
        scene.remove(row4[14]);
        
        scene.remove(row5[4]);
        scene.remove(row5[5]);
        scene.remove(row5[7]);
        scene.remove(row5[8]);
        scene.remove(row5[10]);
        scene.remove(row5[11]);
        
        scene.remove(row6[0]);
        scene.remove(row6[1]);
        scene.remove(row6[2]);
        scene.remove(row6[4]);
        scene.remove(row6[5]);
        scene.remove(row6[7]);
        scene.remove(row6[8]);
        scene.remove(row6[10]);
        scene.remove(row6[11]);
        scene.remove(row6[12]);
        scene.remove(row6[13]);
        scene.remove(row6[14]);
        
        scene.remove(row7[0]);
        scene.remove(row7[1]);
        scene.remove(row7[2]);
        scene.remove(row7[4]);
        scene.remove(row7[5]);
        scene.remove(row7[7]);
        scene.remove(row7[8]);
        scene.remove(row7[10]);
        scene.remove(row7[11]);
        scene.remove(row7[12]);
        scene.remove(row7[13]);
        scene.remove(row7[14]);
        
        scene.remove(row8[0]);
        scene.remove(row8[1]);
        scene.remove(row8[2]);
        scene.remove(row8[4]);
        scene.remove(row8[5]);
        scene.remove(row8[7]);
        scene.remove(row8[8]);
        scene.remove(row8[10]);
        scene.remove(row8[11]);
        scene.remove(row8[12]);
        scene.remove(row8[13]);
        scene.remove(row8[14]);
        
        scene.remove(row9[0]);
        scene.remove(row9[1]);
        scene.remove(row9[2]);
        scene.remove(row9[4]);
        scene.remove(row9[5]);
        scene.remove(row9[7]);
        scene.remove(row9[8]);
        scene.remove(row9[10]);
        scene.remove(row9[11]);
        scene.remove(row9[12]);
        scene.remove(row9[13]);
        scene.remove(row9[14]);
        
        scene.remove(row10[0]);
        scene.remove(row10[1]);
        scene.remove(row10[2]);
        scene.remove(row10[4]);
        scene.remove(row10[5]);
        scene.remove(row10[10]);
        scene.remove(row10[11]);
        scene.remove(row10[12]);
        scene.remove(row10[13]);
        scene.remove(row10[14]);
        i++;
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
