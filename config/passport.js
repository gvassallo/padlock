'use strict';

var LocalStrategy = require('passport-local').Strategy;
var jwt = require('jsonwebtoken');

var db = require('../models');
var User = db.User;
var config = require('./config');

var node_cryptojs = require('node-cryptojs-aes'); 
var CryptoJS = node_cryptojs.CryptoJS; 
var JsonFormatter = node_cryptojs.JsonFormatter; 

var NodeRSA = require('node-rsa');

function getUser(user) {
  var u = user.toJSON();
  delete u.password;
  for (var k in u) {
    if (u.hasOwnProperty(k) && !u[k]) {
      delete u[k];
    }
  }
  return u;
}

function generateToken(user, date, t) {
  let u = getUser(user);
  u.date = date;
  var token = jwt.sign(u, config.secret, {
    expiresIn: config.expireTime
  });
  return user.createToken({ value: token }, { transaction: t });
}

function generateKeys(user, master, t){
    // encode the master password in base 64
    var master_64 = new Buffer(master); 
    master_64 = master_64.toString('base64'); 
    // create a RSA private key 
    var key = new NodeRSA({b: 512});
    // export the public key into a string 
    var publicKey = key.exportKey('pkcs1-public-pem'); 
    return user.createPublicKey({value: publicKey}, {transaction: t})
      .then(() => {
        var privateKey = key.exportKey('pkcs1'); 
        // encrypt the private key using the master password 
        var key_encrypted = CryptoJS.AES.encrypt(privateKey, master_64, {format: JsonFormatter }); 
        var key_encrypted_str = key_encrypted.toString(); 
        // save on the database the encrypted private key 
        return user.createPrivateKey({value: key_encrypted_str}, {transaction: t}); 
      }); 
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
            t.user = user;
            return generateKeys(user, password, t);  
          }) 
          .then(() => {
            var user = t.user; 
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
              throw new Error('User does not exist.');
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
