var express = require('express');

var routes = function() {
  var meRouter = express.Router();
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
  return meRouter;
};

module.exports = routes;
