'use strict'; 

var db = require('../../models'); 
var Login = db.Login ; 
var User = db.User; 
var Service = db.Service; 

module.exports = (passport, router) => {
    
    // create a login(username and password) for a service 
    router.route('/services/:serviceId/logins')
        .post((req, res, next)=> {
            var login = req.body.login;
            login.userId = req.decoded.uuid; 
            db.sequelize.transaction({autocommit: false}) 
            .then( t => {
            // find the service with a certain name 
            console.log(login);  
            Service
            .findOne({ where: { $and: [ { name: req.params.serviceId }, { userId: login.userId} ]}, transaction: t})  
            .then(service_found => {
                    return service_found
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
            })
            .catch(err =>{ 
                console.log(err.message); 
                t.rollback(); 
                return next({ message: 'Cannot create new login, the service does not exist', statusCode: 500 });
            })
        }) 
    }); 
}; 
