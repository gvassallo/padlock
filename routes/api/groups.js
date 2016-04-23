'use strict';

var models = require('../../models');

var Group = models.Group;
var User = models.User;

module.exports = (passport, router) => {

  // TODO: transactions!!
  router.route('/groups')
    .get((req, res, next) => {
      Group
        .findAll()
        .then(groups => res.json(groups));
    })
    .post((req, res, next) => {
      var group = req.body;
      Group
        .create(group)
        .then(group => res.json(group))
        .catch(err => next(err));
    });

  router.route('/groups/:uuid')
    .get((req, res, next) => {
      Group
        .findOne({ where: { uuid: req.params.uuid },
                   include: [
                     {
                       model: User,
                       as: 'members',
                       attributes: [ 'uuid', 'username', 'fullName', 'email' ],
                       through: { attributes: [] }
                     }
                   ]})
       .then(group => {
         if (group === null) {
           next({ statusCode: 404, message: 'Group not found. Wrong UUID.' });
         } else {
           res.json(group);
         }
       });
    });

  router.route('/Groups/:uuid/members')
    .get((req, res, next) => {
      Group
        .findOne({ where: { uuid: req.params.uuid }, include: [
           {
             model: User,
             as: 'members',
             attributes: [ 'uuid', 'username', 'fullName', 'email' ],
             through: { attributes: [] }
           }
        ]})
        .then(Group => res.json(Group.members));
    })
    .put((req, res, next) => {
      User
        .findOne({ where: { email: req.body.email }})
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
            return Group.addMember(this.user);
          }
        })
        .then(() => res.json(this.group))
        .catch(err => {
          next({ statusCode: 404, message: err.message });
        });
    });
    

};
