var camera, scene, renderer;

function init() {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor( '#b0c4de', 1 );
    renderer.autoClear = true;
    document.body.appendChild( renderer.domElement );
	scene = new THREE.Scene();
	var planeGeometry = new THREE.PlaneBufferGeometry(60*2, 40*2, 1, 1);
	var planeMaterial = new THREE.MeshLambertMaterial({color: 0x00ff00});
	plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.receiveShadow = true;
	plane.rotation.x = -1/2 * Math.PI; plane.position.x = 0; plane.position.y = 0; plane.position.z = 0;
	scene.add(plane);
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(200, 300, 140);
    spotLight.castShadow = true;
    scene.add(spotLight);
    var aspect = window.innerWidth / window.innerHeight;
	camera = new THREE.PerspectiveCamera( 45, aspect, 1, 10000 );
	camera.position.set( -25.0, 20.0, 70.0 );
	camera.lookAt(scene.position);
    scene.add(camera);
    animate();
}

function animate() {
    requestAnimationFrame( animate, renderer.domElement );
    
    renderer.render( scene, camera );
}
