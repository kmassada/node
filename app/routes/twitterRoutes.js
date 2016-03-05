var express = require('express');
var passport = require('passport');
var authRouter = express.Router();
var User = require('../models/user');

// As with any middleware it is quintessential to call next()
// if the user is authenticated
var isAuthenticated = function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
};

/* Handle Login POST */
authRouter.route('/')
    .get(passport.authenticate('twitter'));

/* Handle callback GET */
authRouter.route('/callback')
    .get(passport.authenticate('twitter', {
      successRedirect: '/profile',
      failureRedirect: '/',
    }));

/* Handle Logout */
authRouter.route('/signout')
    .get(function(req, res) {
      req.logout();
      res.redirect('/');
    });

/* GET Home Page */
authRouter.route('/profile')
    .get(isAuthenticated, function(req, res) {
      // Res.json({user: req.user});
    });

module.exports = authRouter;
