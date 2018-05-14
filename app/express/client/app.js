var main = function () {
"use strict";
	/*window.alert("hello, world!");*/
	$("#mission-time").val("00:00:00");

	var insertTimeIntoDOM = function (mission_time) {
		//console.log(mission_time)
		$("#mission-time").val(mission_time);
	};

	setInterval(function () {
		$.getJSON("mission_time.json", insertTimeIntoDOM);
	}, 1000);
	
};
$(document).ready(main);