function putWordpresId(app, mongoose) {
	return function(req, res) {
		var id = req.params.id;
        var changed = Date.now();

        mongoose.model('Wordpres').findOneAndUpdate({ _id:id }, {

                name:req.body.name, 
                keywords:req.body.keywords,
                body:req.body.body,
                changed:changed
                
            }, {new: true}, function(err, wordpres) {
                    if (err) {
                        console.log('got an error');
                    }
                    else{
                        res.json(wordpres);
                    }
            }
        );
	};
}
module.exports = putWordpresId;