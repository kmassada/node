var bunyan = require('bunyan');
var bformat = require('bunyan-format');
var formatOut = bformat({ outputMode: 'short', color: true });
var logger = function logger(name) {
  var log = bunyan.createLogger({
    name: name,
    streams: [
      {
        stream: formatOut,
        level: 'debug',
      },
    ],
  });
  return log;
};
module.exports = logger;
