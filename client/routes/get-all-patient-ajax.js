function getAllPatientAjax(app, mongoose) {
	return function(req, res) {
		mongoose.model('Patient').find(function (err, patient) {
                if (err) {
                    res.send("There was a problem getting the information from the database.");
                } else {
                    res.json(patient);

                }
            })
	};
}
module.exports = getAllPatientAjax;