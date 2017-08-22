function postBerichte(app, mongoose) {
	return function(req, res) {
		var titel = req.body.titel;
        var vorlage = req.body.vorlage;
        var staticcontent = req.body.staticcontent;
        var varcontent = req.body.varcontent;
        mongoose.model('Berichte').create({
            titel : titel,
            vorlage : vorlage,
            staticcontent : staticcontent,
            varcontent : varcontent
            }, function (err, berichte){
                if (err) {
                    res.send("There was a problem adding the information to the database.");
                } else {
                    //Bericht has been created
                    console.log('POST creating new berichte: ' + berichte);
                    res.json(berichte);
                }
            });
	};
}
module.exports = postBerichte;