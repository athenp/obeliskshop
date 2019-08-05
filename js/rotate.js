var scene = new THREE.Scene();
scene.background = new THREE.Color( 0x000000 );
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var loader = new THREE.CubeTextureLoader();
loader.setPath( './' );

var textureCube = loader.load( [
                                '1.png', '2.png',
                                '3.png', '4.png',
                                '5.png', '6.png'
                                ] );

var material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

function render() {
    requestAnimationFrame( render );
    cube.rotation.x += 0.0;
    cube.rotation.y += 0.05;
    renderer.render( scene, camera );
}
render();
