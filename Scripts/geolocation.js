
/*eslint-env browser*/
function createDrivingDirectionsMap()
{	//if geo location is supported in the browser
	if (navigator.geolocation)
		{
			//get current position and passing 2 fuction OnSuccess and OnError
			navigator.geolocation.getCurrentPosition (OnSuccess , OnError,{
				enableHighAccuracy: true,
				maximumAge : 1000,
				timeout: 500
			});
			}
	else {
		document.getElementById(map).innerHTML = "No Support for Geolocation, we can't find you:( "
	}
		}
function OnSuccess(position)
{
	showMap(
	position.coords.latitude,
	position.coords.longitude
		);
	
}
function OnError()
{
	var mapDiv = document.getElementById("map");
	switch (error.code)
		{
		case error.PERMISSION_DENIED:
			mapDiv.innerHTML = "User denied the request for geolocation."
			break;
        case error.POSITION_UNAVAILABLE:
            mapDiv.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            mapDiv.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            mapDiv.innerHTML = "An unknown error occurred."
            break;
    }

		}
function showMap(lat , laong)
{
	var directionservice = new google.maps.DirectionsService();
	var directionrenders = new google.maps.DirectionRenderer();
	
	var route = {
		origin: new google.maps.latLng(lat , long),
		destination: "Al-eman , Houston",
		travelMode:google.maps.DirectionTravelMode.DRIVING
	}
	
	var mapOptions = {
        zoom: 10,
        center: new google.maps.LatLng(50.8504500, 4.3487800),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    directionrenders.setMap(map);
    directionrenders.setPanel(document.getElementById("driving-directions"));
    directionservice.route(route, function (result, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionrenders.setDirections(result);
        }
    });
}

