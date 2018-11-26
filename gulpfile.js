'use strict';

const gulp = require('gulp');
const debug = require('gulp-debug');
const sass = require('gulp-sass');
const cssMinify = require('gulp-cssmin');
const browserSync = require('browser-sync');
const prefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
//
var paths = {
  html: ['public_html/index.html'],
  scss: ['assets/css/styles.scss']
};

// ////////////////////////////////////////////////
// HTML
// ///////////////////////////////////////////////
gulp.task('html', function(){
  gulp.src(paths.html)
    .pipe(browserSync.reload({stream:true}));
});


// ////////////////////////////////////////////////
// Browser-Sync
// // /////////////////////////////////////////////
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: "./public_html/"
    },
    port: 8080,
    open: true,
    notify: false
  });
});

// ////////////////////////////////////////////////
// Styles
// // /////////////////////////////////////////////
gulp.task('styles', function(callback) {
  return gulp.src('assets/css/**/*.scss', {base: 'assets'})
    .pipe(sourcemaps.init())
    .pipe((sass({
      includePaths: ['node_modules/normalize-scss/fork-versions/default'],
    })))
    .pipe(prefixer())
    //.pipe(cssMinify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public_html'))
    .pipe(debug())
    .pipe(browserSync.reload({stream:true}));
});


// ////////////////////////////////////////////////
// Watcher
// // /////////////////////////////////////////////
gulp.task('watcher',function(){
  gulp.watch(paths.scss, ['styles']);
  gulp.watch(paths.html, ['html']);
});


gulp.task('default', ['watcher', 'browserSync']);