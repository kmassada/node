// Grab the user model
var User = require('../models/user');

// Create a new user
var newUser = new User({
  firstName: 'Peter',
  lastName: 'Quill',
  email: 'starlord55@dancymove.net',
  password: 'password',
  admin: true,
});

User.find(newUser, function(err, user) {
  if (err) {
    throw err;
  }
  if (user.length === 0) {
    // Save the user
    newUser.save(function(err) {
      if (err) {
        console.log(err);
      }else {
        console.log('User created!');
      }
    });
  }
});

// Get all the users
User.find({}, function(err, users) {
  if (err) {
    console.log(err);
  } else {
    // Object of all the users
    console.log(users);
  }
});
