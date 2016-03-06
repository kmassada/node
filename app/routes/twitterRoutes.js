var express = require('express');
var passport = require('passport');
var authRouter = express.Router();
var jwt    = require('jsonwebtoken');
var secret = process.env.SECRET;

/* Handle Login POST */
authRouter.route('/')
    .get(passport.authenticate('twitter'));

/* Handle callback GET */
authRouter.route('/callback')
    .get(function(req, res, next) {
      passport.authenticate('twitter', function(err, user) {
        console.log(user);
        if (err) {
          return next(err);
        }
        // If user is found and password is right
        // create a token
        var token = jwt.sign(user, secret, {
          expiresIn: 43200 * 60 * 60, // Expires in 24 hours
        });

        // Return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token,
          user: user,
        });
      })(req, res, next);
    });

/* Handle Logout */
authRouter.route('/signout')
    .get(function(req, res) {
      req.logout();
      res.redirect('/');
    });

module.exports = authRouter;
