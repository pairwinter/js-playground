/**
 * @ignore  =====================================================================================
 * @file    play
 * @version 1.0.0
 * @author  Damon Liu(damon.liudong@gmail.com)
 * @date    Created at 2:36 PM 27/05/2017
 * @ignore  =====================================================================================
 */
var stream = require('stream');
var Writable = stream.Writable;
var Readable = stream.Readable;
var path = require('path');
var del = require('del');

var fs = require('fs');

var log = function () {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', new Date());
    console.log.apply(console, Array.from(arguments));
    console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
};

var logNewLine = function () {
    console.log('\n');
}

module.exports.testBuffer = function () {
    var buf = Buffer.from('我');
    log(buf);
    log(buf.toString());
};

module.exports.fsRead = function () {
    //node buffer.js
    //process.argv[1] is the second argument.
    logNewLine();
    fs.createReadStream(process.argv[1]).pipe(process.stdout); //print current file.
    logNewLine();
};

module.exports.testStdoutWriteStream = function () {
    var writeStream = process.stdout;
    log('stdout highWaterMark', writeStream.highWaterMark);
    logNewLine();
    writeStream.write(Buffer.from('*write to stdout*'));
    //According to the document you can not close the stdout and stdin.
    //https://nodejs.org/dist/latest-v8.x/docs/api/process.html#process_process_stdout
    // writeStream.end(Buffer.from('end to stdout'));
    logNewLine();
};

module.exports.testStdinReadStream = function () {
    var stdinStream = process.stdin,
        stdoutStream = process.stdout;

    stdinStream.pipe(process.stdout);

    logNewLine();
    stdinStream.push(Buffer.from('*read to stdin*'));
    logNewLine();
    stdinStream.unpipe(process.stdout);

    process.exit(0);
};

function prepareTestFile(filePath, initializeText) {
    filePath = path.join(path.resolve(path.dirname(filePath)), 'testFile_' + (Math.floor(Math.random() * 100)) + path.basename(filePath));
    // log('filePath: ', filePath);
    function createFile(path, initializeText) {
        try {
            fs.statSync(path);
        } catch (e) {
            if (e && e.code === 'ENOENT') {
                fs.writeFileSync(path, initializeText || '');
            }
        }
    }

    createFile(filePath, initializeText);
    return filePath;
}

// The writable.write() method writes some data to the stream, and calls the supplied callback once the data has been fully handled. If an error occurs, the callback may or may not be called with the error as its first argument. To reliably detect write errors, add a listener for the 'error' event.
//
//  The return value is true if the internal buffer is less than the highWaterMark configured when the stream was created after admitting chunk. If false is returned, further attempts to write data to the stream should stop until the 'drain' event is emitted.
//
//  While a stream is not draining, calls to write() will buffer chunk, and return false. Once all currently buffered chunks are drained (accepted for delivery by the operating system), the 'drain' event will be emitted. It is recommended that once write() returns false, no more chunks be written until the 'drain' event is emitted. While calling write() on a stream that is not draining is allowed, Node.js will buffer all written chunks until maximum memory usage occurs, at which point it will abort unconditionally. Even before it aborts, high memory usage will cause poor garbage collector performance and high RSS (which is not typically released back to the system, even after the memory is no longer required). Since TCP sockets may never drain if the remote peer does not read the data, writing a socket that is not draining may lead to a remotely exploitable vulnerability.
// https://nodejs.org/dist/latest-v8.x/docs/api/stream.html#stream_writable_write_chunk_encoding_callback
module.exports.testWriteStreamOfOneFile = function () {
    prepareTestFile('./src/writeStreamTestFile.txt');
    var writeStream = fs.createWriteStream('./src/writeStreamTestFile.txt', {
        highWaterMark: 5
    });
    var isDrainCalled = false;

    writeStream.on('drain', function () {
        log('drain', arguments);
        isDrainCalled = true;
    });

    writeStream.write(Buffer.from('a'), function () {
        log('write a done!');
    });
    writeStream.write(Buffer.from('123456'), function () {
        log('write 123456 done!', arguments);
    });
    writeStream.write(Buffer.from('b'), function () {
        log('write b done!');
    });

    writeStream.end();
};

module.exports.testWriteStreamAndReadStreamOfTwoFiles = function () {
    del.sync('./src/*twsarsotf*');
    var writeFilePath = prepareTestFile('./src/twsarsotf_writeStreamTestFile.txt');
    var readFilePath = prepareTestFile('./src/twsarsotf_readStreamTestFile.txt', 'test\nread\nstream\n, ok?\n');
    var readStream = fs.createReadStream(readFilePath);
    var writeStream = fs.createWriteStream(writeFilePath, {
        highWaterMark: 3
    });
    writeStream.on('drain', function () {
        log('drain', arguments);
    });
    writeStream.on('pipe', function (src) {
        log('something is piping into the writer, src instanceof Readable: ', src instanceof Readable);
    });
    writeStream.on('unpipe', function (src) {
        log('Something has stopped piping into the writer., src instanceof Readable: ', src instanceof Readable);
    });
    writeStream.cork();
    readStream.pipe(writeStream);
    //When using writable.cork() and writable.uncork() to manage the buffering of writes to a stream, it is recommended that calls to writable.uncork() be deferred using process.nextTick(). Doing so allows batching of all writable.write() calls that occur within a given Node.js event loop phase.

    process.nextTick(function () {
        log('nextTick');
        writeStream.uncork();
    });
};





