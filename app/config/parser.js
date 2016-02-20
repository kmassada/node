var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

// Parsers
var parserFunction = function parserFunction(app) {
  // For parsing application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({extended: true}));
  // For parsing application/json
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(session({
    secret: 'library',
    resave: true,
    saveUninitialized: true,
  }));
};
module.exports = parserFunction;
