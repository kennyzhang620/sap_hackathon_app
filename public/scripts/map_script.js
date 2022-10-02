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


function plotPointsArray(arr, limit) {
	for (var i =0;i<limit;i++) {
		console.log("sas: ", arr.results[i]);
		
		if (arr.results[i].xcoordinate != null && arr.results[i].ycoordinate != null) {
		plotPoints([arr.results[i].xcoordinate, arr.results[i].ycoordinate], 'red', 0.9, 30, i, "testing!");
	}
	}
}

function plotPoints(latLongPairs, colour, opacity, rad, count, metadata) {
    var labelTxt = L.divIcon({ className: 'my-div-icon', html: `<div id="label_${count}" style="text-align:center;color: white; opacity: 0.5; background-color: ${colour};width: 20px;height: 20px;border-radius: 30px; font-size: 14px;">${count + 1}</div>` });

   			   const markerT = L.marker(latLongPairs, {
				   icon: labelTxt, id: count
   			}).addTo(map);
			markerT.bindPopup(metadata);
			return markerT;
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

console.log(GeoCode("SAP Perú SAC Av. Circunvalación del Club Golf Los Incas No. 154,Piso 16, Oficina No. 1601,Santiago de Surco, Lima, Perú"))

eventt = new SAP_Event(9,"IN_PERSON", "655 HOWE STREET, VANCOUVER, BC, CANADA", "1999-02-20", "10:00:00");

console.log(eventt);

// Testing

plotPointsArray(extractDBData("/addr"), 25)
plotPoints(homeCoords, 'green', 0.9, 50, 9, "test!");
