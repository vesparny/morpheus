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
var through = require('through2');
var moment = require('moment');
process.env.NODE_ENV = argv.env || 'development';
var configuration = require('./shared/config');

function replaceTheme(file) {
  function isRoutingFile(file) {
    return /context.js/.test(file);
  }
  if (!isRoutingFile(file)) {
    return through();
  }
  return through(function(buf, enc, next) {
    this.push(buf.toString('utf8').replace(/THEMETOBEREPLACED/g, configuration.theme));
    next();
  });
}

var config = {
  draft: './content/drafts/welcome-to-morpheus.md',
  posts: './content/posts/',
  client: './client/client.js',
  mainScss: './content/themes/' + configuration.theme + '/assets/scss/main.scss',
  scss: './content/themes/' + configuration.theme + '/assets/scss/**/*.scss',
  bundle: 'bundle.js',
  dist: './content/themes/' + configuration.theme + '/assets/dist'
};

gulp.task('clean', function(cb) {
  del([config.dist], cb);
});

gulp.task('browserify', function() {
  return browserify(config.client)
    .transform(envify)
    .transform(replaceTheme)
    .transform(reactify)
    .bundle()
    .pipe(source(config.bundle))
    .pipe(buffer())
    .pipe($.if(argv.env === 'production', $.uglify()))
    .pipe($.rev())
    .pipe($.if(argv.env === 'production', $.rename(function(path) {
      path.basename += '.min';
    })))
    .pipe(gulp.dest(config.dist))
    .pipe($.rev.manifest({
      path: 'manifest-js.json'
    }))
    .pipe(gulp.dest(config.dist));
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
    .transform(replaceTheme)
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
});


gulp.task('server', function() {
  $.nodemon({
      script: 'server.js',
      ext: 'js'
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
  runSequence('styles', 'browserify', 'replace', 'server', 'watchers', cb);
});

gulp.task('watch', ['clean'], function(cb) {
  runSequence('styles', 'watchify', 'replaceDev', 'server', 'watchers', cb);
});

gulp.task('default', function() {
  $.util.log($.util.colors.green('run gulp build || gulp watch'));
});
