function deleteWordpresPres(app, mongoose) {
	return function(req, res) {
		var pres = req.params.pres;

        mongoose.model('Wordpres').remove({ name:pres }, function (err, wordpres) {
            if (err) {
                res.send("There was a problem deleting the information from the database.");
            } else {
                res.json(wordpres);
            }
        })
	};
}
module.exports = deleteWordpresPres;