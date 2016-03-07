var express = require('express');
var passport = require('passport');
var authRouter = express.Router();
var apiPrefix = process.env.APP_API_VERSION;

/* Handle Login POST */
authRouter.route('/')
    .get(passport.authenticate('facebook', {
      scope: 'email',
    }));

/* Handle callback GET */
authRouter.route('/callback')
    .get(passport.authenticate('facebook',
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
