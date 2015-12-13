var LocalStrategy = require('passport-local').Strategy;
var jwt = require('jsonwebtoken');

var db = require('../models');
var User = db.User;
var config = require('./config');
