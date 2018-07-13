var express = require("express"),
Datastore = require('nedb'),
http = require("http"),
path = require("path"),
tools = require("./my_modules/tools"),
station_objects = require("./my_modules/station_objects"),
mOrbit = require("./my_modules/orbit.js"),
app,
client_dir,
mission_time,
counter =0,

view_scale=	15000,
Mars	  = new Mars();
global.orbital_objects = [];
global.time_scale=60;

console.clear();
console.log("------------------- <MARS: Infinity> backend system -------------------")
console.log();
console.log("Data preload initiated...")
console.log();

var db_orbitalobjects= new Datastore({filename : 'orbital_objects'});
db_orbitalobjects.loadDatabase();
//console.log("Loading orbital object database...")
mOrbit.load_orbital_objects(db_orbitalobjects,orbital_objects);
//console.log(orbital_objects.length+" orbital object loaded");
// Создаем http-сервер на основе Express
// и заставляем его слушать на порте 3000
app = express();

client_dir = path.resolve(__dirname,"client");
mission_time=0;

//module.exports = mission_time;

app.use(express.static(client_dir));
app.use(express.urlencoded({ extended: true }));

http.createServer(app).listen(3000);
console.log('Server running at http://localhost:3000/');
console.log();
station_objects.init_station();
//console.log('Client DIR:'+ client_dir);

function Mars(){
	this.mars_w	= 0;
	this.phobos_w = 0;
};

// настраиваем маршруты

// маршрут по умолчанию
app.get("/", function (req, res) {
res.send("Это основной маршрут!");
});

// маршрут для получения времени миссии
app.get("/mission_time.json", function (req, res) {
	res.json(tools.num_to_time(mission_time));
});

app.get("/get_solar_batteries.json", function (req, res) { // Получение состояния солнечных батарей
	res.json(station);
});

app.get("/get_station.json", function (req, res) { // Получение состояния солнечных батарей
	var batteries = station.SkySpear.SolarBatteries;
	res.json(batteries);
});

app.get("/get_orbit.json", function (req, res) {  //получение орбиты станции
	var orbit = station.orbit;
	res.json(orbit);
});

app.get("/get_view_scale.json", function (req, res) {  // получение масштаба орбитальной карты
	res.json(view_scale);
});

app.get("/get_mars.json", function (req, res) {  // получение объекта планеты
	res.json(Mars);
});

app.get("/get_empty_orbit_object.json", function (req, res) {  // получение пустого объекта орбиты
	res.json(new mOrbit.orbit());
	//console.log("New orbit");
});

app.get("/get_orbit_objects.json", function (req, res) {  // получение пустого объекта орбиты
	res.json(orbital_objects);
	//console.log(orbital_objects);
});

// ------------------------------------------- Маршруты POST ------------------------------------------------------

app.post("/set_orbit.json", function (req, res) {	// установка орбиты напрямую через параметры
	station.orbit.set_orbit(req.body);
	res.json({"message":" Орбита скорректирована"});
});

app.post("/set_scale.json", function (req, res) { // установка масштаба орбитальной карты
	view_scale = req.body.scale;
});

app.post("/set_orbit_object.json", function (req, res) { // добавление орбитального объекта в массив и бд
	mOrbit.set_orbital_object(db_orbitalobjects,req.body,orbital_objects);
});

// Обработка периодических событий

setInterval(function () {
	mission_time =+mission_time+time_scale;

	counter = ++counter;
	if (counter%time_scale==0){
		// ещесекундные события с учетом сжатия времени
		station_objects.test_explosion();
	}
	if (counter>1000){counter=1000};
	//console.clear();
	//console.log("Mission_time: "+tools.num_to_time(mission_time));
}, 1000);

setInterval(function () {
	station_objects.recalc_electricity();
	station_objects.recalc_g();
},1000);

setInterval(function () {
	station_objects.recalc_heat(time_scale);
},100);

setInterval(function(){
	//console.log("------------------")
	//console.log(station.orbit.w)
	station.orbit.w = station.orbit.w+station.orbit.w_speed*time_scale/20;
	station.orbit.w = station.orbit.w>360? 0:station.orbit.w;
	station.orbit.check_shadow();
	station.orbit.calc_speed();
	Mars.mars_w = Mars.mars_w+360/(24.6597*60*60*20)*time_scale;
	Mars.mars_w = Mars.mars_w>360? 0:Mars.mars_w;
	Mars.phobos_w = Mars.phobos_w+360/(((7*60)+39.2)*60*20)*time_scale;
	Mars.phobos_w = Mars.phobos_w>360? 0:Mars.phobos_w;
	//console.clear();
	orbital_objects.forEach(function(item, i, arr){
		//console.log(item.w_speed+"/"+item.w);
		if (item.surface=="false"){
			item.calc_speed();
			item.w = +item.w+item.w_speed*time_scale;
		}else{
			item.w_speed = 360/(24.6597*60*60*20);
			item.w = +item.w+item.w_speed*time_scale;
		}
		//console.log(item.w_speed+"/"+item.w);
		item.w = item.w>360? 0:item.w;
		item.check_shadow();
		//console.log(item.name+"/"+item.w+"/"+Mars.mars_w);
	})
},50)

app.get("/station.json", function (req, res) {
	res.json(global.station);
});
