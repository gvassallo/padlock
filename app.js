'use strict'; 

var express = require('express'); 
var app = express(); 
var path = require("path");
var passport = require("passport"); 
// var session = require('express-session'); 

var port = process.env.PORT || 4000; 

// Passport initialization 
// app.use(passport.initialize());
// require('./config/passport')(passport);


var api = require("./routes/api"); 
var router = express.Router(); 

router.route('/') 
      .get((req, res) => {
           res.sendFile(path.join(__dirname, "index.html"));
 }); 

router.route('/js/app.js')
        .get((req, res) => {
            res.sendFile(path.join(__dirname, "client/bundle.js"));             
        }); 

app.listen(port); 
app.use('/api', api); 
app.use('/', router); 



// custom 404 page
// app.use(function(req, res){ res.type('text/plain');
//             res.status(404);
//             res.send('404 - Not Found');
// });
//     // custom 500 page
// app.use(function(err, req, res, next){ console.error(err.stack);
//             res.type('text/plain');
//             res.status(500);
//             res.send('500 - Server Error');
// });
