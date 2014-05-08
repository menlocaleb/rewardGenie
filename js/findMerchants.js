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
	getPlaces(pos);
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


function getPlaces(position) {

  var pyrmont = position;

  map = new google.maps.Map(document.getElementById('map-canvas'), {
      center: pyrmont,
      zoom: 15
    });

	var input = /** @type {HTMLInputElement} */(
      document.getElementById('typeLocation'));
	  
	var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);
	  
  var request = {
    location: pyrmont,
    radius: '400',
    types: ['store']
  };
  
  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {

    for (var i = 0; i < results.length; i++) {		
		var categories = document.getElementById("localMerchants");

		var newOption = document.createElement('option');
		newOption.innerText = results[i].name;
		newOption.setAttribute('value', results[i].types);
		newOption.setAttribute('name', results[i].name);

		categories.appendChild(newOption);
    }
  }
}

function showLocation(value) {
	document.getElementById("location").innerHTML = value;
}