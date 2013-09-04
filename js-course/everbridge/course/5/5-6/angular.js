(function(jc){

//    angular.bootstrap(document, ['simple','simple2']);
    jc.Angular = {
        simple:(function(){
            var c = function(moduleName,controllerName){
                this.simples.push(moduleName);
                this.module = angular.module(moduleName,[]);
                this.module.controller(controllerName,function($scope){

                });
            }
            c.prototype.simples=[];
            return c;
        })()
    };

//    simple1.module.controller("simple2Ctrl",function($scope){
//
//    });
    angular.element(document).ready(function() {
        var simple = new jc.Angular.simple("simple","simpleCtrl");
        var simple2 = new jc.Angular.simple("simple2","simple2Ctrl");
        angular.bootstrap(document.getElementById('simple'), ['simple']);
        angular.bootstrap(document.getElementById('simple2'), ['simple2']);

    });
})(js_course);