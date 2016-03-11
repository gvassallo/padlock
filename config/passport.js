'use strict';

var LocalStrategy = require('passport-local').Strategy;
var jwt = require('jsonwebtoken');

var db = require('../models');
var User = db.User;
var config = require('./config');

function getUser(user) {
  var u = user.toJSON();
  delete u.password;
  for (var k in u) {
    if (u.hasOwnProperty(k) && !u[k]) {
      delete u[k];
    }
  }
  return u;


function generateToken(user, date, t) {
  let u = getUser(user);
  u.date = date;
  var token = jwt.sign(u, config.secret, {
    expiresIn: config.expireTime
  });
  return user.createToken({ value: token }, { transaction: t });
}

module.exports = (passport) => {

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
    session: false
    }, (req, email, password, done) => {
    db.sequelize.transaction({ autocommit: false })
      .then(function(t) {
        return User
           .generateHash(password)
           .then(hash => {
             return User
              .create({ fullName: req.body.fullname,
                        username: req.body.username,
                        email: email,
                        password: hash },
                        { transaction: t });
            })
          .then(user => {
            t.user = getUser(user);
            return generateToken(user, Date.now(), t);
          })
          .then(token => {
            t.commit();
            return done(null, {
              token: token.value,
              user: t.user,
              expiresIn: config.expireTime
            });
          })
          .catch((err) => {
            t.rollback();
            return done({ message: err.message }, false);
          });
      });
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
    session: false
  }, (req, username, password, done) => {
    db.sequelize.transaction({ autocommit: false })
      .then(function(t) {
        let that = { };
        return User
          .findOne({ where: { $or: [ { email: username }, { username: username } ] }},
                   { transaction: t })
          .then((user) => {
            if (user === null) {
              throw Error('User does not exist.');
            }
            that.user = user;
            return user.validPassword(password);
          })
          .then(isValid => {
            if (isValid) {
              t.user = getUser(that.user);
              return generateToken(that.user, Date.now(), t);
            } else {
              throw Error('Password not valid.');
            }
          })
          .then(token => {
            t.commit();
            return done(null, {
              token: token.value,
              user: t.user,
              expiresIn: config.expireTime
            });
          })
          .catch(err => {
            t.rollback();
            return done(err, false);
          });
      });
  }));

};
