function putWordpresRepId(app, mongoose) {
	return function(req, res) {
		var id = req.params.id;
        var changed = Date.now();

        mongoose.model('Wordpres_rep').findOneAndUpdate({ _id:id }, {

                name:req.body.name, 
                keywords:req.body.keywords,
                body:req.body.body,
                changed:changed,
                fatherid:req.body.fatherid
                
            }, {new: true}, function(err, wordpres_rep) {
                    if (err) {
                        console.log('got an error');
                    }
                    else{
                        res.json(wordpres_rep);
                    }
            }
        );
	};
}
module.exports = putWordpresRepId;