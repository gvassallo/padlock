'use strict'; 

var express = require('express'); 
var path = require('path'); 

var router = express.Router(); 

router.route('/') 
        .get((req, res) => {
        res.sendFile(path.join(__dirname, "../../client/index.html"));
 }); 

router.route('/js/app.js')
        .get((req, res) => {
        res.sendFile(path.join(__dirname, "../../client/dist/js/bundle.js"));             
        }); 

router.route('/css/style.css')
        .get((req, res) => {
        res.sendFile(path.join(__dirname, "../../client/dist/css/style.css"));             
        }); 

module.exports = router; 
