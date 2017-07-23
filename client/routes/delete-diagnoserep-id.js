function deleteDiagnoseRepId(app, mongoose) {
	return function(req, res) {
		var id = req.params.id;

        mongoose.model('Diagnose_rep').remove({ _id:id}, function (err, diagnose_rep) {
            if (err) {
                res.send("There was a problem deleting the information from the database.");
            } else {
                res.json(diagnose_rep);
            }
        })
	};
}
module.exports = deleteDiagnoseRepId;