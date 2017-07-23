function getAllOpsRep(app, mongoose) {
	return function(req, res) {
		mongoose.model('Ops_rep').find(function (err, ops_rep) {
            if (err) {
                res.send("There was a problem getting the information from the database.");
            } else {
                res.json(ops_rep);
            }
        })
	};
}
module.exports = getAllOpsRep;