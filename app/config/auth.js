var jwt    = require('jsonwebtoken');
var User   = require('../models/user');
var keys = {secret: 'random sauce'};

var requireAuthentication = function requireAuthentication(req, res, next) {

  // Check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // Decode token
  if (token) {

    // Verifies secret and checks exp
    // wrap: superSecret in a cofig
    jwt.verify(token, keys.secret , function(err, decoded) {
        if (err) {
          return res.json({
            success: false,
            message: 'Failed to authenticate token.',
          });
        }
        // If everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();

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
