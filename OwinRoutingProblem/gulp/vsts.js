'use strict';

var gulp = require('gulp');
var del = require('del');
var glob = require('glob');

var tsjsfilter = function (file) {
    return file.replace(/.ts$/, '.js');
};

gulp.task('cleanvsjs', function () {

    return glob('./src/app/**/*.ts', function (err, files) {

        var tsjsfiles = files.map(tsjsfilter);

        tsjsfiles.forEach(function(tsjsfile) {
            try {
                del.sync(tsjsfile);
            }
            catch(err) {
            }
        });
    });

});

var tsjsmapfilter = function (file) {
    return file.replace(/.ts$/, '.js.map');
};

gulp.task('cleanvsjsMap', function () {

    return glob('./src/app/**/*.ts', function (err, files) {
        var tsjsmapfiles = files.map(tsjsmapfilter);
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