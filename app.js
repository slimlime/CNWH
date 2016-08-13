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

var publicConfig = {
	key: 'AIzaSyATlr8T7UkQhk0Y2oyiR416UZa7KU28F_Q',
	stagger_time: 1000, // for elevationPath
	encode_polylines: false,
	secure: true
};
var gmAPI = new GoogleMapsAPI(publicConfig);

var geocodeParams = {
	"address": "ashmore, QLD",
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
		console.log(result.results[0].address_components);
	});
});



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
				var data = {
					"post": data[0].substr(3),
					"avgInc": data[3],
					"avgRent": data[4],
					"avgMortgage": data[2]
				};
				obj['data'].push(data);
				controller.Rent.createPlace(data, function (place) {
					//console.log("place created");
				});
			})
			.on("end", function () {
				console.log("done");
				content = JSON.stringify(obj);
				//console.log(content);
				fs.writeFile('data/events.json', content, (err) => {
					if (err) throw err;
					console.log('It\'s saved!');
				});

			});
	});

}

//route for files etc
require('./app/routes.js')(app, controller, fs);

//Server connection
var server = require('./app/server.js')(http, 3000, chalk);