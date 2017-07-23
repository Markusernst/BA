function putOpsOps(app, mongoose) {
	return function(req, res) {
		var ops = req.params.ops;
        var changed = Date.now();

        mongoose.model('Ops').findOneAndUpdate({ ops:ops }, {

                name:req.body.name, 
                ops:req.body.ops,
                nodes:req.body.nodes,
                changed:changed

            }, {new: true}, function(err, ops) {
                    if (err) {
                        console.log('got an error');
                    }
                    else{
                        res.json(ops);
                    }
            }
        );
	};
}
module.exports = putOpsOps;