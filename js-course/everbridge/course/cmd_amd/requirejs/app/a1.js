/**
 * Created with JetBrains WebStorm.
 * User: pairwinter
 * Date: 13-12-3
 * Time: 下午4:47
 * To change this template use File | Settings | File Templates.
 */
;define(['app/b1'],function(b){
    console.log('load a');
    var aLine = function(){
        console.log('excult aline');
        return 'a1' + b.bLine();
    }
    return {
        aLine : aLine
    }
});