function getOpsOps(app, mongoose) {
	return function(req, res) {
		var ops = req.params.ops;

        mongoose.model('Ops').find({ ops:ops }, function (err, ops) {
            if (err) {
                res.send("There was a problem getting the information from the database.");
            } else {
                res.json(ops);
            }
        })
	};
}
module.exports = getOpsOps;