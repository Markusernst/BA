function getDiagnoseAbbr(app, mongoose) {
	return function(req, res) {
		var abbr = req.params.abbr;

        mongoose.model('Diagnose').find({ abbreviation:abbr}, function (err, diagnose) {
            if (err) {
                res.send("There was a problem getting the information from the database.");
            } else {
                res.json(diagnose);
            }
        })
	};
}
module.exports = getDiagnoseAbbr;