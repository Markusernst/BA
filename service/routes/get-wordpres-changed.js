function getWordpresChanged(app, mongoose) {
	return function(req, res) {
		var changed = req.params.changed;

        mongoose.model('Wordpres').find( { changed: { $gte: changed } }, function (err, wordpres) {
            if (err) {
                res.send("There was a problem getting the information from the database.");
            } else {
                res.json(wordpres);
            }
        })
	};
}
module.exports = getWordpresChanged;