var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var cssnext = require('postcss-cssnext');
var cssnested = require('postcss-nested');
var cssimport = require('postcss-import');
var csssimplevars = require('postcss-simple-vars');
var cssnano = require('cssnano');


var paths = {
	js: 'src/js/**.*.js',
	img: 'src/img/**/*.{ico, jpg, jpeg, png, svg, gif}',
	css: 'src/css/**/*.{css,scss,sass}'
};

// Browser-sync task, only cares about compiled CSS
gulp.task('browser-sync', function() {
	browserSync({
		files: "css/*.css",
		proxy: "localhost:8000",
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

gulp.task('css', function () {
});

// Build CSS
gulp.task('css', function () {
	var processors = [
		cssnested,
		cssimport,
		csssimplevars,
		cssnext(),
		cssnano
	];
	return gulp.src('./src/css/main.css')
		.pipe(sourcemaps.init())
			.pipe(postcss(processors))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./css'))
		.pipe(reload({stream:true}));
});

// Build JS
gulp.task('js', ['clean-js'], function() {
	return gulp.src(paths.js)
		.pipe(sourcemaps.init())
			.pipe(uglify())
			.pipe(concat('all.min.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('js'));
});

// Build Img
gulp.task('img', ['clean-img'], function() {
	return gulp.src(paths.img)
		// Pass in options to the task
		.pipe(imagemin({optimizationLevel: 5}))
		.pipe(gulp.dest('img'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
	gulp.watch(paths.css, ['css']);
	gulp.watch(paths.js, ['js']);
	gulp.watch(paths.img, ['img']);
});

// Default task to be run with `gulp`.
gulp.task('default', ['watch', 'browser-sync'], function () {
	gulp.watch('css/*.css', ['css']).on('change', reload);
	gulp.watch('js/*.js', ['js']).on('change', reload);
	gulp.watch('img/*.jpg', ['img']).on('change', reload);
});
