function getWordpresId(app, mongoose) {
	return function(req, res) {
		var id = req.params.id;

        mongoose.model('Wordpres').find({ _id:id }, function (err, wordpres) {
            if (err) {
                res.send("There was a problem getting the information from the database.");
            } else {
                res.json(wordpres);
            }
        })
	};
}
module.exports = getWordpresId;