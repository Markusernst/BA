function register(app, mongoose, jsonParser, http) {

	app.get("/home", require("./home")(app));
	app.get("/patient", require("./get-all-patient")(app, mongoose));
	app.get("/operationsbericht", require("./operationsbericht")(app));
	app.get("/operationsbericht/:patientid", require("./operationsbericht_patientData")(app, mongoose));
	app.get("/arztbrief", require("./arztbrief")(app));
	app.get("/arztbrief/:patientid", require("./arztbrief_patientData")(app, mongoose));

	app.get("/berichte", require("./get-all-berichte")(app, mongoose));
	app.get("/berichte/id/:id", require("./get-berichte-id")(app, mongoose));
	app.put("/berichte/id/:id", require("./put-berichte-id")(app, mongoose));
	app.post("/berichte", require("./post-berichte")(app, mongoose));
	app.delete("/berichte/id/:id", require("./delete-berichte-id")(app, mongoose));

	app.get("/briefe", require("./get-all-briefe")(app, mongoose));
	app.get("/briefe/id/:id", require("./get-briefe-id")(app, mongoose));
	app.put("/briefe/id/:id", require("./put-briefe-id")(app, mongoose));
	app.post("/briefe", require("./post-briefe")(app, mongoose));
	app.delete("/briefe/id/:id", require("./delete-briefe-id")(app, mongoose));

	app.get("/patient/ajax", require("./get-all-patient-ajax")(app, mongoose));
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
	app.get("/abbreviation", require("./get-abbreviation")(app, mongoose, jsonParser, http));
	app.get("/abbreviation/:abb", require("./get-abbreviation-abb")(app, mongoose, jsonParser, http));
	app.get("/ops", require("./get-ops")(app, mongoose, jsonParser, http));

	app.get("/wordpres_rep", require("./get-all-wordpresrep")(app, mongoose));
	app.get("/diagnose_rep", require("./get-all-diagnoserep")(app, mongoose));
	app.get("/abbreviation_rep", require("./get-all-abbreviationrep")(app, mongoose));
	app.get("/ops_rep", require("./get-all-opsrep")(app, mongoose));

	app.get("/ops_rep/id/:id", require("./get-opsrep-id")(app, mongoose));

	app.get("/wordpres_rep/:pres", require("./get-wordpresrep-pres")(app, mongoose));
	app.get("/wordpres_rep/id/:id", require("./get-wordpresrep-id")(app, mongoose));

	app.get("/diagnose_rep/id/:id", require("./get-diagnoserep-id")(app, mongoose));

	app.get("/abbreviation_rep/:abb", require("./get-abbreviationrep-abb")(app, mongoose));
	app.get("/abbreviation_rep/id/:id", require("./get-abbreviationrep-id")(app, mongoose));

	app.post("/wordpres_rep", require("./post-wordpresrep")(app, mongoose));
	app.post("/diagnose_rep", require("./post-diagnoserep")(app, mongoose));
	app.post("/abbreviation_rep", require("./post-abbreviationrep")(app, mongoose));
	app.post("/ops_rep", require("./post-opsrep")(app, mongoose));

	app.put("/wordpres_rep/:pres", require("./put-wordpresrep-pres")(app, mongoose));
	app.put("/wordpres_rep/id/:id", require("./put-wordpresrep-id")(app, mongoose));

	app.put("/diagnose_rep/id/:id", require("./put-diagnoserep-id")(app, mongoose));

	app.put("/abbreviation_rep/:abb", require("./put-abbreviationrep-abb")(app, mongoose));
	app.put("/abbreviation_rep/id/:id", require("./put-abbreviationrep-id")(app, mongoose));

	app.put("/ops_rep/id/:id", require("./put-opsrep-id")(app, mongoose));


	app.delete("/wordpres_rep/:pres", require("./delete-wordpresrep-pres")(app, mongoose));
	app.delete("/wordpres_rep/id/:id", require("./delete-wordpresrep-id")(app, mongoose));

	app.delete("/diagnose_rep/id/:id", require("./delete-diagnoserep-id")(app, mongoose));

	app.delete("/abbreviation_rep/:abb", require("./delete-abbreviationrep-abb")(app, mongoose));
	app.delete("/abbreviation_rep/id/:id", require("./delete-abbreviationrep-id")(app, mongoose));

	app.delete("/ops_rep/id/:id", require("./delete-opsrep-id")(app, mongoose));

}
module.exports = {
	register: register
};