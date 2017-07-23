function postAbbreviationRep(app, mongoose) {
	return function(req, res) {
		var word = req.body.word;
        var abbreviation = req.body.abbreviation;
        var changed = Date.now();
        var fatherid = req.body.fatherid;
    
        mongoose.model('Abbreviation_rep').create({
            word : word,
            abbreviation : abbreviation,
            changed : changed,
            fatherid : fatherid
            
            }, function (err, abbreviation_rep){
                if (err) {
                    res.send("There was a problem adding the information to the database.");
                } else {
                    //Patient has been created
                    console.log('POST creating new abbreviation: ' + abbreviation_rep);
                    res.json(abbreviation_rep);
                }
            })
	};
}
module.exports = postAbbreviationRep;