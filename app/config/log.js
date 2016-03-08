var bunyan = require('bunyan');
var bformat = require('bunyan-format');
var formatOut = bformat({ outputMode: 'short', color: true });
var log = bunyan.createLogger({
  name: 'nunode',
  streams: [
    {
      stream: formatOut,
      level: 'debug',
    },
  ],
});
log.info('hi');
log.warn({lang: 'fr'}, 'au revoir');
