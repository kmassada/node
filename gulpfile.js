var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');

var jsFiles = ['app/**/*.js', '!gulpfile.js'];

gulp.task('jshint', function() {
  return gulp.src(jsFiles)
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish', {
        verbose: true,
      }));
});

gulp.task('jscs', function() {
  return gulp.src('app/server.js')
  .pipe(jscs())
  .pipe(jscs.reporter());
});
gulp.task('js-watch', ['jscs', 'jshint'], function(done) {
  done();
});

gulp.task('serve', function() {
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


gulp.watch(jsFiles, ['js-watch']);

gulp.task('default', ['serve']);
