var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('reload', function(){
	browserSync.reload();
});

gulp.task('serve', function(){

	browserSync({
		server: 'views/pages'
	});

	gulp.watch('views/pages/*.ejs', ['reload']);
});

gulp.task('default', ['serve']);