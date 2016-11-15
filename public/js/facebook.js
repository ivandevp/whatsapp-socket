// cargamos el sdk de forma asincrónica
(function(d){
   var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement('script'); js.id = id; js.async = true;
   js.src = "//connect.facebook.net/en_US/all.js";
   ref.parentNode.insertBefore(js, ref);
 }(document));

// Iniciamos el sdk y su configuración
window.fbAsyncInit = function() {
  FB.init({
    appId      : "714817465348572",// la appid de tu aplicación facebook
    status   : true,
cookie   : true,
xfbml    : true,
oauth    : true // habilita oauth 2.0
  });

   //manejador para comprobar si el status del usuario ha cambiado o no 
  FB.Event.subscribe('auth.statusChange', function(response) {
    if (response.authResponse) {
      //si el usuario es logueado correctamente hacemos lo que queramos
      //en nuestro caso redirigimos
      FB.api('/me', function(me){
        if (me.name) {
           //en vez de redirigir, como la petición es realizada
           //sin refrescar, podemos hacer cualquier interacción
           //sin movernos de la página
           window.location = "index2.html";
        }
      })
    } 
  });

  //evento para iniciar sesión y pedir los permisos que pasemos en scope
  document.getElementById('fb').addEventListener('click', function(){
   FB.login(function(){}, {  });
  });
} 


