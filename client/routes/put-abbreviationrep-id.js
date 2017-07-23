function putAbbreviationRepId(app, mongoose) {
	return function(req, res) {
		var id = req.params.id;
        var changed = Date.now();

        mongoose.model('Abbreviation_rep').findOneAndUpdate({ _id:id }, {

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
module.exports = putAbbreviationRepId;