var gulp = require('gulp'),
  less = require('gulp-less'),
  browserSync = require('browser-sync').create(),
  sass = require('gulp-sass'),
  concat = require('gulp-concat'),
  cssnano = require('gulp-cssnano'),
  uglify = require('gulp-uglify'),
  rename = require("gulp-rename");



// Static Server + watching scss/html files
gulp.task('serve', ['less'], function() {
  browserSync.init({
    server: "./"
  });
  gulp.watch("scss/*.scss", ['sass']);
  gulp.watch("less/*.less", ['less']);
  gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('sass', function () {
  return gulp.src('./scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
  return gulp.src('./js/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(rename('all.min.js'))
    .pipe(gulp.dest('./build/'));
});

gulp.task('styles', function() {
  return gulp.src('./css/*.css')
    .pipe(concat('all.css'))
    .pipe(cssnano())
    .pipe(rename('all.min.css'))
    .pipe(gulp.dest('./build/'));
});

gulp.task('copy', function() {
  return gulp.src('./index.html')
    .pipe(gulp.dest('./build/'));
});

gulp.task('less', function() {
  gulp.src('less/*.less')
    .pipe(less())
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream());
});
gulp.task('build', ['scripts', 'styles', 'copy']);
gulp.task('default', ['serve']);
