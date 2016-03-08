var express = require('express');

var routes = function(Venue) {
  // Get an instance of the express Router
  var venueRouter = express.Router();

  venueRouter.route('/')

    // POST /venues
    .post(function(req, res) {
      // Create a new instance of the Venue model
      var newVenue = new Venue(req.body);

      // Save the venue and check for errors
      newVenue.save(function(err) {
        if (err) {
          return res.status(500).send(err);
        }
        return res.status(201).send(newVenue);
      });
    })

    // GET /venues
    .get(function(req, res) {
      var query = {};
      if (req.query.category) {
        query.category = req.query.category;
      }
      Venue.find(query,function(err, venues) {
        if (err) {
          return res.status(500).send(err);
        }
        return res.json(venues);
      });
    });

  // Middleware.
  venueRouter.use('/:venueId',function(req, res, next) {
    Venue.findById(req.params.venueId, function(err, venue) {
      if (err) {
        return res.status(500).send(err);
      }
      if (venue) {
        req.venue = venue;
        next();
      }else {

        return res.status(404).send('Object not found');
      }
    });
  });

  venueRouter.route('/:venueId')

    // GET /venues/:venueId
    .get(function(req, res) {
      res.json(req.venue);
    })

    // DELETE /venues/:venueId
    .delete(function(req, res) {
      req.venue.remove(function(err) {
        if (err) {
          return res.status(500).send(err);
        }
        return res.status(204).send('removed');
      });
    })

    // PATH /venues/:venueId
    .patch(function(req, res) {
      if (req.body._id) {
        delete req.body._id;
      }
      for (var p in req.body) {
        req.venue[p] = req.body[p];
      }
      // Save the venue
      req.venue.save(function(err) {
        if (err) {
          return res.status(500).send(err);
        }
        res.json(req.venue);
      });
    })

    // PUT /venues/:venueId)
    .put(function(req, res) {

      // Update the venues info
      req.venue.name = req.body.name;
      req.venue.location = req.body.location;
      req.venue.category = req.body.category;

      // Save the venue
      req.venue.save(function(err) {
        if (err) {
          return res.status(500).send(err);
        }
        res.json(req.venue);
      });
    });
  return venueRouter;
};

module.exports = routes;
