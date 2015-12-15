'use strict'; 

module.exports = (passport,router) => {

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

