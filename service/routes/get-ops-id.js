function getOpsId(app, mongoose) {
	return function(req, res) {
		var id = req.params.id;

        mongoose.model('Ops').find({ _id:id }, function (err, ops) {
            if (err) {
                res.send("There was a problem getting the information from the database.");
            } else {
                res.json(ops);
            }
        })
	};
}
module.exports = getOpsId;