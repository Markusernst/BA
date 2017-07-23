function getWordpresPres(app, mongoose) {
	return function(req, res) {
		var pres = req.params.pres;

        mongoose.model('Wordpres').find({ name:pres }, function (err, wordpres) {
            if (err) {
                res.send("There was a problem getting the information from the database.");
            } else {
                res.json(wordpres);
            }
        })
	};
}
module.exports = getWordpresPres;