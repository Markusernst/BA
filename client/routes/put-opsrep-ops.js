function putOpsRepOps(app, mongoose) {
	return function(req, res) {
		var ops = req.params.ops;
        var changed = Date.now();

        mongoose.model('Ops_rep').findOneAndUpdate({ ops:ops }, {

                name:req.body.name, 
                ops:req.body.ops,
                nodes:req.body.nodes,
                changed:changed,
                fatherid:req.body.fatherid

            }, {new: true}, function(err, ops_rep) {
                    if (err) {
                        console.log('got an error');
                    }
                    else{
                        res.json(ops_rep);
                    }
            }
        );
	};
}
module.exports = putOpsRepOps;