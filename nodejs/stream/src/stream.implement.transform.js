/**
 * @ignore  =====================================================================================
 * @file    stream.implement.transform
 * @version 1.0.0
 * @author  Damon Liu(damon.liudong@gmail.com)
 * @date    Created at 2:53 PM 08/06/2017
 * @ignore  =====================================================================================
 */
var _ = require('lodash');
var stream = require('stream');
var tools = require('./tools');
class MyTransform extends stream.Transform {
    constructor(options) {
        super(options);
    }

    _transform(chunk, encoding, flushCallback) {
        tools.log(chunk);
        flushCallback(null, chunk);
    }
}

exports.testMyTransform = () => {
    var myTransform = new MyTransform({
        encoding: 'utf8'
    });
    myTransform.on('data', function (chunk) {
        tools.log("myTransform.on('data')", chunk)
    });
    myTransform.end('test');
};

exports.testMyTransformWithWritableObjectMode = () => {
    var myTransform = new MyTransform({
        encoding: 'utf8',
        writableObjectMode: true
    });
    myTransform.on('data', function (chunk) {
        tools.log("myTransform.on('data')", chunk)
    });
    myTransform.end({name: '?'});
};

exports.testMyTransformWithReadableObjectMode = () => {
    //读的时候是对象，再写的时候转成字符串
    var myTransform = new MyTransform({
        encoding: 'utf8',
        readableObjectMode: true
    });
    myTransform.on('data', function (chunk) {
        tools.log("myTransform.on('data')", chunk)
    });
    myTransform.end('test');
};

exports.testMyTransformWithObjectMode = () => {
    //都是以对象读写，这个时候不需要encoding。
    var myTransform = new MyTransform({
        writableObjectMode: true,
        readableObjectMode: true
    });
    myTransform.on('data', function (chunk) {
        tools.log("myTransform.on('data')", chunk)
    });
    myTransform.end({
        name: 'end'
    });
};