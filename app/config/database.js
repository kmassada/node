var mongoose     = require('mongoose');

var databaseFunction = function databaseFunction(uri) {
  mongoose.connect(uri, function(err, res) {
    if (err) {
      console.log ('ERROR connecting to: ' + uri + '. ' + err);
    } else {
      console.log ('Succeeded connected to: ' + uri);
    }
  });

  var db = mongoose.connection;
  db.on('error', console.error);
  db.once('open', function() {
    console.log ('Once: ' + uri);
    require('../seeds/venueSeed');
    require('../seeds/userSeed');
  });
  return db;
};

mongoose.connection.close();

module.exports = databaseFunction;
