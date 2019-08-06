var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 3, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

var geometry = new THREE.CylinderGeometry( .5, .5, 1.1, 32 );
var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
var cylinder = new THREE.Mesh( geometry, material );
cylinder.rotateX( Math.PI / 2 );
scene.add( cylinder );

camera.position.z = 5;

function render() {
    requestAnimationFrame( render );
    cube.rotation.x += 0.0;
    cube.rotation.y += 0.05;
    cylinder.rotation.z += -0.05;
    cylinder.rotation.y += 0.0;
    renderer.render( scene, camera );
}
render();
