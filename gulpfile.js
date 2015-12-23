var gulp = require('gulp'); 
var nodemon = require('nodemon'); 
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var sass = require('gulp-sass'); 

const paths = {
  bundle: 'app.js',
  srcJsx: 'app/index.js',
  srcCss: 'app/**/*.css',
  srcImg: 'app/images/**',
  dist: 'dist',
  distJs: 'dist/js',
  distImg: 'dist/images',
distCss: 'client/dist/css'
};

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

// gulp.task('browserify', function () {
//     browserify('./client/index.js', { debug: true })
//         .transform('babelify', {presets: ['react']})
//         .bundle()
//         .on('error', gutil.log)
//         .pipe(source('bundle.js'))
//         .pipe(gulp.dest('./client'))
// });
//

gulp.task('styles', () => {
    return gulp.src('client/scss/**/*.scss')
    .pipe(sass({
      errLogToConsole: true,
      includePaths: [
        'node_modules/bootstrap-sass/assets/stylesheets'
        // path.join(config.bowerDir, '/font-awesome/scss')
      ]
    }))
    .on('error', function(err) {
      util.log('Sass', util.colors.red(err.message));
      this.emit('end');
    })
    // .pipe(concat('style.css'))
    .pipe(gulp.dest(paths.distCss));
});



gulp.task('default', ['server']); 
