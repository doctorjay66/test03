//user interface module

function DigiRepGui(animations) {

	var controls = {

		gui: null
				
	};
	
	var init = function() {

		controls.gui = new dat.GUI();
		
		//controls.gui.add( controls, "anim_name", ['jump', 'run', 'kickr'] ).name('Action');
		controls.gui.add( controls, "setBall" ).name('Set Ball');
		controls.gui.add( controls, "shoot" ).name('Tiro');
		controls.gui.add( controls, "pass" ).name('Passa');
		controls.gui.add( controls, "cross" ).name('Cross');
		controls.gui.add( controls, "cross_head" ).name('Cross testa');
		controls.gui.add( controls, "start" );
		controls.gui.add( controls, "stop" );
		
	};
	
	/*var getAnimationData = function() {

		return {

			detail: {

			}

		};
	}*/
	
	controls.setBall = function() {
		/*var startEvent = new CustomEvent( 'set-ball-pos', getAnimationData() );
		window.dispatchEvent(startEvent);*/
		if(SELECTED_PLAYER) {
			ball.position.copy(SELECTED_PLAYER.position);
			//ball.position.
			ball.position.y = 0.3;
			SELECTED_PLAYER.has_ball = true;
		}		
	}
	
	controls.shoot = function() {
	    //user_action = KICK;
	    //createUserAction(KICK);
	    //user_action = MOVE;
	    //createUserAction(MOVE);
	    set_action_phase = true;
	    user_action = SHOOT;
	}
	
	controls.pass = function() {
		set_action_phase = true;
		user_action = PASS;
	}
	
	controls.cross = function() {
		set_action_phase = true;
		user_action = CROSS;
	}
	
	controls.cross_head = function() {
		set_action_phase = true;
		user_action = CROSS_HEAD;
	}
	
	controls.start = function() {

		/*var startEvent = new CustomEvent( 'start-animation', getAnimationData() );
		window.dispatchEvent(startEvent);*/
		SELECTED_PLAYER.material.opacity = 1;
		createUserAction();
		set_action_phase = false;
		START_PLAYING = true;

	};
	
	controls.stop = function() {
	    /*var startEvent = new CustomEvent( 'stop-animation', getAnimationData() );
	    window.dispatchEvent(startEvent);*/
	    START_PLAYING = false;
	}
	
	init.call(this);

}

/*****************************************************************
*when up, left, right key are pressed the player is moved, rotated
*/
/*function movePLayerByKey(k, p, d, b) {
	keyboard.update();
	if ( k.pressed("up") ) {
		p.translateZ(10*d);
		if(p && !up_pressed) { //set the run anim. for the grabbed moving player
			p.animations['run'].play(0, 1.0);
			up_pressed = true; 
			
		}
		running = true;
		if(p.has_ball) {
			
			b.position.x = p.position.x;
			b.position.z = p.position.z;
		}
	}
	if ( k.up("up") ) {
		p.animations['run'].stop();
		up_pressed = false;
	}
	if ( k.pressed("left") && p) {
		p.rotation.y += d;
	}
	if ( k.pressed("right") && p) {
		p.rotation.y -= d;
	}
}*/
	

