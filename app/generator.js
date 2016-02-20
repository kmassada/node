exports.generateHelloWorld = function(number) {
  'use strict';
  var result = [];

  for (var i = 0; i < number; i += 1) {
    result.push('Hello World');
  }

  return result;
};
