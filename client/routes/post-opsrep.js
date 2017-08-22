function postOpsRep(app, mongoose) {
	return function(req, res) {
		var text = req.body.text;
        var nodes = req.body.nodes;
        var changed = Date.now();
        var fatherid = req.body.fatherid;

        mongoose.model('Ops_rep').create({
            text : text,
            nodes : nodes,
            changed : changed,
            fatherid : fatherid
            
            }, function (err, ops_rep){
                if (err) {
                    res.send("There was a problem adding the information to the database.");
                } else {
                    //Patient has been created
                    console.log('POST creating new ops: ' + ops_rep);
                    res.json(ops_rep);
                }
            })
	};
}
module.exports = postOpsRep;