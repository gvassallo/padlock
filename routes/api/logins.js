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
            db.sequelize.transaction({autocommit: false})
            .then(t => {
                return User
                .findOne({where: {uuid: req.decoded.uuid}, transaction: t}) 
                .then(user => {
                    return user.createLogin(req.body.login, {transaction: t} ); 
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
          .then(login => res.json(login));
      })
      .delete((req, res, next) => {
        Login 
          .destroy({ where: { userId: req.decoded.uuid, uuid: req.params.id }})
          .then(() => res.json({}));
      })
      //@WARNING need to send the login object 
      //@TODO check if it's correct  
      .put((req, res, next)=>{
            Login
            .findById(req.params.id)  
            .then(login => {
              login.updateAttributes({ 
              username: req.body.login.username, 
              password: req.body.login.password
              })
              .then(login => {
                return res.json(login)
              })
              .catch(e => {
              console.log(e); 
                return next({ message: 'Cannot update the login', statusCode: 500 });
              });
            }); 
        }); 
}
