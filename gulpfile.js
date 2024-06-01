const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const htmlmin = require('gulp-htmlmin');

// Task for compiling SASS to CSS
gulp.task('styles', () => gulp.src('src/scss/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('dist/css')));

// Task for copying and minifying HTML files
gulp.task('html', () => gulp.src('src/*.html')
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('dist')));

// Task for copying other assets (images, JS, etc.)
gulp.task('assets', () => gulp.src('src/assets/**/*')
  .pipe(gulp.dest('dist/assets')));

// Task for copying _redirects file
gulp.task('redirects', () => gulp.src('src/_redirects')
  .pipe(gulp.dest('dist')));

// Copy _headers file to dist directory
gulp.task('headers', function() {
  return gulp.src('_headers')
    .pipe(gulp.dest('dist'));
});

// Build task
gulp.task('build', gulp.series('styles', 'html', 'assets', 'redirects', 'headers'));
