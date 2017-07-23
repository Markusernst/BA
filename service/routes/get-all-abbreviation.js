function getAllAbbreviation(app, mongoose) {
	return function(req, res) {
		mongoose.model('Abbreviation').find(function (err, abbreviation) {
            if (err) {
                res.send("There was a problem getting the information from the database.");
            } else {
                res.json(abbreviation);
            }
        })
	};
}
module.exports = getAllAbbreviation;