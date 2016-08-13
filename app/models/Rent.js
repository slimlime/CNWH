/*
 * Rent Schema
 * rent data
 */
module.exports = function (mongoose, schemas) {

	schemas['Rent'] = mongoose.Schema({
		post: String,
		avgRent: Number,
		avgInc: Number,
		avgMortgage: Number,
		closestCity: String,
		subs: [String],
		avgAge: Number,
		pop: Number
	});
	return mongoose.model('Rent', schemas.Rent);
};