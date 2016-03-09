// Function to gradually change the color of the skybox to simulate 
// the passing of time (cycling between day and night)
var colorArray = [{r: 177, g: 1,   b: 67},   // 6 AM
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

var hourLength = 5000;	// in ms
var totalHours = 2;
var currentHour = 0; // hour of the day on which to start (MUST BE LESS THAN totalHours - 1)
var advanceToNextHour = true;
var colorTween;

var colors = [{r:0, g:91, b:183},
			  {r:72, g:164, b:255}];
function skyboxDayNightChange(time)
{
	TWEEN.update(time);
	if (advanceToNextHour === true)
	{
		// tween for the next hour length
		setTimeout(function()
		{
			advanceToNextHour = true;
			TWEEN.removeAll(); // change to remove only the one tween
			skyBox.material.color.setHex(0x000000);
		}, hourLength);
		advanceToNextHour = false;

		// set the skyBox color to the color achieved by tweening
		//skyBox.material.color.setHex(colors[currentHour]);

		// get rid of last tween


		// increment the hour
		currentHour = (currentHour + 1) % totalHours;
		

		console.log("Starting tween for hour ", currentHour);
		console.log("Next color: ", colors[currentHour])
		if (currentHour === 1)
		{

		colorTween = new TWEEN.Tween(skyBox.material.color)
	          			 	  .to({r:10, g:20, b:30}, hourLength * .9) // 9/10 to avoid timing issues
	            			  .easing(TWEEN.Easing.Quartic.In)
	            			  .start();
		}
		else
		{
			colorTween = new TWEEN.Tween(skyBox.material.color)
	          			 	  .to({r:72, g:164, b:255}, hourLength * .9) // 9/10 to avoid timing issues
	            			  .easing(TWEEN.Easing.Quartic.In)
	            			  .start();
		}
	}
}




var dayNightTweens = [];

function initDayNightTweens()
{
/*
	startTween = new TWEEN.Tween(skyBox.material.color)
						  .to({r:(255), g:100, b:0}, hourLength)
	            		  .easing(TWEEN.Easing.Quartic.In);
	currentHour = (currentHour + 1) % totalHours
	dayNightTweens.push(startTween);
	for (var i = 0; i < totalHours; i++)
	{
		nextTween = new TWEEN.Tween(skyBox.material.color)
							 .to({r:(255 - i*10), g:100, b:(i*10)}, hourLength)
	            		     .easing(TWEEN.Easing.Quartic.In);
		nextTween.chain(dayNightTweens[i]);
		dayNightTweens.push(nextTween);
		currentHour = (currentHour + 1) % totalHours
	}
	dayNightTweens[0].chain(dayNightTweens[totalHours - 1]); // chain together the first and last tweens
	dayNightTweens[0].start();
*/
	return true;
}
