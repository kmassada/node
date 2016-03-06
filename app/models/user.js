var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var bcrypt       = require('bcrypt-nodejs');

var userSchema = new Schema({
  firstName: String,
  lastName: String,
  fullName: String,
  email: {type: String, unique: true},
  password: {type: String},
  picture: String,
  admin: Boolean,
  token: String,
  facebook: {
    id: Number,
    token: String,
    displayName: String,
    email: String,
    profilePicture: String,
  },
  twitter: {
    id: Number,
    token: String,
    username: String,
    displayName: String,
    profilePicture: String,
  },
});

// Generating a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.pre('save', function(next) {
  var user = this;
  // Only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next();
  }
  // Override the cleartext password with the hashed one
  user.password = user.generateHash(user.password);

  // Temp solution until twitter gives me email perms
  if (user.firstName && user.lastName) {
    user.fullName = user.firstName + ' ' + user.lastName;
  }

  // Set profile pic url to
  if (user.facebook && user.facebook.profilePicture) {
    user.picture = user.facebook.profilePicture;
  }else if (user.twitter && user.twitter.profilePicture) {
    user.picture = twitter.profilePicture;
  }else {
    user.picture = 'http://placehold.it/48x48';
  }

  next();
});

// Create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
