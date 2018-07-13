// Build "NGN Chassis Showroom"
'use strict'

// Dependencies ----------------------------------------------------------------
var gulp = require('gulp')
var sass = require('gulp-sass')
var del = require('del')
var path = require('path')
var fs = require('fs')

// Sass Paths ------------------------------------------------------------------

var SHOWROOM = path.resolve('./sass/**/*.s*ss')

var CHASSIS = {
  SASS: require('chassis-detailer').includePaths,
  DETAILER: require('chassis-sass').includePaths
}

var DEST = './'

// Sass ------------------------------------------------------------------------
gulp.task('sasscompile', function () {
  return gulp.src([SHOWROOM])
    .pipe(
      sass({
        // outputStyle: 'compressed',
        includePaths: [
          CHASSIS.DETAILER,
          CHASSIS.SASS,
          SHOWROOM
        ]
      })
    ).on('error', sass.logError)
    .pipe(gulp.dest(DEST + '/assets/stylesheets'))
})

// Cleanup ---------------------------------------------------------------------
gulp.task('clean', function (next) {
  fs.exists(DEST + '/stylesheets', function (exists) {
    exists && del.sync(DEST + '/assets/stylesheets')
    next()
  })
})

// Build -----------------------------------------------------------------------
gulp.task('build', ['clean', 'sasscompile'])

// Watch -----------------------------------------------------------------------
gulp.task('watch', function () {
  gulp.watch([SHOWROOM, CHASSIS.SASS, CHASSIS.DETAILER], ['clean', 'sasscompile'])
})

// Dev -------------------------------------------------------------------------
gulp.task('dev', ['build', 'watch'])
