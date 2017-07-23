function getAllDiagnose(app, mongoose) {
	return function(req, res) {
		mongoose.model('Diagnose').find(function (err, diagnose) {
            if (err) {
                res.send("There was a problem getting the information from the database.");
            } else {
                res.json(diagnose);
            }
        })
	};
}
module.exports = getAllDiagnose;