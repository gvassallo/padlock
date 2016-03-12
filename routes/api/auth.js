'use strict';

module.exports = (router, passport) => {

  router.route('/auth')
    .post(
      passport.authenticate('local-login'),
      (req, res) => {
        res.json({
          user: req.user.user,
          token: req.user.token 
        }); 
      }
    );

  router.route('/auth/register')
    .post(
      passport.authenticate('local-signup'),
      (req, res) => {
        res.json({
          user: req.user.user,
          token: req.user.token
        });
      }
    );

};
