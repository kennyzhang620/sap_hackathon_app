var minZoomV = 3;
var maxZoomV = 18;
var homeCoords = [49.27767013573553, -122.91268085603525];
var mapSize = document.getElementById("map");
var lightStyle = 'https://tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png?access-token=qYOU04zmJXYprHE89esvVcT3qGW68VsSgDdYXjXUUmZgDRBajbH3e58EHY5bONXU';

var map = L.map('map', {
    minZoom: minZoomV,
    maxZoom: maxZoomV,
    zoomSnap: 1
}).setView(homeCoords, 3);

var tiles = L.tileLayer(lightStyle, {}).addTo(map);
map.attributionControl.addAttribution("<a href=\"https://www.jawg.io\" target=\"_blank\">&copy; Jawg</a> - <a href=\"https://www.openstreetmap.org\" target=\"_blank\">&copy; OpenStreetMap</a>&nbsp;contributors")

class SAP_Event {
	var EventID = 0;
	var deliveryType = "IN_PERSON";
	var locationT = "Address";
	var date = Date();
	var time24 = Time();
	
	// delivery means format (In-Person or Virtual)
	// location is the address of the event if it is in person, or the invitation link if online.
	// All items in this class must be filled in. Null or tentative parameters are not permitted.
	
	SAP_Event(ID, delivery, location, DateObj, time24H) {
		if (ID != null) {
			
		}
	}
	
	
}

function extractDBData(url) {
	var txtFile = new XMLHttpRequest();
	parsedD = null;
	
	txtFile.open("GET", url, false);
	txtFile.onload = function (e) {
		if (txtFile.readyState === 4) {
			if (txtFile.status === 200) {
				var csvData = txtFile.responseText;

				parsedD = csvData;
			} else {
				console.error(txtFile.statusText);
			}
		}
	};
	txtFile.onerror = function (e) {
		console.error(txtFile.statusText);
	};

	txtFile.send();
	
	return parsedD;
}


/*
	Temporary code. To be removed after extraction!
	
	Temp code start.
*/
var bingKey = "AvEQ1m7_88IHqh6gFAaKUTUuuqbz_zrvMU7HEEu_vX6qXguJOWIQk4WqS-01xSAq";
function GeoCode(query) {
	var geocoderURL = "https://dev.virtualearth.net/REST/v1/Locations/" + query + "?" + "o=json&key=" + bingKey;

	var getLatLong = new XMLHttpRequest();
	var coords = [];

	console.log(geocoderURL);
	getLatLong.open("GET", geocoderURL, false);

	getLatLong.onload = function (e) {
		if (getLatLong.readyState == 4) {
			if (getLatLong.status == 200) {
				var data = JSON.parse(getLatLong.responseText);

				if (data.authenticationResultCode == "ValidCredentials") {
					var points = data.resourceSets;

					if (points.length > 0) {
						if (points[0].resources.length > 0) {
							if (points[0].resources[0].geocodePoints.length > 0) {
								if (points[0].resources[0].geocodePoints.length > 0)
								coords = points[0].resources[0].geocodePoints[0].coordinates;
                            }
                        }
                    }
				}
				
			}
			else {
				console.error(getLatLong.statusText);
            }
        }
	}

	getLatLong.onerror = function (e) {
		console.error(getLatLong.statusText);
	};

	getLatLong.send();

	return coords;
}

// Temp code end

console.log(extractDBData("https://kennyzhang620.github.io/vis_data.csv"));
console.log(GeoCode("SAP Software Europe"))
