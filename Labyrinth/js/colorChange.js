/****************************************************
 * JavaScript to change the color of a mesh over
 * time. Used in this case to simulate the passing of 
 * day and night.
 ****************************************************/
var colors;
var hourLength;	// in ms
var totalHours; // number of colors in colors
var currentHour // hour of the day on which to start
var nextHour;
var timeElapsed = 0;
var currentR;
var currentG;
var currentB;
var nextR;
var nextG;
var nextB;
var deltaR;
var deltaG;
var deltaB;

function initColorChange(materialReference)
{
		console.log(skyBox);
	colors = [{r: 177, g: 1,   b: 67},   // 6 AM
			  {r: 40,  g: 10,  b: 214},  // 7 AM
			  {r: 5,   g: 102, b: 173},  // 8 AM
			  {r: 5,   g: 102, b: 173},  // 9 AM
			  {r: 56,  g: 160, b: 216},  // 10 AM
			  {r: 102, g: 182, b: 225},  // 11 AM
			  {r: 133, g: 197, b: 231},  // 12 PM Noon
			  {r: 102, g: 182, b: 225},  // 1 PM
			  {r: 56,  g: 160, b: 216},  // 2 PM
			  {r: 5,   g: 102, b: 173},  // 3 PM
			  {r: 244, g: 102, b: 17 },  // 4 PM
			  {r: 240, g: 4,   b: 11 }]; // 5 PM
	/*
	colors = [{r: 0, g: 0,   b: 0},   // 6 AM
			  {r: 0,  g: 0,  b: 255}];  // 7 AM
			  */
	hourLength = 100;
	totalHours = colors.length;
	currentHour = 6;
	nextHour = calcNextHour();
	material = materialReference;
	console.log("totalHours = ", totalHours);
	console.log(colors);
}

var logged = false

function animateColor()
{
	if (timeElapsed % hourLength === 0) // reached the end of the hour: set up the vars for the next hour
	{
		setColor(colors[currentHour].r, colors[currentHour].g, colors[currentHour].b);
		currentHour = nextHour;
		nextHour = calcNextHour();
		
		currentR = colors[currentHour].r * 100;
		currentG = colors[currentHour].g * 100;
		currentB = colors[currentHour].b * 100;

		nextR = colors[nextHour].r * 100;
		nextG = colors[nextHour].g * 100;
		nextB = colors[nextHour].b * 100;

		deltaR = (nextR - currentR)/hourLength;
		deltaG = (nextG - currentG)/hourLength;
		deltaB = (nextB - currentB)/hourLength;
		
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

	else if (0)// animate the color change
	{ 
		// linear fade
		currentR += deltaR;
		currentG += deltaG;
		currentB += deltaB;
		setColor(currentR/100, currentG/100, currentB/100);
	}

	timeElapsed++;
}

function calcNextHour()
{
	return (currentHour + 1) % totalHours;
}

function setColor(r,g,b)
{
	r = Math.floor(r);
	g = Math.floor(g);
	b = Math.floor(b);
	console.log("Current color is: ", skyBox.material.color.getHexString())
	console.log("Setting Color to: ", r, ", ", g, ", ", b)
	skyBox.material.color.setRGB( r, g, b);
}