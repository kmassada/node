var express = require('express');

var app = express();
var port = process.env.PORT || 3222;
var apiPrefix = process.env.APP_API_VERSION || '/api/v1';
var uri = process.env.MONGODB_URI || 'mongodb://localhost/nunodeserver';

require('./config/parser')(app);
require('./config/database')(uri);

// Get an instance of the express Router
var router = express.Router();

// Catch-all
app.use(function timeLog(req, res, next) {
  console.log('Location: ', req.url);
  console.log('Method: ', req.method);
  console.log('Time: ', Date.now());
  next();
});

app.use('/', router);

app.use(apiPrefix + '/venues', require('./routes/venueRoutes'));

// Normal-routes
router.get('/', function(req, res) {
  res.json({message: 'API'});
});


app.listen(port);
