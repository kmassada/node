var jwt    = require('jsonwebtoken');
var User   = require('../models/user');
var keys = {secret: 'random sauce'};
var secret = process.env.SECRET;

var requireAuthentication = function requireAuthentication(req, res, next) {

  // Check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // Decode token
  if (token) {

    // Verifies secret and checks exp
    // wrap: superSecret in a cofig
    jwt.verify(token, secret , function(err, decoded) {
        if (err) {
          return res.json({
            success: false,
            message: 'Failed to authenticate token.',
          });
        }
        // If everything is good, save to request for use in other routes
        req.decoded = decoded;
        User.findOne({ token: token }, function(err, user) {
          if (err) {
            return next(err);
          }
          if (!user) {
            return res.json({
              success: false,
              message: 'Failed to authenticate token.',
            });
          }
          user.token = '';
          req.user = user;
          return next();
        });

      });

  } else {

    // If there is no token
    // return an error
    return res.status(403)
            .send({
              success: false,
              message: 'No token provided.',
            });

  }
};

module.exports = requireAuthentication;
