function postWordpresRep(app, mongoose) {
	return function(req, res) {
		var name = req.body.name;
        var keywords = req.body.keywords;
        var body = req.body.body;
        var changed = Date.now();
        var fatherid = req.body.fatherid;
        
        mongoose.model('Wordpres_rep').create({
            name : name,
            keywords : keywords,
            body : body,
            changed : changed,
            fatherid : fatherid
            
            }, function (err, wordpres_rep){
                if (err) {
                    res.send("There was a problem adding the information to the database.");
                } else {
                    //Patient has been created
                    console.log('POST creating new wordpres: ' + wordpres_rep);
                    res.json(wordpres_rep);
                }
            })
	};
}
module.exports = postWordpresRep;