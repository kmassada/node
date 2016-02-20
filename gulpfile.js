var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');

var jsFiles = ['app/**/*.js', '!gulpfile.js'];

gulp.task('style', function() {
  return gulp.src(jsFiles)
      .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
          verbose: true,
        }))
        .pipe(jscs())
        .pipe(jscs.reporter());
});

gulp.task('serve', ['style'], function() {
  var options = {
    script: 'app/server.js',
    delayTime: 1,
    env: {
      PORT: 3222,
    },
    watch: jsFiles,
  };

  return nodemon(options)
    .on('restart', function(ev) {
      console.log('Restarting');
    });
});
