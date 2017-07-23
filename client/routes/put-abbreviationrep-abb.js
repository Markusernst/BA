function putAbbreviationRepAbb(app, mongoose) {
	return function(req, res) {
		var abb = req.params.abb;
        var changed = Date.now();

        mongoose.model('Abbreviation_rep').findOneAndUpdate({ abbreviation:abb }, {

                word:req.body.word, 
                abbreviation:req.body.abbreviation,
                changed:changed,
                fatherid:req.body.fatherid
                
            }, {new: true}, function(err, abbreviation_rep) {
                    if (err) {
                        console.log('got an error');
                    }
                    else{
                        res.json(abbreviation_rep);
                    }
            }
        );
	};
}
module.exports = putAbbreviationRepAbb;