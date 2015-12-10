'use strict'; 

var express = require('express'); 
var app = express(); 
var path = require("path");
// var session = require('express-session'); 

var port = process.env.PORT || 8888;


var port = process.env.PORT || 4000; 

app.listen(port); 

app.route('/') 
      .get((req, res) => {
           res.sendFile(path.join(__dirname, "index.html"));
 }); 

app.route('/js/app.js')
        .get((req, res) => {
            res.sendFile(path.join(__dirname, "client/bundle.js"));             
        }); 
