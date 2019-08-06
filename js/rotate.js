var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var jsonLoader = new THREE.JSONLoader();
jsonLoader.load("object.json", addModelToScene);

function addModelToScene(geometry, materials) {
    var material = new THREE.MeshFaceMaterial(materials);
    var object = new THREE.Mesh(geometry, material);
    object.scale.set(10, 10, 10);
    scene.add(object);
}

camera.position.z = 5;

function render() {
    requestAnimationFrame( render );
    object.rotation.x += 0.0;
    object.rotation.y += 0.05;
    renderer.render( scene, camera );
}
render();
