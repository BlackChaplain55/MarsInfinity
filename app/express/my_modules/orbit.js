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
	h					= this.apogee;
	this.incline		= 0;
	this.F      		= 0;
	this.P 				= 0;
	this.w 				= 0;	
	this.v				= Math.sqrt(G*M/(h))
	this.w_speed		= this.v/h*180/Math.PI;
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
	this.perigee = +orbit_params.perigee;
	this.apogee = +orbit_params.apogee;
	this.b = +orbit_params.b;
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
	var h,l,accel,cur_h;
	if (this.apogee>this.perigee){
		h=this.apogee;
		l=this.perigee;
		if(this.w>=0&&this.w<180){
			accel=true;
		}else{
			accel=false;
		}
	}else{
		l=this.apogee;
		h=this.perigee;
		if(this.w>=180&&this.w<360){
			accel=true;
		}else{
			accel=false;
		}
	};
	var top_speed	=	Math.sqrt(G*M/(h));
	var low_speed	=	Math.sqrt(G*M/(l));
	var delta_v		= top_speed-low_speed;
	
	var delta_h		= h-l;
	if (accel){
		this.v			= low_speed+delta_v*Math.cos(DegToRad(this.w/2));
		cur_h = l+delta_h*Math.cos(DegToRad(this.w/2));
	}else{
		this.v			= top_speed-delta_v*Math.sin(DegToRad(this.w/2));
		cur_h = h-delta_h*Math.sin(DegToRad(this.w/2));
	}

	this.w_speed		= this.v/cur_h*180/Math.PI;
}

function DegToRad(deg){
		return deg/180*Math.PI;
}

module.exports.orbit = orbit;


