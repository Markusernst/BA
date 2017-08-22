var express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
	jsonParser = bodyParser.json(),
	db_patient = require('../model/db_patient'),
	patient = require('../model/patient'),
    db_ops_rep = require('../model/db_ops_rep'),
    ops_rep = require('../model/ops_rep'),
    db_wordpres_rep = require('../model/db_wordpres_rep'),
    wordpres_rep = require('../model/wordpres_rep'),
    db_diagnose_rep = require('../model/db_diagnose_rep'),
    diagnose_rep = require('../model/diagnose_rep'),
    db_abbreviation_rep = require('../model/db_abbreviation_rep'),
    abbreviation_rep = require('../model/abbreviation_rep'),
    db_berichte = require('../model/db_berichte'),
    berichte = require('../model/berichte'),
    db_briefe = require('../model/db_briefe'),
    briefe = require('../model/briefe'),
	mongoose = require('mongoose'),
	app = express(),
    ejs = require("ejs"),
    fs = require("fs"),
    http = require("http"),
    cron = require('node-cron');

app.use(jsonParser);

/// REGISTER FOLDER-REFERENCES - like js-Folder, CSS-Folder, bower-Folders, etc.
require("./routes/folder-references/import").register(app);
require("./routes/import").register(app, mongoose, jsonParser, http);


/*Periodic Schedule with CRON-NODE to Update Servers if they are reachable*/
cron.schedule('*/15 * * * * *', function(){

        console.log('running a task every 15 seconds');

        fs.readFile(__dirname+"/update_status.json", function(err, statusData) { 
                var emulated = JSON.parse(statusData.toString());
                console.log(emulated);

        /*Ping Server to check availability*/
        var pingoptions = {
                host: "127.0.0.1",
                port: 8888,
                path: "/access",
                method: "GET",
                headers: {
                    accept: "application/json"
                }
            };
        var externalRequestPing = http.request(pingoptions, function(externalRequestPing) {
            
            if(JSON.stringify(externalRequestPing.statusCode)==200){
                console.log("Connected");
                
                /*Define options for the Server-Call*/
                var optionsRepWordpres = {
                    host: "127.0.0.1",
                    port: 8888,
                    path: "/wordpres/changed/"+emulated.lastServerWordpresUpdate,
                    method: "GET",
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json"
                        }
                    };

                var optionsRepDiagnose = {
                    host: "127.0.0.1",
                    port: 8888,
                    path: "/diagnose/changed/"+emulated.lastServerDiagnoseUpdate,
                    method: "GET",
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json"
                        }
                    };

                var optionsRepOps = {
                    host: "127.0.0.1",
                    port: 8888,
                    path: "/ops/changed/"+emulated.lastServerOpsUpdate,
                    method: "GET",
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json"
                        }
                    };

                var optionsRepAbbreviation = {
                    host: "127.0.0.1",
                    port: 8888,
                    path: "/abbreviation/changed/"+emulated.lastServerAbbreviationUpdate,
                    method: "GET",
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json"
                        }
                    };

                    /*Check if Service was Updated since last Schedule*/

                    /*Wordpresets*/
                    var externalRequestRepWordpres = http.request(optionsRepWordpres, function(externalRequestRepWordpres) {
                        externalRequestRepWordpres.on('data', function(chunk) {
                            var wordpresdata = JSON.parse(chunk);
                            if(!wordpresdata.length){
                                emulated.lastServerWordpresUpdate = Date.now();
                                fs.writeFile(__dirname+"/update_status.json", JSON.stringify(emulated), function(err) {
                                    if (err) throw err;
                                });
                            }
                            else{
                            var loop = 0;
                            for(var i = 0; i < wordpresdata.length; i++) {
                                    mongoose.model('Wordpres_rep').findOneAndUpdate({ fatherid:wordpresdata[i]._id }, {

                                        name:wordpresdata[i].name,
                                        keywords:wordpresdata[i].keywords,
                                        body:wordpresdata[i].body,
                                        changed:Date.now(),
                                        fatherid:wordpresdata[i]._id
                                                
                                    }, {upsert: true, new: true}, function(err, wordpres_rep) {
                                    if (err) {
                                                console.log("NOT FOUND");
                                            }
                                            else{
                                                console.log("UPDATED OR CREATED")
                                            }
                                        }
                                    );
                                loop++;
                                if(loop==wordpresdata.length){
                                emulated.lastServerWordpresUpdate = Date.now();
                                fs.writeFile(__dirname+"/update_status.json", JSON.stringify(emulated), function(err) {
                                    if (err) throw err;
                                });
                                }
                                
                            }
                            }
                                   
                        });
                    });
                    /*externalRequestRepWordpres.write(jsondata);*/
                    externalRequestRepWordpres.end();

                    /*Diagnose*/
                    var externalRequestRepDiagnose = http.request(optionsRepDiagnose, function(externalRequestRepDiagnose) {
                        externalRequestRepDiagnose.on('data', function(chunk) {
                            var diagnosedata = JSON.parse(chunk);
                            if(!diagnosedata.length){
                                emulated.lastServerDiagnoseUpdate = Date.now();
                                fs.writeFile(__dirname+"/update_status.json", JSON.stringify(emulated), function(err) {
                                    if (err) throw err;
                                });
                            }
                            else{
                            var loop = 0;
                            for(var i = 0; i < diagnosedata.length; i++) {
                                mongoose.model('Diagnose_rep').findOneAndUpdate({ fatherid:diagnosedata[i]._id }, {

                                    text:diagnosedata[i].text,
                                    nodes:diagnosedata[i].nodes,
                                    changed:Date.now(),
                                    fatherid:diagnosedata[i]._id
                                                
                                    }, {upsert: true, new: true}, function(err, diagnose_rep) {
                                        if (err) {
                                            console.log("NOT FOUND");
                                        }
                                        else{
                                            console.log("UPDATED OR CREATED")
                                        }
                                    });
                                }
                                loop++;
                                if(loop==diagnosedata.length){
                                emulated.lastServerDiagnoseUpdate = Date.now();
                                fs.writeFile(__dirname+"/update_status.json", JSON.stringify(emulated), function(err) {
                                    if (err) throw err;
                                });
                                }
                            }
                        })
                        
                    });
                    /*externalRequestRepDiagnose.write(jsondata);*/
                    externalRequestRepDiagnose.end();

                    /*OPS*/
                    var externalRequestRepOps = http.request(optionsRepOps, function(externalRequestRepOps) {
                        externalRequestRepOps.on('data', function(chunk) {
                            var opsdata = JSON.parse(chunk);
                            if(!opsdata.length){
                                emulated.lastServerOpsUpdate = Date.now();
                                fs.writeFile(__dirname+"/update_status.json", JSON.stringify(emulated), function(err) {
                                    if (err) throw err;
                                });
                            }
                            else{
                            var loop = 0;
                            for(var i = 0; i < opsdata.length; i++) {
                                mongoose.model('Ops_rep').findOneAndUpdate({ fatherid:opsdata[i]._id }, {

                                    text:opsdata[i].text,
                                    nodes:opsdata[i].nodes,
                                    changed:Date.now(),
                                    fatherid:opsdata[i]._id
                                                
                                    }, {upsert: true, new: true}, function(err, ops_rep) {
                                        if (err) {
                                            console.log("NOT FOUND");
                                        }
                                        else{
                                            console.log("UPDATED OR CREATED")
                                        }
                                    }
                                );
                                }
                                loop++;

                                if(loop==opsdata.length){
                                emulated.lastServerOpsUpdate = Date.now();
                                fs.writeFile(__dirname+"/update_status.json", JSON.stringify(emulated), function(err) {
                                    if (err) throw err;
                                });
                                }
                            }
                        })
                    });
                    /*externalRequestRepOps.write(jsondata);*/
                    externalRequestRepOps.end();

                    /*Abbreviation*/
                    var externalRequestRepAbb = http.request(optionsRepOps, function(externalRequestRepAbb) {
                        externalRequestRepAbb.on('data', function(chunk) {
                            var abbreviationdata = JSON.parse(chunk);
                            if(!abbreviationdata.length){
                                emulated.lastServerAbbreviationUpdate = Date.now();
                                fs.writeFile(__dirname+"/update_status.json", JSON.stringify(emulated), function(err) {
                                    if (err) throw err;
                                });
                            }
                            else{
                            var loop = 0;
                            for(var i = 0; i < abbreviationdata.length; i++) {
                                mongoose.model('Abbreviation_rep').findOneAndUpdate({ fatherid:abbreviationdata[i]._id }, {

                                    word:abbreviationdata[i].word,
                                    abbreviation:abbreviationdata[i].abbreviation,
                                    changed:Date.now(),
                                    fatherid:abbreviationdata[i]._id
                                                
                                    }, {upsert: true, new: true}, function(err, abbreviation_rep) {
                                        if (err) {
                                            console.log("NOT FOUND");
                                        }
                                        else{
                                            console.log("UPDATED OR CREATED")
                                        }
                                    }
                                );
                                }
                                loop++;

                                if(loop==abbreviationdata.length){
                                emulated.lastServerAbbreviationUpdate = Date.now();
                                fs.writeFile(__dirname+"/update_status.json", JSON.stringify(emulated), function(err) {
                                    if (err) throw err;
                                });
                                }
                            }
                        })
                    });
                    /*externalRequestRepAbb.write(jsondata);*/
                    externalRequestRepAbb.end();


                /*Check if lokal Servers were Updated and PUT the Updates to service for wordpresets*/
                mongoose.model('Wordpres_rep').find(function (err, wordpres_rep) {
                    if (err) {
                        return err;
                    } else {
                        var loop = 0;
                        for(var i = 0; i < wordpres_rep.length; i++) {                            
                            if(wordpres_rep[i].changed > emulated.lastWordpresUpdate){

                                var name = wordpres_rep[i].name;
                                var body = wordpres_rep[i].body;
                                var keywords = wordpres_rep[i].keywords;
                                var changed = Date.now();
    
                                var data = {};
                                data['name'] = name;
                                data['body'] = body;
                                data['keywords'] = keywords;
                                data['changed'] = changed;                                       
    
                                var jsondata = JSON.stringify(data);

                                var optionsWordpres = {
                                host: "127.0.0.1",
                                port: 8888,
                                path: "/wordpres/id/"+wordpres_rep[i].fatherid,
                                method: "PUT",
                                headers: {
                                    accept: "application/json",
                                    "Content-Type": "application/json"
                                    }
                                };
                                
                                var externalRequestWordpres = http.request(optionsWordpres, function() {
                                    externalRequestWordpres.on('jsondata', function(chunk) {
                                        console.log(jsondata);
                                    });
                                });
                                externalRequestWordpres.write(jsondata);
                                externalRequestWordpres.end();

                            }
                            loop++;

                            if(loop==wordpres_rep.length){
                            emulated.lastWordpresUpdate = Date.now();
                            fs.writeFile(__dirname+"/update_status.json", JSON.stringify(emulated), function(err) {
                                if (err) throw err;
                            });
                            }

                        }
                    }
                })


                /*Check if lokal Servers were Updated and PUT the Updates to service for diagnose*/
                mongoose.model('Diagnose_rep').find(function (err, diagnose_rep) {
                    if (err) {
                        return err;
                    } else {
                        var loop = 0;
                        for(var i = 0; i < diagnose_rep.length; i++) {
                            
                            if(diagnose_rep[i].changed > emulated.lastDiagnoseUpdate){

                                var text = diagnose_rep[i].text;
                                var nodes = diagnose_rep[i].nodes;
                                var changed = Date.now();
    
                                var data = {};
                                data['text'] = text;
                                data['nodes'] = nodes; 
                                data['changed'] = changed;
    
                                var jsondata = JSON.stringify(data);

                                var optionsDiagnose = {
                                host: "127.0.0.1",
                                port: 8888,
                                path: "/diagnose/id/"+diagnose_rep[i].fatherid,
                                method: "PUT",
                                headers: {
                                    accept: "application/json",
                                    "Content-Type": "application/json"
                                    }
                                };
                                
                                var externalRequestDiagnose = http.request(optionsDiagnose, function() {
                                    externalRequestDiagnose.on('jsondata', function(chunk) {
                                        console.log(jsondata);
                                    });
                                });
                                externalRequestDiagnose.write(jsondata);
                                externalRequestDiagnose.end();

                            }
                            loop++;

                            if(loop==diagnose_rep.length){
                            emulated.lastDiagnoseUpdate = Date.now();
                            fs.writeFile(__dirname+"/update_status.json", JSON.stringify(emulated), function(err) {
                                if (err) throw err;
                            });
                            }

                        }
                    }
                })
                
                /*Check if lokal Servers were Updated and PUT the Updates to service for OPS*/
                mongoose.model('Ops_rep').find(function (err, ops_rep) {
                    if (err) {
                        return err;
                    } else {
                        var loop = 0;
                        for(var i = 0; i < ops_rep.length; i++) {
                            
                            if(ops_rep[i].changed > emulated.lastOpsUpdate){

                                var text = ops_rep[i].text;
                                var ops = ops_rep[i].ops;
                                var nodes = ops_rep[i].nodes;
                                var changed = Date.now();
    
                                var data = {};
                                data['text'] = text;
                                data['nodes'] = nodes;
                                data['changed'] = changed;
    
                                var jsondata = JSON.stringify(data);

                                var optionsOps = {
                                host: "127.0.0.1",
                                port: 8888,
                                path: "/ops/id/"+ops_rep[i].fatherid,
                                method: "PUT",
                                headers: {
                                    accept: "application/json",
                                    "Content-Type": "application/json"
                                    }
                                };
                                
                                var externalRequestOps = http.request(optionsOps, function() {
                                    externalRequestOps.on('jsondata', function(chunk) {
                                        console.log(jsondata);
                                    });
                                });
                                externalRequestOps.write(jsondata);
                                externalRequestOps.end();

                            }
                            loop++;

                            if(loop==ops_rep.length){
                            emulated.lastOpsUpdate = Date.now();
                            fs.writeFile(__dirname+"/update_status.json", JSON.stringify(emulated), function(err) {
                                if (err) throw err;
                            });
                            }

                        }
                    }
                })

                /*Check if lokal Servers were Updated and PUT the Updates to service for abbreviations*/
                mongoose.model('Abbreviation_rep').find(function (err, abbreviation_rep) {
                    if (err) {
                        return err;
                    } else {
                        var loop = 0;
                        for(var i = 0; i < abbreviation_rep.length; i++) {
                            
                            if(abbreviation_rep[i].changed > emulated.lastAbbreviationUpdate){

                                var word = abbreviation_rep[i].word;
                                var abbreviation = abbreviation_rep[i].abbreviation;
                                var changed = Date.now();

                                var data = {};
                                data['word'] = word;
                                data['abbreviation'] = abbreviation;
                                data['changed'] = changed;
    
                                var jsondata = JSON.stringify(data);

                                var optionsAbbreviation = {
                                host: "127.0.0.1",
                                port: 8888,
                                path: "/abbreviation/id/"+abbreviation_rep[i].fatherid,
                                method: "PUT",
                                headers: {
                                    accept: "application/json",
                                    "Content-Type": "application/json"
                                    }
                                };
                                
                                var externalRequestAbbreviation = http.request(optionsAbbreviation, function() {
                                    externalRequestAbbreviation.on('jsondata', function(chunk) {
                                        console.log(jsondata);
                                    });
                                });
                                externalRequestAbbreviation.write(jsondata);
                                externalRequestAbbreviation.end();

                            }
                            loop++;

                            if(loop==abbreviation_rep.length){
                            emulated.lastAbbreviationUpdate = Date.now();
                            fs.writeFile(__dirname+"/update_status.json", JSON.stringify(emulated), function(err) {
                                if (err) throw err;
                            });
                            }

                        }
                    }
                })

            }

            else{
                console.log("Server not reachable!");
            }
        });
        externalRequestPing.end();
        });
});


app.listen(3001);