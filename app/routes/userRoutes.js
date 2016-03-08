var express = require('express');

var routes = function(User) {
  // Get an instance of the express Router
  var userRouter = express.Router();

  userRouter.route('/')

      // POST /users
    .post(function(req, res) {
      // Create a new instance of the User model
      var newUser = new User();
      // Set the user's local credentials
      newUser.email = req.query.email;
      newUser.password = req.query.password;
      newUser.firstName = req.query.firstName;
      newUser.lastName = req.query.lastName;

      // Save the user
      newUser.save(function(err) {
        if (err) {
          throw err;
        }
        return res.status(201).send(newUser);
      });
    })

    // GET /users
    .get(function(req, res) {
      User.find(function(err, users) {
        if (err) {
          return res.status(500).send(err);
        }
        return res.json(users);
      });
    });


  // Middleware.
  userRouter.use ('/:userId', function(req, res, next) {
    User.findById(req.params.userId, function(err, user) {
      if (err) {
        return res.status(500).send(err);
      }
      if (user) {
        req.user = user;
        next();
      }else {
        return res.status(404).send('Object not found');
      }
    });
  });

  userRouter.route('/:userId')
    // GET /users/:userId
    .get(function(req, res) {
      res.json(req.user);
    })

    // DELETE /users/:userId
    .delete(function(req, res) {
      req.user.remove(function(err) {
        if (err) {
          return res.status(500).send(err);
        }
        return res.status(204).send('removed');
      });
    })

    // PATH /users/:userId
    .patch(function(req, res) {
      if (req.body._id) {
        delete req.body._id;
      }
      for (var p in req.body) {
        req.user[p] = req.body[p];
      }
      // Save the user
      req.user.save(function(err) {
        if (err) {
          return res.status(500).send(err);
        }
        res.json(req.user);
      });
    })

    // PUT /users/:userId)
    .put(function(req, res) {

      // Update the users info
      req.user.email = req.body.email;
      req.user.password = req.body.password;
      req.user.firtName = req.body.firtName;
      req.user.lastName = req.body.lastName;

      // Save the user
      req.user.save(function(err) {
        if (err) {
          return res.status(500).send(err);
        }
        res.json(req.user);
      });
    });
  return userRouter;
};

module.exports = routes;
