var jwt    = require('jsonwebtoken');
var User   = require('../models/user');
var secret = process.env.SECRET;

var generateToken = function generateToken(user) {
  // Facebook token too long, stripping token
  user.token = '';
  var token = jwt.sign(user, secret, {
      expiresIn: 43200 * 60 * 60, // Expires in 24 hours
    });
  return token;
};

module.exports = generateToken;
