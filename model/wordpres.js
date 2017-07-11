var mongoose = require('mongoose');  
var wordpresSchema = new mongoose.Schema({  
  name: String,
  keywords: Array,
  body: String,
  changed: String
});
mongoose.model('Wordpres', wordpresSchema);