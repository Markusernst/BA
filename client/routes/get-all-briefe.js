function getAllBriefe(app, mongoose) {
	return function(req, res) {
		mongoose.model('Briefe').find(function (err, briefe) {
                if (err) {
                    res.send("There was a problem getting the information from the database.");
                } else {
                    res.json(briefe);

                }
            })
	};
}
module.exports = getAllBriefe;