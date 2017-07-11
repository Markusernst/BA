var mongoose = require('mongoose');  
var ops_rep_Schema = new mongoose.Schema(
{
   name:String,
   ops:String,
   nodes:Array,
   changed: String,
   fatherid: String
});
mongoose.model('Ops_rep', ops_rep_Schema);