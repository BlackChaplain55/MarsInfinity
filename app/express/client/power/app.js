var main = function () {
"use strict";
	/*window.alert("hello, world!");*/

	var insertIntoDOM = function(){
		//console.log('call ');
		$.getJSON("get_station.json",	function (get_station) {
			var Station = get_station;

			for (var i = 0; i < 6; i++) {
					$("#Eff-"+toString(i+1)).val(Station.Alabama.Reactors[i]);
				}
			});
		};

setInterval(function () {
		insertIntoDOM();
	}, 1000);

};
$(document).ready(main);
