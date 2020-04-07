
var queryURL = "https://corona.lmao.ninja/countries"
var geojson;
var lat;
var lng;
var country;
var totalCases;
var recoveredCases;
var totalDeaths;
var activeCases;
var criticalCases;
var mapData;


$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {

    console.log(response); // check if the ajax call was successful.
    mapData = response;
    var checkData = Array.isArray(mapData) && mapData.length > 0;

    if (!checkData) {
        return;
    }
    var longUS = mapData[0].countryInfo.lat; // find longitude for US only
    console.log(longUS)

    //loop through data set to return long/lat values for every country
    for (var i = 0; i < mapData.length; i++) {
        //console.log(mapData[i].countryInfo.lat)
        lat = mapData[i].countryInfo.lat;
        lng = mapData[i].countryInfo.long;
        country = mapData[i].country;
        totalCases = mapData[i].cases;
        recoveredCases = mapData[i].recovered;
        totalDeaths = mapData[i].deaths;
        activeCases = mapData[i].active;
        criticalCases = mapData[i].critical;


        // convert data to GeoJSON 
        geojson = {
            "name": "NewFeatureType",
            "type": "FeatureCollection",
            "features":
                [{
                    "type": "Feature",
                    "geometry": {
                        "type": "point",
                        "coordinates": [lng, lat]
                    },
                    "properties": country
                }]
        };
        console.log(geojson)

        





    }
    //get points into map using Leaflet L.geoJSON(geojsonFeature).addTo(map); string.slice(start, end)
    var layer = L.geoJSON(geojson, {
        pointToLayer: (feature = {}, [lat, lng]) => {
            properties = { country, flag, criticalCases, activeCases, totalDeaths, recoveredCases, totalCases }
            let caseString = `${totalCases}`;
            if (totalCases > 1000) {
                caseString = `${caseString.slice(0, 3)}k+`
            }
            var html = `
            <span class=“icon-marker”>
            <span class=“icon-marker-tooltip”>
              <h2>${country}</h2>
              <ul>
                <li><strong>Confirmed:</strong> ${cases}</li>
                <li><strong>Deaths:</strong> ${deaths}</li>
                <li><strong>Recovered:</strong> ${recovered}</li>
                <li><strong>Last Update:</strong> ${updatedFormatted}</li>
              </ul>
            </span>
            ${ casesString}
          </span>
            `

            return L.marker([lat, lng], {
                icon: L.divIcon({ className: 'icon' }, html)

            })

            //riseOnHover: true});
        }

    })



            //layer.addTo(map);

})






            console.log(criticalCases)

            var accessToken = 'pk.eyJ1IjoianVsaWV0LWdlb3JnZSIsImEiOiJjazhnOXNzN3gwMXoyM2RxbjNzbXdrYXJjIn0.a653svYKdCmg2wkjY5HxVg';
            var map = L.map('map').setView([20, 0], 2);

            // Add tiles from the Mapbox Static Tiles API
            // (https://docs.mapbox.com/api/maps/#static-tiles)
            // Tiles are 512x512 pixels and are offset by 1 zoom level
            L.tileLayer(
                'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=' + accessToken, {
                tileSize: 512,
                zoomOffset: -1,
                attribution: '© <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);