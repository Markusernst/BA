function putDiagnoseRepId(app, mongoose) {
	return function(req, res) {
		var id = req.params.id;
        var changed = Date.now();

        mongoose.model('Diagnose_rep').findOneAndUpdate({ _id:id }, {

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
module.exports = putDiagnoseRepId;