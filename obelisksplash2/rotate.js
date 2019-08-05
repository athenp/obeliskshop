var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var textureLoader = new THREE.TextureLoader();

var texture0 = textureLoader.load( './obelback.png' );
var texture1 = textureLoader.load( './obelbottom.png' );
var texture2 = textureLoader.load( './obelfront.png' );
var texture3 = textureLoader.load( './obelleft.png' );
var texture4 = textureLoader.load( './obelright.png' );
var texture5 = textureLoader.load( './obeltop.png' );

var materials = [
                 new THREE.MeshBasicMaterial( { map: texture0 } ),
                 new THREE.MeshBasicMaterial( { map: texture1 } ),
                 new THREE.MeshBasicMaterial( { map: texture2 } ),
                 new THREE.MeshBasicMaterial( { map: texture3 } ),
                 new THREE.MeshBasicMaterial( { map: texture4 } ),
                 new THREE.MeshBasicMaterial( { map: texture5 } )
                 ];
var faceMaterial = new THREE.MeshFaceMaterial( materials );

var geometry = new THREE.BoxGeometry( 1, 3, 1 );
var boxMesh = new THREE.Mesh( geometry, faceMaterial );
scene.add( cube );

camera.position.z = 5;

function render() {
    requestAnimationFrame( render );
    cube.rotation.x += 0.0;
    cube.rotation.y += 0.02;
    renderer.render( scene, camera );
}
render();
