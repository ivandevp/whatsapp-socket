var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);

app.set("port", (process.env.PORT || 8086));

app.use(express.static(__dirname + "/public"));

server.listen(app.get("port"), function() {
  console.log("Servidor corriendo en", app.get("port"));
});

// var messages = [{}];
var messages = [{
	id: 1,
	text: "Hola Bienvenido a blaH",
	author: ""
}];

io.on("connection", function(socket) {

	socket.emit("messages", messages);
	socket.on("new-message", function(data) {
		messages.push(data);
		io.sockets.emit("messages", messages);
	});
});