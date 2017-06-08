/**
 * @ignore  =====================================================================================
 * @file    stream.implement.duplex
 * @version 1.0.0
 * @author  Damon Liu(damon.liudong@gmail.com)
 * @date    Created at 10:02 AM 07/06/2017
 * @ignore  =====================================================================================
 */
var tools = require('./tools');
var stream = require('stream');
var kSource = Symbol('source');
var fs = require('fs');

class MyDuplex extends stream.Duplex {
    constructor(source, options) {
        super(options);
        this[kSource] = source;
    }

    _write(chunk, encoding, callback) {
        if (Buffer.isBuffer(chunk)) {
            chunk = chunk.toString();
        }
        this[kSource].write(chunk);
        callback();
    }

    _read(size) {
        this.push(this[kSource].read());
    }
}

module.exports.testMyDuplexPipeSelf = () => {
    let myDuplex = new MyDuplex({
        write: function (chunkOfString) {
            tools.log('Get the chunk to write: ', chunkOfString.toString());
        },
        read: function () {
            var data = Math.random();
            if (data < 0.1) {
                return null;
            }
            return data + '';
        }
    });
    myDuplex.pipe(myDuplex);
};

module.exports.testMyDuplexOfRead = () => {
    let myDuplex = new MyDuplex({
        read: function () {
            var data = Math.random();
            if (data < 0.1) {
                return null;
            }
            return data + '';
        }
    });
    myDuplex.on('data', function (chunk) {
        tools.log('myDuplex.on("data") to consume the read data', chunk.toString());
    });
};

module.exports.testMyDuplexOfWrite = () => {
    let myDuplex = new MyDuplex({
        write: function (chunkOfString) {
            tools.log('Get the chunk to write: ', chunkOfString);
        }
    });

    var readFile = tools.prepareTestFile('testMyDuplexOfWrite.txt', tools.generateText());
    fs.createReadStream(readFile).pipe(myDuplex);
};

module.exports.testMyTransformOfDuplex = () => {
    var myTransform = new stream.Transform({
        writableObjectMode: true,
        transform: (chunk, encoding, callback) => {
            chunk |= 0;

            const data = chunk.toString(16);

            callback(null /*Error*/, '0'.repeat(data.length % 2) + data /*data*/);
        }
    });

    myTransform.setEncoding('ascii');
    myTransform.on('data', function (chunk) {
        tools.log('transform ondata: ', chunk);
    });

    myTransform.write(1);
    myTransform.write(130);
    myTransform.end(200);
};