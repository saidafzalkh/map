(function (global) {
  "use strict";

  const ZOOM = 6;
  const DEFAULT_COORDINATES = [41.381166, 64.5735819];
  const DATA_API = "data/coordinates.json";

  const MAP_ID = "map";
  const MAP_API = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";

  let map;
  let markers;

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

  function populatePointsOnMap() {
    fetchJSON(DATA_API).then(function (json) {
      json.forEach(function (element) {
        if (element.coordinate) {
          var coordinate = element.coordinate
            .split(",")
            .reverse()
            .map((ll) => Number(ll));

          markers.addLayer(
            L.marker(coordinate).bindPopup(element.zona_id + " - sonli saylov uchastkasi")
          );
        }
      });
      map.addLayer(markers);
    });
  }

  initMap();
  populatePointsOnMap();
})(this);
