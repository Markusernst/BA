function deleteOpsRepId(app, mongoose) {
	return function(req, res) {
		var id = req.params.id;

        mongoose.model('Ops_rep').remove({ _id:id}, function (err, ops_rep) {
            if (err) {
                res.send("There was a problem deleting the information from the database.");
            } else {
                res.json(ops_rep);
            }
        })
	};
}
module.exports = deleteOpsRepId;