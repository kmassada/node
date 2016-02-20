var generator = require('./generator');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json()); // For parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // For parsing application/x-www-form-urlencoded


app.get('/', function getHome(req, res) {
  'use strict';
  var number = req.query.number;
  if (!number) {
    number = 0;
  }
  var helloWorldArray = generator.generateHelloWorld(number);

  res.status(200).send(helloWorldArray);
});

app.listen(3222);
