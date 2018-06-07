var express = require("express"),
http = require("http"),
path = require("path"),
tools = require("./my_modules/tools"),
station_objects = require("./my_modules/station_objects"),
post_routes	= require("./my_modules/post_module"),
app,
client_dir,
mission_time,
time_scale=	5,
view_scale=	15000,
Mars	  = new Mars();

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


app.get("/get_solar_batteries.json", function (req, res) {
	var batteries = station.SkySpear.SolarBatteries;
	res.json(batteries);
});

app.get("/get_orbit.json", function (req, res) {
	var orbit = station.orbit;
	res.json(orbit);
});

app.get("/get_view_scale.json", function (req, res) {
	res.json(view_scale);
});

app.get("/get_mars.json", function (req, res) {
	res.json(Mars);
});

app.post("/set_orbit.json", function (req, res) {
	station.orbit.set_orbit(req.body);
	res.json({"message":" Орбита скорректирована"});
});

app.post("/set_scale.json", function (req, res) {
	view_scale = req.body.scale;
});

// Обработка периодических событий

setInterval(function () {
	mission_time =+mission_time+time_scale*20;

	//console.clear();
	//console.log("Mission_time: "+tools.num_to_time(mission_time));
}, 1000);

setInterval(function () {
	station_objects.recalc_electricity();
	station_objects.recalc_g();
},3000);

setInterval(function(){
	//console.log("------------------")
	//console.log(station.orbit.w)
	station.orbit.w = station.orbit.w+station.orbit.w_speed*time_scale;
	station.orbit.w = station.orbit.w>360? 0:station.orbit.w;
	station.orbit.check_shadow();
	station.orbit.calc_speed();
	Mars.mars_w = Mars.mars_w+360/(24.6597*60*60*20)*time_scale*20;
	Mars.mars_w = Mars.mars_w>360? 0:Mars.mars_w;
	Mars.phobos_w = Mars.phobos_w+360/(((7*60)+39.2)*60*20)*time_scale*20;
	Mars.phobos_w = Mars.phobos_w>360? 0:Mars.phobos_w;
},50)

app.get("/station.json", function (req, res) {
	res.json(global.station);
});
