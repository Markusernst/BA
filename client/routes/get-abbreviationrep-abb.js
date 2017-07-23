function getAbbreviationRepAbb(app, mongoose) {
	return function(req, res) {
		var abb = req.params.abb;

        mongoose.model('Abbreviation_rep').find({ abbreviation:abb }, function (err, abbreviation_rep) {
            if (err) {
                res.send("There was a problem getting the information from the database.");
            } else {
                res.json(abbreviation_rep);
            }
        })
	};
}
module.exports = getAbbreviationRepAbb;