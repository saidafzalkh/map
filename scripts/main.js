(function (global) {
  "use strict";

  var ZOOM = 6;
  var DEFAULT_COORDINATES = [41.381166, 64.5735819];
  var DATA_API = "data/coordinates.json";

  var MAP_ID = "map";
  var MAP_API = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";

  var map;
  var markers;

  function fetchJSON(url) {
    return fetch(url).then(function (response) {
      return response.json();
    });
  }

  function initMap() {
    map = L.map(MAP_ID).setView(DEFAULT_COORDINATES, ZOOM);
    markers = L.markerClusterGroup();

    fetchJSON("geojson/uzbekistan_regional.geojson").then(function (geojson) {
      L.geoJSON(geojson).addTo(map);
    });

    L.tileLayer(MAP_API, {
      maxZoom: 40,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
  }

  function populateDots() {
    fetchJSON(DATA_API).then(function (json) {
      json.forEach(function (element) {
        if (element.coordinate) {
          var coordinate = element.coordinate
            .split(",")
            .reverse()
            .map((ll) => Number(ll));

          markers.addLayer(
            L.marker(coordinate).bindPopup(element.zona_id || "")
          );
        }
      });
      map.addLayer(markers);
    });
  }

  initMap();
  populateDots();
})(this);
