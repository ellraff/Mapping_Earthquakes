let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}'
, {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});


let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let baseMaps = {
  "Streets": streets,
  "Satellite Streets": satelliteStreets
};

let map = L.map('mapid', {
  center: [39.5, -98.5],
  zoom: 3,
  layers: [streets]
})

L.control.layers(baseMaps).addTo(map);


let earthquakes = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

let myStyle = {
  color: "blue",
  fillColor: "yellow",
  weight: 2
}

d3.json(earthquakes).then(function(data) {
    console.log(data)
  L.geoJson(data, {
    style: myStyle,
    onEachFeature: function(feature, layer) {
        layer.bindPopup("<h2>" + "Magnitude: " + feature.properties.mag + "</h2>" + "<h3>" + "Place: " + feature.properties.place + "</h3>").addTo(map)
  }
})
});
