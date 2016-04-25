'use strict';

var db = require('../../models'); 
var Group = db.Group;
var User = db.User;
var PublicKey = db.PublicKey; 
var PrivateKey = db.PrivateKey; 
var Login = db.Login; 

module.exports = (passport, router) => {

  router.route('/groups')
    .get((req, res, next) => {
      db.sequelize.transaction({autocommit: false})
      .then( t => {
        return Group
          .findAll({transaction: t})
          .then(groups => {
            t.commit(); 
            res.json(groups);
          }); 
      }); 
    })
    .post((req, res, next) => {
      var group = req.body;
      db.sequelize.transaction({autocommit: false})
      .then( t => {
        Group
          .create(group, {transaction: t}) 
          .then(group => {
            t.commit(); 
            res.json(group); 
          }) 
          .catch(err => {
            t.rollback(); 
            next(err);  
          });  
      })
    });

  router.route('/groups/:uuid')
    .get((req, res, next) => {
      db.sequelize.transaction({autocommit: false})
      .then( t => {
        return Group
          .findOne({ 
            where: { uuid: req.params.uuid },
            include: [{
              model: User,
              as: 'members',
              attributes: [ 'uuid', 'username', 'fullName', 'email' ],
              through: { attributes: [] }
            }]
          }, {transaction: t})
         .then(group => {
          if (group === null) {
            t.rollback(); 
            next({ statusCode: 404, message: 'Group not found. Wrong UUID.' });
          } else {
            t.commit(); 
            res.json(group);
          }
         });
      });
    }); 

  router.route('/groups/:uuid/members')
    .get((req, res, next) => {
      db.sequelize.transaction({autocommit: false})
      .then(t => {
        return Group
          .findOne({ where: { uuid: req.params.uuid }, include: [
            {
              model: User,
              as: 'members',
              attributes: [ 'uuid', 'username', 'fullName', 'email' ],
              through: { attributes: [] }
            }
          ]}, {transaction: t})
          .then(group => {
              t.commit(); 
              res.json(group.members);
          }); 
      }); 
    })
    .put((req, res, next) => {
      db.sequelize.transaction({autocommit: false})
      .then(t => {
        return User
          .findOne({ where: { email: req.body.email }}, {transaction: t}) 
          .then(user => {
            if (user === null) {
              throw Error('User not found. Wrong email or username.');
            } else {
              this.user = user;
              return Group.findOne({ where: { uuid: req.params.uuid } });
            }
          })
          .then(group => {
            if (group === null) {
              throw Error('Group not found. Wrong id.');
            } else {
              this.group = group;
              return group.addMember(this.user);
            }
          })
          .then(() => {
            t.commit(); 
            res.json(this.group); 
          }) 
          .catch(err => {
            t.rollback(); 
            next({ statusCode: 404, message: err.message });
          });
        }); 
    });
    
    router.route('/groups/:uuid/logins')
      .get((req, res, next) => {
        db.sequelize.transaction({autocommit: false})
        .then( t => {
          return Group 
          .findOne({ 
            where: { 
              uuid: req.params.uuid  
            }, 
            include: [{
             model: User,
             as: 'members',
             where: {uuid: req.decoded.uuid}, 
             attributes: ['uuid'],
             through: { attributes: [] }
           }]
          }, {transaction: t})
          .then( group => {
            if(group === null){
               throw Error('Group not found or User does not belong to the group.'); 
            }
            return Login
              .findAll({ 
                where: { 
                  groupId: req.params.uuid, 
                  userId: req.decoded.uuid
                }, 
                transaction: t
              })  
              .then(logins => {
                t.commit();  
                res.json(logins); 
              }); 
          })
          .catch(err => {
            t.rollback(); 
            next({ message: err.message, statusCode: 500 });  
          }); 
        }); 
      }) 
      .post((req, res, next) => {
        var login = req.body.login; 
        login.groupId = req.params.uuid; 
        db.sequelize.transaction({autocommit: false})
        .then(t => {
          Group 
          .findOne({ where: { uuid: req.params.uuid }, include: [
             {
               model: User,
               as: 'members',
               attributes: ['uuid'],
               through: { attributes: [] }
             }
          ]}, {transaction: t})
          .then(group => {
            if(group === null){
              throw Error('Group not found. Wrong id.');
            }
            login.groupToken = Login.genToken(); 
            group.members.map( user => {
              PublicKey
                .findOne({ where: { userId: user.uuid }}, {transaction: t})
                .then( key => {
                  login.password = Login.encryptPwd(login.password, key.value)
                  return user.createLogin(req.body.login, {transaction: t}) 
                    .then( login => {
                      t.commit(); 
                      return res.json(login);    
                    }) 
                    .catch(err => {
                      t.rollback(); 
                      return next({ message: err.message, statusCode: 500 });
                    }); 
                }); 
            });
          }) 
          .catch(err => {
            t.rollback(); 
            return next({ message: err.message, statusCode: 500 });
          }); 
        }); 
      }); 
      

    router.route('/groups/:uuid/logins/:loginId')
    .post((req, res, next) => {
      var master = req.body.master; 
      db.sequelize.transaction({autocommit: false})  
      .then( t => {
        return Group 
        .findOne({ 
          where: { 
            uuid: req.params.uuid  
          }, 
          include: [{
           model: User,
           as: 'members',
           where: {uuid: req.decoded.uuid}, 
           attributes: ['uuid'],
           through: { attributes: [] }
         }]
        }, {transaction: t})
        .then( group => {
          if(group === null){
            throw Error('Group not found or User does not belong to the group.'); 
          }
          return Login
            .findOne({where: {uuid: req.params.loginId}, transaction: t})  
            .then(login_encrypted => {
              var login = login_encrypted; 
              return PrivateKey
                .findOne({where: {userId: req.decoded.uuid}})
                .then(privateKey => {
                  login.password = login.decryptPwd(privateKey.value, master);  
                  t.commit(); 
                  return res.json(login); 
                })
            }); 
        })
        .catch(err => {
          t.rollback(); 
          next({ message: err.message, statusCode: 500 });  
        }); 
      }); 
    }) 
    .put((req, res, next) => {
      var newlogin = req.body.login; 
      var publicKey; 
      db.sequelize.transaction({autocommit: false})
      .then( t => {
        Login
          .findOne({where: {uuid: req.params.loginId}}, {transaction: t}) 
          .then(login => {
            newlogin.groupToken = login.groupToken; 
            return Group 
              .findOne({ where: { uuid: req.params.uuid }, include: [
                 {
                   model: User,
                   as: 'members',
                   where: {uuid: req.decoded.uuid}, 
                   attributes: ['uuid'],
                   through: { attributes: [] }
                 }
              ]}, {transaction: t})
        })
        .then(group => {
          if(group === null) {
            throw Error('Group not found. Wrong id.');
          }
          group.members.map( user => {
            PublicKey
              .findOne({where: {userId: user.uuid}, transaction: t})
              .then(key => {
                publicKey = key; 
                return Login.findOne({ 
                  where: {
                    groupToken: newlogin.groupToken, 
                    userId: user.uuid
                  }} , {transaction: t})
              })
              .then(login => {
                newlogin.password = Login.encryptPwd(newlogin.password, publicKey.value);    
                return login
                .updateAttributes({ 
                  username: newlogin.username, 
                  password: newlogin.password
                }, {transaction: t})
                .then(login => {
                  t.commit(); 
                  // TODO check if it's correct 
                  if(login.userId === req.decoded.uuid){
                    return res.json(login); 
                  }
                })
              })
          })
        })
        .catch(err =>{
           t.rollback(); 
           next({message: err.message, statusCode: 500}); 
        });
      })
    }) 
    .delete((req, res, next) => {
      db.sequelize.transaction({autocommit: false})
      .then( t => {
        return Group 
          .findOne({ where: { uuid: req.params.uuid }, include: [
            {
              model: User,
              as: 'members',
              where: {uuid: req.decoded.uuid}, 
              attributes: ['uuid'],
              through: { attributes: [] }
            }
          ]}, {transaction: t})
          .then(group => {
            if (group === null) {
              throw Error('t exist. Wrong id.'); 
            }
            Login
              .findById(req.params.loginId, {transaction: t}) 
              .then(login => {
                if(login === null){
                   throw Error('Group not found or User does not belong to the group.'); 
                }
                return Login
                  .destroy({where: {groupToken: login.groupToken}, transaction: t})
                  .then(() => {
                     t.commit(); 
                     return res.json({}); 
                  })
              })
            .catch(err => {
               t.rollback(); 
               next({message: err.message, statusCode: 500}); 
            }); 
          }) 
          .catch(err => {
             t.rollback(); 
             next({message: err.message, statusCode: 500}); 
          }); 
    });
  }); 
};







