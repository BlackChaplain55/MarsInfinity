var main = function () {
"use strict";
var cur_object={};
var cur_index=0;
var objects_count=0;
var objects={};

  function get_empty_object(){
    $.getJSON("/get_empty_orbit_object.json",	function (data) {
      cur_object = data;
      fill();
    });
  }

  function get_objects(){
    $.getJSON("/get_orbit_objects.json",	function (data) {
      objects = data;
      objects_count = objects.length;
      fill();
    });
  }

  function set_object(){
    var msg_data = {"object":cur_object};
    $.post("/set_orbit_objects.json", msg_data, function (response) {
    });
  }

  $("#New_object").on("click", function () {
    get_empty_object();
    console.log("New object")
	})

  function fill(){
    $("#apogee").val(cur_object.apogee);
    $("#perigee").val(cur_object.perigee);
    $("#obj_name").val(cur_object.b);
    $("#b-val").val(cur_object.b);
    $("#f-val").val(cur_object.F);
    $("#p-val").val(cur_object.P);
    $("#surface").val(cur_object.surface);
    $("#geoloc_w").val(cur_object.geoloc_w);
    $("#geoloc_d").val(cur_object.geoloc_d);
    $("#obj_count").text(""+cur_index+"/"+objects_count);
  }
};
$(document).ready(main);
