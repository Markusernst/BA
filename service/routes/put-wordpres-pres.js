function putWordpresPres(app, mongoose) {
	return function(req, res) {
		var pres = req.params.pres;
        var changed = Date.now();

        mongoose.model('Wordpres').findOneAndUpdate({ name:pres }, {

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
module.exports = putWordpresPres;