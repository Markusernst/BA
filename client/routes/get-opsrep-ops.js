function getOpsRepOps(app, mongoose) {
	return function(req, res) {
		var ops = req.params.ops;

        mongoose.model('Ops_rep').find({ ops:ops }, function (err, ops_rep) {
            if (err) {
                res.send("There was a problem getting the information from the database.");
            } else {
                res.json(ops_rep);
            }
        })
	};
}
module.exports = getOpsRepOps;