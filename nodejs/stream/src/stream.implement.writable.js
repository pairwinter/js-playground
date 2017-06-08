/**
 * @ignore  =====================================================================================
 * @file    stream.implement.writable
 * @version 1.0.0
 * @author  Damon Liu(damon.liudong@gmail.com)
 * @date    Created at 2:34 PM 06/06/2017
 * @ignore  =====================================================================================
 */

var stream = require('stream');

class MyWritable extends stream.Writable {
    constructor(options) {
        super(options);
    }
    _write(chunk, encoding, callback){
        if(chunk.toString().indexOf('a') >=0 ){
            callback(new Error('chunk is invalid!'))
        } else {
            callback();
        }
    }
}

module.exports.testMyWritableSteam = function () {
    var testMyWritableSteam = new MyWritable();
    testMyWritableSteam.write('bc');
    // testMyWritableSteam.
    // testMyWritableSteam.write('abc');
};


