function getAbbreviationChanged(app, mongoose) {
	return function(req, res) {
		var changed = req.params.changed;

        mongoose.model('Abbreviation').find( { changed: { $gte: changed } }, function (err, abbreviation) {
            if (err) {
                res.send("There was a problem getting the information from the database.");
            } else {
                res.json(abbreviation);
            }
        })
	};
}
module.exports = getAbbreviationChanged;