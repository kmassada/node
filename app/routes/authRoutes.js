var express = require('express');
var authRouter = express.Router();
var bcrypt = require('bcrypt-nodejs');
var jwt    = require('jsonwebtoken');
var User = require('../models/user');
var secret = process.env.SECRET;

authRouter.route('/')

    // POST /auth/
    .post(function(req, res) {
      // Use our user model to find the user we want
      // find the user
      User.findOne({email: req.body.email}, function(err, user) {
        if (!user) {
          res.json({
            success: false,
            message: 'Authentication failed. User not found.',
          });
        } else if (user) {

          // Check if password matches
          console.log(user.password);
          console.log(req.body.password);
          if (!user.validPassword(req.body.password)) {
            res.json({
              success: false,
              message: 'Authentication failed. Wrong password.',
            });
          } else {

            // If user is found and password is right
            // create a token
            var token = jwt.sign(user, secret, {
              expiresInSeconds: 43200, // Expires in 24 hours
            });

            // Return the information including token as JSON
            res.json({
              success: true,
              message: 'Enjoy your token!',
              token: token,
            });
          }
        }
      });
    });

module.exports = authRouter;
