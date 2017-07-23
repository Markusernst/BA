function deleteAbbreviationRepAbb(app, mongoose) {
	return function(req, res) {
		var abb = req.params.abb;

        mongoose.model('Abbreviation_rep').remove({ abbreviation:abb }, function (err, abbreviation_rep) {
            if (err) {
                res.send("There was a problem deleting the information from the database.");
            } else {
                res.json(abbreviation_rep);
            }
        })
	};
}
module.exports = deleteAbbreviationRepAbb;