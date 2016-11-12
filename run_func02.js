function executeIfReady(a, delta) {
	
		if(a.state == READY  && a.name == 'kickr') {
		    a.elapsed_time += delta;
		    if(!a.is_playing) {
		        mixer = new THREE.AnimationMixer( a.mesh );
		        clip = a.mesh.geometry.animations[1]; //2=run, 0=jump, 1=kick
		        action = mixer.clipAction(clip);
		        action.play();
		        setAngleTo(a, "xz");
		        a.mesh.rotation.y = a.mesh.angle_to;
		        a.is_playing = true;
		    }
		    //console.log(a.mesh.animations[a.name].currentTime);
		    //if(a.mesh.geometry.animations[1].currentTime > 0.66) {
		    if(a.elapsed_time > 0.66) {
		        //a.mesh.animations[a.name].stop();
		        action.stop();
		        a.state = OVER;
		        //console.log(action_list[a.id+1].name);
		        //action_list[a.id+1].state = READY;
		        activateAction(a);
		    }
		} else if(a.name == 'move') {
		    if(arriveTo(a.mesh.position, a.dest, d=0.9)) {
		        setEnd(a);		        
		    } else {
	            move_mash(a.mesh, a.dir, a.speed, delta)
	        }
		} 
}

function activateAction(a) {
	for(var i=0;i<a.to_activate.length;i++) {
	   	action_list[a.to_activate[i]].state = READY;
    }
}

function setEnd(a) {
    a.state = OVER;
    a.mesh.position.x = a.dest.x;
    a.mesh.position.z = a.dest.z;
    //a.mesh.action = a.id;
    //a.mesh.dispatchEvent({type:'end'});	//rise an action end event
    //console.log(a.dest);
}

function setAngleTo(a, plane, dir) {
	var z_orient,
	    ang_to;
	    
	if(plane == "xz") {
		z_orient = new THREE.Vector3(0, 0, 1); //a.mesh.orient;
		if(dir) {
		    ang_to = z_orient.angleTo(dir);
		} else {
		   ang_to = z_orient.angleTo(a.dir);
		}		    
	}
	//a.mesh.position = z_orient;
	ang_to = a.dir.x < 0 ? -ang_to : ang_to;
	a.mesh.angle_to = ang_to;
}

var arriveTo = function(from, to, d=0.3) {
	//console.log(from.distanceTo(to));
	//console.log(from);
	//console.log(to);
	if(from.distanceTo(to) < d) {
		//console.log(true);
		return true;
	} else {
		return false;
	}
};

function move_mash(mesh, dir, speed, delta) {    
    mesh.position.x += dir.x * speed * delta;
    mesh.position.y += dir.y * speed * delta;
    mesh.position.z += dir.z * speed * delta;
}

function move_spline(a, delta) {
    a.step += delta * a.speed;
    a.mesh.position.x = a.spline.getPoint(a.step).x
    a.mesh.position.y = a.spline.getPoint(a.step).y;
    a.mesh.position.z = a.spline.getPoint(a.step).z;
}
