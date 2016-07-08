'use strict';

var db = require('../../models'); 
var Promise = require('bluebird');
var Group = db.Group;
var User = db.User;
var UserGroup = db.UserGroup;
var PublicKey = db.PublicKey; 
var PrivateKey = db.PrivateKey; 
var Login = db.Login; 

module.exports = (passport, router) => {

  router.route('/groups')
    .get((req, res, next) => {
      db.sequelize.transaction({ autocommit: false })
        .then(function(t) {
          return User
            .findOne({ where: { uuid: req.decoded.uuid }, transaction: t })
            .then(user => {
              return user.getGroups({ transaction: t });
            })
            .then(groups => {
              t.commit();
              return res.json(groups);
            })
            .catch(err => {
              t.rollback();
              return next({ statusCode: 500, message: err.message });
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
            this.group = group; 
            return User.findById(req.decoded.uuid, {transaction: t})
          }) 
          .then(user => {
            return this.group.addMember(user, {admin: 'true', transaction: t}); 
          })
          .then(() => {
            t.commit(); 
            return res.json(this.group); 
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
    })
    .delete((req, res, next) => {
      db.sequelize.transaction({autocommit: false}) 
        .then(t => {
          return Group
            .findOne({
              where: {uuid: req.params.uuid}, 
              include: [{
                model: User, 
                as: 'members', 
                through: {where: {userId: req.decoded.uuid, admin: true}}
              }]
            }, {transaction: t})
            .then(group => {
              if(group === null){
                t.rollback();
                next({statusCode: 404, message: 'Group not found. Wrong UUID.'});
              }
              else if(group.members.length < 1){
                t.rollback();
                next({statusCode: 500, message: 'The group can be deleted only by the admin.'});
              }
              else{
                Group.destroy({
                  where: {uuid: req.params.uuid}, 
                  transaction: t
                })
                .then(()=>  {
                  t.commit();
                  return res.json({});
                })
                .catch(err=> {
                  t.rollback();
                  next({statusCode: 500, message: err.message});
                });
              }
            });
          });
    });
  //TODO only if the user is a member 
  router.route('/groups/:uuid/members')
    .get((req, res, next) => {
      db.sequelize.transaction({autocommit: false})
      .then(t => {
        return Group
          .findOne({ where: { uuid: req.params.uuid }, include: [
            {
              model: User,
              as: 'members',
              attributes: [ 'uuid', 'username', 'fullName', 'email'],
              through: { attributes: ['admin'] }
            }
          ]}, {transaction: t})
          .then(group => {
            t.commit(); 
            res.json(group.members);
          }) 
          .catch(err => {
            t.rollback(); 
            next({message: err.message, statusCode: 500}); 
          })

      }); 
    })
    .put((req, res, next) => {
      var user = req.body.user;
      var master = req.body.master;
      db.sequelize.transaction({autocommit: false})
      .then(t => {
        return User
          .findOne({ where: { email: user.email }}, {transaction: t}) 
          .then(user => {
            if (user === null) {
              throw Error('User not found. Wrong email or username.');
            } else {
              this.user = user;
              return Group
                .findOne({ where: { uuid: req.params.uuid }, include: [
                  {
                    model: User,
                    as: 'members',
                    where: {$or: [{uuid: req.decoded.uuid},{uuid: this.user.uuid}]},
                    attributes: ['uuid'],
                    through: { attributes: [''] }
                  }
                ]}, {transaction: t});
            }
          })
          .then(group => {
            if (group === null) {
              throw Error('Group not found. Wrong id.');
            } else {
              if(group.members.length === 0){
                throw Error('You do not belong to the group.'); 
              }
              else if(group.members.length === 2){
                throw Error('User already belongs to the group.');
              }
              else if(group.members.length === 1){
                if(group.members[0].uuid === this.user.uuid)
                  throw Error('You do not belong to the group.');
              }
              this.group = group;
              return group.addMember(this.user, {transaction: t});
            }
          })
          .then(() => {
            return Login
              .findAll({
                where: {groupId: this.group.uuid, userId: req.decoded.uuid}, 
                transaction: t
              });
          })
          .then(logins => {
            if(logins.length === 0)
              return;
            this.logins = logins;
            return PrivateKey
              .findOne({where: {userId: req.decoded.uuid}, transaction: t})
              .then(privateKey => {
                this.privateKey = privateKey; 
                return PublicKey
                  .findOne({where: {userId: this.user.uuid}, transaction: t});
              })
              .then(publicKey => {
                this.publicKey = publicKey; 
                return Promise.map(logins, login => {
                  login.password = login.decryptPwd(this.privateKey.value, master);  
                  login = JSON.parse(JSON.stringify(login));
                  login.password = Login.encryptPwd(login.password, this.publicKey.value)
                  login.userId = this.user.uuid;
                  delete login.uuid;
                  return Login.create(login, {transaction: t});
                });
              });
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

  router.route('/groups/:uuid/members/:userId')
    .delete((req, res, next) => {
      db.sequelize.transaction({autocommit: false})
        .then(t => {
          return User
            .findOne({ where: { uuid: req.params.userId }}, {transaction: t}) 
            .then(user => {
              if (user === null) {
                throw Error('User not found. Wrong userId.');
              } else {
                this.user = user;
              return Group
                .findOne({
                  where: { 
                    uuid: req.params.uuid
                  }, 
                  include: [{
                    model: User,
                    as: 'members',
                    where: {$or : [
                      {uuid: req.params.userId}, 
                      {uuid: req.decoded.uuid}, 
                    ]},
                    attributes: ['uuid'],
                    through: { attributes: ['admin'] }
                  }]
                }, {transaction: t});}
            })
            .then( group => {
              if (group === null) {
                throw Error('Group not found.');
              } 
              if(group.members.length == 1){
                var member = group.members[0]; 
                if(member.uuid === req.decoded.uuid && member.uuid === req.params.userId){//its me and i'm trying to delete myself 
                  if(member.UserGroup.admin) 
                    throw Error('Error removing a member. If you are the admin, remove the group directly.');
                  else{
                    return group;
                  }
                }
                else if(member.uuid === req.decoded.uuid && !member.uuid === req.params.userId){
                  throw Error('User not found');
                }
                else if(member.uuid !== req.decoded.uuid && member.uuid === req.params.userId){
                  throw Error('Error removing a member. You do not belong to the group');
                }
                else{
                  throw Error('User not found and you do not belong to the group');
                }
              }
              else if(group.members.length == 2){
                var me = group.members.filter(member => member.uuid == req.decoded.uuid)[0];
                if(!me.UserGroup.admin){
                  throw Error('Only the admin can remove a member');
                }
                return group; 
              }
            })
            .then(group => {
              return Login.destroy({
                where: {
                  userId: req.params.userId, 
                  groupId: req.params.uuid
                }}, {transaction: t})
            })
            .then(() => {
              return UserGroup.destroy({
                where: {
                  userId: req.params.userId, 
                  groupId: req.params.uuid
                }}, {transaction: t
              });
            })
            .then(()=> {
              t.commit(); 
              return res.json({});
            })
            .catch(err => {
              t.rollback(); 
              next({ statusCode: 500, message: err.message });
            });
        })
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
        var _login = req.body.login; 
        var originalLogin; //login to be returned
        _login.groupId = req.params.uuid; 
        db.sequelize.transaction({autocommit: false})
        .then( t => {
          Group 
          .findOne({ where: { uuid: req.params.uuid }, include: [
             {
               model: User,
               as: 'members',
               attributes: ['uuid'],
               through: { attributes: [] }
             }
          ]}, {transaction: t})
          .then( group => {
            if(group === null){
              throw Error('Group not found. Wrong id.');
            }
            _login.groupToken = Login.genToken(); 
            return Promise.map(group.members,  user => {
              return PublicKey
                .findOne({ where: { userId: user.uuid }}, {transaction: t})
                .then( publicKey => {
                  var newLogin = JSON.parse(JSON.stringify(_login));
                  newLogin.password = Login.encryptPwd(newLogin.password, publicKey.value)
                  return user.createLogin(newLogin, {transaction: t});
                }) 
                .then( login => {
                  //return only the login created by the current user 
                  if(login.userId === req.decoded.uuid)
                    originalLogin = login; 
                  return;  
                }) 
            })
            .then( () => {
              t.commit(); 
              return res.json(originalLogin);
            });
          }) 
          .catch( err => {
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
            .findOne({where: {uuid: req.params.loginId}, transaction: t});
        })
        .then(login_encrypted => {
          if(login_encrypted === null){
            throw Error('Login not found wrong loginId.'); 
          }
          var login = login_encrypted; 
          return PrivateKey
            .findOne({where: {userId: req.decoded.uuid}})
            .then(privateKey => {
              login.password = login.decryptPwd(privateKey.value, master);  
              t.commit(); 
              return res.json(login); 
            })
        })
        .catch(err => {
          t.rollback(); 
          next({ message: err.message, statusCode: 500 });  
        }); 
      }); 
    }) 
    .put((req, res, next) => {
      var _login = req.body.login; 
      var updatedLogin; 
      db.sequelize.transaction({autocommit: false})
      .then( t => {
        Login
          .findOne({where: {uuid: req.params.loginId}}, {transaction: t}) 
          .then(login => {
            _login.groupToken = login.groupToken; 
            return Group 
              .findOne({ where: { uuid: req.params.uuid }, include: [
                 {
                   model: User,
                   as: 'members',
                   attributes: ['uuid'],
                   through: { attributes: [] }
                 }
              ]}, {transaction: t})
        })
        .then(group => {
          if(group === null) {
            throw Error('Group not found. Wrong id.');
          }
          return Promise.map(group.members,  user => {
            let publicKey;
            return PublicKey
              .findOne({where: {userId: user.uuid}, transaction: t})
              .then(key => {
                publicKey = key;
                return Login.findOne({ 
                  where: {
                    groupToken: _login.groupToken, 
                    userId: user.uuid
                  }} , {transaction: t})
              })
              .then(login => {
                var updatedPassword = Login.encryptPwd(_login.password, publicKey.value)
                return login
                .updateAttributes({ 
                  username: _login.username, 
                  password: updatedPassword 
                }, {transaction: t});
              })
              .then(login => {
                if(login.userId === req.decoded.uuid){
                  updatedLogin = login;  
                }
                return;
              })
            })
            .then( () => {
              t.commit(); 
              return res.json(updatedLogin);
            });
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







