'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var reactify = require('reactify');
var envify = require('envify');
var del = require('del');
var watchify = require('watchify');
var runSequence = require('run-sequence');
var argv = require('minimist')(process.argv.slice(2));

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
  return browserify(config.client)
    .transform(envify)
    .transform(reactify)
    .bundle()
    .pipe(source(config.bundle))
    .pipe(buffer())
    .pipe($.if(argv.env === 'production', $.uglify()))
    .pipe($.rev())
    .pipe($.if(argv.env === 'production', $.rename(function (path) {
      path.basename += '.min';
    })))
    .pipe(gulp.dest(config.dist))
    .pipe($.rev.manifest({path: 'manifest-js.json'}))
    .pipe(gulp.dest(config.dist));
});

gulp.task('replace', function() {
  var manifestCss = require(config.dist +'/manifest-css.json');
  var manifestJs = require(config.dist +'/manifest-js.json');
  return gulp.src('./content/themes/blablabla/Html.js')
  .pipe($.replace(/bundle.*\.js/, manifestJs['bundle.js']))
  .pipe($.replace(/main.*\.css/, manifestCss['main.css']))
  .pipe(gulp.dest('./content/themes/blablabla'));
});

gulp.task('replaceDev', function() {
  return gulp.src('./content/themes/blablabla/Html.js')
  .pipe($.replace(/bundle.*\.js/, 'bundle.js'))
  .pipe($.replace(/main.*\.css/, 'main.css'))
  .pipe(gulp.dest('./content/themes/blablabla'));
});

gulp.task('watchify', function() {
  var bundler = watchify(browserify(config.client, watchify.args));

  function rebundle() {
    return bundler
      .bundle()
      .on('error', $.notify.onError())
      .pipe(source(config.bundle))
      .pipe(buffer())
      .pipe(gulp.dest(config.dist));
  }

  bundler.transform(envify)
  .transform(reactify)
    .on('update', rebundle);
  return rebundle();
});

gulp.task('styles', function() {
  return gulp.src(config.mainScss)
    .pipe($.changed(config.dist))
    .pipe($.rubySass({
      sourceMap: false
    }))
    .on('error', function(err) {
      console.log(err.message);
    })
    .pipe($.if(argv.env === 'production' && '*.css', $.cssmin()))
    .pipe($.if(argv.env === 'production' && '*.css', $.rev()))
    .pipe($.if(argv.env === 'production' && '*.css', $.rename(function (path) {
      path.basename += '.min';
    })))
    .pipe(gulp.dest(config.dist))
    .pipe($.if(argv.env === 'production' && '*.css', $.rev.manifest({path: 'manifest-css.json'})))
    .pipe($.if(argv.env === 'production' && '*.css', gulp.dest(config.dist)));
});

gulp.task('watchers', function() {
  gulp.watch(config.scss, ['styles']);
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

gulp.task('build', ['clean'], function(cb) {
  process.env.NODE_ENV = argv.env || 'development';
  runSequence('styles', 'browserify','replace', 'server', 'watchers', cb);
});

gulp.task('watch', ['clean'], function(cb) {
  process.env.NODE_ENV = argv.env || 'development';
  runSequence('styles', 'watchify', 'replaceDev', 'server', 'watchers', cb);
});

gulp.task('default', function() {
  console.log('run gulp build || gulp watch');
});
