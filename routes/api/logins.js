'use strict'; 

var db = require('../../models'); 
var Login = db.Login ; 
var User = db.User; 

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
                return User
                .findOne({where: {uuid: req.decoded.uuid}, transaction: t}) 
                .then(user => {
                    login.password = Login.encryptPwd(login.password);
                    return user.createLogin(login, {transaction: t} ); 
                })
                .then( login => {
                    t.commit(); 
                    return res.json(login); 
                })
                .catch(err =>{ 
                    t.rollback(); 
                    return next({ message: 'Cannot create new login', statusCode: 500 });
                }); 
            }); 
        }); 
        
    router.route('/logins/:id')
      .get((req, res, next) => {
        Login
          .findById(req.params.id)
          .then(login => {
            login.password = login.decryptPwd(); 
            return login;})
          .then(login => res.json(login));
      })
      //@TODO transactions! 
      .delete((req, res, next) => {
        Login 
          .destroy({ where: { userId: req.decoded.uuid, uuid: req.params.id }})
          .then(() => res.json({}));
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
                return res.json(login)
              })
              .catch(e => {
                return next({ message: 'Cannot update the login', statusCode: 500 });
              });
            }); 
        }); 
}
