"use strict";

const path = require("path");
const gulp = require("gulp");
const conf = require("./conf");

const $ = require("gulp-load-plugins")({
  pattern: ["gulp-*", "main-bower-files", "uglify-save-license", "del"],
});

gulp.task("partials", function () {
  return gulp
    .src([
      path.join(conf.paths.src, "/app/**/*.html"),
      path.join(conf.paths.tmp, "/serve/app/**/*.html"),
    ])
    .pipe(
      $.htmlmin({
        removeEmptyAttributes: true,
        removeAttributeQuotes: true,
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
      })
    )
    .pipe(
      $.angularTemplatecache("templateCacheHtml.js", {
        module: "owinRoutingProblem",
        root: "app",
      })
    )
    .pipe(gulp.dest(conf.paths.tmp + "/partials/"));
});

gulp.task("html", ["inject", "partials"], function () {
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

  return (
    gulp
      .src(path.join(conf.paths.tmp, "/serve/*.html"))
      .pipe($.inject(partialsInjectFile, partialsInjectOptions))
      .pipe($.useref())
      .pipe(jsFilter)
      .pipe($.sourcemaps.init())
      .pipe($.uglify({ preserveComments: $.uglifySaveLicense }))
      .on("error", conf.errorHandler("Uglify"))
      .pipe($.rev())
      .pipe($.sourcemaps.write("maps"))
      .pipe(jsFilter.restore)
      .pipe(cssFilter)
      // .pipe($.sourcemaps.init())
      .pipe(
        $.replace(
          "../../bower_components/bootstrap-sass/assets/fonts/bootstrap/",
          "../fonts/"
        )
      )
      .pipe(
        $.replace("../../bower_components/font-awesome/fonts/", "../fonts/")
      )
      .pipe($.cssnano())
      .pipe($.rev())
      // .pipe($.sourcemaps.write('maps'))
      .pipe(cssFilter.restore)
      .pipe($.revReplace())
      .pipe(htmlFilter)
      .pipe(
        $.htmlmin({
          removeEmptyAttributes: true,
          removeAttributeQuotes: true,
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
        })
      )
      .pipe(htmlFilter.restore)
      .pipe(gulp.dest(path.join(conf.paths.dist, "/")))
      .pipe($.size({ title: path.join(conf.paths.dist, "/"), showFiles: true }))
  );
});

gulp.task("images", function () {
  return gulp
    .src(path.join(conf.paths.src, "/assets/images/**/*"))
    .pipe(
      $.imagemin({
        optimizationLevel: 3,
        progressive: true,
        interlaced: true,
      })
    )
    .pipe(gulp.dest(path.join(conf.paths.dist, "/assets/images/")));
});

// Only applies for fonts from bower dependencies
// Custom fonts are handled by the "other" task
gulp.task("fonts", function () {
  return gulp
    .src($.mainBowerFiles())
    .pipe($.filter("**/*.{eot,otf,svg,ttf,woff,woff2}"))
    .pipe($.flatten())
    .pipe(gulp.dest(path.join(conf.paths.dist, "/fonts/")));
});

gulp.task("other", function () {
  const fileFilter = $.filter(function (file) {
    return file.stat.isFile();
  });

  return gulp
    .src([
      path.join(conf.paths.src, "/**/*"),
      path.join(
        "!" + conf.paths.src,
        "/**/*.{html,css,js,scss,ts,jpg,png,gif,svg}"
      ),
    ])
    .pipe(fileFilter)
    .pipe(gulp.dest(path.join(conf.paths.dist, "/")));
});

gulp.task("clean", function () {
  return $.del([
    path.join(conf.paths.dist, "/"),
    path.join(conf.paths.tmp, "/partials"),
    path.join(conf.paths.tmp, "/serve"),
  ]);
});

gulp.task("build", ["cleanvs", "html", "images", "fonts", "other"]);
