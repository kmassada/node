var mongoose     = require('mongoose');

var databaseFunction = function databaseFunction(uri, log) {
  mongoose.connect(uri, function(err, res) {
    if (err) {
      log.info('ERROR connecting to: ' + uri + '. ' + err);
    } else {
      log.info('Succeeded connected to: ' + uri);
    }
  });

  var db = mongoose.connection;
  db.on('error', console.error);
  db.once('open', function() {
    log.info('Once: ' + uri);
    require('../seeds/venueSeed');
    require('../seeds/userSeed');
  });
  return db;
};

mongoose.connection.close();

module.exports = databaseFunction;
