function getDiagnose(app, mongoose, jsonParser, http) {
	return function(req, res) {
		var options = {
                host: "localhost",
                port: 8888,
                path: "/diagnose",
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
module.exports = getDiagnose;