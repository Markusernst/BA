function getAllDiagnoseRep(app, mongoose) {
	return function(req, res) {
		mongoose.model('Diagnose_rep').find(function (err, diagnose_rep) {
            if (err) {
                res.send("There was a problem getting the information from the database.");
            } else {
                res.json(diagnose_rep);
            }
        })
	};
}
module.exports = getAllDiagnoseRep;