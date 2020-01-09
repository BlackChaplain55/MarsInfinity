var main = function () {
"use strict";
const SB1Button = document.getElementById('SB1');
const SB2Button = document.getElementById('SB2');
const SB3Button = document.getElementById('SB3');
const SB4Button = document.getElementById('SB4');

const SB1_lock_Button = document.getElementById('SB1_lock');
const SB2_lock_Button = document.getElementById('SB2_lock');
const SB3_lock_Button = document.getElementById('SB3_lock');
const SB4_lock_Button = document.getElementById('SB4_lock');

const SB = [];
const SB_lock = [];
const SB_stats = [];
const buttons = [];

SB.push(SB1Button);
SB.push(SB2Button);
SB.push(SB3Button);
SB.push(SB4Button);

SB_lock.push(SB1_lock_Button);
SB_lock.push(SB2_lock_Button);
SB_lock.push(SB3_lock_Button);
SB_lock.push(SB4_lock_Button);

SB_stats.push(document.getElementById("SB1_stat"));
SB_stats.push(document.getElementById("SB2_stat"));
SB_stats.push(document.getElementById("SB3_stat"));
SB_stats.push(document.getElementById("SB4_stat"));

buttons.push(SB1Button);
buttons.push(SB2Button);
buttons.push(SB3Button);
buttons.push(SB4Button);

function Station(){
};
Station.SolarBatteries = [0,0,0,0];

get_object();
add_listeners();
fill();
get_sb_status();

  function get_object(){
      $.getJSON("/get_station.json",	function (data) {
      Station = data;
      //console.log(Station)
      fill();
    });
  };

  function get_sb_status(){
      document.getElementById("SB1_eff").value=Station.SolarBatteries[0].Efficiency;
      document.getElementById("SB2_eff").value=Station.SolarBatteries[1].Efficiency;
      document.getElementById("SB3_eff").value=Station.SolarBatteries[2].Efficiency;
      document.getElementById("SB4_eff").value=Station.SolarBatteries[3].Efficiency;
      document.getElementById("SB1_stat").value=Station.SolarBatteries[0].Status;
      document.getElementById("SB2_stat").value=Station.SolarBatteries[1].Status;
      document.getElementById("SB3_stat").value=Station.SolarBatteries[2].Status;
      document.getElementById("SB4_stat").value=Station.SolarBatteries[3].Status;
  }

  function add_listeners(){
    SB.forEach(function(item,i,arr){
      item.addEventListener('click', toggleButton);
    });
    SB_lock.forEach(function(item,i,arr){
      item.addEventListener('click', toggleButton);
    });
    document.getElementById("SB_get").addEventListener('click', get_sb_status);
    document.getElementById("SB_set").addEventListener('click', set_sb_status);
    //SB1Button.addEventListener('click', toggleButton);
    //SB2Button.addEventListener('click', toggleButton);
  };

  function toggleButton(){
      this.classList.toggle('is-active');
      set_solar_batteries();
  };

  function set_sb_status(){
    Station.SolarBatteries[0].Status=document.getElementById("SB1_stat").value;
    Station.SolarBatteries[1].Status=document.getElementById("SB2_stat").value;
    Station.SolarBatteries[2].Status=document.getElementById("SB3_stat").value;
    Station.SolarBatteries[3].Status=document.getElementById("SB4_stat").value;
    Station.SolarBatteries[0].Efficiency=document.getElementById("SB1_eff").value;
    Station.SolarBatteries[1].Efficiency=document.getElementById("SB2_eff").value;
    Station.SolarBatteries[2].Efficiency=document.getElementById("SB3_eff").value;
    Station.SolarBatteries[3].Efficiency=document.getElementById("SB4_eff").value;
    set_solar_batteries();
  };

  function fill(){
    if (Station.SolarBatteries[0].Working=='true') {
      SB1Button.classList.add('is-active');
    } else {
      SB1Button.classList.remove('is-active');
    };
    if (Station.SolarBatteries[1].Working=='true') {
      SB2Button.classList.add('is-active');
    } else{
      SB2Button.classList.remove('is-active');
    };
    if (Station.SolarBatteries[2].Working=='true') {
      SB3Button.classList.add('is-active');
    } else{
      SB3Button.classList.remove('is-active');
    };
    if (Station.SolarBatteries[3].Working=='true') {
      SB4Button.classList.add('is-active');
    } else{
      SB4Button.classList.remove('is-active');
    };

    if (Station.SolarBatteries[0].Locked=='true') {
      SB1_lock_Button.classList.add('is-active');
    } else {
      SB1_lock_Button.classList.remove('is-active');
    };
    if (Station.SolarBatteries[1].Locked=='true') {
      SB1_lock_Button.classList.add('is-active');
    } else{
      SB1_lock_Button.classList.remove('is-active');
    };
    if (Station.SolarBatteries[2].Locked=='true') {
      SB1_lock_Button.classList.add('is-active');
    } else{
      SB1_lock_Button.classList.remove('is-active');
    };
    if (Station.SolarBatteries[3].Locked=='true') {
      SB1_lock_Button.classList.add('is-active');
    } else{
      SB1_lock_Button.classList.remove('is-active');
    };
  };

  function set_solar_batteries(){
    SB.forEach(function(item,i,arr){
      if (item.classList.contains('is-active')==true){
        Station.SolarBatteries[i].Working='true';
        if (SB_stats[i].value==''||SB_stats[i].value=='Сложена'){
          Station.SolarBatteries[i].Status='Развернута';
          SB_stats[i].value='Развернута';
        }
        }else{
        Station.SolarBatteries[i].Working='false';
        //console.log(Station.SolarBatteries[i]);
        if (SB_stats[i].value==''||SB_stats[i].value=='Развернута'){
          Station.SolarBatteries[i].Status='Сложена';
          SB_stats[i].value='Сложена';
        }
      };
    });

    SB_lock.forEach(function(item,i,arr){
      if (item.classList.contains('is-active')==true){
        Station.SolarBatteries[i].Locked='true';
      }else{
        Station.SolarBatteries[i].Locked='false';
      };
    });

    var msg_data = {"SB1":Station.SolarBatteries[0],"SB2":Station.SolarBatteries[1],"SB3":Station.SolarBatteries[2],"SB4":Station.SolarBatteries[3]};
    $.post("/set_solar_batteries.json", msg_data, function (response) {
      });
    //var last_index=cur_index;
  };

setInterval(function () {
  //
  get_object();
  fill();
}, 3000);

};
$(document).ready(main);
