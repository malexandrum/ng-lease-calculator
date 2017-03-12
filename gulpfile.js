// gulp-s3
// var s3   = require('gulp-s3')
// var gulp = require('gulp')


// gulp.task('default', () => {
//   gulp.src('./dist/**').pipe(s3(require('./aws.json')));
// });


var config = require('./aws.json');

var gulp = require('gulp');
var s3 = require('gulp-s3-upload')(config);

gulp.task("upload", function () {
  gulp.src("./dist/**")
    .pipe(s3({
      Bucket: 'autoleasemilescalc.apwize.com', //  Required 
      ACL: 'public-read'       //  Needs to be user-defined 
    }, {
        // S3 Constructor Options, ie: 
        maxRetries: 5
      }))
    ;
});