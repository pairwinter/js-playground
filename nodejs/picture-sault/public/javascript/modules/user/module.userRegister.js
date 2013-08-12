/**
 * Created with JetBrains WebStorm.
 * User: pairwinter
 * Date: 13-8-10
 * Time: 下午5:37
 * To change this template use File | Settings | File Templates.
 */
(function(module){
    var User = module.getNameSpace('User');
    User.RegisterModule = PicuterSault.Class(PicuterSault.Module,{
        modules : [],
        initialize:function(dom,options){
            PicuterSault.Module.prototype.initialize.apply(this,arguments);
            if(!this.module) return null;
            this.module.controller(this.controllerName,function($scope){
                $scope.login = function(){
                    return false;
                }
                $scope.register = function(){

                }
            });
            angular.bootstrap(this.dom, [this.moduleName]);
        }
    });
})(PicuterSault.Module);
