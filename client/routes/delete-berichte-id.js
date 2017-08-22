function deleteBerichteId(app, mongoose) {
	return function(req, res) {
		var id = req.params.id;
        mongoose.model('Berichte').findOneAndRemove({ _id:id}, function (err, berichte) {
            if (err) {
                res.send("There was a problem deleting the information from the database.");
            } else {
                res.status(200).type("text").send("OK");
            }
        });
	};
}
module.exports = deleteBerichteId;