function createUserAction(/*user_action*/) {
    
    if(user_action == SHOOT) {
        var a = {};
        //console.log(a);
        setAction(a, {'name':'kickr', 'mesh':SELECTED_PLAYER, 'dest':dest_point, 'state':READY, 
                      'd_source':ball.position, 'to_activate':[1]});
        
        var a = {};
        var b_dest = new THREE.Vector3(0,0,0);
        b_dest.copy(dest_point);
        b_dest.y = BALL_Y;//mid_spline_point.add(dist_vect.divideScalar(2));
        setAction(a, {'name':'move', 'mesh':ball, 'dest':b_dest, 'state':WAIT, 
                      'd_source':ball.position, speed:30});
    } else if(user_action == PASS) {
        var a = {};
        setAction(a, {'name':'kickr', 'mesh':SELECTED_PLAYER, 'dest':dest_point, 'state':READY, 
                      'd_source':ball.position, 'to_activate':[1,2]});
        
        var a = {};
        var b_dest = new THREE.Vector3(0,0,0);
        b_dest.copy(dest_point);
        b_dest.y = BALL_Y;
        setAction(a, {'name':'move', 'mesh':ball, 'dest':b_dest, 'state':WAIT, 
                      'd_source':ball.position, speed:10});

        var a = {};
        var p_dest = new THREE.Vector3(0,0,0);
        p_dest.copy(dest_point);
        p_dest.y = PLAYER_Y;
        setAction(a, {'name':'run', 'mesh':PLAYERS['p2'], 'dest':p_dest, 'state':WAIT, 
                      'd_source':PLAYERS['p2'].position, speed:10});
    } else if(user_action == CROSS) {
        var a = {};
        setAction(a, {'name':'kickr', 'mesh':SELECTED_PLAYER, 'dest':dest_point, 'state':READY, 
                      'd_source':ball.position, 'to_activate':[1,2]});
		setCrossAction();
        var a = {};
        var p_dest = new THREE.Vector3(0,0,0);
        p_dest.copy(dest_point);
        p_dest.y = PLAYER_Y;
        setAction(a, {'name':'run', 'mesh':PLAYERS['p2'], 'dest':p_dest, 'state':WAIT, 
                      'd_source':PLAYERS['p2'].position, speed:10});
    } else if(user_action == CROSS_HEAD) {
        var a = {};
        setAction(a, {'name':'kickr', 'mesh':SELECTED_PLAYER, 'dest':dest_point, 'state':READY, 
                      'd_source':ball.position, 'to_activate':[1,2]});
		setCrossAction(true);
        var a = {};
        var p_dest = new THREE.Vector3(0,0,0);
        p_dest.copy(dest_point);
        p_dest.y = PLAYER_Y;        
        setAction(a, {'name':'run', 'mesh':PLAYERS['p2'], 'dest':p_dest, 'state':WAIT, 
                      'd_source':PLAYERS['p2'].position, speed:10, 'to_activate':[3]});
        var a = {};
        j_dest = new THREE.Vector3(60,PLAYER_Y,3);
        head_point = new THREE.Vector3(0,0,0);
        head_point.copy(p_dest);
        head_point.y = 8;
        console.log(head_point);
        setAction(a, {'name':'jump', 'mesh':PLAYERS['p2'], 'dest':head_point, 'state':WAIT, 
                      'd_source':p_dest, speed:2});
    }
}

function setAction(a, p) {
	a.name = p.name;
	console.log(a.name);
	a.mesh = p.mesh;
		//console.log(a.mesh);
	a.state = p.state
	a.is_playing = false;
	a.id = action_list.length;
	a.dest = p.dest;
	a.dir = direction(a.dest, p.d_source);
	a.speed = p.speed || 10;
	a.to_activate = p.to_activate;
	/*if(p.to_activate) { //actions to activate when this action is over
		a.active_list = [];
		for(var i=0;i<p.to_activate.length;i++) {
			a.active_list.push(p.to_activate[i]);
		}
	}*/
	a.elapsed_time = 0;
	action_list.push(a);
}

function setCrossAction(h) {
    var a = {}, 
        mid_spline_point = new THREE.Vector3(0, 0, 0), 
        dist_vect = new THREE.Vector3(0, 0, 0),
        dest = new THREE.Vector3(0,0,0);
    a.name = "cross";
    a.mesh = ball;
    dest.copy(dest_point); 
    if(h) {
    	dest.y = 10;
    } else {
    	dest.y = BALL_Y;
    }
    a.dest = dest;
    dist_vect.subVectors(dest, ball.position);
    mid_spline_point.add(ball.position);
    mid_spline_point.add(dist_vect.divideScalar(2));
    mid_spline_point.y = 12;
    a.spline = new THREE.SplineCurve3([ball.position, mid_spline_point, dest]);
    a.speed = 0.4;
    a.step = 0;
    a.state = WAIT;
    action_list.push(a);
}

function direction(p1, p2) {
    var dir = new THREE.Vector3(0, 0, 0);

    dir.subVectors(p1, p2);
    dir.normalize();
    return dir;
}
