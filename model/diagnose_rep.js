var mongoose = require('mongoose');
var diagnose_rep_Schema = new mongoose.Schema({   
	longterm: String, 
	key: String,
	abbreviation: String,
	nodes: Array,
	changed: String,
	fatherid: String
	}); 
mongoose.model('Diagnose_rep', diagnose_rep_Schema);