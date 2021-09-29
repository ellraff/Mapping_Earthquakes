let nav_day = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-day-v1/tiles/{z}/{x}/{y}?access_token={accessToken}'
, {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});


let nav_night = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-night-v1/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let baseMaps = {
  Day: nav_day,
  Night: nav_night
};

let map = L.map('mapid', {
  center: [44.0, -80.0],
  zoom: 2,
  layers: [nav_day]
})

L.control.layers(baseMaps).addTo(map);


let torontoData = "https://raw.githubusercontent.com/ellraff/Mapping_Earthquakes/main/torontoRoutes.json";

let myStyle = {
  color: "#ffffa1",
  weight: 2
}

d3.json(torontoData).then(function(data) {
    console.log(data)
  L.geoJson(data, {
    style: myStyle,
    onEachFeature: function(feature, layer) {
        layer.bindPopup("<h2>" + "Airline: " + feature.properties.airline + "</h2>" + "<h3>" + "Destination: " + feature.properties.dst + "</h3>").addTo(map)
  }
})
});
