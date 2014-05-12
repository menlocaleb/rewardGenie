var infowindow;
var pos;
var map;
var services;
// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see a blank space instead of the map, this
// is probably because you have denied permission for location sharing.

function initialize() {

  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
    pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);	
	setupMapSearch(pos);
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
  
}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }
  $("geolocationError").show();
  console.log(content);
}


function setupMapSearch(position) {
 
	map = new google.maps.Map(document.getElementById('map-canvas'), {
		center: position,
		zoom: 15
    });
	
	var infowindow = new google.maps.InfoWindow({
        map: map,
        position: position,
        content: 'Current Location'
      });	
	  
	map.setCenter(position);

	var input = /** @type {HTMLInputElement} */(
      document.getElementById('typeLocation'));
	  
	var autocomplete = new google.maps.places.Autocomplete(input);
	autocomplete.bindTo('bounds', map);
	  
	var request = {
		location: position,
		radius: '400',
		types: ['store']
	};
	  
	service = new google.maps.places.PlacesService(map);
	service.nearbySearch(request, callback);
}
var run = "one ";

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {

	
    for (var i = 0; i < results.length; i++) {		
		var categories = document.getElementById("localMerchants");

		var newOption = document.createElement('option');
		newOption.innerText = results[i].name;
		newOption.setAttribute('value', run + results[i].types);
		newOption.setAttribute('name', results[i].name);
		
		run = "two ";

		categories.appendChild(newOption);
    }
  }
}

function showLocation(value) {
	document.getElementById("location").innerHTML = value;
}

google.maps.event.addDomListener(window, 'load', initialize);