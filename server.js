var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);

app.use(express.static(__dirname + '/public'));


io.on("connection", function(client) {
	client.on("conectando", function (usuario) {
		usuario.status = "Conected";
		console.log(usuario);
		// $("#conversacion").append("<div>" + usuario.name + "</div>")
		client.broadcast.emit("conectado", usuario)
	});
});

server.listen(8086, function() {
	console.log("Servidor corriendo en 8086");
});