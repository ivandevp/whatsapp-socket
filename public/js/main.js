var socket = io.connect("http://localhost:8086", { "forceNew": true});

var mensajes = document.getElementById("mensajes");
var chat = document.getElementById("chat");
var messages = document.getElementById("messages");

var cargarPagina = function() {
		
	mensajes.focus();
	mensajes.addEventListener("keyup", enviarMensaje);
};

window.addEventListener("load", cargarPagina);

var enviarMensaje = function(e)  {

	var texto = mensajes.value.trim();
	if (e.keyCode == 13) {

		if (existeMensaje(mensajes.value)) {
			enviar(e);
			
			mensajes.value = "";
			document.getElementById("posicion").scrollIntoView(true);
		}
	}
};

socket.on("messages", function(data) {
	console.log(data);
	plantilla(data);
});

var enviar = function(e) {
	var payload = {
		text: mensajes.value
	};
	socket.emit("new-message", payload);
};

var plantilla = function(data) {
	var html = data.map(function(data, index) {
		return(`<div id="posicion" class="w-message w-message-out">
					<div class="w-message-text">
	  					<p>${data.text}</p>
	  				</div>
				</div>`);
	}).join(" ");

	messages.innerHTML = html;
};

var existeMensaje = function(mensaje) {
	mensaje = mensaje.trim();
	if (mensaje.length == 0) {
		return false;
	} else {
		return true;
	}
};