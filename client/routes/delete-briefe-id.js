function deleteBriefeId(app, mongoose) {
	return function(req, res) {
		var id = req.params.id;
        mongoose.model('Briefe').findOneAndRemove({ _id:id}, function (err, briefe) {
            if (err) {
                res.send("There was a problem deleting the information from the database.");
            } else {
                res.status(200).type("text").send("OK");
            }
        });
	};
}
module.exports = deleteBriefeId;