function getAbbreviationAbb(app, mongoose) {
	return function(req, res) {
		var abb = req.params.abb;

        mongoose.model('Abbreviation').find({ abbreviation:abb }, function (err, abbreviation) {
            if (err) {
                res.send("There was a problem getting the information from the database.");
            } else {
                res.json(abbreviation);
            }
        })
	};
}
module.exports = getAbbreviationAbb;