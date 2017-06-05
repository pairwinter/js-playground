/**
 * @ignore  =====================================================================================
 * @file    tools
 * @version 1.0.0
 * @author  Damon Liu(damon.liudong@gmail.com)
 * @date    Created at 2:24 PM 05/06/2017
 * @ignore  =====================================================================================
 */
var _ = require('lodash');
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
var tmp = './_tmp';
var del = require('del');


var log = function () {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', new Date());
    console.log.apply(console, Array.from(arguments));
    console.log('\n');
};
module.exports.log = log;

var logNewLine = function () {
    console.log('\n');
};

module.exports.logNewLine = logNewLine;

function prepareTestFile(filePath, initialText) {
    if (path.dirname(filePath) === '.') {
        filePath = path.join(process.cwd(), tmp, filePath);
    }
    filePath = path.join(path.resolve(path.dirname(filePath)), 'testFile_' + (Math.floor(Math.random() * 100)) + path.basename(filePath));
    log(filePath);
    mkdirp.sync(path.dirname(filePath));
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

    createFile(filePath, initialText);
    return filePath;
}

module.exports.prepareTestFile = prepareTestFile;

module.exports.delTestFile = function (patterns, opts) {
    del.sync(patterns, opts)
};

module.exports.generateText = function (seed, count) {
    seed = seed || 'Hi,\nThis is Damon.\n';
    count = count || 100;
    var texts = [];
    for (var i = 0; i < count; i++) {
        texts.push(seed);
    }
    return texts.join('');
};