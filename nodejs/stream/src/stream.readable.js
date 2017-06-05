/**
 * @ignore  =====================================================================================
 * @file    stream.readable
 * @version 1.0.0
 * @author  Damon Liu(damon.liudong@gmail.com)
 * @date    Created at 2:26 PM 05/06/2017
 * @ignore  =====================================================================================
 */

var tools = require('./tools');
var fs = require('fs');
module.exports.testTwoModesOfReadableSteam = function () {
    tools.delTestFile('./_tmp/*stream.readable.two.modes.txt');
    var filePath = tools.prepareTestFile('stream.readable.two.modes.txt', 'test\n test1 test2\n test3');
    var readableSteam = fs.createReadStream(filePath, {highWaterMark: 10});
    tools.log('When createReadStream - readableSteam._readableState.flowing :', readableSteam._readableState.flowing);

    readableSteam.on('readable', () => {
        tools.log('onReadable arguments: ', arguments);
        tools.log('readableSteam.read(): ', readableSteam.read());
    });

    readableSteam.on('data', function (chunk) {
        tools.log('onData arguments: ', arguments);
        tools.log('data chunk', chunk.length);
    });

    tools.log('After add the data listener - readableSteam._readableState.flowing :', readableSteam._readableState.flowing);
    readableSteam.pause();


    tools.log('After call pause - readableSteam._readableState.flowing :', readableSteam._readableState.flowing);

    readableSteam.resume();

    tools.log('my priority');

    readableSteam.on('end', function () {
        tools.log('onEnd arguments: ', arguments);
    });
};

module.exports.testReadOfReadableSteam = function () {
    tools.delTestFile('./_tmp/*stream.readable.read.txt');
    var filePath = tools.prepareTestFile('stream.readable.read.txt', 'test-231-23123');
    var readableSteam = fs.createReadStream(filePath, {highWaterMark: 5});
    readableSteam.setEncoding('utf8');
    //如果注册了readable事件，那么这个事件只有在pause 模式下才起作用。
    var firstCallback = function () {
        tools.log('first callback readableSteam read -->', readableSteam.read());
        readableSteam.removeListener('readable', firstCallback);
        readableSteam.unshift(new Buffer('From First Readable', 'utf8'));
    };
    readableSteam.on('readable', firstCallback);
    readableSteam.on('readable', () => {
        tools.log('second callback readableSteam read -->', readableSteam.read());
    });
    //如果开启了flowing模式，那么上面的readable不会work
    // readableSteam.on('data', function (chunk) {
    //     tools.log('onData arguments: ', arguments);
    //     tools.log('data chunk', chunk.length);
    // });
    // readableSteam.pause();
};

module.exports.testOndataOfReadableSteam = function () {
    tools.delTestFile('./_tmp/*stream.readable.two.modes.txt');
    var filePath = tools.prepareTestFile('stream.readable.two.modes.txt', 'test\n test1 test2\n test3');
    var readableSteam = fs.createReadStream(filePath, {highWaterMark: 10});

    readableSteam.on('data', function (chunk) {
        tools.log('This is the first customer!', chunk);
    });
    readableSteam.on('data', function (chunk) {
        tools.log('This is the second customer!', chunk);
    });

};