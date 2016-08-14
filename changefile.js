var fs = require('fs');
var path = require('path');
var process = require("process");

var moveFrom = "./www/img/postcode2/";
var moveTo = "./www/img/postcode/"

// Loop through all the files in the temp directory
fs.readdir(moveFrom, function (err, files) {
	if (err) {
		console.error("Could not list the directory.", err);
		process.exit(1);
	}

	files.forEach(function (file, index) {
		// Make one pass and make the file complete
		var fromPath = path.join(moveFrom, file);
		if (file.substr(file.length - 3) == "JPG") {
			var toPath = path.join(moveTo, file.substr(0, file.length - 3) + "jpg");

		}
		if (file.substr(file.length - 4) == "jpeg")
			var toPath = path.join(moveTo, file.substr(0, file.length - 4) + "jpg");
		else var toPath = path.join(moveTo, file.substr(0, file.length - 3) + "jpg");

		fs.stat(fromPath, function (error, stat) {
			if (error) {
				console.error("Error stating file.", error);
				return;
			}

			if (stat.isFile())
				console.log("'%s' is a file.", fromPath);
			else if (stat.isDirectory())
				console.log("'%s' is a directory.", fromPath);

			fs.rename(fromPath, toPath, function (error) {
				if (error) {
					console.error("File moving error.", error);
				} else {
					console.log("Moved file '%s' to '%s'.", fromPath, toPath);
				}
			});
		});
	});
});