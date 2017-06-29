var gulp = require('gulp'); 
var nodemon = require('nodemon'); 
var util = require('gulp-util');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var xunit = require('xunit-file'); 

const paths = {
  bundle: 'app.js',
};

gulp.task('server', function () {
  nodemon({
    script : 'app.js', 
    ext: 'js html', 
    env : { 'NODE_ENV' : 'development' }, 
    execMap : {
        'js' : 'node --harmony'
    }
  }); 
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
      reporter: (process.env.JENKINS)? xunit : 'spec' 
    }))
    .on('error', (err) => {
      console.log(err.message);
      process.exit(1);
    })
    .pipe(istanbul.writeReports())
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 50 }}))
    .once('error', (err) => {
      console.log(err.message);
      process.exit(1);
    })
    .once('end', () => {
      process.exit(0);
    });
  });
});

gulp.task('default', ['server']); 
