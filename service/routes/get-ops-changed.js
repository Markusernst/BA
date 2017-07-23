function getOpsChanged(app, mongoose) {
	return function(req, res) {
		var changed = req.params.changed;

        mongoose.model('Ops').find( { changed: { $gte: changed } }, function (err, ops) {
            if (err) {
                res.send("There was a problem getting the information from the database.");
            } else {
                res.json(ops);
            }
        })
	};
}
module.exports = getOpsChanged;