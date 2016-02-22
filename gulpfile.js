var gulp = require('gulp'); 
var nodemon = require('nodemon'); 
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var util = require('gulp-util');
var sass = require('gulp-sass'); 
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');

const paths = {
  bundle: 'app.js',
  srcJsx: 'client/index.js',
  srcCss: 'app/**/*.css',
  srcImg: 'app/images/**',
  dist: 'dist',
distJs: 'client/dist/js',
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

gulp.task('browserify', function () {
    browserify(paths.srcJsx, { debug: true })
        .transform('babelify', {presets: ['react']})
        .bundle()
        .on('error', util.log)
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(paths.distJs))
});


gulp.task('test', () => {
  process.env.NODE_ENV = 'test';
  return gulp.src([
      'app.js',
      'models/**/*.js',
      'routes/**/*.js'
  ])
    .pipe(istanbul({ includeUntested: true }))
    .pipe(istanbul.hookRequire())
    .on('finish', () => {
      gulp.src([
        'tests/unit/*.test.js', 
        'tests/integration/*.test.js'
      ], { read: false })
        .pipe(mocha({
          reporter: 'spec',
        }))
        .on('error', (err) => {
          console.log(err.message);
          process.exit(1);
        })
        .pipe(istanbul.writeReports())
        .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 }}))
        .once('error', (err) => {
          console.log(err.message);
          process.exit(1);
        })
        .once('end', () => {
          process.exit(0);
        });
    });
});

gulp.task('styles', () => {
    return gulp.src('client/scss/**/*.scss')
    .pipe(sass({
      errLogToConsole: true,
      includePaths: [
        'node_modules/bootstrap-sass/assets/stylesheets', 
        'node_modules/font-awesome/scss'
      ]
    }))
    .on('error', function(err) {
      util.log('Sass', util.colors.red(err.message));
      this.emit('end');
    })
    .pipe(gulp.dest(paths.distCss));
});

gulp.task('icons', () => {
  return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest(path.join(config.destDir, '/fonts')));
});


gulp.task('default', ['server']); 
