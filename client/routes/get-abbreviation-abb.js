function getAbbreviationAbb(app, mongoose, jsonParser, http) {
	return function(req, res) {
		var options = {
                host: "127.0.0.1",
                port: 8888,
                path: "/abbreviation/"+req.params.abb,
                method: "GET",
                headers: {
                    accept: "application/json"
                }
            };
        var externalRequest = http.request(options, function(externalRequest) {
            console.log("Connected");
            externalRequest.on('data', function(chunk) {
                var abbreviationdata = JSON.parse(chunk);
                console.log(abbreviationdata);
                res.json(abbreviationdata);
                res.end();
            });
        });
        externalRequest.end();
	};
}
module.exports = getAbbreviationAbb;