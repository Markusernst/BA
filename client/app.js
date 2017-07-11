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
	mongoose = require('mongoose'),
	app = express(),
    ejs = require("ejs"),
    fs = require("fs"),
    http = require("http"),
    cron = require('node-cron');

app.use(jsonParser);

var lastServerWordpresUpdate;
var lastServerDiagnoseUpdate;
var lastServerOpsUpdate;
var lastServerAbbreviationUpdate;

var lastWordpresUpdate;
var lastDiagnoseUpdate;
var lastOpsUpdate;
var lastAbbreviationUpdate;


/*Periodic Schedule with CRON-NODE to Update Servers if they are reachable*/
cron.schedule('*/15 * * * * *', function(){

        console.log('running a task every 15 seconds');

        /*Ping Server to check availability*/
        var pingoptions = {
                host: "localhost",
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
                    host: "localhost",
                    port: 8888,
                    path: "/wordpres",
                    method: "GET",
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json"
                        }
                    };

                var optionsRepDiagnose = {
                    host: "localhost",
                    port: 8888,
                    path: "/diagnose",
                    method: "GET",
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json"
                        }
                    };

                var optionsRepOps = {
                    host: "localhost",
                    port: 8888,
                    path: "/ops",
                    method: "GET",
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json"
                        }
                    };

                var optionsRepAbbreviation = {
                    host: "localhost",
                    port: 8888,
                    path: "/abbreviation",
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

                            mongoose.model('Wordpres_rep').find(function (err, wordpres_rep) {
                                if (err) {
                                    return err;
                                } else {
                                    var loop = 0;
                                    for(var i = 0; i < wordpresdata.length; i++) {
                                        console.log("Changed Wordpres item "+i+": " + wordpresdata[i].changed);
                                        console.log("LastUpdate Wordpres item "+i+": " + lastServerWordpresUpdate);
                                        if(wordpresdata[i].changed > lastServerWordpresUpdate){
                                            console.log("IT WILL UPDATE NOW");
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
                                        }
                                        loop++;

                                        if(loop==wordpresdata.length){
                                        lastServerWordpresUpdate = Date.now();
                                        }
                                    }
                                }
                            })
                        });
                    });
                    /*externalRequestRepWordpres.write(jsondata);*/
                    externalRequestRepWordpres.end();

                    /*Diagnose*/
                    var externalRequestRepDiagnose = http.request(optionsRepDiagnose, function(externalRequestRepDiagnose) {
                        externalRequestRepDiagnose.on('data', function(chunk) {
                            var diagnosedata = JSON.parse(chunk);

                            mongoose.model('Diagnose_rep').find(function (err, diagnose_rep) {
                                if (err) {
                                    return err;
                                } else {
                                    var loop = 0;
                                    for(var i = 0; i < diagnosedata.length; i++) {
                                        console.log("Changed Diagnose item "+i+": " + diagnosedata[i].changed);
                                        console.log("LastUpdate Diagnose item "+i+": " + lastServerDiagnoseUpdate);
                                        if(diagnosedata[i].changed > lastServerDiagnoseUpdate){
                                            console.log("IT WILL UPDATE NOW");
                                            mongoose.model('Diagnose_rep').findOneAndUpdate({ fatherid:diagnosedata[i]._id }, {

                                                longterm:diagnosedata[i].longterm,
                                                key:diagnosedata[i].key,
                                                abbreviation:diagnosedata[i].abbreviation,
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
                                                }
                                            );
                                        }
                                        loop++;

                                        if(loop==diagnosedata.length){
                                        lastServerDiagnoseUpdate = Date.now();
                                        }
                                    }
                                }
                            })
                        });
                    });
                    /*externalRequestRepDiagnose.write(jsondata);*/
                    externalRequestRepDiagnose.end();

                    /*OPS*/
                    var externalRequestRepOps = http.request(optionsRepOps, function(externalRequestRepOps) {
                        externalRequestRepOps.on('data', function(chunk) {
                            var opsdata = JSON.parse(chunk);

                            mongoose.model('Ops_rep').find(function (err, ops_rep) {
                                if (err) {
                                    return err;
                                } else {
                                    var loop = 0;
                                    for(var i = 0; i < opsdata.length; i++) {
                                        console.log("Changed Diagnose item "+i+": " + opsdata[i].changed);
                                        console.log("LastUpdate Diagnose item "+i+": " + lastServerOpsUpdate);
                                        if(opsdata[i].changed > lastServerOpsUpdate){
                                            console.log("IT WILL UPDATE NOW");
                                            mongoose.model('Ops_rep').findOneAndUpdate({ fatherid:opsdata[i]._id }, {

                                                name:opsdata[i].name,
                                                ops:opsdata[i].ops,
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
                                        lastServerOpsUpdate = Date.now();
                                        }
                                    }
                                }
                            })
                        });
                    });
                    /*externalRequestRepOps.write(jsondata);*/
                    externalRequestRepOps.end();

                    /*Abbreviation*/
                    var externalRequestRepAbb = http.request(optionsRepOps, function(externalRequestRepAbb) {
                        externalRequestRepAbb.on('data', function(chunk) {
                            var abbreviationdata = JSON.parse(chunk);

                            mongoose.model('Abbreviation_rep').find(function (err, abbreviation_rep) {
                                if (err) {
                                    return err;
                                } else {
                                    var loop = 0;
                                    for(var i = 0; i < abbreviationdata.length; i++) {
                                        console.log("Changed Diagnose item "+i+": " + abbreviationdata[i].changed);
                                        console.log("LastUpdate Diagnose item "+i+": " + lastServerAbbreviationUpdate);
                                        if(abbreviationdata[i].changed > lastServerAbbreviationUpdate){
                                            console.log("IT WILL UPDATE NOW");
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
                                        lastServerAbbreviationUpdate = Date.now();
                                        }
                                    }
                                }
                            })
                        });
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
                            console.log("Last Change in Item "+i+" of Wordpres: "+ wordpres_rep[i].changed);
                            
                            if(wordpres_rep[i].changed > lastWordpresUpdate){

                                console.log("Braucht Update!");

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
                                host: "localhost",
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
                            lastWordpresUpdate = Date.now();
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
                            console.log("Last Change in Item "+i+" of Diagnose: "+ diagnose_rep[i].changed);
                            
                            if(diagnose_rep[i].changed > lastDiagnoseUpdate){

                                console.log("Braucht Update!");

                                var longterm = diagnose_rep[i].longterm;
                                var key = diagnose_rep[i].key;
                                var abbreviation = diagnose_rep[i].abbreviation;
                                var nodes = diagnose_rep[i].nodes;
                                var changed = Date.now();
    
                                var data = {};
                                data['longterm'] = longterm;
                                data['key'] = key;
                                data['abbreviation'] = abbreviation;
                                data['nodes'] = nodes; 
                                data['changed'] = changed;
    
                                var jsondata = JSON.stringify(data);

                                var optionsDiagnose = {
                                host: "localhost",
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
                            lastDiagnoseUpdate = Date.now();
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
                            console.log("Last Change in Item "+i+" of OPS: "+ ops_rep[i].changed);
                            
                            if(ops_rep[i].changed > lastOpsUpdate){

                                console.log("Braucht Update!");

                                var name = ops_rep[i].name;
                                var ops = ops_rep[i].ops;
                                var nodes = ops_rep[i].nodes;
                                var changed = Date.now();
    
                                var data = {};
                                data['name'] = name;
                                data['ops'] = ops;
                                data['nodes'] = nodes;
                                data['changed'] = changed;
    
                                var jsondata = JSON.stringify(data);

                                var optionsOps = {
                                host: "localhost",
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
                            lastOpsUpdate = Date.now();
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
                            console.log("Last Change in Item "+i+" of Abbreviation: "+ abbreviation_rep[i].changed);
                            
                            if(abbreviation_rep[i].changed > lastAbbreviationUpdate){

                                console.log("Braucht Update!");

                                var name = abbreviation_rep[i].name;
                                var ops = abbreviation_rep[i].ops;
                                var nodes = abbreviation_rep[i].nodes;
                                var changed = Date.now();
    
                                var data = {};
                                data['name'] = name;
                                data['ops'] = ops;
                                data['nodes'] = nodes;
                                data['changed'] = changed;
    
                                var jsondata = JSON.stringify(data);

                                var optionsAbbreviation = {
                                host: "localhost",
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
                            lastAbbreviationUpdate = Date.now();
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



app.get('/patient', function(req,res,next){
        mongoose.model('Patient').find(function (err, patient) {
            if (err) {
                res.send("There was a problem getting the information from the database.");
            } else {
                res.json(patient);
            }
        })
});

app.get('/patient/:name', function(req,res){
        var name = req.params.name.split(','); // ['Firstname','Lastname']
        var fname = name[0];
        var lname = name[1];
        console.log(fname);

        mongoose.model('Patient').find({ firstname:fname, lastname:lname}, function (err, patient) {
            if (err) {
                res.send("There was a problem getting the information from the database.");
            } else {
                res.json(patient);
            }
        })
});

app.get('/patient/id/:id', function(req,res){

        var id = req.params.id;

        mongoose.model('Patient').find({_id:id}, function (err, patient) {
            if (err) {
                res.send("There was a problem getting the information from the database.");
            } else {
                res.json(patient);
            }
        })
});

app.put('/patient/:name', function(req,res){
        var name = req.params.name.split(','); // ['Firstname','Lastname']
        var fname = name[0];
        var lname = name[1];

        mongoose.model('Patient').findOneAndUpdate({ firstname:fname, lastname:lname}, {

                firstname:req.body.firstname, 
                lastname:req.body.lastname,
                sex:req.body.sex,
                birthday:req.body.birthday,
                address:req.body.address,
                tel:req.body.tel,
                familydoctor:req.body.familydoctor,
                healthinsurance:req.body.healthinsurance,
                admission:req.body.admission,
                anamnese:req.body.anamnese
            }, {new: true}, function(err, patient) {
                    if (err) {
                        console.log('got an error');
                    }
                    else{
                        res.json(patient);
                    }
            }
        );
           
});

app.put('/patient/id/:id', function(req,res){
        var id = req.params.id;
        mongoose.model('Patient').findOneAndUpdate({ _id:id}, {

                firstname:req.body.firstname, 
                lastname:req.body.lastname,
                sex:req.body.sex,
                birthday:req.body.birthday,
                address:req.body.address,
                tel:req.body.tel,
                familydoctor:req.body.familydoctor,
                healthinsurance:req.body.healthinsurance,
                admission:req.body.admission,
                anamnese:req.body.anamnese
            }, {new: true}, function(err, patient) {
                    if (err) {
                        console.log('got an error');
                    }
                    else{
                        res.json(patient);
                    }
            }
        );
});

app.post('/patient', function(req,res){
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
    var sex = req.body.sex;
    var birthday = req.body.birthday;
    var address = req.body.address;
    var tel = req.body.tel;
    var familydoctor = req.body.familydoctor;
    var healthinsurance = req.body.healthinsurance;
	var admission = req.body.admission;
	var anamnese = req.body.anamnese;
	mongoose.model('Patient').create({
        firstname : firstname,
        lastname : lastname,
        sex : sex,
        birthday : birthday,
        address : address,
        tel : tel,
        familydoctor : familydoctor,
        healthinsurance : healthinsurance,
        admission : admission,
        anamnese : anamnese
        }, function (err, patient){
            if (err) {
                res.send("There was a problem adding the information to the database.");
            } else {
            	//Patient has been created
              	console.log('POST creating new patient: ' + patient);
              	res.json(patient);
            }
        });
});

app.delete('/patient/:name', function(req,res){
        var name = req.params.name.split(','); // ['Firstname','Lastname']
        var fname = name[0];
        var lname = name[1];
        console.log(fname);

        mongoose.model('Patient').findOneAndRemove({ firstname:fname, lastname:lname}, function (err, patient) {
            if (err) {
                res.send("There was a problem deleting the information from the database.");
            } else {
                res.status(200).type("text").send("OK");
            }
        });
});

app.delete('/patient/id/:id', function(req,res){
        var id = req.params.id;
        mongoose.model('Patient').findOneAndRemove({ _id:id}, function (err, patient) {
            if (err) {
                res.send("There was a problem deleting the information from the database.");
            } else {
                res.status(200).type("text").send("OK");
            }
        });
});

app.get('/wordpres', jsonParser, function(req,res){
        var options = {
                host: "localhost",
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
});

app.get('/wordpres/:pres', jsonParser, function(req,res){
        var options = {
                host: "localhost",
                port: 8888,
                path: "/wordpres/"+req.params.pres,
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
});

app.get('/diagnose', jsonParser, function(req,res){
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
});

app.get('/diagnose/:abbr', jsonParser, function(req,res){
        var options = {
                host: "localhost",
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
});

app.get('/abbreviation', jsonParser, function(req,res){
        var options = {
                host: "localhost",
                port: 8888,
                path: "/abbreviation",
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
});

app.get('/abbreviation/:abb', jsonParser, function(req,res){
        var options = {
                host: "localhost",
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
});

app.get('/ops', jsonParser, function(req,res){
        var options = {
                host: "localhost",
                port: 8888,
                path: "/ops",
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
});

app.get('/ops/:ops', jsonParser, function(req,res){
        var options = {
                host: "localhost",
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
});



































app.get('/wordpres_rep', function(req,res,next){
        mongoose.model('Wordpres_rep').find(function (err, wordpres_rep) {
            if (err) {
                return next(err);
            } else {
                res.json(wordpres_rep);
            }
        })
});

app.get('/diagnose_rep', function(req,res,next){
        mongoose.model('Diagnose_rep').find(function (err, diagnose_rep) {
            if (err) {
                return next(err);
            } else {
                res.json(diagnose_rep);
            }
        })
});

app.get('/abbreviation_rep', function(req,res,next){
        mongoose.model('Abbreviation_rep').find(function (err, abbreviation_rep) {
            if (err) {
                return next(err);
            } else {
                res.json(abbreviation_rep);
            }
        })
});

app.get('/ops_rep', function(req,res,next){
        mongoose.model('Ops_rep').find(function (err, ops_rep) {
            if (err) {
                return next(err);
            } else {
                res.json(ops_rep);
            }
        })
});

app.get('/ops_rep/:ops', function(req,res){
        var ops = req.params.ops;

        mongoose.model('Ops_rep').find({ ops:ops }, function (err, ops_rep) {
            if (err) {
                res.send("There was a problem getting the information from the database.");
            } else {
                res.json(ops_rep);
            }
        })
});

app.get('/ops_rep/id/:id', function(req,res){
        var id = req.params.id;

        mongoose.model('Ops_rep').find({ _id:id }, function (err, ops_rep) {
            if (err) {
                res.send("There was a problem getting the information from the database.");
            } else {
                res.json(ops_rep);
            }
        })
});

app.get('/wordpres_rep/:pres', function(req,res){
        var pres = req.params.pres;

        mongoose.model('Wordpres_rep').find({ name:pres }, function (err, wordpres_rep) {
            if (err) {
                res.send("There was a problem getting the information from the database.");
            } else {
                res.json(wordpres_rep);
            }
        })
});

app.get('/wordpres_rep/id/:id', function(req,res){
        var id = req.params.id;

        mongoose.model('Wordpres_rep').find({ _id:id }, function (err, wordpres_rep) {
            if (err) {
                res.send("There was a problem getting the information from the database.");
            } else {
                res.json(wordpres_rep);
            }
        })
});

app.get('/diagnose_rep/:abbr', function(req,res){
        var abbr = req.params.abbr;

        mongoose.model('Diagnose_rep').find({ abbreviation:abbr}, function (err, diagnose_rep) {
            if (err) {
                res.send("There was a problem getting the information from the database.");
            } else {
                res.json(diagnose_rep);
            }
        })
});

app.get('/diagnose_rep/id/:id', function(req,res){
        var id = req.params.id;

        mongoose.model('Diagnose_rep').find({ _id:id}, function (err, diagnose_rep) {
            if (err) {
                res.send("There was a problem getting the information from the database.");
            } else {
                res.json(diagnose_rep);
            }
        })
});

app.get('/abbreviation_rep/:abb', function(req,res){
        var abb = req.params.abb;

        mongoose.model('Abbreviation_rep').find({ abbreviation:abb }, function (err, abbreviation_rep) {
            if (err) {
                res.send("There was a problem getting the information from the database.");
            } else {
                res.json(abbreviation_rep);
            }
        })
});

app.get('/abbreviation_rep/id/:id', function(req,res){
        var id = req.params.id;

        mongoose.model('Abbreviation_rep').find({ _id:id }, function (err, abbreviation_rep) {
            if (err) {
                res.send("There was a problem getting the information from the database.");
            } else {
                res.json(abbreviation_rep);
            }
        })
});

app.post('/wordpres_rep', function(req,res){
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
});

app.post('/diagnose_rep', function(req,res){
    var longterm = req.body.longterm;
    var key = req.body.key;
    var abbreviation = req.body.abbreviation;
    var nodes = req.body.nodes;
    var changed = Date.now();
    var fatherid = req.body.fatherid;

    mongoose.model('Diagnose_rep').create({
        longterm : longterm,
        key : key,
        abbreviation : abbreviation,
        nodes : nodes,
        changed : changed,
        fatherid : fatherid
        
        }, function (err, diagnose_rep){
            if (err) {
                res.send("There was a problem adding the information to the database.");
            } else {
                //Patient has been created
                console.log('POST creating new diagnose: ' + diagnose_rep);
                res.json(diagnose_rep);
            }
        })
});

app.post('/abbreviation_rep', function(req,res){
    var word = req.body.word;
    var abbreviation = req.body.abbreviation;
    var changed = Date.now();
    var fatherid = req.body.fatherid;

    mongoose.model('Abbreviation_rep').create({
        word : word,
        abbreviation : abbreviation,
        changed : changed,
        fatherid : fatherid
        
        }, function (err, abbreviation_rep){
            if (err) {
                res.send("There was a problem adding the information to the database.");
            } else {
                //Patient has been created
                console.log('POST creating new abbreviation: ' + abbreviation_rep);
                res.json(abbreviation_rep);
            }
        })
});

app.post('/ops_rep', function(req,res){
    var name = req.body.name;
    var ops = req.body.ops;
    var nodes = req.body.nodes;
    var changed = Date.now();
    var fatherid = req.body.fatherid;

    mongoose.model('Ops_rep').create({
        name : name,
        ops : ops,
        nodes : nodes,
        changed : changed,
        fatherid : fatherid
        
        }, function (err, ops_rep){
            if (err) {
                res.send("There was a problem adding the information to the database.");
            } else {
                //Patient has been created
                console.log('POST creating new ops: ' + ops_rep);
                res.json(ops_rep);
            }
        })
});

app.put('/wordpres_rep/:pres', function(req,res){
        var pres = req.params.pres;
        var changed = Date.now();

        mongoose.model('Wordpres_rep').findOneAndUpdate({ name:pres }, {

                name:req.body.name, 
                keywords:req.body.keywords,
                body:req.body.body,
                changed:changed,
                fatherid:req.body.fatherid

                
            }, {new: true}, function(err, wordpres_rep) {
                    if (err) {
                        console.log('got an error');
                    }
                    else{
                        res.json(wordpres_rep);
                    }
            }
        );
});

app.put('/wordpres_rep/id/:id', function(req,res){
        var id = req.params.id;
        var changed = Date.now();

        mongoose.model('Wordpres_rep').findOneAndUpdate({ _id:id }, {

                name:req.body.name, 
                keywords:req.body.keywords,
                body:req.body.body,
                changed:changed,
                fatherid:req.body.fatherid
                
            }, {new: true}, function(err, wordpres_rep) {
                    if (err) {
                        console.log('got an error');
                    }
                    else{
                        res.json(wordpres_rep);
                    }
            }
        );
});

app.put('/diagnose_rep/:abbr', function(req,res){
        var abbr = req.params.abbr;
        var changed = Date.now();

        mongoose.model('Diagnose_rep').findOneAndUpdate({ abbreviation:abbr }, {

                longterm:req.body.longterm, 
                key:req.body.key,
                abbreviation:req.body.abbreviation,
                nodes:req.body.nodes,
                changed:changed,
                fatherid:req.body.fatherid
                
            }, {new: true}, function(err, diagnose_rep) {
                    if (err) {
                        console.log('got an error');
                    }
                    else{
                        res.json(diagnose_rep);
                    }
            }
        );
});

app.put('/diagnose_rep/id/:id', function(req,res){
        var id = req.params.id;
        var changed = Date.now();

        mongoose.model('Diagnose_rep').findOneAndUpdate({ _id:id }, {

                longterm:req.body.longterm, 
                key:req.body.key,
                abbreviation:req.body.abbreviation,
                nodes:req.body.nodes,
                changed:changed,
                fatherid:req.body.fatherid
                
            }, {new: true}, function(err, diagnose_rep) {
                    if (err) {
                        console.log('got an error');
                    }
                    else{
                        res.json(diagnose_rep);
                    }
            }
        );
});

app.put('/abbreviation_rep/:abb', function(req,res){
        var abb = req.params.abb;
        var changed = Date.now();

        mongoose.model('Abbreviation_rep').findOneAndUpdate({ abbreviation:abb }, {

                word:req.body.word, 
                abbreviation:req.body.abbreviation,
                changed:changed,
                fatherid:req.body.fatherid
                
            }, {new: true}, function(err, abbreviation_rep) {
                    if (err) {
                        console.log('got an error');
                    }
                    else{
                        res.json(abbreviation_rep);
                    }
            }
        );
});

app.put('/abbreviation_rep/id/:id', function(req,res){
        var id = req.params.id;
        var changed = Date.now();

        mongoose.model('Abbreviation_rep').findOneAndUpdate({ _id:id }, {

                word:req.body.word, 
                abbreviation:req.body.abbreviation,
                changed:changed,
                fatherid:req.body.fatherid
                
            }, {new: true}, function(err, abbreviation_rep) {
                    if (err) {
                        console.log('got an error');
                    }
                    else{
                        res.json(abbreviation_rep);
                    }
            }
        );
});

app.put('/ops_rep/:ops', function(req,res){
        var ops = req.params.ops;
        var changed = Date.now();

        mongoose.model('Ops_rep').findOneAndUpdate({ ops:ops }, {

                name:req.body.name, 
                ops:req.body.ops,
                nodes:req.body.nodes,
                changed:changed,
                fatherid:req.body.fatherid

            }, {new: true}, function(err, ops_rep) {
                    if (err) {
                        console.log('got an error');
                    }
                    else{
                        res.json(ops_rep);
                    }
            }
        );
});

app.put('/ops_rep/id/:id', function(req,res){
        var id = req.params.id;
        var changed = Date.now();

        mongoose.model('Ops_rep').findOneAndUpdate({ _id:id }, {

                name:req.body.name, 
                ops:req.body.ops,
                nodes:req.body.nodes,
                changed:changed,
                fatherid:req.body.fatherid

            }, {new: true}, function(err, ops_rep) {
                    if (err) {
                        console.log('got an error');
                    }
                    else{
                        res.json(ops_rep);
                    }
            }
        );
});

app.delete('/wordpres_rep/:pres', function(req,res){
        var pres = req.params.pres;

        mongoose.model('Wordpres_rep').remove({ name:pres }, function (err, wordpres_rep) {
            if (err) {
                res.send("There was a problem deleting the information from the database.");
            } else {
                res.json(wordpres_rep);
            }
        })
});

app.delete('/wordpres_rep/id/:id', function(req,res){
        var id = req.params.id;
        console.log(id);

        mongoose.model('Wordpres_rep').remove({ _id:id }, function (err, wordpres_rep) {
            if (err) {
                res.send("There was a problem deleting the information from the database.");
            } else {
                res.json(wordpres_rep);
            }
        })
});

app.delete('/diagnose_rep/:abbr', function(req,res){
        var abbr = req.params.abbr;
        console.log(abbr);

        mongoose.model('Diagnose_rep').remove({ abbreviation:abbr }, function (err, diagnose_rep) {
            if (err) {
                res.send("There was a problem deleting the information from the database.");
            } else {
                res.json(diagnose_rep);
            }
        })
});

app.delete('/diagnose_rep/id/:id', function(req,res){
        var id = req.params.id;

        mongoose.model('Diagnose_rep').remove({ _id:id}, function (err, diagnose_rep) {
            if (err) {
                res.send("There was a problem deleting the information from the database.");
            } else {
                res.json(diagnose_rep);
            }
        })
});

app.delete('/abbreviation_rep/:abb', function(req,res){
        var abb = req.params.abb;

        mongoose.model('Abbreviation_rep').remove({ abbreviation:abb }, function (err, abbreviation_rep) {
            if (err) {
                res.send("There was a problem deleting the information from the database.");
            } else {
                res.json(abbreviation_rep);
            }
        })
});

app.delete('/abbreviation_rep/id/:id', function(req,res){
        var id = req.params.id;

        mongoose.model('Abbreviation_rep').remove({ _id:id }, function (err, abbreviation_rep) {
            if (err) {
                res.send("There was a problem deleting the information from the database.");
            } else {
                res.json(abbreviation_rep);
            }
        })
});

app.delete('/ops_rep/:ops', function(req,res){
        var ops = req.params.ops;

        mongoose.model('Ops_rep').remove({ ops:ops }, function (err, ops_rep) {
            if (err) {
                res.send("There was a problem deleting the information from the database.");
            } else {
                res.json(ops_rep);
            }
        })
});

app.delete('/ops_rep/id/:id', function(req,res){
        var id = req.params.id;

        mongoose.model('Ops_rep').remove({ _id:id}, function (err, ops_rep) {
            if (err) {
                res.send("There was a problem deleting the information from the database.");
            } else {
                res.json(ops_rep);
            }
        })
});

app.listen(3001);