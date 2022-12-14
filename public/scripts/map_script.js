var minZoomV = 3;
var maxZoomV = 18;
var homeCoords = [49.27767013573553, -122.91268085603525];
var mapSize = document.getElementById("map");
var lightStyle = 'https://tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png?access-token=qYOU04zmJXYprHE89esvVcT3qGW68VsSgDdYXjXUUmZgDRBajbH3e58EHY5bONXU';
var visibleMarkers = [];
var displayLimit = [0, 20];
var dLimitIncrement = 20
var locationEntries = []
var scheduledEvents = []

const dmethod = document.getElementById('delivery_m');
const country_m = document.getElementById('country_m');
const state_prov_m = document.getElementById('state_prov_m');
const city_m = document.getElementById('city_m');
const date_m = document.getElementById('date_time_m');
const indexV = document.getElementById('indicator');

var map = L.map('map', {
    minZoom: minZoomV,
    maxZoom: maxZoomV,
    zoomSnap: 1
}).setView(homeCoords, 3);

var tiles = L.tileLayer(lightStyle, {}).addTo(map);
map.attributionControl.addAttribution("<a href=\"https://www.jawg.io\" target=\"_blank\">&copy; Jawg</a> - <a href=\"https://www.openstreetmap.org\" target=\"_blank\">&copy; OpenStreetMap</a>&nbsp;contributors")

function Searchable(results) {
	console.log("rxa",results, results.results.length);
	for (var x = 0; x < results.results.length; x++) {
		console.log("sa: -->", results.results[x])
		scheduledEvents.push(new SAP_Event(results.results[x].eventid, results.results[x].type, results.results[x].city, results.results[x].country, results.results[x].state, results.results[x].date.slice(0,10), results.results[x].time));
		console.log('test', scheduledEvents[0])
	}
}

function clearPoints() {
	for (var x = 0; x < visibleMarkers.length; x++) {
		map.removeLayer(visibleMarkers[x]);
	}

	visibleMarkers.length = 0;
}

function shiftSet(N) {
	if (N == 0) {
		if (displayLimit[0] > 0 && displayLimit[1] > 20) {
			displayLimit[0] -= 20;
			displayLimit[1] -= 20;

			search();
        }
	}

	if (N == 1) {
		if (displayLimit[0] < scheduledEvents.length && displayLimit[1] < scheduledEvents.length) {
			displayLimit[0] += 20;
			displayLimit[1] += 20;

			search();
		}
	}

}

function search() {
	console.log("test-click!", dmethod.value, country_m.value, state_prov_m.value, city_m.value, date_m.value);
	indexV.innerHTML = displayLimit[0] + '-' + displayLimit[1];
	clearPoints();
	plotPointsArray(locationEntries, displayLimit[0], displayLimit[1], [dmethod.value, country_m.value, state_prov_m.value, city_m.value, date_m.value]);
}

function plotPointsArray(arr, min, limit, searchField) { // SearchField = [type, country, state, city, date_time(as DT)]
	if (limit > scheduledEvents.length)
		limit = scheduledEvents.length;

	for (var i = min; i < limit; i++) {
		console.log("sas: ", scheduledEvents[0]);
		for (var j = 0; j < arr.results.length; j++) {

			var typeF = false;
			var typeC = false;

			var typeT = false;

			if (arr.results[j].xcoordinate != null && arr.results[j].ycoordinate != null) {
				console.log("tst: ", scheduledEvents[i], typeF, typeC
					, scheduledEvents[i].location_state().includes(searchField[2]) ,scheduledEvents[i].location_city().includes(searchField[3])
					, arr.results[j].city, scheduledEvents[i].location_city(), arr.results[j].country, scheduledEvents[i].location_country()
					, arr.results[j].state, scheduledEvents[i].location_state())

				if (searchField[0] == 'Any') {
					typeF = true;
				}
				else {
					typeF = scheduledEvents[i].e_type().includes(searchField[0])
				}

				if (searchField[1] == 'ALL_C') {
					typeC = true;
				}
				else {
					typeC = arr.results[j].country.includes(searchField[1])
				}

				const se_gtime = new Date(date_m.value).getTime();

				if (!isNaN(se_gtime)) {
					typeT = se_gtime == scheduledEvents[i].get_date_time().getTime();
				}
				else {
					typeT = true;
                }

				if ((typeF && typeC
					&& (arr.results[j].state.includes(searchField[2]) && arr.results[j].city.includes(searchField[3]))
					&& typeT) && j < 40) {
					console.log("YES!!!", arr.results[j]);
					var pt = [arr.results[j].xcoordinate, arr.results[j].ycoordinate]
					var metadata = `<a href="/calendar"><input type="image" src="icons/sample.jpg" style="width: 100%; height: 100%;"/> SAP Office at ${arr.results[j].address}</a>`;

					if (scheduledEvents[i].e_type() != "IN-PERSON")
						visibleMarkers.push(plotPoints(pt, 'green', 0.9, 300, j, metadata));
					else
						visibleMarkers.push(plotPoints(pt, 'black', 0.9, 300, j, metadata));
				}
			}
		}

		
	}
}

function plotPoints(latLongPairs, colour, opacity, rad, count, metadata) {
	console.log("LL: ", latLongPairs)
    var labelTxt = L.divIcon({ className: 'my-div-icon', html: `<div id="label_${count}" style="text-align:center;color: white; opacity: ${opacity}; background-color: ${colour};width: 20px;height: 20px;border-radius: 30px; font-size: 14px;">${count + 1}</div>` });

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

// Testing

locationEntries = extractDBData("/addr");

Searchable(extractDBData("/events"));

console.log("A_>", scheduledEvents[0].eventID());
search();
console.log("sch: ", scheduledEvents);

