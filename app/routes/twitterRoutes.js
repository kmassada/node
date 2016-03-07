var express = require('express');
var passport = require('passport');
var authRouter = express.Router();
var apiPrefix = process.env.APP_API_VERSION;

/* Handle Login POST */
authRouter.route('/')
    .get(passport.authenticate('twitter'));

/* Handle callback GET */
authRouter.route('/callback')
    .get(passport.authenticate('twitter',
      { session: false, failureRedirect: apiPrefix + '/auth/' }),
      function(req, res) {
        res.setHeader('x-access-token',  req.user.token);
        res.json({
          success: true,
          message: 'Enjoy your token!',
        });
      });

/* Handle Logout */
authRouter.route('/signout')
    .get(function(req, res) {
      req.user.token = '';
      res.redirect(apiPrefix);
    });

module.exports = authRouter;
