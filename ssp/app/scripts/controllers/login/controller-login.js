'use strict';
angular.module('sspApp').controller('LoginCtrl', ['$scope','$location','loginService',function ($scope, $location,loginService) {
    $scope.errors = [];
    $scope.user = {
      name:'',
      pwd : ''
    };
    $scope.helpIsCollapsed = false;
    $scope.$emit('LoginFaild');
    $scope.submit = function(){
      loginService.login($scope.user,function(data){
        if(data.success){
          $location.path('/home');
          $scope.user.pwd = '';
          $scope.$emit('LoginSuccess',$scope.user.name);
        }else{
          $scope.errors = data.errors;
        }
      });
    };
    $scope.closeError = function(index){
      $scope.errors.splice(index,1)
    }
  }]);
