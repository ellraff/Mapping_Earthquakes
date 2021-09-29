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
  center: [43.7, -79.3],
  zoom: 11,
  layers: [satelliteStreets]
})

L.control.layers(baseMaps).addTo(map);


let torontoHoods = "https://raw.githubusercontent.com/ellraff/Mapping_Earthquakes/main/torontoNeighborhoods.json";

let myStyle = {
  color: "blue",
  fillColor: "yellow",
  weight: 2
}

d3.json(torontoHoods).then(function(data) {
    console.log(data)
  L.geoJson(data, {
    style: myStyle,
    onEachFeature: function(feature, layer) {
        layer.bindPopup("<h2>" + "Neighborhood Name: " + feature.properties.AREA_NAME + "</h2>").addTo(map)
  }
})
});
