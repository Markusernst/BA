function postOps(app, mongoose) {
	return function(req, res) {
		var text = req.body.text;
        var nodes = req.body.nodes;
        var changed = Date.now();

        mongoose.model('Ops').create({
            text : text,
            nodes : nodes,
            changed : changed
            
            }, function (err, ops){
                if (err) {
                    res.send("There was a problem adding the information to the database.");
                } else {
                    //Patient has been created
                    res.json(ops);
                }
            })
	};
}
module.exports = postOps;