var gulp = require('gulp');
var fs = require('fs');
/*********************** stream.js **************************/
var streamPlayGround = require('./src/stream');
gulp.task('stream-testBuffer', function () {
    streamPlayGround.testBuffer();
});
gulp.task('stream-fsRead', function () {
    streamPlayGround.fsRead();
});
gulp.task('stream-testStdoutWriteStream', function () {
    streamPlayGround.testStdoutWriteStream();
});
gulp.task('stream-testStdinReadStream', function () {
    streamPlayGround.testStdinReadStream();
});

gulp.task('stream-testWriteStreamOfOneFile', function () {
    streamPlayGround.testWriteStreamOfOneFile();
});

gulp.task('stream-testWriteStreamAndReadStreamOfTwoFiles', function () {
    streamPlayGround.testWriteStreamAndReadStreamOfTwoFiles();
});

gulp.task('stream-testZlib', function () {
    streamPlayGround.testZlib();
});
/*********************** stream.js **************************/

/*********************** stream.readable.js **************************/
var streamReadable = require('./src/stream.readable');
gulp.task('stream.readable - testTwoModesOfReadableSteam', function () {
    streamReadable.testTwoModesOfReadableSteam();
});

gulp.task('stream.readable - testReadOfReadableSteam', function () {
    streamReadable.testReadOfReadableSteam();
});

gulp.task('stream.readable - testOndataOfReadableSteam', function () {
    streamReadable.testOndataOfReadableSteam();
});

/*********************** stream.readable.js **************************/