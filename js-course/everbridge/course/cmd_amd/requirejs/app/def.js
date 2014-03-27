/**
 * Created with JetBrains WebStorm.
 * User: pairwinter
 * Date: 13-12-3
 * Time: 下午4:47
 * To change this template use File | Settings | File Templates.
 */
;define('def/d',['def/e','require','exports'],function(e,require,exports){
    console.log('load def-d');
    var dLine = function(){
        console.log('excult dline');
        return 'd' + e.eLine();
    }
    exports.dLine = dLine;
});
define('def/e',['def/f','require','exports'],function(f,require,exports){
    console.log('load def-e');
    var eLine = function () {
        console.log('excult eLine');
        return 'e' + f.fLine();
    }
    exports.eLine = eLine;
});
define('def/f',['require','exports'],function(require,exports,mdule){
    console.log('load def-f');
    var fLine = function () {
        console.log('excult fLine');
        return 'f';
    }
    exports.fLine = fLine;
});