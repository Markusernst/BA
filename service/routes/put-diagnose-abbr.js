function putDiagnoseAbbr(app, mongoose) {
	return function(req, res) {
		var abbr = req.params.abbr;
        var changed = Date.now();

        mongoose.model('Diagnose').findOneAndUpdate({ abbreviation:abbr }, {

                longterm:req.body.longterm, 
                key:req.body.key,
                abbreviation:req.body.abbreviation,
                nodes:req.body.nodes,
                changed:changed
                
            }, {new: true}, function(err, diagnose) {
                    if (err) {
                        console.log('got an error');
                    }
                    else{
                        res.json(diagnose);
                    }
            }
        );
	};
}
module.exports = putDiagnoseAbbr;