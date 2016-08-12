/*
 * Rent Schema
 * rent data
 */
module.exports = function (mongoose, schemas) {

	schemas['Rent'] = mongoose.Schema({
		post: String,
		avgRent: String,
		avgInc: String,
		avgMortgage: String
	});
	return mongoose.model('Rent', schemas.Rent);
};