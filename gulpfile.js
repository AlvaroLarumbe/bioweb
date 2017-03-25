let gulp = require('gulp');
let postcss = require('gulp-postcss');
let autoprefixer = require('autoprefixer');
let cleancss = require('gulp-clean-css');
let concatcss = require('gulp-concat-css');
let browserSync = require('browser-sync').create();

let vendorCssFiles = [
  'node_modules/bootstrap/dist/css/bootstrap.min.css',
  'node_modules/font-awesome/css/font-awesome.min.css'
];

let fontFiles = [
  'node_modules/font-awesome/fonts/fontawesome-webfont.*',
  'node_modules/font-awesome/fonts/FontAwesome.otf'
];

gulp.task('vendor-css', function() {
  return gulp.src(vendorCssFiles)
    .pipe(concatcss('vendor.css', {rebaseUrls: false}))
    .pipe(gulp.dest('dist/css'))
});

gulp.task('css', ['vendor-css'], function() {
  return gulp.src([
    'dist/css/vendor.css',
    'src/css/*.css'
  ])
    .pipe(concatcss('bundle.css'))
    .pipe(postcss([ autoprefixer() ]))
    .pipe(cleancss())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream())
});

gulp.task('fonts', function() {
  return gulp.src(fontFiles)
    .pipe(gulp.dest('dist/fonts/'));
});

gulp.task('watch', function() {
    gulp.watch('src/css/*.css', ['css']);
    gulp.watch("./index.html").on('change', browserSync.reload);
});

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('default', [ 'css', 'fonts', 'serve', 'watch' ]);
