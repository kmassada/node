var express = require('express');
// Get an instance of the express Router
var userRouter = express.Router();
var User = require('../models/user');

userRouter.route('/')

    // POST /users
    .post(function(req, res) {
      // Create a new instance of the User model
      var newUser = new User();

      // Set the user's local credentials
      newUser.email = req.body.email;
      newUser.password = req.body.password;
      newUser.firstName = req.body.firstName;
      newUser.lastName = req.body.lastName;

      // Save the user and check for errors
      newUser.save(function(err) {
        if (err) {
          return res.json({success: false , message: err});
        }
        return res.json({
          success: true,
          message: 'Object created!',
        });
      });
    })

    // GET /users
    .get(function(req, res) {
      User.find(function(err, users) {
        if (err) {
          return res.json({success: false , message: err});
        }
        return res.json(users);
      });
    });

userRouter.route('/:userId')

    // GET /users/:userId
    .get(function(req, res) {
      User.findById(req.params.userId, function(err, user) {
        if (err) {
          return res.json({success: false , message: err});
        }
        if (!user) {
          return res.json({
            success: false,
            message: 'Object not found',
          });
        }
        return res.json(user);
      });
    })

    // DELETE /users/:userId
    .delete(function(req, res) {
      User.findById(req.params.userId, function(err, user) {
        if (err) {
          return res.json({success: false , message: err});
        }
        if (!user) {
          return res.json({
            success: false,
            message: 'Object not found',
          });
        }

        // Delete item
        user.remove(function(err) {
          if (err) {
            return res.json({success: false , message: err});
          }
          return res.json({
            success: true,
            message: 'Object deleted!',
          });
        });
      });
    })

    // PUT /users/:userId)
    .put(function(req, res) {
      // Use our user model to find the user we want
      User.findById(req.params.userId, function(err, user) {
        if (err) {
          return res.json({success: false , message: err});
        }
        if (!user) {
          return res.json({
            success: false,
            message: 'Object not found',
          });
        }
        // Update the users info
        user.email = req.body.email ?  req.body.email :  user.email;
        user.password = req.body.password ?  req.body.password :  user.password;
        user.firtName = req.body.firtName ?  req.body.firtName :  user.firtName;
        user.lastNmae = req.body.lastNmae ?  req.body.lastNmae :  user.lastNmae;

        console.log(user);

        // Save the user
        user.save(function(err) {
          if (err) {
            return res.json({success: false , message: err});
          }
          return res.json({
            success: true,
            message: 'Object updated!',
          });
        });
      });
    });

module.exports = userRouter;
