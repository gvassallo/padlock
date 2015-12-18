var gulp = require('gulp'); 
var nodemon = require('nodemon'); 
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');


gulp.task('server', function () {
    nodemon({
        script : 'app.js', 
        ext: 'js html', 
        env : { 'NODE_ENV' : 'development' }, 
        execMap : {
            'js' : 'node --harmony'
        }
    })
}); 


gulp.task('browserify', function () {
    browserify('./client/index.js', { debug: true })
        .transform('babelify', {presets: ['react']})
        .bundle()
        .on('error', gutil.log)
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./client'))
});

gulp.task('default', ['browserify', 'server']); 
