'use strict';

module.exports = (router, passport) => {

  // router.route('/auth')
  //   .post(
  //     passport.authenticate('local-login'),
  //     (req, res) => {
  //       res.json({
  //         user: req.user.user,
  //         token: req.user.token
  //       });
  //     }
  //   );

  
// router.route('/auth/register')
//     .get((req, res) => {
//       console.log(req.headers);
//       res.json({ statusCode: 200, message: 'Valid token. Enjoy the API.' });
//     });
    // router.post('/auth/register', function (req, res) {
    //     console.log(req.body); 
    // });

  router.route('/auth/register')
    .post(
      passport.authenticate('local-signup'),
      (req, res) => {
        console.log(res); 
        res.json({
          user: req.user.user,
          token: req.user.token
        });
      }
    );

};
