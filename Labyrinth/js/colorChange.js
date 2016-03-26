/*
* The MIT License (MIT)
* Copyright (c) 2016 Andrew Rindfleisch  (http://ajrind.github.io)
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
* and associated documentation files (the "Software"), to deal in the Software without restriction, 
* including without limitation the rights to use, copy, modify, merge, publish, distribute, 
* sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is 
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in all copies or 
* substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT 
* NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
* DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var SkyAnimator = function (skyboxReference, scene) 
{
	this.scene = scene;
	this.mesh = skyboxReference;

	this.tints = [{r: 1,   g: 1,   b: 3  , o:0  },  // 12 AM Midnight
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

	this.totalHours = this.tints.length;

	this.hourLength = 300;
	this.currentHour = 14;
	this.nextHour = (this.currentHour + 1) % this.totalHours;
	this.timeElapsed = 0;

	this.skyRotationSpeed = Math.PI/(this.totalHours*this.hourLength*2);
	this.sunRevolutionSpeed = Math.PI/(this.totalHours*this.hourLength);
	

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
	this.starBox = new THREE.Mesh( starBoxGeometry, starBoxMaterial);
	this.starBox.rotation.y = Math.PI/3;
	this.starBox.rotation.z = Math.PI/3;
	this.scene.add( this.starBox );
	
	// initialize the opacity to the correct level
	this.mesh.material.transparent = true;	
	this.mesh.material.opacity = this.tints[this.currentHour].o;

	this.animateSky = function()
	{
		if (this.timeElapsed % this.hourLength === 0) // reached the end of the hour: set up the vars for the next hour
		{
			this.currentHour = this.nextHour;
			this.nextHour = this.calcNextHour();
			
			this.currentR = this.tints[this.currentHour].r * 100;
			this.currentG = this.tints[this.currentHour].g * 100;
			this.currentB = this.tints[this.currentHour].b * 100;
			this.currentO = this.tints[this.currentHour].o;

			this.nextR = this.tints[this.nextHour].r * 100;
			this.nextG = this.tints[this.nextHour].g * 100;
			this.nextB = this.tints[this.nextHour].b * 100;
			this.nextO = this.tints[this.nextHour].o;

			this.deltaR = (this.nextR - this.currentR)/this.hourLength;
			this.deltaG = (this.nextG - this.currentG)/this.hourLength;
			this.deltaB = (this.nextB - this.currentB)/this.hourLength;
			this.deltaO = (this.nextO - this.currentO)/this.hourLength;
			console.log("currentHour = ", this.currentHour);

			this.timeElapsed = 0; // to avoid overflow
		}

		else // animate the color change
		{
			// linear fade
			this.currentR += this.deltaR;
			this.currentG += this.deltaG;
			this.currentB += this.deltaB;
			this.currentO += this.deltaO;
			this.setColor(this.currentR/100, this.currentG/100, this.currentB/100, this.currentO/100);
		}
		
		// rotate the starbox
		this.starBox.rotation.x += this.skyRotationSpeed;
		this.timeElapsed++;
	};

	this.calcNextHour = function()
	{
		return (this.currentHour + 1) % this.totalHours;
	};

	this.setColor = function(r,g,b,o)
	{
		r = Math.floor(r);
		g = Math.floor(g);
		b = Math.floor(b);
		this.mesh.material.color.setRGB( r/255, g/255, b/255);
		this.mesh.material.opacity = o;
	};
};