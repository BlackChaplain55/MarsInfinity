var main = function () {
"use strict";
var Station=0;
var Power=[0,0,0,0];
	/*window.alert("hello, world!");*/


insertIntoDOM();

function insertIntoDOM(){
		$.getJSON("/get_power.json",	function (get_power) {
			Power = get_power;
			document.getElementById("SBEff-1").innerHTML=Power[0].Efficiency;
			document.getElementById("SBEff-2").innerHTML=Power[1].Efficiency;
			document.getElementById("SBEff-3").innerHTML=Power[2].Efficiency;
			document.getElementById("SBEff-4").innerHTML=Power[3].Efficiency;
			document.getElementById("SBPower-1").innerHTML=Power[0].Power;
			document.getElementById("SBPower-2").innerHTML=Power[1].Power;
			document.getElementById("SBPower-3").innerHTML=Power[2].Power;
			document.getElementById("SBPower-4").innerHTML=Power[3].Power;
			document.getElementById("SBStatus-1").innerHTML=Power[0].Status;
			document.getElementById("SBStatus-2").innerHTML=Power[1].Status;
			document.getElementById("SBStatus-3").innerHTML=Power[2].Status;
			document.getElementById("SBStatus-4").innerHTML=Power[3].Status;
		});
    $.getJSON("/get_station.json",	function (data) {
		  Station = data;
		 	document.getElementById("PowerProduction").innerHTML=Math.round(Station.PowerProduction*100)/100;
			document.getElementById("PowerConsumption").innerHTML=Math.round(Station.PowerConsumption*100)/100;
			document.getElementById("PowerTotal").innerHTML=Math.round(Station.PowerProduction*100 - Station.PowerConsumption*100)/100;
		  });
	};

setInterval(function () {
		insertIntoDOM();
}, 1000);

};

$(document).ready(main);
