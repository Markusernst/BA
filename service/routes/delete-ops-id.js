function deleteOpsId(app, mongoose) {
	return function(req, res) {
		var id = req.params.id;

        mongoose.model('Ops').remove({ _id:id}, function (err, ops) {
            if (err) {
                res.send("There was a problem deleting the information from the database.");
            } else {
                res.json(ops);
            }
        })
	};
}
module.exports = deleteOpsId;