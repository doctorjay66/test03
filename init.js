var camera, scene, renderer, plane, ball, user_data = {}, shot_target_mesh, user_action,
    START_PLAYING = false, PLAYER_Y=4.5, BALL_Y = 0.3, PLAYERS = {}, set_action_phase = false, 
    mouse = new THREE.Vector2(), offset = new THREE.Vector3(), dest_point, head_point, j_dir = new THREE.Vector3(0,1,0),
    j_dest, mixer_kick, mixer_run, clip_kick, clip_run, 
    READY=1, WAIT=0, OVER=-1, action_list = [], clock = new THREE.Clock(), 
    /*keyboard = new KeyboardState(),*/ up_pressed, running,
    START=1, STOP=0, KICK=3, RUN=2, MOVE=4, SHOOT=5, PASS=6, CROSS=7, CROSS_HEAD=8,
    INTERSECTED, LAST_SELECTED, SELECTED, SELECTED_PLAYER;

function init() {
    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false );
    document.addEventListener('mouseup', onDocumentMouseUp, false );
    gui = new DigiRepGui();
    create_scene();
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


function animate() {
    requestAnimationFrame( animate, renderer.domElement );
    var delta = clock.getDelta();
    //getUserAction();  
    //update_key();
    //movePLayerByKey(keyboard, SELECTED_PLAYER, delta, ball); //move, rotate the selected player
	//THREE.AnimationHandler.update( 0.8 );
	if ( mixer_kick ) { mixer_kick.update( delta ); }
	if ( mixer_run ) { mixer_run.update( delta ); }
	if(START_PLAYING) {
	    for(var curr_action=0;curr_action<action_list.length;curr_action++) {
	        executeIfReady(action_list[curr_action], delta);
	    }
	}
    renderer.render( scene, camera );
}
