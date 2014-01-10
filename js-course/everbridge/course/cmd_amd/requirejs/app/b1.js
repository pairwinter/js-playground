/**
 * Created with JetBrains WebStorm.
 * User: pairwinter
 * Date: 13-12-3
 * Time: 下午4:47
 * To change this template use File | Settings | File Templates.
 */
;define(['app/c1'],function(c){
    console.log('load b');
    var bLine = function(){
        return 'b1' + c.cLine();
    }
    return {
        bLine : bLine
    }
});
