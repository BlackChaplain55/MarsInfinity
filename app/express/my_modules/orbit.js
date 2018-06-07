const G = 6.67408*Math.pow(10,-11);
const M = 6.4171*Math.pow(10,23);
const R = 3389.5 * 1000;

function orbit(){
	this.a 				= 120000+R;
	this.b 				= 120000+R;
	this.excentricity 	= 0;
	this.shift			= 0;
	this.perigee 		= 120000+R;
	this.apogee 		= 120000+R;
	this.h					= this.apogee;
	this.incline		= 0;
	this.F      		= 0;
	this.P 				= 0;
	this.w 				= 0;
	this.v				= Math.sqrt(G*M/(this.h))
	this.w_speed		= this.v/this.h*180/Math.PI;
	this.shadow 		= false;
	this.atmo_shadow	= false;
	this.x				= 0;
	this.y				= 0;
	this.surface		= 0;
	this.geoloc_w		= 0;
	this.geoloc_d		= 0;
}

//функция принудительной установки орбиты
orbit.prototype.set_orbit = function (orbit_params){
	this.b = +orbit_params.b+(orbit_params.apogee-this.apogee)*0.25+(orbit_params.perigee-this.perigee)*0.25;
	this.perigee = +orbit_params.perigee;
	this.apogee = +orbit_params.apogee;
	this.F = +orbit_params.f;
	this.F = this.F>180?180:this.F;
	this.F = this.F<-180?-180:this.F;
	this.P = +orbit_params.p;
	this.P = this.P>180?180:this.P;
	this.P = this.P<-180?-180:this.P;
	this.a = (+this.perigee+this.apogee)/2;
	this.shift = (+this.apogee-this.perigee)/2;
}

//функция попадания объекта в тень планеты, плотных слоев атмосферы (считаются до высоты 20км) или нахождения на теневой стороне
orbit.prototype.check_shadow = function (){
	this.x = (this.a * Math.cos(DegToRad(this.w)))*Math.cos(DegToRad(this.F))-(this.b * Math.sin(DegToRad(this.w)))*Math.sin(DegToRad(this.F));
	this.y = (this.a * Math.cos(DegToRad(this.w)))*Math.sin(DegToRad(this.F))+(this.b * Math.sin(DegToRad(this.w)))*Math.cos(DegToRad(this.F));
	proj_x = this.x*Math.cos(DegToRad(this.F));
	proj_y = this.x*Math.sin(DegToRad(this.F))+this.y**Math.sin(DegToRad(this.P));
	if ((Math.pow(proj_x,2)+Math.pow(proj_y,2)<= Math.pow(R,2))&&this.w>=180&&this.w<=360){this.shadow=true}else{this.shadow=false};
	if ((Math.pow(proj_x,2)+Math.pow(proj_y,2)<= Math.pow(R+20000,2))&&this.w>=180&&this.w<=360){this.atmo_shadow=true}else{this.atmo_shadow=false};
}

//функция вычисления орбитальной и угловой скорости. апогей и перигей условны - апогей находится в точке отсчета, перигей напротив.
orbit.prototype.calc_speed = function (){
	var x = this.a * Math.cos(DegToRad(this.w));
	console.clear()
	if (this.shift>0) {
		console.log("Shift positive")
		if (x<0&&Math.abs(x)<=this.shift){
			console.log("Case 1")
			this.h					= Math.sqrt(Math.pow(x+this.shift,2)+Math.pow(this.b * Math.sin(DegToRad(this.w)),2));
		}else {
			console.log("Case 2")
			this.h					= Math.sqrt(Math.pow(Math.abs(x)-this.shift,2)+Math.pow(this.b * Math.sin(DegToRad(this.w)),2));
		}

	}else{
		console.log("Shift negative")
		if (x>0&&Math.abs(x)>this.shift){
			this.h					= Math.sqrt(Math.pow(x-this.shift,2)+Math.pow(this.b * Math.sin(DegToRad(this.w)),2));
		}else if(x>0&&Math.abs(x)>Shift){
			this.h					= Math.sqrt(Math.pow(-Math.abs(x)+this.shift,2)+Math.pow(this.b * Math.sin(DegToRad(this.w)),2));
		}else{
			this.h					= Math.sqrt(Math.pow(Math.abs(x)+this.shift,2)+Math.pow(this.b * Math.sin(DegToRad(this.w)),2));
		}
	}
	this.v					= Math.sqrt(G*M/(this.h));
	this.w_speed		= this.v/this.h*180/Math.PI;
	var cur_h=(this.h-R)/1000
	var cur_x=(x-R)/1000
	console.log("a",(this.a-R)/1000,"/b", (this.b-R)/1000, "/w",this.w.toFixed(0)," x ",cur_x.toFixed(0)," shift ",this.shift, " h ", cur_h.toFixed(0))
}

function DegToRad(deg){
		return deg/180*Math.PI;
}

module.exports.orbit = orbit;
