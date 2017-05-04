var gulp = require('gulp');
var webserver = require('gulp-webserver');

var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var runSequence = require('run-sequence');
var gulp = require('gulp');
var inlinesource = require('gulp-inline-source');


//----------------------------------------------------------------------------------//
var css = 'src/css/';
var scss = 'src/scss/';

gulp.task('inlinesource', function () {
	return gulp.src('./src/*.html')
		.pipe(inlinesource())
		.pipe(gulp.dest('./dist'));
});

//DEV Webserver
gulp.task('serve', [], function () {
	gulp.src('src')
		.pipe(webserver({
			port: '9090',
			livereload: true,
			open: true
		}));
});

//DIST Webserver
gulp.task('serveDist', function () {
	gulp.src('dist')
		.pipe(webserver({
			port: '9091',
			livereload: true,
			open: true
		}));
});

gulp.task('sass', ['inlinesource'], function () {
	return gulp.src(scss + '**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(css));
});

gulp.task('sass:watch', ['inlinesource'], function () {
	gulp.watch(scss + '**/*.scss', ['sass']);
});

//Minify html
gulp.task('minifyHTML', ['inlinesource'], function () {
	return gulp.src('src/**/*.html')
		.pipe(inlinesource())
		.pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
		.pipe(gulp.dest('dist'));
});

//Build Dist
gulp.task('buildDist', function () {
	runSequence(
		'sass',
		'minifyHTML'
	);
});