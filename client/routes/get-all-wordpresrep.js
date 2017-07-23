function getAllWordpresRep(app, mongoose) {
	return function(req, res) {
		mongoose.model('Wordpres_rep').find(function (err, wordpres_rep) {
            if (err) {
                res.send("There was a problem getting the information from the database.");
            } else {
                res.json(wordpres_rep);
            }
        })
	};
}
module.exports = getAllWordpresRep;