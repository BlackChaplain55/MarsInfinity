
var orbit = 0;
var w;
var cam_shift_x=0;
var cam_shift_y=0;
var scale=15000;
var mission_time ='';
var Mars={};
      	Mars.mars_w=0;
      	Mars.phobos_w=0;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var canvas_height 	= canvas.height;
var canvas_width	= canvas.width;
var cy=canvas_height/2+cam_shift_x;
var cx=canvas_width/2+cam_shift_y;;
var cxs;
var cys;
const R = 3389.5*1000;
var objects={};
var objects_count=0;


var main = function () {
"use strict";
	w=0;
	function get_objects(){
    	$.getJSON("/get_orbit_objects.json",	function (data) {
     	objects = data;
      	objects_count = objects.length;
		}
	}

	var plot = function() {

		w = orbit.w;

      	ctx.clearRect(0, 0, canvas_width, canvas_height);

		// Вычисляем центр и рисуем "крест"


		//cxs = cx-orbit.shift/scale;
		//cys = cy-orbit.shift/3/scale



		//рисуем планету

		ctx.fillStyle = "#771700";             // Атмосфера
		ctx.lineWidth = 1;
 		ctx.strokeStyle = "#cc6e14";
      	ctx.beginPath();
      	ctx.setLineDash([]);
		ctx.arc(cx,  cy, (R+70000)/scale, 0, Math.PI*2, true);
		ctx.fill();
		ctx.stroke();

      	ctx.fillStyle = "#9b3400";             // Планета
		ctx.lineWidth = 1;
 		ctx.strokeStyle = "#e0bc2b";
      	ctx.beginPath();
      	ctx.setLineDash([]);
		ctx.arc(cx,  cy, R/scale, 0, Math.PI*2, true);
		ctx.fill();
		ctx.stroke();

		// Условная орбита планеты

		ctx.lineWidth = 1;
		ctx.setLineDash([1,5]);
		ctx.strokeStyle = "#aaaaaa";
		ctx.beginPath();
      	ctx.ellipse(cx, canvas_height, 2000, cy,0, 0, 2*Math.PI);
      	ctx.stroke();

      	//"меридианы"

		ctx.lineWidth = 1;
 		ctx.strokeStyle = "#ffffff";
 		ctx.setLineDash([2,4]);

 		var Mars_w_hemi = Math.abs(Math.sin(DegToRad(Mars.mars_w)));
 		var Mars_mars_w2 = Mars.mars_w + 90;
 		Mars_mars_w2 = Mars_mars_w2>360? Mars_mars_w2-360:Mars_mars_w2;
 		var Mars_w_hemi2 = Math.abs(Math.sin(DegToRad(Mars_mars_w2)));

 		if ((90>=Mars.mars_w&&Mars.mars_w>=0)||(270>=Mars.mars_w&&Mars.mars_w>=180)){
 			ctx.beginPath();
      		ctx.ellipse(cx, cy,  R/scale, R/scale*Mars_w_hemi, DegToRad(117), 2 * Math.PI, Math.PI);
      		ctx.stroke();
      	} else {
      		ctx.beginPath();
      		ctx.ellipse(cx, cy,  R/scale, R/scale*Mars_w_hemi, DegToRad(117), Math.PI, 2 * Math.PI);
      		ctx.stroke();
      	};

      	if ((90>=Mars_mars_w2&&Mars_mars_w2>=0)||(270>=Mars_mars_w2&&Mars_mars_w2>=180)){
 			ctx.beginPath();
      		ctx.ellipse(cx, cy,  R/scale, R/scale*Mars_w_hemi2, DegToRad(117), 2 * Math.PI, Math.PI);
      		ctx.stroke();
      	} else {
      		ctx.beginPath();
      		ctx.ellipse(cx, cy,  R/scale, R/scale*Mars_w_hemi2, DegToRad(117), Math.PI, 2 * Math.PI);
      		ctx.stroke();
      	};

      	//console.log("Mars.mars_w "+Mars.mars_w+" Mars_mars_w2 "+Mars_mars_w2);
      	//var RotShift = Mars.mars_w>180?Mars.mars_w-180:Mars.mars_w;
      	var RotShift = (Mars.mars_w*2.5)%5;

      	ctx.beginPath();
      	ctx.ellipse(cx, cy, R/scale, R/scale/3, DegToRad(27), 2 * Math.PI+DegToRad(RotShift), Math.PI);
      	ctx.stroke();

      	ctx.beginPath();
		ctx.ellipse(cx+Math.sin(DegToRad(27))*R/scale/2, cy-Math.cos(DegToRad(27))*R/scale/2, R/scale*0.845, R/scale/3*0.845, DegToRad(27), 2 * Math.PI-0.2+DegToRad(RotShift), Math.PI+0.2);
      	ctx.stroke();

      	ctx.beginPath();
		ctx.ellipse(cx-Math.sin(DegToRad(27))*R/scale/2, cy+Math.cos(DegToRad(27))*R/scale/2, R/scale*0.845, R/scale/3*0.845, DegToRad(27), 2 * Math.PI+0.2+DegToRad(RotShift), Math.PI-0.2);
      	ctx.stroke();

      	ctx.beginPath();
      	ctx.moveTo(cx+Math.sin(DegToRad(-27))*(R/scale+20), cy+Math.cos(DegToRad(-27))*(R/scale+20));
		ctx.lineTo(cx-Math.sin(DegToRad(-27))*(R/scale+20),  cy-Math.cos(DegToRad(-27))*(R/scale+20));
		ctx.stroke();

		cxs = cx+orbit.shift*Math.cos(DegToRad(orbit.F+27))/scale;
		cys = cy+orbit.shift*Math.sin(DegToRad(orbit.F+27))/3/scale

		ctx.lineWidth = 1;
 		ctx.strokeStyle = "#aaaaff";
      	ctx.setLineDash([2,8]);

		ctx.beginPath();
		ctx.ellipse(cxs, cys, orbit.a/scale, 0, DegToRad(orbit.F+27), 0,  Math.PI);
		ctx.stroke();

		ctx.beginPath();
		ctx.ellipse(cxs, cys, 0, orbit.b/scale/(3-2*Math.sin(DegToRad(orbit.P))),  DegToRad(orbit.F+27), 0, 2 * Math.PI);
		ctx.stroke();

		ctx.setLineDash([2,4]);


		ctx.strokeStyle = "#117777";

		ctx.beginPath();
      	ctx.ellipse(cx, cy, R/scale, R/scale/3, DegToRad(27), Math.PI+DegToRad(RotShift), 2 * Math.PI);
      	ctx.stroke();

      	if ((90>=Mars.mars_w&&Mars.mars_w>=0)||(270>=Mars.mars_w&&Mars.mars_w>=180)){
 			ctx.beginPath();
      		ctx.ellipse(cx, cy,  R/scale, R/scale*Mars_w_hemi, DegToRad(117), Math.PI, 2*Math.PI);
      		ctx.stroke();
      	} else {
      		ctx.beginPath();
      		ctx.ellipse(cx, cy,  R/scale, R/scale*Mars_w_hemi, DegToRad(117),  2 *Math.PI, Math.PI);
      		ctx.stroke();
      	};

      	if ((90>=Mars_mars_w2&&Mars_mars_w2>=0)||(270>=Mars_mars_w2&&Mars_mars_w2>=180)){
 			ctx.beginPath();
      		ctx.ellipse(cx, cy,  R/scale, R/scale*Mars_w_hemi2, DegToRad(117), Math.PI, 2 *Math.PI);
      		ctx.stroke();
      	} else {
      		ctx.beginPath();
      		ctx.ellipse(cx, cy,  R/scale, R/scale*Mars_w_hemi2, DegToRad(117),  2 *Math.PI, Math.PI);
      		ctx.stroke();
      	};


      	ctx.beginPath();
		ctx.ellipse(cx+Math.sin(DegToRad(27))*R/scale/2, cy-Math.cos(DegToRad(27))*R/scale/2, R/scale*0.845, R/scale/3*0.845, DegToRad(27), Math.PI+DegToRad(RotShift), 2 * Math.PI);
      	ctx.stroke();

      	ctx.beginPath();
		ctx.ellipse(cx-Math.sin(DegToRad(27))*R/scale/2, cy+Math.cos(DegToRad(27))*R/scale/2, R/scale*0.845, R/scale/3*0.845, DegToRad(27), Math.PI-0.2+DegToRad(RotShift), 2 * Math.PI+0.2);
      	ctx.stroke();

		//station orbit and trace

		ctx.strokeStyle = "#66ccff";
		ctx.setLineDash([2,2]);
		ctx.lineWidth = 1;

		ctx.beginPath();
		ctx.ellipse(cxs, cys, orbit.a/scale, orbit.b/scale/(3-2*Math.sin(DegToRad(orbit.P))), DegToRad(orbit.F+27), 2 * Math.PI, Math.PI);
		ctx.stroke();

		ctx.strokeStyle = "#3388dd";

		ctx.beginPath();
		ctx.ellipse(cxs, cys, orbit.a/scale, orbit.b/scale/(3-2*Math.sin(DegToRad(orbit.P))), DegToRad(orbit.F+27), Math.PI, 2 * Math.PI);
		ctx.stroke();


		ctx.setLineDash([]);
		ctx.strokeStyle = "#55aaff";

		ctx.beginPath();
		ctx.ellipse(cxs, cys, orbit.a/scale, orbit.b/scale/(3-2*Math.sin(DegToRad(orbit.P))), DegToRad(orbit.F+27), DegToRad(w), DegToRad(w-30),true);

		ctx.stroke();
		ctx.strokeStyle = "#aaccff";

		ctx.beginPath();
		ctx.ellipse(cxs, cys, orbit.a/scale, orbit.b/scale/(3-2*Math.sin(DegToRad(orbit.P))), DegToRad(orbit.F+27), DegToRad(w), DegToRad(w-20),true);
		ctx.stroke();

		ctx.strokeStyle = "#cceeff";
		ctx.beginPath();
		ctx.ellipse(cxs, cys, orbit.a/scale, orbit.b/scale/(3-2*Math.sin(DegToRad(orbit.P))), DegToRad(orbit.F+27), DegToRad(w), DegToRad(w-10),true);
		ctx.stroke();
		ctx.strokeStyle = "#ffffff";
		ctx.beginPath();
		ctx.lineWidth = 3;
		ctx.ellipse(cxs, cys, orbit.a/scale, orbit.b/scale/(3-2*Math.sin(DegToRad(orbit.P))), DegToRad(orbit.F+27), DegToRad(w), DegToRad(w-1),true);
		ctx.stroke();

		//fobos orbit and trace

		ctx.lineWidth = 1;
		ctx.strokeStyle = "#444444";
		ctx.setLineDash([1,6]);
		ctx.beginPath();
		var phobos ={};
		phobos.a= 9377200/scale;
		phobos.b= 9376130/scale/3;
		phobos.w= Mars.phobos_w;
		phobos.r = 11000;
		ctx.ellipse(cx, cy,phobos.a, phobos.b, DegToRad(28), 0, DegToRad(360),true);
		phobos.x = (phobos.a * Math.cos(DegToRad(phobos.w)))*Math.cos(DegToRad(28))-(phobos.b * Math.sin(DegToRad(phobos.w)))*Math.sin(DegToRad(28))+cx;
		phobos.y = (phobos.a * Math.cos(DegToRad(phobos.w)))*Math.sin(DegToRad(28))+(phobos.b * Math.sin(DegToRad(phobos.w)))*Math.cos(DegToRad(28))+cy;
		ctx.stroke();
		ctx.fillStyle = "#cccccc"
		ctx.beginPath();
		ctx.arc(phobos.x,  phobos.y, phobos.r/scale, 0, Math.PI*2, true);
		ctx.fill();
		ctx.font = "12px Verdana";
		ctx.fillStyle = "white";
        ctx.fillText("Фобос", phobos.x-25, phobos.y-4);

		//deimos orbit and trace

		//Надписи
		var F = orbit.F+27;
		var a = (orbit.a/scale);
		var b = (orbit.b/scale/(3-2*Math.sin(DegToRad(orbit.P))));


		var x = (a * Math.cos(DegToRad(w)))*Math.cos(DegToRad(F))-(b * Math.sin(DegToRad(w)))*Math.sin(DegToRad(F))+cxs-30;
		var y = (a * Math.cos(DegToRad(w)))*Math.sin(DegToRad(F))+(b * Math.sin(DegToRad(w)))*Math.cos(DegToRad(F))+cys-4;

		//ctx.beginPath();
		//ctx.arc(x,  y, 1, 0, Math.PI*2, true);
		ctx.font = "12px Verdana";
		ctx.fillStyle = "white";
        ctx.fillText("Цитадель", x, y);
		//ctx.stroke();

		//etc objects

		objects.forEach(function(item,i,arr){
			if (item.surface=="true"){

			}else{
				ctx.lineWidth = 1;
				ctx.strokeStyle = "#444444";
				ctx.setLineDash([1,6]);
				ctx.beginPath();
				var phobos ={};
				ctx.ellipse(cx, cy,item.a, item.b, DegToRad(item.F+27), 0, DegToRad(360),true);
				item.x = (item.a * Math.cos(DegToRad(item.w)))*Math.cos(DegToRad(item.F+27))-(item.b * Math.sin(DegToRad(item.w)))*Math.sin(DegToRad(item.F+27))+cx;
				item.y = (item.a * Math.cos(DegToRad(item.w)))*Math.sin(DegToRad(item.F+27))+(item.b * Math.sin(DegToRad(item.w)))*Math.cos(DegToRad(item.F+27))+cy;
				ctx.stroke();
				ctx.fillStyle = "#cccccc"
				ctx.beginPath();
				ctx.arc(item.x,  item.y, 3, 0, Math.PI*2, true);
				ctx.fill();
				ctx.font = "12px Verdana";
				ctx.fillStyle = "white";
		        ctx.fillText("Фобос", item.x-25, item.y-4);	
			}
		});

		requestAnimationFrame(plot);
	};

	function fill(){
		$("#apogee-val").val(orbit.apogee);
		$("#perigee-val").val(orbit.perigee);
		$("#b-val").val(orbit.b);
		$("#f-val").val(orbit.F);
		$("#p-val").val(orbit.P);
		$("#scale-val").val(scale);
		$("#mission-time").text(mission_time);
		$("#orbit-w").text(orbit.w_speed);
		$("#orbit-v").text(orbit.v);
    $("#orbit-h").text(orbit.h-R);
		$("#p-shadow").text(orbit.shadow);
		$("#a-shadow").text(orbit.atmo_shadow);
		//console.log(mission_time);
	}

	$("#apogee-down").on("click", function () {
		var new_apogee = +$("#apogee-val").val()-100000;
		SetOrbit(new_apogee,+$("#perigee-val").val(),+$("#b-val").val(),+$("#f-val").val(),+$("#p-val").val())
	})

	$("#apogee-up").on("click", function () {
		var new_apogee = +$("#apogee-val").val()+100000;
		SetOrbit(new_apogee,+$("#perigee-val").val(),+$("#b-val").val(),+$("#f-val").val(),+$("#p-val").val())
	})

	$("#perigee-down").on("click", function () {
		var new_perigee = +$("#perigee-val").val()-100000;
		SetOrbit(+$("#apogee-val").val(),new_perigee,+$("#b-val").val(),+$("#f-val").val(),+$("#p-val").val())
	})

	$("#perigee-up").on("click", function () {
		var new_perigee = +$("#perigee-val").val()+100000;
		SetOrbit(+$("#apogee-val").val(),new_perigee,+$("#b-val").val(),+$("#f-val").val(),+$("#p-val").val())
	})

	$("#b-up").on("click", function () {
		var new_b = +$("#b-val").val()+100000;
		SetOrbit(+$("#apogee-val").val(),+$("#perigee-val").val(),new_b,+$("#f-val").val(),+$("#p-val").val())
	})

	$("#b-down").on("click", function () {
		var new_b = +$("#b-val").val()-100000;
		SetOrbit(+$("#apogee-val").val(),+$("#perigee-val").val(),new_b,+$("#f-val").val(),+$("#p-val").val())
	})

	$("#f-up").on("click", function () {
		var new_f = +$("#f-val").val()+5;
		SetOrbit(+$("#apogee-val").val(),+$("#perigee-val").val(),+$("#b-val").val(),new_f,+$("#p-val").val())
	})

	$("#f-down").on("click", function () {
		var new_f = +$("#f-val").val()-5;
		SetOrbit(+$("#apogee-val").val(),+$("#perigee-val").val(),+$("#b-val").val(),new_f,+$("#p-val").val())
	})

	$("#p-up").on("click", function () {
		var new_p = +$("#p-val").val()+5;
		SetOrbit(+$("#apogee-val").val(),+$("#perigee-val").val(),+$("#b-val").val(),+$("#f-val").val(),new_p)
	})

	$("#p-down").on("click", function () {
		var new_p = +$("#p-val").val()-5;
		SetOrbit(+$("#apogee-val").val(),+$("#perigee-val").val(),+$("#b-val").val(),+$("#f-val").val(),new_p)
	})

	$("#scale-up").on("click", function () {
		var new_scale = +$("#scale-val").val()+1000;
		SetScale(new_scale);
	})

	$("#scale-down").on("click", function () {
		var new_scale = +$("#scale-val").val()-1000;
		SetScale(new_scale);
	})

	function SetOrbit(apogee,perigee,b,f,p){
		var msg_data = {"apogee":apogee,"perigee":perigee,"b":b,"f":f,"p":p};
		$.post("/set_orbit.json", msg_data, function (response) {
			//console.log(response);
		});
	}

	function SetScale(new_scale){
		var msg_data = {"scale":new_scale};
		$.post("/set_scale.json", msg_data, function (response) {
		});
	}

	function DegToRad(deg){
		return deg/180*Math.PI;
	}

	setInterval(function () {
		$.getJSON("/get_orbit.json",	function (SOrbit) {
			orbit = SOrbit;
		});
		$.getJSON("/get_view_scale.json",	function (value) {
			scale = value;
		});
		$.getJSON("/get_Mars.json",	function (value) {
			Mars = value;
		});
		$.getJSON("/mission_time.json",	function (value) {
			mission_time = value;
		});

		get_objects();

		fill();
		//plot();
	}, 50);

	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	window.requestAnimationFrame = requestAnimationFrame;
	requestAnimationFrame(plot);
};
$(document).ready(main);
