function deleteWordpresId(app, mongoose) {
	return function(req, res) {
		var id = req.params.id;

        mongoose.model('Wordpres').remove({ _id:id }, function (err, wordpres) {
            if (err) {
                res.send("There was a problem deleting the information from the database.");
            } else {
                res.json(wordpres);
            }
        })
	};
}
module.exports = deleteWordpresId;