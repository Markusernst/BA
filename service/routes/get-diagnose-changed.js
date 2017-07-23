function getDiagnoseChanged(app, mongoose) {
	return function(req, res) {
		var changed = req.params.changed;

        mongoose.model('Diagnose').find( { changed: { $gte: changed } }, function (err, diagnose) {
            if (err) {
                res.send("There was a problem getting the information from the database.");
            } else {
                res.json(diagnose);
            }
        })
	};
}
module.exports = getDiagnoseChanged;