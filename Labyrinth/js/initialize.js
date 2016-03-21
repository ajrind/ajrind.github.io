function init() 
{
	// SCENE
	scene = new THREE.Scene();

	// CAMERA
	var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 45
	ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT
	NEAR = 0.1
	FAR = 20000;
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	scene.add(camera);
	
	// RENDERER
	if ( Detector.webgl )
		renderer = new THREE.WebGLRenderer( {antialias:true} );
	else
		renderer = new THREE.CanvasRenderer(); 
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	renderer.shadowMapEnable = true;
	container = document.getElementById( 'ThreeJS' );
	container.appendChild( renderer.domElement );
	
	// EVENTS
	THREEx.WindowResize(renderer, camera);
	THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });

	// CONTROLS
	// ORBIT
    //controls = new THREE.OrbitControls(camera, renderer.domElement);

	// STATS
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.bottom = '0px';
	stats.domElement.style.zIndex = 100;
	container.appendChild( stats.domElement );
	
	// LIGHTS
	hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
	hemiLight.color.setHSL( 0.6, 1, 0.6 );
	hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
	hemiLight.position.set( 0, 500, 0 );
	scene.add( hemiLight );

	dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
	dirLight.color.setHSL( 0.1, 1, 0.95 );
	dirLight.position.set( -1, 1.75, 1 );
	dirLight.position.multiplyScalar( 50 );
	scene.add( dirLight );

	// FLOOR
	var floorTexture = new THREE.ImageUtils.loadTexture( 'textures/ground1.jpg' );
	floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
	floorTexture.repeat.set( 10, 10);
	var floorMaterial = new THREE.MeshLambertMaterial( { map: floorTexture, side: THREE.DoubleSide } );
	var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 0);
	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.position.y = 0;
	floor.rotation.x = Math.PI / 2;
	floor.receiveShadow = true;
	scene.add(floor);
	
	// SKYBOX/FOG
	//var skyBoxGeometry = new THREE.CubeGeometry( 500, 500, 500 );
	var skyBoxGeometry = new THREE.SphereGeometry( 2000, 32, 16 ); 
	var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } );
	skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
	
	scene.add(skyBox);
	initDayNightTweens() // for day night animation
	scene.fog = new THREE.FogExp2( 0x9999ff, 0.0001 );
	
	// MAP
	//Andrew
	//TODO: Get x dimension, z dimension, and map file from external source
	//TEMP: Hardcoded map
	/*
	map =  Map.getMap();
	xDim = Map.getXDim();
	zDim = Map.getZDim();
	*/
	var xDim = 15;
	var zDim = 15;
	var testMapWalls =[['6', '2', '2', '2', '2', '2', '2', '2', '2', '2', '2', '11', '2', '2', '5'],
				       ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1',  '0', '0', '1'],
					   ['1', '0', '6', '2', '2', '5', '0', '0', '6', '2', '2', '4',  '0', '0', '1'],
					   ['1', '0', '1', '0', '0', '1', '0', '0', '1', '0', '0', '0',  '0', '0', '1'],
					   ['1', '0', '1', '0', '2', '4', '0', '0', '1', '0', '6', '2',  '2', '2', '4'],
					   ['1', '0', '1', '0', '0', '0', '0', '0', '1', '0', '1', '0',  '0', '0', 'F'],
					   ['1', '0', '3', '2', '2', '5', '0', '2', '4', '0', '1', '0',  '0', '0', '1'],
					   ['1', '0', '0', '0', '0', '1', '0', '0', '0', '0', '1', '0',  '6', '2', '8'],
					   ['1', '0', '0', '6', '2', '8', '0', '2', '2', '2', '4', '0',  '1', '0', '1'],
					   ['1', '0', '0', '1', '0', '1', '0', '0', '0', '0', '0', '0',  '1', '0', '1'],
					   ['1', '0', '0', '1', '0', '1', '0', '6', '2', '2', '5', '0',  '1', '0', '1'],
					   ['1', '0', '0', '1', '0', '1', '0', '1', '0', '0', '1', '0',  '1', '0', '1'],
					   ['1', '0', '2', '4', '0', '1', '0', '1', '0', '2', '4', '0',  '0', '0', '1'],
					   ['1', '0', '0', '0', '0', '1', '0', '1', '0', '0', '0', '0',  '1', '0', '1'],
					   ['3', '2', '2', '2', '2', '9', '2', '9', '2', '2', '2', '2',  '9', '2', '4']];
					   
	buildLabyrinth(testMapWalls, xDim, zDim);

	////////////
	// CUSTOM //
	////////////
	var hitboxDim = 2;
	MovingCube = new THREE.Object3D();
	var hitboxMaterial = new THREE.MeshBasicMaterial( { color: 0xff88ff, opacity: 0, transparent: true } );
	var MovingCubeGeom = new THREE.CubeGeometry( hitboxDim, hitboxDim, hitboxDim);
	hitboxCube = new THREE.Mesh( MovingCubeGeom, hitboxMaterial );
	//var PointerCube = new THREE.Mesh(new THREE.CubeGeometry( 1,1,1), hitboxMaterial);
	//PointerCube.position.z = -hitboxDim/2;

	MovingCube.add(hitboxCube);
	//MovingCube.add(PointerCube);
	
	// TODO: Place the cube/camera at the starting position, looking into the labyrinth
	MovingCube.position.set(0, 25, 0); 
	scene.add( MovingCube );	

	initColorChange(skyBox);
}