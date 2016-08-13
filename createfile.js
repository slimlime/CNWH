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
var fill = [];
//var GoogleMapsAPI = require('googlemaps')
var count = 0;

var publicConfig = {
	key: 'AIzaSyBIwbBLiGtm7cEx1MgjgISoHRwnfnKnm_o',
	stagger_time: 1000, // for elevationPath
	encode_polylines: false,
	secure: true
};
var gmAPI = new GoogleMapsAPI(publicConfig);
var data2 = [];
fs.createReadStream("csv/rent.csv")
	.pipe(csv())
	.on("data", function (data) {
		data2.push({
			"post": data[0].substr(3)
		})
	})
	.on("end", function () {
		console.log("done");
		checkGoogle();
	});

function checkGoogle() {
	if (count < data2.length) {
		console.log(data2[count], count)
		var geocodeParams = {
			"address": data2[count].post,
			"components": "country:AU",
			"bounds": "55,-1|54,1",
			"language": "en",
			"region": "AU"
		};

		gmAPI.geocode(geocodeParams, function (err, result1) {
			if (err || result1.status == "ZERO_RESULTS") {
				console.log("Error, or zero results");
				count++;
				checkGoogle();

			} else {
				console.log(result1);
				var latlng = result1.results[0].geometry.location.lat + "," + result1.results[0].geometry.location.lng;
				console.log(latlng);
				var reverseGeocodeParams = {
					"latlng": latlng,
					"result_type": "postal_code",
					"language": "en",
					"location_type": "APPROXIMATE"
				};
				gmAPI.reverseGeocode(reverseGeocodeParams, function (err, result) {
					count++;
					fs.appendFile('subs.json', JSON.stringify(result) + ",", function (err) {
						console.log(new Date());
						checkGoogle()
					});
				});
			}
		});

	}
}