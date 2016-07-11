var config = require('require-dir')('gulp-config');
var $ = require('gulp-recipe-loader')(require('gulp'), config);

$.gulp.task('default', ['serve']);