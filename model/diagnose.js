var mongoose = require('mongoose');
var diagnoseSchema = new mongoose.Schema({   
	longterm: String, 
	key: String,
	abbreviation: String,
	nodes: Array,
	changed: String
	}); 
mongoose.model('Diagnose', diagnoseSchema);