function getBriefeId(app, mongoose) {
	return function(req, res) {
		var id = req.params.id;

        mongoose.model('Briefe').find({_id:id}, function (err, briefe) {
            if (err) {
                res.send("There was a problem getting the information from the database.");
            } else {
                res.json(briefe);
            }
        })
	};
}
module.exports = getBriefeId;