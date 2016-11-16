(function(d){
   var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement('script'); js.id = id; js.async = true;
   js.src = "//connect.facebook.net/en_US/all.js";
   ref.parentNode.insertBefore(js, ref);
 }(document));

window.fbAsyncInit = function() {
   FB.init({
    appId    : "714817465348572", //la appid de tu aplicación facebook
    status   : true,
		cookie   : true,
		xfbml    : true,
		oauth    : true //enables OAuth 2.0
  });

  FB.Event.subscribe('auth.statusChange', function(response) {
    if (response.authResponse) {
      FB.api('/me', function(me){
        if (me.name) {
					var foto = "<div class='avatar'>{{fotoprincipal}}</div>";

        	var plantilla = '<li>' + 
														'<div class="contac">' + 
								  						'<div>' + 
											        	'<div class="foto avatar">{{foto}}</div>' +
								  							'<span class="saludo">{{saludo}}</span>' +
								  						'</div>' +
										        '</div>' + 				
													'</li>' ;

					var agregrar ="";

					agregrar += plantilla.replace("{{saludo}}", me.name)
											.replace("{{foto}}", '<img src="https://graph.facebook.com/' + me.id + '/picture">')
					var a ="";
					a = foto.replace("{{fotoprincipal}}", '<img src="https://graph.facebook.com/' + me.id + '/picture">');

          $("#fotoPrincipal").prepend(a);
          $("#listaContactos").append(agregrar);
        }
      })
    } else {
      window.location = "index.html";
    }
  });


  document.getElementById('salir').addEventListener('click', function(e){
  	e.preventDefault();
    FB.logout();
  }); 
} 

