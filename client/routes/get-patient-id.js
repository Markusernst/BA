function getPatientId(app, mongoose) {
	return function(req, res) {
		var id = req.params.id;

        mongoose.model('Patient').find({_id:id}, function (err, patient) {
            if (err) {
                res.send("There was a problem getting the information from the database.");
            } else {
                res.json(patient);
            }
        })
	};
}
module.exports = getPatientId;