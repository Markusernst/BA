function getAbbreviationRepId(app, mongoose) {
	return function(req, res) {
		var id = req.params.id;

        mongoose.model('Abbreviation_rep').find({ _id:id }, function (err, abbreviation_rep) {
            if (err) {
                res.send("There was a problem getting the information from the database.");
            } else {
                res.json(abbreviation_rep);
            }
        })
	};
}
module.exports = getAbbreviationRepId;