var colors;
var starBox;
var hourLength;	 // in ms
var totalHours;  // number of colors in colors
var currentHour; // hour of the day on which to start
var nextHour;
var timeElapsed = 0;
var currentR;
var currentG;
var currentB;
var currentO;
var nextR;
var nextG;
var nextB;
var nextO;
var deltaR;
var deltaG;
var deltaB;
var deltaO;
var mesh;
var rotationSpeed;
var theSun;

function initColorChange(meshReference)
{
	colors = [{r: 1,   g: 1,   b: 3  , o:0  },  // 12 AM Midnight
			  {r: 1,   g: 1,   b: 3  , o:0  },  // 1 AM
  			  {r: 1,   g: 1,   b: 3  , o:0  },  // 2 AM
  			  {r: 1,   g: 1,   b: 3  , o:0  },  // 3 AM
			  {r: 2,   g: 10,  b: 19 , o:10 },  // 4 AM
			  {r: 20,  g: 30,  b: 70 , o:30 },  // 5 AM
			  {r: 35,  g: 50,  b: 100, o:45 },  // 6 AM
			  {r: 50,  g: 90,  b: 165, o:80 },  // 7 AM
			  {r: 100, g: 102, b: 173, o:100},  // 8 AM
			  {r: 120, g: 160, b: 216, o:100},  // 9 AM
			  {r: 133, g: 197, b: 231, o:100},  // 10 AM
			  {r: 133, g: 197, b: 231, o:100},  // 11 AM
			  {r: 133, g: 197, b: 231, o:100},  // 12 PM Noon
			  {r: 133, g: 197, b: 231, o:100},  // 1 PM
			  {r: 133, g: 197, b: 231, o:100},  // 2 PM
			  {r: 133, g: 197, b: 231, o:100},  // 3 PM
			  {r: 120, g: 160, b: 216, o:90},  // 4 PM
			  {r: 100, g: 102, b: 173, o:60 },  // 5 PM
			  {r: 50,  g: 90,  b: 165, o:30 },  // 6 PM
			  {r: 25,  g: 45,  b: 75 , o:10 },  // 7 PM
			  {r: 0,   g: 0,   b: 3  , o:5  },  // 8 PM
			  {r: 0,   g: 0,   b: 3  , o:0  },  // 9 PM
			  {r: 0,   g: 0,   b: 3  , o:0  },  // 10 PM
			  {r: 0,   g: 0,   b: 3  , o:0  }]; // 11 PM 

	hourLength = 300;
	rotationSpeed = Math.PI/(75*hourLength);
	totalHours = colors.length;
	currentHour = 14;
	nextHour = calcNextHour();
	mesh = meshReference;
	
	// initialize the opacity level
	mesh.material.transparent = true;	
	mesh.material.opacity = colors[currentHour].o;

	// Create the starbox
	var materialArray = [];
	materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'textures/sky/nightSky_right1.png' ), side: THREE.BackSide }));
	materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'textures/sky/nightSky_left2.png' ), side: THREE.BackSide }));
	materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'textures/sky/nightSky_top3.png' ), side: THREE.BackSide }));
	materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'textures/sky/nightSky_bottom4.png' ), side: THREE.BackSide }));
	materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'textures/sky/nightSky_front5.png' ), side: THREE.BackSide }));
	materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'textures/sky/nightSky_back6.png' ), side: THREE.BackSide }));

	for (var i = 0; i < materialArray.length; i++)
	{
		materialArray[i].wrapS = materialArray[i].wrapT = THREE.RepeatWrapping;
	}
	var starBoxMaterial = new THREE.MeshFaceMaterial(materialArray);
	var starBoxGeometry = new THREE.CubeGeometry( 4096, 4096, 4096, 1, 1, 1, materialArray );
	starBox = new THREE.Mesh( starBoxGeometry, starBoxMaterial);
	starBox.rotation.y = Math.PI/3;
	starBox.rotation.z = Math.PI/3;
	scene.add( starBox );

	// Light sourece for the sun


}


function animateSky()
{
	if (timeElapsed % hourLength === 0) // reached the end of the hour: set up the vars for the next hour
	{
		currentHour = nextHour;
		nextHour = calcNextHour();
		
		currentR = colors[currentHour].r * 100;
		currentG = colors[currentHour].g * 100;
		currentB = colors[currentHour].b * 100;
		currentO = colors[currentHour].o;

		nextR = colors[nextHour].r * 100;
		nextG = colors[nextHour].g * 100;
		nextB = colors[nextHour].b * 100;
		nextO = colors[nextHour].o

		deltaR = (nextR - currentR)/hourLength;
		deltaG = (nextG - currentG)/hourLength;
		deltaB = (nextB - currentB)/hourLength;
		deltaO = (nextO - currentO)/hourLength;
		console.log("currentHour = ", currentHour);

		timeElapsed = 0 // to avoid overflow
	}

	else // animate the color change
	{ 
		// linear fade
		currentR += deltaR;
		currentG += deltaG;
		currentB += deltaB;
		currentO += deltaO;
		setColor(currentR/100, currentG/100, currentB/100, currentO/100);
	}

	
	starBox.rotation.x += rotationSpeed;
	timeElapsed++;
}

function calcNextHour()
{
	return (currentHour + 1) % totalHours;
}

function setColor(r,g,b,o)
{
	r = Math.floor(r);
	g = Math.floor(g);
	b = Math.floor(b);
	//console.log("Current color is: ", skyBox.material.color.getHexString())
	//console.log("Setting Color to: ", r/255, ", ", g/255, ", ", b/255)
	mesh.material.color.setRGB( r/255, g/255, b/255);
	mesh.material.opacity = o;
}