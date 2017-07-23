function deletePatientName(app, mongoose) {
	return function(req, res) {
		var name = req.params.name.split(','); // ['Firstname','Lastname']
        var fname = name[0];
        var lname = name[1];
        console.log(fname);

        mongoose.model('Patient').findOneAndRemove({ firstname:fname, lastname:lname}, function (err, patient) {
            if (err) {
                res.send("There was a problem deleting the information from the database.");
            } else {
                res.status(200).type("text").send("OK");
            }
        });
	};
}
module.exports = deletePatientName;