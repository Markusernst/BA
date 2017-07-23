function postPatient(app, mongoose) {
	return function(req, res) {
		var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var sex = req.body.sex;
        var birthday = req.body.birthday;
        var address = req.body.address;
        var tel = req.body.tel;
        var familydoctor = req.body.familydoctor;
        var healthinsurance = req.body.healthinsurance;
        var admission = req.body.admission;
        var anamnese = req.body.anamnese;
        mongoose.model('Patient').create({
            firstname : firstname,
            lastname : lastname,
            sex : sex,
            birthday : birthday,
            address : address,
            tel : tel,
            familydoctor : familydoctor,
            healthinsurance : healthinsurance,
            admission : admission,
            anamnese : anamnese
            }, function (err, patient){
                if (err) {
                    res.send("There was a problem adding the information to the database.");
                } else {
                    //Patient has been created
                    console.log('POST creating new patient: ' + patient);
                    res.json(patient);
                }
            });
	};
}
module.exports = postPatient;