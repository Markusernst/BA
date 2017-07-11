var mongoose = require('mongoose');
var abbreviation_rep_Schema = new mongoose.Schema({
	word: String,
	abbreviation: String,
	changed: String,
	fatherid: String
	});
mongoose.model('Abbreviation_rep', abbreviation_rep_Schema);