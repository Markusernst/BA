function postAbbreviation(app, mongoose) {
	return function(req, res) {
		var word = req.body.word;
        var abbreviation = req.body.abbreviation;
        var changed = Date.now();
        
        mongoose.model('Abbreviation').create({
            word : word,
            abbreviation : abbreviation,
            changed : changed
            
            }, function (err, abbreviation){
                if (err) {
                    res.send("There was a problem adding the information to the database.");
                } else {
                    //Patient has been created
                    res.json(abbreviation);
                }
            })
	};
}
module.exports = postAbbreviation;