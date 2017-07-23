var express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
	jsonParser = bodyParser.json(),
	db_ops = require('../model/db_ops'),
	ops = require('../model/ops'),
    db_wordpres = require('../model/db_wordpres'),
    wordpres = require('../model/wordpres'),
    db_diagnose = require('../model/db_diagnose'),
    diagnose = require('../model/diagnose'),
    db_abbreviation = require('../model/db_abbreviation'),
    abbreviation = require('../model/abbreviation'),
	mongoose = require('mongoose'),
	app = express(),
    ejs = require("ejs"),
    fs = require("fs"),
    http = require("http");

app.use(jsonParser);

require("./routes/import").register(app, mongoose);

app.get('/access', function(req,res){
        res.status(200).type('text').send('Der Server ist erreichbar');
});


app.delete('/ops/id/:id', function(req,res){
        
});

app.listen(8888);