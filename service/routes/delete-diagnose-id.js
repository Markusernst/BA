function deleteDiagnoseId(app, mongoose) {
	return function(req, res) {
		var id = req.params.id;

        mongoose.model('Diagnose').remove({ _id:id}, function (err, diagnose) {
            if (err) {
                res.send("There was a problem deleting the information from the database.");
            } else {
                res.json(diagnose);
            }
        })
	};
}
module.exports = deleteDiagnoseId;