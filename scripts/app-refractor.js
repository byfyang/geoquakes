// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var $quakesList;
var map;
var template;

$(document).on("ready", function() {

	initMap();

	$quakesList = $.ajax({
		method: 'GET',
		url: weekly_quakes_endpoint
	})
	.done(function(data){
		onSuccess(data);
		//created a function for markers & comileHandlebar
	})

	.fail(function(response){
		console.log("error: ", response);
	});

});

//function for markers/compilehandbarstemplate
function onSucess(data){
	var earthquakes = data.features;
	createMarkers(earthquakes);
	compileHandlebarsTemplate(earthquakes, "info", "#quakes-template");
}

//function for creatingMarkers using the JSON data
function createMarkers(locationArray){
	locationArray.forEach(function(location){
		var tempLat = location.geometry.coordinates[1];
		var tempLng = locaiton.geometry.coordinates[0];
		new google.maps.Marker({
			position: new google.maps.LatLng(tempLat, tempLng),
			map: map,
			title: location.properties.title
		});
	});
}

//compile Handlebar
function compileHandlebarsTemplate(data, targetHtml, targetScript){
	var source = $(targetScript).html();
	template = Handlebars.compile(source);

	var dataTemplate = template({quakes: data});
	$(targetHtml).append(dataTemplate);
}


function initMap() {
		var pos = {lat: 37.78, lng: -122.44 };

        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 37.78, lng: -122.44},
          zoom: 5
  	});
        var marker = new google.maps.Marker({
        	position: pos,
        	map: map,
        	title: "San Francisco"
        });

  }

