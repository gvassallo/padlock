'use strict'; 

var db = require('../../models'); 
var Login = db.Login ; 
var User = db.User; 
var PublicKey = db.PublicKey; 
var PrivateKey = db.PrivateKey; 

module.exports = (passport, router) => {
    
    router.route('/logins')
        .get((req, res, next) => {
        db.sequelize.transaction({autocommit: false})
        .then( t => {
            return User
            .findOne({where: {uuid : req.decoded.uuid}, transaction: t})  
            .then(user => {
              return user.getLogins({ transaction: t });
            })
            .then(logins => {
              logins = logins.filter((login)=> {
                if (login.groupId === null){
                  return true;               
                }else 
                  return false; 
              }); 
              t.commit();
              return res.json(logins);
            })
            .catch(err => {
              t.rollback();
              return next({ statusCode: 500, message: err.message });
            });
          });
        }) 
        .post((req, res, next) => {
            var login = req.body.login; 
            db.sequelize.transaction({autocommit: false})
            .then(t => {
              return PublicKey
                .findOne({where: {userId: req.decoded.uuid}, transaction: t})
                .then(key => {
                  login.password = Login.encryptPwd(login.password, key.value); 
                  return login.password; 
                })
                .then((pwd)=> {
                  if(pwd === null){
                    throw Error('Password not encrypted.');}
                  else {
                    return User
                      .findOne({where: {uuid: req.decoded.uuid}, transaction: t}); 
                  }
                })                  
                .then(user => {
                  return user.createLogin(login, {transaction: t} ); 
                })
                .then( login => {
                  if(login === null){
                    throw Error('Cannot create new login.');                        
                  }
                  t.commit(); 
                  return res.json(login); 
                })
                .catch(err =>{ 
                  t.rollback(); 
                  return next({ message: err.message, statusCode: 500 });
                }); 
            }); 
          }); 
      
    router.route('/logins/:id')
      .post((req, res, next) => {
        var key_encrypted; 
        var master = req.body.master;         
        return PrivateKey
          .findOne({where: {userId: req.decoded.uuid}})
          .then(key =>{
            key_encrypted = key;  
            return Login  
              .findById(req.params.id); 
          })
          .then(login => {
            login.password = login.decryptPwd(key_encrypted.value, master); 
            return res.json(login); 
          })
          .catch(err => {
            next({statusCode: 500, message: err.message});              
          }); 
      })
      //TODO transactions! 
      .delete((req, res, next) => {
        Login 
          .destroy({ where: { userId: req.decoded.uuid, uuid: req.params.id }})
          .then(() => res.json({}))
      })
      .put((req, res, next)=>{
        var master = req.body.master; 
        var publicKey; 
        var req_login = req.body.login; 
        return PublicKey
          .findOne({where: {userId: req.decoded.uuid}})
          .then(key => {
            publicKey = key;  
            return Login.findById(req.params.id);
          })
          .then(login => {
            req_login.password = Login.encryptPwd(req_login.password, publicKey.value);              
            return login
            .updateAttributes({ 
              username: req_login.username, 
              password: req_login.password
            })
            .then(login => {
              return res.json(login); 
            })
            .catch(() => {
              return next({ message: 'Cannot update the login', statusCode: 500 });
            });
          }); 
      }); 
}; 

