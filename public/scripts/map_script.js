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


function plotPointsArray(arr) {
	console.log("XASS: ", arr);
	var coords = [];
	for (var i =0;i<arr.results.length;i++) {
		try {
			var d = GeoCode(arr.results[i].city + ', ' + arr.results[i].state + ', ' + arr.results[i].country);
			console.log(arr.results[i], "->",i, d);
		tempF(arr.results[i].id, d[0], d[1]);
		
		}
		catch(exc) {
			
		}
	}
	
	console.log(coords.length);
	for (var x=0;x<coords.length;x++) {
	//	if (coords[x] != null && coords[x].length > 0) {
		//	plotPoints(coords[x], 'red', 0.9, 25, 1, "hello!");
	//	}
	}
}

function tempF(id, x, y) {
	
	console.log("da: ", id, x, y)
	if (id == null)
		id = "undefined";
	
	if (x == null)
		x = "undefined"
	
	if (y == null)
		y = "undefined";
	var txtFile = new XMLHttpRequest();
	    txtFile.open("POST", "/append", false);

	    txtFile.setRequestHeader("Accept", "application/json");
	    txtFile.setRequestHeader("Content-Type", "application/json");

	    let image_encoded = `{
	    "id": ${id},
		"lat": ${x},
		"long": ${y}	
	    }`;
	    txtFile.onload = function (e) {
	        if (txtFile.readyState === 4) {
	            if (txtFile.status === 200) {
	                var csvData = txtFile.responseText;

	                if (csvData != '-1') {
	                    console.log(csvData, "Response");
	                }

	            }
	            else {
	                console.error(txtFile.statusText);
	            }
	        }
	    };

	    txtFile.onerror = function (e) {
	        console.error(txtFile.statusText);
	    };

	    txtFile.send(image_encoded);
	
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

plotPointsArray(extractDBData("/addr"))
plotPoints(homeCoords, 'green', 0.9, 50, 9, "test!");
