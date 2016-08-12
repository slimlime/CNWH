//imports
var express = require('express');
var app = express();
var http = require('http').Server(app);
var fs = require('fs');
var chalk = require('chalk');

//server public files
app.use(express.static(__dirname + '/public'));

//route for files etc
require('./app/routes.js')(app);

//Server connection
var server = require('./app/server.js')(http, 3000, chalk);