/**
 * @ignore  =====================================================================================
 * @file    stream.implement.readable
 * @version 1.0.0
 * @author  Damon Liu(damon.liudong@gmail.com)
 * @date    Created at 4:42 PM 06/06/2017
 * @ignore  =====================================================================================
 */
require('./tools')
var stream = require('stream');
var tools = require('./tools');
class MyReadable extends stream.Readable {
    constructor(options) {
        super(options);
        this.readTimes = 0;
    }
    //这里的读是往内置的buffer里读
    _read(size) {
        this.readTimes++;
        var random = Math.random();
        // if (random < 0.2) {
        //     process.nextTick(() => {
        //         // this.emit('error', new Error('read invalid data'));
        //     })
        // } else {
        //
        // }
        var buffer = new Buffer(new String(random, 'utf8'));
        tools.log(`Read ${this.readTimes} times, buffer length is ${buffer.length}!`);
        if(!this.push(buffer)){//在push的时候如果超出了highWaterMark那么就会返回false，这意味不能再继续读了，除非buffer被消耗完。
            tools.log('can not push more data!');
            this.pause();
        }
        if(this.readTimes > 3){
            this.push(null);
        }
    }
}

exports.testMyReadable = () => {
    var myReadable = new MyReadable({
        highWaterMark: 10
    });
    myReadable.on('data', function (chunk) {
        tools.log(chunk);
    });
    myReadable.on('error', function (err) {
        tools.log(err);
    });
};
