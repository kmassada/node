var expect = require('chai').expect;
var http = require('superagent');

describe('Hello World Server', function() {
  describe('GET /', function() {

    it('returns status code 200', function(done) {
      http.get('http://localhost:3222').end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it('returns Hello World array', function(done) {
      http.get('http://localhost:3222?number=3').end(function(err, res) {
        expect(res.body).to.eql(['Hello World', 'Hello World', 'Hello World']);
        done();
      });
    });

  });
});
