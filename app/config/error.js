var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

// Parsers
var errorHandlerFunction = function errorHandlerFunction(app,log) {
  // Error handler
  function errorHandler(err, req, res, next) {
      if (res.headersSent) {
        return next(err);
      }
      log.info(err.stack);
      res.status(500).send(err);
    }
  app.use(errorHandler);

};
module.exports = errorHandlerFunction;
