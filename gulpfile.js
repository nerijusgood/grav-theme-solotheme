var gulp = require('gulp');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var cssnext = require('postcss-cssnext');
var cssnested = require('postcss-nested');
var cssimport = require('postcss-import');
var csssimplevars = require('postcss-simple-vars');
var cssnano = require('cssnano');
var del = require('del');


var paths = {
	js: 'src/js/**/*.js',
	img: 'src/img/**/*.{ico, jpg, jpeg, png, svg, gif}',
	css: 'src/css/**/*.{css,scss,sass}'
};

// Browser-sync task, only cares about compiled CSS
gulp.task('browser-sync', function() {
	browserSync({
		files: "css/*.css",
		proxy: "http://localhost:8888/Personal/solofront/",
		port: '8000'
	});
});

// Clean tasks
gulp.task('clean', ['clean-css', 'clean-js', 'clean-img'], function() {
	return del(['css', 'js', 'img']);
});
gulp.task('clean-css', function() {
	return del(['css']);
});
gulp.task('clean-js', function() {
	return del(['js']);
});
gulp.task('clean-img', function() {
	return del(['img']);
});

// Build CSS-DEV
gulp.task('css-dev', function () {
    var processors = [
        cssimport,
        csssimplevars,
        cssnext(),
        cssnested
    ];
    return gulp.src('./src/css/main.css')
        .pipe(plumber())
        .pipe(sourcemaps.init())
            .pipe(postcss(processors))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./css'))
        .pipe(reload({stream:true}));
});

// Build CSS
gulp.task('css', function () {
	var processors = [
		cssimport,
		cssnext(),
		csssimplevars,
		cssnested,
		cssnano
	];
	return gulp.src('./src/css/main.css')
		.pipe(plumber())
		.pipe(sourcemaps.init())
			.pipe(postcss(processors))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./css'))
		.pipe(reload({stream:true}));
});

// Build JS-DEV
gulp.task('js-dev', function() {
    return browserify('./src/js/main.js')
        .bundle()
        .pipe(source('main.js'))
		.pipe(buffer())
	    .pipe(sourcemaps.init({loadMaps: true}))
	        .on('error', gutil.log)
	    .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./js/'));
});

// Build JS
gulp.task('js', function() {
    return browserify('./src/js/main.js')
        .bundle()
        .pipe(source('main.js'))
		.pipe(buffer())
	    .pipe(sourcemaps.init({loadMaps: true}))
			.pipe(uglify())
	        .on('error', gutil.log)
	    .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./js/'));
});

// Build Img
gulp.task('img', function() {
	return gulp.src(paths.img)
		.pipe(plumber())
		.pipe(imagemin({optimizationLevel: 5}))
		.pipe(gulp.dest('img'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
	gulp.watch(paths.css, ['css-dev']);
	gulp.watch(paths.js, ['js-dev']);
	gulp.watch(paths.img, ['img']);
});

// Default task to be run with `gulp`.
gulp.task('default', ['watch', 'browser-sync'], function () {
	gulp.watch('js/*.js', ['js-dev']).on('change', reload);
	gulp.watch('img/*.jpg', ['img']).on('change', reload);
	gulp.watch('templates/**/*.twig').on('change', reload);
});

gulp.task('build', ['clean'], function() {
    runSequence(['js', 'css', 'img']);
});
