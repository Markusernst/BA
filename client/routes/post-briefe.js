function postBriefe(app, mongoose) {
	return function(req, res) {
		var titel = req.body.titel;
        var vorlage = req.body.vorlage;
        var staticcontent = req.body.staticcontent;
        var varcontent = req.body.varcontent;
        mongoose.model('Briefe').create({
            titel : titel,
            vorlage : vorlage,
            staticcontent : staticcontent,
            varcontent : varcontent
            }, function (err, briefe){
                if (err) {
                    res.send("There was a problem adding the information to the database.");
                } else {
                    //Bericht has been created
                    console.log('POST creating new briefe: ' + briefe);
                    res.json(briefe);
                }
            });
	};
}
module.exports = postBriefe;