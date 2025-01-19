'use strict';

const path = require("path");
const gulp = require("gulp");
const conf = require("./conf");

const karma = require("karma");

const pathSrcHtml = [path.join(conf.paths.src, "/**/*.html")];

const pathSrcJs = [path.join(conf.paths.tmp, "/serve/app/index.module.js")];

function runTests (singleRun, done) {
  const reporters = ["progress"];
  const preprocessors = {};

  pathSrcHtml.forEach(function(path) {
    preprocessors[path] = ['ng-html2js'];
  });

  if (singleRun) {
    pathSrcJs.forEach(function(path) {
      preprocessors[path] = ['coverage'];
    });
    reporters.push('coverage')
  }

  const localConfig = {
    configFile: path.join(__dirname, "/../karma.conf.js"),
    singleRun: singleRun,
    autoWatch: !singleRun,
    reporters: reporters,
    preprocessors: preprocessors,
  };

  const server = new karma.Server(localConfig, function (failCount) {
    done(failCount ? new Error("Failed " + failCount + " tests.") : null);
  });
  server.start();
}

gulp.task('test', ['scripts:test'], function(done) {
  runTests(true, done);
});

gulp.task('test:auto', ['scripts:test-watch'], function(done) {
  runTests(false, done);
});
