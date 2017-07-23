function deleteOpsRepOps(app, mongoose) {
	return function(req, res) {
		var ops = req.params.ops;

        mongoose.model('Ops_rep').remove({ ops:ops }, function (err, ops_rep) {
            if (err) {
                res.send("There was a problem deleting the information from the database.");
            } else {
                res.json(ops_rep);
            }
        })
	};
}
module.exports = deleteOpsRepOps;