'use strict'; 
var express = require('express'); 


module.exports = (passport) => {

    var router = express.Router();  

    var auth = require('./auth.js')(router, passport); 

    router.route('/')
      .get((req, res) => {
        console.log(req.headers);
        res.json({ statusCode: 201, message: 'Valid token. Enjoy the router.' });
      });

    
    //
    return router; 
}; 
