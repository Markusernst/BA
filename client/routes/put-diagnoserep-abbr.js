function putDiagnoseRepAbbr(app, mongoose) {
	return function(req, res) {
		var abbr = req.params.abbr;
        var changed = Date.now();

        mongoose.model('Diagnose_rep').findOneAndUpdate({ abbreviation:abbr }, {

                longterm:req.body.longterm, 
                key:req.body.key,
                abbreviation:req.body.abbreviation,
                nodes:req.body.nodes,
                changed:changed,
                fatherid:req.body.fatherid
                
            }, {new: true}, function(err, diagnose_rep) {
                    if (err) {
                        console.log('got an error');
                    }
                    else{
                        res.json(diagnose_rep);
                    }
            }
        );
	};
}
module.exports = putDiagnoseRepAbbr;