function putPatient(app, mongoose) {
	return function(req, res) {
		var name = req.params.name.split(','); // ['Firstname','Lastname']
        var fname = name[0];
        var lname = name[1];

        mongoose.model('Patient').findOneAndUpdate({ firstname:fname, lastname:lname}, {

                firstname:req.body.firstname, 
                lastname:req.body.lastname,
                sex:req.body.sex,
                birthday:req.body.birthday,
                address:req.body.address,
                tel:req.body.tel,
                familydoctor:req.body.familydoctor,
                healthinsurance:req.body.healthinsurance,
                admission:req.body.admission,
                anamnese:req.body.anamnese
            }, {new: true}, function(err, patient) {
                    if (err) {
                        console.log('got an error');
                    }
                    else{
                        res.json(patient);
                    }
            }
        );
	};
}
module.exports = putPatient;