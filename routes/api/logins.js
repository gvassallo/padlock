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

}; 
