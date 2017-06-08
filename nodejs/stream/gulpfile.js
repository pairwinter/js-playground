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
/*********************** stream.readable.js **************************/
var streamReadable = require('./src/stream.readable');
gulp.task('stream>readable - testTwoModesOfReadableSteam', function () {
    streamReadable.testTwoModesOfReadableSteam();
});

gulp.task('stream>readable - testReadOfReadableSteam', function () {
    streamReadable.testReadOfReadableSteam();
});

gulp.task('stream>readable - testOndataOfReadableSteam', function () {
    streamReadable.testOndataOfReadableSteam();
});
/*********************** stream.implement.writable.js **************************/

var streamImplementWritable = require('./src/stream.implement.writable');
gulp.task('stream>implement>writable - testMyWritableSteam', function () {
    streamImplementWritable.testMyWritableSteam();
});
/*********************** stream.implement.readable.js **************************/

var streamImplementReadable = require('./src/stream.implement.readable');
gulp.task('stream>implement>readable - testMyReadable', function () {
    streamImplementReadable.testMyReadable();
});

/*********************** stream.implement.duplex.js **************************/

var streamImplementDuplex = require('./src/stream.implement.duplex');
gulp.task('stream>implement>duplex - testMyDuplexOfRead', function () {
    streamImplementDuplex.testMyDuplexOfRead();
});

gulp.task('stream>implement>duplex - testMyDuplexOfWrite', function () {
    streamImplementDuplex.testMyDuplexOfWrite();
});

gulp.task('stream>implement>duplex - testMyDuplexPipeSelf', function () {
    streamImplementDuplex.testMyDuplexPipeSelf();
});

gulp.task('stream>implement>duplex - testMyTransformOfDuplex', function () {
    streamImplementDuplex.testMyTransformOfDuplex();
});
/*********************** stream.implement.transform.js **************************/

var streamImplementTransform = require('./src/stream.implement.transform');
gulp.task('stream>implement>transform - testMyTransform', function () {
    streamImplementTransform.testMyTransform();
});

gulp.task('stream>implement>transform - testMyTransformWithWritableObjectMode', function () {
    streamImplementTransform.testMyTransformWithWritableObjectMode();
});

gulp.task('stream>implement>transform - testMyTransformWithReadableObjectMode', function () {
    streamImplementTransform.testMyTransformWithReadableObjectMode();
});

gulp.task('stream>implement>transform - testMyTransformWithObjectMode', function () {
    streamImplementTransform.testMyTransformWithObjectMode();
});