function getAllBerichte(app, mongoose) {
	return function(req, res) {
		mongoose.model('Berichte').find(function (err, berichte) {
                if (err) {
                    res.send("There was a problem getting the information from the database.");
                } else {
                    res.json(berichte);

                }
            })
	};
}
module.exports = getAllBerichte;