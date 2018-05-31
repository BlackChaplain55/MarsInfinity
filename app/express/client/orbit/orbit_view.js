
var orbit; 

var main = function () {
"use strict";
	var w=0;

	var plot = function() {
      	var canvas = document.getElementById('canvas');
      	var ctx = canvas.getContext('2d');
      	var canvas_height 	= canvas.height;
      	var canvas_width	= canvas.width;
      	var cy=canvas_height/2;
      	var cx=canvas_width/2;

      	ctx.clearRect(0, 0, canvas_width, canvas_height);

      	ctx.fillStyle = "#e06f2b";             // разные способы задания цвета заливки
		ctx.lineWidth = 4; 
 		ctx.strokeStyle = "#e0bc2b";
      	ctx.beginPath();
      	ctx.setLineDash([]);
		ctx.arc(cx,  cy, 80, 0, Math.PI*2, true);
		//ctx.fillStyle = "orange";
		ctx.fill();
		//ctx.beginPath();
		//ctx.arc(200,  200, 30, 0, Math.PI*2, true);
		ctx.stroke();

		ctx.lineWidth = 1; 
 		ctx.strokeStyle = "#ffffff";
 		ctx.setLineDash([3]);

      	ctx.beginPath();      	
      	ctx.ellipse(cx, cy, 78, 39, DegToRad(27), 2 * Math.PI, Math.PI);
      	ctx.stroke();

      	ctx.beginPath();      	
      	ctx.ellipse(cx, cy, 78, 39, DegToRad(117), 2 * Math.PI, Math.PI);
      	ctx.stroke();

      	ctx.beginPath();      	
      	ctx.ellipse(cx+Math.sin(27)*20, cy-39, Math.sin(45)*78, 30, DegToRad(27), 2 * Math.PI, Math.PI);
      	ctx.stroke();

      	ctx.beginPath();      	
      	ctx.ellipse(cx-Math.sin(27)*20, cy+39, Math.sin(45)*78, 28, DegToRad(27), 2 * Math.PI, Math.PI);
      	ctx.stroke();

      	ctx.beginPath();
      	ctx.moveTo(cx+Math.sin(DegToRad(-27))*100, cy+Math.cos(DegToRad(-27))*100);
		ctx.lineTo(cx-Math.sin(DegToRad(-27))*100,  cy-Math.cos(DegToRad(-27))*100);
		ctx.stroke();

		//ctx.beginPath();
      	//ctx.moveTo(0, cy);
		//ctx.lineTo(canvas_height, cy);
		//ctx.stroke();

		//ctx.beginPath();
      	//ctx.moveTo(cx+Math.sin(DegToRad(-45))*1000, cy+Math.cos(DegToRad(-45))*1000);
		//ctx.lineTo(cx-Math.sin(DegToRad(-45))*1000,  cy-Math.cos(DegToRad(-45))*1000);
		//ctx.stroke();

      	//ctx.beginPath();      	
      	//ctx.ellipse(cx-39, cy+Math.sin(27), Math.sin(45)*78, 30, DegToRad(117), 2 * Math.PI, Math.PI);
      	//ctx.stroke();

      	//ctx.beginPath();      	
      	//ctx.ellipse(cx+39, cy+Math.sin(27)*20, Math.sin(45)*78, 30, DegToRad(117), 2 * Math.PI, Math.PI);
      	//ctx.stroke();

      	ctx.strokeStyle = "#e58f2f";

      	ctx.beginPath();      	
      	ctx.ellipse(cx, cy, 78, 39, DegToRad(27), Math.PI, 2*Math.PI);
      	ctx.stroke();

      	ctx.beginPath();      	
      	ctx.ellipse(cx, cy, 78, 39, DegToRad(117), Math.PI, 2*Math.PI);
      	ctx.stroke();

      	//ctx.beginPath();      	
      	//ctx.ellipse(cx-39, cy, Math.sin(45)*78, 30, DegToRad(117),  Math.PI, 2*Math.PI);
      //	ctx.stroke();

      	//ctx.beginPath();      	
      	//ctx.ellipse(cx+39, cy, Math.sin(45)*78, 30, DegToRad(117),  Math.PI, 2*Math.PI);
      	//ctx.stroke();

      	ctx.beginPath();      	
      	ctx.ellipse(cx+Math.sin(27)*20, cy-39, Math.sin(45)*78, 30, DegToRad(27), Math.PI, 2 * Math.PI);
      	ctx.stroke();
      	
      	ctx.beginPath();      	
      	ctx.ellipse(cx-Math.sin(27)*20, cy+39, Math.sin(45)*78, 30, DegToRad(27), Math.PI, 2 * Math.PI);
      	ctx.stroke();

		ctx.strokeStyle = "#008899";
		ctx.setLineDash([2,2]);
		ctx.lineWidth = 1;
		ctx.beginPath();
		//console.log(w);
		ctx.ellipse(cx, cy, orbit.a/50, orbit.b/150, DegToRad(orbit.F+27), 0, 2 * Math.PI);
		ctx.stroke();
		ctx.setLineDash([]);
		ctx.strokeStyle = "#55aaff";
		ctx.beginPath();
		ctx.ellipse(cx, cy, orbit.a/50, orbit.b/150, DegToRad(orbit.F+27), DegToRad(w), DegToRad(w-30),true);
		ctx.stroke();
		ctx.strokeStyle = "#aaccff";
		ctx.beginPath();
		ctx.ellipse(cx, cy, orbit.a/50, orbit.b/150, DegToRad(orbit.F+27), DegToRad(w), DegToRad(w-20),true);
		ctx.stroke();
		ctx.strokeStyle = "#cceeff";
		ctx.beginPath();
		ctx.ellipse(cx, cy, orbit.a/50, orbit.b/150, DegToRad(orbit.F+27), DegToRad(w), DegToRad(w-10),true);
		ctx.stroke();
		ctx.strokeStyle = "#ffffff";
		ctx.beginPath();
		ctx.lineWidth = 3;
		ctx.ellipse(cx, cy, orbit.a/50, orbit.b/150, DegToRad(orbit.F+27), DegToRad(w), DegToRad(w-1),true);
		ctx.stroke();
		
	};

	function DegToRad(deg){
		return deg/180*Math.PI;
	}

	setInterval(function () {
		$.getJSON("/get_orbit.json",	function (SOrbit) {
			orbit = SOrbit;
			//console.log(typeof(orbit));
			//console.log(orbit);
		});
		plot();
		w = ++w;
		w = w==361? 0:w;
	}, 20);
	
};
$(document).ready(main);