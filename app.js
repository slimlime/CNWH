//imports
var c = require('./config.json');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var fs = require('fs');
var chalk = require('chalk');
var csv = require('fast-csv');
var mongoose = require('mongoose');
var logger = require('winston');
var content = '{"data": []}'
var obj = JSON.parse(content);
var GoogleMapsAPI = require("googlemaps")
var fill = [];

var publicConfig = {
	key: '',
	stagger_time: 1000, // for elevationPath
	encode_polylines: false,
	secure: true
};
//var gmAPI = new GoogleMapsAPI(publicConfig);

/*var geocodeParams = {
	"address": "4215",
	"components": "components=country:GB",
	"bounds": "55,-1|54,1",
	"language": "en",
	region: "au"
};

gmAPI.geocode(geocodeParams, function (err, result) {
	console.log(result.results[0].geometry.location);
	var latlng = result.results[0].geometry.location.lat + "," + result.results[0].geometry.location.lng;
	var reverseGeocodeParams = {
		"latlng": latlng,
		"result_type": "postal_code",
		"language": "en",
		"location_type": "APPROXIMATE"
	};
	gmAPI.reverseGeocode(reverseGeocodeParams, function (err, result) {
		console.log(result.results[0].postcode_localities);
	});
})*/



//server public files
app.use(express.static(__dirname + '/www'));

mongoose.connect('mongodb://localhost/cnwh');
var database = require('./app/database.js')(mongoose, chalk);

//Database Models
var schemas = {};
var models = {
	mongoose: mongoose,
	Rent: require('./app/models/Rent.js')(mongoose, schemas),
};

//Controllers - database functions
var controller = {
	Rent: require('./app/controllers/rent.js')(models, logger),
};


if (c.create) {
	controller.Rent.drop(function () {
		fs.createReadStream("csv/rent.csv")
			.pipe(csv())
			.on("data", function (data) {
				//obj['data'].push(data);
				fill.push({
					"post": data[0].substr(3),
					"avgInc": data[3],
					"avgRent": data[4],
					"avgMortgage": data[2],
					"closestCity": "",
					"subs": []
				});
				//console.log("hey");


			})
			.on("end", function () {
				console.log("done");
				//content = JSON.stringify(obj);
				console.log(fill.length);

				//console.log(content);
				/*fs.writeFile('data/events.json', content, (err) => {
					if (err) throw err;
					console.log('It\'s saved!');
				});*/
				var i = 0;

				function go() {
					console.log("finished one index: " + i);
					//srPerformGeocode("TD Tower, 55 King Street West, Toronto, ON, Canada, M5K 1A2");
					if (i < fill.length) {
						var geocodeParams = {
							"address": fill[i].post,
							"components": "components=country:AU",
							"bounds": "55,-1|54,1",
							"language": "en",
							region: "au"
						};

						gmAPI.geocode(geocodeParams, function (err, result) {

							console.log(result);
							//console.log(result.results[0].geometry.location);
							var latlng = result.results[0].geometry.location.lat + "," + result.results[0].geometry.location.lng;
							var reverseGeocodeParams = {
								"latlng": latlng,
								"result_type": "postal_code",
								"language": "en",
								"location_type": "APPROXIMATE"
							};
							gmAPI.reverseGeocode(reverseGeocodeParams, function (err, result) {
								console.log("hi");
								console.log(result);
								console.log(i);
								if (typeof result.results[0] != "undefined") {
									fill[i].closestCity = result.results[0].address_components[2].short_name;
									fill[i].subs = result.results[0].postcode_localities;
								}
								controller.Rent.createPlace(fill[i], function (place) {
									console.log("place created");
									//i++;
								});
							});
						});
						i++;
						setTimeout(go, 100);
					}
				}
				go();

			});
	});

}




//route for files etc
require('./app/routes.js')(app, controller, fs);

//Server connection
var server = require('./app/server.js')(http, 3000, chalk);