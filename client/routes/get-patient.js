function getPatient(app, mongoose) {
	return function(req, res) {
		var name = req.params.name.split(','); // ['Firstname','Lastname']
        var fname = name[0];
        var lname = name[1];
        console.log(fname);

        mongoose.model('Patient').find({ firstname:fname, lastname:lname}, function (err, patient) {
            if (err) {
                res.send("There was a problem getting the information from the database.");
            } else {
                res.json(patient);
            }
        })
	};
}
module.exports = getPatient;