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
var fill = [];




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
	var mapData = JSON.parse(fs.readFileSync('./subs.json', 'utf8'));
	controller.Rent.drop(function () {
		fs.createReadStream("csv/rent.csv")
			.pipe(csv())
			.on("data", function (data) {
				//console.log(data);
				var data2 = {
					"post": data[0].substr(3),
					"avgInc": data[4],
					"avgRent": data[6],
					"avgMortgage": data[7],
					"closestCity": "",
					"subs": [],
					"avgAge": data[3],
					"pop": data[2]
				};
				obj['data'].push(data2);
				controller.Rent.createPlace(data2, function (place) {
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
				addExtras(mapData);

			});
	});

}

function addExtras(mapData) {
	controller.Rent.getPlaces(function (data) {
		//console.log(data);
		for (var i = 0; i < data.length; i++) {
			for (var x = 0; x < mapData.length; x++) {
				//console.log(mapData[x]);
				if (mapData[x] && mapData[x].status == 'OK') {
					if (mapData[x].results[0].address_components)

						if (data[i].post == mapData[x].results[0].address_components[0].long_name) {

						for (var temp = 0; temp < mapData[x].results[0].address_components.length; temp++) {
							//console.log(data[i].closestCity, 0);
							if (mapData[x].results[0].address_components[temp].types[0] == "locality" || mapData[x].results[0].address_components[temp].types[0] == "political")
								data[i].closestCity = mapData[x].results[0].address_components[temp].short_name;
							//console.log(data[i].closestCity, 1);

						}
						if (typeof mapData[x].results[0].postcode_localities != "undefined")
							data[i].subs = mapData[x].results[0].postcode_localities;
						//console.log(data[i].closestCity, 2);
						controller.Rent.updatePlace(data[i]._id, data[i]);
						break;
					}
				}
			}
			console.log("finished one" + i);
		}

	});
}




//route for files etc
require('./app/routes.js')(app, controller, fs);

//Server connection
var server = require('./app/server.js')(http, 3000, chalk);