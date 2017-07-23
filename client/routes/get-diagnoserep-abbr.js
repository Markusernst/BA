function getDiagnoseRepAbbr(app, mongoose) {
	return function(req, res) {
		var abbr = req.params.abbr;

        mongoose.model('Diagnose_rep').find({ abbreviation:abbr}, function (err, diagnose_rep) {
            if (err) {
                res.send("There was a problem getting the information from the database.");
            } else {
                res.json(diagnose_rep);
            }
        })
	};
}
module.exports = getDiagnoseRepAbbr;