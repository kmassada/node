var express = require('express');
var cors = require('cors');
var morgan = require('morgan');
var dotenv = require('dotenv').config({silent: true});

var app = express();
var port = process.env.PORT || 3222;
var apiPrefix = process.env.APP_API_VERSION;
var uri = process.env.MONGO_URI;

require('./config/parser')(app);
require('./config/database')(uri);
require('./config/passport')(app);

// CORS
app.use(cors());

// Use morgan to log requests to the console
app.use(morgan('dev'));

// Get an instance of the express Router
var router = express.Router();
// Get an instance of the auth express Router
var authRouter = express.Router();
var requireAuth = require('./config/auth');

// Catch-all
app.use(function timeLog(req, res, next) {
  console.log('Location: ', req.url);
  console.log('Data: ', req.body);
  console.log('Method: ', req.method);
  console.log('Time: ', Date.now());
  next();
});

// Normal Routes
app.use('/', router);
app.use(apiPrefix + '/venues', require('./routes/venueRoutes'));

// Routes that need auth
app.use(apiPrefix + '/auth',  [require('./routes/authRoutes')]);
app.use(apiPrefix + '/auth/twitter',  [require('./routes/twitterRoutes')]);
app.use(apiPrefix + '/auth/facebook',  [require('./routes/facebookRoutes')]);
app.use(apiPrefix + '/users', [requireAuth, require('./routes/userRoutes')]);

// Normal-routes
router.get('/', function(req, res) {
  res.json({success: true, message: 'API'});
});


app.listen(port);
