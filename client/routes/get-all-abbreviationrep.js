function getAllAbbreviationRep(app, mongoose) {
	return function(req, res) {
		mongoose.model('Abbreviation_rep').find(function (err, abbreviation_rep) {
            if (err) {
                res.send("There was a problem getting the information from the database.");
            } else {
                res.json(abbreviation_rep);
            }
        })
	};
}
module.exports = getAllAbbreviationRep;