(function (global) {
  "use strict";

  // ------------------------------------------------------------------
  function generateRandomPointInUzbekistan() {
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

    return [randomLongitude, randomLatitude];
  }
  // ------------------------------------------------

  var ZOOM = 6;
  var COORDINATES = [41.381166, 64.5735819];
  var MAP_ID = "map";

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

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 40,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
  }

  function populateDots() {
    fetchJSON("data/votes.json").then(function (json) {
      json.forEach(function (element) {
        markers.addLayer(
          L.marker(generateRandomPointInUzbekistan()).bindPopup(element.MANZIL)
        );
      });
      map.addLayer(markers);
    });
  }

  initMap();
  populateDots();
})(this);
