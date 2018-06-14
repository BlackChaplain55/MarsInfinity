var main = function () {
"use strict";
var cur_object={};
var cur_index=0;
var objects_count=0;
var objects={};
var isNew=false;

  function get_empty_object(){
    $.getJSON("/get_empty_orbit_object.json",	function (data) {
      cur_object  = data;
      cur_index   = 0;
      isNew       = true;
      fill();
    });
  }

  function get_objects(){
    $.getJSON("/get_orbit_objects.json",	function (data) {
      objects = data;
      objects_count = objects.length;
      console.log(data)
      if (objects_count>0){
        fill();
      }
    });
  }

  function set_object(){
    var msg_data = {"object":cur_object,"index":cur_index};
    $.post("/set_orbit_object.json", msg_data, function (response) {
    });
  }

  $("#New_object").on("click", function () {
    get_empty_object();
    //console.log("New object")
	})

  $("#Save_object").on("click", function () {
    cur_object.apogee = $("#apogee").val();
    cur_object.perigee = $("#perigee").val();
    cur_object.name = $("#obj_name").val();
    cur_object.b = $("#b-val").val();
    cur_object.F = $("#f-val").val();
    cur_object.P = $("#p-val").val();
    cur_object.surface = $("#surface").val();
    cur_object.geoloc_w = $("#geoloc_w").val();
    cur_object.geoloc_d = $("#geoloc_d").val();
    set_object();
    //console.log("New object")
  })

  function fill(){
    $("#apogee").val(cur_object.apogee);
    $("#perigee").val(cur_object.perigee);
    $("#obj_name").val(cur_object.name);
    $("#b-val").val(cur_object.b);
    $("#f-val").val(cur_object.F);
    $("#p-val").val(cur_object.P);
    $("#surface").val(cur_object.surface);
    $("#geoloc_w").val(cur_object.geoloc_w);
    $("#geoloc_d").val(cur_object.geoloc_d);
    if (isNew) {
      $("#obj_count").text("Новый");
    }else{
      $("#obj_count").text(""+cur_index+"/"+objects_count);
    }
  }

  get_objects();
};
$(document).ready(main);
