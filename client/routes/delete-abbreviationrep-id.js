function deleteAbbreviationRepId(app, mongoose) {
	return function(req, res) {
		var id = req.params.id;

        mongoose.model('Abbreviation_rep').remove({ _id:id }, function (err, abbreviation_rep) {
            if (err) {
                res.send("There was a problem deleting the information from the database.");
            } else {
                res.json(abbreviation_rep);
            }
        })
	};
}
module.exports = deleteAbbreviationRepId;