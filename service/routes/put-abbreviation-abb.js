function putAbbreviationAbb(app, mongoose) {
	return function(req, res) {
		var abb = req.params.abb;
        var changed = Date.now();

        mongoose.model('Abbreviation').findOneAndUpdate({ abbreviation:abb }, {

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
module.exports = putAbbreviationAbb;