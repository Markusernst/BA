function getArztbriefPatientid(app, mongoose) {
	return function(req, res) {
		var id = req.params.patientid;

        mongoose.model('Patient').find({_id:id}, function (err, patient) {
            if (err) {
                res.send("There was a problem getting the information from the database.");
            } else {
                    var patientdata = patient;
                    res.render('arztbrief.ejs', {
                        patient:patient
                    });

                }
            })
	};
}
module.exports = getArztbriefPatientid;