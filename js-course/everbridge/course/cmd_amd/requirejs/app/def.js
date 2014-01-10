/**
 * Created with JetBrains WebStorm.
 * User: pairwinter
 * Date: 13-12-3
 * Time: 下午4:47
 * To change this template use File | Settings | File Templates.
 */
;define('def/d',['def/e','def/f'],function(require,exports,module){
    console.log('load d');
    var e = require('def/e');
    var dLine = function(){
        console.log('excult dline');
        return 'd' + e.eLine();
    }
    exports.dLine = dLine;
});
define('def/e',['def/f'],function(require,exports,mdule){
    console.log('load e');
    var f = require('def/f');
    var eLine = function () {
        console.log('excult eLine');
        return 'e' + f.fLine();
    }
    exports.eLine = eLine;
});
define('def/f',[],function(require,exports,mdule){
    console.log('load f');
    var fLine = function () {
        console.log('excult fLine');
        return 'f';
    }
    exports.fLine = fLine;
});