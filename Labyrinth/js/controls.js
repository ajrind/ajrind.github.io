function getMovement(ncmazw,lb)
{
	var delta = clock.getDelta(); // seconds.
	var moveDistance = 100 * delta; // 300 pixels per second
	var rotateAngle = Math.PI / 2 * delta;   // pi/2 radians (90 degrees) per second
	
	var oldX = MovingCube.position.x;
	var oldY = MovingCube.position.y;
	var oldZ = MovingCube.position.z;

	// local transformations
	// move forwards/backwards/left/right
	if ( keyboard.pressed("W") )
		MovingCube.translateZ( -moveDistance );
	if ( keyboard.pressed("S") )
		MovingCube.translateZ(  moveDistance );
	if ( keyboard.pressed("Q") )
		MovingCube.translateX( -moveDistance );
	if ( keyboard.pressed("E") )
		MovingCube.translateX(  moveDistance );
	if ( keyboard.pressed('space') )
		MovingCube.translateY( moveDistance );
	if ( keyboard.pressed("N") )
		MovingCube.translateY( -moveDistance);

	var xCurrentMapCoord = Math.floor(MovingCube.position.x / lb.xLen + ncmaze.xDim/2 + 0.5); // the +0.5 makes it so we're measuring from the top right corner of the square, not the center
	var zCurrentMapCoord = Math.floor(MovingCube.position.z / lb.zLen + ncmaze.yDim/2 + 0.5);

	if ( keyboard.pressed("P") ) // test 
	{
		//console.log(camera.position);
		/*
		var paused = true;
		var teapotTexture = new THREE.ImageUtils.loadTexture( 'textures/goldGlitter.png' );
		teapotTexture.wrapS = teapotTexture.wrapT = THREE.RepeatWrapping;
		teapotTexture.repeat.set( 1, 1);
		var teapotMaterial = new THREE.MeshPhongMaterial( { map: teapotTexture } );
		console.log("Attempting to change material to:");
		console.log(teapotMaterial);
		lb.setWallTexture(teapotMaterial);
		minimap.changeMapMaterial(new THREE.MeshBasicMaterial( {color: 0xcc2222} ));
		
		console.log("Sun position:")
		console.log(skyAnimator.theSun.children[0])
		*/
		//console.log("xDim:",ncmaze.xDim)
		//console.log(ncmaze);
		//console.log(lb);
		//console.log("wallMap:");
		//console.log(ncmaze.maze);
		console.log("x:",xCurrentMapCoord);
		//console.log("y:",MovingCube.position.y);
		console.log("z:",zCurrentMapCoord);

		//console.log("")
		console.log("Map:",ncmaze.maze[zCurrentMapCoord][xCurrentMapCoord]);
		console.log("'S' !==",ncmaze.maze[zCurrentMapCoord][xCurrentMapCoord], "is", ncmaze.maze[zCurrentMapCoord][xCurrentMapCoord] !== 'S')
	}

	// the player tried to move into a wall. send back to current position
	if ((ncmaze.maze[zCurrentMapCoord][xCurrentMapCoord] !== '0' &&
		ncmaze.maze[zCurrentMapCoord][xCurrentMapCoord] !== 'S'  &&
		ncmaze.maze[zCurrentMapCoord][xCurrentMapCoord] !== 'F') &&
		lb.yLen > MovingCube.position.y)
	{
		//console.log(ncmaze.maze[zCurrentMapCoord][xCurrentMapCoord])
		MovingCube.position.x = oldX;
		MovingCube.position.y = oldY;
		MovingCube.position.z = oldZ;
	}


	// rotate left/right
	var rotation_matrix = new THREE.Matrix4().identity();
	if ( keyboard.pressed("A") )
	{
		MovingCube.rotateOnAxis( new THREE.Vector3(0,1,0), rotateAngle);
		camera.rotateOnAxis( new THREE.Vector3(0,1,0), rotateAngle);
	}
	if ( keyboard.pressed("D") )
	{
		MovingCube.rotateOnAxis( new THREE.Vector3(0,1,0), -rotateAngle);
		camera.rotateOnAxis( new THREE.Vector3(0,1,0), -rotateAngle);
	}

	// rotate up/down *DISABLE*
	if ( keyboard.pressed("R") )
	{
		MovingCube.rotateOnAxis( new THREE.Vector3(1,0,0), rotateAngle);
		camera.rotateOnAxis( new THREE.Vector3(1,0,0), rotateAngle);
	}
	if ( keyboard.pressed("F") )
	{
		MovingCube.rotateOnAxis( new THREE.Vector3(1,0,0), -rotateAngle);
		camera.rotateOnAxis( new THREE.Vector3(1,0,0), -rotateAngle);
	}
	
	// TODO: Menu toggle button
	if ( keyboard.pressed("Z") )
	{
		MovingCube.position.set(startX,25,startZ);
		MovingCube.rotation.set(0,0,0);
		camera.rotation.set(0,0,0);
	}
}