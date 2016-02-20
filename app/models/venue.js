var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var venueSchema = new Schema({
  name: {type: String, required: true},
  location: {type: String, required: true},
  category: String,
});

// Create the model for venues and expose it to our app
module.exports = mongoose.model('Venue', venueSchema);
