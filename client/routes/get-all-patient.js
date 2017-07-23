function getAllPatient(app, mongoose) {
	return function(req, res) {
		mongoose.model('Patient').find(function (err, patient) {
                if (err) {
                    res.send("There was a problem getting the information from the database.");
                } else {
                    var patientdata = patient;
                    res.render('patient.ejs', {
                        patient:patient
                    });

                }
            })
	};
}
module.exports = getAllPatient;