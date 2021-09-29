let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}'
, {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});


let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let baseMaps = {
  Street: streets,
  Dark: dark
};

let map = L.map('mapid', {
  center: [30, 30],
  zoom: 2,
  layers: [streets]
})

L.control.layers(baseMaps).addTo(map);


let airportData = "https://raw.githubusercontent.com/ellraff/Mapping_Earthquakes/main/majorAirports.json";

d3.json(airportData).then(function(data) {
    console.log(data);
  L.geoJson(data, {
    onEachFeature: function(feature, layer) {
        console.log(layer);
        layer.bindPopup("<h2>" + "Airport Code: " + feature.properties.faa + "</h2>" + "<h3>" + "Aiport Name: " + feature.properties.name + "</h3>").addTo(map)
  }
})
});
