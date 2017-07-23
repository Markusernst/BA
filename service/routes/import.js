function register(app, mongoose) {


	app.get("/ops/changed/:changed", require("./get-ops-changed")(app, mongoose));
	app.get("/wordpres/changed/:changed", require("./get-wordpres-changed")(app, mongoose));
	app.get("/diagnose/changed/:changed", require("./get-diagnose-changed")(app, mongoose));
	app.get("/abbreviation/changed/:changed", require("./get-abbreviation-changed")(app, mongoose));

	app.get("/ops", require("./get-all-ops")(app, mongoose));
	app.get("/wordpres", require("./get-all-wordpres")(app, mongoose));
	app.get("/diagnose", require("./get-all-diagnose")(app, mongoose));
	app.get("/abbreviation", require("./get-all-abbreviation")(app, mongoose));

	app.get("/ops/:ops", require("./get-ops-ops")(app, mongoose));
	app.get("/ops/id/:id", require("./get-ops-id")(app, mongoose));
	app.get("/wordpres/:pres", require("./get-wordpres-pres")(app, mongoose));
	app.get("/wordpres/id/:id", require("./get-wordpres-id")(app, mongoose));
	app.get("/diagnose/:abbr", require("./get-diagnose-abbr")(app, mongoose));
	app.get("/diagnose/id/:id", require("./get-diagnose-id")(app, mongoose));
	app.get("/abbreviation/:abb", require("./get-abbreviation-abb")(app, mongoose));
	app.get("/abbreviation/id/:id", require("./get-abbreviation-id")(app, mongoose));

	app.post("/wordpres", require("./post-wordpres")(app, mongoose));
	app.post("/diagnose", require("./post-diagnose")(app, mongoose));
	app.post("/abbreviation", require("./post-abbreviation")(app, mongoose));
	app.post("/ops", require("./post-ops")(app, mongoose));

	app.put("/wordpres/:pres", require("./put-wordpres-pres")(app, mongoose));
	app.put("/wordpres/id/:id", require("./put-wordpres-id")(app, mongoose));
	app.put("/diagnose/:abbr", require("./put-diagnose-abbr")(app, mongoose));
	app.put("/diagnose/id/:id", require("./put-diagnose-id")(app, mongoose));
	app.put("/abbreviation/:abb", require("./put-abbreviation-abb")(app, mongoose));
	app.put("/abbreviation/id/:id", require("./put-abbreviation-id")(app, mongoose));
	app.put("/ops/:ops", require("./put-ops-ops")(app, mongoose));
	app.put("/ops/id/:id", require("./put-ops-id")(app, mongoose));

	app.delete("/wordpres/:pres", require("./delete-wordpres-pres")(app, mongoose));
	app.delete("/wordpres/id/:id", require("./delete-wordpres-id")(app, mongoose));
	app.delete("/diagnose/:abbr", require("./delete-diagnose-abbr")(app, mongoose));
	app.delete("/diagnose/id/:id", require("./delete-diagnose-id")(app, mongoose));
	app.delete("/abbreviation/:abb", require("./delete-abbreviation-abb")(app, mongoose));
	app.delete("/abbreviation/id/:id", require("./delete-abbreviation-id")(app, mongoose));
	app.delete("/ops/:ops", require("./delete-ops-ops")(app, mongoose));
	app.delete("/ops/id/:id", require("./delete-ops-id")(app, mongoose));

}
module.exports = {
	register: register
};