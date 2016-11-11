var width, height, clock, scene, camera, renderer;
var loader = new THREE.JSONLoader();
var ambientLight, mesh, action, mixer, fadeAction, clip;

function init() {
width  = window.innerWidth;
height = window.innerHeight;
clock  = new THREE.Clock();
scene  = new THREE.Scene();
camera = new THREE.PerspectiveCamera( 150, width / height, 1, 100 );
camera.position.set( 0, 1, 4 );
renderer = new THREE.WebGLRenderer();
renderer.setSize( width, height );
document.body.appendChild( renderer.domElement );

ambientLight = new THREE.AmbientLight( 0xffffff );
scene.add( ambientLight );

loader.load( 'figure_rigged_run_new.json', function( geometry, materials ) {
    var mat = new THREE.MeshLambertMaterial( { color: 0xFF0000, skinning: true } );
    mesh = new THREE.SkinnedMesh(
        geometry,
        mat
    );
    
    clip = mesh.geometry.animations[2];
    //mixer = new THREE.AnimationMixer( mesh );
    //mixer.addAction( action.run );
    mixer = new THREE.AnimationMixer( mesh );
    action = mixer.clipAction(clip);
    action.play();
    scene.add( mesh );

} );
animate();
}

function animate() {
    requestAnimationFrame( animate );
    var delta = clock.getDelta();
    if ( mixer ) { mixer.update( delta ); }
    renderer.render( scene, camera );
}
