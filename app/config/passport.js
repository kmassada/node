var passportFunction = function passportFunction(app,passport,User) {
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

  require('./strategies/facebook.strategy')(passport);
  require('./strategies/twitter.strategy')(passport);
  require('./strategies/local.strategy')(passport);
};
module.exports = passportFunction;
