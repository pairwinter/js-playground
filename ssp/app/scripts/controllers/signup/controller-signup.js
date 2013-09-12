'use strict';
angular.module('sspApp').controller('SignUpCtrl', ['$scope','signupService',function ($scope,signupService) {
  $scope.user = {
    name:'',
    firstname:'',
    lastname:'',
    password:'',
    confirmPassword:'',
    securityQuestion : '',
    securityAnswer : '',
    email : '',
    acceptCheckbox : true
  }
  $scope.submit = function(){
    signupService.signup($scope.user,function(data){
      $scope.$emit('SignupSuccess',$scope.user.name);
    });
  }
}]);
