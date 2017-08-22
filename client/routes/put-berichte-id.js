function putBerichteId(app, mongoose) {
	return function(req, res) {
		var id = req.params.id;
        mongoose.model('Berichte').findOneAndUpdate({ _id:id}, {

                titel:req.body.titel, 
                vorlage:req.body.vorlage,
                staticcontent:req.body.staticcontent,
                varcontent:req.body.varcontent
            }, {new: true}, function(err, berichte) {
                    if (err) {
                        console.log('got an error');
                    }
                    else{
                        res.json(berichte);
                    }
            }
        );
	};
}
module.exports = putBerichteId;