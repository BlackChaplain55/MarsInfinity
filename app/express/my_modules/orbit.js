const G = 6.67408*Math.pow(10,-11);
const M = 6.4171*Math.pow(10,23);
const R = 3389.5 * 1000;

function orbit(){
	this.name			= "";
	this.a 				= 120000+R;
	this.b 				= 120000+R;
	this.perigee 		= 120000+R;
	this.apogee 		= 120000+R;
	this.shift			= (+this.apogee-this.perigee)/2;
	this.h					= this.apogee;
	this.F      		= 0;
	this.P 				= 0;
	this.w 				= 0;
	this.v				= Math.sqrt(G*M/(this.h))
	this.w_speed		= this.v/this.h*180/Math.PI;
	this.shadow 		= false;
	this.atmo_shadow	= false;
	this.x				= 0;
	this.y				= 0;
	this.surface		= false;
	this.geoloc_w		= 0;
	this.geoloc_d		= 0;
}

//функция принудительной установки орбиты
orbit.prototype.set_orbit = function (orbit_params){
	this.b = +orbit_params.b+(+orbit_params.apogee-this.apogee)*0.25+(+orbit_params.perigee-this.perigee)*0.25;
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
	//console.log(this.w+" - "+typeof(this.w));
	//console.log(this.h+" - "+typeof(this.h));
	var x = this.a * Math.cos(DegToRad(this.w));
	//console.clear()
	if (this.shift>0) {
		//console.log("Shift positive")
	//	if (x<0&&Math.abs(x)<=this.shift){
	//		console.log("Case 1")
	//		this.h					= Math.sqrt(Math.pow(x+this.shift,2)+Math.pow(this.b * Math.sin(DegToRad(this.w)),2));
	//	}else {
	//		console.log("Case 2")
		if (this.surface=="true"){
			this.h = R;
		}else{
			this.h					= Math.sqrt(Math.pow(Math.abs(x+this.shift),2)+Math.pow(this.b * Math.sin(DegToRad(this.w)),2));
		};
	//	}

	}else{
		//console.log("Shift negative")
	//	console.log(this.surface+" "+typeof(this.surface))
		if (this.surface=="true"){
			this.h = R;

		}else{
			if (x>0&&Math.abs(x)>this.shift){
				this.h					= Math.sqrt(Math.pow(x+this.shift,2)+Math.pow(this.b * Math.sin(DegToRad(this.w)),2));
			}else if(x>0&&Math.abs(x)>Shift){
				this.h					= Math.sqrt(Math.pow(-Math.abs(x)-this.shift,2)+Math.pow(this.b * Math.sin(DegToRad(this.w)),2));
			}else{
				this.h					= Math.sqrt(Math.pow(Math.abs(x)-this.shift,2)+Math.pow(this.b * Math.sin(DegToRad(this.w)),2));
			}
		}
	}

	this.v					= Math.sqrt(G*M/(this.h));

	this.w_speed		= this.v/this.h*180/Math.PI;
	//var cur_h=(this.h-R)/1000
	//var cur_x=(x-R)/1000
	//	console.log("a",(this.a-R)/1000,"/b", (this.b-R)/1000, "/w",this.w.toFixed(0)," x ",cur_x.toFixed(0)," shift ",this.shift, " h ", cur_h.toFixed(0))
}

function DegToRad(deg){
		return deg/180*Math.PI;
}

function set_orbital_object(db,data,arr){
	new_object = data.object;
	if (data.del=="true"){
			db.remove({name: new_object.name},{})
			orbital_objects.splice(data.index-1,data.index-1);
			console.log("Orbital object removed: "+new_object.name+". Objects in memory: "+orbital_objects.length)
	}else{
		if (data.index==0){
			arr.push(new_object);
			db.insert(new_object);
			console.log("New orbital object: "+new_object.name+". Objects in memory: "+orbital_objects.length)
		}else{
			//console.log(data.index);
			//console.log(arr);
			arr[data.index-1]=new_object;
			arr[data.index-1].w=arr[data.index-1].surface=="true"?+arr[data.index-1].geoloc_w:0;
			arr[data.index-1].v=0;
			arr[data.index-1].h=arr[data.index-1].apogee;
		//console.log(arr[data.index-1]);
			arr[data.index-1].calc_speed = orbit.prototype.calc_speed;
			arr[data.index-1].check_shadow = orbit.prototype.check_shadow;
			db.update({name: new_object.name}, new_object, {},function(){});
			console.log("Orbital object updated: "+new_object.name+". Objects in memory: "+orbital_objects.length)
		//console.log("B: "+new_object.b);
		};
	};
};

function load_objects_cb(db,callbackFn)
{
	db.find({}, function (err, docs) {
	//console.log(typeof(docs));
		callbackFn(docs);
	})
}

function load_orbital_objects(db,arr){

		load_objects_cb(db,function(docs){
			console.log("Loading orbital object database...");
			orbital_objects = docs;
			orbital_objects.forEach(function(item, i, arr){
			item.apogee 		= item.apogee==undefined?0:+item.apogee;
			item.perigee 		= item.perigee==undefined?0:+item.perigee;
			item.a 				= (item.perigee+item.apogee)/2
			item.b 				= item.b==undefined?0:+item.b;
			item.shift			= (+item.apogee-item.perigee)/2;
			item.h				= item.apogee;
			item.F      		= item.F==undefined?0:+item.F;
			item.P 				= item.P==undefined?0:+item.P;
			item.w 				= item.w==undefined?0:+item.w;
			item.v				= item.v==undefined?0:+item.v;
			item.w_speed		= item.w_speed==undefined?0:+item.w_speed;
			item.geoloc_w		= item.geoloc_w==undefined?0:+item.geoloc_w;
			item.geoloc_d		= item.geoloc_d==undefined?0:+item.geoloc_d;
			if (item.surfase=="true"){
				item.w = item.geoloc_w;
				item.a=R;
				item.b=R;
				item.h=R;
				item.apogee=R;
				item.perigee=R;
			}
			item.calc_speed = orbit.prototype.calc_speed;
			item.check_shadow = orbit.prototype.check_shadow;
			//console.log(item.w+" - "+typeof(item.w));
			//console.log(item.name+" b:"+item.b);
			});

			console.log(orbital_objects.length+" orbital object loaded");
		})
}

module.exports.orbit = orbit;
module.exports.set_orbital_object = set_orbital_object;
module.exports.load_orbital_objects = load_orbital_objects;
