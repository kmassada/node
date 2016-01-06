var generator = require('./generator');
var express   = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.get("/", function(req, res) {
  var number = req.query.number;
  var helloWorldArray = generator.generateHelloWorld(number?number:0);

  res.status(200).send(helloWorldArray);
});

var server = app.listen(3222, function () {
  var host = server.address().address;
  var port = server.address().port;
});
