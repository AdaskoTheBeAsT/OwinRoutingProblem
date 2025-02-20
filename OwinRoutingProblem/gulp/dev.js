﻿'use strict';

const path = require("path");
const gulp = require("gulp");
const conf = require("./conf");

const $ = require("gulp-load-plugins")({
  pattern: ["gulp-*", "main-bower-files", "uglify-save-license", "del"],
});

gulp.task('htmlDev', ['inject', 'partials'], function () {
    const partialsInjectFile = gulp.src(
      path.join(conf.paths.tmp, "/partials/templateCacheHtml.js"),
      { read: false }
    );
    const partialsInjectOptions = {
      starttag: "<!-- inject:partials -->",
      ignorePath: path.join(conf.paths.tmp, "/partials"),
      addRootSlash: false,
    };

    const htmlFilter = $.filter("*.html", { restore: true, dot: true });
    const jsFilter = $.filter("**/*.js", { restore: true, dot: true });
    const cssFilter = $.filter("**/*.css", { restore: true, dot: true });

    return gulp.src(path.join(conf.paths.tmp, '/serve/*.html'))
      .pipe($.inject(partialsInjectFile, partialsInjectOptions))
      .pipe($.useref())
      .pipe(jsFilter)
      .pipe($.sourcemaps.init())
      //.pipe($.uglify({ preserveComments: $.uglifySaveLicense })).on('error', conf.errorHandler('Uglify'))
      .pipe($.rev())
      .pipe($.sourcemaps.write('maps'))
      .pipe(jsFilter.restore)
      .pipe(cssFilter)
      // .pipe($.sourcemaps.init())
      .pipe($.replace('../../bower_components/bootstrap-sass/assets/fonts/bootstrap/', '../fonts/'))
      .pipe($.replace('../../bower_components/font-awesome/fonts/', '../fonts/'))
      .pipe($.replace('../../bower_components/world-flags-sprite/images/', '../images/'))
      //.pipe($.cssnano())
      .pipe($.rev())
      // .pipe($.sourcemaps.write('maps'))
      .pipe(cssFilter.restore)
      .pipe($.revReplace())
      .pipe(htmlFilter)
      /*.pipe($.htmlmin({
          removeEmptyAttributes: true,
          removeAttributeQuotes: true,
          collapseBooleanAttributes: true,
          collapseWhitespace: true
      }))*/
      .pipe(htmlFilter.restore)
      .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
      .pipe($.size({ title: path.join(conf.paths.dist, '/'), showFiles: true }));
});

gulp.task('dev', ['htmlDev', 'images', 'fonts', 'other']);
