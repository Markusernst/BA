var mongoose = require('mongoose');  
var opsSchema = new mongoose.Schema(
{
   text:String,
   nodes:Array,
   changed: String
});
mongoose.model('Ops', opsSchema);