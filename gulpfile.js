'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var argv = require('minimist')(process.argv.slice(2));
var moment = require('moment');
var webpack = require('webpack');

process.env.NODE_ENV = argv.env || 'development';
var configuration = require('./shared/config');

var config = {
  draft: './content/drafts/welcome-to-morpheus.md',
  posts: './content/posts/',
  client: './client/client.js',
  mainScss: './content/themes/' + configuration.theme + '/assets/scss/main.scss',
  scss: './content/themes/' + configuration.theme + '/assets/scss/**/*.scss',
  bundle: 'bundle.js',
  dist: './content/themes/' + configuration.theme + '/assets/dist',
  clientFiles: ['./client/**', './shared/**', './content/**']
};

gulp.task('clean', function(cb) {
  del([config.dist], cb);
});

gulp.task('replace', function() {
  var manifestCss = require(config.dist + '/manifest-css.json');
  var manifestJs = require(config.dist + '/manifest-js.json');
  return gulp.src('./content/themes/' + configuration.theme + '/Html.js')
    .pipe($.replace(/bundle.*\.js/, manifestJs['bundle.js']))
    .pipe($.replace(/main.*\.css/, manifestCss['main.css']))
    .pipe(gulp.dest('./content/themes/' + configuration.theme));
});

gulp.task('replaceDev', function() {
  return gulp.src('./content/themes/' + configuration.theme + '/Html.js')
    .pipe($.replace(/bundle.*\.js/, 'bundle.js'))
    .pipe($.replace(/main.*\.css/, 'main.css'))
    .pipe(gulp.dest('./content/themes/' + configuration.theme));
});

gulp.task('styles', function() {
  return gulp.src(config.mainScss)
    .pipe($.changed(config.dist))
    .pipe($.rubySass({
      sourceMap: false
    }))
    .on('error', function(err) {
      $.util.log($.util.colors.red(err.message));
    })
    .pipe($.if(argv.env === 'production', $.cssmin()))
    .pipe($.if(argv.env === 'production', $.rev()))
    .pipe($.if(argv.env === 'production', $.rename(function(path) {
      path.basename += '.min';
    })))
    .pipe(gulp.dest(config.dist))
    .pipe($.if(argv.env === 'production', $.rev.manifest({
      path: 'manifest-css.json'
    })))
    .pipe($.if(argv.env === 'production', gulp.dest(config.dist)));
});

gulp.task('watchers', function() {
  gulp.watch(config.scss, ['styles']);
  gulp.watch(config.clientFiles, ['webpack']);
});

var task =   webpack(require('./webpack.config.' + process.env.NODE_ENV));
gulp.task('webpack', function(cb) {
  task.run(function(err, stats) {
    if (err) {
      throw new $.util.PluginError('webpack', err);
    }
    $.util.log('[webpack]', stats.toString({
      colors: true,
      hash: false,
      timings: false,
      assets: true,
      chunks: false,
      chunkModules: false,
      modules: false,
      children: true
    }));
    cb();
  });
});

gulp.task('server', function() {
  $.nodemon({
      script: 'server.js',
      ext: 'js',
      ignore: ['client/*', 'content/*'],
    })
    .on('restart', function() {
      $.util.log($.util.colors.red('restarted'));
    });
});

gulp.task('test', function() {
  return gulp.src(['test/*.js'], {
      read: false
    })
    .pipe($.mocha({
      reporter: 'spec'
    }))
    .on('error', $.util.log);
});

gulp.task('install', function() {
  gulp.src(config.draft)
    .pipe($.rename({
      prefix: moment().format('YYYY-MM-DD-HHmmss-')
    }))
    .pipe(gulp.dest(config.posts));
  $.util.log($.util.colors.green('you are ready to go, run gulp watch'));
});

gulp.task('build', ['clean'], function(cb) {
  runSequence('styles', 'webpack', 'replace', 'server', cb);
});

gulp.task('watch', ['clean'], function(cb) {
  runSequence('styles', 'webpack', 'replaceDev', 'server', 'watchers', cb);
});

gulp.task('default', function() {
  $.util.log($.util.colors.green('run gulp build || gulp watch'));
});
