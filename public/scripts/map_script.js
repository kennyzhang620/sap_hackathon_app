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

function adjustWin0() {

	const zoomLevel = map['_zoom'];
	const zoom_logo_mapping = {};
	zoom_logo_mapping[3] = 16500;
	zoom_logo_mapping[4] = 11500;
	zoom_logo_mapping[5] = 86000;
	zoom_logo_mapping[6] = 66200;
	zoom_logo_mapping[7] = 52000;
	zoom_logo_mapping[8] = 41400;
	zoom_logo_mapping[9] = 30000;
	zoom_logo_mapping[10] = 20000;
	zoom_logo_mapping[11] = 10000;
	zoom_logo_mapping[12] = 9000;
	zoom_logo_mapping[13] = 8000;
	zoom_logo_mapping[14] = 7000;
	zoom_logo_mapping[15] = 6000;
	zoom_logo_mapping[16] = 5000;
	zoom_logo_mapping[17] = 4000;
	zoom_logo_mapping[18] = 3000;
	console.log("adjustWin ZOOM: ", zoomLevel);

	var maxV = (18500 / (maxZoomV / minZoomV)) - 50
	console.log("adjustWin marker length: ", markers.length);
	for (var a = 0; a < markers.length; a++) {

		markers[a].setStyle({ radius: zoom_logo_mapping[zoomLevel] });

		console.log(markers[a]['_mRadius']);
	}

	map.invalidateSize(true);

}



function plotPoints(latLongPairs, colour, opacity, rad, count, metadata) {
    var labelTxt = L.divIcon({ className: 'my-div-icon', html: `<div id="label_${count}" style="text-align:center;color: white; opacity: 0.5; background-color: ${colour};width: 20px;height: 20px;border-radius: 30px; font-size: 14px;">${count + 1}</div>` });

   			   const markerT = L.marker(latLongPairs, {
				   icon: labelTxt, id: count
   			}).addTo(map);
			markerT.bindPopup(metadata);
			return markerT;
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

eventt = new SAP_Event(9,"IN_PERSON", "655 HOWE STREET, VANCOUVER, BC, CANADA", "1999-02-20", "10:00:00");

console.log(eventt);
plotPoints(homeCoords, 'green', 0.9, 50, 9, "test!");
