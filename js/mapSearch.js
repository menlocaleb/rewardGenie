function initialize() {

 // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
    pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);
	 setupMap(pos);
	// alert("Get here 1");
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
  
}

function addControl(controlDiv){
  var input = document.createElement('div');
  input.className = "controls";
  input.id = "pac-input";
  controlDiv.appendChild(input);

  var types = document.createElement('div');
  types.className = "controls";
  types.id = "type-selector";
  controlDiv.appendChild(types);




}


function setupMap(position) {

  var mapOptions = {
    center: position,
    zoom: 13
  };
  var map = new google.maps.Map(document.getElementById('map-canvas2'),
    mapOptions);

  var input = /** @type {HTMLInputElement} */(
      document.getElementById('pac-input'));


  //var types = document.getElementById('type-selector');
  var clearButton = document.getElementById('input-control')
  var types = document.getElementById('type-selector');




  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(clearButton);

  

  $("#pac-input").css("display","block");
  $("#type-selector").css("display","block");

  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);

  var infowindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29)
  });

  google.maps.event.addListener(autocomplete, 'place_changed', function() {

    infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);

    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);  // Why 17? Because it looks good.
    }
    marker.setIcon(/** @type {google.maps.Icon} */({
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(35, 35)
    }));
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }

    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
    infowindow.open(map, marker);


    console.log(place);
    // Do card recommendations based on place.types
    // function from db.js
    getApplicableCards(place.types, place.name, function(offers) {
      if (offers.length > 0) {
        console.log(offers);
        showBestCard(offers[0]);
      } else {
        //console.log("no applicable cards found.")
        showBestCard(false);
      }
    });

  });


  setupClearListener('#clear-pac-input', '#pac-input', infowindow);

	
}

function setupClearListener(id, inputId, info) {
  $(id).click(function() {
    $(inputId).val("");
    $("#bestCard").html("");
    info.close();
  });
}

// Sets a listener on a radio button to change the filter type on Places
// Autocomplete.
/*
function setupClickListener(id, types) {
  var radioButton = document.getElementById(id);
  google.maps.event.addDomListener(radioButton, 'click', function() {
    autocomplete.setTypes(types);
  });

  setupClickListener('changetype-all', []);
  setupClickListener('changetype-establishment', ['establishment']);
  setupClickListener('changetype-geocode', ['geocode']);
}
*/

function handleNoGeolocation(errorFlag) {
	
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }
  $("geolocationError").show();
  console.log(content);
}


function showBestCard(offer) {
  if (offer) {
    $("#bestCard").html("<h2>Best card to use is the <strong>" + offer.card().getBank() + " " + offer.card().getCardName() + "</strong> card.</h2> <h3>" + offer.card().getOfferDescription() + "</h3>");
  } else {
    $("#bestCard").html("<h4><span class='label label-danger'>No Results</span> Unfortunately, we didn't find any cards that offered rewards at this location.</h4>")
  }
}






//google.maps.event.addDomListener(window, 'load', initialize);



