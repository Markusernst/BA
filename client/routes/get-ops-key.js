function getOpsKey(app, mongoose, jsonParser, http) {
	return function(req, res) {
		var options = {
                host: "127.0.0.1",
                port: 8888,
                path: "/ops/"+req.params.ops,
                method: "GET",
                headers: {
                    accept: "application/json"
                }
            };
        var externalRequest = http.request(options, function(externalRequest) {
            console.log("Connected");
            externalRequest.on('data', function(chunk) {
                var opsdata = JSON.parse(chunk);
                console.log(opsdata);
                res.json(opsdata);
                res.end();
            });
        });
        externalRequest.end();
	};
}
module.exports = getOpsKey;