var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var inlineCss = require('gulp-inline-css');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

//compile scss to css
gulp.task('build', function(){
	return gulp.src('./build/src/scss/*.scss')
		.pipe(sass({
			style: 'compressed',
			errLogToConsole: false,
			onError: function(err){
				return notify().write(err);
			}
		}))
		.pipe(gulp.dest('./build/src/css/'));
})

//move css inline
gulp.task('inline', ['build'], function(){
	return gulp.src('./build/*.html')
		.pipe(inlineCss())
		.pipe(gulp.dest("./public/"))
		.pipe(reload({stream: true}));
})

//compile on change
gulp.task('watch', function(){
	gulp.watch(['./build/src/scss/*.scss', './build/*.html'], ['inline']);
})

//serve to the browser
gulp.task('serve', function(){
	browserSync({
		server: {
			baseDir: "./public"
		},
		open: false
	})
})

//the dafault task
gulp.task('default', ['watch', 'serve']);

