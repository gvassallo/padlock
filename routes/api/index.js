'use strict'; 
var express = require('express'); 


module.exports =  (function() {
    var api = express.Router();  
    api.route('/')
      .get((req, res) => {
        console.log(req.headers);
        res.json({ statusCode: 201, message: 'Valid token. Enjoy the API.' });
      });
    //
    return api; 
})(); 
