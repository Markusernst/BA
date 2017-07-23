function postWordpres(app, mongoose) {
	return function(req, res) {
		var name = req.body.name;
        var keywords = req.body.keywords;
        var body = req.body.body;
        var changed = Date.now();
        
        mongoose.model('Wordpres').create({
            name : name,
            keywords : keywords,
            body : body,
            changed : changed
            
            }, function (err, wordpres){
                if (err) {
                    res.send("There was a problem adding the information to the database.");
                } else {
                    //Patient has been created
                    res.json(wordpres);
                }
            })
	};
}
module.exports = postWordpres;