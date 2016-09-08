import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import bs from 'browser-sync';

const dirs = {
  src: 'src',
  dest: 'dist'
};

const paths = {
  src: `${dirs.src}/scss/app.scss`,
  dest: `${dirs.dest}/styles/`
};

gulp.task('styles', function() {
  gulp.src('./src/scss/app.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(paths.dest))
    .pipe(bs.stream());
  bs.reload()
});

gulp.task('dev', ['styles'], function() {
  bs.init({
    server: {
      baseDir: "./dist"
    }
  });
  gulp.watch("src/scss/*.scss", ['styles']);
  gulp.watch("./dist/*.html", function() {
    bs.reload();
  });
})
