function putBriefeId(app, mongoose) {
	return function(req, res) {
		var id = req.params.id;
        mongoose.model('Briefe').findOneAndUpdate({ _id:id}, {

                titel:req.body.titel, 
                vorlage:req.body.vorlage,
                staticcontent:req.body.staticcontent,
                varcontent:req.body.varcontent
            }, {new: true}, function(err, briefe) {
                    if (err) {
                        console.log('got an error');
                    }
                    else{
                        res.json(briefe);
                    }
            }
        );
	};
}
module.exports = putBriefeId;