var express = require('express');
var apiPrefix = process.env.APP_API_VERSION;

var routes = function(passport) {
  var authRouter = express.Router();

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
      res.redirect(apiPrefix + '/auth/signout');
    });
  return authRouter;
};

module.exports = routes;
