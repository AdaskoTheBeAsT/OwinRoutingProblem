'use strict';

const path = require("path");
const gulp = require("gulp");
const conf = require("./conf");

const $ = require("gulp-load-plugins")();

const wiredep = require("wiredep").stream;
const _ = require("lodash");

const browserSync = require("browser-sync");

gulp.task('inject-reload', ['inject'], function() {
  browserSync.reload();
});

gulp.task('inject', ['scripts', 'styles'], function () {
  const injectStyles = gulp.src(
    [
      path.join(conf.paths.tmp, "/serve/app/**/*.css"),
      path.join("!" + conf.paths.tmp, "/serve/app/vendor.css"),
    ],
    { read: false }
  );

  const injectScripts = gulp.src(
    [path.join(conf.paths.tmp, "/serve/app/**/*.module.js")],
    { read: false }
  );

  const injectOptions = {
    ignorePath: [conf.paths.src, path.join(conf.paths.tmp, "/serve")],
    addRootSlash: false,
  };

  return gulp.src(path.join(conf.paths.src, '/*.html'))
    .pipe($.inject(injectStyles, injectOptions))
    .pipe($.inject(injectScripts, injectOptions))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
});
