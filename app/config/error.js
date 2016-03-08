var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

// Parsers
var errorHandlerFunction = function errorHandlerFunction(app) {
  // Error handler
  function errorHandler(err, req, res, next) {
      if (res.headersSent) {
        return next(err);
      }
      res.status(500).send({ error: err });
    }
  app.use(errorHandler);

};
module.exports = errorHandlerFunction;
