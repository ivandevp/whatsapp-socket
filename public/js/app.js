var socket = io();
  
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
        }
    }
};

socket.on("messages", function(data) {
  console.log(data);
  plantilla(data);
});

var enviar = function(e) {
  FB.api("/me", function(me){
    var payload = {
        author: me.name,
        text: mensajes.value
    };
    socket.emit("new-message", payload);
    mensajes.value = "";
  })
};

var plantilla = function(data) {
    var html = data.map(function(data, index) {
        return(`<div id="posicion" class="w-message w-message-out">
                  <div class="w-message-text">
                    <p>${data.author}</p>
                    <p>${data.text}</p>
                  </div>
                </div>`);
  }).join(" ");

  messages.innerHTML = html;
};


// var type = function(){
  // var ana = FB.api('/me', function(me){
  //   return me.name;
  // });

// mensajes.addEventListener("keydown" ,function(e){
//     // e.preventDefault();
//     console.log(mensajes.value);
//     // $("#type").text($("#saludo").text() +  " is typing");
//     var time = 400;
//     setTimeout(function(){
//       $("#type").text($("#saludo").text() +  " is typing");
//     }, time)
//   });
// }
// type();

var existeMensaje = function(mensaje) {
    mensaje = mensaje.trim();
    if (mensaje.length == 0) {
        return false;
    } else {
        return true;
    }
};


// typing
