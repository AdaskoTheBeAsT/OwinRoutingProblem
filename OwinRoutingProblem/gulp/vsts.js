'use strict';

const gulp = require("gulp");
const del = require("del");
const glob = require("glob");

const tsjsfilter = function (file) {
  return file.replace(/.ts$/, ".js");
};

gulp.task('cleanvsjs', function () {

    return glob('./src/app/**/*.ts', function (err, files) {

        const tsjsfiles = files.map(tsjsfilter);

        tsjsfiles.forEach(function(tsjsfile) {
            try {
                del.sync(tsjsfile);
            }
            catch(err) {
            }
        });
    });

});

const tsjsmapfilter = function (file) {
  return file.replace(/.ts$/, ".js.map");
};

gulp.task('cleanvsjsMap', function () {

    return glob('./src/app/**/*.ts', function (err, files) {
        const tsjsmapfiles = files.map(tsjsmapfilter);
        tsjsmapfiles.forEach(function(tsjsmapfile) {
            try {
                del.sync(tsjsmapfile);
            }
            catch (err) {
            }
        });
    });

});

gulp.task('cleanvs', ['cleanvsjsMap', 'cleanvsjs'], function () {

});
