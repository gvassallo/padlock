'use strict'; 

var express = require('express'); 
var app = express(); 
var path = require("path");
var passport = require("passport"); 

var bodyParser = require('body-parser');
var compression = require('compression');
var cookieParser = require('cookie-parser');
// var session = require('express-session'); 

// Instruct express to server up static assets
app.use(compression());

// Setup bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 3000; 

// Passport initialization 
app.use(passport.initialize());
require('./config/passport')(passport);


var api = require("./routes/api")(passport); 
var client = require("./routes/client"); 

app.listen(port); 
app.use('/', client); 
app.use('/api', api); 


