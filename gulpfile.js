var gulp = require('gulp');
var livereload = require('gulp-livereload')
var uglify = require('gulp-uglifyjs');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');


gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('imagemin', function () {
    return gulp.src('./themes/clac_subtheme/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./themes/clac_subtheme/images'));
});


gulp.task('sass', function () {
  gulp.src('./themes/clac_subtheme/scss/**/*.scss')
    .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./themes/clac_subtheme/css'));
});


gulp.task('uglify', function() {
  gulp.src('./themes/clac_subtheme/lib/*.js')
    .pipe(uglify('main.js'))
    .pipe(gulp.dest('./themes/clac_subtheme/js'))
});

gulp.task('watch', function(){
    livereload.listen();

    gulp.watch('./themes/clac_subtheme/scss/**/*.scss', ['sass']);
    gulp.watch('./themes/clac_subtheme/lib/*.js', ['uglify']);
    gulp.watch(['./themes/clac_subtheme/css/style.css', './themes/clac_subtheme/templates/**/*.twig', './themes/clac_subtheme/js/*.js'], function (files){
        livereload.changed(files)
    });
});