'use strict';

var express = require('express');
var app = express();
var passport = require('passport');

var bodyParser = require('body-parser');
var compression = require('compression');


// Instruct express to server up static assets
app.use(compression());
// Setup bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 3000;

// Passport initialization
app.use(passport.initialize());
require('./config/passport')(passport);

var api = require('./routes/api')(passport);

app.use('/api', api);

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:3000');
});

// Enable integration tests
/* istanbul ignore else */
if (process.env.NODE_ENV === 'test') {
  module.exports = app;
}
