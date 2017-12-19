var gulp = require('gulp');  
var nodemon = require('gulp-nodemon');  

gulp.task('server',function(){  
    nodemon({
        'script': 'app.js',
    });
});

gulp.task('serve', ['server']);  