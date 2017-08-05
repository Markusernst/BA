function getDiagnoseAbbr(app, mongoose, jsonParser, http) {
	return function(req, res) {
		var options = {
                host: "127.0.0.1",
                port: 8888,
                path: "/diagnose/"+req.params.abbr,
                method: "GET",
                headers: {
                    accept: "application/json"
                }
            };
        var externalRequest = http.request(options, function(externalRequest) {
            console.log("Connected");
            externalRequest.on('data', function(chunk) {
                var diagnosedata = JSON.parse(chunk);
                console.log(diagnosedata);
                res.json(diagnosedata);
                res.end();
            });
        });
        externalRequest.end();
	};
}
module.exports = getDiagnoseAbbr;