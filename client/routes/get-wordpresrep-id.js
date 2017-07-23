function getWordpresRepId(app, mongoose) {
	return function(req, res) {
		var id = req.params.id;

        mongoose.model('Wordpres_rep').find({ _id:id }, function (err, wordpres_rep) {
            if (err) {
                res.send("There was a problem getting the information from the database.");
            } else {
                res.json(wordpres_rep);
            }
        })
	};
}
module.exports = getWordpresRepId;