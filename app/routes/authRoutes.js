var express = require('express');
var apiPrefix = process.env.APP_API_VERSION;
var requireAuth = require('../config/auth');

var routes = function(passport) {
  var authRouter = express.Router();

  /* Handle GET */
  authRouter.route('/')
    .get(function(req, res) {
      return res.status(500).send('err');
    });

  /* Handle Login POST */
  authRouter.route('/login')
    .post(function(req, res, next) {
      passport.authenticate('login', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return next(info); }
        res.setHeader('x-access-token',  user.token);
        return res.json({
          success: true,
          message: 'Enjoy your token!',
        });
      })(req, res, next);
    }, function(req, res, next) {
      if (!req.error) {
        req.error = 'Something went majorly wrong!';
      }
      return res.status(500).send(req);
    });

  /* Handle Registration POST */
  authRouter.route('/signup')
  .post(function(req, res, next) {
    passport.authenticate('signup', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return next(info); }
      res.setHeader('x-access-token',  user.token);
      return res.json({
        success: true,
        message: 'Enjoy your token!',
      });
    })(req, res, next);
  }, function(req, res, next) {
    if (!req.error) {
      req.error = 'Something went majorly wrong!';
    }
    return res.status(500).send(req);
  });

  /* Handle Logout */
  authRouter.route('/signout')
    .get(requireAuth)
    .get(function(req, res) {
      delete req.user.token;
      req.user.save(function(err) {
        if (err) {
          return res.status(500).send(err);
        }
        return res.status(200).send('logout');
      });
    });
  return authRouter;
};

module.exports = routes;
