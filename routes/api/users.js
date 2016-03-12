'use strict';

var models = require('../../models');

var User = models.User;

module.exports = (passport, router) => {

  router.route('/users/me')
    .get((req, res) => {
      User
        .findOne({ where: { uuid: req.decoded.uuid } })
        .then(user => res.json(user));
    })
    .put((req, res, next) => {
      User
        .findOne({ where: { uuid: req.decoded.uuid } })
        .then(user => {
          this.user = user;
          return user.updateAttributes(req.body);
        })
        .then(() => res.json(this.user))
        .catch(err => next({ statusCode: 502, message: err.message }));
    });

  router.route('/users/:uuid')
    .get((req, res, next) => {
      User
        .findOne({ where: { uuid: req.params.uuid },
          attributes: [ 'uuid', 'username', 'fullName', 'email', 'createdAt' ]
        })
        .then(user => {
          if (user) {
            res.json(user);
          } else {
            next({ message: 'User id doesn\'t exit' });
          }
        });
    });

};
