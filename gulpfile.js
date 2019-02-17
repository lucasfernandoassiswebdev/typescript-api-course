var gulp = require('gulp');
var clean = require('gulp-clean');
var ts = require('gulp-typescript');

var tsProject = ts.createProject('tsconfig.json');

gulp.task('compile', () => tsProject.src().pipe(tsProject()).js.pipe(gulp.dest('dist')));

gulp.task('clean', () => gulp.src('dist').pipe(clean()));

gulp.task('copy-opts', () => gulp.src('tests/unit/config/mocha.opts')
    .pipe(gulp.dest('dist/tests/unit/config'))
    .pipe(gulp.dest('dist/tests/integration/config')));

gulp.task('default', gulp.series('clean', 'compile', 'copy-opts'));