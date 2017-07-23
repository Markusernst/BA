function putAbbreviationId(app, mongoose) {
	return function(req, res) {
		var id = req.params.id;
        var changed = Date.now();

        mongoose.model('Abbreviation').findOneAndUpdate({ _id:id }, {

                word:req.body.word, 
                abbreviation:req.body.abbreviation,
                changed:changed
                
            }, {new: true}, function(err, abbreviation) {
                    if (err) {
                        console.log('got an error');
                    }
                    else{
                        res.json(abbreviation);
                    }
            }
        );
	};
}
module.exports = putAbbreviationId;