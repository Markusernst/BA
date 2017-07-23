function deleteAbbreviationId(app, mongoose) {
	return function(req, res) {
		var id = req.params.id;

        mongoose.model('Abbreviation').remove({ _id:id }, function (err, abbreviation) {
            if (err) {
                res.send("There was a problem deleting the information from the database.");
            } else {
                res.json(abbreviation);
            }
        })
	};
}
module.exports = deleteAbbreviationId;