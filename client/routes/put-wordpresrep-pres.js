function putWordpresRepPres(app, mongoose) {
	return function(req, res) {
		var pres = req.params.pres;
        var changed = Date.now();

        mongoose.model('Wordpres_rep').findOneAndUpdate({ name:pres }, {

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
module.exports = putWordpresRepPres;