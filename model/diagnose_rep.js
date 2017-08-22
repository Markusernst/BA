var mongoose = require('mongoose');
var diagnose_rep_Schema = new mongoose.Schema({   
	text: String,
	nodes: Array,
	changed: String,
	fatherid: String
	}); 
mongoose.model('Diagnose_rep', diagnose_rep_Schema);