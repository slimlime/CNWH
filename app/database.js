//Database connection

module.exports = function (mongoose, chalk) {
	var database = mongoose.connection;

	database.on('error', console.error.bind(console, 'connection error:'));

	database.once('open', function (callback) {
		var host = database.host;
		var port = database.port;
		console.log(chalk.italic.bgCyan.blue(' MongoDB Connected on: ') +
			chalk.italic.bgCyan.black('\t host:' + host + ' port: ' + port + '\t'));
	});
	return database;
};