/**
 * Created with JetBrains WebStorm.
 * User: pairwinter
 * Date: 13-12-3
 * Time: 下午4:47
 * To change this template use File | Settings | File Templates.
 */
;define(function(require,exports,module){
    console.log('load c');
    var cLine = function(){
        return 'c';
    }
    exports.cLine = cLine;
});
