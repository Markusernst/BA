function getWordpresRepPres(app, mongoose) {
	return function(req, res) {
		var pres = req.params.pres;

        mongoose.model('Wordpres_rep').find({ name:pres }, function (err, wordpres_rep) {
            if (err) {
                res.send("There was a problem getting the information from the database.");
            } else {
                res.json(wordpres_rep);
            }
        })
	};
}
module.exports = getWordpresRepPres;