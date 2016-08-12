//Server Connection Module

module.exports = function (http, serverPort, chalk) {

	var server = http.listen(serverPort, function () {

		var host = server.address().address;
		var port = server.address().port;

		console.log(chalk.bold.bgWhite.blue('\t\t *** Studdit *** \t\t\t'));
		console.log(chalk.italic.bgCyan.blue(' Server listening on: ') +
			chalk.italic.bgCyan.black('\t host:' + host + ' port: ' + port + '\t\t'));
	});

	return server;
};