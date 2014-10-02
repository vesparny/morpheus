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
  appJsx: './app/components/app.jsx',
  scss: './app/assets/scss/main.scss',
  bundle: 'bundle.js',
  distJs: './public/js',
  distCss: './public/css'
};

gulp.task('clean', function(cb) {
  del([config.distJs, config.distCss], cb);
});

gulp.task('browserify', function() {
  browserify(config.appJsx)
    .transform(reactify)
    .bundle()
    .pipe(source(config.bundle))
    .pipe(buffer())
    //.pipe($.uglify())
    .pipe(gulp.dest(config.distJs));
});

gulp.task('watchify', function() {
  var bundler = watchify(browserify(config.appJsx, watchify.args));

  function rebundle() {
    return bundler
      .bundle()
      .on('error', $.notify.onError())
      .pipe(source(config.bundle))
      .pipe(gulp.dest(config.distJs));
  }

  bundler.transform(reactify)
    .on('update', rebundle);
  return rebundle();
});

gulp.task('styles', function() {
  return gulp.src(config.scss)
    .pipe($.changed(config.distCss))
    .pipe($.sass({
      errLogToConsole: true
    }))
    //.pipe($.csso())
    .pipe(gulp.dest(config.distCss));
});

gulp.task('watchers', function() {
  gulp.watch(config.scss, ['styles']);
});


gulp.task('watch', ['clean'], function(cb) {
  runSequence('styles', 'watchify', "server", 'watchers', cb);
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
  gulp.start("watch");
});
