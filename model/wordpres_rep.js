var mongoose = require('mongoose');  
var wordpres_rep_Schema = new mongoose.Schema({  
  name: String,
  keywords: Array,
  body: String,
  changed: String,
  fatherid: String
});
mongoose.model('Wordpres_rep', wordpres_rep_Schema);