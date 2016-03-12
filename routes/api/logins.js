'use strict'; 

var db = require('../../models'); 
var Login = db.Login ; 
var User = db.User; 
var Key = db.Key; 

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
            var login = req.body; 
            db.sequelize.transaction({autocommit: false})
            .then(t => {
                return Key
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
      .get((req, res, next) => {
        var pk; 
        return Key
          .findOne({where: {userId: req.decoded.uuid}})
          .then(key =>{
            pk = key;  
            return Login  
              .findById(req.params.id); 
          })
          .then(login => {
            login.password = login.decryptPwd(pk.value); 
            return login;})
          .then(login => res.json(login))
          .catch(err => {
            next({statusCode: 500, message: err.message});              
          }); 
      })
      //@TODO transactions! 
      .delete((req, res, next) => {
        Login 
          .destroy({ where: { userId: req.decoded.uuid, uuid: req.params.id }})
          .then(() => res.json({}))
          .catch(()=> next({message: 'Login not exist', statusCode: 500})); 
      })
      .put((req, res, next)=>{
        Login
        .findById(req.params.id)  
        .then(login => {
          login.updateAttributes({ 
          username: req.body.username, 
          password: req.body.password
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
