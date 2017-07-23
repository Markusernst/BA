function getAllOps(app, mongoose) {
	return function(req, res) {
		mongoose.model('Ops').find(function (err, ops) {
            if (err) {
                res.send("There was a problem getting the information from the database.");
            } else {
                res.json(ops);
            }
        })
	};
}
module.exports = getAllOps;