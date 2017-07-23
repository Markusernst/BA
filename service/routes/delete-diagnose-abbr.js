function deleteDiagnoseAbbr(app, mongoose) {
	return function(req, res) {
		var abbr = req.params.abbr;

        mongoose.model('Diagnose').remove({ abbreviation:abbr }, function (err, diagnose) {
            if (err) {
                res.send("There was a problem deleting the information from the database.");
            } else {
                res.json(diagnose);
            }
        })
	};
}
module.exports = deleteDiagnoseAbbr;