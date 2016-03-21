/****************************************************
 * JavaScript to change the color of a mesh over
 * time. Used in this case to simulate the passing of 
 * day and night.
 ****************************************************/
var colors;
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

function initColorChange(meshReference)
{
	colors = [{r: 1,   g: 1,   b: 3  , o:0  },  // 12 AM Midnight
			  {r: 1,   g: 1,   b: 3  , o:0  },  // 1 AM
  			  {r: 1,   g: 1,   b: 3  , o:0  },  // 2 AM
  			  {r: 1,   g: 1,   b: 3  , o:0  },  // 3 AM
			  {r: 1,   g: 1,   b: 3  , o:0  },  // 4 AM
			  {r: 2,   g: 10,  b: 19 , o:10 },  // 5 AM
			  {r: 20,  g: 30,  b: 70 , o:30 },  // 6 AM
			  {r: 50,  g: 90,  b: 165, o:95 },  // 7 AM
			  {r: 100, g: 102, b: 173, o:100},  // 8 AM
			  {r: 120, g: 160, b: 216, o:100},  // 9 AM
			  {r: 133, g: 197, b: 231, o:100},  // 10 AM
			  {r: 133, g: 197, b: 231, o:100},  // 11 AM
			  {r: 133, g: 197, b: 231, o:100},  // 12 PM Noon
			  {r: 133, g: 197, b: 231, o:100},  // 1 PM
			  {r: 133, g: 197, b: 231, o:100},  // 2 PM
			  {r: 133, g: 197, b: 231, o:100},  // 3 PM
			  {r: 120, g: 160, b: 216, o:100},  // 4 PM
			  {r: 100, g: 102, b: 173, o:95 },  // 5 PM
			  {r: 50,  g: 90,  b: 165, o:50 },  // 6 PM
			  {r: 0,   g: 0,   b: 3  , o:0  },  // 7 PM
			  {r: 0,   g: 0,   b: 3  , o:0  },  // 8 PM
			  {r: 0,   g: 0,   b: 3  , o:0  },  // 9 PM
			  {r: 0,   g: 0,   b: 3  , o:0  },  // 10 PM
			  {r: 0,   g: 0,   b: 3  , o:0  }]; // 11 PM 

	/*
	colors = [{r: 0, g: 0,   b: 0},   // 6 AM
			  {r: 0,  g: 0,  b: 255}];  // 7 AM
			  */
	hourLength = 100;
	totalHours = colors.length;
	currentHour = 0;
	nextHour = calcNextHour();
	mesh = meshReference;
	console.log(mesh);
	mesh.material.transparent = true;	
}

var logged = false

function animateColor()
{
	if (timeElapsed % hourLength === 0) // reached the end of the hour: set up the vars for the next hour
	{
		//setColor(colors[currentHour].r, colors[currentHour].g, colors[currentHour].b);
		currentHour = nextHour;
		nextHour = calcNextHour();
		
		currentR = colors[currentHour].r * 100;
		currentG = colors[currentHour].g * 100;
		currentB = colors[currentHour].b * 100;
		currentO = colors[currentHour].o * 100;

		nextR = colors[nextHour].r * 100;
		nextG = colors[nextHour].g * 100;
		nextB = colors[nextHour].b * 100;
		nextO = colors[nextHour].o * 100;

		deltaR = (nextR - currentR)/hourLength;
		deltaG = (nextG - currentG)/hourLength;
		deltaB = (nextB - currentB)/hourLength;
		deltaO = (nextO - currentO)/hourLength;
		console.log("currentHour = ", currentHour);
		console.log(mesh);
		if (!logged)
		{
			//console.log("currentHour = ", currentHour);
			//console.log("currentR = ", currentR/100);
			//console.log("currentG = ", currentG/100);
			//console.log("currentB = ", currentB/100);
			/*
			console.log("nextR = ", nextR/100);
			console.log("nextG = ", nextG/100);
			console.log("nextB = ", nextB/100);

			console.log("deltaR = ", deltaR/100);
			console.log("deltaG = ", deltaG/100);
			console.log("deltaB = ", deltaB/100);

			*/
			//logged = true;
		}
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
	o = Math.floor(o);
	//console.log("Current color is: ", skyBox.material.color.getHexString())
	//console.log("Setting Color to: ", r/255, ", ", g/255, ", ", b/255)
	mesh.material.color.setRGB( r/255, g/255, b/255);
	mesh.material.opacity = o;
}