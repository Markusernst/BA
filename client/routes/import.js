function register(app, mongoose, jsonParser, http) {

	app.get("/home", require("./home")(app));
	app.get("/operationsbericht", require("./operationsbericht")(app));
	app.get("/arztbrief", require("./arztbrief")(app));

	app.get("/patient", require("./get-all-patient")(app, mongoose));
	app.get("/patient/:name", require("./get-patient")(app, mongoose));
	app.get("/patient/id/:id", require("./get-patient-id")(app, mongoose));
	app.put("/patient:name", require("./put-patient")(app, mongoose));
	app.put("/patient/id/:id", require("./put-patient-id")(app, mongoose));
	app.post("/patient", require("./post-patient")(app, mongoose));
	app.delete("/patient/:name", require("./delete-patient-name")(app, mongoose));
	app.delete("/patient/id/:id", require("./delete-patient-id")(app, mongoose));

	app.get("/wordpres", require("./get-wordpres")(app, mongoose, jsonParser, http));
	app.get("/wordpres/:pres", require("./get-wordpres-name")(app, mongoose, jsonParser, http));
	app.get("/diagnose", require("./get-diagnose")(app, mongoose, jsonParser, http));
	app.get("/diagnose/:abbr", require("./get-diagnose-abbr")(app, mongoose, jsonParser, http));
	app.get("/abbreviation", require("./get-abbreviation")(app, mongoose, jsonParser, http));
	app.get("/abbreviation/:abb", require("./get-abbreviation-abb")(app, mongoose, jsonParser, http));
	app.get("/ops", require("./get-ops")(app, mongoose, jsonParser, http));
	app.get("/ops/:ops", require("./get-ops-key")(app, mongoose, jsonParser, http));

	app.get("/wordpres_rep", require("./get-all-wordpresrep")(app, mongoose));
	app.get("/diagnose_rep", require("./get-all-diagnoserep")(app, mongoose));
	app.get("/abbreviation_rep", require("./get-all-abbreviationrep")(app, mongoose));
	app.get("/ops_rep", require("./get-all-opsrep")(app, mongoose));

	app.get("/ops_rep/:ops", require("./get-opsrep-ops")(app, mongoose));
	app.get("/ops_rep/id/:id", require("./get-opsrep-id")(app, mongoose));

	app.get("/wordpres_rep/:pres", require("./get-wordpresrep-pres")(app, mongoose));
	app.get("/wordpres_rep/id/:id", require("./get-wordpresrep-id")(app, mongoose));

	app.get("/diagnose_rep/:abbr", require("./get-diagnoserep-abbr")(app, mongoose));
	app.get("/diagnose_rep/id/:id", require("./get-diagnoserep-id")(app, mongoose));

	app.get("/abbreviation_rep/:abb", require("./get-abbreviationrep-abb")(app, mongoose));
	app.get("/abbreviation_rep/id/:id", require("./get-abbreviationrep-id")(app, mongoose));

	app.post("/wordpres_rep", require("./post-wordpresrep")(app, mongoose));
	app.post("/diagnose_rep", require("./post-diagnoserep")(app, mongoose));
	app.post("/abbreviation_rep", require("./post-abbreviationrep")(app, mongoose));
	app.post("/ops_rep", require("./post-opsrep")(app, mongoose));

	app.put("/wordpres_rep/:pres", require("./put-wordpresrep-pres")(app, mongoose));
	app.put("/wordpres_rep/id/:id", require("./put-wordpresrep-id")(app, mongoose));

	app.put("/diagnose_rep/:abbr", require("./put-diagnoserep-abbr")(app, mongoose));
	app.put("/diagnose_rep/id/:id", require("./put-diagnoserep-id")(app, mongoose));

	app.put("/abbreviation_rep/:abb", require("./put-abbreviationrep-abb")(app, mongoose));
	app.put("/abbreviation_rep/id/:id", require("./put-abbreviationrep-id")(app, mongoose));

	app.put("/ops_rep/:ops", require("./put-opsrep-ops")(app, mongoose));
	app.put("/ops_rep/id/:id", require("./put-opsrep-id")(app, mongoose));


	app.delete("/wordpres_rep/:pres", require("./delete-wordpresrep-pres")(app, mongoose));
	app.delete("/wordpres_rep/id/:id", require("./delete-wordpresrep-id")(app, mongoose));

	app.delete("/diagnose_rep/:abbr", require("./delete-diagnoserep-abbr")(app, mongoose));
	app.delete("/diagnose_rep/id/:id", require("./delete-diagnoserep-id")(app, mongoose));

	app.delete("/abbreviation_rep/:abb", require("./delete-abbreviationrep-abb")(app, mongoose));
	app.delete("/abbreviation_rep/id/:id", require("./delete-abbreviationrep-id")(app, mongoose));

	app.delete("/ops_rep/:ops", require("./delete-opsrep-ops")(app, mongoose));
	app.delete("/ops_rep/id/:id", require("./delete-opsrep-id")(app, mongoose));

}
module.exports = {
	register: register
};