var mongoose = require('mongoose');
var diagnoseSchema = new mongoose.Schema({   
	text: String,
	nodes: Array,
	changed: String
	}); 
mongoose.model('Diagnose', diagnoseSchema);