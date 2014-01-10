/**
 * Created with JetBrains WebStorm.
 * User: pairwinter
 * Date: 13-12-3
 * Time: 下午4:47
 * To change this template use File | Settings | File Templates.
 */
;define(function(require,exports,module){
    console.log('load a');
    var b = require('app/b');
    var aLine = function(){
        console.log('excult aline');
        return 'a' + b.bLine();
    }
    exports.aLine = aLine;
});