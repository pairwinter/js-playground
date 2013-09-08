'use strict';
angular.module('sspApp').controller('LoginCtrl', ['$scope','loginService',function ($scope,loginService) {
    $scope.errors = [];
    $scope.user = {
      name:'',
      pwd : ''
    };
    $scope.helpIsCollapsed = false;
    $scope.submit = function(){
      loginService.login($scope.user,function(errors){
        $scope.errors = errors;
      });
    };
    $scope.closeError = function(index){
      $scope.errors.splice(index,1)
    }
  }]);
