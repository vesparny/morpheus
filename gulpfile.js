'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var reactify = require('reactify');
var del = require('del');
var watchify = require('watchify');
var runSequence = require('run-sequence');
var config = {
  client: './client.js',
  mainScss: './content/themes/blablabla/assets/scss/main.scss',
  scss: './content/themes/blablabla/assets/scss/**/*.scss',
  bundle: 'bundle.js',
  dist: './content/themes/blablabla/assets/dist'
};

gulp.task('clean', function(cb) {
  del([config.dist], cb);
});

gulp.task('browserify', function() {
  browserify(config.client)
    .transform(reactify)
    .bundle()
    .pipe(source(config.bundle))
    .pipe(buffer())
    //.pipe($.uglify())
    .pipe(gulp.dest(config.dist));
});

gulp.task('watchify', function() {
  var bundler = watchify(browserify(config.client, watchify.args));

  function rebundle() {
    return bundler
      .bundle()
      .on('error', $.notify.onError())
      .pipe(source(config.bundle))
      .pipe(buffer())
      //.pipe($.uglify())
      .pipe(gulp.dest(config.dist));
  }

  bundler.transform(reactify)
    .on('update', rebundle);
  return rebundle();
});

gulp.task('styles', function() {
  return gulp.src(config.mainScss)
    .pipe($.changed(config.dist))
    .pipe($.rubySass())
    .on('error', function(err) {
      console.log(err.message);
    })
    //.pipe($.csso())
    .pipe(gulp.dest(config.dist));
});

gulp.task('watchers', function() {
  gulp.watch(config.scss, ['styles']);
});


gulp.task('watch', ['clean'], function(cb) {
  runSequence('styles', 'watchify', 'server', 'watchers', cb);
});

gulp.task('server', function() {
  $.nodemon({
      script: 'server.js',
      ext: 'js'
    })
    .on('restart', function() {
      console.log('restarted!');
    });
});

gulp.task('default', function() {
  gulp.start('watch');
});
