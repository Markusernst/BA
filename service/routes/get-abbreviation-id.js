function getAbbreviationId(app, mongoose) {
	return function(req, res) {
		var id = req.params.id;

        mongoose.model('Abbreviation').find({ _id:id }, function (err, abbreviation) {
            if (err) {
                res.send("There was a problem getting the information from the database.");
            } else {
                res.json(abbreviation);
            }
        })
	};
}
module.exports = getAbbreviationId;