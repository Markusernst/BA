function postDiagnose(app, mongoose) {
	return function(req, res) {
		var longterm = req.body.longterm;
        var key = req.body.key;
        var abbreviation = req.body.abbreviation;
        var nodes = req.body.nodes;
        var changed = Date.now();
        
        mongoose.model('Diagnose').create({
            longterm : longterm,
            key : key,
            abbreviation : abbreviation,
            nodes : nodes,
            changed : changed
            
            }, function (err, diagnose){
                if (err) {
                    res.send("There was a problem adding the information to the database.");
                } else {
                    //Patient has been created
                    res.json(diagnose);
                }
            })
	};
}
module.exports = postDiagnose;