function deleteWordpresRepId(app, mongoose) {
	return function(req, res) {
		var id = req.params.id;

        mongoose.model('Wordpres_rep').remove({ _id:id }, function (err, wordpres_rep) {
            if (err) {
                res.send("There was a problem deleting the information from the database.");
            } else {
                res.json(wordpres_rep);
            }
        })
	};
}
module.exports = deleteWordpresRepId;