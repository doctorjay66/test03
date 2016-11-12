var camera, scene, renderer, plane, ball, user_data = {}, shot_target_mesh, user_action,
    START_PLAYING = false, PLAYER_Y=4.5, BALL_Y = 0.3, PLAYERS = {}, set_action_phase = false, 
    mouse = new THREE.Vector2(), offset = new THREE.Vector3(), dest_point, head_point, j_dir = new THREE.Vector3(0,1,0),
    j_dest,
    READY=1, WAIT=0, OVER=-1, action_list = [], clock = new THREE.Clock(), 
    /*keyboard = new KeyboardState(),*/ up_pressed, running,
    START=1, STOP=0, KICK=3, RUN=2, MOVE=4, SHOOT=5, PASS=6, CROSS=7, CROSS_HEAD=8,
    INTERSECTED, LAST_SELECTED, SELECTED, SELECTED_PLAYER;

function init() {
    //window.addEventListener( 'keypressed', onKeyPressed );
    /*document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false );
    document.addEventListener('mouseup', onDocumentMouseUp, false );*/
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
    gui = new DigiRepGui();
    PLAYERS['p1'] = new THREE.PlayerChar();
    PLAYERS['p1'].load("../assets/models/figure_rigged_run_new.json", new THREE.Vector3(0, 0, 0), add_player);
    PLAYERS['p2'] = new THREE.PlayerChar();
    PLAYERS['p2'].load("../assets/models/figure_rigged_run_new.json", new THREE.Vector3(10, 0, 0), add_player);
    animate();
}

/*function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}*/

function onKeyPressed(event) {
    console.log(event.detail.action_sel);
}

function add_player(mesh, pos) {
    mesh.position.x = pos.x;
    mesh.position.y = PLAYER_Y;
    mesh.castShadow = true;
    scene.add( mesh );
}

function animate() {
    requestAnimationFrame( animate, renderer.domElement );
    var delta = clock.getDelta();
    //getUserAction();  
    //update_key();
    //movePLayerByKey(keyboard, SELECTED_PLAYER, delta, ball); //move, rotate the selected player
	//THREE.AnimationHandler.update( 0.8 );
	if(START_PLAYING) {
	    for(var curr_action=0;curr_action<action_list.length;curr_action++) {
	        executeIfReady(action_list[curr_action], delta);
	    }
	}
    renderer.render( scene, camera );
}
