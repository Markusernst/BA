function getWordpres(app, mongoose, jsonParser, http) {
	return function(req, res) {
		var options = {
                host: "127.0.0.1",
                port: 8888,
                path: "/wordpres",
                method: "GET",
                headers: {
                    accept: "application/json"
                }
            };
        var externalRequest = http.request(options, function(externalRequest) {
            console.log("Connected");
            externalRequest.on('data', function(chunk) {
                var wordpresdata = JSON.parse(chunk);
                console.log(wordpresdata);
                res.json(wordpresdata);
                res.end();
            });
        });
        externalRequest.end();
	};
}
module.exports = getWordpres;