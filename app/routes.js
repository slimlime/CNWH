module.exports = function (app, controller, fs) {

	//file paths
	var paths = {
		buildFiles: {
			root: './www'
		}
	}

	//main routing

	//landing page
	app.get('/', function (req, res) {
		res.sendFile('index.html', paths.buildFiles);
	});

	app.get('/data/:cut', function (req, res) {
		controller.Rent.findAllNum(req.params.cut, function (data) {
			res.send(data);
		});
	});

	app.get('/data/cheapest/:cut', function (req, res) {
		controller.Rent.findCheapest(req.params.cut, function (data) {
			res.send(data);
		});
	});

	app.get('/data/expensive/:cut', function (req, res) {
		controller.Rent.findExp(req.params.cut, function (data) {
			res.send(data);
		});
	});

};