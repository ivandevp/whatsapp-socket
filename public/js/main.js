
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
          appId      : "714817465348572", //la appid de tu aplicación facebook
          status   : true,
      cookie   : true,
      xfbml    : true,
      oauth    : true //enables OAuth 2.0
        });
 
        //manejador para comprobar si el status del usuario ha cambiado o no 
        FB.Event.subscribe('auth.statusChange', function(response) {
          if (response.authResponse) {
            //si el usuario es logueado correctamente le saludamos
            FB.api('/me', function(me){
              if (me.name) {
								var foto = "<div class='avatar'>{{fotoprincipal}}</div>";

              	var plantilla = '<li>' + 
		  														'<div id="contac">' + 
											  						'<div>' + 
														        	'<div id="foto" class="avatar">{{foto}}</div>' +
											  							'<span id="saludo">{{saludo}}</span>' +
											  						'</div>' +
														        '<a href="#" id="salir">Cerrar Sesion</a>' +
													        '</div>' + 				
																'</li>' ;

								var agregrar ="";

								agregrar += plantilla.replace("{{saludo}}", me.name)
														.replace("{{foto}}", '<img src="https://graph.facebook.com/' + me.id + '/picture">')
								var a ="";
								a = foto.replace("{{fotoprincipal}}", '<img src="https://graph.facebook.com/' + me.id + '/picture">');
                // document.getElementById('saludo').innerHTML = me.name;
                // document.getElementById('foto').innerHTML = 
                // '<img src="https://graph.facebook.com/' + me.id + '/picture">';

                $("#fotoPrincipal").append(a);
                $("#listaContactos").append(agregrar);
                $("#borrar").css("display", "none");
              }
            })
          } else {
            //si el usuario no tiene permiso porque ha cerrado sesión o simplemente
            //no tiene permisos de la aplicación redirigimos al login
            window.location = "index.html";
          }
        });
    //al pulsar en salir cerramos sesión y mandamos al inicio
        document.getElementById('salir').addEventListener('click', function(){
          FB.logout();
        }); 
      } 

