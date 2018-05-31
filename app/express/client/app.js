var main = function () {
"use strict";
	/*window.alert("hello, world!");*/
	$("#mission-time").val("00:00:00");

	var insertSBIntoDOM = function(){
		//console.log('call ');	
		$.getJSON("get_solar_batteries.json",	function (get_solar_batteries) {
			var SB_array = get_solar_batteries;
			var Power_block_A=SB_array[0].Power+SB_array[1].Power;
			var Power_block_B=SB_array[2].Power+SB_array[3].Power+SB_array[4].Power+SB_array[5].Power;
			var Power_block_C=SB_array[6].Power+SB_array[7].Power+SB_array[8].Power+SB_array[9].Power;
			var Power_block_D=SB_array[10].Power+SB_array[11].Power+SB_array[12].Power+SB_array[13].Power;
			Power_block_A = Power_block_A.toFixed(2);
			Power_block_B = Power_block_B.toFixed(2);
			Power_block_C = Power_block_C.toFixed(2);
			Power_block_D = Power_block_D.toFixed(2);

			$("#SB-block-A").val(Power_block_A);
			$("#SB-block-B").val(Power_block_B);
			$("#SB-block-C").val(Power_block_C);
			$("#SB-block-D").val(Power_block_D);

			if (SB_array[0].status=='Норма'&SB_array[1].status=='Норма'){
				var BlockA_stat = 'Норма'
				} else {
					BlockA_stat = SB_array[0].status!='Норма'? SB_array[0].status:'Норма'	
					BlockA_stat = SB_array[1].status!='Норма'? SB_array[1].status:'Норма'	
				}
			if (SB_array[2].status=='Норма'&SB_array[3].status=='Норма'&SB_array[4].status=='Норма'&SB_array[5].status=='Норма'){
				var BlockB_stat = 'Норма'
				} else {
					BlockB_stat = SB_array[2].status!='Норма'? SB_array[2].status:'Норма'	
					BlockB_stat = SB_array[3].status!='Норма'? SB_array[3].status:'Норма'	
					BlockB_stat = SB_array[4].status!='Норма'? SB_array[4].status:'Норма'	
					BlockB_stat = SB_array[5].status!='Норма'? SB_array[5].status:'Норма'	
				}
			if (SB_array[6].status=='Норма'&SB_array[7].status=='Норма'&SB_array[8].status=='Норма'&SB_array[9].status=='Норма'){
				var BlockC_stat = 'Норма'
				} else {
					BlockC_stat = SB_array[6].status!='Норма'? SB_array[6].status:'Норма'	
					BlockC_stat = SB_array[7].status!='Норма'? SB_array[7].status:'Норма'	
					BlockC_stat = SB_array[8].status!='Норма'? SB_array[8].status:'Норма'	
					BlockC_stat = SB_array[9].status!='Норма'? SB_array[9].status:'Норма'	
				}
			if (SB_array[11].status=='Норма'&SB_array[10].status=='Норма'&SB_array[12].status=='Норма'&SB_array[13].status=='Норма'){
				var BlockD_stat = 'Норма'
				} else {
					BlockD_stat = SB_array[10].status!='Норма'? SB_array[10].status:'Норма'	
					BlockD_stat = SB_array[11].status!='Норма'? SB_array[11].status:'Норма'	
					BlockD_stat = SB_array[12].status!='Норма'? SB_array[12].status:'Норма'	
					BlockD_stat = SB_array[13].status!='Норма'? SB_array[13].status:'Норма'	
				}
			$("#SB-block-A-stat").val(BlockA_stat);
			$("#SB-block-B-stat").val(BlockB_stat);
			$("#SB-block-C-stat").val(BlockC_stat);
			$("#SB-block-D-stat").val(BlockD_stat);
			});
		};

	var insertTimeIntoDOM = function (mission_time) {
		//console.log(data);
		//console.log(mission_time);
		$("#mission-time").val(mission_time);
	};

	setInterval(function () {
		$.getJSON("mission_time.json", insertTimeIntoDOM);
		insertSBIntoDOM();
	}, 1000);
	
};
$(document).ready(main);