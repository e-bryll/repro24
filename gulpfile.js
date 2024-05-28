const gulp = require('gulp');
const sass = require('gulp-sass');

// Завдання для компіляції SASS в CSS
gulp.task('styles', function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});
