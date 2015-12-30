'use strict'; 

var db = require('../../models'); 
var Login = db.Login ; 
var User = db.User; 
var Service = db.Service; 

module.exports = (passport, router) => {

    router.route('/logins')
        .post((req, res, next)=> {
            var login = req.body;
            var s = login.service; 
            login.userId = req.decoded.uuid; 
            db.sequelize.transaction({autocommit: false}) 
            .then( t => {
            Service
            .findOne({ where: { $and: [ { name: login.service }, { userId: login.userId} ]}, transaction: t})  
            .then(service_found => {
                if (service_found === null) {
                    User
                    .findOne({ where: { uuid: login.userId }, transaction: t })
                    .then(user => {
                        return user.createService({name: s},{ transaction: t} ); 
                    })
                    .then( service => {
                        return service
                        .createLogin({username: login.username, password: login.password}, {transaction: t});  
                    })
                    .catch(err =>{ 
                        t.rollback(); 
                        return next({ message: 'Cannot create new login', statusCode: 500 });
                    })
                    .then(login => {
                        t.commit(); 
                        return res.json(login); 
                    })  
                }
                else { 
                    service_found
                    .createLogin({username: login.username, password: login.password}, {transaction: t})
                    .then(login => {
                        t.commit(); 
                        return res.json(login); 
                    }) 
                    .catch(err =>{ 
                        console.log(err.message); 
                        t.rollback(); 
                        return next({ message: 'Cannot create new login', statusCode: 500 });
                    })
                }
            })
            .catch(err =>{ 
                t.rollback(); 
                return res.json({ message: 'Cannot create new service', statusCode: 500 });
            })
        }) 
    }); 
    

}; 
