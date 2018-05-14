var express = require("express"),
http = require("http"),
path = require("path"),
tools = require("./my_modules/tools"),
app,
client_dir,
mission_time;
// Создаем http-сервер на основе Express
// и заставляем его слушать на порте 3000
app = express();

client_dir = path.resolve(__dirname,"client");
mission_time=0;

//module.exports = mission_time;

app.use(express.static(client_dir));

http.createServer(app).listen(3000);
console.log('Server running at http://localhost:3000/');
//console.log('Client DIR:'+ client_dir);

// настраиваем маршруты

// маршрут по умолчанию
app.get("/", function (req, res) {
res.send("Это основной маршрут!");
});

// маршрут для получения времени миссии
app.get("/mission_time.json", function (req, res) {
	res.json(tools.num_to_time(mission_time));
});

app.post("/todos", function (req, res) {
	console.log("Данные были отправлены на сервер!");
	// простой объект отправлен обратно
	res.json({"message":"Вы размещаетесь на сервере!"});
});

// Обработка периодических событий

setInterval(function () {
	mission_time =++mission_time;
console.clear();
console.log("Mission_time: "+tools.num_to_time(mission_time)); 
}, 1000);