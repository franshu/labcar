function initMap() {
	var map = new google.maps.Map(document.getElementById("map"), {
		zoom: 5,
		center: {lat: -35.4232444, lng: -71.64848039999998},
		mapTypeControl: false,
		zoomControl: false,
		streetViewControl: false
	});

	function buscar(){
		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
		}
	}

	window.addEventListener("load", buscar);
	var latitud, longitud;
	var funcionExito = function(posicion) {
		latitud = posicion.coords.latitude;
		longitud = posicion.coords.longitude;

		var miUbicacion = new google.maps.Marker({
			position: {lat:latitud, lng:longitud},
			animation: google.maps.Animation.DROP,
			map: map
		});

		map.setZoom(15);
		map.setCenter({lat:latitud, lng:longitud});
	}

	var funcionError = function (error) {
		alert("No encontramos tu ubicación");
	}

/* AUTOCOMPLETADO */
     var inputO = (document.getElementById('origen'));
     var autocomplete = new google.maps.places.Autocomplete(inputO);
         autocomplete.bindTo('bounds', map);

    var inputD = (document.getElementById('destino'));
     var autocomplete = new google.maps.places.Autocomplete(inputD);
         autocomplete.bindTo('bounds', map);

    var directionsService = new google.maps.DirectionsService;//Se comunica con el servicio de indicaciones de la Google Maps API
     var directionsDisplay = new google.maps.DirectionsRenderer;

    document.getElementById('origen').addEventListener('change', onChangeHandler);
     document.getElementById('destino').addEventListener('change', onChangeHandler);


    function trazarRuta(directionsService, directionsDisplay) {
         directionsService.route({
             origin: document.getElementById('origen').value,
             destination: document.getElementById('destino').value,
             travelMode: 'DRIVING'
             },
         function(response, status) {
              if (status === 'OK') {
                 directionsDisplay.setDirections(response);
               } else {
                 window.alert('No se encontró la ruta ' + status);
             }
         });
     }
/* calcular ruta */
		var calcularRuta = function(directionsService,directionsDisplay){
			directionsService.route({
				origin: start.value,
				destination: end.value,
				travelMode: 'DRIVING'
			}, function (response,status){
				if (status === 'OK') {
	      		directionsDisplay.setDirections(response);
	    		}else{
				window.alert("Ruta no registrada");
				}
			});
		}

		directionsDisplay.setMap(map);
		var trazarRuta = function(){
			calcularRuta(directionsService,directionsDisplay);
		};

		document.getElementById("ruta").addEventListener('click', trazarRuta);  	
};