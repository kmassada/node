var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var bcrypt       = require('bcrypt-nodejs');

var userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  admin: Boolean,
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
  next();
});

// Create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);