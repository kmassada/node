var express = require('express');
var cors = require('cors');
var morgan = require('morgan');
var passport = require('passport');
var dotenv = require('dotenv').config({silent: true});
var request = require('request');

var app = express();
var port = process.env.PORT || 3222;
var apiPrefix = process.env.APP_API_VERSION;
var uri = process.env.MONGO_URI;
var log = require('./config/log')('MAIN');

// Models
var Venue = require('./models/venue');
var User = require('./models/user');

// Configs
require('./config/parser')(app);
require('./config/database')(uri,log);
require('./config/passport')(app, passport, User);

// CORS
var corsOptions = {
  allowedHeaders: ['X-Access-Token','Content-Type'],
  exposedHeaders: ['X-Access-Token','Content-Type'],
};
app.use(cors(corsOptions));
app.use(morgan('dev'));

// Get an instance of the express Router
var router = express.Router();
// Get an instance of the auth express Router
var requireAuth = require('./config/auth');

// Catch-all
app.use(function timeLog(req, res, next) {
  log.info('Location: ', req.url);
  log.info('Data: ', req.body);
  log.info('Method: ', req.method);
  log.info('Time: ', Date.now());
  next();
});

// Define Routes
venueRoutes = require('./routes/venueRoutes')(Venue);
venueSearchRoutes = require('./routes/venueSearchRoutes')(Venue);
userRoutes = require('./routes/userRoutes')(User);
// Auth Routes
meRoutes = require('./routes/meRoutes');
authRoutes = require('./routes/authRoutes')(passport);
twitterRoutes = require('./routes/twitterRoutes')(passport);
facebookRoutes = require('./routes/facebookRoutes')(passport);

// Normal Routes
app.use('/', router);

// Routes that need auth
app.use(apiPrefix + '/auth',  [authRoutes]);
app.use(apiPrefix + '/auth/twitter',  [twitterRoutes]);
app.use(apiPrefix + '/auth/facebook',  [facebookRoutes]);
app.use(apiPrefix + '/auth/me', [requireAuth, meRoutes]);
app.use(apiPrefix + '/users', [requireAuth, userRoutes]);
app.use(apiPrefix + '/venues/search', [requireAuth, venueSearchRoutes]);
app.use(apiPrefix + '/venues', [venueRoutes]);

// Normal-routes
router.get('/', function(req, res) {
  res.json({success: true, message: 'API'});
});

// Services
require('./services/GoogleMapsClient')(request);

// Errors
require('./config/error')(app, log);
app.listen(port);
