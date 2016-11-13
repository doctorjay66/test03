function create_scene() {
    //window.addEventListener( 'keypressed', onKeyPressed );
    /*
*/
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
	var ballGeom = new THREE.SphereGeometry(0.6, 20, 20);
	var ballMat =  new THREE.MeshLambertMaterial({color: 0xffffff});
	ball = new THREE.Mesh(ballGeom, ballMat);
	ball.position.y = BALL_Y;
	scene.add(ball);
	shot_target_mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(14, 12, 1, 1), 
	                                  new THREE.MeshBasicMaterial({color: 0xffffff}));	
    shot_target_mesh.position.x = 60;
    shot_target_mesh.rotation.y = -0.5 * Math.PI;
    scene.add(shot_target_mesh);
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(200, 300, 140);
    spotLight.castShadow = true;
    scene.add(spotLight);
    var aspect = window.innerWidth / window.innerHeight;
	camera = new THREE.PerspectiveCamera( 45, aspect, 1, 10000 );
	camera.position.set( -45.0, 40.0, 30 );
	camera.lookAt(scene.position);
    scene.add(camera);    
    PLAYERS['p1'] = new THREE.PlayerChar();
    PLAYERS['p1'].load("figure_rigged_run_new.json", new THREE.Vector3(0, 0, 0), add_player);
    PLAYERS['p2'] = new THREE.PlayerChar();
    PLAYERS['p2'].load("figure_rigged_run_new.json", new THREE.Vector3(10, 0, 0), add_player);    
    //dest_point = new THREE.Vector3(20,0,20);
    animate();
}

function add_player(mesh, pos) {
    mesh.position.x = pos.x;
    mesh.position.y = PLAYER_Y;
    mesh.castShadow = true;
    scene.add( mesh );
    //SELECTED_PLAYER = PLAYERS['p1'];
}
