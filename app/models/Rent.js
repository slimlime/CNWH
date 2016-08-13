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
		pop: Number,
		state: String,
		totalM: Number,
		totalF: Number,
		indigenous: Number,
		birthAU: Number,
		birthOTH: Number,
		engSpeak: Number,
		othSpeak: Number,
		noInternet: Number,
		haveInternet: Number,
		working: Number,
		avgRooms: Number
	});
	return mongoose.model('Rent', schemas.Rent);
};