var log = require('../config/log')('GoogleMapsClient');
// Constructor
var GoogleMapsClient = function GoogleMapsClient(request) {
  this.request = request;
  this.apiKey = process.env.GOOGLE_MAPS_API;
};
GoogleMapsClient.prototype.placeSearch = function(queryString, done) {
  // Qs: {location: '-33.8670,151.1957',
  // radius: 500,
  // types: 'food',
  // name: 'cruise',}
  log.info(queryString);
  if (queryString) {queryString.key = apiKey;}
  request({
      method: 'GET',
      url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
      qs: queryString,
      json: true,
    }, function(err, httpResponse, body) {
      if (err) {
        return done(err);
      }
      log.warn(body.status);
      log.warn(body.error_message);
      if (body.status == 'ZERO_RESULTS' || !body.results) {
        return done(null, false, 'Not found.');
      }
      if (body.status == 'REQUEST_DENIED') {
        return done(null, false, 'Not authorized to use this API.');
      }
      return done(null, body.results);
    });
};
GoogleMapsClient.prototype.geoCode = function(queryString, done) {
  // {address: '500 president street'},
  if (queryString) {queryString.key = apiKey;}
  log.info(queryString);
  request({
      method: 'GET',
      url: 'https://maps.googleapis.com/maps/api/geocode/json',
      qs: queryString,
      json: true,
    }, function(err, httpResponse, body) {
      if (err) {
        return done(err);
      }
      log.warn(body.status);
      log.warn(body.error_message);
      if (body.status == 'ZERO_RESULTS' || !body.results) {
        return done(null, false, 'Not found.');
      }
      if (body.status == 'REQUEST_DENIED') {
        return done(null, false, 'Not authorized to use this API.');
      }
      return done(null, body);
    });
};
module.exports = GoogleMapsClient;
