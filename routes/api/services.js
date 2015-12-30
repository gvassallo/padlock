'use strict'; 

var db = require('../../models'); 
var Login = db.Login ; 
var User = db.User; 
var Service = db.Service; 

module.exports = (passport, router) => {
    router.route('/services')
        .get((req, res, next) => {
        db.sequelize.transaction({autocommit: false})
        .then( t => {
            return User
            .findOne({where: {uuid : req.decoded.uuid}, transaction: t})  
            .then(user => {
              return user.getServices({ transaction: t });
            })
            .then(services => {
              t.commit();
              return res.json(services);
            })
            .catch(err => {
              t.rollback();
              return next({ statusCode: 500, message: err.message });
            });
        });
        }); 
    
    router.route('/services/:name/logins')
        .get((req, res, next) => {
        db.sequelize.transaction({autocommit: false})
        .then( t => {
          return Service  
            .findOne({where: { $and: [{userId: req.decoded.uuid},{name: req.params.name}]}}, {
              transaction: t})
            .then(service => {
              return service.getLogins();
            })
            .then(logins => {
              t.commit();
              return res.json(logins);
            })
            .catch(err => {
              t.rollback();
                //to change 
              return next({ statusCode: 404, message: err.message });
            });
        });
    }); 
}; 
