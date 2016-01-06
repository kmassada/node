var http = require('http');

describe("Hello World Server", function() {
  describe("GET /", function() {

    it("returns status code 200", function(done) {
      http.get("http://localhost:3222", function(res) {
        expect(res.statusCode).toBe(200);
        res.resume();
        done();
      });
    });

    it("returns Hello World array", function(done) {
      http.get("http://localhost:3222?number=3", function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
          expect(chunk).toBe(JSON.stringify(["Hello World", "Hello World", "Hello World"]));
          res.resume();
          done();
        });
      });
    });

  });
});
