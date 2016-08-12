//imports
var express = require('express');
var app = express();
var http = require('http').Server(app);
var fs = require('fs');
var chalk = require('chalk');
var csv = require('fast-csv');
var content = '{"data": []}'
var obj = JSON.parse(content);

fs.createReadStream("csv/rent.csv")
	.pipe(csv())
	.on("data", function (data) {
		obj['data'].push({
			"postCode": data[0].substr(3),
			"avgInc": data[3],
			"avgRent": data[4],
			"avgMortgage": data[2]
		})
	})
	.on("end", function () {
		console.log("done");
		content = JSON.stringify(obj);
		console.log(content);
		fs.writeFile('data/events.json', content, (err) => {
			if (err) throw err;
			console.log('It\'s saved!');
		});

	});

//server public files
app.use(express.static(__dirname + '/public'));

//route for files etc
require('./app/routes.js')(app);

//Server connection
var server = require('./app/server.js')(http, 3000, chalk);