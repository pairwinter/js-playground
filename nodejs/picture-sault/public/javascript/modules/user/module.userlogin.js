/**
 * Created with JetBrains WebStorm.
 * User: pairwinter
 * Date: 13-8-10
 * Time: 下午5:37
 * To change this template use File | Settings | File Templates.
 */
(function(module){
    var User = module.getNameSpace('User');
    User.LoginModule = PicuterSault.Class(PicuterSault.Module,{
        initialize:function(dom,options){
            var index = PicuterSault.Module.User.LoginModule.modules.length + 1;
            this.moduleName = "UserLogin"+index;
            this.controllerName = "UserLoginCtrl"+index;

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
            PicuterSault.Module.User.LoginModule.modules.push(this);
        }
    });
    User.LoginModule.modules = [];
})(PicuterSault.Module);
