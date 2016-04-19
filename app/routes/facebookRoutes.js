var express = require('express');
var apiPrefix = process.env.APP_API_VERSION;

var routes = function(passport) {
  var authRouter = express.Router();

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
        res.setHeader('X-Access-Token',  req.user.token);
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
