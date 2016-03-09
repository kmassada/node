var express = require('express');
var GoogleMapsClientLib = require('../services/GoogleMapsClient');
var GoogleMapsClient = new GoogleMapsClientLib();

var routes = function(Venue) {
  // Get an instance of the express Router
  var venueSearchRouter = express.Router();

  venueSearchRouter.route('/geocode')
    // POST /geolocate
    .post(function(req, res, next) {
      GoogleMapsClient.geoCode(req.body, function(err, geoCode, info) {
        if (err) {
          return next(err);
        }
        if (!geoCode) {
          res.status(500);
          return res.send({error: info});
        }
        return res.json(geoCode);
      });
    });

  venueSearchRouter.route('/place')
    // POST /geolocate
      .post(function(req, res, next) {
        GoogleMapsClient.placeSearch(req.body, function(err, places, info) {
          if (err) {
            return next(err);
          }
          if (!places) {
            res.status(500);
            return res.send({error: info});
          }
          return res.json(places);
        });
      });

  return venueSearchRouter;
};

module.exports = routes;
