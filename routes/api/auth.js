'use strict'; 

module.exports = (router) => {

router.route('/auth/register')
      .post((req, res) => {
        // console.log(req.headers);
        res.json({ statusCode: 200, message: 'Valid token. Enjoy the router.' });
      });

}; 

