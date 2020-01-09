var express = require("express"),
Datastore = require('nedb'),
http = require("http"),
path = require("path"),
tools = require("./my_modules/tools"),
station_objects = require("./my_modules/station_objects"),
app,
client_dir,
mission_time,
counter =0;

global.orbital_objects = [];
global.time_scale=1;

console.clear();
console.log("------------------- <Starlight mile> backend system -------------------")
console.log();

//var db_orbitalobjects= new Datastore({filename : 'orbital_objects'});
//db_orbitalobjects.loadDatabase();

app = express();

client_dir = path.resolve(__dirname,"client");
mission_time=0;

app.use(express.static(client_dir));
app.use(express.urlencoded({ extended: true }));

http.createServer(app).listen(3000);
console.log('Server running at http://localhost:3000/');
console.log();
station_objects.init_station();

// настраиваем маршруты
console.log("-------------------Инициализация завершена-------------------")
// маршрут по умолчанию
app.get("/", function (req, res) {
res.send("Это основной маршрут!");
});

// маршрут для получения времени миссии
app.get("/mission_time.json", function (req, res) {
	res.json(tools.num_to_time(mission_time));
});

app.get("/get_power.json", function (req, res) { // Получение состояния солнечных батарей

	var batteries = global.station.SolarBatteries;
	//console.log('SB status sent')
	res.json(batteries);
});

app.get("/get_station.json", function (req, res) {
	res.json(global.station);
});

// ------------------------------------------- Маршруты POST ------------------------------------------------------

app.post("/set_solar_batteries.json", function (req, res) {	// настройка солнечных батарей
	//station.orbit.set_orbit(req.body);
	station.SolarBatteries[0].Locked=req.body.SB1.Locked;
	station.SolarBatteries[1].Locked=req.body.SB2.Locked;
	station.SolarBatteries[2].Locked=req.body.SB3.Locked;
	station.SolarBatteries[3].Locked=req.body.SB4.Locked;

	if (station.SolarBatteries[0].Locked=='false'){
			station.SolarBatteries[0].Working=req.body.SB1.Working;
			station.SolarBatteries[0].Status=req.body.SB1.Status;
			station.SolarBatteries[0].Efficiency=Number(req.body.SB1.Efficiency);
	};

	if (station.SolarBatteries[1].Locked=='false'){
			station.SolarBatteries[1].Working=req.body.SB2.Working;
			station.SolarBatteries[1].Status=req.body.SB2.Status;
			station.SolarBatteries[1].Efficiency=Number(req.body.SB2.Efficiency);
	};

	if (station.SolarBatteries[2].Locked=='false'){
			station.SolarBatteries[2].Working=req.body.SB3.Working;
			station.SolarBatteries[2].Status=req.body.SB3.Status;
			station.SolarBatteries[2].Efficiency=Number(req.body.SB3.Efficiency);
	};

	if (station.SolarBatteries[3].Locked=='false'){
			station.SolarBatteries[3].Working=req.body.SB4.Working;
			station.SolarBatteries[3].Status=req.body.SB4.Status;
			station.SolarBatteries[3].Efficiency=Number(req.body.SB4.Efficiency);
	};

	res.json({"message":""});
});

// --------------------------------------Обработка периодических событий-------------------------------------------

setInterval(function () {
	mission_time =+mission_time+time_scale;

	counter = ++counter;
	if (counter%time_scale==0){
		// ещесекундные события с учетом сжатия времени
		console.clear();
		station_objects.recalc_electricity();
		console.log("Текущая выработка энергии: "+station.PowerProduction.toFixed(2));
		console.log("Текущее потребление энергии: "+station.PowerConsumption.toFixed(2));
		var Balance = (station.PowerProduction-station.PowerConsumption).toFixed(2)
		console.log("Текущий баланс энергии: "+Balance);
		console.log("Внешнее питание: "+station.ExtPowers[0].Name+"-"+station.ExtPowers[0].Working);
		console.log("Батарея 1: "+station.Batteries[0].Status+' Напряжение:'+station.Batteries[0].Current.toFixed(2)+' Ёмкость:'+station.Batteries[0].Capacity.toFixed(2)+' Выдаваемая мощность:'+station.Batteries[0].Power.toFixed(2));
		console.log("Батарея 2: "+station.Batteries[1].Status+' Напряжение:'+station.Batteries[1].Current.toFixed(2)+' Ёмкость:'+station.Batteries[1].Capacity.toFixed(2)+' Выдаваемая мощность:'+station.Batteries[1].Power.toFixed(2));
		console.log("СБ1: "+station.SolarBatteries[0].Status+' Состояние:'+station.SolarBatteries[0].Efficiency.toFixed(2)+' Выдаваемая мощность:'+station.SolarBatteries[0].Power.toFixed(2));
		console.log(tools.num_to_time(mission_time));
	}
	if (counter>1000){counter=1000};

}, 1000);
