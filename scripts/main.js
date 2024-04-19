(function (global) {
  "use strict";

  // ------------------------------------------------------------------
  function generateRandomPointInCentralAsia() {
    // Uzbekistan longitude and latitude boundaries
    const uzbekistanMinLongitude = 56.0; // Degrees East
    const uzbekistanMaxLongitude = 74.0; // Degrees East
    const uzbekistanMinLatitude = 37.0; // Degrees North
    const uzbekistanMaxLatitude = 46.0; // Degrees North

    // Generate random latitude and longitude within Uzbekistan boundaries
    const randomLongitude =
      Math.random() * (uzbekistanMaxLongitude - uzbekistanMinLongitude) +
      uzbekistanMinLongitude;
    const randomLatitude =
      Math.random() * (uzbekistanMaxLatitude - uzbekistanMinLatitude) +
      uzbekistanMinLatitude;

    return [randomLatitude, randomLongitude];
  }
  // ------------------------------------------------

  var ZOOM = 6;
  var COORDINATES = [41.381166, 64.5735819];
  var DATA_API = "data/votes.json"

  var MAP_ID = "map";
  var MAP_API = "https://tile.openstreetmap.org/{z}/{x}/{y}.png"

  var map;
  var markers;

  function fetchJSON(url) {
    return fetch(url).then(function (response) {
      return response.json();
    });
  }

  function initMap() {
    map = L.map(MAP_ID).setView(COORDINATES, ZOOM);
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
        markers.addLayer(
          L.marker(generateRandomPointInCentralAsia()).bindPopup(element.MANZIL)
        );
      });
      map.addLayer(markers);
    });
  }

  initMap();
  populateDots();
})(this);
