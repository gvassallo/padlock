'use strict'; 

var express = require('express'); 
var path = require('path'); 

var router = express.Router(); 

// TODO change this shit!
router.route('/') 
        .get((req, res) => {
        res.sendFile(path.join(__dirname, "../../client/index.html"));
        }); 
router.route('/register')
        .get((req, res) => {
        res.sendFile(path.join(__dirname, "../../client/index.html"));
        }); 

router.route('/login')
        .get((req, res) => {
        res.sendFile(path.join(__dirname, "../../client/index.html"));
        }); 
router.route('/profile')
        .get((req, res) => {
        res.sendFile(path.join(__dirname, "../../client/index.html"));
        }); 
router.route('/groups')
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
router.route('/img/*')
        .get((req, res) => {
        res.sendFile(path.join(__dirname, "../../client/dist/", req.originalUrl));             
        }); 
router.use('/fonts', 
          express.static(path.join(__dirname, "../../node_modules/font-awesome/fonts"))); 

// router.route('/')
//         .get((req, res) => {
//         res.sendFile(path.join(__dirname, "../../client/index.html"));
//         }); 
module.exports = router; 
