function putOpsId(app, mongoose) {
	return function(req, res) {
		var id = req.params.id;
        var changed = Date.now();

        mongoose.model('Ops').findOneAndUpdate({ _id:id }, {

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
module.exports = putOpsId;