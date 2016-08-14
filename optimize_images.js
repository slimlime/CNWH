var fs = require('fs');
var path = require('path');
var process = require("process");
var tinify = require('tinify');
tinify.key = 'Dud7uMmm3Nf3JMeuSInSBU28unz8BkDk';


moveFrom = 'www/img';

    // Loop through all the files in the temp directory
    fs.readdir(moveFrom, function (err, files) {
	if (err) {
		console.error("Could not list the directory.", err);
		process.exit(1);
	}

	files.forEach(function (file, index) {

        var fromPath = path.join(moveFrom, file);

        console.log('Uploading file:' + file);
        img = ''
        var source = tinify.fromFile(fromPath);
        var resized = source.resize({
            method: "fit",
            width: 1000,
            height: 1000
        });
        resized.toFile(fromPath);
        console.log('Finished file: ' + file);

	});
});