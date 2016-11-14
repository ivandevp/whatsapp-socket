var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);

var messages = [{}];

app.use(express.static(__dirname + "/public"));

io.on("connection", function(socket) {
	console.log("Conectado");
	socket.emit("messages", messages);
	socket.on("new-message", function(data) {
		messages.push(data);
		io.sockets.emit("messages", messages);
	});
});

server.listen(8086, function() {
	console.log("Servidor corriendo en 8086");
});