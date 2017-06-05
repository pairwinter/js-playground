var gulp = require('gulp');
var fs = require('fs');
/*********************** buffer.js **************************/
var buffer = require('./src/stream');
gulp.task('testBuffer', function () {
    buffer.testBuffer();
});
gulp.task('fsRead', function () {
    buffer.fsRead();
});
gulp.task('testStdoutWriteStream', function () {
    buffer.testStdoutWriteStream();
});
gulp.task('testStdinReadStream', function () {
    buffer.testStdinReadStream();
});

gulp.task('testWriteStreamOfOneFile', function () {
    buffer.testWriteStreamOfOneFile();
});

gulp.task('testWriteStreamAndReadStreamOfTwoFiles', function () {
    buffer.testWriteStreamAndReadStreamOfTwoFiles();
});
/*********************** buffer.js **************************/