// Grab the venue  model
var Venue = require('../models/venue');

// Create a new venue
var newVenue = new Venue({
  name: 'Patterson Park',
  location: '455 NW 453 E',
  category: 'Parks and Recs',
});

Venue.find({name: 'Patterson Park'}, function(err, venue) {
  if (err) {
    throw err;
  }
  if (venue.length === 0) {
    // Save the venue
    newVenue.save(function(err) {
      if (err) {
        console.log(err);
        throw err;
      }
      console.log('Venue created!');
    });
  }
});

// Get all the venues
Venue.find({}, function(err, venues) {
  if (err) {
    console.log(err);
    throw err;
  }
  // Object of all the venues
  console.log(venues);
});
