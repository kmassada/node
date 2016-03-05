var User = require('../models/user');
var passport = require('passport');

var passportFunction = function passportFunction(app) {
  app.use(passport.initialize());
  app.use(passport.session());
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  require('./strategies/facebook.strategy')(app);
  require('./strategies/twitter.strategy')(app);
};
module.exports = passportFunction;
