function getBerichteId(app, mongoose) {
	return function(req, res) {
		var id = req.params.id;

        mongoose.model('Berichte').find({_id:id}, function (err, berichte) {
            if (err) {
                res.send("There was a problem getting the information from the database.");
            } else {
                res.json(berichte);
            }
        })
	};
}
module.exports = getBerichteId;