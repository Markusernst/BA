function deleteOpsOps(app, mongoose) {
	return function(req, res) {
		var ops = req.params.ops;

        mongoose.model('Ops').remove({ ops:ops }, function (err, ops) {
            if (err) {
                res.send("There was a problem deleting the information from the database.");
            } else {
                res.json(ops);
            }
        })
	};
}
module.exports = deleteOpsOps;