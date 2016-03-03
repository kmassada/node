var express = require('express');
// Get an instance of the express Router
var venueRouter = express.Router();
var Venue = require('../models/venue');

venueRouter.route('/')

    // POST /venues
    .post(function(req, res) {
      // Create a new instance of the Venue model
      var newVenue = new Venue();

      // Set the venue's local credentials
      newVenue.name = req.body.name;
      newVenue.location = req.body.location;
      newVenue.category = req.body.category;

      // Save the venue and check for errors
      newVenue.save(function(err) {
        if (err) {
          return res.json({success: false, message: err});
        }
        return res.json({
          success: true,
          message: 'Object created!',
        });
      });
    })

    // GET /venues
    .get(function(req, res) {
      Venue.find(function(err, venues) {
        if (err) {
          return res.json({success: false, message: err});
        }
        return res.json(venues);
      });
    });

venueRouter.route('/:venueId')

    // GET /venues/:venueId
    .get(function(req, res) {
      Venue.findById(req.params.venueId, function(err, venue) {
        if (err) {
          return res.json({success: false, message: err});
        }
        if (!venue) {
          return res.json({
            success: false,
            message: 'Object not found',
          });
        }
        return res.json(venue);
      });
    })

    // DELETE /venues/:venueId
    .delete(function(req, res) {
      Venue.findById(req.params.venueId, function(err, venue) {
        if (err) {
          return res.json({success: false, message: err});
        }
        if (!venue) {
          return res.json({
            success: false,
            message: 'Object not found',
          });
        }

        // Delete item
        venue.remove(function(err) {
          if (err) {
            return res.json({success: false, message: err});
          }
          return res.json({
            success: true,
            message: 'Object deleted!',
          });
        });
      });
    })

    // PUT /venues/:venueId)
    .put(function(req, res) {
      // Use our venue model to find the venue we want
      Venue.findById(req.params.venueId, function(err, venue) {
        if (err) {
          return res.json({success: false, message: err});
        }
        if (!venue) {
          return res.json({
            success: false,
            message: 'Object not found',
          });
        }
        // Update the venues info
        venue.name = req.body.name ?  req.body.name :  venue.name;
        venue.location = req.body.location ?  req.body.location :  venue.location;
        venue.category = req.body.category ?  req.body.category :  venue.category;

        console.log(venue);

        // Save the venue
        venue.save(function(err) {
          if (err) {
            return res.json({success: false, message: err});
          }
          return res.json({
            success: true,
            message: 'Object updated!',
          });
        });
      });
    });

module.exports = venueRouter;
