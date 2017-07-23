function deleteAbbreviationAbb(app, mongoose) {
	return function(req, res) {
		var abb = req.params.abb;

        mongoose.model('Abbreviation').remove({ abbreviation:abb }, function (err, abbreviation) {
            if (err) {
                res.send("There was a problem deleting the information from the database.");
            } else {
                res.json(abbreviation);
            }
        })
	};
}
module.exports = deleteAbbreviationAbb;