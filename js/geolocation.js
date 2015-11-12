$("#error").hide();
$("#hud").show();

if(navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(gotLocation, gotError);
} else {
	displayError("Your browser doesn't support geolocation.");
}

function gotLocation(currentPosition) {
  $("#hud").hide();

  var $favorites = $("span");
  
  $favorites.each(function(){
    var favoriteLatitude = $(this).data("lat");
    var favoriteLongitude = $(this).data("lon");
    
    var distanceInMiles = calculateDistance(currentPosition.coords.latitude, currentPosition.coords.longitude, favoriteLatitude, favoriteLongitude);
    
    $(this).text(distanceInMiles);
  });
}

function gotError(error) {
	var message;

	switch(error.code) {
		case error.PERMISSION_DENIED:
		message = "You need to give permission to use your location to calculate distances.";
		break;
		case error.POSITION_UNAVAILABLE:
		message = "There was an issue getting your location from your device. Please refresh the page.";
		break;
		case error.TIMEOUT:
		message = "It took too long getting your position.";
		break;
		default:
		message = "An unknown error occured. Please refresh the page.";
		break;
	}

	displayError(message);
}

function displayError(message) {
  $("hud").hide();
  $("#error").text(message).slideDown("slow");
}