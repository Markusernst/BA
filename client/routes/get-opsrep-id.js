function getOpsRepId(app, mongoose) {
	return function(req, res) {
		var id = req.params.id;

        mongoose.model('Ops_rep').find({ _id:id }, function (err, ops_rep) {
            if (err) {
                res.send("There was a problem getting the information from the database.");
            } else {
                res.json(ops_rep);
            }
        })
	};
}
module.exports = getOpsRepId;