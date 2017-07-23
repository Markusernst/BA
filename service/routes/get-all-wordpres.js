function getAllWordpres(app, mongoose) {
	return function(req, res) {
		mongoose.model('Wordpres').find(function (err, wordpres) {
            if (err) {
                res.send("There was a problem getting the information from the database.");
            } else {
                res.json(wordpres);
            }
        })
	};
}
module.exports = getAllWordpres;