var express = require('express');
var passport = require('passport');
var meRouter = express.Router();
var User = require('../models/user');
var requireAuth = require('../config/auth');

// /* GET Home Page */
meRouter.route('/')
    .get(function(req, res) {
      // Return the information including token as JSON
      res.json({
        success: true,
        message: 'Enjoy your token!',
        user: req.user,
      });
    });
module.exports = meRouter;
