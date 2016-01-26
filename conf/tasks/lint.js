/*global require*/
(function lintTask() {
  'use strict';

  var gulp = require('gulp')
    , jshint = require('gulp-jshint')
    , eslint = require('gulp-eslint')
    , jscs = require('gulp-jscs')
    , stylish = require('jshint-stylish')
    , paths = require('../paths');

  gulp.task('lint', function onLint() {

    return gulp.src(paths.files)
      .pipe(jshint())
      .pipe(jshint.reporter(stylish))
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError())
      .pipe(jscs())
      .pipe(jscs.reporter())
      .pipe(jscs.reporter('fail'));
  });
}());
