(function (global) {
  "use strict";

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
    markers = L.markerClusterGroup()

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 40,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
  }

  function populateDots() {
    fetchJSON("data/votes.json").then(function (json) {
      json.forEach(function (element) {
        markers.addLayer(L.marker([40.422458, 71.582819]));
      })
      map.addLayer(markers);
    });
  }

  initMap();
  populateDots();
})(this);

// var map = L.map("map").setView([41.381166, 64.5735819], 6);

// L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
//   maxZoom: 19,
//   attribution:
//     '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
// }).addTo(map);

// var marker = L.marker([40.422458, 71.582819]).addTo(map);

// marker.bindPopup("<b>My home is here :)</b>");
