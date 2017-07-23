function deleteWordpresRepPres(app, mongoose) {
	return function(req, res) {
		var pres = req.params.pres;

        mongoose.model('Wordpres_rep').remove({ name:pres }, function (err, wordpres_rep) {
            if (err) {
                res.send("There was a problem deleting the information from the database.");
            } else {
                res.json(wordpres_rep);
            }
        })
	};
}
module.exports = deleteWordpresRepPres;