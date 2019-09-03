var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
var container = document.getElementById('canvas');
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor((Math.random() * 0xffffff),1);
container.appendChild(renderer.domElement);

var cylinder1 = new THREE.CylinderGeometry( 0, .1, 2, 32 );
var material = new THREE.MeshBasicMaterial( { color: (0xffffff),wireframe: false } );
var cylinder1 = new THREE.Mesh( cylinder1, material );
cylinder1.rotateZ( Math.PI / 8 );
scene.add( cylinder1 );
cylinder1.position.set(0, 1, 0);

var cylinder2 = new THREE.CylinderGeometry( .1, .1, 1, 32 );
var cylinder2 = new THREE.Mesh( cylinder2, material );
cylinder2.rotateZ( -(Math.PI / 2) );
scene.add( cylinder2 );
cylinder2.position.set(0, 0, 0);

var cylinder3 = new THREE.CylinderGeometry( .1, 0, 3, 32 );
var cylinder3 = new THREE.Mesh( cylinder3, material );
cylinder3.rotateZ( Math.PI / 8 );
scene.add( cylinder3 );
cylinder3.position.set(0, -1.5, 0);

camera.position.z = 5;

function render() {
    requestAnimationFrame( render );
    cylinder1.rotation.y += 0.03;
    cylinder2.rotation.y += 0.03;
    cylinder3.rotation.y += 0.03;
    renderer.render( scene, camera );
}
render();
