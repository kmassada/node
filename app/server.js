var express = require('express');
var cors = require('cors');
var morgan = require('morgan');

var app = express();
var port = process.env.PORT || 3222;
var apiPrefix = process.env.APP_API_VERSION || '/api/v1';
var uri = process.env.MONGOLAB_URI || 'mongodb://localhost/nunodeserver';

require('./config/parser')(app);
require('./config/database')(uri);

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
app.use(apiPrefix + '/users', [requireAuth, require('./routes/userRoutes')]);

// Normal-routes
router.get('/', function(req, res) {
  res.json({success: true, message: 'API'});
});


app.listen(port);
