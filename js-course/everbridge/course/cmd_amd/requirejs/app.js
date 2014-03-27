/**
 * Created with JetBrains WebStorm.
 * User: pairwinter
 * Date: 13-12-9
 * Time: 上午11:17
 * To change this template use File | Settings | File Templates.
 */
requirejs.config({
    baseUrl : './lib',
    'paths' : {
        'app':'../app'//依赖上面的baseUrl来定位。
    }
});
require(['jquery'],function($){
    $('#clear').click(function () {
        $('#lineInput').val('');
        $('#lineInput1').val('');
        $('#lineInput2').val('');
    });
    $('#setVal').click(function(){
        require(['app/a'],function(a){
            var line = a.aLine();
            $('#lineInput').val(line);
        });
    });
    $('#setVal1').click(function(){
        require(['app/a1'],function(a){
            var line = a.aLine();
            $('#lineInput1').val(line);
        });
    });
    $('#setVal2').click(function(){
        require(['app/def'],function(){
            require(['def/d'],function(d){
                var line = d.dLine();
                $('#lineInput2').val(line);
            });
//            require(['a'],function(a){
//                var line = a.aLine();
//                $('#lineInput').val(line);
//            });
        });
    });
});
