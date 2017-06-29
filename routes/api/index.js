'use strict'; 
var express = require('express'); 
var jwt = require('jsonwebtoken');
var secret = require('../../config/config').secret;
var Token = require('../../models').Token;
var cors = require('cors');


module.exports = (passport) => {
  
  var router = express.Router(); 

  require('./auth.js')(router, passport); 

  router.use(ensureAuthenticated); 
  router.use(cors()); 
  
  router.route('/')
    .get((req, res) => {
      res.json({ statusCode: 200, message: 'Valid token. Enjoy the router.' });
    });

  require('./logins.js')(passport, router); 
  require('./users.js')(passport, router);     
  require('./groups.js')(passport, router);     
    
    // fallback
  router.use((err, req, res, next) => {
    res
      .status(err.statusCode || 500)
      .json({
        statusCode: err.statusCode || 500,
        message: err.message
      });
  });

  return router; 
}; 

// Middleware functions
function ensureAuthenticated(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers['x-access-token'] || req.headers['X-Access-Token'] ||
    req.body.token || req.query.token;
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        return res.status(403).json({
          success: false,
          statusCode: 403,
          message: 'Failed to authenticate token.'
        });
      } else {
        // if everything is good, save to request for use in other routes
        // Check if it's present in Token model
        Token
          .findOne({ where: { value: token, userId: decoded.uuid }})
          .then(token => {
            if (token === null) {
              return res.status(403).send({
                success: false,
                statusCode: 403,
                message: 'Not a valid token'
              });
            } else {
              req.decoded = decoded;
              next();
            }
          });
      }
    });
  } else {
    // if there is no token, return an error
    return res.status(403).send({
      success: false,
      statusCode: 403,
      message: 'No token provided.'
    });
  }
}
