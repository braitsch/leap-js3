
function LeapOrbs()
{
	var stage;
	var saturation = 150;
	var ringColor = '#777';
	var bkgdColor = '#EEE';
	var width = 3;
	var life = 30;
	var energy = 2;
	var rndmColor = true;
	var points = [];
	
	stage = new JS3('my-canvas');
	stage.background = bkgdColor;
	stage.setSize(window.innerWidth, window.innerHeight);
	stage.run(fadeRing);
	stage.interactive = false;
	stage.run(drawRing, 10/saturation);

	Object.defineProperty(this, "points", {set: function(a) {
		points = [];
		for (var i = a.length - 1; i >= 0; i--) points.push(a[i].tipPosition);
	}});

	function drawRing()
	{
		for (var i = points.length - 1; i >= 0; i--){
			var x = (window.innerWidth/2) + (points[i][0] * 2.2);
			var y = window.innerHeight - (points[i][1] * 1.35);
			var z = points[i][2];
			var k = new JS3Circle({fill:false, x:x, y:y, size:1});
				k.x1 = k.x;
				k.y1 = k.y;
				k.strokeColor = rndmColor ? JS3.getRandomColor() : ringColor;
				k.grow = energy;
		// calculate a mutliplier based on distance from screen //
				var m = z >= 0 ? 1 : (Math.abs(z) / 20);
				k.grow = energy * m;
				k.maxSize = life * m;
				k.strokeWidth = z >= 0 ? width : width *2;
			stage.addChild(k);
		};
	}

	function fadeRing()
	{
		for (var i = stage.numChildren - 1; i >= 0; i--){
			var k = stage.getChildAt(i);
			k.size+=k.grow;
			k.x = k.x1 - k.size/2;
			k.y = k.y1 - k.size/2;
			if (k.size > k.maxSize){
				k.alpha -= .2;
				if (k.alpha < 0) stage.removeChildAt(i);
			}
		};
	}
	
}
