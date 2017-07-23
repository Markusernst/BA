function putPatientId(app, mongoose) {
	return function(req, res) {
		var id = req.params.id;
        mongoose.model('Patient').findOneAndUpdate({ _id:id}, {

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
module.exports = putPatientId;