$(function() {
  var map, spaceship, message, infowindow, geocoder;
  var smartkarma = new google.maps.LatLng(1.335056, 103.964932);

  initialize(); 

  function initialize() {
    var mapOptions = {
      zoom: 8,
      center: smartkarma
    };

    // understand how function works. Don't be afraid of the seemingly complex api,
    // they are just methods/functions waiting for you to use.
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  }

  // understand event and event handler
  $('#map-form').submit(function(e) {
    e.preventDefault();
    locateAddress();
  }); 

  function locateAddress() {
    
    var location = $('#map-input').val();

    // TODO: show alert info when no location is provided in the input box
    if(location == "") {
      alert("Please input a valid location");
      return;
    } 
  

    // use google map api to analysis your location
    geocoder = new google.maps.Geocoder();

    geocoder.geocode( { 'address': location}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var address = results[0].geometry.location;

        // lauch your spaceship here with valid address
        launchSpaceship(address);
      } else {
        alert('Unfortunately we cannot find your specified address.');
      }
    });
  }

  // TODO: fade out your spaceship image and show it on the map
  function launchSpaceship(address) {
    map.setZoom(8);
    map.panTo(address);
    var icon = {
        url: 'spaceship.png',
        scaledSize: new google.maps.Size(32, 32)
    }

    spaceship = new google.maps.Marker({
      position: address,
      map: map,
      icon: icon
    });

    // start to land your spaceship when it appears on the map after 0.5 second
    setTimeout(landSpaceship, 500);
  }
  
  function landSpaceship() {
    
    infowindow = new google.maps.InfoWindow( {
      content: "Landing..."
    });
    
    infowindow.open(map, spaceship);
    
    //start to zoom in after 0.5 second
    setTimeout(landSuccess, 2000);
  }
  
  function landSuccess() { 
    map.setZoom(67);
    infowindow.setContent("Landed Successfully!");
  }
});
